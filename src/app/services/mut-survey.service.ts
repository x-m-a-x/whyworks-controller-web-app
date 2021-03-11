import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MUTSurvey } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class MUTSurveyService extends ServiceBase<MUTSurvey>{
    public mutSurveys: BehaviorSubject<MUTSurvey[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "MUTSurveys",
            map: (item: MUTSurvey) => MUTSurvey.createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}