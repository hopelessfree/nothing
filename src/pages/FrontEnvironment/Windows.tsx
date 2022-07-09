import { FC, ReactElement } from 'react';
import MarkdownHTML from './components/MarkdownHtml';
const document = require('@/documents/Windows.md').default;

const Index: FC = (): ReactElement => <MarkdownHTML source={document} />;

export default Index;
