import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversionPageComponent } from './pages/conversion-page/conversion-page.component';
import { CurrencyConversionRoutingModule } from './currency-conversion-routing.module';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';

@NgModule({
  declarations: [
    ConversionPageComponent,
    CurrencyConverterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CurrencyConversionRoutingModule
  ]
})
export class CurrencyConversionModule { }
