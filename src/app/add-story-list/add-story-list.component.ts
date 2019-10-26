import { Component, OnInit } from '@angular/core';
import { Session } from '../session';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-story-list',
  templateUrl: './add-story-list.component.html',
  styleUrls: ['./add-story-list.component.scss']
})
export class AddStoryListComponent {
  public session: Session = new Session();
  public storyList: string;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    ) { }

  onSubmit() {
    this.session.stories = this.storyList
                              .split('\n')
                              .filter(item => item !== '')
                              .map(item => {
                                return { name: item };
                              });

    this.sessionService.create(this.session).subscribe((newSession) => {
      this.router.navigateByUrl(`/poker-planning-view-scrum-master/${newSession._id}`);
    }, (err) => {
      console.log(`${err} while creating sessions`);
    });
  }
}
