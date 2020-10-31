import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-rewards-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Início', link: 'home' },
    { label: 'Categorias', link: 'category' },
    { label: 'Histórico', link: 'history' }

  ];

  constructor() { }

  ngOnInit(): void {
  }


  private onClick() {
    alert('Clicked in menu item');
  }



}
