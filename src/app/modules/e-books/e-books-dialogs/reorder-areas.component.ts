import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EBooksComponent } from '../e-books.component';
import { TestType, EBookContentArea } from '../../../entities';
import { EBookContentAreaService } from '../../../services';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
    selector: 'reorder-areas',
    styleUrls: ['../e-books.component.scss'],
    templateUrl: 'reorder-areas.component.html',
})

export class ReorderAreasComponent implements OnInit, OnDestroy {
    private eBookContentAreasSubscription: Subscription;
    public contentAreas: EBookContentArea[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<EBooksComponent>,
        private eBookContentAreaService: EBookContentAreaService,
    ){}

    public async ngOnInit(): Promise<void> {
        this.eBookContentAreasSubscription = this.eBookContentAreaService.eBookContentAreas.subscribe((contentAreas) => {
            this.contentAreas = contentAreas?.filter(ca => TestType[ca.TestType] == this.data.type.toString());
;
            
            this.contentAreas?.sort((a, b) => a.Order < b.Order ? -1 : a.Order > b.Order ? 1 : 0)
            console.log(this.contentAreas);
        });
    }

    public async ngOnDestroy(): Promise<void> {
        this.eBookContentAreasSubscription.unsubscribe();
    }
}