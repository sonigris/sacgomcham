import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, FileText, BookOpen, AlertCircle } from 'lucide-react';
import {
  ArchivalRecord,
  QaApiResponse,
  QaMessage,
  ReferenceSource,
} from '../types/archive';

interface QaPageProps {
  records: ArchivalRecord[];
  references: ReferenceSource[];
  onSelectRecordById: (id: string) => void;
  onNavigateToReferences: (highlightRefId?: string) => void;
}

const SUGGESTED_QUESTIONS: string[] = [
  'Những nguồn tham khảo nào đang được dùng để chứng minh thông tin về làng gốm Trì Đức và làng gốm Bàu Trúc?',
  'Thông tin khai thác đất sét ven sông Quao thuộc về làng nào, có được dùng để khẳng định cho làng Trì Đức không?',
  'Bài báo trên Tạp chí Nghiên cứu Văn hóa (mã 206865) hiện có trạng thái xác minh như thế nào?',
  'Trong kho tư liệu hiện tại đã có họ tên cụ thể của nghệ nhân tại làng Trì Đức chưa?',
];

export const QaPage: React.FC<QaPageProps> = ({
  records,
  references,
  onSelectRecordById,
  onNavigateToReferences,
}) => {
  const [messages, setMessages] = useState<QaMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content:
        'Xin chào. Tôi là Trợ lý Tra cứu Lưu trữ của hệ thống SẮC GỐM CHĂM. Tôi chỉ trả lời dựa trên kho hồ sơ tư liệu và danh mục Nguồn tham khảo đã cung cấp. Tôi phân biệt nghiêm ngặt nguồn thông tin của Trì Đức (Ligok) và Bàu Trúc (Hamu Crok), không lấy thông tin của làng này để khẳng định cho làng kia, và nói rõ "Đang chờ xác minh" hoặc "Chưa có dữ liệu" nếu nguồn chưa được kiểm chứng.',
      hasVerifiedInfo: true,
      citedRecordIds: [],
      citedReferenceIds: [],
      timestamp: 'Sẵn sàng tra cứu',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const triDucCount = records.filter((r) => r.village === 'tri-duc').length;
  const bauTrucCount = records.filter((r) => r.village === 'bau-truc').length;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const askQuestion = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: QaMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setErrorBanner(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: trimmed,
          records,
          references,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Không thể kết nối tới dịch vụ Hỏi đáp Gemini.');
      }

      const parsed = data as QaApiResponse;

      const validRecordIds = (parsed.citedRecordIds || []).filter((cid) =>
        records.some((r) => r.id === cid)
      );
      const validReferenceIds = (parsed.citedReferenceIds || []).filter((rid) =>
        references.some((r) => r.id === rid)
      );

      const assistantMsg: QaMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: parsed.answer,
        hasVerifiedInfo: parsed.hasVerifiedInfo,
        citedRecordIds: validRecordIds,
        citedReferenceIds: validReferenceIds,
        missingDataNote: parsed.missingDataNote,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định.';
      setErrorBanner(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askQuestion(input);
  };

  const handleResetConversation = () => {
    setMessages((prev) => [prev[0]]);
    setErrorBanner(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Page Header */}
      <div className="space-y-4 border-b border-[#E2D9C8] pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#8C2F1B] font-semibold">
              Chuyên mục 05 · Tra cứu Hồ sơ & Nguồn tham khảo bằng Gemini
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1A17]">
              Hỏi đáp tư liệu gốm Chăm có trích dẫn nguồn
            </h1>
            <p className="text-base text-[#5C4D42] leading-relaxed">
              Mọi câu trả lời chỉ dựa trên kho hồ sơ và danh mục Nguồn tham khảo hiện có, kèm trích
              dẫn mã hồ sơ và mã nguồn cụ thể.
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetConversation}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#F3EFE6] hover:bg-[#E7DFD1] border border-[#D8CEBE] text-[#1F1A17] rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm mới phiên hỏi đáp</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Asymmetric Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-[#F3EFE6] border border-[#E2D9C8] p-6 space-y-4">
            <h2 className="font-serif text-lg font-semibold text-[#1F1A17]">
              Phạm vi dữ liệu & nguồn đang nạp
            </h2>
            <dl className="divide-y divide-[#DFD6C7] text-xs sm:text-sm tabular-nums">
              <div className="py-2 flex justify-between gap-2">
                <dt className="text-[#6B5B4E]">Hồ sơ Trì Đức (Ligok)</dt>
                <dd className="font-medium text-[#1F1A17]">{triDucCount} hồ sơ</dd>
              </div>
              <div className="py-2 flex justify-between gap-2">
                <dt className="text-[#6B5B4E]">Hồ sơ Bàu Trúc (Hamu Crok)</dt>
                <dd className="font-medium text-[#1F1A17]">{bauTrucCount} hồ sơ</dd>
              </div>
              <div className="py-2 flex justify-between gap-2">
                <dt className="text-[#6B5B4E]">Nguồn tham khảo quản lý</dt>
                <dd className="font-medium text-[#8C2F1B]">{references.length} nguồn</dd>
              </div>
            </dl>
            <p className="text-xs text-[#6B5B4E] leading-relaxed">
              Khi người quản trị thêm, sửa hoặc xóa nguồn tại trang &ldquo;Tư liệu và nguồn tham
              khảo&rdquo;, Gemini lập tức cập nhật phạm vi đối chiếu tương ứng.
            </p>
          </div>

          <div className="border border-[#E2D9C8] bg-[#FBF9F5] p-6 space-y-3">
            <h2 className="text-xs uppercase tracking-widest text-[#6B5B4E] font-semibold">
              Câu hỏi gợi ý để kiểm nghiệm
            </h2>
            <div className="space-y-2.5">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isLoading}
                  onClick={() => askQuestion(q)}
                  className="w-full text-left p-3 text-xs sm:text-sm text-[#3D332C] bg-[#F3EFE6]/70 hover:bg-[#EAE2D3] border border-[#E2D9C8] rounded-md transition-colors leading-relaxed disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Column: Grounded Q&A Transcript & Input */}
        <section className="lg:col-span-8 border border-[#E2D9C8] bg-[#FBF9F5] flex flex-col min-h-[560px]">
          <div className="flex-1 p-5 sm:p-7 space-y-6 overflow-y-auto max-h-[620px]">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-xs text-[#78695D] mb-1.5 flex items-center gap-1.5">
                    <span>{isUser ? 'Người tra cứu' : 'Trợ lý Lưu trữ Sắc Gốm Chăm'}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-2xl rounded-lg p-4 sm:p-5 text-sm sm:text-base leading-relaxed space-y-4 ${
                      isUser
                        ? 'bg-[#8C2F1B] text-[#FBF9F5]'
                        : 'bg-[#F3EFE6] border border-[#E2D9C8] text-[#1F1A17]'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>

                    {!isUser && msg.missingDataNote && msg.missingDataNote.trim().length > 0 && (
                      <div className="pt-3 border-t border-[#DFD6C7] text-xs text-[#8C583A]">
                        <strong>Ghi chú trạng thái xác minh:</strong> {msg.missingDataNote}
                      </div>
                    )}

                    {!isUser &&
                      ((msg.citedRecordIds && msg.citedRecordIds.length > 0) ||
                        (msg.citedReferenceIds && msg.citedReferenceIds.length > 0)) && (
                        <div className="pt-3 border-t border-[#DFD6C7] space-y-2.5">
                          {msg.citedReferenceIds && msg.citedReferenceIds.length > 0 && (
                            <div className="space-y-1.5">
                              <p className="text-xs text-[#6B5B4E]">
                                Nguồn tham khảo trích dẫn (nhấp để mở thư mục nguồn):
                              </p>
                              <div className="flex flex-wrap items-center gap-2">
                                {msg.citedReferenceIds.map((rid) => (
                                  <button
                                    key={rid}
                                    type="button"
                                    onClick={() => onNavigateToReferences(rid)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono bg-[#FBF9F5] hover:bg-[#E7DFD1] border border-[#D8CEBE] text-[#8C2F1B] rounded-xs transition-colors whitespace-nowrap shrink-0"
                                  >
                                    <BookOpen className="w-3 h-3" />
                                    <span>{rid}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {msg.citedRecordIds && msg.citedRecordIds.length > 0 && (
                            <div className="space-y-1.5">
                              <p className="text-xs text-[#6B5B4E]">
                                Hồ sơ tư liệu đối chiếu (nhấp để mở phiếu 9 tiêu chí):
                              </p>
                              <div className="flex flex-wrap items-center gap-2">
                                {msg.citedRecordIds.map((cid) => (
                                  <button
                                    key={cid}
                                    type="button"
                                    onClick={() => onSelectRecordById(cid)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono bg-[#FBF9F5] hover:bg-[#E7DFD1] border border-[#D8CEBE] text-[#1F1A17] rounded-xs transition-colors whitespace-nowrap shrink-0"
                                  >
                                    <FileText className="w-3 h-3 text-[#8C2F1B]" />
                                    <span>{cid}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex flex-col items-start">
                <span className="text-xs text-[#78695D] mb-1.5">
                  Trợ lý Lưu trữ đang đối chiếu hồ sơ và nguồn tham khảo...
                </span>
                <div className="bg-[#F3EFE6] border border-[#E2D9C8] rounded-lg px-5 py-4 text-sm text-[#5C4D42]">
                  Đang kiểm tra phạm vi chứng minh của tài liệu tham khảo cho Trì Đức (Ligok) và Bàu
                  Trúc (Hamu Crok)...
                </div>
              </div>
            )}

            {errorBanner && (
              <div
                role="alert"
                className="p-4 bg-[#FDF2F0] border border-[#E5B8B0] rounded-md flex items-start gap-3 text-sm text-[#7A271A]"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Không thể hoàn tất truy vấn</p>
                  <p className="mt-0.5 text-xs leading-relaxed">{errorBanner}</p>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="p-4 sm:p-5 border-t border-[#E2D9C8] bg-[#F3EFE6]/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <label htmlFor="qa-question-input" className="sr-only">
              Nhập câu hỏi về nghệ thuật gốm Chăm
            </label>
            <input
              id="qa-question-input"
              type="text"
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Đặt câu hỏi về tư liệu và nguồn tham khảo của Trì Đức (Ligok) hoặc Bàu Trúc (Hamu Crok)..."
              className="flex-1 px-4 py-2.5 text-sm bg-white border border-[#D8CEBE] rounded-md focus:outline-none focus:border-[#8C2F1B] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#8C2F1B] text-[#FBF9F5] rounded-md hover:bg-[#732413] transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <span>Gửi câu hỏi</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
