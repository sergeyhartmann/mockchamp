import { useState } from 'react';

const useMockingRuleRemove = (id) => {
    const [removing, setRemoving] = useState(false);
    const [hasErrorOnRemove, setErrorOnRemove] = useState(false);

    const remove = async (successCallback = () => {}) => {
        try {
            setRemoving(true);

            const response = await fetch(`/__api/rule/${id}`, { method: 'DELETE' });
            if (response.status !== 200) {
                setErrorOnRemove(true);
                return;
            }

            successCallback();
        } catch (e) {
            console.error(e);
            setErrorOnRemove(true);
        } finally {
            setRemoving(false);
        }
    };

    return { remove, removing, hasErrorOnRemove };
};

export { useMockingRuleRemove };
