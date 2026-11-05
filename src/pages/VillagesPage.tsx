import React, { useState, useEffect } from 'react';
import { Plus, FileText } from 'lucide-react';
import {
  ArchivalRecord,
  RecordCategory,
  ReferenceSource,
  VillageId,
} from '../types/archive';
import { VILLAGE_METADATA } from '../data/chamPotteryArchive';
import { PENDING_SOURCE_VERIFICATION } from '../data/referenceSources';
import { AccessionMetadataList } from '../components/AccessionMetadataList';
import { AbstractIllustration } from '../components/AbstractIllustration';
import { InlineReferenceCitation } from '../components/InlineReferenceCitation';

interface VillagesPageProps {
  records: ArchivalRecord[];
  references: ReferenceSource[];
  initialVillage?: VillageId | null;
  onSelectRecord: (record: ArchivalRecord) => void;
  onOpenAddModalForVillage: (village: VillageId, category?: RecordCategory) => void;
  onNavigateToReferences: (highlightRefId?: string) => void;
}

export const VillagesPage: React.FC<VillagesPageProps> = ({
  records,
  references,
  initialVillage,
  onSelectRecord,
  onOpenAddModalForVillage,
  onNavigateToReferences,
}) => {
  const [viewMode, setViewMode] = useState<'both' | VillageId>(initialVillage || 'both');

  useEffect(() => {
    if (initialVillage) {
      setViewMode(initialVillage);
    }
  }, [initialVillage]);

  const displayedVillages: VillageId[] =
    viewMode === 'both' ? ['tri-duc', 'bau-truc'] : [viewMode];

  const categoryLabels: Record<RecordCategory, string> = {
    'lang-nghe': 'Hồ sơ không gian làng nghề',
    'quy-trinh': 'Quy trình kỹ thuật',
    'dung-cu': 'Công cụ chế tác',
    'san-pham': 'Sản phẩm gốm',
    'nghe-nhan': 'Nghệ nhân & Người lưu giữ nghề',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Page Header & Interactive Filter Control */}
      <div className="space-y-6 border-b border-[#E2D9C8] pb-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-widest text-[#8C2F1B] font-semibold">
            Chuyên mục 01 · Không gian Di sản Làng nghề
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17]">
            Làng gốm Trì Đức (Ligok) và Làng gốm Bàu Trúc (Hamu Crok)
          </h1>
          <p className="text-base text-[#5C4D42] leading-relaxed">
            Phân biệt rạch ròi hồ sơ và nguồn tham khảo của từng làng nghề. Không dùng tư liệu khảo
            sát tại làng này để khẳng định cho làng kia nếu tài liệu gốc không chứng minh điều đó.
          </p>
        </div>

        {/* Interactive Segmented Control */}
        <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EDE6DA] rounded-lg">
          <button
            type="button"
            onClick={() => setViewMode('both')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              viewMode === 'both'
                ? 'bg-[#FBF9F5] text-[#1F1A17] shadow-xs'
                : 'text-[#5C4D42] hover:text-[#1F1A17]'
            }`}
          >
            Xem song song hai làng
          </button>
          <button
            type="button"
            onClick={() => setViewMode('tri-duc')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              viewMode === 'tri-duc'
                ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                : 'text-[#5C4D42] hover:text-[#1F1A17]'
            }`}
          >
            Làng Trì Đức (Ligok) · Bình Thuận
          </button>
          <button
            type="button"
            onClick={() => setViewMode('bau-truc')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              viewMode === 'bau-truc'
                ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                : 'text-[#5C4D42] hover:text-[#1F1A17]'
            }`}
          >
            Làng Bàu Trúc (Hamu Crok) · Ninh Thuận
          </button>
        </div>
      </div>

      {/* Village Profiles */}
      <div
        className={`grid grid-cols-1 ${
          viewMode === 'both' ? 'xl:grid-cols-2' : 'max-w-4xl'
        } gap-10 items-start`}
      >
        {displayedVillages.map((vid) => {
          const meta = VILLAGE_METADATA[vid];
          const primaryVillageRecord = records.find(
            (r) => r.village === vid && r.category === 'lang-nghe'
          );
          const allVillageRecords = records.filter((r) => r.village === vid);

          return (
            <section
              key={vid}
              aria-labelledby={`heading-${vid}`}
              className="bg-[#FBF9F5] border border-[#E2D9C8] p-6 sm:p-8 space-y-8"
            >
              {/* Village Heading */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#EDE6DA] pb-6">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-[#78695D]">
                    Tên gọi địa phương: <strong className="text-[#8C2F1B]">{meta.localName}</strong> ·
                    Tỉnh {meta.province}
                  </p>
                  <h2
                    id={`heading-${vid}`}
                    className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F1A17]"
                  >
                    {meta.name} ({meta.localName})
                  </h2>
                  <p className="text-sm text-[#6B5B4E]">Địa danh hiện nay: {meta.currentAdmin}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenAddModalForVillage(vid, 'lang-nghe')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#F3EFE6] hover:bg-[#E7DFD1] border border-[#D8CEBE] text-[#1F1A17] rounded-md transition-colors whitespace-nowrap shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Bổ sung tư liệu {meta.localName}</span>
                </button>
              </div>

              {/* Illustration */}
              <AbstractIllustration
                illustrationKey={vid === 'tri-duc' ? 'clay-earth' : 'hero-terracotta'}
                documentaryImageUrl={primaryVillageRecord?.documentaryImageUrl}
                documentaryImageCredit={primaryVillageRecord?.documentaryImageCredit}
                title={meta.name}
                aspectClass="aspect-[16/9]"
              />

              {/* Overview & Distinguishing Notes */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-[#1F1A17]">
                  Đặc điểm nhận diện & Giới hạn quy chiếu nguồn
                </h3>
                <p className="text-sm sm:text-base text-[#3D332C] leading-relaxed">
                  {meta.overview}
                </p>
                <ul className="space-y-2 pt-1 text-sm text-[#5C4D42]">
                  {meta.distinguishingNotes.map((note, idx) => (
                    <li key={idx} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-[#8C2F1B] shrink-0">
                        0{idx + 1}.
                      </span>
                      <span className="leading-relaxed">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accompanying Reference Citations for Village Essay */}
              <InlineReferenceCitation
                referenceIds={meta.referenceIds}
                allReferences={references}
                attributionNote={meta.attributionWarning}
                label={`Nguồn tham khảo bài giới thiệu ${meta.name}`}
                onNavigateToReferences={onNavigateToReferences}
              />

              {/* 9-Field Archival Metadata for Primary Village Record */}
              {primaryVillageRecord && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs uppercase tracking-widest text-[#6B5B4E] font-semibold">
                      Phiếu siêu dữ liệu gốc ({primaryVillageRecord.id})
                    </h3>
                    <button
                      type="button"
                      onClick={() => onSelectRecord(primaryVillageRecord)}
                      className="text-xs font-medium text-[#8C2F1B] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                    >
                      Mở / Chỉnh sửa hồ sơ
                    </button>
                  </div>
                  <AccessionMetadataList record={primaryVillageRecord} />
                </div>
              )}

              {/* Indexed Records Specific to This Village */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs uppercase tracking-widest text-[#6B5B4E] font-semibold tabular-nums">
                  Danh mục tư liệu thuộc riêng {meta.name} ({allVillageRecords.length} hồ sơ)
                </h3>
                <div className="divide-y divide-[#EDE6DA] border-t border-b border-[#EDE6DA]">
                  {allVillageRecords.map((item) => {
                    const validLinkedCount = (item.referenceIds || []).filter((rid) =>
                      references.some((r) => r.id === rid)
                    ).length;

                    return (
                      <div
                        key={item.id}
                        className="py-3 flex items-center justify-between gap-4 text-sm"
                      >
                        <div className="min-w-0">
                          <p className="text-xs text-[#78695D]">
                            <span className="font-mono text-[#1F1A17]">{item.id}</span> ·{' '}
                            {categoryLabels[item.category]} ·{' '}
                            {validLinkedCount > 0 ? (
                              <span>Nguồn: {item.referenceIds.join(', ')}</span>
                            ) : (
                              <span className="italic text-[#9A5B25]">
                                Nguồn: {PENDING_SOURCE_VERIFICATION}
                              </span>
                            )}
                          </p>
                          <p className="font-medium text-[#1F1A17] truncate mt-0.5">{item.title}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onSelectRecord(item)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#8C2F1B] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Chi tiết</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
