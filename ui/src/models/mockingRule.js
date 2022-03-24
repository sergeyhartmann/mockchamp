import PropTypes from 'prop-types';

export const METHOD_ANY = 'ANY';
export const METHOD_GET = 'GET';
export const METHOD_HEAD = 'HEAD';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';
export const METHOD_PATCH = 'PATCH';
export const METHOD_DELETE = 'DELETE';
export const METHOD_CONNECT = 'CONNECT';
export const METHOD_OPTIONS = 'OPTIONS';
export const METHOD_TRACE = 'TRACE';

export const PATH_CONDITION_EXACT = 'exact';
export const PATH_CONDITION_START_WITH = 'startWith';
export const PATH_CONDITION_CONTAINS = 'contains';

export const PATH_CONDITION_EXACT_LABEL = 'Exactly';
export const PATH_CONDITION_START_WITH_LABEL = 'Start with';
export const PATH_CONDITION_CONTAINS_LABEL = 'Contains';

export const getPathConditionLabel = (pathCondition) => {
    switch (pathCondition) {
        case PATH_CONDITION_EXACT:
            return PATH_CONDITION_EXACT_LABEL;
        case PATH_CONDITION_START_WITH:
            return PATH_CONDITION_START_WITH_LABEL;
        case PATH_CONDITION_CONTAINS:
            return PATH_CONDITION_CONTAINS_LABEL;
        default:
            return 'Undefined';
    }
};

export const requestPropType = {
    method: PropTypes.string.isRequired,
    pathCondition: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

export const responsePropType = {
    httpStatus: PropTypes.number.isRequired,
    delayedBy: PropTypes.number,
    headers: PropTypes.objectOf(PropTypes.string),
    body: PropTypes.string,
};

export const mockingRulePropType = {
    id: PropTypes.string.isRequired,
    request: PropTypes.shape(requestPropType).isRequired,
    response: PropTypes.shape(responsePropType).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
};
