import { useMemo } from 'react';
import type { ReactNode } from 'react';
import {
  App,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ArrowLeft, Plus, Printer, RefreshCw, Save, Trash2, UserCircle2, X } from 'lucide-react';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { FormSection } from '../../components/form/FormSection';
import { SimpleDataTable } from '../../components/grid/SimpleDataTable';
import { NestedTabs } from '../../components/tabs/NestedTabs';
import { inwardContractsMock } from '../../mocks/inwardContracts';
import { useAppStore } from '../../store/appStore';
import type { BreadcrumbItem } from '../../types/common';
import { formatCurrency, formatDate, formatPercent } from '../../utils/format';

// interface TransactionRecord {
//   id: string;
//   docNo: string;
//   docType: string;
//   postingDate: string;
//   amount: number;
// }

interface SourceInfoRecord {
  id: string;
  status: string;
  writtenLineDate: string;
  signedLineDate: string;
  subjectivity: string;
  statusDate: string;
  source: string;
  sourceName: string;
  sourceType: string;
  sourceRef: string;
  reinsurerCode: string;
  cedantCode: string;
  methodCode: string;
  methodName: string;
}

interface SourceDetailRecord {
  id: string;
  riskNameDetail: string;
  riType: string;
  section: string;
  contractClass: string;
  riskGroup: string;
  currency: string;
  exchangeRateVnd: number;
  exchangeRateUsd: number;
  sumInsuredNte: number;
  sumInsuredVnd: number;
  premiumRate: number;
  grossPremium: number;
  commission: number;
  deduction: number;
  netPremium: number;
}

interface FeeRecord {
  id: string;
  feeType: string;
  rate: number;
  originalFee: number;
  payableAmount: number;
  note: string;
}

interface DetailInstallmentRecord {
  id: string;
  installment: string;
  fromDate: string;
  toDate: string;
  rate: number;
  note: string;
}

interface SectionRetroRecord {
  id: string;
  contractClass: string;
  treatyCode: string;
  exchangeRate: number;
  eventLimit: number;
  sumInsured: number;
  sharePercent: number;
  premium: number;
  commission: number;
  deductions: number;
  netPremium: number;
}

interface DeclarationRecord {
  id: string;
  riType: string;
  contractType: string;
  declared: string;
}

interface RetroLineRecord {
  id: string;
  riType: string;
  reinsurer: string;
  follower: string;
  leader: string;
  pmlOfLeader: string;
  premium100: number;
  sharePercent: number;
  treatyRate: number;
  sumInsuredNte: number;
  sumInsuredUsd: number;
  retroPremium: number;
  commissionRate: number;
  commission: number;
}

interface RetroFeeRecord {
  id: string;
  riType: string;
  reinsurer: string;
  follower: string;
  leader: string;
  feeType: string;
  rate: number;
  originalFee: number;
  payableAmount: number;
  note: string;
}

const statusOptions = [
  { label: 'Hiệu lực', value: 'Hiệu lực' },
  { label: 'Chờ duyệt', value: 'Chờ duyệt' },
  { label: 'Hết hạn', value: 'Hết hạn' },
  { label: 'Tạm khóa', value: 'Tạm khóa' },
];

const selectOptions = {
  units: ['PVI RE', 'PVI Hà Nội', 'PVI Sài Gòn'],
  businessPackages: ['Fire Facultative', 'Marine Treaty', 'Energy XOL'],
  risks: ['Nhà máy điện', 'Kho xăng dầu', 'Đội tàu biển'],
  contractTypes: ['Facultative', 'Treaty', 'Quota Share', 'XL'],
  newRenewal: ['New R/I Contract', 'Renewal'],
  checklistTypes: ['Checklist chuẩn', 'Checklist tạm thời', 'Checklist đặc thù'],
  methods: ['Direct', 'Broker', 'Open Market'],
  epiTypes: ['Gross EPI', 'Net EPI', 'EGNPI'],
  endorsementTypes: ['Sửa đổi tăng', 'Sửa đổi giảm', 'Gia hạn'],
  yesNo: ['Yes', 'No'],
  users: ['Nguyễn Quản trị', 'Trần Underwriter', 'Lê Supervisor'],
};

// const transactionRows: TransactionRecord[] = Array.from({ length: 8 }, (_, index) => ({
//   id: `TRX-${String(index + 1).padStart(3, '0')}`,
//   docNo: `CT${String(200 + index)}`,
//   docType: index % 2 === 0 ? 'Premium' : 'Claim',
//   postingDate: `2026-${String((index % 9) + 1).padStart(2, '0')}-12`,
//   amount: 12500 + index * 850,
// }));

