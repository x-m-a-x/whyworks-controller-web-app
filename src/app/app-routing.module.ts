import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './modules/master';
import { LoginComponent } from './modules/login';
import { AuthGuard } from './helpers';

const routes: Routes = [
  {
    path: "",
    loadChildren: "./modules/master/master.module#MasterModule"
  },
  {
    path: "login",
    loadChildren: "./modules/login/login.module#LoginModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
