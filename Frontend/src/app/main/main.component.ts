import { Component, OnInit } from '@angular/core';
import {MainService} from "./main.service";
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  status="";
  name="";
  profilePic;
  followers;
  allFollowers;
  articles;
  allArticles;
  wrongFollower:boolean=false;
  existingFollower:boolean=false;
  selfFollower:boolean=false;
  show:boolean=false;
  articlePicURL=""

  constructor(private mServe: MainService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.name = this.route.snapshot.params.LoginName;

    this.mServe.getHeadline(this.name).subscribe(data=>{
      const result: any = data;
      if(result !== null) {
        this.status = result.headlines[0].headline;
      }
    })
    this.getArticles();
    this.getFollowers();
  }

  onRegSubmit(upPro: NgForm) {
    if(this.mServe.onRegSubmitSupp(upPro)){

      this.mServe.putHeadline(upPro).subscribe(data=>{
        const result: any = data;
        if(result !== null) {
          this.status = result.headline;
        }
      })
      upPro.reset();
    }
  }

  logout(){
    this.mServe.logout().subscribe(data=>{
      const result: any = data;
      if (result.status == 'OK'){
        this.router.navigate(['auth']);
      }
    })
  }

  returnProfile(){
    this.router.navigate(['profile',{LoginName:this.name}]);
  }

  getArticles(){
    this.mServe.getFeedArticles().subscribe(data => {
      const result: any = data;
      this.articles = result.articles;
      this.mServe.sortArticles(this.articles);
      //this.mServe.sortArticles(this.allArticles);
    });
  }

  getFollowers(){
    this.mServe.getFollowers(this.name).subscribe(data => {
      const result1:any=data;
      this.followers = result1.filter(exclude => exclude.name !== this.name)
      this.mServe.allRegistered().subscribe(moreData =>{
        this.allFollowers = moreData;
        if(typeof(this.allFollowers.filter(exclude => exclude.name === this.name)[0]) !== 'undefined'){
          this.profilePic = this.allFollowers.filter(exclude => exclude.name === this.name)[0].image;
        }
        else {
          this.mServe.getProfiles().subscribe(data => {
            const result: any=data;
            this.profilePic = result[0].avatar;
          })
        }

        // this.followers = this.allFollowers.filter(exclude => exclude.name !== this.name);
      })

    });

  }

  removeFollower(f){
    this.mServe.removeFollowerSupp(f.name).subscribe(data => {
      const result: any = data;
      this.followers=result.following;
      this.getArticles();
      this.getFollowers();
    });
  }



  searchPosts(searchPost:NgForm){
    this.mServe.getFeedArticles().subscribe(data => {
      const result: any = data;
      this.allArticles = result.articles;
      this.mServe.sortArticles(this.allArticles);
      this.articles = this.mServe.searchPostsSupp(searchPost, this.allArticles)
    })
  }


  addPost(post:NgForm){
    if(post.value.postArea==null||post.value.postArea==''||typeof (post.value.postArea)=='undefined'){
      return;
    }
    else{
      //fd.append('text', post.value.postArea);
      this.mServe.postArticle(post.value.postArea,this.articlePicURL).subscribe(data => {
        this.articlePicURL=''
        if (data !== null){
          //this.mServe.addPostHelper(post,this.allArticles,this.name);
          this.mServe.getFeedArticles().subscribe(data => {
            const result: any = data;
            this.articles = result.articles;
            this.mServe.sortArticles(this.articles);
            //this.mServe.sortArticles(this.allArticles);
          });
          this.articles = this.mServe.filterPostAddFollower(this.followers,this.articles,this.allFollowers,this.name);
          this.mServe.sortArticles(this.articles);
          this.cancelPost(post);

        }
      });
    }
  }

  cancelPost(post) {
    this.mServe.cancelPost(post);
  }

  addFollow(addF:NgForm){
    // console.log(this.followers.name)
    if(this.mServe.addFollowHelper1(addF)){
      return;
    }
    else if((this.mServe.validAdd(this.allFollowers,addF))
        &&(!this.mServe.existingFollower(addF,this.followers))
        &&(!this.mServe.selfFollower(addF,this.name))){
      this.wrongFollower=false;
      this.existingFollower=false;
      this.selfFollower=false;
      //update follower list
      this.mServe.addFollowHelper2(addF.value.followerNm).subscribe(data=>{
        const result: any = data;
        this.followers=result;
        this.getArticles();
        this.getFollowers();
        addF.reset();
      });
      // update articles
      // this.articles=this.mServe.filterPostAddFollower(this.followers,this.articles,this.allFollowers,this.name);
    }
    else if(!this.mServe.validAdd(this.allFollowers,addF)){
      this.wrongFollower=true;
      this.existingFollower=false;
      this.selfFollower=false;
      addF.reset();

    }
    else if(this.mServe.existingFollower(addF,this.followers)){
      this.wrongFollower=false;
      this.existingFollower=true;
      this.selfFollower=false;
      addF.reset();

    }
    else if(this.mServe.selfFollower(addF,this.name)){
      this.wrongFollower=false;
      this.existingFollower=false;
      this.selfFollower=true;
      addF.reset();

    }
  }

  showComment(){
    this.show = this.mServe.changeCommentStatus(this.show);
  }

  newComment(article,editPost:NgForm){
    if(editPost.value.newCmt==null||editPost.value.newCmt==''||typeof (editPost.value.newCmt)=='undefined'){
      editPost.reset()
      return;
    }
    else{
      this.mServe.newCommentHelper(article._id,editPost.value.newCmt).subscribe(()=>{
        this.mServe.getFeedArticles().subscribe(data => {
          const result: any = data;
          this.articles = result.articles;
          this.mServe.sortArticles(this.articles);
          //this.mServe.sortArticles(this.allArticles);
          editPost.reset()
        });
      });
    }
  }

  editPosts(id,editPost:NgForm){
    if(editPost.value.editArea==null||editPost.value.editArea==''||typeof (editPost.value.editArea)=='undefined'){
      return;
    }
    else{
      this.mServe.editPostsHelper(id,editPost.value.editArea).subscribe(()=>{
        this.mServe.getFeedArticles().subscribe(data => {
          const result: any = data;
          this.articles = result.articles;
          this.mServe.sortArticles(this.articles);
          //this.mServe.sortArticles(this.allArticles);
          editPost.reset()
        });
      });

    }
  }

  editCmts(id,commentId,editPost:NgForm) {
    if (editPost.value.editCmt == null || editPost.value.editCmt == '' || typeof (editPost.value.editCmt) == 'undefined') {
      return;
    } else {
      this.mServe.editCmtHelper(id,commentId,editPost.value.editCmt).subscribe(() =>{
            this.mServe.getFeedArticles().subscribe(data => {
              const result: any = data;
              this.articles = result.articles;
              this.mServe.sortArticles(this.articles);
              //this.mServe.sortArticles(this.allArticles);
              editPost.reset()
            });
      });

    }
  }

  getPostPic(image: FileList){
    const fd = new FormData()
    fd.append('image', image[0]);
    // console.log(image[0])
    this.mServe.uploadImage(fd).subscribe(data => {
      const result: any = data;
      this.articlePicURL = result.pic;
      // console.log(this.articlePicURL)
    })
  }

}


