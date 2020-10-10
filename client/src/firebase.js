import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDI69vayFvklSxOu4-38m-95YHMiDOqGL4",
  authDomain: "fb-mern-fd225.firebaseapp.com",
  databaseURL: "https://fb-mern-fd225.firebaseio.com",
  projectId: "fb-mern-fd225",
  storageBucket: "fb-mern-fd225.appspot.com",
  messagingSenderId: "892031611790",
  appId: "1:892031611790:web:c60a4228a1cd3878706adf",
  measurementId: "G-YG8TH0HNTX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
