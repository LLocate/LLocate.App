import { Injectable } from '@angular/core';
import { Globals } from 'src/app/services/globals';
import { MediaType, Menu } from './menu-model';


const USERMENUITEMS: Menu[] = [
  {
    id: 1,
    name: 'Dashboard',
    description: 'Dashboard',
    role: ['All'],
    child: undefined,
    // [
    //   {
    //     id: 1001,
    //     name: 'Workbook',
    //     description: '',
    //     role: ['All'],
    //     child: undefined,
    //     icon: 'bar_chart',
    //     path: '/sheets/workbook',
    //     isSelected: false,
    //     displayOn: MediaType.All,
    //   },
    // ],
    icon: 'bar_chart',
    path: '/dashboard',
    isSelected: false,
    displayOn: MediaType.All,
  },
  {
    id: 2,
    name: 'Spreadsheets',
    description: 'Spreadsheets',
    role: ['All'],
    child: [
      {
        id: 2001,
        name: 'Workbook',
        description: '',
        role: ['All'],
        child: undefined,
        icon: 'checklist',
        path: '/sheets/workbook',
        isSelected: false,
        displayOn: MediaType.All,
      },
      {
        id: 2002,
        name: 'Sheet Settings',
        description: '',
        role: ['All'],
        child: undefined,
        icon: 'settings',
        path: '/sheets/setting',
        isSelected: false,
        displayOn: MediaType.All,
      },
    ],
    icon: null,
    path: '/sheets',
    isSelected: false,
    displayOn: MediaType.All,
  },
  {
    id: 3,
    name: 'Goals/Savings',
    description: 'Goals',
    role: ['All'],
    child: [
      {
        id: 2001,
        name: 'Overview',
        description: '',
        role: ['All'],
        child: undefined,
        icon: 'summarize',
        path: '/goals/summary',
        isSelected: false,
        displayOn: MediaType.Mobile,
      },
      {
        id: 2002,
        name: 'Transactions',
        description: '',
        role: ['All'],
        child: undefined,
        icon: 'format_list_numbered',
        path: '/goals/transactions',
        isSelected: false,
        displayOn: MediaType.Mobile,
      },
      {
        id: 2003,
        name: 'Goal Settings',
        description: '',
        role: ['All'],
        child: undefined,
        icon: 'settings',
        path: '/goals/setting',
        isSelected: false,
        displayOn: MediaType.Mobile,
      },
    ],
    icon: null,
    path: '/goals',
    isSelected: false,
    displayOn: MediaType.All,
  },
  {
    id: 4,
    name: 'General Setting',
    description: '',
    role: ['All'],
    child: undefined,
    icon: 'settings_applications',
    path: '/general-setting',
    isSelected: false,
    displayOn: MediaType.All,
  },
];

@Injectable()
export class UserMenuItems {

  constructor(
    private global: Globals

  ) { }

  activeId: number = 1001;
  setActiveId(id: number) {
    this.activeId = id;
  }

  getMenuitem(): Menu[] {
    // const role = this.accountService.getUserProfile().roleName; // should be const for role variables
    
    let filteredByView = USERMENUITEMS;

    let role = 'All';
    switch (role) {
      case 'Manager': {
        return filteredByView.filter(x => {
          return x.role.includes('Manager') || x.role.includes('User');
        });
      }
      case 'All':
      case 'Administrator': {
        return filteredByView;
      }
      case undefined:
        return filteredByView.filter(x => x.role.includes('User'));
      default: {
        return filteredByView.filter(x => x.role.includes(role));
      }
    }
  }

}


