import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import {
  ReferenceSource,
  ReferenceVerificationStatus,
  ReferenceVillageScope,
  SourceCategory,
} from '../types/archive';
import { PENDING_SOURCE_VERIFICATION } from '../data/referenceSources';

interface ReferenceFormModalProps {
  isOpen: boolean;
  editingSource: ReferenceSource | null;
  onClose: () => void;
  onSave: (source: ReferenceSource, isEdit: boolean) => void;
}

export const ReferenceFormModal: React.FC<ReferenceFormModalProps> = ({
  isOpen,
  editingSource,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [publisherOrAuthor, setPublisherOrAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [sourceType, setSourceType] = useState<SourceCategory>('hoc-thuat');
  const [url, setUrl] = useState('');
  const [usedContent, setUsedContent] = useState('');
  const [villageScope, setVillageScope] = useState<ReferenceVillageScope>('dang-cho-xac-minh');
  const [verificationStatus, setVerificationStatus] =
    useState<ReferenceVerificationStatus>('dang-cho-xac-minh');

  useEffect(() => {
    if (editingSource) {
      setTitle(editingSource.title);
      setPublisherOrAuthor(editingSource.publisherOrAuthor);
      setPublishYear(editingSource.publishYear);
      setSourceType(editingSource.sourceType);
      setUrl(editingSource.url);
      setUsedContent(editingSource.usedContent);
      setVillageScope(editingSource.villageScope);
      setVerificationStatus(editingSource.verificationStatus);
    } else {
      setTitle('');
      setPublisherOrAuthor('');
      setPublishYear('');
      setSourceType('hoc-thuat');
      setUrl('');
      setUsedContent('');
      setVillageScope('dang-cho-xac-minh');
      setVerificationStatus('dang-cho-xac-minh');
    }
  }, [editingSource, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedTitle = title.trim() || PENDING_SOURCE_VERIFICATION;
    const cleanedAuthor = publisherOrAuthor.trim() || PENDING_SOURCE_VERIFICATION;
    const cleanedYear = publishYear.trim() || PENDING_SOURCE_VERIFICATION;
    const cleanedUrl = url.trim() || PENDING_SOURCE_VERIFICATION;
    const cleanedContent = usedContent.trim() || PENDING_SOURCE_VERIFICATION;

    const hasUnverifiedField = [
      cleanedTitle,
      cleanedAuthor,
      cleanedYear,
      cleanedUrl,
      cleanedContent,
    ].some((val) => val.toLowerCase().includes(PENDING_SOURCE_VERIFICATION.toLowerCase()));

    const finalVerificationStatus: ReferenceVerificationStatus = hasUnverifiedField
      ? 'dang-cho-xac-minh'
      : verificationStatus;

    const savedItem: ReferenceSource = {
      id: editingSource ? editingSource.id : `REF-${String(Date.now()).slice(-4)}`,
      title: cleanedTitle,
      publisherOrAuthor: cleanedAuthor,
      publishYear: cleanedYear,
      sourceType,
      url: cleanedUrl,
      usedContent: cleanedContent,
      villageScope,
      verificationStatus: finalVerificationStatus,
    };

    onSave(savedItem, Boolean(editingSource));
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ref-modal-heading"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1F1A17]/60 backdrop-blur-[2px]"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FBF9F5] border border-[#D8CEBE] rounded-lg shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#FBF9F5] border-b border-[#E2D9C8]">
          <div>
            <h2
              id="ref-modal-heading"
              className="font-serif text-xl font-semibold text-[#1F1A17]"
            >
              {editingSource
                ? `Chỉnh sửa Nguồn tham khảo ${editingSource.id}`
                : 'Thêm Nguồn tư liệu & Tài liệu tham khảo'}
            </h2>
            <p className="text-xs text-[#6B5B4E] mt-0.5">
              Không tự tạo thông tin chưa kiểm chứng. Bỏ trống trường chưa rõ để hệ thống tự ghi
              &ldquo;{PENDING_SOURCE_VERIFICATION}&rdquo;.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ nguồn tham khảo"
            className="p-1.5 rounded-md text-[#5C4D42] hover:bg-[#F3EFE6] hover:text-[#1F1A17]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                1. Tên tài liệu (để trống nếu đang chờ xác minh tiêu đề gốc)
              </label>
              <input
                type="text"
                placeholder={PENDING_SOURCE_VERIFICATION}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                2. Tác giả hoặc cơ quan phát hành
              </label>
              <input
                type="text"
                placeholder={PENDING_SOURCE_VERIFICATION}
                value={publisherOrAuthor}
                onChange={(e) => setPublisherOrAuthor(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                3. Năm công bố (không tự suy đoán năm)
              </label>
              <input
                type="text"
                placeholder={PENDING_SOURCE_VERIFICATION}
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                4. Phân loại nguồn
              </label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value as SourceCategory)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              >
                <option value="chinh-thuc">
                  Nguồn chính thức (UNESCO, cơ quan quản lý văn hóa nhà nước)
                </option>
                <option value="hoc-thuat">
                  Nguồn học thuật (bài báo khoa học, luận văn, sách nghiên cứu)
                </option>
                <option value="bao-chi">Nguồn báo chí (báo chí có uy tín)</option>
                <option value="cong-dong">
                  Nguồn cộng đồng (nghệ nhân hoặc cộng đồng cung cấp)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                5. Phạm vi làng nghề được tài liệu chứng minh
              </label>
              <select
                value={villageScope}
                onChange={(e) => setVillageScope(e.target.value as ReferenceVillageScope)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              >
                <option value="tri-duc">Chứng minh riêng cho Trì Đức (Ligok), Bình Thuận</option>
                <option value="bau-truc">
                  Chứng minh riêng cho Bàu Trúc (Hamu Crok), Ninh Thuận
                </option>
                <option value="chung-ca-hai">
                  Khái quát chung hai làng (không suy diễn chéo chi tiết riêng)
                </option>
                <option value="dang-cho-xac-minh">{PENDING_SOURCE_VERIFICATION}</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                6. Đường dẫn (URL xác thực hoặc để trống nếu là tư liệu điền dã/chờ xác minh)
              </label>
              <input
                type="text"
                placeholder="https://... hoặc để trống để ghi Đang chờ xác minh"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                7. Nội dung được sử dụng trong ứng dụng
              </label>
              <textarea
                rows={3}
                placeholder="Mô tả rõ phần thông tin nào được trích dẫn từ tài liệu này (nếu chưa kiểm chứng toàn văn, để trống để ghi Đang chờ xác minh)..."
                value={usedContent}
                onChange={(e) => setUsedContent(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#5C4D42] mb-1">
                8. Trạng thái xác minh nguồn
              </label>
              <select
                value={verificationStatus}
                onChange={(e) =>
                  setVerificationStatus(e.target.value as ReferenceVerificationStatus)
                }
                className="w-full px-3 py-2 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B]"
              >
                <option value="dang-cho-xac-minh">{PENDING_SOURCE_VERIFICATION}</option>
                <option value="da-xac-minh">Đã xác minh đầy đủ</option>
              </select>
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
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md hover:bg-[#732413] transition-colors whitespace-nowrap shrink-0"
            >
              <Check className="w-4 h-4" />
              <span>{editingSource ? 'Lưu cập nhật nguồn' : 'Thêm nguồn tham khảo'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
