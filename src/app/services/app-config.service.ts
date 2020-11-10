import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

export interface IAppConfig {
    version: string;
    apiEndpoint: string;
    lengthLicenseKey: number;
    classificationApiEndpoint: string;
}

@Injectable()
export class AppConfigService {
    private config: IAppConfig;
    private configUrl: string = "assets/config.json";

    constructor(private http: HttpClient) { }

    public async getConfig(): Promise<IAppConfig> {
        
        if (this.config) {
            return Promise.resolve(this.config);
        }

        await this.http.get<IAppConfig>(this.configUrl)
            .toPromise()
            .then((config) => {
                this.config = config;                
            })
            .catch((error: any) => {
                console.error("Error while trying to read config file.");
                return Promise.reject(error.message || error);
            })

        return Promise.resolve(this.config);
    }

}