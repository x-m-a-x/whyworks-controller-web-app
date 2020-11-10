import { CoreEntity } from './core-entity';
import { EBookTextElement } from './ebook-text-element';
import { TestType } from './test-type';
import { Dimension1 } from './omt-dimensions';



export class EBookContentArea extends CoreEntity {
    public Id: number = 0;
    public Name: string;
    public Order?: number;
    public TextElements?: EBookTextElement[];
    public TestType: TestType;
    public Dimension1: Dimension1;



    public static createFromApiItem(apiItem: EBookContentArea): EBookContentArea {
        let item = new EBookContentArea();
        item.Id = apiItem.Id;
        item.Name = apiItem.Name;
        item.Order = apiItem.Order;
        item.TestType = apiItem.TestType;
        item.Dimension1 = apiItem.Dimension1;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Name: this.Name,
            Order: this.Order,
            TestType: TestType[this.TestType],
            Dimension1: this.Dimension1 ? Dimension1[this.Dimension1] : 0
        }
        return item;
    }
}