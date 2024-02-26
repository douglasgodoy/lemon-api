export function calculateCO2Economy(consumption: number[]): number {
  const sumKwh = consumption.reduce((prev, curr) => {
    return curr + prev;
  }, 0);

  return sumKwh * 0.084; // CO2 per kwh
}