const sourceInfoRows: SourceInfoRecord[] = Array.from({ length: 7 }, (_, index) => ({
  id: `SI-${String(index + 1).padStart(2, '0')}`,
  status: index % 2 === 0 ? 'Signed' : 'Written',
  writtenLineDate: `2026-0${(index % 6) + 1}-05`,
  signedLineDate: `2026-0${(index % 6) + 1}-08`,
  subjectivity: index % 2 === 0 ? 'Clean' : 'Pending Slip',
  statusDate: `2026-0${(index % 6) + 1}-10`,
  source: `SRC-${100 + index}`,
  sourceName: `Nguồn hợp đồng ${index + 1}`,
  sourceType: index % 2 === 0 ? 'Broker' : 'Direct',
  sourceRef: `REF-SRC-${index + 1}`,
  reinsurerCode: ['SWISS', 'MUNICH', 'KORE', 'SCOR'][index % 4],
  cedantCode: ['PVIINS', 'BIC', 'PTI'][index % 3],
  methodCode: ['FAC', 'TTY', 'QS'][index % 3],
  methodName: ['Facultative', 'Treaty', 'Quota Share'][index % 3],
}));

const sourceDetailRows: SourceDetailRecord[] = Array.from({ length: 8 }, (_, index) => ({
  id: `SD-${String(index + 1).padStart(2, '0')}`,
  riskNameDetail: `Risk Detail ${index + 1}`,
  riType: ['FAC', 'QS', 'XL'][index % 3],
  section: `Section ${String.fromCharCode(65 + (index % 3))}`,
  contractClass: ['Property', 'Marine', 'Engineering'][index % 3],
  riskGroup: ['Cat 1', 'Cat 2', 'Cat 3'][index % 3],
  currency: index % 2 === 0 ? 'USD' : 'VND',
  exchangeRateVnd: 25500,
  exchangeRateUsd: 1,
  sumInsuredNte: 850000 + index * 125000,
  sumInsuredVnd: 22000000000 + index * 1200000000,
  premiumRate: 0.12 + index * 0.01,
  grossPremium: 15000 + index * 1800,
  commission: 1800 + index * 150,
  deduction: 900 + index * 75,
  netPremium: 12300 + index * 1575,
}));

const feeRows: FeeRecord[] = Array.from({ length: 5 }, (_, index) => ({
  id: `FEE-${index + 1}`,
  feeType: ['Brokerage', 'Admin', 'Tax', 'Fronting', 'Other'][index],
  rate: 1.5 + index * 0.5,
  originalFee: 2200 + index * 350,
  payableAmount: 1700 + index * 280,
  note: `Phí bổ sung ${index + 1}`,
}));

const installmentRows: DetailInstallmentRecord[] = Array.from({ length: 4 }, (_, index) => ({
  id: `INS-${index + 1}`,
  installment: `Kỳ ${index + 1}`,
  fromDate: `2026-0${index + 1}-01`,
  toDate: `2026-0${index + 1}-30`,
  rate: 25,
  note: index === 0 ? 'Trả đầu kỳ' : 'Theo tiến độ',
}));

const sectionRetroRows: SectionRetroRecord[] = Array.from({ length: 6 }, (_, index) => ({
  id: `SR-${index + 1}`,
  contractClass: ['Property', 'Marine', 'Engineering'][index % 3],
  treatyCode: `TTE-${index + 1}`,
  exchangeRate: 25500,
  eventLimit: 500000 + index * 25000,
  sumInsured: 2500000 + index * 175000,
  sharePercent: 5 + index * 2.5,
  premium: 32000 + index * 2400,
  commission: 4200 + index * 350,
  deductions: 1200 + index * 100,
  netPremium: 26600 + index * 1950,
}));

const declarationRows: DeclarationRecord[] = Array.from({ length: 4 }, (_, index) => ({
  id: `DEC-${index + 1}`,
  riType: ['FAC', 'QS', 'XL', 'TTY'][index],
  contractType: ['Treaty', 'Facultative', 'Treaty', 'Treaty'][index],
  declared: index % 2 === 0 ? 'Yes' : 'No',
}));

const retroLineRows: RetroLineRecord[] = Array.from({ length: 7 }, (_, index) => ({
  id: `RL-${index + 1}`,
  riType: ['TTY', 'FAC', 'QS'][index % 3],
  reinsurer: ['Swiss Re', 'Munich Re', 'Korean Re'][index % 3],
  follower: ['Follower A', 'Follower B', 'Follower C'][index % 3],
  leader: ['Leader X', 'Leader Y', 'Leader Z'][index % 3],
  pmlOfLeader: ['High', 'Medium', 'Low'][index % 3],
  premium100: 28000 + index * 1900,
  sharePercent: 7 + index * 1.5,
  treatyRate: 3 + index * 0.4,
  sumInsuredNte: 780000 + index * 64000,
  sumInsuredUsd: 780000 + index * 64000,
  retroPremium: 11200 + index * 900,
  commissionRate: 8 + index * 0.35,
  commission: 960 + index * 82,
}));

const retroFeeRows: RetroFeeRecord[] = Array.from({ length: 5 }, (_, index) => ({
  id: `RF-${index + 1}`,
  riType: ['FAC', 'TTY', 'QS'][index % 3],
  reinsurer: ['Swiss Re', 'Munich Re', 'Korean Re'][index % 3],
  follower: ['Follower A', 'Follower B', 'Follower C'][index % 3],
  leader: ['Leader X', 'Leader Y', 'Leader Z'][index % 3],
  feeType: ['Brokerage', 'Tax', 'Other', 'Admin', 'Fee phụ'][index],
  rate: 0.8 + index * 0.25,
  originalFee: 1800 + index * 220,
  payableAmount: 1500 + index * 210,
  note: `Khoản phí ${index + 1}`,
}));

