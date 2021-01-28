import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AdditionalValidValue } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class AdditionalValidValueService extends ServiceBase<AdditionalValidValue>{
    public additionalValidValues: BehaviorSubject<AdditionalValidValue[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "AdditionalValidValues",
            map: (item: AdditionalValidValue) => AdditionalValidValue .createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}