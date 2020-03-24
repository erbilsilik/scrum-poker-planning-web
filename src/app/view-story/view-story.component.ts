import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Session } from '../session';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-view-story',
  templateUrl: './view-story.component.html',
  styleUrls: ['./view-story.component.scss']
})
export class ViewStoryComponent implements OnInit {
  public session: Session;
  public activeStory: any
  public isScrumMaster: boolean;
  public voted = false;
  public voterId: string;
  public panel = [];

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.session = this.route.snapshot.data.session;
    this.voterId = localStorage.getItem('voterId')
    this.isScrumMaster = this.voterId === this.session.voterId ? true : false;

    this.getSession();
  }

  getSession() {
    this.sessionService.get(this.session.id).subscribe(data => {
      this.session = data;
      this.activeStory = this.session.stories[this.session.activeStory];
      this.updatePanelStatus();
      this.cd.detectChanges();
      setTimeout(() => {
        this.getSession();
      }, 2000);
    });
  }

  updateActiveStory(storyIndex) {
    this.sessionService.updateActiveStory(this.session.id, storyIndex).toPromise().then((session) => {
      this.activeStory = session;
    });
  }

  vote(cardIndex: any) {
    const storyId = this.session.stories.indexOf(this.activeStory);
    const sessionId = this.session.id;
    this.voted = true;

    this.sessionService.vote(sessionId, cardIndex, storyId, this.voterId).toPromise();
  }

  endVotingForStory() {
    const storyId = this.session.stories.indexOf(this.activeStory);
    this.sessionService.endVotingForStory(this.session.id, storyId, this.activeStory.finalScore).toPromise();
  }

  private updatePanelStatus() {
    this.panel = [];
    this.session.voters.forEach(voter => {
      const status = this.checkInclude(voter);
      this.panel.push({
        voter,
        status: status ? 'VOTED' : 'Waiting',
      });
    });
  }

  isVoted(voterIds: Array<string>) {
    return voterIds.includes(this.voterId);
  }

  private checkInclude(voter): any {
    let includes = false;

    if (voter) {
      Object.values(this.activeStory.cards).forEach((value: any) => {
        if (value.voterIds.includes(voter)) {
          includes = true;
        }
      });
    }

    return includes;
  }
}
