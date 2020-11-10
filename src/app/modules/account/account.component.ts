import { Component, OnInit } from "@angular/core";
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthenticationService } from '../../services';
import { User } from '../../entities';
import { Router } from '@angular/router';

@Component({
    selector: "account",
    styleUrls: ["./account.component.scss"],
    templateUrl: "./account.component.html"
})

export class AccountComponent implements OnInit {
    public isMobile: boolean = false;
    public user: User;

    constructor(
        private deviceDetectorService: DeviceDetectorService,
        private authenticationService: AuthenticationService,
        private router: Router,
    ) { }

    public async ngOnInit(): Promise<void> {
        this.isMobile = this.deviceDetectorService.isMobile();
        this.user = this.authenticationService.currentUserValue;

    }

    public async signOut(): Promise<void> {
        this.authenticationService.logout();
        this.router.navigateByUrl('login');
    }
}