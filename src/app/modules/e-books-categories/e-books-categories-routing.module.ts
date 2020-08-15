import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EBooksCategoriesComponent } from './e-books-categories.component';


const ebooksCategoriessRoutes: Routes = [
    {
        path: "",
        component: EBooksCategoriesComponent
    }];


@NgModule({
    imports: [RouterModule.forChild(ebooksCategoriessRoutes)],
    exports: [RouterModule]
})
export class EBookstCategoriesRoutingModule { }