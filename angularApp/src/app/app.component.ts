import { Component, OnInit } from '@angular/core';
import { AppService, Post } from './app.services';
import { map } from 'rxjs/operators';
// import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularApp';
  posts: Post[];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.appService.getPosts()
      .subscribe(posts => this.posts = posts);
  }
  showPost(post: Post): boolean {
    if (post.story_title == null && post.title == null) {
      return false;
    }
    return true;
  }
  getTitle(post: Post): string {
    if (post.story_title != null) {
      return post.story_title;
    } else if (post.title != null) {
      return post.title;
    }
    return '';
  }
  getUrl(post: Post): string {
    if (post.story_url != null) {
      return post.story_url;
    } else if (post.url != null) {
      return post.url;
    }
    return '';
  }
  deletePost(post: Post): void {
    this.posts = this.posts.filter(h => h !== post);
    this.appService.deletePost(post).subscribe();
  }
}
