import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService, IAppConfig } from './app-config.service';
import { ClassificationResult, OMTClassification } from '../entities';
import { BehaviorSubject } from 'rxjs';
import { OMTClassificationService } from './omt-classification.service'


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
        dim2_1: number;
        dim2_2: number;
        dim2_3: number;
        dim2_4: number;
        dim2_5: number;
    }
}


@Injectable({ providedIn: 'root' })
export class ClassificationService {
    public config: IAppConfig;
    public response: BehaviorSubject<ClassificationResult> = new BehaviorSubject(null);

    constructor(
        public http: HttpClient,
        public appConfigService: AppConfigService,
        private omtClassificationService: OMTClassificationService,
    ) {
        this.appConfigService.getConfig()
            .then((config) => {
                this.config = config;
            });
    }

    public async classifyAllDimensions(picture: number, text: string, text2: string = null, text3: string = null, omtId: number = -5, saveInCollection: boolean = false): Promise<ClassificationResult> {
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

                result.dim2_1 = response.result.dim2_1;
                result.dim2_2 = response.result.dim2_2;
                result.dim2_3 = response.result.dim2_3;
                result.dim2_4 = response.result.dim2_4;
                result.dim2_5 = response.result.dim2_5;

                result.omtItemId = omtId;
                this.response.next(result);

                if (saveInCollection) {
                    let omtClassifications = this.omtClassificationService.omtClassifications.getValue();
                    if (omtClassifications?.findIndex(oic => oic.OMTSurveyItemId == result.omtItemId) == -1) {
                        let omtClassification = new OMTClassification();
                        omtClassification.OMTSurveyItemId = result.omtItemId;
                        omtClassification.DimOneA = result.dim1_A;
                        omtClassification.DimOneL = result.dim1_L;
                        omtClassification.DimOneF = result.dim1_F;
                        omtClassification.DimOneM = result.dim1_M;
                        omtClassification.DimTwo1 = result.dim2_1;
                        omtClassification.DimTwo2 = result.dim2_2;
                        omtClassification.DimTwo3 = result.dim2_3;
                        omtClassification.DimTwo4 = result.dim2_4;
                        omtClassification.DimTwo5 = result.dim2_5;
                        omtClassification.DimTwoNeg = result.dim2_neg > result.dim2_pos ? 1 : 0;
                        omtClassification.DimTwoPos = result.dim2_pos >= result.dim2_neg ? 1 : 0;
                        omtClassification.Timestamp = new Date();

                        omtClassifications.push(omtClassification)
                        this.omtClassificationService.omtClassifications.next(omtClassifications);
                        
                    }
                }
                return result;
            });
        }
        catch (error) {
            console.error(body_data);
            console.error(error);
            throw error;
        }


        return result;
    }
}