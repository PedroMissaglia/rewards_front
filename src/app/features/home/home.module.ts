import { PoModule } from '@po-ui/ng-components';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PoModule,
    MatCardModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
