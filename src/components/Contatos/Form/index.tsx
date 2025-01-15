import type { FormInstance } from "antd";
import { DatePicker, Flex, Form, Input, Select } from "antd";

import { EState } from "@/interfaces/EState";

const ContactForm = ({
  form,
  onSubmit,
}: {
  form: FormInstance;
  onSubmit: () => void;
}) => {
  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <div>
        <h3> Dados Pessoais</h3>
        <Form.Item
          name="primeiroNome"
          label="Primeiro Nome"
          rules={[{ required: true, message: "Insira o primeiro Nome" }]}
        >
          <Input placeholder="Digite o seu primeiro nome" />
        </Form.Item>
        <Flex>
          <Form.Item
            name="sobrenome"
            label="Sobrenome"
            rules={[{ required: true, message: "Insira o sobrenome" }]}
          >
            <Input placeholder="Digite o Sobrenome" />
          </Form.Item>
          <Form.Item
            name="cpfCnpj"
            label="CPF/CNPJ"
            rules={[{ required: true, message: "Insira o CPF ou CNPJ" }]}
          >
            <Input placeholder="Digite o CPF / CNPJ" />
          </Form.Item>
        </Flex>
        <Form.Item
          name="dataAniversario"
          label="Data de aniversário"
          rules={[
            { required: true, message: "Selecione a data de aniversario" },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Insira o email" },
            { type: "email", message: "Insira um email valido" },
          ]}
        >
          <Input placeholder="Digite o email" />
        </Form.Item>
        <Form.Item
          name="telefone"
          label="Teefone"
          rules={[{ required: true, message: "Insira o telefone " }]}
        >
          <Input placeholder="Digite o telefone" />
        </Form.Item>
        <Form.Item name="profissao" label="Profissão">
          <Input placeholder="Qual sua profissão?" />
        </Form.Item>
        <Form.Item name="tipoPessoa" label="Tipo de Pessoa">
          <Select>
            <Select.Option value="FISICA">Pessoa Fisica</Select.Option>
            <Select.Option value="JURIDICA">Pessoa Juridica</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="genero" label="Genêro">
          <Select>
            <Select.Option value="MASCULINO">Male</Select.Option>
            <Select.Option value="FEMININO">Female</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <h3> Endereço</h3>
      <div>
        <Form.Item
          name="rua"
          label="Rua"
          rules={[{ required: true, message: "Insira a rua" }]}
        >
          <Input placeholder="Digite a Rua" />
        </Form.Item>
        <Form.Item name="complemento" label="Complement">
          <Input placeholder="complemento" />
        </Form.Item>
        <Form.Item
          name="bairro"
          label="Bairro"
          rules={[{ required: true, message: "Insira o bairro " }]}
        >
          <Input placeholder="Digite o Bairro" />
        </Form.Item>
        <Form.Item
          name="numero"
          label="Numero"
          rules={[{ required: true, message: "Insira o numero " }]}
        >
          <Input placeholder="Digite o numero" />
        </Form.Item>
        <Form.Item
          name="cep"
          label="CEP"
          rules={[{ required: true, message: "Insira o CEP " }]}
        >
          <Input placeholder="Digite o CEP" />
        </Form.Item>
        <Form.Item
          name="cidade"
          label="Cidade"
          rules={[{ required: true, message: "Digite a cidade " }]}
        >
          <Input placeholder="Digite a Cidade" />
        </Form.Item>
        <Form.Item
          name="estado"
          label="Estado"
          rules={[{ required: true, message: "Escolha o estado" }]}
        >
          <Select>
            {Object.entries(EState).map(([key, value]) => (
              <Select.Option key={key} value={key}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </Form>
  );
};

export default ContactForm;
