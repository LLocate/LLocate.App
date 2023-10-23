import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { GetUserDto } from '../web-api-client';

@Injectable({
  providedIn: 'root'
})
export class Globals {
  title: string = "L'Locate";
  year: number = new Date().getFullYear();
  mobileQuery: MediaQueryList;

  user: GetUserDto;

  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  setTitle(_title: string): void{
    this.title = _title;
  }

  setUser(_user: GetUserDto): void{
    this.user = _user;
  }
}

