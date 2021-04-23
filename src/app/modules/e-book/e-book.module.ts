import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EBookRoutingModule } from './e-book-routing.module';
import { EBookComponent } from './e-book.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [
        EBookComponent
    ],
    imports: [
        CommonModule,
        EBookRoutingModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatToolbarModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTooltipModule,        
    ],
    providers: [
        
    ]
})

export class EBookModule { }