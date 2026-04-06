import { Component } from '@angular/core';
import { I18nService } from './i18n.service';
import { I18nPipe } from './i18n.pipe';

@Component({
  standalone: true,
  selector: 'app-i18n-demo',
  imports: [I18nPipe],
  template: `
    <section style="border: 2px solid #673ab7; padding: 1rem; border-radius: .75rem; margin-top: 1rem;">
      <h3>{{ 'title' | i18n }}</h3>
      <p>{{ 'greeting' | i18n }}, {{ currentLang.toUpperCase() }}!</p>
      <p>{{ 'instruction' | i18n }}</p>
      <button (click)="changeLang('en')">EN</button>
      <button (click)="changeLang('es')" style="margin-left:.5rem;">ES</button>
    </section>
  `,
})
export class I18nDemoComponent {
  constructor(public i18n: I18nService) {}

  get currentLang() {
    return this.i18n.locale();
  }

  changeLang(lang: 'en' | 'es') {
    this.i18n.changeLocale(lang);
  }
}
