import { logsRemover } from './logsRemover';
import { schedule } from 'node-cron';

schedule('0 0 * */3 *', logsRemover);
