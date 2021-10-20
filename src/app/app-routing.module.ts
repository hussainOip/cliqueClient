import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/authentications/login/login.component';
import { RegisterComponent } from './pages/authentications/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './pages/authentications/forgot-password/forgot-password.component';
import { VerifyForgotPasswordComponent } from './pages/authentications/verify-forgot-password/verify-forgot-password.component';
import { PostFormComponent } from './pages/post/post-form/post-form.component';
import { PostListComponent } from './pages/post/post-list/post-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { GroupChatComponent } from './pages/chat/group-chat/group-chat.component';
import { SingleChatComponent } from './pages/chat/single-chat/single-chat.component';
import { LiveScoresComponent } from './pages/live-scores/live-scores.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { AuthService } from './pages/services/auth.service';

const routes: Routes = [
  {path:"", component: HomeComponent, pathMatch: "full" },
  {path:"login", component: LoginComponent },
  {path:"register", component: RegisterComponent },
  {path:"forgotPassword", component: ForgotPasswordComponent },
  {path:"verifyForgotPassword", component: VerifyForgotPasswordComponent },
  {path:"dashboard", component: DashboardComponent, canActivate:[AuthService] },
  {path:"postForm", component: PostFormComponent, canActivate:[AuthService] },
  {path:"postForm/:id", component: PostFormComponent, canActivate:[AuthService] },
  {path:"postList", component: PostListComponent, canActivate:[AuthService] },
  {path:"profile", component: ProfileComponent, canActivate:[AuthService] },
  {path:"groupChat", component: GroupChatComponent, canActivate:[AuthService] },
  {path:"groupChat", component: GroupChatComponent, canActivate:[AuthService] },
  {path:"singleChat", component: SingleChatComponent, canActivate:[AuthService] },
  {path:"liveScore", component: LiveScoresComponent, canActivate:[AuthService] },
  {path:"liveScore/:id", component: LiveScoresComponent, canActivate:[AuthService] },
  {path:"userSettings", component: UserSettingsComponent, canActivate:[AuthService] },
  {path:"post/:id", component: SinglePostComponent, canActivate:[AuthService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
