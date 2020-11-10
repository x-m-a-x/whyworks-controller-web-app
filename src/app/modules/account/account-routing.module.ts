import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';


const accountRoutes: Routes = [
    {

        path: "",
        component: AccountComponent
    }];


@NgModule({
    imports: [RouterModule.forChild(accountRoutes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }