import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EBooksComponent } from '../e-books.component';
import { EBookContentArea, EBookTextElement } from '../../../entities';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EBookTextElementService } from '../../../services';

@Component({
    selector: 'text-element-new',
    styleUrls: ['../e-books.component.scss'],
    templateUrl: 'text-element-new.component.html',
})

export class TextElementNewComponent implements OnInit {
    public contentArea: EBookContentArea;
    public options: FormGroup;
    public unconsciousControl = new FormControl();
    public congruenceControl = new FormControl();
    public selfAssessmentControl = new FormControl();
    public energizationControl = new FormControl();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<EBooksComponent>,
        fb: FormBuilder,
        private eBookTextElementService: EBookTextElementService
    ) {
        this.options = fb.group({
            unconscious: this.unconsciousControl,
            congruence: this.congruenceControl,
            selfAssessment: this.selfAssessmentControl,
            energization: this.energizationControl,
        });
    }

    public async ngOnInit(): Promise<void> {
        this.contentArea = this.data.area;
    }

    public async onCancelClick(): Promise<void> {
        this.dialogRef.close();
    }

    public async onOkClick(): Promise<void> {
        let textElement = new EBookTextElement();
        textElement.Unconscious = this.unconsciousControl.value;
        textElement.Congruence = this.congruenceControl.value;
        textElement.SelfAssessment = this.selfAssessmentControl.value;
        textElement.Energization = this.energizationControl.value;
        textElement.EBookContentAreaId = this.contentArea.Id;

        
        await this.eBookTextElementService.setSingleToWebApi(textElement);
        this.eBookTextElementService.eBookTextElements.next(await this.eBookTextElementService.getFromWebApi());

        this.snackBar.open("Neuer Text für Bereich '" + this.contentArea.Name + "' hinzugefügt.", "", {
            duration: 2000,
        });

        this.dialogRef.close();
    }
}