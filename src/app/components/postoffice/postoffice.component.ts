import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

export interface IPostOfficeResp {
  Message: string;
  Status: string;
  PostOffice: PostOffice[];
}

export interface PostOffice {
  Name: string;
  Description: any;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  State: string;
  Country: string;
  Pincode: string;
}

@Component({
  selector: 'app-postoffice',
  templateUrl: './postoffice.component.html',
  styleUrls: ['./postoffice.component.css'],
})
export class PostofficeComponent implements OnInit,OnDestroy,AfterContentInit {
  POSTAL_API = 'https://api.postalpincode.in/postoffice/Balangir';
  city = '';

  balangirPostOffice:PostOffice[]=[];

  // Define Subscription

  cityChanged: Subject<string> = new Subject<string>()
  inputSub!:Subscription;

  constructor(private common: CommonService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getPostOffice("Hi").subscribe(resp=>{
      this.balangirPostOffice = resp
    })

    // Implement debounce time
    this.http.get(this.POSTAL_API).pipe(
      debounceTime(1000),
      tap((data)=>{console.log('Debounced Data', data)}),
      switchMap((data:any)=>{
        console.log(data);
        return this.http.get(this.POSTAL_API)
      })
    )
  }

  ngAfterContentInit(): void {
    // timer 500 milisecond
      this.inputSub = this.cityChanged.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((data:any)=>{
          return this.http.get<IPostOfficeResp>(this.POSTAL_API)
        })
      ).subscribe(city=>{
        console.log(city);

      })
  }

  searchPostOffice() {
    const test = this.city.trim();
    console.log(test.length);

    if(!this.city.trim()) {
      alert("City can't be empty.")
      return;
    }
    this.getPostOffice(this.city.trim()).subscribe(resp=>{
      this.balangirPostOffice = resp
    })
  }

  // onKeyup search
  searchOnChange() {
     this.http
    .get<IPostOfficeResp[]>(this.POSTAL_API)
    .pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      map((IPR) => IPR[0]),
      map((P) => {
        return this.balangirPostOffice = P.PostOffice
      }),
      map(ofc=>{
        return ofc.filter(x=>x.Name.toLowerCase().includes(this.city.toLowerCase()))
      }),
      tap((P) => {
        console.log(P);
      })
    ).subscribe()

  }

  getPostOffice(cityName:string) {
    return this.http
      .get<IPostOfficeResp[]>(this.POSTAL_API)
      .pipe(
        map((IPR) => IPR[0]),
        map((P) => {
          return this.balangirPostOffice = P.PostOffice
        }),
        map(ofc=>{
          return ofc.filter(x=>x.Name.toLowerCase().includes(cityName.toLowerCase()))
        }),
        tap((P) => {
          console.log(P);
        })
      )
  }
  // Customize the post office response and return only Office Array
  getPostOffice1() {
    return this.http
      .get<IPostOfficeResp[]>(this.POSTAL_API)
      .pipe(
        map((IPR) => IPR[0]),
        map((P) => {
          return this.balangirPostOffice = P.PostOffice
        }),
        tap((P) => {
          console.log(P);
        })
      )
  }

  onChangeInput(city:string) {
    this.cityChanged.next(city)
  }

  ngOnDestroy(): void {
      this.inputSub.unsubscribe()
  }

}
