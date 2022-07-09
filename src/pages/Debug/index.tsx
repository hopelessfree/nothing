import { FC, ReactElement, useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { requestTimeout } from './service';

const Index: FC = (): ReactElement => {
  const [content, setContent] = useState('123');

  useEffect(() => {
  }, [content]);

  function onInput(event) {
    console.log(event.target.innerText, event.target.innerHTML)
    setContent(event.target.innerHTML);
  }

  function onClick() {
    setContent(
      (content) =>
        content +
        "<span style='color:red;margin-right:4px;'>hashTag</span>&nbsp;",
    );
  }

  return (
    <div>
      <div
        contentEditable
        suppressContentEditableWarning
        style={{
          width: 400,
          height: 400,
          background: 'pink',
        }}
        onInput={onInput}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <Button onClick={onClick} style={{ marginTop: 20 }}>
        添加
      </Button>
    </div>
  );
};

export default Index;
