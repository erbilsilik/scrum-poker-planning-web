import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Session } from '../session';

@Component({
  selector: 'app-scrum-master-view',
  templateUrl: './scrum-master-view.component.html',
  styleUrls: ['./scrum-master-view.component.scss']
})
export class ScrumMasterViewComponent implements OnInit {
  public session: Session;
  public activeStory: any
  public activeVoterNumbers = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.session = this.route.snapshot.data.session;
    this.activeStory = this.session.stories[0];
    this.activeVoterNumbers = [...Array(this.session.numberOfVoters).keys()];
  }
}
