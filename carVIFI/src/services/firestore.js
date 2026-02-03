import {collection, deleteDoc, updateDoc, doc, setDoc, addDoc, getDocs, query, where, serverTimestamp} from "firebase/firestore";
import { db } from "./firebase";

/* USERS */

export const createUserProfile = async (user) => {
  if (!user) return;

  const ref = doc(db, "users", user.uid);

  await setDoc(ref, {
    email: user.email,
    createdAt: serverTimestamp(),
  });
};

/* CARS */

export const addCar = async (userId, carData) => {
  return addDoc(collection(db, "cars"), {
    ...carData,
    userId,
    createdAt: serverTimestamp(),
  });
};

export const deleteCar = async (userId, carId) => {
  const ref = doc(db, "users", userId, "cars", carId);
  await deleteDoc(ref);
};

export const getUserCars = async (userId) => {
  const q = query(collection(db, "cars"), where("userId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const renewItem = async (carId, itemKey, data) => {
  const ref = doc(db, "cars", carId);

  await updateDoc(ref, {
    [itemKey]: data,
  });
};