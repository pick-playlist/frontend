import axios from "axios";

export async function getLinkInfo(youtubeLink) {
  try {
    const url = new URL(youtubeLink);
    const id = url.searchParams.get("v");

    const resp =
      await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }
    &part=snippet`);
    const info = resp.data.items[0].snippet;

    return info;
  } catch (err) {
    console.log(err);
  }
}
