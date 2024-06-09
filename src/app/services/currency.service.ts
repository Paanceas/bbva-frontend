import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpService) { }

  async getSymbols(): Promise<any> {
    return this.http.get(`/currency-symbols`);
  }

  async convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<any> {
    const body = { amount, fromCurrency, toCurrency };
    return this.http.post(`/currency-conversion`, body);
  }
}
