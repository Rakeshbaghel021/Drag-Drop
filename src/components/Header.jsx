import React from "react";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
const Header = () => {
  return (
    <div>
      <div className="header">
        <h1>EDI Data and Validation</h1>
        <Button className="menu">
          <MenuOutlined />
        </Button>
      </div>
    </div>
  );
};

export default Header;
