import { FC, useState, useEffect, ReactElement } from 'react';
import ProForm, { ProFormText, ProFormDatePicker } from '@ant-design/pro-form';
import { Modal, Button } from 'antd';
import { ModalProps } from '@/typings/Modal';
import { TodoItemProps } from '@/typings/TodoList';

const Index: FC<ModalProps> = (props): ReactElement => {
  const { visible, onCancel } = props;

  const onFinish = async (formData: TodoItemProps) => {
    console.log('formData', formData);
  };

  return (
    <Modal destroyOnClose visible={visible} footer={false} onCancel={onCancel}>
      <ProForm<TodoItemProps>
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        submitter={{
          render: (props, dom) => [
            <Button
              type="default"
              key="close"
              onClick={onCancel}
              children="取消"
            />,
            <Button
              type="default"
              key="rest"
              onClick={() => props.form?.resetFields()}
              children="重置"
            />,
            <Button
              type="primary"
              key="rest"
              onClick={() => props.form?.submit?.()}
              children="提交"
            />,
          ],
        }}
      >
        <ProFormText
          rules={[{ required: true, max: 10 }]}
          label="标题"
          name="title"
        />

        <ProFormText label="描述" name="describe" />

        <ProFormText label="备注" name="remarks" />

        <ProFormDatePicker label="开始时间" name="startTime" />

        <ProFormDatePicker label="结束时间" name="endTime" />
      </ProForm>
    </Modal>
  );
};

export default Index;
