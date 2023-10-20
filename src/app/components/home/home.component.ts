import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { ICustomizeUser, ITodo, ITodos } from 'src/app/common/common';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  todos: ITodos[] = [];

  customTodos$ = this.common.getTodosTitle();

  customTodos1:ITodo[]=[];
  todoTitle="";

  constructor(private common: CommonService) {}

  ngOnInit(): void {
    this.common.getUsersfromJsonSrv().subscribe((resp) => {
      console.log(resp);
    });

    // log customize resp
    this.common.getCustomizeUser().subscribe((resp: ICustomizeUser[]) => {
      console.log(resp);
    });

    this.common.getTodos().pipe(
      retry(1),
      catchError(this.handelError)
    ).subscribe(resp=>{
     this.todos = resp;

    })

    this.common.getTodosTitle().subscribe((resp)=>{
      this.customTodos1 = resp;
    })
  }


  searchTodos() {
    if (!this.todoTitle) {
      alert("Please enter title of todos.")
      return;
    }

    const filterList = this.todos.filter((t)=>{
      return t.title.toLowerCase().includes(this.todoTitle.toLowerCase());
    })
    this.todos = filterList;
  }

  private handelError(error:HttpErrorResponse){
    let errorMessage = `An error occured: ${error.message}`;
    console.log(error);
    return throwError(()=>{
      return errorMessage;
    })
  }
}
