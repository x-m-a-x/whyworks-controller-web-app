import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from "@angular/core";
import { LicenseService, AdditionalFieldDefinitionService } from '../../services';
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
}

@Component({
    selector: "license-overview",
    styleUrls: ["./license-overview.component.scss"],
    templateUrl: "./license-overview.component.html"
})


export class LicenseOverviewComponent implements OnInit, OnDestroy, AfterViewInit {
    public licenses: License[];
    public displayedColumns: string[] = ['LicenseKey', 'Activated', 'LicenseType', 'CreatedAt', 'AddFields', 'Info'];
    public isLoadingLicenses = true;
    public dataSource: MatTableDataSource<any>;
    public isDesktopDevice: boolean = true;
    public isMobile: boolean = false;
    private licensesSubscription: Subscription;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(
        private licenseService: LicenseService,
        private additionalFieldDefinitionService: AdditionalFieldDefinitionService,
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
            console.log(this.dataSource?.data?.length);
            if (!(this.dataSource?.data?.length > 0)) {

                let iLicenses = [];
                console.log("start");
                for (let i = 0; i < licenses?.length; i++) {
                    iLicenses.push(await this.mapToiLicense(licenses[i]));
                }
                console.log("end");
                this.dataSource = new MatTableDataSource(iLicenses);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.isLoadingLicenses = false;
            }
        })

    }

    public async ngAfterViewInit(): Promise<void> {
        // if licenses are null or empty -> reload
        if (!this.licenseService.licenses.getValue() || this.licenseService.licenses.getValue().length == 0) {
            this.licenseService.licenses.next(await this.licenseService.getLicensesSortedByDate());
        }
        // this.dataSource.paginator = this.paginator;
    }


    public async ngOnDestroy(): Promise<void> {
        this.licensesSubscription.unsubscribe();
    }

    public stringOfTestType(enumIndex: any): string {
        return TestType[enumIndex];
    }

    public async applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    private async mapToiLicense(license: License): Promise<iLicense> {
        let iLicense = <iLicense>{
            Id: license.Id,
            Activated: license.Activated ? "ja" : "nein",
            LicenseKey: license.LicenseKey,
            LicenseType: TestType[license.LicenseType],
            CreatedAt: this.isMobile ? this.datePipe.transform(license.CreatedAt, 'dd.MM.yyyy') : this.datePipe.transform(license.CreatedAt, 'dd.MM.yyyy HH:mm:ss'),
            TestId: license.TestId,
            Info: license.Info,
            AddFields: this.additionalFieldDefinitionService.additionalFieldDefinitions.getValue()?.filter(afd => afd.LicenseId == license.Id)?.length ?
                this.additionalFieldDefinitionService.additionalFieldDefinitions.getValue()?.filter(afd => afd.LicenseId == license.Id)?.length : 0
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