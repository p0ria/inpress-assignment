import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    exports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class SharedModule { }