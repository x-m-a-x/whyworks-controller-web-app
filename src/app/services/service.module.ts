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
import { AdditionalFieldDefinitionService } from './additional-field-definition.service';
import { AdditionalFieldValueService } from './additional-field-value.service';
import { AdditionalValidValueService } from './additional-valid-value.service';
import { MUTSurveyClassificationService } from './mut-survey-classification.service';
import { MUTSurveyItemService } from './mut-survey-item.service';
import { MUTSurveyService } from './mut-survey.service';
import { OMTClassificationService } from './omt-classification.service';
import { OMTSurveyClassificationService } from './omt-survey-classification.service';
import { OMTSurveyItemService } from './omt-survey-item.service';
import { OMTSurveyService } from './omt-survey.service';
import { MUTQuestionService } from './mut-question.service';
import { PdfConvertService } from './pdf-convert.service';
import { MUTParametereService } from './mut-param.service';
import { OMTTParameterService } from './omt-t-params.service';
import { MUTMappingService } from './mut-mapping.service';


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
        PersonalityTestService,
        AdditionalFieldDefinitionService,
        AdditionalFieldValueService,
        AdditionalValidValueService,
        MUTSurveyClassificationService,
        MUTSurveyItemService,
        MUTSurveyService,
        OMTClassificationService,
        OMTSurveyClassificationService,
        OMTSurveyItemService,
        OMTSurveyService,
        MUTQuestionService,
        PdfConvertService,
        MUTParametereService,
        OMTTParameterService,
        MUTMappingService
    ]
})
export class ServiceModule { }