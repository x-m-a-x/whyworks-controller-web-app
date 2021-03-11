import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { OMTSurveyItem } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class OMTSurveyItemService extends ServiceBase<OMTSurveyItem>{
    public omtSurveyItems: BehaviorSubject<OMTSurveyItem[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "OMTSurveyItems",
            map: (item: OMTSurveyItem) => OMTSurveyItem.createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}