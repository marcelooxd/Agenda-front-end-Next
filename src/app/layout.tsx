import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import localFont from "next/font/local";
import "./globals.css";
import { ConfigProvider } from "antd";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Agenda-Teste",
};

const RootLayout = ({ children }: React.PropsWithChildren): JSX.Element => (
  <html lang="pt-br">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#8fda69 ",
              borderRadius: 4,
              colorBgContainer: "#fdfbff",
              controlHeight: 38,
            },
            components: {
              Form: {
                marginLG: 15,
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
