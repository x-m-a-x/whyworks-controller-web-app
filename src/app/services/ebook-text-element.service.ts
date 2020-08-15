import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { EBookTextElement } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class EBookTextElementService extends ServiceBase<EBookTextElement>{
    public eBookTextElements: BehaviorSubject<EBookTextElement[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "EBookTextElements",
            map: (item: EBookTextElement) => EBookTextElement.createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}