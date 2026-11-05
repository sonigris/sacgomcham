import React, { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import { ArchivalRecord, ReferenceSource, VillageId } from '../types/archive';
import { VILLAGE_METADATA, UNVERIFIED_TEXT } from '../data/chamPotteryArchive';
import { AccessionMetadataList } from '../components/AccessionMetadataList';
import { InlineReferenceCitation } from '../components/InlineReferenceCitation';

interface ArtisansPageProps {
  records: ArchivalRecord[];
  references: ReferenceSource[];
  onSelectRecord: (record: ArchivalRecord) => void;
  onOpenAddArtisanModal: (village: VillageId) => void;
  onNavigateToReferences: (highlightRefId?: string) => void;
}

export const ArtisansPage: React.FC<ArtisansPageProps> = ({
  records,
  references,
  onSelectRecord,
  onOpenAddArtisanModal,
  onNavigateToReferences,
}) => {
  const [villageFilter, setVillageFilter] = useState<'all' | VillageId>('all');

  const artisanRecords = records.filter(
    (r) => r.category === 'nghe-nhan' && (villageFilter === 'all' || r.village === villageFilter)
  );

  const roleLabels: Record<NonNullable<ArchivalRecord['artisanRoleType']>, string> = {
    'nghe-nhan-truyen-day': 'Nghệ nhân truyền dạy nghề',
    'nguoi-thuc-hanh': 'Người thực hành nghề thường xuyên',
    'nguoi-luu-giu': 'Người lưu giữ nghề & sưu tầm cộng đồng',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Header */}
      <div className="space-y-6 border-b border-[#E2D9C8] pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#8C2F1B] font-semibold">
              Chuyên mục 04 · Chủ thể Di sản Văn hóa
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17]">
              Nghệ nhân, Người thực hành và Người lưu giữ nghề
            </h1>
            <p className="text-base text-[#5C4D42] leading-relaxed">
              Hồ sơ UNESCO và các tài liệu báo chí – nghiên cứu khẳng định nghề gốm Chăm gắn liền với
              vai trò trung tâm của người phụ nữ, trao truyền qua các thế hệ trong gia đình và cộng
              đồng tại Trì Đức (Ligok) và Bàu Trúc (Hamu Crok).
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenAddArtisanModal(villageFilter === 'bau-truc' ? 'bau-truc' : 'tri-duc')
            }
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md hover:bg-[#732413] transition-colors whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Bổ sung hồ sơ nghệ nhân xác minh</span>
          </button>
        </div>

        {/* Ethical Notice Box */}
        <div className="bg-[#F3EFE6] border border-[#D8CEBE] p-5 sm:p-6 space-y-3">
          <h2 className="font-serif text-base sm:text-lg font-semibold text-[#1F1A17]">
            Cam kết trung thực danh tính & đối chiếu nguồn
          </h2>
          <p className="text-sm text-[#5C4D42] leading-relaxed">
            Hệ thống <strong>tuyệt đối không tự tạo tên nghệ nhân, năm sinh, danh hiệu hay nguồn
            tài liệu chưa xác minh</strong>. Mọi trường danh tính cá nhân khi chưa có nguồn chính
            thức hoặc nguồn cộng đồng kiểm chứng đều hiển thị rõ là{' '}
            <em>&ldquo;{UNVERIFIED_TEXT}&rdquo;</em> và nguồn riêng cá nhân hiển thị{' '}
            <em>&ldquo;Đang chờ xác minh&rdquo;</em>.
          </p>

          <InlineReferenceCitation
            referenceIds={['REF-01', 'REF-02', 'REF-04']}
            allReferences={references}
            attributionNote="Các nguồn REF-01, REF-02, REF-04 chứng minh vai trò của phụ nữ Chăm nói chung; danh sách nghệ nhân cụ thể từng làng cần nguồn công nhận riêng."
            label="Nguồn tham khảo phần giới thiệu chủ thể di sản"
            compact
            onNavigateToReferences={onNavigateToReferences}
          />
        </div>

        {/* Village Filter */}
        <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EDE6DA] rounded-lg">
          <button
            type="button"
            onClick={() => setVillageFilter('all')}
            className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              villageFilter === 'all'
                ? 'bg-[#FBF9F5] text-[#1F1A17] shadow-xs'
                : 'text-[#5C4D42] hover:text-[#1F1A17]'
            }`}
          >
            Tất cả hai làng (phân tách rõ)
          </button>
          <button
            type="button"
            onClick={() => setVillageFilter('tri-duc')}
            className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              villageFilter === 'tri-duc'
                ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                : 'text-[#5C4D42] hover:text-[#1F1A17]'
            }`}
          >
            Làng Trì Đức (Ligok) · Bình Thuận
          </button>
          <button
            type="button"
            onClick={() => setVillageFilter('bau-truc')}
            className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              villageFilter === 'bau-truc'
                ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                : 'text-[#5C4D42] hover:text-[#1F1A17]'
            }`}
          >
            Làng Bàu Trúc (Hamu Crok) · Ninh Thuận
          </button>
        </div>
      </div>

      {/* Artisan Archival Dossiers */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-semibold text-[#1F1A17]">
          Danh mục hồ sơ chủ thể văn hóa ({artisanRecords.length} hồ sơ)
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {artisanRecords.map((rec) => {
            const vMeta = VILLAGE_METADATA[rec.village];
            const roleText = rec.artisanRoleType
              ? roleLabels[rec.artisanRoleType]
              : 'Chủ thể thực hành & lưu giữ nghề';

            return (
              <article
                key={rec.id}
                className="bg-[#FBF9F5] border border-[#E2D9C8] p-6 sm:p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="text-xs text-[#6B5B4E] flex flex-wrap items-center gap-1.5">
                    <span className="font-mono font-medium text-[#1F1A17]">{rec.id}</span>
                    <span aria-hidden="true">·</span>
                    <strong className="font-medium text-[#1F1A17]">{vMeta.shortLabel}</strong>
                    <span aria-hidden="true">·</span>
                    <span>{roleText}</span>
                    <span aria-hidden="true">·</span>
                    <span className={rec.isSampleData ? 'text-[#9A5B25]' : 'text-[#2E5A36]'}>
                      {rec.isSampleData ? 'Khung hồ sơ mẫu' : 'Hồ sơ đã xác minh'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1A17] leading-snug">
                      {rec.title}
                    </h3>
                    <p className="text-sm text-[#5C4D42] leading-relaxed">{rec.details}</p>
                  </div>

                  <AccessionMetadataList record={rec} />

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
                    {rec.isSampleData
                      ? 'Danh tính cá nhân cụ thể: Đang chờ xác minh nguồn'
                      : 'Tư liệu đã xác minh thực địa'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectRecord(rec)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#F3EFE6] hover:bg-[#E7DFD1] border border-[#D8CEBE] text-[#1F1A17] rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Cập nhật / Xem hồ sơ</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
