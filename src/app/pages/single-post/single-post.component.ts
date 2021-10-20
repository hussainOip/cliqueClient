import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  postId;
  postData: any = [];
  imageUrl = environment.baseUrlForImage;
  asy;
  constructor(
    public apiService: ApiService,
    public socketService: SocketService,
    public notificationsService: NotificationsService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    document.getElementById("showBoard").classList.remove('d-block');
    document.getElementById("showBoard").classList.add('d-none');
    this.connectUser();
    this.postId = this.activatedRoute.params['value']['id'];
    this.getPostById();
    this.getAsyncPostComment();
    this.asy = setInterval(() => {
      this.getPostCommentBySocket();
    }, 3000);
  }

  getPostById() {
    if (this.postId) {
      this.apiService.getPostById({ postId: this.postId }).subscribe((res: any) => {
        this.postData = res.data;
        this.postData.forEach(element => {
          element.comments.reverse();
        });
      })    
    } else this.notificationsService.info('Info!', 'Post id is missing.')
  }

  postComment(postId, comment) {
    if (!this.apiService.isEmpty(comment) && comment.trim().length) {
      this.apiService.comment({ postId: postId, comment: comment }).subscribe((res: any) => {
        if (res.status) {
          this.postData.forEach(row => {
            if (row.post_id == res.post_id) {
              row.comment = '';
              row.comments = res.data.reverse();
            }
          });
        }
      })
    } else this.notificationsService.info('Info', 'Please write some thing to post');
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

  //socket work

  ngOnDestroy(): void {
    clearInterval(this.asy);
    this.socketService.onDestroyComponent();
  }

  connectUser() {
    this.socketService.socketConnection({ token: JSON.parse(localStorage.getItem('socialUserDetails')).token });
  }

  getPostCommentBySocket(): void {
    this.socketService.getPostDataBySocket({ token: JSON.parse(localStorage.getItem('socialUserDetails')).token, postId: this.postId });
  }

  getAsyncPostComment(): void {
    this.socketService.getAsyncPostData().subscribe((res: any) => {
      if (res.status) {
        this.postData.forEach(row => {
          if (row.post_id == res.post_id) {
            row.comments = res.data.reverse();
          }
        });
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
