import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dynamic-group',
  templateUrl: './dynamic-group.component.html',
  styleUrls: ['./dynamic-group.component.css']
})
export class DynamicGroupComponent implements OnInit {

  groupData: any = JSON.parse(localStorage.getItem("groupData"));

  constructor( public apiService: ApiService) {}

  ngOnInit(): void { 
  }

}
