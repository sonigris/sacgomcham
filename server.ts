import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { INITIAL_ARCHIVE_RECORDS } from './src/data/chamPotteryArchive.ts';
import {
  INITIAL_REFERENCE_SOURCES,
  REFERENCE_VILLAGE_SCOPE_LABELS,
  SOURCE_CATEGORY_METADATA,
} from './src/data/referenceSources.ts';
import {
  POTTERY_TOOLS_CATALOG,
  RESEARCH_TERMS_GLOSSARY,
  SEVEN_PROCESS_STEPS,
} from './src/data/potteryModulesData.ts';
import type { ArchivalRecord, ReferenceSource } from './src/types/archive.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

function serializeReferencesForPrompt(references: ReferenceSource[]): string {
  if (references.length === 0) {
    return 'Hiện chưa có nguồn tham khảo nào trong danh mục (Đang chờ xác minh).';
  }
  return references
    .map((ref) => {
      const catLabel = SOURCE_CATEGORY_METADATA[ref.sourceType]?.label ?? ref.sourceType;
      const scopeLabel =
        REFERENCE_VILLAGE_SCOPE_LABELS[ref.villageScope] ?? ref.villageScope;
      const statusLabel =
        ref.verificationStatus === 'da-xac-minh' ? 'Đã xác minh' : 'Đang chờ xác minh';

      return [
        `--- MÃ NGUỒN: ${ref.id} ---`,
        `- Tên tài liệu: ${ref.title}`,
        `- Tác giả / Cơ quan phát hành: ${ref.publisherOrAuthor}`,
        `- Năm công bố: ${ref.publishYear}`,
        `- Loại nguồn: ${catLabel}`,
        `- Đường dẫn: ${ref.url}`,
        `- Phạm vi làng nghề được chứng minh: ${scopeLabel}`,
        `- Trạng thái xác minh nguồn: ${statusLabel}`,
        `- Nội dung được sử dụng: ${ref.usedContent}`,
      ].join('\n');
    })
    .join('\n\n');
}

function serializeArchiveForPrompt(records: ArchivalRecord[]): string {
  return records
    .map((r) => {
      const villageLabel =
        r.village === 'tri-duc'
          ? 'Làng gốm Trì Đức (Ligok), Bình Đức, Bình Thuận'
          : 'Làng gốm Bàu Trúc (Hamu Crok), Ninh Thuận';
      const dataTypeLabel = r.isSampleData
        ? 'DỮ LIỆU MẪU MINH HỌA CẤU TRÚC LƯU TRỮ'
        : 'TƯ LIỆU ĐÃ XÁC MINH';
      const refIdsStr =
        r.referenceIds && r.referenceIds.length > 0
          ? r.referenceIds.join(', ')
          : 'Đang chờ xác minh';

      return [
        `--- MÃ HỒ SƠ: ${r.id} ---`,
        `- Trạng thái dữ liệu: ${dataTypeLabel}`,
        `- Phân vùng làng nghề: ${villageLabel}`,
        `- Nhóm chuyên mục: ${r.category}`,
        `- Tên hiện vật hoặc nội dung: ${r.title}`,
        `- Tên gọi địa phương: ${r.localName}`,
        `- Dân tộc: ${r.ethnicity}`,
        `- Vùng văn hóa: ${r.culturalRegion}`,
        `- Địa danh hiện nay: ${r.currentLocation}`,
        `- Địa danh lịch sử tại thời điểm ghi nhận: ${r.historicalLocation}`,
        `- Người cung cấp thông tin: ${r.informant}`,
        `- Phạm vi sử dụng được phép: ${r.usageScope}`,
        `- Nguồn tư liệu ghi trên phiếu: ${r.source}`,
        `- Mã nguồn tham khảo liên kết: ${refIdsStr}`,
        `- Ghi chú phân định phạm vi làng nghề: ${r.villageAttributionNote || 'Không có'}`,
        `- Tóm tắt: ${r.summary}`,
        `- Nội dung chi tiết: ${r.details}`,
      ].join('\n');
    })
    .join('\n\n');
}

