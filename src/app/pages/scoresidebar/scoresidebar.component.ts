import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-scoresidebar',
  templateUrl: './scoresidebar.component.html',
  styleUrls: ['./scoresidebar.component.css']
})
export class ScoresidebarComponent implements OnInit {

  constructor(public router: Router, public notificationsService: NotificationsService, public activatedRoute: ActivatedRoute) { }
  userRoll = '';
  showHideMenu = false;
  sportId: string = '';
  page: string = '';
  
  fixture: boolean = true;
  scoreboard: boolean = true;
  matchinfo: boolean = true;
  gameleaders: boolean = true;
  playbyplay: boolean = true;
  
  ngOnInit(): void {
    
    this.sportId = this.activatedRoute.params['value']['id'];

    this.activatedRoute.params.subscribe(
      params => {
      

            this.sportId = (params['id'])?params['id']:''
            this.page = (params['page'])?params['page']:''

            if(this.sportId == "nba") {

            }else if(this.sportId == "nfl"){

              this.gameleaders = false;  

            }else if(this.sportId == "nhl"){
              
              this.playbyplay = false;
            }else if(this.sportId == "baseball"){

            this.matchinfo = false;
            this.gameleaders = false;
            this.playbyplay = false;
  
            }
       
      }
    );


    var user: any = JSON.parse(localStorage.getItem('socialUserDetails'));
    this.userRoll = user.user_roll;
  }

  logout(){
    localStorage.removeItem('socialUserDetails');
    this.router.navigateByUrl('/');
  }

  showAndHideMenu(){
    this.showHideMenu = !this.showHideMenu;
  }

  redirectToWeb(){
    window.open("https://google.com")
  }

}
