import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AdditionalFieldDefinition } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class AdditionalFieldDefinitionService extends ServiceBase<AdditionalFieldDefinition>{
    public additionalFieldDefinitions: BehaviorSubject<AdditionalFieldDefinition[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "AdditionalFieldDefinitions",
            map: (item: AdditionalFieldDefinition) => AdditionalFieldDefinition .createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}