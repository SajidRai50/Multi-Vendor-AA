import React from "react";
import { useSelector } from "react-redux";

import { Header } from "../components/Layout/Header";
import { EventCard } from "../components/Events/EventCard";

export const EventPage = () => {
  const { allEvents, isLoading } = useSelector(
    (state) => state.event
  );

  return (
    <div>
      <Header activeHeading={4} />

      <div className="w-[90%] mx-auto py-8">
        {isLoading ? (
          <h2 className="text-center text-lg">
            Loading Events...
          </h2>
        ) : allEvents?.length > 0 ? (
          allEvents.map((event) => (
            <EventCard
              key={event._id}
              data={event}
              active={true}
            />
          ))
        ) : (
          <h2 className="text-center text-red-500 text-xl">
            No Running Events Found
          </h2>
        )}
      </div>
    </div>
  );
};

export default EventPage;