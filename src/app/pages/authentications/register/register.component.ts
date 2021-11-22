import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from '../../services/api.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userInfo: any = {};
  isFormShow = false;
  isCodeBox = false;
  mobileNumber = '';
  otpCode='';
  constructor( public apiService: ApiService, public notificationsService: NotificationsService, public router: Router, public authService: SocialAuthService ) { }

  ngOnInit(): void {
    document.getElementById("showBoard").classList.remove('d-block');
    document.getElementById("showBoard").classList.add('d-none');
  }

  signUp() {

    if (this.apiService.isEmpty(this.userInfo.name)) return this.notificationsService.error('Error!', 'Please enter your name');
    if (this.apiService.isEmpty(this.userInfo.email)) return this.notificationsService.error('Error!', 'Please enter your email');
    if (!this.apiService.validateEmail(this.userInfo.email)) return this.notificationsService.error('Error!', 'Invalid email');

    if (this.apiService.isEmpty(this.userInfo.address)) return this.notificationsService.error('Error!', 'Please enter your address');
    if (this.apiService.isEmpty(this.userInfo.city)) return this.notificationsService.error('Error!', 'Please select your city');
    if (this.apiService.isEmpty(this.userInfo.leader)) return this.notificationsService.error('Error!', 'Please select your leader');
    if (this.apiService.isEmpty(this.userInfo.favourite_team)) return this.notificationsService.error('Error!', 'Please select your favourite team');
    if (this.apiService.isEmpty(this.userInfo.favourite_player)) return this.notificationsService.error('Error!', 'Please select your favourite player'); 
    if (this.apiService.isEmpty(this.userInfo.password)) return this.notificationsService.error('Error!', 'Enter your password');   
    if (this.apiService.isEmpty(this.userInfo.rePassword)) return this.notificationsService.error('Error!', 'Enter your confirm password');
    if (this.userInfo.password == this.userInfo.rePassword) {
    if(this.mobileNumber.length > 16) return this.notificationsService.error('Error!', 'Phone number length should be under 15 digits');
      this.userInfo.phone = this.mobileNumber;
      this.apiService.register(this.userInfo).subscribe((res: any) => {
        if (res.status) {
          this.userInfo = {};
          this.notificationsService.success('Success!',res.msg);
          this.router.navigateByUrl('/login');
        } else this.notificationsService.error('Error!', res.msg);
      })
    } else this.notificationsService.error('Error!', 'Password does not match');
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

  sendOtpCode(){
    if(!this.apiService.isEmpty(this.mobileNumber)){
      this.apiService.sendOtpCode({phonenumber: this.mobileNumber, channel: "sms"}).subscribe((res: any)=>{
        if(res.status){
          this.isCodeBox = true;
        } else this.notificationsService.error('Error!', res.msg);
      })
    } else this.notificationsService.error('Please enter mobile number.');
  }
  
  verifyOtpCode(){
    if(!this.apiService.isEmpty(this.otpCode)){
      this.apiService.verifyOtpCode({phonenumber: this.mobileNumber, code: this.otpCode}).subscribe((res: any)=>{
        if(res.status){
          this.isFormShow = true;
        } else this.notificationsService.error('Error!', res.msg);
      })
    } else this.notificationsService.error('Please enter otp code.');
  }
}
