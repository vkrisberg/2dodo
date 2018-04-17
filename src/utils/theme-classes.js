import cn from 'classnames';

/**
 * Adding prefixes to class names
 * @param base
 * @param classes
 * @returns {*}
 */
export default function (base, ...classes) {

  const f = (...classes) => {
    return base + cn(classes).replace(/(\s+)/g, `$1${base}`);
  };

  return classes && classes.length ? f(classes) : f;
}
