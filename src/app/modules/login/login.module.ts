import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        FormsModule,
        MatIconModule
    ],
    providers: [

    ]
})

export class LoginModule { }