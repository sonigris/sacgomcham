import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import {
  ArchivalRecord,
  RecordCategory,
  ReferenceSource,
  VillageId,
} from '../types/archive';
import { PENDING_SOURCE_TEXT, UNVERIFIED_TEXT } from '../data/chamPotteryArchive';
import { REFERENCE_VILLAGE_SCOPE_LABELS } from '../data/referenceSources';

interface AddRecordModalProps {
  isOpen: boolean;
  allReferences: ReferenceSource[];
  defaultVillage?: VillageId;
  defaultCategory?: RecordCategory;
  onClose: () => void;
  onAddRecord: (newRecord: ArchivalRecord) => void;
}

export const AddRecordModal: React.FC<AddRecordModalProps> = ({
  isOpen,
  allReferences,
  defaultVillage = 'tri-duc',
  defaultCategory = 'san-pham',
  onClose,
  onAddRecord,
}) => {
  const [village, setVillage] = useState<VillageId>(defaultVillage);
  const [category, setCategory] = useState<RecordCategory>(defaultCategory);
  const [title, setTitle] = useState('');
  const [localName, setLocalName] = useState(UNVERIFIED_TEXT);
  const [ethnicity, setEthnicity] = useState('Chăm');
  const [culturalRegion, setCulturalRegion] = useState(
    defaultVillage === 'tri-duc'
      ? 'Vùng văn hóa Chăm Bình Thuận'
      : 'Vùng văn hóa Chăm Ninh Thuận'
  );
  const [currentLocation, setCurrentLocation] = useState(
    defaultVillage === 'tri-duc'
      ? 'Thôn Trì Đức (Ligok), xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận'
      : 'Khu phố Bàu Trúc (Hamu Crok), thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận'
  );
  const [historicalLocation, setHistoricalLocation] = useState(UNVERIFIED_TEXT);
  const [informant, setInformant] = useState(UNVERIFIED_TEXT);
  const [usageScope, setUsageScope] = useState(
    'Nghiên cứu, giáo dục và bảo tồn di sản văn hóa phi thương mại'
  );
  const [source, setSource] = useState(PENDING_SOURCE_TEXT);
  const [selectedRefIds, setSelectedRefIds] = useState<string[]>([]);
  const [villageAttributionNote, setVillageAttributionNote] = useState('');
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  const [documentaryImageUrl, setDocumentaryImageUrl] = useState('');
  const [documentaryImageCredit, setDocumentaryImageCredit] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  if (!isOpen) return null;

  const handleVillageChange = (nextVillage: VillageId) => {
    setVillage(nextVillage);
    if (nextVillage === 'tri-duc') {
      setCulturalRegion('Vùng văn hóa Chăm Bình Thuận');
      setCurrentLocation('Thôn Trì Đức (Ligok), xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận');
    } else {
      setCulturalRegion('Vùng văn hóa Chăm Ninh Thuận');
      setCurrentLocation(
        'Khu phố Bàu Trúc (Hamu Crok), thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận'
      );
    }
  };

  const toggleRefId = (id: string) => {
    setSelectedRefIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = village === 'tri-duc' ? 'HS-TD' : 'HS-BT';
    const catCode =
      category === 'lang-nghe'
        ? 'LG'
        : category === 'quy-trinh'
          ? 'QT'
          : category === 'dung-cu'
            ? 'DC'
            : category === 'san-pham'
              ? 'SP'
              : 'NN';
    const generatedId = `${prefix}-${catCode}-${String(Date.now()).slice(-4)}`;

    const record: ArchivalRecord = {
      id: generatedId,
      village,
      category,
      processStepOrder: category === 'quy-trinh' ? 1 : undefined,
      artisanRoleType: category === 'nghe-nhan' ? 'nghe-nhan-truyen-day' : undefined,
      title: title.trim(),
      localName: localName.trim() || UNVERIFIED_TEXT,
      ethnicity: ethnicity.trim() || 'Chăm',
      culturalRegion: culturalRegion.trim() || UNVERIFIED_TEXT,
      currentLocation: currentLocation.trim() || UNVERIFIED_TEXT,
      historicalLocation: historicalLocation.trim() || UNVERIFIED_TEXT,
      informant: informant.trim() || UNVERIFIED_TEXT,
      usageScope: usageScope.trim() || UNVERIFIED_TEXT,
      source: source.trim() || PENDING_SOURCE_TEXT,
      referenceIds: selectedRefIds,
      villageAttributionNote: villageAttributionNote.trim() || undefined,
      summary: summary.trim(),
      details: details.trim(),
      isSampleData: !isVerified,
      documentaryImageUrl: documentaryImageUrl.trim() || undefined,
      documentaryImageCredit: documentaryImageCredit.trim() || undefined,
    };

    onAddRecord(record);
    setTitle('');
    setSummary('');
    setDetails('');
    setSelectedRefIds([]);
    setVillageAttributionNote('');
    setDocumentaryImageUrl('');
    setDocumentaryImageCredit('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-record-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1F1A17]/60 backdrop-blur-[2px]"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FBF9F5] border border-[#D8CEBE] rounded-lg shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#FBF9F5] border-b border-[#E2D9C8]">
          <div>
            <h2 id="add-record-title" className="font-serif text-xl font-semibold text-[#1F1A17]">
              Bổ sung Tư liệu Điền dã Mới
            </h2>
            <p className="text-xs text-[#6B5B4E]">
              Mỗi dữ liệu phải gắn nguồn tham khảo hợp lệ; nếu chưa xác minh nguồn sẽ hiển thị
              &ldquo;{PENDING_SOURCE_TEXT}&rdquo;.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng biểu mẫu bổ sung tư liệu"
            className="p-1.5 rounded-md text-[#5C4D42] hover:bg-[#F3EFE6] hover:text-[#1F1A17]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                Phân vùng làng nghề (tách biệt rõ ràng)
              </label>
              <select
                value={village}
                onChange={(e) => handleVillageChange(e.target.value as VillageId)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              >
                <option value="tri-duc">Làng gốm Trì Đức (Ligok), Bình Đức, Bình Thuận</option>
                <option value="bau-truc">Làng gốm Bàu Trúc (Hamu Crok), Ninh Thuận</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                Chuyên mục lưu trữ
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as RecordCategory)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              >
                <option value="lang-nghe">Không gian làng nghề</option>
                <option value="quy-trinh">Quy trình làm gốm truyền thống</option>
                <option value="dung-cu">Công cụ chế tác</option>
                <option value="san-pham">Sản phẩm gốm truyền thống</option>
                <option value="nghe-nhan">Nghệ nhân & Người lưu giữ nghề</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                1. Tên hiện vật hoặc nội dung tư liệu *
              </label>
              <input
                type="text"
                required
                placeholder="Nhập tên hiện vật, bước kỹ thuật hoặc danh mục hồ sơ..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                2. Tên gọi địa phương
              </label>
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">3. Dân tộc</label>
              <input
                type="text"
                value={ethnicity}
                onChange={(e) => setEthnicity(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                4. Vùng văn hóa
              </label>
              <input
                type="text"
                value={culturalRegion}
                onChange={(e) => setCulturalRegion(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                5. Địa danh hiện nay
              </label>
              <input
                type="text"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                6. Địa danh lịch sử tại thời điểm ghi nhận
              </label>
              <input
                type="text"
                value={historicalLocation}
                onChange={(e) => setHistoricalLocation(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                7. Người cung cấp thông tin
              </label>
              <input
                type="text"
                value={informant}
                onChange={(e) => setInformant(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                8. Phạm vi sử dụng được phép
              </label>
              <input
                type="text"
                value={usageScope}
                onChange={(e) => setUsageScope(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                9. Ghi chú nguồn tư liệu (để &ldquo;{PENDING_SOURCE_TEXT}&rdquo; nếu chưa xác minh)
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div className="sm:col-span-2 bg-[#F3EFE6] border border-[#E2D9C8] p-4 rounded-md space-y-2.5">
              <p className="text-xs font-semibold text-[#1F1A17]">
                Liên kết nguồn tham khảo (không chọn nguồn của làng kia nếu tài liệu không chứng
                minh):
              </p>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {allReferences.map((ref) => (
                  <label
                    key={ref.id}
                    className="flex items-start gap-2.5 text-xs text-[#3D332C] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRefIds.includes(ref.id)}
                      onChange={() => toggleRefId(ref.id)}
                      className="mt-0.5 accent-[#8C2F1B]"
                    />
                    <span>
                      <strong className="font-mono text-[#8C2F1B]">[{ref.id}]</strong>{' '}
                      {ref.publisherOrAuthor} —{' '}
                      <span className="text-[#6B5B4E]">
                        {REFERENCE_VILLAGE_SCOPE_LABELS[ref.villageScope]}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                Ghi chú phân định phạm vi chứng minh làng nghề (tùy chọn)
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Tài liệu chỉ chứng minh cho Bàu Trúc, không áp dụng sang Trì Đức..."
                value={villageAttributionNote}
                onChange={(e) => setVillageAttributionNote(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                Ảnh tư liệu thực tế có nguồn hợp lệ (URL tùy chọn)
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={documentaryImageUrl}
                onChange={(e) => setDocumentaryImageUrl(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            {documentaryImageUrl.trim() && (
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                  Ghi nguồn & quyền sử dụng ảnh tư liệu
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nêu rõ tác giả ảnh, năm chụp và sự đồng thuận cho phép sử dụng..."
                  value={documentaryImageCredit}
                  onChange={(e) => setDocumentaryImageCredit(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
                />
              </div>
            )}

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                Tóm tắt nội dung *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Mô tả khái quát hiện vật hoặc nội dung tư liệu..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                Mô tả chi tiết *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Ghi chép chi tiết đặc điểm kỹ thuật, kích thước, bối cảnh sử dụng..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-2.5">
              <input
                id="new-verified-check"
                type="checkbox"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
                className="w-4 h-4 accent-[#8C2F1B]"
              />
              <label htmlFor="new-verified-check" className="text-sm text-[#1F1A17]">
                Tư liệu này đã được xác minh thực địa và kiểm chứng nguồn đầy đủ
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2D9C8]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#5C4D42] hover:text-[#1F1A17]"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md hover:bg-[#732413] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Lưu vào kho tư liệu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
