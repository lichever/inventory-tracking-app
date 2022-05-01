import React, { useState } from "react";
import Axios from "axios";
import { message } from "antd";
import { Form, Input, Modal } from "antd";

function AddItem(props) {
  const url = "/api/inventory";

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { fetchItems } = props;


  const addItem = (item) => {
    const addUrl = url;
    Axios.post(addUrl, item)
      .then((res) => {
        if (res.status === 200) {
          fetchItems();
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };


  const showModal = () => {
    setVisible(true);
  };

  const handleSubmit = (values) => {
    // console.log(values);
    addItem(values);
    form.resetFields();
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };



  return (
    <>
      <button className="btn btn-primary" onClick={showModal}>
        Add
      </button>
      <Modal
        forceRender
        visible={visible}
        onOk={form.submit}
        onCancel={handleCancel}
        title="Add a new item"
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            style={{ marginBottom: "0px" }}
            label="product id"
            name="product_id"
            rules={[
              {
                required: true,
                message: "Please input your product_id!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "0px" }}
            label="product name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your product name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "0px" }}
            label="product description"
            name="description"
            rules={[
              {
                required: false,
                message: "Please input your product description!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "0px" }}
            label="product category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please input your product category!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "0px" }}
            label="product price per quanitity"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your product price per quanitity!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "0px" }}
            label="product stock"
            name="stock"
            rules={[
              {
                required: true,
                message: "Please input your product stock!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddItem;
