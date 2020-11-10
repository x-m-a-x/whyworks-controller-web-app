import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EBooksComponent } from '../e-books.component';
import { TestType, EBookContentArea } from '../../../entities';
import { EBookContentAreaService } from '../../../services';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'content-area-new',
    styleUrls: ['../e-books.component.scss'],
    templateUrl: 'content-area-new.component.html',
})

export class ContentAreaNewComponent {
    public name: string;
    public testType: TestType;
    public options: FormGroup;
    public dimension1Control = new FormControl();
    public nameControl = new FormControl();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<EBooksComponent>,
        private eBookContentAreaService: EBookContentAreaService,
        fb: FormBuilder
    ) {
        this.options = fb.group({
            dimension1: this.dimension1Control,
            name: this.nameControl,
        });
     }

    public async ngOnInit(): Promise<void> {
        this.testType = this.data.ebookType;
    }


    public async onCancelClick(): Promise<void> {
        this.dialogRef.close();
    }

    public async onNameChange(value: any) {
        this.name = await value;
    }

    public async onOkClick(): Promise<void> {
        let contentArea = new EBookContentArea();
        contentArea.Name = this.name;
        contentArea.TestType = this.testType;
        contentArea.Dimension1 = this.dimension1Control.value;

        await this.eBookContentAreaService.setSingleToWebApi(contentArea);
        this.eBookContentAreaService.eBookContentAreas.next(await this.eBookContentAreaService.getFromWebApi());

        this.snackBar.open("Textbereich '" + this.name + "' neu angelegt.", "", {
            duration: 2000,
        });

        this.dialogRef.close();
    }

    public async onDimensionChange(event: any) {
        console.log(event);
    }
}