import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService, IAppConfig } from './app-config.service';
import { ClassificationResult } from '../entities';


export interface IClassifyBodyData {
    answer1: string;
    answer2: string;
    answer3: string;
    image: number;
}

export interface IClassificationResponse {
    result: {
        dim1_A: number;
        dim1_F: number;
        dim1_L: number;
        dim1_M: number;
        dim2_pos: number;
        dim2_neg: number;
    }
}


@Injectable({ providedIn: 'root' })
export class ClassificationService {
    public config: IAppConfig;

    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService,
    ) {
        this.appConfigService.getConfig()
            .then((config) => {
                this.config = config;
            });
    }

    public async classifyAllDimensions(picture: number, text: string, text2: string = null, text3: string = null): Promise<ClassificationResult> {
        let result = new ClassificationResult();

        result.answer1 = text;
        result.answer2 = text2;
        result.answer3 = text3;
        result.picture = picture;

        let body_data: IClassifyBodyData = {
            answer1: text,
            answer2: text2,
            answer3: text3,
            image: picture
        }

        try {
            this.http.post<IClassificationResponse>(this.config.classificationApiEndpoint + "classify", body_data).subscribe((response) => {
                console.log(response);
                result.dim1_A = response.result.dim1_A;
                result.dim1_F = response.result.dim1_F;
                result.dim1_L = response.result.dim1_L;
                result.dim1_M = response.result.dim1_M;

                result.dim2_pos = response.result.dim2_pos;
                result.dim2_neg = response.result.dim2_neg;
            });
        }
        catch(error) {
            console.error(body_data);
            console.error(error);
            throw error;
        }

             
        return result;
    }
}