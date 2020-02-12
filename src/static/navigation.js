import { home, pencil, trophy } from 'react-icons-kit/icomoon';
import { list } from 'react-icons-kit/iconic';
import { routes } from 'static/routes';

const navigationItems = [
    {
        id: 0,
        icon: home,
        path: routes.Home,
        label: 'Home',
    },
    {
        id: 1,
        icon: list,
        path: routes.List,
        label: 'List',
    },
    {
        id: 2,
        icon: pencil,
        path: routes.Test,
        label: 'Test',
    },
    {
        id: 3,
        icon: trophy,
        path: routes.Result,
        label: 'Result',
    },
];

export default navigationItems;
