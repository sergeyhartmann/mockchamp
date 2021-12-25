import { useState } from 'react';

const useFilterByTags = () => {
    const [selectedTags, setSelectedTags] = useState([]);

    const onSelectedTagChange = (value) => {
        setSelectedTags(value);
    };

    const filter = (rules) =>
        rules.filter((rule) => {
            if (selectedTags.length === 0) {
                return true;
            }

            for (const selectedTag of selectedTags) {
                if ((rule.tags || []).includes(selectedTag)) {
                    return true;
                }
            }

            return false;
        });

    return { filter, onSelectedTagChange };
};

export { useFilterByTags };
