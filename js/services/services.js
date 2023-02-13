// функция для создания POST запросов в формате json
const postData = async (url, data) => {

  // для JSON формата, нужно указывать заголовок в headers: {}
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  return await res.json();
};

const getResource = async (url) => {
  // Отправка GET запроса
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};

export {postData, getResource};