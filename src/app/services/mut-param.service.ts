import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

export interface IMUTParams {
    F: IMUTParamsDim;
    M: IMUTParamsDim;
    A: IMUTParamsDim;
    L: IMUTParamsDim
}

export interface IMUTParamsDim {
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
    21: number;
    22: number;
    23: number;
    24: number;
    25: number;
    26: number;
    27: number;
    28: number;
    29: number;
    30: number;
    31: number;
    32: number;
    33: number;
    34: number;
    35: number;
    36: number;
    37: number;
    38: number;
}

@Injectable()
export class MUTParametereService {
    private mutParams: IMUTParams;
    private mutParamsUrl: string = "assets/mut_items/mut_params.json";

    constructor(private http: HttpClient) { }

    public async getMUTParam(dim: string, question: number): Promise<number> {
        await this.getParams();
        
        return Promise.resolve(this.mutParams[dim][question]);
        

    }

    private async getParams(): Promise<void> {
        if (!this.mutParams) {
            await this.http.get<IMUTParams>(this.mutParamsUrl)
                .toPromise()
                .then((params) => {
                    this.mutParams = params;
                })
                .catch((error: any) => {
                    console.error("Error while trying to read mut parameters.");
                    return Promise.reject(error.message || error);
                })
        }
    }


}