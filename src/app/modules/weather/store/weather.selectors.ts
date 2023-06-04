import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEATHER_FEATURE_NAME, WeatherState } from './weather.state';
import { toCityNameKey } from 'src/app/common/utils/app-utils';

export namespace WeatherSelectors {
    export const weatherState =
        createFeatureSelector<WeatherState>(WEATHER_FEATURE_NAME);

    export const weathers = createSelector(
        weatherState,
        (state) => state.weathers
    );

    export const filters = createSelector(weatherState, (state) => state.filters);

    export const isGetCityWeatherPending = createSelector(
        weatherState,
        (state) => state.isGetCityWeatherPending
    );

    export const filteredWeather = createSelector(
        weathers,
        filters,
        (weathers, filters) => {
            const cityNameKey = toCityNameKey(filters?.cityName);
            return cityNameKey ? weathers[cityNameKey] : null;
        }
    );
}
