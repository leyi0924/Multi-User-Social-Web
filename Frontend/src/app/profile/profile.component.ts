import {Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from "./profile.service";
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profiles;
  name;
  birthday;
  zipCode;
  phone;
  e_mail;
  image;
  linked: boolean = false;
  unlinked: boolean = false;
  profileLinked: boolean = false;
  thirdParty: boolean = false;
  normalLogin: boolean = false;
  cannotLogin: boolean = false;


  constructor(private pServe: ProfileService, private router: Router,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getProfile();

    this.pServe.getUser().subscribe(data => {
      const result: any = data;
      this.profiles = result;
      this.profileLinked = this.profiles[0].linked;
      this.linked = this.profileLinked;
      this.thirdParty = this.profiles[0].thirdParty;
      // console.log(this.linked)
    });
  }

  toMain() {
    this.router.navigate(['main',{LoginName:this.name}]);
  }

  getProfile() {
    this.pServe.getProfiles().subscribe(data => {
      const result: any = data;
      this.profiles = result;
      this.birthday = this.profiles[0].dob;
      this.zipCode = this.profiles[0].zipcode;
      this.phone = this.profiles[0].phone;
      this.e_mail = this.profiles[0].email;
      this.image = this.profiles[0].avatar;
      // this.route.queryParams.subscribe(params => {
      //   this.name = params['LoginName']
      // })

      this.name = this.route.snapshot.params.LoginName;


    });
  }

  onRegSubmit(reg: NgForm) {
    if (this.pServe.regSubmitSupp1(reg)) {
      if (this.pServe.regSubmitSupp3(reg)) {
        this.pServe.putEmail(reg.value.email).subscribe();
        this.e_mail = reg.value.email;
      }
      if (this.pServe.regSubmitSupp4(reg)) {
        this.pServe.putPhone(reg.value.tel).subscribe();
        this.phone = reg.value.tel;
      }
      if (this.pServe.regSubmitSupp5(reg)) {
        this.pServe.putZip(reg.value.zip).subscribe();
        this.zipCode = reg.value.zip;
      }
      if (reg.value.password2 != '' && typeof (reg.value.password2) != "undefined" && reg.value.password2 != null) {
        this.pServe.putPass(reg.value.password2).subscribe();
      }
      reg.reset();
    }

  }

  getPic(image: FileList) {
    const fd = new FormData()
    fd.append('image', image[0]);
    this.pServe.uploadImage(fd).subscribe(data => {
      const result: any = data;
      this.image = result.avatar;
    })
  }

  link() {
    this.pServe.getUser().subscribe(data => {
      const result: any = data;
      this.profiles = result;
      this.profileLinked = this.profiles[0].linked;
      this.thirdParty = this.profiles[0].thirdParty;
      if (this.profileLinked) {//account is linked
        this.linked = true
        this.pServe.unlink().subscribe(data => {
          const result: any = data;
          if (result.result == 'Successfully Unlink') {
            this.linked = false
            this.unlinked = true
          }
        })
      } else {//account not linked
        if (this.thirdParty) {//used FB to Login
          this.normalLogin = true;
        }
        else {//normal login
          window.location.href = 'https://secret-thicket-16343.herokuapp.com/FBlogin';


        }
      }
    });

  }

  onLoginSubmit(login: NgForm) {
    //not registered user
    if (this.pServe.onLoginSubmitSupp(login)){
      this.pServe.validateLogIn(login.value.username, login.value.password).subscribe(data=>{
        const result: any = data;
        if(result !== null && result.result === 'success') {
          this.pServe.link(this.name).subscribe(moredata =>{
            const result2: any = moredata;
            if (result2.result == "success"){
              this.router.navigate(['main',{LoginName:login.value.username}])
            }
          })
        } else {
          this.cannotLogin = true;
        }
      })
    }

  }
}
