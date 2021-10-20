import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imageUrl = environment.baseUrlForImage;
  constructor(public apiService: ApiService, public notificationsService: NotificationsService, public router: Router) { }
  userInfo: any = {};
  files: File[] = [];
  isShowImage = false;
  loading = false;
  userImage;
  ngOnInit(): void {
    document.getElementById("showBoard").classList.remove('d-block');
    document.getElementById("showBoard").classList.add('d-none');
    this.setUserImage();
  }

  onSelect(event) {
    console.log(event);
    this.files = event.addedFiles;
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  showHidDropImage(){
    this.isShowImage = !this.isShowImage;
    if(!this.isShowImage) this.files = [];
  }

  setUserImage(){
    var user: any = JSON.parse(localStorage.getItem('socialUserDetails'));
    this.userInfo.first_name = user.first_name;
    this.userInfo.last_name = user.last_name;
    if(user.user_image != '' && user.user_image != undefined) this.userImage =  this.imageUrl+user.user_image;
    else this.userImage = "assets/img/defaultProfileImage.png";
  }


  saveProfile(){
    if(!this.apiService.isEmpty(this.userInfo.first_name) && !this.apiService.isEmpty(this.userInfo.last_name)){
      const formData: FormData = new FormData();    
      if(this.files.length > 0) formData.append('file', this.files[0]);
      var isFile = this.files.length > 0 ? 'yes' : 'no'
      this.loading = true;
      this.apiService.updateProfile(isFile, this.userInfo, formData).subscribe((res: any)=>{
        this.loading = false;
        if(res.status){
          this.isShowImage = false;
          this.files = [];
          var user: any = JSON.parse(localStorage.getItem('socialUserDetails'));
          user.first_name = res.first_name;
          user.last_name = res.last_name;
          if(res.user_image != '') user.user_image = res.user_image;
          localStorage.setItem('socialUserDetails', JSON.stringify(user));
          this.setUserImage();
          this.notificationsService.success('Success!', res.msg)
          this.router.navigateByUrl('/dashboard');
        } else this.notificationsService.error('Error!', res.msg);
      });
    } else this.notificationsService.error('Error!', "First and last name are required.");
  }

}
