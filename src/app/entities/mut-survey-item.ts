import { CoreEntity } from './core-entity';
import { MUTSurvey } from './mut-survey';
import { MUTSurveyClassification } from './mut-survey-classification';


export class MUTSurveyItem extends CoreEntity {
    public Id: number = 0;
    public Question: number;
    public Answer: MUTAnswerOptions;
    public MUTSurveyId: number;
    public MUTSurvey?: MUTSurvey;
    public MUTSurveyClassification?: MUTSurveyClassification;

    public static createFromApiItem(apiItem: MUTSurveyItem): MUTSurveyItem {
        let item = new MUTSurveyItem();
        item.Id = apiItem.Id;
        item.Question = apiItem.Question;
        item.MUTSurveyId = apiItem.MUTSurveyId;
        item.Answer = apiItem.Answer;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Question: this.Question,
            Answer: this.Answer,
            MUTSurveyId: this.MUTSurveyId,
        }
        return item;
    }
}

export enum MUTAnswerOptions {
    NoneApplicable = 1,
    SomeApplicable = 2,
    PredominantlyApplicable = 3,
    EntirelyApplicable = 4
}