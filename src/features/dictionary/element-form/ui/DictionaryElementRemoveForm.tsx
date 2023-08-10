import React from 'react';

import { Form, Button, Stack } from '@utils/ui-kit';

import { NameElement, CodeElement } from '../../styled';

interface Props {
  name: string;
  code: string;
  id: number;
  onCancel?: any;
  onSuccess?: any;
}

export function DictionaryElementRemoveForm(props: Props) {
  const { code, name, onSuccess, onCancel } = props;

  const handleSubmit = async () => {
    onSuccess();
  };

  return (
    <Form onSubmit={handleSubmit} formName="dictionaryElementsRemoveForm">
      <NameElement>{name}</NameElement>
      <CodeElement>{code}</CodeElement>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ marginTop: '24px' }}>
        <Button variant="contained" color="error" type="submit">
          Удалить
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Отменить
        </Button>
      </Stack>
    </Form>
  );
}
