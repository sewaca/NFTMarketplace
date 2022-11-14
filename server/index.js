const http = require("http");
const fs = require("fs").promises;

var images = undefined;
const titles = [
  "ANIME DRAGON",
  "UDNEAD DISNEY",
  "GREEN SEED",
  "CANDY SHOP",
  "THE CITY OF THE SINS",
  "SEPTEMBER COLORS",
  "GIVE ME A SIGN",
  "Lowcase Is Ok??",
  "1000-8?",
  "Picture 228",
  "100 RUB ZA KARTINKU)",
];
const authors = [
  "Andrey Andruha",
  "Undefined Monkey",
  "Untitled Author",
  "Titled Snake",
  "Killed Hour",
  "Mr. Dollar",
  "NodeJS Cool",
  "MXRacle Money Maker",
  "Immutable Person",
  "Great Psycho",
  "Father of your mother",
];

const randomId = () => Math.random().toString(16).slice(2, 10);
const randomImage = () => images[Math.floor(Math.random() * images.length)];
const randomTitle = () => titles[Math.floor(Math.random() * titles.length)];
const randomPrice = () => (Math.random() * 100).toFixed(3);
const randomDate = () =>
  `${Math.floor(Math.random() * 27)}.${Math.floor(
    Math.random() * 3 + 10
  )}.${Math.floor(Math.random() * 2022 + 1000)}`;
const randomName = () => authors[Math.floor(Math.random() * authors.length)];
const randomAuthor = () => ({ id: randomId(), name: randomName() });

function randomNFT() {
  if (!images) return;
  return {
    id: randomId(),
    img: randomImage(),
    title: randomTitle(),
    price: randomPrice(),
    collection: {
      title: randomTitle(),
      id: randomId(),
      author: randomAuthor(),
    },
    seller: randomAuthor(),
  };
}

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // ~ /market/
  if (req.url.indexOf("market") !== -1) {
    var [url, params] = req.url.split("?");
    var response = undefined;
    if (url.replaceAll("market", "").replaceAll("/", "").length)
      response = randomNFT();
    else response = [...Array(10)].map(() => randomNFT());

    res.writeHead(200);
    res.end(JSON.stringify(response));
    return;
  }

  // ~ /createNFT/
  if (req.url.indexOf("createNFT") !== -1) {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        blocks: [
          {
            x: 0,
            y: 0,
            w: 100,
            h: 100,
            base64: images[Math.floor(Math.random() * images.length)],
          },
        ],
      })
    );
    return;
  }

  // ~ /getUserCollections/
  if (req.url.indexOf("getUserCollections") !== -1) {
    var ansLength = Math.floor(Math.random() * 10 + 1);
    res.writeHead(200);
    res.end(
      JSON.stringify(
        [...Array(Math.floor(Math.random() * 10 + 1))].map(() => ({
          id: randomId(),
          title: randomTitle(),
          author: randomAuthor(),
          minPrice: randomPrice(),
          lastBuy: randomDate(),
          available: Math.floor(Math.random() * 1000),
          bought: [...Array(Math.floor(Math.random() * 10 + 1))].map(() =>
            randomNFT()
          ),
        }))
      )
    );
    return;
  }

  if (req.url.indexOf("register") !== -1 || req.url.indexOf("login") !== -1) {
    res.writeHead(200);
    res.end(
      JSON.stringify(
        Math.random() > 0.7
          ? { status: "ok" }
          : {
              status: "error",
              errorCode:
                Math.random() > 0.5
                  ? "EMAIL_BUSY"
                  : Math.random() > 0.5
                  ? "WRONG_EMAIL"
                  : "INTERNAL_ERROR",
            }
      )
    );
    return;
  }

  // ! 404 response
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Resource not found" }));
};

fs.readFile(__dirname + "/images.json").then((res) => {
  images = JSON.parse(res);
  const server = http.createServer(requestListener);
  server.listen(8080);
});
