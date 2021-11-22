import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  baseUrlForImage = environment.baseUrlForImage;
  postList: any = [];
  deleteProductId = '';
  config: any;
  isRecord = false;
  loading = false;
  constructor( public apiService: ApiService, public notificationsService: NotificationsService) {
   }

  ngOnInit(): void {
    document.getElementById("showBoard").classList.remove('d-block');
    document.getElementById("showBoard").classList.add('d-none');
    this.getPostList();
  }

  setDeleteId(val){
    this.deleteProductId = val;
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

  deletePost(){
    this.loading = true;
    this.apiService.deletePost({id: this.deleteProductId}).subscribe((res: any)=>{
      this.loading = false;
      if(res.status){
        this.notificationsService.success('Success!', res.msg);
        this.getPostList();
        document.getElementById('deleteModalOff').click();  
      } else {
        this.notificationsService.error('Error!', res.msg);
        document.getElementById('deleteModalOff').click();  
      }
    })
  }

  getPostList(){
    this.loading = true;
    this.apiService.getPostList().subscribe((res: any)=>{
      this.loading = false;
      this.postList = res.data;

      console.log(res.data);
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.postList.length ? this.postList.length : 0
      };
      if(this.postList.length == 0) this.isRecord = true;
    })
  }

}
