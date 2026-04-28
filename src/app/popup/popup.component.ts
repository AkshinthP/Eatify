import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  constructor(private router: Router){}

  isVisible = false;
  isVisibleforall =false;

  openPopup() {
    this.isVisible = true;

    setTimeout(() => {
      this.closePopup();
    }, 3000);
  }

  closePopup() {
    this.isVisible = false;
    this.isVisibleforall= false;
    this.router.navigate(['/cart']);
  }

  orderAllpopup(){
    this.isVisibleforall= true;

    setTimeout(() => {
      this.closePopup();
    }, 3000);
  }
}
