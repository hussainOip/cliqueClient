import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-lead-profile',
  templateUrl: './lead-profile.component.html',
  styleUrls: ['./lead-profile.component.css']
})
export class LeadProfileComponent implements OnInit {

  matesLeaderData: any = {};
  leaderData: any = {};
  imageUrl = environment.baseUrlForImage;
  loading = false;
  leaderId;
  userImage;
  handler:any = null;
  paymentHandler: any = null;
  constructor(public apiService: ApiService, public notificationsService: NotificationsService, public router: Router,public activatedRoute: ActivatedRoute) {
  }  

  ngOnInit(): void {
    
    this.leaderId = this.activatedRoute.params['value']['id'];
    this.getLeadById(this.leaderId);
    this.getMatesAndLeaders();
    
    this.loadStripe();

  }

  
  getLeadById(id) {
    this.loading = true;
    this.apiService.getLeadById(id).subscribe((res: any) => {
      this.loading = false;
      this.leaderData = res.data;

      console.log("this.leaderData",this.leaderData);
    if(this.leaderData.user_image != '' && this.leaderData.user_image != undefined) this.userImage =  this.imageUrl+this.leaderData.user_image;
    else this.userImage = "assets/img/defaultProfileImage.png";

    })
  }

  
  getMatesAndLeaders() {
    this.loading = true;
    this.apiService.getRandomTeamMates().subscribe((res: any) => {

      console.log("res",res);
      this.loading = false;
      this.matesLeaderData = res.data;
    })
  }



  
  makePayment(amount: any) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HetTIJW7BN24rpMNks6Tj161IWSRgoGvfuj6VrDLV8cU1G5d2ii6unhKJeC5WWhSrO78J8tqvTVmNiMN0cOOX0w00zpKPEmYh',
      locale: 'auto',
      token: (token: any) => {
        this.paynow(token);
      }
    });
 
    handler.open({
      name: "Clique Sports",
      description: "Leader Fees",
      amount: amount*100,
    });
 
  }



  
  paynow(token) {

var user: any = JSON.parse(localStorage.getItem('socialUserDetails'));
const data ={
  leaderId:this.leaderId,
  userId:user.user_id,
  token:token
}
console.log("data",data);
    this.loading = true;
    this.apiService.paynow(data).subscribe((res: any) => {
      this.loading = false;
      if(res.status){
        this.notificationsService.success('Success!', res.msg);        
        this.router.navigateByUrl('/leaders');
      } else {
        this.notificationsService.error('Error!', res.msg);
      }

    })
  }


 
  
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HetTIJW7BN24rpMNks6Tj161IWSRgoGvfuj6VrDLV8cU1G5d2ii6unhKJeC5WWhSrO78J8tqvTVmNiMN0cOOX0w00zpKPEmYh',
          locale: 'auto',
          token: function (token: any) {
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }





}
