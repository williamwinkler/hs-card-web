import React from "react";
import { Layout, Menu, theme } from "antd";
import { Route, Routes, Link } from "react-router-dom";
import Cards from "./pages/Cards";
import { QueryClient, QueryClientProvider } from "react-query";

const { Header, Content } = Layout;
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={client}>
        <Layout>
          <Header
            style={{
              top: 0,
              zIndex: 1,
              width: "100%",
            }}
          >
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={window.location.pathname}
            >
              <Menu.Item key={"/"}>
                <Link to="/">Home</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content
            className="site-layout"
            style={{
              padding: "1rem 2rem",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 1000,
                background: colorBgContainer,
              }}
            >
              <Routes>
                <Route path="/" element={<Cards />}></Route>
              </Routes>
            </div>
          </Content>
        </Layout>
      </QueryClientProvider>
    </>
  );
};
export default App;
