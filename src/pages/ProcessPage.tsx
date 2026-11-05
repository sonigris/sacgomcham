import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight, Layers, Plus, Wrench, Sparkles, AlertCircle } from 'lucide-react';
import {
  ArchivalRecord,
  ReferenceSource,
  VillageId,
} from '../types/archive';
import { AbstractIllustration } from '../components/AbstractIllustration';
import { InlineReferenceCitation } from '../components/InlineReferenceCitation';
import { SEVEN_PROCESS_STEPS, PotteryProcessStepData } from '../data/potteryModulesData';
import { VILLAGE_METADATA } from '../data/chamPotteryArchive';

interface ProcessPageProps {
  records: ArchivalRecord[];
  references: ReferenceSource[];
  initialStepOrder?: number;
  onSelectRecord: (record: ArchivalRecord) => void;
  onOpenAddProcessRecord: (village: VillageId) => void;
  onNavigateToReferences: (highlightRefId?: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({
  records,
  references,
  initialStepOrder,
  onSelectRecord,
  onOpenAddProcessRecord,
  onNavigateToReferences,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(() => {
    if (initialStepOrder && initialStepOrder >= 1 && initialStepOrder <= 7) {
      return initialStepOrder - 1;
    }
    return 0;
  });

  const [viewMode, setViewMode] = useState<'stepper' | 'full'>('stepper');
  const [villageFilter, setVillageFilter] = useState<'all' | VillageId>('all');

  useEffect(() => {
    if (initialStepOrder && initialStepOrder >= 1 && initialStepOrder <= 7) {
      setActiveStepIndex(initialStepOrder - 1);
    }
  }, [initialStepOrder]);

  const currentStep: PotteryProcessStepData = SEVEN_PROCESS_STEPS[activeStepIndex];

  const handleNextStep = () => {
    if (activeStepIndex < SEVEN_PROCESS_STEPS.length - 1) {
      setActiveStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  };

  const relatedArchivalRecords = records.filter(
    (r) =>
      r.category === 'quy-trinh' &&
      (r.processStepOrder === currentStep.stepNumber ||
        (!r.processStepOrder && currentStep.stepNumber === 1)) &&
      (villageFilter === 'all' || r.village === villageFilter)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* 1. Header & View Switcher */}
      <div className="space-y-6 border-b border-[#E2D9C8] pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#8C2F1B] font-semibold">
              Phân hệ 02 · Quy trình Chế tác 7 Công đoạn
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold text-[#1F1A17] leading-tight">
              Quy trình làm gốm truyền thống của người Chăm
            </h1>
            <p className="text-base text-[#5C4D42] leading-relaxed">
              Trình tự 7 bước chuẩn hóa từ khâu chuẩn bị đất sét, nhồi trộn cát, tạo phôi bằng tay
              không dùng bàn xoay, chỉnh hình làm nhẵn, trang trí hoa văn, phơi sấy tự nhiên đến nung
              lộ thiên ngoài trời.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1 p-1 bg-[#EDE6DA] rounded-lg">
              <button
                type="button"
                onClick={() => setViewMode('stepper')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'stepper'
                    ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                    : 'text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Giao diện từng bước (Stepper)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('full')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  viewMode === 'full'
                    ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                    : 'text-[#5C4D42] hover:text-[#1F1A17]'
                }`}
              >
                Toàn cảnh 7 công đoạn
              </button>
            </div>
          </div>
        </div>

        {/* Village Filter Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EDE6DA] rounded-lg">
            <button
              type="button"
              onClick={() => setVillageFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                villageFilter === 'all'
                  ? 'bg-[#FBF9F5] text-[#1F1A17] shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#1F1A17]'
              }`}
            >
              Đối chiếu cả hai làng
            </button>
            <button
              type="button"
              onClick={() => setVillageFilter('tri-duc')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                villageFilter === 'tri-duc'
                  ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#1F1A17]'
              }`}
            >
              Trì Đức (Ligok) · Bình Thuận
            </button>
            <button
              type="button"
              onClick={() => setVillageFilter('bau-truc')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                villageFilter === 'bau-truc'
                  ? 'bg-[#FBF9F5] text-[#8C2F1B] shadow-xs'
                  : 'text-[#5C4D42] hover:text-[#1F1A17]'
              }`}
            >
              Bàu Trúc (Hamu Crok) · Ninh Thuận
            </button>
          </div>

          <p className="text-xs text-[#6B5B4E]">
            Mỗi bước đều có ảnh minh họa, mô tả công đoạn, công cụ sử dụng và nguồn tham khảo kiểm chứng.
          </p>
        </div>
      </div>

      {/* 2. GIAO DIỆN DẠNG TỪNG BƯỚC (STEPPER INTERFACE) */}
      {viewMode === 'stepper' && (
        <div className="space-y-10">
          {/* Stepper Navigation Bar (Horizontal Tab Strip) */}
          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <nav
              aria-label="Thanh điều hướng 7 bước làm gốm"
              className="flex items-center gap-2 min-w-[760px] border-b border-[#E2D9C8] pb-3"
            >
              {SEVEN_PROCESS_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isPassed = idx < activeStepIndex;

                return (
                  <button
                    key={step.stepNumber}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className={`flex-1 text-left p-3 rounded-md transition-all border ${
                      isActive
                        ? 'bg-[#F3EFE6] border-[#8C2F1B] shadow-xs'
                        : isPassed
                          ? 'bg-[#FBF9F5] border-[#E2D9C8] hover:bg-[#F3EFE6]/60'
                          : 'bg-[#FBF9F5] border-transparent hover:border-[#E2D9C8]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-medium text-xs ${
                          isActive
                            ? 'bg-[#8C2F1B] text-[#FBF9F5]'
                            : isPassed
                              ? 'bg-[#E7DFD1] text-[#1F1A17]'
                              : 'bg-[#EDE6DA] text-[#6B5B4E]'
                        }`}
                      >
                        0{step.stepNumber}
                      </span>
                      <span
                        className={`truncate font-medium ${
                          isActive ? 'text-[#8C2F1B]' : 'text-[#5C4D42]'
                        }`}
                      >
                        {step.stepName}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Active Step Showcase Card */}
          <section
            aria-labelledby={`step-heading-${currentStep.stepNumber}`}
            className="border border-[#E2D9C8] bg-[#FBF9F5] p-6 sm:p-10 space-y-8"
          >
            {/* Top Step Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE6DA] pb-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-[#8C2F1B] font-semibold">
                  Công đoạn 0{currentStep.stepNumber} / 07
                </span>
                <h2
                  id={`step-heading-${currentStep.stepNumber}`}
                  className="font-serif text-2xl sm:text-3xl font-semibold text-[#1F1A17]"
                >
                  {currentStep.stepName}
                </h2>
              </div>

              {/* Step Navigation Prev / Next */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={handlePrevStep}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-[#D8CEBE] rounded-md text-[#1F1A17] bg-[#F3EFE6] hover:bg-[#E7DFD1] disabled:opacity-40 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Bước trước</span>
                </button>
                <button
                  type="button"
                  disabled={activeStepIndex === SEVEN_PROCESS_STEPS.length - 1}
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md hover:bg-[#732413] disabled:opacity-40 transition-colors"
                >
                  <span>Bước kế tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Split Grid: Left Image, Right Technical Specifications */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5 space-y-4">
                <AbstractIllustration
                  illustrationKey={currentStep.illustrationKey}
                  aspectClass="aspect-[4/3]"
                  title={`Minh họa công đoạn: ${currentStep.stepName}`}
                />

                {/* Tools & Materials Specification Box */}
                <div className="bg-[#F3EFE6] border border-[#E2D9C8] p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2F1B] uppercase tracking-wider">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Công cụ sử dụng trong công đoạn</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#3D332C]">
                      {currentStep.toolsUsed.map((tool, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#8C2F1B] font-mono">•</span>
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-[#DFD6C7] pt-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#5C4D42] uppercase tracking-wider">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Nguyên vật liệu</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#3D332C]">
                      {currentStep.materialsUsed.map((mat, idx) => (
                        <span key={idx}>
                          {idx > 0 && <span aria-hidden="true"> · </span>}
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Technical Narrative & Village Separation */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wider text-[#6B5B4E] font-medium">
                    Tóm tắt kỹ thuật:
                  </p>
                  <p className="font-serif text-lg text-[#1F1A17] leading-relaxed">
                    {currentStep.shortSummary}
                  </p>
                  <p className="text-sm text-[#3D332C] leading-relaxed whitespace-pre-line pt-2">
                    {currentStep.detailedDescription}
                  </p>
                </div>

                {/* Separation between Tri Duc and Bau Truc */}
                <div className="border border-[#E2D9C8] bg-[#FBF9F5] p-5 space-y-3 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-[#8C2F1B] uppercase tracking-wider">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Phân định tư liệu thực địa giữa hai làng nghề</span>
                  </div>
                  <p className="text-[#3D332C] leading-relaxed">
                    {currentStep.villageSeparationNote}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[#5C4D42]">
                    <div className="p-3 bg-[#F3EFE6] rounded-xs border border-[#E2D9C8]">
                      <p className="font-semibold text-[#1F1A17] mb-1">
                        Tại Trì Đức (Ligok, Bình Thuận):
                      </p>
                      <p className="leading-relaxed">{currentStep.localDialectDetails.triDuc}</p>
                    </div>
                    <div className="p-3 bg-[#F3EFE6] rounded-xs border border-[#E2D9C8]">
                      <p className="font-semibold text-[#1F1A17] mb-1">
                        Tại Bàu Trúc (Hamu Crok, Ninh Thuận):
                      </p>
                      <p className="leading-relaxed">{currentStep.localDialectDetails.bauTruc}</p>
                    </div>
                  </div>
                </div>

                {/* Accompanying Reference Citations */}
                <InlineReferenceCitation
                  referenceIds={currentStep.referenceIds}
                  allReferences={references}
                  attributionNote={`Nguồn trích dẫn học thuật và chính thức cho Bước 0${currentStep.stepNumber}: ${currentStep.stepName}`}
                  onNavigateToReferences={onNavigateToReferences}
                />
              </div>
            </div>

            {/* Accompanying Archival Records for this step */}
            {relatedArchivalRecords.length > 0 && (
              <div className="pt-6 border-t border-[#EDE6DA] space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xs uppercase tracking-widest text-[#6B5B4E] font-semibold">
                    Hồ sơ điền dã đối chiếu của Bước 0{currentStep.stepNumber} ({relatedArchivalRecords.length} hồ sơ)
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenAddProcessRecord(villageFilter === 'bau-truc' ? 'bau-truc' : 'tri-duc')
                    }
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#8C2F1B] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Bổ sung ghi chép công đoạn này</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedArchivalRecords.map((rec) => {
                    const vMeta = VILLAGE_METADATA[rec.village];
                    return (
                      <div
                        key={rec.id}
                        className="p-4 bg-[#F3EFE6]/60 border border-[#E2D9C8] flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-1.5">
                          <p className="text-xs text-[#78695D]">
                            <span className="font-mono text-[#1F1A17]">{rec.id}</span> ·{' '}
                            <strong>{vMeta.shortLabel}</strong>
                          </p>
                          <h4 className="font-serif text-base font-semibold text-[#1F1A17]">
                            {rec.title}
                          </h4>
                          <p className="text-xs text-[#5C4D42] line-clamp-3 leading-relaxed">
                            {rec.details}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onSelectRecord(rec)}
                          className="self-start text-xs font-medium text-[#8C2F1B] hover:underline underline-offset-4"
                        >
                          Xem toàn bộ 9 tiêu chí
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* 3. TOÀN CẢNH 7 CÔNG ĐOẠN LIÊN HOÀN (FULL WORKFLOW OVERVIEW) */}
      {viewMode === 'full' && (
        <div className="space-y-12">
          {SEVEN_PROCESS_STEPS.map((step) => {
            return (
              <article
                key={step.stepNumber}
                className="border border-[#E2D9C8] bg-[#FBF9F5] p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#EDE6DA] pb-4">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#8C2F1B] font-semibold">
                      Bước 0{step.stepNumber}
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1A17] mt-0.5">
                      {step.stepName}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveStepIndex(step.stepNumber - 1);
                      setViewMode('stepper');
                      window.scrollTo({ top: 220, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#8C2F1B] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                  >
                    <span>Mở xem chi tiết bước này</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-4">
                    <AbstractIllustration
                      illustrationKey={step.illustrationKey}
                      aspectClass="aspect-[4/3]"
                      title={step.stepName}
                    />
                  </div>
                  <div className="lg:col-span-8 space-y-4">
                    <p className="text-sm font-medium text-[#1F1A17] leading-relaxed">
                      {step.shortSummary}
                    </p>
                    <p className="text-sm text-[#3D332C] leading-relaxed whitespace-pre-line">
                      {step.detailedDescription}
                    </p>

                    <div className="bg-[#F3EFE6] border border-[#E2D9C8] p-3 text-xs text-[#5C4D42] space-y-1">
                      <p>
                        <strong className="text-[#1F1A17]">Công cụ sử dụng:</strong>{' '}
                        {step.toolsUsed.join(' · ')}
                      </p>
                      <p>
                        <strong className="text-[#1F1A17]">Phân định làng nghề:</strong>{' '}
                        {step.villageSeparationNote}
                      </p>
                    </div>

                    <InlineReferenceCitation
                      referenceIds={step.referenceIds}
                      allReferences={references}
                      compact
                      onNavigateToReferences={onNavigateToReferences}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
