import { CoreEntity } from './core-entity';
import { TestResultMeasure } from './test-result-measure';

export class TestResultMeasureDefinition extends CoreEntity {
    public Id: string;
    public Description: string;
    public TestResultMeasures?: TestResultMeasure[];

    public static createFromApiItem(apiItem: TestResultMeasureDefinition): TestResultMeasureDefinition {
        let item = new TestResultMeasureDefinition();
        item.Id = apiItem.Id;
        item.Description = apiItem.Description;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Description: this.Description,
        }
        return item;
    }
}