import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.regexp.replace";
import "core-js/modules/es6.regexp.split";
// Temporary copy to fix
// https://github.com/lukeed/rewrite-imports/issues/10
var UNNAMED = /import\s*['"]([^'"]+)['"];?/gi;
var NAMED = /import\s*(\*\s*as)?\s*(\w*?)\s*,?\s*(?:\{([\s\S]*?)\})?\s*from\s*['"]([^'"]+)['"];?/gi;

function alias(key) {
  key = key.trim();
  var name = key.split(' as ');

  if (name.length > 1) {
    key = name.shift();
  }

  return {
    key: key,
    name: name[0]
  };
}

function generate(keys, dep, base, fn) {
  var tmp = dep.split('/').pop().replace(/\W/g, '_') + '$' + num++; // uniqueness

  var name = alias(tmp).name;
  dep = fn + "('" + dep + "')";
  var obj;
  var out = "const " + name + " = " + dep + ";";

  if (base) {
    out += "\nconst " + base + " = " + tmp + ".default || " + tmp + ";";
  }

  keys.forEach(function (key) {
    obj = alias(key);
    out += "\nconst " + obj.name + " = " + tmp + "." + obj.key + ";";
  });
  return out;
}

var num;
export default function (str, fn) {
  if (fn === void 0) {
    fn = 'require';
  }

  num = 0;
  return str.replace(NAMED, function (_, asterisk, base, req, dep) {
    return generate(req ? req.split(',') : [], dep, base, fn);
  }).replace(UNNAMED, function (_, dep) {
    return fn + "('" + dep + "');";
  });
}