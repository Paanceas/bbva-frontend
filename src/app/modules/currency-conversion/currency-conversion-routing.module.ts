import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversionPageComponent } from './pages/conversion-page/conversion-page.component';

const routes: Routes = [
  { path: '', component: ConversionPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyConversionRoutingModule { }
