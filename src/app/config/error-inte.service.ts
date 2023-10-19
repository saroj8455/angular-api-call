import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorInteService implements HttpInterceptor {
  constructor(private http: HttpClient) {}

  greet() {
    return 'Hello World';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        retry(1),
        catchError((error:HttpErrorResponse)=>{
          let errorMessage="";
          if(error.error instanceof ErrorEvent) {
            errorMessage = `Error : ${error.error.message}`
          } else {
            errorMessage = `Error Code : ${error.status}\n Message:${error.message}`
          }
          console.log(errorMessage);
          alert(errorMessage)
          return throwError(errorMessage)
        })
      )
  }
}
