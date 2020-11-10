import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from "./../entities";
import { ServiceBase } from "./service-base";
import { AppConfigService } from './app-config.service';


@Injectable()
export class UserService extends ServiceBase<User>{
    public users: BehaviorSubject<User[]> = new BehaviorSubject(null);
    constructor(public http: HttpClient, public appConfigService: AppConfigService) {
        super({
            entityName: "Users",
            map: (item: User) => User.createFromApiItem(item)
        }, http, appConfigService)
    }

    public async authenticate(username: string, password: string): Promise<User> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ":" + password)
            })
        };

        let config = await this.appConfigService.getConfig();

        let user = await this.http.get(config.apiEndpoint + "Users/GetUserByName/" + username,
            httpOptions).toPromise() as User;
        return Promise.resolve(user);
    }

}