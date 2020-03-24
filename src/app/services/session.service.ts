import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    ) { }

  create(session: Session): Observable<Session> {
    return this.http.post<Session>(
      `${this.baseUrl}/sessions`, session
    );
  }

  get(sessionId: string): Observable<Session> {
    return this.http.get<Session>(`${this.baseUrl}/sessions/${sessionId}`);
  }

  vote(sessionId: any, cardId: any, storyId: any, voterId: any): Observable<Session> {
    return this.http.post<Session>(
      `${this.baseUrl}/vote-story`, {
      sessionId,
      cardId,
      storyId,
      voterId
    }
    );
  }

  updateActiveStory(sessionId, storyIndex): Observable<Session> {
    return this.http.put<Session>(
      `${this.baseUrl}/sessions/${sessionId}`, { storyIndex }
    );
  }

  endVotingForStory(sessionId: string, storyId: string, finalScore): Observable<Session> {
    return this.http.put<Session>(
      `${this.baseUrl}/sessions/${sessionId}/${storyId}`, { finalScore }
    );
  }
}
