import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Repo } from "./repo";
import { catchError } from "rxjs/operators";
import { Commit } from "../commit/commit";
import { Issue } from "./issue";

@Injectable({
  providedIn: "root",
})
export class RepoService {
  private searchRepoUrl: string =
    "https://api.github.com/search/repositories?q=";
  private getRepoUrl: string = "https://api.github.com/users/";
  private getOneRepoUrl: string = "https://api.github.com/repos/";

  constructor(private httpClient: HttpClient) {}

  // search repos
  searchForRepo(query: string, page: number): Observable<Repo> {
    return this.httpClient
      .get<Repo>(`${this.searchRepoUrl}${query}&per_page=10&page=${page}`)
      .pipe(catchError(this.handleError));
  }

  // get repos
  getRepos(query: string): Observable<Repo> {
    return this.httpClient
      .get<Repo>(`${this.getRepoUrl}${query}/repos`)
      .pipe(catchError(this.handleError));
  }

  // get one repo
  getOneRepo(query1: string, query2: string): Observable<Repo> {
    return this.httpClient
      .get<Repo>(`${this.getOneRepoUrl}${query1}/${query2}`)
      .pipe(catchError(this.handleError));
  }

  // get commits
  getCommits(query1: string, query2: string): Observable<Commit> {
    return this.httpClient
      .get<Commit>(`${this.getOneRepoUrl}${query1}/${query2}/commits`)
      .pipe(catchError(this.handleError));
  }
  // get issues
  getIssues(query1: string, query2: string): Observable<Issue> {
    return this.httpClient
      .get<Issue>(`${this.getOneRepoUrl}${query1}/${query2}/issues`)
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
