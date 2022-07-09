import React, { useState, useEffect, FC, ReactElement } from 'react';
import { Input, Form } from 'antd';
import { FormData } from '@/typings/PxToRem';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import './index.less';

const Index: FC = (): ReactElement => {
  const [result, setResult] = useState('');

  // 提交表单
  const onFinish = async (formData: FormData) => {
    const { desgin, target, needTransfromPx } = formData;

    const desginNum = Number(desgin) || 0;
    const targetNum = Number(target) || 0;
    const needTransfromPxNum = Number(needTransfromPx) || 0;

    setResult(((needTransfromPxNum / desginNum) * targetNum).toFixed(0));
  };

  return (
    <div className="PxToRem">
      <ProForm<FormData> onFinish={onFinish}>
        <ProFormText label="设计稿尺寸" name="desgin" />

        <ProFormText label="目标尺寸" name="target" />

        <ProFormText label="需要转换的尺寸" name="needTransfromPx" />
      </ProForm>

      <div
        style={{
          fontSize: 25,
          marginTop: 20,
        }}
      >
        {result}
      </div>
    </div>
  );
};

export default Index;
