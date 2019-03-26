import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  profileForm:FormGroup;
  selectedCar: string;
  cars = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'}
  ];
  constructor(private fb:FormBuilder, private toast:ToastrService) { 
  this.profileForm = this.fb.group({
    name:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    email:new FormControl('',[Validators.required, Validators.email,Validators.pattern("[^ @]*@[^ @]*")]),
    entrydate:new FormControl(''),
    gender:new FormControl(''),
    blodgroup:new FormControl('',[Validators.required]),
    skills: this.fb.array([this.addnewSkillsFormGroup()])
  })
  }
  addnewSkillsFormGroup(){
    return this.fb.group({
      technology:['',Validators.required],
      experience:['',Validators.required]
    })
  }
  addSkill(){
    this.skillArray.push(this.addnewSkillsFormGroup())
  }
  removeSkill(index){
    this.skillArray.removeAt(index);
  }
  get skillArray(){
    return <FormArray>this.profileForm.get('skills');
  }
  ngOnInit() {
  }
  onSubmit(){
    if (this.profileForm.valid) {
      console.log("Form Submitted!");
      this.toast.success("Submit Successfuly","Success");
    }
    console.log(this.profileForm);
    
  }
}
