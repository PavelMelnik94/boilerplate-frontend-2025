import { logger } from '@/utils/logger';

import './styles/index.css';
import { httpClient } from './utils/functions/http-client/http-client';

logger.info('Hello World!');

await httpClient.get('/posts/1').then((response) => {
  console.log(response.data);
});
