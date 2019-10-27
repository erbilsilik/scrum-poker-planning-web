import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Session } from '../session';
import { SessionService } from '../services/session.service';
import { UtilsService } from '../services/utils.service.';
import { Router } from '@angular/router';

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
    private utilsService: UtilsService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.session = this.route.snapshot.data.session;
    this.activeStory = this.session.stories[0];
    this.isScrumMaster = localStorage.getItem('scrumMasterUuid') === this.session.scrumMasterUuid ? true : false;
    this.voterId = localStorage.getItem('scrumMasterUuid');

    // if (!this.isScrumMaster) {
    //   if (!localStorage.getItem('voterId')) {
    //     this.voterId = this.utilsService.createUuid();
    //     localStorage.setItem('voterId', this.voterId);
    //   } else {
    //     this.voterId = localStorage.getItem('voterId');
    //   }
    // }
    this.getSession();
  }

  vote(cardIndex: any) {
    const storyId = this.session.stories.indexOf(this.activeStory);
    const sessionId = this.session.id;
    this.voted = true;

    this.sessionService.vote(sessionId, cardIndex, storyId, this.voterId).subscribe(data => {
      console.log(data);
    });
  }

  getSession() {
    this.sessionService.get(this.session.id).subscribe(data => {
      this.session = data;
      this.activeStory = this.session.stories.find(item => item.id === this.activeStory.id); // TODO check re assigment issue
      this.updatePanelStatus();
      this.cd.detectChanges();
      setTimeout(() => {
        this.getSession();
      }, 5000);
    });
  }

  isVoted(voterIds: Array<string>) {
    return voterIds.includes(this.voterId);
  }

  updateActiveStory(story) {
    this.activeStory = story;
  }

  updatePanelStatus() {
    this.panel = [];
    this.session.voters.forEach(voter => {
      const status = this.checkInclude(voter);
      this.panel.push({
        voter,
        status: status ? 'VOTED' : 'NOT VOTED',
      });
    });
  }

  checkInclude(voter): any {
    let includes = false;

    if (voter) {
      Object.values(this.activeStory.cards).forEach((value) => {
        if (value.voterIds.includes(voter)) {
          includes = true;
        }
      });
    }

    return includes;
  }
}
