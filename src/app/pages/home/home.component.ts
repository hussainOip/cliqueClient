import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isMenuActive: boolean = false;
  constructor() { }

  ngOnInit(): void {
    document.getElementById("showBoard").classList.remove('d-block');
    document.getElementById("showBoard").classList.add('d-none');
  }

  openHideMenu(){
    this.isMenuActive = !this.isMenuActive;
    if(this.isMenuActive) document.getElementById('openHideMenu').classList.add('menu-active');
    if(!this.isMenuActive) document.getElementById('openHideMenu').classList.remove('menu-active');
  }

}
