import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  create(session: Session): Observable<Session> {
    return this.http.post<Session>(
      `${this.baseUrl}/sessions`, session, {
        headers: {
          scrumMasterUuid: localStorage.getItem('scrumMasterUuid')
        }
      }
    );
  }

  get(sessionId: string): Observable<Session> {
    return this.http.get<Session>(`${this.baseUrl}/sessions/${sessionId}`);
  }
}