// const transactionColumns: ColumnsType<TransactionRecord> = [
//   { title: 'Chứng từ', dataIndex: 'docNo', key: 'docNo', width: 120 },
//   { title: 'Loại', dataIndex: 'docType', key: 'docType', width: 120 },
//   { title: 'Ngày hạch toán', dataIndex: 'postingDate', key: 'postingDate', width: 140, align: 'center', render: formatDate },
//   { title: 'Số tiền', dataIndex: 'amount', key: 'amount', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
// ];

const sourceInfoColumns: ColumnsType<SourceInfoRecord> = [
  { title: 'Status', dataIndex: 'status', key: 'status', width: 110, render: (value: string) => <Tag color={value === 'Signed' ? 'green' : 'blue'}>{value}</Tag> },
  { title: 'Written Line Date', dataIndex: 'writtenLineDate', key: 'writtenLineDate', width: 130, align: 'center', render: formatDate },
  { title: 'Signed Line Date', dataIndex: 'signedLineDate', key: 'signedLineDate', width: 130, align: 'center', render: formatDate },
  { title: 'Subjectivity', dataIndex: 'subjectivity', key: 'subjectivity', width: 140 },
  { title: 'Status Date', dataIndex: 'statusDate', key: 'statusDate', width: 120, align: 'center', render: formatDate },
  { title: 'Source', dataIndex: 'source', key: 'source', width: 120 },
  { title: 'Source Name', dataIndex: 'sourceName', key: 'sourceName', width: 180 },
  { title: 'Source Type', dataIndex: 'sourceType', key: 'sourceType', width: 120 },
  { title: 'Source Ref.', dataIndex: 'sourceRef', key: 'sourceRef', width: 140 },
  { title: 'Mã CTy nhận TBH', dataIndex: 'reinsurerCode', key: 'reinsurerCode', width: 140 },
  { title: 'Mã cedant', dataIndex: 'cedantCode', key: 'cedantCode', width: 120 },
  { title: 'Mã p.thức tái', dataIndex: 'methodCode', key: 'methodCode', width: 120 },
  { title: 'Tên p.thức tái', dataIndex: 'methodName', key: 'methodName', width: 150 },
];

