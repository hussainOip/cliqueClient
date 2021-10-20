import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-verify-forgot-password',
  templateUrl: './verify-forgot-password.component.html',
  styleUrls: ['./verify-forgot-password.component.css']
})
export class VerifyForgotPasswordComponent implements OnInit {
  
  userInfo: any = {};
  
  constructor( public router: Router, public apiService: ApiService, public notificationsService: NotificationsService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    document.getElementById("showBoard").classList.remove('d-block');
    document.getElementById("showBoard").classList.add('d-none');
    this.userInfo.code = this.activatedRoute.snapshot.queryParams['code'];
  }

  changePassword(){
    if(!this.apiService.isEmpty(this.userInfo.password) && !this.apiService.isEmpty(this.userInfo.rePassword)){
      if(this.userInfo.password == this.userInfo.rePassword){
        this.apiService.verifyChangePassword(this.userInfo).subscribe((res: any)=>{
          if(res.status){
            this.notificationsService.success('Success!', res.msg);
            localStorage.removeItem('socialUserDetails');
            this.router.navigateByUrl('/login');
          } else this.notificationsService.error('Error!', res.msg);
        })
      } else this.notificationsService.error('Error!','Password does not match.');
    } else this.notificationsService.error('Error!','Please enter password and confirm password.');
  }

}
