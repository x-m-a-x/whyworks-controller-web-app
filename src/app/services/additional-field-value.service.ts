import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AdditionalFieldValue } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class AdditionalFieldValueService extends ServiceBase<AdditionalFieldValue>{
    public additionalFieldValues: BehaviorSubject<AdditionalFieldValue[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "AdditionalFieldValues",
            map: (item: AdditionalFieldValue) => AdditionalFieldValue .createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}