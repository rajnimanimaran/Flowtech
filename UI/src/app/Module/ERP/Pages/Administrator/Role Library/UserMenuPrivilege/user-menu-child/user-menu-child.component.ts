import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavItem } from '../../../../../../../main-board/main-board.component';

@Component({
  selector: 'app-user-menu-child',
  templateUrl: './user-menu-child.component.html',
  styleUrls: ['./user-menu-child.component.css']
})
export class UserMenuChildComponent implements OnInit {
  @Input() items: NavItem[];
  @ViewChild('childMenu') public childMenu;
  constructor() { }

  ngOnInit() {
  }

}
