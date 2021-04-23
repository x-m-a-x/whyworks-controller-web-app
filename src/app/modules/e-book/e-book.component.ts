import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalityTestService, EBookContentAreaService, EBookTextElementService, PdfConvertService } from '../../services';
import { EBookContentArea, PersonalityTest, SpecialCaseClass, Congruence, Dimension1, SpecialCase, Energization } from '../../entities';

@Component({
    selector: "e-book",
    styleUrls: ["./e-book.component.scss"],
    templateUrl: "./e-book.component.html"
})

export class EBookComponent implements OnInit {
    public personalityTest: PersonalityTest;
    public eBookContentAreas: EBookContentArea[];
    public eBookContent: string = '';
    public congruence: Congruence;
    public specialCaseClass: SpecialCaseClass;



    @ViewChild('eBook', { static: false }) eBook: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private personalityTestService: PersonalityTestService,
        private eBookContentAreaService: EBookContentAreaService,
        private eBookTextElementService: EBookTextElementService,
        private pdfConvertService: PdfConvertService
    ) {
    }

    public async ngOnInit() {
        this.route.params.subscribe(async (params) => {
            this.personalityTest = this.personalityTestService.personalityTests.getValue()?.find(pt => pt.Id == +params['testId']);



            await this.setEBookContent();

        });
    }

    public async exportPDF(): Promise<void> {


        let content = this.eBook.nativeElement;
        // console.log(content.innerHTML);

        let pdfResponse = await this.pdfConvertService.htmlToPdf(content.innerHTML);
        console.log(pdfResponse);
        window.open(pdfResponse?.image, "_blank");
    }

    public async setEBookContent(): Promise<void> {



        this.eBookContentAreas = this.eBookContentAreaService.eBookContentAreas.getValue()?.filter(ca => ca.TestType == this.personalityTest?.Type);

        if (!this.eBookContentAreas) {
            this.eBookContentAreaService.eBookContentAreas.next(await this.eBookContentAreaService.getFromWebApi());
            this.eBookContentAreas = this.eBookContentAreaService.eBookContentAreas.getValue()?.filter(ca => ca.TestType == this.personalityTest?.Type);
        }

        this.eBookContentAreas = this.eBookContentAreas.sort((a, b) => a.Order < b.Order ? -1 : a.Order > b.Order ? 1 : 0)

        if (!this.eBookTextElementService.eBookTextElements.getValue()) {
            this.eBookTextElementService.eBookTextElements.next(await this.eBookTextElementService.getFromWebApi());
        }


        this.congruence = await this.personalityTestService.getCongruenceLevel(this.personalityTest?.Id);
        this.specialCaseClass = await this.personalityTestService.getSpecialCases(this.personalityTest?.Id);


        let eBookContent = `<div class="main">`;
        
        for (let i = 0; i < this.eBookContentAreas.length; i++) {

            let textElements = this.eBookTextElementService.eBookTextElements.getValue()?.filter(t => t.EBookContentAreaId == this.eBookContentAreas[i].Id);

            for (let j = 0; j < textElements.length; j++) {
                if (textElements[j].SpecialCase > 0 && !this.specialCaseClass[SpecialCase[textElements[j].SpecialCase]]) {
                    continue;
                }

                if (this.eBookContentAreas[i].Dimension1 == Dimension1.General) {
                    if (textElements[j].Congruence > 0 && textElements[j].Congruence != this.congruence) {
                        continue;
                    }

                    eBookContent += textElements[j].Text + `</br></br>`;
                    continue;
                }

                let energizationClass = await this.personalityTestService.getEnergizationLevel(this.personalityTest.Id, this.eBookContentAreas[i].Dimension1);
                if (textElements[j].Energization > 0 && !energizationClass[Energization[textElements[j].Energization]]) {
                    continue;
                }

                let selfAssessment = await this.personalityTestService.getSelfAssessmentLevel(this.personalityTest.Id, this.eBookContentAreas[i].Dimension1);
                if (textElements[j].SelfAssessment > 0 && textElements[j].SelfAssessment != selfAssessment) {
                    continue;
                }

                let unconscious = await this.personalityTestService.getUnconsciousLevel(this.personalityTest.Id, this.eBookContentAreas[i].Dimension1);
                if (textElements[j].Unconscious > 0 && textElements[j].Unconscious != unconscious) {
                    continue;
                }

                eBookContent += textElements[j].Text + `</br></br>`;

            }

            eBookContent += `</br>`;



        }

        eBookContent += `</div>`;
        this.eBookContent += eBookContent;

        await this.fillQuotes();
        await this.setBulletPoints();
        await this.setFormats();

    }



    private async fillQuotes(): Promise<void> {

        while (true) {
            let cite = this.eBookContent.match(/<cite(.*)>/);
            if (!cite) break;
            let dim = cite[1]?.trim().split(" ")[1]
            let dimNumber = 0;
            if (dim.toLowerCase() == "b") dimNumber = Dimension1.A;
            if (dim.toLowerCase() == "m") dimNumber = Dimension1.M;
            if (dim.toLowerCase() == "f") dimNumber = Dimension1.F;
            if (dim.toLowerCase() == "l") dimNumber = Dimension1.L;

            let sentiment = cite[0]?.trim().split(" ")[1]

            let quote = await this.personalityTestService.getQuote(this.personalityTest.Id, dimNumber, sentiment);
            let textInsert = `<br/><br/><div style="border: 1px solid green;"><i>\"` + quote.Text.trim() + `\"</i></div><br/><br/>`;

            this.eBookContent = this.eBookContent.replace(cite[0], textInsert);

        }
    }

    private async setBulletPoints(): Promise<void> {

        this.eBookContent = this.eBookContent.replace("<star>", "<ul><li>");
        this.eBookContent = this.eBookContent.replace("</star>", "</li></ul>");
    }

    private async setFormats(): Promise<void> {
        this.eBookContent = this.eBookContent.replace("\\n\\n", "<br/>");

    }
}