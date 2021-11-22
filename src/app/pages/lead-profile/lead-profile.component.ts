import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-lead-profile',
  templateUrl: './lead-profile.component.html',
  styleUrls: ['./lead-profile.component.css']
})
export class LeadProfileComponent implements OnInit {

  matesLeaderData: any = {};
  leaderData: any = {};
  imageUrl = environment.baseUrlForImage;
  loading = false;
  leaderId;
  userImage;

  constructor(public apiService: ApiService, public notificationsService: NotificationsService, public router: Router,public activatedRoute: ActivatedRoute) {
  }  

  ngOnInit(): void {
    
    this.leaderId = this.activatedRoute.params['value']['id'];
    this.getLeadById(this.leaderId);
    this.getMatesAndLeaders();

  }
  
  getLeadById(id) {
    this.loading = true;
    this.apiService.getLeadById(id).subscribe((res: any) => {
      this.loading = false;
      this.leaderData = res.data;

      console.log("this.leaderData",this.leaderData);
    if(this.leaderData.user_image != '' && this.leaderData.user_image != undefined) this.userImage =  this.imageUrl+this.leaderData.user_image;
    else this.userImage = "assets/img/defaultProfileImage.png";

    })
  }

  
  getMatesAndLeaders() {
    this.loading = true;
    this.apiService.getRandomTeamMates().subscribe((res: any) => {

      console.log("res",res);
      this.loading = false;
      this.matesLeaderData = res.data;
    })
  }



}
