import React from 'react';
import { Column } from 'react-table';

import { getDatesRange } from '@ppm/shared/lib/dateRange';
import { Table } from '@ppm/shared/ui';

import { DictionarySupplemented, TableLinearProps } from '../types';

const columns: Column<DictionarySupplemented>[] = [
  {
    Header: '№ и краткое наименование',
    accessor: 'shortName',
    Cell: ({ value }) => value,
  },
  {
    Header: 'Порядковый номер',
    accessor: 'orderNumber',
    Cell: ({ value }) => value,
  },
  {
    Header: 'Код',
    accessor: 'code',
    Cell: ({ value }) => value,
  },
  {
    Header: 'Срок действия',
    accessor: (dataRow) => dataRow,
    Cell: ({
      value: { inclusionDate, exclusionDate },
    }: {
      value: { inclusionDate: string; exclusionDate: string };
    }) => {
      return getDatesRange(inclusionDate, exclusionDate);
    },
  },
];

export function DictionaryLinearElementsTable(props: TableLinearProps) {
  const { data, loading, rowAction } = props;

  return (
    <Table
      tableName="linear_elements"
      loading={loading}
      data={data}
      columns={columns}
      variant="secondary"
      width="100%"
      initialState={{
        sortBy: [{ id: 'orderNumber', desc: false }],
        hiddenColumns: ['orderNumber'],
      }}
      rowAction={rowAction}
      onRowClick={(dataRow) => dataRow}
    />
  );
}
