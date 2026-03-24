import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyFeatureComponent } from './lazy-feature.component';

const routes: Routes = [{ path: '', component: LazyFeatureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), LazyFeatureComponent],
  exports: [RouterModule],
})
export class LazyFeatureModule {}
