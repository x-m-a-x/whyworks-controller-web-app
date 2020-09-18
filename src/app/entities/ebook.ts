import { CoreEntity } from './core-entity';
import { PersonalityTest } from './personality-test';
import { TestType } from './test-type';



export class EBook extends CoreEntity {
    public Id: number = 0;
    public TestType: TestType;
    public PersonalityTestId: number;
    public PersonalityTest?: PersonalityTest;


    public static createFromApiItem(apiItem: EBook): EBook {
        let item = new EBook();
        item.Id = apiItem.Id;
        item.TestType = apiItem.TestType;
        item.PersonalityTestId = apiItem.PersonalityTestId

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            TestType: this.TestType,
            PersonalityTestId: this.PersonalityTestId
        }
        return item;
    }
}