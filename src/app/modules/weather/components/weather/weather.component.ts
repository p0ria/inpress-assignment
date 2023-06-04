import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { WeatherActions } from '../../store/weather.actions';
import { WeatherSelectors } from '../../store/weather.selectors';
import { first } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  form = this.fb.group({
    cityName: ['', Validators.required],
  });
  isGetCityWeatherPending$ = this.store.select(WeatherSelectors.isGetCityWeatherPending);
  filteredWeather$ = this.store.select(WeatherSelectors.filteredWeather);

  constructor(private fb: FormBuilder, private store: Store) {
    this.store
      .pipe(select(WeatherSelectors.filters), first())
      .subscribe((filters) => this.form.patchValue(filters));
  }

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(
        WeatherActions.changeFilters({ filters: this.form.value })
      );
    }
  }
}
