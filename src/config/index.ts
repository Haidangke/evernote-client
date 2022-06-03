import routes from './routes';
import constants from './contants';

export interface Config {
    [key: string]: string;
}

const config: { [key: string]: Config } = {
    routes,
    constants,
};

export default config;
