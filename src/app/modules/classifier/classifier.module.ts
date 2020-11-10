import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClassifierComponent } from './classifier.component';
import { ClassifierRoutingModule } from './classifier-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        ClassifierComponent
    ],
    imports: [
        CommonModule,
        ClassifierRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ],
    providers: [

    ]
})

export class ClassifierModule { }