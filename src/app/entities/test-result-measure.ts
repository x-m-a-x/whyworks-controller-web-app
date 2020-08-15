import { CoreEntity } from './core-entity';
import { PersonalityTest } from './personality-test';
import { TestResultMeasureDefinition } from './test-result-measure-definition';

export class TestResultMeasure extends CoreEntity {
    public Id: number = 0;
    public TestId: number;
    public PersonalityTest?: PersonalityTest;
    public TestResultMeasureDefinitionId: string;
    public TestResultMeasureDefinition?: TestResultMeasureDefinition;


    public static createFromApiItem(apiItem: TestResultMeasure): TestResultMeasure {
        let item = new TestResultMeasure();
        item.Id = apiItem.Id;
        item.TestId = apiItem.TestId;
        item.TestResultMeasureDefinitionId = apiItem.TestResultMeasureDefinitionId;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            TestId: this.TestId,
            TestResultMeasureDefinitionId: this.TestResultMeasureDefinitionId,
        }
        return item;
    }
}