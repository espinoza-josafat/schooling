import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBu84S-EeyWVOAtgW95Zs_y6BEF2meQcSs",
  authDomain: "schooling-mx.firebaseapp.com",
  databaseURL: "https://schooling-mx.firebaseio.com",
  projectId: "schooling-mx",
  storageBucket: "schooling-mx.appspot.com",
  messagingSenderId: "220464955862"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth, firebase };
