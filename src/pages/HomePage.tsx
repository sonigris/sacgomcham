import React from 'react';
import { ArrowRight, BookOpen, Flame, Hand, Layers, Users, Wrench } from 'lucide-react';
import { ArchivalRecord, PageRoute, ReferenceSource, VillageId } from '../types/archive';
import { AbstractIllustration } from '../components/AbstractIllustration';
import { InlineReferenceCitation } from '../components/InlineReferenceCitation';
import { VILLAGE_METADATA } from '../data/chamPotteryArchive';
import { SEVEN_PROCESS_STEPS } from '../data/potteryModulesData';

interface HomePageProps {
  records: ArchivalRecord[];
  references: ReferenceSource[];
  onNavigate: (page: PageRoute, initialVillage?: VillageId) => void;
  onNavigateToReferences: (highlightRefId?: string) => void;
  onSelectRecord: (record: ArchivalRecord) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  records,
  references,
  onNavigate,
  onNavigateToReferences,
  onSelectRecord,
}) => {
  const triDucCount = records.filter((r) => r.village === 'tri-duc').length;
  const bauTrucCount = records.filter((r) => r.village === 'bau-truc').length;
  const verifiedRefCount = references.filter(
    (r) => r.verificationStatus === 'da-xac-minh'
  ).length;

  const featuredRecords = records.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-8">
      {/* 1. Institutional Exhibition Hero */}
      <section className="pt-8 sm:pt-12 lg:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-widest text-[#78695D] font-medium">
                  Không gian Lưu trữ & Bảo tồn Di sản Văn hóa Phi vật thể
                </p>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold text-[#1F1A17] leading-[1.18]">
                  SẮC GỐM CHĂM – Nghệ thuật làm gốm của người Chăm
                </h1>

                <p className="text-base sm:text-lg text-[#5C4D42] leading-relaxed max-w-2xl">
                  Hệ thống giới thiệu, phân loại và lưu giữ tư liệu có đối chiếu nguồn tham khảo về
                  nghề làm gốm thủ công truyền thống của người Chăm tại{' '}
                  <strong className="font-semibold text-[#1F1A17]">
                    Làng gốm Trì Đức (Ligok), Bình Thuận
                  </strong>{' '}
                  và{' '}
                  <strong className="font-semibold text-[#1F1A17]">
                    Làng gốm Bàu Trúc (Hamu Crok), Ninh Thuận
                  </strong>
                  .
                </p>
              </div>

              <div className="space-y-6 pt-2">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('ky-thuat')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md hover:bg-[#732413] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Khám phá 3 kỹ thuật cốt lõi</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('quy-trinh')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium border border-[#C8B9A6] text-[#1F1A17] bg-[#F3EFE6] hover:bg-[#E7DFD1] rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    <Layers className="w-4 h-4 text-[#8C2F1B]" />
                    <span>Xem quy trình 7 bước</span>
                  </button>
                </div>

                <InlineReferenceCitation
                  referenceIds={['REF-01', 'REF-02']}
                  allReferences={references}
                  label="Nguồn tham khảo giới thiệu đề tài"
                  compact
                  onNavigateToReferences={onNavigateToReferences}
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col">
              <AbstractIllustration
                illustrationKey="hero-terracotta"
                aspectClass="aspect-[16/10] lg:h-full"
                className="h-full"
              />
            </div>
          </div>

          {/* Operational Archival Ribbon */}
          <div className="mt-10 pt-6 border-t border-b border-[#E2D9C8] py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#78695D]">Điểm di sản 01</p>
              <p className="mt-1 font-medium text-[#1F1A17]">
                Trì Đức (Ligok) · Bình Đức, Bình Thuận
              </p>
              <p className="text-xs text-[#6B5B4E] mt-0.5 tabular-nums">
                {triDucCount} hồ sơ lưu trữ độc lập
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#78695D]">Điểm di sản 02</p>
              <p className="mt-1 font-medium text-[#1F1A17]">
                Bàu Trúc (Hamu Crok) · Ninh Thuận
              </p>
              <p className="text-xs text-[#6B5B4E] mt-0.5 tabular-nums">
                {bauTrucCount} hồ sơ lưu trữ độc lập
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#78695D]">Thư mục tham khảo</p>
              <p className="mt-1 font-medium text-[#1F1A17] tabular-nums">
                {references.length} nguồn ({verifiedRefCount} xác minh ·{' '}
                {references.length - verifiedRefCount} chờ xác minh)
              </p>
              <button
                type="button"
                onClick={() => onNavigate('nguon-tham-khao')}
                className="text-xs text-[#8C2F1B] hover:underline underline-offset-4 mt-0.5"
              >
                Quản lý thêm / sửa / xóa nguồn
              </button>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#78695D]">Kỷ luật học thuật</p>
              <p className="mt-1 font-medium text-[#1F1A17]">
                Không dùng chéo tư liệu hai làng
              </p>
              <p className="text-xs text-[#6B5B4E] mt-0.5">
                Mọi nguồn chưa rõ ghi &ldquo;Đang chờ xác minh&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE MODULES SPOTLIGHT (PHÂN HỆ 1, 2, 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2D9C8] pb-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8C2F1B] font-semibold">
              Hệ thống 3 Phân hệ Di sản Cốt lõi
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#1F1A17]">
              Cấu trúc tri thức gốm Chăm toàn diện
            </h2>
          </div>
          <span className="text-xs text-[#6B5B4E]">
            Mỗi phân hệ đều gắn liền với tư liệu thực tế và tài liệu đối chiếu
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Card Phân hệ 1 */}
          <article className="bg-[#FBF9F5] border border-[#E2D9C8] p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[#C2AF98] transition-colors">
            <div className="space-y-4">
              <AbstractIllustration
                illustrationKey="pottery-pedestal-coil"
                aspectClass="aspect-[16/10]"
                showCaption={false}
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2F1B] uppercase tracking-wider">
                  <Hand className="w-4 h-4" />
                  <span>Phân hệ 01</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1A17]">
                  Kỹ thuật làm gốm truyền thống
                </h3>
                <p className="text-sm text-[#5C4D42] leading-relaxed">
                  Giải thích chuyên sâu 3 trụ cột kỹ thuật: tạo hình không dùng bàn xoay (&ldquo;nắn
                  bằng tay, xoay bằng chân&rdquo;), nung gốm lộ thiên ngoài trời (7–8 giờ ở ~800°C)
                  và vai trò lịch sử của người phụ nữ Chăm trong trao truyền di sản mẫu hệ.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDE6DA] flex items-center justify-between">
              <span className="text-xs text-[#6B5B4E]">Có hình ảnh & nguồn kèm theo</span>
              <button
                type="button"
                onClick={() => onNavigate('ky-thuat')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8C2F1B] hover:text-[#732413]"
              >
                <span>Xem phân hệ 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>

          {/* Card Phân hệ 2 */}
          <article className="bg-[#FBF9F5] border border-[#E2D9C8] p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[#C2AF98] transition-colors">
            <div className="space-y-4">
              <AbstractIllustration
                illustrationKey="sun-drying-patina"
                aspectClass="aspect-[16/10]"
                showCaption={false}
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2F1B] uppercase tracking-wider">
                  <Layers className="w-4 h-4" />
                  <span>Phân hệ 02</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1A17]">
                  Quy trình làm gốm 7 công đoạn
                </h3>
                <p className="text-sm text-[#5C4D42] leading-relaxed">
                  Giao diện từng bước chi tiết (Interactive Stepper) với hình ảnh minh họa, mô tả công
                  đoạn, công cụ sử dụng và nguồn tham khảo kiểm chứng cho từng bước: Chuẩn bị đất →
                  Nhào đất → Tạo phôi → Chỉnh hình → Trang trí → Phơi → Nung lộ thiên.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDE6DA] flex items-center justify-between">
              <span className="text-xs text-[#6B5B4E] tabular-nums">7 bước chuẩn hóa</span>
              <button
                type="button"
                onClick={() => onNavigate('quy-trinh')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8C2F1B] hover:text-[#732413]"
              >
                <span>Xem quy trình 7 bước</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>

          {/* Card Phân hệ 3 */}
          <article className="bg-[#FBF9F5] border border-[#E2D9C8] p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[#C2AF98] transition-colors">
            <div className="space-y-4">
              <AbstractIllustration
                illustrationKey="shell-comb-carving"
                aspectClass="aspect-[16/10]"
                showCaption={false}
              />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2F1B] uppercase tracking-wider">
                  <Wrench className="w-4 h-4" />
                  <span>Phân hệ 03</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1A17]">
                  Công cụ, Thuật ngữ & Nghệ nhân
                </h3>
                <p className="text-sm text-[#5C4D42] leading-relaxed">
                  Danh mục công cụ kèm tên bản địa, từ điển thuật ngữ nghiên cứu (ruộng đất sét Tan /
                  Hamu Tanu Halan, Lan, Danach, Jek, Gok, Cambak, Bilaok...) và hồ sơ nghệ nhân,
                  người thực hành nghề tôn trọng chuẩn mực đạo đức điền dã.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDE6DA] flex items-center justify-between">
              <span className="text-xs text-[#6B5B4E]">Thuật ngữ bản địa & danh mục</span>
              <button
                type="button"
                onClick={() => onNavigate('cong-cu-nghe-nhan')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8C2F1B] hover:text-[#732413]"
              >
                <span>Xem phân hệ 3</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* 3. Editorial Overview of Pottery Tradition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-[#8C2F1B] font-semibold">
                Bài viết Tổng quan Di sản
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F1A17]">
                Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp của nhân loại
              </h2>
              <div className="space-y-4 text-base text-[#3D332C] leading-[1.8] max-w-prose">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:text-[#8C2F1B] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                  N
                  gày 29/11/2022, nghệ thuật làm gốm của người Chăm chính thức được UNESCO ghi danh
                  vào Danh sách Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp (hồ sơ số 01574). Khác
                  với truyền thống làm gốm dùng bàn xoay phổ biến, người phụ nữ Chăm tạo dáng sản
                  phẩm hoàn toàn bằng đôi bàn tay trong lúc bước đi giật lùi vòng quanh khối đất đặt
                  trên kê cố định.
                </p>
                <p>
                  Các sản phẩm gốm gia dụng, gốm nghi lễ và gốm mỹ nghệ đều không tráng men mà được
                  phơi nắng khô rồi nung lộ thiên ngoài trời bằng củi và rơm. Trước sức ép của đô thị
                  hóa, nguồn nguyên liệu thu hẹp và sự đứt gãy thế hệ kế cận, việc phân loại và lưu
                  trữ chuẩn xác thông tin từng làng nghề có ý nghĩa nền tảng cho công tác bảo tồn.
                </p>
              </div>
            </div>

            <InlineReferenceCitation
              referenceIds={['REF-01', 'REF-02', 'REF-04']}
              allReferences={references}
              attributionNote="Bài viết tổng quan sử dụng các thông tin chung đã được UNESCO và cơ quan báo chí/nghiên cứu xác nhận cho di sản gốm Chăm; không suy diễn chi tiết riêng của từng làng."
              label="Nguồn tham khảo của bài viết tổng quan"
              onNavigateToReferences={onNavigateToReferences}
            />
          </div>

          <div className="lg:col-span-5 bg-[#F3EFE6] border border-[#E2D9C8] p-6 sm:p-8 space-y-5">
            <h3 className="font-serif text-xl font-semibold text-[#1F1A17]">
              Nguyên tắc kiểm chứng nguồn tư liệu
            </h3>
            <p className="text-sm text-[#5C4D42] leading-relaxed">
              Mọi bài viết và hồ sơ dữ liệu trong hệ thống Sắc Gốm Chăm đều gắn liền với danh mục
              quản lý nguồn tham khảo theo bốn nguyên tắc:
            </p>
            <ul className="divide-y divide-[#DFD6C7] text-sm text-[#3D332C]">
              <li className="py-3">
                <strong className="font-semibold text-[#1F1A17]">Mỗi nội dung đều kèm nguồn:</strong>{' '}
                Hiển thị trực tiếp mã tài liệu tham khảo hoặc trạng thái &ldquo;Đang chờ xác
                minh&rdquo; ngay dưới từng bài viết và từng phiếu dữ liệu.
              </li>
              <li className="py-3">
                <strong className="font-semibold text-[#1F1A17]">
                  Phân biệt nguồn Trì Đức và Bàu Trúc:
                </strong>{' '}
                Tài liệu khảo sát riêng tại Bàu Trúc (như sông Quao) không được dùng để khẳng định
                cho làng Trì Đức và ngược lại.
              </li>
              <li className="py-3">
                <strong className="font-semibold text-[#1F1A17]">Không tự bịa thông tin thư mục:</strong>{' '}
                Không tự tạo tên tác giả, năm công bố, đường dẫn hoặc trích dẫn chưa đối chiếu.
              </li>
              <li className="py-3">
                <strong className="font-semibold text-[#1F1A17]">Đạo đức hình ảnh:</strong> Không tạo
                hình ảnh AI giả làm người Chăm, trang phục hay nghi lễ văn hóa thực tế.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Two Heritage Villages Side-by-Side */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2D9C8] pb-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8C2F1B] font-semibold">
              Hai trung tâm thực hành di sản
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#1F1A17]">
              Phân vùng tư liệu và nguồn chứng minh riêng từng làng nghề
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('lang-nghe')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8C2F1B] hover:text-[#732413] whitespace-nowrap shrink-0"
          >
            <span>Xem hồ sơ chi tiết hai làng</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {(['tri-duc', 'bau-truc'] as VillageId[]).map((vid) => {
            const v = VILLAGE_METADATA[vid];
            const illusKey = vid === 'tri-duc' ? 'clay-earth' : 'fire-patina';
            return (
              <article
                key={vid}
                className="flex flex-col justify-between bg-[#F3EFE6]/60 border border-[#E2D9C8] p-6 sm:p-8 space-y-6"
              >
                <div className="space-y-5">
                  <AbstractIllustration
                    illustrationKey={illusKey}
                    aspectClass="aspect-[16/9]"
                    showCaption={false}
                  />

                  <div className="space-y-2">
                    <p className="text-xs text-[#6B5B4E]">
                      Tên gọi địa phương: <strong className="text-[#1F1A17]">{v.localName}</strong> ·{' '}
                      {v.currentAdmin}
                    </p>
                    <h3 className="font-serif text-2xl font-semibold text-[#1F1A17]">{v.name}</h3>
                    <p className="text-sm sm:text-base text-[#5C4D42] leading-relaxed">
                      {v.overview}
                    </p>
                  </div>

                  <InlineReferenceCitation
                    referenceIds={v.referenceIds}
                    allReferences={references}
                    attributionNote={v.attributionWarning}
                    label={`Nguồn tham khảo mục ${v.name}`}
                    compact
                    onNavigateToReferences={onNavigateToReferences}
                  />
                </div>

                <div className="pt-4 border-t border-[#DFD6C7] flex items-center justify-between gap-4">
                  <span className="text-xs text-[#6B5B4E]">Dân tộc Chăm · Lưu trữ độc lập</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('lang-nghe', vid)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8C2F1B] hover:text-[#732413] whitespace-nowrap shrink-0"
                  >
                    <span>Mở chuyên trang {v.localName}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. Sample Archival Dossiers Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2D9C8] pb-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8C2F1B] font-semibold">
              Hồ sơ tư liệu có gắn nguồn đối chiếu
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#1F1A17]">
              Tra cứu theo chuẩn 9 tiêu chí kèm nguồn tham khảo
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('hoi-dap')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8C2F1B] hover:text-[#732413] whitespace-nowrap shrink-0"
          >
            <span>Tra cứu bằng Hỏi đáp Gemini</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredRecords.map((rec) => {
            const v = VILLAGE_METADATA[rec.village];
            return (
              <div
                key={rec.id}
                className="border border-[#E2D9C8] bg-[#FBF9F5] p-6 flex flex-col justify-between space-y-5 hover:border-[#C2AF98] transition-colors"
              >
                <div className="space-y-3">
                  <div className="text-xs text-[#6B5B4E] flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[#1F1A17]">{rec.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>{v.shortLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className={rec.isSampleData ? 'text-[#9A5B25]' : 'text-[#2E5A36]'}>
                      {rec.isSampleData ? 'Dữ liệu mẫu minh họa' : 'Đã xác minh'}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[#1F1A17] leading-snug">
                    {rec.title}
                  </h3>

                  <p className="text-sm text-[#5C4D42] leading-relaxed">{rec.summary}</p>

                  <InlineReferenceCitation
                    referenceIds={rec.referenceIds || []}
                    allReferences={references}
                    compact
                    onNavigateToReferences={onNavigateToReferences}
                  />
                </div>

                <div className="pt-3 border-t border-[#EDE6DA] flex items-center justify-between text-xs text-[#6B5B4E]">
                  <span>Tên địa phương: {rec.localName}</span>
                  <button
                    type="button"
                    onClick={() => onSelectRecord(rec)}
                    className="font-medium text-[#8C2F1B] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                  >
                    Xem phiếu 9 tiêu chí
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
