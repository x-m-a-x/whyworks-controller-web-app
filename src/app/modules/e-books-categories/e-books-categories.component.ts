import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';
import { EBookDefinitionService, EBookContentAreaService, EBookTextElementService } from '../../services';
import { EBookDefinition, EBookContentArea, EBookTextElement } from '../../entities';

@Component({
    selector: "e-books-categories",
    styleUrls: ["./e-books-categories.component.scss"],
    templateUrl: "./e-books-categories.component.html"
})

export class EBooksCategoriesComponent implements OnInit, OnDestroy {
    public isDesktopDevice: boolean = true;
    public isMobile: boolean = false;
    public isTablet: boolean = false;
    public eBookDefinitions: EBookDefinition[];
    public eBookContentAreas: EBookContentArea[];
    public eBookTextElements: EBookTextElement[];

    private eBookDefinitionsSubscription: Subscription;
    private eBookContentAreasSubscription: Subscription;
    private eBookTextElementsSubscription: Subscription;

    constructor(
        private router: Router,
        private deviceDetectorService: DeviceDetectorService,
        private eBookDefinitionService: EBookDefinitionService,
        private eBookContentAreaService: EBookContentAreaService,
        private eBookTextElementService: EBookTextElementService,
    ) { }

    public async ngOnInit(): Promise<void> {
        this.isDesktopDevice = this.deviceDetectorService.isDesktop();
        this.isMobile = this.deviceDetectorService.isMobile();
        this.isTablet = this.deviceDetectorService.isTablet();


        this.eBookDefinitionsSubscription = this.eBookDefinitionService.eBookDefinitions.subscribe((eBookDefinitions) => {
            this.eBookDefinitions = eBookDefinitions;
        });
        this.eBookContentAreasSubscription = this.eBookContentAreaService.eBookContentAreas.subscribe((eBookContentAreas) => {
            this.eBookContentAreas = eBookContentAreas;
        });
        this.eBookTextElementsSubscription = this.eBookTextElementService.eBookTextElements.subscribe(async (eBookTextElements) => {
            this.eBookTextElements = eBookTextElements;
        });
    }



    public async ngOnDestroy(): Promise<void> {
        this.eBookDefinitionsSubscription.unsubscribe();
        this.eBookContentAreasSubscription.unsubscribe();
        this.eBookTextElementsSubscription.unsubscribe();
    }

    public async onEBookCategoryClicked(category: any): Promise<void> {
        this.router.navigateByUrl("eBooks/" + category.toString());
    }

    public getContentAreasPerType(type: any): number {
        let eBookDef = this.eBookDefinitions?.find(d => d.TestType == type);
        if (!eBookDef) return 0;
        return this.eBookContentAreas ? this.eBookContentAreas?.filter(ca => ca.EBookDefinitionId == eBookDef.Id)?.length : 0;
    }
}