import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseDetailRoutingModule } from './license-detail-routing.module';
import { LicenseDetailComponent } from './license-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from '@angular/material/toolbar';
import { DatePipe } from '@angular/common'
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        LicenseDetailComponent
    ],
    imports: [
        CommonModule,
        LicenseDetailRoutingModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatToolbarModule,
        MatSelectModule,
        MatSnackBarModule,
    ],
    providers: [
        DatePipe
    ]
})

export class LicenseDetailModule { }