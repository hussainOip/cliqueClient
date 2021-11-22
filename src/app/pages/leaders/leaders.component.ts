import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leaders',
  templateUrl: './leaders.component.html',
  styleUrls: ['./leaders.component.css']
})
export class LeadersComponent implements OnInit {


  imageUrl = environment.baseUrlForImage;
  loading = false;
  matesLeaderData: any = {};
  today;
  leaderId;
  constructor(public apiService: ApiService, public notificationsService: NotificationsService, public router: Router,public activatedRoute: ActivatedRoute) {
    setInterval(() => {
      this.today = new Date()
    }, 1000);
  }


  ngOnInit(): void {


    this.leaderId = this.activatedRoute.params['value']['id'];
    
    if(this.leaderId){

      this.getLeadById(this.leaderId);

      console.log("one leader" );

    }else{
      console.log("more than one leaders" );
    }

    this.getMatesAndLeaders();


  }




  
  getMatesAndLeaders() {
    this.loading = true;
    this.apiService.getRandomTeamMates().subscribe((res: any) => {
      console.log("res",res);
      this.loading = false;
      this.matesLeaderData = res.data;
    })
  }



  
  getLeadById(id) {
    this.loading = true;
    this.apiService.getLeadById(id).subscribe((res: any) => {
      console.log("res",res);
      this.loading = false;
      this.matesLeaderData = res.data;
    })
  }

}
