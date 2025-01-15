import type { ICity } from "./ICity";

export interface IAdress {
  rua: string;
  complemento: string;
  bairro: string;
  numero: string;
  cep: string;
  latitude: number;
  longitude: number;
  cidade: ICity;
}
