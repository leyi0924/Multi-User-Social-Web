import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  myServer = 'https://secret-thicket-16343.herokuapp.com';

  getProfiles(){
    return this.http.get(this.myServer+'/userProfile',{withCredentials:true});
  }

  getUser(){
    return this.http.get(this.myServer+'/allusers',{withCredentials:true});
  }

  unlink(){
    return this.http.put(this.myServer+'/unlink',{},{withCredentials:true});
  }

  regSubmitSupp1(reg){
    return reg.valid && reg.value.password2===reg.value.passcon;
  }

  regSubmitSupp2(reg){
    return reg.value.disname!=''&& typeof (reg.value.disname)!="undefined"&&reg.value.disname!=null;
  }

  regSubmitSupp3(reg){
    return reg.value.email!=''&& typeof (reg.value.email)!="undefined"&&reg.value.email!=null;
  }

  regSubmitSupp4(reg){
    return reg.value.tel!=''&& typeof (reg.value.tel)!="undefined"&&reg.value.tel!=null;
  }

  regSubmitSupp5(reg){
    return reg.value.zip!=''&& typeof (reg.value.zip)!="undefined"&&reg.value.zip!=null;
  }

  loadLoggedinUser(profiles,name){
    let temp=profiles.filter(t=>t.name===name);
    return [temp[0].birthday,temp[0].zip,temp[0].phone,temp[0].email,temp[0].image];
  }

  putEmail(emailVal){
    return this.http.put(this.myServer+'/email',{email:emailVal},{withCredentials:true});
  }
  putPhone(phoneVal){
    return this.http.put(this.myServer+'/phone',{phone:phoneVal},{withCredentials:true});
  }
  putZip(zipVal){
    return this.http.put(this.myServer+'/zipcode',{zipcode:zipVal},{withCredentials:true});
  }
  putPass(passVal){
    return this.http.put(this.myServer+'/password',{password:passVal},{withCredentials:true});
  }

  uploadImage(image){
    return this.http.put(this.myServer+'/avatar',image,{withCredentials:true});
  }

  validateLogIn(name, password){
    return this.http.post(this.myServer+'/login',
        {username:name, password:password}, {withCredentials:true})
  }

  onLoginSubmitSupp(login){
    return login.value.username != '' && login.value.password != '' && typeof (login.value.username) != "undefined"
        && typeof (login.value.password) != "undefined";
  }

  link(username){
    return this.http.put(this.myServer+'/linkNormal',{username:username},{withCredentials:true});

  }
}

