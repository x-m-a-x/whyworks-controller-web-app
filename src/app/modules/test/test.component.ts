import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PersonalityTest, License, MUTSurvey, OMTSurvey, OMTSurveyItem, OMTClassification, OMTSurveyClassification, MUTSurveyItem, MUTSurveyClassification } from '../../entities';
import {
    PersonalityTestService, LicenseService, OMTSurveyService, OMTSurveyItemService, OMTClassificationService,
    OMTSurveyClassificationService, MUTQuestionService, IMUTQuestion, MUTSurveyItemService,
    MUTSurveyClassificationService, MUTSurveyService
} from '../../services';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: "test",
    styleUrls: ["./test.component.scss"],
    templateUrl: "./test.component.html"
})

export class TestComponent implements OnInit {
    public personalityTest: PersonalityTest;
    public omtSurvey: OMTSurvey;
    public omtItems: OMTSurveyItem[];
    public omtItemClassifications: OMTClassification[];
    public omtSurveyClassification: OMTSurveyClassification;
    public mutSurvey: MUTSurvey;
    public mutItems: MUTSurveyItem[];
    public mutSurveyClassification: MUTSurveyClassification;
    public license: License;
    public error: any;
    public omtEdit: boolean = false;
    public mutEdit: boolean = false;
    public isMobile: boolean;
    public mutQuestions: IMUTQuestion[];

    public omtClassification: FormGroup;
    public mightControl = new FormControl();
    public relationControl = new FormControl();
    public freedomControl = new FormControl();
    public performanceControl = new FormControl();
    public positiveControl = new FormControl();
    public negativeControl = new FormControl();
    public oneControl = new FormControl();
    public twoControl = new FormControl();
    public threeControl = new FormControl();
    public fourControl = new FormControl();
    public fiveControl = new FormControl();

    public mutClassification: FormGroup;
    public mutMightControl = new FormControl();
    public mutRelationControl = new FormControl();
    public mutFreedomControl = new FormControl();
    public mutPerformanceControl = new FormControl();


    constructor(
        private deviceDetectorService: DeviceDetectorService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private location: Location,
        private licenseService: LicenseService,
        private personalityTestService: PersonalityTestService,
        private omtSurveyService: OMTSurveyService,
        private omtSurveyItemService: OMTSurveyItemService,
        private omtClassificationService: OMTClassificationService,
        private omtSurveyClassificationService: OMTSurveyClassificationService,
        private mutQuestionService: MUTQuestionService,
        private mutSurveyService: MUTSurveyService,
        private mutSurveyItemService: MUTSurveyItemService,
        private mutSurveyClassificationService: MUTSurveyClassificationService,
        private snackBar: MatSnackBar,
    ) {
        this.omtClassification = formBuilder.group({
            might: this.mightControl,
            relation: this.relationControl,
            freedom: this.freedomControl,
            performance: this.performanceControl,
            positvie: this.positiveControl,
            negative: this.negativeControl,
            one: this.oneControl,
            two: this.twoControl,
            three: this.threeControl,
            four: this.fourControl,
            five: this.fiveControl
        });

        this.mutClassification = formBuilder.group({
            mutMight: this.mutMightControl,
            mutRelation: this.mutRelationControl,
            mutFreedom: this.mutFreedomControl,
            mutPerformance: this.mutPerformanceControl
        });
    }

