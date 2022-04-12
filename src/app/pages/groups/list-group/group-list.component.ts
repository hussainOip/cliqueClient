import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  deleteGroupId;
  groupData: any = [];  
  matesLeaderData: any = {};
  config: any;
  baseUrlForImage = environment.baseUrlForImage;
  loading = false;
  userRoll = JSON.parse(localStorage.getItem("socialUserDetails")).user_roll;
  
  constructor(public apiService: ApiService, public notificationsService: NotificationsService) { }

  ngOnInit(): void {
    console.log(this.userRoll);
    this.getMatesAndLeaders();

    // document.getElementById("showBoard").classList.remove('d-block');
    // document.getElementById("showBoard").classList.add('d-none');
    this.getAllGroups();
    
  }

  getAllGroups() {
    this.loading = true;
    this.apiService.getAllGroups().subscribe((res: any) => {
      this.loading = false;
      this.groupData = res.data;
      
      console.log("this.groupData",this.groupData);
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.groupData.length ? this.groupData.length : 0
      };
    })
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

  //updateUserRoll

  updateGroupById(group_id, leader_id) {
    var obj = { groupId: group_id, leaderId: leader_id };
    this.loading = true;
    this.apiService.updateGroupById(obj).subscribe((res: any) => {
      this.loading = false;
      if (res.status) {
        this.notificationsService.success('Success!', "Updated successfully.");
        this.getAllGroups();
      } else this.notificationsService.success('Error!', res.msg);
    })
  }


  
getMatesAndLeaders() {
  this.loading = true;
  this.apiService.getLead().subscribe((res: any) => {
    this.loading = false;
    this.matesLeaderData = res.data;
  })
}



setDeleteId(val){
  this.deleteGroupId = val;
}


deleteGroup(){
  this.loading = true;
  this.apiService.deleteGroup({id: this.deleteGroupId}).subscribe((res: any)=>{
    this.loading = false;
    if(res.status){
      this.notificationsService.success('Success!', res.msg);
      this.getAllGroups();
      document.getElementById('deleteModalOff').click();  
    } else {
      this.notificationsService.error('Error!', res.msg);
      document.getElementById('deleteModalOff').click();  
    }
  })
}


}
