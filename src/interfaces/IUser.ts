export interface IUser {
  logged: boolean;
  id: string | null;
  nome: string;
  email: string;
}

export interface ICreateUser extends Omit<IUser, "id"> {
  password: string;
}
