import React from "react";
import { Layout, Menu, theme } from "antd";
import { Route, Routes, Link } from "react-router-dom";
//import Home from "./pages/Home";
import Cards from "./pages/Cards";
import About from "./pages/About";
import { QueryClient, QueryClientProvider } from "react-query";

const { Header, Content, Footer } = Layout;
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const client = new QueryClient();

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
              <Menu.Item key={"/about"}>
                <Link to="/about">About</Link>
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
                <Route path="/about" element={<About />}></Route>
              </Routes>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          ></Footer>
        </Layout>
      </QueryClientProvider>
    </>
  );
};
export default App;
