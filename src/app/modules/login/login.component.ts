import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import { AuthenticationService } from '../../services';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
    selector: "login",
    styleUrls: ["./login.component.scss"],
    templateUrl: "./login.component.html"
})

export class LoginComponent implements OnInit {
    public isMobile: boolean = false;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    public hide = true;

    public loginForm: FormGroup;
    public usernameControl = new FormControl();
    public passwordControl = new FormControl();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private deviceDetectorService: DeviceDetectorService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    public async ngOnInit(): Promise<void> {
        this.loginForm = this.formBuilder.group({
            username: this.usernameControl,
            password: this.passwordControl
        });
        
        this.isMobile = this.deviceDetectorService.isMobile();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    public async onSubmit(): Promise<void> {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        await this.authenticationService.login(this.f.username.value, this.f.password.value)
            .then((user) => {
                if (user) {
                    this.router.navigate([this.returnUrl]);
                }
            })
            .catch((error) => {
                this.error = "Benutzer oder Passwort falsch!";
                this.loading = false;
            })
    }
}