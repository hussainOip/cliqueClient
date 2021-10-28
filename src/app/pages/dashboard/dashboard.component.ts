import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  homeTab: boolean = true;
  profileTab: boolean = false;
  today;
  postData: any = [];
  matesLeaderData: any = {};
  postIds = [];
  imageUrl = environment.baseUrlForImage;
  loading = false;
  offset = 0;
  page = 1;
  totalPostCount = 0;
  limit = 10;
  isShowPost = true;
  allGames: any = [];
  partialGames: any = [];
  constructor(public apiService: ApiService, public notificationsService: NotificationsService, public router: Router) {
    setInterval(() => {
      this.today = new Date()
    }, 1000);
  }

  ngOnInit(): void {
    document.getElementById("showBoard").classList.remove('d-block');
   // document.getElementById("showBoard").classList.add('d-none');
   
   //document.getElementById("showBoard").classList.add('d-block');

    this.getAllPsot();
    this.getMatesAndLeaders();
     this.sports();
  }

  setHomeTab() {
    this.homeTab = true;
    this.profileTab = false;
    this.isShowPost = true;
  }

  setProfileTab() {
    this.profileTab = true;
    this.homeTab = false;
    this.isShowPost = false;
  }

  getAllPsot() {
    this.loading = true;
    this.apiService.getAllPost({ offset: this.offset }).subscribe((res: any) => {
      this.loading = false;
      if (res.status > 0) {
        var self = this;
        this.postData = res.data;
        this.postData.forEach(element => {
          self.postIds.push(element.post_id);
          element.commentLimit = 5;
          self.totalPostCount = element.totalcount;
          element.comments.reverse();
          console.log(self.totalPostCount);
        });
        this.apiService.seenPost({ postIds: this.postIds }).subscribe((res: any) => {
        })
      } else if (res.status < 0) {
        localStorage.removeItem('socialUserDetails');
        this.router.navigateByUrl('/');
        this.notificationsService.error('Error!', res.msg);
      }
    })

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

  postComment(postId, comment) {
    if (!this.apiService.isEmpty(comment) && comment.trim().length) {
      this.apiService.comment({ postId: postId, comment: comment }).subscribe((res: any) => {
        if (res.status) {
          this.postData.forEach(row => {
            if (row.post_id == res.post_id) {
              row.comment = '';
              // row.comments = res.data.reverse();
            }
          });
        }
      })
    } else this.notificationsService.info('Info', 'Please write some thing to post');
  }

  viewMoreComment(post) {
    return post.commentLimit = post.commentLimit + 5;
  }

  hideComment(post) {
    return post.commentLimit = 1;
  }

  likePost(postId) {
    this.apiService.like({ postId: postId }).subscribe((res: any) => {
      if (res.status) {
        this.postData.forEach(row => {
          if (row.post_id == res.post_id) {
            row.total_likes = res.totalLike;
          }
        });
      } else this.notificationsService.info('info!', res.msg);
    });
  }

  setUserImage() {
    var user: any = JSON.parse(localStorage.getItem('socialUserDetails'));
    if (user.user_image != '' && user.user_image != undefined) return this.imageUrl + user.user_image;
    else return "assets/img/defaultProfileImage.png";
  }

  setImageForPost(image) {
    if (image != '' && image != undefined) return this.imageUrl + image;
    else return "assets/img/defaultProfileImage.png";
  }

  getMatesAndLeaders() {
    this.loading = true;
    this.apiService.getRandomTeamMates().subscribe((res: any) => {
      this.loading = false;
      this.matesLeaderData = res.data;
    })
  }

  loadMorePost() {
    this.offset = this.offset + this.limit;
    if (this.totalPostCount >= this.offset) {
      this.offset = this.totalPostCount - this.limit;
    }
    this.loading = true;
    this.apiService.getAllPost({ offset: this.offset }).subscribe((res: any) => {
      this.loading = false;
      if (res.status > 0) {
        if(res.data.length > 0 ) window.scroll(0,0);
        var self = this;
        this.postData = res.data;
        this.postData.forEach(element => {
          self.postIds.push(element.post_id);
          element.commentLimit = 5;
          self.totalPostCount = element.totalcount;
          element.comments.reverse();
        });
        this.apiService.seenPost({ postIds: this.postIds }).subscribe((res: any) => {
        })
      } else if (res.status < 0) {
        localStorage.removeItem('socialUserDetails');
        this.router.navigateByUrl('/');
        this.notificationsService.error('Error!', res.msg);
      }
    })
  }

  // getAllSportsGames(){
  //   this.loading = true;
  //   this.apiService.getAllSportsGames().subscribe((res: any)=>{
  //     this.loading = false;
  //     console.log(res);
  //     if(res.status){
  //       this.allGames = res.data.data;
  //       if(res.data.length > 3){
  //         this.partialGames = res.data.data.slice(3);  
  //       }
  //       console.log(this.allGames);
  //       console.log(this.partialGames);
  //     }
  //   }); 
  // }

  sports() {
    this.loading = true;
    this.apiService.sports().subscribe((res: any) => {
      this.loading = false;
      console.log(res);
      if (res.status) {
        this.allGames = res.data.sports;
        if (res.data.sports > 3) {
          this.partialGames = res.data.sports.slice(3);
        }
        console.log(this.allGames);
        console.log(this.partialGames);
      }
    });
  }

  redirectToFb(url) {
    console.log(url);
    let searchParams = new URLSearchParams();
    searchParams.set('u', url);
    var navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
    return window.open(navUrl, "_blank");
  }

  redirectToTwitter(url) {
    var shareURL = "http://twitter.com/share?";
    var params = {
      'url': url
    }
    for (var prop in params)
      shareURL += '&' + prop + '=' + encodeURIComponent(params[prop]);
    window.open(
      shareURL,
      '',
      'left=450,top=200,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0'
    );
  }
}