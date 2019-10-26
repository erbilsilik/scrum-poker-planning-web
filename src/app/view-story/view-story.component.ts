import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Session } from '../session';

@Component({
  selector: 'app-view-story',
  templateUrl: './view-story.component.html',
  styleUrls: ['./view-story.component.scss']
})
export class ViewStoryComponent implements OnInit {
  public session: Session;
  public activeStory: any
  public activeVoterNumbers = [];
  public isScrumMaster: boolean;
  public voted = false;
  public fbNumbers = [
    {
      number: 1,
      voted: false,
    },
    {
      number: 2,
      voted: false,
    },
    {
      number: 3,
      voted: false,
    },
    {
      number: 5,
      voted: false,
    },
    {
      number: 8,
      voted: false,
    },
    {
      number: 13,
      voted: false,
    },
    {
      number: 21,
      voted: false,
    },
    {
      number: 34,
      voted: false,
    },
    {
      number: 55,
      voted: false,
    },
    {
      number: 89,
      voted: false,
    },
    {
      number: 134,
      voted: false,
    },
    {
      number: '?',
      voted: false,
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.session = this.route.snapshot.data.session;
    this.activeStory = this.session.stories[0];
    this.activeVoterNumbers = [...Array(this.session.numberOfVoters).keys()];
    this.isScrumMaster = localStorage.getItem('scrumMasterUuid') === this.session.scrumMasterUuid ? true : false;
  }

  vote(fbNumber: any) {
    const votedFbIndex = this.fbNumbers.findIndex(item => item.number === fbNumber.number);
    this.fbNumbers[votedFbIndex].voted = true;
    this.voted = true;
  }
}
