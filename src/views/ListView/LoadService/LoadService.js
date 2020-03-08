import { originType } from 'static/list';
import ServerLoadService from './ServerLoadService';
import LocalLoadService from './LocalLoadService';

const LoadService = (id, origin, dispatch) => {
    switch (origin) {
        case originType.Server: {
            ServerLoadService.load(id, dispatch);
            return ServerLoadService.cancel;
        }
        case originType.Local: {
            LocalLoadService.load(id, dispatch);
            return LocalLoadService.cancel;
        }
        default: {
            return () => {};
        }
    }
};

export default LoadService;
