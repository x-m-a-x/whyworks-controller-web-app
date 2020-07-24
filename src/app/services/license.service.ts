import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { License } from '../entities';
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class LicenseService extends ServiceBase<License>{
    public licenses: BehaviorSubject<License[]> = new BehaviorSubject(null);
    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService) {
        super({
            entityName: "Licenses",
            map: (item: License) => License.createFromApiItem(item)
        }
            , http
            , appConfigService)
    }

    public async getLicensesSortedByDate(desc: boolean = true, update: boolean = false): Promise<License[]> {

        if (update || this.licenses.getValue() == null || this.licenses.getValue().length == 0) {
            this.licenses.next(await this.getFromWebApi());
        }

        if (!this.licenses.getValue()) {
            return [];
        }
        
        return (this.licenses.getValue()).sort(function (a, b) {
            if (a.CreatedAt < b.CreatedAt) { return -1 * (desc ? -1 : 1); }
            if (a.CreatedAt > b.CreatedAt) { return 1 * (desc ? -1 : 1); }
            return 0;
        });
    }

}