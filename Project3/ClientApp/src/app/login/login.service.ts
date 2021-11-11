import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { TokenResponse } from "./token-response";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  accessToken: string;
  loginUrl: string;
  public redirectUrl: string;
  tokenRequestUrl = "/api/login";

  constructor(private http: HttpClient) {
    this.loginUrl = `https://github.com/login/oauth/authorize?client_id=${environment.clientId}`;
  }

  setToken(token: string) {
    this.accessToken = token;
  }

  getToken(): string {
    return this.accessToken;
  }

  setRedirectUrl(url: string) {
    localStorage.setItem("redirectUrl", url);
  }

  getRedirectUrl() {
    return localStorage.getItem("redirectUrl");
  }

  requestAccessToken(code: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.tokenRequestUrl, { code: code });
  }
}
