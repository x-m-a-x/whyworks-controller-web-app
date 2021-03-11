import { CoreEntity } from './core-entity';
// import { OMTSurvey } from './omt-survey';
import { TestType } from './test-type';
import { MUTSurvey } from './mut-survey';
import { License } from './license';

export class PersonalityTest extends CoreEntity {
    public Id: number = 0;
    public Timestamp: Date;
    public MailAddress: string;
    public Type: TestType;
    public MUTSurveyId?: number;
    public MUTSurvey?: MUTSurvey;
    public OMTSurveyId?: number;
    // public OMTSurvey?: OMTSurvey;
    public LicenseId?: number;
    public License?: License;


    public static createFromApiItem(apiItem: PersonalityTest): PersonalityTest {
        let item = new PersonalityTest();
        item.Id = apiItem.Id;
        item.Timestamp = apiItem.Timestamp;
        item.MailAddress = apiItem.MailAddress;
        item.Type = apiItem.Type;
        item.MUTSurveyId = apiItem.MUTSurveyId;
        item.OMTSurveyId = apiItem.OMTSurveyId;
        item.LicenseId = apiItem.LicenseId;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Timestamp: new Date(Date.UTC(this.Timestamp.getFullYear(), this.Timestamp.getMonth()
                , this.Timestamp.getDate(), this.Timestamp.getHours()
                , this.Timestamp.getMinutes(), this.Timestamp.getSeconds())),
            MailAddress: this.MailAddress,
            Type: this.Type,
            MUTSurveyId: this.MUTSurveyId,
            OMTSurveyId: this.OMTSurveyId,
            LicenseId: this.LicenseId
        }
        return item;
    }
}