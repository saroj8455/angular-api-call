import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, debounceTime, delay, distinctUntilChanged, of, switchMap, tap } from 'rxjs';

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
export class JsonplaceComponent implements OnInit,AfterContentInit,OnDestroy {
  private JSON_URI = 'https://jsonplaceholder.typicode.com/posts';

  posts: IPost[] = [];

  showDialog = false;
  selectedPost$!: Observable<IPost>;
  loading = false;
  // selectedPost!:any;

  postIds = of(1, 2, 3, 4, 5);
  postId = '';
  searchPost$!:Observable<IPost>;
  postIdChange: Subject<string> = new Subject<string>();
  inputSub!:Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<IPost[]>(this.JSON_URI).subscribe((resp) => {
      this.posts = resp;
    });

    this.getSelectPost();
  }

  ngAfterContentInit(): void {
    // Optional params to switch arrow function
    setTimeout(()=>{
      this.searchPost$  = this.postIdChange.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((v)=>{
          return  this.http.get<IPost>(`${this.JSON_URI}/${this.postId}`)
        })
      )
    },10)
    // Approach 1 Working
    // this.postIdChange.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged(),
    //   switchMap((v)=>{
    //     return this.http.get<IPost>(`${this.JSON_URI}/${this.postId}`)
    //   })
    // ).subscribe(resp=>{
    //   this.searchPost = resp;
    // })

  }

  singlePost(id: number) {
    this.loading = true;
    setTimeout(() => {
      this.selectedPost$ = this.http.get<IPost>(`${this.JSON_URI}/${id}`).pipe(
        switchMap((post) => this.getPost(id)),
        tap((value) => console.log(value))
      );
      this.loading = false;
      this.showDialog = true;
    }, 1000);

    // Approach 1
    // const po$ = this.http.get<IPost>(`${this.JSON_URI}/${id}`).pipe(
    //   switchMap((post) => this.getPost(id)),
    //   tap((value) => console.log(value))
    // );
    // po$.subscribe((resp)=>{
    //   this.selectedPost = resp
    // })
  }

  getPost(id: number) {
    return this.http.get<IPost>(`${this.JSON_URI}/${id}`);
  }

  getSelectPost() {
    // While working on switchMap must return an Observerable
    this.postIds
      .pipe(
        delay(1000),
        switchMap((id) => {
          const selectedPosts$ = this.http.get(`${this.JSON_URI}/${id}`);
          return selectedPosts$;
        }),
        tap((v) => console.log(v))
      )
      .subscribe();
  }

  onChangePostId(postId:string) {
    this.postIdChange.next(postId);
  }

  ngOnDestroy(): void {
      this.inputSub.unsubscribe();
  }
}
