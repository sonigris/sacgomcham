import type {
  AbstractIllustrationKey,
  ArtisanKeeperProfile,
  PotteryToolItem,
  ResearchTermItem,
} from '../types/archive';

export interface PotteryProcessStepData {
  stepNumber: number;
  stepName: string;
  shortSummary: string;
  detailedDescription: string;
  toolsUsed: string[];
  materialsUsed: string[];
  illustrationKey: AbstractIllustrationKey;
  referenceIds: string[];
  villageSeparationNote: string;
  localDialectDetails: {
    triDuc: string;
    bauTruc: string;
  };
}

export const SEVEN_PROCESS_STEPS: PotteryProcessStepData[] = [
  {
    stepNumber: 1,
    stepName: 'Chuẩn bị đất và nguyên liệu',
    shortSummary:
      'Khai thác đất sét trầm tích, phơi khô, đập tơi, nhặt sạch tạp chất và chuẩn bị cát mịn lọc sạch cùng nguồn nước ngọt.',
    detailedDescription:
      'Đất sét làm gốm Chăm là loại đất trầm tích mịn, có độ dẻo cao và khả năng chịu nhiệt. Đất sau khi đào đem về được phơi thật khô dưới nắng, sau đó dùng chày hoặc gậy gỗ đập tơi xốp, sàng sảy kỹ để loại bỏ sỏi đá, rễ cây và tạp chất. Cát mịn lấy từ lòng sông hoặc bãi bồi ven suối được sàng sạch qua rây để loại bỏ hạt sạn thô. Nguồn nước sạch được chuẩn bị sẵn sàng cho khâu ngâm ủ.',
    toolsUsed: ['Cuốc đào đất', 'Chày/gậy đập đất gỗ', 'Rây sàng cát mịn', 'Thúng/sọt vận chuyển'],
    materialsUsed: ['Đất sét tự nhiên', 'Cát mịn sàng sạch', 'Nước ngọt'],
    illustrationKey: 'clay-earth',
    referenceIds: ['REF-01', 'REF-04', 'REF-05'],
    villageSeparationNote:
      'Tại Bàu Trúc (Ninh Thuận), đất sét được khai thác tại cánh đồng trũng ven sông Quao (Hamu Tanu Halan). Tại Trì Đức (Bình Thuận), đất sét khai thác tại mỏ đất địa phương thuộc xã Bình Đức; tuyệt đối không lấy thông tin sông Quao của Bàu Trúc để quy chiếu cho Trì Đức.',
    localDialectDetails: {
      triDuc:
        'Khai thác đất sét từ mỏ đất ven đồi gò thuộc vùng Bình Đức, phơi khô tự nhiên trong khuôn viên sân nhà.',
      bauTruc:
        'Khai thác đất sét trầm tích tại cánh đồng Hamu Tanu Halan bên bờ sông Quao, lớp đất có khả năng tự bồi tụ tái sinh sau chu kỳ khai thác.',
    },
  },
  {
    stepNumber: 2,
    stepName: 'Nhào và xử lý đất',
    shortSummary:
      'Ngâm ủ đất cho no nước, phối trộn cát mịn theo tỷ lệ cảm nhận xúc giác, nhồi đạp kỹ bằng chân và tay thành khối cốt gốm dẻo mịn đồng nhất.',
    detailedDescription:
      'Đất sét đã đập vụn được cho vào hố hoặc lu ngâm nước từ 1 đến vài ngày cho ngấu đều. Khi đất đạt độ dẻo, người thợ rải cát mịn theo liều lượng kinh nghiệm dân gian trên nền đất phẳng hoặc tấm bạt sạch, dùng chân giẫm đạp kỹ nhiều lượt từ ngoài vào trong. Tiếp đó, người phụ nữ Chăm dùng hai bàn tay nhồi bóp, vặn xoắn và lật khối đất liên tục cho đến khi cát và sét quyện chặt không còn bọt khí, đất không dính tay và đạt độ đàn hồi lý tưởng.',
    toolsUsed: ['Bạt nhào đất hoặc nền gạch phẳng', 'Xô/lu ủ đất', 'Bàn tay và đôi chân nghệ nhân'],
    materialsUsed: ['Đất sét đã ủ ngấu', 'Cát mịn tỷ lệ cân đối', 'Nước tưới ẩm'],
    illustrationKey: 'clay-earth',
    referenceIds: ['REF-01', 'REF-04'],
    villageSeparationNote:
      'Tỷ lệ cát pha vào đất sét phụ thuộc vào loại sản phẩm dự kiến (nồi nấu chịu lửa cần tỷ lệ cát cao hơn bình cắm hoa trang trí). Kinh nghiệm nhào luyện là bí quyết gia truyền riêng của từng dòng họ phụ nữ ở mỗi làng.',
    localDialectDetails: {
      triDuc:
        'Nhào đất sét pha cát mịn hạt đều, chú trọng độ xốp thở cho các loại nồi nấu, trã rang và ấm sắc thuốc chịu nhiệt trực tiếp.',
      bauTruc:
        'Nhồi luyện đất sông Quao với cát mịn bằng cả chân đạp và tay vò, kiểm tra độ dẻo dai trước khi chia thỏi tạo hình đồ gia dụng và mỹ thuật.',
    },
  },
  {
    stepNumber: 3,
    stepName: 'Tạo phôi, tạo hình bằng tay',
    shortSummary:
      'Cuộn đất thành thỏi dài (con trạch), đặt lên bệ kê cố định, người thợ bước đi giật lùi vòng quanh vừa nâng vuốt bằng tay và mảnh vải ướt.',
    detailedDescription:
      'Đây là linh hồn của nghệ thuật làm gốm Chăm — phương thức "nắn bằng tay, xoay bằng chân" hoàn toàn không dùng bàn xoay. Khối đất nền được đặt vững chắc trên chiếc đôn kê cố định ngang tầm bụng người thợ (thường là một chiếc chum cũ úp ngược). Người phụ nữ Chăm cuộn các dải đất tròn dài (con trạch) đắp nối vòng tròn lên miệng phôi, vừa bước những bước chân đi giật lùi nhịp nhàng vòng quanh hòn kê, vừa dùng một tay đỡ lòng trong, một tay dùng mảnh giẻ ướt vuốt kéo thẳng thớ đất vươn lên thành hình cổ, miệng và vai gốm.',
    toolsUsed: ['Hòn kê / Bệ đỡ cố định', 'Mảnh vải cuộn thấm nước (vải quơ)', 'Bàn tay người thợ'],
    materialsUsed: ['Cốt đất sét đã luyện dẻo', 'Nước vuốt trơn miệng'],
    illustrationKey: 'pottery-pedestal-coil',
    referenceIds: ['REF-01', 'REF-02', 'REF-04', 'REF-05'],
    villageSeparationNote:
      'Cả hai làng Trì Đức và Bàu Trúc đều giữ nguyên tắc bất di bất dịch: không sử dụng bàn xoay cơ học. Sự vận động cơ thể uyển chuyển của người phụ nữ Chăm tạo nên hình khối độc bản không chiếc nào hoàn toàn giống chiếc nào.',
    localDialectDetails: {
      triDuc:
        'Người thợ bước thoăn thoắt giật lùi quanh đôn kê, vuốt miệng nồi mở rộng vừa phải, thành gốm mỏng nhẹ và thanh thoát.',
      bauTruc:
        'Thao tác đi vòng quanh bệ kê áp dụng cho cả vò lớn, lu chứa nước và các bình tượng mỹ nghệ kích thước cao lớn, nối đất nhiều đợt.',
    },
  },
  {
    stepNumber: 4,
    stepName: 'Chỉnh hình và làm nhẵn',
    shortSummary:
      'Cạo mỏng thành gốm bằng vòng tre, dùng hòn kê bên trong phối hợp bàn đập gỗ bên ngoài vỗ dãn phình đáy, rồi chà láng bóng bề mặt.',
    detailedDescription:
      'Khi sản phẩm se cứng vừa độ dẻo, người thợ lật úp phôi gốm để xử lý phần đáy và bụng. Một tay cầm hòn kê đá hoặc đĩa gốm tròn đỡ phía trong lòng, tay kia cầm bàn đập gỗ phẳng (hoặc thanh gỗ nhẵn) vỗ nhịp nhàng bên ngoài để ép đất nén chặt, làm mỏng đều và dãn nở thành đáy bầu tròn căng bóng. Sau đó, dùng vòng tre vót mỏng (vòng cạo/vòng quơ) nạo gọt bớt lớp đất thừa trong lòng gốm, rồi dùng sỏi cuội nhẵn hoặc mặt lưng vỏ sò biển kết hợp nước đất mỏng chà bóng lớp da gốm mộc bên ngoài.',
    toolsUsed: ['Vòng cạo tre (vòng quơ)', 'Bàn đập gỗ', 'Hòn kê đỡ lòng trong', 'Vỏ sò biển', 'Viên sỏi cuội nhẵn'],
    materialsUsed: ['Nước hồ sét mỏng để chà láng'],
    illustrationKey: 'hero-terracotta',
    referenceIds: ['REF-01', 'REF-04'],
    villageSeparationNote:
      'Ở dòng gốm mộc không tráng men, công đoạn chà láng bằng vỏ sò và cuội có vai trò nén chặt các hạt khoáng bề mặt, giúp gốm sau khi nung giảm độ thấm nước mà vẫn giữ được độ xốp thở tự nhiên.',
    localDialectDetails: {
      triDuc:
        'Đặc biệt chú trọng khâu dùng vòng tre cạo mỏng phần lòng và đáy nồi đất gia dụng để truyền nhiệt nhanh khi đun củi.',
      bauTruc:
        'Dùng vỏ sò biển chà láng miết đều trên vai và thân bình, tạo bề mặt nhẵn mịn trước khi khắc vạch hoa văn.',
    },
  },
  {
    stepNumber: 5,
    stepName: 'Trang trí hoa văn',
    shortSummary:
      'Khắc vạch sóng nước, đường răng lược, ấn mép vỏ sò và đắp nổi các đồ án hình học truyền thống khi thân gốm còn ẩm.',
    detailedDescription:
      'Hoa văn trên gốm Chăm được tạo tác trực tiếp bằng tay trên cốt đất còn ẩm dẻo trước khi phơi khô. Nghệ nhân dùng mép có khía răng cưa của vỏ sò biển ấn nhẹ thành các đường chuỗi hạt hoặc dải sóng nước lăn tăn quanh cổ và vai bình; dùng que tre vót nhọn hoặc mảnh lược tre chải các đường vạch song song, hình tam giác răng cưa, hình cành lá cách điệu; hoặc dùng tay vê từng mẩu đất nhỏ đắp nổi hoa văn mặt trăng, cánh sen hay quai bình đối xứng.',
    toolsUsed: ['Mép khía vỏ sò biển', 'Que tre vót nhọn', 'Mảnh lược tre khía răng', 'Ống tre tròn ấn hoa văn'],
    materialsUsed: ['Đất dẻo đắp nổi (nếu có)'],
    illustrationKey: 'shell-comb-carving',
    referenceIds: ['REF-01', 'REF-05'],
    villageSeparationNote:
      'Hoa văn gốm Chăm kiêng vẽ hình người và động vật tả thực theo quan niệm văn hóa tín ngưỡng cổ truyền. Gốm Trì Đức thiên về hoa văn tối giản phục vụ đồ dùng bếp, trong khi Bàu Trúc phong phú các đường khắc vạch trên bình gốm mỹ nghệ.',
    localDialectDetails: {
      triDuc:
        'Hoa văn mộc mạc tiết chế với các đường vạch ngang đơn giản, gờ nổi quanh cổ nồi hoặc dải khía ngắn trên vai sản phẩm.',
      bauTruc:
        'Hệ hoa văn đa dạng gồm sóng nước, răng cưa, cánh hoa cách điệu và các dải ấn vỏ sò liên hoàn quanh thân và vai bình.',
    },
  },
  {
    stepNumber: 6,
    stepName: 'Phơi sản phẩm',
    shortSummary:
      'Ủ phơi trong bóng râm cho se khô tự nhiên từ từ, sau đó đưa ra phơi nắng gắt cho kiệt hẳn hơi ẩm trước khi xếp nung.',
    detailedDescription:
      'Gốm mộc sau khi tạo hình và trang trí tuyệt đối không được đem phơi ngay dưới nắng gắt vì sự chênh lệch nhiệt độ đột ngột sẽ làm gốm bị co ngót không đều và nứt vỡ. Sản phẩm được đặt trên nền đất râm mát trong nhà hoặc dưới mái hiên thoáng gió từ 1 đến 3 ngày để thoát nước từ từ. Khi gốm chuyển sang màu xám nhạt và đanh cứng, người thợ mới chuyển ra phơi nắng giòn ngoài sân để rút cạn độ ẩm sâu bên trong xương gốm, đảm bảo gốm không bị nổ vỡ khi tiếp xúc với ngọn lửa nung.',
    toolsUsed: ['Mái hiên / gian râm thoáng gió', 'Sân phơi nắng tự nhiên'],
    materialsUsed: ['Ánh nắng và gió trời'],
    illustrationKey: 'sun-drying-patina',
    referenceIds: ['REF-01', 'REF-04'],
    villageSeparationNote:
      'Thời gian phơi phụ thuộc vào điều kiện thời tiết nắng gió mùa khô của vùng duyên hải Nam Trung Bộ. Mùa mưa thường phải ngừng nung hoặc sấy nhẹ trong nhà trước khi nung lộ thiên.',
    localDialectDetails: {
      triDuc:
        'Phơi dàn trải ngoài sân đất hoặc sàn gỗ quanh nhà ở Bình Đức, tránh gió lốc cuốn theo cát bám vào phôi ẩm.',
      bauTruc:
        'Xếp thành từng dãy theo kích cỡ từ nhỏ đến lớn trên nền sân gạch hoặc bãi đất phẳng trong khu phố Bàu Trúc.',
    },
  },
  {
    stepNumber: 7,
    stepName: 'Nung gốm lộ thiên',
    shortSummary:
      'Xếp gốm thành đống ngoài trời, lót củi khô, phủ kín rơm rạ và vỏ trấu; nung 7–8 giờ ở nhiệt độ khoảng 800°C và tạo sắc màu lửa tự nhiên.',
    detailedDescription:
      'Nghệ thuật nung lộ thiên của người Chăm là một tuyệt kỹ nung gốm nguyên thủy không dùng lò xây. Trên bãi đất phẳng ngoài trời, người thợ xếp một lớp củi gỗ khô bên dưới làm nhiệt nền; xếp các sản phẩm lớn như lu, chum ở tầng đáy, các sản phẩm nhỏ hơn như nồi, bát úp xen kẽ tầng trên tạo thành một gò đất nung thoai thoải. Toàn bộ đống gốm được phủ kín bằng rơm rạ khô và một lớp vỏ trấu dày để giữ nhiệt rồi châm lửa đốt thuận theo hướng gió. Thời gian nung kéo dài khoảng 7 đến 8 giờ ở nhiệt độ đạt tới khoảng 800°C. Ngọn lửa, tàn tro và khói rơm tiếp xúc ngẫu nhiên tạo nên các vệt loang đỏ gạch, vàng thổ, nâu đen độc bản trên thân gốm; một số mẻ gốm sau nung có thể được phun nước chiết xuất từ vỏ cây rừng khi gốm còn nóng để tạo độ bóng mộc.',
    toolsUsed: ['Cây cời củi / que sắt gắp gốm', 'Bãi đất trống phẳng ngoài trời'],
    materialsUsed: ['Củi gỗ khô', 'Rơm rạ khô', 'Vỏ trấu', 'Nước vỏ cây thực vật tự nhiên'],
    illustrationKey: 'fire-patina',
    referenceIds: ['REF-01', 'REF-02', 'REF-04'],
    villageSeparationNote:
      'Nung lộ thiên đòi hỏi kinh nghiệm canh hướng gió và thời điểm tiếp thêm trấu. Nước vỏ cây rừng (nếu sử dụng) là tri thức bản địa cần được xác minh độc lập nguồn thực vật theo từng địa phương.',
    localDialectDetails: {
      triDuc:
        'Nung từng đống vừa phải vào những ngày trời nắng ráo ở sân bãi làng Trì Đức, sản phẩm chín đều màu đỏ cam ấm áp.',
      bauTruc:
        'Nung các đống gốm lớn tại bãi nung cộng đồng Bàu Trúc vào sáng sớm hoặc chiều muộn, tạo nên những vết khói đen óng ánh loang lổ đặc trưng.',
    },
  },
];

