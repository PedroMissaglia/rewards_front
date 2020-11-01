import { PoModule, PoPageModule } from '@po-ui/ng-components';
import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PoModule,
    PoPageModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
