import Parser from "rss-parser";

const parser = new Parser();

const urls = [
  "https://www.bonappetit.com/feed/recipes-rss-feed/rss",
  "https://www.reddit.com/r/recipes/.rss",
];

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
  console.clear();
  console.table(feedItems);
  console.log(`last updated at ${new Date().toUTCString()}`);
}
