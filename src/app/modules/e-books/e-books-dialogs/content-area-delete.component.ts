import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EBooksComponent } from '../e-books.component';
import { EBookContentArea, EBookTextElement } from '../../../entities';
import { EBookContentAreaService, EBookTextElementService } from '../../../services';


@Component({
    selector: 'content-area-delete',
    styleUrls: ['../e-books.component.scss'],
    templateUrl: 'content-area-delete.component.html',
})


export class ContentAreaDeleteComponent implements OnInit {
    public eBookContentArea: EBookContentArea;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<EBooksComponent>,
        private eBookContentAreaService: EBookContentAreaService,
        private eBookTextElementService: EBookTextElementService
    ) { }

    public async ngOnInit(): Promise<void> {
        this.eBookContentArea = this.data.contentArea;
    }

    public async onCancelClick(): Promise<void> {
        this.dialogRef.close();
    }

    public async onOkClick(): Promise<void> {
        let textElements = this.eBookTextElementService.eBookTextElements.getValue();
        for (let i = 0; i < textElements?.length; i++) {
            await this.eBookTextElementService.deleteFromWebApi(textElements[i].Id);
        }
        this.eBookContentAreaService.deleteFromWebApi(this.eBookContentArea.Id);
        this.snackBar.open("Textbereich '" + this.eBookContentArea.Name + "' wurde gelöscht.", "", {
            duration: 2000,
        });

        
        this.dialogRef.close();
    }
}