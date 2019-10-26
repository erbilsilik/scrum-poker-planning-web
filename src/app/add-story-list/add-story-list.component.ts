import { Component, OnInit } from '@angular/core';
import { Session } from '../session';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service.';

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
    private utilsService: UtilsService,
    ) { }

  onSubmit() {
    this.session.stories = this.storyList;
    localStorage.setItem(
      'scrumMasterUuid',
      this.utilsService.createUuid()
    );
    this.sessionService.create(this.session).subscribe((newSession) => {
      this.router.navigateByUrl(`/poker-planning-view-as-scrum-master/${newSession.id}`);
    }, (err) => {
      console.log(`${err} while creating sessions`);
    });
  }
}
