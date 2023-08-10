import styled from '@emotion/styled';
import React from 'react';
import {Column, Table} from '@utils/ui-kit';

import {ReactComponent as ArrowRightIcon} from '@ppm/shared/assets/icons/arrow_right_grey.svg';
import {getDatesRange} from '@ppm/shared/lib/dateRange';

import {DictionarySupplemented, TableHierarchyProps} from '../types';

const columns: Column<DictionarySupplemented>[] = [
    {
        Header: '№ и краткое наименование',
        accessor: (dataRow) => dataRow,
        Cell: ({
                   value: {shortName, isOpen, level},
               }: {
            value: { shortName: string; isOpen: boolean; level: number };
        }) => {
            return (
                <Element level={level} isOpen={isOpen}>
                    <ArrowRightIcon/>
                    {shortName}
                </Element>
            );
        },
    },
    {
        Header: 'Порядковый номер',
        accessor: 'orderNumber',
        Cell: ({value}) => value,
    },
    {
        Header: 'Код',
        accessor: 'code',
        Cell: ({value}) => value,
    },
    {
        Header: 'Срок действия',
        accessor: (dataRow) => dataRow,
        Cell: ({
                   value: {inclusionDate, exclusionDate},
               }: {
            value: { inclusionDate: string; exclusionDate: string };
        }) => {
            return getDatesRange(inclusionDate, exclusionDate);
        },
    },
];

export function DictionaryHierarchyElementsTable(props: TableHierarchyProps) {
    const {data, loading, rowAction, rowClick} = props;

    return (
        <Table
            tableName="hierarchy_elements"
            loading={loading}
            data={data}
            columns={columns}
            initialState={{
                sortBy: [{id: 'orderNumber', desc: false}],
                hiddenColumns: ['orderNumber'],
            }}
            variant="secondary"
            width="100%"
            rowAction={rowAction}
            onRowClick={(dataRow) => rowClick(dataRow)}
        />
    );
}

const Element = styled.div<{ level: number; isOpen: boolean }>`
  display: flex;
  margin-left: ${(props) => props.level * 20}px;

  & svg {
    margin-right: 10px;
    transform: rotate(${(props) => (props.isOpen ? '90deg' : '0deg')});
  }
`;
