'use server'

interface GeocodeResult{
    country: string,
    formattedAddress: string
}
export async function getCountryFromCoordinates (lat: number, lng: number): Promise<GeocodeResult> {
    const apiKey = process.env.GEOAPIFY_REVERSE_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`;
    const res = await fetch(url);
    const data =  await res.json();
  if (!data.features || data.features.length === 0) {
    return { country: "Unknown", formattedAddress: "Unknown" };
  }

  const properties = data.features[0].properties;

  const country = properties.country ;
  const formattedAddress = properties.formatted ;

  return { country, formattedAddress };
}