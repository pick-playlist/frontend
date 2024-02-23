import axios from "axios";

export async function getLinkInfo(link) {
  try {
    // const url = link.replace("www.youtube.com", "m.youtube.com");

    const resp = await axios.get(link);

    return resp;
  } catch (err) {
    console.log(err);
  }
}
