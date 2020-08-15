import { Component, OnInit, } from "@angular/core";
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LicenseService, EBookDefinitionService, EBookContentAreaService, EBookTextElementService } from '../../services';

@Component({
    selector: "master",
    styleUrls: ["./master.component.scss"],
    templateUrl: "./master.component.html"
})

export class MasterComponent implements OnInit {
    public isMobile: boolean = false;
    public subMenuSelected: string;

    constructor(
        private router: Router,
        private deviceDetectorService: DeviceDetectorService,
        private licenseService: LicenseService,
        private eBookDefinitionService: EBookDefinitionService,
        private eBookContentAreaService: EBookContentAreaService,
        private eBookTextElementService: EBookTextElementService,
    ) { }

    public async ngOnInit(): Promise<void> {
        this.isMobile = this.deviceDetectorService.isMobile();
        this.licenseService.licenses.next(await this.licenseService.getFromWebApi());
        this.eBookDefinitionService.eBookDefinitions.next(await this.eBookDefinitionService.getFromWebApi());
        this.eBookContentAreaService.eBookContentAreas.next(await this.eBookContentAreaService.getFromWebApi());
        this.eBookTextElementService.eBookTextElements.next(await this.eBookTextElementService.getFromWebApi());
    }

    public async navigate(target: string): Promise<void> {
        this.subMenuSelected = target;
        this.router.navigateByUrl(target);
    }
}