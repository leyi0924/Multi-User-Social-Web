import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import {AuthComponent} from "./auth.component";
import {ProfileService} from "../profile/profile.service";

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [] ,
    providers: [],
    imports: [FormsModule,HttpClientModule,RouterTestingModule]
  })
      // .compileComponents();
});

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });




  // it('should log in a previously registered user', ()=>{
  //   const service: AuthService = TestBed.get(AuthService);
  //   const sampleProfile = [
  //     {"name": "John", "password": "123456", "email": "example@ex.com", "zip": "12345", "phone": "123-123-1234", "birthday": "1900-01-01","image": "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"},
  //     {"name": "Peter", "password": "222222", "email": "123@gmail.com", "zip": "00000", "phone": "321-321-4321", "birthday": "1960-02-03","image": "http://www.laia-amela.com/wp-content/uploads/2016/10/avatar-number-1.jpg"},
  //     {"name": "Lucy", "password": "888888", "email": "hi@hotmail.com", "zip": "54321", "phone": "909-123-1234", "birthday": "1996-05-01","image": "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png"}
  //   ];
  //   const testLoginForm = {
  //     value:{"username": "Peter",
  //       "password": "222222"}
  //   };
  //   const loggedIn=service.onLoginSubmitSupp(testLoginForm)
  //       &&service.validLogin(sampleProfile,testLoginForm.value.username)
  //       &&service.validPassword(sampleProfile,testLoginForm.value.username,testLoginForm);
  //   expect(loggedIn).toBe(true);
  // })





  // it('should not log in an invalid user', ()=>{
  //   const service: AuthService = TestBed.get(AuthService);
  //   const sampleProfile = [
  //     {"name": "John", "password": "123456", "email": "example@ex.com", "zip": "12345", "phone": "123-123-1234", "birthday": "1900-01-01","image": "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"},
  //     {"name": "Peter", "password": "222222", "email": "123@gmail.com", "zip": "00000", "phone": "321-321-4321", "birthday": "1960-02-03","image": "http://www.laia-amela.com/wp-content/uploads/2016/10/avatar-number-1.jpg"},
  //     {"name": "Lucy", "password": "888888", "email": "hi@hotmail.com", "zip": "54321", "phone": "909-123-1234", "birthday": "1996-05-01","image": "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png"}
  //   ];
  //   const testLoginForm = {
  //     value:{"username": "Daniel",
  //       "password": "222222"}
  //   };
  //   const loggedIn = service.onLoginSubmitSupp(testLoginForm)
  //       &&service.validLogin(sampleProfile,testLoginForm.value.username)
  //       &&service.validPassword(sampleProfile,testLoginForm.value.username,testLoginForm);
  //   expect(loggedIn).toBe(false);
  // })




//   it('should update error message', ()=>{
//     const service: AuthService = TestBed.get(AuthService);
//     const sampleProfile = [
//       {"name": "John", "password": "123456", "email": "example@ex.com", "zip": "12345", "phone": "123-123-1234", "birthday": "1900-01-01","image": "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"},
//       {"name": "Peter", "password": "222222", "email": "123@gmail.com", "zip": "00000", "phone": "321-321-4321", "birthday": "1960-02-03","image": "http://www.laia-amela.com/wp-content/uploads/2016/10/avatar-number-1.jpg"},
//       {"name": "Lucy", "password": "888888", "email": "hi@hotmail.com", "zip": "54321", "phone": "909-123-1234", "birthday": "1996-05-01","image": "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png"}
//     ];
//     const notRegisteredLoginTestForm = {
//       value:{"username": "Daniel",
//         "password": "222222"}
//     };
//     const wrongPasswordLoginTestForm = {
//       value:{"username": "John",
//         "password": "567890"}
//     };
//     const notRegisteredUserMessage=service.onLoginSubmitSupp(notRegisteredLoginTestForm)
//         &&!service.validLogin(sampleProfile,notRegisteredLoginTestForm.value.username);
//
//     const wrongPasswordMessage=service.onLoginSubmitSupp(wrongPasswordLoginTestForm)
//         &&service.validLogin(sampleProfile,wrongPasswordLoginTestForm.value.username)
//         &&!service.validPassword(sampleProfile,wrongPasswordLoginTestForm.value.username,wrongPasswordLoginTestForm);
//
//     expect(notRegisteredUserMessage).toBe(true);
//     expect(wrongPasswordMessage).toBe(true);
//   })
// });
