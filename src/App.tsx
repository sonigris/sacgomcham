/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ArchivalRecord,
  PageRoute,
  RecordCategory,
  ReferenceSource,
  VillageId,
} from './types/archive';
import { INITIAL_ARCHIVE_RECORDS } from './data/chamPotteryArchive';
import { INITIAL_REFERENCE_SOURCES } from './data/referenceSources';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RecordDetailModal } from './components/RecordDetailModal';
import { AddRecordModal } from './components/AddRecordModal';
import { HomePage } from './pages/HomePage';
import { VillagesPage } from './pages/VillagesPage';
import { ProcessPage } from './pages/ProcessPage';
import { TechniquesPage } from './pages/TechniquesPage';
import { ToolsAndArtisansPage } from './pages/ToolsAndArtisansPage';
import { ReferencesPage } from './pages/ReferencesPage';
import { QaPage } from './pages/QaPage';

const ARCHIVE_STORAGE_KEY = 'sac_gom_cham_archive_v2';
const REFERENCES_STORAGE_KEY = 'sac_gom_cham_references_v1';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('trang-chu');
  const [initialVillageFocus, setInitialVillageFocus] = useState<VillageId | null>(null);
  const [highlightedRefId, setHighlightedRefId] = useState<string | null>(null);
  const [processStepOrder, setProcessStepOrder] = useState<number | undefined>(undefined);

  const [records, setRecords] = useState<ArchivalRecord[]>(() => {
    try {
      const saved = localStorage.getItem(ARCHIVE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial records
    }
    return INITIAL_ARCHIVE_RECORDS;
  });

  const [references, setReferences] = useState<ReferenceSource[]>(() => {
    try {
      const saved = localStorage.getItem(REFERENCES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial 5 references
    }
    return INITIAL_REFERENCE_SOURCES;
  });

  const [selectedRecord, setSelectedRecord] = useState<ArchivalRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addPresetVillage, setAddPresetVillage] = useState<VillageId>('tri-duc');
  const [addPresetCategory, setAddPresetCategory] = useState<RecordCategory>('san-pham');
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(records));
    } catch {
      // Ignore quota errors
    }
  }, [records]);

  useEffect(() => {
    try {
      localStorage.setItem(REFERENCES_STORAGE_KEY, JSON.stringify(references));
    } catch {
      // Ignore quota errors
    }
  }, [references]);

  const showNotice = (msg: string) => {
    setStatusNotice(msg);
    setTimeout(() => setStatusNotice(null), 3500);
  };

  const handleNavigate = (page: PageRoute, village?: VillageId, stepOrder?: number) => {
    setInitialVillageFocus(village ?? null);
    setProcessStepOrder(stepOrder);
    if (page !== 'nguon-tham-khao') {
      setHighlightedRefId(null);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToReferences = (refId?: string) => {
    setHighlightedRefId(refId ?? null);
    setCurrentPage('nguon-tham-khao');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateRecord = (updated: ArchivalRecord) => {
    setRecords((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setSelectedRecord(updated);
    showNotice(`Đã cập nhật hồ sơ ${updated.id}.`);
  };

  const handleAddRecord = (newRecord: ArchivalRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
    showNotice(`Đã thêm hồ sơ mới ${newRecord.id}.`);
  };

  // Reference CRUD handlers
  const handleAddReference = (newRef: ReferenceSource) => {
    setReferences((prev) => [newRef, ...prev]);
    setHighlightedRefId(newRef.id);
    showNotice(`Đã thêm nguồn tham khảo ${newRef.id}.`);
  };

  const handleUpdateReference = (updatedRef: ReferenceSource) => {
    setReferences((prev) => prev.map((r) => (r.id === updatedRef.id ? updatedRef : r)));
    setHighlightedRefId(updatedRef.id);
    showNotice(`Đã cập nhật nguồn tham khảo ${updatedRef.id}.`);
  };

  const handleDeleteReference = (refId: string) => {
    setReferences((prev) => prev.filter((r) => r.id !== refId));
    setRecords((prev) =>
      prev.map((rec) => ({
        ...rec,
        referenceIds: (rec.referenceIds || []).filter((id) => id !== refId),
      }))
    );
    showNotice(`Đã xóa nguồn tham khảo ${refId}. Các hồ sơ liên quan đã tự động cập nhật.`);
  };

  const handleResetReferences = () => {
    setReferences(INITIAL_REFERENCE_SOURCES);
    localStorage.removeItem(REFERENCES_STORAGE_KEY);
    showNotice('Đã khôi phục 5 nguồn tham khảo ban đầu.');
  };

  const openAddModalWithPreset = (
    village: VillageId = 'tri-duc',
    category: RecordCategory = 'san-pham'
  ) => {
    setAddPresetVillage(village);
    setAddPresetCategory(category);
    setIsAddModalOpen(true);
  };

  const handleSelectRecordById = (id: string) => {
    const found = records.find((r) => r.id === id);
    if (found) {
      setSelectedRecord(found);
    }
  };

  const handleExportJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      references,
      records,
    };
    const dataStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sac-gom-cham-ho-so-va-nguon-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetSampleData = () => {
    setRecords(INITIAL_ARCHIVE_RECORDS);
    setReferences(INITIAL_REFERENCE_SOURCES);
    localStorage.removeItem(ARCHIVE_STORAGE_KEY);
    localStorage.removeItem(REFERENCES_STORAGE_KEY);
    showNotice('Đã khôi phục toàn bộ dữ liệu mẫu và 5 nguồn tham khảo ban đầu.');
  };

  const verifiedCount = records.filter((r) => !r.isSampleData).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1F1A17]">
      <Header currentPage={currentPage} onNavigate={(page) => handleNavigate(page)} />

      {statusNotice && (
        <div
          role="status"
          className="bg-[#F3EFE6] border-b border-[#D8CEBE] px-4 py-2.5 text-center text-xs font-medium text-[#8C2F1B]"
        >
          {statusNotice}
        </div>
      )}

      <main className="flex-1">
        {currentPage === 'trang-chu' && (
          <HomePage
            records={records}
            references={references}
            onNavigate={handleNavigate}
            onNavigateToReferences={handleNavigateToReferences}
            onSelectRecord={setSelectedRecord}
          />
        )}

        {currentPage === 'lang-nghe' && (
          <VillagesPage
            records={records}
            references={references}
            initialVillage={initialVillageFocus}
            onSelectRecord={setSelectedRecord}
            onOpenAddModalForVillage={(v, c) => openAddModalWithPreset(v, c || 'lang-nghe')}
            onNavigateToReferences={handleNavigateToReferences}
          />
        )}

        {currentPage === 'ky-thuat' && (
          <TechniquesPage
            references={references}
            onNavigateToProcess={(stepOrder) => handleNavigate('quy-trinh', undefined, stepOrder)}
            onNavigateToToolsAndArtisans={() => handleNavigate('cong-cu-nghe-nhan')}
            onNavigateToReferences={handleNavigateToReferences}
          />
        )}

        {currentPage === 'quy-trinh' && (
          <ProcessPage
            records={records}
            references={references}
            initialStepOrder={processStepOrder}
            onSelectRecord={setSelectedRecord}
            onOpenAddProcessRecord={(v) => openAddModalWithPreset(v, 'quy-trinh')}
            onNavigateToReferences={handleNavigateToReferences}
          />
        )}

        {(currentPage === 'cong-cu-nghe-nhan' ||
          currentPage === 'dung-cu-san-pham' ||
          currentPage === 'nghe-nhan') && (
          <ToolsAndArtisansPage
            records={records}
            references={references}
            onSelectRecord={setSelectedRecord}
            onOpenAddArtisanModal={(v) => openAddModalWithPreset(v, 'nghe-nhan')}
            onNavigateToReferences={handleNavigateToReferences}
          />
        )}

        {currentPage === 'nguon-tham-khao' && (
          <ReferencesPage
            references={references}
            records={records}
            highlightedRefId={highlightedRefId}
            onAddReference={handleAddReference}
            onUpdateReference={handleUpdateReference}
            onDeleteReference={handleDeleteReference}
            onResetReferences={handleResetReferences}
            onSelectRecord={setSelectedRecord}
          />
        )}

        {currentPage === 'hoi-dap' && (
          <QaPage
            records={records}
            references={references}
            onSelectRecordById={handleSelectRecordById}
            onNavigateToReferences={handleNavigateToReferences}
          />
        )}
      </main>

      <Footer
        onNavigate={(page) => handleNavigate(page)}
        onOpenAddModal={() => openAddModalWithPreset('tri-duc', 'san-pham')}
        onExportJson={handleExportJson}
        onResetSampleData={handleResetSampleData}
        totalRecordsCount={records.length}
        verifiedRecordsCount={verifiedCount}
        totalReferencesCount={references.length}
      />

      <RecordDetailModal
        record={selectedRecord}
        allReferences={references}
        onClose={() => setSelectedRecord(null)}
        onUpdateRecord={handleUpdateRecord}
        onNavigateToReferences={handleNavigateToReferences}
      />

      <AddRecordModal
        isOpen={isAddModalOpen}
        allReferences={references}
        defaultVillage={addPresetVillage}
        defaultCategory={addPresetCategory}
        onClose={() => setIsAddModalOpen(false)}
        onAddRecord={handleAddRecord}
      />
    </div>
  );
}
