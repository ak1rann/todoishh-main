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

  useEffect(() => {
    setLoading(true);

    let q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`));
    if (selectedProject && !collatedTasksExist(selectedProject)) {
      q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("projectId", "==", selectedProject));
    } else if (selectedProject === "Сьогодні    ") {
      q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("date", "==", moment().format("DD-MM-YYYY")));
    } else if (selectedProject === "Вхідні" || selectedProject === 0) {
      q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("projectId", "==", ""));
    } else if (selectedProject === "За розкладом") {
      q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("date", "!=", ""), where("completed", "==", false));
    } else if (selectedProject === "важливо") {
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
  return { setTasks, tasks, loading };
};
