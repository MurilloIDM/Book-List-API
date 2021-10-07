export interface IStatusObjectAddBook {
  idBook: string;
  message: string;
}

export interface IResponseAddBook {
  totalAddBooks: number;
  success: IStatusObjectAddBook[];
  errors: IStatusObjectAddBook[];
}
