import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  
  loading = false;
  groupReqData = [];
  config: any;
  baseUrlForImage = environment.baseUrlForImage;
  constructor(public apiService: ApiService, public notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.getAllGroupsRequest();
  }

  getAllGroupsRequest() {
    this.loading = true;
    this.apiService.getAllGroupsRequest().subscribe((res: any) => {
      this.loading = false;
      this.groupReqData = res.data;
      
      console.log("this.groupData",this.groupReqData);
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.groupReqData.length ? this.groupReqData.length : 0
      };
    })
  }

  changeApprovalStatus(status, id){
    this.loading = true;
    this.apiService.changeApprovalStatus({approval: status, id: id}).subscribe((res: any) => {
      this.loading = false;
      this.groupReqData = res.data;
      if(res.status) {
        this.notificationsService.success('Success!', 'Status has been chage successfully')
      } else this.notificationsService.error('Error!', 'Failed to update status')
    })
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

}
