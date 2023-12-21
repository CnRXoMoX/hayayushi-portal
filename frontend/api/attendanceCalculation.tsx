import axios from 'axios';

import { API_URL } from '@/config/';

async function CalculateAttendance(startDate, endDate) {
    try {
        const response = await axios.post(`${API_URL}/Payroll/Attendance`, {
            startdate: startDate,
            enddate: endDate
        });
        console.log(response);
        if(response.status === 200) {
            console.log("CalculateAttendance OK!");
            return 1;
        }
    } catch (error) {
        console.error('Error while calculating date: ', error);
        return 0;
    }
}

export default CalculateAttendance