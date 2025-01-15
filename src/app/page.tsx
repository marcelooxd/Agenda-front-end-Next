"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { useRouter } from "next/navigation";

import { sessionService } from "@/infra/services/session.service";
import { useAuth } from "@/infra/context/auth";
import { CookiesHandler } from "@/infra/cookies";
import RegisterUser from "@/components/Users/Create";

const Login = React.memo(function Login() {
  const { userUpdate, userUpdatePartial } = useAuth();

  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    const start = async () => {
      const getCookie = await CookiesHandler.login.get();

      if (getCookie) {
        form.setFieldsValue({
          email: getCookie.email,
          password: getCookie.password,
          remember: true,
        });
      }
    };

    start();
  }, []);

  const fetchSession = useCallback(
    ({
      email,
      password,
      remember,
    }: {
      email: string;
      password: string;
      remember: boolean;
    }): void => {
      if (loading) return;
      setLoading(true);

      const params = new URLSearchParams(window.location.search);
      sessionService
        .login({ email, password })
        .then(async res => {
          if (remember) {
            CookiesHandler.login.set({
              email,
              password,
            });
          } else {
            CookiesHandler.login.remove();
          }

          userUpdate({
            token: res.data.token,
            ...res.data.user,
            logged: true,
          });

          route.push(params.get("redirect") || "/agenda");
        })
        .catch(err => {
          if (err && err?.response?.data?.message) {
            notification.error({
              message: err.response.data.message,
            });
          } else {
            notification.error({
              message: "Alguma coisa deu errado na hora de logar",
            });
          }
        })
        .finally(() => setLoading(false));
    },
    [loading, setLoading, sessionService, userUpdate, userUpdatePartial, route]
  );

  return (
    <div className="flex h-screen items-center justify-center">
      <section className="relative flex flex-1 flex-col p-10 sm:flex-[0_0_450px]">
        <div className="flex flex-1 items-center">
          <div className="mb-10 flex flex-1 flex-col">
            <h2 className="mb-3 w-full text-2xl font-bold text-slate-900">
              Login
            </h2>
            <p className="mb-5 text-sm text-gray-600">
              Preencha com suas informações para acessar o sistema
            </p>
            <Form form={form} layout="vertical" onFinish={fetchSession}>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  { required: true, message: "Campo obrigatório" },
                  { type: "email", message: "E-mail inválido" },
                ]}
              >
                <Input type="email" placeholder="Digite seu e-mail" required />
              </Form.Item>

              <Form.Item
                name="password"
                label="Senha"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input.Password placeholder="Digite sua senha" required />
              </Form.Item>
              <Button type="primary" block htmlType="submit" loading={loading}>
                {loading ? "Processando..." : "Entrar"}
              </Button>
            </Form>
            <RegisterUser />
          </div>
        </div>
      </section>
    </div>
  );
});

export default Login;
