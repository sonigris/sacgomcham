import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  FileText,
  Filter,
  MessageSquareQuote,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Tag,
  Wrench,
  Users,
  Compass,
} from 'lucide-react';
import {
  ArchivalRecord,
  ArtisanKeeperProfile,
  ReferenceSource,
  VillageId,
} from '../types/archive';
import {
  POTTERY_TOOLS_CATALOG,
  RESEARCH_TERMS_GLOSSARY,
  INITIAL_ARTISAN_PROFILES,
} from '../data/potteryModulesData';
import { VILLAGE_METADATA, UNVERIFIED_TEXT } from '../data/chamPotteryArchive';
import { AbstractIllustration } from '../components/AbstractIllustration';
import { InlineReferenceCitation } from '../components/InlineReferenceCitation';
import { ArtisanImageFrame } from '../components/ArtisanImageFrame';
import { AddArtisanProfileModal } from '../components/AddArtisanProfileModal';

const ARTISAN_PROFILES_STORAGE_KEY = 'sac_gom_cham_artisan_profiles_v2';

interface ToolsAndArtisansPageProps {
  records: ArchivalRecord[];
  references: ReferenceSource[];
  onSelectRecord: (record: ArchivalRecord) => void;
  onOpenAddArtisanModal: (village: VillageId) => void;
  onNavigateToReferences: (highlightRefId?: string) => void;
}

