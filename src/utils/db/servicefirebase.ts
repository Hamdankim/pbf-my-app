import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

export type UserRole = "member" | "editor" | "admin";

type UserRecord = {
  id: string;
  email: string;
  fullname?: string;
  password?: string;
  role?: UserRole;
  image?: string;
  type?: string;
  [key: string]: any;
};

type OAuthUserData = {
  fullname: string;
  email: string;
  image?: string;
  type: string;
  role?: UserRole;
};

const USERS_COLLECTION = "users";

const mapSnapshotToData = <T>(snapshot: any): T[] =>
  snapshot.docs.map((document: any) => ({
    id: document.id,
    ...document.data(),
  })) as T[];

async function findUserByEmail(email: string) {
  const userQuery = query(
    collection(db, USERS_COLLECTION),
    where("email", "==", email),
  );

  const querySnapshot = await getDocs(userQuery);
  const users = mapSnapshotToData<UserRecord>(querySnapshot);

  return users[0] ?? null;
}

export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signIn(email: string) {
  return findUserByEmail(email);
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: UserRole;
  },
  callback: Function,
) {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    callback({
      status: "error",
      message: "User already exists",
    });
  } else {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const payload = {
      ...userData,
      password: hashedPassword,
      role: userData.role ?? "member",
    };

    await addDoc(collection(db, USERS_COLLECTION), payload)
      .then(() => {
        callback({
          status: "success",
          message: "User registered successfully",
        });
      })
      .catch((error) => {
        callback({
          status: "error",
          message: error.message,
        });
      });
  }
}

export async function syncOAuthUser(
  userData: OAuthUserData,
  callback: Function,
) {
  try {
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
      const payload = {
        ...userData,
        role: existingUser.role ?? "member",
      };

      await updateDoc(doc(db, USERS_COLLECTION, existingUser.id), payload);
      callback({
        status: true,
        message: "User registered and logged in with Google",
        data: payload,
      });
    } else {
      const payload = {
        ...userData,
        role: userData.role ?? "member",
      };

      await addDoc(collection(db, USERS_COLLECTION), payload);
      callback({
        status: true,
        message: "User registered and logged in with Google",
        data: payload,
      });
    }
  } catch (error: any) {
    callback({
      status: false,
      message: "Failed to register user with Google",
    });
  }
}

export const signInWithGoogle = syncOAuthUser;