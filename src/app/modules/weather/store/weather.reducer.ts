import { Action, createReducer, on } from '@ngrx/store';
import { WeatherState, initialState } from './weather.state';
import { WeatherActions } from './weather.actions';
import { toCityNameKey } from 'src/app/common/utils/app-utils';

const reducer = createReducer(
    initialState,
    on(WeatherActions.changeFilters, (state, action) => {
        return {
            ...state,
            filters: {
                ...state.filters,
                ...action.filters,
            },
        };
    }),
    on(WeatherActions.getCityWeather, (state, action) => {
        return {
            ...state,
            isGetCityWeatherPending: true,
        };
    }),
    on(WeatherActions.getCityWeatherSuccess, (state, action) => {
        return {
            ...state,
            weathers: {
                ...state.weathers,
                [toCityNameKey(action.cityName)]: {
                    ...action.weather,
                    cacheTime: Date.now()
                },
            },
            isGetCityWeatherPending: false,
        };
    }),
    on(WeatherActions.getCityWeatherFailure, (state, action) => {
        return {
            ...state,
            isGetCityWeatherPending: false,
        };
    })
);

export function weatherReducer(
    state: WeatherState | undefined,
    action: Action
) {
    return reducer(state, action);
}
