import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConversionPageComponent } from './conversion-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CurrencyConverterComponent } from '../../components/currency-converter/currency-converter.component';
import { CurrencyService } from 'src/app/services/currency.service';
import { HttpService } from 'src/app/services/http.service';

describe('ConversionPageComponent', () => {
  let component: ConversionPageComponent;
  let fixture: ComponentFixture<ConversionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ConversionPageComponent, CurrencyConverterComponent],
      providers: [CurrencyService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the CurrencyConverterComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-currency-converter')).toBeTruthy();
  });
});
