import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LicenseService, AdditionalFieldDefinitionService } from '../../services';
import { DataType, AdditionalFieldDefinition, License } from '../../entities';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { DeviceDetectorService } from "ngx-device-detector";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

@Component({
    selector: "additional-fields",
    styleUrls: ["./additional-fields.component.scss"],
    templateUrl: "./additional-fields.component.html"
})

export class AdditionalFieldsComponent implements OnInit {
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
    public isMobile: boolean;
    public license: License;
    public edit: boolean = false;
    

    constructor(
        private route: ActivatedRoute,
        private licenseService: LicenseService,
        private additionalFieldDefinitionService: AdditionalFieldDefinitionService,
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private location: Location,
        private deviceDetectorService: DeviceDetectorService,
    ) {


        this.additionalFields = formBuilder.group({
            additionalFieldName: this.additionalFieldNameControl,
            additionalFieldType: this.additionalFieldTypeControl,
            additionalFieldMandatory: this.additionalFieldMandatoryControl,
        });
    }

    public async ngOnInit(): Promise<void> {
        this.isMobile = this.deviceDetectorService.isMobile();

        this.route.params.subscribe(async (params) => {
            
            this.license = this.licenseService.licenses.getValue()?.find(l => l.Id == +params['licenseId']);

        
        });
        await this.additionalFieldTypesToArray();
        

        this.dataFieldDefs = this.additionalFieldDefinitionService.additionalFieldDefinitions.getValue()?.filter(adf => adf.LicenseId == this.license?.Id);
        if (!this.dataFieldDefs) {
            this.dataFieldDefs = [];
        }


        this.dataSource = new MatTableDataSource(this.dataFieldDefs);
        this.dataSource.sort = this.sort;
    }

    private async additionalFieldTypesToArray(): Promise<void> {
        this.additionalFieldTypes = [];
        for (let i = 1; i < (Object.keys(DataType).length + 1) / 2; i++) {
            this.additionalFieldTypes.push(DataType[i]);
        }
    }

    public getNameOfDataType(key: any) {
        if (+key) {
            return DataType[key];
        }
        return key;
    }

    public clickMandatoryField(event: any): void {
        this.mandatory = event?.checked;
    }

    public async editAddField(addFieldDef: any): Promise<void> {

    }

    public async backClicked(): Promise<void> {
        this.location.back();
    }

    public async saveChanges(): Promise<void> {
        for (let i = 0; i < this.dataFieldDefs.length; i++) {            
            this.dataFieldDefs[i] = await this.additionalFieldDefinitionService.setSingleToWebApi(this.dataFieldDefs[i]);
        }

        this.additionalFieldDefinitionService.additionalFieldDefinitions.next(await this.additionalFieldDefinitionService.getFromWebApi());

        this.snackBar.open("Zusatzfelder gespeichert!", "", {
            duration: 2000,
        });
    }

    public async addDef(): Promise<void> {
        let newDataFieldDef = new AdditionalFieldDefinition();
        newDataFieldDef.LicenseId = this.license.Id;
        newDataFieldDef.Name = this.additionalFieldNameControl.value;
        newDataFieldDef.DataType = this.additionalFieldTypeControl.value;
        newDataFieldDef.Mandatory = this.mandatory;

        this.dataFieldDefs.push(newDataFieldDef);
        this.dataSource = new MatTableDataSource(this.dataFieldDefs);
        this.dataSource.sort = this.sort;

        this.additionalFieldNameControl.setValue(null);
        this.additionalFieldTypeControl.setValue(null);
        this.mandatory = false;
    }


    public async changeDef(): Promise<void> {}
    public async cancelUpdate(): Promise<void> {}
}