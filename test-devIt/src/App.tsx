import { useState } from 'react';
import { Form } from './components/Form';
import { useConcurrencyStore } from './store/useConcurrencyStore';
import { concurrencySchema } from './validation/schema';
import './index.css';

function App() {
    const [isRunning, setIsRunning] = useState(false);
    const { sendConcurrency, clearData, result, errors } =
        useConcurrencyStore();

    const onSubmitForm = async (concurrency: number) => {
        setIsRunning(true);
        clearData();

        const maxRequests = 1000;
        let current = 0;
        let sent = 0;

        const interval = setInterval(() => {
            while (current < concurrency && sent < maxRequests) {
                current++;
                const index = ++sent;
                sendConcurrency(index).finally(() => {
                    current--;
                });
            }

            if (sent >= maxRequests && current === 0) {
                clearInterval(interval);
                setIsRunning(false);
            }
        }, 1000 / concurrency);
    };

    return (
        <div className="wrapper">
            <Form
                onSubmit={onSubmitForm}
                isRunning={isRunning}
                schema={concurrencySchema}
            />
            <div className="result-wrapper">
                <div>
                    <h2>Results:</h2>
                    <ul>
                        {result.map((result, i) => (
                            <li key={i}>Index received: {result}</li>
                        ))}
                    </ul>
                </div>
                {errors.length > 0 && (
                    <div>
                        <h2>Errors:</h2>
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
