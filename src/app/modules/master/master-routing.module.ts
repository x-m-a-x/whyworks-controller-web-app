import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { LicenseOverviewComponent } from '../license-overview';
import { EBooksComponent } from '../e-books';

const masterRoutes: Routes = [
    {
        children: [
            {
                path: "Licenses",
                loadChildren: "../license-overview/license-overview.module#LicenseOverviewModule"
            },
            {
                path: "eBooks",
                loadChildren: "../e-books/e-books.module#EBooksModule"
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