import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from '../../services/api.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userInfo: any = {};
  constructor ( public apiService: ApiService, public notificationsService: NotificationsService, public router: Router, public authService: SocialAuthService) { }

  ngOnInit(): void {

    
   const userData = JSON.parse(localStorage.getItem('socialUserDetails'));
    
   if(userData?.token){
    this.router.navigateByUrl('/dashboard');
   }
   
    document.getElementById("showBoard").classList.remove('d-block');
    document.getElementById("showBoard").classList.add('d-none');
  }

  signIn(){
    if(!this.apiService.isEmpty(this.userInfo.email) && !this.apiService.isEmpty(this.userInfo.password)){
      if(this.apiService.validateEmail(this.userInfo.email)){
        this.apiService.login(this.userInfo).subscribe((res: any)=>{
          console.log(res);
          if(res.status){
            this.userInfo = {};
            this.notificationsService.success('Success!', res.msg);
            localStorage.setItem('socialUserDetails', JSON.stringify(res.data));
            this.router.navigateByUrl('/dashboard');
          } else this.notificationsService.error('Error!', res.msg);
        })
      } else this.notificationsService.error("Please enter a valid email address.");
    } else this.notificationsService.error("Please enter your email and password first.");
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((info: any)=>{
      this.apiService.socialSignInSignUp(info).subscribe((res: any)=>{
        console.log(res);
        if(res.status){
          this.notificationsService.success('Success!', res.msg);
          localStorage.setItem('socialUserDetails', JSON.stringify(res.data));
          this.router.navigateByUrl('/dashboard');
        } else {
          this.notificationsService.error('Error!', res.msg);
        }
      })
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
