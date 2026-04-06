import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

type Locale = 'en' | 'es';

const translations: Record<Locale, Record<string, string>> = {
  en: {
    title: 'Internationalization Demo',
    greeting: 'Hello',
    instruction: 'Select a language to change labels',
  },
  es: {
    title: 'Demostración de Internacionalización',
    greeting: 'Hola',
    instruction: 'Seleccione un idioma para cambiar etiquetas',
  },
};

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  locale = signal<Locale>('en');

  changeLocale(locale: Locale) {
    this.locale.set(locale);
  }

  translate(key: string): string {
    return translations[this.locale()]?.[key] ?? key;
  }
}
