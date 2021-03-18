export class EnergizationClass {

    public NEgreaterZero: boolean = false;
    public PEgreaterZero: boolean = false;
    public PEgreaterNE: boolean = false;
    public NEgreaterPE: boolean = false;
    public PEgreaterequalNE: boolean = false;
    public NEgreaterequalPE: boolean = false;
    public PEgreaterNEAndPEgreaterZero: boolean = false;
    public NEgreaterPEAndPEgreaterZero: boolean = false;
    public PEgreaterequalNEAndPEgreaterZero: boolean = false;
    public NEgreaterequalPEAndPEgreaterZero: boolean = false;
    public PEgreaterNEAndNEgreaterZero: boolean = false;
    public NEgreaterPEAndNEgreaterZero: boolean = false;
    public PEgreaterequalNEAndNEgreaterZero: boolean = false;
    public NEgreaterequalPEAndNEgreaterZero: boolean = false;

    public static createFromApiItem(apiItem: EnergizationClass): EnergizationClass {
        let item = new EnergizationClass();
        item.NEgreaterZero = apiItem.NEgreaterZero;
        item.PEgreaterZero = apiItem.PEgreaterZero;
        item.PEgreaterNE = apiItem.PEgreaterNE;
        item.NEgreaterPE = apiItem.NEgreaterPE;
        item.PEgreaterequalNE = apiItem.PEgreaterequalNE;
        item.NEgreaterequalPE = apiItem.NEgreaterequalPE;
        item.PEgreaterNEAndPEgreaterZero = apiItem.PEgreaterNEAndPEgreaterZero;
        item.NEgreaterPEAndPEgreaterZero = apiItem.NEgreaterPEAndPEgreaterZero;
        item.PEgreaterequalNEAndPEgreaterZero = apiItem.PEgreaterequalNEAndPEgreaterZero;
        item.NEgreaterequalPEAndPEgreaterZero = apiItem.NEgreaterequalPEAndPEgreaterZero;
        item.PEgreaterNEAndNEgreaterZero = apiItem.PEgreaterNEAndNEgreaterZero;
        item.NEgreaterPEAndNEgreaterZero = apiItem.NEgreaterPEAndNEgreaterZero;
        item.PEgreaterequalNEAndNEgreaterZero = apiItem.PEgreaterequalNEAndNEgreaterZero;
        item.NEgreaterequalPEAndNEgreaterZero = apiItem.NEgreaterequalPEAndNEgreaterZero;

        return item;
    }
}