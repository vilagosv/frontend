import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Item } from './item';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<any>(environment.serverUrl + '/item', {
      responseType: 'json',
      withCredentials: true,
    });
  }

  addItem(item: Item) {
    return this.http.post(environment.serverUrl + '/item', item, {
      withCredentials: true,
      responseType: 'text',
    });
  }

  getUsers() {
    return this.http.get<any>(environment.serverUrl + '/user', {
      responseType: 'json',
      withCredentials: true,
    });
  }

  setUserAdmin(username: String) {
    return this.http.put(
      environment.serverUrl + '/user',
      { username: username, accessLevel: 'admin' },
      { withCredentials: true, responseType: 'text' }
    );
  }

  deleteUser(username: String) {
    return this.http.request('delete', environment.serverUrl + '/user', {
      body: { username: username },
      withCredentials: true,
      responseType: 'text',
    });
  }

  deleteItem(name: String) {
    return this.http.request('delete', environment.serverUrl + '/item', {
      body: { name: name },
      withCredentials: true,
      responseType: 'text',
    });
  }
}
