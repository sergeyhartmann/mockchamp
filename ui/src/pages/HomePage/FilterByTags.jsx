import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip, Grid, IconButton } from '@mui/material';

const MAX_VISIBLE = 10;

const FilterByTags = ({ tags, onSelect }) => {
    const [flags, setFlags] = useState(tags.map(() => false));
    const [expanded, setExpanded] = useState(false);

    const clickHandler = (index) => {
        return () => {
            const flagsCopy = [...flags];
            flagsCopy[index] = !flagsCopy[index];
            setFlags(flagsCopy);

            onSelect(tags.filter((tag, index) => flagsCopy[index]));
        };
    };

    return (
        <Grid container alignItems="center" spacing={1}>
            {tags.slice(0, expanded ? tags.length : MAX_VISIBLE).map((tag, index) => (
                <Grid key={tag} item>
                    <Chip
                        variant="outlined"
                        color={flags[index] ? 'primary' : 'default'}
                        label={tag}
                        onClick={clickHandler(index)}
                    />
                </Grid>
            ))}

            {tags.length > MAX_VISIBLE && (
                <Grid item>
                    <IconButton size="small" onClick={() => setExpanded(!expanded)}>
                        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Grid>
            )}
        </Grid>
    );
};

FilterByTags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default FilterByTags;
