import { TestBed } from '@angular/core/testing';

import { MainService } from './main.service';
import {AuthService} from "../auth/auth.service";

describe('MainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainService = TestBed.get(MainService);
    expect(service).toBeTruthy();
  });


  it('should update the search keyword & should filter displayed articles by the search keyword', ()=> {
    const service: MainService = TestBed.get(MainService);
    const sampleArticles = [
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

    const inputText1= {
      value: {
        "searchArea": "John"}
    };
    const inputText2= {
      value: {
        "searchArea": "zoo"}
    };

    const filteredArticles1=service.searchPostsSupp(inputText1,sampleArticles);
    const filteredArticles2=service.searchPostsSupp(inputText2,sampleArticles);
    expect(filteredArticles1[0].author).toBe("John");
    expect(filteredArticles1[0].ts).toBe("10/24/2018");
    expect(filteredArticles1.length).toBe(1);
    expect(filteredArticles2[0].author).toBe("Lucy");
    expect(filteredArticles2[0].ts).toBe("01/22/2017");
    expect(filteredArticles2.length).toBe(1);
  })




  it('should add articles when adding a follower', ()=> {
    const service: MainService = TestBed.get(MainService);
    const name='Peter'
    const sampleAllArticles= [
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

    const sampleAddF= {
      value: {
        "followerNm": "John"}
    };
    const expectedArticles= [
      {"image": "http://houmuse.org/wp-content/uploads/2015/04/exp43.jpg",
        "text": "These are elephants. These are elephants. These are elephants. These are elephants. These are elephants. These are elephants. These are elephants. These are elephants. These are elephants.",
        "author": "John",
        "ts": "10/24/2018"
      },
      {"image": "",
        "text": "Same an quit most an. Admitting an mr disposing sportsmen. Tried on cause no spoil arise plate. Longer ladies valley get esteem use led six. Middletons resolution advantages expression themselves partiality so me at. West none hope if sing oh sent tell is. ed ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address. The its enable direct men depend highly.",
        "author": "Peter",
        "ts": "03/22/2018"
      }
    ];

    const expectedFollowers=[
      {"image": "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg",
        "name": "John",
        "status": "Today it's rainy!",
        "id": "2"
      }
    ];
    const sampleFollowers=[];
    const sampleAllFollowers=[
      {"image": "http://www.laia-amela.com/wp-content/uploads/2016/10/avatar-number-1.jpg",
        "name": "Peter",
        "status": "Today it's sunny!",
        "id": "1"
      },
      {"image": "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg",
        "name": "John",
        "status": "Today it's rainy!",
        "id": "2"
      },
      {"image": "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png",
        "name": "Lucy",
        "status": "Today it's foggy!",
        "id": "3"
      }
    ];

    const updateFollowers = service.addFollowHelper2(sampleAddF,sampleAllFollowers,sampleFollowers);
    const updatePost = service.filterPostAddFollower(updateFollowers,sampleAllArticles,sampleAllFollowers,name);

    expect(updateFollowers[0].image).toBe(expectedFollowers[0].image);
    expect(updateFollowers[0].name).toBe(expectedFollowers[0].name);
    expect(updateFollowers[0].status).toBe(expectedFollowers[0].status);
    expect(updateFollowers[0].id).toBe(expectedFollowers[0].id);
    expect(updatePost[0].image).toBe(expectedArticles[0].image);
    expect(updatePost[0].text).toBe(expectedArticles[0].text);
    expect(updatePost[0].author).toBe(expectedArticles[0].author);
    expect(updatePost[0].ts).toBe(expectedArticles[0].ts);
    expect(updatePost[1].image).toBe(expectedArticles[1].image);
    expect(updatePost[1].text).toBe(expectedArticles[1].text);
    expect(updatePost[1].author).toBe(expectedArticles[1].author);
    expect(updatePost[1].ts).toBe(expectedArticles[1].ts);
  })


it('should remove articles when removing a follower', ()=> {
  const service: MainService = TestBed.get(MainService);
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

  const sampleF= {"image": "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg",
      "name": "John",
      "status": "Today it's rainy!",
      "id": "2"
  };
  const expectedArticles= [
    {"image": "",
      "text": "Same an quit most an. Admitting an mr disposing sportsmen. Tried on cause no spoil arise plate. Longer ladies valley get esteem use led six. Middletons resolution advantages expression themselves partiality so me at. West none hope if sing oh sent tell is. ed ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address. The its enable direct men depend highly.",
      "author": "Peter",
      "ts": "03/22/2018"},
    {"image": "http://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_1200/v1544129684/photos/286950_original.jpg",
      "text": "This is the zoo light. This is the zoo light. This is the zoo light. This is the zoo light. This is the zoo light. This is the zoo light. This is the zoo light.",
      "author": "Lucy",
      "ts": "01/22/2017"}
  ];

  const expectedFollowers=[
    {"image": "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png",
      "name": "Lucy",
      "status": "Today it's foggy!",
      "id": "3"
    }
  ];
  const sampleFollowers=[

    {"image": "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg",
      "name": "John",
      "status": "Today it's rainy!",
      "id": "2"},
    {"image": "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png",
      "name": "Lucy",
      "status": "Today it's foggy!",
      "id": "3"
    }
  ];

  const updateFollowers = service.removeFollowerSupp(sampleF,sampleFollowers);
  const updatePost = service.removeArticle(sampleArticles,sampleF);

  expect(updateFollowers[0].image).toBe(expectedFollowers[0].image);
  expect(updateFollowers[0].name).toBe(expectedFollowers[0].name);
  expect(updateFollowers[0].status).toBe(expectedFollowers[0].status);
  expect(updateFollowers[0].id).toBe(expectedFollowers[0].id);
  expect(updatePost[0].image).toBe(expectedArticles[0].image);
  expect(updatePost[0].text).toBe(expectedArticles[0].text);
  expect(updatePost[0].author).toBe(expectedArticles[0].author);
  expect(updatePost[0].ts).toBe(expectedArticles[0].ts);
  expect(updatePost[1].image).toBe(expectedArticles[1].image);
  expect(updatePost[1].text).toBe(expectedArticles[1].text);
  expect(updatePost[1].author).toBe(expectedArticles[1].author);
  expect(updatePost[1].ts).toBe(expectedArticles[1].ts);
})

});
