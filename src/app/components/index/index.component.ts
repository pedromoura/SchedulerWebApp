import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';

import { MeetingService } from '../../services/meeting.service';
import { Meeting } from './Meeting';
import { FormControl } from '../../../../node_modules/@angular/forms';

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

    constructor(private meetingService: MeetingService) { 
    }

    getMeetings() {
        this.meetingService.getMeetings().subscribe((data: Meeting[]) => {
            this.meetings = data;
            this.dataSource = new MatTableDataSource<Meeting>(this.meetings);  
            this.dataSource.paginator = this.paginator;

        });
    }

    change_day(type: string, event: MatDatepickerInputEvent<Date>) {
        this.today_date = event.value;
        console.log(this.today_date);
    }

    deleteMeeting(id) {
        this.meetingService.deleteMeeting(id).subscribe(res => {
            this.getMeetings();
        });
    }

    ngOnInit() {
        this.today_date = new Date();
        this.getMeetings();
    }
}
