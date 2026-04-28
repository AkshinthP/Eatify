import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {


  quickLinks = [
    { label: 'About Us', url: '#' },
    { label: 'Careers', url: '#' },
    { label: 'Contact', url: '#' },
    { label: 'Blog', url: '#' }
  ];

  locations = [
    'Bangalore', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad'
  ];

  subscribeEmail: string = '';

  subscribe() {
    if (this.subscribeEmail) {
      alert(`Subscribed successfully with ${this.subscribeEmail}`);
      this.subscribeEmail = '';
    }
  }
}
