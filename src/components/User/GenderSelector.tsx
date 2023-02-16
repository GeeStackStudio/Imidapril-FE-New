import React from 'react';
import {Select} from 'antd';
import {SelectProps} from 'antd/lib/select';
import {Gender} from '../../scaffold';

export default function GenderSelector(props: SelectProps<string>) {
  return (
    <Select {...props}>
      <Select.Option value={Gender.女}>{Gender.女}</Select.Option>
      <Select.Option value={Gender.男}>{Gender.男}</Select.Option>
    </Select>
  );
}
