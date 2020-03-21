export function someAction (/* context */) {

}

export function startListening({state, commit}) {

  if (state.listening) {
    return
  }
  let ws;
  ws = new WebSocket("ws://localhost:9090/packets");

  ws.onopen = function(evt) {
    console.log(evt);
  };
  ws.onclose = function(evt) {
    ws = null;
    console.log(evt);
  };
  ws.onmessage = function(evt) {
    console.log(evt.data);
  };
  ws.onerror = function(evt) {
    console.log(evt);
  };

  commit('webSocket', ws);
  commit('listening', true);
}

export function stopListening({state, commit}) {
  // if (!state.ws) {
  //   return false;
  // }
  state.ws.close();
  commit('webSocket', {});
  commit('listening', false);
}
