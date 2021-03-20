import { Dimension1 } from './omt-dimensions';

export class QuoteClass {
    public Dimension: Dimension1;
    public Sentiment: string;
    public Text: string;
    public Accuracy: number;


    public static createFromApiItem(apiItem: QuoteClass): QuoteClass {
        let item = new QuoteClass();
        item.Dimension = apiItem.Dimension;
        item.Sentiment = apiItem.Sentiment;
        item.Text = apiItem.Text;
        item.Accuracy = apiItem.Accuracy;

        return item;
    }
}