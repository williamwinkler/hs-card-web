import React from "react";
import { Layout, Menu, theme } from "antd";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
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
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
            }}
          >
            <div
              style={{
                float: "left",
                width: 200,
                height: 31,
                margin: "16px 24px 16px 0",
                color: "white",
                fontSize: 23,
                textAlign: "center",
                text: "center",
              }}
            >
              Title
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
              <Menu.Item key={0}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key={1}>
                <Link to="/cards">Cards</Link>
              </Menu.Item>
              <Menu.Item key={2}>
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
                minHeight: 380,
                background: colorBgContainer,
              }}
            >
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/cards" element={<Cards />}></Route>
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
