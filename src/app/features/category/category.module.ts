import { PoModule } from '@po-ui/ng-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryRoutingModule } from './category.routing.module';



@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    PoModule,
    CategoryRoutingModule
  ],
  exports: [CategoryComponent]
})
export class CategoryModule { }
