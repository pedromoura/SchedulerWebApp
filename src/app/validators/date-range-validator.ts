import { AbstractControl } from '@angular/forms';
import { parse_dates } from '../utils/parse-dates';

export function dateRangeValidator(c: AbstractControl): { [key: string]: any } {
    // Get controls in group
    const startDateC = c.get('start_date');
    const startTimeC = c.get('start_hour');
    const endDateC = c.get('end_date');
    const endTimeC = c.get('end_hour');
    // Object to return if date is invalid
    const invalidObj = { 'dateRange': true };

    // If start and end dates are valid, can check range (with prefilled times)
    // Final check happens when all dates/times are valid
    if (startDateC.valid && endDateC.valid) {
        const checkStartTime = startTimeC.invalid ? '00:00' : startTimeC.value;
        const checkEndTime = endTimeC.invalid ? '00:00' : endTimeC.value;
        const { parsed_Start_date, parsed_End_date } = parse_dates(startDateC.value, endDateC.value, startTimeC.value, endTimeC.value);

        if (parsed_End_date >= parsed_Start_date) {
            return null;
        } else {
            return invalidObj;
        }
    }
    return null;
}
