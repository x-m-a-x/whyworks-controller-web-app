import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { EBookContentArea } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class EBookContentAreaService extends ServiceBase<EBookContentArea>{
    public eBookContentAreas: BehaviorSubject<EBookContentArea[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "EBookContentAreas",
            map: (item: EBookContentArea) => EBookContentArea.createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}