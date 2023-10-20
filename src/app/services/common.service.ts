import { ICustomizeUser, ITodo, ITodos, IUserResp } from './../common/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  BASE_URL = "https://jsonplaceholder.typicode.com/users";
  BASE_TODOS="https://jsonplaceholder.typicode.com/todos";
  constructor(private http:HttpClient) { }


  getUsersfromJsonSrv() {
    return this.http.get<IUserResp[]>(this.BASE_URL);
  }

  getCustomizeUser() {
    // Return customize resp from API
    return this.http.get<IUserResp[]>(this.BASE_URL).pipe(
      map((users:IUserResp[])=>{
        let customUser:ICustomizeUser[];
        customUser =  users.map((u:IUserResp)=>({id:u.id,email:u.email,name:u.name,website:u.website}))
        return customUser as ICustomizeUser[];
      })
    )
  }

  getCustomizeUserWork() {
    // Return customize resp from API
    this.http.get<IUserResp[]>(this.BASE_URL).pipe(
      map((users:IUserResp[])=>{
        let customUser:ICustomizeUser[];
        customUser =  users.map((u:IUserResp)=>({id:u.id,email:u.email,name:u.name,website:u.website}))
        return customUser as ICustomizeUser[];
      })
    ).subscribe(resp=>{
      console.log(resp);
    })
  }

  getTodos() {
    return this.http.get<ITodos[]>(this.BASE_TODOS);
  }

  getTodosTitle() {
    return this.http.get<ITodos[]>(this.BASE_TODOS).pipe(
      map((todoLists: ITodos[]) => todoLists.map(t=>{
        return ({title:t.title,isComplete:t.completed} as ITodo)
      }))
    )
  }
  getTodosTitle1() {
    this.http.get<ITodos[]>(this.BASE_TODOS).pipe(
      map((todoLists: ITodos[]) => todoLists.map(t=>{
        return ({title:t.title,isComplete:t.completed} as ITodo)
      }))
    ).subscribe(resp=>{
      console.log(resp);
    })
  }

}
