import React, { useState } from 'react';
import { Search, Plus, FileText } from 'lucide-react';
import {
  ArchivalRecord,
  RecordCategory,
  ReferenceSource,
  VillageId,
} from '../types/archive';
import { VILLAGE_METADATA, UNVERIFIED_TEXT } from '../data/chamPotteryArchive';
import { AccessionMetadataList } from '../components/AccessionMetadataList';
import { InlineReferenceCitation } from '../components/InlineReferenceCitation';

interface ToolsProductsPageProps {
  records: ArchivalRecord[];
  references: ReferenceSource[];
  onSelectRecord: (record: ArchivalRecord) => void;
  onOpenAddModalWithPreset: (village: VillageId, category: RecordCategory) => void;
  onNavigateToReferences: (highlightRefId?: string) => void;
}

export const ToolsProductsPage: React.FC<ToolsProductsPageProps> = ({
  records,
  references,
  onSelectRecord,
  onOpenAddModalWithPreset,
  onNavigateToReferences,
}) => {
  const [typeFilter, setTypeFilter] = useState<'all' | 'dung-cu' | 'san-pham'>('all');
  const [villageFilter, setVillageFilter] = useState<'all' | VillageId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = records.filter((r) => {
    if (r.category !== 'dung-cu' && r.category !== 'san-pham') return false;
    if (typeFilter !== 'all' && r.category !== typeFilter) return false;
    if (villageFilter !== 'all' && r.village !== villageFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.localName.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header */}
      <div className="space-y-6 border-b border-[#E2D9C8] pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#8C2F1B] font-semibold">
              Chuyên mục 03 · Vật chất Kỹ thuật & Hiện vật
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17]">
              Dụng cụ chế tác và Sản phẩm gốm truyền thống
            </h1>
            <p className="text-base text-[#5C4D42] leading-relaxed">
              Giới thiệu hệ thống công cụ và sản phẩm gốm phân định riêng giữa Trì Đức (Ligok) và
              Bàu Trúc (Hamu Crok). Mọi mục chưa có tài liệu chuyên khảo đối chứng đều ghi rõ tên
              địa phương là &ldquo;{UNVERIFIED_TEXT}&rdquo; và nguồn tham khảo là &ldquo;Đang chờ
              xác minh&rdquo;.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                onOpenAddModalWithPreset(
                  villageFilter === 'bau-truc' ? 'bau-truc' : 'tri-duc',
                  typeFilter === 'dung-cu' ? 'dung-cu' : 'san-pham'
                )
              }
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md hover:bg-[#732413] transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm dụng cụ / sản phẩm</span>
            </button>
          </div>
        </div>

        {/* Interactive Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1 p-1 bg-[#EDE6DA] rounded-lg">
              <button
                type="button"
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  typeFilter === 'all'
                    ? 'bg-[#FBF9F5] text-[#1F1A17] shadow-xs'
                    : 'text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Tất cả danh mục
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('dung-cu')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  typeFilter === 'dung-cu'
                    ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                    : 'text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Dụng cụ chế tác
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('san-pham')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  typeFilter === 'san-pham'
                    ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                    : 'text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Sản phẩm gốm
              </button>
            </div>

            <div className="inline-flex items-center gap-1 p-1 bg-[#EDE6DA] rounded-lg">
              <button
                type="button"
                onClick={() => setVillageFilter('all')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  villageFilter === 'all'
                    ? 'bg-[#FBF9F5] text-[#1F1A17] shadow-xs'
                    : 'text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Cả hai làng
              </button>
              <button
                type="button"
                onClick={() => setVillageFilter('tri-duc')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  villageFilter === 'tri-duc'
                    ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                    : 'text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Trì Đức (Ligok)
              </button>
              <button
                type="button"
                onClick={() => setVillageFilter('bau-truc')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  villageFilter === 'bau-truc'
                    ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                    : 'text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Bàu Trúc (Hamu Crok)
              </button>
            </div>
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#78695D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên dụng cụ, sản phẩm, mã hồ sơ..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#6B5B4E] tabular-nums">
        <p>Đang hiển thị {filteredRecords.length} hồ sơ tư liệu phù hợp điều kiện lọc</p>
        <p>Mỗi hồ sơ hiển thị trực tiếp nguồn tham khảo đi kèm hoặc trạng thái Đang chờ xác minh</p>
      </div>

      {/* Catalog Grid */}
      {filteredRecords.length === 0 ? (
        <div className="border border-[#E2D9C8] bg-[#F3EFE6]/60 p-10 text-center space-y-3">
          <p className="font-serif text-lg text-[#1F1A17]">
            Không tìm thấy hồ sơ khớp với bộ lọc hiện tại
          </p>
          <button
            type="button"
            onClick={() => {
              setTypeFilter('all');
              setVillageFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {filteredRecords.map((rec) => {
            const vMeta = VILLAGE_METADATA[rec.village];
            const typeText = rec.category === 'dung-cu' ? 'Công cụ chế tác' : 'Sản phẩm gốm';

            return (
              <article
                key={rec.id}
                className="bg-[#FBF9F5] border border-[#E2D9C8] p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[#C2AF98] transition-colors"
              >
                <div className="space-y-4">
                  <div className="text-xs text-[#6B5B4E] flex flex-wrap items-center gap-1.5">
                    <span className="font-mono font-medium text-[#1F1A17]">{rec.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>{typeText}</span>
                    <span aria-hidden="true">·</span>
                    <strong className="font-medium text-[#1F1A17]">{vMeta.shortLabel}</strong>
                    <span aria-hidden="true">·</span>
                    <span className={rec.isSampleData ? 'text-[#9A5B25]' : 'text-[#2E5A36]'}>
                      {rec.isSampleData ? 'Dữ liệu mẫu minh họa' : 'Đã xác minh'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1A17] leading-snug">
                      {rec.title}
                    </h2>
                    <p className="text-sm text-[#5C4D42] leading-relaxed">{rec.summary}</p>
                  </div>

                  <AccessionMetadataList record={rec} compact />

                  <InlineReferenceCitation
                    referenceIds={rec.referenceIds || []}
                    allReferences={references}
                    attributionNote={rec.villageAttributionNote}
                    compact
                    onNavigateToReferences={onNavigateToReferences}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <span className="text-xs text-[#6B5B4E]">
                    Người cung cấp: <span className="italic">{rec.informant}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectRecord(rec)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#F3EFE6] hover:bg-[#E7DFD1] border border-[#D8CEBE] text-[#1F1A17] rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Mở toàn bộ 9 tiêu chí</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
