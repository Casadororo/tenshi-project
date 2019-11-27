const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore();

exports.createUserDb = functions.auth.user().onCreate((user) => {
    const uid = user.uid;
    const email = user.email;
    const displayName = user.displayName;
    firestore.collection('users').doc(uid).set({ email: email, displayName: displayName });
});

exports.updateTemp = functions.database.ref('node/{nodeId}/temp').onWrite((change, context) => {
    //Values
    const nodeId = context.params.nodeId;
    const temp = change.after.val();

    firestore.collection('nodes').doc(nodeId).set({
        temp: temp
    })
});

exports.updatePort = functions.firestore
    .document('nodes/{nodeId}/ports/{portId}')
    .onWrite((change, context) => {
        //All Data
        const newValue = change.after.data();
        //Values
        const nodeId = context.params.nodeId;
        const portId = context.params.portId;
        const stats = newValue.stats;

        admin.database().ref('node/' + nodeId + '/' + portId).set({
            'stats': stats
        }
        );
    });

exports.updateFireStore = functions.database.ref('node/{nodeId}/{portId}/stats').onWrite((change, context) => {
    //Values
    const nodeId = context.params.nodeId;
    const portId = context.params.portId;
    const stats = change.after.val();

    firestore.collection('nodes/' + nodeId + '/ports').doc(portId).set({
        stats: stats
    })
});