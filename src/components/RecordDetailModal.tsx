import React, { useState, useEffect } from 'react';
import { X, Edit3, Check } from 'lucide-react';
import { ArchivalRecord, ReferenceSource } from '../types/archive';
import { AccessionMetadataList } from './AccessionMetadataList';
import { AbstractIllustration } from './AbstractIllustration';
import { InlineReferenceCitation } from './InlineReferenceCitation';
import {
  PENDING_SOURCE_TEXT,
  VILLAGE_METADATA,
  UNVERIFIED_TEXT,
} from '../data/chamPotteryArchive';
import { REFERENCE_VILLAGE_SCOPE_LABELS } from '../data/referenceSources';

interface RecordDetailModalProps {
  record: ArchivalRecord | null;
  allReferences: ReferenceSource[];
  onClose: () => void;
  onUpdateRecord: (updated: ArchivalRecord) => void;
  onNavigateToReferences: (highlightRefId?: string) => void;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({
  record,
  allReferences,
  onClose,
  onUpdateRecord,
  onNavigateToReferences,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<ArchivalRecord | null>(record);

  useEffect(() => {
    setDraft(record);
    setIsEditing(false);
  }, [record]);

  if (!record || !draft) return null;

  const villageInfo = VILLAGE_METADATA[record.village];

  const toggleReferenceSelection = (refId: string) => {
    const currentIds = draft.referenceIds || [];
    const nextIds = currentIds.includes(refId)
      ? currentIds.filter((id) => id !== refId)
      : [...currentIds, refId];
    setDraft({ ...draft, referenceIds: nextIds });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned: ArchivalRecord = {
      ...draft,
      localName: draft.localName.trim() || UNVERIFIED_TEXT,
      ethnicity: draft.ethnicity.trim() || 'Chăm',
      culturalRegion: draft.culturalRegion.trim() || UNVERIFIED_TEXT,
      currentLocation: draft.currentLocation.trim() || UNVERIFIED_TEXT,
      historicalLocation: draft.historicalLocation.trim() || UNVERIFIED_TEXT,
      informant: draft.informant.trim() || UNVERIFIED_TEXT,
      usageScope: draft.usageScope.trim() || UNVERIFIED_TEXT,
      source: draft.source.trim() || PENDING_SOURCE_TEXT,
      referenceIds: draft.referenceIds || [],
    };
    onUpdateRecord(cleaned);
    setIsEditing(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="record-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1F1A17]/60 backdrop-blur-[2px]"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FBF9F5] border border-[#D8CEBE] rounded-lg shadow-xl">
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#FBF9F5] border-b border-[#E2D9C8]">
          <div className="text-xs text-[#6B5B4E] flex flex-wrap items-center gap-2">
            <span className="font-mono font-medium text-[#1F1A17]">{record.id}</span>
            <span aria-hidden="true">·</span>
            <span>{villageInfo.shortLabel}</span>
            <span aria-hidden="true">·</span>
            <span className={record.isSampleData ? 'text-[#9A5B25]' : 'text-[#2E5A36] font-medium'}>
              {record.isSampleData ? 'Dữ liệu mẫu minh họa' : 'Tư liệu thực địa đã xác minh'}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1F1A17] bg-[#F3EFE6] hover:bg-[#E7DFD1] border border-[#D8CEBE] rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Cập nhật tư liệu & nguồn</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng cửa sổ chi tiết"
              className="p-1.5 rounded-md text-[#5C4D42] hover:bg-[#F3EFE6] hover:text-[#1F1A17] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {!isEditing ? (
            <>
              <div>
                <h2
                  id="record-modal-title"
                  className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F1A17] leading-snug"
                >
                  {record.title}
                </h2>
                <p className="mt-3 text-base text-[#5C4D42] leading-relaxed">{record.summary}</p>
              </div>

              {(record.abstractIllustrationKey || record.documentaryImageUrl) && (
                <AbstractIllustration
                  illustrationKey={record.abstractIllustrationKey}
                  documentaryImageUrl={record.documentaryImageUrl}
                  documentaryImageCredit={record.documentaryImageCredit}
                  title={record.title}
                  aspectClass="aspect-[16/9]"
                />
              )}

              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-widest text-[#6B5B4E] font-semibold">
                  Phiếu siêu dữ liệu lưu trữ (9 tiêu chí bắt buộc)
                </h3>
                <AccessionMetadataList record={record} />
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-xs uppercase tracking-widest text-[#6B5B4E] font-semibold">
                  Mô tả & Ghi chép chuyên môn
                </h3>
                <p className="text-sm sm:text-base text-[#1F1A17] leading-relaxed whitespace-pre-line">
                  {record.details}
                </p>
              </div>

              <InlineReferenceCitation
                referenceIds={record.referenceIds || []}
                allReferences={allReferences}
                attributionNote={record.villageAttributionNote}
                label="Tài liệu tham khảo đi kèm hồ sơ này"
                onNavigateToReferences={(refId) => {
                  onClose();
                  onNavigateToReferences(refId);
                }}
              />
            </>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#1F1A17]">
                  Cập nhật & Liên kết Nguồn cho Hồ sơ {record.id}
                </h2>
                <p className="text-xs text-[#6B5B4E] mt-1">
                  Chỉ chọn các nguồn thực sự chứng minh thông tin của làng nghề này. Không dùng tài
                  liệu của làng kia để khẳng định chéo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                    1. Tên hiện vật hoặc nội dung
                  </label>
                  <input
                    type="text"
                    required
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                    2. Tên gọi địa phương
                  </label>
                  <input
                    type="text"
                    value={draft.localName}
                    onChange={(e) => setDraft({ ...draft, localName: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                    3. Dân tộc
                  </label>
                  <input
                    type="text"
                    value={draft.ethnicity}
                    onChange={(e) => setDraft({ ...draft, ethnicity: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                    4. Vùng văn hóa
                  </label>
                  <input
                    type="text"
                    value={draft.culturalRegion}
                    onChange={(e) => setDraft({ ...draft, culturalRegion: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                    5. Địa danh hiện nay
                  </label>
                  <input
                    type="text"
                    value={draft.currentLocation}
                    onChange={(e) => setDraft({ ...draft, currentLocation: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                    6. Địa danh lịch sử tại thời điểm ghi nhận
                  </label>
                  <input
                    type="text"
                    value={draft.historicalLocation}
                    onChange={(e) => setDraft({ ...draft, historicalLocation: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                    7. Người cung cấp thông tin
                  </label>
                  <input
                    type="text"
                    value={draft.informant}
                    onChange={(e) => setDraft({ ...draft, informant: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                    8. Phạm vi sử dụng được phép
                  </label>
                  <input
                    type="text"
                    value={draft.usageScope}
                    onChange={(e) => setDraft({ ...draft, usageScope: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                    9. Ghi chú nguồn tư liệu (hiển thị &ldquo;{PENDING_SOURCE_TEXT}&rdquo; nếu chưa
                    xác minh)
                  </label>
                  <input
                    type="text"
                    value={draft.source}
                    onChange={(e) => setDraft({ ...draft, source: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
                  />
                </div>

                {/* Linked Reference Checkboxes */}
                <div className="sm:col-span-2 bg-[#F3EFE6] border border-[#E2D9C8] p-4 rounded-md space-y-2.5">
                  <p className="text-xs font-semibold text-[#1F1A17]">
                    Chọn tài liệu tham khảo đi kèm từ danh mục quản lý (bỏ chọn hết nếu Đang chờ xác
                    minh):
                  </p>
                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {allReferences.map((ref) => {
                      const checked = (draft.referenceIds || []).includes(ref.id);
                      return (
                        <label
                          key={ref.id}
                          className="flex items-start gap-2.5 text-xs text-[#3D332C] cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleReferenceSelection(ref.id)}
                            className="mt-0.5 accent-[#8C2F1B]"
                          />
                          <span>
                            <strong className="font-mono text-[#8C2F1B]">[{ref.id}]</strong>{' '}
                            {ref.publisherOrAuthor} —{' '}
                            <span className="text-[#6B5B4E]">
                              {REFERENCE_VILLAGE_SCOPE_LABELS[ref.villageScope]}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                    Ghi chú phân định phạm vi chứng minh làng nghề
                  </label>
                  <input
                    type="text"
                    value={draft.villageAttributionNote || ''}
                    onChange={(e) =>
                      setDraft({ ...draft, villageAttributionNote: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                    Tóm tắt ngắn
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={draft.summary}
                    onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                    Nội dung chi tiết
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={draft.details}
                    onChange={(e) => setDraft({ ...draft, details: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-2.5 pt-1">
                  <input
                    id="verified-checkbox"
                    type="checkbox"
                    checked={!draft.isSampleData}
                    onChange={(e) => setDraft({ ...draft, isSampleData: !e.target.checked })}
                    className="w-4 h-4 accent-[#8C2F1B]"
                  />
                  <label htmlFor="verified-checkbox" className="text-sm text-[#1F1A17]">
                    Đánh dấu hồ sơ này là <strong>Tư liệu thực địa đã xác minh</strong>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2D9C8]">
                <button
                  type="button"
                  onClick={() => {
                    setDraft(record);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 text-xs font-medium text-[#5C4D42] hover:text-[#1F1A17] transition-colors"
                >
                  Hủy thay đổi
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md hover:bg-[#732413] transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu hồ sơ tư liệu</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
