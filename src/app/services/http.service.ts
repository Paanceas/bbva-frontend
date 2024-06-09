import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

type ResponseData<T> = T[] | T | null;

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) { }

  private getDefaultHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return headers;
  }

  handle<T>(response: any, ifOnlyOne?: boolean): ResponseData<T> {
    try {
      const state = response['estado'];
      const message = response['mensaje'];
      const data = response['datos'];

      if (Array.isArray(data)) {
        return this.handleArrayData<T>(data, ifOnlyOne);
      }
      if (state === 200) {
        return this.handleSingleData<T>(data, ifOnlyOne);
      } else {
        console.error(`Error: ${message}`);
        return null;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error de conexión: ${error.message}`);
      } else {
        console.error('Error desconocido');
      }
      return null;
    }
  }

  private handleArrayData<T>(data: any[], ifOnlyOne?: boolean): T[] | T | null {
    let dataUpdated = data;
    if (ifOnlyOne) {
      return dataUpdated.length > 0 ? <T>dataUpdated[0] : null;
    }
    return dataUpdated.flat() as T[];
  }

  private handleSingleData<T>(data: any, ifOnlyOne?: boolean): T[] | T | null {
    const dataUpdated = data;
    if (ifOnlyOne) {
      return <T>dataUpdated;
    }
    return <T[]>[dataUpdated];
  }

  private removeUnderscoreAttributes(data: any): any {
    if (Array.isArray(data)) {
      return data.map(item => this.removeUnderscoreAttributes(item));
    } else if (typeof data === 'object' && data !== null) {
      const newData: any = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (!key.startsWith('_')) {
            newData[key] = this.removeUnderscoreAttributes(data[key]);
          }
        }
      }
      return newData;
    } else {
      return data;
    }
  }

  async get<T>(url: string, customHeaders?: HttpHeaders): Promise<T> {
    const headers = customHeaders ?? this.getDefaultHeaders();
    const response: any = await firstValueFrom(
      this.http.get<any>(environment.baseUrl + url, {
        headers,
      }).pipe(
        retry(2)
      )
    );
    return response as T;
  }

  async delete<T>(url: string, customHeaders?: HttpHeaders): Promise<T> {
    const headers = customHeaders ?? this.getDefaultHeaders();
    const response: any = await firstValueFrom(
      this.http.delete<any>(environment.baseUrl + url, {
        headers,
      })
    );
    return response as T;
  }

  async post<T>(url: string, data: any, customHeaders?: HttpHeaders): Promise<T> {
    const headers = customHeaders ?? this.getDefaultHeaders();
    return await firstValueFrom(this.http.post<T>(environment.baseUrl + url, data, { headers }));
  }

  async put<T>(url: string, data: any, customHeaders?: HttpHeaders): Promise<T> {
    const headers = customHeaders ?? this.getDefaultHeaders();
    return await firstValueFrom(this.http.put<T>(environment.baseUrl + url, data, { headers }));
  }
}
