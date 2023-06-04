import { NgModule } from '@angular/core';
import { WeatherComponent } from './components/weather/weather.component';
import { SharedModule } from '../shared/shared.module';
import { WeatherRoutingModule } from './weather-routing.module';
import { StoreModule } from '@ngrx/store';
import { WEATHER_FEATURE_NAME } from './store/weather.state';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './store/weather.effects';
import { weatherReducer } from './store/weather.reducer';

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    SharedModule,
    WeatherRoutingModule,
    StoreModule.forFeature(WEATHER_FEATURE_NAME, weatherReducer),
    EffectsModule.forFeature([WeatherEffects]),
  ],
})
export class WeatherModule { }