const sourceDetailColumns: ColumnsType<SourceDetailRecord> = [
  { title: 'Risk Name Detail', dataIndex: 'riskNameDetail', key: 'riskNameDetail', width: 180 },
  { title: 'R/I Type', dataIndex: 'riType', key: 'riType', width: 100 },
  { title: 'Section', dataIndex: 'section', key: 'section', width: 100 },
  { title: 'Class', dataIndex: 'contractClass', key: 'contractClass', width: 120 },
  { title: 'Nhóm loại RR', dataIndex: 'riskGroup', key: 'riskGroup', width: 120 },
  { title: 'Curr', dataIndex: 'currency', key: 'currency', width: 90, align: 'center' },
  { title: 'Tỷ giá VND', dataIndex: 'exchangeRateVnd', key: 'exchangeRateVnd', align: 'right', render: (value: number) => value.toLocaleString('vi-VN') },
  { title: 'Tỷ giá USD', dataIndex: 'exchangeRateUsd', key: 'exchangeRateUsd', align: 'right', render: (value: number) => value.toLocaleString('vi-VN') },
  { title: 'MTN-GTBH(NTE)', dataIndex: 'sumInsuredNte', key: 'sumInsuredNte', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'MTN-GTBH(VND)', dataIndex: 'sumInsuredVnd', key: 'sumInsuredVnd', align: 'right', render: (value: number) => formatCurrency(value, 'VND') },
  { title: 'Tỷ lệ phí(%)', dataIndex: 'premiumRate', key: 'premiumRate', align: 'right', render: formatPercent },
  { title: 'Phí bảo hiểm gốc', dataIndex: 'grossPremium', key: 'grossPremium', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Commission', dataIndex: 'commission', key: 'commission', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Deductions', dataIndex: 'deduction', key: 'deduction', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Net Premium', dataIndex: 'netPremium', key: 'netPremium', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
];

const feeColumns: ColumnsType<FeeRecord> = [
  { title: 'Loại phí', dataIndex: 'feeType', key: 'feeType', width: 140 },
  { title: 'Tỷ lệ(%)', dataIndex: 'rate', key: 'rate', width: 110, align: 'right', render: formatPercent },
  { title: 'Nguyên tệ phí', dataIndex: 'originalFee', key: 'originalFee', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Phải chi', dataIndex: 'payableAmount', key: 'payableAmount', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Ghi chú', dataIndex: 'note', key: 'note', width: 180 },
];

const installmentColumns: ColumnsType<DetailInstallmentRecord> = [
  { title: 'Kỳ phí', dataIndex: 'installment', key: 'installment', width: 120 },
  { title: 'Ngày đầu', dataIndex: 'fromDate', key: 'fromDate', width: 120, align: 'center', render: formatDate },
  { title: 'Ngày cuối', dataIndex: 'toDate', key: 'toDate', width: 120, align: 'center', render: formatDate },
  { title: 'Tỷ lệ', dataIndex: 'rate', key: 'rate', width: 90, align: 'right', render: formatPercent },
  { title: 'Ghi chú', dataIndex: 'note', key: 'note', width: 180 },
];

const sectionRetroColumns: ColumnsType<SectionRetroRecord> = [
  { title: 'Class', dataIndex: 'contractClass', key: 'contractClass', width: 120 },
  { title: 'Mã tte', dataIndex: 'treatyCode', key: 'treatyCode', width: 110 },
  { title: 'Tỷ giá', dataIndex: 'exchangeRate', key: 'exchangeRate', align: 'right', render: (value: number) => value.toLocaleString('vi-VN') },
  { title: 'Event Limit', dataIndex: 'eventLimit', key: 'eventLimit', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'MTN/GTBH', dataIndex: 'sumInsured', key: 'sumInsured', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Share%', dataIndex: 'sharePercent', key: 'sharePercent', align: 'right', render: formatPercent },
  { title: 'Premium', dataIndex: 'premium', key: 'premium', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Commission', dataIndex: 'commission', key: 'commission', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Deductions', dataIndex: 'deductions', key: 'deductions', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Net Premium', dataIndex: 'netPremium', key: 'netPremium', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
];

const declarationColumns: ColumnsType<DeclarationRecord> = [
  { title: 'R/I Type', dataIndex: 'riType', key: 'riType', width: 100 },
  { title: 'Loại hợp đồng', dataIndex: 'contractType', key: 'contractType', width: 150 },
  { title: 'Yes / No', dataIndex: 'declared', key: 'declared', width: 100, align: 'center' },
];

const retroLineColumns: ColumnsType<RetroLineRecord> = [
  { title: 'R/I Type', dataIndex: 'riType', key: 'riType', width: 90 },
  { title: 'CTy Nhận', dataIndex: 'reinsurer', key: 'reinsurer', width: 130 },
  { title: 'Follower', dataIndex: 'follower', key: 'follower', width: 120 },
  { title: 'Leader', dataIndex: 'leader', key: 'leader', width: 120 },
  { title: 'PML of Leader', dataIndex: 'pmlOfLeader', key: 'pmlOfLeader', width: 120 },
  { title: 'Phí tái (100%)', dataIndex: 'premium100', key: 'premium100', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Share(%)', dataIndex: 'sharePercent', key: 'sharePercent', align: 'right', render: formatPercent },
  { title: 'Tỷ lệ CT(%)', dataIndex: 'treatyRate', key: 'treatyRate', align: 'right', render: formatPercent },
  { title: 'MTN-GTBH(NTE)', dataIndex: 'sumInsuredNte', key: 'sumInsuredNte', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'MTN-GTBH(USD)', dataIndex: 'sumInsuredUsd', key: 'sumInsuredUsd', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Phí nhượng TBH', dataIndex: 'retroPremium', key: 'retroPremium', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Comm.(%)', dataIndex: 'commissionRate', key: 'commissionRate', align: 'right', render: formatPercent },
  { title: 'Commission', dataIndex: 'commission', key: 'commission', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
];

const retroFeeColumns: ColumnsType<RetroFeeRecord> = [
  { title: 'R/I Type', dataIndex: 'riType', key: 'riType', width: 90 },
  { title: 'CTy Nhận', dataIndex: 'reinsurer', key: 'reinsurer', width: 120 },
  { title: 'Follower', dataIndex: 'follower', key: 'follower', width: 120 },
  { title: 'Leader', dataIndex: 'leader', key: 'leader', width: 120 },
  { title: 'Loại phí', dataIndex: 'feeType', key: 'feeType', width: 120 },
  { title: 'Tỷ lệ(%)', dataIndex: 'rate', key: 'rate', align: 'right', render: formatPercent },
  { title: 'Nguyên tệ phí', dataIndex: 'originalFee', key: 'originalFee', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Phải chi', dataIndex: 'payableAmount', key: 'payableAmount', align: 'right', render: (value: number) => formatCurrency(value, 'USD') },
  { title: 'Ghi chú', dataIndex: 'note', key: 'note', width: 180 },
];

function ToolbarButton({
  icon,
  label,
  onClick,
  primary,
  danger,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  primary?: boolean;
  danger?: boolean;
}) {
  return (
    <Button type={primary ? 'primary' : 'default'} danger={danger} icon={icon} onClick={onClick}>
      {label}
    </Button>
  );
}

function ReadonlyInput({ value }: { value: string }) {
  return <Input value={value} readOnly className="bg-slate-100" />;
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <Typography.Title level={5} className="!mb-0 !text-brand-primary">
          {title}
        </Typography.Title>
        {subtitle ? <Typography.Text type="secondary">{subtitle}</Typography.Text> : null}
      </div>
    </div>
  );
}

export function InwardContractDetail() {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const params = useParams<{ id: string }>();
  const workingYear = useAppStore((state) => state.workingYear);
  const [form] = Form.useForm();

  const contract = useMemo(
    () => inwardContractsMock.find((item) => item.id === params.id) ?? inwardContractsMock[0],
    [params.id],
  );

  const initialValues = useMemo(
    () => ({
      unit: 'PVI RE',
      documentDate: dayjs(contract.accountingDate),
      businessPackage: 'Fire Facultative',
      underwritingRisk: 'Nhà máy điện',
      contractRef: contract.contractRef,
      contractName: contract.contractName,
      contractType: contract.riType,
      newRenewal: 'New R/I Contract',
      renewalContract: '',
      status: contract.status,
      checklistType: 'Checklist chuẩn',
      inceptionDate: dayjs(contract.inceptionDate),
      expiryDate: dayjs(contract.expiryDate),
      treatyEntryDate: dayjs(contract.inceptionDate).add(3, 'day'),
      endorsementEffectiveDate: dayjs(contract.inceptionDate).add(10, 'day'),
      underwritingYear: contract.underwritingYear,
      underwritingDept: 'Phòng Năng lượng',
      underwritingMethod: 'Broker',
      insuredObject: 'Nhà máy điện công suất lớn',
      coPviShare: 15,
      insuredName: contract.insuredName,
      riskNumber: 'RISK-260041',
      businessSector: 'Năng lượng',
      locationName: 'KCN Phú Mỹ',
      locationCode: 'LOC-001',
      wf: 'W',
      biCode: 'BI-A',
      cover: 'All Risk',
      geoScope: 'Việt Nam',
      cedantCountry: 'Việt Nam',
      gmt: 7,
      epi: 125000,
      epiType: 'Gross EPI',
      cessionLimit: 2500000,
      mdpRate: 4.5,
      premReservedRate: 2.2,
      premReservedInt: 1.1,
      lossReservedRate: 3.4,
      lossReservedInt: 0.9,
      cashLoss: 12500,
      osLoss: 8200,
      lossAdvice: 6400,
      vesselCode: 'VES-001',
      piClub: 'UK Club',
      vehicleName: 'PVI Marine Carrier',
      transportMode: 'Sea',
      departureDate: dayjs(contract.inceptionDate).add(6, 'day'),
      portOfLoading: 'Hải Phòng',
      transhipmentPort: 'Singapore',
      portOfDischarge: 'Osaka',
      deductible: 'USD 25,000',
      lossHistory: 'Không phát sinh tổn thất lớn trong 3 năm',
      warranty: 'Theo điều khoản Institute Clauses',
      endorsementType: 'Sửa đổi tăng',
      endorsementTitle: 'Điều chỉnh giới hạn bồi thường',
      endorsementDetails: 'Bổ sung quyền lợi cho hạng mục turbine và mở rộng phạm vi địa lý vận hành.',
      checklistNo: 'CKL-2026-041',
      riAgreement: 'Framework Agreement 2026',
      retrocedent: 'Swiss Re',
      placementResult: 'Placed 100%',
      otherInfo: 'Thông tin giao dịch được chuẩn bị để kết nối API danh mục, workflow và approval.',
      installAdjustPrem: true,
      portfolioTransfer: false,
      isProtection: true,
      isProtectionOw: false,
      isBord: true,
      updatedBy: 'Nguyễn Quản trị',
    }),
    [contract],
  );

  const breadcrumbItems: BreadcrumbItem[] = [
    { key: 'home', title: 'Trang chủ' },
    { key: 'module', title: 'Nghiệp vụ Tái bảo hiểm' },
    { key: 'function', title: 'Tra cứu hợp đồng nhận TBH' },
    { key: 'detail', title: contract.contractRef },
  ];

  const rightMeta = (
    <Space size="middle" align="center">
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
        <Typography.Text type="secondary">Người cập nhật:</Typography.Text>
        <div className="mt-1 flex items-center gap-2">
          <UserCircle2 size={16} className="text-brand-primary" />
          <Select
            value={initialValues.updatedBy}
            options={selectOptions.users.map((value) => ({ label: value, value }))}
            style={{ width: 180 }}
          />
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
        <Typography.Text type="secondary">Năm làm việc</Typography.Text>
        <Typography.Title level={4} className="!mb-0 !text-brand-primary">
          {workingYear}
        </Typography.Title>
      </div>
    </Space>
  );

  const sourceManagerContent = (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle title="Top Panel" subtitle="Source Infor" />
          <Tag color="blue">Resizable Split Ready</Tag>
        </div>
        <Card className="rounded-xl border-0 shadow-none">
          <SimpleDataTable columns={sourceInfoColumns} dataSource={sourceInfoRows} rowKey="id" pagination={{ pageSize: 5 }} />
        </Card>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle title="Bottom Panel" subtitle="Source Detail / Other Fees" />
          <Tag color="processing">Banded Grid Layout</Tag>
        </div>
        <Card className="rounded-xl border-0 shadow-none">
          <NestedTabs
            items={[
              {
                key: 'source-detail',
                label: 'Source Detail',
                children: <SimpleDataTable columns={sourceDetailColumns} dataSource={sourceDetailRows} rowKey="id" pagination={{ pageSize: 5 }} />,
              },
              {
                key: 'other-fees',
                label: 'Other Fees',
                children: <SimpleDataTable columns={feeColumns} dataSource={feeRows} rowKey="id" pagination={false} />,
              },
            ]}
          />
        </Card>
      </div>
    </div>
  );

  const retroManagerContent = (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle title="Top Panel" subtitle="Section Retro / TTY Declaration" />
          <Tag color="purple">Retro Structure</Tag>
        </div>
        <NestedTabs
          items={[
            {
              key: 'section-retro',
              label: 'Section Retro',
              children: <SimpleDataTable columns={sectionRetroColumns} dataSource={sectionRetroRows} rowKey="id" pagination={{ pageSize: 5 }} />,
            },
            {
              key: 'tty-declaration',
              label: 'TTY Declaration',
              children: <SimpleDataTable columns={declarationColumns} dataSource={declarationRows} rowKey="id" pagination={false} />,
            },
          ]}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle title="Bottom Panel" subtitle="Retro TTY / Retro FAC / Other Fees" />
          <Tag color="cyan">Nested Tabs</Tag>
        </div>
        <NestedTabs
          items={[
            {
              key: 'retro-tty',
              label: 'Retro TTY',
              children: (
                <NestedTabs
                  size="small"
                  items={[
                    {
                      key: 'retro-tty-details',
                      label: 'Details',
                      children: <SimpleDataTable columns={retroLineColumns} dataSource={retroLineRows} rowKey="id" pagination={{ pageSize: 5 }} />,
                    },
                    {
                      key: 'retro-tty-installment',
                      label: 'Installment',
                      children: <SimpleDataTable columns={installmentColumns} dataSource={installmentRows} rowKey="id" pagination={false} />,
                    },
                  ]}
                />
              ),
            },
            {
              key: 'retro-fac',
              label: 'Retro FAC',
              children: (
                <NestedTabs
                  size="small"
                  items={[
                    {
                      key: 'retro-fac-signed',
                      label: 'Signed Line',
                      children: <SimpleDataTable columns={retroLineColumns} dataSource={retroLineRows.slice(0, 5)} rowKey="id" pagination={false} />,
                    },
                    {
                      key: 'retro-fac-written',
                      label: 'Written Line',
                      children: <SimpleDataTable columns={retroLineColumns} dataSource={retroLineRows.slice(1, 6)} rowKey="id" pagination={false} />,
                    },
                    {
                      key: 'retro-fac-installment',
                      label: 'Installment',
                      children: <SimpleDataTable columns={installmentColumns} dataSource={installmentRows} rowKey="id" pagination={false} />,
                    },
                  ]}
                />
              ),
            },
            {
              key: 'retro-other-fees',
              label: 'Other Fees',
              children: <SimpleDataTable columns={retroFeeColumns} dataSource={retroFeeRows} rowKey="id" pagination={false} />,
            },
          ]}
        />
      </div>
    </div>
  );

  return (
    <>
      <PageHeader
        title={`Chi tiết Hợp đồng Nhận TBH - ${contract.contractRef}`}
        subtitle="Màn hình chi tiết được tái tổ chức theo đúng cấu trúc nghiệp vụ, ưu tiên khả năng đọc nhanh và mở rộng API."
        breadcrumbItems={breadcrumbItems}
        extra={
          <Button icon={<ArrowLeft size={16} />} onClick={() => navigate('/reinsurance/inward-contracts')}>
            Quay lại danh sách
          </Button>
        }
      />

      <Card className="rounded-2xl shadow-panel">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <Space wrap>
            <ToolbarButton icon={<Save size={16} />} label="Lưu" primary onClick={() => message.success('Đã mô phỏng lưu hợp đồng.')} />
            <ToolbarButton icon={<Plus size={16} />} label="Thêm" onClick={() => message.info('Sẵn sàng mở form hợp đồng mới.')} />
            <ToolbarButton icon={<Trash2 size={16} />} label="Xóa" danger onClick={() => message.warning('Đã mô phỏng kiểm tra xóa hợp đồng.')} />
            <ToolbarButton icon={<RefreshCw size={16} />} label="Làm mới" onClick={() => form.setFieldsValue(initialValues)} />
            <ToolbarButton icon={<Printer size={16} />} label="In" onClick={() => message.success('Đã mô phỏng in hợp đồng.')} />
            <ToolbarButton icon={<X size={16} />} label="Đóng" onClick={() => navigate('/reinsurance/inward-contracts')} />
          </Space>
          {rightMeta}
        </div>
      </Card>

      <Card className="rounded-2xl shadow-panel">
        <Form form={form} layout="vertical" initialValues={initialValues}>
          <Tabs
            size="large"
            items={[
              {
                key: 'general',
                label: 'General Information',
                children: (
                  <div className="grid gap-4">
                    <FormSection title="Thông tin chính">
                      <Row gutter={16}>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Đơn vị" name="unit" required>
                            <Select options={selectOptions.units.map((value) => ({ label: value, value }))} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Ngày chứng từ" name="documentDate">
                            <DatePicker className="w-full" format="DD/MM/YYYY" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Gói nghiệp vụ" name="businessPackage">
                            <Select showSearch options={selectOptions.businessPackages.map((value) => ({ label: value, value }))} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Rủi ro khai thác" name="underwritingRisk">
                            <Select showSearch options={selectOptions.risks.map((value) => ({ label: value, value }))} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Contract Ref." name="contractRef" required>
                            <Input className="font-semibold text-brand-primary" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Contract Type" name="contractType">
                            <Select options={selectOptions.contractTypes.map((value) => ({ label: value, value }))} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={16}>
                          <Form.Item label="Tên hợp đồng" name="contractName">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="New/Renewal" name="newRenewal">
                            <Select options={selectOptions.newRenewal.map((value) => ({ label: value, value }))} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Renewal Contract" name="renewalContract">
                            <ReadonlyInput value="" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Trạng thái" name="status">
                            <Select options={statusOptions} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Checklist Type" name="checklistType">
                            <Select options={selectOptions.checklistTypes.map((value) => ({ label: value, value }))} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </FormSection>

                    <FormSection title="Thời gian hiệu lực">
                      <Row gutter={16}>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Ngày đầu" name="inceptionDate">
                            <DatePicker className="w-full" format="DD/MM/YYYY" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Ngày cuối" name="expiryDate">
                            <DatePicker className="w-full" format="DD/MM/YYYY" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Ngày đưa vào HĐCĐ" name="treatyEntryDate">
                            <DatePicker className="w-full" format="DD/MM/YYYY" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Ngày hiệu lực SĐBS" name="endorsementEffectiveDate">
                            <DatePicker className="w-full" format="DD/MM/YYYY" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Underwriting Year" name="underwritingYear">
                            <InputNumber className="w-full" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </FormSection>

                    <FormSection title="Thông tin khai thác">
                      <Row gutter={16}>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Phòng khai thác" name="underwritingDept">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Phương thức K.thác" name="underwritingMethod">
                            <Select options={selectOptions.methods.map((value) => ({ label: value, value }))} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Đối tượng BH" name="insuredObject">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Co-PVI Ins's Share (%)" name="coPviShare">
                            <InputNumber className="w-full" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Người được BH" name="insuredName">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Risk Number" name="riskNumber">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Ngành nghề KD" name="businessSector">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Tên địa điểm BH" name="locationName">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Mã địa điểm BH" name="locationCode">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="W/F" name="wf">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="BI Code" name="biCode">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Cover" name="cover">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={6}>
                          <Form.Item label="Geo scope" name="geoScope">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={6}>
                          <Form.Item label="Cedant country" name="cedantCountry">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="GMT" name="gmt">
                            <InputNumber className="w-full" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </FormSection>

                    <FormSection title="Thông tin tài chính">
                      <Row gutter={16}>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="EPI / EGNPI" name="epi">
                            <InputNumber className="w-full" formatter={(value) => `${value ?? ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Loại phí EPI" name="epiType">
                            <Select options={selectOptions.epiTypes.map((value) => ({ label: value, value }))} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Cession Limit" name="cessionLimit">
                            <InputNumber className="w-full" formatter={(value) => `${value ?? ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="MDP Rate" name="mdpRate">
                            <InputNumber className="w-full" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Prem Reserved Rate" name="premReservedRate">
                            <InputNumber className="w-full" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Prem Reserved Int." name="premReservedInt">
                            <InputNumber className="w-full" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Loss Reserved Rate" name="lossReservedRate">
                            <InputNumber className="w-full" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Loss Reserved Int." name="lossReservedInt">
                            <InputNumber className="w-full" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Cash Loss" name="cashLoss">
                            <InputNumber className="w-full" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="OS Loss" name="osLoss">
                            <InputNumber className="w-full" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Loss Advice" name="lossAdvice">
                            <InputNumber className="w-full" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </FormSection>

                    <FormSection title="Thông tin hàng hải">
                      <Row gutter={16}>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Mã tàu" name="vesselCode">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Hội P&I" name="piClub">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Tên ph.tiện VC" name="vehicleName">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Phương thức VC" name="transportMode">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Ngày khởi hành" name="departureDate">
                            <DatePicker className="w-full" format="DD/MM/YYYY" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Cảng đi" name="portOfLoading">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Nơi chuyển tải" name="transhipmentPort">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Cảng đến" name="portOfDischarge">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Mức khấu trừ" name="deductible">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                          <Form.Item label="Lịch sử t.thất" name="lossHistory">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                          <Form.Item label="Hạn bảo hành" name="warranty">
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                    </FormSection>

                    <FormSection title="Thông tin SĐBS và khác">
                      <Row gutter={16}>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Loại SĐBS" name="endorsementType">
                            <Select options={selectOptions.endorsementTypes.map((value) => ({ label: value, value }))} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={16}>
                          <Form.Item label="Tiêu đề SĐBS" name="endorsementTitle">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item label="Chi tiết SĐBS" name="endorsementDetails">
                            <Input.TextArea rows={3} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Số tờ trình/Checklist" name="checklistNo">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Thỏa thuận TBH" name="riAgreement">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={8}>
                          <Form.Item label="Cty TBH chuyển tiếp" name="retrocedent">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={12}>
                          <Form.Item label="Kết quả thu xếp" name="placementResult">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={12}>
                          <Form.Item label="Thông tin khác" name="otherInfo">
                            <Input.TextArea rows={2} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </FormSection>

                    <Card className="rounded-2xl border border-slate-200 bg-slate-50 shadow-none">
                      <SectionTitle title="Tùy chọn hợp đồng" subtitle="Checkboxes / Toggle switches" />
                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Install Adjust Prem" name="installAdjustPrem" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Portfolio Transfer" name="portfolioTransfer" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Is Protection" name="isProtection" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Is Protection (O/W)" name="isProtectionOw" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={4}>
                          <Form.Item label="Is Bord" name="isBord" valuePropName="checked">
                            <Switch />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>

                    <Card className="rounded-2xl shadow-panel">
                      <NestedTabs
                        items={[
                          {
                            key: 'details',
                            label: 'Details',
                            children: <SimpleDataTable columns={sourceDetailColumns} dataSource={sourceDetailRows} rowKey="id" pagination={{ pageSize: 5 }} />,
                          },
                          {
                            key: 'installment',
                            label: 'Installment',
                            children: <SimpleDataTable columns={installmentColumns} dataSource={installmentRows} rowKey="id" pagination={false} />,
                          },
                        ]}
                      />
                    </Card>
                  </div>
                ),
              },
              {
                key: 'source-manager',
                label: 'Source Manager',
                children: sourceManagerContent,
              },
              {
                key: 'retro-manager',
                label: 'Retro Manager',
                children: retroManagerContent,
              },
            ]}
          />
        </Form>
      </Card>

      {/*<div className="grid grid-cols-1 gap-4 xl:grid-cols-[0.92fr_1.08fr]">*/}
      {/*  <Card className="rounded-2xl shadow-panel" title="Danh sách chứng từ giao dịch">*/}
      {/*    <SimpleDataTable columns={transactionColumns} dataSource={transactionRows} rowKey="id" pagination={{ pageSize: 5 }} />*/}
      {/*  </Card>*/}

      {/*  <Card className="rounded-2xl shadow-panel" title="Details / Statistics">*/}
      {/*    <Tabs*/}
      {/*      items={[*/}
      {/*        {*/}
      {/*          key: 'details-tabs',*/}
      {/*          label: 'Details',*/}
      {/*          children: (*/}
      {/*            <NestedTabs*/}
      {/*              size="small"*/}
      {/*              items={[*/}
      {/*                {*/}
      {/*                  key: 'structure',*/}
      {/*                  label: 'Structure',*/}
      {/*                  children: <SimpleDataTable columns={sectionRetroColumns} dataSource={sectionRetroRows} rowKey="id" pagination={false} />,*/}
      {/*                },*/}
      {/*                {*/}
      {/*                  key: 'prem-payment-terms',*/}
      {/*                  label: 'Prem Payment Terms',*/}
      {/*                  children: <SimpleDataTable columns={installmentColumns} dataSource={installmentRows} rowKey="id" pagination={false} />,*/}
      {/*                },*/}
      {/*                {*/}
      {/*                  key: 'accumulation',*/}
      {/*                  label: 'Accumulation',*/}
      {/*                  children: <SimpleDataTable columns={sourceDetailColumns} dataSource={sourceDetailRows.slice(0, 4)} rowKey="id" pagination={false} />,*/}
      {/*                },*/}
      {/*                {*/}
      {/*                  key: 'protection',*/}
      {/*                  label: 'Protection',*/}
      {/*                  children: <SimpleDataTable columns={retroFeeColumns} dataSource={retroFeeRows} rowKey="id" pagination={false} />,*/}
      {/*                },*/}
      {/*              ]}*/}
      {/*            />*/}
      {/*          ),*/}
      {/*        },*/}
      {/*        {*/}
      {/*          key: 'statistics-tabs',*/}
      {/*          label: 'Statistics',*/}
      {/*          children: (*/}
      {/*            <NestedTabs*/}
      {/*              size="small"*/}
      {/*              items={[*/}
      {/*                {*/}
      {/*                  key: 'claim-information',*/}
      {/*                  label: 'Claim Information',*/}
      {/*                  children: <SimpleDataTable columns={transactionColumns} dataSource={transactionRows.slice(0, 4)} rowKey="id" pagination={false} />,*/}
      {/*                },*/}
      {/*                {*/}
      {/*                  key: 'policy-efficiency',*/}
      {/*                  label: 'Hiệu quả đơn',*/}
      {/*                  children: <SimpleDataTable columns={transactionColumns} dataSource={transactionRows.slice(1, 5)} rowKey="id" pagination={false} />,*/}
      {/*                },*/}
      {/*                {*/}
      {/*                  key: 'contract-efficiency',*/}
      {/*                  label: 'Hiệu quả HĐ',*/}
      {/*                  children: <SimpleDataTable columns={transactionColumns} dataSource={transactionRows.slice(2, 6)} rowKey="id" pagination={false} />,*/}
      {/*                },*/}
      {/*                {*/}
      {/*                  key: 'placement-efficiency',*/}
      {/*                  label: 'Hiệu quả thu xếp',*/}
      {/*                  children: <SimpleDataTable columns={transactionColumns} dataSource={transactionRows.slice(3, 7)} rowKey="id" pagination={false} />,*/}
      {/*                },*/}
      {/*              ]}*/}
      {/*            />*/}
      {/*          ),*/}
      {/*        },*/}
      {/*      ]}*/}
      {/*    />*/}
      {/*  </Card>*/}
      {/*</div>*/}
    </>
  );
}
