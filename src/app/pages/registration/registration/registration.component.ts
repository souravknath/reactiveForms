import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup
  constructor(private fb:FormBuilder) {
    this.registrationForm = this.fb.group({
      firstname:new FormControl('',[Validators.required]),
      lastname: new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.maxLength(150),Validators.minLength(5)]),
      contact:new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.email,Validators.required]),
      webaddress:new FormControl('',[Validators.required])
    })
   }

  ngOnInit() {
  }
  submit(){
    console.log(this.registrationForm);
    
  }

}
