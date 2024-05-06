import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../feature/tache/tacheSlice";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "./Header";
import MDBox from "components/MDBox";

function Calendar() {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("user")); // Récupérer le token depuis le local storage

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const tasksState = useSelector((state) => state.task.tasks);

  // Filtrer les événements en fonction du rôle de l'utilisateur
  const events = tasksState.map((task) => {
    // Vérifier le rôle de l'utilisateur
    if (token.role === "admin") {
      // Afficher toutes les tâches pour les administrateurs
      return {
        title: task.Titre,
        Employe: task.Employe,
        start: task.date_debuttask,
        end: task.date_fintask,
        backgroundColor: task.backgroundColor || "blue",
        borderColor: task.borderColor || "darkblue",
      };
    } else if (token.role === "employee" && task.Employe?._id === token._id) {
      // Afficher uniquement les tâches assignées à l'utilisateur connecté
      return {
        title: task.Titre,
        Employe: task.Employe,
        start: task.date_debuttask,
        end: task.date_fintask,
        backgroundColor: task.backgroundColor || "blue",
        borderColor: task.borderColor || "darkblue",
      };
    }
    return null; // Ignorer les autres tâches
  }).filter((event) => event !== null); // Filtrer les événements nuls

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay"
            }}
            height="90vh"
            events={events} // Utiliser la liste d'événements filtrée en fonction du rôle
          />
        </div>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Calendar;
