const { fetch } = require('undici');

async function test() {
  const url = 'https://animehay02.site/tim-kiem/dua-con-cua-thoi-tiet.html';
  const r = await fetch(url);
  const text = await r.text();
  const match = text.match(/class=\"movie-item\"/g);
  console.log('movie-items:', match ? match.length : 0);
  
  if (match && match.length > 0) {
    const titleMatch = text.match(/<div class=\"movie-item\"[\s\S]*?title=\"([^\"]+)\"/g);
    if (titleMatch) {
      console.log('Sample titles:', titleMatch.slice(0, 3));
    }
  }
}

test();
