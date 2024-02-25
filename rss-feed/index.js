import Parser from "rss-parser";
import promptModule from "prompt-sync";

const parser = new Parser();
const prompt = promptModule({ sigint: true });

const urls = [
  "https://www.bonappetit.com/feed/recipes-rss-feed/rss",
  "https://www.reddit.com/r/recipes/.rss",
];

const customItems = [];

// setInterval(main, 5000);
main();

async function main() {
  const feedItems = [];
  const awaitableRequests = urls.map(url => parser.parseURL(url));
  const responses = await Promise.all(awaitableRequests);
  aggregate(responses, feedItems);
  print(feedItems);
}

function aggregate(responses, feedItems) {
  for (let { items } of responses) {
    for (let { title, link } of items) {
      if (/ veg/i.test(title)) {
        feedItems.push({ title, link });
      }
    }
  }
  return feedItems;
}

function print(feedItems) {
  const res = prompt("Add item (name,url): ");
  const [title, link] = res.split(",");
  if (![title, link].includes(undefined)) customItems.push({ title, link });
  console.clear();
  console.table(feedItems.concat(customItems));
  console.log(`last updated at ${new Date().toUTCString()}`);
}
