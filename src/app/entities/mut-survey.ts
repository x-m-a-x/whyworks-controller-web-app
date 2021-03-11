import { CoreEntity } from './core-entity';
import { PersonalityTest } from './personality-test';
import { MUTSurveyItem } from './mut-survey-item';


export class MUTSurvey extends CoreEntity {
    public Id: number = 0;
    public Timestamp: Date;
    public TestId: number;
    public Test?: PersonalityTest;
    public MUTSurveyItems?: MUTSurveyItem[];

    public static createFromApiItem(apiItem: MUTSurvey): MUTSurvey {
        let item = new MUTSurvey();
        item.Id = apiItem.Id;
        item.Timestamp = apiItem.Timestamp;
        item.TestId = apiItem.TestId

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Timestamp: this.Timestamp,
            TestId: this.TestId
        }
        return item;
    }
}