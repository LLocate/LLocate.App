import { Component } from '@angular/core';

@Component({
  selector: 'app-portal-footer',
  templateUrl: './portal-footer.component.html',
  styleUrls: ['./portal-footer.component.css'],
})
export class PortalFooterComponent {
 year = new Date().getFullYear();
}
