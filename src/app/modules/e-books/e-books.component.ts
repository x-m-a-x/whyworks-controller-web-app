import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { TestType, EBookContentArea, EBookTextElement, Unconscious, Congruence, SelfAssessment, Energization } from '../../entities';
import { EBookContentAreaService, EBookTextElementService } from '../../services';
import { Subscription, fromEventPattern } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ContentAreaNewComponent } from './e-books-dialogs/content-area-new.component'
import { TextElementNewComponent } from './e-books-dialogs/text-element-new.component';
import { ReorderAreasComponent } from './e-books-dialogs/reorder-areas.component';
import { ContentAreaDeleteComponent } from './e-books-dialogs/content-area-delete.component';
import { TextDeleteComponent } from './e-books-dialogs/text-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
    selector: "e-books",
    styleUrls: ["./e-books.component.scss"],
    templateUrl: "./e-books.component.html"
})

export class EBooksComponent implements OnInit, OnDestroy {
    public ebookType: TestType;
    public contentAreas: EBookContentArea[];
    public textElements: EBookTextElement[];
    private eBookContentAreasSubscription: Subscription;
    private eBookTextElementsSubscription: Subscription;
    public editContentAreaId: number = -1;
    private editedContentArea: EBookContentArea;

    constructor(
        private route: ActivatedRoute,
        private eBookContentAreaService: EBookContentAreaService,
        private eBookTextElementService: EBookTextElementService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) { }

    public async ngOnInit(): Promise<void> {
        this.route.params.subscribe(async (params) => {
            this.ebookType = params.category;

        });

        this.eBookContentAreasSubscription = this.eBookContentAreaService.eBookContentAreas.subscribe((contentAreas) => {
            this.contentAreas = contentAreas ? contentAreas.filter(ca => TestType[ca.TestType] == this.ebookType.toString()) : [];
            for (let i = 0; i < this.contentAreas?.length; i++) {
                this.contentAreas[i].TextElements = this.eBookTextElementService.eBookTextElements.getValue()?.filter(te => te.EBookContentAreaId == this.contentAreas[i].Id);
            }
            this.contentAreas?.sort((a, b) => a.Order < b.Order ? -1 : a.Order > b.Order ? 1 : 0)
        });

        this.eBookTextElementsSubscription = this.eBookTextElementService.eBookTextElements.subscribe((textElements) => {
            for (let i = 0; i < this.contentAreas?.length; i++) {
                this.contentAreas[i].TextElements = textElements.filter(te => te.EBookContentAreaId == this.contentAreas[i].Id);
            }
        });

        if (!this.contentAreas) {
            this.eBookContentAreaService.eBookContentAreas.next(await this.eBookContentAreaService.getFromWebApi());
        }
    }

    public async ngOnDestroy(): Promise<void> {
        this.eBookContentAreasSubscription.unsubscribe();
        this.eBookTextElementsSubscription.unsubscribe();
    }

    public async addContentArea(): Promise<void> {
        let ebookType = this.ebookType;
        const dialogRef = this.dialog.open(ContentAreaNewComponent, {
            width: '80%',
            data: { ebookType }
        });

        dialogRef.afterClosed().subscribe(result => { });
    }

    openAddItemDialog(): void {
        let ebookType = this.ebookType;
        const dialogRef = this.dialog.open(ContentAreaNewComponent, {
            width: '80%',
            data: { ebookType }
        });

        dialogRef.afterClosed().subscribe(result => {

        });
    }

    public async reorderContentAreas(): Promise<void> {
        let type = this.ebookType;
        const dialogRef = this.dialog.open(ReorderAreasComponent, {
            width: '80%',
            data: { type }
        });

        dialogRef.afterClosed().subscribe(result => { });


    }

    public async saveChanges(): Promise<void> {
        this.editContentAreaId = -1;

        // this.eBookContentAreaService.setSingleToWebApi(this.editedContentArea);

        for (let i = 0; i < this.editedContentArea.TextElements?.length; i++) {
            this.eBookTextElementService.setSingleToWebApi(this.editedContentArea.TextElements[i].toApiItem());
        }

        this.snackBar.open("Textbereich '" + this.editedContentArea.Name + "' gespeichert.", "", {
            duration: 2000,
        });
        this.editedContentArea = null;
    }

    public async cancelChanges(): Promise<void> {
        this.editContentAreaId = -1;
        this.editedContentArea = null;
        this.eBookTextElementService.eBookTextElements.next(await this.eBookTextElementService.getFromWebApi());
    }

