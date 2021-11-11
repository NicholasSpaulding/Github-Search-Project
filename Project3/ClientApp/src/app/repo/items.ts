import { Owner } from "./owner";

export class Items {
  owner: Owner;
  id: number;
  node_id: string;
  name: string;

  login: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  open_issues: number;
}
