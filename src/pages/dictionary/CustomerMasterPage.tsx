import { useMemo, useState } from 'react';
import {
  Alert,
  App,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Pencil, Plus, RotateCcw, Search, Trash2 } from 'lucide-react';
import dayjs from 'dayjs';
import { ActionToolbar } from '../../components/common/ActionToolbar';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchCard } from '../../components/common/SearchCard';
import type { BreadcrumbItem, SelectOption } from '../../types/common';

type FormMode = 'add' | 'edit';

interface CustomerRecord {
  id: string;
  ma_kh: string;
  ten_kh: string;
  ma_nkhtcty: string;
  ma_nhkh: string;
  ma_pban: string;
  ma_donvi_pban: string;
  ten_khanh: string;
  ten_tat: string;
  maso_vat: string;
  dia_chi: string;
  dia_chi_eng: string;
  tel: string;
  fax: string;
  so_cmnd: string;
  ngay_cap?: string;
  noi_cap: string;
  email: string;
  ma_nhang_qly: string;
  ngan_hang: string;
  tk_vnd: string;
  tk_usd: string;
  giam_doc: string;
  ma_tctd_hn: string;
  ma_loaikh: string;
  rating: string;
  view_all: boolean;
  ngung_su_dung: boolean;
  thue: boolean;
  can_bo: boolean;
  dai_ly: boolean;
  phong_ban: boolean;
  doi_tru: boolean;
  van_phong_khu_vuc: boolean;
  moi_gioi: boolean;
  lockedByUsage: boolean;
  ten_donvi: string;
}

interface CustomerFormValues {
  ma_kh: string;
  don_vi: string;
  ma_nkhtcty: string;
  ten_kh: string;
  maso_vat: string;
  ma_nhkh: string;
  ma_tctd_hn: string;
  ma_loaikh: string;
  ma_pban: string;
  ma_donvi_pban: string;
  ten_khanh: string;
  ten_tat: string;
  dia_chi: string;
  dia_chi_eng: string;
  so_cmnd: string;
  ngay_cap?: dayjs.Dayjs;
  noi_cap: string;
  email: string;
  tel: string;
  fax: string;
  ma_nhang_qly: string;
  ngan_hang: string;
  tk_vnd: string;
  tk_usd: string;
  giam_doc: string;
  rating: string;
  ngung_su_dung: boolean;
  thue: boolean;
  can_bo: boolean;
  dai_ly: boolean;
  phong_ban: boolean;
  doi_tru: boolean;
  van_phong_khu_vuc: boolean;
  moi_gioi: boolean;
  view_all: boolean;
}

interface SearchValues {
  ma_kh?: string;
  ten_kh?: string;
  don_vi?: string;
  ma_nhkh?: string;
  status?: 'all' | 'active' | 'inactive';
}

const CURRENT_UNIT: string = '01';
const HAS_SPECIAL_PERMISSION = false;

const breadcrumbItems: BreadcrumbItem[] = [
  { key: 'home', title: 'Trang chủ' },
  { key: 'module', title: 'Từ điển' },
  { key: 'function', title: 'Danh mục khách hàng' },
];

const DON_VI_OPTIONS: SelectOption[] = [
  { value: '00', label: '00 - Tổng công ty' },
  { value: '01', label: '01 - Hà Nội' },
  { value: '02', label: '02 - Hồ Chí Minh' },
  { value: '03', label: '03 - Đà Nẵng' },
];

const NKHTCTY_OPTIONS: SelectOption[] = [
  { value: 'TDOAN01', label: 'TDOAN01 - Khối doanh nghiệp nhà nước' },
  { value: 'TDOAN02', label: 'TDOAN02 - Khối tài chính ngân hàng' },
  { value: 'TDOAN03', label: 'TDOAN03 - Khối SME' },
];

const NHOM_KH_OPTIONS: SelectOption[] = [
  { value: 'N01', label: 'N01 - Khách doanh nghiệp' },
  { value: 'N05', label: 'N05 - Khách cá nhân VIP' },
  { value: 'N12', label: 'N12 - Hệ thống Bảo lãnh viện phí' },
];

const TCTD_OPTIONS: SelectOption[] = [
  { value: 'TCTD01', label: 'TCTD01 - BIDV' },
  { value: 'TCTD02', label: 'TCTD02 - Vietcombank' },
  { value: 'TCTD03', label: 'TCTD03 - Techcombank' },
];

const LOAI_KH_OPTIONS: SelectOption[] = [
  { value: 'TBH-A', label: 'TBH-A - Đại lý cá nhân' },
  { value: 'TBH-B', label: 'TBH-B - Đại lý tổ chức' },
  { value: 'TBH-C', label: 'TBH-C - Môi giới' },
];

const PBAN_OPTIONS: SelectOption[] = [
  { value: 'KD', label: 'KD - Kinh doanh' },
  { value: 'BT', label: 'BT - Bồi thường' },
  { value: 'KT', label: 'KT - Kế toán' },
];

const BANK_OPTIONS: SelectOption[] = [
  { value: 'VCB', label: 'VCB - Vietcombank' },
  { value: 'BIDV', label: 'BIDV - BIDV' },
  { value: 'TCB', label: 'TCB - Techcombank' },
];

