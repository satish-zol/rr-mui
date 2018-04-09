import ActionCable from 'actioncable';

export default function(dispatch, getState) {
    const cable = ActionCable.createConsumer('ws://localhost:4000/cable');
    cable.subscriptions.create({channel: 'LeadsChannel'}, {
        connected: function() {
            console.log("cable: connected");
        },             // onConnect
        disconnected: function() { console.log("cable: disconnected") },       // onDisconnect 
        received: function (data) {
            dispatch({
                type: 'SET_LEADS_SUCCESS',
                data: data.data.leads
            });
						var state = getState();
            return state;
        }
    });
}

//export default leadsChannel;
