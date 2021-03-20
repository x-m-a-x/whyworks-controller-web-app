import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Congruence, Dimension1, PersonalityTest, SelfAssessment, EnergizationClass, SpecialCaseClass, Unconscious, QuoteClass } from '../entities';
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


    public async getUnconsciousLevel(testId: number, dim: Dimension1): Promise<Unconscious> {

        try {
            let response = await this.http.get(this.config.apiEndpoint + this.serviceConfig.entityName + "/GetUnconsciousLevel/" + testId + "/" + dim,
                (await this.getRequestCredentials())).toPromise() as unknown as Unconscious;
            return response;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }


    public async getCongruenceLevel(testId: number): Promise<Congruence> {

        try {
            let response = await this.http.get(this.config.apiEndpoint + this.serviceConfig.entityName + "/GetCongruenceLevel/" + testId,
                (await this.getRequestCredentials())).toPromise() as unknown as Congruence;
            return response;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    public async getSelfAssessmentLevel(testId: number, dim: Dimension1): Promise<SelfAssessment> {

        try {
            let response = await this.http.get(this.config.apiEndpoint + this.serviceConfig.entityName + "/GetSelfAssessmentLevel/" + testId + "/" + dim,
                (await this.getRequestCredentials())).toPromise() as unknown as SelfAssessment;
            return response;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    public async getSpecialCases(testId: number): Promise<SpecialCaseClass> {

        try {
            let response = await this.http.get(this.config.apiEndpoint + this.serviceConfig.entityName + "/GetSpecialCases/" + testId,
                (await this.getRequestCredentials())).toPromise() as unknown as SpecialCaseClass;
            return SpecialCaseClass.createFromApiItem(response);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    public async getEnergizationLevel(testId: number, dim: Dimension1): Promise<EnergizationClass> {

        try {
            let response = await this.http.get(this.config.apiEndpoint + this.serviceConfig.entityName + "/GetEnergizationLevel/" + testId + "/" + dim,
                (await this.getRequestCredentials())).toPromise() as unknown as EnergizationClass;
            return EnergizationClass.createFromApiItem(response);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    public async getQuote(testId: number, dim: Dimension1, sentiment: string): Promise<QuoteClass> {
        try {
            
            let response = await this.http.get(this.config.apiEndpoint + this.serviceConfig.entityName + "/GetQuote/" + testId + "/" + dim + "/" + sentiment,
               (await this.getRequestCredentials())).toPromise() as unknown as QuoteClass;               
                        
            
            return QuoteClass.createFromApiItem(response);
        }
        catch (error) {
            console.log(error);
            return null;
            
        }

    }
}