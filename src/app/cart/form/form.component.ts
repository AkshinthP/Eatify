import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupComponent } from 'src/app/popup/popup.component';
import { CartservicesService } from 'src/app/services/cartservices.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  @ViewChild(PopupComponent) popup!: PopupComponent;

  form!: FormGroup;
  price: number= 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartservicesService,
  private router: Router){}

  ngOnInit(): void{
    this.cartService.formPrice$.subscribe(price=>{
      this.price = price
      this.form.patchValue({ price: this.price });
    })

    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', Validators.required],
      price: [{ value: this.price, disabled: true }],
      payment: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.popup.openPopup();

    setTimeout(() => {
    this.router.navigate(['/cart']);
  }, 3000);
  }
}