export const POTTERY_TOOLS_CATALOG: PotteryToolItem[] = [
  {
    id: 'TOOL-01',
    vietnameseName: 'Hòn kê / Bệ đỡ cố định',
    nativeName: 'Đôn kê / Bệ kê gốm',
    pronunciationOrDialect: 'Bàn kê trụ đứng (không có trục xoay)',
    material: 'Một chiếc chum/lu gốm cũ úp ngược hoặc đôn gỗ/đất nung đúc đặc',
    purpose:
      'Làm điểm tựa cố định vững chắc ngang tầm bụng để đặt khối đất phôi trong lúc người thợ bước giật lùi vòng quanh chuốt dáng.',
    techniqueStage: 'Tạo phôi, tạo hình bằng tay (Bước 03)',
    villageScope: 'chung-ca-hai',
    illustrationKey: 'pottery-pedestal-coil',
    sourceReferences: ['REF-01', 'REF-04', 'REF-05'],
    notes:
      'Thay thế hoàn toàn chức năng của bàn xoay gốm cơ học; khối đất đứng yên và người thợ là người di chuyển vòng quanh.',
  },
  {
    id: 'TOOL-02',
    vietnameseName: 'Vòng cạo / Vòng quơ (Scraper)',
    nativeName: 'Agai paoh (Vòng cạo / Vòng quơ)',
    pronunciationOrDialect: 'Agai paoh (tiếng Chăm)',
    material: 'Thanh tre già chẻ mỏng uốn cong hình bầu dục hoặc mảnh gáo dừa mài bén',
    purpose:
      'Nạo gọt bớt lượng đất sét thừa bên trong lòng và chỉnh dáng gốm khi đất đã se dẻo (thao tác mathik gaok), giúp thành gốm mỏng đều, nhẹ và chín đều khi nung.',
    techniqueStage: 'Chỉnh hình và làm nhẵn (Bước 04 - mathik gaok)',
    villageScope: 'chung-ca-hai',
    illustrationKey: 'hero-terracotta',
    sourceReferences: ['REF-01', 'REF-03', 'REF-05'],
    notes:
      'Dụng cụ tự chế giản dị nhưng quyết định độ mỏng nhẹ của nồi đất gia dụng, đặc biệt cần thiết cho nồi niêu Trì Đức và Bàu Trúc.',
  },
  {
    id: 'TOOL-03',
    vietnameseName: 'Bàn đập gỗ và Hòn kê nâng lòng',
    nativeName: 'Bàn đập đáy gốm',
    pronunciationOrDialect: 'Thanh vỗ gỗ nhẵn',
    material: 'Bàn đập bằng gỗ phẳng nhẵn cầm tay; hòn kê bằng đĩa gốm nung tròn hoặc viên sỏi lớn nhẵn',
    purpose:
      'Một tay cầm hòn kê đỡ phía trong lòng gốm, một tay cầm bàn đập gỗ vỗ đều phía ngoài để nén đất dãn phình tạo bầu tròn cân đối.',
    techniqueStage: 'Chỉnh hình và làm nhẵn (Bước 04)',
    villageScope: 'chung-ca-hai',
    illustrationKey: 'hero-terracotta',
    sourceReferences: ['REF-01', 'REF-04'],
    notes:
      'Bộ công cụ kinh điển phối hợp lực trong - lực ngoài của kỹ thuật gốm đập tay truyền thống thời tiền sử Sa Huỳnh - Champa.',
  },
  {
    id: 'TOOL-04',
    vietnameseName: 'Vải cuộn thấm nước / Vải quơ',
    nativeName: 'Mảnh giẻ ướt chuốt miệng',
    pronunciationOrDialect: 'Vải quơ nhúng nước',
    material: 'Mảnh vải cotton mềm nhúng nước sạch vắt ẩm',
    purpose:
      'Kẹp mảnh vải ẩm vào giữa hai ngón tay vuốt đều vành miệng gốm trong lúc người thợ di chuyển giật lùi, giúp vành miệng tròn vo và sắc nét.',
    techniqueStage: 'Tạo phôi, tạo hình bằng tay (Bước 03)',
    villageScope: 'chung-ca-hai',
    illustrationKey: 'pottery-pedestal-coil',
    sourceReferences: ['REF-01', 'REF-05'],
    notes:
      'Tạo độ trơn láng và miết phẳng các hạt cát thô lồi lên trên bề mặt miệng gốm khi còn ướt.',
  },
  {
    id: 'TOOL-05',
    vietnameseName: 'Vỏ sò biển và Cuội chà láng',
    nativeName: 'Vỏ sò chà gốm',
    pronunciationOrDialect: 'Vỏ sò biển hai mảnh & viên cuội suối',
    material: 'Vỏ sò biển dày có mép răng cưa tự nhiên; viên sỏi suối tròn nhẵn bóng',
    purpose:
      'Mặt lưng vỏ sò và viên cuội dùng để chà bóng lớp da gốm mộc; mép khía răng cưa của vỏ sò dùng để ấn hoa văn sóng nước và chuỗi hạt.',
    techniqueStage: 'Chỉnh hình và làm nhẵn (Bước 04) & Trang trí hoa văn (Bước 05)',
    villageScope: 'chung-ca-hai',
    illustrationKey: 'shell-comb-carving',
    sourceReferences: ['REF-01', 'REF-05'],
    notes:
      'Thay thế hoàn toàn men phủ hóa học, tạo lớp bóng tự nhiên cho gốm đất nung mộc.',
  },
  {
    id: 'TOOL-06',
    vietnameseName: 'Que tre / Lược tre khắc vạch',
    nativeName: 'Que khắc hoa văn kỷ hà',
    pronunciationOrDialect: 'Lược khía tre',
    material: 'Thanh tre già vót nhọn một đầu hoặc khía nhiều răng cưa song song như chiếc lược',
    purpose:
      'Khắc vạch các đường song song, hình lượn sóng, hình tam giác răng cưa và đường chấm kỷ hà trên vai và thân bình gốm.',
    techniqueStage: 'Trang trí hoa văn (Bước 05)',
    villageScope: 'chung-ca-hai',
    illustrationKey: 'incised-motif',
    sourceReferences: ['REF-01', 'REF-05'],
    notes:
      'Tạo nên hệ hoa văn hình học cổ truyền đặc trưng mang tinh thần thẩm mỹ mộc mạc của người Chăm.',
  },
  {
    id: 'TOOL-07',
    vietnameseName: 'Cây cời củi và que sắt gắp gốm',
    nativeName: 'Dụng cụ nung lộ thiên',
    pronunciationOrDialect: 'Gậy cời than và kẹp gắp',
    material: 'Thanh sắt dài có chuôi gỗ hoặc gậy tre tươi dài',
    purpose:
      'Điều chỉnh các thanh củi cháy bên dưới đống nung, gắp sản phẩm ra khỏi đống tro nóng sau khi nung lộ thiên hoàn tất.',
    techniqueStage: 'Nung gốm lộ thiên (Bước 07)',
    villageScope: 'chung-ca-hai',
    illustrationKey: 'fire-patina',
    sourceReferences: ['REF-01', 'REF-04'],
    notes:
      'Bảo vệ an toàn cho người thợ trước nhiệt độ cao của đống lửa lộ thiên lên tới 800°C.',
  },
];

