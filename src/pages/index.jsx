import "./index.css";
import React from "react";

import Layout from "../components/Layout";

function IndexPage() {
  return (
    <Layout>
      <Welcome />
    </Layout>
  );
}

export default IndexPage;

function Welcome() {
  return (
    <div className="welcome-bg">
      <h1 className="welcome-text title-text">WELCOME</h1>
    </div>
  );
}
