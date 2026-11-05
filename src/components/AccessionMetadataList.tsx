import React from 'react';
import { ArchivalRecord } from '../types/archive';
import { PENDING_SOURCE_TEXT, UNVERIFIED_TEXT } from '../data/chamPotteryArchive';

interface AccessionMetadataListProps {
  record: ArchivalRecord;
  compact?: boolean;
}

export const AccessionMetadataList: React.FC<AccessionMetadataListProps> = ({
  record,
  compact = false,
}) => {
  const fields: Array<{ label: string; value: string }> = [
    { label: '01. Tên hiện vật / nội dung', value: record.title },
    { label: '02. Tên gọi địa phương', value: record.localName || UNVERIFIED_TEXT },
    { label: '03. Dân tộc', value: record.ethnicity || UNVERIFIED_TEXT },
    { label: '04. Vùng văn hóa', value: record.culturalRegion || UNVERIFIED_TEXT },
    { label: '05. Địa danh hiện nay', value: record.currentLocation || UNVERIFIED_TEXT },
    {
      label: '06. Địa danh lịch sử khi ghi nhận',
      value: record.historicalLocation || UNVERIFIED_TEXT,
    },
    { label: '07. Người cung cấp thông tin', value: record.informant || UNVERIFIED_TEXT },
    { label: '08. Phạm vi sử dụng được phép', value: record.usageScope || UNVERIFIED_TEXT },
    { label: '09. Nguồn tư liệu', value: record.source || PENDING_SOURCE_TEXT },
  ];

  const displayedFields = compact ? fields.slice(1, 6).concat(fields[8]) : fields;

  return (
    <dl className="divide-y divide-[#E2D9C8] border-t border-b border-[#E2D9C8] text-sm">
      {displayedFields.map((item) => {
        const lowerVal = item.value.trim().toLowerCase();
        const isUnverified =
          lowerVal.includes(UNVERIFIED_TEXT.toLowerCase()) ||
          lowerVal.includes(PENDING_SOURCE_TEXT.toLowerCase());

        return (
          <div
            key={item.label}
            className="py-2.5 sm:grid sm:grid-cols-12 sm:gap-4 items-baseline"
          >
            <dt className="sm:col-span-5 text-xs uppercase tracking-wider text-[#6B5B4E] font-medium">
              {item.label}
            </dt>
            <dd
              className={`mt-1 sm:mt-0 sm:col-span-7 leading-relaxed ${
                isUnverified ? 'italic text-[#8C583A]' : 'text-[#1F1A17]'
              }`}
            >
              {item.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};
