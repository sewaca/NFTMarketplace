const http = require("http");
const fs = require("fs").promises;
var URL = require("url");

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
    collection: {
      author: randomAuthor(),
      id: randomId(),
      title: randomTitle(),
    },
    id: randomId(),
    img: randomImage(),
    price: randomPrice(),
    seller: randomAuthor(),
    title: randomTitle(),
  };
}

const requestListener = function (req, res) {
  console.log("request on", URL.parse(req.url, true).pathname);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  if (req.url.indexOf("/user?") !== -1) {
    let fields = JSON.parse(URL.parse(req.url, true).query.fields);
    var ans = {};
    fields.forEach((item) => {
      if (item === "avatar") ans["avatar"] = randomImage();
      if (item === "email") ans["email"] = "randomed@pochta.bank";
      if (item === "name") ans["name"] = randomName();
      if (item === "wallet")
        ans["wallet"] = ["0хКОШЕЛЕК_1", "0хКОШЕЛЕК_2", "0хКОШЕЛЕК_3"];
      if (item === "role") ans["role"] = "artist";
    });

    res.writeHead(200);
    res.end(JSON.stringify(ans));
    return;
  }
  // ~ /market/
  if (req.url.indexOf("market") !== -1) {
    var [url] = req.url.split("?");
    var response = undefined;
    if (url.replaceAll("market", "").replaceAll("/", "").length)
      response = randomNFT();
    else response = [...Array(10)].map(() => randomNFT());

    res.writeHead(200);
    res.end(JSON.stringify(response));
    return;
  }

  // ~ /makeNft/
  if (req.url.indexOf("makeNft") !== -1) {
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
    res.writeHead(200);
    res.end(
      JSON.stringify(
        [...Array(Math.floor(Math.random() * 10 + 1))].map(() => ({
          author: randomAuthor(),
          available: Math.floor(Math.random() * 1000),
          bought: [...Array(Math.floor(Math.random() * 10 + 1))].map(randomNFT),
          id: randomId(),
          lastBuy: randomDate(),
          minPrice: randomPrice(),
          title: randomTitle(),
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
  console.log("^ server fell down here...");
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Resource not found" }));
};

fs.readFile(__dirname + "/images.json").then((res) => {
  images = JSON.parse(res);
  const server = http.createServer(requestListener);
  server.listen(821);
});
