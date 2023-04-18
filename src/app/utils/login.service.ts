import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(
      environment.serverUrl + '/login',
      {
        username: username,
        password: password,
      },
      { responseType: 'text' }
    );
  }

  logout() {
    return this.http.post(
      environment.serverUrl + '/logout',
      {},
      { withCredentials: true, responseType: 'text' }
    );
  }

  register(username: string, password: string, email: string) {
    return this.http.post(
      environment.serverUrl + '/user',
      {
        username: username,
        password: password,
        email: email,
      },
      { responseType: 'text' }
    );
  }
}
