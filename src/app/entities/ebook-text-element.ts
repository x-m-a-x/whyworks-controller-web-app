import { CoreEntity } from './core-entity';
import { EBookContentArea } from './ebook-content-area';

export class EBookTextElement extends CoreEntity {
    public Id: number = 0;
    public Text: string;
    public EBookContentAreaId: number;
    public EBookContentArea?: EBookContentArea;
    public Unconscious?: Unconscious;
    public Congruence?: Congruence;
    public SelfAssessment?: SelfAssessment;
    public Energization?: Energization;
    public SpecialCase?: SpecialCase;
    public Order?: number;


    public static createFromApiItem(apiItem: EBookTextElement): EBookTextElement {
        let item = new EBookTextElement();
        item.Id = apiItem.Id;
        item.Text = apiItem.Text;
        item.EBookContentAreaId = apiItem.EBookContentAreaId;
        item.Unconscious = apiItem.Unconscious;
        item.Congruence = apiItem.Congruence;
        item.SelfAssessment = apiItem.SelfAssessment;
        item.Energization = apiItem.Energization;
        item.SpecialCase = apiItem.SpecialCase;
        item.Order = apiItem.Order;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Text: this.Text,
            EBookContentAreaId: this.EBookContentAreaId,
            Unconscious: this.Unconscious ? Unconscious[this.Unconscious] : 0,
            Congruence: this.Congruence ? Congruence[this.Congruence] : 0,
            SelfAssessment: this.SelfAssessment ? SelfAssessment[this.SelfAssessment] : 0,
            Energization: this.Energization ? Energization[this.Energization] : 0,
            SpecialCase: this.SpecialCase ? SpecialCase[this.SpecialCase] : 0,
            Order: this.Order
        }
        return item;
    }
}

export enum Unconscious {
    Low = 1,
    Medium,
    High,
    NA
}

export enum Congruence {
    Low = 1,
    Medium,
    High
}

export enum SelfAssessment {
    MuchLower = 1,
    Lower,
    Congruence,
    Higher,
    MuchHigher,
    NA
}

export enum Energization {
    NEgreaterZero = 1,
    PEgreaterZero,
    PEgreaterNE,
    NEgreaterPE,
    PEgreaterequalNE,
    NEgreaterequalPE,
    PEgreaterNEAndPEgreaterZero,
    NEgreaterPEAndPEgreaterZero,
    PEgreaterequalNEAndPEgreaterZero,
    NEgreaterequalPEAndPEgreaterZero,
    PEgreaterNEAndNEgreaterZero,
    NEgreaterPEAndNEgreaterZero,
    PEgreaterequalNEAndNEgreaterZero,
    NEgreaterequalPEAndNEgreaterZero
}

export enum SpecialCase {
    Gemeinsames_Leisten = 1,  // Beziehung stark, Leistung mindestens Durchschnitt
    Startup, // Beziehung schwach, Leistung stark
    Pro_Soziale_Macht,  // Macht und Beziehung müssen mindestents Durchschnitt sein mit einem strikt größer; bei beiden muss PE >= NE sein
    Beziehungsfokus, // Beziehung mind. Durchschnitt; Beziehung unterschätzt; Macht schwach; M überschätzt
    Freies_Leisten,  // Beziehung höchstens Durchschnitt; Leistung stark; mindestens durchschnittlich Freiheitsantribe
    Erfahrungsorientierung, // Beziehung, Freiheit > Leistung, Macht; Beziehung, Freiheit mindestens Durchschnitt, eines der beiden stark
    Wirkungsorientierung, // Leistung, Macht > Beziehung, Freiheit; Leistung, Macht mindestens Durchschnitt, eines der beiden stark
    Sozialantriebe // Beziehung, Macht > Leistung, Freiheit; Beziehung, Macht mindestens Durchschnitt, eines der beiden stark; nicht "Gemeinsames_Leisten", nicht "Freies_Leisten"
}