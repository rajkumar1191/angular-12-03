import { Routes } from '@angular/router';
import { About } from './about/about';
import { PipesDemo } from './pipes/pipes';
import { FormsDemo } from './forms/forms';
import { SignalsDemo } from './signals/signals';
import { RxjsOperatorsDemo } from './rxjs-operators/rxjs-operators';
import { Service } from './service/service';
import { CounterComponent } from './counter/counter';
import { StateStrategyDemo } from './state-strategy-demo/state-strategy-demo';
import { DynamicHostComponent } from './dynamic/dynamic-host.component';
import { I18nDemoComponent } from './i18n/i18n-demo.component';
import { Test } from './test/test';
import { authGuard } from './auth-guard';
import { Login } from './login/login';
import { Parent } from './parent/parent';

export const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  {
    path: 'about',
    component: About,
    children: [
      {
        path: 'mission',
        component: Test,
      }
    ],
  },
  { path: 'pipes', component: PipesDemo, canActivate: [authGuard] },
  { path: 'pipes/:id', component: PipesDemo },
  { path: 'forms', component: FormsDemo },
  { path: 'component-communication', component: Parent },
  { path: 'signals', component: SignalsDemo },
  { path: 'rxjs', component: RxjsOperatorsDemo },
  { path: 'service', component: Service },
  { path: 'counter', component: CounterComponent },
  { path: 'state-strategy', component: StateStrategyDemo },
  { path: 'dynamic', component: DynamicHostComponent },
  { path: 'i18n', component: I18nDemoComponent },
  { path: 'login', component: Login },
  {
    path: 'lazy-feature',
    loadChildren: () =>
      import('./lazy-feature/lazy-feature.module').then((m) => m.LazyFeatureModule),
  },
  {
    path: 'lazy-feature',
    loadChildren: () =>
      import('./lazy-feature/lazy-feature.component').then((m) => m.LazyFeatureComponent),
  },
  { path: '**', redirectTo: 'about' },
];
