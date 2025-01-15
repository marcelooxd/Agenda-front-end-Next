import { Button, Form, Input, Modal, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";

import { sessionService } from "@/infra/services/session.service";

const RegisterUser = () => {
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const onSubmit = async () => {
    await sessionService
      .register(form.getFieldsValue())
      .then(() => {
        notification.success({
          message: "Cadastro realizado com sucesso",
        });
        form.resetFields();
        setOpen(false);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao realizar cadastro",
        });
      });
  };

  return (
    <>
      <Button className="mt-3" onClick={() => setOpen(true)}>
        Ainda não tem cadastro? Clique aqui.
      </Button>
      <Modal
        title="Cadastrar"
        closable={false}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={form.submit}
      >
        <Form form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
            <Input placeholder="Digite seu nome" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true },
              {
                type: "email",
              },
            ]}
          >
            <Input placeholder="Digite seu nome" />
          </Form.Item>
          <Form.Item label="Senha" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Digite seu nome" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterUser;
