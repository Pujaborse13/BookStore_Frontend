import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpService) { }

  //user signup
  register(payload: any)
  {
    return this.http.postApi('/api/users', payload);
  }

  //user login
  login(payload: any)
  {
    return this.http.postApi('/api/users/login', payload);
  }
}
