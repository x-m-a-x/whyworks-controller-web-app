import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { OMTClassification } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class OMTClassificationService extends ServiceBase<OMTClassification>{
    public omtClassifications: BehaviorSubject<OMTClassification[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "OMTClassifications",
            map: (item: OMTClassification) => OMTClassification.createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}