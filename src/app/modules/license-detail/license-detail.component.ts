import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { LicenseService } from '../../services';
import { License, PersonalityTest, TestType } from '../../entities';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: "license-detail",
    styleUrls: ["./license-detail.component.scss"],
    templateUrl: "./license-detail.component.html"
})

export class LicenseDetailComponent implements OnInit {
    public license: License;
    public test: PersonalityTest;
    public edit: boolean = false;
    public licenseTypes: any[] = [];
    public isMobile: boolean = false;

    public licenseSettings: FormGroup;
    public licenseInfoControl = new FormControl();
    public licenseTypeControl = new FormControl();

    constructor(
        private route: ActivatedRoute,
        private licenseService: LicenseService,
        private formBuilder: FormBuilder,
        private deviceDetectorService: DeviceDetectorService,
        private location: Location,
        private snackBar: MatSnackBar,
    ) {
        this.licenseSettings = formBuilder.group({
            licenseInfo: this.licenseInfoControl,
            licenseType: this.licenseTypeControl,
        });
    }

    public async ngOnInit(): Promise<void> {
        this.isMobile = this.deviceDetectorService.isMobile();

        await this.testTypesToArray();
        this.route.params.subscribe(async (params) => {
            this.license = this.licenseService.licenses.getValue()?.find(l => l.Id == +params['licenseId']);

            if (this.license?.TestId) {
                // query personality test

                // +params['licenseId']
            }
        });
    }

    public getStringOfTestType(index: any): string {
        return TestType[index];
    }

    private async testTypesToArray(): Promise<void> {
        this.licenseTypes = []
        for (let i = 1; i < (Object.keys(TestType).length + 1) / 2; i++) {
            this.licenseTypes.push(this.getStringOfTestType(i));
        }
    }

    public async editLicense(): Promise<void> {
        this.edit = true;
        this.licenseTypeControl.setValue(this.getStringOfTestType(this.license?.LicenseType));
        this.licenseInfoControl.setValue(this.license?.Info);
    }

    public async saveLicense(): Promise<void> {
        this.license.Info = this.licenseInfoControl.value;
        this.license.LicenseType = this.licenseTypeControl.value ? this.licenseTypes.indexOf(this.licenseTypeControl.value) + 1 : this.license.LicenseType;
        this.edit = false;
        this.licenseService.setSingleToWebApi(License.createFromApiItem(this.license));
        this.snackBar.open("Änderungen wurden gespeichert!", "", {
            duration: 2000,
        });
    }

    public backClicked() {
        this.location.back();
    }
}