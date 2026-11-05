import type {
  ReferenceSource,
  ReferenceVillageScope,
  SourceCategory,
} from '../types/archive.ts';

export const PENDING_SOURCE_VERIFICATION = 'Đang chờ xác minh';

export const SOURCE_CATEGORY_METADATA: Record<
  SourceCategory,
  {
    label: string;
    shortLabel: string;
    description: string;
  }
> = {
  'chinh-thuc': {
    label: 'Nguồn chính thức',
    shortLabel: 'Chính thức',
    description: 'UNESCO, cơ quan quản lý văn hóa nhà nước và hồ sơ di sản quốc gia.',
  },
  'hoc-thuat': {
    label: 'Nguồn học thuật',
    shortLabel: 'Học thuật',
    description: 'Bài báo khoa học, luận văn, sách chuyên khảo, viện nghiên cứu và trường đại học.',
  },
  'bao-chi': {
    label: 'Nguồn báo chí',
    shortLabel: 'Báo chí',
    description: 'Cơ quan báo chí chính thống, có uy tín và kiểm chứng biên tập.',
  },
  'cong-dong': {
    label: 'Nguồn cộng đồng',
    shortLabel: 'Cộng đồng',
    description: 'Tư liệu điền dã do nghệ nhân, người thực hành nghề hoặc cộng đồng trực tiếp cung cấp.',
  },
};

export const REFERENCE_VILLAGE_SCOPE_LABELS: Record<ReferenceVillageScope, string> = {
  'tri-duc': 'Chứng minh riêng cho làng Trì Đức (Ligok), Bình Thuận',
  'bau-truc': 'Chứng minh riêng cho làng Bàu Trúc (Hamu Crok), Ninh Thuận',
  'chung-ca-hai':
    'Khái quát chung di sản (không dùng để suy diễn chi tiết riêng giữa hai làng)',
  'dang-cho-xac-minh': PENDING_SOURCE_VERIFICATION,
};

export const INITIAL_REFERENCE_SOURCES: ReferenceSource[] = [
  {
    id: 'REF-01',
    title: 'Art of pottery-making of Chăm people (Hồ sơ di sản số 01574)',
    publisherOrAuthor:
      'UNESCO – Ủy ban Liên chính phủ Công ước 2003 về bảo vệ di sản văn hóa phi vật thể',
    publishYear: '2022',
    sourceType: 'chinh-thuc',
    url: 'https://ich.unesco.org/en/USL/art-of-pottery-making-of-chm-people-01574',
    usedContent:
      'Xác nhận việc ghi danh Nghệ thuật làm gốm của người Chăm vào Danh sách Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp (tháng 11/2022); vai trò chủ đạo của phụ nữ Chăm; kỹ thuật tạo dáng bằng tay đi vòng quanh phôi không dùng bàn xoay; gốm không tráng men nung ngoài trời bằng củi rơm và các nguy cơ mai một.',
    villageScope: 'chung-ca-hai',
    verificationStatus: 'da-xac-minh',
  },
  {
    id: 'REF-02',
    title:
      'Nghệ thuật làm gốm của người Chăm được UNESCO đưa vào Danh sách bảo vệ khẩn cấp',
    publisherOrAuthor: 'Báo Điện tử Chính phủ',
    publishYear: '2022',
    sourceType: 'bao-chi',
    url: 'https://baochinhphu.vn/nghe-thuat-lam-gom-cua-nguoi-cham-duoc-unesco-dua-vao-danh-sach-bao-ve-khan-cap-102221130105223659.htm',
    usedContent:
      'Thông tin chính thức về sự kiện ghi danh ngày 29/11/2022 tại Rabat (Maroc); xác nhận hai không gian thực hành nghề tiêu biểu tại làng Bàu Trúc (Ninh Thuận) và Bình Đức (Bình Thuận), cùng yêu cầu bảo vệ khẩn cấp di sản.',
    villageScope: 'chung-ca-hai',
    verificationStatus: 'da-xac-minh',
  },
  {
    id: 'REF-03',
    title: PENDING_SOURCE_VERIFICATION,
    publisherOrAuthor: 'Tạp chí Nghiên cứu Văn hóa (Cổng VJOL) – Tác giả: Đang chờ xác minh',
    publishYear: PENDING_SOURCE_VERIFICATION,
    sourceType: 'hoc-thuat',
    url: 'https://www.vjol.info.vn/tcnghiencuuvanhoa/vi/article/view/206865/',
    usedContent:
      'Đang chờ xác minh (cần đối chiếu toàn văn bài báo mã 206865 trên hệ thống Tạp chí Nghiên cứu Văn hóa trước khi trích dẫn số liệu hoặc nhận định riêng cho từng làng nghề).',
    villageScope: 'dang-cho-xac-minh',
    verificationStatus: 'dang-cho-xac-minh',
  },
  {
    id: 'REF-04',
    title:
      'Nghệ thuật làm gốm của người Chăm là di sản văn hóa cần bảo vệ khẩn cấp',
    publisherOrAuthor: 'Viện Nghiên cứu phát triển kinh tế - xã hội Hà Nội',
    publishYear: PENDING_SOURCE_VERIFICATION,
    sourceType: 'hoc-thuat',
    url: 'https://vienktxh.hanoi.gov.vn/nghien-cuu-trao-doi/nghe-thuat-lam-gom-cua-nguoi-cham-la-di-san-van-hoa-can-bao-ve-khan-cap-120853.html',
    usedContent:
      'Tổng thuật đặc trưng phương pháp chế tác thủ công của phụ nữ Chăm di chuyển giật lùi quanh khối đất không dùng bàn xoay, sử dụng nguyên liệu tự nhiên tại chỗ (đất sét, cát, nước, củi, rơm) và nung lộ thiên khoảng 7–8 giờ ở khoảng 800°C.',
    villageScope: 'chung-ca-hai',
    verificationStatus: 'dang-cho-xac-minh',
  },
  {
    id: 'REF-05',
    title: PENDING_SOURCE_VERIFICATION,
    publisherOrAuthor: 'Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG-HCM',
    publishYear: PENDING_SOURCE_VERIFICATION,
    sourceType: 'hoc-thuat',
    url: 'https://hcmussh.edu.vn/post/21840',
    usedContent:
      'Giới thiệu giá trị di sản gốm Chăm, phương thức trao truyền thực hành trong gia đình và thông tin khai thác đất sét ven sông Quao tại làng Bàu Trúc, Ninh Thuận (lưu ý: thông tin sông Quao chỉ áp dụng cho Bàu Trúc, không suy diễn cho làng Trì Đức).',
    villageScope: 'bau-truc',
    verificationStatus: 'dang-cho-xac-minh',
  },
];