    public async ngOnInit(): Promise<void> {
        this.isMobile = this.deviceDetectorService.isMobile();

        this.route.params.subscribe(async (params) => {
            this.personalityTest = this.personalityTestService.personalityTests.getValue()?.find(pt => pt.Id == +params['testId']);
            this.license = this.licenseService.licenses.getValue()?.find(l => l.TestId == this.personalityTest?.Id);
            if (!this.license) {
                this.license = this.licenseService.licenses.getValue()?.find(l => l.Id == this.personalityTest?.LicenseId);
            }

            // OMT
            this.omtSurvey = this.omtSurveyService.omtSurveys.getValue()?.find(omt => omt.TestId == this.personalityTest?.Id);
            if (!this.omtSurvey) {
                this.omtSurveyService.omtSurveys.next(await this.omtSurveyService.getFromWebApi());
                this.omtSurvey = this.omtSurveyService.omtSurveys.getValue()?.find(omt => omt.TestId == this.personalityTest?.Id);
            }

            this.omtItems = this.omtSurveyItemService.omtSurveyItems.getValue()?.filter(i => i.OMTSurveyID == this.omtSurvey.Id);
            if (!this.omtItems) {
                this.omtSurveyItemService.omtSurveyItems.next(await this.omtSurveyItemService.getFromWebApi());
                this.omtItems = this.omtSurveyItemService.omtSurveyItems.getValue()?.filter(i => i.OMTSurveyID == this.omtSurvey?.Id);
            }

            this.omtItemClassifications = this.omtClassificationService.omtClassifications.getValue()?.filter(c => this.omtItems.findIndex(o => o.Id == c.OMTSurveyItemId) >= 0);
            if (!this.omtItemClassifications) {
                this.omtClassificationService.omtClassifications.next(await this.omtClassificationService.getFromWebApi());
                this.omtItemClassifications = this.omtClassificationService.omtClassifications.getValue()?.filter(c => this.omtItems.findIndex(o => o.Id == c.OMTSurveyItemId) >= 0);
            }

            for (let i = 0; i < this.omtItems?.length; i++) {
                let classification = this.omtItemClassifications?.find(c => c.OMTSurveyItemId == this.omtItems[i].Id);
                if (!classification) {
                    classification = new OMTClassification();
                    classification.OMTSurveyItemId = this.omtItems[i].Id;
                }

                this.omtItems[i].OMTClassification = classification;
            }

            this.omtSurveyClassification = this.omtSurveyClassificationService.omtSurveyClassifications.getValue()?.find(c => c.OMTSurveyId == this.omtSurvey?.Id);
            if (!this.omtSurveyClassification) {
                this.omtSurveyClassificationService.omtSurveyClassifications.next(await this.omtSurveyClassificationService.getFromWebApi());
                this.omtSurveyClassification = this.omtSurveyClassificationService.omtSurveyClassifications.getValue()?.find(c => c.OMTSurveyId == this.omtSurvey?.Id);
            }

            this.mightControl.setValue(this.omtSurveyClassification?.DimOneM);
            this.relationControl.setValue(this.omtSurveyClassification?.DimOneA);
            this.freedomControl.setValue(this.omtSurveyClassification?.DimOneF);
            this.performanceControl.setValue(this.omtSurveyClassification?.DimOneL);
            this.positiveControl.setValue(this.omtSurveyClassification?.DimTwoPos);
            this.negativeControl.setValue(this.omtSurveyClassification?.DimTwoNeg);
            this.oneControl.setValue(this.omtSurveyClassification?.DimTwo1);
            this.twoControl.setValue(this.omtSurveyClassification?.DimTwo2);
            this.threeControl.setValue(this.omtSurveyClassification?.DimTwo3);
            this.fourControl.setValue(this.omtSurveyClassification?.DimTwo4);
            this.fiveControl.setValue(this.omtSurveyClassification?.DimTwo5);

            this.omtClassification.disable();


            // MUT
            this.mutQuestions = await this.mutQuestionService.getMUTQuestions();

            this.mutSurvey = this.mutSurveyService.mutSurveys.getValue()?.find(mut => mut.TestId == this.personalityTest?.Id);
            if (!this.mutSurvey) {
                this.mutSurveyService.mutSurveys.next(await this.mutSurveyService.getFromWebApi());
                this.mutSurvey = this.mutSurveyService.mutSurveys.getValue()?.find(mut => mut.TestId == this.personalityTest?.Id);
            }

            this.mutItems = this.mutSurveyItemService.mutSurveyItems.getValue()?.filter(i => i.MUTSurveyId == this.mutSurvey?.Id);
            if (!this.mutItems) {
                this.mutSurveyItemService.mutSurveyItems.next(await this.mutSurveyItemService.getFromWebApi());
                this.mutItems = this.mutSurveyItemService.mutSurveyItems.getValue()?.filter(i => i.MUTSurveyId == this.mutSurvey?.Id);
            }

            this.mutSurveyClassification = this.mutSurveyClassificationService.mutSurveyClassifications.getValue()?.find(c => c.MUTSurveyId == this.mutSurvey?.Id);
            if (!this.mutSurveyClassification) {
                this.mutSurveyClassificationService.mutSurveyClassifications.next(await this.mutSurveyClassificationService.getFromWebApi());
                this.mutSurveyClassification = this.mutSurveyClassificationService.mutSurveyClassifications.getValue()?.find(c => c.MUTSurveyId == this.mutSurvey?.Id);
            }

            this.mutMightControl.setValue(this.mutSurveyClassification?.DimOneM)
            this.mutRelationControl.setValue(this.mutSurveyClassification?.DimOneA)
            this.mutFreedomControl.setValue(this.mutSurveyClassification?.DimOneF)
            this.mutPerformanceControl.setValue(this.mutSurveyClassification?.DimOneL)


            this.mutClassification.disable();
        });



    }

