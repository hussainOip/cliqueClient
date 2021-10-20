import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(public socket: Socket) { }

  public socketConnection(data: any) {
    this.socket.emit('connectSocket', data);
  }

  public onDestroyComponent() {
    this.socket.emit('onComponentDestroy');
  }

  public getPostDataBySocket(data) {
    this.socket.emit('getPostData', data);
  }

  public saveNewGroupChats(data: any) {
    this.socket.emit('sendGroupMsg', data);
  }

  public getGroupMessages = () => {
    return Observable.create((observer: any) => {
      this.socket.on('getGroupMsg', (message: any) => {
        observer.next(message);
      });
    });
  }

  public getAllUserListThroughSocket = () => {
    return Observable.create((observer: any) => {
      this.socket.on('getAllUserListThroughSocket', (message: any) => {
        observer.next(message);
      });
    });
  }

  public getAsyncPostData = () => {
    return Observable.create((observer: any) => {
      this.socket.on('getAsyncPostData', (message: any) => {
        observer.next(message);
      });
    });
  }
}
