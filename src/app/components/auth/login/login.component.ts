import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: UntypedFormGroup;
  public registerForm: UntypedFormGroup;
  public active = 1;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.createLoginForm();
  }

  title: string = "Panel Administración  Artesanias Lumar";
  desc: string =  "Administre su tienda de forma eficiente y sencilla. Gestione inventarios, actualice productos y supervise ventas desde un único lugar.";


  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: [''],
    })
  }

  ngOnInit() {
  }

  onSubmit() {

  }

}
