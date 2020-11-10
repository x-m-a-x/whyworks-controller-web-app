import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';


@NgModule({
    declarations: [
        AccountComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
    ],
    providers: [

    ]
})

export class AccountModule { }