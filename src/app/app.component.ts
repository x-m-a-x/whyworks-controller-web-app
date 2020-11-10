import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from './services';
import { User } from './entities';

@Component({
  selector: 'app-root',
  template: '<div style="height: 100%; width: 100%; margin: 0;"><router-outlet></router-outlet></div>'
})
export class AppComponent implements OnInit {
  title = 'whyworks-controller-web-app';
  currentUser: User;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    // private translate: TranslateService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // translate.setDefaultLang('de');
  }

  public async ngOnInit(): Promise<void> {
    if (!this.currentUser) {
      this.router.navigateByUrl('login');
    }
    // console.log(this.currentUser);
    // this.authenticationService.login("Admin", "Gandalf2");
  }

  public async logout(): Promise<void> {
    this.authenticationService.logout();
    this.router.navigateByUrl('login');
  }
}
    