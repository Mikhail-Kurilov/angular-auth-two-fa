import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'http://192.168.1.145:88/';
  // private apiUrlReg = 'http://192.168.1.145:88/reg';
  // private apiUrlLog = 'http://192.168.1.145:88/login';
  private apiUrl = 'http://localhost:4200/api/';
  private apiUrlReg = 'http://localhost:4200/api/reg';
  private apiUrlLog = 'http://localhost:4200/api/login';
   
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '*', 
      'Strict-Origin-When-Cross-Origin': '*',
      'Origin': '*'
    }),
  };

  constructor(private http: HttpClient) { }

  // postUserLog (user: User): Observable<any> {
  //   return this.http.post('http://192.168.1.147:88/login', user)
  // }

  // postUserReg(user: User): Observable<any> {
  //   return this.http.post('http://192.168.1.147:88/reg', user)
  // }

  // private log(message: string) {
  //   this.messageService.add(`HeroService: ${message}`);
  // }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     console.error(error); // log to console instead

  //     this.log(`${operation} failed: ${error.message}`);

  //     return of(result as T);
  //   };
  // }

  // addUser(user: User): Observable<User> {
  //   return this.http.post<User>(this.Url, user, this.httpOptions).pipe(
  //     tap((newUser: User) => this.log(`added hero w/ id=${newUser.id}`)),
  //     catchError(this.handleError<User>('addUser'))
  //   );
  // }

  getAll() {
    return this.http.get(this.apiUrl);
  }

  getByCode(code: any) {
    return this.http.get(this.apiUrlLog);
  }

  proceedRegister(inputData: any) {
    return this.http.post(this.apiUrlReg, inputData, this.httpOptions);
  }

  proceedLogin(inputData: any) {
    return this.http.post(this.apiUrlLog, inputData, this.httpOptions);
  }

  updateUser(code: any, inputData: any) {
    return this.http.post(this.apiUrl + '/' + code, inputData);
  }

  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  getUserRole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }
}
