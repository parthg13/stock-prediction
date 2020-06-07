import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(5)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })
  get email():any {return this.loginForm.get('email')}
  get password():any {return this.loginForm.get('password')}
  get r_name():any {return this.registerForm.get('name')}
  get r_email():any {return this.registerForm.get('email')}
  get r_password():any {return this.registerForm.get('password')}
  get r_cpassword():any {return this.registerForm.get('cpassword')}
  registerFlag:boolean = false;


  constructor(private sharedService: SharedService, private apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.registerForm.get('cpassword')
    .valueChanges
    .subscribe((value)=>{
      if(this.registerForm.get('password').value != value){
        this.registerForm.get('cpassword').setErrors([Validators.required]);
      }
    })
  }

  submitClicked(){
    if(this.loginForm.invalid)
    return;
    this.sharedService.setShowLoaderStatus(true);
    this.apiService.loginUser(this.loginForm.value)
    .subscribe((res)=>{
      console.log("Res:",res);
      this.sharedService.setShowLoaderStatus(false);
      this.router.navigate(['home/dashboard']);
    },(error)=>{
      console.log("Error:",error);
      this.sharedService.setShowLoaderStatus(false);
    })
  }
  registerClicked(){
    if(this.registerForm.invalid)
    return;
    this.sharedService.setShowLoaderStatus(true);
    this.apiService.registerUser(this.registerForm.value)
    .subscribe((res)=>{
      console.log("Res:",res);
      this.sharedService.setShowLoaderStatus(false);
      this.router.navigate(['home/dashboard']);
    },(error)=>{
      console.log("Error:",error);
      this.sharedService.setShowLoaderStatus(false);
    })
  }
}
