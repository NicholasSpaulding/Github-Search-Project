import { GithubUser } from "../githubUser/github-user";
import { Author } from "./author";

export class Commit {
  author: GithubUser;
  login: string;
  commit: string;
  url: string;
  message: string;
  comment_count: number;
}
