export type VillageId = 'tri-duc' | 'bau-truc';

export type RecordCategory =
  | 'lang-nghe'
  | 'quy-trinh'
  | 'dung-cu'
  | 'san-pham'
  | 'nghe-nhan';

export type AbstractIllustrationKey =
  | 'hero-terracotta'
  | 'clay-earth'
  | 'incised-motif'
  | 'fire-patina'
  | 'pottery-pedestal-coil'
  | 'sun-drying-patina'
  | 'shell-comb-carving';

export type PageRoute =
  | 'trang-chu'
  | 'ky-thuat'
  | 'quy-trinh'
  | 'cong-cu-nghe-nhan'
  | 'lang-nghe'
  | 'dung-cu-san-pham'
  | 'nghe-nhan'
  | 'nguon-tham-khao'
  | 'hoi-dap';

export type SourceCategory =
  | 'chinh-thuc'
  | 'hoc-thuat'
  | 'bao-chi'
  | 'cong-dong';

export type ReferenceVillageScope =
  | 'tri-duc'
  | 'bau-truc'
  | 'chung-ca-hai'
  | 'dang-cho-xac-minh';

export type ReferenceVerificationStatus =
  | 'da-xac-minh'
  | 'dang-cho-xac-minh';

export interface ReferenceSource {
  id: string;
  title: string; // Tên tài liệu
  publisherOrAuthor: string; // Tác giả hoặc cơ quan phát hành
  publishYear: string; // Năm công bố (hoặc "Đang chờ xác minh")
  sourceType: SourceCategory; // Loại nguồn
  url: string; // Đường dẫn (hoặc "Đang chờ xác minh")
  usedContent: string; // Nội dung được sử dụng
  villageScope: ReferenceVillageScope; // Phân định rõ phạm vi chứng minh Trì Đức / Bàu Trúc
  verificationStatus: ReferenceVerificationStatus; // Trạng thái xác minh nguồn
}

export interface PotteryToolItem {
  id: string;
  vietnameseName: string;
  nativeName: string; // Tên gọi bản địa tiếng Chăm
  pronunciationOrDialect?: string;
  material: string;
  purpose: string;
  techniqueStage: string;
  villageScope: 'tri-duc' | 'bau-truc' | 'chung-ca-hai';
  illustrationKey: AbstractIllustrationKey;
  sourceReferences: string[];
  notes?: string;
}

export interface ResearchTermItem {
  term: string;
  chamScriptOrPhonetic?: string;
  category: 'dia-danh-nguyen-lieu' | 'san-pham-ban-dia' | 'thao-tac-ky-thuat';
  meaning: string;
  culturalContext: string;
  villageAttribution: 'tri-duc' | 'bau-truc' | 'chung-ca-hai';
  citedReferenceIds: string[];
}

export interface ArtisanKeeperProfile {
  id: string;
  fullName: string; // Họ tên (hoặc "Chưa có tư liệu xác minh")
  village: VillageId; // Địa phương: 'tri-duc' | 'bau-truc'
  localVillageName: string; // Ligok hoặc Hamu Crok
  ethnicity: string; // Dân tộc (Chăm)
  experience: string; // Kinh nghiệm (hoặc "Chưa có tư liệu xác minh")
  specializedTechniques: string; // Kỹ thuật tạo tác
  transmissionProcess: string; // Quá trình truyền nghề (mẹ truyền con nối,...)
  interviewInfo: string; // Thông tin phỏng vấn / Lời kể của người thực hành
  hasVerifiedImage: boolean; // Nếu false, hiển thị khung chờ "Chưa có hình ảnh tư liệu xác minh"
  imageUrl?: string; // Đường dẫn ảnh tư liệu thực tế (nếu có bản quyền)
  imageCaption?: string; // Chú thích ảnh
  imageSource?: string; // Nguồn ảnh
  imageUsageRights?: string; // Quyền sử dụng được phép
  citedReferenceIds: string[]; // Nguồn tham khảo đối chiếu
  isSampleOrUnverified: boolean; // Trạng thái dữ liệu mẫu / chờ xác minh
  attributionNote?: string;
}

export interface ArchivalRecord {
  id: string;
  village: VillageId;
  category: RecordCategory;
  processStepOrder?: number;
  artisanRoleType?: 'nghe-nhan-truyen-day' | 'nguoi-thuc-hanh' | 'nguoi-luu-giu';

  // 9 trường thông tin bắt buộc theo chuẩn lưu trữ di sản
  title: string; // 1. Tên hiện vật hoặc nội dung
  localName: string; // 2. Tên gọi địa phương
  ethnicity: string; // 3. Dân tộc
  culturalRegion: string; // 4. Vùng văn hóa
  currentLocation: string; // 5. Địa danh hiện nay
  historicalLocation: string; // 6. Địa danh lịch sử tại thời điểm tư liệu được ghi nhận
  informant: string; // 7. Người cung cấp thông tin
  usageScope: string; // 8. Phạm vi sử dụng được phép
  source: string; // 9. Nguồn tư liệu

  // Liên kết hệ thống quản lý nguồn tham khảo
  referenceIds: string[];
  villageAttributionNote?: string;

  // Nội dung mô tả & trạng thái xác minh
  summary: string;
  details: string;
  isSampleData: boolean;
  abstractIllustrationKey?: AbstractIllustrationKey;
  documentaryImageUrl?: string;
  documentaryImageCredit?: string;
}

export interface QaMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citedRecordIds?: string[];
  citedReferenceIds?: string[];
  hasVerifiedInfo?: boolean;
  missingDataNote?: string;
  timestamp: string;
}

export interface QaApiResponse {
  answer: string;
  hasVerifiedInfo: boolean;
  citedRecordIds: string[];
  citedReferenceIds: string[];
  missingDataNote: string;
}
