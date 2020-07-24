import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EBooksRoutingModule } from './e-books-routing.module';
import { EBooksComponent } from './e-books.component';


@NgModule({
    declarations: [
        EBooksComponent
    ],
    imports: [
        CommonModule,
        EBooksRoutingModule,
    ],
    providers: [

    ]
})

export class EBooksModule { }