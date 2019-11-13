import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  myServer = 'https://secret-thicket-16343.herokuapp.com';

  logout(){
    return this.http.put(this.myServer+'/logout',null,{withCredentials:true});
  }

  getHeadline(name){
    return this.http.get(this.myServer+'/headlines/'+name,{withCredentials:true});
  }

  getProfiles(){
    return this.http.get(this.myServer+'/userProfile',{withCredentials:true});
  }

  getAllArticles(){
    return this.http.get(this.myServer+'/all',{withCredentials:true});
  }

  getFeedArticles(){
    return this.http.get(this.myServer+'/articles',{withCredentials:true});
  }

  sortArticles(data){
    data.sort(function(a,b){
      var aSplit = a.date.split('/');
      var dateA = new Date(parseInt(aSplit[2]),parseInt(aSplit[0])-1, parseInt(aSplit[1]))
      var bSplit = b.date.split('/');
      var dateB = new Date(parseInt(bSplit[2]),parseInt(bSplit[0])-1, parseInt(bSplit[1]))
      return dateB.getTime() - dateA.getTime();
    });

  }

  getFollowers(name){
    return this.http.get(this.myServer+'/followingInfo/'+name,{withCredentials:true})
  }


  putHeadline(upPro){
    return this.http.put(this.myServer+'/headline',{ headline: upPro.value.statusUp },{withCredentials:true});
  }

  onRegSubmitSupp(upPro) {
    if(upPro.value.statusUp!=''&& typeof (upPro.value.statusUp)!="undefined" && upPro.value.statusUp!=null){
      return true;
    }
  }


  removeFollowerSupp(name){
    return this.http.delete(this.myServer+'/following/'+name,{withCredentials:true})
  }

  removeArticle(articles,f){
    return articles.filter(exclude => exclude.author !== f.name);
  }

  searchPostsSupp(searchPost,articles){
    return articles.filter(t=>t.text.toLowerCase().includes(searchPost.value.searchArea.toLowerCase())||
        t.author.toLowerCase().includes(searchPost.value.searchArea.toLowerCase()))
  }

  postArticle(post,url){
    return this.http.post(this.myServer+'/article',{text:post, image:url},{withCredentials:true});

  }

  addPostHelper(post, articles,name) {
    let today = new Date();
    // console.log(post.value.postArea)
    articles.unshift({
      "img": "",
      "text": post.value.postArea,
      "author": name,
      "date": (today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear()
    });
    return articles;
  }

  filterPostAddFollower(followers,allArticles,allFollowers,name){
    let notShown = allFollowers;
    for(let i=0;i<followers.length;i++){
      notShown=notShown.filter(t=>(t.name!=name)&&(t.name!=followers[i].name))
    }
    let newArticles = allArticles;
    for(let i=0;i<notShown.length;i++){
      newArticles=newArticles.filter(t=>t.author !== notShown[i].name);
    }
    return newArticles;
  }

  cancelPost(post) {
    post.reset();
  }


  addFollowHelper1(addF){
    if(addF.value.followerNm==null||addF.value.followerNm==''||typeof (addF.value.followerNm)=='undefined'){
      return true;
    }
  }

  changeCommentStatus(show){
    return !show;
  }

  addFollowHelper2(name){
    return this.http.put(this.myServer+'/following/'+name,{},{withCredentials:true})
    }

    validAdd(allFollowers,addF){
      return (allFollowers.filter(t=>t.name === addF.value.followerNm).length!=0);
    }

    existingFollower(addF,followers){
      return (followers.filter(t=>t.name === addF.value.followerNm).length!=0);
    }

    selfFollower(addF,name){
      return addF.value.followerNm==name;

    }

    // cookieStatus(){
    // if(document.cookie.split(';').filter(sta => sta.includes('headline')).length!==0){
    //   return true;
    // }
    // }

  newCommentHelper(id,text){
    return this.http.put(this.myServer+'/articles/'+id,{  text: text, commentId: -1 },{withCredentials:true});
  }

  editPostsHelper(id,text){
    return this.http.put(this.myServer+'/articles/'+id,{  text: text},{withCredentials:true});
  }

  editCmtHelper(id,commentId,text){
    return this.http.put(this.myServer+'/articles/'+id,{  text: text, commentId: commentId},{withCredentials:true});
  }

  allRegistered() {
    return this.http.get(this.myServer+'/registered',{withCredentials:true});
  }

  uploadImage(image){
    return this.http.put(this.myServer+'/articlePic',image,{withCredentials:true});
  }





  cookieName(){
    if(document.cookie.split(';').filter(sta => sta.includes('LoginName')).length!==0){
      return true;
    }
  }
  }
