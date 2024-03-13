import cheerio from "cheerio";
import { YT_EMOJIS } from "./consts";

export const parseEmoji = (html: string) => {
  // Load the HTML
  const $ = cheerio.load(html);

  // Select all 'a' tags
  $("a").each((i, link) => {
    // Get the link's href
    const href = $(link).attr("href");

    if (href) {
      // Check if the link is in the mapping and empty
      if (href in YT_EMOJIS && $(link).html() === "") {
        // Replace with a new img element using the mapping
        $(link).replaceWith(
          `<img style="display:inline-block;height:1em" src="${YT_EMOJIS[href]}" />`,
        );
      }
      // remove the time text
      if (href.includes("t=")) {
        $(link).replaceWith("");
      }
    }
  });

  const output = $("body").html();
  return output;
};
