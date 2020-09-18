import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EBooksRoutingModule } from './e-books-routing.module';
import { EBooksComponent } from './e-books.component';
import { MatSidenavModule } from '@angular/material/sidenav';
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

import { ContentAreaNewComponent } from './e-books-dialogs/content-area-new.component';
import { TextElementNewComponent } from './e-books-dialogs/text-element-new.component';
import { ReorderAreasComponent } from './e-books-dialogs/reorder-areas.component';

@NgModule({
    declarations: [
        EBooksComponent,
        ContentAreaNewComponent,
        TextElementNewComponent,
        ReorderAreasComponent
    ],
    imports: [
        CommonModule,
        EBooksRoutingModule,
        MatSidenavModule,
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
        MatListModule
    ],
    providers: [

    ]
})

export class EBooksModule { }