import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EBooksComponent } from '../e-books.component';
import { TestType, EBookContentArea } from '../../../entities';
import { EBookContentAreaService } from '../../../services';
import { MatTable, MatTableDataSource } from '@angular/material/table';


@Component({
    selector: 'reorder-areas',
    styleUrls: ['../e-books.component.scss'],
    templateUrl: 'reorder-areas.component.html',
})

export class ReorderAreasComponent implements OnInit {
    public dataSource: any;
    public displayedColumns: string[] = ['Name', 'Order'];
    public save: boolean = false;

    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<EBooksComponent>,
        private eBookContentAreaService: EBookContentAreaService,
    ) { }

    public async ngOnInit(): Promise<void> {
        let contentAreas = this.eBookContentAreaService.eBookContentAreas.getValue();
        contentAreas = contentAreas?.filter(ca => TestType[ca.TestType] == this.data.type.toString());
        contentAreas = contentAreas?.sort((a, b) => a.Order < b.Order ? -1 : a.Order > b.Order ? 1 : 0)

        this.dataSource = new MatTableDataSource(contentAreas);
    }

 

    public async changeOrder(element: any, up: boolean) {
        let contentAreas = await this.dataSource.data;
        let index_prev = await contentAreas?.indexOf(element);        
        let index = up ? Math.max(index_prev - 1, 0) : Math.min(index_prev + 1, contentAreas.length - 1);       
        contentAreas = await contentAreas.filter(c => c.Id != element.Id);
        await contentAreas?.splice(index, 0, element);

        this.dataSource.data = await contentAreas;
        this.save = (index != index_prev) || this.save;

    }

    public async saveOrder(): Promise<void> {
        for (let i = 0; i < this.dataSource.data.length; i++) {
            this.dataSource.data[i].Order = i + 1;            
            await this.eBookContentAreaService.setSingleToWebApi(EBookContentArea.createFromApiItem(this.dataSource.data[i]).toApiItem());
        }

        this.eBookContentAreaService.eBookContentAreas.next(await this.eBookContentAreaService.getFromWebApi());
        this.save = false;

        this.snackBar.open("Reihenfolge der Textbereiche erfolgreich geändert.", "", {
            duration: 2000,
        });

        this.dialogRef.close();
    }

    public async onCancelClick(): Promise<void> {
        this.dialogRef.close();
    }
}