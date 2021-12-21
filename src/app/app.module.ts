import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/authentications/login/login.component';
import { RegisterComponent } from './pages/authentications/register/register.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from './pages/services/api.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
import { ForgotPasswordComponent } from './pages/authentications/forgot-password/forgot-password.component';
import { VerifyForgotPasswordComponent } from './pages/authentications/verify-forgot-password/verify-forgot-password.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PostListComponent } from './pages/post/post-list/post-list.component';
import { PostFormComponent } from './pages/post/post-form/post-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './pages/header/header.component';
import { GroupChatComponent } from './pages/chat/group-chat/group-chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './pages/services/socket.service';
import { SingleChatComponent } from './pages/chat/single-chat/single-chat.component';
import { DateAgoPipe } from './pipes/pipes/date-ago.pipe';
import { RightSidebarComponent } from './pages/right-sidebar/right-sidebar.component';
import { LiveScoresComponent } from './pages/live-scores/live-scores.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { AuthService } from './pages/services/auth.service';
import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { PhoneNumberComponent } from './pages/authentications/phone-number/phone-number.component';
import { FirstComponent } from './pages/authentications/first/first.component';
import { LeadersComponent } from './pages//leaders/leaders.component';
import { ScoresidebarComponent } from './pages/scoresidebar/scoresidebar.component';
import { LeadProfileComponent } from './pages/lead-profile/lead-profile.component';
import { GroupListComponent } from './pages/groups/list-group/group-list.component';
import { PostGroupComponent } from './pages/groups/post-group/post-group.component';


export function tokenGetter() {
  var detail: any = JSON.parse(localStorage.getItem('socialUserDetails'));
  if(detail == null) detail = "empty";
  return detail.token;
}

const config: SocketIoConfig = { url: environment.baseUrlForSocket, options: {
  reconnection:true,
  transports: ['websocket'],
} };


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    ForgotPasswordComponent,
    VerifyForgotPasswordComponent,
    PostListComponent,
    PostFormComponent,
    ProfileComponent,
    HeaderComponent,
    GroupChatComponent,
    SingleChatComponent,
    DateAgoPipe,
    RightSidebarComponent,
    LiveScoresComponent,
    SinglePostComponent,
    UserSettingsComponent,
    PhoneNumberComponent,
    FirstComponent,
    LeadersComponent,
    ScoresidebarComponent,
    LeadProfileComponent,
    PostGroupComponent,
    GroupListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgxDropzoneModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({}),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,



                //allowedDomains: ['localhost:5000', 'http://localhost:5000', 'webprojectmockup.com', 'https://ectmockup.com:9447', 'webprojectmockup.com:9447','https://click-server105.herokuapp.com','click-server105.herokuapp.com'],

                  allowedDomains: ['*','http://www.cliquesports.co','www.cliquesports.co','cliquesports.co','https://click-server105.herokuapp.com','click-server105.herokuapp.com',
                  'http://click-server105.herokuapp.com','https://click-server105.herokuapp.com','localhost:5000', 'http://localhost:5000', 'webprojectmockup.com'],
                authScheme: '',
      },
    }),
    BrowserAnimationsModule,
    SocialLoginModule,
    ModalModule.forRoot(),
    SocketIoModule.forRoot(config),
    SimpleNotificationsModule.forRoot()
  ],
  providers: [ApiService, SocketService,AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1057915362017-bgpmcn7q6c54k7vek32j4acu532f8hfs.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
