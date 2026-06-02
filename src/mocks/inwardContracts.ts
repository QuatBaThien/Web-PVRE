import dayjs from 'dayjs';
import type { InwardContract } from '../types/contract';

const statuses: InwardContract['status'][] = ['Hiệu lực', 'Chờ duyệt', 'Hết hạn', 'Tạm khóa'];
const lobs = ['Marine', 'Property', 'Engineering', 'Motor', 'Health'];
const riTypes = ['Treaty', 'Facultative', 'Quota Share', 'Surplus'];
const companies = ['HNR', 'PVI', 'VINARE', 'KIC', 'KORE'];
const followers = ['Lead', 'Follower A', 'Follower B', 'Follower C'];
const currencies = ['USD', 'VND', 'EUR'];
const insureds = ['Tổng Công ty Dầu khí', 'Nhà máy điện Phả Lại', 'Cảng Hải Phòng', 'Nhà máy xi măng Bỉm Sơn', 'PV Trans'];

export const inwardContractsMock: InwardContract[] = Array.from({ length: 100 }, (_, index) => {
  const seq = index + 1;
  const premium = 12000 + seq * 875;
  const currency = currencies[index % currencies.length];
  const start = dayjs('2025-01-01').add(index * 7, 'day');
  const sharePercent = 5 + (index % 8) * 2.5;
  const netPremium = premium * (sharePercent / 100);

  return {
    id: `IC-${String(seq).padStart(4, '0')}`,
    branchCode: `DV${String((seq % 12) + 1).padStart(2, '0')}`,
    status: statuses[index % statuses.length],
    lob: lobs[index % lobs.length],
    accountingDate: start.format('YYYY-MM-DD'),
    contractRef: `REF-${start.format('YY')}-${String(seq).padStart(5, '0')}`,
    policyNo: `POL-${String(10000 + seq)}`,
    contractName: `HĐ Nhận tái ${lobs[index % lobs.length]} ${seq}`,
    reinsurerCode: companies[index % companies.length],
    follower: followers[index % followers.length],
    riType: riTypes[index % riTypes.length],
    underwritingYear: 2024 + (index % 3),
    inceptionDate: start.format('YYYY-MM-DD'),
    expiryDate: start.add(1, 'year').subtract(1, 'day').format('YYYY-MM-DD'),
    currency,
    sumInsured: 5000000 + seq * 250000,
    premium,
    sharePercent,
    insuredName: insureds[index % insureds.length],
    netPremium,
    netPremiumVnd: netPremium * 25000,
    hasClaims: index % 3 === 0,
    hasBordereaux: index % 4 === 0,
  };
});
