import React, { useState } from 'react';
import { ABSTRACT_ILLUSTRATIONS } from '../utils/illustrations';
import { AbstractIllustrationKey } from '../types/archive';

interface AbstractIllustrationProps {
  illustrationKey?: AbstractIllustrationKey;
  documentaryImageUrl?: string;
  documentaryImageCredit?: string;
  title?: string;
  aspectClass?: string;
  showCaption?: boolean;
  className?: string;
}

export const AbstractIllustration: React.FC<AbstractIllustrationProps> = ({
  illustrationKey = 'hero-terracotta',
  documentaryImageUrl,
  documentaryImageCredit,
  title,
  aspectClass = 'aspect-[4/3]',
  showCaption = true,
  className = '',
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  const asset = ABSTRACT_ILLUSTRATIONS[illustrationKey];
  const isDocumentary = Boolean(documentaryImageUrl && documentaryImageUrl.trim().length > 0);
  const activeSrc = isDocumentary ? documentaryImageUrl! : asset.src;
  const activeAlt = isDocumentary
    ? `Ảnh tư liệu xác minh: ${title || 'Hiện vật gốm Chăm'}`
    : asset.alt;

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative w-full overflow-hidden bg-[#EBE4D8] border border-[#E2D9C8] ${aspectClass}`}
      >
        {!imgFailed ? (
          <img
            src={activeSrc}
            alt={activeAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EDE5D7] via-[#DFCBB5] to-[#C89F81]">
            <svg
              viewBox="0 0 120 120"
              className="w-20 h-20 text-[#8C2F1B]/75 mb-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M42 22h36l-5 14c16 10 23 26 21 44-2 14-12 22-34 22S28 94 26 80c-2-18 5-34 21-44l-5-14Z" />
              <path d="M30 58c10-5 20-5 30 0s20 5 30 0" />
              <path d="M28 70c10-5 20-5 32 0s22 5 32 0" />
            </svg>
            <p className="font-serif text-sm text-[#1F1A17] max-w-xs">
              {title || 'Bố cục họa tiết đất nung trừu tượng'}
            </p>
          </div>
        )}
      </div>

      {showCaption && (
        <figcaption className="mt-2.5 text-xs leading-relaxed text-[#6B5B4E]">
          {isDocumentary ? (
            <span>
              <span className="font-medium text-[#1F1A17]">Ảnh tư liệu thực tế</span>
              <span aria-hidden="true"> · </span>
              <span>{documentaryImageCredit || 'Đã có nguồn và phạm vi sử dụng xác minh'}</span>
            </span>
          ) : (
            <span>
              <span className="font-serif italic text-[#5C4D42]">{asset.caption}</span>
              <span aria-hidden="true"> · </span>
              <span>{asset.ethicalNotice}</span>
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
};
