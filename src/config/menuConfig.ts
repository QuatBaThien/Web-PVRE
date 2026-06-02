import {
  BookOpen,
  Calculator,
  CircleHelp,
  ClipboardList,
  FileCheck2,
  FileClock,
  FileSpreadsheet,
  FolderCog,
  Landmark,
  NotebookTabs,
  Scale,
  Settings,
} from 'lucide-react';
import type { TopMenuConfig } from '../types/menu';

const placeholder = (module: string, fn: string) => `/placeholder/${module}/${fn}`;

export const topMenus: TopMenuConfig[] = [
  {
    key: 'system',
    label: 'Hệ thống',
    children: [
      { key: 'system-parameter', label: 'Tham số hệ thống', path: placeholder('system', 'tham-so-he-thong'), icon: Settings },
      { key: 'workflow', label: 'Quy trình phê duyệt', path: placeholder('system', 'quy-trinh-phe-duyet'), icon: FileCheck2 },
      { key: 'audit-log', label: 'Nhật ký hệ thống', path: placeholder('system', 'nhat-ky-he-thong'), icon: ClipboardList },
    ],
  },
  {
    key: 'dictionary',
    label: 'Từ điển',
    children: [
      { key: 'lob-master', label: 'Danh mục LOB', path: placeholder('dictionary', 'danh-muc-lob'), icon: BookOpen },
      { key: 'customer-master', label: 'Danh mục khách hàng', path: '/dictionary/customer-master', icon: Landmark },
      { key: 'currency-master', label: 'Danh mục tiền tệ', path: placeholder('dictionary', 'danh-muc-tien-te'), icon: Calculator },
    ],
  },
  {
    key: 'finance',
    label: 'Kế toán - Tài chính',
    children: [
      { key: 'receipt-voucher', label: 'Chứng từ thu chi', path: placeholder('finance', 'chung-tu-thu-chi'), icon: FileSpreadsheet },
      { key: 'general-ledger', label: 'Sổ cái tổng hợp', path: placeholder('finance', 'so-cai-tong-hop'), icon: NotebookTabs },
      { key: 'settlement', label: 'Quản lý đối soát', path: placeholder('finance', 'quan-ly-doi-soat'), icon: Scale },
    ],
  },
  {
    key: 'reinsurance',
    label: 'Nghiệp vụ Tái bảo hiểm',
    children: [
      { key: 'inward-contracts', label: 'Tra cứu hợp đồng nhận TBH', path: '/reinsurance/inward-contracts', icon: FileSpreadsheet },
      { key: 'fixed-proportional', label: 'Quản lý HĐ TBH cố định tỷ lệ', path: placeholder('reinsurance', 'quan-ly-hd-tbh-co-dinh-ty-le'), icon: FolderCog },
      { key: 'fixed-non-proportional', label: 'Quản lý HĐ TBH cố định phi tỷ lệ', path: placeholder('reinsurance', 'quan-ly-hd-tbh-co-dinh-phi-ty-le'), icon: FolderCog },
      { key: 'fixed-contracts', label: 'Quản lý HĐ TBH cố định', path: placeholder('reinsurance', 'quan-ly-hd-tbh-co-dinh'), icon: FolderCog },
      { key: 'approve-contracts', label: 'Phê duyệt HĐ TBH', path: placeholder('reinsurance', 'phe-duyet-hd-tbh'), icon: FileCheck2 },
      { key: 'contract-data', label: 'Quản lý dữ liệu HĐ TBH', path: placeholder('reinsurance', 'quan-ly-du-lieu-hd-tbh'), icon: ClipboardList },
      { key: 'contract-signing', label: 'Ký điện tử hợp đồng', path: placeholder('reinsurance', 'ky-dien-tu-hop-dong'), icon: FileCheck2 },
      { key: 'interest-calc', label: 'Tính lãi cơ cấu nhượng TBH', path: placeholder('reinsurance', 'tinh-lai-co-cau-nhuong-tbh'), icon: Calculator },
      { key: 'convert-bord', label: 'Convert Bord', path: placeholder('reinsurance', 'convert-bord'), icon: FileSpreadsheet },
      { key: 'payment-management', label: 'Quản lý thanh toán TBH', path: placeholder('reinsurance', 'quan-ly-thanh-toan-tbh'), icon: Landmark },
      { key: 'approve-transactions', label: 'Duyệt phát sinh CT TBH', path: placeholder('reinsurance', 'duyet-phat-sinh-ct-tbh'), icon: FileClock },
      { key: 'archive-documents', label: 'Lưu trữ CT TT nhận nhượng', path: placeholder('reinsurance', 'luu-tru-ct-tt-nhan-nhuong'), icon: ClipboardList },
      { key: 'upload-closing', label: 'Upload Closing', path: placeholder('reinsurance', 'upload-closing'), icon: FileSpreadsheet },
      { key: 'electronic-transactions', label: 'Quản lý CT TT TBH điện tử', path: placeholder('reinsurance', 'quan-ly-ct-tt-tbh-dien-tu'), icon: FolderCog },
      { key: 'intermediary-inward', label: 'Quản lý HĐ nhận TBH trung gian', path: placeholder('reinsurance', 'quan-ly-hd-nhan-tbh-trung-gian'), icon: FolderCog },
      { key: 'electronic-contracts', label: 'Quản lý HĐ TBH điện tử', path: placeholder('reinsurance', 'quan-ly-hd-tbh-dien-tu'), icon: FolderCog },
      { key: 'ocr-list', label: 'Danh sách CT OCR', path: placeholder('reinsurance', 'danh-sach-ct-ocr'), icon: ClipboardList },
      { key: 'renewal-contracts', label: 'Quản lý HĐ tái tục', path: placeholder('reinsurance', 'quan-ly-hd-tai-tuc'), icon: FolderCog },
    ],
  },
  {
    key: 'claim',
    label: 'Nghiệp vụ Bồi thường TBH',
    children: [
      { key: 'claim-case', label: 'Quản lý hồ sơ bồi thường', path: placeholder('claim', 'quan-ly-ho-so-boi-thuong'), icon: ClipboardList },
      { key: 'claim-review', label: 'Duyệt bồi thường TBH', path: placeholder('claim', 'duyet-boi-thuong-tbh'), icon: FileCheck2 },
    ],
  },
  {
    key: 'planning',
    label: 'Nghiệp vụ Kế hoạch',
    children: [
      { key: 'sales-plan', label: 'Kế hoạch doanh thu', path: placeholder('planning', 'ke-hoach-doanh-thu'), icon: NotebookTabs },
      { key: 'capacity-plan', label: 'Kế hoạch năng lực nhận tái', path: placeholder('planning', 'ke-hoach-nang-luc-nhan-tai'), icon: Scale },
    ],
  },
  {
    key: 'reports',
    label: 'Báo cáo',
    children: [
      { key: 'dashboard-report', label: 'Dashboard điều hành', path: placeholder('reports', 'dashboard-dieu-hanh'), icon: FileSpreadsheet },
      { key: 'operational-report', label: 'Báo cáo nghiệp vụ', path: placeholder('reports', 'bao-cao-nghiep-vu'), icon: ClipboardList },
    ],
  },
  {
    key: 'help',
    label: 'Giúp đỡ',
    children: [
      { key: 'user-guide', label: 'Hướng dẫn sử dụng', path: placeholder('help', 'huong-dan-su-dung'), icon: CircleHelp },
      { key: 'release-note', label: 'Thông báo phát hành', path: placeholder('help', 'thong-bao-phat-hanh'), icon: BookOpen },
    ],
  },
];

export function findTopMenuByPath(pathname: string): TopMenuConfig {
  const match = topMenus.find((menu) => menu.children.some((item) => pathname.startsWith(item.path)));
  if (match) {
    return match;
  }

  return topMenus.find((menu) => menu.key === 'reinsurance') ?? topMenus[0];
}
