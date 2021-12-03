import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-group.component.html',
  styleUrls: ['./post-group.component.css']
})
export class PostGroupComponent implements OnInit {
  today;
  title = '';
  files: File[] = [];
  group_id;
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
    this.group_id = this.activatedRoute.snapshot.params['id'];
    if(!this.apiService.isEmpty(this.group_id)) {
      this.isEdit = true;
      this.getGroupById() 
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

  createGroup() {
    if (!this.apiService.isEmpty(this.title)) {
      if (this.files.length > 0) {
        var body = {
          title: this.title
        }
        const formData: FormData = new FormData();    
        formData.append('file', this.files[0]);
        this.loading = true;
        this.apiService.createGroup(body, formData).subscribe((res: any)=>{
          this.loading = false;
          console.log(res);
          if(res.status){
            this.notificationsService.success('Success!', res.msg);
            this.title = '';
            this.files = [];
            this.router.navigateByUrl('/groupList');
          } else this.notificationsService.error('Error!', res.msg);
        })

      } else this.notificationsService.error('Error!', 'Please select an image then continue.')
    } else this.notificationsService.error('Error!', 'Please enter post title.')
  }


  getGroupById(){
    this.loading = true;
    this.apiService.getGroupById({groupId: this.group_id}).subscribe((res: any)=>{
      this.loading = false;
      console.log(res);
      if(res.status){
        this.title = res.data[0].title;
        this.editImg = res.data[0].image_url;
      } else {

      }
    })
  }

  updateGroup(){
   
    var temp = {
      group_id: this.group_id,
      title: this.title,
      isImage: this.files.length
    }


    const formData: FormData = new FormData();    
    formData.append('file', this.files[0]);
    this.loading = true;

    this.apiService.updateGroup(temp, formData).subscribe((res: any)=>{

    


      this.loading = false;
      console.log(res);
      if(res.status){
        this.notificationsService.success('Success!', res.msg);
        this.title = '';
        this.files = [];
        this.router.navigateByUrl('/groupList');
      } else this.notificationsService.error('Error!', res.msg);
    })
  }
}
