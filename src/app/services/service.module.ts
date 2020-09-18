import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { LicenseService } from './license.service';
import { EBookTextElementService } from './ebook-text-element.service'
import { EBookContentAreaService } from './ebook-content-area.service';

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    providers: [
        AppConfigService,
        LicenseService,
        EBookTextElementService,
        EBookContentAreaService,
    ]
})
export class ServiceModule { }