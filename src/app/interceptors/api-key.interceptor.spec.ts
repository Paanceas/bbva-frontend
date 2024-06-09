import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiKeyInterceptor } from './api-key.interceptor';
import { of } from 'rxjs';

describe('ApiKeyInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add an api-key header', () => {
    const dummyUrl = '/test';
    httpClient.get(dummyUrl).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(dummyUrl);
    expect(req.request.headers.has('api-key')).toEqual(true);
    expect(req.request.headers.get('api-key')).toEqual(environment.apiKey);
    req.flush({});
  });

  it('should pass through if no api-key is set', () => {
    const dummyUrl = '/test';
    const request = new HttpRequest('GET', dummyUrl);
    const next: HttpHandler = {
      handle: jasmine.createSpy('handle').and.callFake((req: HttpRequest<any>) => {
        return of({} as HttpEvent<any>);
      })
    };

    const interceptor = new ApiKeyInterceptor();
    interceptor.intercept(request, next).subscribe(response => {
      expect(response).toBeTruthy();
    });

    expect(next.handle).toHaveBeenCalledWith(jasmine.objectContaining({ headers: jasmine.anything() }));
  });
});
