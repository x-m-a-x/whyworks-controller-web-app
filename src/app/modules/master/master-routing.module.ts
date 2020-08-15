import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { LicenseOverviewComponent } from '../license-overview';
import { EBooksComponent } from '../e-books';
import { LicenseDetailComponent } from '../license-detail';
import { EBooksCategoriesComponent } from '../e-books-categories';

const masterRoutes: Routes = [
    {
        children: [
            {
                path: "Licenses",
                loadChildren: "../license-overview/license-overview.module#LicenseOverviewModule"
            },
            {
                path: "eBooks/:category",
                loadChildren: "../e-books/e-books.module#EBooksModule"
            },
            {
                path: "eBooksCategories",
                loadChildren: "../e-books-categories/e-books-categories.module#EBooksCategoriesModule"
            },
            {
                path: "LicenseDetails/:licenseId",
                loadChildren: "../license-detail/license-detail.module#LicenseDetailModule"
            },
        ],
        path: "",
        component: MasterComponent
    }];


@NgModule({
    imports: [RouterModule.forChild(masterRoutes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }