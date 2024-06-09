import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDefaultHeaders', () => {
    it('should return default headers', () => {
      const headers = service['getDefaultHeaders']();
      expect(headers.get('Content-Type')).toBe('application/json');
    });
  });

  describe('handle', () => {
    it('should handle response correctly for single data', () => {
      const mockResponse = {
        estado: 200,
        mensaje: 'Success',
        datos: { key: 'value' },
      };

      const result = service.handle<{ key: string }>(mockResponse);
      expect(result).toEqual([{ key: 'value' }]);
    });

    it('should handle response correctly for array data', () => {
      const mockResponse = {
        estado: 200,
        mensaje: 'Success',
        datos: [{ key: 'value' }],
      };

      const result = service.handle<{ key: string }>(mockResponse);
      expect(result).toEqual([{ key: 'value' }]);
    });

    it('should handle error response correctly', () => {
      const mockResponse = {
        estado: 400,
        mensaje: 'Error',
        datos: null,
      };

      const result = service.handle<{ key: string }>(mockResponse);
      expect(result).toBeNull();
    });

    it('should handle unknown error correctly', () => {
      const result = service.handle<{ key: string }>(null);
      expect(result).toBeNull();
    });
  });

  describe('handleArrayData', () => {
    it('should return first element if only one is requested', () => {
      const data = [{ key: 'value' }, { key: 'value2' }];
      const result = service['handleArrayData']<{ key: string }>(data, true);
      expect(result).toEqual({ key: 'value' });
    });

    it('should return entire array if not single requested', () => {
      const data = [{ key: 'value' }, { key: 'value2' }];
      const result = service['handleArrayData']<{ key: string }>(data, false);
      expect(result).toEqual([{ key: 'value' }, { key: 'value2' }]);
    });
  });

  describe('handleSingleData', () => {
    it('should return single data wrapped in array if not single requested', () => {
      const data = { key: 'value' };
      const result = service['handleSingleData']<{ key: string }>(data, false);
      expect(result).toEqual([{ key: 'value' }]);
    });

    it('should return single data if single requested', () => {
      const data = { key: 'value' };
      const result = service['handleSingleData']<{ key: string }>(data, true);
      expect(result).toEqual({ key: 'value' });
    });
  });

  describe('removeUnderscoreAttributes', () => {
    it('should remove underscore attributes from object', () => {
      const data = { key: 'value', _private: 'secret' };
      const result = service['removeUnderscoreAttributes'](data);
      expect(result).toEqual({ key: 'value' });
    });

    it('should remove underscore attributes from array of objects', () => {
      const data = [{ key: 'value', _private: 'secret' }];
      const result = service['removeUnderscoreAttributes'](data);
      expect(result).toEqual([{ key: 'value' }]);
    });
  });

  describe('get method', () => {
    it('should perform GET request', async () => {
      const mockData = { key: 'value' };
      const url = '/test';

      service.get<any>(url).then((response) => {
        expect(response).toEqual(mockData);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}${url}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('should retry the request twice if it fails', async () => {
      const url = '/test';

      service.get<any>(url).catch((error) => {
        expect(error.status).toBe(500);
      });

      for (let i = 0; i < 3; i++) {
        const req = httpMock.expectOne(`${environment.baseUrl}${url}`);
        req.flush({}, { status: 500, statusText: 'Internal Server Error' });
      }
    });
  });

  describe('post method', () => {
    it('should perform POST request', async () => {
      const mockData = { key: 'value' };
      const url = '/test';
      const postData = { data: 'test' };

      service.post<any>(url, postData).then((response) => {
        expect(response).toEqual(mockData);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}${url}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(postData);
      req.flush(mockData);
    });
  });

  describe('put method', () => {
    it('should perform PUT request', async () => {
      const mockData = { key: 'value' };
      const url = '/test';
      const putData = { data: 'test' };

      service.put<any>(url, putData).then((response) => {
        expect(response).toEqual(mockData);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}${url}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(putData);
      req.flush(mockData);
    });
  });

  describe('delete method', () => {
    it('should perform DELETE request', async () => {
      const mockData = { key: 'value' };
      const url = '/test';

      service.delete<any>(url).then((response) => {
        expect(response).toEqual(mockData);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}${url}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockData);
    });
  });
});
