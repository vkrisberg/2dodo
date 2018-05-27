import moment from 'moment';
import {get, isString} from 'lodash';

const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

const getDate = (date) => {
  if (date) {
    return moment(date).toDate();
  }

  return moment().toDate();
};

/**
 * Datetime in RFC3339MilliSec
 * @param date
 * @returns {string}
 */
const getRfcDate = (date) => {
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
 * Get dateSend from object or current time
 * @param data
 * @returns {*|moment.Moment}
 */
const getDateSend = (data) => {
  const dateSend = get(data, 'dateSend', null);

  if (dateSend) {
    return parseDate(dateSend);
  }

  return moment();
};

export default {
  getDate,
  getRfcDate,
  getTimestamp,
  parseDate,
  getDateSend,
};
