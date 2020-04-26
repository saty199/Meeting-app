import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
// import TimePicker from 'react-time-picker/dist/entry.nostyle'
import axios from 'axios';
import alertify from 'alertifyjs'

import "react-datepicker/dist/react-datepicker.css";
alertify.set('notifier', 'position', 'top-right');

const AddMeeting = () => {
    const [date, setdate] = useState(new Date());
    const [startTime, setStartTime] = useState('10:00');
    const [endTime, setEndTime] = useState('12:00');
    const [meeting, setMeeting] = useState([]);

    useEffect(() => {
        getMeeting(getDateFormat(new Date()));
    }, []);

    const getMeeting = async (date) => {
        let meetings = await axios.get(`http://fathomless-shelf-5846.herokuapp.com/api/schedule?date="${date}"`);
        console.log({ meetings });
        setMeeting(meetings.data);
    }

    const getDateFormat = (dat) => {
        let date = new Date(dat);
        let data = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return data
    }

    const handleChange = (date) => {
        console.log(getDateFormat(date))
        setdate(date)
        getMeeting(getDateFormat(date))
    }

    const onChangeTime = time => {
        setStartTime(time)
    }

    const onChangeEndTime = time => {
        console.log({ time })
        setEndTime(time)
    }
    const handleMeeting = (e) => {
        e.preventDefault();
        let flag = true;
        for (let i of meeting) {
            if (new Date('1/1/1999 ' + startTime) > new Date('1/1/1999 ' + i.end_time) || new Date('1/1/1999 ' + endTime) < new Date('1/1/1999 ' + i.start_time)) {
                flag = true;
            } else if (new Date('1/1/1999 ' + startTime) < new Date('1/1/1999 ' + i.start_time) && new Date('1/1/1999 ' + endTime) < new Date('1/1/1999 ' + i.end_time)) {
                flag = true;
            } else {
                flag = false;
            }
        }
        if (flag === true) {
            alertify.success("Slot available")
        } else {
            alertify.error("Slot not available")
        }
    }

    return (
        <div className="container">
            <form class="card text-center custom-card" style={{ width: "48rem" }}>
                <div className="time-picker form-group">
                    <label className="setLabel">Meeting Date</label>
                    <DatePicker
                        selected={date}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group time-picker">
                    <label className="setLabel">Start Time</label>
                    <TimePicker
                        onChange={onChangeTime}
                        value={startTime}
                    />
                </div>
                <div className="form-group time-picker">
                    <label className="setLabel" >End Time</label>
                    <TimePicker
                        onChange={onChangeEndTime}
                        value={endTime}
                    />
                </div>
                <div className="form-group time-picker">
                    <textarea className="form-control" placeholder="Description" rows={3} />
                </div>
                <div>
                    <button type="button" class="btn btn-primary saveButton " onClick={handleMeeting}>Save</button>
                </div>
            </form>
        </div>
    );
}

export default AddMeeting;
