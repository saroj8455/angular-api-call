import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  BASE_URL = "https://jsonplaceholder.typicode.com/usersqw";
  constructor(private http:HttpClient) { }


  getUsersfromJsonSrv() {
    return this.http.get<any>(this.BASE_URL);
  }


}
