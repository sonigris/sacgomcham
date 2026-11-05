import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute } from '../types/archive';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

const NAV_ITEMS: Array<{ id: PageRoute; label: string }> = [
  { id: 'trang-chu', label: 'Trang chủ' },
  { id: 'ky-thuat', label: 'Kỹ thuật truyền thống' },
  { id: 'quy-trinh', label: 'Quy trình 7 bước' },
  { id: 'cong-cu-nghe-nhan', label: 'Công cụ & Nghệ nhân' },
  { id: 'lang-nghe', label: 'Làng nghề' },
  { id: 'nguon-tham-khao', label: 'Tư liệu & nguồn tham khảo' },
];

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-[#E2D9C8]">
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('trang-chu')}
          className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1F1A17] hover:text-[#8C2F1B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C2F1B]"
        >
          SẮC GỐM CHĂM
        </button>

        {/* Zone 2: Single-line text navigation links */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden xl:flex items-center gap-5 text-sm font-medium text-[#5C4D42]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === 'cong-cu-nghe-nhan' &&
                (currentPage === 'dung-cu-san-pham' || currentPage === 'nghe-nhan'));

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C2F1B] ${
                  isActive
                    ? 'text-[#8C2F1B] border-[#8C2F1B] font-semibold'
                    : 'border-transparent hover:text-[#1F1A17] hover:border-[#C8B9A6]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (+ mobile menu trigger below xl) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('hoi-dap')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C2F1B] ${
              currentPage === 'hoi-dap'
                ? 'bg-[#6E2211] text-[#FBF9F5]'
                : 'bg-[#8C2F1B] text-[#FBF9F5] hover:bg-[#732413]'
            }`}
          >
            Hỏi đáp tư liệu
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Đóng trình đơn' : 'Mở trình đơn'}
            className="xl:hidden p-2 rounded-md text-[#1F1A17] hover:bg-[#F3EFE6] transition-colors focus-visible:outline-2 focus-visible:outline-[#8C2F1B]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Điều hướng di động"
          className="xl:hidden border-t border-[#E2D9C8] bg-[#FBF9F5] px-4 py-3 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === 'cong-cu-nghe-nhan' &&
                (currentPage === 'dung-cu-san-pham' || currentPage === 'nghe-nhan'));

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F3EFE6] text-[#8C2F1B] font-semibold'
                    : 'text-[#5C4D42] hover:bg-[#F3EFE6] hover:text-[#1F1A17]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};
