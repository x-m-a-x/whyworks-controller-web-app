import { CoreEntity } from './core-entity';
import { License } from './license';



export class User extends CoreEntity {
    public Id: number = 0;
    public Name: string;
    public EMail: string;
    public Password: string;
    public Admin: boolean;
    public LicenseId?: number;
    public License?: License
    public Authdata?: string;

    public static createFromApiItem(apiItem: User): User {
        let item = new User();
        item.Id = apiItem.Id;
        item.Name = apiItem.Name;
        item.EMail = apiItem.EMail;
        item.Password = apiItem.Password;
        item.Admin = apiItem.Admin;
        item.LicenseId = apiItem.LicenseId;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Name: this.Name,
            EMail: this.EMail,
            Password: this.Password,            
            Admin: this.Admin,
            LicenseId: this.LicenseId
        }
        return item;
    }
}