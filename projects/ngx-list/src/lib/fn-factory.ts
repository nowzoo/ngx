import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import trim from 'lodash/trim';
import toString from 'lodash/toString';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';

import {
  NgxListCompare,
  NgxListColumnValueFn,
  NgxListSortFn,
  NgxListFilterFn
} from './shared';

export class NgxListFnFactory {

  /**
   * The default function for deciding when NOT to run a particular
   * filter, based on the value of the filter. By default, this
   * is when the filter value is `undefined`, `null` or an empty string.
   *
   */
  static ignoreFilterWhen(filterValue: any): boolean {
    return filterValue === null ||
      filterValue === undefined ||
      ('string' === typeof filterValue && 0 === trim(filterValue).length);
  }


  /**
   * A helper function to get the dot-notated keys from an object.
   */
  static dotKeys(x: any, ignoredKeys: string[] = []): string[] {
    const dotKeys: string[] = [];
    const recurse = (y: any, currentKeys: string[] = []) => {
      const dotKey = currentKeys.length > 0 ? currentKeys.join('.') : null;
      const ignored = (dotKey === null) ? false : ignoredKeys.filter(iK => dotKey.indexOf(iK) === 0).length > 0;
      if (ignored) {
        return;
      }
      if (dotKey) {
        dotKeys.push(dotKey);
      }
      if (typeof y === 'object' && null !== y) {
        Object.keys(y).forEach(k => recurse(y[k], [...currentKeys, k]));
      }
    };
    recurse(x);
    return dotKeys;
  }

  /**
   * A helper method to get the value function for a column.
   */
  static getColumnValueFn(
    k: string,
    valueFns: {[key: string]: NgxListColumnValueFn} = {},
    caseSensitive: boolean
  ): NgxListColumnValueFn {
    if (isFunction(valueFns[k])) {
      return valueFns[k];
    }
    return (record) => {
      const value = get(record, k);
      if ((! caseSensitive) && typeof value === 'string') {
        return (value as string).toLowerCase();
      }
      return value;
    };
  }

  /**
   * A factory that returns an instance of  NgxListSortFn.
   * Pass on optional options object containing...
   * - fallbackSortColumn?
   *    Optional. The key to sort by if two records are the same by the current sort key
   * - caseSensitive?
   *    Optional. Default false: string columns will be sorted case-insensitively.
   * - valueFns?
   *    Optional. Use this if you want to mess with the values for sorting,
   *    or add a sort key that does not exist in your raw records.
   */
  static sortFn(options?: {
    fallbackSortColumn?: string,
    caseSensitive?: boolean,
    valueFns?: {[key: string]: NgxListColumnValueFn}
  }): NgxListSortFn {
    options = options || {};
    const fallbackSortColumn: string = options.fallbackSortColumn || null;
    const caseSensitive = options.caseSensitive === true;
    const valueFns = options.valueFns || {};
    const fn: NgxListSortFn = (records: any[], sortColumn: string): any[] => {
      const sortFns: NgxListColumnValueFn[] = [];
      if (sortColumn) {
        sortFns.push(NgxListFnFactory.getColumnValueFn(sortColumn, valueFns, caseSensitive));
      }
      if (fallbackSortColumn && fallbackSortColumn !== sortColumn) {
        sortFns.push(NgxListFnFactory.getColumnValueFn(fallbackSortColumn, valueFns, caseSensitive));
      }

      const sorted = sortBy(records, sortFns) as  any[];
      return sorted;
    };
    return fn;
  }


  static keySearchValue(
    record: any,
    key: string,
    valueFns: {[key: string]: NgxListColumnValueFn}
  ): string {
    if (isFunction(valueFns[key])) {
      return toString(valueFns[key](record));
    }
    const value = get(record, key, '');
    if (isPlainObject(value)) {
      return '';
    }
    if (isFunction(value)) {
      return '';
    }
    if (Array.isArray(value)) {
      return '';
    }
    if ('boolean' === typeof value) {
      return '';
    }
    if ('number' === typeof value && isNaN(value)) {
      return '';
    }
    return toString(value);

  }

  static recordMatchesSearch(
    record: any,
    casedSearch: string,
    caseSensitive: boolean,
    ignoredKeys: string[],
    valueFns: {[key: string]: NgxListColumnValueFn}
  ): boolean {
    const keys = NgxListFnFactory.dotKeys(record, ignoredKeys);
    let matched = false;
    while ((! matched) && (keys.length > 0)) {
      const k = keys.shift();
      const value: string = NgxListFnFactory.keySearchValue(record, k, valueFns);
      const casedValue: string = caseSensitive ? value : value.toLowerCase();
      if (casedValue.indexOf(casedSearch) > -1) {
        matched = true;
      }
    }
    return matched;
  }

  /**
   * Search filter factory. Pass an options object containing...
   * - caseSensitive?
   *    Optional. Default false -- string values will be compared case-insensitively.
   * - ignoredKeys?
   *    Optional. By default all of the scalar keys in an object are inspected. Pass an
   *    array of string keys to ignore single or multiple paths
   * - valueFns?
   *    Optional. Use this if you want to mess with the values before matching, like
   *    formatting dates.
   */
  static searchFilter(options?: {
    caseSensitive?: boolean,
    ignoredKeys?: string[],
    valueFns?: {[key: string]: NgxListColumnValueFn}
  }): NgxListFilterFn {
    options = isPlainObject(options) ? options : {};
    const caseSensitive: boolean = options.caseSensitive === true;
    const ignoredKeys = options.ignoredKeys || [];
    const valueFns = options.valueFns || {};
    const fn = (records: any[], filterValue: any): any[] => {
      let search: string = ('string' === typeof filterValue) ? trim(filterValue) : '';
      if (search.length === 0) {
        return records.slice();
      }
      if (! caseSensitive) {
        search = search.toLowerCase();
      }
      return records.filter((record: any) => {
        return NgxListFnFactory.recordMatchesSearch(record, search, caseSensitive, ignoredKeys, valueFns);
      });
    };
    return fn;
  }

  /**
   * Factory for a function that filters the records by comparing a single column against a value.
   */
  static comparisonFilter(options: {
    value: string | NgxListColumnValueFn;
    compare?: NgxListCompare;
    ignoreFilterWhen?: (filterValue: any) => boolean;
  }): NgxListFilterFn  {
    const compare = undefined === options.compare ? NgxListCompare.eq : options.compare;
    const ignoreFilterWhen: (filterValue: any) => boolean = isFunction(options.ignoreFilterWhen) ?
      options.ignoreFilterWhen : NgxListFnFactory.ignoreFilterWhen;
    const valueFn: NgxListColumnValueFn = isFunction(options.value) ?
      (options.value as NgxListColumnValueFn) : ((record) => get(record, toString(options.value)) as NgxListColumnValueFn);

    const fn: NgxListFilterFn = (records: any[], filterValue: any): any[] => {
      if (ignoreFilterWhen(filterValue)) {
        return records.slice(0);
      }
      return records.filter((record: any) => {
        const recordValue = valueFn(record);
        switch (compare) {
          case NgxListCompare.eq: return recordValue === filterValue;
          case NgxListCompare.neq: return recordValue !== filterValue;
          case NgxListCompare.gt: return recordValue > filterValue;
          case NgxListCompare.gte: return recordValue >= filterValue;
          case NgxListCompare.lt: return recordValue < filterValue;
          case NgxListCompare.lte: return recordValue <= filterValue;
        }
        return false;
      });
    };
    return fn;
  }
}
