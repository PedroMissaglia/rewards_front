import { PoModule, PoPageModule } from '@po-ui/ng-components';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [SidebarMenuComponent, HeaderComponent],
  imports: [
    CommonModule,
    PoModule,
    PoPageModule
  ],
  exports: [SidebarMenuComponent, HeaderComponent]
})
export class CoreModule { }
