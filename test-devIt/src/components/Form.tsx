import { useFormik } from 'formik';
import { ConcurrencyForm, FormProps } from '../types/types';
import './styles.css';

export const Form = ({ onSubmit, isRunning, schema }: FormProps) => {
    const formik = useFormik<ConcurrencyForm>({
        initialValues: {
            concurrency: 1
        } as ConcurrencyForm,
        validationSchema: schema,
        onSubmit: (values) => {
            onSubmit(values.concurrency);
        }
    });

    return (
        <div className="form-wrapper">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="concurrency">
                    Enter the concurrency from 1 to 100:
                </label>
                <input
                    id="concurrency"
                    type="number"
                    value={formik.values.concurrency}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={isRunning}
                    className={`input ${
                        formik.errors.concurrency && formik.touched.concurrency
                            ? 'input-error'
                            : ''
                    }`}
                />
                {formik.touched.concurrency && formik.errors.concurrency && (
                    <p className="error-text">{formik.errors.concurrency}</p>
                )}
                <button type="submit" disabled={isRunning} className="button">
                    {isRunning ? 'Sending in progress...' : 'Start'}
                </button>
            </form>
        </div>
    );
};
