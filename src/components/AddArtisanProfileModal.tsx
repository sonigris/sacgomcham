import React, { useState } from 'react';
import { X, ShieldCheck, AlertCircle } from 'lucide-react';
import { ArtisanKeeperProfile, ReferenceSource, VillageId } from '../types/archive';

interface AddArtisanProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: ArtisanKeeperProfile) => void;
  allReferences: ReferenceSource[];
  defaultVillage?: VillageId;
}

export const AddArtisanProfileModal: React.FC<AddArtisanProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  allReferences,
  defaultVillage = 'bau-truc',
}) => {
  const [village, setVillage] = useState<VillageId>(defaultVillage);
  const [fullName, setFullName] = useState('Chưa có tư liệu xác minh');
  const [experience, setExperience] = useState('Chưa có tư liệu xác minh');
  const [specializedTechniques, setSpecializedTechniques] = useState(
    'Tạo hình bằng tay không dùng bàn xoay, vuốt con trạch danach, nung lộ thiên padang paduk.'
  );
  const [transmissionProcess, setTransmissionProcess] = useState(
    'Trao truyền mẫu hệ qua nhiều thế hệ trong gia đình (mẹ truyền con gái/con dâu).'
  );
  const [interviewInfo, setInterviewInfo] = useState('Chưa có tư liệu xác minh');
  const [hasVerifiedImage, setHasVerifiedImage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('Khung chờ ảnh tư liệu xác minh');
  const [imageSource, setImageSource] = useState('Đang chờ xác minh');
  const [imageUsageRights, setImageUsageRights] = useState(
    'Chỉ sử dụng khi có sự đồng thuận bằng văn bản của nghệ nhân'
  );
  const [selectedRefIds, setSelectedRefIds] = useState<string[]>(['REF-01']);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProfile: ArtisanKeeperProfile = {
      id: `ART-${village === 'bau-truc' ? 'BT' : 'TD'}-${Date.now().toString().slice(-4)}`,
      fullName: fullName.trim() || 'Chưa có tư liệu xác minh',
      village,
      localVillageName: village === 'bau-truc' ? 'Hamu Crok' : 'Ligok',
      ethnicity: 'Chăm',
      experience: experience.trim() || 'Chưa có tư liệu xác minh',
      specializedTechniques:
        specializedTechniques.trim() || 'Chưa có tư liệu xác minh',
      transmissionProcess:
        transmissionProcess.trim() || 'Chưa có tư liệu xác minh',
      interviewInfo: interviewInfo.trim() || 'Chưa có tư liệu xác minh',
      hasVerifiedImage,
      imageUrl: hasVerifiedImage && imageUrl.trim() ? imageUrl.trim() : undefined,
      imageCaption: imageCaption.trim() || undefined,
      imageSource: imageSource.trim() || 'Đang chờ xác minh',
      imageUsageRights:
        imageUsageRights.trim() || 'Chỉ sử dụng cho nghiên cứu bảo tồn di sản',
      citedReferenceIds: selectedRefIds,
      isSampleOrUnverified: fullName.includes('Chưa có') || !hasVerifiedImage,
      attributionNote:
        village === 'bau-truc'
          ? 'Hồ sơ người giữ nghề Bàu Trúc (Ninh Thuận).'
          : 'Hồ sơ người giữ nghề Trì Đức (Bình Thuận).',
    };

    onSave(newProfile);
    onClose();
  };

  const toggleRefId = (id: string) => {
    setSelectedRefIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="artisan-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] border border-[#C8BBA8] shadow-2xl rounded-lg p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 border-b border-[#E2D9C8] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C2F1B] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Lưu trữ nhân học · Phân hệ 03</span>
            </div>
            <h2
              id="artisan-modal-title"
              className="mt-1 font-serif text-2xl font-semibold text-[#1F1A17]"
            >
              Bổ sung / Cập nhật Hồ sơ Người giữ nghề
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#5C4D42] hover:text-[#1F1A17] rounded-md transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-[#F3EFE6] border border-[#D8CEBE] p-4 text-xs text-[#5C4D42] leading-relaxed space-y-1">
          <p className="font-semibold text-[#8C2F1B]">
            Quy tắc đạo đức lưu trữ di sản:
          </p>
          <p>
            - Không tự tạo tên nghệ nhân hoặc thông tin chưa xác minh. Nếu chưa có thông tin, hãy điền{' '}
            <strong className="text-[#1F1A17]">“Chưa có tư liệu xác minh”</strong>.
          </p>
          <p>
            - Tuyệt đối không dùng ảnh AI mô phỏng nghệ nhân. Nếu chưa có ảnh thực địa có bản quyền, hệ thống sẽ tự động hiển thị khung chờ{' '}
            <strong className="text-[#1F1A17]">“Chưa có hình ảnh tư liệu xác minh”</strong>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          {/* Làng nghề */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-[#1F1A17]">
              1. Địa phương (Làng nghề) <span className="text-[#8C2F1B]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-center p-3 border rounded-md cursor-pointer transition-colors ${
                  village === 'bau-truc'
                    ? 'border-[#8C2F1B] bg-[#F7EFE2] text-[#8C2F1B] font-medium'
                    : 'border-[#D8CEBE] bg-[#FBF9F5] text-[#5C4D42]'
                }`}
              >
                <input
                  type="radio"
                  name="village"
                  value="bau-truc"
                  checked={village === 'bau-truc'}
                  onChange={() => setVillage('bau-truc')}
                  className="sr-only"
                />
                <span>Làng Bàu Trúc (Hamu Crok, Ninh Thuận)</span>
              </label>

              <label
                className={`flex items-center justify-center p-3 border rounded-md cursor-pointer transition-colors ${
                  village === 'tri-duc'
                    ? 'border-[#8C2F1B] bg-[#F7EFE2] text-[#8C2F1B] font-medium'
                    : 'border-[#D8CEBE] bg-[#FBF9F5] text-[#5C4D42]'
                }`}
              >
                <input
                  type="radio"
                  name="village"
                  value="tri-duc"
                  checked={village === 'tri-duc'}
                  onChange={() => setVillage('tri-duc')}
                  className="sr-only"
                />
                <span>Làng Trì Đức (Ligok, Bình Thuận)</span>
              </label>
            </div>
          </div>

          {/* Họ tên */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-[#1F1A17]">
              2. Họ tên người giữ nghề / nghệ nhân{' '}
              <span className="text-xs text-[#78695D] font-normal">
                (Điền “Chưa có tư liệu xác minh” nếu chưa có văn bản công nhận chính thức)
              </span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2 border border-[#C8BBA8] bg-[#FBF9F5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8C2F1B]"
              placeholder="Chưa có tư liệu xác minh"
              required
            />
          </div>

          {/* Kinh nghiệm */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-[#1F1A17]">
              3. Kinh nghiệm làm nghề
            </label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-3.5 py-2 border border-[#C8BBA8] bg-[#FBF9F5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8C2F1B]"
              placeholder="Chưa có tư liệu xác minh (ví dụ: Thực hành gia truyền hơn 30 năm)"
            />
          </div>

          {/* Kỹ thuật */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-[#1F1A17]">
              4. Kỹ thuật tạo tác chuyên sâu
            </label>
            <textarea
              rows={2}
              value={specializedTechniques}
              onChange={(e) => setSpecializedTechniques(e.target.value)}
              className="w-full px-3.5 py-2 border border-[#C8BBA8] bg-[#FBF9F5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8C2F1B]"
              placeholder="Tạo hình bằng tay không bàn xoay, cạo nhẵn mathik gaok, trang trí ngap bingu hala..."
            />
          </div>

          {/* Quá trình truyền nghề */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-[#1F1A17]">
              5. Quá trình truyền nghề
            </label>
            <textarea
              rows={2}
              value={transmissionProcess}
              onChange={(e) => setTransmissionProcess(e.target.value)}
              className="w-full px-3.5 py-2 border border-[#C8BBA8] bg-[#FBF9F5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8C2F1B]"
              placeholder="Mẹ truyền con gái trong gia đình mẫu hệ; truyền nghề thực hành..."
            />
          </div>

          {/* Thông tin phỏng vấn */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-[#1F1A17]">
              6. Thông tin phỏng vấn / Lời kể thực địa
            </label>
            <textarea
              rows={3}
              value={interviewInfo}
              onChange={(e) => setInterviewInfo(e.target.value)}
              className="w-full px-3.5 py-2 border border-[#C8BBA8] bg-[#FBF9F5] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8C2F1B]"
              placeholder="Trích đoạn phỏng vấn ghi âm tại làng hoặc ghi 'Chưa có tư liệu xác minh'..."
            />
          </div>

          {/* Tình trạng hình ảnh */}
          <div className="space-y-3 pt-2 border-t border-[#E2D9C8]">
            <p className="font-semibold text-[#1F1A17]">
              7. Hình ảnh và Quyền sử dụng
            </p>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="hasVerifiedImageCheck"
                checked={hasVerifiedImage}
                onChange={(e) => setHasVerifiedImage(e.target.checked)}
                className="w-4 h-4 text-[#8C2F1B] rounded border-[#C8BBA8]"
              />
              <label
                htmlFor="hasVerifiedImageCheck"
                className="text-xs text-[#1F1A17] font-medium cursor-pointer"
              >
                Đã có ảnh tư liệu thực tế (được phép sử dụng)
              </label>
            </div>

            {hasVerifiedImage ? (
              <div className="space-y-3 pl-6 border-l-2 border-[#8C2F1B]">
                <div>
                  <label className="block text-xs font-medium text-[#1F1A17]">
                    Đường dẫn ảnh (URL)
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-[#C8BBA8] bg-[#FBF9F5] rounded-md"
                    placeholder="https://... hoặc /assets/..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1F1A17]">
                    Chú thích ảnh & Nguồn ảnh
                  </label>
                  <input
                    type="text"
                    value={imageSource}
                    onChange={(e) => setImageSource(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-[#C8BBA8] bg-[#FBF9F5] rounded-md"
                    placeholder="Tên tác giả / Cơ quan lưu trữ"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1F1A17]">
                    Quyền sử dụng được phép
                  </label>
                  <input
                    type="text"
                    value={imageUsageRights}
                    onChange={(e) => setImageUsageRights(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-[#C8BBA8] bg-[#FBF9F5] rounded-md"
                    placeholder="Đã có văn bản đồng thuận phi thương mại"
                  />
                </div>
              </div>
            ) : (
              <div className="text-xs text-[#6B5B4E] bg-[#F3EFE6] p-3 rounded-md border border-[#E2D9C8]">
                Khi chưa có ảnh tư liệu xác minh, thẻ hồ sơ sẽ hiển thị khung chờ tiêu chuẩn với nhãn{' '}
                <strong className="text-[#8C2F1B]">
                  “Chưa có hình ảnh tư liệu xác minh”
                </strong>
                .
              </div>
            )}
          </div>

          {/* Nguồn tham khảo đối chiếu */}
          <div className="space-y-2 pt-2 border-t border-[#E2D9C8]">
            <label className="block font-semibold text-[#1F1A17]">
              8. Nguồn tham khảo đối chiếu
            </label>
            <div className="flex flex-wrap gap-2">
              {allReferences.map((ref) => {
                const isSelected = selectedRefIds.includes(ref.id);
                return (
                  <button
                    key={ref.id}
                    type="button"
                    onClick={() => toggleRefId(ref.id)}
                    className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                      isSelected
                        ? 'border-[#8C2F1B] bg-[#8C2F1B] text-[#FBF9F5]'
                        : 'border-[#D8CEBE] bg-[#F3EFE6] text-[#5C4D42] hover:border-[#8C2F1B]'
                    }`}
                  >
                    {ref.id} · {ref.publisherOrAuthor}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2D9C8]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium border border-[#C8BBA8] text-[#5C4D42] hover:bg-[#F3EFE6] rounded-md transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-medium bg-[#8C2F1B] hover:bg-[#732413] text-[#FBF9F5] rounded-md transition-colors shadow-xs"
            >
              Lưu hồ sơ người giữ nghề
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
