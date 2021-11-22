import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-scoresidebar',
  templateUrl: './scoresidebar.component.html',
  styleUrls: ['./scoresidebar.component.css']
})
export class ScoresidebarComponent implements OnInit {

  constructor(public router: Router, public notificationsService: NotificationsService) { }
  userRoll = '';
  showHideMenu = false;
  ngOnInit(): void {
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
