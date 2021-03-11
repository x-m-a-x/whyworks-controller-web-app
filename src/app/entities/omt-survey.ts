import { CoreEntity } from './core-entity';
import { PersonalityTest } from './personality-test';
import { OMTSurveyItem } from './omt-survey-item';


export class OMTSurvey extends CoreEntity {
    public Id: number = 0;
    public Timestamp: Date;
    public Train: boolean;
    public TestId: number;
    public Test?: PersonalityTest;
    public OMTSurveyItems?: OMTSurveyItem[];

    public static createFromApiItem(apiItem: OMTSurvey): OMTSurvey {
        let item = new OMTSurvey();
        item.Id = apiItem.Id;
        item.Timestamp = apiItem.Timestamp;
        item.Train = apiItem.Train;
        item.TestId = apiItem.TestId;
        

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Timestamp: this.Timestamp,
            Train: this.Train,
            TestId: this.TestId
        }
        return item;
    }
}