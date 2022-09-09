import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmtItemRoutingModule } from './omt-item-routing.module';
import { OmtItemComponent } from './omt-item.component';
import { OMTItemDeleteComponent } from './omt-item-delete-dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
    declarations: [
        OmtItemComponent,
        OMTItemDeleteComponent
    ],
    imports: [
        CommonModule,
        OmtItemRoutingModule,
        MatToolbarModule,
        MatExpansionModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatSelectModule,
        MatListModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    exports: [
        OmtItemComponent        
    ],
    providers: [
    ]
})

export class OmtItemModule { }