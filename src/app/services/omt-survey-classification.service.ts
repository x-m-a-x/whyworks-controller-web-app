import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { OMTSurveyClassification } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class OMTSurveyClassificationService extends ServiceBase<OMTSurveyClassification>{
    public omtSurveyClassifications: BehaviorSubject<OMTSurveyClassification[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "OMTSurveyClassifications",
            map: (item: OMTSurveyClassification) => OMTSurveyClassification.createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}