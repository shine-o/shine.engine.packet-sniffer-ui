import Vue from "vue";

export function listening(state, bool) {
  state.listening = bool
}

export function webSocket(state, ws) {
  state.ws = ws
}

export function newConnection(state, connectionKey) {
  Vue.set(this._modules.root.state.packets.connections, connectionKey, {
    packets: [],
    active: true
  })
}

export function newConnectionPacket(state, packet) {
  state.connections[packet.connectionKey].packets.push(packet);
}

export function newFilter(state, filter) {
  Vue.set(this._modules.root.state.packets.opFilters, filter.opCode, filter)
}

export function opFilters(state, opFilters) {
  console.log(opFilters)
  state.opFilters = opFilters
}

export function applyFilter(state, filters) {
  console.log(filters)
  state.appliedFilters = filters

}

export function closeFlow(state,  connectionKey) {
  state.connections[connectionKey].active = false
}
