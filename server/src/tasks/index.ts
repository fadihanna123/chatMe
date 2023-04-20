import { schedule } from 'node-cron';

import { logsRemover } from './logsRemover';

schedule('0 0 * */3 *', logsRemover);
