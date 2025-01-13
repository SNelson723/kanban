import axios from 'axios';
import { Board } from '../types';
import qs from 'qs';

export const getAllBoards = async (url: string) => {
  const json = await axios({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    url: url + "boards/list",
  });

  return json;
};

export const createBoard = async (url: string, board: Pick<Board, 'name'>) => {
  const json = await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: url + 'boards/create',
    data: qs.stringify(board)
  });
  return json;
};