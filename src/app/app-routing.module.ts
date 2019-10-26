import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStoryListComponent } from './add-story-list/add-story-list.component';
import { ScrumMasterViewComponent } from './scrum-master-view/scrum-master-view.component';
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
    path: 'poker-planning-view-scrum-master/:id',
    component: ScrumMasterViewComponent,
    resolve: { session: SessionResolver }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
