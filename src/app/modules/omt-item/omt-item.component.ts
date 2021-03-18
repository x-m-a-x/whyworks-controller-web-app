import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { OMTSurveyItem, OMTClassification, ClassificationResult } from '../../entities';
import { ClassificationService, OMTClassificationService } from '../../services';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from "rxjs";

@Component({
    selector: "omt-item",
    styleUrls: ["./omt-item.component.scss"],
    templateUrl: "./omt-item.component.html"
})

export class OmtItemComponent implements OnInit, OnDestroy {
    @Input() omt: OMTSurveyItem;
    public classificationResult: ClassificationResult;
    public omtClassification: OMTClassification;
    public edit: boolean = false;
    private omtClassificationSubscription: Subscription;

    public image_classification: FormGroup;
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

    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private classificationService: ClassificationService,
        private omtClassificationService: OMTClassificationService,
    ) {
        this.image_classification = formBuilder.group({
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
    }

    public async ngOnInit(): Promise<void> {
        this.omtClassification = this.omtClassificationService.omtClassifications.getValue()?.find(c => c.OMTSurveyItemId == this.omt.Id);
        

        this.mightControl.setValue(this.omtClassification?.DimOneM);
        this.relationControl.setValue(this.omtClassification?.DimOneA);
        this.freedomControl.setValue(this.omtClassification?.DimOneF);
        this.performanceControl.setValue(this.omtClassification?.DimOneL);

        this.positiveControl.setValue(this.omtClassification?.DimTwoPos);
        this.negativeControl.setValue(this.omtClassification?.DimTwoNeg);

        this.oneControl.setValue(this.omtClassification?.DimTwo1);
        this.twoControl.setValue(this.omtClassification?.DimTwo2);
        this.threeControl.setValue(this.omtClassification?.DimTwo3);
        this.fourControl.setValue(this.omtClassification?.DimTwo4);
        this.fiveControl.setValue(this.omtClassification?.DimTwo5);


        this.image_classification.disable();

        this.omtClassificationSubscription = this.classificationService.response.subscribe((response) => {
            if (response?.omtItemId == this.omt?.Id) {
                this.mightControl.setValue(response.dim1_M);
                this.relationControl.setValue(response.dim1_A);
                this.freedomControl.setValue(response.dim1_F);
                this.performanceControl.setValue(response.dim1_L);

                this.positiveControl.setValue(response.dim2_pos);
                this.negativeControl.setValue(response.dim2_neg);

                this.oneControl.setValue(response.dim2_1);
                this.twoControl.setValue(response.dim2_2);
                this.threeControl.setValue(response.dim2_3);
                this.fourControl.setValue(response.dim2_4);
                this.fiveControl.setValue(response.dim2_5);
            }
        })
    }

    public async ngOnDestroy(): Promise<void> {
        this.omtClassificationSubscription.unsubscribe();
    }


    public async editClassification(): Promise<void> {
        this.edit = true;
        this.image_classification.enable();
    }

    public async saveChanges(): Promise<void> {
        if (!this.omtClassification) {
            this.omtClassification = new OMTClassification;            
            this.omtClassification.OMTSurveyItemId = this.omt.Id;
        }

        this.omtClassification.Timestamp = new Date();


        this.omtClassification.DimOneM = this.mightControl.value ? this.mightControl.value : 0;
        this.omtClassification.DimOneL = this.performanceControl.value ? this.performanceControl.value : 0;
        this.omtClassification.DimOneA = this.relationControl.value ? this.relationControl.value : 0;
        this.omtClassification.DimOneF = this.freedomControl.value ? this.freedomControl.value : 0;

        this.omtClassification.DimTwoPos = this.positiveControl.value ? this.positiveControl.value : 0;
        this.omtClassification.DimTwoNeg = this.negativeControl.value ? this.negativeControl.value : 0;

        this.omtClassification.DimTwo1 = this.oneControl.value ? this.oneControl.value : 0;
        this.omtClassification.DimTwo2 = this.twoControl.value ? this.twoControl.value : 0;
        this.omtClassification.DimTwo3 = this.threeControl.value ? this.threeControl.value : 0;
        this.omtClassification.DimTwo4 = this.fourControl.value ? this.fourControl.value : 0;
        this.omtClassification.DimTwo5 = this.fiveControl.value ? this.fiveControl.value : 0;

        this.omtClassification = await this.omtClassificationService.setSingleToWebApi(this.omtClassification);
        this.omtClassificationService.omtClassifications.next(await this.omtClassificationService.getFromWebApi());


        this.snackBar.open("Klassifizierung gespeichert.", "", {
            duration: 2000,
        });

        this.edit = false;
        this.image_classification.disable();
    }

    public async cancelChanges(): Promise<void> {
        this.mightControl.setValue(this.omtClassification?.DimOneM);
        this.relationControl.setValue(this.omtClassification?.DimOneA);
        this.freedomControl.setValue(this.omtClassification?.DimOneF);
        this.performanceControl.setValue(this.omtClassification?.DimOneL);

        this.positiveControl.setValue(this.omtClassification?.DimTwoPos);
        this.negativeControl.setValue(this.omtClassification?.DimTwoNeg);

        this.oneControl.setValue(this.omtClassification?.DimTwo1);
        this.twoControl.setValue(this.omtClassification?.DimTwo2);
        this.threeControl.setValue(this.omtClassification?.DimTwo3);
        this.fourControl.setValue(this.omtClassification?.DimTwo4);
        this.fiveControl.setValue(this.omtClassification?.DimTwo5);

        this.edit = false;
        this.image_classification.disable();
    }

    public classify() {
        this.classificationService.classifyAllDimensions(+this.omt.Image, this.omt.Answer1, this.omt.Answer2, this.omt.Answer3, this.omt.Id).then((result) => {
            this.classificationResult = result;
        });
    }


}
