import Moment from 'moment';

import AddNewPlanModal, { Ref as AddNewPlanModalRef } from './AddNewPlanModal';

import EditCurrentPlanModal, {
  Ref as EditCurrentPlanModalRef,
} from './EditCurrentPlanModal';

import {
  FC,
  useRef,
  useState,
  useEffect,
  useReducer,
  ReactElement,
} from 'react';

import { SourceItem } from '@/typings/Plan';

import { Space, Table, Button, Checkbox, DatePicker } from 'antd';

import { ColumnsType } from 'antd/lib/table';

import { reducer, ActionType, initialState } from './Source';

const Index: FC = (): ReactElement => {
  const AddNewPlanModalRef = useRef<AddNewPlanModalRef>(null);
  const EditCurrentPlanModalRef = useRef<EditCurrentPlanModalRef>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [plan, setPlan] = useState<SourceItem[]>([]);
  const [day, setDay] = useState<number>(Moment().startOf('day').valueOf());

  /**
   * 更新任务状态
   * @param key 点击更新的key
   */
  function updateFinish(key: string) {
    const newPlan = plan.map((item) =>
      item.key === key ? ((item.finish = !item.finish), { ...item }) : item,
    );

    setPlan(newPlan);
  }

  /**
   * 更新当前任务列表
   */
  function updatePlan() {
    const plan = state.source.get(day)!;
    setPlan(plan);
  }

  function updateSource(plan: SourceItem[], days: number[] = [day]) {
    for (const day of days) {
      state.source.set(day, plan);
    }
    dispatch({ type: ActionType.UPDATE });
  }

  /**
   * 修改当前计划
   */
  function editPlan() {
    EditCurrentPlanModalRef.current?.onShow();
  }

  /**
   * 添加计划
   */
  function addPlan(plan: SourceItem[], days: number[]) {
    for (const day of days) {
      const source = state.source.get(day) || [];
      state.source.set(day, [...source, ...plan]);
    }
    dispatch({ type: ActionType.UPDATE });
  }

  const columns: ColumnsType<SourceItem> = [
    {
      title: '计划内容',
      dataIndex: 'content',
    },
    {
      title: '完成',
      dataIndex: 'finish',
      width: 100,
      render: (value, record) => (
        <Checkbox
          checked={value}
          onClick={() => {
            updateFinish(record['key']);
          }}
        />
      ),
    },
  ];

  // [day]
  useEffect(() => {
    updatePlan();
  }, [day, state.source]);

  return (
    <div className="Plan">
      <Space>
        <DatePicker
          allowClear={false}
          value={Moment(day)}
          onChange={(date) => {
            setDay(date!.startOf('day').valueOf());
          }}
          disabledDate={(date) =>
            !state.days.includes(date.startOf('day').valueOf())
          }
        />

        <Button type="primary" children={'修改计划'} onClick={editPlan} />

        <Button
          type="primary"
          children={'添加计划'}
          onClick={AddNewPlanModalRef.current?.onShow}
        />
      </Space>

      <Table
        style={{ marginTop: 16 }}
        pagination={false}
        rowKey={'key'}
        dataSource={plan}
        columns={columns.map((item) => ({
          ...item,
          align: 'center',
        }))}
      />

      <EditCurrentPlanModal
        source={plan}
        ref={EditCurrentPlanModalRef}
        onSubmit={updateSource}
      />

      <AddNewPlanModal ref={AddNewPlanModalRef} onSubmit={addPlan} />
    </div>
  );
};

export default Index;
