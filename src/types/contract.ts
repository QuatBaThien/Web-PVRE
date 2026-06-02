export type ContractStatus = 'Hiệu lực' | 'Chờ duyệt' | 'Hết hạn' | 'Tạm khóa';

export interface InwardContract {
  id: string;
  branchCode: string;
  status: ContractStatus;
  lob: string;
  accountingDate: string;
  contractRef: string;
  policyNo: string;
  contractName: string;
  reinsurerCode: string;
  follower: string;
  riType: string;
  underwritingYear: number;
  inceptionDate: string;
  expiryDate: string;
  currency: string;
  sumInsured: number;
  premium: number;
  sharePercent: number;
  insuredName: string;
  netPremium: number;
  netPremiumVnd: number;
  hasClaims: boolean;
  hasBordereaux: boolean;
}

export interface InwardContractSearchForm {
  fromDate?: string;
  toDate?: string;
  lob?: string;
  contractRef?: string;
  contractName?: string;
  riType?: string;
  reinsurerCode?: string;
  hasClaims?: boolean;
  searchInBordereaux?: boolean;
}

export interface SourceRecord {
  id: string;
  sourceName: string;
  section: string;
  premium: number;
  status: string;
  effectiveDate: string;
}

export interface RetroRecord {
  id: string;
  retroProgram: string;
  retroType: string;
  participant: string;
  signedLine: number;
  writtenLine: number;
  amount: number;
  currency: string;
}
