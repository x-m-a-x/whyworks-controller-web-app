import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EBookComponent } from './e-book.component';


const eBookRoutes: Routes = [
    {

        path: "",
        component: EBookComponent
    }];


@NgModule({
    imports: [RouterModule.forChild(eBookRoutes)],
    exports: [RouterModule]
})
export class EBookRoutingModule { }