import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { LicenseService } from './license.service';



@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    providers: [
        AppConfigService,
        LicenseService,
    ]
})
export class ServiceModule { }