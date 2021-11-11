import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Commit } from "../commit/commit";
import { Issue } from "../repo/issue";
import { Repo } from "../repo/repo";
import { RepoService } from "../repo/repo.service";

@Component({
  selector: "app-repo-detail",
  templateUrl: "./repo-detail.component.html",
  styleUrls: ["./repo-detail.component.css"],
})
export class RepoDetailComponent implements OnInit {
  repo: Repo;
  commit: Commit;
  issue: Issue;

  constructor(
    private route: ActivatedRoute,
    private repoService: RepoService
  ) {}

  ngOnInit() {
    let githubUserLogin = this.route.snapshot.paramMap.get("loginone");
    let repoName = this.route.snapshot.paramMap.get("logintwo");
    this.repoService
      .getOneRepo(githubUserLogin, repoName)
      .subscribe((repo: Repo) => {
        this.repo = repo;
      });
    this.repoService
      .getCommits(githubUserLogin, repoName)
      .subscribe((commit: Commit) => {
        this.commit = commit;
      });
    this.repoService
      .getIssues(githubUserLogin, repoName)
      .subscribe((issue: Issue) => {
        this.issue = issue;
      });
  }
}
