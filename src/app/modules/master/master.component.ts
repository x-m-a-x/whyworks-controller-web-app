import { Component, OnInit, } from "@angular/core";
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

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
        ) { }

    public async ngOnInit(): Promise<void> {
        this.isMobile = this.deviceDetectorService.isMobile();
    }

    public async navigate(target: string): Promise<void> {
        this.subMenuSelected = target;
        this.router.navigateByUrl(target);
    }
}