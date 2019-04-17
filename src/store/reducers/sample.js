import { SAMPLE_ACTION } from 'src/store/actions';

const defaultState = {
    items: {
        foo: 1,
        bar: 2,
    },
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case SAMPLE_ACTION:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.name]: action.value
                },
            };

        default:
            return state;
    }
};
