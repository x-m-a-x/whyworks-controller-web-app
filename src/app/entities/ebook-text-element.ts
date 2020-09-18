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


    public static createFromApiItem(apiItem: EBookTextElement): EBookTextElement {
        let item = new EBookTextElement();
        item.Id = apiItem.Id;
        item.Text = apiItem.Text;
        item.EBookContentAreaId = apiItem.EBookContentAreaId;
        item.Unconscious = apiItem.Unconscious;
        item.Congruence = apiItem.Congruence;
        item.SelfAssessment = apiItem.SelfAssessment;
        item.Energization = apiItem.Energization;

        return item;
    }

    public toApiItem(): any {
        const item: any = {
            Id: this.Id,
            Text: this.Text,
            EBookContentAreaId: this.EBookContentAreaId,
            Unconscious: this.Unconscious ? Unconscious[this.Unconscious] : null,
            Congruence: this.Congruence ? Congruence[this.Congruence] : null,
            SelfAssessment: this.SelfAssessment ? SelfAssessment[this.SelfAssessment] : null,
            Energization: this.Energization ? Energization[this.Energization] : null
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

export enum Congruence
{
    Low = 1,
    Medium,
    High
}

export enum SelfAssessment
{
    MuchLower = 1,
    Lower,
    Congruence,
    Higher,
    MuchHigher,
    NA
}

export enum Energization
{
    NEgreaterZero = 1,
    PEgreaterZero,
    PEgreaterNE,
    NEgreaterPE,
    PEgreaterequalNE,
    NEgreaterequalPE,
    PEgreaterNEAndPEgreaterZero,
    NEgreaterPEAndPEgreaterZero,
    PEgreaterequalNEAndPEgreaterZero,
    NEgreaterequalPEAndPEgreaterZero ,
    PEgreaterNEAndNEgreaterZero ,
    NEgreaterPEAndNEgreaterZero ,
    PEgreaterequalNEAndNEgreaterZero ,
    NEgreaterequalPEAndNEgreaterZero 
}