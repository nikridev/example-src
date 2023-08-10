import { colors } from '@ppm/shared/config/theme';

export const statuses = {
  APPROVED: {
    label: 'Утвержден',
    color: colors.green[500],
  },
  ON_APPROVED: {
    label: 'На согласовании',
    color: colors.yellow[400],
  },
  CONFORM: {
    label: 'Согласован',
    color: colors.green[500],
  },
  CONFORM_EARLIER: {
    label: 'Согласован ранее',
    color: colors.green[500],
  },
  ARCHIVE: {
    label: 'Архив',
    color: colors.gray[600],
  },
  IN_DEVELOP: {
    label: 'В разработке',
    color: colors.gray[600],
  },
};
