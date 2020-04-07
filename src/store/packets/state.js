export default function () {
  return {
    ws: {},
    listening: false,
    connections: {},
    packets: {},
    opFilters: {},
    appliedFilters: []
  }
}
