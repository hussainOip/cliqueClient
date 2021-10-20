import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  usersData: any = [];
  config: any;
  baseUrlForImage = environment.baseUrlForImage;
  loading = false;
  constructor(public apiService: ApiService, public notificationsService: NotificationsService) { }

  ngOnInit(): void {
    document.getElementById("showBoard").classList.remove('d-block');
    document.getElementById("showBoard").classList.add('d-none');
    this.getAllUsersBySuperAdmin();
  }

  getAllUsersBySuperAdmin() {
    this.loading = true;
    this.apiService.getAllUsersBySuperAdmin().subscribe((res: any) => {
      this.loading = false;
      console.log(res);
      this.usersData = res.data;
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.usersData.length ? this.usersData.length : 0
      };
    })
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

  updateUserRoll(userId, userRoll) {
    var obj = { userId: userId, userRoll: userRoll };
    this.loading = true;
    this.apiService.updateUserRollBySuperAdmin(obj).subscribe((res: any) => {
      this.loading = false;
      if (res.status) {
        this.notificationsService.success('Success!', "Role has been updated successfully.");
        this.getAllUsersBySuperAdmin();
      } else this.notificationsService.success('Error!', res.msg);
    })
  }
}
