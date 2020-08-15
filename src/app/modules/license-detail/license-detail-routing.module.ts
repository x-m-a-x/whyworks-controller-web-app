import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseDetailComponent } from './license-detail.component';


const licenseDetailRoutes: Routes = [
    {

        path: "",
        component: LicenseDetailComponent
    }];


@NgModule({
    imports: [RouterModule.forChild(licenseDetailRoutes)],
    exports: [RouterModule]
})
export class LicenseDetailRoutingModule { }