import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface Post {
  _id?: string;
  story_url?: string;
  url?: string;
  title?: string;
  story_title?: string;
  author?: string;
  created_at?: Date;
}

@Injectable({
  providedIn: 'root',
})

export class AppService {

  private postUrl = 'http://localhost:3000/api/post';
  constructor(private http: HttpClient) { }

  public getPosts (): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }

  public deletePost (post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post._id;
    const url = `${this.postUrl}/${id}`;

    return this.http.delete<Post>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }
}
