import type { RetroRecord } from '../types/contract';

const retroTypes = ['Retro TTY', 'Retro FAC'];
const participants = ['Swiss Re', 'Munich Re', 'Korean Re', 'SCOR'];

export const retroRecordsMock: RetroRecord[] = Array.from({ length: 16 }, (_, index) => ({
  id: `RET-${String(index + 1).padStart(3, '0')}`,
  retroProgram: `Chương trình Retro ${index + 1}`,
  retroType: retroTypes[index % retroTypes.length],
  participant: participants[index % participants.length],
  signedLine: 5 + index * 0.75,
  writtenLine: 7 + index * 0.9,
  amount: 9000 + index * 1250,
  currency: index % 2 === 0 ? 'USD' : 'VND',
}));
