import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PersonalityTest, License, MUTSurvey, OMTSurvey, OMTSurveyItem, OMTClassification, OMTSurveyClassification, MUTSurveyItem, MUTSurveyClassification  } from '../../entities';
import {
    PersonalityTestService, LicenseService, OMTSurveyService, OMTSurveyItemService, OMTClassificationService,
    OMTSurveyClassificationService, MUTQuestionService, IMUTQuestion, MUTSurveyItemService,
    MUTSurveyClassificationService, MUTSurveyService, ClassificationService, MUTParametereService, OMTTParameterService,
    MUTMappingService
} from '../../services';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from "rxjs";

const delay = ms => new Promise(res => setTimeout(res, ms));

@Component({
    selector: "test",
    styleUrls: ["./test.component.scss"],
    templateUrl: "./test.component.html"
})

export class TestComponent implements OnInit, OnDestroy {
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
    public progressText: string = '';
    public loading: boolean = false;
    public unsavedChanges: boolean = false;

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

    private omtClassificationSubscription: Subscription;
    private omtSurveyItemSubscription: Subscription;
    private omtSurveySubscription: Subscription;
    private omtSurveyClassificationSubscription: Subscription;
    


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
        private classificationService: ClassificationService,
        private mutParameterService: MUTParametereService,
        private omtTParameterService: OMTTParameterService,
        private mutMappingService: MUTMappingService
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
            this.omtSurveySubscription = this.omtSurveyService.omtSurveys.subscribe((omtSurveys) => {
                this.omtSurvey = omtSurveys?.find(omt => omt.TestId == this.personalityTest?.Id);
            });
            

            this.omtItems = this.omtSurveyItemService.omtSurveyItems.getValue()?.filter(i => i.OMTSurveyID == this.omtSurvey.Id);
            this.omtSurveyItemSubscription = this.omtSurveyItemService.omtSurveyItems.subscribe((omtSurveyItems) => {
                this.omtItems = omtSurveyItems?.filter(i => i.OMTSurveyID == this.omtSurvey?.Id);
            })
           

            this.omtItemClassifications = this.omtClassificationService.omtClassifications.getValue()?.filter(c => this.omtItems.findIndex(o => o.Id == c.OMTSurveyItemId) >= 0);
            this.omtClassificationSubscription = this.omtClassificationService.omtClassifications.subscribe((omtClassifications) => {
                this.omtItemClassifications = omtClassifications?.filter(c => this.omtItems.findIndex(o => o.Id == c.OMTSurveyItemId) >= 0);
                this.unsavedChanges = this.omtItemClassifications?.findIndex(c => c.Id < 0) > -1;
            })

            for (let i = 0; i < this.omtItems?.length; i++) {
                let classification = this.omtItemClassifications?.find(c => c.OMTSurveyItemId == this.omtItems[i].Id);
                if (!classification) {
                    classification = new OMTClassification();
                    classification.OMTSurveyItemId = this.omtItems[i].Id;
                }

                this.omtItems[i].OMTClassification = classification;
            }

            this.omtSurveyClassification = this.omtSurveyClassificationService.omtSurveyClassifications.getValue()?.find(c => c.OMTSurveyId == this.omtSurvey?.Id);
            this.omtSurveyClassificationSubscription = this.omtSurveyClassificationService.omtSurveyClassifications.subscribe((omtSurveyClassifications) => {
                this.omtSurveyClassification = omtSurveyClassifications?.find(c => c.OMTSurveyId == this.omtSurvey?.Id);
                this.unsavedChanges = this.omtSurveyClassification?.Id < 0;
            })
            

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


