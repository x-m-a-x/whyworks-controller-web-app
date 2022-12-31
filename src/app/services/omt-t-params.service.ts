import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

export interface IOMTParams {
    F: IOMTParamsDim;
    M: IOMTParamsDim;
    A: IOMTParamsDim;
    L: IOMTParamsDim;
    1: IOMTParamsDim;
    2: IOMTParamsDim;
    3: IOMTParamsDim;
    4: IOMTParamsDim;
    5: IOMTParamsDim;
    Pos: IOMTParamsDim;
    Neg: IOMTParamsDim;
}

export interface IOMTParamsDim {
    Mean: number;
    Var: number;
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    16: number;
    17: number;
    18: number;
    19: number;
    20: number;
}

@Injectable()
export class OMTTParameterService {
    private omtParams: IOMTParams;
    private omtParamsUrl: string = "assets/omt_items/omt_t_params.json";

    constructor(private http: HttpClient) { }

    public async getOMTMean(dim: string): Promise<number> {
        await this.getParams();

        return Promise.resolve(this.omtParams[dim].Mean);
    }

    public async getOMTVar(dim: string): Promise<number> {
        await this.getParams();

        return Promise.resolve(this.omtParams[dim].Var);
    }

    public async getQuantile(dim: string, number: number): Promise<number> {
        await this.getParams();
        if (await this.isInt(number)) {
            return Promise.resolve(this.omtParams[dim][number]);
        }

        const lowerQuant = this.omtParams[dim][Math.floor(number)];
        const upperQuant = this.omtParams[dim][Math.min(20,Math.floor(number) + 1)];

        return Promise.resolve(lowerQuant + (number - Math.floor(number)) * (upperQuant - lowerQuant));

    }

    private async getParams(): Promise<void> {
        if (!this.omtParams) {
            await this.http.get<IOMTParams>(this.omtParamsUrl)
                .toPromise()
                .then((params) => {
                    this.omtParams = params;
                })
                .catch((error: any) => {
                    console.error("Error while trying to read omt t parameters.");
                    return Promise.reject(error.message || error);
                })
        }
    }

    private async isInt(n: number): Promise<boolean> {
        return Promise.resolve(n % 1 === 0);
    }


}