import axios from 'axios';

export const getAllLists = async (url: string, boardid: number) => {
  const json = await axios({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    url: url + 'lists/list',
    params: {
      boardid
    }
  });

  return json;
};