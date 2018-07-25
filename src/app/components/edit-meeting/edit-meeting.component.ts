import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Meeting } from '../index/Meeting';
import { MeetingService } from '../../services/meeting.service';

@Component({
    selector: 'app-edit-meeting',
    templateUrl: './edit-meeting.component.html',
    styleUrls: ['./edit-meeting.component.css']
})
export class EditMeetingComponent implements OnInit {

    meeting: Meeting;
    angForm: FormGroup;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private meetingService: MeetingService,
        private fb: FormBuilder) {
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

    updateMeeting(tittle, description, start_date, end_date) {
        this.route.params.subscribe(params => {
            this.meetingService.updateMeeting(params['id'], tittle, description, start_date, end_date).subscribe(res => {
                console.log('Done');
                this.router.navigate(['']);
            });
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.meetingService.getMeetingById(params['id']).subscribe((res: Meeting) => {
                this.meeting = res;
            });
        });
    }
}
