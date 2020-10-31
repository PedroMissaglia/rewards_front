import { CategoryModule } from './category/category.module';
import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryModule } from './history/history.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    CategoryModule,
    HistoryModule
  ]
})
export class FeaturesModule { }
