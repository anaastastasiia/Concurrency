import { ObjectSchema } from "yup";

export type ConcurrencyForm = {
    concurrency: number
}

export type FormProps = {
    onSubmit: (values: number) => void;
    isRunning: boolean;
    schema: ObjectSchema<ConcurrencyForm>;
};

export const API_URL = 'http://localhost:3000'