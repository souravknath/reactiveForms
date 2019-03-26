import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  angForm:FormGroup;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
    this.angForm = this.fb.group({
      name: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
    });
   }

  ngOnInit() {
  }
  login(){
    console.log(this.loginForm);
    
  }

}
