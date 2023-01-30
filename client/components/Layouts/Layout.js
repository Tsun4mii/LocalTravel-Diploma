import React from "react";
import { Navbar, Text, SSRProvider } from "@nextui-org/react";

const Layout = (props) => {
  return (
    <>
      <Navbar>
        <Navbar.Brand>
          <Text>LocalTravel</Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Link>About</Navbar.Link>
          <Navbar.Link href="/blog">Blog</Navbar.Link>
          <Navbar.Link href="/routes">Routes</Navbar.Link>
        </Navbar.Content>
      </Navbar>
      <main>
        <div className="container">{props.children}</div>
      </main>
    </>
  );
};

export default Layout;
