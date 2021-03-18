import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalityTestService, EBookContentAreaService, EBookTextElementService } from '../../services';
import { EBookContentArea, EBookTextElement, PersonalityTest, TestType, SpecialCaseClass, Congruence, Dimension1, SpecialCase, EnergizationClass, Energization } from '../../entities';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from "rxjs";

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
    ) { }

    public async ngOnInit() {
        this.route.params.subscribe(async (params) => {
            this.personalityTest = this.personalityTestService.personalityTests.getValue()?.find(pt => pt.Id == +params['testId']);



            await this.setEBookContent();

        });
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

        let eBookContent = ``;
        for (let i = 0; i < this.eBookContentAreas.length; i++) {
            eBookContent += `<h1>` + this.eBookContentAreas[i].Name + `</h1></br>`;
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

        this.eBookContent += eBookContent; 
    }
}