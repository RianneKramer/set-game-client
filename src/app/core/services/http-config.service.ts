import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpConfigService {
  private apiUrl = 'http://localhost:5001/api/';
  private http = inject(HttpClient);

  get<T>(endpoint: string) {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`);
  }

  post<T>(endpoint: string, data: any) {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data);
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`);
  }

  patch<T>(endpoint: string, data: any) {
    return this.http.patch<T>(`${this.apiUrl}${endpoint}`, data);
  }
}
