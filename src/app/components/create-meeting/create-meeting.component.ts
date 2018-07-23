import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeetingService } from '../../services/meeting.service';

@Component({
    selector: 'app-create-meeting',
    templateUrl: './create-meeting.component.html',
    styleUrls: ['./create-meeting.component.css']
})
export class CreateMeetingComponent implements OnInit {

    angForm: FormGroup;

    constructor(private meetingService: MeetingService, private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.angForm = this.fb.group({
            tittle: ['', Validators.required],
            description: ['', Validators.required],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required]
        });
    }

    createMeeting(tittle, description, start_date, end_date) {
        this.meetingService.createMeeting(tittle, description, start_date, end_date);
    }

    ngOnInit() {
    }

}
