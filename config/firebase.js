import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAcK6LXChgk36EQyROvi59HJ2J2431O_d0",
    authDomain: "questionnaire-app-d283f.firebaseapp.com",
    projectId: "questionnaire-app-d283f",
    storageBucket: "questionnaire-app-d283f.appspot.com",
    messagingSenderId: "763430596767",
    appId: "1:763430596767:web:a49315dba3ea320c80f2aa"
}
firebase.apps.length === 0 &&
firebase.initializeApp(firebaseConfig)

export default firebase;