        // // test
        // this.personalityTestService.getUnconsciousLevel(this.personalityTest?.Id, Dimension1.M);
    }

    public async ngOnDestroy(): Promise<void> {
        this.omtClassificationSubscription.unsubscribe();
        this.omtSurveyItemSubscription.unsubscribe();
        this.omtSurveySubscription.unsubscribe();
        this.omtSurveyClassificationSubscription.unsubscribe();
    }

    public getMUTQuestion(index: number): string {
        let question = this.mutQuestions.find(q => q.question == index);
        return question.de;
    }

    public async calculateMUT(): Promise<void> {
        
        let might = 0;
        let relation = 0;
        let freedom = 0;
        let performance = 0;

        for (let i = 0; i < this.mutItems.length; i++) {
            let question = this.mutItems[i].Question;
            if (this.mutItems.length > 38) {
                question = await this.mutMappingService.getShortQuestionNumber(question);
                if (!question) {
                    continue;
                }
            }

            might += await this.mutParameterService.getMUTParam('M', question) * (this.mutItems[i].Answer - 1);
            relation += await this.mutParameterService.getMUTParam('A', question) * (this.mutItems[i].Answer - 1);
            freedom += await this.mutParameterService.getMUTParam('F', question) * (this.mutItems[i].Answer - 1);
            performance += await this.mutParameterService.getMUTParam('L', question) * (this.mutItems[i].Answer - 1);
            
        }

        this.mutMightControl.setValue(might.toFixed(1));
        this.mutRelationControl.setValue(relation.toFixed(1));
        this.mutFreedomControl.setValue(freedom.toFixed(1));
        this.mutPerformanceControl.setValue(performance.toFixed(1));
    }

    public backClicked() {
        this.location.back();
    }

    public async classifyAllOMTs(): Promise<void> {
        
        this.loading = true;

        for (let i = 0; i < this.omtItems.length; i++) {
            this.progressText =  (i + 1).toString() + " von 20";
            if (this.omtItemClassifications?.findIndex(oic => oic.OMTSurveyItemId == this.omtItems[i].Id) >= 0) {
                continue;
            }

            await this.classificationService.classifyAllDimensions(+this.omtItems[i].Image, this.omtItems[i].Answer1, this.omtItems[i].Answer2, this.omtItems[i].Answer3, this.omtItems[i].Id, true);
            await delay(3000);
            let pending = true;
            let pendingDurations = 0;
            while (pending) {
                pending = this.omtItemClassifications?.findIndex(oic => oic.OMTSurveyItemId == this.omtItems[i].Id) == -1;
                
                await delay(3000);
                pendingDurations += 1;
                if (pendingDurations > 20 * 5) {
                    console.error("Antwortzeit des Klassifizier-Service überschritten!");
                    break;
                }
            }

        }

        
        this.unsavedChanges = true;
        this.loading = false;
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
            might += this.omtItemClassifications[i].DimOneM > Math.max(this.omtItemClassifications[i].DimOneA, this.omtItemClassifications[i].DimOneF, this.omtItemClassifications[i].DimOneL) ? 1 : 0;
            relation += this.omtItemClassifications[i].DimOneA > Math.max(this.omtItemClassifications[i].DimOneM, this.omtItemClassifications[i].DimOneF, this.omtItemClassifications[i].DimOneL) ? 1 : 0;
            freedom += this.omtItemClassifications[i].DimOneF > Math.max(this.omtItemClassifications[i].DimOneA, this.omtItemClassifications[i].DimOneM, this.omtItemClassifications[i].DimOneL) ? 1 : 0;
            performance += this.omtItemClassifications[i].DimOneL > Math.max(this.omtItemClassifications[i].DimOneA, this.omtItemClassifications[i].DimOneF, this.omtItemClassifications[i].DimOneM) ? 1 : 0;
            positive += this.omtItemClassifications[i].DimTwoPos > this.omtItemClassifications[i].DimTwoNeg ? 1 : 0;
            negative += this.omtItemClassifications[i].DimTwoNeg > this.omtItemClassifications[i].DimTwoPos ? 1 : 0;
            one += this.omtItemClassifications[i].DimTwo1 > Math.max(this.omtItemClassifications[i].DimTwo2, this.omtItemClassifications[i].DimTwo3, this.omtItemClassifications[i].DimTwo4, this.omtItemClassifications[i].DimTwo5) ? 1 : 0;
            two += this.omtItemClassifications[i].DimTwo2 > Math.max(this.omtItemClassifications[i].DimTwo1, this.omtItemClassifications[i].DimTwo3, this.omtItemClassifications[i].DimTwo4, this.omtItemClassifications[i].DimTwo5) ? 1 : 0;
            three += this.omtItemClassifications[i].DimTwo3 > Math.max(this.omtItemClassifications[i].DimTwo2, this.omtItemClassifications[i].DimTwo1, this.omtItemClassifications[i].DimTwo4, this.omtItemClassifications[i].DimTwo5) ? 1 : 0;
            four += this.omtItemClassifications[i].DimTwo4 > Math.max(this.omtItemClassifications[i].DimTwo2, this.omtItemClassifications[i].DimTwo3, this.omtItemClassifications[i].DimTwo1, this.omtItemClassifications[i].DimTwo5) ? 1 : 0;
            five += this.omtItemClassifications[i].DimTwo5 > Math.max(this.omtItemClassifications[i].DimTwo2, this.omtItemClassifications[i].DimTwo3, this.omtItemClassifications[i].DimTwo4, this.omtItemClassifications[i].DimTwo1) ? 1 : 0;
        }

        let sumDimOne = might + relation + freedom + performance;
        let sumDimTow = one + two + three + four + five;
        let sumPosNeg = positive + negative;
       


        this.mightControl.setValue(Math.max(20, Math.min(80, (await this.omtTParameterService.getQuantile('M', might) * 20 / sumDimOne))).toFixed(0));
        this.relationControl.setValue(Math.max(20, Math.min(80, (await this.omtTParameterService.getQuantile('A', relation) * 20 / sumDimOne))).toFixed(0));
        this.freedomControl.setValue(Math.max(20, Math.min(80, (await this.omtTParameterService.getQuantile('F', freedom) * 20 / sumDimOne))).toFixed(0));
        this.performanceControl.setValue(Math.max(20, Math.min(80, (await this.omtTParameterService.getQuantile('L', performance) * 20 / sumDimOne))).toFixed(0));
        this.positiveControl.setValue(Math.max(20, Math.min(80, (await this.omtTParameterService.getQuantile('Pos', positive) * 20 / sumPosNeg))).toFixed(0));
        this.negativeControl.setValue(Math.max(20, Math.min(80, (await this.omtTParameterService.getQuantile('Neg', negative) * 20 / sumPosNeg))).toFixed(0));
        this.oneControl.setValue(Math.max(20, Math.min(80, (await this.omtTParameterService.getQuantile('1', one) * 20 / sumDimTow))).toFixed(0));
        this.twoControl.setValue(Math.max(20, Math.min(80, (await this.omtTParameterService.getQuantile('2', two) * 20 / sumDimTow))).toFixed(0));
        this.threeControl.setValue(Math.max(20, Math.min(80, (await this.omtTParameterService.getQuantile('3', three) * 20 / sumDimTow))).toFixed(0));
        this.fourControl.setValue(Math.max(20, Math.min(80, (await this.omtTParameterService.getQuantile('4', four) * 20 / sumDimTow))).toFixed(0));
        this.fiveControl.setValue(Math.max(20, Math.min(80, (await this.omtTParameterService.getQuantile('5', five) * 20 / sumDimTow))).toFixed(0));


        this.unsavedChanges = true;
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

        let itemClassification = this.omtItemClassifications;
        console.log(itemClassification);
        for (let i = 0; i < itemClassification?.length; i++) {
            if (itemClassification[i].Id == 0) {
                await this.omtClassificationService.setSingleToWebApi(itemClassification[i]);
            }
        }

        this.omtClassificationService.omtClassifications.next(await this.omtClassificationService.getFromWebApi());
        
        this.omtEdit = false;
        this.omtClassification.disable();
        this.unsavedChanges = false;

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