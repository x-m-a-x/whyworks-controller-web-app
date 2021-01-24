import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { PersonalityTest } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class PersonalityTestService extends ServiceBase<PersonalityTest>{
    public personalityTests: BehaviorSubject<PersonalityTest[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "PersonalityTests",
            map: (item: PersonalityTest) => PersonalityTest.createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

}