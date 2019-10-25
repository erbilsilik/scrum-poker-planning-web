import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoryListComponent } from './add-story-list.component';

describe('AddStoryListComponent', () => {
  let component: AddStoryListComponent;
  let fixture: ComponentFixture<AddStoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
