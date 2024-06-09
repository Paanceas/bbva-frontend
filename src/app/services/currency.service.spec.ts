import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';
import { HttpService } from './http.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('CurrencyService', () => {
  let currencyService: CurrencyService;
  let httpService: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService, HttpService],
    });

    currencyService = TestBed.inject(CurrencyService);
    httpService = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(currencyService).toBeTruthy();
  });

  describe('getSymbols', () => {
    it('should call http.get with correct URL on success', async () => {
      const expectedUrl = '/currency-symbols';
      const mockSymbols = { data: ['USD', 'EUR', 'JPY'] }; // Example response data

      spyOn(httpService, 'get').and.returnValue(Promise.resolve(mockSymbols));

      const symbols = await currencyService.getSymbols();

      expect(httpService.get).toHaveBeenCalledWith(expectedUrl);
      expect(symbols).toEqual(mockSymbols);
    });

    it('should handle errors from http.get', async () => {
      const expectedError = new HttpErrorResponse({ status: 500 });
      spyOn(httpService, 'get').and.returnValue(Promise.reject(expectedError));

      try {
        await currencyService.getSymbols();
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('convertCurrency', () => {
    it('should call http.post with correct URL and body on success', async () => {
      const amount = 100;
      const fromCurrency = 'USD';
      const toCurrency = 'EUR';
      const expectedUrl = '/currency-conversion';
      const expectedBody = { amount, fromCurrency, toCurrency };
      const mockConversionData = { amount: 92.34, currency: 'EUR' }; // Example response data

      spyOn(httpService, 'post').and.returnValue(Promise.resolve(mockConversionData));

      const conversionData = await currencyService.convertCurrency(amount, fromCurrency, toCurrency);

      expect(httpService.post).toHaveBeenCalledWith(expectedUrl, expectedBody);
      expect(conversionData).toEqual(mockConversionData);
    });

    it('should handle errors from http.post', async () => {
      const amount = 100;
      const fromCurrency = 'USD';
      const toCurrency = 'EUR';
      const expectedError = new HttpErrorResponse({ status: 400 });
      spyOn(httpService, 'post').and.returnValue(Promise.reject(expectedError));

      try {
        await currencyService.convertCurrency(amount, fromCurrency, toCurrency);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
