import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';
import { EBookContentAreaService, EBookTextElementService } from '../../services';
import { EBookContentArea, EBookTextElement, TestType } from '../../entities';

@Component({
    selector: "e-books-categories",
    styleUrls: ["./e-books-categories.component.scss"],
    templateUrl: "./e-books-categories.component.html"
})

export class EBooksCategoriesComponent implements OnInit, OnDestroy {
    public isDesktopDevice: boolean = true;
    public isMobile: boolean = false;
    public isTablet: boolean = false;
    public eBookContentAreas: EBookContentArea[];
    public eBookTextElements: EBookTextElement[];


    private eBookContentAreasSubscription: Subscription;
    private eBookTextElementsSubscription: Subscription;

    constructor(
        private router: Router,
        private deviceDetectorService: DeviceDetectorService,
        private eBookContentAreaService: EBookContentAreaService,
        private eBookTextElementService: EBookTextElementService,
    ) { }

    public async ngOnInit(): Promise<void> {
        this.isDesktopDevice = this.deviceDetectorService.isDesktop();
        this.isMobile = this.deviceDetectorService.isMobile();
        this.isTablet = this.deviceDetectorService.isTablet();



        this.eBookContentAreasSubscription = this.eBookContentAreaService.eBookContentAreas.subscribe((eBookContentAreas) => {
            this.eBookContentAreas = eBookContentAreas;
        });
        this.eBookTextElementsSubscription = this.eBookTextElementService.eBookTextElements.subscribe(async (eBookTextElements) => {
            this.eBookTextElements = eBookTextElements;
        });


        if (!this.eBookContentAreas) {
            this.eBookContentAreaService.eBookContentAreas.next(await this.eBookContentAreaService.getFromWebApi());
        }
        if (!this.eBookTextElements) {
            this.eBookTextElementService.eBookTextElements.next(await this.eBookTextElementService.getFromWebApi());
        }
    }



    public async ngOnDestroy(): Promise<void> {
        this.eBookContentAreasSubscription.unsubscribe();
        this.eBookTextElementsSubscription.unsubscribe();
    }

    public async onEBookCategoryClicked(category: any): Promise<void> {
        this.router.navigateByUrl("eBooks/" + category.toString());
    }

    public getContentAreasPerType(type: any): number {
        
        return this.eBookContentAreas ? this.eBookContentAreas.filter(ca => TestType[ca.TestType] == type.toString()).length : 0;
    }

    public getTextElementsPerType(type: any): number {
        let contentAreas = this.eBookContentAreas?.filter(ca => TestType[ca.TestType] == type.toString())
        if (!contentAreas) return 0;
        return this.eBookTextElements ? this.eBookTextElements.filter(te => contentAreas.filter(ca => ca.Id == te.EBookContentAreaId)?.length > 0).length : 0;
    }
}