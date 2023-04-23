import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export default function getClient() {
  const buf = process.env.SCRIBBLE_REACT_URL;
  if (getApps().length === 0 && buf) {
    let pps = Buffer.from(buf, "base64").toString(); //.replace(/\n/g, "");
    pps = JSON.parse(pps);
    initializeApp({
      credential: cert(pps),
    });
  }
  return getFirestore();
}
