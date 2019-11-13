import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });

  it('should fetch the logged in user\'s profile information', ()=>{
    const service: ProfileService = TestBed.get(ProfileService);
    const sampleProfile = [
      {"name": "John", "password": "123456", "email": "example@ex.com", "zip": "12345", "phone": "123-123-1234", "birthday": "1900-01-01","image": "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"},
      {"name": "Peter", "password": "222222", "email": "123@gmail.com", "zip": "00000", "phone": "321-321-4321", "birthday": "1960-02-03","image": "http://www.laia-amela.com/wp-content/uploads/2016/10/avatar-number-1.jpg"},
      {"name": "Lucy", "password": "888888", "email": "hi@hotmail.com", "zip": "54321", "phone": "909-123-1234", "birthday": "1996-05-01","image": "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png"}
    ];
    const sampleName = "John";
    const profileInfo = service.loadLoggedinUser(sampleProfile,sampleName);
    expect(profileInfo[0]).toBe("1900-01-01");
    expect(profileInfo[1]).toBe("12345");
    expect(profileInfo[2]).toBe("123-123-1234");
    expect(profileInfo[3]).toBe("example@ex.com");
  })

});
