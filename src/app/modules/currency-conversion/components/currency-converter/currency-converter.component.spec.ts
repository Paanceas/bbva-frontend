import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrencyConverterComponent } from './currency-converter.component';
import { CurrencyService } from 'src/app/services/currency.service';
import { HttpService } from 'src/app/services/http.service';
import { By } from '@angular/platform-browser';
import Swal from 'sweetalert2';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;
  let currencyService: jasmine.SpyObj<CurrencyService>;

  beforeEach(async () => {
    const currencyServiceSpy = jasmine.createSpyObj('CurrencyService', ['getSymbols', 'convertCurrency']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [CurrencyConverterComponent],
      providers: [
        { provide: CurrencyService, useValue: currencyServiceSpy },
        HttpService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService) as jasmine.SpyObj<CurrencyService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load symbols on init', async () => {
    const mockSymbols = { USD: 'United States Dollar', EUR: 'Euro' };
    currencyService.getSymbols.and.returnValue(Promise.resolve(mockSymbols));

    await component.loanSymbols();

    expect(component.symbols).toEqual(mockSymbols);
  });

  it('should show warning if fields are not filled', async () => {
    spyOn(Swal, 'fire');
    component.amount = 0;
    await component.convert();
    expect(Swal.fire).toHaveBeenCalled();
  });

  it('should call convertCurrency and update conversionResponse on convert', async () => {
    const mockResponse = {
      conversionDate: '2024-06-09',
      conversionRate: 0.92,
      originalAmount: 100,
      convertedAmount: 92
    };
    component.amount = 100;
    component.fromCurrency = 'USD';
    component.toCurrency = 'EUR';

    currencyService.convertCurrency.and.returnValue(Promise.resolve(mockResponse));

    await component.convert();

    expect(currencyService.convertCurrency).toHaveBeenCalledWith(100, 'USD', 'EUR');
    expect(component.conversionResponse).toEqual(mockResponse);
  });

  it('should display the converted amount correctly', async () => {
    const mockResponse = {
      conversionDate: '2024-06-09',
      conversionRate: 0.92,
      originalAmount: 100,
      convertedAmount: 92
    };
    component.amount = 100;
    component.fromCurrency = 'USD';
    component.toCurrency = 'EUR';

    currencyService.convertCurrency.and.returnValue(Promise.resolve(mockResponse));
    await component.convert();

    fixture.detectChanges();

    const convertedAmount = fixture.debugElement.query(By.css('.alert-success'));
    expect(convertedAmount.nativeElement.textContent).toContain('92');
  });
});
