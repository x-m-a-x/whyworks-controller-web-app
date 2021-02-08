import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LicenseOverviewComponent } from './license-overview.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LicenseService, AdditionalFieldDefinitionService } from '../../services';
import { DataType, AdditionalFieldDefinition } from '../../entities';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";



@Component({
    selector: 'license-add-fields-dialog',
    styleUrls: ["./license-overview.component.scss"],
    templateUrl: 'liceense-add-fields-dialog.component.html',
})
export class LicenseAddFieldsDialogComponent implements OnInit {
    public displayedColumns: string[] = ['Name', 'DataType', 'Mandatory'];
    public additionalFields: FormGroup;
    public additionalFieldNameControl = new FormControl();
    public additionalFieldTypeControl = new FormControl();
    public additionalFieldMandatoryControl = new FormControl();
    public additionalFieldTypes: any[] = [];
    public mandatory: boolean = false;
    public dataSource: MatTableDataSource<any>;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    public dataFieldDefs: AdditionalFieldDefinition[];
    

    constructor(
        private licenseService: LicenseService,
        private additionalFieldDefinitionService: AdditionalFieldDefinitionService,
        public dialogRef: MatDialogRef<LicenseOverviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
    ) {


        this.additionalFields = formBuilder.group({
            additionalFieldName: this.additionalFieldNameControl,
            additionalFieldType: this.additionalFieldTypeControl,
            additionalFieldMandatory: this.additionalFieldMandatoryControl,
        });
    }

    public async ngOnInit(): Promise<void> {
        await this.additionalFieldTypesToArray();
        

        this.dataFieldDefs = this.additionalFieldDefinitionService.additionalFieldDefinitions.getValue()?.filter(adf => adf.LicenseId == this.data);
        this.dataSource = new MatTableDataSource(this.dataFieldDefs);
        this.dataSource.sort = this.sort;
    }

    private async additionalFieldTypesToArray(): Promise<void> {
        this.additionalFieldTypes = [];
        for (let i = 1; i < (Object.keys(DataType).length + 1) / 2; i++) {
            this.additionalFieldTypes.push(DataType[i]);
        }
    }

    public clickMandatoryField(event: any): void {
        this.mandatory = event?.checked;
    }

    public async editAddField(addFieldDef: any): Promise<void> {

    }
}