import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseOverviewRoutingModule } from './license-overview-routing.module';
import { LicenseOverviewComponent } from './license-overview.component';
import { LicenseAddDialogComponent } from './license-add-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { DatePipe } from '@angular/common'
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [
        LicenseOverviewComponent,
        LicenseAddDialogComponent
    ],
    imports: [
        CommonModule,
        LicenseOverviewRoutingModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSelectModule
    ],
    providers: [
        DatePipe
    ]
})

export class LicenseOverviewModule { }