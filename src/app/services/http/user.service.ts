import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable'
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class UserService {
  baseUrl = 'http://127.0.0.1:3333/api/';

  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user: any): Observable<any> {
    return this.request('post', 'login', user)
  }

  logout() {
    this.cookies.delete('token')
    this.request('get', 'logout')
  }

  signup(user: any): Observable<any> {
    return this.request('post', 'signup', user)
  }

  setToken(token: string) {
    this.cookies.set('token', token)
  }

  getToken() {
    return this.cookies.get('token')
  }

  hasToken(): boolean {
    var token = this.cookies.get('token');

    if (token == null || token == '') {
      return false
    }

    return true
  }

  private request(method: string, route: string, body?: undefined)
  : Observable<any> {
    let fullUrl = this.baseUrl + route

    switch (method) {
      case 'get': {
        return this.http.get(fullUrl)
      }
      case 'post': {
        return this.http.post(fullUrl, body)
      }
      default: {
        return this.http.get(fullUrl)
      }
    }
  }
}
