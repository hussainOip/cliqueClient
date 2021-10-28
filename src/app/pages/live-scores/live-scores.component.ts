import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-live-scores',
  templateUrl: './live-scores.component.html',
  styleUrls: ['./live-scores.component.css']
})
export class LiveScoresComponent implements OnInit {
  sportId: string = '';
  isScoreData: boolean = false;
  loading: boolean = false;
  constructor(public apiService: ApiService, public notificationsService: NotificationsService, public activatedRoute: ActivatedRoute) { }
  sportsDetail: any = [];
  ngOnInit(): void {
     this.sportId = this.activatedRoute.params['value']['id'];
    
     document.getElementById("showBoard").classList.add('d-block');
     

     

    if(this.sportId){
  
      
      document.getElementById(`g-all`).classList.remove('d-block');
      document.getElementById(`g-football`).classList.remove('d-block');
      document.getElementById(`g-nba`).classList.remove('d-block');
      document.getElementById(`g-nhl`).classList.remove('d-block');
      document.getElementById(`g-baseball`).classList.remove('d-block');

      document.getElementById(`g-${this.sportId}`).classList.add('d-block');
    }else{
      
    
      document.getElementById(`g-football`).classList.remove('d-block');
      document.getElementById(`g-nba`).classList.remove('d-block');
      document.getElementById(`g-nhl`).classList.remove('d-block');
      document.getElementById(`g-baseball`).classList.remove('d-block');

      document.getElementById(`g-all`).classList.add('d-block');

    }

    
    }

  getSportDetailsById() {
    this.loading = true;
    this.apiService.getSportDetailsById({ date: this.apiService.getOnlyDate(), sportId: this.sportId }).subscribe((res: any) => {
      this.loading = false;
      if (res.data.events.length == 0) this.isScoreData = true;
      this.sportsDetail = res.data.events;
      console.log(this.sportsDetail);
    })
  }

  convertToArry(lines){
    if(lines){
      var result = Object.values(lines);
      return result;
    } else [];
  }
}
