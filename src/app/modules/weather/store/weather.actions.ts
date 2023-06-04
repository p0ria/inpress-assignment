import { createAction, props } from "@ngrx/store";
import { WeatherState } from "./weather.state";
import { WeatherResponse } from "src/app/common/types";

export namespace WeatherActions {
    export const changeFilters = createAction(
        '[Weather] Change Filters',
        props<{ filters: Partial<WeatherState['filters']> }>()
    )

    export const getCityWeather = createAction(
        '[Weather] Get City Weather',
        props<{ cityName: string }>()
    )

    export const getCityWeatherSuccess = createAction(
        '[Weather] Get City Weather Success',
        props<{ cityName: string, weather: WeatherResponse }>()
    )

    export const getCityWeatherFailure = createAction(
        '[Weather] Get City Weather Failure',
        props<{ error: any }>()
    )
}