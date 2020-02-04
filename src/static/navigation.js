import { home } from 'react-icons-kit/icomoon/home'
import { list } from 'react-icons-kit/iconic/list'
import { pencil } from 'react-icons-kit/icomoon/pencil'
import { trophy } from 'react-icons-kit/icomoon/trophy'

const navigationItems = [
    {
        id: 0,
        icon: home,
        path: '/',
        label: 'Home'
    },
    {
        id: 1,
        icon: list,
        path: '/list',
        label: 'List'
    },
    {
        id: 2,
        icon: pencil,
        path: '/test',
        label: 'Test'
    },
    {
        id: 3,
        icon: trophy,
        path: '/result',
        label: 'Result'
    }
];

export default navigationItems;
