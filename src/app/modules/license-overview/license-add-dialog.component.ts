import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LicenseOverviewComponent } from './license-overview.component';
import { License, TestType } from '../../entities';
import { LicenseService, AppConfigService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
    selector: 'license-add-dialog',
    styleUrls: ["./license-overview.component.scss"],
    templateUrl: 'license-add-dialog.component.html',
})
export class LicenseAddDialogComponent implements OnInit {
    public placeName: string;
    public licenseTypes: any[] = [];
    public isLoadingLicenses = false;

    public licenseSettings: FormGroup;
    public licenseNumberControl = new FormControl();
    public licenseTypeControl = new FormControl();
    public licenseInfoControl = new FormControl();

    constructor(
        private licenseService: LicenseService,
        public dialogRef: MatDialogRef<LicenseOverviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private appConfigService: AppConfigService
    ) {
        this.licenseSettings = formBuilder.group({
            licenseNumber: this.licenseNumberControl,
            licenseType: this.licenseTypeControl,
            licenseInfo: this.licenseInfoControl,
        });
    }

    public async ngOnInit(): Promise<void> {
        await this.testTypesToArray();
    }

    private async testTypesToArray(): Promise<void> {
        this.licenseTypes = []
        for (let i = 1; i < (Object.keys(TestType).length + 1) / 2; i++) {
            this.licenseTypes.push(TestType[i]);
        }
    }

    public async backClicked(): Promise<void> {
        this.dialogRef.close();
    }

    public async saveClicked(): Promise<void> {
        this.isLoadingLicenses = true;
        for (let i = 0; i < this.licenseNumberControl.value; i++) {
            let newLicense = new License;
            newLicense.LicenseKey = await this.generateLicenseKey();
            newLicense.Activated = false;
            newLicense.CreatedAt = new Date();
            newLicense.LicenseType = this.licenseTypes.indexOf(this.licenseTypeControl.value) + 1;
            newLicense.Info = this.licenseInfoControl.value;
            
            await this.licenseService.setSingleToWebApi(newLicense);
        }
        this.licenseService.licenses.next(await this.licenseService.getLicensesSortedByDate(true, true));

        this.snackBar.open(this.licenseNumberControl.value > 1 ? "Lizenzen wurden angelegt!" : "Lizenz wurde angelegt!", "", {
            duration: 2000,
        });
        this.isLoadingLicenses = false;
        this.dialogRef.close();
    }

    private async generateLicenseKey(): Promise<string> {
        let config = await this.appConfigService.getConfig();
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        let licenseKey = "";
        let validKeyCreated = false;
        while (!validKeyCreated) {
            
            for (let i = 0; i < config?.lengthLicenseKey; i++) {
                licenseKey += possible.charAt(Math.floor(Math.random() * possible.length));
            }
    
            // check if key does not already exists
            if (this.licenseService.licenses.getValue().find(l => l.LicenseKey == licenseKey)) {
                licenseKey = "";                
            }
            else { validKeyCreated = true; }


        }
        return licenseKey;
    }
}