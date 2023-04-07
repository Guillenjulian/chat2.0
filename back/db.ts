import * as admin from "firebase-admin";
import * as serviceAccount from "../key.json";

const varEnv: any = process.env;

console.log(varEnv.DB_URl, "ESTA ES LA VARIABLE DE ENTORNO");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: varEnv.DB_URl,
});

const db = admin.firestore();
const rtdb = admin.database();
//console.log(db, "esta es la dataBase");
//console.log(rtdb, "estas es las reaalTimeDataBase");

export { db, rtdb };
