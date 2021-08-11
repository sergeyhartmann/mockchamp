import CreateRulePage, { CREATE_RULE_ROUTE } from './pages/CreateRulePage';
import EditRulePage, { EDIT_RULE_ROUTE } from './pages/EditRulePage';
import HomePage, { HOME_PAGE_ROUTE } from './pages/HomePage';

const routes = [
    {
        path: HOME_PAGE_ROUTE,
        Component: HomePage,
    },
    {
        path: CREATE_RULE_ROUTE,
        Component: CreateRulePage,
    },
    {
        path: EDIT_RULE_ROUTE,
        Component: EditRulePage,
    },
];

export { routes };
