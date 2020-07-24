import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EBooksComponent } from './e-books.component';


const eBooksRoutes: Routes = [
    {

        path: "",
        component: EBooksComponent
    }];


@NgModule({
    imports: [RouterModule.forChild(eBooksRoutes)],
    exports: [RouterModule]
})
export class EBooksRoutingModule { }