import React, { useEffect, useState } from 'react';
import { ArrowLeft, Loader } from 'lucide-react';

function resolveAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

function resolveMarkdownUrl(url: string) {
  if (/^https?:\/\//.test(url)) return url;
  return resolveAsset(url);
}

function parseInline(text: string) {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      parts.push(
        <a key={match.index} href={resolveMarkdownUrl(match[2])} target={/^https?:\/\//.test(match[2]) ? '_blank' : undefined} rel={/^https?:\/\//.test(match[2]) ? 'noopener noreferrer' : undefined} className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4">
          {match[1]}
        </a>,
      );
    } else if (match[3]) {
      parts.push(
        <code key={match.index} className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[0.9em] font-semibold text-blue-800">
          {match[3]}
        </code>,
      );
    } else if (match[4]) {
      parts.push(<strong key={match.index}>{match[4]}</strong>);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function renderMarkdown(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const nodes: React.ReactNode[] = [];
  let listItems: string[] = [];
  let codeLines: string[] = [];
  let codeLanguage = '';
  let isInCodeBlock = false;

  const flushList = () => {
    if (!listItems.length) return;
    nodes.push(
      <ul key={`list-${nodes.length}`} className="my-4 space-y-2 pl-5 text-sm font-medium leading-relaxed text-slate-600">
        {listItems.map(item => (
          <li key={item} className="list-disc">{parseInline(item)}</li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      flushList();

      if (isInCodeBlock) {
        nodes.push(
          <div key={`code-${index}`} className="my-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-sm">
            {codeLanguage && (
              <div className="border-b border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {codeLanguage}
              </div>
            )}
            <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-100">
              <code>{codeLines.join('\n')}</code>
            </pre>
          </div>,
        );
        codeLines = [];
        codeLanguage = '';
        isInCodeBlock = false;
      } else {
        isInCodeBlock = true;
        codeLanguage = trimmed.slice(3).trim();
      }
      return;
    }

    if (isInCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();

    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      nodes.push(
        <figure key={index} className="my-6 overflow-hidden rounded-2xl border border-white/70 bg-white/70 p-2 shadow-sm">
          <img src={resolveMarkdownUrl(imageMatch[2])} alt={imageMatch[1]} className="w-full rounded-xl object-cover" />
          {imageMatch[1] && <figcaption className="px-2 pb-1 pt-2 text-center text-xs font-medium text-slate-500">{imageMatch[1]}</figcaption>}
        </figure>,
      );
    } else if (trimmed.startsWith('# ')) {
      nodes.push(<h1 key={index} className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{parseInline(trimmed.slice(2))}</h1>);
    } else if (trimmed.startsWith('## ')) {
      nodes.push(<h2 key={index} className="mt-8 text-xl font-bold tracking-tight text-slate-900">{parseInline(trimmed.slice(3))}</h2>);
    } else if (trimmed.startsWith('### ')) {
      nodes.push(<h3 key={index} className="mt-6 text-base font-bold tracking-tight text-slate-800">{parseInline(trimmed.slice(4))}</h3>);
    } else if (trimmed.startsWith('> ')) {
      nodes.push(
        <blockquote key={index} className="my-5 rounded-2xl border border-blue-200 bg-blue-50/80 p-4 text-sm font-medium leading-relaxed text-slate-600">
          {parseInline(trimmed.slice(2))}
        </blockquote>,
      );
    } else {
      nodes.push(<p key={index} className="my-4 text-sm font-medium leading-relaxed text-slate-600">{parseInline(trimmed)}</p>);
    }
  });

  flushList();
  if (isInCodeBlock) {
    nodes.push(
      <div key="code-unclosed" className="my-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-sm">
        {codeLanguage && (
          <div className="border-b border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {codeLanguage}
          </div>
        )}
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-100">
          <code>{codeLines.join('\n')}</code>
        </pre>
      </div>,
    );
  }
  return nodes;
}

export function KolMarkdownPage({ markdownPath }: { markdownPath: string }) {
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(false);

    fetch(resolveAsset(markdownPath))
      .then(response => {
        if (!response.ok) throw new Error('Markdown not found');
        return response.text();
      })
      .then(text => {
        if (!cancelled) {
          setMarkdown(text);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [markdownPath]);

  return (
    <div className="min-h-screen bg-[#E6F0FA] bg-gradient-to-br from-[#DAE8F7] via-[#E8F4F8] to-[#EEF4FC] px-4 py-8 font-sans">
      <article className="mx-auto max-w-2xl rounded-[2rem] border border-white/70 bg-white/60 p-6 shadow-[0_24px_60px_rgba(50,100,150,0.14)] backdrop-blur-xl sm:p-8">
        <a href="/kol" className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-sm transition hover:bg-white">
          <ArrowLeft className="h-4 w-4" />
          Back to KOL
        </a>

        {isLoading && (
          <div className="flex min-h-60 items-center justify-center">
            <Loader className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        )}

        {error && <p className="text-sm font-medium text-slate-600">Could not load this document.</p>}

        {!isLoading && !error && <div>{renderMarkdown(markdown)}</div>}
      </article>
    </div>
  );
}
