import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  template: '<div style="height: 100%; width: 100%; margin: 0;"><router-outlet></router-outlet></div>'
})
export class AppComponent {
  title = 'whyworks-controller-web-app';
  constructor(
    private router: Router,
    // private translate: TranslateService
  ) {
    // translate.setDefaultLang('de');
  }
}
