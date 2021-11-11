import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RepoService } from "../repo/repo.service";
import { Commit } from "./commit";

@Component({
  selector: "app-commit",
  templateUrl: "./commit.component.html",
  styleUrls: ["./commit.component.css"],
})
export class CommitComponent implements OnInit {
  commit: Commit;
  // @Input() commit: Commit;

  constructor(
    private route: ActivatedRoute,
    private repoService: RepoService
  ) {}

  ngOnInit() {
    let githubUserLogin = this.route.snapshot.paramMap.get("loginone");
    let repoName = this.route.snapshot.paramMap.get("logintwo");
    this.repoService
      .getCommits(githubUserLogin, repoName)
      .subscribe((commit: Commit) => {
        this.commit = commit;
      });
  }
}
