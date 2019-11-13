import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) { }

  myServer = 'https://secret-thicket-16343.herokuapp.com';

  validateLogIn(name, password){
    return this.http.post(this.myServer+'/login',
      {username:name, password:password}, {withCredentials:true})
  }

  // getLoginVals(){
  //   return this.http.get('/assets/Profile.json');
  // }
  //
  // filterLogin(profile, inputLoginName){
  //   return profile.filter(t=>t.name === inputLoginName);
  // }
  //
  // validLogin(profile,inputLoginName){
  //   if(this.filterLogin(profile,inputLoginName).length!=0){
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
  //
  // validPassword(profile,inputLoginName,login){
  //   if(this.filterLogin(profile,inputLoginName)[0].password===login.value.password){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  //
  // }
  //


  onLoginSubmitSupp(login){
    return login.value.username != '' && login.value.password != '' && typeof (login.value.username) != "undefined"
        && typeof (login.value.password) != "undefined";
  }

  getRegisteredInfo(username, email, dob, zipcode, password){
    return this.http.post(this.myServer+'/register',
      {username, email, dob, zipcode, password}, {withCredentials:true})
  }

  onRegSubmitSupp(reg){
    return reg.valid&&reg.value.password2===reg.value.passcon&&(!this.validateAgeNotPass(reg))
  }

  validateAgeNotPass(reg){
    if (reg.value.dob!=null){
      var tmNow = new Date();
      var tmYear = tmNow.getFullYear() - 18;
      var tmMonth = tmNow.getMonth();
      var tmDate = tmNow.getDate();
      var tmCombine = new Date(tmYear,tmMonth,tmDate);
      var ret = false;
      var inputDOB = reg.value.dob;
      if(typeof (inputDOB)!="undefined"){
        var dobYear=inputDOB.split("-")[0];
        var dobMonth=inputDOB.split("-")[1] - 1;
        var dobDate=inputDOB.split("-")[2];
      }
      inputDOB=new Date(dobYear,dobMonth,dobDate);
      if (inputDOB >= tmCombine) {
        ret = true;
      }

    }
    return ret;
  }

}
