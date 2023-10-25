// Import necessary modules
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Globals } from './globals';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private globals: Globals, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        let user = this.globals.user;
        if (user && !user.isCompleteOnboarding) 
            this.router.navigate(['/onboarding']);
        return true;
    }
}
