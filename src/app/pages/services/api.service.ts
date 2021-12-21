import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUrl = environment.baseUrl;
  constructor(public http: HttpClient) { }

  isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

  getOnlyDate(){
    var date = new Date();
    var finalDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    return finalDate;
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  login(data) {
    return this.http.post(this.baseUrl + '/user/login', data);
  }
  
  register(data) {
    return this.http.post(this.baseUrl + '/user/signup', data);
  }
 
  socialSignInSignUp(data) {
    return this.http.post(this.baseUrl + '/user/socialSignInSignUp', data);
  }
  sendOtpCode(data) {
    return this.http.post(this.baseUrl + '/user/otp', data);
  }
  
  verifyOtpCode(data) {
    return this.http.post(this.baseUrl + '/user/verifyOtp', data);
  }
 
  forgotPassword(data) {
    return this.http.post(this.baseUrl + '/user/forgotPassword', data);
  }
  
  verifyChangePassword(data) {
    return this.http.post(this.baseUrl + '/user/verifyChangePassword', data);
  }
 
  
  sendPost(body, formData) {
    var user: any = JSON.parse(localStorage.getItem('socialUserDetails'));
    formData.append('title', body.title);
    return this.http.post(this.baseUrl + '/social/sendPost', formData, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({
        title: body.title,
        token: user.token
      })
    });
  }
 
  updatePost(body, formData) {
    var user: any = JSON.parse(localStorage.getItem('socialUserDetails'));
    return this.http.post(this.baseUrl + '/social/updatePost', formData, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({
        title: body.title,
        post_id: body.post_id,
        imageAvailable: body.isImage == 1 ? 'yes' : 'no',
        token: user.token
      })
    });
  }
  
  getPostList() {
    return this.http.post(this.baseUrl + '/social/getPostList', {});
  }
  
  deletePost(id) {
    return this.http.post(this.baseUrl + '/social/deletePost', id);
  }
  
  getPostById(data) {
    return this.http.post(this.baseUrl + '/social/getSinglePostById', data);
  }
  
  getAllPost(offset) {
    return this.http.post(this.baseUrl + '/social/getAllPost', offset);
  }
  
  comment(data) {
    return this.http.post(this.baseUrl + '/social/comment', data);
  }
  
  like(data) {
    return this.http.post(this.baseUrl + '/social/like', data);
  }
  
  seenPost(data) {
    return this.http.post(this.baseUrl + '/social/seenPost', data);
  }
  
  updateProfile(isFile, userInfo, formData) {
    return this.http.post(this.baseUrl + '/user/updateProfile', formData, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({
        isFile: isFile,
        name: userInfo.name,
        address: userInfo.address,
        city:  userInfo.city,
//        leader: userInfo.leader,
        experience: userInfo.experience,
        profit: userInfo.profit,
        show_profile: userInfo.show_profile,
        trial_amount: userInfo.trial_amount,
        trial_days: userInfo.trial_days,
      })
    });
  }
  
  getAlluserChats() {
    return this.http.get(this.baseUrl + '/chat/getAllGroupChat');
  }
 
  getAllUserList() {
    return this.http.get(this.baseUrl + '/chat/getUserList');
  }
  
  deleteChat(id) {
    return this.http.post(this.baseUrl + '/chat/deleteChat', id);
  }
  
  addUserInChatList(data) {
    return this.http.post(this.baseUrl + '/chat/addUserInChatList', data);
  }
  
  getAllNotifications(limit) {
    return this.http.post(this.baseUrl + '/social/notifications', limit);
  }
  
  getRandomTeamMates() {
    return this.http.post(this.baseUrl + '/social/getRandomTeamMates', {});
  }  
  getAllUsersBySuperAdmin() {
    return this.http.post(this.baseUrl + '/user/getAllUserForAdmin', {});
  }
  
  updateUserRollBySuperAdmin(data) {
    return this.http.post(this.baseUrl + '/user/updateUserRollBySuperAdmin', data);
  }
  
  getAllSportsGames() {
    return this.http.get(this.baseUrl + '/score/getSports');
  }
 
  sports() {
    return this.http.get(this.baseUrl + '/score/sports');
  }
 
  getSportDetailsById(data) {
    return this.http.post(this.baseUrl + '/score/getSportDetailsById', data);
  }


  getLeadById(id) {
    return this.http.post(this.baseUrl + '/social/getLeadById', id,
    {
    responseType: 'json',
    headers: new HttpHeaders({
      userId: id
    })});
  }

  getLead() {
    return this.http.get(this.baseUrl + '/social/getLead', {});
  }

  getAllGroups() {
    return this.http.post(this.baseUrl + '/user/getAllGroups', {});
  }

  
  
  // sendPost

  createGroup(body, formData) {
    var user: any = JSON.parse(localStorage.getItem('socialUserDetails'));
    formData.append('title', body.title);
    return this.http.post(this.baseUrl + '/social/createGroup', formData, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({
        title: body.title,
        token: user.token
      })
    });
  }

  updateGroupById(data) {
    return this.http.post(this.baseUrl + '/user/updateGroup', data);
  }
  
  getGroupById(data) {
    return this.http.post(this.baseUrl + '/social/getGroupById', data);
  }
  
  
  updateGroup(body, formData) {
    
    var user: any = JSON.parse(localStorage.getItem('socialUserDetails'));
    return this.http.post(this.baseUrl + '/social/updateGroup', formData, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({
        title: body.title,
        group_id: body.group_id,
        imageAvailable: body.isImage == 1 ? 'yes' : 'no',
        token: user.token
      })
    });
  }
  
  deleteGroup(id) {
    return this.http.post(this.baseUrl + '/social/deleteGroup', id);
  }

  getGroupsWithMembers() {
    return this.http.post(this.baseUrl + '/user/getGroupsWithMembers', {});
  }

  paynow(data) {
    return this.http.post(this.baseUrl + '/user/paynow', data);
  }





}
