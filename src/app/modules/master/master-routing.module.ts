import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { LicenseOverviewComponent } from '../license-overview';
import { EBooksComponent } from '../e-books';
import { LicenseDetailComponent } from '../license-detail';
import { EBooksCategoriesComponent } from '../e-books-categories';
import { AccountComponent } from '../account';
import { ClassifierComponent } from '../classifier';
import { AdditionalFieldsComponent } from '../additional-fields';
import { TestComponent } from '../test';
import { EBookComponent } from '../e-book';


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
                path: "AdditionalFields/:licenseId",
                loadChildren: "../additional-fields/additional-fields.module#AdditionalFieldsModule"
            },
            {
                path: "Account",
                loadChildren: "../account/account.module#AccountModule"
            },
            {
                path: "Classifier",
                loadChildren: "../classifier/classifier.module#ClassifierModule"
            },
            {
                path: "Test/:testId",
                loadChildren: "../test/test.module#TestModule"
            },
            {
                path: "EBook/:testId",
                loadChildren: "../e-book/e-book.module#EBookModule"
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