export class GithubUser {
  accept: string = "application/vnd.github.v3+json";
  id: number;
  avatar_url: string;
  login: string;
  location: string;
  repos_url: string;
  html_url: string;
  since: number;
  items: string[];
  q: string;
  per_page: number = 10;
  blog: string;
  total_count: number;
}
