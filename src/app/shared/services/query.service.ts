import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(private http: HttpClient) {}

  private _url = environment.baseUrl;

  private createDataQuery = (data: any) => {
    const formData = new FormData();
    formData.append('body', JSON.stringify(data));
  };

  post = (endpoint: string, data: any) => {
    return this.http.post(
      this._url + '/' + endpoint,
      this.createDataQuery(data),
      { responseType: 'json' }
    );
  };

  get = (
    endpoint: string,
    queryParams: string,
    options: any
  ): Observable<any> => {
    queryParams = queryParams ? `?${queryParams}` : '';
    return this.http.get(`${this._url}/${endpoint}${queryParams}`, {
      ...options,
      responseType: 'json',
    });
  };

  test = () => {
    return this.http.get('http://localhost:3000', { responseType: 'text' });
  };
}
