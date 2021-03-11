import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MUTSurveyClassification } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class MUTSurveyClassificationService extends ServiceBase<MUTSurveyClassification>{
    public mutSurveyClassifications: BehaviorSubject<MUTSurveyClassification[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "MUTSurveyClassifications",
            map: (item: MUTSurveyClassification) => MUTSurveyClassification.createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}