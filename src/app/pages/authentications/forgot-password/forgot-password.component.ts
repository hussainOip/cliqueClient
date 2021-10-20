import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email = '';
  constructor(public apiService: ApiService, public notificationsService: NotificationsService, public router: Router) { }

  ngOnInit(): void {
    document.getElementById("showBoard").classList.remove('d-block');
    document.getElementById("showBoard").classList.add('d-none');
  }

  forgotPassword(){
    console.log(this.email);
    if(!this.apiService.isEmpty(this.email)){
      this.apiService.forgotPassword({email: this.email}).subscribe((res: any)=>{
        console.log(res);
        if(res.status){
          this.notificationsService.success('Success!', res.msg);
          this.router.navigateByUrl('/login');
        } else this.notificationsService.error('Error!', res.msg)
      })
    } else this.notificationsService.error('Error!','Please enter your email address.');
  }
}
