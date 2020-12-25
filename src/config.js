import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAuWjOThD1xwtXFypBdkldeLaIVqyL1r1o",
    authDomain: "mamoi-1925e.firebaseapp.com",
    databaseURL: "https://mamoi-1925e-default-rtdb.firebaseio.com",
    projectId: "mamoi-1925e",
    storageBucket: "mamoi-1925e.appspot.com",
    messagingSenderId: "172406092688",
    appId: "1:172406092688:web:64bbb7b631ba87bf87b915"
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.database()