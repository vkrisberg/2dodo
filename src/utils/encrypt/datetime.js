import moment from 'moment';
import {get, isString} from 'lodash';

const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

/**
 * Datetime in RFC3339MilliSec
 * @param date
 * @returns {string}
 */
const getDate = (date) => {
  if (date) {
    return moment(date).format(DATE_FORMAT);
  }

  return moment().format(DATE_FORMAT);
};

/**
 * Timestamp in milliseconds
 * @param date
 * @returns {number}
 */
const getTimestamp = (date) => {
  if (date) {
    return moment(date).valueOf();
  }

  return moment().valueOf();
};

/**
 * Parse date to Moment object
 * @param date
 * @param format
 * @returns {*|moment.Moment}
 */
const parseDate = (date, format = DATE_FORMAT) => {
  if (!isString(date)) {
    return moment(date);
  }

  return moment(date, format);
};

/**
 * Get timeSend from object or current time
 * @param data
 * @returns {*|moment.Moment}
 */
const getTimeSend = (data) => {
  const timeSend = get(data, 'timeSend', null);

  if (timeSend) {
    return parseDate(timeSend);
  }

  return moment();
};

export default {
  getDate,
  getTimestamp,
  parseDate,
  getTimeSend,
};
