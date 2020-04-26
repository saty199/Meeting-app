import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function Meeting(props) {
  const [meeting, setMeeting] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getMeeting(getDateFormat(new Date()));
  }, []);

  const getDateFormat = (dat) => {
    let date = new Date(dat);
    let data = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return data
  }

  const getMeeting = async (date) => {
    let meetings = await axios.get(`http://fathomless-shelf-5846.herokuapp.com/api/schedule?date="${date}"`);
    console.log({ meetings });
    setMeeting(meetings.data);
  }

  const formatDate = date => {
    const d = new Date(date)
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(d);
    return `${da} ${mo} ${ye}`;
  }
  const handlePast = async () => {
    setDate(new Date(date.setDate(date.getDate() - 1)));
    getMeeting(getDateFormat(new Date(date.setDate(date.getDate() - 1))))
  }

  const handleFuture = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)));
    getMeeting(getDateFormat(new Date(date.setDate(date.getDate() + 1))))
  }

  const handleMeeting= ()=>{
    props.history.push('/add-meeting')
  }
  return (
    <div className="App container">
      <div className="header"> <i className="fas fa-less-than mr-5" onClick={handlePast}></i> {formatDate(date)} <i className="fas fa-greater-than ml-5" onClick={handleFuture}></i></div>
      {
        meeting && meeting.length > 0 ? meeting.map((item) => {
          return (
            <div className="list-item">

              <div>{item.start_time} - {item.end_time}</div>
              <div>{item.description}</div>
            </div>)

        }) : <div>No Data Available</div>
      }
      <button type="button" class="btn btn-primary addmeeting" onClick={handleMeeting}>Add Meeting</button>
    </div>
  );
}

export default Meeting;
