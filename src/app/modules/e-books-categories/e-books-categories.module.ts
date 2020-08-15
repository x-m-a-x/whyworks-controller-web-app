import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EBookstCategoriesRoutingModule } from './e-books-categories-routing.module';
import { EBooksCategoriesComponent } from './e-books-categories.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        EBooksCategoriesComponent
    ],
    imports: [
        CommonModule,
        EBookstCategoriesRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatRippleModule,
        MatGridListModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [

    ]
})

export class EBooksCategoriesModule { }