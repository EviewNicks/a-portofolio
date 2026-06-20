'use client'

import { ErrorBoundary } from 'react-error-boundary'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { cn } from '@/lib/utils'
import 'highlight.js/styles/github-dark.css'
import type { ComponentPropsWithoutRef } from 'react'

interface MarkdownContentProps {
  content: string
  className?: string
}

function getLanguage(className?: string): string | null {
  const match = /language-(\w+)/.exec(className ?? '')
  return match ? match[1] : null
}

function PreBlock({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  let lang: string | null = null
  if (children && typeof children === 'object' && 'props' in (children as object)) {
    const child = children as React.ReactElement<{ className?: string }>
    lang = getLanguage(child.props?.className)
  }

  const childWithMarker =
    children && typeof children === 'object' && 'props' in (children as object)
      ? {
          ...(children as React.ReactElement),
          props: {
            ...(children as React.ReactElement<Record<string, unknown>>).props,
            'data-block': true,
          },
        }
      : children

  return (
    <div className="relative my-4 overflow-hidden rounded-xl border border-line bg-ink text-paper">
      {lang && (
        <span className="absolute top-3 right-4 z-10 font-editorial-mono text-[0.625rem] font-medium uppercase tracking-[0.18em] text-paper/40 select-none">
          {lang}
        </span>
      )}
      <pre className="m-0 overflow-x-auto p-5" {...props}>
        {childWithMarker as React.ReactNode}
      </pre>
    </div>
  )
}

function CodeBlock({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'code'> & {
  node?: { tagName?: string; position?: unknown }
}) {
  const isBlock =
    className?.includes('language-') ||
    (props as Record<string, unknown>)['data-block'] === true

  if (isBlock || className) {
    return (
      <code className={cn('hljs block text-xs leading-relaxed', className)} {...props}>
        {children}
      </code>
    )
  }

  return (
    <code
      className="border-line-soft bg-paper-warm px-1.5 py-0.5 font-editorial-mono text-[0.85em] text-coral"
      {...props}
    >
      {children}
    </code>
  )
}

function MarkdownRenderer({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn('markdown-content', className)}>
      <style>{`
        .markdown-content {
          color: var(--ink-soft);
          font-family: var(--font-editorial-body);
          font-size: 0.95rem;
          line-height: 1.75;
        }

        .markdown-content h1 {
          font-family: var(--font-editorial-tight);
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--ink);
          border-bottom: 1px solid var(--line);
          padding-bottom: 0.4rem;
          margin: 1.8rem 0 1rem;
        }

        .markdown-content h2 {
          font-family: var(--font-editorial-tight);
          font-size: 1.4rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: var(--ink);
          border-bottom: 1px solid var(--line);
          padding-bottom: 0.3rem;
          margin: 1.6rem 0 0.8rem;
        }

        .markdown-content h3 {
          font-family: var(--font-editorial-tight);
          font-size: 1.15rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin: 1.4rem 0 0.6rem;
        }

        .markdown-content h4 {
          font-family: var(--font-editorial-tight);
          font-size: 1.05rem;
          font-weight: 800;
          line-height: 1.2;
          color: var(--ink);
          margin: 1.2rem 0 0.5rem;
        }

        .markdown-content p {
          margin: 0.8rem 0;
          color: var(--ink-soft);
        }

        .markdown-content ul {
          list-style: disc;
          padding-left: 1.5rem;
          margin: 0.8rem 0;
          color: var(--ink-soft);
        }

        .markdown-content ol {
          list-style: decimal;
          padding-left: 1.5rem;
          margin: 0.8rem 0;
          color: var(--ink-soft);
        }

        .markdown-content li {
          margin: 0.35rem 0;
        }

        .markdown-content li::marker {
          color: var(--coral);
        }

        .markdown-content strong {
          font-weight: 700;
          color: var(--ink);
        }

        .markdown-content a {
          color: var(--coral);
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px solid var(--line);
          transition: color 160ms ease, border-color 160ms ease;
        }

        .markdown-content a:hover {
          color: var(--coral);
          border-color: var(--coral);
        }

        .markdown-content hr {
          border: none;
          border-top: 1px solid var(--line);
          margin: 1.8rem 0;
        }

        .markdown-content blockquote {
          border-left: 4px solid var(--coral);
          background: var(--paper-warm);
          padding: 0.75rem 1rem;
          margin: 1rem 0;
          border-radius: 0 0.75rem 0.75rem 0;
          color: var(--ink-soft);
          font-style: italic;
        }

        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
          margin: 1.2rem 0;
          border: 1px solid var(--line);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .markdown-content th {
          background: var(--paper-warm);
          color: var(--ink);
          font-weight: 700;
          padding: 0.6rem 0.8rem;
          text-align: left;
          border-bottom: 1px solid var(--line);
        }

        .markdown-content td {
          padding: 0.6rem 0.8rem;
          color: var(--ink-soft);
          border-bottom: 1px solid var(--line-soft);
        }

        .markdown-content tbody tr:nth-child(even) {
          background: var(--paper);
        }
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
  )
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <ErrorBoundary
      fallbackRender={() => (
        <div
          className={cn(
            'whitespace-pre-wrap border-line bg-paper-warm/50 p-4 font-editorial-mono text-sm text-ink-faint',
            className
          )}
        >
          {content}
        </div>
      )}
    >
      <MarkdownRenderer content={content} className={className} />
    </ErrorBoundary>
  )
}