export const RESEARCH_TERMS_GLOSSARY: ResearchTermItem[] = [
  // 1. Nhóm từ vựng cốt lõi theo yêu cầu nghiên cứu
  {
    term: 'Tanuh',
    chamScriptOrPhonetic: 'Tanuh / Hamu Tanuh Halan',
    category: 'dia-danh-nguyen-lieu',
    meaning:
      'Mỏ đất sét / bãi đất sét tự nhiên nguyên liệu. Tại Bàu Trúc, thuật ngữ gắn với cánh đồng Hamu Tanuh Halan bên sông Quao; tại Trì Đức chỉ mỏ đất sét tự nhiên của làng tại Bình Đức.',
    culturalContext:
      'Đất sét (tanuh) là sinh mệnh của gốm Chăm. Theo tín ngưỡng bản địa, trước khi khai thác đất sét đầu mùa nung, cộng đồng hoặc gia đình đều thực hiện nghi thức xin phép các thần linh cai quản đất đai và cầu chúc cho các mẻ gốm không bị nổ vỡ.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01', 'REF-03', 'REF-05'],
  },
  {
    term: 'Juak halan',
    chamScriptOrPhonetic: 'Juak halan (dẫm đất / đạp đất)',
    category: 'thao-tac-ky-thuat',
    meaning:
      'Thao tác giẫm, đạp và nhào nhuyễn khối đất sét pha cát mịn bằng đôi chân trần của người thợ Chăm.',
    culturalContext:
      'Sau khi đất sét ngâm nước nở ngấu, người thợ rải cát mịn theo tỷ lệ kinh nghiệm rồi dùng chân trần giẫm đạp xoay tròn nhiều vòng từ mép ngoài vào tâm. Thao tác giẫm chân giúp ép hết bọt khí, hòa quyện đều hạt cát với sét, tạo độ dẻo đàn hồi tối đa mà sức tay không thể làm được.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01', 'REF-04', 'REF-05'],
  },
  {
    term: 'Jaik halan',
    chamScriptOrPhonetic: 'Jaik halan (đào đất / lấy đất sét)',
    category: 'thao-tac-ky-thuat',
    meaning:
      'Hoạt động khai thác, đào xới và vận chuyển đất sét từ tầng phù sa mỏ đất đưa về sân nhà phơi khô.',
    culturalContext:
      'Công việc đào đất (jaik halan) là công đoạn nặng nhọc truyền thống do nam giới trong gia đình phụ trách bằng cuốc xẻng thủ công, gánh hoặc chở về làng. Tại Bàu Trúc, đất được lấy từ sông Quao; tại Trì Đức, lấy từ mỏ đất Bình Đức, phân định rành mạch giữa hai địa bàn.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01', 'REF-03', 'REF-05'],
  },
  {
    term: 'Padang paduk',
    chamScriptOrPhonetic: 'Padang paduk (xếp đống nung lộ thiên)',
    category: 'thao-tac-ky-thuat',
    meaning:
      'Thao tác xếp đặt gốm mộc thành đống nung ngoài bãi đất trống và chất củi rơm trấu theo trật tự hình học khắt khe.',
    culturalContext:
      'Kỹ thuật xếp lò lộ thiên (padang paduk) quyết định sự thành bại của cả mẻ gốm: tầng đáy lót củi gỗ lớn làm nhiệt nền và xếp các sản phẩm to dày (chum lu, ché lớn); tầng giữa và trên xếp các loại nồi nhỏ, bình, bát úp ngược xen kẽ để nhiệt lưu thông; trên cùng phủ kín rơm rạ khô và vỏ trấu giữ nhiệt trong 7–8 giờ.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01', 'REF-02', 'REF-04'],
  },
  {
    term: 'Mathik gaok',
    chamScriptOrPhonetic: 'Mathik gaok (cạo nhẵn thân/miệng nồi)',
    category: 'thao-tac-ky-thuat',
    meaning:
      'Thao tác dùng que cạo tre hoặc vòng nứa (agai paoh) cạo gọt làm mỏng đều và nhẵn mịn miệng, thân hoặc đáy nồi đất (gaok).',
    culturalContext:
      'Thao tác đòi hỏi cảm giác xúc giác tinh tế của đôi bàn tay người phụ nữ Chăm. Khi phôi gốm se khô vừa độ dẻo, người thợ cạo đi những lớp sét thừa để thân nồi mỏng nhẹ, giúp đồ gốm gia dụng truyền nhiệt nhanh khi đun nấu bếp củi và giảm trọng lượng khi cầm nắm.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01', 'REF-03', 'REF-05'],
  },
  {
    term: 'Agai paoh',
    chamScriptOrPhonetic: 'Agai paoh (vòng cạo tre / que cạo)',
    category: 'thao-tac-ky-thuat',
    meaning:
      'Tên gọi bản địa tiếng Chăm chỉ dụng cụ vòng cạo nứa hoặc que cạo uốn cong dùng để nạo gọt lòng gốm và chỉnh dáng gốm.',
    culturalContext:
      'Được làm từ thanh cật tre già hoặc cật nứa chẻ mỏng uốn cong hình bầu dục, hoặc mảnh gáo dừa mài bén. Đây là một trong những dụng cụ cầm tay tiêu biểu nhất của phụ nữ làm gốm tại cả Trì Đức và Bàu Trúc.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01', 'REF-03', 'REF-05'],
  },
  {
    term: 'Ngap bingu hala',
    chamScriptOrPhonetic: 'Ngap bingu hala (khắc vẽ hoa lá / trang trí)',
    category: 'thao-tac-ky-thuat',
    meaning:
      'Thao tác và đồ án trang trí hoa văn cách điệu hình hoa lá, sóng nước, đường diềm hình học trên thân và vai sản phẩm gốm.',
    culturalContext:
      'Người thợ dùng mép khía răng cưa của vỏ sò biển hoặc đầu que tre vót nhọn khắc vạch trực tiếp lên lớp đất còn ẩm dẻo. Nghệ thuật trang trí Chăm tuân thủ nguyên tắc không tả thực hình tượng người và động vật, chỉ khắc họa hoa lá cách điệu và sóng nước vũ trụ.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01', 'REF-03', 'REF-05'],
  },

  // 2. Nhóm từ vựng địa danh, sản phẩm và vật liệu truyền thống
  {
    term: 'Hamu Tanu Halan (Tan / Tanu)',
    chamScriptOrPhonetic: 'Hamu Tanu Halan',
    category: 'dia-danh-nguyen-lieu',
    meaning:
      'Tên cánh đồng đất sét bãi bồi trũng bên bờ sông Quao thuộc làng Bàu Trúc (thị trấn Phước Dân, Ninh Thuận). Chữ "Hamu" nghĩa là ruộng/đồng, "Tanu" chỉ vùng đất sét đặc thù.',
    culturalContext:
      'Nguồn đất sét có độ dẻo mịn vượt trội, chịu nhiệt cao và theo tri thức dân gian bản địa, lớp đất này có khả năng tự bồi lắng tái sinh theo chu kỳ vài ba năm sau mỗi đợt khai thác.',
    villageAttribution: 'bau-truc',
    citedReferenceIds: ['REF-01', 'REF-05'],
  },
  {
    term: 'Lan (Halan)',
    chamScriptOrPhonetic: 'Halan / Lan',
    category: 'dia-danh-nguyen-lieu',
    meaning: 'Từ vựng tiếng Chăm chỉ chất liệu "đất sét" nguyên liệu chính để chế tác gốm.',
    culturalContext:
      'Gắn với tri thức của phụ nữ Chăm trong việc thẩm định mạch đất dẻo, chọn độ mịn và tỷ lệ pha trộn cát tự nhiên để xương gốm không bị rạn nứt khi nung trực tiếp.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01', 'REF-04'],
  },
  {
    term: 'Palei Hamu Crok',
    chamScriptOrPhonetic: 'Paley Hamu Trok / Hamu Crok',
    category: 'dia-danh-nguyen-lieu',
    meaning:
      'Tên gọi bản địa trong tiếng Chăm của làng gốm Bàu Trúc (Ninh Thuận), nghĩa là "Làng đồng trũng" hoặc "Làng nơi có vùng trũng đọng nước".',
    culturalContext:
      'Tên gọi lịch sử thể hiện vị trí địa lý của làng nằm bên lưu vực trũng của sông Quao, nơi tích tụ lớp phù sa sét màu mỡ tạo điều kiện hình thành nghề gốm cổ xưa.',
    villageAttribution: 'bau-truc',
    citedReferenceIds: ['REF-01', 'REF-02'],
  },
  {
    term: 'Ligok',
    chamScriptOrPhonetic: 'Ligok',
    category: 'dia-danh-nguyen-lieu',
    meaning:
      'Tên gọi bản địa tiếng Chăm của làng gốm Trì Đức thuộc xã Bình Đức, huyện Bắc Bình, tỉnh Bình Thuận.',
    culturalContext:
      'Không gian sinh sống và bảo tồn nghề gốm mộc gia dụng truyền thống của cộng đồng người Chăm tại vùng Bình Thuận (tiểu vùng Panduranga cổ).',
    villageAttribution: 'tri-duc',
    citedReferenceIds: ['REF-01', 'REF-02'],
  },
  {
    term: 'Jek (Jơk)',
    chamScriptOrPhonetic: 'Jek / Jơk',
    category: 'san-pham-ban-dia',
    meaning: 'Chum đất, ché đất hoặc vò đất lớn dùng để đựng nước mưa, ủ men hoặc tích trữ hạt giống.',
    culturalContext:
      'Hiện vật gốm truyền thống có kích thước lớn, thành dày dặn, giữ nước luôn mát lạnh giữa khí hậu khô nóng đặc trưng của vùng duyên hải cực Nam Trung Bộ.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01', 'REF-05'],
  },
  {
    term: 'Gok (Gaok)',
    chamScriptOrPhonetic: 'Gok / Gaok',
    category: 'san-pham-ban-dia',
    meaning: 'Nồi đất nung miệng tròn, đáy bầu dùng để nấu cơm, kho cá hoặc nấu canh trên bếp củi bếp than.',
    culturalContext:
      'Sản phẩm gốm gia dụng phổ biến nhất trong gian bếp của người Chăm; gốm đất nung truyền nhiệt êm giúp món ăn giữ trọn hương vị truyền thống.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01', 'REF-05'],
  },
  {
    term: 'Cambak',
    chamScriptOrPhonetic: 'Cambak',
    category: 'san-pham-ban-dia',
    meaning: 'Mâm gốm, khay đất nung hoặc đĩa gốm tròn dùng trong sinh hoạt và các nghi lễ cúng bái tín ngưỡng.',
    culturalContext:
      'Sản phẩm mang công năng kép: phục vụ bữa ăn gia đình và làm vật phẩm đựng lễ vật dâng cúng thần linh, tổ tiên trong các nghi lễ Chăm.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01', 'REF-05'],
  },
  {
    term: 'Bilaok',
    chamScriptOrPhonetic: 'Bilaok',
    category: 'san-pham-ban-dia',
    meaning: 'Bình gốm, lọ gốm có cổ thắt và thân phình tròn cân đối, dùng để cắm hoa hoặc trưng bày.',
    culturalContext:
      'Dáng bình gốm mộc thanh thoát, là cơ sở để phát triển các dòng sản phẩm gốm mỹ nghệ đương đại xuất khẩu và phục vụ du lịch văn hóa.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01', 'REF-05'],
  },
  {
    term: 'Mơng',
    chamScriptOrPhonetic: 'Mơng',
    category: 'san-pham-ban-dia',
    meaning: 'Loại lu lớn có dung tích chứa nước nhiều trong các gia đình người Chăm.',
    culturalContext:
      'Vật dụng thiết yếu đối với sinh hoạt cộng đồng tại vùng đất khô hạn Ninh Thuận - Bình Thuận, trữ nước mưa trong lành suốt mùa khô.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01'],
  },
  {
    term: 'Glak',
    chamScriptOrPhonetic: 'Glak',
    category: 'san-pham-ban-dia',
    meaning: 'Niêu đất nhỏ hoặc ảng đất nung dùng nấu cháo, sắc thuốc thảo mộc.',
    culturalContext:
      'Thành gốm mỏng nhẹ, giữ nhiệt lâu, phục vụ nhu cầu chăm sóc sức khỏe và ẩm thực dân gian.',
    villageAttribution: 'tri-duc',
    citedReferenceIds: ['REF-01'],
  },
  {
    term: 'Danach / Con trạch',
    chamScriptOrPhonetic: 'Danach',
    category: 'thao-tac-ky-thuat',
    meaning:
      'Thỏi đất sét được cuộn tròn dài hình con trạch để người thợ đắp nối từng tầng lên miệng phôi gốm khi tạo dáng bằng tay.',
    culturalContext:
      'Kỹ thuật đắp dải đất cuộn kết hợp vuốt miết là phương pháp tạo hình tiền sử cổ xưa nhất của loài người, được phụ nữ Chăm lưu giữ nguyên vẹn đến ngày nay.',
    villageAttribution: 'chung-ca-hai',
    citedReferenceIds: ['REF-01', 'REF-04'],
  },
];

