import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm} from '@angular/forms';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  registered: boolean=false;
  profile;
  cannotLogin: boolean = false;

  constructor(private aServe: AuthService, private router: Router) { }

  ngOnInit() {
    // this.getValidLogin();
  }

  onLoginSubmit(login: NgForm) {
    //not registered user
    if (this.aServe.onLoginSubmitSupp(login)){
      this.aServe.validateLogIn(login.value.username, login.value.password).subscribe(data=>{
        const result: any = data;
        if(result !== null && result.result === 'success') {
          document.cookie="LoginName="+result.username;
          this.router.navigate(['main',{LoginName:result.username}]);
        } else {
          this.cannotLogin = true;
        }
      })
    }

  }


  onRegSubmit(reg: NgForm){
    if(this.aServe.onRegSubmitSupp(reg)){
      this.aServe.getRegisteredInfo(reg.value.acctname,reg.value.email,reg.value.dob,
        reg.value.zip,reg.value.password2).subscribe(data=>{
        const regResult: any = data;
        if(regResult !== null && regResult.result === 'success'){
          this.registered = true;
          reg.reset();
        }
      })

    }
  }

  validateAgeNotPass(reg: NgForm){
    return this.aServe.validateAgeNotPass(reg);
  }

  LoginFB(){
    window.location.href = 'https://secret-thicket-16343.herokuapp.com/FBlogin';
  }

}
