import type { CSSProperties, ReactNode } from 'react';
import { codeToHtml } from 'shiki';
import type { CodeExcerpt } from '@/data/cases';

// `backticks` in a caption become <code>.
const inlineCode = (text: string): ReactNode[] =>
  text.split(/`([^`]+)`/).map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part));

// A real excerpt from a project's code, highlighted on the server at build
// time: the page ships plain HTML and no highlighting JavaScript.
export default async function CodeBlock({ code }: { code: CodeExcerpt }) {
  const html = await codeToHtml(code.source, { lang: code.lang, theme: 'github-dark-default' });
  const lines = code.source.split('\n').length;

  return (
    <figure className="code">
      <div className="code-bar">
        <span className="code-file">{code.file}</span>
        {code.href ? (
          <a href={code.href} target="_blank" rel="noopener noreferrer" className="code-link">
            View on GitHub ↗
          </a>
        ) : (
          <span className="code-link">Private repository</span>
        )}
      </div>
      <div
        className="code-body"
        style={{ '--gutter': `${String(lines).length + 1}ch` } as CSSProperties}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <figcaption>{inlineCode(code.caption)}</figcaption>
    </figure>
  );
}
