import React, { Component } from 'react';
import { Form, Input } from 'antd'
const AddUpdateForm = (props) => {
    const [form] = Form.useForm();
    props.setForm(form);
    const { categoryName } = props
    return (
        <Form
            form={form}
            name="basic"
            initialValues={{
                categoryName: categoryName || "",
            }}
        >
            <Form.Item
                label="分类名称"
                name="categoryName"
                rules={[{ required: true, message: 'Please input categoryName!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
}

export default AddUpdateForm;
