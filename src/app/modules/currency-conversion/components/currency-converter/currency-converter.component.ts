import { Component, OnInit } from '@angular/core';
import { ConversionResponse } from 'src/app/models/conversion-response.model';
import { CurrencyService } from 'src/app/services/currency.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  symbols: { [key: string]: string } = {};
  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  conversionResponse: ConversionResponse = {} as ConversionResponse;

  loader: boolean = false;

  constructor(private currencyService: CurrencyService) { }

  async ngOnInit(): Promise<void> {
  }

  async ngAfterViewInit(): Promise<void> {
    await this.loanSymbols();
  }

  async loanSymbols(): Promise<void> {
    this.symbols = await this.currencyService.getSymbols();
  };

  async convert(): Promise<void> {
    if (this.amount && this.fromCurrency && this.toCurrency) {
      this.loader = true;
      const data: ConversionResponse = await this.currencyService.convertCurrency(this.amount, this.fromCurrency, this.toCurrency);
      data.convertedAmount = data.convertedAmount;
      this.conversionResponse = data;
      this.loader = false;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please fill all fields!',
      });
    }
  }
}
