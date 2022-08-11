import { BASE_URL_PROD } from '../utils/app_constants';

const production = process.env.NODE_ENV === 'production';
export const BASE_URL = production ? BASE_URL_PROD : BASE_URL_PROD;
