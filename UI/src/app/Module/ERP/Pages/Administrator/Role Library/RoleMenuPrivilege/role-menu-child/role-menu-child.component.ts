import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavItem } from '../../../../../../../main-board/main-board.component';

@Component({
  selector: 'app-role-menu-child',
  templateUrl: './role-menu-child.component.html',
  styleUrls: ['./role-menu-child.component.css']
})
export class RoleMenuChildComponent implements OnInit {
  @Input() items: NavItem[];
  @ViewChild('childMenu') public childMenu;
  constructor() { }

  ngOnInit() {
  }

}
