import { Moment } from 'moment';

import { useState, forwardRef, useImperativeHandle } from 'react';

import { Modal, Button } from 'antd';

import ProForm, { ProFormText, ProFormList } from '@ant-design/pro-form';

import { SourceItem } from '@/typings/Plan';

export interface Ref {
  onShow: () => void;
}

export interface Props {
  onSubmit: (source: SourceItem[]) => void;
  source: SourceItem[];
}

export interface FormProps {
  source: SourceItem[];
}

const Index = forwardRef<Ref, Props>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false); // 弹窗显示隐藏
  const [form] = ProForm.useForm<FormProps>(); // ProForm 实例
  const { source } = props;

  /**
   * 控制弹窗显示隐藏
   */
  function onShow() {
    form.resetFields();
    setVisible(true);
  }

  /**
   * 添加任务表单提交
   */
  async function onSubmit() {
    await form.validateFields();
    const { source } = form.getFieldsValue();
    props.onSubmit(source);
    setVisible(false);
  }

  /**
   * 关闭弹窗
   */
  function onCancel() {
    setVisible(false);
  }

  /**
   * 父组件获取到的参数和函数
   */
  useImperativeHandle(ref, () => ({
    onShow,
  }));

  return (
    <Modal
      forceRender
      destroyOnClose
      width="40vw"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button
          key="reset"
          children="重置"
          onClick={() => form.resetFields()}
        />,
        <Button
          key="cancel"
          type="primary"
          children="取消"
          onClick={onCancel}
        />,
        <Button key="ok" type="primary" children="确定" onClick={onSubmit} />,
      ]}
    >
      <ProForm<FormProps> form={form} submitter={false} requiredMark={false}>
        <ProFormList
          name="source"
          initialValue={source}
          alwaysShowItemLabel={false}
          min={1}
        >
          <ProForm.Group>
            <ProFormText
              name="content"
              label="内容"
              rules={[{ required: true, message: '请输入内容' }]}
            />

            <ProFormText
              name="key"
              label="key"
              rules={[{ required: true, message: '请输入key' }]}
            />
          </ProForm.Group>
        </ProFormList>
      </ProForm>
    </Modal>
  );
});

export default Index;
