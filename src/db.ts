import firebase from "firebase";

const firebaseConfig = {
  apikey: "sjzgatweX94BmGSY40sQi14XkJRGTGCRkNrxqpRI",
  authDomain: "apx-mod-6-julian.firebaseapp.com ",
  databaseURL: "https://apx-mod-6-julian-default-rtdb.firebaseio.com",
};

const app = firebase.initializeApp(firebaseConfig);
const dataBase = firebase.database();
// const rtdb = firebase.firestore();

export { dataBase };
