import { CoreEntity } from './core-entity';
import { EBookContentArea } from './ebook-content-area';

export class EBookTextElement extends CoreEntity {
    public Id: number = 0;
    public Text: string;
    public EBookContentAreaId: number;
    public EBookContentArea?: EBookContentArea;

    public static createFromApiItem(apiItem: EBookTextElement): EBookTextElement {
        let item = new EBookTextElement();
        item.Id = apiItem.Id;
        item.Text = apiItem.Text;
        item.EBookContentAreaId = apiItem.EBookContentAreaId;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Text: this.Text,
            EBookContentAreaId: this.EBookContentAreaId
        }
        return item;
    }
}