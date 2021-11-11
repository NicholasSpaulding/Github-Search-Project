import { Component, Input, OnInit } from "@angular/core";
import { GithubUser } from "./github-user";
import { GithubUserService } from "./github-user.service";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-github-user",
  templateUrl: "./github-user.component.html",
  styleUrls: ["./github-user.component.css"],
})
export class GithubUserComponent implements OnInit {
  @Input() githubUser: GithubUser;
  @Input() userName: string;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  constructor(private githubUserService: GithubUserService) {}

  ngOnInit() {
    if (this.userName) {
      this.githubUserService
        .searchForUser(this.userName, 1)
        .subscribe((githubUser: GithubUser) => {
          this.githubUser = githubUser;
        });
    }
  }

  getGithubUser(userName: string) {
    this.githubUserService
      .getUser(userName)
      .subscribe((githubUser: GithubUser) => {
        this.githubUser = githubUser;
      });
  }
}
