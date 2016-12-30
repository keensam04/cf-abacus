'use strict';

/* istanbul ignore file */

module.exports = {
  plan_id: 'basic-data-consumption',
  measures: [
    {
      name: 'data',
      unit: 'RECORDS'
    },
    {
      name: 'api_calls',
      unit: 'CALL'
    }],
  metrics: [
    {
      name: 'data_in_thousand',
      unit: 'THOUSAND_RECORDS',
      type: 'discrete',
      meter: ((m) => new BigNumber(m.storage)
        .div(1000).toNumber()).toString(),
      accumulate: ((a, qty, start, end, from, to, twCell) =>
        end < from || end >= to ? null : Math.max(a, qty)).toString()
    },
    {
      name: 'api_calls',
      unit: 'THOUSAND_CALLS',
      type: 'discrete',
      meter: ((m) => new BigNumber(m.light_api_calls)
        .div(1000).toNumber()).toString(),
      aggregate: ((a, prev, curr, aggTwCell, accTwCell) =>
        new BigNumber(a || 0).add(curr).sub(prev).toNumber()).toString()
    }]
};

