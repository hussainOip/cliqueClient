import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Socket } from 'ngx-socket-io';
import { ApiService } from '../../services/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  groupChatData: any = [];
  userList: any = [];
  message = '';
  myId = JSON.parse(localStorage.getItem('socialUserDetails')).user_id;
  imageUrl = environment.baseUrlForImage;
  constructor(public socketService: SocketService, public socket: Socket, public apiService: ApiService, public router: Router) { }

  ngOnInit(): void {
    document.getElementById("showBoard").classList.remove('d-block');
    document.getElementById("showBoard").classList.add('d-none');
    this.connectUser();
    this.getAlluserChats();
    this.getGroupMsg();
    this.getuserList();
    this.getUserListThroughSocket();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  ngAfterViewChecked() {

  }

  connectUser() {
    this.socketService.socketConnection({ token: JSON.parse(localStorage.getItem('socialUserDetails')).token });
  }

  getAlluserChats() {
    this.apiService.getAlluserChats().subscribe((res: any) => {
      console.log(res);
      if (res.status) this.groupChatData = res.data;
      setTimeout(() => {
        this.scrollToBottom();
      }, 250);
    })
  }

  saveNewGroupChats() {
    if (this.message.trim().length) {
      this.socketService.saveNewGroupChats({ msg: this.message, token: JSON.parse(localStorage.getItem('socialUserDetails')).token });
      this.message = '';
      setTimeout(() => {
        this.scrollToBottom();
      }, 250);
    }
  }

  getGroupMsg() {
    this.socketService.getGroupMessages().subscribe((res: any) => {
      if (res.status) {
        this.groupChatData = res.data;
      }
    })
  }

  getuserList() {
    this.apiService.getAllUserList().subscribe((res: any) => {
      console.log(res);
      if (res.status) this.userList = res.data;
    })
  }

  deleteMsg(chatId) {
    this.apiService.deleteChat({ chatId: chatId }).subscribe((res: any) => {
      if (res.status) this.getAlluserChats();
    })
  }

  getUserListThroughSocket() {
    this.socketService.getAllUserListThroughSocket().subscribe((res: any) => {
      console.log(res);
      if (res.status) this.userList = res.data;
    })
  }

  redirectToSingleChat(userDetail) {
    // localStorage.setItem('chatWith', JSON.stringify(userDetail));
    // this.router.navigateByUrl('/singleChat');
    // this.apiService.addUserInChatList({senderId: this.myId, receiverId: userDetail.user_id}).subscribe((res: any)=>{
    //   console.log(res);
    // })
  }

  ngOnDestroy(): void{
    this.socketService.onDestroyComponent();
  }
}
