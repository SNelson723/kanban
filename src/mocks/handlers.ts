import { http, HttpResponse } from 'msw';
import { getAllBoards } from './sidebar';

export const handlers = [
  getAllBoards
];