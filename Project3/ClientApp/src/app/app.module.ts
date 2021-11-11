import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { SearchPageComponent } from "./search-page/search-page.component";
import { GithubUserComponent } from "./githubUser/github-user.component";
import { LoadingComponent } from "./loading/loading.component";
import { GithubUserDetailComponent } from "./github-user-detail/github-user-detail.component";
import { RepoComponent } from "./repo/repo.component";
import { RepoDetailComponent } from "./repo-detail/repo-detail.component";
import { CommitComponent } from "./commit/commit.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./login/auth.guard";
import { AuthInterceptor } from "./login/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FetchDataComponent,
    SearchPageComponent,
    GithubUserComponent,
    LoadingComponent,
    GithubUserDetailComponent,
    RepoComponent,
    RepoDetailComponent,
    CommitComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule.forRoot([
      {
        path: "",
        component: SearchPageComponent,
        pathMatch: "full",
        // canActivate: [AuthGuard]
      },
      {
        path: "github-user/:login",
        component: GithubUserDetailComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "repo-detail/:loginone/:logintwo",
        component: RepoDetailComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: "github-user/:login/repo-detail/:loginone/:logintwo",
        component: RepoDetailComponent,
        // canActivate: [AuthGuard]
      },
      { path: "login", component: LoginComponent },
    ]),
  ],
  //providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
