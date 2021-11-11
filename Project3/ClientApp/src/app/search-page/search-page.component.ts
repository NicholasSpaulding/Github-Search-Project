import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { GitHubUserList } from "../githubUser/git-hub-user-list";
import { GithubUser } from "../githubUser/github-user";
import { GithubUserService } from "../githubUser/github-user.service";
import { Repo } from "../repo/repo";
import { RepoService } from "../repo/repo.service";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.css"],
})
export class SearchPageComponent implements OnInit {
  searchForm = new FormGroup({
    query: new FormControl(""),
  });

  result: GithubUser;
  repos: Repo;
  list: GitHubUserList;

  constructor(
    private githubUserService: GithubUserService,
    private repoService: RepoService
  ) {}

  error: string;
  loading: boolean;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  page = 1;
  count: number;
  prevPageExists: boolean = false;
  nextPageExists: boolean = true;
  userSize = 10;

  repoPage = 1;
  repoCount: number;
  prevRepoPageExists: boolean = false;
  nextRepoPageExists: boolean = true;
  repoSize = 10;

  ngOnInit() {}

  private resetState() {
    this.error = null;
    this.result = null;
    this.repos = null;
    this.loading = true;
  }

  searchGithubUsers() {
    this.resetState();
    console.log("Performing a search on github");
    // invoke our pokemon service to fetch data from query
    this.prevPageExists = false;

    this.githubUserService
      .searchForUser(this.searchForm.get("query").value, 1)
      .subscribe(
        (githubUser: GithubUser) => {
          this.result = githubUser;
          this.nextPageExists = this.page * 10 < this.result.total_count;
          this.count = this.result.total_count;
          this.loading = false;
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  searchGithubRepos() {
    this.resetState();
    this.prevRepoPageExists = false;
    // invoke our pokemon service to fetch data from query
    this.repoService
      .searchForRepo(this.searchForm.get("query").value, 1)
      .subscribe(
        (repo: Repo) => {
          this.repos = repo;
          this.nextRepoPageExists = this.page * 10 < this.repos.total_count;
          this.repoCount = this.repos.total_count;
          this.loading = false;
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  loadUser() {
    this.prevPageExists = this.page !== 0;
    this.githubUserService
      .searchForUser(this.searchForm.get("query").value, this.page)
      .subscribe((githubUser: GithubUser) => {
        this.nextPageExists = this.page * 12 < this.result.total_count;
        this.result = githubUser;
        this.count = this.result.total_count;
      });
  }

  loadRepo() {
    this.prevRepoPageExists = this.repoPage !== 0;
    this.repoService
      .searchForRepo(this.searchForm.get("query").value, this.repoPage)
      .subscribe((repo: Repo) => {
        this.nextRepoPageExists = this.repoPage * 10 < this.repos.total_count;
        this.repos = repo;
        this.repoCount = this.repos.total_count;
      });
  }

  changeUserPage(newPage: number) {
    this.page = newPage;
    this.loadUser();
  }

  prevUser() {
    this.page--;
    this.loadUser();
  }

  nextUser() {
    this.page++;
    this.loadUser();
  }

  prev() {
    this.repoPage--;
    this.loadRepo();
  }

  next() {
    this.repoPage++;
    this.loadRepo();
  }
}
