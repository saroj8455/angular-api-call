import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, take, tap } from 'rxjs';
import { ILiberary, SearchCdnService } from 'src/app/services/search-cdn.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit,AfterViewInit{

  myForm: FormGroup;
  libraryItems:ILiberary[]=[];
  resultCount = 0;
  avilableCount=0;

  constructor(private searchCDN:SearchCdnService) {
    this.myForm = new FormGroup({
      myInput: new FormControl(''),
      avilableCount: new FormControl('')
    });
  }

  ngOnInit(): void {
      this.searchCDN.searchEntries("react").subscribe(resp=>{
        // console.log(resp.total);
        // console.log(resp.available);
        // console.log(resp.results);
        this.libraryItems = resp.results;
      })
  }

  ngAfterViewInit(): void {
      this.myForm.get("myInput")?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(()=>{
          return this.searchCDN.searchEntries(this.myForm.get("myInput")?.value)
        }),
        tap(v=>console.log(v)
        )
      ).subscribe(resp=>{
        this.resultCount = resp.total;
        this.libraryItems = resp.results;
        this.myForm.get("avilableCount")?.setValue(resp.available)

      })

  }

  onSubmit() {
    const inputValue = this.myForm.get('myInput')?.value;
    // Do something with the form data, such as sending it to a server or performing some action.
  }


}
