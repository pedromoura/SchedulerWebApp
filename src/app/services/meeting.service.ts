import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class MeetingService {

    uri = 'http://localhost:3001/meetings';

    constructor(private http: HttpClient) { }

    getMeetings() {
        return this.http.get(`${this.uri}/`);
    }

    createMeeting(tittle, description, start_date, end_date) {
        const meeting = {
            tittle,
            description,
            start_date,
            end_date
        };

        this.http.post(`${this.uri}/create`, meeting)
            .subscribe(res => console.log('Done'));
    }

    getMeetingById(id) {
        return this.http.get(`${this.uri}/${id}`);
    }

    updateMeeting(id, tittle, description, start_date, end_date) {
        const meeting = {
            tittle,
            description,
            start_date,
            end_date
        };

        return this.http.put(`${this.uri}/${id}/update`, meeting);
    }

    deleteMeeting(id) {
        return this.http.delete(`${this.uri}/${id}/delete`);
    }
}
