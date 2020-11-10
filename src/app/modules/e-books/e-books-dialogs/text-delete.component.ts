import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EBooksComponent } from '../e-books.component';
import { EBookTextElement } from '../../../entities';
import { EBookTextElementService } from '../../../services';


@Component({
    selector: 'text-delete',
    styleUrls: ['../e-books.component.scss'],
    templateUrl: 'text-delete.component.html',
})


export class TextDeleteComponent implements OnInit {
    public textElement: EBookTextElement;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<EBooksComponent>,
        private eBookTextElementService: EBookTextElementService
    ) { }

    public async ngOnInit(): Promise<void> {
        this.textElement = this.data.textElement;
    }

    public async onCancelClick(): Promise<void> {
        this.dialogRef.close();
    }

    public async onOkClick(): Promise<void> {

        await this.eBookTextElementService.deleteFromWebApi(this.textElement.Id);
        
        this.snackBar.open("Text wurde gelöscht.", "", {
            duration: 2000,
        });

        
        this.dialogRef.close();
    }
}