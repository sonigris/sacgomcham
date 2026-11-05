import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Search,
  FileText,
  RotateCcw,
} from 'lucide-react';
import {
  ArchivalRecord,
  ReferenceSource,
  ReferenceVillageScope,
  SourceCategory,
} from '../types/archive';
import {
  PENDING_SOURCE_VERIFICATION,
  REFERENCE_VILLAGE_SCOPE_LABELS,
  SOURCE_CATEGORY_METADATA,
} from '../data/referenceSources';
import { ReferenceFormModal } from '../components/ReferenceFormModal';

interface ReferencesPageProps {
  references: ReferenceSource[];
  records: ArchivalRecord[];
  highlightedRefId?: string | null;
  onAddReference: (newRef: ReferenceSource) => void;
  onUpdateReference: (updatedRef: ReferenceSource) => void;
  onDeleteReference: (refId: string) => void;
  onResetReferences: () => void;
  onSelectRecord: (record: ArchivalRecord) => void;
}

export const ReferencesPage: React.FC<ReferencesPageProps> = ({
  references,
  records,
  highlightedRefId,
  onAddReference,
  onUpdateReference,
  onDeleteReference,
  onResetReferences,
  onSelectRecord,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<'all' | SourceCategory>('all');
  const [scopeFilter, setScopeFilter] = useState<'all' | ReferenceVillageScope>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<ReferenceSource | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (highlightedRefId) {
      const el = document.getElementById(`ref-card-${highlightedRefId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [highlightedRefId]);

  const filteredReferences = references.filter((ref) => {
    if (categoryFilter !== 'all' && ref.sourceType !== categoryFilter) return false;
    if (scopeFilter !== 'all' && ref.villageScope !== scopeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ref.id.toLowerCase().includes(q) ||
        ref.title.toLowerCase().includes(q) ||
        ref.publisherOrAuthor.toLowerCase().includes(q) ||
        ref.usedContent.toLowerCase().includes(q) ||
        ref.url.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingSource(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (src: ReferenceSource) => {
    setEditingSource(src);
    setIsModalOpen(true);
  };

  const handleSaveReference = (saved: ReferenceSource, isEdit: boolean) => {
    if (isEdit) {
      onUpdateReference(saved);
    } else {
      onAddReference(saved);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* 1. Page Header & Admin Actions */}
      <div className="space-y-6 border-b border-[#E2D9C8] pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#8C2F1B] font-semibold">
              Hệ thống Quản trị Thư mục & Kiểm chứng Học thuật
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17]">
              Tư liệu và nguồn tham khảo
            </h1>
            <p className="text-base text-[#5C4D42] leading-relaxed">
              Danh mục quản lý toàn bộ tài liệu chính thức, công trình học thuật, bài báo và tư liệu
              cộng đồng được sử dụng trong ứng dụng Sắc Gốm Chăm, kèm phân định nghiêm ngặt phạm vi
              chứng minh giữa làng gốm Trì Đức (Ligok) và làng gốm Bàu Trúc (Hamu Crok).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md hover:bg-[#732413] transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm nguồn tham khảo</span>
            </button>
            <button
              type="button"
              onClick={onResetReferences}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-[#F3EFE6] hover:bg-[#E7DFD1] border border-[#D8CEBE] text-[#1F1A17] rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục 5 nguồn gốc</span>
            </button>
          </div>
        </div>

        {/* Epistemological & Village Separation Charter */}
        <div className="bg-[#F3EFE6] border border-[#D8CEBE] p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-1.5">
            <h2 className="font-serif text-base font-semibold text-[#1F1A17]">
              Quy tắc không tự tạo dữ kiện thư mục
            </h2>
            <p className="text-[#5C4D42] leading-relaxed">
              Hệ thống không tự suy diễn tên tác giả, năm công bố, đường dẫn hoặc nội dung khi chưa
              đối chiếu nguyên bản. Mọi thông tin nguồn chưa xác thực hoàn toàn đều hiển thị rõ là{' '}
              <strong className="text-[#9A5B25]">&ldquo;{PENDING_SOURCE_VERIFICATION}&rdquo;</strong>.
            </p>
          </div>
          <div className="space-y-1.5">
            <h2 className="font-serif text-base font-semibold text-[#1F1A17]">
              Nguyên tắc phân biệt nguồn Trì Đức và Bàu Trúc
            </h2>
            <p className="text-[#5C4D42] leading-relaxed">
              Mỗi tài liệu đều được gắn phạm vi chứng minh rõ ràng. Tuyệt đối không lấy dữ liệu khảo
              sát tại làng Bàu Trúc (như nguồn đất ven sông Quao) để khẳng định cho làng Trì Đức
              hoặc ngược lại nếu tài liệu không trực tiếp chứng minh điều đó.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Four Source Classification Cards */}
      <section aria-label="Phân loại 4 nhóm nguồn tham khảo" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {(Object.keys(SOURCE_CATEGORY_METADATA) as SourceCategory[]).map((catKey) => {
          const meta = SOURCE_CATEGORY_METADATA[catKey];
          const count = references.filter((r) => r.sourceType === catKey).length;
          const isSelected = categoryFilter === catKey;

          return (
            <button
              key={catKey}
              type="button"
              onClick={() => setCategoryFilter(isSelected ? 'all' : catKey)}
              className={`text-left p-5 border transition-colors flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-[#F3EFE6] border-[#8C2F1B]'
                  : 'bg-[#FBF9F5] border-[#E2D9C8] hover:border-[#C2AF98]'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="font-serif text-lg font-semibold text-[#1F1A17]">{meta.label}</h2>
                  <span className="font-mono text-xs text-[#8C2F1B] tabular-nums">
                    {count} nguồn
                  </span>
                </div>
                <p className="text-xs text-[#5C4D42] leading-relaxed">{meta.description}</p>
              </div>
              <span className="text-xs font-medium text-[#8C2F1B]">
                {isSelected ? 'Đang lọc nhóm này (nhấp để bỏ lọc)' : 'Nhấp để lọc theo nhóm'}
              </span>
            </button>
          );
        })}
      </section>

      {/* 3. Filter & Search Toolbar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-[#E2D9C8] pb-6">
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Segmented Control */}
          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EDE6DA] rounded-lg">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                categoryFilter === 'all'
                  ? 'bg-[#FBF9F5] text-[#1F1A17] shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#1F1A17]'
              }`}
            >
              Tất cả loại nguồn
            </button>
            {(Object.keys(SOURCE_CATEGORY_METADATA) as SourceCategory[]).map((catKey) => (
              <button
                key={catKey}
                type="button"
                onClick={() => setCategoryFilter(catKey)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  categoryFilter === catKey
                    ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                    : 'text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                {SOURCE_CATEGORY_METADATA[catKey].shortLabel}
              </button>
            ))}
          </div>

          {/* Village Scope Filter */}
          <select
            aria-label="Lọc theo phạm vi làng nghề"
            value={scopeFilter}
            onChange={(e) => setScopeFilter(e.target.value as 'all' | ReferenceVillageScope)}
            className="px-3 py-2 text-xs sm:text-sm bg-white border border-[#D8CEBE] rounded-md text-[#1F1A17] focus:outline-none focus:border-[#8C2F1B]"
          >
            <option value="all">Tất cả phạm vi địa điểm</option>
            <option value="tri-duc">Chứng minh riêng Trì Đức (Ligok)</option>
            <option value="bau-truc">Chứng minh riêng Bàu Trúc (Hamu Crok)</option>
            <option value="chung-ca-hai">Khái quát chung hai làng</option>
            <option value="dang-cho-xac-minh">{PENDING_SOURCE_VERIFICATION}</option>
          </select>
        </div>

        <div className="relative w-full xl:w-80">
          <Search className="w-4 h-4 text-[#78695D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên tài liệu, cơ quan, nội dung, URL..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
          />
        </div>
      </div>

      {/* 4. Reference Sources Catalog List */}
      {filteredReferences.length === 0 ? (
        <div className="border border-[#E2D9C8] bg-[#F3EFE6]/60 p-10 text-center space-y-3">
          <p className="font-serif text-lg text-[#1F1A17]">
            Chưa có nguồn tham khảo nào thuộc bộ lọc này
          </p>
          <p className="text-sm text-[#6B5B4E]">
            Bạn có thể nhấn &ldquo;Thêm nguồn tham khảo&rdquo; để bổ sung tài liệu mới hoặc đặt lại
            bộ lọc.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategoryFilter('all');
              setScopeFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md"
          >
            Xem toàn bộ nguồn tham khảo
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReferences.map((ref) => {
            const catMeta = SOURCE_CATEGORY_METADATA[ref.sourceType];
            const scopeText = REFERENCE_VILLAGE_SCOPE_LABELS[ref.villageScope];
            const isPending = ref.verificationStatus === 'dang-cho-xac-minh';
            const hasValidUrl =
              ref.url.startsWith('http://') || ref.url.startsWith('https://');
            const linkedRecords = records.filter((rec) => rec.referenceIds.includes(ref.id));
            const isHighlighted = highlightedRefId === ref.id;

            return (
              <article
                id={`ref-card-${ref.id}`}
                key={ref.id}
                className={`bg-[#FBF9F5] border p-6 sm:p-8 space-y-6 transition-colors ${
                  isHighlighted
                    ? 'border-[#8C2F1B] ring-1 ring-[#8C2F1B]/30'
                    : 'border-[#E2D9C8]'
                }`}
              >
                {/* Top Metadata Row + Admin Edit/Delete Controls */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#EDE6DA] pb-4">
                  <div className="space-y-2">
                    <div className="text-xs text-[#6B5B4E] flex flex-wrap items-center gap-1.5">
                      <span className="font-mono font-semibold text-[#8C2F1B]">{ref.id}</span>
                      <span aria-hidden="true">·</span>
                      <strong className="font-medium text-[#1F1A17]">{catMeta.label}</strong>
                      <span aria-hidden="true">·</span>
                      <span className={isPending ? 'italic text-[#9A5B25]' : 'text-[#2E5A36] font-medium'}>
                        {isPending ? PENDING_SOURCE_VERIFICATION : 'Đã xác minh'}
                      </span>
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1A17] leading-snug">
                      {ref.title === PENDING_SOURCE_VERIFICATION ? (
                        <span className="italic text-[#8C583A]">
                          Tên tài liệu: {PENDING_SOURCE_VERIFICATION}
                        </span>
                      ) : (
                        ref.title
                      )}
                    </h2>
                  </div>

                  {/* Admin Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(ref)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#F3EFE6] hover:bg-[#E7DFD1] border border-[#D8CEBE] text-[#1F1A17] rounded-md transition-colors whitespace-nowrap shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Sửa</span>
                    </button>

                    {confirmDeleteId === ref.id ? (
                      <div className="inline-flex items-center gap-1.5 bg-[#FDF2F0] border border-[#E5B8B0] px-2.5 py-1 rounded-md">
                        <span className="text-xs text-[#7A271A]">Xác nhận xóa?</span>
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteReference(ref.id);
                            setConfirmDeleteId(null);
                          }}
                          className="px-2 py-0.5 text-xs font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-xs"
                        >
                          Xóa
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2 py-0.5 text-xs text-[#5C4D42] hover:text-[#1F1A17]"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(ref.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#E2D9C8] text-[#7A271A] hover:bg-[#FDF2F0] rounded-md transition-colors whitespace-nowrap shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Required Bibliographic Metadata Definition List */}
                <dl className="divide-y divide-[#EDE6DA] text-sm">
                  <div className="py-2.5 sm:grid sm:grid-cols-12 sm:gap-4">
                    <dt className="sm:col-span-4 text-xs uppercase tracking-wider text-[#6B5B4E] font-medium">
                      Tên tài liệu
                    </dt>
                    <dd
                      className={`mt-1 sm:mt-0 sm:col-span-8 ${
                        ref.title.includes(PENDING_SOURCE_VERIFICATION)
                          ? 'italic text-[#8C583A]'
                          : 'text-[#1F1A17]'
                      }`}
                    >
                      {ref.title}
                    </dd>
                  </div>

                  <div className="py-2.5 sm:grid sm:grid-cols-12 sm:gap-4">
                    <dt className="sm:col-span-4 text-xs uppercase tracking-wider text-[#6B5B4E] font-medium">
                      Tác giả / Cơ quan phát hành
                    </dt>
                    <dd
                      className={`mt-1 sm:mt-0 sm:col-span-8 ${
                        ref.publisherOrAuthor.includes(PENDING_SOURCE_VERIFICATION)
                          ? 'italic text-[#8C583A]'
                          : 'text-[#1F1A17]'
                      }`}
                    >
                      {ref.publisherOrAuthor}
                    </dd>
                  </div>

                  <div className="py-2.5 sm:grid sm:grid-cols-12 sm:gap-4">
                    <dt className="sm:col-span-4 text-xs uppercase tracking-wider text-[#6B5B4E] font-medium">
                      Năm công bố
                    </dt>
                    <dd
                      className={`mt-1 sm:mt-0 sm:col-span-8 tabular-nums ${
                        ref.publishYear.includes(PENDING_SOURCE_VERIFICATION)
                          ? 'italic text-[#8C583A]'
                          : 'text-[#1F1A17]'
                      }`}
                    >
                      {ref.publishYear}
                    </dd>
                  </div>

                  <div className="py-2.5 sm:grid sm:grid-cols-12 sm:gap-4">
                    <dt className="sm:col-span-4 text-xs uppercase tracking-wider text-[#6B5B4E] font-medium">
                      Loại nguồn
                    </dt>
                    <dd className="mt-1 sm:mt-0 sm:col-span-8 text-[#1F1A17]">
                      {catMeta.label} — <span className="text-[#6B5B4E]">{catMeta.description}</span>
                    </dd>
                  </div>

                  <div className="py-2.5 sm:grid sm:grid-cols-12 sm:gap-4">
                    <dt className="sm:col-span-4 text-xs uppercase tracking-wider text-[#6B5B4E] font-medium">
                      Phạm vi làng nghề chứng minh
                    </dt>
                    <dd
                      className={`mt-1 sm:mt-0 sm:col-span-8 font-medium ${
                        ref.villageScope === 'dang-cho-xac-minh'
                          ? 'italic text-[#8C583A]'
                          : 'text-[#1F1A17]'
                      }`}
                    >
                      {scopeText}
                    </dd>
                  </div>

                  <div className="py-2.5 sm:grid sm:grid-cols-12 sm:gap-4">
                    <dt className="sm:col-span-4 text-xs uppercase tracking-wider text-[#6B5B4E] font-medium">
                      Đường dẫn truy cập
                    </dt>
                    <dd className="mt-1 sm:mt-0 sm:col-span-8 break-all">
                      {hasValidUrl ? (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#8C2F1B] hover:underline underline-offset-4"
                        >
                          <span>{ref.url}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      ) : (
                        <span className="italic text-[#8C583A]">{ref.url}</span>
                      )}
                    </dd>
                  </div>

                  <div className="py-2.5 sm:grid sm:grid-cols-12 sm:gap-4">
                    <dt className="sm:col-span-4 text-xs uppercase tracking-wider text-[#6B5B4E] font-medium">
                      Nội dung được sử dụng
                    </dt>
                    <dd
                      className={`mt-1 sm:mt-0 sm:col-span-8 leading-relaxed ${
                        ref.usedContent.includes(PENDING_SOURCE_VERIFICATION)
                          ? 'italic text-[#8C583A]'
                          : 'text-[#1F1A17]'
                      }`}
                    >
                      {ref.usedContent}
                    </dd>
                  </div>
                </dl>

                {/* Linked Archival Records */}
                <div className="pt-3 border-t border-[#EDE6DA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span className="text-[#6B5B4E] tabular-nums">
                    Số hồ sơ dữ liệu đang tham chiếu nguồn này: {linkedRecords.length}
                  </span>
                  {linkedRecords.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {linkedRecords.map((rec) => (
                        <button
                          key={rec.id}
                          type="button"
                          onClick={() => onSelectRecord(rec)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 font-mono bg-[#F3EFE6] hover:bg-[#E7DFD1] border border-[#D8CEBE] text-[#1F1A17] rounded-xs transition-colors whitespace-nowrap shrink-0"
                        >
                          <FileText className="w-3 h-3 text-[#8C2F1B]" />
                          <span>{rec.id}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <ReferenceFormModal
        isOpen={isModalOpen}
        editingSource={editingSource}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSource(null);
        }}
        onSave={handleSaveReference}
      />
    </div>
  );
};
