import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {
  notificationData: any = [];
  limit = 50;
  isRecord = false;
  imageUrl = environment.baseUrlForImage;
  loading: boolean = false;
  constructor(public router: Router, public notificationsService: NotificationsService, public apiService: ApiService) { }
  userRoll = '';
  ngOnInit(): void {
    var user: any = JSON.parse(localStorage.getItem('socialUserDetails'));
    this.userRoll = user.user_roll;
    this.getAllNotifications();
  }

  getAllNotifications(){
    this.loading = true;
    this.limit = this.limit + 20;
    this.apiService.getAllNotifications({limit: this.limit}).subscribe((res: any)=>{
      this.loading = false;
      this.notificationData = res.data;
      if(this.notificationData.length == 0) this.isRecord = true;
    })
  }
}
