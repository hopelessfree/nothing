import { FC, useState, useEffect, ReactElement } from 'react';

import { Row, Col, Anchor } from 'antd';

import { AnchorLinkProps } from 'antd/lib/anchor';
import ReactMarkdown from 'hyperdown';
import '../index.less';
const { Link } = Anchor;

interface IProps {
  source: string;
}

const MarkdownHTML: FC<IProps> = (props): ReactElement => {
  const [anchorList, setAnchorList] = useState<Array<AnchorLinkProps>>([]);

  const { source } = props;
  const parse = new ReactMarkdown();
  const MarkdowmHTML = parse.makeHtml(source);

  useEffect(() => {
    // 把所有链接改为新页面打开
    document.querySelectorAll('a').forEach((item) => {
      item.target = '_blank';
    });

    const anchorList: Array<AnchorLinkProps> = [];

    // 为每个标题添加锚点
    document.querySelectorAll('h2').forEach((item) => {
      if (item.childElementCount) {
        item.id = item.children[0]?.innerHTML;
      } else {
        item.id = item.innerHTML;
      }

      anchorList.push({
        title: item.id,
        href: item.id,
      });
    });

    setAnchorList(anchorList);
  }, []);

  return (
    <Row className="win">
      <Col span={20}>
        <div dangerouslySetInnerHTML={{ __html: MarkdowmHTML }} />
      </Col>

      {/* 导航栏 */}
      <Col span={4}>
        <Anchor
          offsetTop={100}
          showInkInFixed={false}
          style={{
            width: 200,
            background: 'transparent',
          }}
          onClick={(e, link) => {
            e.preventDefault();
            if (link.href) {
              let ele = document.getElementById(link.href);
              ele &&
                ele.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
          }}
        >
          {anchorList.map((item) => (
            <Link key={item.href} {...item} />
          ))}
        </Anchor>
      </Col>
    </Row>
  );
};

export default MarkdownHTML;
