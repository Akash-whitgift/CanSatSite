var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// .svelte-kit/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
function set_current_component(component4) {
  current_component = component4;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component4 = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component4.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component4, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(
          merge_ssr_styles(attributes.style, styles_to_add)
        );
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component4, name) {
  if (!component4 || !component4.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component4;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean)
    return "";
  const assignment = `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2] != null && style_object[key2] !== "").map((key2) => `${key2}: ${escape_attribute_value(style_object[key2])};`).join(" ");
}
function add_styles(style_object) {
  const styles = style_object_to_string(style_object);
  return styles ? ` style="${styles}"` : "";
}
var current_component, _boolean_attributes, boolean_attributes, invalid_attribute_name_character, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    _boolean_attributes = /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ];
    boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/exports.js
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/")
    return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
function make_trackable(url, callback, search_params_callback) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html"))
    return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var internal, tracked_url_properties, DATA_SUFFIX, HTML_DATA_SUFFIX, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, validate_server_exports;
var init_exports = __esm({
  ".svelte-kit/output/server/chunks/exports.js"() {
    internal = new URL("sveltekit-internal://");
    tracked_url_properties = /** @type {const} */
    [
      "href",
      "pathname",
      "search",
      "toString",
      "toJSON"
    ];
    DATA_SUFFIX = "/__data.json";
    HTML_DATA_SUFFIX = ".html__data.json";
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});

// node_modules/devalue/src/utils.js
function is_primitive(thing) {
  return Object(thing) !== thing;
}
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
var escaped, DevalueError, object_proto_names;
var init_utils = __esm({
  "node_modules/devalue/src/utils.js"() {
    escaped = {
      "<": "\\u003C",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    DevalueError = class extends Error {
      /**
       * @param {string} message
       * @param {string[]} keys
       */
      constructor(message, keys) {
        super(message);
        this.name = "DevalueError";
        this.path = keys.join("");
      }
    };
    object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
      Object.prototype
    ).sort().join("\0");
  }
});

// node_modules/devalue/src/uneval.js
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c2) {
  return escaped[c2] || c2;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}
var chars, unsafe_chars, reserved;
var init_uneval = __esm({
  "node_modules/devalue/src/uneval.js"() {
    init_utils();
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
    reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
  }
});

// node_modules/devalue/src/constants.js
var UNDEFINED, HOLE, NAN, POSITIVE_INFINITY, NEGATIVE_INFINITY, NEGATIVE_ZERO;
var init_constants = __esm({
  "node_modules/devalue/src/constants.js"() {
    UNDEFINED = -1;
    HOLE = -2;
    NAN = -3;
    POSITIVE_INFINITY = -4;
    NEGATIVE_INFINITY = -5;
    NEGATIVE_ZERO = -6;
  }
});

// node_modules/devalue/src/parse.js
var init_parse = __esm({
  "node_modules/devalue/src/parse.js"() {
    init_constants();
  }
});

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index5 = p++;
    indexes.set(thing, index5);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index5] = `["${key2}",${flatten(value2)}]`;
        return index5;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          const valid = !isNaN(thing.getDate());
          str = `["Date","${valid ? thing.toISOString() : ""}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
            keys.pop();
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index5] = str;
    return index5;
  }
  const index4 = flatten(value);
  if (index4 < 0)
    return `${index4}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}
var init_stringify = __esm({
  "node_modules/devalue/src/stringify.js"() {
    init_utils();
    init_constants();
  }
});

// node_modules/devalue/index.js
var init_devalue = __esm({
  "node_modules/devalue/index.js"() {
    init_uneval();
    init_parse();
    init_stringify();
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index4 = 0;
      while (index4 < str.length) {
        var eqIdx = str.indexOf("=", index4);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index4);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index4 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index4, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index4 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e3) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e3) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e3
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/entries/fallbacks/layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/layout.svelte.js"() {
    init_ssr();
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ??= (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    imports = ["_app/immutable/nodes/0.Dn_LOdW3.js", "_app/immutable/chunks/scheduler.5rEqcWWW.js", "_app/immutable/chunks/index.3m18Cu60.js"];
    stylesheets = [];
    fonts = [];
  }
});

// .svelte-kit/output/server/chunks/client.js
function get(key2, parse3 = JSON.parse) {
  try {
    return parse3(sessionStorage[key2]);
  } catch {
  }
}
function goto(url, opts = {}) {
  {
    throw new Error("Cannot call goto(...) on the server");
  }
}
var SNAPSHOT_KEY, SCROLL_KEY;
var init_client = __esm({
  ".svelte-kit/output/server/chunks/client.js"() {
    init_exports();
    init_devalue();
    SNAPSHOT_KEY = "sveltekit:snapshot";
    SCROLL_KEY = "sveltekit:scroll";
    get(SCROLL_KEY) ?? {};
    get(SNAPSHOT_KEY) ?? {};
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
var getStores, page, Error$1;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_ssr();
    init_client();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ??= (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    imports2 = ["_app/immutable/nodes/1._gOsCV_H.js", "_app/immutable/chunks/scheduler.5rEqcWWW.js", "_app/immutable/chunks/index.3m18Cu60.js", "_app/immutable/chunks/entry.B6_ghXDF.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
var void_element_names, MenuIcon, css$3, Toc, css$2, Modal, css$1, InstructionCard, css, dragSensitivity, scrollSensitivity, Main, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_ssr();
    init_client();
    void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
    MenuIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ` <svg${spread([escape_object($$props), { viewBox: "0 0 20 20" }, { fill: "currentColor" }], {})}><path d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z"></path></svg>`;
    });
    css$3 = {
      code: ".svelte-j30iej:where(aside.toc){box-sizing:border-box;height:max-content;overflow-wrap:break-word;font-size:var(--toc-font-size);min-width:var(--toc-min-width);width:var(--toc-width);z-index:var(--toc-z-index, 1)}.svelte-j30iej:where(aside.toc > nav){overflow:var(--toc-overflow, auto);overscroll-behavior:contain;max-height:var(--toc-max-height, 90vh);padding:var(--toc-padding, 1em 1em 0)}.svelte-j30iej:where(aside.toc > nav > ol){list-style:var(--toc-ol-list-style, none);padding:var(--toc-ol-padding, 0);margin:var(--toc-ol-margin)}.svelte-j30iej:where(.toc-title){padding:var(--toc-title-padding);margin:var(--toc-title-margin)}.svelte-j30iej:where(aside.toc > nav > ol > li){cursor:pointer;color:var(--toc-li-color);border:var(--toc-li-border);border-radius:var(--toc-li-border-radius);margin:var(--toc-li-margin);padding:var(--toc-li-padding, 2pt 4pt)}.svelte-j30iej:where(aside.toc > nav > ol > li:hover){color:var(--toc-li-hover-color, cornflowerblue);background:var(--toc-li-hover-bg)}.svelte-j30iej:where(aside.toc > nav > ol > li.active){background:var(--toc-active-bg, cornflowerblue);color:var(--toc-active-color, white);font-weight:var(--toc-active-font-weight);border:var(--toc-active-border);border-width:var(--toc-active-border-width);border-radius:var(--toc-active-border-radius, 2pt)}.svelte-j30iej:where(aside.toc > button){border:none;bottom:0;cursor:pointer;font-size:2em;line-height:0;position:absolute;right:0;z-index:2;padding:var(--toc-mobile-btn-padding, 2pt 3pt);border-radius:var(--toc-mobile-btn-border-radius, 4pt);background:var(--toc-mobile-btn-bg, rgba(255, 255, 255, 0.2));color:var(--toc-mobile-btn-color, black)}.svelte-j30iej:where(aside.toc > nav){position:relative}.svelte-j30iej:where(aside.toc > nav > .toc-title){margin-top:0}.svelte-j30iej:where(aside.toc.mobile){visibility:hidden;position:absolute;bottom:var(--toc-mobile-bottom, 1em);right:var(--toc-mobile-right, 1em)}.svelte-j30iej:where(aside.toc.mobile > nav){border-radius:3pt;right:0;z-index:-1;box-sizing:border-box;background:var(--toc-mobile-bg, #444);width:var(--toc-mobile-width, 18em);box-shadow:var(--toc-mobile-shadow);border:var(--toc-mobile-border)}.svelte-j30iej:where(aside.toc.desktop){margin:var(--toc-desktop-aside-margin)}.svelte-j30iej:where(aside.toc.desktop){position:sticky;background:#444;margin:var(--toc-desktop-nav-margin);max-width:var(--toc-desktop-max-width);top:var(--toc-desktop-sticky-top, 2em);border-radius:8px;padding:4px}",
      map: '{"version":3,"file":"Toc.svelte","sources":["Toc.svelte"],"sourcesContent":["<script>import { createEventDispatcher, onMount } from \'svelte\';\\n    import { blur } from \'svelte/transition\';\\n    import { MenuIcon } from \'.\';\\n    export let activeHeading = null;\\n    export let activeHeadingScrollOffset = 100;\\n    export let activeTocLi = null;\\n    export let aside = undefined;\\n    export let breakpoint = 1000; // in pixels (smaller window width is considered mobile, larger is desktop)\\n    export let desktop = true;\\n    export let flashClickedHeadingsFor = 1500;\\n    export let getHeadingIds = (node) => node.id;\\n    export let getHeadingLevels = (node) => Number(node.nodeName[1]); // get the number from H1, H2, ...\\n    export let getHeadingTitles = (node) => node.textContent ?? ``;\\n    // the result of document.querySelectorAll(headingSelector). can be useful for binding\\n    export let headings = [];\\n    export let headingSelector = `:is(h2, h3, h4):not(.toc-exclude)`;\\n    export let hide = false;\\n    export let autoHide = true;\\n    export let keepActiveTocItemInView = true; // requires scrollend event browser support\\n    export let minItems = 0;\\n    export let nav = undefined;\\n    export let open = false;\\n    export let openButtonLabel = `Open table of contents`;\\n    // prettier-ignore\\n    export let reactToKeys = [`ArrowDown`, `ArrowUp`, ` `, `Enter`, `Escape`, `Tab`];\\n    export let pageBody = `body`;\\n    export let scrollBehavior = `smooth`;\\n    export let title = `On this page`;\\n    export let titleTag = `h2`;\\n    export let tocItems = [];\\n    export let warnOnEmpty = true;\\n    export let blurParams = { duration: 200 };\\n    let window_width;\\n    // dispatch open event when open changes\\n    const dispatch = createEventDispatcher();\\n    $: dispatch(`open`, { open });\\n    $: levels = headings.map(getHeadingLevels);\\n    $: minLevel = Math.min(...levels);\\n    $: desktop = window_width > breakpoint;\\n    function close(event) {\\n        if (!aside?.contains(event.target))\\n            open = false;\\n    }\\n    // (re-)query headings on mount and on route changes\\n    function requery_headings() {\\n        if (typeof document === `undefined`)\\n            return; // for SSR\\n        headings = [...document.querySelectorAll(headingSelector)];\\n        set_active_heading();\\n        if (headings.length === 0) {\\n            if (warnOnEmpty) {\\n                console.warn(`svelte-toc found no headings for headingSelector=\'${headingSelector}\'. ${autoHide ? `Hiding` : `Showing empty`} table of contents.`);\\n            }\\n            if (autoHide)\\n                hide = true;\\n        }\\n        else if (hide && autoHide) {\\n            hide = false;\\n        }\\n    }\\n    requery_headings();\\n    onMount(() => {\\n        if (typeof pageBody === `string`) {\\n            pageBody = document.querySelector(pageBody);\\n            if (!pageBody) {\\n                throw new Error(`Could not find page body element: ${pageBody}`);\\n            }\\n        }\\n        const mutation_observer = new MutationObserver(requery_headings);\\n        mutation_observer.observe(pageBody, { childList: true, subtree: true });\\n        return () => mutation_observer.disconnect();\\n    });\\n    function set_active_heading() {\\n        let idx = headings.length;\\n        while (idx--) {\\n            const { top } = headings[idx].getBoundingClientRect();\\n            // loop through headings from last to first until we find one that the viewport already\\n            // scrolled past. if none is found, set make first heading active\\n            if (top < activeHeadingScrollOffset || idx === 0) {\\n                activeHeading = headings[idx];\\n                activeTocLi = tocItems[idx];\\n                return; // exit while loop if updated active heading\\n            }\\n        }\\n    }\\n    // click and key handler for ToC items that scrolls to the heading\\n    const li_click_key_handler = (node) => (event) => {\\n        if (event instanceof KeyboardEvent && ![`Enter`, ` `].includes(event.key))\\n            return;\\n        open = false;\\n        node.scrollIntoView?.({ behavior: scrollBehavior, block: `start` });\\n        const id = getHeadingIds && getHeadingIds(node);\\n        if (id)\\n            history.replaceState({}, ``, `#${id}`);\\n        if (flashClickedHeadingsFor) {\\n            node.classList.add(`toc-clicked`);\\n            setTimeout(() => node.classList.remove(`toc-clicked`), flashClickedHeadingsFor);\\n        }\\n    };\\n    function scroll_to_active_toc_item(behavior = `smooth`) {\\n        if (keepActiveTocItemInView && activeTocLi && nav) {\\n            // scroll the active ToC item into the middle of the ToC container\\n            const top = activeTocLi?.offsetTop - nav.offsetHeight / 2;\\n            nav?.scrollTo?.({ top, behavior });\\n        }\\n    }\\n    // ensure active ToC is in view when ToC opens on mobile\\n    $: if (open && nav) {\\n        set_active_heading();\\n        scroll_to_active_toc_item(`instant`);\\n    }\\n    // enable keyboard navigation\\n    function on_keydown(event) {\\n        if (!reactToKeys || !reactToKeys.includes(event.key))\\n            return;\\n        // `:hover`.at(-1) returns the most deeply nested hovered element\\n        const hovered = [...document.querySelectorAll(`:hover`)].at(-1);\\n        const toc_is_hovered = hovered && nav?.contains(hovered);\\n        if (\\n        // return early if ToC does not have focus\\n        (event.key === `Tab` && !nav?.contains(document.activeElement)) ||\\n            // ignore keyboard events when ToC is closed on mobile or when ToC is not currently hovered on desktop\\n            (!desktop && !open) ||\\n            (desktop && !toc_is_hovered))\\n            return;\\n        event.preventDefault();\\n        if (event.key === `Escape` && open)\\n            open = false;\\n        else if (event.key === `Tab` && !aside?.contains(document.activeElement))\\n            open = false;\\n        else if (activeTocLi) {\\n            if (event.key === `ArrowDown`) {\\n                const next = activeTocLi.nextElementSibling;\\n                if (next)\\n                    activeTocLi = next;\\n            }\\n            if (event.key === `ArrowUp`) {\\n                const prev = activeTocLi.previousElementSibling;\\n                if (prev)\\n                    activeTocLi = prev;\\n            }\\n            // update active heading\\n            activeHeading = headings[tocItems.indexOf(activeTocLi)];\\n        }\\n        if (activeTocLi && [` `, `Enter`].includes(event.key)) {\\n            activeHeading?.scrollIntoView({ behavior: `instant`, block: `start` });\\n        }\\n    }\\n    <\/script>\\n    \\n    <svelte:window\\n      bind:innerWidth={window_width}\\n      on:scroll={set_active_heading}\\n      on:click={close}\\n      on:scrollend={() => {\\n        // wait for scroll end since Chrome doesn\'t support multiple simultaneous scrolls,\\n        // smooth or otherwise (https://stackoverflow.com/a/63563437)\\n        scroll_to_active_toc_item()\\n      }}\\n      on:resize={() => {\\n        desktop = window_width > breakpoint\\n        set_active_heading()\\n      }}\\n      on:keydown={on_keydown}\\n    />\\n    \\n    <aside\\n      class=\\"toc\\"\\n      class:desktop\\n      class:hidden={hide}\\n      class:mobile={!desktop}\\n      bind:this={aside}\\n      hidden={hide}\\n      aria-hidden={hide}\\n    >\\n      {#if !open && !desktop && headings.length >= minItems}\\n        <button\\n          on:click|preventDefault|stopPropagation={() => (open = true)}\\n          aria-label={openButtonLabel}\\n        >\\n          <slot name=\\"open-toc-icon\\">\\n            <MenuIcon width=\\"1em\\" />\\n          </slot>\\n        </button>\\n      {/if}\\n      {#if open || (desktop && headings.length >= minItems)}\\n        <nav transition:blur={blurParams} bind:this={nav}>\\n          {#if title}\\n            <slot name=\\"title\\">\\n              <svelte:element this={titleTag} class=\\"toc-title toc-exclude\\">\\n                {title}\\n              </svelte:element>\\n            </slot>\\n          {/if}\\n          <ol>\\n            {#each headings as heading, idx}\\n              <li\\n                style:margin=\\"0 0 0 {levels[idx] - minLevel}em\\"\\n                style:font-size=\\"{2 - 0.2 * (levels[idx] - minLevel)}ex\\"\\n                class:active={activeTocLi === tocItems[idx]}\\n                on:click={li_click_key_handler(heading)}\\n                on:keyup={li_click_key_handler(heading)}\\n                bind:this={tocItems[idx]}\\n                role=\\"menuitem\\"\\n              >\\n                <slot name=\\"toc-item\\" {heading} {idx}>\\n                  {getHeadingTitles(heading)}\\n                </slot>\\n              </li>\\n            {/each}\\n          </ol>\\n        </nav>\\n      {/if}\\n    </aside>\\n    \\n    <style>\\n      :where(aside.toc) {\\n        box-sizing: border-box;\\n        height: max-content;\\n        overflow-wrap: break-word;\\n        font-size: var(--toc-font-size);\\n        min-width: var(--toc-min-width);\\n        width: var(--toc-width);\\n        z-index: var(--toc-z-index, 1);\\n      }\\n      :where(aside.toc > nav) {\\n        overflow: var(--toc-overflow, auto);\\n        overscroll-behavior: contain;\\n        max-height: var(--toc-max-height, 90vh);\\n        padding: var(--toc-padding, 1em 1em 0);\\n      }\\n      :where(aside.toc > nav > ol) {\\n        list-style: var(--toc-ol-list-style, none);\\n        padding: var(--toc-ol-padding, 0);\\n        margin: var(--toc-ol-margin);\\n      }\\n      :where(.toc-title) {\\n        padding: var(--toc-title-padding);\\n        margin: var(--toc-title-margin);\\n      }\\n      :where(aside.toc > nav > ol > li) {\\n        cursor: pointer;\\n        color: var(--toc-li-color);\\n        border: var(--toc-li-border);\\n        border-radius: var(--toc-li-border-radius);\\n        margin: var(--toc-li-margin);\\n        padding: var(--toc-li-padding, 2pt 4pt);\\n      }\\n      :where(aside.toc > nav > ol > li:hover) {\\n        color: var(--toc-li-hover-color, cornflowerblue);\\n        background: var(--toc-li-hover-bg);\\n      }\\n      :where(aside.toc > nav > ol > li.active) {\\n        background: var(--toc-active-bg, cornflowerblue);\\n        color: var(--toc-active-color, white);\\n        font-weight: var(--toc-active-font-weight);\\n        border: var(--toc-active-border);\\n        border-width: var(--toc-active-border-width);\\n        border-radius: var(--toc-active-border-radius, 2pt);\\n      }\\n      :where(aside.toc > button) {\\n        border: none;\\n        bottom: 0;\\n        cursor: pointer;\\n        font-size: 2em;\\n        line-height: 0;\\n        position: absolute;\\n        right: 0;\\n        z-index: 2;\\n        padding: var(--toc-mobile-btn-padding, 2pt 3pt);\\n        border-radius: var(--toc-mobile-btn-border-radius, 4pt);\\n        background: var(--toc-mobile-btn-bg, rgba(255, 255, 255, 0.2));\\n        color: var(--toc-mobile-btn-color, black);\\n      }\\n      :where(aside.toc > nav) {\\n        position: relative;\\n      }\\n      :where(aside.toc > nav > .toc-title) {\\n        margin-top: 0;\\n      }\\n    \\n      :where(aside.toc.mobile) {\\n        visibility: hidden;\\n        position: absolute;\\n        bottom: var(--toc-mobile-bottom, 1em);\\n        right: var(--toc-mobile-right, 1em);\\n      }\\n      :where(aside.toc.mobile > nav) {\\n        border-radius: 3pt;\\n        right: 0;\\n        z-index: -1;\\n        box-sizing: border-box;\\n        background: var(--toc-mobile-bg, #444);\\n        width: var(--toc-mobile-width, 18em);\\n        box-shadow: var(--toc-mobile-shadow);\\n        border: var(--toc-mobile-border);\\n      }\\n    \\n      :where(aside.toc.desktop) {\\n        margin: var(--toc-desktop-aside-margin);\\n      }\\n      :where(aside.toc.desktop) {\\n        position: sticky;\\n        background: #444;\\n        margin: var(--toc-desktop-nav-margin);\\n        max-width: var(--toc-desktop-max-width);\\n        top: var(--toc-desktop-sticky-top, 2em);\\n        border-radius: 8px;\\n        padding: 4px;\\n      }\\n    </style>\\n    "],"names":[],"mappings":"cAwNM,OAAO,KAAK,IAAI,CAAE,CAChB,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,WAAW,CACnB,aAAa,CAAE,UAAU,CACzB,SAAS,CAAE,IAAI,eAAe,CAAC,CAC/B,SAAS,CAAE,IAAI,eAAe,CAAC,CAC/B,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,OAAO,CAAE,IAAI,aAAa,CAAC,EAAE,CAC/B,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAE,CACtB,QAAQ,CAAE,IAAI,cAAc,CAAC,KAAK,CAAC,CACnC,mBAAmB,CAAE,OAAO,CAC5B,UAAU,CAAE,IAAI,gBAAgB,CAAC,KAAK,CAAC,CACvC,OAAO,CAAE,IAAI,aAAa,CAAC,UAAU,CACvC,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAE,CAC3B,UAAU,CAAE,IAAI,mBAAmB,CAAC,KAAK,CAAC,CAC1C,OAAO,CAAE,IAAI,gBAAgB,CAAC,EAAE,CAAC,CACjC,MAAM,CAAE,IAAI,eAAe,CAC7B,eACA,OAAO,UAAU,CAAE,CACjB,OAAO,CAAE,IAAI,mBAAmB,CAAC,CACjC,MAAM,CAAE,IAAI,kBAAkB,CAChC,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,CAAE,CAChC,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,MAAM,CAAE,IAAI,eAAe,CAAC,CAC5B,aAAa,CAAE,IAAI,sBAAsB,CAAC,CAC1C,MAAM,CAAE,IAAI,eAAe,CAAC,CAC5B,OAAO,CAAE,IAAI,gBAAgB,CAAC,QAAQ,CACxC,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,MAAM,CAAE,CACtC,KAAK,CAAE,IAAI,oBAAoB,CAAC,eAAe,CAAC,CAChD,UAAU,CAAE,IAAI,iBAAiB,CACnC,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,OAAO,CAAE,CACvC,UAAU,CAAE,IAAI,eAAe,CAAC,eAAe,CAAC,CAChD,KAAK,CAAE,IAAI,kBAAkB,CAAC,MAAM,CAAC,CACrC,WAAW,CAAE,IAAI,wBAAwB,CAAC,CAC1C,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAChC,YAAY,CAAE,IAAI,yBAAyB,CAAC,CAC5C,aAAa,CAAE,IAAI,0BAA0B,CAAC,IAAI,CACpD,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,MAAM,CAAE,CACzB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,CAAC,CACd,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,wBAAwB,CAAC,QAAQ,CAAC,CAC/C,aAAa,CAAE,IAAI,8BAA8B,CAAC,IAAI,CAAC,CACvD,UAAU,CAAE,IAAI,mBAAmB,CAAC,yBAAyB,CAAC,CAC9D,KAAK,CAAE,IAAI,sBAAsB,CAAC,MAAM,CAC1C,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAE,CACtB,QAAQ,CAAE,QACZ,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,UAAU,CAAE,CACnC,UAAU,CAAE,CACd,eAEA,OAAO,KAAK,IAAI,OAAO,CAAE,CACvB,UAAU,CAAE,MAAM,CAClB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,mBAAmB,CAAC,IAAI,CAAC,CACrC,KAAK,CAAE,IAAI,kBAAkB,CAAC,IAAI,CACpC,eACA,OAAO,KAAK,IAAI,OAAO,CAAC,CAAC,CAAC,GAAG,CAAE,CAC7B,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,UAAU,CACtB,UAAU,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CACtC,KAAK,CAAE,IAAI,kBAAkB,CAAC,KAAK,CAAC,CACpC,UAAU,CAAE,IAAI,mBAAmB,CAAC,CACpC,MAAM,CAAE,IAAI,mBAAmB,CACjC,eAEA,OAAO,KAAK,IAAI,QAAQ,CAAE,CACxB,MAAM,CAAE,IAAI,0BAA0B,CACxC,eACA,OAAO,KAAK,IAAI,QAAQ,CAAE,CACxB,QAAQ,CAAE,MAAM,CAChB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,wBAAwB,CAAC,CACrC,SAAS,CAAE,IAAI,uBAAuB,CAAC,CACvC,GAAG,CAAE,IAAI,wBAAwB,CAAC,IAAI,CAAC,CACvC,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,GACX"}'
    };
    Toc = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let levels;
      let minLevel;
      let { activeHeading = null } = $$props;
      let { activeHeadingScrollOffset = 100 } = $$props;
      let { activeTocLi = null } = $$props;
      let { aside = void 0 } = $$props;
      let { breakpoint = 1e3 } = $$props;
      let { desktop = true } = $$props;
      let { flashClickedHeadingsFor = 1500 } = $$props;
      let { getHeadingIds = (node) => node.id } = $$props;
      let { getHeadingLevels = (node) => Number(node.nodeName[1]) } = $$props;
      let { getHeadingTitles = (node) => node.textContent ?? `` } = $$props;
      let { headings = [] } = $$props;
      let { headingSelector = `:is(h2, h3, h4):not(.toc-exclude)` } = $$props;
      let { hide = false } = $$props;
      let { autoHide = true } = $$props;
      let { keepActiveTocItemInView = true } = $$props;
      let { minItems = 0 } = $$props;
      let { nav = void 0 } = $$props;
      let { open = false } = $$props;
      let { openButtonLabel = `Open table of contents` } = $$props;
      let { reactToKeys = [`ArrowDown`, `ArrowUp`, ` `, `Enter`, `Escape`, `Tab`] } = $$props;
      let { pageBody = `body` } = $$props;
      let { scrollBehavior = `smooth` } = $$props;
      let { title = `On this page` } = $$props;
      let { titleTag = `h2` } = $$props;
      let { tocItems = [] } = $$props;
      let { warnOnEmpty = true } = $$props;
      let { blurParams = { duration: 200 } } = $$props;
      let window_width;
      const dispatch = createEventDispatcher();
      function requery_headings() {
        if (typeof document === `undefined`)
          return;
        headings = [...document.querySelectorAll(headingSelector)];
        set_active_heading();
        if (headings.length === 0) {
          if (warnOnEmpty) {
            console.warn(`svelte-toc found no headings for headingSelector='${headingSelector}'. ${autoHide ? `Hiding` : `Showing empty`} table of contents.`);
          }
          if (autoHide)
            hide = true;
        } else if (hide && autoHide) {
          hide = false;
        }
      }
      requery_headings();
      function set_active_heading() {
        let idx = headings.length;
        while (idx--) {
          const { top } = headings[idx].getBoundingClientRect();
          if (top < activeHeadingScrollOffset || idx === 0) {
            activeHeading = headings[idx];
            activeTocLi = tocItems[idx];
            return;
          }
        }
      }
      function scroll_to_active_toc_item(behavior = `smooth`) {
        if (keepActiveTocItemInView && activeTocLi && nav) {
          const top = activeTocLi?.offsetTop - nav.offsetHeight / 2;
          nav?.scrollTo?.({ top, behavior });
        }
      }
      if ($$props.activeHeading === void 0 && $$bindings.activeHeading && activeHeading !== void 0)
        $$bindings.activeHeading(activeHeading);
      if ($$props.activeHeadingScrollOffset === void 0 && $$bindings.activeHeadingScrollOffset && activeHeadingScrollOffset !== void 0)
        $$bindings.activeHeadingScrollOffset(activeHeadingScrollOffset);
      if ($$props.activeTocLi === void 0 && $$bindings.activeTocLi && activeTocLi !== void 0)
        $$bindings.activeTocLi(activeTocLi);
      if ($$props.aside === void 0 && $$bindings.aside && aside !== void 0)
        $$bindings.aside(aside);
      if ($$props.breakpoint === void 0 && $$bindings.breakpoint && breakpoint !== void 0)
        $$bindings.breakpoint(breakpoint);
      if ($$props.desktop === void 0 && $$bindings.desktop && desktop !== void 0)
        $$bindings.desktop(desktop);
      if ($$props.flashClickedHeadingsFor === void 0 && $$bindings.flashClickedHeadingsFor && flashClickedHeadingsFor !== void 0)
        $$bindings.flashClickedHeadingsFor(flashClickedHeadingsFor);
      if ($$props.getHeadingIds === void 0 && $$bindings.getHeadingIds && getHeadingIds !== void 0)
        $$bindings.getHeadingIds(getHeadingIds);
      if ($$props.getHeadingLevels === void 0 && $$bindings.getHeadingLevels && getHeadingLevels !== void 0)
        $$bindings.getHeadingLevels(getHeadingLevels);
      if ($$props.getHeadingTitles === void 0 && $$bindings.getHeadingTitles && getHeadingTitles !== void 0)
        $$bindings.getHeadingTitles(getHeadingTitles);
      if ($$props.headings === void 0 && $$bindings.headings && headings !== void 0)
        $$bindings.headings(headings);
      if ($$props.headingSelector === void 0 && $$bindings.headingSelector && headingSelector !== void 0)
        $$bindings.headingSelector(headingSelector);
      if ($$props.hide === void 0 && $$bindings.hide && hide !== void 0)
        $$bindings.hide(hide);
      if ($$props.autoHide === void 0 && $$bindings.autoHide && autoHide !== void 0)
        $$bindings.autoHide(autoHide);
      if ($$props.keepActiveTocItemInView === void 0 && $$bindings.keepActiveTocItemInView && keepActiveTocItemInView !== void 0)
        $$bindings.keepActiveTocItemInView(keepActiveTocItemInView);
      if ($$props.minItems === void 0 && $$bindings.minItems && minItems !== void 0)
        $$bindings.minItems(minItems);
      if ($$props.nav === void 0 && $$bindings.nav && nav !== void 0)
        $$bindings.nav(nav);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.openButtonLabel === void 0 && $$bindings.openButtonLabel && openButtonLabel !== void 0)
        $$bindings.openButtonLabel(openButtonLabel);
      if ($$props.reactToKeys === void 0 && $$bindings.reactToKeys && reactToKeys !== void 0)
        $$bindings.reactToKeys(reactToKeys);
      if ($$props.pageBody === void 0 && $$bindings.pageBody && pageBody !== void 0)
        $$bindings.pageBody(pageBody);
      if ($$props.scrollBehavior === void 0 && $$bindings.scrollBehavior && scrollBehavior !== void 0)
        $$bindings.scrollBehavior(scrollBehavior);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.titleTag === void 0 && $$bindings.titleTag && titleTag !== void 0)
        $$bindings.titleTag(titleTag);
      if ($$props.tocItems === void 0 && $$bindings.tocItems && tocItems !== void 0)
        $$bindings.tocItems(tocItems);
      if ($$props.warnOnEmpty === void 0 && $$bindings.warnOnEmpty && warnOnEmpty !== void 0)
        $$bindings.warnOnEmpty(warnOnEmpty);
      if ($$props.blurParams === void 0 && $$bindings.blurParams && blurParams !== void 0)
        $$bindings.blurParams(blurParams);
      $$result.css.add(css$3);
      {
        dispatch(`open`, { open });
      }
      levels = headings.map(getHeadingLevels);
      minLevel = Math.min(...levels);
      desktop = window_width > breakpoint;
      {
        if (open && nav) {
          set_active_heading();
          scroll_to_active_toc_item(`instant`);
        }
      }
      return ` <aside class="${[
        "toc svelte-j30iej",
        (desktop ? "desktop" : "") + " " + (hide ? "hidden" : "") + " " + (!desktop ? "mobile" : "")
      ].join(" ").trim()}" ${hide ? "hidden" : ""}${add_attribute("aria-hidden", hide, 0)}${add_attribute("this", aside, 0)}>${!open && !desktop && headings.length >= minItems ? `<button${add_attribute("aria-label", openButtonLabel, 0)} class="svelte-j30iej">${slots["open-toc-icon"] ? slots["open-toc-icon"]({}) : ` ${validate_component(MenuIcon, "MenuIcon").$$render($$result, { width: "1em" }, {}, {})} `}</button>` : ``} ${open || desktop && headings.length >= minItems ? `<nav class="svelte-j30iej"${add_attribute("this", nav, 0)}>${title ? `${slots.title ? slots.title({}) : ` ${((tag) => {
        return tag ? `<${titleTag} class="toc-title toc-exclude svelte-j30iej">${is_void(tag) ? "" : `${escape(title)}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
      })(titleTag)} `}` : ``} <ol class="svelte-j30iej">${each(headings, (heading, idx) => {
        return `<li role="menuitem" class="${["svelte-j30iej", activeTocLi === tocItems[idx] ? "active" : ""].join(" ").trim()}"${add_styles({
          "margin": `0 0 0 ${levels[idx] - minLevel}em`,
          "font-size": `${2 - 0.2 * (levels[idx] - minLevel)}ex`
        })}${add_attribute("this", tocItems[idx], 0)}>${slots["toc-item"] ? slots["toc-item"]({ heading, idx }) : ` ${escape(getHeadingTitles(heading))} `} </li>`;
      })}</ol></nav>` : ``} </aside>`;
    });
    css$2 = {
      code: ".modal.svelte-1lf0y8n{display:block;position:fixed;z-index:1;padding-top:60px;left:0;top:0;width:100%;height:100%;overflow:hidden;background-color:rgba(0, 0, 0, 0.4);opacity:1;transition:opacity 0.3s ease}.fade-in.svelte-1lf0y8n{opacity:1}.fade-out.svelte-1lf0y8n{opacity:0}.modal-image.svelte-1lf0y8n{display:block;margin:0 auto;max-width:105%;width:105%;height:110%;object-fit:cover;--webkit-user-select:none;user-select:none;-webkit-user-drag:none;transform:translateX(-2.5%);transform:translateY(-10%)}.close.svelte-1lf0y8n{color:#aaa;float:right;font-size:28px;font-weight:bold}.close.svelte-1lf0y8n:hover,.close.svelte-1lf0y8n:focus{text-decoration:none;cursor:pointer}.modal-text.svelte-1lf0y8n{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);background-color:rgba(20, 20, 20, 0.8);padding:20px;border-radius:10px;text-align:Left;width:80%;height:80%;color:white;overflow-y:scroll}h1.svelte-1lf0y8n{font-size:3.5em;margin:5px}@media(max-width: 600px){h1.svelte-1lf0y8n{font-size:2.5em}img.svelte-1lf0y8n{width:100%;height:auto}}.content-container.svelte-1lf0y8n{flex:1;padding-right:20px;overflow-y:auto}",
      map: `{"version":3,"file":"Modal.svelte","sources":["Modal.svelte"],"sourcesContent":["<script>\\n  import { onMount } from 'svelte';\\n  import { fade } from 'svelte/transition';\\n  import  Toc from './Toc.svelte'\\n  export let id;\\n  export let onClose;\\n\\n  let content;\\n  let isClosing = false;\\n  let tocHtml = '';\\n  const modalsData = {\\n    modal1: {\\n      title: 'About',\\n      content: \`\\n      <p>\\n          This is my project portfolio from year 9. It took some time to make, but I'm happy with the result. It was developed using Sveltekit (Javascript Framework).\\n        </p>\\n        <p>More on Sveltekit here: <a class='fancy' href=\\"https://kit.svelte.dev/\\">Sveltekit</a></p>\\n        <p>\\n          Click on the images to view the content for each section.\\n        </p>\\n<style>\\n  a {\\n    color:white;\\n    text-decoration: underline;\\n  }\\n  </style>\\n\\n\\n\\n      \`,\\n      image: \\"/about.jpg\\"\\n    },\\n    modal2: {\\n      title: 'Python',\\n      content: \`\\n      <h2>Variables</h2>\\n    <p>Variables are places in memory that can change, they can be assigned using assignment statements ('=' in python) as shown below.</p>\\n    <pre><code>\\nx = 13\\ny = x\\n    </code></pre>\\n\\n    <h3>Naming Variables</h3>\\n    <p>When naming a variable you cannot use the following:</p>\\n    <ul>\\n        <li>You cannot start with a number</li>\\n        <li>You cannot use a reserved word (e.g. int)</li>\\n        <li>You can only use alphanumeric characters (A-z 0-9)</li>\\n    </ul>\\n\\n    <h3>Data Types</h3>\\n    <p>Each variable has a datatype. The datatypes in python are as below:</p>\\n    <ul>\\n        <li><strong>String:</strong> 2 or more characters surrounded by \u201D or \u2018</li>\\n        <li><strong>Integer:</strong> whole number</li>\\n        <li><strong>Real:</strong> Number with a decimal part (in python it is float)</li>\\n        <li><strong>Boolean:</strong> true/false</li>\\n        <li><strong>Char:</strong> A single character</li>\\n    </ul>\\n\\n    <h3>Casting</h3>\\n    <p>Python automatically assigns data types when defining a variable, although you can manually force it to use a certain data type using the following commands:</p>\\n    <pre><code>\\nstr()   # forces string datatype\\nint()   # forces integer datatype\\nfloat() # forces real number (floating point) datatype\\nbool()  # forces boolean datatype\\n    </code></pre>\\n    <p>Forcing a datatype is called casting.</p>\\n\\n    <h3>Strings</h3>\\n    <p>In python strings are technically immutable (cannot be changed) lists of characters, but we can access individual characters.</p>\\n    <pre><code>\\nname = 'Jimmy'\\nprint(name)\\nprint(name[1])\\n    </code></pre>\\n    <p>This code outputs:</p>\\n    <pre><code>i</code></pre>\\n\\n    <h2>Operators</h2>\\n    <p>In python we use operators, some of these include:</p>\\n    <ul>\\n        <li>+ (addition)</li>\\n        <li>\u2013 (subtraction)</li>\\n        <li>/ (division)</li>\\n        <li>* (multiplication)</li>\\n        <li>% (Modulus \u2013 find remainder from division)</li>\\n        <li>// (Floor division, round down after dividing)</li>\\n    </ul>\\n    <p>When doing arithmetic, BIDMAS matters!</p>\\n\\n    <h2>Inputs</h2>\\n    <p>A piece of data provided by the user to be used in the program.</p>\\n    <p>It is used in the structure below:</p>\\n    <pre><code>variable = input()</code></pre>\\n    <p>Inputs should always be accompanied by a message (prompt) to the user.</p>\\n    <pre><code>\\nprint('Enter your name')\\nname = input()\\n# or you can do it like this\\nname = input('Enter your name: ')\\n    </code></pre>\\n\\n    <h2>Selection</h2>\\n    <p>In python, selection is achieved by the if statement.</p>\\n    <p>Real world example:</p>\\n    <blockquote>\\n        Are you good at time management<br>\\n        If yes: take IB for sixth form<br>\\n        If no: take A level for sixth form.\\n    </blockquote>\\n    <p>In python this can be done as below:</p>\\n    <pre><code>\\nname = input('What is your name?')\\nif name == 'Jimmy':      #condition\\n    print('Hello Jimmy') # action if condition is true\\nelse:\\n    print('not Jimmy')   # action if the condition is false\\n    </code></pre>\\n    <p>When using selection you use a boolean expression (returns True/False value) to check whether code is run. In python the boolean expressions are:</p>\\n    <ul>\\n        <li>==</li>\\n        <li>&lt;=</li>\\n        <li>&gt;=</li>\\n        <li>&lt;</li>\\n        <li>&gt;</li>\\n        <li>!=</li>\\n    </ul>\\n\\n    <h2>Lists</h2>\\n    <p>A list in python is a collection of values with a single identifier (These are often called arrays in other languages).</p>\\n    <pre><code>\\nFruits = ['Apple','banana','orange']\\nScores = [100,15,61,97]\\n    </code></pre>\\n    <p>Each value in an array is an element. The advantages of arrays are that it removes the need for multiple variables, it also allows us as developers to process the values more easily.</p>\\n    <p>Every element in an array has an index position, these positions always start at 0.</p>\\n    <p>To add items to an array (list) we use the array.append() command.</p>\\n    <pre><code>\\nFruits.append('Pear')\\nprint('Fruits')\\n# Before if we printed Fruits we would get:\\n# ['Apple','banana','orange']\\n# Now if we print this:\\n# ['Apple','banana','orange','Pear']\\n    </code></pre>\\n    <p>To remove from lists we use the array.remove() command.</p>\\n    <pre><code>\\nFruits.remove('Apple')\\n# If we print this array we get:\\n# ['banana','orange','Pear']\\n    </code></pre>\\n\\n    <h2>Iteration</h2>\\n    <p>The process of repeating one or more lines of code \u2013 this is accomplished using a loop.</p>\\n    <p>Examples of repeated actions in technology:</p>\\n    <ul>\\n        <li>Sending a Whatsapp message to multiple people in a group</li>\\n        <li>Updating DNS servers</li>\\n        <li>Retrieving data from a database</li>\\n        <li>Updating websockets</li>\\n        <li>Waiting for data to be received</li>\\n        <li>Scanning a network</li>\\n        <li>Multi snap in snapchat</li>\\n        <li>Repeating animations in a game</li>\\n        <li>GPS pinging satellites</li>\\n        <li>Refreshing frames on a screen</li>\\n        <li>Collaborative team game stats</li>\\n        <li>Finding images using a search engine</li>\\n    </ul>\\n\\n    <h3>Types of Loops</h3>\\n    <p>A loop is a set of instructions that is repeated until a condition is met. There are two types of loops:</p>\\n    <ul>\\n        <li><strong>Condition Controlled</strong> \u2013 Repeatedly loops while a condition is true (maximum number of repetitions is infinite)</li>\\n        <li><strong>Count Controlled</strong> \u2013 Repeats a set number of times.</li>\\n    </ul>\\n\\n    <h3>Condition Controlled Loops</h3>\\n    <p>In python the way you do a condition controlled loop is using the while loop function. To use a condition controlled loop you use a While loop. While loops repeatedly execute while the condition is true.</p>\\n    <pre><code>\\nname = \\"\\" # or name = input()\\nwhile name != \\"Arjun\\":\\n    name = input()\\n    print(\\"Not Arjun, try again\\")\\n# This Loop range is 0 to infinite\\n    </code></pre>\\n    <p>We use a while loop when we don\u2019t know how many times we need to repeat.</p>\\n\\n    <h3>Count Controlled Loops</h3>\\n    <p>A control construct that allows one or more lines of code to be repeatedly executed for a set number of times. \u2013 the number of repetitions needs to be known.</p>\\n    <p>Some examples include:</p>\\n    <ul>\\n        <li>Printing group messages</li>\\n        <li>Syncing changes of a document for multiple people</li>\\n        <li>Taking inputs for a sequence</li>\\n        <li>Sending people notifications of a detention</li>\\n    </ul>\\n    <p>To use count controlled loops you use a \u2018for\u2019 loop.</p>\\n    <pre><code>\\n# Syntax of for loops:\\nfor counter in range(0,10):\\n    print('counter')\\n# 10 is Up to but not including\\n# This code runs 10 times.\\n    </code></pre>\\n    <p>For Loops containing counters:</p>\\n    <pre><code>\\nn = 2\\nfor counter in range(0,30,n):\\n    print(counter)\\n# In the code above the variable counter starts at zero and counts up, executing the code while the variable counter is under 30.\\n# It also uses the range, with the first number being the starting value, the second number being the max value,\\n# and the final number (3rd) being the increments that counter is increased by (n) in this case that is 2.\\n    </code></pre>\\n      \`,\\n      image: \\"/Ad01.jpg\\"\\n    },\\n    modal3: {\\n      title: 'HTML',\\n      content: \`\\n\\n      <h2>Steps to Connect to a Website</h2>\\n    <ol>\\n        <li>You type in a Web address (URL - Uniform Resource Locator) into the address bar in the browser, such as <a href=\\"https://arjun.bond\\">https://arjun.bond</a></li>\\n        <li>Once you get the IP address, you connect and then are able to request a page from the Server.</li>\\n        <li>The server sends the webpage to your computer via the HTTP protocol as HTML code.</li>\\n        <li>The browser reads the HTML code and renders the page.</li>\\n    </ol>\\n\\n    <h2>HTML Basics</h2>\\n    <p>HTML stands for HyperText Markup Language and it is used for creating webpages.</p>\\n    <p>A web browser is designed to read HTML and then translate it to the things you can see on the screen.</p>\\n\\n    <h3>Tags</h3>\\n    <p>Tags are surrounded by &lt; chevrons &gt;.</p>\\n\\n    <h3>Boilerplate Code</h3>\\n    <p>Essential HTML code that all web pages have:</p>\\n    <pre><code>&lt;!DOCTYPE html&gt;\\n&lt;html&gt;\\n    &lt;head&gt;\\n    \\n    &lt;/head&gt;\\n    &lt;body&gt;\\n    \\n    &lt;/body&gt;\\n&lt;/html&gt;\\n    </code></pre>\\n\\n    <h3>Boilerplate Elements</h3>\\n    <ul>\\n        <li>&lt;!DOCTYPE html&gt; is always the first line of an HTML page.</li>\\n        <li>&lt;html&gt; - tells the browser it is HTML code for the page.</li>\\n        <li>&lt;head&gt; - contains things that aren't displayed in the main body of your page like the title.</li>\\n        <li>&lt;body&gt; - contains all the content you want to see displayed.</li>\\n    </ul>\\n\\n    <h2>Images and Links</h2>\\n    <h3>Accessibility</h3>\\n    <p>Having the ability to access something. Users of IT systems can have a wide range of needs, conditions, or disabilities.</p>\\n    <ul>\\n        <li>Use captions in videos.</li>\\n        <li>Use colors with good contrast.</li>\\n        <li>Voice recognition.</li>\\n        <li>Better error messages.</li>\\n    </ul>\\n\\n    <h3>Attributes</h3>\\n    <p>An attribute is an extra piece of information provided in a tag. For example, common image attributes are <code>src</code>, <code>height</code>, and <code>width</code>.</p>\\n    <p>Pixelation occurs when an image is larger than it should be.</p>\\n\\n    <h2>CSS - Cascading Style Sheets</h2>\\n    <p>HTML + CSS: HTML describes the structure of a webpage, then CSS describes the styling (presentation of the page).</p>\\n    <p>Every time we write CSS, we select the tag we want to work with, say which property we want to adjust, and give it the value we want to assign it.</p>\\n\\n    <h3>Using CSS in an HTML Page</h3>\\n    <p>There are 3 options:</p>\\n    <ol>\\n        <li>Write the CSS inside of the individual HTML tags.</li>\\n        <li>Write the CSS styles inside of the <code>&lt;style&gt;&lt;/style&gt;</code> tags in the <code>&lt;head&gt;</code> section of the HTML.</li>\\n        <li>Create an external CSS file with the styles defined in it and link the HTML page to the CSS file.</li>\\n    </ol>\\n\\n    <h2>The DIV Tag</h2>\\n    <p>The division <code>&lt;div&gt;</code> tag helps us to split the layout of a webpage into sections.</p>\\n    <p>We can create divisions in our pages by surrounding the blocks with these tags.</p>\\n    <p>When you group together HTML elements using <code>&lt;div&gt;</code> tags, you can ask CSS to make changes to elements within the DIV.</p>\\n    <p>We can think of DIVs as a way of breaking our page into boxes or containers. You can also have DIVs inside of DIVs.</p>\\n      \`,\\n      image: \\"/HTML.webp\\"\\n    },\\n    modal4: {\\n      title: 'AI/Emerging Technologies',\\n      content: \`\\n      <h2>Autonomous vehicles</h2>\\n      <h3>Autonomous Vehicles Components</h3>\\n    <h4>Sensors</h4>\\n    <ul>\\n        <li>Lasers</li>\\n        <li>Radar</li>\\n        <li>Cameras</li>\\n        <li>(LiDAR)</li>\\n        <li>Ultrasonic/IR Sensors at front/rear</li>\\n    </ul>\\n\\n    <h3>Properties of Autonomous Vehicles</h3>\\n    <ul>\\n        <li>Rounded shape to maximize sensor field of view</li>\\n        <li>Computer specifically designed for self-driving</li>\\n        <li>Back up systems for steering, braking, computing, and more</li>\\n        <li>Electric batteries to power the vehicles</li>\\n    </ul>\\n\\n    <h2>Technology Explained</h2>\\n    <h3>AutoPilot</h3>\\n    <p>To assist the driver.</p>\\n\\n    <h3>Anti-Lock Brakes</h3>\\n    <p>Warns or takes action in case of danger, and applies the brake automatically.</p>\\n\\n    <h3>Adaptive Cruise Control</h3>\\n    <p>Keeps the vehicle at a safe distance behind cars ahead of it.</p>\\n\\n    <h3>Lane Departure Warning System</h3>\\n    <p>Warns if you are leaving a lane.</p>\\n\\n    <h3>Intelligent Parking</h3>\\n    <p>Parks automatically and uses parking sensors.</p>\\n\\n    <h3>Blind Spot Monitoring</h3>\\n    <p>Checks the blind spot.</p>\\n\\n    <h2>Artificial Intelligence</h2>\\n    <h3>What is AI?</h3>\\n    <p>Ai is a piece of software that takes an input, and produces an output based on many different factors</p>\\n    <h4>Types of AI</h4>\\n    <ul>\\n      <li>Narrow AI - AI that is designed for a specific task, examples include LLMs (Large Language Models)</li>\\n      <li>General AI - AI that can perform any intellectual task that a human can do</li>\\n      </ul>\\n    <p>Every year, computers become:</p>\\n    <ul>\\n        <li>Faster</li>\\n        <li>Smaller</li>\\n        <li>Able to store more data</li>\\n        <li>Better connected</li>\\n    </ul>\\n    <p>AI is used in many things, even currently, here are some examples:</p>\\n    <ul>\\n        <li>Travel (such as Google Maps)</li>\\n        <li>Entertainment - Personalised Video Recommendations, such as on platforms like YouTube</li>\\n        <li>Healthcare - AI can be used to diagnose diseases</li>\\n        <li>Finance - AI can be used to predict stock prices</li>\\n        <li>Education - AI can be used to personalise learning</li>\\n        <li>Security - AI can be used to detect malware</li>\\n        </ul>\\n    <h2>Crypto Currencies</h2>\\n    <h3>Distributed Ledgers</h3>\\n    <ul>\\n        <li><strong>Ledger:</strong> a database/record of all transactions.</li>\\n        <li><strong>Distributed ledger:</strong> multiple parties have a copy of the ledger.\\n            <ul>\\n                <li>If 50%+ agree on ledger contents, it's trustworthy.</li>\\n            </ul>\\n        </li>\\n    </ul>\\n    <h3>Blockchain</h3>\\n    <p>A system where a record of transactions are maintained across computers in a peer to peer network.  </p>\\n    <h4>Three benefits of blockchain:</h4>\\n    <ol>\\n      <li>More trust, as everyone can check transactions</li>\\n      <li>Transparent, as the ledger is public and accessible to anyone</li>\\n      <li>More Secure, as everyone can check transactions and the ledger is public</li>\\n    </ol>\\n    <h4>Three drawbacks of blockchain:</h4>\\n    <ol>\\n      <li>Slow, as every transaction needs to be verified by multiple computers</li>\\n      <li>Expensive, as the computers need to be paid for their work</li>\\n      <li>Not private, as everyone can see the transactions</li>\\n    </ol>\\n    <h4>Uses of the blockchain:</h4>\\n    <ol>\\n      <li>Voting - If election process is put on blockchain, run by multiple parties, it can prevent corruption, as it is more difficult to manipulate the results.</li>\\n      <li>Distributed Asset Trading - easily authenticating transactions, instead of much paper.</li>\\n      <li>Smart Contracts - enforcing a contract via the blockchain.</li>\\n    </ol>\\n\\n    <p>for more info on cryptocurrencies watch <a href='https://www.youtube.com/watch?v=rYQgy8QDEBI'>this video</a></p>\\n    <iframe  src=\\"https://www.youtube.com/embed/rYQgy8QDEBI?si=SHbXdFJN_g3gVSd6\\" title=\\"YouTube video player\\" frameborder=\\"0\\" allow=\\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\\" referrerpolicy=\\"strict-origin-when-cross-origin\\" allowfullscreen></iframe>\\n    <style>\\n      a {\\n        color:white;\\n        text-decoration: underline;\\n      }\\n      iframe {\\n        width: 75%;\\n        height: auto;\\n        aspect-ratio: 16/9;\\n      }\\n      \`,\\n      image: \\"/AiEmer.jpg\\"\\n    },\\n    modal5: {\\n      title: 'Amazon Technologies Project',\\n      content: \`\\n      <h1>Amazon Prime Chat</h1>\\n\\n<h2>What is it?</h2>\\n<ul>\\n    <li>Amazon Prime Chat is an AI chatbot that allows all customers and employees easy access to all things Amazon related.</li>\\n    <li>Employees such as customer support employees can use it to give quicker assistance to people.</li>\\n    <li>Employees such as technical support can use it to diagnose and fix issues.</li>\\n    <li>Customers can use it to find a specific product, or to help them decide what product to purchase.</li>\\n</ul>\\n\\n<h2>The Product</h2>\\n<ul>\\n    <li>The chatbot consists of a custom model, which is based upon GPT-4 from OpenAI, although this model can also be made in-house.</li>\\n    <li>The product will be hosted on a section of amazon.com, as well as a custom model in an intranet for employees.</li>\\n    <li>The backend can be hosted on AWS, but can also be offloaded to Google Cloud Platform or Microsoft Azure.</li>\\n</ul>\\n\\n<h2>Cost</h2>\\n<ul>\\n    <li>The chatbot will be available to everyone, and therefore free, although Prime subscribers can have more functionality such as order tracking and summaries of recent activity on the first launch/visit.</li>\\n    <li>The cost of the custom model will be around \xA3600,000 per annum (if using OpenAI custom model).</li>\\n    <li>Otherwise, the cost will be greater, possibly up to \xA350 million.</li>\\n    <li>This product is free, although it will make money by logging user activity and selling products at a marginally higher price.</li>\\n</ul>\\n\\n<h2>What does it look like?</h2>\\n<img src='/Primechat.jpg' alt='Amazon Prime Chat' style='width: 50%%;'>\\n\\n<h2>How this will benefit Amazon</h2>\\n<ul>\\n    <li>Since Amazon makes many transactions, this AI can help users make more due to the suggestion of products.</li>\\n    <li>It can also recommend more relevant products than the current algorithm.</li>\\n    <li>It will help support staff provide support, therefore retaining more customers who will pay.</li>\\n    <li>It will help technical staff help other staff, or to debug issues and resolve them, leading to more productive time or uptime, which will result in more money made.</li>\\n</ul>\\n\\n<h2>Development Time</h2>\\n<h3>OpenAI Custom Model</h3>\\n<ul>\\n    <li>Model Training: 1 year</li>\\n    <li>Testing: 2 months</li>\\n    <li>Total: 1 year 2 months</li>\\n</ul>\\n\\n<h3>In-house Model</h3>\\n<ul>\\n    <li>Infrastructure: 4 months</li>\\n    <li>R&D: 2 years</li>\\n    <li>Development: 1 year</li>\\n    <li>Testing: 2 months</li>\\n    <li>Total: 3 years, 6 months</li>\\n</ul>\\n<a href=\\"https://www.arjun.bond/wp-content/uploads/2024/05/Amazon-Prime-Chat-1.pdf\\" download=\\"\\" target=\\"__blank\\"><p>To get the information above in a pdf, click here</p></a>\\n<style>\\n  a {\\n    color:white;\\n    text-decoration: underline;\\n  }\\n  @media (max-width: 600px) {\\n  img {\\n    width: 100%;\\n    height: auto;\\n  }\\n}\\n  </style>\\n      \`,\\n      image: \\"/amazon.jpeg\\"\\n    }\\n  };\\n\\n  onMount(() => {\\n    content = modalsData[id].content;\\n    tocHtml = generateTOC(content);\\n  });\\n\\n  function handleClose() {\\n    isClosing = true;\\n    setTimeout(() => {\\n      if (typeof onClose === 'function') {\\n        onClose();\\n      }\\n      isClosing = false;\\n    }, 1); // Matches the duration of the fade-out transition\\n  }\\n function handleTOCClick(event) {\\n    scrollToSection(event); // Pass the target element directly\\n  }\\n\\n\\n\\n\\n\\nfunction generateTOC(content) {\\n  const tempDiv = document.createElement('div');\\n  tempDiv.innerHTML = content;\\n  const headings = tempDiv.querySelectorAll('h2, h3');\\n  let tocHtml = '';\\n  headings.forEach((heading, index) => {\\n    const level = heading.tagName.toLowerCase();\\n    const text = heading.textContent;\\n    const id = \`section-\${index}\`; // Generate unique ID for each section\\n    heading.id = id; // Assign ID to the heading for linking\\n    const listItem = \`<li><a href=\\"#\${id}\\"><\${level}>\${text}</\${level}></a></li>\`;\\n    tocHtml += listItem;\\n  });\\n  return \`<ul>\${tocHtml}</ul>\`;\\n}\\n\\nfunction scrollToSection(id) {\\n  const section = document.getElementById(id);\\n    if (section) {\\n      section.scrollIntoView({ behavior: 'smooth' });\\n    }\\n}\\n\\n\\n\\n\\n\\n\\n\\n\\n<\/script>\\n\\n<div class=\\"modal {isClosing ? 'fade-out' : 'fade-in'}\\" id={id} transition:fade={{ duration: 300 }}>\\n  <span class=\\"close\\" on:click={handleClose}>&times;</span>\\n  <img class=\\"modal-image\\" src={modalsData[id].image} />\\n  \\n  <div class=\\"modal-text\\">\\n    <h1>{modalsData[id].title}</h1>\\n    <div class=\\"toc\\">\\n        \\n        \\n      <Toc class='toc'> </Toc>\\n      </div>\\n    <div class=\\"content-container\\">\\n<hr>\\n      <div class=\\"content\\">\\n        {@html content}\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n\\n  .modal {\\n    display: block;\\n    position: fixed;\\n    z-index: 1;\\n    padding-top: 60px;\\n    left: 0;\\n    top: 0;\\n    width: 100%;\\n    height: 100%;\\n    overflow: hidden;\\n    background-color: rgba(0, 0, 0, 0.4);\\n    opacity: 1;\\n    transition: opacity 0.3s ease;\\n  }\\n  .fade-in {\\n    opacity: 1;\\n  }\\n  .fade-out {\\n    opacity: 0;\\n  }\\n  .modal-image {\\n    display: block;\\n    margin: 0 auto;\\n    max-width: 105%;\\n    width:105%;\\n    height: 110%;\\n  object-fit: cover;\\n  --webkit-user-select: none;\\n  user-select: none;\\n  -webkit-user-drag: none;\\n  transform: translateX(-2.5%);\\n  transform: translateY(-10%);\\n  \\n  }\\n\\n  .close {\\n    color: #aaa;\\n    float: right;\\n    font-size: 28px;\\n    font-weight: bold;\\n  }\\n  .close:hover,\\n  .close:focus {\\n    text-decoration: none;\\n    cursor: pointer;\\n  }\\n  .modal-text {\\n    position: absolute;\\n    top: 50%;\\n    left: 50%;\\n    transform: translate(-50%, -50%);\\n    background-color: rgba(20, 20, 20, 0.8);\\n    padding: 20px;\\n    border-radius: 10px;\\n    text-align: Left;\\n    width: 80%;\\n    height: 80%;\\n    color: white;\\n    overflow-y: scroll;\\n  }\\n  h1 {\\n    font-size: 3.5em;\\n    margin: 5px;\\n  }\\n  @media (max-width: 600px) {\\n  h1 {\\n    font-size:2.5em;\\n\\n  }\\n  img {\\n    width: 100%;\\n    height: auto;\\n  }\\n}\\n\\n  .content-container {\\n    flex: 1;\\n    padding-right: 20px; /* Adjust spacing between TOC and content */\\n    overflow-y: auto; /* Allow scrolling if content is too long */\\n  }\\n\\n\\n</style>\\n"],"names":[],"mappings":"AA0iBE,qBAAO,CACL,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,IAAI,CACjB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,CAChB,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACpC,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,OAAO,CAAC,IAAI,CAAC,IAC3B,CACA,uBAAS,CACP,OAAO,CAAE,CACX,CACA,wBAAU,CACR,OAAO,CAAE,CACX,CACA,2BAAa,CACX,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,SAAS,CAAE,IAAI,CACf,MAAM,IAAI,CACV,MAAM,CAAE,IAAI,CACd,UAAU,CAAE,KAAK,CACjB,oBAAoB,CAAE,IAAI,CAC1B,WAAW,CAAE,IAAI,CACjB,iBAAiB,CAAE,IAAI,CACvB,SAAS,CAAE,WAAW,KAAK,CAAC,CAC5B,SAAS,CAAE,WAAW,IAAI,CAE1B,CAEA,qBAAO,CACL,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IACf,CACA,qBAAM,MAAM,CACZ,qBAAM,MAAO,CACX,eAAe,CAAE,IAAI,CACrB,MAAM,CAAE,OACV,CACA,0BAAY,CACV,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CACvC,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MACd,CACA,iBAAG,CACD,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,GACV,CACA,MAAO,YAAY,KAAK,CAAE,CAC1B,iBAAG,CACD,UAAU,KAEZ,CACA,kBAAI,CACF,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV,CACF,CAEE,iCAAmB,CACjB,IAAI,CAAE,CAAC,CACP,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IACd"}`
    };
    Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { id } = $$props;
      let { onClose } = $$props;
      let content;
      const modalsData = {
        modal1: {
          title: "About",
          content: `
      <p>
          This is my project portfolio from year 9. It took some time to make, but I'm happy with the result. It was developed using Sveltekit (Javascript Framework).
        </p>
        <p>More on Sveltekit here: <a class='fancy' href="https://kit.svelte.dev/">Sveltekit</a></p>
        <p>
          Click on the images to view the content for each section.
        </p>
<style>
  a {
    color:white;
    text-decoration: underline;
  }
  </style>



      `,
          image: "/about.jpg"
        },
        modal2: {
          title: "Python",
          content: `
      <h2>Variables</h2>
    <p>Variables are places in memory that can change, they can be assigned using assignment statements ('=' in python) as shown below.</p>
    <pre><code>
x = 13
y = x
    </code></pre>

    <h3>Naming Variables</h3>
    <p>When naming a variable you cannot use the following:</p>
    <ul>
        <li>You cannot start with a number</li>
        <li>You cannot use a reserved word (e.g. int)</li>
        <li>You can only use alphanumeric characters (A-z 0-9)</li>
    </ul>

    <h3>Data Types</h3>
    <p>Each variable has a datatype. The datatypes in python are as below:</p>
    <ul>
        <li><strong>String:</strong> 2 or more characters surrounded by \u201D or \u2018</li>
        <li><strong>Integer:</strong> whole number</li>
        <li><strong>Real:</strong> Number with a decimal part (in python it is float)</li>
        <li><strong>Boolean:</strong> true/false</li>
        <li><strong>Char:</strong> A single character</li>
    </ul>

    <h3>Casting</h3>
    <p>Python automatically assigns data types when defining a variable, although you can manually force it to use a certain data type using the following commands:</p>
    <pre><code>
str()   # forces string datatype
int()   # forces integer datatype
float() # forces real number (floating point) datatype
bool()  # forces boolean datatype
    </code></pre>
    <p>Forcing a datatype is called casting.</p>

    <h3>Strings</h3>
    <p>In python strings are technically immutable (cannot be changed) lists of characters, but we can access individual characters.</p>
    <pre><code>
name = 'Jimmy'
print(name)
print(name[1])
    </code></pre>
    <p>This code outputs:</p>
    <pre><code>i</code></pre>

    <h2>Operators</h2>
    <p>In python we use operators, some of these include:</p>
    <ul>
        <li>+ (addition)</li>
        <li>\u2013 (subtraction)</li>
        <li>/ (division)</li>
        <li>* (multiplication)</li>
        <li>% (Modulus \u2013 find remainder from division)</li>
        <li>// (Floor division, round down after dividing)</li>
    </ul>
    <p>When doing arithmetic, BIDMAS matters!</p>

    <h2>Inputs</h2>
    <p>A piece of data provided by the user to be used in the program.</p>
    <p>It is used in the structure below:</p>
    <pre><code>variable = input()</code></pre>
    <p>Inputs should always be accompanied by a message (prompt) to the user.</p>
    <pre><code>
print('Enter your name')
name = input()
# or you can do it like this
name = input('Enter your name: ')
    </code></pre>

    <h2>Selection</h2>
    <p>In python, selection is achieved by the if statement.</p>
    <p>Real world example:</p>
    <blockquote>
        Are you good at time management<br>
        If yes: take IB for sixth form<br>
        If no: take A level for sixth form.
    </blockquote>
    <p>In python this can be done as below:</p>
    <pre><code>
name = input('What is your name?')
if name == 'Jimmy':      #condition
    print('Hello Jimmy') # action if condition is true
else:
    print('not Jimmy')   # action if the condition is false
    </code></pre>
    <p>When using selection you use a boolean expression (returns True/False value) to check whether code is run. In python the boolean expressions are:</p>
    <ul>
        <li>==</li>
        <li>&lt;=</li>
        <li>&gt;=</li>
        <li>&lt;</li>
        <li>&gt;</li>
        <li>!=</li>
    </ul>

    <h2>Lists</h2>
    <p>A list in python is a collection of values with a single identifier (These are often called arrays in other languages).</p>
    <pre><code>
Fruits = ['Apple','banana','orange']
Scores = [100,15,61,97]
    </code></pre>
    <p>Each value in an array is an element. The advantages of arrays are that it removes the need for multiple variables, it also allows us as developers to process the values more easily.</p>
    <p>Every element in an array has an index position, these positions always start at 0.</p>
    <p>To add items to an array (list) we use the array.append() command.</p>
    <pre><code>
Fruits.append('Pear')
print('Fruits')
# Before if we printed Fruits we would get:
# ['Apple','banana','orange']
# Now if we print this:
# ['Apple','banana','orange','Pear']
    </code></pre>
    <p>To remove from lists we use the array.remove() command.</p>
    <pre><code>
Fruits.remove('Apple')
# If we print this array we get:
# ['banana','orange','Pear']
    </code></pre>

    <h2>Iteration</h2>
    <p>The process of repeating one or more lines of code \u2013 this is accomplished using a loop.</p>
    <p>Examples of repeated actions in technology:</p>
    <ul>
        <li>Sending a Whatsapp message to multiple people in a group</li>
        <li>Updating DNS servers</li>
        <li>Retrieving data from a database</li>
        <li>Updating websockets</li>
        <li>Waiting for data to be received</li>
        <li>Scanning a network</li>
        <li>Multi snap in snapchat</li>
        <li>Repeating animations in a game</li>
        <li>GPS pinging satellites</li>
        <li>Refreshing frames on a screen</li>
        <li>Collaborative team game stats</li>
        <li>Finding images using a search engine</li>
    </ul>

    <h3>Types of Loops</h3>
    <p>A loop is a set of instructions that is repeated until a condition is met. There are two types of loops:</p>
    <ul>
        <li><strong>Condition Controlled</strong> \u2013 Repeatedly loops while a condition is true (maximum number of repetitions is infinite)</li>
        <li><strong>Count Controlled</strong> \u2013 Repeats a set number of times.</li>
    </ul>

    <h3>Condition Controlled Loops</h3>
    <p>In python the way you do a condition controlled loop is using the while loop function. To use a condition controlled loop you use a While loop. While loops repeatedly execute while the condition is true.</p>
    <pre><code>
name = "" # or name = input()
while name != "Arjun":
    name = input()
    print("Not Arjun, try again")
# This Loop range is 0 to infinite
    </code></pre>
    <p>We use a while loop when we don\u2019t know how many times we need to repeat.</p>

    <h3>Count Controlled Loops</h3>
    <p>A control construct that allows one or more lines of code to be repeatedly executed for a set number of times. \u2013 the number of repetitions needs to be known.</p>
    <p>Some examples include:</p>
    <ul>
        <li>Printing group messages</li>
        <li>Syncing changes of a document for multiple people</li>
        <li>Taking inputs for a sequence</li>
        <li>Sending people notifications of a detention</li>
    </ul>
    <p>To use count controlled loops you use a \u2018for\u2019 loop.</p>
    <pre><code>
# Syntax of for loops:
for counter in range(0,10):
    print('counter')
# 10 is Up to but not including
# This code runs 10 times.
    </code></pre>
    <p>For Loops containing counters:</p>
    <pre><code>
n = 2
for counter in range(0,30,n):
    print(counter)
# In the code above the variable counter starts at zero and counts up, executing the code while the variable counter is under 30.
# It also uses the range, with the first number being the starting value, the second number being the max value,
# and the final number (3rd) being the increments that counter is increased by (n) in this case that is 2.
    </code></pre>
      `,
          image: "/Ad01.jpg"
        },
        modal3: {
          title: "HTML",
          content: `

      <h2>Steps to Connect to a Website</h2>
    <ol>
        <li>You type in a Web address (URL - Uniform Resource Locator) into the address bar in the browser, such as <a href="https://arjun.bond">https://arjun.bond</a></li>
        <li>Once you get the IP address, you connect and then are able to request a page from the Server.</li>
        <li>The server sends the webpage to your computer via the HTTP protocol as HTML code.</li>
        <li>The browser reads the HTML code and renders the page.</li>
    </ol>

    <h2>HTML Basics</h2>
    <p>HTML stands for HyperText Markup Language and it is used for creating webpages.</p>
    <p>A web browser is designed to read HTML and then translate it to the things you can see on the screen.</p>

    <h3>Tags</h3>
    <p>Tags are surrounded by &lt; chevrons &gt;.</p>

    <h3>Boilerplate Code</h3>
    <p>Essential HTML code that all web pages have:</p>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
    
    &lt;/head&gt;
    &lt;body&gt;
    
    &lt;/body&gt;
&lt;/html&gt;
    </code></pre>

    <h3>Boilerplate Elements</h3>
    <ul>
        <li>&lt;!DOCTYPE html&gt; is always the first line of an HTML page.</li>
        <li>&lt;html&gt; - tells the browser it is HTML code for the page.</li>
        <li>&lt;head&gt; - contains things that aren't displayed in the main body of your page like the title.</li>
        <li>&lt;body&gt; - contains all the content you want to see displayed.</li>
    </ul>

    <h2>Images and Links</h2>
    <h3>Accessibility</h3>
    <p>Having the ability to access something. Users of IT systems can have a wide range of needs, conditions, or disabilities.</p>
    <ul>
        <li>Use captions in videos.</li>
        <li>Use colors with good contrast.</li>
        <li>Voice recognition.</li>
        <li>Better error messages.</li>
    </ul>

    <h3>Attributes</h3>
    <p>An attribute is an extra piece of information provided in a tag. For example, common image attributes are <code>src</code>, <code>height</code>, and <code>width</code>.</p>
    <p>Pixelation occurs when an image is larger than it should be.</p>

    <h2>CSS - Cascading Style Sheets</h2>
    <p>HTML + CSS: HTML describes the structure of a webpage, then CSS describes the styling (presentation of the page).</p>
    <p>Every time we write CSS, we select the tag we want to work with, say which property we want to adjust, and give it the value we want to assign it.</p>

    <h3>Using CSS in an HTML Page</h3>
    <p>There are 3 options:</p>
    <ol>
        <li>Write the CSS inside of the individual HTML tags.</li>
        <li>Write the CSS styles inside of the <code>&lt;style&gt;&lt;/style&gt;</code> tags in the <code>&lt;head&gt;</code> section of the HTML.</li>
        <li>Create an external CSS file with the styles defined in it and link the HTML page to the CSS file.</li>
    </ol>

    <h2>The DIV Tag</h2>
    <p>The division <code>&lt;div&gt;</code> tag helps us to split the layout of a webpage into sections.</p>
    <p>We can create divisions in our pages by surrounding the blocks with these tags.</p>
    <p>When you group together HTML elements using <code>&lt;div&gt;</code> tags, you can ask CSS to make changes to elements within the DIV.</p>
    <p>We can think of DIVs as a way of breaking our page into boxes or containers. You can also have DIVs inside of DIVs.</p>
      `,
          image: "/HTML.webp"
        },
        modal4: {
          title: "AI/Emerging Technologies",
          content: `
      <h2>Autonomous vehicles</h2>
      <h3>Autonomous Vehicles Components</h3>
    <h4>Sensors</h4>
    <ul>
        <li>Lasers</li>
        <li>Radar</li>
        <li>Cameras</li>
        <li>(LiDAR)</li>
        <li>Ultrasonic/IR Sensors at front/rear</li>
    </ul>

    <h3>Properties of Autonomous Vehicles</h3>
    <ul>
        <li>Rounded shape to maximize sensor field of view</li>
        <li>Computer specifically designed for self-driving</li>
        <li>Back up systems for steering, braking, computing, and more</li>
        <li>Electric batteries to power the vehicles</li>
    </ul>

    <h2>Technology Explained</h2>
    <h3>AutoPilot</h3>
    <p>To assist the driver.</p>

    <h3>Anti-Lock Brakes</h3>
    <p>Warns or takes action in case of danger, and applies the brake automatically.</p>

    <h3>Adaptive Cruise Control</h3>
    <p>Keeps the vehicle at a safe distance behind cars ahead of it.</p>

    <h3>Lane Departure Warning System</h3>
    <p>Warns if you are leaving a lane.</p>

    <h3>Intelligent Parking</h3>
    <p>Parks automatically and uses parking sensors.</p>

    <h3>Blind Spot Monitoring</h3>
    <p>Checks the blind spot.</p>

    <h2>Artificial Intelligence</h2>
    <h3>What is AI?</h3>
    <p>Ai is a piece of software that takes an input, and produces an output based on many different factors</p>
    <h4>Types of AI</h4>
    <ul>
      <li>Narrow AI - AI that is designed for a specific task, examples include LLMs (Large Language Models)</li>
      <li>General AI - AI that can perform any intellectual task that a human can do</li>
      </ul>
    <p>Every year, computers become:</p>
    <ul>
        <li>Faster</li>
        <li>Smaller</li>
        <li>Able to store more data</li>
        <li>Better connected</li>
    </ul>
    <p>AI is used in many things, even currently, here are some examples:</p>
    <ul>
        <li>Travel (such as Google Maps)</li>
        <li>Entertainment - Personalised Video Recommendations, such as on platforms like YouTube</li>
        <li>Healthcare - AI can be used to diagnose diseases</li>
        <li>Finance - AI can be used to predict stock prices</li>
        <li>Education - AI can be used to personalise learning</li>
        <li>Security - AI can be used to detect malware</li>
        </ul>
    <h2>Crypto Currencies</h2>
    <h3>Distributed Ledgers</h3>
    <ul>
        <li><strong>Ledger:</strong> a database/record of all transactions.</li>
        <li><strong>Distributed ledger:</strong> multiple parties have a copy of the ledger.
            <ul>
                <li>If 50%+ agree on ledger contents, it's trustworthy.</li>
            </ul>
        </li>
    </ul>
    <h3>Blockchain</h3>
    <p>A system where a record of transactions are maintained across computers in a peer to peer network.  </p>
    <h4>Three benefits of blockchain:</h4>
    <ol>
      <li>More trust, as everyone can check transactions</li>
      <li>Transparent, as the ledger is public and accessible to anyone</li>
      <li>More Secure, as everyone can check transactions and the ledger is public</li>
    </ol>
    <h4>Three drawbacks of blockchain:</h4>
    <ol>
      <li>Slow, as every transaction needs to be verified by multiple computers</li>
      <li>Expensive, as the computers need to be paid for their work</li>
      <li>Not private, as everyone can see the transactions</li>
    </ol>
    <h4>Uses of the blockchain:</h4>
    <ol>
      <li>Voting - If election process is put on blockchain, run by multiple parties, it can prevent corruption, as it is more difficult to manipulate the results.</li>
      <li>Distributed Asset Trading - easily authenticating transactions, instead of much paper.</li>
      <li>Smart Contracts - enforcing a contract via the blockchain.</li>
    </ol>

    <p>for more info on cryptocurrencies watch <a href='https://www.youtube.com/watch?v=rYQgy8QDEBI'>this video</a></p>
    <iframe  src="https://www.youtube.com/embed/rYQgy8QDEBI?si=SHbXdFJN_g3gVSd6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <style>
      a {
        color:white;
        text-decoration: underline;
      }
      iframe {
        width: 75%;
        height: auto;
        aspect-ratio: 16/9;
      }
      `,
          image: "/AiEmer.jpg"
        },
        modal5: {
          title: "Amazon Technologies Project",
          content: `
      <h1>Amazon Prime Chat</h1>

<h2>What is it?</h2>
<ul>
    <li>Amazon Prime Chat is an AI chatbot that allows all customers and employees easy access to all things Amazon related.</li>
    <li>Employees such as customer support employees can use it to give quicker assistance to people.</li>
    <li>Employees such as technical support can use it to diagnose and fix issues.</li>
    <li>Customers can use it to find a specific product, or to help them decide what product to purchase.</li>
</ul>

<h2>The Product</h2>
<ul>
    <li>The chatbot consists of a custom model, which is based upon GPT-4 from OpenAI, although this model can also be made in-house.</li>
    <li>The product will be hosted on a section of amazon.com, as well as a custom model in an intranet for employees.</li>
    <li>The backend can be hosted on AWS, but can also be offloaded to Google Cloud Platform or Microsoft Azure.</li>
</ul>

<h2>Cost</h2>
<ul>
    <li>The chatbot will be available to everyone, and therefore free, although Prime subscribers can have more functionality such as order tracking and summaries of recent activity on the first launch/visit.</li>
    <li>The cost of the custom model will be around \xA3600,000 per annum (if using OpenAI custom model).</li>
    <li>Otherwise, the cost will be greater, possibly up to \xA350 million.</li>
    <li>This product is free, although it will make money by logging user activity and selling products at a marginally higher price.</li>
</ul>

<h2>What does it look like?</h2>
<img src='/Primechat.jpg' alt='Amazon Prime Chat' style='width: 50%%;'>

<h2>How this will benefit Amazon</h2>
<ul>
    <li>Since Amazon makes many transactions, this AI can help users make more due to the suggestion of products.</li>
    <li>It can also recommend more relevant products than the current algorithm.</li>
    <li>It will help support staff provide support, therefore retaining more customers who will pay.</li>
    <li>It will help technical staff help other staff, or to debug issues and resolve them, leading to more productive time or uptime, which will result in more money made.</li>
</ul>

<h2>Development Time</h2>
<h3>OpenAI Custom Model</h3>
<ul>
    <li>Model Training: 1 year</li>
    <li>Testing: 2 months</li>
    <li>Total: 1 year 2 months</li>
</ul>

<h3>In-house Model</h3>
<ul>
    <li>Infrastructure: 4 months</li>
    <li>R&D: 2 years</li>
    <li>Development: 1 year</li>
    <li>Testing: 2 months</li>
    <li>Total: 3 years, 6 months</li>
</ul>
<a href="https://www.arjun.bond/wp-content/uploads/2024/05/Amazon-Prime-Chat-1.pdf" download="" target="__blank"><p>To get the information above in a pdf, click here</p></a>
<style>
  a {
    color:white;
    text-decoration: underline;
  }
  @media (max-width: 600px) {
  img {
    width: 100%;
    height: auto;
  }
}
  </style>
      `,
          image: "/amazon.jpeg"
        }
      };
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0)
        $$bindings.onClose(onClose);
      $$result.css.add(css$2);
      return `<div class="${"modal " + escape("fade-in", true) + " svelte-1lf0y8n"}"${add_attribute("id", id, 0)}><span class="close svelte-1lf0y8n" data-svelte-h="svelte-hhcsdi">\xD7</span> <img class="modal-image svelte-1lf0y8n"${add_attribute("src", modalsData[id].image, 0)}> <div class="modal-text svelte-1lf0y8n"><h1 class="svelte-1lf0y8n">${escape(modalsData[id].title)}</h1> <div class="toc">${validate_component(Toc, "Toc").$$render($$result, { class: "toc" }, {}, {})}</div> <div class="content-container svelte-1lf0y8n"><hr> <div class="content"><!-- HTML_TAG_START -->${content}<!-- HTML_TAG_END --></div></div></div> </div>`;
    });
    css$1 = {
      code: ".instruction-card.svelte-laq1tm.svelte-laq1tm{background:#333;color:white;padding:1rem;border-radius:8px;margin:1rem;text-align:left;flex-shrink:0}.instruction-card.svelte-laq1tm button.svelte-laq1tm{margin-top:1rem;padding:0.5rem 1rem;background:#fff;border:none;color:#333;cursor:pointer;border-radius:4px}.instruction-card.svelte-laq1tm button.svelte-laq1tm:hover{background:#ddd}",
      map: `{"version":3,"file":"InstructionCard.svelte","sources":["InstructionCard.svelte"],"sourcesContent":["<script>\\n    import { createEventDispatcher } from 'svelte';\\n  \\n    const dispatch = createEventDispatcher();\\n  \\n    function dismiss() {\\n      dispatch('dismiss');\\n    }\\n  <\/script>\\n  \\n  <div class=\\"instruction-card\\">\\n    <h1>How to Use the Site</h1>\\n    <ul>\\n        <li><p>This site uses scrolling to move between cards.</p></li>\\n    \\n    <li><p>To move the cards left or right, use the scroll wheel on your mouse.</p></li>\\n    <li><p>To see information about the topic on a card, click on it.</p></li>\\n    <li><p>At the top of each card, there is a table of contents, click on a section to scroll there.</p></li>\\n    <li><p>To close the card press the 'x' in the top right corner</p></li>\\n    <li><p>If you cannot scroll please make sure Javascript is enabled in your browser</p></li>\\n    </ul>\\n    <p>Click the button below to dismiss this message, it will not be shown again.</p>\\n    <button on:click={dismiss}>Got it!</button>\\n  </div>\\n  \\n  <style>\\n    .instruction-card {\\n      background: #333; /* Grey background with some transparency */\\n      color: white;\\n      padding: 1rem;\\n      border-radius: 8px;\\n      margin: 1rem;\\n      text-align: left;\\n      flex-shrink: 0; /* Ensure it doesn't shrink */\\n    }\\n\\n    .instruction-card button {\\n      margin-top: 1rem;\\n      padding: 0.5rem 1rem;\\n      background: #fff;\\n      border: none;\\n      color: #333;\\n      cursor: pointer;\\n      border-radius: 4px;\\n    }\\n  \\n    .instruction-card button:hover {\\n      background: #ddd;\\n    }\\n  </style>\\n  "],"names":[],"mappings":"AA0BI,6CAAkB,CAChB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,CACf,CAEA,+BAAiB,CAAC,oBAAO,CACvB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,OAAO,CACf,aAAa,CAAE,GACjB,CAEA,+BAAiB,CAAC,oBAAM,MAAO,CAC7B,UAAU,CAAE,IACd"}`
    };
    InstructionCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      createEventDispatcher();
      $$result.css.add(css$1);
      return `<div class="instruction-card svelte-laq1tm"><h1 data-svelte-h="svelte-yqkvhw">How to Use the Site</h1> <ul data-svelte-h="svelte-1ffsoj2"><li><p>This site uses scrolling to move between cards.</p></li> <li><p>To move the cards left or right, use the scroll wheel on your mouse.</p></li> <li><p>To see information about the topic on a card, click on it.</p></li> <li><p>At the top of each card, there is a table of contents, click on a section to scroll there.</p></li> <li><p>To close the card press the &#39;x&#39; in the top right corner</p></li> <li><p>If you cannot scroll please make sure Javascript is enabled in your browser</p></li></ul> <p data-svelte-h="svelte-1sq99no">Click the button below to dismiss this message, it will not be shown again.</p> <button class="svelte-laq1tm" data-svelte-h="svelte-zzef9w">Got it!</button> </div>`;
    });
    css = {
      code: ".text-overlay.svelte-1sh12nl{overflow:hidden}.darker.svelte-1sh12nl{filter:brightness(0.7)}",
      map: `{"version":3,"file":"main.svelte","sources":["main.svelte"],"sourcesContent":["<script>\\n  import { onMount, onDestroy } from 'svelte';\\n  import { goto } from '$app/navigation'; // Import goto from SvelteKit\\n  import Modal from './Modal.svelte'; // Import the Modal component\\n  import './styles.css';\\n  import InstructionCard from './InstructionCard.svelte';\\n\\n  let showInstructions = true;\\n  let isModalOpen = false;\\n  let currentModalId;\\n  let modal = null;\\n  let track;\\n  let isMouseDown = false;\\n  let initialMouseX = 0;\\n  let lastKnownPercentage = -10;\\n  let dragSensitivity = 0.01;\\n  let scrollSensitivity = 0.2;\\nlet isMobile = false;\\n  const isBrowser = typeof window !== 'undefined';\\n\\n  function dismissInstructions() {\\n    localStorage.setItem('instructionsDismissed', 'true');\\n    showInstructions = false;\\n  }\\n  function openModal(modalId) {\\n    isModalOpen = true;\\n    currentModalId = modalId;\\n    goto(\`#\${modalId}\`, { replaceState: true });\\n  }\\n\\n  function closeModal() {\\n    isModalOpen = false;\\n    currentModalId = null;\\n    goto('/', { replaceState: true });\\n  }\\n\\n  \\n\\n  function handleMouseDown(e) {\\n    if (!isModalOpen) {\\n      isMouseDown = true;\\n      initialMouseX = e.clientX;\\n    }\\n  }\\n\\n  function handleMouseMove(e) {\\n    if (isMouseDown && !isModalOpen && !isMobile) {\\n      const mouseDelta = initialMouseX - e.clientX;\\n      const maxDelta = window.innerWidth / 2;\\n\\n      lastKnownPercentage = Math.max(\\n        Math.min(lastKnownPercentage + (mouseDelta / maxDelta) * -100 * dragSensitivity, -10),\\n        -100\\n      );\\n\\n      updateTransform();\\n    }\\n  }\\n  function handleResize() {\\n    isMobile = window.innerWidth <= 600;\\n    if (isMobile) {\\n        scrollOnLoad(-50);\\n        window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n        window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n        window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n        window.removeEventListener(\\"wheel\\", handleWheel);\\n    } else {\\n      scrollOnLoad(-10);\\n        window.addEventListener(\\"mousedown\\", handleMouseDown);\\n        window.addEventListener(\\"mousemove\\", handleMouseMove);\\n        window.addEventListener(\\"mouseup\\", handleMouseUp);\\n        window.addEventListener(\\"wheel\\", handleWheel, { passive: false });\\n    }\\n}\\n\\n  function handleMouseUp() {\\n    isMouseDown = false;\\n  }\\n\\n  function handleWheel(e) {\\n    if (!isModalOpen && !isMobile) {\\n      const delta = e.deltaY || e.detail || e.wheelDelta;\\n      const scrollAmount = delta * scrollSensitivity;\\n      const maxDelta = window.innerHeight / 2;\\n\\n      lastKnownPercentage = Math.max(\\n        Math.min(lastKnownPercentage + (scrollAmount / maxDelta) * -100, -10),\\n        -100\\n      );\\n\\n      updateTransform();\\n      e.preventDefault();\\n    }\\n  }\\n  function scrollOnLoad(x) {\\n    console.log(x);\\n    track.style.transform = \`translate(\${x}%, -50%)\`;\\n\\nfor (const image of track.getElementsByClassName(\\"image\\")) {\\n  image.style.objectPosition = \`\${100 + -10}% center\`;\\n}\\n  }\\n  function updateTransform() {\\n    track.style.transform = \`translate(\${lastKnownPercentage}%, -50%)\`;\\n\\n    for (const image of track.getElementsByClassName(\\"image\\")) {\\n      image.style.objectPosition = \`\${100 + lastKnownPercentage}% center\`;\\n    }\\n  }\\n\\n  if (isBrowser) {\\n    function handlePopState() {\\n      isModalOpen = false;\\n      currentModalId = null;\\n    }\\n    onMount(() => {\\n      const dismissed = localStorage.getItem('instructionsDismissed');\\n        showInstructions = !dismissed;\\n\\n        track = document.getElementById(\\"image-track\\");\\n        handleResize();\\n\\n        if (isMobile) {\\n            window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n            window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n            window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n            window.removeEventListener(\\"wheel\\", handleWheel);\\n        } else {\\n            window.addEventListener(\\"mousedown\\", handleMouseDown);\\n            window.addEventListener(\\"mousemove\\", handleMouseMove);\\n            window.addEventListener(\\"mouseup\\", handleMouseUp);\\n            window.addEventListener(\\"wheel\\", handleWheel, { passive: false });\\n        }\\n\\n        window.addEventListener('popstate', handlePopState);\\n        window.addEventListener('resize', handleResize);\\n    });\\n\\n    onDestroy(() => {\\n      window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n        window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n        window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n        window.removeEventListener(\\"wheel\\", handleWheel);\\n        window.removeEventListener('popstate', handlePopState);\\n        window.removeEventListener('resize', handleResize);\\n    });\\n  }\\n\\n<\/script>\\n<div id=\\"image-track\\">\\n  {#if showInstructions}\\n\\n      <InstructionCard on:dismiss={dismissInstructions} />\\n    {/if}\\n  <div class=\\"image-container\\" on:click={() => openModal('modal1')}>\\n    <img class=\\"image\\" src=\\"/about.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">About</div>\\n  </div>\\n  <div class=\\"image-container\\" on:click={() => openModal('modal2')}>\\n    <img class=\\"image\\" src=\\"/Ad01.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">Python</div>\\n  </div>\\n  <div class=\\"image-container \\" on:click={() => openModal('modal3')}>\\n    <img class=\\"image darker\\" src=\\"/HTML.webp\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">HTML</div>\\n  </div>\\n  <div class=\\"image-container\\" on:click={() => openModal('modal4')}>\\n    <img class=\\"image\\" src=\\"/AiEmer.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">AI/Emerging Technologies</div>\\n  </div>\\n  <div class=\\"image-container\\" on:click={() => openModal('modal5')}>\\n    <img class=\\"image darker\\" src=\\"/amazon.jpeg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">Amazon Technologies Project</div>\\n  </div>\\n</div>\\n\\n<style>\\n  .text-overlay {\\n    overflow: hidden;\\n  }\\n  .darker {\\n    filter: brightness(0.7);\\n  }\\n  </style>\\n{#if isModalOpen}\\n<Modal id={currentModalId} onClose={closeModal} />\\n{/if}\\n"],"names":[],"mappings":"AAiLE,4BAAc,CACZ,QAAQ,CAAE,MACZ,CACA,sBAAQ,CACN,MAAM,CAAE,WAAW,GAAG,CACxB"}`
    };
    dragSensitivity = 0.01;
    scrollSensitivity = 0.2;
    Main = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isModalOpen = false;
      let currentModalId;
      let track;
      let isMouseDown = false;
      let initialMouseX = 0;
      let lastKnownPercentage = -10;
      let isMobile = false;
      const isBrowser = typeof window !== "undefined";
      function closeModal() {
        isModalOpen = false;
        currentModalId = null;
        goto("/", { replaceState: true });
      }
      function handleMouseDown(e3) {
        if (!isModalOpen) {
          isMouseDown = true;
          initialMouseX = e3.clientX;
        }
      }
      function handleMouseMove(e3) {
        if (isMouseDown && !isModalOpen && !isMobile) {
          const mouseDelta = initialMouseX - e3.clientX;
          const maxDelta = window.innerWidth / 2;
          lastKnownPercentage = Math.max(Math.min(lastKnownPercentage + mouseDelta / maxDelta * -100 * dragSensitivity, -10), -100);
          updateTransform();
        }
      }
      function handleResize() {
        isMobile = window.innerWidth <= 600;
        if (isMobile) {
          scrollOnLoad(-50);
          window.removeEventListener("mousedown", handleMouseDown);
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
          window.removeEventListener("wheel", handleWheel);
        } else {
          scrollOnLoad(-10);
          window.addEventListener("mousedown", handleMouseDown);
          window.addEventListener("mousemove", handleMouseMove);
          window.addEventListener("mouseup", handleMouseUp);
          window.addEventListener("wheel", handleWheel, { passive: false });
        }
      }
      function handleMouseUp() {
        isMouseDown = false;
      }
      function handleWheel(e3) {
        if (!isModalOpen && !isMobile) {
          const delta = e3.deltaY || e3.detail || e3.wheelDelta;
          const scrollAmount = delta * scrollSensitivity;
          const maxDelta = window.innerHeight / 2;
          lastKnownPercentage = Math.max(Math.min(lastKnownPercentage + scrollAmount / maxDelta * -100, -10), -100);
          updateTransform();
          e3.preventDefault();
        }
      }
      function scrollOnLoad(x) {
        console.log(x);
        track.style.transform = `translate(${x}%, -50%)`;
        for (const image of track.getElementsByClassName("image")) {
          image.style.objectPosition = `${100 + -10}% center`;
        }
      }
      function updateTransform() {
        track.style.transform = `translate(${lastKnownPercentage}%, -50%)`;
        for (const image of track.getElementsByClassName("image")) {
          image.style.objectPosition = `${100 + lastKnownPercentage}% center`;
        }
      }
      if (isBrowser) {
        let handlePopState = function() {
          isModalOpen = false;
          currentModalId = null;
        };
        onDestroy(() => {
          window.removeEventListener("mousedown", handleMouseDown);
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
          window.removeEventListener("wheel", handleWheel);
          window.removeEventListener("popstate", handlePopState);
          window.removeEventListener("resize", handleResize);
        });
      }
      $$result.css.add(css);
      return `<div id="image-track">${`${validate_component(InstructionCard, "InstructionCard").$$render($$result, {}, {}, {})}`} <div class="image-container" data-svelte-h="svelte-61tqd3"><img class="image" src="/about.jpg" draggable="false" data-active> <div class="text-overlay svelte-1sh12nl">About</div></div> <div class="image-container" data-svelte-h="svelte-9bcppm"><img class="image" src="/Ad01.jpg" draggable="false" data-active> <div class="text-overlay svelte-1sh12nl">Python</div></div> <div class="image-container " data-svelte-h="svelte-t3cmh"><img class="image darker svelte-1sh12nl" src="/HTML.webp" draggable="false" data-active> <div class="text-overlay svelte-1sh12nl">HTML</div></div> <div class="image-container" data-svelte-h="svelte-vrguxo"><img class="image" src="/AiEmer.jpg" draggable="false" data-active> <div class="text-overlay svelte-1sh12nl">AI/Emerging Technologies</div></div> <div class="image-container" data-svelte-h="svelte-1ftjppe"><img class="image darker svelte-1sh12nl" src="/amazon.jpeg" draggable="false" data-active> <div class="text-overlay svelte-1sh12nl">Amazon Technologies Project</div></div></div>  ${isModalOpen ? `${validate_component(Modal, "Modal").$$render($$result, { id: currentModalId, onClose: closeModal }, {}, {})}` : ``}`;
    });
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${validate_component(Main, "Layout").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => component_cache3 ??= (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    imports3 = ["_app/immutable/nodes/2.BFSrYyex.js", "_app/immutable/chunks/scheduler.5rEqcWWW.js", "_app/immutable/chunks/index.3m18Cu60.js", "_app/immutable/chunks/entry.B6_ghXDF.js"];
    stylesheets3 = ["_app/immutable/assets/2.CeuRVgwK.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_ssr();
var base = "";
var assets = base;
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
var safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
function afterUpdate() {
}
var prerendering = false;
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body: body2, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body2 + "</div>\n\n	</body>\n	<body>\n	<noscript>Please Enable Javascript to use this website\n		<style>\nnoscript {\n	color: white;\n	font-size: 2.4em\n}\ndiv {\n	display: none;\n}\n		</style>\n	</noscript>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1wjkxrn"
};
async function get_hooks() {
  return {};
}

// .svelte-kit/output/server/index.js
init_exports();
init_devalue();
init_ssr();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
var HttpError = class {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body2) {
    this.status = status;
    if (typeof body2 === "string") {
      this.body = { message: body2 };
    } else if (body2) {
      this.body = body2;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var SvelteKitError = class extends Error {
  /**
   * @param {number} status
   * @param {string} text
   * @param {string} message
   */
  constructor(status, text2, message) {
    super(message);
    this.status = status;
    this.text = text2;
  }
};
var ActionFailure = class {
  /**
   * @param {number} status
   * @param {T} data
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder$3.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
var encoder$3 = new TextEncoder();
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder$3.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error
  );
}
function get_status(error) {
  return error instanceof HttpError || error instanceof SvelteKitError ? error.status : 500;
}
function get_message(error) {
  return error instanceof SvelteKitError ? error.text : "Internal Error";
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error) {
  error = error instanceof HttpError ? error : coalesce_to_error(error);
  const status = get_status(error);
  const body2 = await handle_error_and_jsonify(event, options2, error);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error) {
  if (error instanceof HttpError) {
    return error.body;
  }
  const status = get_status(error);
  const message = get_message(error);
  return await options2.hooks.handleError({ error, event, status, message }) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error) {
  if (error.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
  }
  if (error.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e3) {
    if (e3 instanceof Redirect) {
      return new Response(void 0, {
        status: e3.status,
        headers: { location: e3.location }
      });
    }
    throw e3;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      "POST method not allowed. No actions exist for this page"
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e3) {
    const err = normalize_error(e3);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error) {
  return error instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        "POST method not allowed. No actions exist for this page"
      )
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e3) {
    const err = normalize_error(e3);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e3) {
    const error = (
      /** @type {any} */
      e3
    );
    if ("path" in error) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
      if (error.path !== "")
        message += ` (data.${error.path})`;
      throw new Error(message);
    }
    throw error;
  }
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server)
    return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      new URL(info instanceof Request ? info.url : info, event.url);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.params.add(key2);
        }
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      if (is_tracking) {
        uses.parent = true;
      }
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.route = true;
        }
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url,
    untrack(fn) {
      is_tracking = false;
      try {
        return fn();
      } finally {
        is_tracking = true;
      }
    }
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get2 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get2.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c2 = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c2;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var BaseProvider = class {
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {import('types').Csp.Source[]} */
  #script_src;
  /** @type {import('types').Csp.Source[]} */
  #script_src_elem;
  /** @type {import('types').Csp.Source[]} */
  #style_src;
  /** @type {import('types').Csp.Source[]} */
  #style_src_attr;
  /** @type {import('types').Csp.Source[]} */
  #style_src_elem;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d = this.#directives;
    this.#script_src = [];
    this.#script_src_elem = [];
    this.#style_src = [];
    this.#style_src_attr = [];
    this.#style_src_elem = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0 || !!script_src_elem && script_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_attr && style_src_attr.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_elem && style_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (this.#script_needs_csp) {
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#script_src.push(`sha256-${hash2}`);
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#script_src.length === 0) {
          this.#script_src.push(`nonce-${this.#nonce}`);
        }
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (this.#style_needs_csp) {
      const empty_comment_hash = "9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#style_src.push(`sha256-${hash2}`);
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`sha256-${hash2}`);
        }
        if (d["style-src-elem"]?.length) {
          if (hash2 !== empty_comment_hash && !d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#style_src.length === 0 && !d["style-src"]?.includes("unsafe-inline")) {
          this.#style_src.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-elem"]?.length) {
          if (!d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#style_src_attr.length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...this.#style_src_attr
      ];
    }
    if (this.#style_src_elem.length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...this.#style_src_elem
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    if (this.#script_src_elem.length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...this.#script_src_elem
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r3) => {
    fulfil = f;
    reject = r3;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets4 = new Set(client.stylesheets);
  const fonts4 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets4.add(url);
      for (const url of node.fonts)
        fonts4.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets4) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts4) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${options2.app_dir}/env.js`);
    }
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error) {
        serialized.error = uneval(error);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate.join(`,
${indent}	`)}
${indent}}`);
    }
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${options2.app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						Promise.all([
							import(${s(prefixed(client.start))}),
							import(${s(prefixed(client.app))})
						]).then(([kit, app]) => {
							kit.start(${args.join(", ")});
						});
					});`);
    } else {
      blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error) => ({
          error: await handle_error_and_jsonify(event, options2, error)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error }, replacer);
          } catch (e3) {
            error = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error }, replacer);
          }
          push(`<script>${global}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e3) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e3
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e3) {
    if (e3 instanceof Redirect) {
      return redirect_response(e3.status, e3.location);
    }
    return static_error_page(
      options2,
      get_status(e3),
      (await handle_error_and_jsonify(event, options2, e3)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n2, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n2 == void 0 ? n2 : await manifest2._.nodes[n2]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e3) {
          aborted = true;
          throw e3;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error) => {
          if (error instanceof Redirect) {
            throw error;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error),
              status: error instanceof HttpError || error instanceof SvelteKitError ? error.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e3) {
    const error = normalize_error(e3);
    if (error instanceof Redirect) {
      return redirect_json_response(error);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e3) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e3
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch (e3) {
              const error = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e3) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e3
    ));
  }
}
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n2) => n2 == void 0 ? n2 : manifest2._.nodes[n2]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await load_page_nodes(page2, manifest2);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server?.load);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !(state.prerendering && should_prerender_data)) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            }
          });
        } catch (e3) {
          load_error = /** @type {Error} */
          e3;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e3) {
          load_error = /** @type {Error} */
          e3;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e3) {
          const err = normalize_error(e3);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index4 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index4]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    const ssr = get_option(nodes, "ssr") ?? true;
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch),
      action_result,
      fetched
    });
  } catch (e3) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e3,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s22) => s22).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c2 = new_cookies[name];
      if (c2 && domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
        return c2.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c2 of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
          cookies2[c2.name] = c2.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name, value, options2) {
      validate_options(options2);
      set_internal(name, value, { ...defaults, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name, options2) {
      validate_options(options2);
      cookies.set(name, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        path = resolve(normalized_url, path);
      }
      return (0, import_cookie.serialize)(name, value, { ...defaults, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, options2) {
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name] = { name, value, options: { ...options2, path } };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, { ...options2, path }));
    }
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str, {
              decodeValues: false
            });
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name, value, {
              path,
              encode: (value2) => value2,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
var body;
var etag;
var headers;
function get_public_env(request) {
  body ??= `export const env=${JSON.stringify(public_env)}`;
  etag ??= `W/${Date.now()}`;
  headers ??= new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  });
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
function get_page_config(nodes) {
  let current = {};
  for (const node of nodes) {
    if (!node?.universal?.config && !node?.server?.config)
      continue;
    current = {
      ...current,
      ...node?.universal?.config,
      ...node?.server?.config
    };
  }
  return Object.keys(current).length ? current : void 0;
}
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let rerouted_path;
  try {
    rerouted_path = options2.hooks.reroute({ url: new URL(url) }) ?? url.pathname;
  } catch (e3) {
    return text("Internal Server Error", {
      status: 500
    });
  }
  let decoded;
  try {
    decoded = decode_pathname(rerouted_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  if (decoded === `/${options2.app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (decoded.startsWith(`/${options2.app_dir}`)) {
    return text("Not found", { status: 404 });
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers2 = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-cloudflare"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await load_page_nodes(route.page, manifest2);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender = node.prerender ?? prerender;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest2);
          config = get_page_config(nodes) ?? config;
          prerender = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config, prerender);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config, prerender });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve2(event2, opts).then((response2) => {
        for (const key2 in headers2) {
          const value = headers2[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e3) {
    if (e3 instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e3) : route?.page && is_action_json_request(event) ? action_json_redirect(e3) : redirect_response(e3.status, e3.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e3);
  }
  async function resolve2(event2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e3) {
      return await handle_fatal_error(event2, options2, e3);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
var Server = class {
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('@sveltejs/kit').SSRManifest} */
  #manifest;
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    this.#options = options;
    this.#manifest = manifest2;
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes = {
      public_prefix: this.#options.env_public_prefix,
      private_prefix: this.#options.env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes);
    const public_env2 = filter_public_env(env, prefixes);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (!this.#options.hooks) {
      try {
        const module = await get_hooks();
        this.#options.hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ error }) => console.error(error)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          reroute: module.reroute || (() => {
          })
        };
      } catch (error) {
        {
          throw error;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, this.#options, this.#manifest, {
      ...options2,
      error: false,
      depth: 0
    });
  }
};

// .svelte-kit/cloudflare-tmp/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ??= value = fn();
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["Ad01.jpg", "AiEmer.jpg", "HTML.webp", "Primechat.jpg", "about.jpg", "amazon.jpeg", "amazon.jpg", "favicon.png"]),
    mimeTypes: { ".jpg": "image/jpeg", ".webp": "image/webp", ".jpeg": "image/jpeg", ".png": "image/png" },
    _: {
      client: { "start": "_app/immutable/entry/start.BlSkR5Uh.js", "app": "_app/immutable/entry/app.DuPzg36Z.js", "imports": ["_app/immutable/entry/start.BlSkR5Uh.js", "_app/immutable/chunks/entry.B6_ghXDF.js", "_app/immutable/chunks/scheduler.5rEqcWWW.js", "_app/immutable/entry/app.DuPzg36Z.js", "_app/immutable/chunks/scheduler.5rEqcWWW.js", "_app/immutable/chunks/index.3m18Cu60.js"], "stylesheets": [], "fonts": [], "uses_env_dynamic_public": false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      },
      server_assets: {}
    }
  };
})();
var prerendered = /* @__PURE__ */ new Set([]);
var app_path = "_app";

// .svelte-kit/cloudflare-tmp/_worker.js
async function e(e3, t2) {
  let n2 = "string" != typeof t2 && "HEAD" === t2.method;
  n2 && (t2 = new Request(t2, { method: "GET" }));
  let r3 = await e3.match(t2);
  return n2 && r3 && (r3 = new Response(null, r3)), r3;
}
function t(e3, t2, n2, o2) {
  return ("string" == typeof t2 || "GET" === t2.method) && r(n2) && (n2.headers.has("Set-Cookie") && (n2 = new Response(n2.body, n2)).headers.append("Cache-Control", "private=Set-Cookie"), o2.waitUntil(e3.put(t2, n2.clone()))), n2;
}
var n = /* @__PURE__ */ new Set([200, 203, 204, 300, 301, 404, 405, 410, 414, 501]);
function r(e3) {
  if (!n.has(e3.status))
    return false;
  if (~(e3.headers.get("Vary") || "").indexOf("*"))
    return false;
  let t2 = e3.headers.get("Cache-Control") || "";
  return !/(private|no-cache|no-store)/i.test(t2);
}
function o(n2) {
  return async function(r3, o2) {
    let a = await e(n2, r3);
    if (a)
      return a;
    o2.defer((e3) => {
      t(n2, r3, e3, o2);
    });
  };
}
var s2 = caches.default;
var c = t.bind(0, s2);
var r2 = e.bind(0, s2);
var e2 = o.bind(0, s2);
var server = new Server(manifest);
var immutable = `/${app_path}/immutable/`;
var version_file = `/${app_path}/version.json`;
var worker = {
  async fetch(req, env, context) {
    await server.init({ env });
    let pragma = req.headers.get("cache-control") || "";
    let res = !pragma.includes("no-cache") && await r2(req);
    if (res)
      return res;
    let { pathname, search } = new URL(req.url);
    try {
      pathname = decodeURIComponent(pathname);
    } catch {
    }
    const stripped_pathname = pathname.replace(/\/$/, "");
    let is_static_asset = false;
    const filename = stripped_pathname.substring(1);
    if (filename) {
      is_static_asset = manifest.assets.has(filename) || manifest.assets.has(filename + "/index.html");
    }
    let location = pathname.at(-1) === "/" ? stripped_pathname : pathname + "/";
    if (is_static_asset || prerendered.has(pathname) || pathname === version_file || pathname.startsWith(immutable)) {
      res = await env.ASSETS.fetch(req);
    } else if (location && prerendered.has(location)) {
      if (search)
        location += search;
      res = new Response("", {
        status: 308,
        headers: {
          location
        }
      });
    } else {
      res = await server.respond(req, {
        // @ts-ignore
        platform: { env, context, caches, cf: req.cf },
        getClientAddress() {
          return req.headers.get("cf-connecting-ip");
        }
      });
    }
    pragma = res.headers.get("cache-control") || "";
    return pragma && res.status < 400 ? c(req, res, context) : res;
  }
};
var worker_default = worker;
export {
  worker_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=_worker.js.map
