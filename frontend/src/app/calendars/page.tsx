"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import CalendarCard from "../../components/CalendarCard";
import { fontTitle } from "../utilities/font";
import { BsInfoCircle } from "react-icons/bs";
import Link from "next/link";
import { getDatabase, ref, onValue } from "firebase/database";

type CalendarData = {
  title: string;
  backgroundUrl: string;
  [key: string]: unknown;
};

const CalendarsPage = () => {
  const router = useRouter();
  const { isLoggedIn, uid } = useAuthContext();
  const [displayName, setDisplayName] = useState("");

  // Redirect to the homepage if the user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  // State for the incoming calendars data
  const [calendarsData, setCalendarsData] = useState<
    | {
        id: string;
        title: string;
        backgroundUrl: string;
      }[]
    | null
  >(null);

  useEffect(() => {
    if (uid) {
      const db = getDatabase();
      const userRef = ref(db, `users/${uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setDisplayName(data.displayName);
      });
    }
  }, [uid]);

  // Fetch calendars
  const fetchCalendars = async () => {
    if (!uid) return;

    try {
      const response = await fetch(
        `http://localhost:8080/calendar/getcalendars/${uid}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch calendars");
      }
      const data = await response.json();
      // If no calendars are fetched, return an empty array
      if (!data) {
        return [];
      }
      const calendarsArray = Object.entries(data).map(([id, calendarData]) => ({
        id,
        ...(calendarData as CalendarData),
      }));
      return calendarsArray;
    } catch (error) {
      console.error("Error fetching calendars:", error);
    }
  };

  useEffect(() => {
    fetchCalendars().then((data) => setCalendarsData(data || null));
  }, [uid]);

  // State to store the selected card
  const [selectedCard, setSelectedCard] = useState<{
    id: string;
    title: string;
    backgroundUrl: string;
  }>({ id: "", title: "", backgroundUrl: "" });

  // When a card button is clicked, handleAction sets the selected card and performs the chosen action
  const handleAction = (id: string, action: string) => {
    // Setting the selected card
    const selected = calendarsData?.find((cal) => cal.id === id);
    setSelectedCard(selected!);

    // Navigate to the single calendar page and sending the cal id
    if (action === "show") {
      router.push(`/calendar/${id}`);
    }

    // Open the delete modal for more actions
    if (action === "delete") {
      openDeleteModal();
    }

    // Navigate to the edit page - also needs id???
    if (action === "edit") {
      router.push(`/edit/${id}`);
    }

    // For now, just log which calendar is being shared
    if (action === "share") {
      console.log(`Sharing calendar with id: ${id}`);
    }
  };

  const openDeleteModal = () => {
    const modal = document.getElementById("delete_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const deleteCalendar = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/calendar/deletecalendar/${uid}/${selectedCard.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete calendar");
      }

      console.log(`Deleted calendar with id: ${selectedCard.id}`);

      // Remove the deleted calendar from the local state
      setCalendarsData(
        calendarsData?.filter((calendar) => calendar.id !== selectedCard.id) ||
          null
      );
    } catch (error) {
      console.error("Error deleting calendar:", error);
    }
  };

  // Render nothing if the user is not logged in
  if (!isLoggedIn) {
    return null;
  }

  // Render the content of the page if the user is logged in
  return (
    <main className="content-width flex flex-col items-center gap-10">
      <div className={`${fontTitle} clr-accent text-4xl text-center bg-base`}>
        {displayName ? `Welcome, ${displayName}!` : "Welcome!"}
      </div>

      {/* Info when there's no calendar to show */}
      {calendarsData?.length === 0 && (
        <div role="alert" className="alert mx-auto">
          <BsInfoCircle className="text-primary text-xl" />
          <span>You don&apos;t have any calendars yet.</span>
          <div>
            <Link href="/new" className="btn btn-sm btn-primary">
              Create
            </Link>
          </div>
        </div>
      )}

      {/* Cards with New Calendar btn */}
      {calendarsData && (
        <>
          <div className="flex flex-wrap gap-5 justify-center">
            {calendarsData.map((calendar) => (
              <CalendarCard
                key={calendar.id}
                id={calendar.id}
                title={calendar.title}
                backgroundUrl={calendar.backgroundUrl}
                handleAction={handleAction}
              />
            ))}
          </div>

          <Link
            href="/new"
            className="btn bg-accent text-black fixed bottom-5 right-5 z-10"
          >
            + New Calendar
          </Link>
        </>
      )}

      {/* Delete Modal */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{`Do you want to delete this calendar: ${selectedCard.title}?`}</h3>
          <p className="py-4">This action can&apos;t be reversed.</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-5">
              <button className="btn btn-error" onClick={deleteCalendar}>
                Delete
              </button>
              <button className="btn btn-outline">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default CalendarsPage;
