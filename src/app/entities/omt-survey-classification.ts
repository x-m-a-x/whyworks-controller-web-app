import { CoreEntity } from './core-entity';
import { OMTSurvey } from './omt-survey';


export class OMTSurveyClassification extends CoreEntity {
    public Id: number = 0;
    public Timestamp: Date;
    public DimOneM: number;
    public DimOneL: number;
    public DimOneA: number;
    public DimOneF: number;
    public DimTwoPos: number;
    public DimTwoNeg: number;
    public DimTwo1: number;
    public DimTwo2: number;
    public DimTwo3: number;
    public DimTwo4: number;
    public DimTwo5: number;
    
    public OMTSurveyId: number;
    public OMTSurvey?: OMTSurvey;

    public static createFromApiItem(apiItem: OMTSurveyClassification): OMTSurveyClassification {
        let item = new OMTSurveyClassification();
        item.Id = apiItem.Id;
        item.Timestamp = apiItem.Timestamp;
        item.DimOneM = apiItem.DimOneM;
        item.DimOneL = apiItem.DimOneL;
        item.DimOneA = apiItem.DimOneA;
        item.DimOneF = apiItem.DimOneF;
        item.DimTwoPos = apiItem.DimTwoPos;
        item.DimTwoNeg = apiItem.DimTwoNeg;
        item.DimTwo1 = apiItem.DimTwo1;
        item.DimTwo2 = apiItem.DimTwo2;
        item.DimTwo3 = apiItem.DimTwo3;
        item.DimTwo4 = apiItem.DimTwo4;
        item.DimTwo5 = apiItem.DimTwo5;
        item.OMTSurveyId = apiItem.OMTSurveyId;
        

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Timestamp: this.Timestamp,
            DimOneM: this.DimOneM,
            DimOneL: this.DimOneL,
            DimOneA: this.DimOneA,
            DimOneF: this.DimOneF,
            OMTSurveyId: this.OMTSurveyId,
            DimTwoPos: this.DimTwoPos,
            DimTwoNeg: this.DimTwoNeg,
            DimTwo1: this.DimTwo1,
            DimTwo2: this.DimTwo2,
            DimTwo3: this.DimTwo3,
            DimTwo4: this.DimTwo4,
            DimTwo5: this.DimTwo5,
        }
        return item;
    }
}
