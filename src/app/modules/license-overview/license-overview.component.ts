import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from "@angular/core";
import { LicenseService, AdditionalFieldDefinitionService, OMTSurveyService, OMTSurveyItemService, OMTClassificationService, OMTSurveyClassificationService,
    MUTSurveyService, MUTSurveyItemService, MUTSurveyClassificationService, PersonalityTestService } from '../../services';
import { License, TestType } from '../../entities';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common'
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { LicenseAddDialogComponent } from './license-add-dialog.component';
import { LicenseAddFieldsDialogComponent } from './liceense-add-fields-dialog.component';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

export interface iLicense {
    Id: number;
    Activated: string;
    LicenseKey: string;
    LicenseType: string;
    CreatedAt: string;
    TestId?: number;
    Info: string;
    AddFields: number;
    _ClassificationPending: boolean;
    _CheckValidity: boolean;
}

@Component({
    selector: "license-overview",
    styleUrls: ["./license-overview.component.scss"],
    templateUrl: "./license-overview.component.html"
})


export class LicenseOverviewComponent implements OnInit, OnDestroy, AfterViewInit {
    // public licenses: License[];
    // private iLicenses: iLicense[] = [];
    // private iLicensesCheck: iLicense[] = [];
    public displayedColumns: string[] = ['LicenseKey', 'Activated', 'LicenseType', 'CreatedAt', '_ClassificationPending', '_CheckValidity', 'Info'];
    public isLoadingLicenses = true;
    public dataSource: MatTableDataSource<any>;
    public isDesktopDevice: boolean = true;
    public isMobile: boolean = false;
    private licensesSubscription: Subscription;
    public focusOnLicensesToCheck: boolean = true;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(
        private licenseService: LicenseService,
        private additionalFieldDefinitionService: AdditionalFieldDefinitionService,
        private omtSurveyService: OMTSurveyService, 
        private omtSurveyItemService: OMTSurveyItemService, 
        private omtClassificationService: OMTClassificationService, 
        private omtSurveyClassificationService: OMTSurveyClassificationService,
        private mutSurveyService: MUTSurveyService, 
        private mutSurveyItemService: MUTSurveyItemService,
        private mutSurveyClassificationService: MUTSurveyClassificationService,
        private personalityTestService: PersonalityTestService,
        private datePipe: DatePipe,
        private deviceDetectorService: DeviceDetectorService,
        private router: Router,
        public dialog: MatDialog,
    ) { }

    public async ngOnInit(): Promise<void> {
        this.isDesktopDevice = this.deviceDetectorService.isDesktop();
        this.isMobile = this.deviceDetectorService.isMobile();

        if (this.isMobile) {
            this.displayedColumns = ['LicenseKey', 'Activated', 'LicenseType', 'CreatedAt'];
        }

        // Subscription of Licenses
        this.licensesSubscription = this.licenseService.licenses.subscribe(async (licenses) => {
            // console.log(this.dataSource?.data?.length);
            if (!(this.dataSource?.data?.length > 0)) {
                await this.getDataSource(licenses);
                
                
            }
        })

    }

    public async ngAfterViewInit(): Promise<void> {
        // if licenses are null or empty -> reload
        if (!this.licenseService.licenses.getValue() || this.licenseService.licenses.getValue().length == 0) {
            this.licenseService.licenses.next(await this.licenseService.getLicensesSortedByDate());
        }
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
    }


    public async ngOnDestroy(): Promise<void> {
        this.licensesSubscription.unsubscribe();
    }

    private async getDataSource(licenses: License[]): Promise<void> {
        let iLicenses = [];          
        if (this.focusOnLicensesToCheck) {
            licenses = licenses?.filter(lic => this.personalityTestService.personalityTests.getValue()?.find(pt => pt.LicenseId == lic.Id));
        }
        for (let i = 0; i < licenses?.length; i++) {
            iLicenses.push(await this.mapToiLicense(licenses[i], this.focusOnLicensesToCheck));
        }
        
        if (!this.focusOnLicensesToCheck) {
            this.dataSource = new MatTableDataSource(iLicenses);
        }
        else {
            this.dataSource = new MatTableDataSource(iLicenses.filter(lic => lic._CheckValidity || lic._ClassificationPending));
        }

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoadingLicenses = false;
    }

