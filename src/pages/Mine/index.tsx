import { useState, useEffect, FC, ReactElement } from 'react';

import { Form, Input, Button, message } from 'antd';

import { IMineItem } from '@/typings/Mine';
import { randomNum } from '@/utils/Math';
import { deepClone } from '@/utils/utils';
import './index.less';

const flagRender = (item: IMineItem): string => {
  switch (item.flag) {
    case 0:
      return '';

    case 1:
      return 'F';

    case 2:
      return '?';

    default:
      return '';
  }
};

const Index: FC = (): ReactElement => {
  const [form] = Form.useForm();

  const [mineMap, setMineMap] = useState<IMineItem[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [mapSize, setMapSize] = useState<number>(10);
  const [mineCount, setMineCount] = useState<number>(10);
  const [showIndex, setShowIndex] = useState<number>(-1);
  const [isWin, setIsWin] = useState<boolean>(false);

  /**
   * 设置地雷
   * @param count 地雷总数量
   * @param size  棋盘大小 size * size
   */
  const setMine = (count: number, size: number) => {
    const mineIndexArr: number[] = []; // 地雷位置集合
    setIsWin(false);
    const newMap: IMineItem[] = Array.from(
      { length: size * size },
      (_, index) => ({
        show: false,
        mineCount: 0,
        isMine: false,
        flag: 0,
      }),
    );

    for (let index = 1; index <= count; index++) {
      const num = randomNum(0, size * size - 1);

      if (mineIndexArr.includes(num)) {
        index--;
      } else {
        mineIndexArr.push(num);
      }
    }

    mineIndexArr.forEach((item) => {
      newMap[item].isMine = true;
    });

    for (let index = 0; index < size + 2; index++) {
      newMap.push({
        isMine: false,
        mineCount: 9,
        flag: 0,
        show: false,
      });
    }

    for (let index = size; index > 0; index--) {
      newMap.splice(index * size, 0, {
        isMine: false,
        mineCount: 9,
        flag: 0,
        show: false,
      });

      newMap.splice((index - 1) * size, 0, {
        isMine: false,
        mineCount: 9,
        flag: 0,
        show: false,
      });
    }

    for (let index = 0; index < size + 2; index++) {
      newMap.unshift({
        isMine: false,
        mineCount: 9,
        flag: 0,
        show: false,
      });
    }

    size += 2;
    newMap.forEach((item, index) => {
      item.index = index;
      if (!item?.isMine) return;

      // 默认
      newMap[index - 1]['mineCount']++;
      newMap[index + 1]['mineCount']++;

      newMap[index - size]['mineCount']++;
      newMap[index + size]['mineCount']++;

      newMap[index + size - 1]['mineCount']++;
      newMap[index + size + 1]['mineCount']++;

      newMap[index - size + 1]['mineCount']++;
      newMap[index - size - 1]['mineCount']++;
    });

    setMineMap(newMap);
    setGameOver(false);
  };

  // 点击 - 左击空白格子
  const sureClick = (item: IMineItem, clickIndex: number) => {
    if (item.isMine) return gameFail();
    const size = Number(mapSize) + 2;
    const newMap = deepClone(mineMap);

    function loopExclude(item: IMineItem, clickIndex: number) {
      /**
       * 肯定不是地雷
       */
      if (item.show || item.mineCount >= 9) return;

      item.show = true;
      if (item.mineCount !== 0) return;

      const LeftMine = newMap[clickIndex - 1] || {},
        RightMine = newMap[clickIndex + 1] || {},
        TopMine = newMap[clickIndex - size] || {},
        BottomMine = newMap[clickIndex + size] || {},
        TopLeftMine = newMap[clickIndex - size - 1] || {},
        TopRightMine = newMap[clickIndex - size + 1] || {},
        BottomLeftMine = newMap[clickIndex + size - 1] || {},
        BottomRightMine = newMap[clickIndex + size + 1] || {};

      loopExclude(LeftMine, clickIndex - 1);
      loopExclude(RightMine, clickIndex + 1);
      loopExclude(TopMine, clickIndex - size);
      loopExclude(BottomMine, clickIndex + size);
      loopExclude(TopLeftMine, clickIndex - size - 1);
      loopExclude(BottomLeftMine, clickIndex + size - 1);
      loopExclude(BottomRightMine, clickIndex + size + 1);
      loopExclude(TopRightMine, clickIndex - size + 1);
    }

    loopExclude(newMap[clickIndex], clickIndex);

    setMineMap([...newMap]);
  };

  // 右键点击
  const rightClick = (
    item: IMineItem,
    index,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (item.show) return;

    const newMap = [...mineMap];
    const newItem = newMap[index];

    newItem.flag !== 2 ? newItem.flag++ : (newItem.flag = 0);
    setMineMap(newMap);
  };

  // 已经展示的格子点击 - 排雷操作
  const showClick = (index: number) => {
    const size = mapSize + 2;
    const newMap = deepClone(mineMap);
    const nearFlag = [
      newMap[index + 1],
      newMap[index - 1],
      newMap[index + size],
      newMap[index - size],
      newMap[index + size + 1],
      newMap[index + size - 1],
      newMap[index - size + 1],
      newMap[index - size - 1],
    ];

    if (
      !nearFlag.every((item) => {
        if (item.flag === 1 && !item.isMine) return false;
        return true;
      })
    ) {
      return gameFail();
    } else if (nearFlag.every((item) => (item.flag === 1) === item.isMine)) {
      nearFlag.forEach((item) => loopExclude(item, item.index as number));
      setMineMap(newMap);
    }

    function loopExclude(item: IMineItem, clickIndex: number) {
      if (item.show || item.mineCount >= 9 || item.isMine) return;

      item.show = true;
      if (item.mineCount !== 0) return;

      const Left = clickIndex - 1,
        Right = clickIndex + 1,
        Top = clickIndex - size,
        Bottom = clickIndex + size,
        TopLeft = clickIndex - size - 1,
        TopRight = clickIndex - size + 1,
        BottomLeft = clickIndex + size - 1,
        BottomRight = clickIndex + size + 1;

      loopExclude(newMap[Top] || {}, Top);
      loopExclude(newMap[Left] || {}, Left);
      loopExclude(newMap[Right] || {}, Right);
      loopExclude(newMap[Bottom] || {}, Bottom);
      loopExclude(newMap[TopLeft] || {}, TopLeft);
      loopExclude(newMap[TopRight] || {}, TopRight);
      loopExclude(newMap[BottomLeft] || {}, BottomLeft);
      loopExclude(newMap[BottomRight] || {}, BottomRight);
    }

    setShowIndex(index);
  };

  // 排雷效果展示
  const showIndexNear = (index): boolean => {
    const size = mapSize + 2;
    return (
      index + 1 === showIndex ||
      index - 1 === showIndex ||
      index + size === showIndex ||
      index - size === showIndex ||
      index + size + 1 === showIndex ||
      index + size - 1 === showIndex ||
      index - size + 1 === showIndex ||
      index - size - 1 === showIndex
    );
  };

  // 游戏胜利 - 把所有不是雷全点了
  const gameWin = () => {
    setIsWin(true);
  };

  // 游戏失败 - 排雷失败 || 点击到雷
  const gameFail = () => {
    const newMap = deepClone(mineMap).map((item) =>
      item.isMine ? { ...item, show: true } : item,
    );

    setMineMap(newMap);
    setGameOver(true);
  };

  // 开始游戏
  const gameStart = () => {
    form
      .validateFields()
      .then((res) => {
        let { mapSize = 0, mineCount = 0 } = res;
        mapSize = Number(mapSize);
        mineCount = Number(mineCount);

        if (!mapSize || !mineCount)
          return Promise.reject('请输入正确游戏规则！');

        if (mineCount > mapSize * mapSize)
          return Promise.reject('地雷数量不能大于区域大小！');

        if (mapSize > 20) return Promise.reject('区域大小不得大于20！');

        setMapSize(mapSize);
        setMineCount(mineCount);
        setMine(mineCount, mapSize);
      })
      .catch((err) => message.error(err));
  };

  useEffect(() => {
    if (
      mineMap.filter((item) => !item.show && item.mineCount < 9).length ===
      mineCount
    )
      gameWin();
  }, [mineMap]);

  return (
    <div className="Mine">
      <Form
        layout="inline"
        form={form}
        initialValues={{
          mapSize: 10,
          mineCount: 10,
        }}
      >
        <Form.Item label="区域大小" name="mapSize">
          <Input />
        </Form.Item>

        <Form.Item label="生成地雷数" name="mineCount">
          <Input />
        </Form.Item>
      </Form>

      <div className="mine-btns">
        <Button
          type="primary"
          onClick={gameStart}
          style={{
            marginTop: 20,
          }}
        >
          生成游戏
        </Button>
      </div>

      {!!mapSize && (
        <div
          className="mine-map"
          style={{
            width: mapSize * 50 + 2,
            height: mapSize * 50 + 2,
          }}
        >
          {mineMap.map((item, index) => (
            <div
              key={index}
              className={[
                'mine-item',
                item.isMine ? 'map-mine' : 'map-tip',
              ].join(' ')}
              style={item.mineCount >= 9 ? { display: 'none' } : {}}
              onMouseDown={() => (item.show ? showClick(index) : undefined)}
              onMouseUp={() => setShowIndex(-1)}
              onContextMenu={(e) => e.preventDefault()}
            >
              {item.show ? (
                item.isMine ? (
                  'X'
                ) : (
                  item.mineCount || ''
                )
              ) : (
                <span
                  className={[
                    'item-notClick',
                    showIndexNear(index) && 'item-check',
                  ].join(' ')}
                  onClick={() =>
                    gameOver ? undefined : sureClick(item, index)
                  }
                  onContextMenu={(e) => rightClick(item, index, e)}
                >
                  {flagRender(item)}
                </span>
              )}
            </div>
          ))}

          {isWin && <div className="win">You Win !</div>}
        </div>
      )}
    </div>
  );
};

export default Index;
