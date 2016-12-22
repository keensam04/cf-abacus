'use strict';

module.exports = {
  plan_id: 'standard_data_consumption',
  measures: [
    {
      name: 'data',
      unit: 'RECORD'
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
      meter: ((m) => new BigNumber(m.data)
        .div(1000).toNumber()).toString(),
      accumulate: ((a, qty, start, end, from, to, twCell) =>
        end < from || end >= to ? null : Math.max(a, qty)).toString(),
      aggregate: ((a, prev, curr, aggTwCell, accTwCell) =>
        new BigNumber(a || 0).add(curr).sub(prev).toNumber()).toString(),
      summarize: ((t, qty, from, to) => new BigNumber(t || 0)).toString()
    },
    {
      name: 'thousand_api_calls',
      unit: 'THOUSAND_CALLS',
      type: 'discrete',
      meter: ((m) => new BigNumber(m.light_api_calls)
        .div(1000).toNumber()).toString(),
      accumulate: ((a, qty, start, end, from, to, twCell) =>
        end < from || end >= to ? null : Math.max(a, qty)).toString(),
      aggregate: ((a, prev, curr, aggTwCell, accTwCell) =>
        new BigNumber(a || 0).add(curr).sub(prev).toNumber()).toString(),
      summarize: ((t, qty, from, to) => new BigNumber(t || 0)).toString()
    }]
};
