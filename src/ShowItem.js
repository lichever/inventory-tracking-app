import React, { useState } from "react";
import Axios from "axios";
import { message } from "antd";
import { Form, Input, Modal } from "antd";

function ShowItem(props) {
  const url = "/api/inventory";

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { item, fetchItems } = props;

  const deleteItem = () => {
    const deletedUrl = `${url}/${item._id}`;
    Axios.delete(deletedUrl)
      .then((res) => {
        if (res.status === 200) {
          fetchItems();
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const updateItem = (item) => {
    const updatedUrl = `${url}/${item._id}`;
    Axios.put(updatedUrl, item)
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
    const updatedItem = { ...values, _id: props.item._id };
    // console.log(updatedItem);
    updateItem(updatedItem);
    form.resetFields();
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <tr>
      <th scope="row">{item.product_id}</th>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{item.category}</td>
      <td>{item.price}</td>
      <td>{item.stock}</td>
      <td>
        <>
          <button className="btn btn-primary" onClick={showModal}>
            Edit
          </button>
          <Modal
            forceRender
            visible={visible}
            onOk={form.submit}
            onCancel={handleCancel}
            title="Edit an item"
          >
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              initialValues={{
                product_id: item.product_id,
                name: item.name,
                price: item.price,
                description: item.description,
                category: item.category,
                stock: item.stock,
              }}
            >
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
      </td>
      <td>
        <button className="btn btn-danger" onClick={deleteItem}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ShowItem;
