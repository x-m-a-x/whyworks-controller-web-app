export class SpecialCaseClass {
    public Gemeinsames_Leisten: boolean  = false;
    public Startup: boolean = false;
    public Pro_Soziale_Macht: boolean = false;
    public Beziehungsfokus: boolean = false;
    public Freies_Leisten: boolean = false;
    public Erfahrungsorientierung: boolean = false;
    public Wirkungsorientierung: boolean = false;
    public Sozialantriebe: boolean = false;  

    public static createFromApiItem(apiItem: SpecialCaseClass): SpecialCaseClass {
        let item = new SpecialCaseClass();
        item.Gemeinsames_Leisten = apiItem.Gemeinsames_Leisten;
        item.Startup = apiItem.Startup;
        item.Pro_Soziale_Macht = apiItem.Pro_Soziale_Macht;
        item.Beziehungsfokus = apiItem.Beziehungsfokus;
        item.Freies_Leisten = apiItem.Freies_Leisten;
        item.Erfahrungsorientierung = apiItem.Erfahrungsorientierung;
        item.Wirkungsorientierung = apiItem.Wirkungsorientierung;
        item.Sozialantriebe = apiItem.Sozialantriebe;

        return item;
    }
}