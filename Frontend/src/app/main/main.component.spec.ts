import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import {AuthService} from "../auth/auth.service";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should fetch articles for current logged in user', ()=>{
   component.getArticles();
   const sampleLoggedInUser="John";
   const filteredArticles=[];
    const sampleArticles= [
      {"image": "http://houmuse.org/wp-content/uploads/2015/04/exp43.jpg",
        "text": "These are elephants. These are elephants. These are elephants. These are elephants. These are elephants. These are elephants. These are elephants. These are elephants. These are elephants.",
        "author": "John",
        "ts": "10/24/2018"
      },
      {"image": "",
        "text": "Same an quit most an. Admitting an mr disposing sportsmen. Tried on cause no spoil arise plate. Longer ladies valley get esteem use led six. Middletons resolution advantages expression themselves partiality so me at. West none hope if sing oh sent tell is. ed ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address. The its enable direct men depend highly.",
        "author": "Peter",
        "ts": "03/22/2018"
      },
      {"image": "http://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_1200/v1544129684/photos/286950_original.jpg",
        "text": "This is the zoo light. This is the zoo light. This is the zoo light. This is the zoo light. This is the zoo light. This is the zoo light. This is the zoo light.",
        "author": "Lucy",
        "ts": "01/22/2017"}
    ];
   for(let i=0;i<sampleArticles.length;i++){
     if(sampleArticles[i].author===sampleLoggedInUser){
       let t=0;
       filteredArticles[t]=sampleArticles[i];
       t++;
     }
   }
   expect(filteredArticles[0].author).toBe(sampleLoggedInUser);
   expect(filteredArticles[0].ts).toBe("10/24/2018");
   expect(filteredArticles.length).toBe(1);

  });

  it('should log out a user', ()=>{
    document.cookie = "LoginName=John";
    component.logout();
    expect(document.cookie).toBe('LoginName=');
  })

});
