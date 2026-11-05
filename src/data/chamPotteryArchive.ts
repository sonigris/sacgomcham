import type { ArchivalRecord, VillageId } from '../types/archive.ts';

export const UNVERIFIED_TEXT = 'Chưa có tư liệu xác minh';
export const PENDING_SOURCE_TEXT = 'Đang chờ xác minh';

export const VILLAGE_METADATA: Record<
  VillageId,
  {
    name: string;
    localName: string;
    shortLabel: string;
    province: string;
    currentAdmin: string;
    overview: string;
    distinguishingNotes: string[];
    referenceIds: string[];
    attributionWarning: string;
  }
> = {
  'tri-duc': {
    name: 'Làng gốm Trì Đức',
    localName: 'Ligok',
    shortLabel: 'Trì Đức (Ligok) · Bình Thuận',
    province: 'Bình Thuận',
    currentAdmin: 'Xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận',
    overview:
      'Làng gốm Trì Đức (tên gọi địa phương là Ligok) thuộc xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận là một trong hai địa điểm thực hành nghề làm gốm truyền thống của người Chăm. Nghề gốm tại đây gắn với bàn tay người phụ nữ Chăm, tạo hình thủ công không dùng bàn xoay và nung lộ thiên ngoài trời.',
    distinguishingNotes: [
      'Tên gọi Chăm địa phương: Ligok (thuộc xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận).',
      'Nguồn tham khảo hiện có (REF-01, REF-02, REF-04) mới ghi nhận khái quát Bình Đức thuộc phạm vi di sản cần bảo vệ khẩn cấp; các chi tiết riêng về bãi đất khai thác tại Ligok đang chờ nguồn điền dã chuyên biệt xác minh.',
      'Tuyệt đối không lấy tư liệu về nguồn đất ven sông Quao hay số liệu sản xuất của Bàu Trúc để khẳng định cho làng Trì Đức.',
    ],
    referenceIds: ['REF-01', 'REF-02', 'REF-04'],
    attributionWarning:
      'Các chi tiết kỹ thuật chuyên sâu riêng tại làng Trì Đức (Ligok) hiện đang chờ bổ sung nguồn điền dã độc lập tại Bình Thuận.',
  },
  'bau-truc': {
    name: 'Làng gốm Bàu Trúc',
    localName: 'Hamu Crok',
    shortLabel: 'Bàu Trúc (Hamu Crok) · Ninh Thuận',
    province: 'Ninh Thuận',
    currentAdmin: 'Thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận',
    overview:
      'Làng gốm Bàu Trúc (tên gọi địa phương là Hamu Crok) tại thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận là trung tâm thực hành nghề gốm cổ truyền của người Chăm. Tư liệu giới thiệu ghi nhận việc khai thác đất sét ven sông Quao tại địa phương, tạo dáng đi lùi quanh bệ kê cố định và nung lộ thiên bằng củi rơm.',
    distinguishingNotes: [
      'Tên gọi Chăm địa phương: Hamu Crok (thuộc thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận).',
      'Nguồn giới thiệu học thuật (REF-05) ghi nhận chi tiết nguồn đất sét bãi bồi ven sông Quao gắn riêng với Bàu Trúc (Ninh Thuận).',
      'Không sử dụng đặc điểm dòng gốm mỹ thuật du lịch hoặc nguồn đất tại Bàu Trúc để quy chiếu sang làng Trì Đức (Bình Thuận).',
    ],
    referenceIds: ['REF-01', 'REF-02', 'REF-04', 'REF-05'],
    attributionWarning:
      'Tư liệu về đất sét sông Quao chỉ áp dụng cho Bàu Trúc (Hamu Crok), không áp dụng cho Trì Đức.',
  },
};

