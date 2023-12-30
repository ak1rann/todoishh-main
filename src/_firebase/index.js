import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, setDoc, writeBatch } from "firebase/firestore";
import { generatePushId } from "utils";
import { icebreakerTasks } from "./icebreakerTasks";

const initConfig = {
  apiKey: "AIzaSyAgqPgX26sW8pfhDocm6WJrAIi_KaUTRto",
  authDomain: "todoist-tut-f568d.firebaseapp.com",
  projectId: "todoist-tut-f568d",
  storageBucket: "todoist-tut-f568d.appspot.com",
  messagingSenderId: "336017893932",
  appId: "1:336017893932:web:07835df540ffa937187f89"
};

const firebaseConfig = initializeApp(initConfig);

export const auth = getAuth(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const db = getFirestore(firebaseConfig);
export { firebaseConfig as firebase };

export const batchWriteIcebreakerTasks = async (userId) => {
  const icebreakerProjectId = "welcome";
  try {
    const icebreakerProject = {
      name: "Welcome 👋",
      projectId: icebreakerProjectId,
      projectColour: {
        name: "Charcoal",
        hex: "#808080",
      },
      projectIsList: true,
    };
    const projectsDocRef = doc(collection(db, "user", `${userId}/projects`));
    setDoc(projectsDocRef, icebreakerProject).then(() => {
      let batch = writeBatch(db);
      while (icebreakerTasks.length) {
        const id = generatePushId();
        batch.set(doc(db, "user", `${userId}/tasks/${id}`), icebreakerTasks.pop());
        if (!icebreakerTasks.length) {
          batch.commit();
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;

  const userRef = doc(db, "user", userAuth.uid);

  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    setDoc(userRef, { displayName, createdAt, email })
      .finally(() => batchWriteIcebreakerTasks(userAuth.uid))
      .catch((err) => console.log(err));
  }
  return userRef;
};
