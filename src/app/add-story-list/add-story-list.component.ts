import { Component, OnInit } from '@angular/core';
import { Session } from '../session';

@Component({
  selector: 'app-add-story-list',
  templateUrl: './add-story-list.component.html',
  styleUrls: ['./add-story-list.component.scss']
})
export class AddStoryListComponent implements OnInit {
  public session: Session = new Session();
  public storyList: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.session.storyList = this.storyList.split('\n').filter(item => item !== '');
  }
}
