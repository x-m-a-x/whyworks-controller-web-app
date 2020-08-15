import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { TestType } from '../../entities';

@Component({
    selector: "e-books",
    styleUrls: ["./e-books.component.scss"],
    templateUrl: "./e-books.component.html"
})

export class EBooksComponent implements OnInit {
    public ebookType: TestType;

    constructor(
        private route: ActivatedRoute,
    ) { }

    public async ngOnInit(): Promise<void> {
        this.route.params.subscribe(async (params) => {
            this.ebookType = params.category;
            console.log(this.ebookType);
        });
    }
}