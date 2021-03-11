import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test.component';


const testRoutes: Routes = [
    {

        path: "",
        component: TestComponent
    }];


@NgModule({
    imports: [RouterModule.forChild(testRoutes)],
    exports: [RouterModule]
})
export class TestRoutingModule { }