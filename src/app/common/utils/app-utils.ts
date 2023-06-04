import { TranslateService } from "@ngx-translate/core";
import { ENV } from "../env";
import { WeatherResponse } from "../types";

export function toCityNameKey(cityName: string): string {
    return cityName
        ? cityName
            .toLowerCase()
            .split(' ')
            .map((s) => s.trim())
            .join()
        : '';
}

export function isWeatherCacheExpired(weather: WeatherResponse): boolean {
    return Date.now() - weather.cacheTime > ENV.cacheTime;
}

export function hasTranslation(translateService: TranslateService, key: string): boolean {
    const translation = translateService.instant(key);
    return translation !== key && translation !== '';
}
