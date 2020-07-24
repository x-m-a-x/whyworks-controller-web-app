import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseOverviewComponent } from './license-overview.component';


const licenseOverviewRoutes: Routes = [
    {

        path: "",
        component: LicenseOverviewComponent
    }];


@NgModule({
    imports: [RouterModule.forChild(licenseOverviewRoutes)],
    exports: [RouterModule]
})
export class LicenseOverviewRoutingModule { }