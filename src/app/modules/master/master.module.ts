import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        MasterComponent
    ],
    imports: [
        CommonModule,
        MasterRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatMenuModule
    ],
    providers: [

    ]
})

export class MasterModule { }