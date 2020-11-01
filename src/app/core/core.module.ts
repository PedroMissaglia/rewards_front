import { HeaderModule } from './header/header.module';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PoModule } from '@po-ui/ng-components';



@NgModule({
  declarations: [SidebarMenuComponent],
  imports: [
    CommonModule,
    PoModule,
    HeaderModule
  ],
  exports: [SidebarMenuComponent, HeaderComponent]
})
export class CoreModule { }
