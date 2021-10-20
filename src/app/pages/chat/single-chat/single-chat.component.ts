import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from '../../services/api.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.component.html',
  styleUrls: ['./single-chat.component.css']
})
export class SingleChatComponent implements OnInit {
  
  chatData: any = [];
  userList: any = [];
  message = '';
  myId = JSON.parse(localStorage.getItem('socialUserDetails')).user_id;
  toUserId = '';
  
  constructor( public apiService: ApiService, public socketService: SocketService, public notificationsService: NotificationsService ) { }

  ngOnInit(): void {
  }

  saveNewChats(){
  }

}
