import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ISearchCDNResp {
  available:number;
  total:number;
  results:ILiberary[]
}

export interface ILiberary {
  latest:string;
  name:string;
}


@Injectable({
  providedIn: 'root'
})
export class SearchCdnService {

  baseURL = "https://api.cdnjs.com/libraries"
  queryURL = "?search="

  constructor(private http:HttpClient) { }

  searchEntries(term:string) {
    return this.http.get<ISearchCDNResp>(`${this.baseURL}${this.queryURL}${term}`);
  }


}
