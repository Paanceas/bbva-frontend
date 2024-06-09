import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bbva-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('bbva-frontend');
  });

  it('should render navbar brand with BBVA Logo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('a.navbar-brand img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('assets/bbva-logo.png');
    expect(img.alt).toBe('BBVA Logo');
  });

  it('should render Currency Converter link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a.nav-link');
    expect(link).toBeTruthy();
    expect(link?.textContent).toContain('Currency Converter');
  });
});
