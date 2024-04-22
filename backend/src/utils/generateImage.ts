import OpenAI from "openai";

import { config } from "dotenv";
config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Image {
  url: string;
}

const image_generation = async (): Promise<string[]> => {
  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt:
      "The Snowy Morning. On a snowy Christmas Eve, in the quaint village of Evergreen Hollow, lived a young girl named Dora. As she woke up to the gentle snowfall outside her window, excitement filled her heart. Little did she know, this Christmas would be unlike any other.",
    n: 1,
    size: "512x512",
  });
  const imageUrl = response.data;
  const imageUrlList = imageUrl.map((image: Image) => image.url);
  console.log("imageUrlList", imageUrlList);
  return imageUrlList;
};

export default image_generation;
