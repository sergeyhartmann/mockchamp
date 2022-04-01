import { useReducer } from 'react';
import { METHOD_ANY, PATH_CONDITION_EXACT } from '../../models/mockingRule';

const CHANGE_REQUEST_METHOD_ACTION = 'changeRequestMethod';
const CHANGE_REQUEST_PATH_CONDITION_ACTION = 'changeRequestPathCondition';
const CHANGE_REQUEST_PATH_ACTION = 'changeRequestPath';
const CHANGE_RESPONSE_HTTP_STATUS_ACTION = 'changeResponseHttpStatus';
const CHANGE_RESPONSE_DELAYED_BY_ACTION = 'changeResponseDelayedBy';
const CHANGE_RESPONSE_HEADERS_ACTION = 'changeResponseHeaders';
const CHANGE_RESPONSE_BODY_ACTION = 'changeResponseBody';
const CHANGE_TAGS_ACTION = 'changeTagsAction';
const START_SUBMITTING_ACTION = 'startSubmitting';
const FINISH_SUBMITTING_ACTION = 'finishSubmitting';
const UPDATE_FORM_ERROR_ACTION = 'updateFormError';

const initializer = (rule) => {
    return (initialState) => {
        const state = { ...initialState };
        state.formData = { ...state.formData, ...rule };
        return state;
    };
};

const initialState = {
    formData: {
        id: '',
        request: {
            method: METHOD_ANY,
            pathCondition: PATH_CONDITION_EXACT,
            path: '/',
        },
        response: {
            httpStatus: 200,
            delayedBy: 0,
            headers: {},
            body: '',
        },
        tags: [],
    },
    formError: {},
    submitting: false,
};

const reducer = (state, action) => {
    const newState = { ...state };
    switch (action.type) {
        case CHANGE_REQUEST_METHOD_ACTION:
            newState.formData.request.method = action.payload;
            return newState;

        case CHANGE_REQUEST_PATH_CONDITION_ACTION:
            newState.formData.request.pathCondition = action.payload;
            return newState;

        case CHANGE_REQUEST_PATH_ACTION:
            newState.formData.request.path = action.payload;
            return newState;

        case CHANGE_RESPONSE_HTTP_STATUS_ACTION:
            newState.formData.response.httpStatus = action.payload;
            return newState;

        case CHANGE_RESPONSE_DELAYED_BY_ACTION:
            newState.formData.response.delayedBy = action.payload;
            return newState;

        case CHANGE_RESPONSE_HEADERS_ACTION:
            newState.formData.response.headers = action.payload;
            return newState;

        case CHANGE_RESPONSE_BODY_ACTION:
            newState.formData.response.body = action.payload;
            return newState;

        case CHANGE_TAGS_ACTION:
            newState.formData.tags = action.payload;
            return newState;

        case START_SUBMITTING_ACTION:
            newState.formError = initialState.formError;
            newState.submitting = true;
            return newState;

        case FINISH_SUBMITTING_ACTION:
            newState.submitting = false;
            return newState;

        case UPDATE_FORM_ERROR_ACTION:
            newState.formError = action.payload;
            return newState;

        default:
            return newState;
    }
};

const useForm = (rule) => {
    const [state, dispatch] = useReducer(reducer, initialState, initializer(rule));

    const submit = async (successCallback = () => {}) => {
        try {
            dispatch({ type: START_SUBMITTING_ACTION });

            const response = await fetch(state.formData.id ? `/__api/rule/${state.formData.id}` : '/__api/rule', {
                method: state.formData.id ? 'PATCH' : 'POST',
                body: JSON.stringify(state.formData),
            });

            if (response.status === 400) {
                dispatch({ type: UPDATE_FORM_ERROR_ACTION, payload: await response.json() });
                return;
            }

            if (response.status !== 200) {
                return;
            }

            successCallback();
        } catch (e) {
            console.error(e);
        } finally {
            dispatch({ type: FINISH_SUBMITTING_ACTION });
        }
    };

    return { state, dispatch, submit };
};

export { useForm };
export {
    CHANGE_REQUEST_METHOD_ACTION,
    CHANGE_REQUEST_PATH_CONDITION_ACTION,
    CHANGE_REQUEST_PATH_ACTION,
    CHANGE_RESPONSE_HTTP_STATUS_ACTION,
    CHANGE_RESPONSE_DELAYED_BY_ACTION,
    CHANGE_RESPONSE_HEADERS_ACTION,
    CHANGE_RESPONSE_BODY_ACTION,
    CHANGE_TAGS_ACTION,
};
