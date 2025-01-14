import { http, HttpResponse } from 'msw';
import { getAllBoards, createBoard } from './sidebar';

export const handlers = [
  getAllBoards,
  createBoard
];