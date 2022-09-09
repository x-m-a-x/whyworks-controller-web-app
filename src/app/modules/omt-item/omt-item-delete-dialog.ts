import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OmtItemComponent } from './omt-item.component';
import { OMTSurveyItem } from '../../entities';
import { OMTSurveyItemService } from '../../services';


@Component({
    selector: 'omt-item-delete-dialog',
    styleUrls: ['omt-item.component.scss'],
    templateUrl: 'omt-item-delete-dialog.html',
})


export class OMTItemDeleteComponent implements OnInit {
    public omtSurveyItem: OMTSurveyItem;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<OmtItemComponent>,
        private omtSurveyItemService: OMTSurveyItemService
    ) { }

    public async ngOnInit(): Promise<void> {
        this.omtSurveyItem = this.data.omtItem;
    }

    public async onCancelClick(): Promise<void> {
        this.dialogRef.close();
    }

    public async onOkClick(): Promise<void> {

        
        await this.omtSurveyItemService.deleteFromWebApi(this.omtSurveyItem.Id);
        
        this.snackBar.open("OMT Item wurde gelöscht.", "", {
            duration: 2000,
        });

        
        this.dialogRef.close();
    }
}