import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  loginUser(loginDetails){
    return of('Success').pipe(delay(1000));
  }
  registerUser(userDetails){
    return of('Success').pipe(delay(1000));
  }
}
