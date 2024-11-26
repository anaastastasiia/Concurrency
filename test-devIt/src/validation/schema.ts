import * as Yup from 'yup';

export const concurrencySchema = Yup.object({
  concurrency: Yup.number()
    .required('Field is required')
    .min(1, 'Minimum value is 1')
    .max(100, 'Maximum value is 100'),
});
