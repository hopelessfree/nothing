import { Moment } from 'moment';

import { useState, forwardRef, useImperativeHandle } from 'react';

import { Modal, Button } from 'antd';

import ProForm, {
  ProFormText,
  ProFormList,
  ProFormSelect,
  ProFormDependency,
  ProFormDatePicker,
  ProFormDateRangePicker,
} from '@ant-design/pro-form';

import { SourceItem } from '@/typings/Plan';

export interface Ref {
  onShow: () => void;
}

export interface Props {
  onSubmit: (source: SourceItem[], days: number[]) => void;
}

export interface FormProps {
  mode: FormMode;
  source: SourceItem[];
  single: Moment;
  batch: [Moment, Moment];
}

export enum FormMode {
  BATCH = 'batch',
  SINGLE = 'single',
}

const Index = forwardRef<Ref, Props>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false); // 弹窗显示隐藏
  const [form] = ProForm.useForm<FormProps>(); // ProForm 实例

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
    const { source, single, batch, mode } = form.getFieldsValue();
    const days: number[] = [];

    switch (mode) {
      case FormMode.SINGLE:
        days.push(single.startOf('D').valueOf());
        break;

      case FormMode.BATCH:
        let end = batch[1].startOf('D').valueOf();
        let start = batch[0].startOf('D').valueOf();

        while (start <= end) {
          days.push(start);
          start += 86400000;
        }
        break;
    }
    props.onSubmit(source, days);
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
        <ProForm.Group>
          <ProFormSelect
            name="mode"
            label="添加模式"
            allowClear={false}
            initialValue={'single'}
            valueEnum={{
              batch: '批量',
              single: '单个',
            }}
          />

          <ProFormDependency name={['mode']}>
            {({ mode }) => {
              switch (mode) {
                case 'single':
                  return (
                    <ProFormDatePicker
                      label=" "
                      name="single"
                      rules={[
                        { required: mode === 'single', message: '请选择日期' },
                      ]}
                    />
                  );

                case 'batch':
                  return (
                    <ProFormDateRangePicker
                      label=" "
                      name="batch"
                      rules={[
                        { required: mode === 'batch', message: '请选择日期' },
                      ]}
                    />
                  );

                default:
                  return <></>;
              }
            }}
          </ProFormDependency>
        </ProForm.Group>

        <ProFormList
          name="source"
          initialValue={[{ content: '', key: '' }]}
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
