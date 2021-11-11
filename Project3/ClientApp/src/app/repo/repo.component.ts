import { Component, Input, OnInit } from "@angular/core";
import { Repo } from "./repo";
import { RepoService } from "./repo.service";

@Component({
  selector: "app-repo",
  templateUrl: "./repo.component.html",
  styleUrls: ["./repo.component.css"],
})
export class RepoComponent implements OnInit {
  @Input() repo: Repo;
  @Input() searchWord: string;
  constructor(private repoService: RepoService) {}

  ngOnInit() {
    if (this.searchWord) {
      this.repoService
        .searchForRepo(this.searchWord, 1)
        .subscribe((repo: Repo) => {
          this.repo = repo;
        });
    }
  }
}
