import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { LicenseService, PersonalityTestService, AdditionalFieldDefinitionService, UserService } from '../../services';
import { License, PersonalityTest, TestType, AdditionalFieldDefinition, User } from '../../entities';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from "rxjs";

@Component({
    selector: "license-detail",
    styleUrls: ["./license-detail.component.scss"],
    templateUrl: "./license-detail.component.html"
})

export class LicenseDetailComponent implements OnInit, OnDestroy {
    public license: License;
    public test: PersonalityTest;
    public edit: boolean = false;
    public licenseTypes: any[] = [];
    public isMobile: boolean = false;
    public user: User;

    public licenseSettings: FormGroup;
    public licenseInfoControl = new FormControl();
    public licenseTypeControl = new FormControl();
    public addFieldDefs: AdditionalFieldDefinition[] = [];
    private addFieldDefsSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private licenseService: LicenseService,
        private personalityTestService: PersonalityTestService,
        private additionalFieldDefinitionService: AdditionalFieldDefinitionService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private deviceDetectorService: DeviceDetectorService,
        private location: Location,
        private snackBar: MatSnackBar,
        private router: Router,
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
                this.license.Test = this.personalityTestService.personalityTests.getValue().find(pt => pt.Id == this.license.TestId);                
            }
            else if (this.license) {
                this.license.Test = this.personalityTestService.personalityTests.getValue()?.find(pt => pt.LicenseId == this.license.Id);
                this.license.TestId = this.license.Test?.Id;
            }
            
            if (!this.userService.users.getValue()) {
                this.userService.users.next(await this.userService.getFromWebApi());
            }

            this.user = this.userService.users.getValue()?.find(user => user.LicenseId == this.license?.Id && user.LicenseId);
            console.log(this.user);

        });

        this.addFieldDefsSubscription = this.additionalFieldDefinitionService.additionalFieldDefinitions.subscribe((addFieldDefs) => {
            this.addFieldDefs = addFieldDefs?.filter(afd => afd.LicenseId == this.license?.Id);
            if (!this.addFieldDefs) {
                this.addFieldDefs = [];
            }
        })
    }

    public async ngOnDestroy(): Promise<void> {
        this.addFieldDefsSubscription.unsubscribe();
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

    public addFields() {
        this.router.navigateByUrl("AdditionalFields/" + this.license.Id);
    }

    public goToTest() {
        this.router.navigateByUrl('Test/' + this.license.TestId);
    }

    public goToEBook() {
        this.router.navigateByUrl('EBook/' + this.license.TestId);        
    }
}