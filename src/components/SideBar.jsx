import { LeftCircleOutlined, SnippetsOutlined } from "@ant-design/icons";
import React from "react";
import { Input } from "antd";
const SideBar = ({ setFormula, disableFormulaInput }) => {
  return (
    <div className="side">
      <div className="sidebar">
        <div className="side-wrapper">
          <h1>User Controls</h1>
          <h2>
            <span>
              <LeftCircleOutlined
                style={{
                  fontSize: "30px",
                  color: "white",
                  marginRight: "-1rem",
                }}
              />
            </span>
            <span
              style={{
                marginLeft: "2rem",
              }}
            >
              {" "}
              Input for Padding Function
            </span>
          </h2>
          <p>
            Enter the Feature Hanle Which You Want to Add Padding. Eg: Hrid,
            Hrid_new, 4
          </p>
          <Input
            placeholder="SPLIT,H rid ,Hrid_new,4"
            onBlur={(e) => setFormula(e.target.value)}
            style={{
              height: "2.5rem",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            disabled={disableFormulaInput}
          />
          <div className="side-wrapper">
            <h2>
              <span className="icon-left">
                <SnippetsOutlined
                  style={{ fontSize: "30px", color: "white" }}
                />
              </span>
              Add Left Padding =
            </h2>
            <p>Feature Name, Name for New Feature, No of Padding You Want.</p>
          </div>

          <div className="side-wrapper">
            <h2>
              <span className="icon-left">
                <SnippetsOutlined
                  style={{ fontSize: "30px", color: "white" }}
                />
              </span>
              Sub String =
            </h2>
            <p>
              Feature Name, Name for New Splitted Feature, Starting Number From
              Where You Want Split, Number From Where You Want to Stop Split.
            </p>
          </div>
        </div>
      </div>
      <div className="logo-footer">
        <p>Powered by</p>
        <img src="http://123.253.12.155:8088/rpac-app/img/logo.svg" alt="" />
      </div>
    </div>
  );
};

export default SideBar;
