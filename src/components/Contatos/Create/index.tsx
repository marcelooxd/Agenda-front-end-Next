import { Button, Form, Modal, notification } from "antd";
import { useState } from "react";

import { contactsService } from "@/infra/services/contacts.service";

import ContactForm from "../Form";

const CreateContact = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const onSubmit = async () => {
    await contactsService
      .create(form.getFieldsValue())
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
        title="Cadastrar contato"
        closable={false}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={form.submit}
      >
        <ContactForm form={form} onSubmit={onSubmit} />
      </Modal>
    </>
  );
};

export default CreateContact;
