# API:

## GET MARKET
description: 
  Запрос, которым фронтенд получает доступные для покупки NFT; 
  Используется на страницах: "Торговая площадка"
  limit - сколько NFT выводится на одну страницу, page - номер страницы; 
method: GET
url: /market?
params: {
  page: number; // Номер страницы
  limit: number; // Количество NFT на странице
}
response_headers: {
  X-TOTAL-COUNT: number; // Сколько всего картинок (или страниц)
}
response: Array<{
  id: string;
  img: string; // base64
  title: string;
  price: number; // float
  collection: {
    title: string;
    link: string; // Или id
  }
  seller: {
    link: string;
    name: string;
  }
}>

## GET NFT
description: 
  Получает информацию о конкретной NFT картинке по id
method: GET
url: /market/:id
params: {
  id: number;
}
response: {
  id: string;
  img: string; // base64
  title: string;
  price: number; // float
  collection: {
    title: string;
    link: string; // Или id
  }
  seller: {
    link: string;
    name: string;
  }
}

## BUY NFT (v 0.1)
description:
  Фронт отправляет id картинки и id пользователя, который покупает картинку
  В ответ ожидается один из статусов: 
    OK если покупка удачная
    NOT_ENOUGH_MONEY если не хватает денег для покупки NFT
    ITERNAL_ERROR для прочих ошибок. (к примеру NFT больше не продается)
  UPD: Возможно было бы логичнее отвечать на этот запрос хедерами. 
    Короче реализация открыта для обсуждения 
method: POST
url: /buy
params: {
  userId: string;
  nftId: string;
}
response: {
  status: "OK" | "NOT_ENOUGH_MONEY" | "INTERNAL_ERROR"
}

## SEND IMAGE
description: 
  Фронт отправляет картинку, которую загрузил пользователь для деления на NFT. 
  В ответ получает массив base64 строк - блоков полученных после деления.
method: POST
url: /createNFT
params: {
  nblocks: number;
  src: string; // base64
}
response: {
  blocks: Array<{
    x: number;
    y: number;
    w: number;
    h: number;
    base64: string;
  }>
}

## GET USER COLLECTIONS
description: 
  Получает все коллекции пользователя с купленными nft
method: GET
url: /getUserCollections
params: {
  userId: number; // id пользователя
}
response : Array<{
  id: string; // id коллекции
  title: string;
  author: {
    link: string;
    name: string;
  };
  minPrice: number; // float
  lastBuy: string; // Date
  available: number; // Number of NFTs avaliable to buy
  bought: Array<NFT>
}>

## REGISTER USER
description: 
  Отправляет данные пользователя при регистрации
  В ответ ожидается {status: "ok"}, если регистрация успешна, 
  В противном случае, ожидается {status: "error", errorCode: string}
method: POST
url: /register/
params: {
  email: string;
  password: string;
}
response: {
  status: "ok" | "error";
  errorCode?: "WRONG_EMAIL" | "WRONG_PASSWORD" | "EMAIL_BUSY" | "INTERNAL_ERROR"
}

## LOGIN ACCOUNT
description: 
  Запрос отрабатывает при попытке входа в аккаунт пользователя
method: POST
url: /login/
params: {
  email: string;  
  password: string;
}
response: {
  status: "ok" | "error";
}

## VERIFY WALLET
description: 
  Подключает metamask кошелек к существующему аккаунту
  Также используется при входе в существующий аккаунт для проверки кошелька	
method: PUT
url: /verifyWallet/
params: {
  email: string;
  wallet: string;
}
response: {
  status: "ok" | "error";
  errorCode?: "NON_EXISTENT_USER" | "WRONG_WALLET" | "WALLET_BUSY" | "INTERNAL_ERROR";  
}


## GET USER
description: 
  Получает необходимые 
