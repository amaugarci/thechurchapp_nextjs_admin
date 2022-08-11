import { addDoc, collection, deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Event } from '../models/model.event';
import { Feedback } from '../models/model.feedback';
import { Location } from '../models/model.location';
import { Notification } from '../models/model.notification';
import { Prayer } from '../models/model.prayer';
import { APP_MODE } from '../utils/app_constants';
import { db } from '../_firebase/firebase';

/* ------------------------------- NOTE EVENTS ------------------------------ */
export async function apiCreateEvent(event: Event): Promise<boolean> {
  try {
    if (is_APP_MODE_PROD()) await addDoc(collection(db, 'events'), { ...Event.toJson(event), timestampCreated: serverTimestamp() });
    return true;
  } catch (error) {
    return false;
  }
}

export async function apiUpdateEvent(id: string, event: Event): Promise<boolean> {
  try {
    if (is_APP_MODE_PROD())
      await updateDoc(doc(db, 'events', id), {
        name: event.name,
        description: event.description,
        eventDateTime: event.eventDateTime,
        eventTime: event.eventTime,
        eventDate: event.eventDate,
        location: event.location,
        imageUrl: event.imageUrl,
        link: event.link
      });

    return true;
  } catch (error) {
    return false;
  }
}

export async function apiGetEvent(id: string) {
  try {
    const event = await getDoc(doc(db, 'events', id));
    if (!event.data()) return null;
    return Event.fromJson({
      ...event.data(),
      id: event.id,
      timestampCreated: event.data()!.timestampCreated?.toDate(),
      timestampUpdated: event.data()!.timestampUpdated?.toDate(),
      eventDateTime: event.data()!.eventDateTime?.toDate(),
      eventDate: event.data()!.eventDate?.toDate(),
      eventTime: event.data()!.eventTime?.toDate()
    });
  } catch (error) {
    return null;
  }
}

export async function apiDeleteEvent(id: string): Promise<boolean> {
  try {
    if (is_APP_MODE_PROD()) await deleteDoc(doc(db, 'events', id!));
    return true;
  } catch (error) {
    return false;
  }
}

/* ------------------------------ NOTE LOCATION ----------------------------- */
export async function apiCreateLocation(location: Location) {
  try {
    if (is_APP_MODE_PROD()) await addDoc(collection(db, 'locations'), { ...Location.toJson(location), timestampCreated: serverTimestamp() });
    return true;
  } catch (error) {
    return false;
  }
}

export async function apiUpdateLocation(id: string, location: Location) {
  try {
    if (is_APP_MODE_PROD())
      await updateDoc(doc(db, 'locations', id), {
        name: location.name,
        pastor: location.pastor,
        address: location.address,
        phone: location.phone,
        email: location.email,
        imageUrl: location.imageUrl
      });

    return true;
  } catch (error) {
    return false;
  }
}

export async function apiGetLocation(id: string) {
  try {
    const location = await getDoc(doc(db, 'locations', id));
    if (!location.data()) return null;
    return Location.fromJson({ ...location.data(), id: location.id });
  } catch (error) {
    return null;
  }
}

export async function apiDeleteLocation(id: string) {
  try {
    if (is_APP_MODE_PROD()) await deleteDoc(doc(db, 'locations', id));
    return true;
  } catch (error) {
    return false;
  }
}

/* ------------------------------ NOTE NOTIFICATION -------------------------- */
export async function apiCreateNotification(notification: Notification) {
  try {
    if (is_APP_MODE_PROD())
      await addDoc(collection(db, 'notifications'), { ...Notification.toJson(notification), timestampCreated: serverTimestamp() });
    return true;
  } catch (error) {
    return false;
  }
}

export async function apiDeleteNotification(id: string) {
  try {
    if (is_APP_MODE_PROD()) await deleteDoc(doc(db, 'notifications', id!));
    return true;
  } catch (error) {
    return false;
  }
}

/* ------------------------------ NOTE PRAYER ----------------------------- */

export async function apiGetPrayer(id: string) {
  try {
    const prayer = await getDoc(doc(db, 'prayers', id));
    if (!prayer.data()) return null;
    return Prayer.fromJson({ ...prayer.data(), id: prayer.id });
  } catch (error) {
    return null;
  }
}

export async function apiUpdatePrayer(id: string, reply: string) {
  try {
    if (is_APP_MODE_PROD()) await updateDoc(doc(db, 'prayers', id), { reply: reply });

    return true;
  } catch (error) {
    return false;
  }
}

export async function apiDeletePrayer(id: string) {
  try {
    console.log('apiDeletePrayer', id);
    if (is_APP_MODE_PROD()) await deleteDoc(doc(db, 'prayers', id!));
    console.log('apiDeletePrayer', id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/* ------------------------------ NOTE Feedback ----------------------------- */

export async function apiGetFeedback(id: string) {
  try {
    const feedback = await getDoc(doc(db, 'prayers', id));
    if (!feedback.data()) return null;
    return Feedback.fromJson({ ...feedback.data(), id: feedback.id });
  } catch (error) {
    return null;
  }
}

export async function apiDeleteFeedback(id: string) {
  try {
    if (is_APP_MODE_PROD()) await deleteDoc(doc(db, 'feedbacks', id!));
    return true;
  } catch (error) {
    return false;
  }
}

function is_APP_MODE_PROD() {
  console.log('APP_MODE', APP_MODE);
  if (APP_MODE === 'PROD') return true;
  return false;
}
