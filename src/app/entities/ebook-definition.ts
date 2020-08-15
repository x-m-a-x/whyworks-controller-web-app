import { CoreEntity } from './core-entity';
import { TestType } from './test-type';
import { EBookContentArea } from './ebook-content-area';



export class EBookDefinition extends CoreEntity {
    public Id: number = 0;
    public TestType: TestType;
    public Name: string;
    public Description: string;
    public EBookContentAreas?: EBookContentArea[]


    public static createFromApiItem(apiItem: EBookDefinition): EBookDefinition {
        let item = new EBookDefinition();
        item.Id = apiItem.Id;
        item.TestType = apiItem.TestType;
        item.Name = apiItem.Name;
        item.Description = apiItem.Description;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Text: this.TestType,
            Name: this.Name,
            Description: this.Description,
        }
        return item;
    }
}