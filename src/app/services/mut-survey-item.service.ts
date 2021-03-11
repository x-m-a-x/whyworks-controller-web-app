import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MUTSurveyItem } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class MUTSurveyItemService extends ServiceBase<MUTSurveyItem>{
    public mutSurveyItems: BehaviorSubject<MUTSurveyItem[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "MUTSurveyItems",
            map: (item: MUTSurveyItem) => MUTSurveyItem.createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}