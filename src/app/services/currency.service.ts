import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private http: HttpService) { }

  async getSymbols(): Promise<any> {
    return this.http.get(`/currency-symbols`).catch((error) => {
      this.handleError(error);
    });
  }

  async convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<any> {
    const body = { amount, fromCurrency, toCurrency };
    return this.http.post(`/currency-conversion`, body).catch((error) => {
      this.handleError(error);
    });
  }

  private async handleError(error: any): Promise<any> {
    console.log("🚀 ~ CurrencyService ~ handleError ~ error:", error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
    throw error;
  }
}
