import { useState } from 'react';
import formatXml from 'xml-formatter';

const TYPE_TEXT = 'text';
const TYPE_XML = 'xml';
const TYPE_JSON = 'json';

const formatJson = (value) => JSON.stringify(JSON.parse(value), null, 4);

const useFormatter = () => {
    const [type, setType] = useState(TYPE_TEXT);
    const [hasError, setError] = useState(false);

    const resetError = () => {
        setError(false);
    };

    const changeType = (newType) => {
        resetError();
        setType(newType);
    };

    const format = (value) => {
        resetError();

        if (type === TYPE_TEXT) {
            return value;
        }

        const f = type === TYPE_XML ? formatXml : formatJson;

        try {
            return f(value);
        } catch {
            setError(true);
            return value;
        }
    };

    return { type, changeType, hasError, resetError, format };
};

export { useFormatter };
export { TYPE_TEXT, TYPE_XML, TYPE_JSON };
