import { CoreEntity } from './core-entity';
import { OMTSurvey } from './omt-survey';
import { OMTClassification } from './omt-classification';


export class OMTSurveyItem extends CoreEntity {
    public Id: number = 0;
    public Image: number;
    public Answer1: string;
    public Answer2: string;
    public Answer3: string;
    public Answer4: string;
    public ChosenPerson?: number;
    public OMTSurveyID: number;
    public OMTSurvey?: OMTSurvey;
    public OMTClassification?: OMTClassification;

    public static createFromApiItem(apiItem: OMTSurveyItem): OMTSurveyItem {
        let item = new OMTSurveyItem();
        item.Id = apiItem.Id;
        item.Image = apiItem.Image;
        item.Answer1 = apiItem.Answer1;
        item.Answer2 = apiItem.Answer2;
        item.Answer3 = apiItem.Answer3;
        item.Answer4 = apiItem.Answer4;
        item.ChosenPerson = apiItem.ChosenPerson;
        item.OMTSurveyID = apiItem.OMTSurveyID;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Image: this.Image,
            Answer1: this.Answer1,
            Answer2: this.Answer2,
            Answer3: this.Answer3,
            Answer4: this.Answer4,
            ChosenPerson: this.ChosenPerson,
            OMTSurveyID: this.OMTSurveyID,
        }
        return item;
    }
}