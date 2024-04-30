"use client";

import { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import { useAuthContext } from "@/contexts/AuthContext";

interface Hatch {
  num: number;
  imageFile: string;
  imageUrl: string;
  isOpen: boolean;
}

interface CalendarData {
  title: string;
  backgroundFile: string;
  backgroundUrl: string;
  hatches: Hatch[];
}

const SingleCalendarPage = () => {
  const { uid } = useAuthContext();
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);

  const updateCalendar = async (
    newCalendarId: string,
    updatedCalendarData: CalendarData
  ) => {
    // Get the last part of the URL path, which should be the calendar ID

    const urlParts = window.location.pathname.split("/");
    const calendarId = urlParts[urlParts.length - 1];

    try {
      const response = await fetch(
        `http://localhost:8080/calendar/updatecalendar/${uid}/${calendarId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCalendarData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update calendar");
      }

      console.log("Calendar updated successfully");
    } catch (error) {
      console.error("Error updating calendar:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(uid);
      if (!uid) return;

      // Get the last part of the URL path, which should be the calendar ID
      const urlParts = window.location.pathname.split("/");
      const calendarId = urlParts[urlParts.length - 1];

      try {
        const response = await fetch(
          `http://localhost:8080/calendar/getcalendar/${uid}/${calendarId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: CalendarData = await response.json();
        console.log(data);
        setCalendarData(data);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    fetchData();
  }, [uid]);

  const toggleHatch = async (hatchNum: number) => {
    if (!calendarData) return;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const isDecember = currentMonth === 12;
    const isAdventDay = hatchNum <= currentDay && isDecember;
    const isPastDec24 = isDecember && currentDay > 24;

    let canOpenHatch = false;
    if (isPastDec24 || isAdventDay) {
      canOpenHatch = true;
    }

    if (!canOpenHatch) {
      alert("You can't open this hatch yet!");
      return;
    }

    const updatedHatches = calendarData.hatches.map((hatch) => {
      if (hatch.num === hatchNum) {
        return { ...hatch, isOpen: !hatch.isOpen };
      }
      return hatch;
    });

    const updatedCalendarData = {
      ...calendarData,
      hatches: updatedHatches,
    };
    setCalendarData(updatedCalendarData);

    // Get the last part of the URL path, which should be the calendar ID
    const urlParts = window.location.pathname.split("/");
    const calendarId = urlParts[urlParts.length - 1];

    // Update the specific hatch status on the server
    try {
      const response = await fetch(
        `http://localhost:8080/calendar/updatehatch/${uid}/${calendarId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hatch: updatedHatches.find((hatch) => hatch.num === hatchNum),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update hatch status");
      }

      console.log("Hatch status updated successfully");
    } catch (error) {
      console.error("Error updating hatch status:", error);
    }

    await updateCalendar(calendarId, updatedCalendarData);
  };

  const handleShare = () => {
    console.log("Share button clicked");
  };

  return (
    <div>
      {calendarData && (
        <div>
          <Calendar
            title={calendarData.title}
            backgroundUrl={calendarData.backgroundUrl}
            hatches={calendarData.hatches}
            toggleHatch={toggleHatch}
          />
          <button
            className="btn bg-accent fixed bottom-5 right-5 z-10"
            onClick={handleShare}
          >
            Share
          </button>
        </div>
      )}

      {!calendarData && <p>Loading...</p>}
    </div>
  );
};

export default SingleCalendarPage;
