import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { OMTSurvey } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class OMTSurveyService extends ServiceBase<OMTSurvey>{
    public omtSurveys: BehaviorSubject<OMTSurvey[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "OMTSurveys",
            map: (item: OMTSurvey) => OMTSurvey.createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}