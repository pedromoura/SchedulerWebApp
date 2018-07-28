import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { MeetingService } from '../../services/meeting.service';
import { MatDatepickerInputEvent } from '../../../../node_modules/@angular/material';
import { parse_dates } from '../../utils/parse-dates';
import { MatSnackBar } from '@angular/material';
import { dateRangeValidator } from '../../validators/date-range-validator';

@Component({
    selector: 'app-create-meeting',
    templateUrl: './create-meeting.component.html',
    styleUrls: ['./create-meeting.component.css'],
})
export class CreateMeetingComponent implements OnInit {

    angForm: FormGroup;
    createMeetingForm: FormControl;
    start_date: Date;
    end_date: Date;

    constructor(private meetingService: MeetingService,
        private fb: FormBuilder,
        public snackBar: MatSnackBar,
        private router: Router) {
        this.createForm();
        this.start_date = new Date();
        this.end_date = new Date();
    }

    createForm() {
        this.angForm = this.fb.group({
            tittle: ['', Validators.required],
            description: ['', Validators.required],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            start_hour: ['', Validators.required],
            end_hour: ['', Validators.required]
        }, {
                validator: dateRangeValidator
            });
    }

    change_endDate(type: string, event: MatDatepickerInputEvent<Date>) {
        this.end_date = event.value;
    }

    change_startDate(type: string, event: MatDatepickerInputEvent<Date>) {
        this.start_date = event.value;
    }

    createMeeting(tittle, description, start_hour, end_hour) {
        const { parsed_Start_date, parsed_End_date } = parse_dates(this.start_date, this.end_date, start_hour, end_hour);
        this.meetingService.createMeeting(tittle, description, parsed_Start_date, parsed_End_date).subscribe(res => {
            this.snackBar.open("Meeting created successfully", "Dismiss", {
                duration: 2000,
            });
            this.router.navigate(['']);
        });
    }

    ngOnInit() {
    }

}
