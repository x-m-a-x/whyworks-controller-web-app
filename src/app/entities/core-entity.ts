export abstract class CoreEntity {
    public Id: any = 0;

    public abstract toApiItem(): any;

    public static createFromApiItem(apiItem: CoreEntity): CoreEntity {
        return apiItem;
    }
}