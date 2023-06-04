import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.css'],
})
export class LangSelectorComponent {
  lang = new FormControl(this.translate.currentLang);

  constructor(public translate: TranslateService) {
    this.lang.valueChanges.subscribe((v) => {
      this.translate.use(v);
    });
  }
}
