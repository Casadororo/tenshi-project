const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore();

exports.createUserDb = functions.auth.user().onCreate((user) => {
    const uid = user.uid;
    firestore.collection('users').doc(uid).set({ welcome: "Welcome" });
});

exports.updatePort = functions.firestore
    .document('homes/{homeId}/Configs/{configId}')
    .onUpdate((change, context) => {
        const newValue = change.after.data();
        //const stats = newValue.stats;
        const nodeId = newValue.nodeId;
        const portId = newValue.port;
        const stats = newValue.stats;
        //const updates = {'stats': newValue};
        admin.database().ref('node/' + nodeId + '/' + portId).set({
            'stats': stats
        }
        );

    });

exports.updateTemp = functions.database.ref('/').onUpdate((snap, context) => {
      if (context.authType === 'ADMIN') {
        // do something
      } else if (context.authType === 'USER') {
        console.log(snap.val(), 'written by', context.auth.uid);
      }
    });
