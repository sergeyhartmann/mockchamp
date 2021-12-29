import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField } from '@mui/material';

const Tags = ({ options, value, onChange }) => {
    const handleTagsChange = (event, value) => {
        onChange(value);
    };

    return (
        <Autocomplete
            multiple
            freeSolo
            options={options}
            getOptionLabel={(option) => option}
            value={value}
            onChange={handleTagsChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Tags (optional)"
                    placeholder="Enter tag name and press Enter"
                />
            )}
        />
    );
};

Tags.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
};

Tags.defaultProps = {
    options: [],
    value: [],
    onChange: () => {},
};

export default Tags;
