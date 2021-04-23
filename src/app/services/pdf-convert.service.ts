import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService, IAppConfig } from './app-config.service';
import { RestPackResponse, RestpackBody } from '../entities';


export interface IHtmlElements {
    header: string;
    css: string;
}


@Injectable({ providedIn: 'root' })
export class PdfConvertService {

    public config: IAppConfig;
    public htmlELements: IHtmlElements;
    private htmlElementsUrl: string = "assets/ebook/html_elements.json";

    constructor(
        public appConfigService: AppConfigService,
        public http: HttpClient,
    ) {
        this.appConfigService.getConfig()
            .then((config) => {
                this.config = config;
            });
    }

    public async htmlToPdf(html: string): Promise<RestPackResponse> {
        await this.getHtmlElements();
        let options = await this.getRestPackRequestCredentials();

        let restpackBody = new RestpackBody();
        // restpackBody.pdf_header =  this.htmlELements?.header;
        restpackBody.css = this.htmlELements?.css;
        restpackBody.html = html;

        console.log(restpackBody);

        let response = await this.http.post(this.config.pdfConvertUrl, restpackBody, options).toPromise() as unknown as RestPackResponse;

        
        return RestPackResponse.createFromApiItem(response);
        
    }

    public async getHtmlElements(): Promise<any> {
        await this.http.get<IHtmlElements>(this.htmlElementsUrl)
            .toPromise()
            .then((htmlElements) => {
                this.htmlELements = htmlElements;                
            })
            .catch((error: any) => {
                console.error("Error while trying to read html elements file.");
                return Promise.reject(error.message || error);
            })
    }

    private async getRestPackRequestCredentials(): Promise<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'x-access-token': this.config.restPackApiKey
            })
        };
        return Promise.resolve(httpOptions);
    }
}