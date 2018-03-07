import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.scss']
})
export class MenuHomeComponent implements OnInit {
  menu:Array<any>;
  constructor(public menuServ:MenuService) { 
this.menu = []
  }

  ngOnInit() {
    this.menuServ.getMenu().subscribe(menus =>  {console.log(menus),menus.forEach((menuBBDD) => this.menu.push(menuBBDD))})
  }

}
