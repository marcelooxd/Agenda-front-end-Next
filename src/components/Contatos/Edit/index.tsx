import { Button, Form, Modal, notification } from "antd";
import { useEffect, useState } from "react";

import { contactsService } from "@/infra/services/contacts.service";
import { useContact } from "@/infra/hooks/UseContact";

import ContactForm from "../Form";

const EditContact = ({ id }: { id: number }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const { contact } = useContact(id);

  const onSubmit = async () => {
    if (!contact) return;

    await contactsService
      .update(contact.id, form.getFieldsValue())
      .then(() => {
        notification.success({
          message: "Edição realizada com sucesso",
        });
        form.resetFields();
        setOpen(false);
      })
      .catch(() => {
        notification.error({
          message: "Erro ao editar contato",
        });
      });
  };

  useEffect(() => {
    form.setFieldsValue(contact);
  }, [contact]);

  return (
    <>
      <Button className="mt-3" onClick={() => setOpen(true)}>
        Editar
      </Button>
      <Modal
        title="Editar contato"
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

export default EditContact;
