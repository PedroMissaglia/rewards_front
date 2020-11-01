import { PoModule, PoPageModule } from '@po-ui/ng-components';
import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpModalComponent } from './sign-up-modal/sign-up-modal.component';



@NgModule({
  declarations: [HeaderComponent, SignUpModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PoModule,
    PoPageModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
