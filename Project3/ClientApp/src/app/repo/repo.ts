import { Items } from "./items";
import { Owner } from "./owner";

export class Repo {
  id: number;
  // items: string[];
  items: Items[];
  name: string;
  owner: Owner;

  // display on search page
  login: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  open_issues: number;
  clone_url: string;
  commits_url: string;
  html_url: string;
  description: string;
  forks: number;
  total_count: number;
}
