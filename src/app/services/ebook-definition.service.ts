import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { EBookDefinition } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class EBookDefinitionService extends ServiceBase<EBookDefinition>{
    public eBookDefinitions: BehaviorSubject<EBookDefinition[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "EBookDefinitions",
            map: (item: EBookDefinition) => EBookDefinition.createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}