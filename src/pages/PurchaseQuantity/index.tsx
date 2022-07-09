import './index.less';
import { FC, ReactElement, useState, useEffect } from 'react';
import { Button } from 'antd';
import ProForm, {
  ProFormText,
  ProFormList,
  ProFormSelect,
} from '@ant-design/pro-form';
import {
  PurchaseQuantityFromProps,
  PurchaseQuantityItemProps,
  PurchaseQuantityTableProps,
} from '@/typings/PurchaseQuantity';
import { numberOperation } from '@/utils/Number';
import ProTable, { ProColumnType } from '@ant-design/pro-table';

const Index: FC = (): ReactElement => {
  const [source, setSource] = useState<PurchaseQuantityTableProps[]>([]);
  const [form] = ProForm.useForm<PurchaseQuantityFromProps>();

  const dayLengthSource = Array.from({ length: 30 }, (_, index) => ({
    value: index + 1,
    label: `${index + 1}天`,
  }));

  const limitSource = Array.from({ length: 12 }, (_, index) => ({
    value: numberOperation(0.25, index + 1, { mode: 'mul' }) as number,
    label: 25 * (index + 1) + '%',
  }));

  // 列表项
  const columns: ProColumnType<PurchaseQuantityTableProps>[] = [
    {
      title: '商品属性',
      dataIndex: 'name',
    },
    {
      title: '需进货/天',
      dataIndex: 'futureDaySale',
    },
    {
      title: '进货总数量',
      dataIndex: 'futureTotal',
    },
  ].map((item) => ({
    ...item,
    align: 'center',
  }));

  // 批量填充
  const batchFill = () => {
    const values = form.getFieldsValue();
    const {
      items,
      beforeCountDefault,
      afterCountDefault,
      beforeDaysDefault,
      afterDaysDefault,
    } = values;

    const newItems: PurchaseQuantityItemProps[] = items.map((item) => ({
      beforeCount: beforeCountDefault || item.beforeCount,
      afterCount: afterCountDefault || item.afterCount,
      beforeDays: beforeDaysDefault || item.beforeDays,
      afterDays: afterDaysDefault || item.afterDays,
    }));

    form.setFieldsValue({ items: newItems });
  };

  // 表单提交完成
  const onFinish = async (
    formData: PurchaseQuantityFromProps,
  ): Promise<undefined> => {
    const { items, futureDays = 1, futureLimit } = formData;

    const tableSource: PurchaseQuantityTableProps[] = items.map((item) => {
      const { beforeCount, beforeDays, afterCount, afterDays } = item;

      /**
       * (下一段数据 - 上一段数据) / 上一段数据 * 下一段数据
       *
       */
      const beforeDaySale = numberOperation(beforeCount, beforeDays, {
        mode: 'div',
      }) as number;
      const afterDaySale = numberOperation(afterCount, afterDays, {
        mode: 'div',
      }) as number;

      const growDaySaleMagnification =
        futureLimit &&
        futureLimit + 1 <
          numberOperation(afterDaySale, beforeDaySale, {
            mode: 'div',
          })
          ? futureLimit + 1
          : (numberOperation(afterDaySale, beforeDaySale, {
              mode: 'div',
            }) as number) - 1;

      const futureDaySale = numberOperation(
        afterDaySale,
        growDaySaleMagnification,
        { mode: 'mul', decimals: 1 },
      ) as string;

      return {
        futureDaySale,
        name: item.name || '',
        futureTotal: Number(futureDaySale) * futureDays,
      };
    });

    setSource(tableSource);

    return;
  };

  return (
    <div>
      <ProForm form={form} onFinish={onFinish}>
        <ProForm.Group size={8}>
          {/* 批量填充 - 第一段数据总数 */}
          <ProFormText name="beforeCountDefault" width="xs" />

          {/* 批量填充 - 第一段数据天数 */}
          <ProFormSelect
            name="beforeDaysDefault"
            options={dayLengthSource}
            width="xs"
          />

          {/* 批量填充 - 第二段数据总数 */}
          <ProFormText name="afterCountDefault" width="xs" />

          {/* 批量填充 - 第二段数据天数 */}
          <ProFormSelect
            name="afterDaysDefault"
            options={dayLengthSource}
            width="xs"
          />

          {/* 批量填充 - 按钮 */}
          <ProForm.Item>
            <Button onClick={batchFill}>批量填充</Button>
          </ProForm.Item>
        </ProForm.Group>

        <ProFormList name="items" initialValue={[{}]}>
          <ProForm.Group size={8}>
            <ProFormText label="上一段数据" name="beforeCount" width="xs" />

            <ProFormSelect
              label="天数"
              name="beforeDays"
              options={dayLengthSource}
              width="xs"
            />

            <ProFormText label="下一段数据" name="afterCount" width="xs" />

            <ProFormSelect
              label="天数"
              name="afterDays"
              options={dayLengthSource}
              width="xs"
            />

            <ProFormText label="商品属性" name="name" width={400} />
          </ProForm.Group>
        </ProFormList>

        <ProForm.Group>
          <ProFormSelect
            label="下一次进货天数"
            name="futureDays"
            options={dayLengthSource}
            initialValue={1}
          />

          <ProFormSelect
            label="最大提升限额"
            name="futureLimit"
            options={limitSource}
          />
        </ProForm.Group>
      </ProForm>

      {/* 表格  */}
      <ProTable
        search={false}
        columns={columns}
        dataSource={source}
        style={{
          marginTop: 20,
        }}
        tableStyle={{
          padding: 0,
        }}
      />
    </div>
  );
};

export default Index;