const RATING_OPTIONS: SelectOption[] = [
  { value: 'A', label: 'A - Ưu tiên cao' },
  { value: 'B', label: 'B - Bình thường' },
  { value: 'C', label: 'C - Theo dõi' },
];

const mockCustomers: CustomerRecord[] = [
  {
    id: '1',
    ma_kh: '01.R0000001',
    ten_kh: 'Công ty CP Xây dựng Bình Minh',
    ma_nkhtcty: 'TDOAN01',
    ma_nhkh: 'N01',
    ma_pban: 'KD',
    ma_donvi_pban: '01',
    ten_khanh: 'Binh Minh Construction JSC',
    ten_tat: 'BINH MINH',
    maso_vat: '0101234567',
    dia_chi: '12 Trần Duy Hưng, Cầu Giấy, Hà Nội',
    dia_chi_eng: '12 Tran Duy Hung, Cau Giay, Hanoi',
    tel: '024 3788 6688',
    fax: '024 3788 6699',
    so_cmnd: '',
    ngay_cap: undefined,
    noi_cap: '',
    email: 'contact@binhminh.vn',
    ma_nhang_qly: 'VCB',
    ngan_hang: 'Ngân hàng TMCP Ngoại thương Việt Nam',
    tk_vnd: '0011008899001',
    tk_usd: '0011008899USD',
    giam_doc: 'Nguyễn Minh Tuấn',
    ma_tctd_hn: 'TCTD01',
    ma_loaikh: '',
    rating: 'A',
    view_all: false,
    ngung_su_dung: false,
    thue: true,
    can_bo: false,
    dai_ly: false,
    phong_ban: false,
    doi_tru: false,
    van_phong_khu_vuc: false,
    moi_gioi: false,
    lockedByUsage: false,
    ten_donvi: 'Hà Nội',
  },
  {
    id: '2',
    ma_kh: '01.R0000002',
    ten_kh: 'Nguyễn Thị Hồng',
    ma_nkhtcty: 'TDOAN03',
    ma_nhkh: 'N05',
    ma_pban: 'BT',
    ma_donvi_pban: '01',
    ten_khanh: 'Nguyen Thi Hong',
    ten_tat: 'NTHONG',
    maso_vat: '',
    dia_chi: '28 Nguyễn Chí Thanh, Đống Đa, Hà Nội',
    dia_chi_eng: '28 Nguyen Chi Thanh, Dong Da, Hanoi',
    tel: '0904123456',
    fax: '',
    so_cmnd: '001184009988',
    ngay_cap: '2022-03-14',
    noi_cap: 'Cục CSQLHC',
    email: 'hong.nt@example.com',
    ma_nhang_qly: 'BIDV',
    ngan_hang: 'Ngân hàng BIDV',
    tk_vnd: '1251000078899',
    tk_usd: '',
    giam_doc: '',
    ma_tctd_hn: '',
    ma_loaikh: '',
    rating: 'B',
    view_all: false,
    ngung_su_dung: false,
    thue: false,
    can_bo: true,
    dai_ly: false,
    phong_ban: false,
    doi_tru: false,
    van_phong_khu_vuc: false,
    moi_gioi: false,
    lockedByUsage: true,
    ten_donvi: 'Hà Nội',
  },
  {
    id: '3',
    ma_kh: '00.R5900011',
    ten_kh: 'Công ty Môi giới An Phát',
    ma_nkhtcty: 'TDOAN02',
    ma_nhkh: 'N01',
    ma_pban: 'KD',
    ma_donvi_pban: '00',
    ten_khanh: 'An Phat Broker',
    ten_tat: 'ANPHAT',
    maso_vat: '0109995555',
    dia_chi: '45 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội',
    dia_chi_eng: '45 Ly Thuong Kiet, Hoan Kiem, Hanoi',
    tel: '024 3939 8888',
    fax: '',
    so_cmnd: '',
    ngay_cap: undefined,
    noi_cap: '',
    email: 'broker@anphat.vn',
    ma_nhang_qly: 'VCB',
    ngan_hang: 'Ngân hàng TMCP Ngoại thương Việt Nam',
    tk_vnd: '991100000011',
    tk_usd: '991100000011USD',
    giam_doc: 'Phạm Đức Long',
    ma_tctd_hn: 'TCTD02',
    ma_loaikh: 'TBH-C',
    rating: 'A',
    view_all: true,
    ngung_su_dung: false,
    thue: false,
    can_bo: false,
    dai_ly: false,
    phong_ban: false,
    doi_tru: false,
    van_phong_khu_vuc: false,
    moi_gioi: true,
    lockedByUsage: false,
    ten_donvi: 'Tổng công ty',
  },
  {
    id: '4',
    ma_kh: '010000LEG01',
    ten_kh: 'Khách legacy chuyển đổi',
    ma_nkhtcty: 'TDOAN01',
    ma_nhkh: 'N01',
    ma_pban: 'KT',
    ma_donvi_pban: '01',
    ten_khanh: 'Legacy Customer',
    ten_tat: 'LEGACY',
    maso_vat: '0105551212',
    dia_chi: '88 Phạm Hùng, Nam Từ Liêm, Hà Nội',
    dia_chi_eng: '88 Pham Hung, Nam Tu Liem, Hanoi',
    tel: '024 3555 1122',
    fax: '',
    so_cmnd: '',
    ngay_cap: undefined,
    noi_cap: '',
    email: 'legacy@example.com',
    ma_nhang_qly: 'TCB',
    ngan_hang: 'Ngân hàng Techcombank',
    tk_vnd: '190300001212',
    tk_usd: '',
    giam_doc: 'Vũ Đức Anh',
    ma_tctd_hn: '',
    ma_loaikh: '',
    rating: 'C',
    view_all: false,
    ngung_su_dung: true,
    thue: true,
    can_bo: false,
    dai_ly: false,
    phong_ban: false,
    doi_tru: false,
    van_phong_khu_vuc: false,
    moi_gioi: false,
    lockedByUsage: false,
    ten_donvi: 'Hà Nội',
  },
  {
    id: '5',
    ma_kh: '01.R0000005',
    ten_kh: 'Phòng Kinh doanh Nội bộ',
    ma_nkhtcty: 'TDOAN01',
    ma_nhkh: 'N01',
    ma_pban: 'KD',
    ma_donvi_pban: '01',
    ten_khanh: '',
    ten_tat: 'PKDNB',
    maso_vat: '',
    dia_chi: 'Tầng 8 tòa PVI, Hà Nội',
    dia_chi_eng: '',
    tel: '024 3733 5588',
    fax: '',
    so_cmnd: '',
    ngay_cap: undefined,
    noi_cap: '',
    email: '',
    ma_nhang_qly: '',
    ngan_hang: '',
    tk_vnd: '',
    tk_usd: '',
    giam_doc: '',
    ma_tctd_hn: '',
    ma_loaikh: '',
    rating: 'B',
    view_all: false,
    ngung_su_dung: false,
    thue: false,
    can_bo: false,
    dai_ly: false,
    phong_ban: true,
    doi_tru: false,
    van_phong_khu_vuc: false,
    moi_gioi: false,
    lockedByUsage: false,
    ten_donvi: 'Hà Nội',
  },
];

