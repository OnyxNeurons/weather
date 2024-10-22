export async function getTemperature(latitude: number, longitude: number): Promise<number> {
  try {
    const url = new URL(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const temperature = data.current.temperature_2m;
    return temperature;
  } catch (error) {
    console.error('Error fetching temperature:', error);
    throw error;
  }
}
