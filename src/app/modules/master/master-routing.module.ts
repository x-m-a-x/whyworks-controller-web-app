import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { LicenseOverviewComponent } from '../license-overview';
import { EBooksComponent } from '../e-books';
import { LicenseDetailComponent } from '../license-detail';
import { EBooksCategoriesComponent } from '../e-books-categories';
import { AccountComponent } from '../account';
import { ClassifierComponent } from '../classifier';


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
            {
                path: "Account",
                loadChildren: "../account/account.module#AccountModule"
            },
            {
                path: "Classifier",
                loadChildren: "../classifier/classifier.module#ClassifierModule"
            }
        ],
        path: "",
        component: MasterComponent
    }];


@NgModule({
    imports: [RouterModule.forChild(masterRoutes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }