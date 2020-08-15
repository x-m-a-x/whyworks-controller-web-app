import { CoreEntity } from './core-entity';
import { TestType } from './test-type';



export class License extends CoreEntity {
    public Id: number = 0;
    public Activated: boolean;
    public LicenseKey: string;
    public LicenseType: TestType;
    public CreatedAt: Date;
    public TestId?: number;
    public Info: string;

    public static createFromApiItem(apiItem: License): License {
        let item = new License();
        item.Id = apiItem.Id;
        item.Activated = apiItem.Activated;
        item.LicenseKey = apiItem.LicenseKey;
        item.LicenseType = apiItem.LicenseType;
        item.CreatedAt = apiItem.CreatedAt;
        item.TestId = apiItem.TestId;
        item.Info = apiItem.Info;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Activated: this.Activated,
            LicenseKey: this.LicenseKey,
            LicenseType: this.LicenseType,
            CreatedAt: new Date(Date.UTC(new Date(this.CreatedAt).getFullYear(), new Date(this.CreatedAt).getMonth()
                , new Date(this.CreatedAt).getDate(), new Date(this.CreatedAt).getHours()
                , new Date(this.CreatedAt).getMinutes(), new Date(this.CreatedAt).getSeconds())),
            // CreatedAt: new Date(this.CreatedAt),
            TestId: this.TestId,
            Info: this.Info
        }
        return item;
    }
}