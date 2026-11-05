import heroTerracottaImg from '../assets/images/hero_abstract_terracotta_1793803592032.jpg';
import clayEarthImg from '../assets/images/clay_earth_texture_1793803595002.jpg';
import incisedMotifImg from '../assets/images/incised_wave_motif_1793803594737.jpg';
import firePatinaImg from '../assets/images/fire_ash_patina_1793803595555.jpg';
import potteryPedestalCoilImg from '../assets/images/pottery_pedestal_coil_1793839354319.jpg';
import sunDryingPatinaImg from '../assets/images/sun_drying_patina_1793839355101.jpg';
import shellCombCarvingImg from '../assets/images/shell_comb_carving_1793839354478.jpg';
import { AbstractIllustrationKey } from '../types/archive';

export interface IllustrationAsset {
  src: string;
  alt: string;
  caption: string;
  ethicalNotice: string;
}

export const ABSTRACT_ILLUSTRATIONS: Record<AbstractIllustrationKey, IllustrationAsset> = {
  'hero-terracotta': {
    src: heroTerracottaImg,
    alt: 'Bố cục tĩnh vật trừu tượng các dáng bình đất nung không tráng men với vết lửa tự nhiên trên bệ đá vôi ấm',
    caption: 'Minh họa mỹ thuật 01 — Bố cục hình khối gốm đất nung mộc và sắc độ vết lửa khói tự nhiên.',
    ethicalNotice: 'Hình minh họa trừu tượng về chất liệu gốm (không phải ảnh chụp hiện vật hay sinh hoạt thực địa).',
  },
  'clay-earth': {
    src: clayEarthImg,
    alt: 'Nghiên cứu bề mặt trừu tượng các lớp đất sét phù sa và hạt cát mịn tông nâu đất, vàng thổ và đất nung',
    caption: 'Minh họa mỹ thuật 02 — Sắc độ tầng đất sét nguyên liệu và hạt cát pha tự nhiên.',
    ethicalNotice: 'Hình minh họa trừu tượng về chất liệu đất sét (không phải ảnh chụp bãi đất thực địa).',
  },
  'incised-motif': {
    src: incisedMotifImg,
    alt: 'Bề mặt đất nung phù điêu trừu tượng thể hiện các đường lượn sóng chải răng lược và đường chấm kỷ hà',
    caption: 'Minh họa mỹ thuật 03 — Nghiên cứu bố cục đường khắc vạch lượn sóng và chấm kỷ hà trên nền đất nung.',
    ethicalNotice: 'Hình minh họa trừu tượng về hoa văn trang trí (không phải ảnh chụp cổ vật).',
  },
  'fire-patina': {
    src: firePatinaImg,
    alt: 'Cận cảnh bề mặt gốm đất nung không tráng men với dải màu đỏ gạch, vàng đất, tro xám và vệt khói đen tự nhiên',
    caption: 'Minh họa mỹ thuật 04 — Hiệu ứng sắc lửa, tro củi và vệt ám khói trên bề mặt gốm nung lộ thiên.',
    ethicalNotice: 'Hình minh họa trừu tượng về sắc màu nung lộ thiên (không phải ảnh chụp lò nung thực địa).',
  },
  'pottery-pedestal-coil': {
    src: potteryPedestalCoilImg,
    alt: 'Nghiên cứu khối gốm mộc cuộn con lươn trên bệ kê cố định, thể hiện kỹ thuật tạo dáng thủ công không dùng bàn xoay',
    caption: 'Minh họa mỹ thuật 05 — Cấu trúc thỏi đất cuộn tầng trên đôn kê cố định không dùng trục quay cơ học.',
    ethicalNotice: 'Hình minh họa mỹ thuật trừu tượng về kỹ thuật tạo phôi (không phải ảnh chụp người thợ hay hiện vật gốc).',
  },
  'sun-drying-patina': {
    src: sunDryingPatinaImg,
    alt: 'Dàn sản phẩm gốm mộc mộc mạc đang phơi khô dưới ánh sáng tự nhiên trên nền đá ấm',
    caption: 'Minh họa mỹ thuật 06 — Giai đoạn thoát ẩm tự nhiên trong bóng râm và dưới nắng trước khi nung lộ thiên.',
    ethicalNotice: 'Hình minh họa mỹ thuật trừu tượng về công đoạn phơi sấy (không phải ảnh chụp sân phơi thực địa).',
  },
  'shell-comb-carving': {
    src: shellCombCarvingImg,
    alt: 'Cận cảnh hoa văn khắc vạch răng lược và vết ấn mép vỏ sò trên vai bình đất nung mộc',
    caption: 'Minh họa mỹ thuật 07 — Chi tiết đồ án sóng nước, răng lược và vết ấn vỏ sò biển trên nền gốm mộc.',
    ethicalNotice: 'Hình minh họa mỹ thuật trừu tượng về đồ án hoa văn (không phải ảnh chụp cổ vật khảo cổ).',
  },
};
