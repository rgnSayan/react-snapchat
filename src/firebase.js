import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBUXirnmm0iV6RWJoOxDKMtICoBpKbQNHU",
    authDomain: "snapchat-clone-e9c18.firebaseapp.com",
    projectId: "snapchat-clone-e9c18",
    storageBucket: "snapchat-clone-e9c18.appspot.com",
    messagingSenderId: "107738980175",
    appId: "1:107738980175:web:fd3868d348f66419c7ef3a"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, storage, provider };
export default db;
