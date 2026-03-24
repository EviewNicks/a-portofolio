'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';
import 'highlight.js/styles/github-dark.css';
import type { ComponentPropsWithoutRef } from 'react';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

function getLanguage(className?: string): string | null {
  const match = /language-(\w+)/.exec(className ?? '');
  return match ? match[1] : null;
}

// Custom pre — wraps code block with language badge, injects data-block to child
function PreBlock({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  let lang: string | null = null;
  if (children && typeof children === 'object' && 'props' in (children as object)) {
    const child = children as React.ReactElement<{ className?: string }>;
    lang = getLanguage(child.props?.className);
  }

  // Clone child code element and inject data-block=true so CodeBlock knows it's a block
  const childWithMarker =
    children && typeof children === 'object' && 'props' in (children as object)
      ? {
          ...(children as React.ReactElement),
          props: {
            ...(children as React.ReactElement<Record<string, unknown>>).props,
            'data-block': true,
          },
        }
      : children;

  return (
    <div className="relative my-4">
      {lang && (
        <span className="absolute top-2 right-3 z-10 text-[10px] font-mono text-white/40 select-none uppercase tracking-wider">
          {lang}
        </span>
      )}
      <pre className="rounded-lg overflow-x-auto m-0 p-0 border-0 bg-transparent" {...props}>
        {childWithMarker as React.ReactNode}
      </pre>
    </div>
  );
}

// Custom code — block (inside pre) vs inline
// react-markdown passes node prop; block code always has a parent <pre>
function CodeBlock({ className, children, node, ...props }: ComponentPropsWithoutRef<'code'> & { node?: { tagName?: string; position?: unknown } }) {
  // If className has language-* OR parent is pre (node.tagName check not available here,
  // but react-markdown only renders <code> inside <pre> for fenced blocks)
  // We use PreBlock to wrap, so any <code> rendered by PreBlock is a block code.
  // Distinguish: inline code has no className; block code may or may not have language class.
  // The reliable signal: block code is rendered as child of our PreBlock (which sets data-block).
  const isBlock = Boolean(className?.includes('language-')) || Boolean((props as Record<string, unknown>)['data-block']);

  if (isBlock || className) {
    // Block code — let hljs handle styling
    return (
      <code className={cn('hljs text-xs leading-relaxed block', className)} {...props}>
        {children}
      </code>
    );
  }

  // Inline code
  return (
    <code
      className="text-[#e06c75] bg-foreground/10 px-1.5 py-0.5 rounded text-[0.8em] font-mono"
      {...props}
    >
      {children}
    </code>
  );
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn('markdown-content', className)}>
      <style>{`
        .markdown-content { color: hsl(var(--foreground)); font-size: 0.9rem; line-height: 1.7; }

        /* Headings */
        .markdown-content h1 { font-size: 1.75rem; font-weight: 700; border-bottom: 1px solid hsl(var(--border)); padding-bottom: 0.4rem; margin: 1.5rem 0 1rem; color: hsl(var(--foreground)); }
        .markdown-content h2 { font-size: 1.35rem; font-weight: 600; border-bottom: 1px solid hsl(var(--border)); padding-bottom: 0.3rem; margin: 1.4rem 0 0.8rem; color: hsl(var(--foreground)); }
        .markdown-content h3 { font-size: 1.1rem; font-weight: 600; margin: 1.2rem 0 0.6rem; color: hsl(var(--foreground)); }
        .markdown-content h4 { font-size: 1rem; font-weight: 600; margin: 1rem 0 0.5rem; color: hsl(var(--foreground)); }

        /* Paragraph */
        .markdown-content p { margin: 0.6rem 0; color: hsl(var(--muted-foreground)); }

        /* Lists */
        .markdown-content ul { list-style: disc; padding-left: 1.5rem; margin: 0.6rem 0; color: hsl(var(--muted-foreground)); }
        .markdown-content ol { list-style: decimal; padding-left: 1.5rem; margin: 0.6rem 0; color: hsl(var(--muted-foreground)); }
        .markdown-content li { margin: 0.25rem 0; }
        .markdown-content li::marker { color: hsl(var(--foreground) / 0.5); }

        /* Strong always foreground */
        .markdown-content strong { font-weight: 600; color: hsl(var(--foreground)); }

        /* Links */
        .markdown-content a { color: hsl(var(--primary)); text-decoration: none; }
        .markdown-content a:hover { text-decoration: underline; }

        /* HR */
        .markdown-content hr { border: none; border-top: 1px solid hsl(var(--border)); margin: 1.5rem 0; }

        /* Blockquote */
        .markdown-content blockquote { border-left: 4px solid hsl(var(--primary) / 0.4); background: hsl(var(--foreground) / 0.03); padding: 0.5rem 1rem; margin: 0.8rem 0; border-radius: 0 0.375rem 0.375rem 0; color: hsl(var(--muted-foreground)); font-style: italic; }

        /* Table */
        .markdown-content table { width: 100%; border-collapse: collapse; font-size: 0.875rem; margin: 1rem 0; border: 1px solid hsl(var(--border)); border-radius: 0.5rem; overflow: hidden; }
        .markdown-content th { background: hsl(var(--foreground) / 0.05); color: hsl(var(--foreground)); font-weight: 600; padding: 0.5rem 0.75rem; text-align: left; border-bottom: 1px solid hsl(var(--border)); }
        .markdown-content td { padding: 0.5rem 0.75rem; color: hsl(var(--muted-foreground)); border-bottom: 1px solid hsl(var(--border) / 0.5); }
        .markdown-content tbody tr:nth-child(even) { background: hsl(var(--foreground) / 0.02); }
      `}</style>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: PreBlock,
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