    public getMUTQuestion(index: number): string {
        let question = this.mutQuestions.find(q => q.question == index);
        return question.de;
    }


    public backClicked() {
        this.location.back();
    }


    public async editOMT(): Promise<void> {
        this.omtEdit = true;
        this.omtClassification.enable();
    }

    public async calculateOMT(): Promise<void> {
        this.omtItemClassifications = this.omtClassificationService.omtClassifications.getValue()?.filter(c => this.omtItems.findIndex(o => o.Id == c.OMTSurveyItemId) >= 0);
        let might = 0;
        let relation = 0;
        let freedom = 0;
        let performance = 0;
        let positive = 0;
        let negative = 0;
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;



        for (let i = 0; i < this.omtItemClassifications.length; i++) {
            might += this.omtItemClassifications[i].DimOneM;
            relation += this.omtItemClassifications[i].DimOneA;
            freedom += this.omtItemClassifications[i].DimOneF;
            performance += this.omtItemClassifications[i].DimOneL;
            positive += this.omtItemClassifications[i].DimTwoPos;
            negative += this.omtItemClassifications[i].DimTwoNeg;
            one += this.omtItemClassifications[i].DimTwo1;
            two += this.omtItemClassifications[i].DimTwo2;
            three += this.omtItemClassifications[i].DimTwo3;
            four += this.omtItemClassifications[i].DimTwo4;
            five += this.omtItemClassifications[i].DimTwo5;
        }

        this.mightControl.setValue((might * 100 / (this.omtItemClassifications?.length > 0 ? this.omtItemClassifications?.length : 1)).toFixed(1));
        this.relationControl.setValue((relation * 100 / (this.omtItemClassifications?.length > 0 ? this.omtItemClassifications?.length : 1)).toFixed(1));
        this.freedomControl.setValue((freedom * 100 / (this.omtItemClassifications?.length > 0 ? this.omtItemClassifications?.length : 1)).toFixed(1));
        this.performanceControl.setValue((performance * 100 / (this.omtItemClassifications?.length > 0 ? this.omtItemClassifications?.length : 1)).toFixed(1));
        this.positiveControl.setValue((positive * 100 / (this.omtItemClassifications?.length > 0 ? this.omtItemClassifications?.length : 1)).toFixed(1));
        this.negativeControl.setValue((negative * 100 / (this.omtItemClassifications?.length > 0 ? this.omtItemClassifications?.length : 1)).toFixed(1));
        this.oneControl.setValue((one * 100 / (this.omtItemClassifications?.length > 0 ? this.omtItemClassifications?.length : 1)).toFixed(1));
        this.twoControl.setValue((two * 100 / (this.omtItemClassifications?.length > 0 ? this.omtItemClassifications?.length : 1)).toFixed(1));
        this.threeControl.setValue((three * 100 / (this.omtItemClassifications?.length > 0 ? this.omtItemClassifications?.length : 1)).toFixed(1));
        this.fourControl.setValue((four * 100 / (this.omtItemClassifications?.length > 0 ? this.omtItemClassifications?.length : 1)).toFixed(1));
        this.fiveControl.setValue((five * 100 / (this.omtItemClassifications?.length > 0 ? this.omtItemClassifications?.length : 1)).toFixed(1));



    }

