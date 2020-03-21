export function listening (state) {
  return state.listening
}

export function clients (state) {
  return state.clients
}

// export function clientFlows(state, clientIP) {
export const clientFlows = state => clientIP => {
  let flows = {};
  for (let flow in state.flows) {
    if (state.flows.hasOwnProperty(flow) && state.flows.hasOwnProperty(clientIP + '.' + state.flows[flow].flowID)) {
      flows[clientIP + '.' + state.flows[flow].flowID] = state.flows[clientIP + '.' + state.flows[flow].flowID];
    }
  }
  return flows
};

export const clientFlowPackets = (state, getters) => clientFlowID => {
// export function clientFlowPackets(state, getters, clientFlowID ) {
   if (state.packets.hasOwnProperty(clientFlowID)) {
      return state.packets[clientFlowID].list.filter(function(p) {
        return !getters.appliedFilters.includes(p.data.opCode)
      })
  }
};

export function opFilters (state) {
  return state.opFilters
}

export function appliedFilters (state) {
  return state.appliedFilters
}
