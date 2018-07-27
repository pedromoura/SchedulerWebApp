import * as moment from 'moment';

export const parse_dates = (start_date: Date, end_date: Date, start_hour: String, end_hour: String) => {
    const parsed_Start_date = moment(`${start_date.toLocaleDateString()}' '${start_hour}`, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
    const parsed_End_date = moment(`${end_date.toLocaleDateString()}' '${end_hour}`, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm');
    return { parsed_Start_date, parsed_End_date };
}