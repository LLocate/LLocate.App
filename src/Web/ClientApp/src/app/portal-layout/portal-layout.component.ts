import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/services/globals';
import { UserMenuItems } from '../shared/menu-items/user-menu-items';
import { UsersClient } from '../web-api-client';

@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.scss']
})
export class PortalLayoutComponent implements OnInit {
  isLoading = true;
  logoutUrl = '';
  loginUrl = '';
  manageAccountUrl = '';

  isLoadingUser = true;

  private _mobileQueryListener: () => void;

  constructor(public _global: Globals,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    public _menuItem: UserMenuItems,
    private userClient: UsersClient,
    @Inject('BASE_URL') baseUrl: string,
    mediaM: MediaMatcher) {
    this.loginUrl = `${baseUrl}Identity/Account/Login`;
    this.logoutUrl = `${baseUrl}Identity/Account/Logout?returnUrl=%2F&ngsw-bypass=true`;
    this.manageAccountUrl = `${baseUrl}Identity/Account/Manage?ngsw-bypass=true`;

    _global.mobileQuery = mediaM.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    _global.mobileQuery.addEventListener('change', this._mobileQueryListener);
    // if (_authService.isAuthenticated()) {
    //   _global.user = _authService.getUserProfile();
    // }
    // else {
    //   this.isLoading = false;
    //   this._utilityService.navigateToPortal();
    // }
    this.getUser();
  }

  getUser() {
    this.isLoadingUser = true;
    this.userClient.getUser().subscribe(res => {
      if (res && res.email) {
        this._global.setUser(res);
        if(!res.isCompleteOnboarding){
          this.router.navigate(['onboarding'])
        }
      }
      this.isLoadingUser = false;
    },
    (err) =>{
      this.isLoadingUser = false;
    })
  }

  ngOnDestroy(): void {
    // this.mobileQuery.removeListener(this._mobileQueryListener);
    // this._global.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    // this._dashboardClient.getLogoutUrl().subscribe(res => {
    //   this.logoutUrl = res;
    // })
  }

  manageAccount(): void {
    console.log(this.manageAccountUrl)
    // this.router.navigateByUrl(this.manageAccountUrl);
    // this.router.navigate(['manage-account'])
    window.location.href = this.manageAccountUrl;
  }

  logout(): void {
    localStorage.clear();
    console.log(this.logoutUrl)
    // delete this._global.user;
    // this.router.navigateByUrl(this.logoutUrl);
    window.location.href = this.logoutUrl;
    // this.router.navigate(['logout'])
  }

  login(): void {
    console.log(`${this.loginUrl}?ReturnUrl=${window.location.pathname}&ngsw-bypass=true`)
    // this.router.navigate(['login'])
    // this.router.navigateByUrl(`${this.loginUrl}?ReturnUrl=${window.location.pathname}`);
    window.location.href = `${this.loginUrl}?ReturnUrl=${window.location.pathname}&ngsw-bypass=true`
  }
}
