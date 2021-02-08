import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdditionalFieldsComponent } from './additional-fields.component';


const additionalFieldsRoutes: Routes = [
    {

        path: "",
        component: AdditionalFieldsComponent
    }];


@NgModule({
    imports: [RouterModule.forChild(additionalFieldsRoutes)],
    exports: [RouterModule]
})
export class AdditionalFieldsRoutingModule { }