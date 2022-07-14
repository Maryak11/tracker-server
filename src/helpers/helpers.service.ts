import { Injectable } from '@nestjs/common';

export interface IPage {
  itemsPerPage: number;
  page: number;
}

export interface IPageNumberIsPossible extends IPage {
  totalCount: number;
}

export interface IOptionsForRequestBase {
  offset: number;
  limit: number;
}

@Injectable()
export class HelpersService {
  //проверка возможна ли страница
  isPageNumberPossible({
    itemsPerPage,
    totalCount,
    page,
  }: IPageNumberIsPossible): boolean {
    return Math.ceil(totalCount / itemsPerPage) >= page;
  }

  pagination({ itemsPerPage, page }: IPage): IOptionsForRequestBase {
    return {
      offset: itemsPerPage * (page - 1),
      limit: itemsPerPage,
    };
  }
}
