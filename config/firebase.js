const Firebase = require('firebase-admin');

const serviceAccount = require('../drive-92933-firebase-adminsdk-ioes8-6286f8b072.json')
const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
   storageBucket 
})