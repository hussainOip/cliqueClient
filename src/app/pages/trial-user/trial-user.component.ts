import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-trial-user',
  templateUrl: './trial-user.component.html',
  styleUrls: ['./trial-user.component.css']
})
export class TrialUserComponent implements OnInit {

  loading = false;
  paymentData = [];
  paymentStatus = 'active'
  config: any;
  baseUrlForImage = environment.baseUrlForImage;
  constructor(public apiService: ApiService, public notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.getAllTrialUserDetails('active');
  }

  getAllTrialUserDetails(status) {
    this.paymentStatus = status;
    this.loading = true;
    this.apiService.getAllTrialUserDetails({ status: (status == 'active' ? '' : 'expire') }).subscribe((res: any) => {
      this.loading = false;
      this.paymentData = res.data;
      if (this.paymentData.length == 0) this.notificationsService.info('Info!', 'No Data Found.')
      console.log("this.groupData", this.paymentData);
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.paymentData.length ? this.paymentData.length : 0
      };
    })
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }
}
