/*!
 * name: next-traverse
 * link: https://github.com/afeiship/next-traverse
 * version: 1.0.0
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var DEFAULT_OPTIONS = { itemsKey: 'items' };
  var isArray = function(target) {
    return target instanceof Array;
  };

  nx.traverse = function(inTarget, inCallback, inContext, inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var deep = 0;
    var walk = function(items) {
      nx.mix(items, { deep: deep++ });
      items.forEach(function(item, index) {
        inCallback.call(inContext, index, item, items);
        var children = item[options.itemsKey];
        if (children && children.length) {
          walk(children);
        }
      });
    };

    walk(isArray(inTarget) ? inTarget : [inTarget]);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.traverse;
  }
})();