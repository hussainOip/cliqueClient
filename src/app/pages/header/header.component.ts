import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imageUrl = environment.baseUrlForImage;
  isRightMenuShow = false;
  today;
  userRoll='';
  constructor( public apiService: ApiService) {
    setInterval(() => {
      this.today = new Date()
    }, 1000);
   }

  ngOnInit(): void {
    var user: any = JSON.parse(localStorage.getItem('socialUserDetails'));
    this.userRoll = user.user_roll;
  }

  setUserImage(){
    var user: any = JSON.parse(localStorage.getItem('socialUserDetails'));
    if(user.user_image != '' && user.user_image != undefined) return this.imageUrl+user.user_image;
    else return "assets/img/defaultProfileImage.png";
  }
  
  getUserName(){
    var user: any = JSON.parse(localStorage.getItem('socialUserDetails'));
    return user.first_name +' '+ user.last_name+' '+'profile';
  }

  timeDifference(previous) {

    var parts = previous.match(/(\d+)/g);

    previous = new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based

    var current: any = new Date();
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
      return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

  showHideMenu(){
    this.isRightMenuShow = !this.isRightMenuShow;
  }
}
