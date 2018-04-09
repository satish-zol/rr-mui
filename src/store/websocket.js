//import ActionCable from 'actioncable';

//const leadsChannel = () => {
//    const cable = ActionCable.createConsumer('ws://localhost:4000/cable');
//    cable.subscriptions.create({channel: 'LeadsChannel'}, {
//        connected: function() { console.log("cable: connected") },             // onConnect 
//        disconnected: function() { console.log("cable: disconnected") },       // onDisconnect 
//        received: function (data) {

            //console.log(data);
            // store.dispatch({type: data.data.type, payload: data.data.leads});
//        }
//    });
//}

//export default leadsChannel;
