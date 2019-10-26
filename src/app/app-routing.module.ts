import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStoryListComponent } from './add-story-list/add-story-list.component';
import { ViewStoryComponent } from './view-story/view-story.component';
import { SessionResolver } from './resolvers/session.resolver';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/poker-planning-add-story-list',
    pathMatch: 'full'
  },
  {
    path: 'poker-planning-add-story-list',
    component: AddStoryListComponent
  },
  {
    path: 'poker-planning-view-as-scrum-master/:id',
    component: ViewStoryComponent,
    resolve: { session: SessionResolver }
  },
  {
    path: 'poker-planning-view-as-developer/:id',
    component: ViewStoryComponent,
    resolve: { session: SessionResolver }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
