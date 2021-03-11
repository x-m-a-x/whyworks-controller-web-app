import { CoreEntity } from './core-entity';
import { MUTSurveyItem } from './mut-survey-item';


export class MUTSurveyClassification extends CoreEntity {
    public Id: number = 0;
    public Timestamp: Date;
    public DimOneM: number;
    public DimOneL: number;
    public DimOneA: number;
    public DimOneF: number;
    public MUTSurveyId?: number;
    public MUTSurveyItem?: MUTSurveyItem;

    public static createFromApiItem(apiItem: MUTSurveyClassification): MUTSurveyClassification {
        let item = new MUTSurveyClassification();
        item.Id = apiItem.Id;
        item.Timestamp = apiItem.Timestamp;
        item.DimOneM = apiItem.DimOneM;
        item.DimOneL = apiItem.DimOneL;
        item.DimOneA = apiItem.DimOneA;
        item.DimOneF = apiItem.DimOneF;
        item.MUTSurveyId = apiItem.MUTSurveyId;

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
            MUTSurveyId: this.MUTSurveyId
        }
        return item;
    }
}