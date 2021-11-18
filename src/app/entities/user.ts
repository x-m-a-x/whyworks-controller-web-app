import { CoreEntity } from './core-entity';
import { License } from './license';



export class User extends CoreEntity {
    public Id: number = 0;
    public Name: string;
    public EMail: string;
    public Password: string;
    public FirstName: string;
    public LastName: string;
    public Gender: Gender;
    public Admin: boolean;
    public LicenseId?: number;
    public License?: License
    public Authdata?: string;

    public static createFromApiItem(apiItem: User): User {
        let item = new User();
        item.Id = apiItem.Id;
        item.Name = apiItem.Name;
        item.FirstName = apiItem.FirstName;
        item.LastName = apiItem.LastName;
        item.Gender = apiItem.Gender;
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
            FirstName: this.FirstName,
            LastName: this.LastName,
            Gender: this.Gender,
            EMail: this.EMail,
            Password: this.Password,            
            Admin: this.Admin,
            LicenseId: this.LicenseId
        }
        return item;
    }
}


export enum Gender {
    Male = 1,
    Female,
    Divers
}