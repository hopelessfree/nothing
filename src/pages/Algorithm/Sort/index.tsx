import { useState, useEffect, FC, ReactElement } from 'react';
import { Button } from 'antd';
import { createNumbers, sortBubble } from './data';
import { BubbleItem } from '@/typings/Sort';
import './index.less';

let Timer: NodeJS.Timeout;
let State: 0 | 1 | 2 = 0;
const Index: FC = (): ReactElement => {
  const [numbers, setNumbers] = useState<BubbleItem[]>([]);

  /**
   * 重置
   * @param length 长度
   */
  function reset(length = 10): void {
    setNumbers(createNumbers(length));
  }

  function suspend() {
    State = 2;
    clearTimeout(Timer);
  }

  /**
   * 开始
   */
  function start() {
    if (numbers.every((item) => item.finish === true)) return undefined;
    console.log('start');
    State = 1;
    setNumbers((val) => sortBubble(val));
  }

  useEffect(() => {
    if (State === 0 || State === 2) {
      return;
    }
    setTimeout(start, 2000);
  }, [numbers]);

  useEffect(() => {
    console.log('numbers', numbers);
  }, [numbers]);

  // 初始化函数
  useEffect(() => {
    reset(15);
  }, []);

  return (
    <div className="Sort">
      <div className="Sort-operation">
        <Button onClick={start}>开始</Button>

        <Button onClick={suspend} style={{ marginLeft: 10 }}>
          暂停
        </Button>

        <Button onClick={() => reset} style={{ marginLeft: 10 }}>
          重置
        </Button>
      </div>

      <div className="Sort-container">
        {numbers.length > 0 &&
          numbers.map((number) => (
            <div
              key={number.num}
              className="Sort-item"
              style={{
                height: number.num * 40,
                background:
                  ((number.current || number.next) && 'green') ||
                  (number.finish && 'yellow') ||
                  'pink',
              }}
            >
              {number.num}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Index;
