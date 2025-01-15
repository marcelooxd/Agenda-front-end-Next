import type { IAdress } from "./IAdress";

export interface IContact {
  id: number;
  primeiroNome: string;
  sobrenome: string;
  cpfCnpj: string;
  dataAniversario: undefined;
  email: string;
  telefone: string;
  profissao: string;
  tipoPessoa: "FISICA" | "JURIDICA";
  genero: "MASCULINO" | "FEMININO";
  usuario: 0;
  endereco: IAdress;
}

export interface ICreateContact extends Omit<IContact, "id"> {}
