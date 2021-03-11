import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OmtItemComponent } from './omt-item.component';


const omtItemRoutes: Routes = [
    {

        path: "",
        component: OmtItemComponent
    }];


@NgModule({
    imports: [RouterModule.forChild(omtItemRoutes)],
    exports: [RouterModule]
})
export class OmtItemRoutingModule { }