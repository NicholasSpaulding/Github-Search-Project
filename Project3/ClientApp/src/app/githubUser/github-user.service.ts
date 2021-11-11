import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { GitHubUserList } from "./git-hub-user-list";
import { GithubUser } from "./github-user";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GithubUserService {
  private baseApiUrl: string = "https://api.github.com/";

  private searchUrl: string = "https://api.github.com/search/users?q=";

  private getFollowerUrl: string = "https://api.github.com/users/";

  constructor(private httpClient: HttpClient) {}

  // search users with login name
  searchForUser(query: string, page: number): Observable<GithubUser> {
    return this.httpClient
      .get<GithubUser>(`${this.searchUrl}${query}&per_page=10&page=${page}`)
      .pipe(catchError(this.handleError));
  }

  getUser(query: string): Observable<GithubUser> {
    return this.httpClient
      .get<GithubUser>(`${this.baseApiUrl}users/${query}`)
      .pipe(catchError(this.handleError));
  }

  // get followers
  getFollowers(query: string): Observable<GithubUser> {
    return this.httpClient
      .get<GithubUser>(`${this.getFollowerUrl}${query}/followers`)
      .pipe(catchError(this.handleError));
  }

  // get list of users
  queryUsers(
    page: number,
    size: number,
    query: string
  ): Observable<GitHubUserList> {
    console.log("Hello");

    return this.httpClient
      .get<GitHubUserList>(
        `${this.baseApiUrl}users`
        // `${this.baseApiUrl}search/users?q={${query}}{&${page},${size},sort,order}}`
      )
      .pipe(catchError(this.handleError));
  }

  // error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      if (error.status === 404) {
        return throwError("That resource could not be found");
      }
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
