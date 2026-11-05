import React from 'react';
import { Camera, ImageOff, ShieldAlert, ShieldCheck } from 'lucide-react';

interface ArtisanImageFrameProps {
  hasVerifiedImage: boolean;
  imageUrl?: string;
  imageCaption?: string;
  imageSource?: string;
  imageUsageRights?: string;
  artisanName: string;
  villageName: string;
  aspectClass?: string;
}

export const ArtisanImageFrame: React.FC<ArtisanImageFrameProps> = ({
  hasVerifiedImage,
  imageUrl,
  imageCaption,
  imageSource = 'Đang chờ xác minh nguồn tư liệu hình ảnh thực tế',
  imageUsageRights = 'Chỉ công bố ảnh thực tế khi có sự đồng thuận bằng văn bản của nghệ nhân',
  artisanName,
  villageName,
  aspectClass = 'aspect-[4/3]',
}) => {
  return (
    <div className="space-y-2.5">
      <div
        className={`relative w-full ${aspectClass} overflow-hidden rounded-md border border-[#D8CEBE] bg-[#EFE9DD] flex flex-col items-center justify-center p-5 text-center`}
      >
        {hasVerifiedImage && imageUrl ? (
          <img
            src={imageUrl}
            alt={imageCaption || `Ảnh tư liệu ${artisanName}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          /* Khung chờ ảnh chuẩn nhân học theo yêu cầu đặc biệt */
          <div className="max-w-xs space-y-2.5 flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-[#E5DDCF] border border-[#C8BBA8] flex items-center justify-center text-[#8C2F1B]">
              <ImageOff className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase text-[#8C2F1B] bg-[#F7EFE2] border border-[#DECFBA] rounded-xs">
                Chưa có hình ảnh tư liệu xác minh
              </span>
              <p className="text-xs text-[#5C4D42] leading-relaxed">
                Khung chờ tiếp nhận ảnh tư liệu thực tế tại{' '}
                <strong className="text-[#1F1A17]">{villageName}</strong>.
              </p>
            </div>

            <div className="pt-2 border-t border-[#DFD6C7] w-full text-[10px] text-[#78695D] space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-[#8C2F1B]">
                <ShieldAlert className="w-3 h-3" />
                <span className="font-medium">Tuyệt đối không dùng ảnh AI giả làm nghệ nhân</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Metadata caption, source, and usage rights */}
      <div className="bg-[#F8F5EF] border border-[#E4DC CE] p-2.5 rounded-xs space-y-1 text-xs text-[#5C4D42]">
        <div className="flex items-start gap-1.5">
          <Camera className="w-3.5 h-3.5 text-[#8C2F1B] shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong className="text-[#1F1A17]">Chú thích:</strong>{' '}
            {imageCaption || 'Khung hồ sơ lưu trữ hình ảnh tư liệu điền dã di sản.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1 border-t border-[#EAE3D5] text-[11px] text-[#6B5B4E]">
          <p>
            <strong className="text-[#1F1A17]">Nguồn ảnh:</strong> {imageSource}
          </p>
          <p>
            <strong className="text-[#1F1A17]">Quyền sử dụng:</strong> {imageUsageRights}
          </p>
        </div>
      </div>
    </div>
  );
};
