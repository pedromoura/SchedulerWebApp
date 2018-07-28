import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDatepickerInputEvent, MatSnackBar } from '@angular/material';

import { MeetingService } from '../../services/meeting.service';
import { Meeting } from './Meeting';
import * as moment from 'moment';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

    meetings: Meeting[];
    today_date: Date;
    filtersModel: any = { today_date: new Date() };
    displayedColumns: string[] = ['tittle', 'description', 'start_date', 'end_date', 'actions'];
    dataSource: MatTableDataSource<Meeting>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private meetingService: MeetingService, public snackBar: MatSnackBar) {
    }

    fillDataSource(meetings) {
        this.meetings = meetings;
        this.dataSource = new MatTableDataSource<Meeting>(this.meetings);
        this.dataSource.paginator = this.paginator;
    }

    getAllMeetings() {
        this.meetingService.getMeetings().subscribe((data: Meeting[]) => {
            this.fillDataSource(data);
        });

    }

    getMeetings() {
        const start_date = moment(this.today_date).format('YYYY-MM-DD');
        const end_date = moment(this.today_date).add(1, 'days').format('YYYY-MM-DD');

        this.meetingService.getMeetingsByDate(start_date, end_date).subscribe((data: Meeting[]) => {
            this.fillDataSource(data);
        });

    }

    change_day(type: string, event: MatDatepickerInputEvent<Date>) {
        this.today_date = event.value;
        this.getMeetings();
    }

    deleteMeeting(id) {
        this.meetingService.deleteMeeting(id).subscribe(res => {
            this.snackBar.open("Meeting deleted successfully", "Dismiss", {
                duration: 2000,
            });
            this.getMeetings();
        });
    }

    ngOnInit() {
        this.today_date = new Date();
        this.getMeetings();
    }
}
