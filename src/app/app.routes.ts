import { Routes } from '@angular/router';

import { CreateMeetingComponent } from './components/create-meeting/create-meeting.component';
import { IndexComponent } from './components/index/index.component';
import { EditMeetingComponent } from './components/edit-meeting/edit-meeting.component';

export const routes: Routes = [
    {
        path: 'create',
        component: CreateMeetingComponent
    },
    {
        path: 'edit/:id',
        component: EditMeetingComponent
    },
    {
        path: '',
        component: IndexComponent
    }
];

export default routes;