export const INITIAL_ARCHIVE_RECORDS: ArchivalRecord[] = [
  // ==================== 1. HỒ SƠ LÀNG NGHỀ ====================
  {
    id: 'HS-TD-LG01',
    village: 'tri-duc',
    category: 'lang-nghe',
    title: 'Không gian nghề gốm truyền thống làng Trì Đức (Ligok)',
    localName: 'Ligok',
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Bình Thuận',
    currentLocation: 'Thôn Trì Đức, xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Giáo dục, nghiên cứu và giới thiệu bảo tồn phi thương mại (dữ liệu mẫu minh họa)',
    source:
      'Báo Điện tử Chính phủ (2022, REF-02) & UNESCO (2022, REF-01) cho thông tin ghi danh khái quát; tư liệu điền dã riêng tại Ligok: Đang chờ xác minh',
    referenceIds: ['REF-01', 'REF-02'],
    villageAttributionNote:
      'Nguồn REF-01, REF-02 xác nhận không gian di sản chung tại Bình Đức (Bình Thuận); chi tiết lịch sử cư trú riêng tại thôn Trì Đức đang chờ xác minh.',
    summary:
      'Tổng quan về không gian thực hành nghề làm gốm thủ công của người Chăm tại làng Trì Đức (Ligok), xã Bình Đức, tỉnh Bình Thuận.',
    details:
      'Làng gốm tại xã Bình Đức (tên địa phương của thôn Trì Đức là Ligok) thuộc phạm vi di sản Nghệ thuật làm gốm của người Chăm được UNESCO đưa vào Danh sách cần bảo vệ khẩn cấp năm 2022. Quy trình truyền thống giữ lối làm thủ công bằng tay không dùng bàn xoay và nung lộ thiên. Các số liệu hộ làm nghề cụ thể và tọa độ mỏ đất riêng của Ligok hiện được đánh dấu chờ nguồn khảo sát thực địa độc lập tại Bình Thuận.',
    isSampleData: true,
    abstractIllustrationKey: 'clay-earth',
  },
  {
    id: 'HS-BT-LG01',
    village: 'bau-truc',
    category: 'lang-nghe',
    title: 'Không gian nghề gốm truyền thống làng Bàu Trúc (Hamu Crok)',
    localName: 'Hamu Crok',
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Ninh Thuận',
    currentLocation: 'Khu phố Bàu Trúc, thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Giáo dục, nghiên cứu và giới thiệu bảo tồn phi thương mại (dữ liệu mẫu minh họa)',
    source:
      'UNESCO (2022, REF-01), Báo Điện tử Chính phủ (2022, REF-02), Trường ĐH KHXH&NV TP.HCM (REF-05 – đang chờ xác minh năm/tiêu đề)',
    referenceIds: ['REF-01', 'REF-02', 'REF-05'],
    villageAttributionNote:
      'Chi tiết khai thác đất sét ven sông Quao (REF-05) chỉ xác nhận riêng cho Bàu Trúc (Ninh Thuận), không dùng cho Trì Đức.',
    summary:
      'Tổng quan về không gian văn hóa và truyền thống chế tác gốm mộc thủ công của người Chăm tại làng Bàu Trúc (Hamu Crok), tỉnh Ninh Thuận.',
    details:
      'Làng gốm Bàu Trúc (Hamu Crok) tại Ninh Thuận là địa điểm tiêu biểu thực hành di sản làm gốm thủ công của người Chăm, gắn liền với nguồn đất sét bãi bồi ven sông Quao pha cát mịn. Quá trình làm gốm thể hiện vai trò trung tâm của người phụ nữ Chăm trong việc trao truyền kỹ năng từ thế hệ này sang thế hệ khác.',
    isSampleData: true,
    abstractIllustrationKey: 'hero-terracotta',
  },

  // ==================== 2. HỒ SƠ QUY TRÌNH ====================
  {
    id: 'HS-TD-QT01',
    village: 'tri-duc',
    category: 'quy-trinh',
    processStepOrder: 1,
    title: 'Chuẩn bị nguyên liệu đất sét và cát tại làng Trì Đức (Ligok)',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Bình Thuận',
    currentLocation: 'Làng Trì Đức (Ligok), xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu và trưng bày trực tuyến phi thương mại (dữ liệu mẫu minh họa)',
    source:
      'Viện Nghiên cứu phát triển KT-XH Hà Nội (REF-04 – nguyên liệu chung); nguồn khảo sát mỏ đất riêng tại Trì Đức: Đang chờ xác minh',
    referenceIds: ['REF-04'],
    villageAttributionNote:
      'Chỉ ghi nhận nguyên liệu tự nhiên chung (đất sét, cát, nước); vị trí bãi lấy đất cụ thể của làng Trì Đức đang chờ xác minh, không áp dụng thông tin sông Quao của Bàu Trúc.',
    summary:
      'Bước chuẩn bị cốt gốm từ đất sét tự nhiên và cát sạch theo kinh nghiệm thủ công tại Bình Đức, Bình Thuận.',
    details:
      'Theo đặc trưng chung của nghề gốm Chăm, nguyên liệu cốt lõi gồm đất sét tự nhiên, cát và nước được xử lý thủ công trước khi tạo hình. Riêng tên gọi bãi đất nguyên liệu và tỷ lệ pha cát cụ thể tại làng Trì Đức (Ligok) hiện chưa có tài liệu chuyên khảo độc lập xác minh trong kho nguồn, cần bổ sung biên bản điền dã tại xã Bình Đức.',
    isSampleData: true,
    abstractIllustrationKey: 'clay-earth',
  },
  {
    id: 'HS-BT-QT01',
    village: 'bau-truc',
    category: 'quy-trinh',
    processStepOrder: 1,
    title: 'Khai thác đất sét ven sông Quao và nhào trộn cát tại Bàu Trúc',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Ninh Thuận',
    currentLocation: 'Làng Bàu Trúc (Hamu Crok), thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu và trưng bày trực tuyến phi thương mại (dữ liệu mẫu minh họa)',
    source:
      'Trường ĐH KHXH&NV TP.HCM (REF-05 – đang chờ xác minh tiêu đề/năm) & Viện Nghiên cứu phát triển KT-XH Hà Nội (REF-04)',
    referenceIds: ['REF-04', 'REF-05'],
    villageAttributionNote:
      'Thông tin đất sét bãi bồi ven sông Quao được ghi nhận gắn riêng với làng Bàu Trúc (Ninh Thuận).',
    summary:
      'Quy trình xử lý nguồn đất sét khai thác tại bãi bồi ven sông Quao kết hợp cát mịn và nước tại Bàu Trúc.',
    details:
      'Tại làng gốm Bàu Trúc (Hamu Crok), nguyên liệu chính là đất sét khai thác theo chu kỳ tự nhiên tại khu vực ven sông Quao, đem phơi đập, ngâm ủ nước và nhào trộn kỹ với cát mịn để tạo độ dẻo dai và khả năng chịu nhiệt cho xương gốm mộc.',
    isSampleData: true,
    abstractIllustrationKey: 'clay-earth',
  },
  {
    id: 'HS-TD-QT02',
    village: 'tri-duc',
    category: 'quy-trinh',
    processStepOrder: 2,
    title: 'Tạo hình bằng tay không dùng bàn xoay tại Trì Đức (Ligok)',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Bình Thuận',
    currentLocation: 'Làng Trì Đức (Ligok), xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu và trưng bày trực tuyến phi thương mại (dữ liệu mẫu minh họa)',
    source:
      'UNESCO (2022, REF-01) & Báo Điện tử Chính phủ (2022, REF-02) – nguyên lý chung di sản; chi tiết thao tác riêng tại Trì Đức: Đang chờ xác minh',
    referenceIds: ['REF-01', 'REF-02', 'REF-04'],
    villageAttributionNote:
      'Tài liệu REF-01, REF-02, REF-04 xác nhận đặc trưng chung không dùng bàn xoay của gốm Chăm; sắc thái thao tác riêng tại Trì Đức đang chờ nguồn điền dã.',
    summary:
      'Người thợ đặt khối đất lên bệ kê cố định và di chuyển giật lùi vòng quanh phôi để tạo dáng hoàn toàn bằng tay.',
    details:
      'Gốm Chăm không sử dụng bàn xoay: người phụ nữ Chăm đặt khối nguyên liệu trên kê cố định rồi bước đi giật lùi vòng quanh sản phẩm để nắn vuốt thành hình. Đối với các khác biệt chi tiết trong khẩu độ bước chân, độ dày thành gốm hay tên gọi thao tác riêng tại làng Trì Đức (Ligok), hệ thống đang chờ bổ sung tư liệu điền dã xác minh.',
    isSampleData: true,
    abstractIllustrationKey: 'hero-terracotta',
  },
  {
    id: 'HS-BT-QT02',
    village: 'bau-truc',
    category: 'quy-trinh',
    processStepOrder: 2,
    title: 'Tạo hình thủ công đi giật lùi vòng quanh kê tại Bàu Trúc (Hamu Crok)',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Ninh Thuận',
    currentLocation: 'Làng Bàu Trúc (Hamu Crok), thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu và trưng bày trực tuyến phi thương mại (dữ liệu mẫu minh họa)',
    source: 'UNESCO (2022, REF-01), Viện Nghiên cứu phát triển KT-XH Hà Nội (REF-04), ĐH KHXH&NV TP.HCM (REF-05)',
    referenceIds: ['REF-01', 'REF-04', 'REF-05'],
    villageAttributionNote:
      'Ghi nhận theo mô tả kỹ thuật tạo hình không bàn xoay tại Bàu Trúc và hồ sơ di sản chung.',
    summary:
      'Đặt khối đất trên hòn kê cố định và di chuyển giật lùi vòng quanh để chuốt dáng nồi, bình, chum bằng đôi tay.',
    details:
      'Thay vì đứng hoặc ngồi xoay bàn gốm cơ học, người phụ nữ Chăm tại Bàu Trúc đặt khối đất sét lên bệ kê cố định rồi di chuyển giật lùi vòng quanh khối nguyên liệu, kết hợp đôi bàn tay nâng và chuốt đều thành gốm tạo dáng tròn cân xứng.',
    isSampleData: true,
    abstractIllustrationKey: 'hero-terracotta',
  },
  {
    id: 'HS-TD-QT03',
    village: 'tri-duc',
    category: 'quy-trinh',
    processStepOrder: 3,
    title: 'Hoàn thiện bề mặt mộc không tráng men và trang trí tại Trì Đức',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Bình Thuận',
    currentLocation: 'Làng Trì Đức (Ligok), xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu và trưng bày trực tuyến phi thương mại (dữ liệu mẫu minh họa)',
    source: 'UNESCO (2022, REF-01 – đặc trưng không tráng men); mẫu hoa văn riêng của Trì Đức: Đang chờ xác minh',
    referenceIds: ['REF-01'],
    villageAttributionNote:
      'UNESCO (REF-01) xác nhận đặc tính gốm Chăm không tráng men; danh mục đồ án hoa văn riêng tại Trì Đức đang chờ xác minh.',
    summary:
      'Bề mặt gốm giữ mộc hoàn toàn không phủ men hóa học; hệ thống hoa văn riêng tại Ligok đang chờ kiểm chứng điền dã.',
    details:
      'Sản phẩm gốm của người Chăm để mộc không tráng men trước khi đưa vào nung. Do các nguồn tham khảo hiện tại chưa liệt kê bảng phân loại mô-típ trang trí riêng biệt của làng Trì Đức (Ligok), mục mô tả chi tiết hoa văn địa phương tại đây được giữ ở trạng thái chờ tư liệu xác minh.',
    isSampleData: true,
    abstractIllustrationKey: 'incised-motif',
  },
  {
    id: 'HS-BT-QT03',
    village: 'bau-truc',
    category: 'quy-trinh',
    processStepOrder: 3,
    title: 'Hoàn thiện gốm mộc không tráng men và tạo hoa văn tại Bàu Trúc',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Ninh Thuận',
    currentLocation: 'Làng Bàu Trúc (Hamu Crok), thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu và trưng bày trực tuyến phi thương mại (dữ liệu mẫu minh họa)',
    source: 'UNESCO (2022, REF-01) & ĐH KHXH&NV TP.HCM (REF-05 – đang chờ xác minh chi tiết)',
    referenceIds: ['REF-01', 'REF-05'],
    villageAttributionNote:
      'Xác nhận gốm không tráng men; phân loại chi tiết từng đồ án khắc vạch tại Bàu Trúc cần bổ sung thêm nguồn chuyên khảo.',
    summary:
      'Chà nhẵn bề mặt gốm mộc không tráng men và trang trí thủ công trên vai, thân sản phẩm gốm gia dụng và mỹ nghệ.',
    details:
      'Sản phẩm tại Bàu Trúc giữ nguyên cốt đất nung không phủ men, thể hiện vẻ đẹp mộc mạc của chất đất và bàn tay tạo tác thủ công trên cả đồ gia dụng, đồ cúng lễ lẫn dòng gốm mỹ nghệ đương đại.',
    isSampleData: true,
    abstractIllustrationKey: 'incised-motif',
  },
  {
    id: 'HS-TD-QT04',
    village: 'tri-duc',
    category: 'quy-trinh',
    processStepOrder: 4,
    title: 'Nung gốm lộ thiên ngoài trời bằng củi và rơm tại Trì Đức',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Bình Thuận',
    currentLocation: 'Làng Trì Đức (Ligok), xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu và trưng bày trực tuyến phi thương mại (dữ liệu mẫu minh họa)',
    source: 'UNESCO (2022, REF-01), Báo Điện tử Chính phủ (2022, REF-02), Viện Nghiên cứu phát triển KT-XH Hà Nội (REF-04)',
    referenceIds: ['REF-01', 'REF-02', 'REF-04'],
    villageAttributionNote:
      'Áp dụng thông tin chung về nung lộ thiên bằng củi và rơm; các kỹ thuật xử lý sau nung riêng tại Trì Đức đang chờ xác minh.',
    summary:
      'Sản phẩm phơi khô được xếp nung ngoài trời bằng củi và rơm, không sử dụng lò nung xây cố định.',
    details:
      'Theo hồ sơ di sản UNESCO (REF-01) và tổng thuật nghiên cứu (REF-04), gốm Chăm được phơi khô rồi nung lộ thiên ngoài trời bằng củi và rơm trong khoảng 7–8 giờ ở nhiệt độ khoảng 800°C. Các kinh nghiệm riêng biệt về cách xếp đống nung hoặc xử lý nước vỏ cây tại riêng làng Trì Đức (Ligok) đang chờ nguồn cộng đồng địa phương xác minh.',
    isSampleData: true,
    abstractIllustrationKey: 'fire-patina',
  },
  {
    id: 'HS-BT-QT04',
    village: 'bau-truc',
    category: 'quy-trinh',
    processStepOrder: 4,
    title: 'Nung lộ thiên ngoài trời bằng củi, rơm (khoảng 7–8 giờ) tại Bàu Trúc',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Ninh Thuận',
    currentLocation: 'Làng Bàu Trúc (Hamu Crok), thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu và trưng bày trực tuyến phi thương mại (dữ liệu mẫu minh họa)',
    source: 'UNESCO (2022, REF-01), Viện Nghiên cứu phát triển KT-XH Hà Nội (REF-04), ĐH KHXH&NV TP.HCM (REF-05)',
    referenceIds: ['REF-01', 'REF-04', 'REF-05'],
    villageAttributionNote:
      'Thông tin thời gian nung khoảng 7–8 giờ ở khoảng 800°C bằng củi và rơm trích từ REF-04, REF-05.',
    summary:
      'Nung trực tiếp trên bãi đất trống bằng củi và rơm khoảng 7–8 giờ ở mức nhiệt khoảng 800°C, tạo màu lửa tự nhiên.',
    details:
      'Gốm mộc sau khi phơi khô được xếp trên bãi đất trống ngoài trời và nung trực tiếp bằng củi khô và rơm trong khoảng 7–8 giờ ở nhiệt độ khoảng 800°C, tạo nên sắc độ đất nung và vết khói tự nhiên trên bề mặt không tráng men.',
    isSampleData: true,
    abstractIllustrationKey: 'fire-patina',
  },

  // ==================== 3. HỒ SƠ DỤNG CỤ ====================
  {
    id: 'HS-TD-DC01',
    village: 'tri-duc',
    category: 'dung-cu',
    title: 'Hòn kê / bệ kê cố định tạo hình gốm tại Trì Đức',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Bình Thuận',
    currentLocation: 'Làng Trì Đức (Ligok), xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu, kiểm kê di sản và giáo dục (dữ liệu mẫu minh họa)',
    source: PENDING_SOURCE_TEXT,
    referenceIds: [],
    villageAttributionNote:
      'Đang chờ xác minh nguồn điền dã ghi nhận kích thước và tên gọi tiếng Chăm của bệ kê tại riêng làng Trì Đức.',
    summary:
      'Giá đỡ cố định thay cho bàn xoay để đặt khối đất trong lúc người thợ di chuyển vòng quanh tạo dáng.',
    details:
      'Mặc dù nguyên lý đặt đất trên kê cố định là đặc trưng chung của nghề gốm Chăm, danh mục chi tiết kích thước, chất liệu kê và tên gọi địa phương tại làng Trì Đức (Ligok) hiện chưa có tài liệu kiểm chứng riêng, đang chờ bổ sung nguồn tham khảo.',
    isSampleData: true,
  },
  {
    id: 'HS-TD-DC02',
    village: 'tri-duc',
    category: 'dung-cu',
    title: 'Nhóm dụng cụ chuốt, cạo mỏng và chà láng thủ công tại Trì Đức',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Bình Thuận',
    currentLocation: 'Làng Trì Đức (Ligok), xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu, kiểm kê di sản và giáo dục (dữ liệu mẫu minh họa)',
    source: PENDING_SOURCE_TEXT,
    referenceIds: [],
    villageAttributionNote:
      'Đang chờ xác minh nguồn khảo sát thực địa về bộ công cụ cầm tay tại làng Trì Đức (Ligok).',
    summary:
      'Khung hồ sơ mẫu dành cho các công cụ cạo mỏng, vuốt miệng và hoàn thiện bề mặt gốm tại Bình Đức.',
    details:
      'Để tránh lấy danh mục công cụ của làng Bàu Trúc áp đặt sang làng Trì Đức khi chưa có biên bản đối chứng, hồ sơ này giữ trạng thái "Đang chờ xác minh" về nguồn tham khảo và tên gọi địa phương.',
    isSampleData: true,
  },
  {
    id: 'HS-BT-DC01',
    village: 'bau-truc',
    category: 'dung-cu',
    title: 'Hòn kê cố định đặt phôi đất tạo hình tại Bàu Trúc',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Ninh Thuận',
    currentLocation: 'Làng Bàu Trúc (Hamu Crok), thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu, kiểm kê di sản và giáo dục (dữ liệu mẫu minh họa)',
    source: 'Trường ĐH KHXH&NV TP.HCM (REF-05 – đang chờ xác minh chi tiết)',
    referenceIds: ['REF-05'],
    villageAttributionNote:
      'Nguồn REF-05 đề cập việc đặt khối đất sét trên hòn kê cố định để người thợ đi giật lùi tạo hình; tên tiếng Chăm của dụng cụ đang chờ xác minh.',
    summary:
      'Bệ/hòn kê cố định giữ khối đất sét đứng yên trong khi người phụ nữ Chăm bước lùi vòng quanh chuốt dáng.',
    details:
      'Hòn kê cố định là điểm tựa trung tâm thay thế hoàn toàn bàn xoay cơ học trong không gian làm gốm tại Bàu Trúc. Tên gọi thuật ngữ địa phương chính xác của từng bộ phận kê hiện đang chờ nguồn điền dã xác minh.',
    isSampleData: true,
  },
  {
    id: 'HS-BT-DC02',
    village: 'bau-truc',
    category: 'dung-cu',
    title: 'Nhóm dụng cụ đập dáng, chà láng và khắc hoa văn tại Bàu Trúc',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Ninh Thuận',
    currentLocation: 'Làng Bàu Trúc (Hamu Crok), thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu, kiểm kê di sản và giáo dục (dữ liệu mẫu minh họa)',
    source: PENDING_SOURCE_TEXT,
    referenceIds: [],
    villageAttributionNote:
      'Đang chờ xác minh tài liệu chuyên khảo mô tả tên gọi tiếng Chăm và quy cách từng công cụ cầm tay tại Bàu Trúc.',
    summary:
      'Khung hồ sơ kiểm kê các công cụ thủ công hỗ trợ làm mỏng xương gốm và trang trí bề mặt tại Hamu Crok.',
    details:
      'Hồ sơ mẫu dùng để tiếp nhận thông tin khảo sát thực địa đã kiểm chứng về bộ dụng cụ cầm tay của nghệ nhân Bàu Trúc. Hiện đang chờ xác minh nguồn học thuật hoặc nguồn cộng đồng.',
    isSampleData: true,
    abstractIllustrationKey: 'incised-motif',
  },

  // ==================== 4. HỒ SƠ SẢN PHẨM ====================
  {
    id: 'HS-TD-SP01',
    village: 'tri-duc',
    category: 'san-pham',
    title: 'Đồ gốm gia dụng và vật dụng sinh hoạt truyền thống tại Trì Đức',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Bình Thuận',
    currentLocation: 'Làng Trì Đức (Ligok), xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu và giới thiệu di sản phi thương mại (dữ liệu mẫu minh họa)',
    source: 'UNESCO (2022, REF-01 – nhóm sản phẩm chung); danh mục hiện vật riêng tại Trì Đức: Đang chờ xác minh',
    referenceIds: ['REF-01'],
    villageAttributionNote:
      'UNESCO (REF-01) nêu các nhóm đồ gia dụng và tín ngưỡng chung (chum, nồi, khay/mâm, bình); tên gọi và kích thước hiện vật riêng tại Trì Đức đang chờ xác minh.',
    summary:
      'Nhóm đồ đất nung không tráng men phục vụ đun nấu và sinh hoạt gia đình tại làng gốm Trì Đức (Ligok).',
    details:
      'Hồ sơ di sản UNESCO ghi nhận sản phẩm gốm Chăm bao gồm đồ dùng sinh hoạt gia đình và vật phẩm nghi lễ như nồi, chum, mâm/khay, bình. Để đảm bảo tính chính xác địa phương, các tên gọi tiếng Chăm và kiểu dáng đặc thù riêng của làng Trì Đức (Bình Thuận) đang được để chờ xác minh từ nguồn khảo sát tại chỗ.',
    isSampleData: true,
    abstractIllustrationKey: 'hero-terracotta',
  },
  {
    id: 'HS-BT-SP01',
    village: 'bau-truc',
    category: 'san-pham',
    title: 'Nhóm sản phẩm chum, nồi, mâm, bình và gốm mỹ nghệ tại Bàu Trúc',
    localName: 'Đang chờ đối chiếu chính tả ngữ âm (jek, gok, cambak, bilaok)',
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Ninh Thuận',
    currentLocation: 'Làng Bàu Trúc (Hamu Crok), thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Nghiên cứu và giới thiệu di sản phi thương mại (dữ liệu mẫu minh họa)',
    source: 'UNESCO (2022, REF-01) & Trường ĐH KHXH&NV TP.HCM (REF-05 – đang chờ xác minh)',
    referenceIds: ['REF-01', 'REF-05'],
    villageAttributionNote:
      'Các thuật ngữ phiên âm jek (chum), gok (nồi), cambak (mâm), bilaok (bình) được dẫn theo REF-05 trong bối cảnh giới thiệu gốm Chăm / Bàu Trúc; không tự ý áp đặt sang phương ngữ tại Trì Đức khi chưa đối chiếu.',
    summary:
      'Hệ thống sản phẩm đa dạng gồm đồ gia dụng, đồ cúng lễ và đồ gốm mỹ nghệ không tráng men tại Bàu Trúc.',
    details:
      'Theo hồ sơ UNESCO (REF-01) và bài giới thiệu học thuật (REF-05), sản phẩm gốm truyền thống bao gồm đồ gia dụng, vật phẩm tín ngưỡng và tác phẩm mỹ thuật như chum (jek), nồi (gok), mâm (cambak), bình (bilaok). Cần đối chiếu thêm tự điển phương ngữ và điền dã cộng đồng để chuẩn hóa cách ghi âm từng hiện vật cụ thể.',
    isSampleData: true,
    abstractIllustrationKey: 'hero-terracotta',
  },

  // ==================== 5. HỒ SƠ NGHỆ NHÂN & NGƯỜI LƯU GIỮ NGHỀ ====================
  {
    id: 'HS-TD-NN01',
    village: 'tri-duc',
    category: 'nghe-nhan',
    artisanRoleType: 'nghe-nhan-truyen-day',
    title: 'Hồ sơ mẫu: Phụ nữ Chăm thực hành và truyền nghề tại làng Trì Đức (Ligok)',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Bình Thuận',
    currentLocation: 'Thôn Trì Đức (Ligok), xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Lưu trữ bảo tồn — Chỉ công bố danh tính cá nhân khi có nguồn xác minh và sự đồng thuận',
    source: 'UNESCO (2022, REF-01 – vai trò phụ nữ Chăm chung); hồ sơ cá nhân nghệ nhân Trì Đức: Đang chờ xác minh',
    referenceIds: ['REF-01', 'REF-02'],
    villageAttributionNote:
      'Nguồn REF-01, REF-02 xác nhận vai trò trung tâm của người phụ nữ Chăm trong thực hành và trao truyền nghề; danh sách họ tên nghệ nhân cụ thể tại Trì Đức đang chờ nguồn xác minh.',
    summary:
      'Khung hồ sơ lưu trữ thông tin chủ thể thực hành và truyền dạy nghề gốm tại làng Trì Đức, xã Bình Đức.',
    details:
      'Hồ sơ UNESCO (REF-01) khẳng định nghề làm gốm Chăm chủ yếu do phụ nữ thực hành và truyền dạy qua các thế hệ trong gia đình. Hệ thống không tự tạo tên nghệ nhân, năm sinh hay tiểu sử chưa kiểm chứng; thông tin cá nhân nghệ nhân tại Trì Đức đang chờ nguồn chính thức hoặc nguồn cộng đồng xác minh.',
    isSampleData: true,
  },
  {
    id: 'HS-BT-NN01',
    village: 'bau-truc',
    category: 'nghe-nhan',
    artisanRoleType: 'nghe-nhan-truyen-day',
    title: 'Hồ sơ mẫu: Phụ nữ Chăm thực hành và truyền nghề tại làng Bàu Trúc (Hamu Crok)',
    localName: UNVERIFIED_TEXT,
    ethnicity: 'Chăm',
    culturalRegion: 'Vùng văn hóa Chăm Ninh Thuận',
    currentLocation: 'Khu phố Bàu Trúc (Hamu Crok), thị trấn Phước Dân, huyện Ninh Phước, tỉnh Ninh Thuận',
    historicalLocation: UNVERIFIED_TEXT,
    informant: UNVERIFIED_TEXT,
    usageScope: 'Lưu trữ bảo tồn — Chỉ công bố danh tính cá nhân khi có nguồn xác minh và sự đồng thuận',
    source: 'UNESCO (2022, REF-01), Báo Điện tử Chính phủ (2022, REF-02); hồ sơ cá nhân nghệ nhân Bàu Trúc: Đang chờ xác minh',
    referenceIds: ['REF-01', 'REF-02', 'REF-05'],
    villageAttributionNote:
      'Danh tính, năm sinh và danh hiệu của từng nghệ nhân cụ thể tại Bàu Trúc đang chờ cập nhật từ quyết định công nhận chính thức hoặc biên bản cộng đồng.',
    summary:
      'Khung hồ sơ lưu trữ thông tin các nữ nghệ nhân và người giữ nghề theo hình thức truyền dạy thực hành trong gia đình tại Bàu Trúc.',
    details:
      'Tri thức và kỹ năng làm gốm tại Bàu Trúc được trao truyền từ đời này sang đời khác thông qua thực hành hằng ngày và hướng dẫn trực tiếp trong gia đình, đề cao vai trò của người phụ nữ Chăm. Danh sách cá nhân cụ thể đang ở trạng thái chờ xác minh nguồn.',
    isSampleData: true,
  },
];
