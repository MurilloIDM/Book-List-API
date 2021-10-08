export interface IStatusObjectRemoveBook {
  idBook: string;
  message: string;
}

export interface IResponseRemoveBook {
  totalAddBooks: number;
  success: IStatusObjectRemoveBook[];
  errors: IStatusObjectRemoveBook[];
}
