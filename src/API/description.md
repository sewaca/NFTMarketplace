# API:

## GET MARKET
description: 
  Запрос, которым фронтенд получает доступные для покупки NFT; 
  Используется на страницах: "Торговая площадка"
  limit - сколько NFT выводится на одну страницу, page - номер страницы; 
method: GET
uri: localhost/market?
params: {
  page: number; // Номер страницы
  limit: number; // Количество NFT на странице
}
response: {
  headers: {
    X-TOTAL-COUNT: number; // Сколько всего картинок (или страниц)
  }
  body: Array<{
    id: string;
    img: string; // base64
    title: string;
    price: number; // float
    seller: {
    link: string;
    name: string;
  }>
}

## SEND IMAGE
description: 
  Фронт отправляет картинку, которую загрузил пользователь для деления на NFT. 
  В ответ получает массив base64 строк - блоков полученных после деления.
method: POST
uri: localhost/createNFT
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

