import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { EditMeeting } from './EditMeeting';
import { MeetingService } from '../../services/meeting.service';
import { MatDatepickerInputEvent } from '../../../../node_modules/@angular/material';
import { parse_dates } from '../../utils/parse-dates';

@Component({
    selector: 'app-edit-meeting',
    templateUrl: './edit-meeting.component.html',
    styleUrls: ['./edit-meeting.component.css']
})
export class EditMeetingComponent implements OnInit {

    meeting: EditMeeting;
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
            start_hour: ['', Validators.required],
            end_date: ['', Validators.required],
            end_hour: ['', Validators.required]
        });
    }

    updateMeeting(tittle, description, start_hour, end_hour) {
        const { start_date, end_date } = this.meeting;
        const { parsed_Start_date, parsed_End_date } = parse_dates(start_date, end_date, start_hour, end_hour);

        this.route.params.subscribe(params => {
            this.meetingService.updateMeeting(params['id'], tittle, description, parsed_Start_date, parsed_End_date).subscribe(res => {
                console.log('Done');
                this.router.navigate(['']);
            });
        });
    }

    change_endDate(type: string, event: MatDatepickerInputEvent<Date>) {
        this.meeting = { ...this.meeting, end_date: event.value }; 
    }
    
    change_startDate(type: string, event: MatDatepickerInputEvent<Date>) {
        this.meeting = { ...this.meeting, start_date: event.value }; 
    }

    formatDate(date) {
        return new Date(date);
    }

    formatHoursField(date) {
        return moment(date).format('HH:mm');
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.meetingService.getMeetingById(params['id']).subscribe((res: EditMeeting) => {
                this.meeting = res;
                this.meeting = { ...this.meeting, start_date: this.formatDate(this.meeting.start_date) };
                this.meeting = { ...this.meeting, end_date: this.formatDate(this.meeting.end_date) };

                this.meeting = { ...this.meeting, end_hour: this.formatHoursField(this.meeting.end_date) };
                this.meeting = { ...this.meeting, start_hour: this.formatHoursField(this.meeting.start_date) };
            });
        });
    }
}
