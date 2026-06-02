import { useMemo, useState } from 'react';
import {
  App,
  Button,
  Checkbox,
  Col,
  Descriptions,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Typography,
  DatePicker,
} from 'antd';
import { Download, RotateCcw, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { PageHeader } from '../../components/common/PageHeader';
import { SearchCard } from '../../components/common/SearchCard';
import { LookupInput } from '../../components/form/LookupInput';
import { ContractTable } from '../../components/grid/ContractTable';
import { COMPANY_OPTIONS, LOB_OPTIONS, RI_TYPE_OPTIONS } from '../../utils/constants';
import { inwardContractsMock } from '../../mocks/inwardContracts';
import type { BreadcrumbItem } from '../../types/common';
import type { InwardContract, InwardContractSearchForm } from '../../types/contract';
import { formatCurrency, formatDate } from '../../utils/format';
import { StatusBadge } from '../../components/common/StatusBadge';

const breadcrumbItems: BreadcrumbItem[] = [
  { key: 'home', title: 'Trang chủ' },
  { key: 'module', title: 'Nghiệp vụ Tái bảo hiểm' },
  { key: 'function', title: 'Tra cứu hợp đồng nhận TBH' },
];

export function InwardContractList() {
  const [form] = Form.useForm<InwardContractSearchForm>();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [previewRecord, setPreviewRecord] = useState<InwardContract | null>(null);
  const [filters, setFilters] = useState<InwardContractSearchForm>({});

  const filteredContracts = useMemo(() => {
    return inwardContractsMock.filter((contract) => {
      const fromDate = filters.fromDate ? dayjs(filters.fromDate) : null;
      const toDate = filters.toDate ? dayjs(filters.toDate) : null;
      const accountingDate = dayjs(contract.accountingDate);

      if (fromDate && accountingDate.isBefore(fromDate, 'day')) return false;
      if (toDate && accountingDate.isAfter(toDate, 'day')) return false;
      if (filters.lob && contract.lob !== filters.lob) return false;
      if (filters.riType && contract.riType !== filters.riType) return false;
      if (filters.reinsurerCode && contract.reinsurerCode !== filters.reinsurerCode) return false;
      if (filters.contractRef && !contract.contractRef.toLowerCase().includes(filters.contractRef.toLowerCase())) return false;
      if (filters.contractName && !contract.contractName.toLowerCase().includes(filters.contractName.toLowerCase())) return false;
      if (filters.hasClaims && !contract.hasClaims) return false;
      if (filters.searchInBordereaux && !contract.hasBordereaux) return false;
      return true;
    });
  }, [filters]);

  const handleSearch = () => {
    const values = form.getFieldsValue();
    setFilters({
      ...values,
      fromDate: values.fromDate ? dayjs(values.fromDate).format('YYYY-MM-DD') : undefined,
      toDate: values.toDate ? dayjs(values.toDate).format('YYYY-MM-DD') : undefined,
    });
  };

  const handleReset = () => {
    form.resetFields();
    setFilters({});
    setSelectedRowKeys([]);
  };

  return (
    <>
      <PageHeader
        title="Tra cứu Hợp đồng Nhận Tái bảo hiểm"
        subtitle="Mô hình màn hình danh sách được tối ưu để chuyển đổi từ WinForms sang SPA với luồng tra cứu nhanh và mở rộng API sau này."
        breadcrumbItems={breadcrumbItems}
        extra={
          <Space>
            <Typography.Text type="secondary">Tổng số bản ghi:</Typography.Text>
            <Typography.Title level={4} className="!mb-0 !text-brand-primary">
              {filteredContracts.length}
            </Typography.Title>
          </Space>
        }
      />

      <SearchCard title="Điều kiện tìm kiếm">
        <Form form={form} layout="vertical" initialValues={{ hasClaims: false, searchInBordereaux: false }}>
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item name="fromDate" label="Từ ngày">
                <DatePicker className="w-full" format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item name="toDate" label="Đến ngày">
                <DatePicker className="w-full" format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <LookupInput name="lob" label="LOB" options={LOB_OPTIONS} placeholder="Chọn LOB" />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item name="contractRef" label="Contract Ref">
                <Input placeholder="Nhập Contract Ref" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Form.Item name="contractName" label="Contract Name">
                <Input placeholder="Nhập tên hợp đồng" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <LookupInput name="riType" label="R/I Type" options={RI_TYPE_OPTIONS} placeholder="Chọn loại nhận tái" />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <LookupInput name="reinsurerCode" label="Mã công ty TBH" options={COMPANY_OPTIONS} placeholder="Chọn công ty" />
            </Col>
            <Col xs={24} lg={6}>
              <div className="flex h-full flex-col justify-end gap-3 pb-6">
                <Form.Item name="hasClaims" valuePropName="checked" className="!mb-0">
                  <Checkbox>Đã phát sinh Claims</Checkbox>
                </Form.Item>
                <Form.Item name="searchInBordereaux" valuePropName="checked" className="!mb-0">
                  <Checkbox>Tìm kiếm trong Bordereaux</Checkbox>
                </Form.Item>
              </div>
            </Col>
          </Row>

          <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-4">
            <Button type="primary" icon={<Search size={16} />} onClick={handleSearch}>
              Tìm kiếm
            </Button>
            <Button icon={<RotateCcw size={16} />} onClick={handleReset}>
              Làm mới
            </Button>
            <Button
              icon={<Download size={16} />}
              onClick={() => message.success('Đã mô phỏng xuất Excel cho danh sách hợp đồng.')}
            >
              Xuất Excel
            </Button>
          </div>
        </Form>
      </SearchCard>

      <div className="rounded-2xl bg-white p-4 shadow-panel">
        <ContractTable
          dataSource={filteredContracts}
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={setSelectedRowKeys}
          onRowClick={setPreviewRecord}
          onRowDoubleClick={(record) => navigate(`/reinsurance/inward-contracts/${record.id}`)}
        />
      </div>

      <Drawer
        title="Xem nhanh hợp đồng"
        placement="right"
        width={420}
        open={Boolean(previewRecord)}
        onClose={() => setPreviewRecord(null)}
      >
        {previewRecord ? (
          <Space direction="vertical" size="large" className="w-full">
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="Contract Ref">{previewRecord.contractRef}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <StatusBadge status={previewRecord.status} />
              </Descriptions.Item>
              <Descriptions.Item label="Tên hợp đồng">{previewRecord.contractName}</Descriptions.Item>
              <Descriptions.Item label="Mã công ty TBH">{previewRecord.reinsurerCode}</Descriptions.Item>
              <Descriptions.Item label="Người được BH">{previewRecord.insuredName}</Descriptions.Item>
              <Descriptions.Item label="Thời hạn">
                {formatDate(previewRecord.inceptionDate)} - {formatDate(previewRecord.expiryDate)}
              </Descriptions.Item>
              <Descriptions.Item label="Premium">
                {formatCurrency(previewRecord.premium, previewRecord.currency)}
              </Descriptions.Item>
              <Descriptions.Item label="Phí Net VND">
                {formatCurrency(previewRecord.netPremiumVnd, 'VND')}
              </Descriptions.Item>
            </Descriptions>

            <Button type="primary" block onClick={() => navigate(`/reinsurance/inward-contracts/${previewRecord.id}`)}>
              Mở chi tiết hợp đồng
            </Button>
          </Space>
        ) : null}
      </Drawer>
    </>
  );
}
