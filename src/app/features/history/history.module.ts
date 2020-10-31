import { HistoryRoutingModule } from './history.routing.module';
import { PoModule } from '@po-ui/ng-components';
import { HistoryComponent } from './history.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    PoModule,
    HistoryRoutingModule
  ],
  exports: [HistoryComponent]
})
export class HistoryModule { }
