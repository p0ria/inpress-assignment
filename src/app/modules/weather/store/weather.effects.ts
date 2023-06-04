import { ErrorHandler, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { WeatherActions } from "./weather.actions";
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { WeatherSelectors } from "./weather.selectors";
import { isWeatherCacheExpired, toCityNameKey } from "src/app/common/utils/app-utils";
import { WeatherService } from "../weather.service";

@Injectable()
export class WeatherEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private weatherService: WeatherService,
        private errorHandler: ErrorHandler
    ) { }

    changeFilters$ = createEffect(
        () => this.actions$.pipe(
            ofType(WeatherActions.changeFilters),
            withLatestFrom(this.store.pipe(select(WeatherSelectors.weathers))),
            filter(([action, weathers]) => {
                const weather = weathers[toCityNameKey(action.filters?.cityName)];
                return !weather || isWeatherCacheExpired(weather);
            }),
            map(([action]) => WeatherActions.getCityWeather({ cityName: action.filters.cityName }))
        )
    )

    getCityWeather$ = createEffect(
        () => this.actions$.pipe(
            ofType(WeatherActions.getCityWeather),
            switchMap(action => this.weatherService.getCityWeather(action.cityName).pipe(
                map(weather => WeatherActions.getCityWeatherSuccess({ cityName: action.cityName, weather })),
                catchError(error => of(WeatherActions.getCityWeatherFailure({ error })))
            ))
        )
    )

    getCityWeatherFailure$ = createEffect(
        () => this.actions$.pipe(
            ofType(WeatherActions.getCityWeatherFailure),
            tap(action => {
                this.errorHandler.handleError(action.error);
            })
        ), { dispatch: false }
    )
}