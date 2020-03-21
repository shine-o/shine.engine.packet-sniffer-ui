export function someMutation (/* state */) {
}

export function listening(state, bool) {
  state.listening = bool
}

export function webSocket(state, ws) {
  state.ws = ws
}
