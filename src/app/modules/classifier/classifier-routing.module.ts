import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassifierComponent } from './classifier.component';


const classifierRoutes: Routes = [
    {

        path: "",
        component: ClassifierComponent
    }];


@NgModule({
    imports: [RouterModule.forChild(classifierRoutes)],
    exports: [RouterModule]
})
export class ClassifierRoutingModule { }