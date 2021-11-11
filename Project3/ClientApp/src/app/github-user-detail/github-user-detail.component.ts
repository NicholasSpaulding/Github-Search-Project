import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GithubUser } from "../githubUser/github-user";
import { GithubUserService } from "../githubUser/github-user.service";
import { Repo } from "../repo/repo";
import { RepoService } from "../repo/repo.service";

@Component({
  selector: "app-github-user-detail",
  templateUrl: "./github-user-detail.component.html",
  styleUrls: ["./github-user-detail.component.css"],
})
export class GithubUserDetailComponent implements OnInit {
  githubUser: GithubUser;
  githubUserFollowers: GithubUser;
  repos: Repo;
  constructor(
    private route: ActivatedRoute,
    private githubUserService: GithubUserService,
    private repoService: RepoService
  ) {}

  ngOnInit() {
    let githubUserLogin = this.route.snapshot.paramMap.get("login");
    this.githubUserService
      .getUser(githubUserLogin)
      .subscribe((githubUser: GithubUser) => {
        this.githubUser = githubUser;
      });
    this.repoService.getRepos(githubUserLogin).subscribe((repo: Repo) => {
      this.repos = repo;
    });
    this.githubUserService
      .getFollowers(githubUserLogin)
      .subscribe((githubUserFollowers: GithubUser) => {
        this.githubUserFollowers = githubUserFollowers;
      });
  }
}
