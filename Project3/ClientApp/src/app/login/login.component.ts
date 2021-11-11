import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { LoginService } from "./login.service";
import { TokenResponse } from "./token-response";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginUrl: string;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginUrl = `https://github.com/login/oauth/authorize?client_id=${environment.clientId}&redirect_uri=${window.location.href}`;
    const code: string = this.route.snapshot.queryParamMap.get("code");
    if (code) {
      this.loginService
        .requestAccessToken(code)
        .subscribe((tokenResponse: TokenResponse) => {
          this.loginService.setToken(tokenResponse.access_token);
          this.router.navigateByUrl(this.loginService.getRedirectUrl());
        });
    }
  }
}
