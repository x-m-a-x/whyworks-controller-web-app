import { CoreEntity } from './core-entity';
import { AdditionalFieldDefinition } from './additional-field-definition';
import { PersonalityTest } from './personality-test';

export class AdditionalFieldValue extends CoreEntity {
    public Id: number = 0;
    public Value: string;
    public AdditionalFieldDefinitionId: number;
    public AdditionalFieldDefinition?: AdditionalFieldDefinition;
    public PersonalityTestId: number;
    public PersonalityTest?: PersonalityTest;

    public static createFromApiItem(apiItem: AdditionalFieldValue): AdditionalFieldValue {
        let item = new AdditionalFieldValue();
        item.Id = apiItem.Id;
        item.Value = apiItem.Value;
        item.AdditionalFieldDefinitionId = apiItem.AdditionalFieldDefinitionId;
        item.PersonalityTestId = apiItem.PersonalityTestId;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Value: this.Value,
            AdditionalFieldDefinitionId: this.AdditionalFieldDefinitionId,
            PersonalityTestId: this.PersonalityTestId
        }
        return item;
    }
}