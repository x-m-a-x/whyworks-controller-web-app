import { Component, OnInit, ViewChild } from "@angular/core";
import { LicenseService } from '../../services';
import { License, TestType } from '../../entities';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common'
import { DeviceDetectorService } from 'ngx-device-detector';

export interface iLicense {
    Id: number;
    Activated: string;
    LicenseKey: string;
    LicenseType: string;
    CreatedAt: string;
    TestId?: number;
    Info: string;
}

@Component({
    selector: "license-overview",
    styleUrls: ["./license-overview.component.scss"],
    templateUrl: "./license-overview.component.html"
})


export class LicenseOverviewComponent implements OnInit {
    public licenses: License[];
    public displayedColumns: string[] = ['LicenseKey', 'Activated', 'LicenseType', 'CreatedAt', 'Info'];
    public isLoadingLicenses = true;
    public dataSource: MatTableDataSource<any>;
    public isDesktopDevice: boolean = true;
    public isMobile: boolean = false;

    @ViewChild(MatSort, { static: true }) sort: MatSort;


    constructor(
        private licenseService: LicenseService,
        private datePipe: DatePipe,
        private deviceDetectorService: DeviceDetectorService,
    ) { }

    public async ngOnInit(): Promise<void> {
        this.isDesktopDevice = this.deviceDetectorService.isDesktop();
        this.isMobile = this.deviceDetectorService.isMobile();

        if (this.isMobile) {
            this.displayedColumns = ['LicenseKey', 'Activated', 'LicenseType', 'CreatedAt'];
        }

        if (!this.licenseService.licenses.getValue() || this.licenseService.licenses.getValue().length == 0) {
            this.licenseService.licenses.next(await this.licenseService.getLicensesSortedByDate());
        }
        this.licenses = this.licenseService.licenses.getValue();
        let iLicenses = [];
        for (let i = 0; i < this.licenses?.length; i++) {
            iLicenses.push(await this.mapToiLicense(this.licenses[i]));
        }
        this.dataSource = new MatTableDataSource(iLicenses);
        this.dataSource.sort = this.sort;
        this.isLoadingLicenses = false;
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
            CreatedAt: this.isMobile ? this.datePipe.transform(license.CreatedAt, 'dd.MM.yyyy') : this.datePipe.transform(license.CreatedAt, 'dd.MM.yyyy hh:mm:ss'),
            TestId: license.TestId,
            Info: license.Info
        }

        return Promise.resolve(iLicense);
    }

    public async editLicense(iLicense: any) {
        console.log(iLicense);
    }

}