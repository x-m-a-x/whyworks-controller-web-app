import { CoreEntity } from './core-entity';
import { License } from './license';



export class AdditionalFieldDefinition extends CoreEntity {
    public Id: number = 0;
    public Name: string;
    public DataType: DataType;
    public Mandatory: boolean;
    public LicenseId: number;
    public License?: License;


    public static createFromApiItem(apiItem: AdditionalFieldDefinition): AdditionalFieldDefinition {
        let item = new AdditionalFieldDefinition();
        item.Id = apiItem.Id;
        item.Name = apiItem.Name;
        item.DataType = apiItem.DataType;
        item.Mandatory = apiItem.Mandatory;
        item.LicenseId = apiItem.LicenseId;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Name: this.Name,
            DataType: this.DataType,
            Mandatory: this.Mandatory,
            LicenseId: this.LicenseId
        }
        return item;
    }
}


export enum DataType {
    Text = 1,
    Number,
    Date,
    Set
}