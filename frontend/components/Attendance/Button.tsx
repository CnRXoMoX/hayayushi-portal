import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'

import {
    Button,
    Center,
} from '@chakra-ui/react'

import { API_URL } from '@/config/';

const AttendanceButton = ({ userID }) => {
    const [clockedIn, setClockedIn] = useState(false);
    const [attendanceID, setAttendanceID] = useState(null);
    const toast = useToast();

    useEffect(() => {
        async function updateClock() {
            console.log(userID);

            await axios.post(`${API_URL}/Attendance/ClockUpdate`, {
                userid: userID
            }).then(response => {
                if(response.status === 200) {
                    console.log(response.status);
                    if(response.data.clockOut === null) {
                        setAttendanceID(response.data.attendanceID);
                        setClockedIn(true);
                    } else {
                        setClockedIn(false);
                    }
                }
            }).catch(error => {
                console.log('Error:', error.message);
                console.log('Stack trace:', error.stack);
                if (error.response) {
                    console.log('Response data:', error.response.data);
                    console.log('Response status:', error.response.status);
                    if(error.response.status === 404) {
                        setClockedIn(false);
                        return;
                    }
                }
            });
        }
        updateClock();
    }, []);

    const handleClockIn = async () => {
        try {
            await axios.post(`${API_URL}/Attendance/ClockIn`, {
                userid: userID
            }).then(response => {
                if(response.status === 200) {
                    setClockedIn(true);
                    window.location.reload(false);
                }
            })
        } catch (error) {
            console.error('Error while clocking in: ', error);
        }
    };

    const handleClockOut = async () => {
        try {
            await axios.post(`${API_URL}/Attendance/ClockOut`, {
                userid: userID
            }).then(response => {
                if(response.status === 200) {
                    setClockedIn(false);
                    window.location.reload(false);
                }
            })
        } catch (error) {
            console.error('Error while clocking in: ', error);
        }
    };


    return (
        <Center mt={5}>
            {clockedIn ? (
                <Button w="100%" h="60px" colorScheme="red" m={2} onClick={handleClockOut}>
                    Clock Out
                </Button>
            ) : (
                <Button w="100%" h="60px" colorScheme="green" m={2} onClick={handleClockIn}>
                    Clock In
                </Button>
            )}
        </Center>
    );
}

export default AttendanceButton;