    public async saveChangesOMT(): Promise<void> {
        if (!this.omtSurveyClassification) {
            this.omtSurveyClassification = new OMTSurveyClassification();
            this.omtSurveyClassification.OMTSurveyId = this.omtSurvey.Id;
        }

        this.omtSurveyClassification.Timestamp = new Date();

        this.omtSurveyClassification.DimOneA = +this.relationControl.value;
        this.omtSurveyClassification.DimOneM = +this.mightControl.value;
        this.omtSurveyClassification.DimOneL = +this.performanceControl.value;
        this.omtSurveyClassification.DimOneF = +this.freedomControl.value;

        this.omtSurveyClassification.DimTwoPos = +this.positiveControl.value;
        this.omtSurveyClassification.DimTwoNeg = +this.negativeControl.value;

        this.omtSurveyClassification.DimTwo1 = +this.oneControl.value;
        this.omtSurveyClassification.DimTwo2 = +this.twoControl.value;
        this.omtSurveyClassification.DimTwo3 = +this.threeControl.value;
        this.omtSurveyClassification.DimTwo4 = +this.fourControl.value;
        this.omtSurveyClassification.DimTwo5 = +this.fiveControl.value;

        this.omtSurveyClassification = await this.omtSurveyClassificationService.setSingleToWebApi(this.omtSurveyClassification);
        this.omtSurveyClassificationService.omtSurveyClassifications.next(await this.omtSurveyClassificationService.getFromWebApi());

        this.omtEdit = false;
        this.omtClassification.disable();

        this.snackBar.open("Klassifizierung gespeichert.", "", {
            duration: 2000,
        });

    }

    public async cancelChanges(): Promise<void> {
        this.omtEdit = false;

        this.mightControl.setValue(this.omtSurveyClassification?.DimOneM);
        this.relationControl.setValue(this.omtSurveyClassification?.DimOneA);
        this.freedomControl.setValue(this.omtSurveyClassification?.DimOneF);
        this.performanceControl.setValue(this.omtSurveyClassification?.DimOneL);
        this.positiveControl.setValue(this.omtSurveyClassification?.DimTwoPos);
        this.negativeControl.setValue(this.omtSurveyClassification?.DimTwoNeg);
        this.oneControl.setValue(this.omtSurveyClassification?.DimTwo1);
        this.twoControl.setValue(this.omtSurveyClassification?.DimTwo2);
        this.threeControl.setValue(this.omtSurveyClassification?.DimTwo3);
        this.fourControl.setValue(this.omtSurveyClassification?.DimTwo4);
        this.fiveControl.setValue(this.omtSurveyClassification?.DimTwo5);


        this.omtClassification.disable();
    }

    public getMUTAnswer(mutAnswer: any): string {
       
        if (mutAnswer == 1) {
            return "trifft gar nicht zu";
        }
        else if (mutAnswer == 2) {
            return "trifft etwas zu";
        }
        else if (mutAnswer == 3) {
            return "trifft überwiegend zu";

        } else if (mutAnswer == 4) {
            return "trifft ausgesprochen zu";
        }

        return "test";
    }

    public async editMUT(): Promise<void> {
        this.mutEdit = true;
        this.mutClassification.enable();
    }

    public async saveChangesMUT(): Promise<void> {
        if (!this.mutSurveyClassification) {
            this.mutSurveyClassification = new MUTSurveyClassification();
            this.mutSurveyClassification.MUTSurveyId = this.mutSurvey.Id;
        }

        this.mutSurveyClassification.Timestamp = new Date();

        this.mutSurveyClassification.DimOneA = +this.mutRelationControl.value;
        this.mutSurveyClassification.DimOneM = +this.mutMightControl.value;
        this.mutSurveyClassification.DimOneL = +this.mutPerformanceControl.value;
        this.mutSurveyClassification.DimOneF = +this.mutFreedomControl.value;


        this.mutSurveyClassification = await this.mutSurveyClassificationService.setSingleToWebApi(this.mutSurveyClassification);
        this.mutSurveyClassificationService.mutSurveyClassifications.next(await this.mutSurveyClassificationService.getFromWebApi());

        this.mutEdit = false;
        this.mutClassification.disable();

        this.snackBar.open("Klassifizierung gespeichert.", "", {
            duration: 2000,
        });
        
    }

    public async cancelChangesMUT(): Promise<void> {
        this.mutEdit = false;

        this.mutMightControl.setValue(this.mutSurveyClassification?.DimOneM);
        this.mutRelationControl.setValue(this.mutSurveyClassification?.DimOneA);
        this.mutFreedomControl.setValue(this.mutSurveyClassification?.DimOneF);
        this.mutPerformanceControl.setValue(this.mutSurveyClassification?.DimOneL);


        this.mutClassification.disable();
    }

}