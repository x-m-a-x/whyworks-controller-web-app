import { CoreEntity } from '../entities';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService, IAppConfig } from './app-config.service';


export interface IServiceConfig<U> {
    entityName: string;
    map?: (item: U) => U;
}

export class ServiceBase<T extends CoreEntity> {
    public config: IAppConfig;

    constructor(
        public serviceConfig: IServiceConfig<T>,
        public http: HttpClient,
        public appConfigService: AppConfigService,
    ) {
        if (!this.serviceConfig.map) {
            this.serviceConfig.map = function (item: any) { return item }
        }
        this.appConfigService.getConfig()
            .then((config) => {
                this.config = config;
            });
    }

    //#region LocalStorage

    public async getFromLocalStorage(): Promise<T[]> {
        let tCollection = [];
        let sCollection: string;
        sCollection = localStorage.getItem("WW_" + this.serviceConfig.entityName);

        if (sCollection) {
            tCollection = await JSON.parse(sCollection);
        }
        return Promise.resolve(tCollection);
    }

    public async setToLocalStorage(entityColl: T[]): Promise<void> {
        localStorage.setItem("WW_" + this.serviceConfig.entityName, JSON.stringify(entityColl));
    }


    //#endregion

    //#region http web api

    public async getFromWebApi(): Promise<T[]> {
        if (!this.config || !this.config.apiEndpoint) {
            return null;
        }
        try {
            // let response = await this.http.get(this.config.apiEndpoint + this.serviceConfig.entityName).toPromise() as unknown as T[];
            let response = await this.http.get(this.config.apiEndpoint + this.serviceConfig.entityName,
                (await this.getRequestCredentials())).toPromise() as unknown as T[];
            const mappedItems: T[] = [];
            for (let i = 0; i < response.length; i++) {
                mappedItems.push(this.serviceConfig.map(response[i]));
            }

            return Promise.resolve(mappedItems);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    public async getSingleFromWebApi(id: number): Promise<T> {
        try {
            // let response = await this.http.get(this.config.apiEndpoint + this.serviceConfig.entityName + "/" + id).toPromise() as unknown as T;

            let response = await this.http.get(this.config.apiEndpoint + this.serviceConfig.entityName + "/" + id,
                (await this.getRequestCredentials())).toPromise() as unknown as T;
            return this.serviceConfig.map(response);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    public async setSingleToWebApi(item: T): Promise<T> {
        let existingItem: T = null;
        const apiItem: T = await this.serviceConfig.map(item).toApiItem() as T;
        
        if (item.Id != 0) { existingItem = await this.getSingleFromWebApi(item.Id); }

        let options = await this.getRequestCredentials();
        try {
            if (existingItem) {
                // update
                await this.http.put(this.config.apiEndpoint + this.serviceConfig.entityName + "/" + item.Id, apiItem, options).toPromise();
                item = this.serviceConfig.map(item);
            }
            else {
                // insert             
                apiItem.Id = 0;
                let response = await this.http.post(this.config.apiEndpoint + this.serviceConfig.entityName, apiItem, options).toPromise() as unknown as T;
                item = this.serviceConfig.map(response);
            }

        }
        catch (error) {
            console.log(apiItem);
            console.log(error);
        }
        finally {
            return Promise.resolve(item);
        }
    }

    private mapResponsData(response: any): T[] {
        let tCollection = [];
        tCollection = JSON.parse(response);

        return tCollection;
    }


    public async deleteFromWebApi(id: number): Promise<void> {
        await this.http.delete(this.config.apiEndpoint + this.serviceConfig.entityName + "/" + id, await this.getRequestCredentials()).toPromise();
    }

    public async getRequestCredentials(): Promise<any> {
        let sCurrentUser = localStorage.getItem("WW_currentUser");
        let jCurrentUser = await JSON.parse(sCurrentUser);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + jCurrentUser?.Authdata
            })
        };
        return Promise.resolve(httpOptions);
    }



    //#endregion



    private getTimezoneOffset(): string {

        return (String(new Date().getTimezoneOffset()));

    }




}

