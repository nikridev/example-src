import styled from '@emotion/styled';

import { theme } from '@ppm/shared/config';

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WrapperComplete = styled.div`
  width: 490px;
  margin-right: 10px;
`;

export const ButtonRemove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 16px;
  cursor: pointer;
  & svg {
    color: ${theme.palette.text.disabled};
    transform: rotate(45deg);
  }
`;

export const LabelField = styled.p`
  margin-bottom: 8px;
  color: ${theme.palette.text.secondary};
  font-size: 14px;
`;

export const RowTop = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const RowBottom = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

export const DatePickerWrapper = styled.div`
  width: 160px;
`;

export const ButtonWrapper = styled.div`
  margin: 0 0 16px 10px;
`;

export const ErrorMessage = styled.p`
  margin: -12px 0 16px 14px;
  color: ${theme.palette.error.main};
  font-size: 12px;
`;

export const NameElement = styled.p`
  margin: 0;
  font-size: 16px;
`;

export const CodeElement = styled.p`
  margin: 0;
  color: ${theme.palette.grey.A400};
`;
