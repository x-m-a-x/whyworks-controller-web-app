import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { LicenseService } from './license.service';
import { EBookTextElementService } from './ebook-text-element.service'
import { EBookContentAreaService } from './ebook-content-area.service';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { ClassificationService } from './classification.service';
import { PersonalityTestService } from './personality-test.service';

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    providers: [
        AppConfigService,
        LicenseService,
        EBookTextElementService,
        EBookContentAreaService,
        AuthenticationService,
        UserService,
        ClassificationService,
        PersonalityTestService
    ]
})
export class ServiceModule { }