import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

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
  convertedAmount: number | null = null;

  constructor(private currencyService: CurrencyService) { }

  async ngOnInit(): Promise<void> {
    await this.loanSymbols();
  }

  async loanSymbols(): Promise<void> {
    this.symbols = await this.currencyService.getSymbols();
  };

  async convert(): Promise<void> {
    if (this.amount && this.fromCurrency && this.toCurrency) {
      const data = await this.currencyService.convertCurrency(this.amount, this.fromCurrency, this.toCurrency);
      this.convertedAmount = data.convertedAmount;
    }
  }
}
