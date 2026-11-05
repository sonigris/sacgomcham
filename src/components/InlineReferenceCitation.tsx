import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { ReferenceSource } from '../types/archive';
import {
  PENDING_SOURCE_VERIFICATION,
  REFERENCE_VILLAGE_SCOPE_LABELS,
  SOURCE_CATEGORY_METADATA,
} from '../data/referenceSources';

interface InlineReferenceCitationProps {
  referenceIds: string[];
  allReferences: ReferenceSource[];
  attributionNote?: string;
  label?: string;
  compact?: boolean;
  onNavigateToReferences?: (highlightRefId?: string) => void;
}

export const InlineReferenceCitation: React.FC<InlineReferenceCitationProps> = ({
  referenceIds,
  allReferences,
  attributionNote,
  label = 'Nguồn tham khảo đối chiếu',
  compact = false,
  onNavigateToReferences,
}) => {
  const matchedSources = referenceIds
    .map((id) => allReferences.find((r) => r.id === id))
    .filter((r): r is ReferenceSource => Boolean(r));

  if (matchedSources.length === 0) {
    return (
      <div className="pt-3 border-t border-[#E2D9C8] text-xs space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[#6B5B4E]">
            <strong className="font-semibold text-[#1F1A17]">{label}:</strong>{' '}
            <span className="italic text-[#9A5B25] font-medium">
              {PENDING_SOURCE_VERIFICATION}
            </span>
          </span>
          {onNavigateToReferences && (
            <button
              type="button"
              onClick={() => onNavigateToReferences()}
              className="inline-flex items-center gap-1 font-medium text-[#8C2F1B] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Quản lý nguồn tham khảo</span>
            </button>
          )}
        </div>
        {attributionNote && (
          <p className="text-[#6B5B4E] leading-relaxed">{attributionNote}</p>
        )}
      </div>
    );
  }

  if (compact) {
    return (
      <div className="pt-3 border-t border-[#EDE6DA] text-xs space-y-1.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#5C4D42]">
          <span className="font-semibold text-[#1F1A17]">{label}:</span>
          {matchedSources.map((src, index) => {
            const isPending = src.verificationStatus === 'dang-cho-xac-minh';
            return (
              <React.Fragment key={src.id}>
                {index > 0 && <span aria-hidden="true">·</span>}
                {onNavigateToReferences ? (
                  <button
                    type="button"
                    onClick={() => onNavigateToReferences(src.id)}
                    className="text-left hover:text-[#8C2F1B] hover:underline underline-offset-4 transition-colors"
                  >
                    <span className="font-mono text-[#8C2F1B]">[{src.id}]</span>{' '}
                    <span>{src.publisherOrAuthor}</span>{' '}
                    <span className="text-[#78695D]">
                      ({isPending ? PENDING_SOURCE_VERIFICATION : src.publishYear})
                    </span>
                  </button>
                ) : (
                  <span>
                    <span className="font-mono text-[#8C2F1B]">[{src.id}]</span>{' '}
                    {src.publisherOrAuthor} (
                    {isPending ? PENDING_SOURCE_VERIFICATION : src.publishYear})
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
        {attributionNote && (
          <p className="text-[#78695D] leading-relaxed">{attributionNote}</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#F3EFE6]/75 border border-[#E2D9C8] p-4 sm:p-5 space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DFD6C7] pb-2.5">
        <p className="uppercase tracking-wider font-semibold text-[#1F1A17]">{label}</p>
        {onNavigateToReferences && (
          <button
            type="button"
            onClick={() => onNavigateToReferences(matchedSources[0]?.id)}
            className="inline-flex items-center gap-1 font-medium text-[#8C2F1B] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mở trang Tư liệu và nguồn tham khảo</span>
          </button>
        )}
      </div>

      <ul className="divide-y divide-[#E5DDD0]">
        {matchedSources.map((src) => {
          const catMeta = SOURCE_CATEGORY_METADATA[src.sourceType];
          const scopeLabel = REFERENCE_VILLAGE_SCOPE_LABELS[src.villageScope];
          const hasValidHttpUrl =
            src.url.startsWith('http://') || src.url.startsWith('https://');
          const isPending = src.verificationStatus === 'dang-cho-xac-minh';

          return (
            <li key={src.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[#1F1A17] font-medium">
                  <span className="font-mono text-[#8C2F1B] mr-1.5">[{src.id}]</span>
                  {src.title === PENDING_SOURCE_VERIFICATION ? (
                    <span className="italic text-[#8C583A]">
                      Tên tài liệu: {PENDING_SOURCE_VERIFICATION}
                    </span>
                  ) : (
                    src.title
                  )}
                </p>

                {hasValidHttpUrl && (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#8C2F1B] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                  >
                    <span> Nguồn gốc</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <p className="text-[#5C4D42]">
                <span>{src.publisherOrAuthor}</span>
                <span aria-hidden="true"> · </span>
                <span>Năm: {src.publishYear}</span>
                <span aria-hidden="true"> · </span>
                <span>{catMeta.label}</span>
                <span aria-hidden="true"> · </span>
                <span className={isPending ? 'italic text-[#9A5B25]' : 'text-[#2E5A36]'}>
                  {isPending ? PENDING_SOURCE_VERIFICATION : 'Đã xác minh'}
                </span>
              </p>

              <p className="text-[#6B5B4E]">
                Phạm vi chứng minh: <span className="text-[#1F1A17]">{scopeLabel}</span>
              </p>
            </li>
          );
        })}
      </ul>

      {attributionNote && (
        <p className="pt-2 border-t border-[#DFD6C7] text-[#6B5B4E] leading-relaxed">
          <strong className="text-[#1F1A17]">Ghi chú phân định làng nghề:</strong>{' '}
          {attributionNote}
        </p>
      )}
    </div>
  );
};
