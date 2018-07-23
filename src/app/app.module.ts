import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreateMeetingComponent } from './components/create-meeting/create-meeting.component';
import { IndexComponent } from './components/index/index.component';
import { EditMeetingComponent } from './components/edit-meeting/edit-meeting.component';
import { routes } from './app.routes';

import { MeetingService } from './services/meeting.service';

@NgModule({
    declarations: [
        AppComponent,
        CreateMeetingComponent,
        IndexComponent,
        EditMeetingComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [MeetingService],
    bootstrap: [AppComponent]
})
export class AppModule { }
