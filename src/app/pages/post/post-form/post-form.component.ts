import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  today;
  title = '';
  files: File[] = [];
  post_id;
  editImg;
  isEdit = false;
  baseUrlForImage = environment.baseUrlForImage;
  loading = false;
  constructor( public apiService: ApiService, public notificationsService: NotificationsService, public activatedRoute: ActivatedRoute, public router: Router ) {

    setInterval(() => {
      this.today = new Date()
    }, 1000);
  }


  ngOnInit(): void {
    document.getElementById("showBoard").classList.remove('d-block');
    document.getElementById("showBoard").classList.add('d-none');
    this.post_id = this.activatedRoute.snapshot.params['id'];
    if(!this.apiService.isEmpty(this.post_id)) {
      this.isEdit = true;
      this.getPostDetailById() 
    }
  }
  
  onSelect(event) {
    console.log(event);
    this.files = event.addedFiles;
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  sendPost() {
    if (!this.apiService.isEmpty(this.title)) {
      if (this.files.length > 0) {
        var body = {
          title: this.title
        }
        const formData: FormData = new FormData();    
        formData.append('file', this.files[0]);
        this.loading = true;
        this.apiService.sendPost(body, formData).subscribe((res: any)=>{
          this.loading = false;
          console.log(res);
          if(res.status){
            this.notificationsService.success('Success!', res.msg);
            this.title = '';
            this.files = [];
            this.router.navigateByUrl('/dashboard');
          } else this.notificationsService.error('Error!', res.msg);
        })

      } else this.notificationsService.error('Error!', 'Please select an image then continue.')
    } else this.notificationsService.error('Error!', 'Please enter post title.')
  }


  getPostDetailById(){
    this.loading = true;
    this.apiService.getPostById({postId: this.post_id}).subscribe((res: any)=>{
      this.loading = false;
      console.log(res);
      if(res.status){
        this.title = res.data[0].title;
        this.editImg = res.data[0].image_url;
      } else {

      }
    })
  }

  updatePost(){
    var temp = {
      post_id: this.post_id,
      title: this.title,
      isImage: this.files.length
    }
    console.log(temp);

    const formData: FormData = new FormData();    
    formData.append('file', this.files[0]);
    this.loading = true;
    this.apiService.updatePost(temp, formData).subscribe((res: any)=>{
      this.loading = false;
      console.log(res);
      if(res.status){
        this.notificationsService.success('Success!', res.msg);
        this.title = '';
        this.files = [];
        this.router.navigateByUrl('/postList');
      } else this.notificationsService.error('Error!', res.msg);
    })
  }
}
