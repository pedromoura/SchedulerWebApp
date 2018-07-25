import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { Meeting } from './Meeting';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

    meetings: Meeting[];

    constructor(private meetingService: MeetingService) { }

    getMeetings() {
        this.meetingService.getMeetings().subscribe((data: Meeting[]) => {
            this.meetings = data;
        });
    }

    deleteMeeting(id) {
        this.meetingService.deleteMeeting(id).subscribe(res => {
            this.getMeetings();
        });
    }

    ngOnInit() {
        this.getMeetings();
    }
}
