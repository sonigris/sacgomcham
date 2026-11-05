import React from 'react';
import { PageRoute } from '../types/archive';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAddModal: () => void;
  onExportJson: () => void;
  onResetSampleData: () => void;
  totalRecordsCount: number;
  verifiedRecordsCount: number;
  totalReferencesCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAddModal,
  onExportJson,
  onResetSampleData,
  totalRecordsCount,
  verifiedRecordsCount,
  totalReferencesCount,
}) => {
  const go = (page: PageRoute) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-[#E2D9C8] bg-[#F3EFE6] text-[#5C4D42]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-3">
            <p className="font-serif text-xl font-bold text-[#1F1A17]">
              SẮC GỐM CHĂM – Nghệ thuật làm gốm của người Chăm
            </p>
            <p className="text-sm leading-relaxed max-w-md">
              Không gian lưu trữ số phục vụ giới thiệu, phân loại và bảo tồn tư liệu nghề gốm truyền
              thống của người Chăm tại làng Trì Đức (Ligok, Bình Thuận) và làng Bàu Trúc (Hamu Crok,
              Ninh Thuận).
            </p>
            <p className="text-xs text-[#78695D] pt-1 tabular-nums">
              Hồ sơ lưu trữ: {totalRecordsCount} (Đã xác minh: {verifiedRecordsCount}) · Nguồn tham
              khảo quản lý: {totalReferencesCount}
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <p className="text-xs uppercase tracking-widest text-[#1F1A17] font-semibold">
              Chuyên mục lưu trữ
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => go('trang-chu')}
                  className="hover:text-[#8C2F1B] transition-colors"
                >
                  Trang chủ & Giới thiệu đề tài
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('ky-thuat')}
                  className="hover:text-[#8C2F1B] transition-colors"
                >
                  Kỹ thuật truyền thống (Phân hệ 1)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('quy-trinh')}
                  className="hover:text-[#8C2F1B] transition-colors"
                >
                  Quy trình 7 bước (Phân hệ 2)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('cong-cu-nghe-nhan')}
                  className="hover:text-[#8C2F1B] transition-colors"
                >
                  Công cụ & Nghệ nhân (Phân hệ 3)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('lang-nghe')}
                  className="hover:text-[#8C2F1B] transition-colors"
                >
                  Làng nghề Trì Đức & Bàu Trúc
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('nguon-tham-khao')}
                  className="hover:text-[#8C2F1B] transition-colors font-medium text-[#1F1A17]"
                >
                  Tư liệu và nguồn tham khảo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go('hoi-dap')}
                  className="hover:text-[#8C2F1B] transition-colors"
                >
                  Hỏi đáp tư liệu có kiểm chứng
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#1F1A17] font-semibold">
              Quản trị tư liệu & Nguồn tham khảo
            </p>
            <p className="text-xs leading-relaxed text-[#6B5B4E]">
              Mọi nguồn chưa xác minh đều hiển thị &ldquo;Đang chờ xác minh&rdquo;. Tuyệt đối phân
              biệt nguồn của Trì Đức và Bàu Trúc, không lấy tư liệu làng này khẳng định cho làng
              kia.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenAddModal}
                className="px-4 py-2 text-xs font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md hover:bg-[#732413] transition-colors whitespace-nowrap shrink-0"
              >
                Bổ sung tư liệu thật
              </button>
              <button
                type="button"
                onClick={onExportJson}
                className="px-3.5 py-2 text-xs font-medium border border-[#C8B9A6] text-[#1F1A17] bg-[#FBF9F5] rounded-md hover:bg-[#EBE4D8] transition-colors whitespace-nowrap shrink-0"
              >
                Xuất tệp JSON
              </button>
              <button
                type="button"
                onClick={onResetSampleData}
                className="px-3 py-2 text-xs text-[#6B5B4E] hover:text-[#8C2F1B] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Khôi phục mẫu gốc
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#DFD6C7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#78695D]">
          <p>
            SẮC GỐM CHĂM · Hồ sơ số hóa di sản nghề gốm truyền thống tại Trì Đức (Ligok) và Bàu Trúc
            (Hamu Crok).
          </p>
          <p>Phục vụ nghiên cứu, giáo dục và bảo tồn văn hóa cộng đồng.</p>
        </div>
      </div>
    </footer>
  );
};
