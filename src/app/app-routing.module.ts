import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ErrorComponent } from './components/error/error.component';
import { PostofficeComponent } from './components/postoffice/postoffice.component';
import { JsonplaceComponent } from './components/jsonplace/jsonplace.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"about",component:AboutComponent},
  {path:"postoffice",component:PostofficeComponent},
  {path:"json-p",component:JsonplaceComponent},
  {path:"user",loadChildren:()=>import("./user/user.module").then(u=>u.UserModule)},
  {path:"admin",loadChildren:()=>import("./admin/admin.module").then(a=>a.AdminModule)},
  {path:"**",component:ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
