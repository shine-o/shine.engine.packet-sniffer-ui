export function listening (state) {
  return state.listening
}

export function connections (state) {
  return state.connections
}

export const connectionPackets = (state, getters) => connectionKey => {
// export function clientFlowPackets(state, getters, clientFlowID ) {
   if (state.connections.hasOwnProperty(connectionKey)) {
      return state.connections[connectionKey].packets.filter(function(p) {
        return !getters.appliedFilters.includes(p.packetData.opCode)
      }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }
};

export function opFilters (state) {
  return state.opFilters
}

export function appliedFilters (state) {
  return state.appliedFilters
}
