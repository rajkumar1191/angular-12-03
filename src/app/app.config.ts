import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { counterReducer } from './counter/counter';
import { formDataReducer } from './store/form-data.reducer';
import { HttpLoggerInterceptor } from './services/http-logger.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
  ],
};

