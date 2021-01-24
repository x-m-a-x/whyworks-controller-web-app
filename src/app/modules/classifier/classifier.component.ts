import { Component, OnInit } from "@angular/core";
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ClassificationResult } from '../../entities';
import { ClassificationService } from '../../services';

@Component({
    selector: "classifier",
    styleUrls: ["./classifier.component.scss"],
    templateUrl: "./classifier.component.html"
})

export class ClassifierComponent implements OnInit {
    public isMobile: boolean = false;
    public classificationResult: ClassificationResult;
    public error: any;

    public classifyForm: FormGroup;
    public answer1Control = new FormControl();
    public answer2Control = new FormControl();
    public answer3Control = new FormControl();
    public imageControl = new FormControl();
    constructor(
        private deviceDetectorService: DeviceDetectorService,
        private router: Router,
        private formBuilder: FormBuilder,
        private classificationService: ClassificationService,
    ) { }

    public async ngOnInit(): Promise<void> {
        this.isMobile = this.deviceDetectorService.isMobile();

        this.classifyForm = this.formBuilder.group({
            answer1: this.answer1Control,
            answer2: this.answer2Control,
            answer3: this.answer3Control,
            image: this.imageControl,
        });
    }

    public async classify(): Promise<void> {
        this.classificationResult = null;
        this.error = null;
        this.classificationService.classifyAllDimensions(+this.imageControl.value, this.answer1Control.value, this.answer2Control.value, this.answer3Control.value).then((result) => {
            console.log(result);
            this.classificationResult = result;

        }).catch((error) => {
            this.error = error;
        });

        


    }
}