import React, { useState } from 'react';
import { ArrowRight, BookOpen, Flame, Hand, HeartHandshake } from 'lucide-react';
import { ReferenceSource } from '../types/archive';
import { AbstractIllustration } from '../components/AbstractIllustration';
import { InlineReferenceCitation } from '../components/InlineReferenceCitation';

interface TechniquesPageProps {
  references: ReferenceSource[];
  onNavigateToProcess: (stepOrder?: number) => void;
  onNavigateToToolsAndArtisans: () => void;
  onNavigateToReferences: (highlightRefId?: string) => void;
}

export const TechniquesPage: React.FC<TechniquesPageProps> = ({
  references,
  onNavigateToProcess,
  onNavigateToToolsAndArtisans,
  onNavigateToReferences,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'khong-ban-xoay' | 'nung-lo-thien' | 'phu-nu-cham'>('all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">
      {/* 1. Header & Curatorial Introduction */}
      <div className="space-y-6 border-b border-[#E2D9C8] pb-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-widest text-[#8C2F1B] font-semibold">
            Phân hệ 01 · Tri thức Kỹ thuật Di sản
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold text-[#1F1A17] leading-tight">
            Kỹ thuật làm gốm truyền thống của người Chăm
          </h1>
          <p className="text-base sm:text-lg text-[#5C4D42] leading-relaxed">
            Khám phá ba trụ cột định hình giá trị di sản độc bản được UNESCO đưa vào Danh sách Cần bảo
            vệ khẩn cấp: nghệ thuật tạo hình bằng tay không dùng bàn xoay, kỹ thuật nung lộ thiên tự
            nhiên và vai trò lịch sử của người phụ nữ Chăm trong trao truyền di sản.
          </p>
        </div>

        {/* Interactive Segmented Filter */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EDE6DA] rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'all'
                ? 'bg-[#FBF9F5] text-[#1F1A17] shadow-xs'
                : 'text-[#5C4D42] hover:text-[#1F1A17]'
            }`}
          >
            Toàn cảnh 3 trụ cột kỹ thuật
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('khong-ban-xoay')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'khong-ban-xoay'
                ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                : 'text-[#5C4D42] hover:text-[#1F1A17]'
            }`}
          >
            Tạo hình không dùng bàn xoay
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('nung-lo-thien')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'nung-lo-thien'
                ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                : 'text-[#5C4D42] hover:text-[#1F1A17]'
            }`}
          >
            Nung gốm lộ thiên ngoài trời
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('phu-nu-cham')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'phu-nu-cham'
                ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                : 'text-[#5C4D42] hover:text-[#1F1A17]'
            }`}
          >
            Vai trò phụ nữ Chăm
          </button>
        </div>
      </div>

      {/* 2. TRỤ CỘT 1: KỸ THUẬT TẠO HÌNH KHÔNG DÙNG BÀN XOAY */}
      {(activeTab === 'all' || activeTab === 'khong-ban-xoay') && (
        <section
          aria-labelledby="heading-khong-ban-xoay"
          className="border border-[#E2D9C8] bg-[#FBF9F5] p-6 sm:p-10 space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <AbstractIllustration
                illustrationKey="pottery-pedestal-coil"
                aspectClass="aspect-[4/3]"
                title="Minh họa kỹ thuật đắp phôi thỏi đất trên bệ kê cố định"
              />
              <div className="bg-[#F3EFE6] border border-[#E2D9C8] p-4 text-xs text-[#5C4D42] space-y-1">
                <p className="font-semibold text-[#1F1A17]">Thuật ngữ dân gian ghi nhận:</p>
                <p className="leading-relaxed">
                  &ldquo;Nắn bằng tay, xoay bằng chân&rdquo; (hay &ldquo;làm bằng tay, xoay bằng
                  mông&rdquo;) — người thợ chính là trục quay sống động thay cho máy móc cơ khí.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2F1B] uppercase tracking-wider">
                  <Hand className="w-4 h-4" />
                  <span>Trụ cột kỹ thuật 01</span>
                </div>
                <h2
                  id="heading-khong-ban-xoay"
                  className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F1A17] leading-snug"
                >
                  Kỹ thuật tạo hình bằng tay – Tuyệt đối không dùng bàn xoay
                </h2>
                <p className="text-base text-[#3D332C] leading-relaxed">
                  Trong khi phần lớn các trung tâm gốm cổ trên thế giới và tại Việt Nam đều sử dụng
                  bàn xoay cơ học với trục quay cố định và người thợ ngồi yên một chỗ, nghệ thuật làm
                  gốm của người Chăm bảo tồn nguyên vẹn kỹ thuật tạo hình thời nguyên thủy.
                </p>
              </div>

              <div className="space-y-4 text-sm text-[#3D332C] leading-relaxed">
                <div className="border-t border-[#EDE6DA] pt-4 space-y-2">
                  <h3 className="font-serif text-base font-semibold text-[#1F1A17]">
                    1. Cơ chế bệ kê đứng yên và nhịp bước chân lùi
                  </h3>
                  <p>
                    Khối đất sét đã luyện dẻo được đặt trên một chiếc đôn hoặc hòn kê cố định
                    (thường là một chiếc chum hoặc lu gốm cũ úp ngược) cao ngang thắt lưng. Người phụ
                    nữ Chăm đứng thẳng, vừa đi giật lùi vòng quanh chiếc đôn, vừa dùng hai bàn tay
                    uyển chuyển kéo giãn và vuốt thớ đất theo chiều thẳng đứng để nâng cao dần thành
                    gốm.
                  </p>
                </div>

                <div className="border-t border-[#EDE6DA] pt-4 space-y-2">
                  <h3 className="font-serif text-base font-semibold text-[#1F1A17]">
                    2. Kỹ thuật cuộn dải đất (Danach) và phối hợp vải quơ nhúng nước
                  </h3>
                  <p>
                    Đối với các sản phẩm có kích thước lớn như chum (jek) hay lu (mơng), người thợ
                    vê đất thành từng thỏi dài hình con trạch (tiếng Chăm gọi là danach) rồi đắp nối
                    từng vòng lên miệng phôi. Bằng một mảnh giẻ ướt (vải quơ) kẹp vào ngón tay, người
                    thợ miết nhẹ để làm liền thớ đất và chuốt tròn vành miệng một cách chính xác tuyệt
                    đối mà không cần thước đo.
                  </p>
                </div>

                <div className="border-t border-[#EDE6DA] pt-4 space-y-2">
                  <h3 className="font-serif text-base font-semibold text-[#1F1A17]">
                    3. Tính chất độc bản của từng sản phẩm
                  </h3>
                  <p>
                    Chính nhờ việc không dùng khuôn đúc hay bàn xoay định hình, mỗi sản phẩm gốm Chăm
                    đều là một tác phẩm điêu khắc độc bản. Mọi đường cong, độ dày mỏng và hình thể của
                    chiếc nồi, chiếc vò đều mang dấu ấn của hơi thở, nhịp chân và cảm nhận xúc giác
                    của từng người thợ.
                  </p>
                </div>
              </div>

              <InlineReferenceCitation
                referenceIds={['REF-01', 'REF-02', 'REF-04', 'REF-05']}
                allReferences={references}
                attributionNote="Hồ sơ UNESCO (REF-01) và các nghiên cứu khoa học xác nhận kỹ thuật di chuyển quanh hòn kê không bàn xoay là giá trị khác biệt cốt lõi nhất của di sản gốm Chăm."
                onNavigateToReferences={onNavigateToReferences}
              />
            </div>
          </div>
        </section>
      )}

      {/* 3. TRỤ CỘT 2: KỸ THUẬT NUNG LỘ THIÊN NGOÀI TRỜI */}
      {(activeTab === 'all' || activeTab === 'nung-lo-thien') && (
        <section
          aria-labelledby="heading-nung-lo-thien"
          className="border border-[#E2D9C8] bg-[#FBF9F5] p-6 sm:p-10 space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <AbstractIllustration
                illustrationKey="fire-patina"
                aspectClass="aspect-[4/3]"
                title="Minh họa sắc màu tro than, vệt khói và lửa lộ thiên"
              />
              <div className="bg-[#F3EFE6] border border-[#E2D9C8] p-4 text-xs text-[#5C4D42] space-y-1">
                <p className="font-semibold text-[#1F1A17]">Thông số kỹ thuật nung lộ thiên:</p>
                <p className="leading-relaxed">
                  Nhiệt độ: ~800°C · Thời gian nung: 7–8 giờ · Nhiên liệu: Củi khô, rơm rạ và vỏ trấu
                  · Không xây lò gạch cố định.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2F1B] uppercase tracking-wider">
                  <Flame className="w-4 h-4" />
                  <span>Trụ cột kỹ thuật 02</span>
                </div>
                <h2
                  id="heading-nung-lo-thien"
                  className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F1A17] leading-snug"
                >
                  Kỹ thuật nung lộ thiên và nghệ thuật hòa sắc của lửa
                </h2>
                <p className="text-base text-[#3D332C] leading-relaxed">
                  Người Chăm không xây lò nung kín kiểu lò cóc, lò bầu hay lò tuynel. Họ đưa toàn bộ
                  sản phẩm ra bãi đất trống ngoài trời để nung lộ thiên, biến ngọn lửa và gió trời
                  thành chất xúc tác tạo nên màu sắc biến ảo tự nhiên.
                </p>
              </div>

              <div className="space-y-4 text-sm text-[#3D332C] leading-relaxed">
                <div className="border-t border-[#EDE6DA] pt-4 space-y-2">
                  <h3 className="font-serif text-base font-semibold text-[#1F1A17]">
                    1. Kiến trúc đống nung lộ thiên ngoài trời
                  </h3>
                  <p>
                    Trên bãi đất phẳng cao ráo, người thợ rải một lớp củi gỗ dày làm nền chịu nhiệt.
                    Các sản phẩm lớn (lu, chum, khay) được xếp vững chắc ở tầng dưới, các sản phẩm
                    nhỏ hơn (nồi, ấm, bát) được úp xen kẽ ở tầng trên. Sau đó, toàn bộ đống gốm được
                    phủ kín hoàn toàn bằng một lớp rơm rạ dày và phủ thêm vỏ trấu để giữ nhiệt độ ổn
                    định không bị tản nhiệt ra không khí.
                  </p>
                </div>

                <div className="border-t border-[#EDE6DA] pt-4 space-y-2">
                  <h3 className="font-serif text-base font-semibold text-[#1F1A17]">
                    2. Nghệ thuật canh hướng gió và chế độ nhiệt
                  </h3>
                  <p>
                    Ngọn lửa được châm theo hướng gió để nhiệt lượng lan tỏa từ từ qua từng kẽ hở
                    của đống gốm. Quá trình nung kéo dài từ 7 đến 8 tiếng đồng hồ với nhiệt độ nung
                    đạt xấp xỉ 800°C. Người phụ nữ Chăm có kinh nghiệm nhìn màu khói và cảm nhận hơi
                    nóng bốc lên từ đống rơm để biết chính xác thời điểm gốm đã chín đanh.
                  </p>
                </div>

                <div className="border-t border-[#EDE6DA] pt-4 space-y-2">
                  <h3 className="font-serif text-base font-semibold text-[#1F1A17]">
                    3. Tạo sắc màu mộc và kỹ thuật vẩy nước vỏ cây sau nung
                  </h3>
                  <p>
                    Vì gốm không phủ men hóa học, vẻ đẹp màu sắc trên thân gốm được tạo nên bởi sự
                    tiếp xúc trực tiếp của ngọn lửa và tàn tro rơm rạ. Sự không đồng đều của luồng nhiệt
                    tự nhiên đã in lên bề mặt gốm các vệt màu đỏ gạch, vàng thổ, xám tro và đen khói
                    óng ánh. Tại một số cơ sở, khi vừa dỡ gốm còn nóng hổi ra khỏi đống tro, nghệ
                    nhân dùng nước chiết xuất từ vỏ cây rừng (như cây mắm hoặc cây dông) vẩy lên thân
                    gốm, tạo nên những chấm đốm màu huyền ảo và làm se khít mao dẫn đất nung.
                  </p>
                </div>
              </div>

              <InlineReferenceCitation
                referenceIds={['REF-01', 'REF-02', 'REF-04']}
                allReferences={references}
                attributionNote="UNESCO (REF-01) và Viện KT-XH Hà Nội (REF-04) xác nhận chi tiết chế độ nung lộ thiên 7–8 giờ ở khoảng 800°C bằng củi và rơm rạ khô."
                onNavigateToReferences={onNavigateToReferences}
              />
            </div>
          </div>
        </section>
      )}

      {/* 4. TRỤ CỘT 3: VAI TRÒ CỦA PHỤ NỮ CHĂM */}
      {(activeTab === 'all' || activeTab === 'phu-nu-cham') && (
        <section
          aria-labelledby="heading-phu-nu-cham"
          className="border border-[#E2D9C8] bg-[#FBF9F5] p-6 sm:p-10 space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <AbstractIllustration
                illustrationKey="incised-motif"
                aspectClass="aspect-[4/3]"
                title="Minh họa hoa văn và dấu ấn bàn tay người phụ nữ Chăm"
              />
              <div className="bg-[#F3EFE6] border border-[#E2D9C8] p-4 text-xs text-[#5C4D42] space-y-1">
                <p className="font-semibold text-[#1F1A17]">Chế độ mẫu hệ và truyền nghề:</p>
                <p className="leading-relaxed">
                  Nghề gốm Chăm trao truyền theo dòng mẹ (&ldquo;mẹ truyền con nối&rdquo;). Người phụ
                  nữ là chủ thể sáng tạo, quản lý và gìn giữ tri thức bản địa qua hàng thế kỷ.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2F1B] uppercase tracking-wider">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Trụ cột kỹ thuật 03</span>
                </div>
                <h2
                  id="heading-phu-nu-cham"
                  className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F1A17] leading-snug"
                >
                  Vai trò của phụ nữ Chăm trong sản xuất, sáng tạo, truyền nghề và bảo tồn
                </h2>
                <p className="text-base text-[#3D332C] leading-relaxed">
                  Trong đời sống văn hóa xã hội mẫu hệ của người Chăm, người phụ nữ giữ vai trò trung
                  tâm của gia đình và dòng tộc. Nghề gốm truyền thống là minh chứng sinh động nhất
                  cho năng lực sáng tạo và vị thế văn hóa đặc biệt của người phụ nữ Chăm.
                </p>
              </div>

              <div className="space-y-4 text-sm text-[#3D332C] leading-relaxed">
                <div className="border-t border-[#EDE6DA] pt-4 space-y-2">
                  <h3 className="font-serif text-base font-semibold text-[#1F1A17]">
                    1. Trong sản xuất trực tiếp và sáng tạo thẩm mỹ
                  </h3>
                  <p>
                    Người phụ nữ Chăm là người trực tiếp đảm nhận các khâu tinh xảo nhất: thẩm định độ
                    dẻo của đất sét, nhào nhồi cát, tạo phôi, vuốt miệng gốm, cạo mỏng thành trong và
                    chà láng bề mặt. Với linh cảm thẩm mỹ thiên bẩm, họ dùng những dụng cụ thô sơ như
                    mép vỏ sò biển, que tre vót nhọn để khắc lên thân gốm những mô-típ hoa văn giàu
                    tính biểu tượng như sóng nước, cành lá, hoa sen cách điệu.
                  </p>
                </div>

                <div className="border-t border-[#EDE6DA] pt-4 space-y-2">
                  <h3 className="font-serif text-base font-semibold text-[#1F1A17]">
                    2. Trong cơ chế phân công lao động hài hòa
                  </h3>
                  <p>
                    Nghề gốm có sự phối hợp nhịp nhàng trong cộng đồng gia đình: nam giới hỗ trợ các
                    công việc nặng nhọc như đào đất từ ruộng sâu, gánh chở đất về làng, kiếm củi nung
                    và hỗ trợ xếp củi tại bãi nung. Toàn bộ khâu quyết định về hình dáng, hoa văn, tỷ
                    lệ pha trộn và điều hành nung đều thuộc về phụ nữ.
                  </p>
                </div>

                <div className="border-t border-[#EDE6DA] pt-4 space-y-2">
                  <h3 className="font-serif text-base font-semibold text-[#1F1A17]">
                    3. Trong truyền dạy và bảo tồn bền vững di sản
                  </h3>
                  <p>
                    Tri thức gốm Chăm không được ghi chép thành sách vở mà truyền miệng và truyền nghề
                    trực quan theo phương thức &ldquo;cầm tay chỉ việc&rdquo; từ người bà, người mẹ sang
                    con gái và cháu gái ngay trong sân nhà. Người phụ nữ Chăm không chỉ giữ một nghề kiếm
                    sống, mà đang gìn giữ tâm hồn, phong tục tập quán, tri thức môi trường và biểu
                    tượng cội nguồn của cả dân tộc.
                  </p>
                </div>
              </div>

              <InlineReferenceCitation
                referenceIds={['REF-01', 'REF-02', 'REF-05']}
                allReferences={references}
                attributionNote="Hồ sơ di sản UNESCO (REF-01) nhấn mạnh vai trò phụ nữ Chăm là tiêu chí cốt lõi công nhận di sản và là đối tượng trung tâm cần được bảo vệ trong các chính sách bảo tồn."
                onNavigateToReferences={onNavigateToReferences}
              />
            </div>
          </div>
        </section>
      )}

      {/* 5. Navigation Links to Module 2 & Module 3 */}
      <div className="pt-6 border-t border-[#E2D9C8] flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigateToProcess(1)}
          className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md hover:bg-[#732413] transition-colors whitespace-nowrap shrink-0"
        >
          <span>Khám phá Phân hệ 2: Quy trình làm gốm 7 bước</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onNavigateToToolsAndArtisans}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border border-[#C8B9A6] text-[#1F1A17] bg-[#F3EFE6] hover:bg-[#E7DFD1] rounded-md transition-colors whitespace-nowrap shrink-0"
        >
          <BookOpen className="w-4 h-4 text-[#8C2F1B]" />
          <span>Xem Phân hệ 3: Công cụ & Nghệ nhân</span>
        </button>
      </div>
    </div>
  );
};