function findOptionLabel(options: SelectOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function canEditRecord(record: CustomerRecord) {
  if (record.view_all && CURRENT_UNIT !== '00') {
    return { allowed: false, reason: 'Bản ghi dùng chung toàn hệ thống chỉ cho phép đơn vị 00 chỉnh sửa.' };
  }
  if (!record.ma_kh.includes('.R')) {
    return { allowed: false, reason: 'Mã khách legacy không chứa ".R" chỉ được xem, không được sửa.' };
  }
  return { allowed: true };
}

function canDeleteRecord(record: CustomerRecord) {
  const editable = canEditRecord(record);
  if (!editable.allowed) {
    return editable;
  }
  if (record.lockedByUsage) {
    return { allowed: false, reason: 'Khách hàng đã phát sinh nghiệp vụ nên không được xóa.' };
  }
  return { allowed: true };
}

function toFormValues(record: CustomerRecord): CustomerFormValues {
  return {
    ma_kh: record.ma_kh,
    don_vi: record.ma_donvi_pban,
    ma_nkhtcty: record.ma_nkhtcty,
    ten_kh: record.ten_kh,
    maso_vat: record.maso_vat,
    ma_nhkh: record.ma_nhkh,
    ma_tctd_hn: record.ma_tctd_hn,
    ma_loaikh: record.ma_loaikh,
    ma_pban: record.ma_pban,
    ma_donvi_pban: record.ma_donvi_pban,
    ten_khanh: record.ten_khanh,
    ten_tat: record.ten_tat,
    dia_chi: record.dia_chi,
    dia_chi_eng: record.dia_chi_eng,
    so_cmnd: record.so_cmnd,
    ngay_cap: record.ngay_cap ? dayjs(record.ngay_cap) : undefined,
    noi_cap: record.noi_cap,
    email: record.email,
    tel: record.tel,
    fax: record.fax,
    ma_nhang_qly: record.ma_nhang_qly,
    ngan_hang: record.ngan_hang,
    tk_vnd: record.tk_vnd,
    tk_usd: record.tk_usd,
    giam_doc: record.giam_doc,
    rating: record.rating,
    ngung_su_dung: record.ngung_su_dung,
    thue: record.thue,
    can_bo: record.can_bo,
    dai_ly: record.dai_ly,
    phong_ban: record.phong_ban,
    doi_tru: record.doi_tru,
    van_phong_khu_vuc: record.van_phong_khu_vuc,
    moi_gioi: record.moi_gioi,
    view_all: record.view_all,
  };
}

function getDefaultFormValues(): CustomerFormValues {
  return {
    ma_kh: `${CURRENT_UNIT}.R`,
    don_vi: CURRENT_UNIT,
    ma_nkhtcty: '',
    ten_kh: '',
    maso_vat: '',
    ma_nhkh: '',
    ma_tctd_hn: '',
    ma_loaikh: '',
    ma_pban: '',
    ma_donvi_pban: CURRENT_UNIT,
    ten_khanh: '',
    ten_tat: '',
    dia_chi: '',
    dia_chi_eng: '',
    so_cmnd: '',
    ngay_cap: undefined,
    noi_cap: '',
    email: '',
    tel: '',
    fax: '',
    ma_nhang_qly: '',
    ngan_hang: '',
    tk_vnd: '',
    tk_usd: '',
    giam_doc: '',
    rating: '',
    ngung_su_dung: false,
    thue: false,
    can_bo: false,
    dai_ly: false,
    phong_ban: false,
    doi_tru: false,
    van_phong_khu_vuc: false,
    moi_gioi: false,
    view_all: false,
  };
}

export function CustomerMasterPage() {
  const { message } = App.useApp();
  const [searchForm] = Form.useForm<SearchValues>();
  const [detailForm] = Form.useForm<CustomerFormValues>();
  const [customers, setCustomers] = useState<CustomerRecord[]>(mockCustomers);
  const [selectedId, setSelectedId] = useState<string>(mockCustomers[0]?.id ?? '');
  const [filters, setFilters] = useState<SearchValues>({ status: 'all' });
  const [showSearchCard, setShowSearchCard] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('add');
  const [editingId, setEditingId] = useState<string | null>(null);

  const selectedRecord = useMemo(
    () => customers.find((record) => record.id === selectedId) ?? null,
    [customers, selectedId],
  );

  const filteredCustomers = useMemo(() => {
    return customers.filter((record) => {
      if (filters.ma_kh && !record.ma_kh.toLowerCase().includes(filters.ma_kh.toLowerCase())) return false;
      if (filters.ten_kh && !record.ten_kh.toLowerCase().includes(filters.ten_kh.toLowerCase())) return false;
      if (filters.don_vi && record.ma_donvi_pban !== filters.don_vi) return false;
      if (filters.ma_nhkh && record.ma_nhkh !== filters.ma_nhkh) return false;
      if (filters.status === 'active' && record.ngung_su_dung) return false;
      if (filters.status === 'inactive' && !record.ngung_su_dung) return false;
      return true;
    });
  }, [customers, filters]);

  const watchedMaKh = Form.useWatch('ma_kh', detailForm);
  const watchedMaNhkh = Form.useWatch('ma_nhkh', detailForm);
  const needLoaiKh = watchedMaKh?.startsWith('00.R59') || watchedMaKh?.startsWith('00.R49');

  const columns: ColumnsType<CustomerRecord> = [
    {
      title: 'Mã khách hàng',
      dataIndex: 'ma_kh',
      fixed: 'left',
      width: 150,
      render: (_, record) => (
        <Space size={[6, 6]} wrap>
          <Typography.Text strong>{record.ma_kh}</Typography.Text>
          {record.view_all ? <Tag color="gold">Dùng chung</Tag> : null}
          {!record.ma_kh.includes('.R') ? <Tag color="volcano">Legacy</Tag> : null}
          {record.lockedByUsage ? <Tag color="blue">Đã dùng</Tag> : null}
        </Space>
      ),
    },
    { title: 'Tên khách hàng', dataIndex: 'ten_kh', width: 280, fixed: 'left' },
    { title: 'Mã N.KH TĐ', dataIndex: 'ma_nkhtcty', width: 120 },
    { title: 'Mã nhóm khách', dataIndex: 'ma_nhkh', width: 120 },
    { title: 'Mã phòng ban', dataIndex: 'ma_pban', width: 110 },
    {
      title: 'Thuộc đơn vị',
      dataIndex: 'ma_donvi_pban',
      width: 160,
      render: (value: string) => findOptionLabel(DON_VI_OPTIONS, value),
    },
    { title: 'Tên tiếng Anh', dataIndex: 'ten_khanh', width: 220 },
    { title: 'Tên viết tắt', dataIndex: 'ten_tat', width: 140 },
    { title: 'Mã số VAT', dataIndex: 'maso_vat', width: 140 },
    { title: 'Địa chỉ', dataIndex: 'dia_chi', width: 260 },
    { title: 'Điện thoại', dataIndex: 'tel', width: 130 },
    { title: 'Số CMTND', dataIndex: 'so_cmnd', width: 140 },
    {
      title: 'Ngày cấp',
      dataIndex: 'ngay_cap',
      width: 120,
      render: (value?: string) => (value ? dayjs(value).format('DD/MM/YYYY') : ''),
    },
    { title: 'Mã ngân hàng', dataIndex: 'ma_nhang_qly', width: 120 },
    { title: 'Ngân hàng', dataIndex: 'ngan_hang', width: 220 },
    { title: 'Số TK VNĐ', dataIndex: 'tk_vnd', width: 160 },
    { title: 'Số TK ngoại tệ', dataIndex: 'tk_usd', width: 160 },
    { title: 'Tên giám đốc', dataIndex: 'giam_doc', width: 180 },
    {
      title: 'Trạng thái',
      dataIndex: 'ngung_su_dung',
      fixed: 'right',
      width: 130,
      render: (value: boolean) => <Tag color={value ? 'default' : 'green'}>{value ? 'Ngừng sử dụng' : 'Đang hoạt động'}</Tag>,
    },
  ];

  const openAddModal = () => {
    setFormMode('add');
    setEditingId(null);
    detailForm.setFieldsValue(getDefaultFormValues());
    setModalOpen(true);
  };

  const openEditModal = () => {
    if (!selectedRecord) {
      message.warning('Chọn một khách hàng trước khi sửa.');
      return;
    }
    const access = canEditRecord(selectedRecord);
    if (!access.allowed) {
      message.error(access.reason);
      return;
    }
    setFormMode('edit');
    setEditingId(selectedRecord.id);
    detailForm.setFieldsValue(toFormValues(selectedRecord));
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (!selectedRecord) {
      message.warning('Chọn một khách hàng trước khi xóa.');
      return;
    }
    const access = canDeleteRecord(selectedRecord);
    if (!access.allowed) {
      message.error(access.reason);
      return;
    }
    Modal.confirm({
      title: `Xóa khách hàng ${selectedRecord.ma_kh}`,
      content: 'Mockup sẽ xóa bản ghi khỏi lưới và cập nhật trạng thái ngay trên giao diện.',
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: () => {
        setCustomers((prev) => prev.filter((item) => item.id !== selectedRecord.id));
        setSelectedId((prev) => {
          if (prev !== selectedRecord.id) return prev;
          const next = customers.find((item) => item.id !== selectedRecord.id);
          return next?.id ?? '';
        });
        message.success('Đã xóa bản ghi mockup.');
      },
    });
  };

  const handleSearch = () => {
    const values = searchForm.getFieldsValue();
    setFilters({
      ma_kh: values.ma_kh?.trim(),
      ten_kh: values.ten_kh?.trim(),
      don_vi: values.don_vi,
      ma_nhkh: values.ma_nhkh,
      status: values.status ?? 'all',
    });
  };

  const handleResetFilters = () => {
    searchForm.resetFields();
    const defaultFilters = { status: 'all' as const };
    searchForm.setFieldsValue(defaultFilters);
    setFilters(defaultFilters);
  };

  const handleSave = async () => {
    try {
      const values = await detailForm.validateFields();
      const maKh = values.ma_kh.trim().toUpperCase();
      const vat = values.maso_vat.trim();
      if (!maKh.includes('.R')) {
        detailForm.setFields([{ name: 'ma_kh', errors: ['Mã khách hàng phải chứa chuỗi ".R".'] }]);
        return;
      }
      if (maKh.length !== 11) {
        detailForm.setFields([{ name: 'ma_kh', errors: ['Mã khách hàng phải đúng 11 ký tự.'] }]);
        return;
      }
      if (!maKh.startsWith(CURRENT_UNIT)) {
        detailForm.setFields([{ name: 'ma_kh', errors: [`2 ký tự đầu phải bằng mã đơn vị hiện tại (${CURRENT_UNIT}).`] }]);
        return;
      }
      if ((maKh.startsWith('00.R59') || maKh.startsWith('00.R49')) && !values.ma_loaikh) {
        detailForm.setFields([{ name: 'ma_loaikh', errors: ['Bắt buộc nhập Mã loại KH TBH cho nhóm mã 00.R59/00.R49.'] }]);
        return;
      }
      if (CURRENT_UNIT !== '00' && values.ma_nhkh === 'N12') {
        detailForm.setFields([{ name: 'ma_nhkh', errors: ['Đơn vị hiện tại không được nhập nhóm khách N12.'] }]);
        message.error('Không được nhập danh mục khách hàng của hệ thống Bảo lãnh viện phí.');
        return;
      }
      const duplicateCode = customers.find((item) => item.ma_kh === maKh && item.id !== editingId);
      if (duplicateCode) {
        detailForm.setFields([{ name: 'ma_kh', errors: ['Mã khách hàng đã tồn tại.'] }]);
        return;
      }
      if (vat) {
        const duplicateVat = customers.find((item) => item.maso_vat === vat && item.id !== editingId);
        if (duplicateVat) {
          detailForm.setFields([{ name: 'maso_vat', errors: ['Mã số VAT đã tồn tại.'] }]);
          return;
        }
      }

      const nextRecord: CustomerRecord = {
        id: editingId ?? `new-${Date.now()}`,
        ma_kh: maKh,
        ten_kh: values.ten_kh.trim(),
        ma_nkhtcty: values.ma_nkhtcty.trim(),
        ma_nhkh: values.ma_nhkh,
        ma_pban: values.ma_pban,
        ma_donvi_pban: values.don_vi,
        ten_khanh: values.ten_khanh.trim(),
        ten_tat: values.ten_tat.trim(),
        maso_vat: vat,
        dia_chi: values.dia_chi.trim(),
        dia_chi_eng: values.dia_chi_eng.trim(),
        tel: values.tel.trim(),
        fax: values.fax.trim(),
        so_cmnd: values.so_cmnd.trim(),
        ngay_cap: values.ngay_cap ? values.ngay_cap.format('YYYY-MM-DD') : undefined,
        noi_cap: values.noi_cap.trim(),
        email: values.email.trim(),
        ma_nhang_qly: values.ma_nhang_qly,
        ngan_hang: values.ngan_hang.trim(),
        tk_vnd: values.tk_vnd.trim(),
        tk_usd: values.tk_usd.trim(),
        giam_doc: values.giam_doc.trim(),
        ma_tctd_hn: values.ma_tctd_hn,
        ma_loaikh: values.ma_loaikh,
        rating: values.rating,
        view_all: values.view_all,
        ngung_su_dung: values.ngung_su_dung,
        thue: values.thue,
        can_bo: values.can_bo,
        dai_ly: values.dai_ly,
        phong_ban: values.phong_ban,
        doi_tru: values.doi_tru,
        van_phong_khu_vuc: values.van_phong_khu_vuc,
        moi_gioi: values.moi_gioi,
        lockedByUsage: formMode === 'edit' ? selectedRecord?.lockedByUsage ?? false : false,
        ten_donvi: findOptionLabel(DON_VI_OPTIONS, values.don_vi),
      };

      setCustomers((prev) => (formMode === 'edit' ? prev.map((item) => (item.id === editingId ? nextRecord : item)) : [nextRecord, ...prev]));
      setSelectedId(nextRecord.id);
      setModalOpen(false);
      message.success(formMode === 'edit' ? 'Đã cập nhật bản ghi mockup.' : 'Đã thêm mới bản ghi mockup.');
    } catch {
      message.warning('Biểu mẫu còn thiếu thông tin hoặc chưa đúng rule nghiệp vụ.');
    }
  };

  return (
    <>
      <PageHeader
        title="Danh mục khách hàng"
        subtitle="Mockup chuyển đổi từ WinForms sang SPA cho route Từ điển → Danh mục khách hàng, giữ cấu trúc list + popup và các rule UI trọng yếu."
        breadcrumbItems={breadcrumbItems}
        extra={
          <Space size="large">
            <Statistic title="Đơn vị hiện tại" value={CURRENT_UNIT} />
            <Statistic title="Bản ghi đang hiển thị" value={filteredCustomers.length} />
          </Space>
        }
      />


      {showSearchCard ? (
      <SearchCard title="Điều kiện lọc danh mục khách hàng">
        <Form form={searchForm} layout="vertical" initialValues={{ status: 'all' }}>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12} xl={5}><Form.Item name="ma_kh" label="Mã khách"><Input placeholder="Nhập mã khách hàng" /></Form.Item></Col>
            <Col xs={24} md={12} xl={7}><Form.Item name="ten_kh" label="Tên khách hàng"><Input placeholder="Nhập tên khách hàng" /></Form.Item></Col>
            <Col xs={24} md={12} xl={4}><Form.Item name="don_vi" label="Đơn vị"><Select allowClear showSearch placeholder="Chọn đơn vị" options={DON_VI_OPTIONS} optionFilterProp="label" /></Form.Item></Col>
            <Col xs={24} md={12} xl={4}><Form.Item name="ma_nhkh" label="Nhóm khách"><Select allowClear showSearch placeholder="Chọn nhóm khách" options={NHOM_KH_OPTIONS} optionFilterProp="label" /></Form.Item></Col>
            <Col xs={24} md={24} xl={4}>
              <Form.Item name="status" label="Trạng thái">
                <Radio.Group className="w-full">
                  <Space direction="vertical">
                    <Radio value="all">Tất cả</Radio>
                    <Radio value="active">Đang hoạt động</Radio>
                    <Radio value="inactive">Ngừng sử dụng</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-4">
            <Button type="primary" icon={<Search size={16} />} onClick={handleSearch}>Tìm kiếm</Button>
            <Button icon={<RotateCcw size={16} />} onClick={handleResetFilters}>Làm mới</Button>
          </div>
        </Form>
      </SearchCard>
      ) : null}

      <ActionToolbar
        actions={[
          {
            key: 'toggle-search',
            label: showSearchCard ? 'Ẩn tìm kiếm' : 'Tìm kiếm',
            icon: <Search size={16} />,
            onClick: () => setShowSearchCard((prev) => !prev),
          },
          { key: 'add', label: 'Thêm mới', type: 'primary', icon: <Plus size={16} />, onClick: openAddModal },
          { key: 'edit', label: 'Sửa', icon: <Pencil size={16} />, onClick: openEditModal },
          { key: 'delete', label: 'Xóa', danger: true, icon: <Trash2 size={16} />, onClick: handleDelete },
          {
            key: 'refresh',
            label: 'Làm mới',
            icon: <RotateCcw size={16} />,
            onClick: () => {
              setCustomers(mockCustomers);
              setSelectedId(mockCustomers[0]?.id ?? '');
              message.success('Đã nạp lại dữ liệu mock ban đầu.');
            },
          },
        ]}
      />

      <Card className="rounded-2xl shadow-panel">
        <Space direction="vertical" size="middle" className="w-full">
          <Alert
            type="info"
            showIcon
            message="Rule UI đang được mock"
            description="Sửa/xóa sẽ bị chặn với bản ghi dùng chung khi không thuộc đơn vị 00, bản ghi legacy không chứa .R và bản ghi đã phát sinh nghiệp vụ. Khi lưu popup sẽ kiểm tra mã khách, VAT, prefix đơn vị và các rule đặc thù 00.R59/00.R49, N12."
          />
          <Table<CustomerRecord>
            size="small"
            rowKey="id"
            columns={columns}
            dataSource={filteredCustomers}
            pagination={{ pageSize: 8, showSizeChanger: false }}
            scroll={{ x: 'max-content' }}
            rowSelection={{ type: 'radio', selectedRowKeys: selectedId ? [selectedId] : [], onChange: (keys) => setSelectedId((keys[0] as string) ?? '') }}
            onRow={(record) => ({
              onClick: () => setSelectedId(record.id),
              onDoubleClick: () => {
                setSelectedId(record.id);
                const access = canEditRecord(record);
                if (access.allowed) {
                  setFormMode('edit');
                  setEditingId(record.id);
                  detailForm.setFieldsValue(toFormValues(record));
                  setModalOpen(true);
                } else {
                  message.warning(access.reason);
                }
              },
            })}
          />
        </Space>
      </Card>

      <Modal
        title={formMode === 'add' ? 'Thêm mới khách hàng' : 'Chỉnh sửa khách hàng'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSave}
        okText={formMode === 'add' ? 'Lưu' : 'Cập nhật'}
        cancelText="Hủy"
        width={1080}
        destroyOnHidden
      >
        <Space direction="vertical" size="middle" className="mt-4 flex w-full">
          <Alert
            type="warning"
            showIcon
            message="Validation bám sát mô tả nghiệp vụ"
            description="Bắt buộc: Mã khách hàng, Tên khách hàng, Mã khách thuộc Tập đoàn. Mã khách phải chứa .R, dài đúng 11 ký tự và bắt đầu bằng mã đơn vị hiện tại. Nhóm mã 00.R59/00.R49 bắt buộc có Mã loại KH TBH."
          />
          {!HAS_SPECIAL_PERMISSION && formMode === 'edit' ? <Alert type="info" showIcon message="Quyền hiện tại" description="User mock không có quyền đặc biệt nên trường Đơn vị đang bị khóa trong chế độ sửa." /> : null}
          {watchedMaNhkh === 'N12' && CURRENT_UNIT !== '00' ? <Alert type="error" showIcon message="Rule nhóm khách N12" description="Đơn vị hiện tại khác 00 nên không được lưu khách hàng thuộc nhóm N12." /> : null}

          <Form form={detailForm} layout="vertical">
            <Card className="rounded-2xl shadow-panel" title="Thông tin chính">
              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item name="ma_kh" label="Mã khách hàng" rules={[{ required: true, message: 'Bắt buộc nhập Mã khách hàng.' }, { max: 11, message: 'Tối đa 11 ký tự.' }]}>
                    <Input
                      maxLength={11}
                      disabled={formMode === 'edit' && Boolean(selectedRecord?.lockedByUsage)}
                      onChange={(event) => detailForm.setFieldValue('ma_kh', event.target.value.toUpperCase())}
                      placeholder="Ví dụ: 01.R0000001"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}><Form.Item name="don_vi" label="Đơn vị"><Select showSearch options={DON_VI_OPTIONS} optionFilterProp="label" disabled={formMode === 'edit' && !HAS_SPECIAL_PERMISSION} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item name="ma_nkhtcty" label="Mã khách thuộc Tập đoàn" rules={[{ required: true, message: 'Bắt buộc nhập mã khách thuộc Tập đoàn.' }]}><Select showSearch options={NKHTCTY_OPTIONS} optionFilterProp="label" placeholder="Chọn mã khách thuộc Tập đoàn" /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item name="ten_kh" label="Tên khách hàng" rules={[{ required: true, message: 'Bắt buộc nhập Tên khách hàng.' }]}><Input maxLength={150} placeholder="Nhập tên khách hàng" /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item name="maso_vat" label="Mã số VAT"><Input maxLength={20} placeholder="Nhập mã số VAT" /></Form.Item></Col>
                <Col xs={24} md={6}><Form.Item name="ma_nhkh" label="Mã nhóm KH"><Select showSearch options={NHOM_KH_OPTIONS} optionFilterProp="label" placeholder="Chọn nhóm khách" /></Form.Item></Col>
                <Col xs={24} md={6}><Form.Item name="ma_tctd_hn" label="Mã TCTD"><Select allowClear showSearch options={TCTD_OPTIONS} optionFilterProp="label" placeholder="Chọn TCTD" /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item name="ma_loaikh" label="Mã loại KH TBH" rules={needLoaiKh ? [{ required: true, message: 'Bắt buộc nhập Mã loại KH TBH.' }] : []}><Select allowClear showSearch options={LOAI_KH_OPTIONS} optionFilterProp="label" placeholder="Chọn loại khách TBH" /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item name="ma_pban" label="Mã phòng ban"><Select allowClear showSearch options={PBAN_OPTIONS} optionFilterProp="label" placeholder="Chọn phòng ban" /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item name="ma_donvi_pban" label="Thuộc đ/vị"><Select allowClear showSearch options={DON_VI_OPTIONS} optionFilterProp="label" placeholder="Chọn đơn vị" /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item name="ten_khanh" label="Tên tiếng Anh"><Input maxLength={100} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item name="ten_tat" label="Tên viết tắt"><Input maxLength={50} /></Form.Item></Col>
              </Row>
            </Card>

            <Card className="mt-4 rounded-2xl shadow-panel" title="Thông tin giấy tờ và liên hệ">
              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}><Form.Item name="dia_chi" label="Địa chỉ"><Input maxLength={200} /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item name="dia_chi_eng" label="Địa chỉ t.Anh"><Input maxLength={200} /></Form.Item></Col>
                <Col xs={24} md={8}><Form.Item name="so_cmnd" label="Số CMTND"><Input maxLength={50} /></Form.Item></Col>
                <Col xs={24} md={8}><Form.Item name="ngay_cap" label="Ngày cấp"><DatePicker className="w-full" format="DD/MM/YYYY" /></Form.Item></Col>
                <Col xs={24} md={8}><Form.Item name="noi_cap" label="Nơi cấp"><Input maxLength={50} /></Form.Item></Col>
                <Col xs={24} md={8}><Form.Item name="email" label="E-Mail"><Input maxLength={50} /></Form.Item></Col>
                <Col xs={24} md={8}><Form.Item name="tel" label="Điện thoại"><Input maxLength={50} /></Form.Item></Col>
                <Col xs={24} md={8}><Form.Item name="fax" label="Số Fax"><Input maxLength={50} /></Form.Item></Col>
              </Row>
            </Card>

            <Card className="mt-4 rounded-2xl shadow-panel" title="Ngân hàng">
              <Row gutter={[16, 0]}>
                <Col xs={24} md={8}><Form.Item name="ma_nhang_qly" label="Mã ngân hàng"><Select allowClear showSearch options={BANK_OPTIONS} optionFilterProp="label" placeholder="Chọn ngân hàng" /></Form.Item></Col>
                <Col xs={24} md={16}><Form.Item name="ngan_hang" label="Tên ngân hàng"><Input maxLength={100} /></Form.Item></Col>
                <Col xs={24} md={8}><Form.Item name="tk_vnd" label="Số TK VNĐ"><Input maxLength={50} /></Form.Item></Col>
                <Col xs={24} md={8}><Form.Item name="tk_usd" label="Số TK ngoại tệ"><Input maxLength={50} /></Form.Item></Col>
                <Col xs={24} md={8}><Form.Item name="giam_doc" label="Tên giám đốc"><Input maxLength={50} /></Form.Item></Col>
                <Col xs={24} md={8}><Form.Item name="rating" label="Rating"><Select allowClear showSearch options={RATING_OPTIONS} optionFilterProp="label" placeholder="Chọn rating" /></Form.Item></Col>
                <Col xs={24} md={8}><Form.Item name="ngung_su_dung" valuePropName="checked" label=" "><Checkbox>Ngừng sử dụng</Checkbox></Form.Item></Col>
              </Row>
            </Card>

            <Row gutter={[16, 16]} className="mt-4">
              <Col xs={24} md={12}>
                <Card className="rounded-2xl shadow-panel" title="Các mã liên quan">
                  <Form.Item name="thue" valuePropName="checked" className="!mb-3"><Checkbox>Thuế</Checkbox></Form.Item>
                  <Form.Item name="can_bo" valuePropName="checked" className="!mb-3"><Checkbox>Cán bộ</Checkbox></Form.Item>
                  <Form.Item name="dai_ly" valuePropName="checked" className="!mb-3"><Checkbox>Đại lý</Checkbox></Form.Item>
                  <Form.Item name="phong_ban" valuePropName="checked" className="!mb-3"><Checkbox>Phòng ban</Checkbox></Form.Item>
                  <Form.Item name="doi_tru" valuePropName="checked" className="!mb-3"><Checkbox>Đối trừ</Checkbox></Form.Item>
                  <Form.Item name="van_phong_khu_vuc" valuePropName="checked" className="!mb-3"><Checkbox>Văn phòng khu vực</Checkbox></Form.Item>
                  <Form.Item name="moi_gioi" valuePropName="checked" className="!mb-0"><Checkbox>Môi giới</Checkbox></Form.Item>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card className="rounded-2xl shadow-panel" title="Kiểu khách">
                  <Form.Item name="view_all" valuePropName="checked" className="!mb-0"><Checkbox disabled>Dùng chung toàn bộ các đơn vị</Checkbox></Form.Item>
                  <Typography.Paragraph type="secondary" className="!mb-0 !mt-3">Checkbox này được hiển thị để bám sát UI cũ nhưng vẫn khóa chỉnh sửa trực tiếp trong cả add và edit.</Typography.Paragraph>
                </Card>
              </Col>
            </Row>
          </Form>
        </Space>
      </Modal>
    </>
  );
}
