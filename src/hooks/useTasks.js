import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collatedTasksExist } from "utils";
import { db } from "_firebase";

export const useTasks = () => {
  const { projectId, defaultGroup } = useParams();
  const selectedProject = projectId || defaultGroup;

  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const getNextSunday = moment().day(7).format("DD-MM-YYYY") === moment().format("DD-MM-YYYY") ? moment().add(1, 'weeks').day(7).format("DD-MM-YYYY") : moment().day(7).format("DD-MM-YYYY")
  const getNextSaturday = moment().day(6).format("DD-MM-YYYY") === moment().format("DD-MM-YYYY") ? moment().add(1, 'weeks').day(6).format("DD-MM-YYYY") : moment().day(6).format("DD-MM-YYYY")

  useEffect(() => {
    setLoading(true);
    let q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`));
    console.log(selectedProject);
    console.log(0);
    if (selectedProject && !collatedTasksExist(selectedProject)) {
      console.log(1);
      q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("projectId", "==", selectedProject));
    } else if (selectedProject === "Today") {
      console.log(2);
      q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("date", "==", moment().format("DD-MM-YYYY")));
    } else if (selectedProject === "Inbox" || selectedProject === 0) {
      console.log(3);
      q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`));
    } else if (selectedProject === "Noted") {
      console.log(4);
      q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("date", "in", [getNextSunday, getNextSaturday]));
      console.log(q);
    } else if (selectedProject === "Weekend") {
      console.log(5);
      q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("important", "==", true));
    }
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const result = [];
      querySnapshot.forEach((doc) => {
        if (doc.data()?.completed !== true) {
          result.push(doc.data());
        }
      });

      if (selectedProject === "важливо") {
        let sevenDaysTasks = result.filter((task) => moment(task.date, "DD-MM-YYYY").diff(moment(), "днів") <= 7);
        setTasks(sevenDaysTasks);
        setLoading(false);
      } else {
        setTasks(result);
      }
    });
    return unsubscribe;
  }, [selectedProject, currentUser]);
  console.log(tasks);
  return { setTasks, tasks, loading };
};
