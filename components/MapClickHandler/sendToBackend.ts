import axios from "axios";
export async function sendToBackend(lat: number, lng: number) {
  try {
    const { data } = await axios({
      method: "post",
      url: "http://localhost:6612/api/spatial/compute-position-by-coord",
      data: { lat, lng },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}
