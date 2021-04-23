export class RestPackResponse {
    public cached: boolean;
    public height: number;
    public width: number;
    public image: string;    
    public run_time: number;
    

    public static createFromApiItem(apiItem: RestPackResponse): RestPackResponse {
        let item = new RestPackResponse();
        item.cached = apiItem.cached;
        item.height = apiItem.height;
        item.width = apiItem.width;
        item.image = apiItem.image;
        item.run_time = apiItem.run_time;

        return item;
    }
}