function serializeGlossaryForPrompt(): string {
  return RESEARCH_TERMS_GLOSSARY.map((term) => {
    const villageNote =
      term.villageAttribution === 'bau-truc'
        ? 'Bàu Trúc (Hamu Crok, Ninh Thuận)'
        : term.villageAttribution === 'tri-duc'
          ? 'Trì Đức (Ligok, Bình Thuận)'
          : 'Ghi nhận chung ở cả hai làng Chăm';
    return [
      `- Thuật ngữ: ${term.term} (Phiên âm: ${term.chamScriptOrPhonetic || 'N/A'})`,
      `  + Phân nhóm: ${term.category}`,
      `  + Ngữ nghĩa: ${term.meaning}`,
      `  + Bối cảnh văn hóa & tri thức: ${term.culturalContext}`,
      `  + Làng nghề liên quan: ${villageNote}`,
      `  + Nguồn trích dẫn: ${term.citedReferenceIds.join(', ')}`,
    ].join('\n');
  }).join('\n\n');
}

function serializeToolsForPrompt(): string {
  return POTTERY_TOOLS_CATALOG.map((t) => {
    return [
      `- Dụng cụ: ${t.vietnameseName} (Mã: ${t.id})`,
      `  + Tên bản địa tiếng Chăm: ${t.nativeName}`,
      `  + Chất liệu: ${t.material}`,
      `  + Công dụng: ${t.purpose}`,
      `  + Công đoạn áp dụng: ${t.techniqueStage}`,
      `  + Phạm vi làng nghề: ${t.villageScope}`,
      `  + Nguồn tham khảo: ${t.sourceReferences.join(', ')}`,
    ].join('\n');
  }).join('\n\n');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/qa', async (req, res) => {
    try {
      const { question, records, references } = req.body as {
        question?: string;
        records?: ArchivalRecord[];
        references?: ReferenceSource[];
      };

      if (!question || typeof question !== 'string' || !question.trim()) {
        res.status(400).json({ error: 'Vui lòng nhập câu hỏi cần tra cứu.' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({
          error:
            'Chưa tìm thấy cấu hình khóa kết nối Gemini trên máy chủ. Vui lòng kiểm tra mục Settings > Secrets.',
        });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const activeRecords: ArchivalRecord[] =
        Array.isArray(records) && records.length > 0 ? records : INITIAL_ARCHIVE_RECORDS;
      const activeReferences: ReferenceSource[] = Array.isArray(references)
        ? references
        : INITIAL_REFERENCE_SOURCES;

      const referencesContext = serializeReferencesForPrompt(activeReferences);
      const archiveContext = serializeArchiveForPrompt(activeRecords);
      const glossaryContext = serializeGlossaryForPrompt();
      const toolsContext = serializeToolsForPrompt();

      const systemInstruction = `Bạn là Trợ lý Tra cứu Lưu trữ & Thư mục Nguồn tham khảo của ứng dụng "SẮC GỐM CHĂM – Nghệ thuật làm gốm của người Chăm".

QUY TẮC BẮT BUỘC VÀ TUYỆT ĐỐI (KHÔNG ĐƯỢC VI PHẠM):
1. CHỈ ĐƯỢC TRẢ LỜI DỰA TRÊN [DANH MỤC NGUỒN THAM KHẢO HIỆN HÀNH], [KHO TƯ LIỆU HIỆN HÀNH], [THUẬT NGỮ BẢN ĐỊA] VÀ [DANH MỤC CÔNG CỤ] ĐƯỢC CUNG CẤP BÊN DƯỚI.
2. TUYỆT ĐỐI KHÔNG tự bịa tên tác giả, năm xuất bản, đường dẫn, tên nghệ nhân, tên dụng cụ địa phương, sự kiện hoặc nội dung tài liệu chưa được xác minh.
3. Nếu thông tin người dùng hỏi không có trong dữ liệu hoặc đang được ghi nhận là "Chưa có tư liệu xác minh" hay "Đang chờ xác minh", bạn PHẢI trả lời rõ ràng là hiện chưa có dữ liệu xác minh hoặc nguồn đang ở trạng thái "Đang chờ xác minh".
4. PHÂN BIỆT RÕ NGUỒN THÔNG TIN VỀ TRÌ ĐỨC (Ligok, Bình Thuận) VÀ BÀU TRÚC (Hamu Crok, Ninh Thuận). TUYỆT ĐỐI KHÔNG dùng thông tin chỉ được chứng minh cho làng này (ví dụ: đất sét sông Quao ở Bàu Trúc trong REF-05) để khẳng định cho làng kia nếu tài liệu không chứng minh điều đó.
5. Khi người dùng hỏi về các thuật ngữ nghiên cứu (tanuh, juak halan, jaik halan, padang paduk, mathik gaok, agai paoh, ngap bingu hala, danach, jek, gok, cambak, bilaok...) hoặc công cụ, hãy giải thích chuẩn xác theo mục [THUẬT NGỮ BẢN ĐỊA & CÔNG CỤ] bên dưới và nêu rõ làng nghề liên quan.
6. Khi trả lời, hãy nêu rõ mã hồ sơ (ví dụ HS-TD-LG01) và mã nguồn tham khảo đi kèm (ví dụ REF-01, REF-02).

[DANH MỤC NGUỒN THAM KHẢO HIỆN HÀNH]:
${referencesContext}

[THUẬT NGỮ BẢN ĐỊA ĐÃ ĐƯỢC GHI NHẬN]:
${glossaryContext}

[DANH MỤC CÔNG CỤ VÀ TÊN BẢN ĐỊA]:
${toolsContext}

[KHO TƯ LIỆU HIỆN HÀNH]:
${archiveContext}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Câu hỏi tra cứu của người dùng: "${question.trim()}"`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              answer: {
                type: Type.STRING,
                description:
                  'Câu trả lời tiếng Việt chuẩn xác dựa trên hồ sơ và nguồn tham khảo đã cung cấp. Nói rõ chưa có dữ liệu hoặc Đang chờ xác minh nếu chưa được chứng minh.',
              },
              hasVerifiedInfo: {
                type: Type.BOOLEAN,
                description:
                  'True nếu có dữ liệu trả lời trong kho; False nếu chưa có dữ liệu hoặc đang chờ xác minh.',
              },
              citedRecordIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Danh sách mã hồ sơ liên quan (ví dụ HS-TD-LG01).',
              },
              citedReferenceIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Danh sách mã nguồn tham khảo liên quan (ví dụ REF-01, REF-02).',
              },
              missingDataNote: {
                type: Type.STRING,
                description:
                  'Ghi chú ngắn về phần thông tin chưa có dữ liệu hoặc nguồn đang chờ xác minh.',
              },
            },
            required: [
              'answer',
              'hasVerifiedInfo',
              'citedRecordIds',
              'citedReferenceIds',
              'missingDataNote',
            ],
          },
        },
      });

      const rawText = (response.text ?? '').trim();
      if (!rawText) {
        res.status(502).json({
          error: 'Hệ thống không nhận được phản hồi văn bản từ mô hình Gemini.',
        });
        return;
      }

      const parsed = JSON.parse(rawText) as {
        answer: string;
        hasVerifiedInfo: boolean;
        citedRecordIds: string[];
        citedReferenceIds: string[];
        missingDataNote: string;
      };

      res.json(parsed);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error('Lỗi tại /api/qa:', errMsg);

      if (
        errMsg.includes('403') ||
        errMsg.includes('PERMISSION_DENIED') ||
        errMsg.includes('API_KEY_INVALID')
      ) {
        res.status(403).json({
          error:
            'Khóa kết nối Gemini không hợp lệ hoặc chưa được cấp quyền. Vui lòng kiểm tra trong mục Settings > Secrets.',
        });
        return;
      }

      if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED')) {
        res.status(429).json({
          error:
            'Đã vượt hạn mức truy vấn tạm thời của Gemini API. Vui lòng thử lại sau ít phút hoặc kiểm tra hạn mức khóa trong Settings > Secrets.',
        });
        return;
      }

      res.status(500).json({
        error: `Không thể thực hiện truy vấn hỏi đáp lúc này (${errMsg}).`,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sắc Gốm Chăm server đang chạy tại http://0.0.0.0:${PORT}`);
  });
}

startServer();
