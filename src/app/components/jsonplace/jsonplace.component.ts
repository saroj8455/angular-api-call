import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-jsonplace',
  templateUrl: './jsonplace.component.html',
  styleUrls: ['./jsonplace.component.css'],
})
export class JsonplaceComponent implements OnInit {
  private JSON_URI = 'https://jsonplaceholder.typicode.com/posts';

  posts: IPost[] = [];

  showDialog=false;
  // selectedPost$!:Observable<IPost>
  selectedPost!:any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<IPost[]>(this.JSON_URI).subscribe((resp) => {
      this.posts = resp;
    });
  }

  singlePost(id: number) {
    const po$ = this.http.get<IPost[]>(this.JSON_URI).pipe(
      switchMap((posts) => this.getPost(id)),
      tap((value) => console.log(value))
    );
    po$.subscribe((resp)=>{
      this.selectedPost = resp
    })
    this.showDialog = true;
  }

  getPost(id: number) {
    return this.http.get(`${this.JSON_URI}/${id}`);
  }
}
