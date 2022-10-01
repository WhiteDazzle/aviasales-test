export const createTextAfterStopsCounter = (routes: Array<string>) =>
  routes.length === 0
    ? "ПЕРЕСАДОК"
    : routes.length % 10 === 1
    ? "ПЕРЕСАДКА"
    : routes.length % 10 < 5
    ? "ПЕРЕСАДКИ"
    : "ПЕРЕСАДОК";
