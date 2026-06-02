import { Form, Select } from 'antd';
import type { SelectOption } from '../../types/common';

interface LookupInputProps {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
}

export function LookupInput({ name, label, options, placeholder }: LookupInputProps) {
  return (
    <Form.Item name={name} label={label}>
      <Select
        allowClear
        showSearch
        placeholder={placeholder}
        options={options}
        optionFilterProp="label"
      />
    </Form.Item>
  );
}
