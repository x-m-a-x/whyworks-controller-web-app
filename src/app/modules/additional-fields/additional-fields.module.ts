import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdditionalFieldsRoutingModule } from './additional-fields-routing.module';
import { AdditionalFieldsComponent } from './additional-fields.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [
        AdditionalFieldsComponent
    ],
    imports: [
        CommonModule,
        AdditionalFieldsRoutingModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatTooltipModule
    ],
    providers: [
    ]
})

export class AdditionalFieldsModule { }