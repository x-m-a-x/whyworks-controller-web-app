import { CoreEntity } from './core-entity';
import { EBookTextElement } from './ebook-text-element';
import { EBookDefinition } from './ebook-definition';



export class EBookContentArea extends CoreEntity {
    public Id: number = 0;
    public Name: string;
    public TextElements?: EBookTextElement[];
    public EBookDefinitionId: number;
    public EBookDefinition?: EBookDefinition;


    public static createFromApiItem(apiItem: EBookContentArea): EBookContentArea {
        let item = new EBookContentArea();
        item.Id = apiItem.Id;
        item.Name = apiItem.Name;
        item.EBookDefinitionId = apiItem.EBookDefinitionId;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Name: this.Name,
            EBookDefinitionId: this.EBookDefinitionId
        }
        return item;
    }
}