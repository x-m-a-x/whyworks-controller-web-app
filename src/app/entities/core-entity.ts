export abstract class CoreEntity {
    public Id: number = 0;

    public abstract toApiItem(): any;

    public static createFromApiItem(apiItem: CoreEntity): CoreEntity {
        return apiItem;
    }
}