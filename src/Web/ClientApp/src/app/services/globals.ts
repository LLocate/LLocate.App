import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { GetUserDto } from '../web-api-client';
import { ThemeService } from './theme.service';
import { AppConstants, Currency } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class Globals {
  title: string = "L'Locate";
  year: number = new Date().getFullYear();
  mobileQuery: MediaQueryList;
  user: GetUserDto;

  currency: Currency;
  currencies = AppConstants.currencies;

  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  setTitle(_title: string): void{
    this.title = _title;
  }

  setUser(_user: GetUserDto): void{
    this.user = _user;
    this.currency = this.currencies.find(x => x.code == this.user.currencyCode);
  }

  getCurrency(): string{
    return this.currency.symbol;
  }
}

