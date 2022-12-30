import React, { useEffect, useState } from "react";
import { LeftCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Table, Upload } from "antd";
import Papa from "papaparse";
const { Dragger } = Upload;

const HomePage = ({ formula, setDisableFormulaInput }) => {
  const [csvData, setcsvData] = useState([]);
  const [tableHead, settableHead] = useState([]);
  const [formulaName, setFormulaName] = useState("");
  const [columnName, setColumnName] = useState("");
  const [newColumnName, setNewColumnName] = useState("");
  const [colValue, setColValue] = useState("");
  const [formulaError, setFormulaError] = useState("");

  useEffect(() => {
    setFormulaError(
      formula && (formula.includes("SPLIT") || formula.includes("PADD"))
    );
    const formulaArray = formula.split(",");
    setFormulaName(formulaArray[0]);
    setColumnName(formulaArray[1]);
    setNewColumnName(formulaArray[2]);
    setColValue(formulaArray[3]);
  }, [formula]);

  useEffect(() => {
    csvData.length && setDisableFormulaInput(false);
  }, [csvData.length, setDisableFormulaInput]);

  const props = {
    name: "file",
    accept: ".csv",
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const { data, meta } = Papa.parse(e.target.result, { header: true });
        setcsvData(data);
        settableHead(meta.fields);
      };
      return false;
    },
    onRemove: () => {
      setcsvData([]);
      settableHead([]);
      setDisableFormulaInput(true);
    },
  };

  const columns = tableHead.map((head) => {
    return {
      title: head,
      dataIndex: head,
      key: head,
    };
  });

  const newTableColumns = [...tableHead, newColumnName].map((head, idx) => {
    if (head === newColumnName) {
      return {
        title: head,
        dataIndex: head,
        key: head,
        render: (_, colObj) => (
          <p
            style={{
              paddingLeft: formulaName === "PADD" ? `${colValue}px` : "",
            }}
          >
            {formulaName === "SPLIT"
              ? colObj[columnName].slice(0, colValue)
              : colObj[columnName]}
          </p>
        ),
      };
    }

    return {
      title: head,
      dataIndex: head,
      key: head,
    };
  });

  const newTableDataSource = csvData.map((data) => {
    return {
      ...data,
      [newColumnName]: "",
    };
  });

  return (
    <div className="home-header">
      <div className="main-wrapper">
        <h1>
          <span className="icon-left">
            <LeftCircleOutlined
              style={{ fontSize: "30px", color: "#ffc400" }}
            />
          </span>
          CSV TO JSON/CSV
        </h1>
        <div className="csv-choose">
          <p>Choose your file CSV:</p>
          <p className="limit">Limit 200MB per file - CSV</p>
        </div>
        <div className="drag-div">
          <Dragger {...props}>
            <div className="drag-file">
              <div>
                <p className="ant-upload-drag-icon ">
                  <InboxOutlined />
                </p>
                <p
                  className="ant-upload-text"
                  style={{
                    color: "grey",
                    fontWeight: "bolder",
                    fontSize: "1rem",
                  }}
                >
                  Drag and Drop file here
                </p>
              </div>
              <span style={{ fontWeight: "bolder", color: "#1788df" }}>OR</span>
              <div>
                <Button
                  style={{ fontWeight: "bolder" }}
                  type="primary"
                  icon={<UploadOutlined />}
                >
                  Browse Files
                </Button>
              </div>
            </div>
          </Dragger>
        </div>

        {formula && !formulaError && (
          <p style={{ color: "red" }}>Please enter valid formula format.</p>
        )}

        <div className="table-wrapper">
          {!!csvData.length && (
            <>
              <h4
                style={{
                  marginBottom: "1rem",
                }}
              >
                Original CSV
              </h4>
              <Table
                scroll={{ x: true }}
                dataSource={csvData}
                columns={columns}
              />
            </>
          )}

          {formulaError && (
            <>
              <h4
                style={{
                  marginBottom: "1rem",
                }}
              >
                Formula Applied Table
              </h4>
              <Table
                scroll={{ x: true }}
                dataSource={newTableDataSource}
                columns={newTableColumns}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
