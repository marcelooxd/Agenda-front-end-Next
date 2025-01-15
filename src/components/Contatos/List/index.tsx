import { Table } from "antd";

import { useAuth } from "@/infra/context/auth";
import { useContacts } from "@/infra/hooks/UseContacts";

import EditContact from "../Edit";

const ListContacts = () => {
  const { user } = useAuth();

  const { contatos } = useContacts({
    user_id: user.id ?? "",
  });

  const columns = [
    {
      title: "Nome",
      dataIndex: "primeiroNome",
      key: "primeiroNome",
    },
    {
      title: "Sobrenome",
      dataIndex: "sobrenome",
      key: "sobrenome",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CPF/CNPJ",
      dataIndex: "cpfCnpj",
      key: "cpfCnpj",
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
      key: "telefone",
    },
    {
      title: "Tipo Pessoa",
      dataIndex: "tipoPessoa",
      key: "tipoPessoa",
    },
    {
      title: "Profissão",
      dataIndex: "profissao",
      key: "profissao",
    },
    {
      title: "Rua",
      dataIndex: "endereco.rua",
      key: "profissao",
    },
    {
      title: "Numero",
      dataIndex: "endereco.numero",
      key: "profissao",
    },
    {
      title: "Rua",
      dataIndex: "endereco.bairro",
      key: "profissao",
    },
    {
      title: "Editar",
      key: "editar",
      render: (record: any) => <EditContact id={record.id ?? ""} />,
    },
  ];

  return <Table dataSource={contatos} columns={columns} rowKey="id" />;
};

export default ListContacts;
