import { CoreEntity } from './core-entity';
import { AdditionalFieldDefinition } from './additional-field-definition';

export class AdditionalValidValue extends CoreEntity {
    public Id: number = 0;
    public Value: string;
    public AdditionalFieldDefinitionId: number;
    public AdditionalFieldDefinition?: AdditionalFieldDefinition;


    public static createFromApiItem(apiItem: AdditionalValidValue): AdditionalValidValue {
        let item = new AdditionalValidValue();
        item.Id = apiItem.Id;
        item.Value = apiItem.Value;
        item.AdditionalFieldDefinitionId = apiItem.AdditionalFieldDefinitionId;


        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Value: this.Value,
            AdditionalFieldDefinitionId: this.AdditionalFieldDefinitionId
        }
        return item;
    }
}