export const ToolsAndArtisansPage: React.FC<ToolsAndArtisansPageProps> = ({
  records,
  references,
  onSelectRecord,
  onOpenAddArtisanModal,
  onNavigateToReferences,
}) => {
  const [activeTab, setActiveTab] = useState<'tools' | 'glossary' | 'artisans'>('tools');
  const [toolVillageFilter, setToolVillageFilter] = useState<'all' | 'tri-duc' | 'bau-truc'>('all');
  const [glossaryCategory, setGlossaryCategory] = useState<
    'all' | 'dia-danh-nguyen-lieu' | 'san-pham-ban-dia' | 'thao-tac-ky-thuat'
  >('all');
  const [artisanVillageFilter, setArtisanVillageFilter] = useState<'all' | 'tri-duc' | 'bau-truc'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Artisan Keeper Profiles state
  const [artisanProfiles, setArtisanProfiles] = useState<ArtisanKeeperProfile[]>(() => {
    try {
      const saved = localStorage.getItem(ARTISAN_PROFILES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_ARTISAN_PROFILES;
  });

  const [isAddProfileModalOpen, setIsAddProfileModalOpen] = useState(false);
  const [modalPresetVillage, setModalPresetVillage] = useState<VillageId>('bau-truc');

  useEffect(() => {
    try {
      localStorage.setItem(ARTISAN_PROFILES_STORAGE_KEY, JSON.stringify(artisanProfiles));
    } catch {
      // ignore
    }
  }, [artisanProfiles]);

  const handleSaveProfile = (newProfile: ArtisanKeeperProfile) => {
    setArtisanProfiles((prev) => [newProfile, ...prev]);
  };

  const handleResetArtisanProfiles = () => {
    setArtisanProfiles(INITIAL_ARTISAN_PROFILES);
    localStorage.removeItem(ARTISAN_PROFILES_STORAGE_KEY);
  };

  const filteredTools = POTTERY_TOOLS_CATALOG.filter((t) => {
    if (toolVillageFilter !== 'all' && t.villageScope !== 'chung-ca-hai' && t.villageScope !== toolVillageFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.vietnameseName.toLowerCase().includes(q) ||
        t.nativeName.toLowerCase().includes(q) ||
        t.purpose.toLowerCase().includes(q) ||
        t.material.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredGlossary = RESEARCH_TERMS_GLOSSARY.filter((term) => {
    if (glossaryCategory !== 'all' && term.category !== glossaryCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        term.term.toLowerCase().includes(q) ||
        term.meaning.toLowerCase().includes(q) ||
        term.culturalContext.toLowerCase().includes(q) ||
        (term.chamScriptOrPhonetic && term.chamScriptOrPhonetic.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const filteredArtisans = artisanProfiles.filter((p) => {
    if (artisanVillageFilter !== 'all' && p.village !== artisanVillageFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.fullName.toLowerCase().includes(q) ||
        p.specializedTechniques.toLowerCase().includes(q) ||
        p.transmissionProcess.toLowerCase().includes(q) ||
        p.interviewInfo.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* 1. Header & Section Switcher */}
      <div className="space-y-6 border-b border-[#E2D9C8] pb-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-widest text-[#8C2F1B] font-semibold">
            Phân hệ 03 · Công cụ, Thuật ngữ & Nghệ nhân
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold text-[#1F1A17] leading-tight">
            Công cụ chế tác, Thuật ngữ bản địa và Hồ sơ Người giữ nghề
          </h1>
          <p className="text-base text-[#5C4D42] leading-relaxed">
            Hệ thống danh mục công cụ thủ công với tên gọi bản địa tiếng Chăm, từ điển thuật ngữ được
            ghi nhận trong các tài liệu nghiên cứu (như <em>tanuh, juak halan, jaik halan, padang paduk, mathik gaok, agai paoh, ngap bingu hala</em>)
            và hồ sơ người giữ nghề theo chuẩn mực nhân học di sản phi vật thể.
          </p>
        </div>

        {/* Top 3-Section Nav Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EDE6DA] rounded-lg">
            <button
              type="button"
              onClick={() => {
                setActiveTab('tools');
                setSearchQuery('');
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'tools'
                  ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#1F1A17]'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Danh mục Công cụ & Tên bản địa ({POTTERY_TOOLS_CATALOG.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('glossary');
                setSearchQuery('');
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'glossary'
                  ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#1F1A17]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Thuật ngữ nghiên cứu ({RESEARCH_TERMS_GLOSSARY.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('artisans');
                setSearchQuery('');
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'artisans'
                  ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#1F1A17]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Hồ sơ Người giữ nghề ({artisanProfiles.length})</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm nhanh..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FBF9F5] border border-[#C8BBA8] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8C2F1B]"
            />
            <Search className="w-3.5 h-3.5 text-[#78695D] absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MỤC 1: DANH MỤC CÔNG CỤ & TÊN BẢN ĐỊA                 */}
      {/* ======================================================== */}
      {activeTab === 'tools' && (
        <section aria-labelledby="heading-tools-catalog" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#8C2F1B] font-semibold">
                Dụng cụ truyền thống độc bản
              </p>
              <h2 id="heading-tools-catalog" className="font-serif text-2xl font-semibold text-[#1F1A17]">
                Dụng cụ làm gốm & Tên gọi địa phương ({filteredTools.length} công cụ)
              </h2>
            </div>

            {/* Village Scope Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#6B5B4E]">Phạm vi làng:</span>
              <button
                type="button"
                onClick={() => setToolVillageFilter('all')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  toolVillageFilter === 'all'
                    ? 'bg-[#8C2F1B] text-[#FBF9F5]'
                    : 'bg-[#EDE6DA] text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Tất cả
              </button>
              <button
                type="button"
                onClick={() => setToolVillageFilter('bau-truc')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  toolVillageFilter === 'bau-truc'
                    ? 'bg-[#8C2F1B] text-[#FBF9F5]'
                    : 'bg-[#EDE6DA] text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Bàu Trúc (Hamu Crok)
              </button>
              <button
                type="button"
                onClick={() => setToolVillageFilter('tri-duc')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  toolVillageFilter === 'tri-duc'
                    ? 'bg-[#8C2F1B] text-[#FBF9F5]'
                    : 'bg-[#EDE6DA] text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Trì Đức (Ligok)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredTools.map((tool) => (
              <article
                key={tool.id}
                className="bg-[#FBF9F5] border border-[#E2D9C8] p-6 flex flex-col justify-between space-y-5 hover:border-[#C2AF98] transition-colors"
              >
                <div className="space-y-4">
                  <AbstractIllustration
                    illustrationKey={tool.illustrationKey}
                    aspectClass="aspect-[16/10]"
                    showCaption={false}
                  />

                  <div className="space-y-1.5">
                    <div className="text-xs text-[#78695D] flex items-center justify-between">
                      <span className="font-mono text-[#1F1A17]">{tool.id}</span>
                      <span>
                        {tool.villageScope === 'bau-truc'
                          ? 'Bàu Trúc'
                          : tool.villageScope === 'tri-duc'
                            ? 'Trì Đức'
                            : 'Chung cả hai làng'}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-[#1F1A17]">
                      {tool.vietnameseName}
                    </h3>

                    <p className="text-xs font-mono text-[#8C2F1B] font-medium bg-[#F3EFE6] px-2.5 py-1 rounded-xs inline-block">
                      Tên bản địa: {tool.nativeName}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-[#5C4D42]">
                    <p>
                      <strong className="text-[#1F1A17]">Công dụng:</strong> {tool.purpose}
                    </p>
                    <p>
                      <strong className="text-[#1F1A17]">Chất liệu chế tạo:</strong> {tool.material}
                    </p>
                    <p>
                      <strong className="text-[#1F1A17]">Công đoạn áp dụng:</strong>{' '}
                      {tool.techniqueStage}
                    </p>
                    {tool.notes && (
                      <p className="text-[#78695D] italic pt-1 border-t border-[#EDE6DA]">
                        {tool.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EDE6DA]">
                  <InlineReferenceCitation
                    referenceIds={tool.sourceReferences}
                    allReferences={references}
                    label="Nguồn tài liệu"
                    compact
                    onNavigateToReferences={onNavigateToReferences}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 3. MỤC 2: THUẬT NGỮ NGHIÊN CỨU ĐƯỢC GHI NHẬN             */}
      {/* ======================================================== */}
      {activeTab === 'glossary' && (
        <section aria-labelledby="heading-research-terms" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE6DA] pb-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#8C2F1B] font-semibold">
                Hệ thống ngôn ngữ & Khái niệm học thuật
              </p>
              <h2 id="heading-research-terms" className="font-serif text-2xl font-semibold text-[#1F1A17]">
                Thuật ngữ nghiên cứu được ghi nhận ({filteredGlossary.length} thuật ngữ)
              </h2>
            </div>

            {/* Category Segmented Control */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs bg-[#EDE6DA] p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setGlossaryCategory('all')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                  glossaryCategory === 'all'
                    ? 'bg-[#FBF9F5] text-[#8C2F1B]'
                    : 'text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Tất cả
              </button>
              <button
                type="button"
                onClick={() => setGlossaryCategory('thao-tac-ky-thuat')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                  glossaryCategory === 'thao-tac-ky-thuat'
                    ? 'bg-[#FBF9F5] text-[#8C2F1B]'
                    : 'text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Kỹ thuật (Juak halan, Padang paduk, Mathik gaok...)
              </button>
              <button
                type="button"
                onClick={() => setGlossaryCategory('dia-danh-nguyen-lieu')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                  glossaryCategory === 'dia-danh-nguyen-lieu'
                    ? 'bg-[#FBF9F5] text-[#8C2F1B]'
                    : 'text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Mỏ đất & Địa danh (Tanuh, Lan...)
              </button>
              <button
                type="button"
                onClick={() => setGlossaryCategory('san-pham-ban-dia')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                  glossaryCategory === 'san-pham-ban-dia'
                    ? 'bg-[#FBF9F5] text-[#8C2F1B]'
                    : 'text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Sản phẩm (Jek, Gok, Cambak, Bilaok...)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FBF9F5] border border-[#E2D9C8] p-6 space-y-4 hover:border-[#C2AF98] transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono text-[#8C2F1B] uppercase tracking-wider font-semibold">
                      {item.category === 'dia-danh-nguyen-lieu'
                        ? 'Mỏ đất & Địa danh'
                        : item.category === 'san-pham-ban-dia'
                          ? 'Sản phẩm bản địa'
                          : 'Thao tác kỹ thuật'}
                    </span>
                    <span className="text-[#78695D]">
                      {item.villageAttribution === 'bau-truc'
                        ? 'Bàu Trúc (Ninh Thuận)'
                        : item.villageAttribution === 'tri-duc'
                          ? 'Trì Đức (Bình Thuận)'
                          : 'Ghi nhận cả hai làng'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#1F1A17]">
                      {item.term}
                    </h3>
                    {item.chamScriptOrPhonetic && (
                      <p className="text-xs font-mono text-[#8C2F1B] mt-0.5">
                        {item.chamScriptOrPhonetic}
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-[#1F1A17] font-medium leading-relaxed">
                    {item.meaning}
                  </p>

                  <p className="text-xs text-[#5C4D42] leading-relaxed bg-[#F3EFE6] p-3 rounded-xs border border-[#E2D9C8]">
                    <strong className="text-[#1F1A17]">Bối cảnh văn hóa & Tri thức bản địa:</strong>{' '}
                    {item.culturalContext}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EDE6DA]">
                  <InlineReferenceCitation
                    referenceIds={item.citedReferenceIds}
                    allReferences={references}
                    label="Tài liệu trích dẫn"
                    compact
                    onNavigateToReferences={onNavigateToReferences}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 4. MỤC 3: HỒ SƠ NGƯỜI GIỮ NGHỀ & NGHỆ NHÂN              */}
      {/* ======================================================== */}
      {activeTab === 'artisans' && (
        <section aria-labelledby="heading-artisans-module" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE6DA] pb-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#8C2F1B] font-semibold">
                Chủ thể sống của di sản
              </p>
              <h2 id="heading-artisans-module" className="font-serif text-2xl font-semibold text-[#1F1A17]">
                Hồ sơ Người giữ nghề & Nghệ nhân ({filteredArtisans.length} hồ sơ)
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setModalPresetVillage('bau-truc');
                  setIsAddProfileModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md hover:bg-[#732413] transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Bổ sung hồ sơ người giữ nghề</span>
              </button>

              <button
                type="button"
                onClick={handleResetArtisanProfiles}
                className="inline-flex items-center gap-1 px-2.5 py-2 text-xs text-[#78695D] hover:text-[#8C2F1B] border border-[#D8CEBE] rounded-md hover:bg-[#F3EFE6] transition-colors"
                title="Khôi phục hồ sơ mẫu chuẩn nhân học"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi phục mẫu</span>
              </button>
            </div>
          </div>

          {/* Ethical Banner */}
          <div className="bg-[#F3EFE6] border border-[#D8CEBE] p-5 sm:p-6 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2F1B] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Nguyên tắc đạo đức nhân học & Bản quyền danh tính</span>
            </div>
            <p className="text-sm text-[#5C4D42] leading-relaxed">
              Hệ thống <strong>tuyệt đối không tự tạo tên nghệ nhân hoặc thông tin chưa xác minh</strong>.
              Khi chưa có quyết định công nhận hoặc văn bản điền dã có sự đồng thuận của nghệ nhân,
              mục họ tên sẽ hiển thị rõ <em>&ldquo;Chưa có tư liệu xác minh&rdquo;</em>.
              Đồng thời, hệ thống <strong>tuyệt đối không dùng ảnh AI giả làm nghệ nhân hoặc hoạt động văn hóa thực tế</strong>;
              mọi vị trí chưa có ảnh thực địa đều hiển thị khung chờ tiêu chuẩn <em>&ldquo;Chưa có hình ảnh tư liệu xác minh&rdquo;</em>.
            </p>
          </div>

          {/* Village Filter for Artisans */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#6B5B4E] font-medium">Lọc theo làng:</span>
              <button
                type="button"
                onClick={() => setArtisanVillageFilter('all')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  artisanVillageFilter === 'all'
                    ? 'bg-[#8C2F1B] text-[#FBF9F5]'
                    : 'bg-[#EDE6DA] text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Tất cả ({artisanProfiles.length})
              </button>
              <button
                type="button"
                onClick={() => setArtisanVillageFilter('bau-truc')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  artisanVillageFilter === 'bau-truc'
                    ? 'bg-[#8C2F1B] text-[#FBF9F5]'
                    : 'bg-[#EDE6DA] text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Bàu Trúc (Hamu Crok)
              </button>
              <button
                type="button"
                onClick={() => setArtisanVillageFilter('tri-duc')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  artisanVillageFilter === 'tri-duc'
                    ? 'bg-[#8C2F1B] text-[#FBF9F5]'
                    : 'bg-[#EDE6DA] text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Trì Đức (Ligok)
              </button>
            </div>

            <p className="text-xs text-[#78695D]">
              Phân định rành mạch: Tư liệu làng này không khẳng định cho làng kia
            </p>
          </div>

          {/* Artisan Profiles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {filteredArtisans.map((profile) => {
              const vMeta = VILLAGE_METADATA[profile.village];
              return (
                <article
                  key={profile.id}
                  className="bg-[#FBF9F5] border border-[#E2D9C8] p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[#C2AF98] transition-colors"
                >
                  <div className="space-y-5">
                    {/* Header line */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B5B4E] border-b border-[#EDE6DA] pb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[#1F1A17] font-semibold">
                          {profile.id}
                        </span>
                        <span aria-hidden="true">·</span>
                        <strong className="font-medium text-[#1F1A17]">
                          {vMeta.name} ({profile.localVillageName})
                        </strong>
                        <span aria-hidden="true">·</span>
                        <span>Dân tộc {profile.ethnicity}</span>
                      </div>

                      <span
                        className={`px-2 py-0.5 text-[11px] rounded-xs font-medium ${
                          profile.isSampleOrUnverified
                            ? 'bg-[#F7EFE2] text-[#9A5B25] border border-[#DECFBA]'
                            : 'bg-[#EAF3EB] text-[#2E5A36] border border-[#CFDFD1]'
                        }`}
                      >
                        {profile.fullName.includes('Chưa có')
                          ? 'Chưa có tư liệu xác minh'
                          : 'Đã xác minh'}
                      </span>
                    </div>

                    {/* Họ tên người giữ nghề */}
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wider text-[#78695D]">
                        Họ tên người giữ nghề / Nghệ nhân
                      </p>
                      <h3 className="font-serif text-2xl font-semibold text-[#1F1A17]">
                        {profile.fullName}
                      </h3>
                      {profile.fullName.includes('Chưa có') && (
                        <p className="text-xs text-[#8C2F1B] italic">
                          (Hệ thống tuân thủ nguyên tắc không tự suy diễn hoặc bịa đặt tên nghệ nhân)
                        </p>
                      )}
                    </div>

                    {/* Hình ảnh và Khung chờ ảnh chuẩn nhân học */}
                    <ArtisanImageFrame
                      hasVerifiedImage={profile.hasVerifiedImage}
                      imageUrl={profile.imageUrl}
                      imageCaption={profile.imageCaption}
                      imageSource={profile.imageSource}
                      imageUsageRights={profile.imageUsageRights}
                      artisanName={profile.fullName}
                      villageName={vMeta.name}
                    />

                    {/* Detailed Information Grid */}
                    <div className="space-y-3.5 text-xs text-[#5C4D42] pt-1">
                      <div className="bg-[#FAF7F0] border border-[#E6DECF] p-3 rounded-xs space-y-1">
                        <p className="font-semibold text-[#1F1A17]">
                          Địa phương & Vùng văn hóa:
                        </p>
                        <p>{vMeta.currentAdmin}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="font-semibold text-[#1F1A17]">
                          Kinh nghiệm làm nghề:
                        </p>
                        <p className="leading-relaxed bg-[#FBF9F5] p-2.5 rounded-xs border border-[#EDE6DA]">
                          {profile.experience}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="font-semibold text-[#1F1A17]">
                          Kỹ thuật tạo tác chuyên sâu:
                        </p>
                        <p className="leading-relaxed bg-[#FBF9F5] p-2.5 rounded-xs border border-[#EDE6DA]">
                          {profile.specializedTechniques}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="font-semibold text-[#1F1A17]">
                          Quá trình truyền nghề:
                        </p>
                        <p className="leading-relaxed bg-[#FBF9F5] p-2.5 rounded-xs border border-[#EDE6DA]">
                          {profile.transmissionProcess}
                        </p>
                      </div>

                      {/* Thông tin phỏng vấn */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center gap-1.5 font-semibold text-[#8C2F1B]">
                          <MessageSquareQuote className="w-3.5 h-3.5" />
                          <span>Thông tin phỏng vấn / Lời kể người thực hành:</span>
                        </div>
                        <blockquote className="bg-[#F3EFE6] border-l-2 border-[#8C2F1B] p-3 italic text-xs leading-relaxed text-[#4A3D34]">
                          {profile.interviewInfo}
                        </blockquote>
                      </div>
                    </div>
                  </div>

                  {/* Footnote & References */}
                  <div className="space-y-3 pt-4 border-t border-[#EDE6DA]">
                    {profile.attributionNote && (
                      <p className="text-[11px] text-[#78695D]">
                        <strong className="text-[#1F1A17]">Ghi chú phân định:</strong>{' '}
                        {profile.attributionNote}
                      </p>
                    )}

                    <InlineReferenceCitation
                      referenceIds={profile.citedReferenceIds}
                      allReferences={references}
                      label="Nguồn tài liệu đối chiếu"
                      compact
                      onNavigateToReferences={onNavigateToReferences}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Modal Add Artisan Profile */}
      <AddArtisanProfileModal
        isOpen={isAddProfileModalOpen}
        onClose={() => setIsAddProfileModalOpen(false)}
        onSave={handleSaveProfile}
        allReferences={references}
        defaultVillage={modalPresetVillage}
      />
    </div>
  );
};
