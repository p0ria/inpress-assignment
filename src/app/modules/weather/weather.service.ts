import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ENV } from "src/app/common/env";
import { WeatherResponse } from "src/app/common/types";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private readonly baseUrl = 'http://api.weatherstack.com/';
    constructor(private http: HttpClient) { }

    getCityWeather(cityName: string): Observable<WeatherResponse> {
        return this.http.get<any>(`${this.baseUrl}/current`, {
            params: {
                access_key: ENV.accessKey,
                query: cityName
            }
        }).pipe(
            map(r => {
                if (r.error) {
                    throw Error(r.error.info, { cause: r.error });
                }
                return r;
            })
        );
    }
}