    public stringOfTestType(enumIndex: any): string {
        return TestType[enumIndex];
    }

    public async licensesToCheck(): Promise<void> {
        this.focusOnLicensesToCheck = !this.focusOnLicensesToCheck;
        this.getDataSource(this.licenseService.licenses.getValue());

    }

    public async applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    private async mapToiLicense(license: License, checkStatus = false): Promise<iLicense> {
        let checkValidity = false;
        let classificationPending = false;
        if (checkStatus) {
            const personalityTest = this.personalityTestService.personalityTests.getValue()?.filter(pt => pt.LicenseId == license.Id);
            if (personalityTest?.length > 1) checkValidity = true;

            const mutSurvey = this.mutSurveyService.mutSurveys.getValue()?.filter(mi => personalityTest.find(pt => pt.Id == mi.TestId));
            if (mutSurvey?.length > 1) checkValidity = true;
            
            if (this.mutSurveyItemService.mutSurveyItems.getValue()?.filter(item => mutSurvey.find(mi => mi.Id == item.MUTSurveyId))?.length > 0) {
                if (!this.mutSurveyClassificationService.mutSurveyClassifications.getValue()?.find(msc => mutSurvey.find(mi => mi.Id == msc.MUTSurveyId))) {
                    classificationPending = true;
                }
            }
            
            const omtSurvey = this.omtSurveyService.omtSurveys.getValue()?.filter(omt => omt.TestId == license.TestId);
            if (omtSurvey?.length > 1) checkValidity = true;
            const omtItems = this.omtSurveyItemService.omtSurveyItems.getValue()?.filter(item => omtSurvey.find(omt => omt.Id == item.OMTSurveyID));
            // if (omtItems?.length < 15) {
            //     classificationPending = false;
            // }

            if (omtItems?.length > 14) {
                for (let i = 0; i < omtItems?.length; i++) {
                    if (!this.omtClassificationService.omtClassifications.getValue()?.find(cl => cl.OMTSurveyItemId == omtItems[i].Id)) {
                        classificationPending = true;
                        break;
                    }            
                }
            }
            if (omtItems?.length > 14 && !classificationPending) {
                if (!this.omtSurveyClassificationService.omtSurveyClassifications.getValue()?.find(cl => omtSurvey.find(omt => omt.Id == cl.OMTSurveyId))) {
                    classificationPending = true;
                }
            }

        }
            
            
        let iLicense = <iLicense>{
            Id: license.Id,
            Activated: license.Activated ? "ja" : "nein",
            LicenseKey: license.LicenseKey,
            LicenseType: TestType[license.LicenseType],
            CreatedAt: this.isMobile ? this.datePipe.transform(license.CreatedAt, 'dd.MM.yyyy') : this.datePipe.transform(license.CreatedAt, 'dd.MM.yyyy HH:mm:ss'),
            TestId: license.TestId,
            Info: license.Info,
            // AddFields: this.additionalFieldDefinitionService.additionalFieldDefinitions.getValue()?.filter(afd => afd.LicenseId == license.Id)?.length ?
            //     this.additionalFieldDefinitionService.additionalFieldDefinitions.getValue()?.filter(afd => afd.LicenseId == license.Id)?.length : 0,
            AddFields: 0,
            _ClassificationPending: classificationPending,
            _CheckValidity: checkValidity
        }


        return Promise.resolve(iLicense);
    }

    public async editLicense(iLicense: any) {
        this.router.navigateByUrl("LicenseDetails/" + iLicense.Id);
    }

    public async addLicense(): Promise<void> {
        const dialogRef = this.dialog.open(LicenseAddDialogComponent, {
            width: '80%'
        });

        dialogRef.afterClosed().subscribe(async result => {
            this.isLoadingLicenses = true;
            this.licenseService.licenses.next(await this.licenseService.getLicensesSortedByDate());
        });
    }

    public async addFields(iLicense: any) {
        const dialogRef = this.dialog.open(LicenseAddFieldsDialogComponent, {
            'data': iLicense.Id,
            width: '80%'
        });

        dialogRef.afterClosed().subscribe(async result => {

            this.additionalFieldDefinitionService.additionalFieldDefinitions.next(await this.additionalFieldDefinitionService.getFromWebApi());
        });
    }

}