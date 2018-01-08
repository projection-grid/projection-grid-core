import { isArray, isObject, colsOfTable } from '../utils';

function leafColumns(col) {
  return isArray(col.cols) ? [].concat(...col.cols.map(leafColumns)) : [col];
}

function treeHeight({ cols = [] }) {
  return Math.max(0, ...cols.map(treeHeight)) + 1;
}

function isLeaf(col) {
  return !isArray(col.cols) || col.cols.length === 0;
}

function normalizeSpans({ colspan = 1, rowspan = 1 }) {
  const props = {};

  if (colspan !== 1) {
    props.colspan = colspan;
  }
  if (rowspan !== 1) {
    props.rowspan = rowspan;
  }
  return props;
}

function processColumnTree(options) {
  const trs = [];
  const height = treeHeight({ cols: options.cols }) - 1;
  const {
    tr: { key = '@header', ...trOther },
  } = options;

  function processNode({ cols, depth }) {
    if (depth >= trs.length) {
      trs[depth] = {
        key: `${key}-${depth}`,
        tds: [],
        ...trOther,
      };
    }

    return cols.reduce((colspan, col) => {
      const td = {
        tag: 'TH',
        key: col.key,
        isHeader: true,
        col,
        props: normalizeSpans(isLeaf(col) ? {
          rowspan: height - depth,
        } : {
          colspan: processNode({
            cols: col.cols,
            depth: depth + 1,
          }),
        }),
      };
      trs[depth].tds.push(td);
      return colspan + (td.props.colspan || 1);
    }, 0);
  }

  processNode({ cols: options.cols, depth: 0 });
  return trs;
}

export default function columnTree({
  composeCols,
  composeTrs,
}) {
  function composeHeaderTrs(tr) {
    const { isHeader, ...trOther } = tr;
    const cols = colsOfTable(tr.section.table);
    const trs = processColumnTree({ cols, tr: trOther });
    return [].concat(...trs.map(composeTrs));
  }

  function composeDataTrs(tr) {
    const { data, ...trOther } = tr;
    const cols = leafColumns({
      cols: colsOfTable(tr.section.table),
    });
    return composeTrs({
      ...trOther,
      tds: cols.map(col => ({ data, col, key: col.key })),
    });
  }

  return {
    composeCols(col) {
      if (isArray(col.cols)) {
        return [].concat(...col.cols.map(this.composeCols));
      }
      return composeCols(col);
    },

    composeTrs(tr) {
      const cols = colsOfTable(tr.section.table);

      if (treeHeight({ cols }) > 2) {
        if (tr.isHeader) {
          return composeHeaderTrs.call(this, tr);
        }
        if (isObject(tr.data)) {
          return composeDataTrs.call(this, tr);
        }
      }

      return composeTrs(tr);
    },
  };
}
