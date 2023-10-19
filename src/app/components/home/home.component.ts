import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

constructor(private common:CommonService) {

}

ngOnInit(): void {
    this.common.getUsersfromJsonSrv().subscribe(resp=>{
      console.log(resp);
    })
}
}