    public async deleteContentArea(contentArea: any): Promise<void> {

        const dialogRef = this.dialog.open(ContentAreaDeleteComponent, {
            width: '80%',
            data: { contentArea }
        });

        dialogRef.afterClosed().subscribe(async result => {
            this.eBookContentAreaService.eBookContentAreas.next(await this.eBookContentAreaService.getFromWebApi());
            this.eBookTextElementService.eBookTextElements.next(await this.eBookTextElementService.getFromWebApi());
        });

    }

    public async deleteTextElement(textElement: any): Promise<void> {
        const dialogRef = this.dialog.open(TextDeleteComponent, {
            width: '80%',
            data: { textElement }
        });

        dialogRef.afterClosed().subscribe(async result => {
            this.eBookTextElementService.eBookTextElements.next(await this.eBookTextElementService.getFromWebApi());
        });
    }

    public async editContentArea(contentArea: any): Promise<void> {
        this.editContentAreaId = contentArea.Id;
        this.editedContentArea = contentArea;
    }

    public async onTextChange(text: any, textId: number) {
        for (let i = 0; i < this.editedContentArea?.TextElements?.length; i++) {
            if (this.editedContentArea.TextElements[i].Id == textId) {
                let textElement = this.editedContentArea.TextElements[i];
                textElement.Text = text;
                this.editedContentArea.TextElements[i] = textElement;
                break;
            }
        }
    }

    public async addTextElement(area: any): Promise<void> {

        const dialogRef = this.dialog.open(TextElementNewComponent, {
            width: '80%',
            data: { area }
        });

        dialogRef.afterClosed().subscribe(result => { });

    }

    public translateUnconscious(value: Unconscious): string {
        if (value == Unconscious.High) {
            return "stark unbewusst";
        }
        else if (value == Unconscious.Medium) {
            return "durchschnittlich unbewusst";
        }
        else if (value == Unconscious.Low) {
            return "schwach unbewusst";
        }
        else {
            return "keine Kodierung"
        }
    }

    public translateCongruence(value: Congruence): string {
        if (value == Congruence.Low) {
            return "allg. Inkongruenz";
        }
        else if (value == Congruence.Medium) {
            return "vereinz. (In-)Kongruenzen";
        }
        else {
            return "allg. Kongruenz";
        }
    }

    public translateSelfAssessment(value: SelfAssessment): string {
        if (value == SelfAssessment.MuchLower) {
            return "starke Unterschätzung";
        }
        else if (value == SelfAssessment.Lower) {
            return "Unterschätzung";
        }
        else if (value == SelfAssessment.Congruence) {
            return "Kongruenz";
        }
        else if (value == SelfAssessment.Higher) {
            return "Überschätzung";
        }
        else if (value == SelfAssessment.MuchHigher) {
            return "starke Überschätzung";
        }
    }

    public translateEnergization(value: Energization): string {
        if (value == Energization.NEgreaterZero) {
            return "NE > 0";
        }
        else if (value == Energization.PEgreaterZero) {
            return "PE > 0";
        }
        else if (value == Energization.PEgreaterNE) {
            return "PE > NE";
        }
        else if (value == Energization.NEgreaterPE) {
            return "NE > PE";
        }
        else if (value == Energization.PEgreaterequalNE) {
            return "PE >= NE";
        }
        else if (value == Energization.NEgreaterequalPE) {
            return "NE >= PE";
        }
        else if (value == Energization.PEgreaterNEAndPEgreaterZero) {
            return "PE > NE und PE > 0";
        }
        else if (value == Energization.NEgreaterPEAndPEgreaterZero) {
            return "NE > PE und PE > 0";
        }
        else if (value == Energization.PEgreaterequalNEAndPEgreaterZero) {
            return "PE >= NE und PE > 0";
        }
        else if (value == Energization.NEgreaterequalPEAndPEgreaterZero) {
            return "NE >= PE und PE > 0";
        }
        else if (value == Energization.PEgreaterNEAndNEgreaterZero) {
            return "PE > NE und NE > 0";
        }
        else if (value == Energization.NEgreaterPEAndNEgreaterZero) {
            return "NE > PE und NE > 0";
        }
        else if (value == Energization.PEgreaterequalNEAndNEgreaterZero) {
            return "PE >= NE und NE > 0";
        }
        else if (value == Energization.NEgreaterequalPEAndNEgreaterZero) {
            return "NE >= PE und NE > 0";
        }

    }
}