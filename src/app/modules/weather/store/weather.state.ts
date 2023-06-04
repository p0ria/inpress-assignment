import { WeatherResponse } from 'src/app/common/types';

export const WEATHER_FEATURE_NAME = 'weather';

export class WeatherState {
    weathers: Record<string, WeatherResponse>;
    filters: { cityName: string };
    isGetCityWeatherPending: boolean;
}

export const initialState: WeatherState = {
    weathers: {},
    filters: { cityName: null },
    isGetCityWeatherPending: false,
};