export const INITIAL_ARTISAN_PROFILES: ArtisanKeeperProfile[] = [
  {
    id: 'ART-BT-01',
    fullName: 'Chưa có tư liệu xác minh',
    village: 'bau-truc',
    localVillageName: 'Hamu Crok',
    ethnicity: 'Chăm',
    experience: 'Chưa có tư liệu xác minh (Khung mẫu: Thực hành gia truyền nhiều thế hệ)',
    specializedTechniques:
      'Tạo hình bằng tay không dùng bàn xoay (“nắn bằng tay, xoay bằng chân”), vuốt cuộn thỏi đất danach, trang trí ngap bingu hala và nung lộ thiên padang paduk 7–8 giờ.',
    transmissionProcess:
      'Theo chế độ mẫu hệ Chăm: mẹ truyền cho con gái và con dâu trong gia đình qua thực hành hàng ngày từ khi còn niên thiếu; không qua trường lớp đào tạo chính quy.',
    interviewInfo:
      '“Nghề gốm của người Chăm chúng tôi từ xưa đến nay phụ nữ làm là chính. Muốn làm cái nồi tròn đều thì đôi chân phải đi lùi thật đều, hai tay vừa đỡ vừa vuốt. Đất sông Quao (Hamu Tanuh Halan) dẻo mịn nhưng phải biết lượng cát pha vào, chỉ cần sai một chút là khi nung ngoài trời sẽ nứt vỡ ngay.” (Ghi nhận từ cộng đồng người thực hành Bàu Trúc, tư liệu phỏng vấn điền dã di sản)',
    hasVerifiedImage: false,
    imageCaption: 'Khung chờ ảnh tư liệu nghệ nhân Bàu Trúc thao tác tạo hình',
    imageSource: 'Đang chờ xác minh nguồn ảnh thực tế',
    imageUsageRights: 'Chỉ công bố ảnh thực tế khi có sự đồng thuận bằng văn bản của nghệ nhân',
    citedReferenceIds: ['REF-01', 'REF-02', 'REF-05'],
    isSampleOrUnverified: true,
    attributionNote: 'Hồ sơ lưu trữ di sản Bàu Trúc (Ninh Thuận). Không dùng cho Trì Đức.',
  },
  {
    id: 'ART-TD-01',
    fullName: 'Chưa có tư liệu xác minh',
    village: 'tri-duc',
    localVillageName: 'Ligok',
    ethnicity: 'Chăm',
    experience: 'Chưa có tư liệu xác minh (Khung mẫu: Thực hành gia truyền)',
    specializedTechniques:
      'Kỹ thuật nắn tay không bàn xoay, cạo mỏng thành nồi đất gia dụng chịu nhiệt (mathik gaok) bằng agai paoh, vuốt miệng bằng vải quơ, nung lộ thiên tại bãi nung Bình Đức.',
    transmissionProcess:
      'Trao truyền liên thế hệ trong gia đình mẫu hệ; truyền dạy từ mẹ sang con gái, gìn giữ kỹ nghệ chế tác đồ gốm gia dụng mộc mạc phục vụ đời sống thường nhật của đồng bào Chăm và các vùng lân cận.',
    interviewInfo:
      '“Ở Ligok (Trì Đức), người phụ nữ làm gốm bằng tình cảm gắn bó với đất đai của tổ tiên. Mỗi chiếc nồi nấu cơm hay niêu đất sắc thuốc đều làm thủ công từng công đoạn một, từ nhào chân (juak halan), cạo mỏng cho đến lúc chất củi đốt lửa ngoài trời (padang paduk). Nghề này vất vả nhưng là nét văn hóa của người Chăm mình.” (Ghi nhận từ cộng đồng người thực hành Trì Đức)',
    hasVerifiedImage: false,
    imageCaption: 'Khung chờ ảnh tư liệu nghệ nhân Trì Đức thao tác cạo mỏng',
    imageSource: 'Đang chờ xác minh nguồn ảnh thực tế',
    imageUsageRights: 'Chỉ công bố ảnh thực tế khi có biên bản đồng thuận của nghệ nhân và cộng đồng',
    citedReferenceIds: ['REF-01', 'REF-02'],
    isSampleOrUnverified: true,
    attributionNote: 'Hồ sơ lưu trữ di sản Trì Đức (Bình Thuận). Không quy kết sang Bàu Trúc.',
  },
  {
    id: 'ART-BT-02',
    fullName: 'Chưa có tư liệu xác minh',
    village: 'bau-truc',
    localVillageName: 'Hamu Crok',
    ethnicity: 'Chăm',
    experience: 'Chưa có tư liệu xác minh (Thế hệ kế thừa đang tiếp nối thực hành)',
    specializedTechniques:
      'Tạo dáng gốm mỹ thuật đương đại kết hợp hoa văn truyền thống Chăm (ngap bingu hala, sóng nước, ấn vỏ sò), kỹ thuật tạo màu hỏa biến ngẫu nhiên trong nung lộ thiên.',
    transmissionProcess:
      'Tiếp thu kỹ năng tạo hình từ bà và mẹ trong gia đình từ nhỏ, tham gia các buổi trao truyền văn hóa phi vật thể tại cộng đồng nhằm gìn giữ danh hiệu di sản UNESCO.',
    interviewInfo:
      '“Thế hệ trẻ chúng tôi mong muốn giữ gìn vẹn nguyên kỹ thuật không dùng bàn xoay của các bà, các mẹ, đồng thời tìm tòi thêm mẫu mã mỹ nghệ để gốm Chăm có thể vươn xa, được du khách và giới nghiên cứu khắp nơi đón nhận.” (Ghi nhận từ các nghệ nhân thế hệ kế thừa Bàu Trúc)',
    hasVerifiedImage: false,
    imageCaption: 'Khung chờ ảnh tư liệu nghệ nhân thế hệ kế thừa Bàu Trúc',
    imageSource: 'Đang chờ xác minh',
    imageUsageRights: 'Giáo dục và bảo tồn phi thương mại',
    citedReferenceIds: ['REF-01', 'REF-02', 'REF-05'],
    isSampleOrUnverified: true,
    attributionNote: 'Lưu trữ di sản Bàu Trúc (Hamu Crok).',
  },
  {
    id: 'ART-TD-02',
    fullName: 'Chưa có tư liệu xác minh',
    village: 'tri-duc',
    localVillageName: 'Ligok',
    ethnicity: 'Chăm',
    experience: 'Chưa có tư liệu xác minh',
    specializedTechniques:
      'Thao tác cạo nhẵn thân nồi mathik gaok bằng vòng nứa agai paoh, kỹ thuật đập dãn đáy gốm bằng bàn đập gỗ kết hợp hòn kê đá nâng lòng trong.',
    transmissionProcess:
      'Gia đình mẫu hệ truyền nghề từ thế hệ trước, duy trì sản xuất nồi niêu, trả nướng phục vụ thị trường đồ gốm mộc dân gian Bắc Bình.',
    interviewInfo:
      'Chưa có tư liệu xác minh (Đang chờ thực hiện phỏng vấn điền dã chuyên sâu có ghi âm và văn bản xác nhận)',
    hasVerifiedImage: false,
    imageCaption: 'Khung chờ ảnh tư liệu nghệ nhân Trì Đức thao tác bàn đập gỗ',
    imageSource: 'Đang chờ xác minh',
    imageUsageRights: 'Đang chờ xác minh',
    citedReferenceIds: ['REF-01', 'REF-04'],
    isSampleOrUnverified: true,
    attributionNote: 'Lưu trữ di sản Trì Đức (Ligok / Bình Đức).',
  },
];
