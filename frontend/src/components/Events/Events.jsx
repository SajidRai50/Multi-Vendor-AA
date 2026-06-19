import React from "react";
import styles from '../../styles/styles'
import {EventCard} from "./EventCard.jsx";
import { useSelector } from "react-redux";
export default function Events() {
  const {allEvents} = useSelector((state)=>state.event)

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>

        <div className=" w-full grid">

            <EventCard data= {allEvents && allEvents[0]}/>
        </div>
      </div>
    </div>
  );
}
