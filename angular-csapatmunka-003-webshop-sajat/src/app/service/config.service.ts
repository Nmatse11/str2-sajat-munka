import { Injectable } from '@angular/core';

export interface IMenuItem {
  text: string;
  link: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  appName: string = 'Minden, ami LEGO';

  menuItems: IMenuItem[] = [
    {text: 'Főoldal', link: '/', icon: 'home'},
    {text: 'LEGO DUPLO', link: '/legoduplo'},
    {text: 'LEGO', link: '/lego'},
    {text: 'Admin', link: '/admin'},
  ];

  constructor() { }
}
