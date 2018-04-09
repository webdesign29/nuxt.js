'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var _ = _interopDefault(require('lodash'));
var fs = _interopDefault(require('fs'));
var hash = _interopDefault(require('hash-sum'));
var chalk = _interopDefault(require('chalk'));
var figures = _interopDefault(require('figures'));
var startCase = _interopDefault(require('lodash/startCase'));
var env = _interopDefault(require('std-env'));
var Debug = _interopDefault(require('debug'));
var VueMeta = _interopDefault(require('vue-meta'));
var vueServerRenderer = require('vue-server-renderer');
var LRU = _interopDefault(require('lru-cache'));
var Youch = _interopDefault(require('@nuxtjs/youch'));
var fsExtra = _interopDefault(require('fs-extra'));
var generateETag = _interopDefault(require('etag'));
var fresh = _interopDefault(require('fresh'));
var crypto = _interopDefault(require('crypto'));
var serialize = _interopDefault(require('serialize-javascript'));
var serveStatic = _interopDefault(require('serve-static'));
var compression = _interopDefault(require('compression'));
var connect = _interopDefault(require('connect'));
var launchMiddleware = _interopDefault(require('launch-editor-middleware'));
var Module = _interopDefault(require('module'));
var enableDestroy = _interopDefault(require('server-destroy'));
var esm = _interopDefault(require('esm'));
var threadLoader = require('thread-loader');
var uniq = _interopDefault(require('lodash.uniq'));
var createResolver = _interopDefault(require('postcss-import-resolver'));
var MiniCssExtractPlugin = _interopDefault(require('mini-css-extract-plugin'));
var TimeFixPlugin = _interopDefault(require('time-fix-plugin'));
var VueLoader = _interopDefault(require('vue-loader'));
var WebpackBar = _interopDefault(require('webpackbar'));
var webpack = _interopDefault(require('webpack'));
var HTMLPlugin = _interopDefault(require('html-webpack-plugin'));
var BundleAnalyzer = _interopDefault(require('webpack-bundle-analyzer'));
var UglifyJsWebpackPlugin = _interopDefault(require('uglifyjs-webpack-plugin'));
var FriendlyErrorsWebpackPlugin = _interopDefault(require('@nuxtjs/friendly-errors-webpack-plugin'));
var nodeExternals = _interopDefault(require('webpack-node-externals'));
var util = _interopDefault(require('util'));
var chokidar = _interopDefault(require('chokidar'));
var MFS = _interopDefault(require('memory-fs'));
var webpackDevMiddleware = _interopDefault(require('webpack-dev-middleware'));
var webpackHotMiddleware = _interopDefault(require('webpack-hot-middleware'));
var Glob = _interopDefault(require('glob'));
var upath = _interopDefault(require('upath'));
var htmlMinifier = _interopDefault(require('html-minifier'));
require('babel-polyfill');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var promiseFinally = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fn, finalFn) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = void 0;
            _context.prev = 1;

            if (!(typeof fn === 'function')) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return fn();

          case 5:
            result = _context.sent;
            _context.next = 11;
            break;

          case 8:
            _context.next = 10;
            return fn;

          case 10:
            result = _context.sent;

          case 11:
            _context.prev = 11;

            finalFn();
            return _context.finish(11);

          case 14:
            return _context.abrupt('return', result);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1,, 11, 14]]);
  }));

  return function promiseFinally(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var encodeHtml = function encodeHtml(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

var getContext = function getContext(req, res) {
  return { req: req, res: res };
};

var waitFor = function waitFor(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms || 0);
  });
};

var timeout = function timeout(fn, ms, msg) {
  var timerId = void 0;
  var warpPromise = promiseFinally(fn, function () {
    return clearTimeout(timerId);
  });
  var timerPromise = new Promise(function (resolve, reject) {
    timerId = setTimeout(function () {
      return reject(new Error(msg));
    }, ms);
  });
  return Promise.race([warpPromise, timerPromise]);
};

var urlJoin = function urlJoin() {
  return [].slice.call(arguments).join('/').replace(/\/+/g, '/').replace(':/', '://');
};

var isUrl = function isUrl(url) {
  return url.indexOf('http') === 0 || url.indexOf('//') === 0;
};

var promisifyRoute = function promisifyRoute(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  // If routes is an array
  if (Array.isArray(fn)) {
    return Promise.resolve(fn);
  }
  // If routes is a function expecting a callback
  if (fn.length === arguments.length) {
    return new Promise(function (resolve, reject) {
      fn.apply(undefined, [function (err, routeParams) {
        if (err) {
          reject(err);
        }
        resolve(routeParams);
      }].concat(args));
    });
  }
  var promise = fn.apply(undefined, args);
  if (!promise || !(promise instanceof Promise) && typeof promise.then !== 'function') {
    promise = Promise.resolve(promise);
  }
  return promise;
};

var sequence = function sequence(tasks, fn) {
  return tasks.reduce(function (promise, task) {
    return promise.then(function () {
      return fn(task);
    });
  }, Promise.resolve());
};

var parallel = function parallel(tasks, fn) {
  return Promise.all(tasks.map(function (task) {
    return fn(task);
  }));
};

var chainFn = function chainFn(base, fn) {
  /* istanbul ignore if */
  if (typeof fn !== 'function') {
    return base;
  }
  return function () {
    if (typeof base !== 'function') {
      return fn.apply(this, arguments);
    }
    var baseResult = base.apply(this, arguments);
    // Allow function to mutate the first argument instead of returning the result
    if (baseResult === undefined) {
      baseResult = arguments[0];
    }
    var fnResult = fn.call.apply(fn, [this, baseResult].concat(toConsumableArray(Array.prototype.slice.call(arguments, 1))));
    // Return mutated argument if no result was returned
    if (fnResult === undefined) {
      return baseResult;
    }
    return fnResult;
  };
};

var isPureObject = function isPureObject(o) {
  return !Array.isArray(o) && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
};

var isWindows = /^win/.test(process.platform);

var wp = function wp() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  /* istanbul ignore if */
  if (isWindows) {
    return p.replace(/\\/g, '\\\\');
  }
  return p;
};

var wChunk = function wChunk() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  /* istanbul ignore if */
  if (isWindows) {
    return p.replace(/\//g, '_');
  }
  return p;
};

var reqSep = /\//g;
var sysSep = _.escapeRegExp(path.sep);
var normalize = function normalize(string) {
  return string.replace(reqSep, sysSep);
};

var r = function r() {
  var args = Array.prototype.slice.apply(arguments);
  var lastArg = _.last(args);

  if (lastArg.indexOf('@') === 0 || lastArg.indexOf('~') === 0) {
    return wp(lastArg);
  }

  return wp(path.resolve.apply(path, toConsumableArray(args.map(normalize))));
};

var relativeTo = function relativeTo() {
  var args = Array.prototype.slice.apply(arguments);
  var dir = args.shift();

  // Resolve path
  var _path = r.apply(undefined, toConsumableArray(args));

  // Check if path is an alias
  if (_path.indexOf('@') === 0 || _path.indexOf('~') === 0) {
    return _path;
  }

  // Make correct relative path
  var rp = path.relative(dir, _path);
  if (rp[0] !== '.') {
    rp = './' + rp;
  }

  return wp(rp);
};

var flatRoutes = function flatRoutes(router) {
  var _path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var routes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  router.forEach(function (r) {
    if (!r.path.includes(':') && !r.path.includes('*')) {
      /* istanbul ignore if */
      if (r.children) {
        if (_path === '' && r.path === '/') {
          routes.push('/');
        }
        flatRoutes(r.children, _path + r.path + '/', routes);
      } else {
        _path = _path.replace(/^\/+$/, '/');
        routes.push((r.path === '' && _path[_path.length - 1] === '/' ? _path.slice(0, -1) : _path) + r.path);
      }
    }
  });
  return routes;
};

function cleanChildrenRoutes(routes) {
  var isChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var start = -1;
  var routesIndex = [];
  routes.forEach(function (route) {
    if (/-index$/.test(route.name) || route.name === 'index') {
      // Save indexOf 'index' key in name
      var res = route.name.split('-');
      var s = res.indexOf('index');
      start = start === -1 || s < start ? s : start;
      routesIndex.push(res);
    }
  });
  routes.forEach(function (route) {
    route.path = isChild ? route.path.replace('/', '') : route.path;
    if (route.path.indexOf('?') > -1) {
      var names = route.name.split('-');
      var paths = route.path.split('/');
      if (!isChild) {
        paths.shift();
      } // clean first / for parents
      routesIndex.forEach(function (r) {
        var i = r.indexOf('index') - start; //  children names
        if (i < paths.length) {
          for (var a = 0; a <= i; a++) {
            if (a === i) {
              paths[a] = paths[a].replace('?', '');
            }
            if (a < i && names[a] !== r[a]) {
              break;
            }
          }
        }
      });
      route.path = (isChild ? '' : '/') + paths.join('/');
    }
    route.name = route.name.replace(/-index$/, '');
    if (route.children) {
      if (route.children.find(function (child) {
        return child.path === '';
      })) {
        delete route.name;
      }
      route.children = cleanChildrenRoutes(route.children, true);
    }
  });
  return routes;
}

var createRoutes = function createRoutes(files, srcDir, pagesDir) {
  var routes = [];
  files.forEach(function (file) {
    var keys = file.replace(RegExp('^' + pagesDir), '').replace(/\.(vue|js)$/, '').replace(/\/{2,}/g, '/').split('/').slice(1);
    var route = { name: '', path: '', component: r(srcDir, file) };
    var parent = routes;
    keys.forEach(function (key, i) {
      // remove underscore only, if its the prefix
      var sanatizedKey = key.indexOf('_') === 0 ? key.replace('_', '') : key;
      route.name = route.name ? route.name + '-' + sanatizedKey : sanatizedKey;
      route.name += key === '_' ? 'all' : '';
      route.chunkName = file.replace(/\.(vue|js)$/, '');
      var child = _.find(parent, { name: route.name });
      if (child) {
        child.children = child.children || [];
        parent = child.children;
        route.path = '';
      } else {
        if (key === 'index' && i + 1 === keys.length) {
          route.path += i > 0 ? '' : '/';
        } else {
          route.path += '/' + (key === '_' ? '*' : key.indexOf('_') === 0 ? key.replace('_', ':') : key);
          if (key !== '_' && key.indexOf('_') === 0) {
            route.path += '?';
          }
        }
      }
    });
    // Order Routes path
    parent.push(route);
    parent.sort(function (a, b) {
      if (!a.path.length) {
        return -1;
      }
      if (!b.path.length) {
        return 1;
      }
      // Order: /static, /index, /:dynamic
      // Match exact route before index: /login before /index/_slug
      if (a.path === '/') {
        return (/^\/(:|\*)/.test(b.path) ? -1 : 1
        );
      }
      if (b.path === '/') {
        return (/^\/(:|\*)/.test(a.path) ? 1 : -1
        );
      }
      var i = 0;
      var res = 0;
      var y = 0;
      var z = 0;
      var _a = a.path.split('/');
      var _b = b.path.split('/');
      for (i = 0; i < _a.length; i++) {
        if (res !== 0) {
          break;
        }
        y = _a[i] === '*' ? 2 : _a[i].indexOf(':') > -1 ? 1 : 0;
        z = _b[i] === '*' ? 2 : _b[i].indexOf(':') > -1 ? 1 : 0;
        res = y - z;
        // If a.length >= b.length
        if (i === _b.length - 1 && res === 0) {
          // change order if * found
          res = _a[i] === '*' ? -1 : 1;
        }
      }
      return res === 0 ? _a[i - 1] === '*' && _b[i] ? 1 : -1 : res;
    });
  });
  return cleanChildrenRoutes(routes);
};

var Utils = /*#__PURE__*/Object.freeze({
  encodeHtml: encodeHtml,
  getContext: getContext,
  waitFor: waitFor,
  timeout: timeout,
  urlJoin: urlJoin,
  isUrl: isUrl,
  promisifyRoute: promisifyRoute,
  sequence: sequence,
  parallel: parallel,
  chainFn: chainFn,
  isPureObject: isPureObject,
  isWindows: isWindows,
  wp: wp,
  wChunk: wChunk,
  r: r,
  relativeTo: relativeTo,
  flatRoutes: flatRoutes,
  createRoutes: createRoutes
});

var ModuleContainer = function () {
  function ModuleContainer(nuxt) {
    classCallCheck(this, ModuleContainer);

    this.nuxt = nuxt;
    this.options = nuxt.options;
    this.requiredModules = {};
  }

  createClass(ModuleContainer, [{
    key: 'ready',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.nuxt.callHook('modules:before', this, this.options.modules);

              case 2:
                _context.next = 4;
                return sequence(this.options.modules, this.addModule.bind(this));

              case 4:
                _context.next = 6;
                return this.nuxt.callHook('modules:done', this);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function ready() {
        return _ref.apply(this, arguments);
      }

      return ready;
    }()
  }, {
    key: 'addVendor',
    value: function addVendor(vendor) {
      // Make it silent for backward compability with nuxt 1.x
    }
  }, {
    key: 'addTemplate',
    value: function addTemplate(template) {
      /* istanbul ignore if */
      if (!template) {
        throw new Error('Invalid template:' + template);
      }

      // Validate & parse source
      var src = template.src || template;
      var srcPath = path.parse(src);
      /* istanbul ignore if */
      if (!src || typeof src !== 'string' || !fs.existsSync(src)) {
        throw new Error('Template not found:' + template);
      }

      // Generate unique and human readable dst filename
      var dst = template.fileName || path.basename(srcPath.dir) + ('.' + srcPath.name + '.' + hash(src)) + srcPath.ext;

      // Add to templates list
      var templateObj = {
        src: src,
        dst: dst,
        options: template.options
      };

      this.options.build.templates.push(templateObj);
      return templateObj;
    }
  }, {
    key: 'addPlugin',
    value: function addPlugin(template) {
      var _addTemplate = this.addTemplate(template),
          dst = _addTemplate.dst;

      // Add to nuxt plugins


      this.options.plugins.unshift({
        src: path.join(this.options.buildDir, dst),
        ssr: template.ssr
      });
    }
  }, {
    key: 'addLayout',
    value: function addLayout(template, name) {
      var _addTemplate2 = this.addTemplate(template),
          dst = _addTemplate2.dst,
          src = _addTemplate2.src;

      // Add to nuxt layouts


      this.options.layouts[name || path.parse(src).name] = './' + dst;
    }
  }, {
    key: 'addServerMiddleware',
    value: function addServerMiddleware(middleware) {
      this.options.serverMiddleware.push(middleware);
    }
  }, {
    key: 'extendBuild',
    value: function extendBuild(fn) {
      this.options.build.extend = chainFn(this.options.build.extend, fn);
    }
  }, {
    key: 'extendRoutes',
    value: function extendRoutes(fn) {
      this.options.router.extendRoutes = chainFn(this.options.router.extendRoutes, fn);
    }
  }, {
    key: 'requireModule',
    value: function requireModule(moduleOpts) {
      return this.addModule(moduleOpts, true /* require once */);
    }
  }, {
    key: 'addModule',
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(moduleOpts, requireOnce) {
        var _this = this;

        var src, options, handler, key;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                src = void 0;
                options = void 0;
                handler = void 0;

                // Type 1: String

                if (typeof moduleOpts === 'string') {
                  src = moduleOpts;
                } else if (Array.isArray(moduleOpts)) {
                  // Type 2: Babel style array
                  src = moduleOpts[0];
                  options = moduleOpts[1];
                } else if ((typeof moduleOpts === 'undefined' ? 'undefined' : _typeof(moduleOpts)) === 'object') {
                  // Type 3: Pure object
                  src = moduleOpts.src;
                  options = moduleOpts.options;
                  handler = moduleOpts.handler;
                }

                // Resolve handler
                if (!handler) {
                  handler = this.nuxt.requireModule(src, { esm: false });
                }

                // Validate handler
                /* istanbul ignore if */

                if (!(typeof handler !== 'function')) {
                  _context2.next = 7;
                  break;
                }

                throw new Error('Module should export a function: ' + src);

              case 7:

                // Resolve module meta
                key = handler.meta && handler.meta.name || handler.name || src;

                // Update requiredModules

                if (!(typeof key === 'string')) {
                  _context2.next = 12;
                  break;
                }

                if (!(requireOnce && this.requiredModules[key])) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt('return');

              case 11:
                this.requiredModules[key] = { src: src, options: options, handler: handler };

              case 12:

                // Default module options to empty object
                if (options === undefined) {
                  options = {};
                }

                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  // Call module with `this` context and pass options
                  var result = handler.call(_this, options);

                  // If module send back a promise
                  if (result && result.then) {
                    return resolve(result);
                  }

                  // synchronous
                  return resolve();
                }));

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addModule(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return addModule;
    }()
  }]);
  return ModuleContainer;
}();

var types = {
  fatal: {
    level: 0,
    color: 'red'
  },
  error: {
    level: 0,
    color: 'red'
  },
  warn: {
    level: 1,
    color: 'yellow'
  },
  log: {
    level: 2,
    color: 'white'
  },
  info: {
    level: 2,
    color: 'blue'
  },
  start: {
    level: 3,
    color: 'blue'
  },
  success: {
    level: 3,
    color: 'green'
  },
  ready: {
    level: 3,
    color: 'green'
  },
  debug: {
    level: 4,
    color: 'grey'
  },
  trace: {
    level: 5,
    color: 'white'
  }
}

class Consola {
  constructor (options = {}) {
    this.reporters = options.reporters || [];
    this.types = Object.assign({}, types, options.types);
    this.level = options.level || 30;

    Object.assign(this, this.withDefaults());
  }

  withDefaults (defaults) {
    const logger = {};
    for (const type in this.types) {
      logger[type] = this._createLogFn(Object.assign({ type }, this.types[type], defaults));
    }
    return logger
  }

  _createLogFn (defaults) {
    return opts => {
      if (!opts) {
        return this
      }

      const logObj = Object.assign({
        date: new Date()
      }, defaults);

      if (typeof opts === 'string') {
        // String
        logObj.message = opts;
      } else if (opts.stack) {
        // Error
        const [message, ...stack] = opts.stack.split('\n');
        logObj.message = message;
        logObj.additional = stack.map(s => s.trim()).join('\n');
      } else {
        // Object
        Object.assign(logObj, opts);
      }

      this._log(logObj);

      return this
    }
  }

  _log (logObj) {
    if (logObj.level > this.level) {
      return
    }
    for (const reporter of this.reporters) {
      reporter.log(logObj);
    }
    return this
  }

  add (reporter) {
    this.reporters.push(reporter);
    return this
  }

  clear () {
    this.reporters.splice(0);
    return this
  }

  remove (reporter) {
    const i = this.reporters.indexOf(reporter);
    if (i >= 0) {
      return this.reporters.splice(i, 1)
    }
    return this
  }

  withScope (scope) {
    return this.withDefaults({ scope })
  }
}

const NS_SEPERATOR = chalk.blue(figures(' › '));

const ICONS = {
  start: figures('●'),
  info: figures('ℹ'),
  success: figures('✔'),
  error: figures('✖'),
  fatal: figures('✖'),
  warn: figures('⚠'),
  debug: figures('…'),
  trace: figures('…'),
  default: figures('❯'),
  ready: figures('♥')
};

class FancyReporter {
  constructor (stream, options = {}) {
    this.stream = stream || process.stderr;
  }

  formatBadge (type, color = 'blue') {
    return chalk['bg' + startCase(color)].black(` ${type.toUpperCase()} `) + ' '
  }

  formatTag (type, color = 'blue') {
    const icon = ICONS[type] || ICONS.default;
    return chalk[color](`${icon} ${type.toLowerCase()}`) + ' '
  }

  clear () {
    this.stream.write('\x1b[2J\x1b[0f');
  }

  log (logObj) {
    let message = logObj.message;

    if (logObj.scope) {
      message =
        (logObj.scope.replace(/:/g, '>') + '>').split('>').join(NS_SEPERATOR) +
        message;
    }

    if (logObj.clear) {
      this.clear();
    }

    if (logObj.badge) {
      this.stream.write('\n\n' + this.formatBadge(logObj.type, logObj.color) + message + '\n\n');
    } else {
      this.stream.write(this.formatTag(logObj.type, logObj.color) + message + '\n');
    }

    if (logObj.additional) {
      const lines = logObj.additional.split('\n').map(s => '   ' + s).join('\n');
      this.stream.write(chalk.grey(lines) + '\n');
    }
  }
}

class BasicReporter {
  constructor (stream) {
    this.stream = stream || process.stdout;
  }

  formatTag (tag) {
    return `[${tag.toUpperCase()}]`
  }

  log (logObj) {
    let l = [this.formatTag(logObj.date.toLocaleTimeString())];

    if (logObj.scope) {
      l.push(this.formatTag(logObj.scope));
    }

    l.push(logObj.message);

    this.stream.write(l.join(' ') + '\n');

    if (logObj.additional) {
      this.stream.write(logObj.additional + '\n');
    }
  }
}

class JSONReporter {
  constructor (stream) {
    this.stream = stream || process.stdout;
  }

  log (logObj) {
    this.stream.write(JSON.stringify(logObj) + '\n');
  }
}

// This reporter is compatible with Winston 3
// https://github.com/winstonjs/winston

class WinstonReporter {
  constructor (logger) {
    this.logger = logger;
  }

  log (logObj) {
    this.logger.log({
      level: levels[logObj.level] || 'info',
      label: logObj.tag,
      message: logObj.message,
      timestamp: logObj.date.getTime() / 1000
    });
  }
}

const levels = {
  0: 'error',
  1: 'warn',
  2: 'info',
  3: 'verbose',
  4: 'debug',
  5: 'silly'
};

const _consola = new Consola({
  level: env.debug ? 4 : 3
});

if (env.minimalCLI) {
  _consola.add(new BasicReporter());
} else {
  _consola.add(new FancyReporter());
}

_consola.Consola = Consola;
_consola.FancyReporter = FancyReporter;
_consola.BasicReporter = BasicReporter;
_consola.JSONReporter = JSONReporter;
_consola.WinstonReporter = WinstonReporter;

var modes = {
  universal: {
    build: {
      ssr: true
    },
    render: {
      ssr: true
    }
  },
  spa: {
    build: {
      ssr: false
    },
    render: {
      ssr: false
    }
  }
};

var nuxtDir = fs.existsSync(path.resolve(__dirname, '..', 'package.json')) ? path.resolve(__dirname, '..') // dist
: path.resolve(__dirname, '..', '..'); // src

var defaults$1 = {
  // Information about running environment
  dev: Boolean(env.dev),
  debug: undefined, // = dev

  // Mode
  mode: 'universal',

  // Dirs
  buildDir: '.nuxt',
  cacheDir: '.cache',
  nuxtDir: nuxtDir,
  nuxtAppDir: path.resolve(nuxtDir, 'lib', 'app'),
  modulesDir: ['node_modules'], // ~> relative to options.rootDir

  // Ignore
  ignorePrefix: '-',
  ignore: ['**/*.test.*'],

  extensions: [],

  build: {
    analyze: false,
    profile: process.argv.includes('--profile'),
    maxChunkSize: false,
    extractCSS: false,
    cssSourceMap: undefined,
    ssr: undefined,
    parallel: false,
    cache: false,
    publicPath: '/_nuxt/',
    filenames: {
      app: '[name].[contenthash].js',
      chunk: '[name].[contenthash].js',
      css: '[name].[contenthash].css'
    },
    styleResources: {},
    plugins: [],
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: undefined,
        cacheGroups: {}
      }
    },
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true
    },
    babel: {
      babelrc: false,
      cacheDirectory: undefined
    },
    vueLoader: {},
    postcss: {},
    templates: [],
    watch: [],
    devMiddleware: {},
    hotMiddleware: {},
    stats: {
      chunks: false,
      children: false,
      modules: false,
      colors: true,
      warnings: true,
      errors: true,
      excludeAssets: [/.map$/, /index\..+\.html$/, /vue-ssr-client-manifest.json/]
    }
  },
  generate: {
    dir: 'dist',
    routes: [],
    concurrency: 500,
    interval: 0,
    subFolders: true,
    fallback: '200.html',
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: false,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeAttributeQuotes: false,
      removeComments: false,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false,
      removeTagWhitespace: false,
      sortAttributes: true,
      sortClassName: false,
      trimCustomFragments: true,
      useShortDoctype: true
    }
  },
  env: {},
  head: {
    meta: [],
    link: [],
    style: [],
    script: []
  },
  plugins: [],
  css: [],
  modules: [],
  layouts: {},
  serverMiddleware: [],
  ErrorPage: null,
  loading: {
    color: 'black',
    failedColor: 'red',
    height: '2px',
    duration: 5000,
    rtl: false
  },
  loadingIndicator: 'default',
  transition: {
    name: 'page',
    mode: 'out-in',
    appear: false,
    appearClass: 'appear',
    appearActiveClass: 'appear-active',
    appearToClass: 'appear-to'
  },
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },
  dir: {
    assets: 'assets',
    layouts: 'layouts',
    middleware: 'middleware',
    pages: 'pages',
    static: 'static',
    store: 'store'
  },
  router: {
    mode: 'history',
    base: '/',
    routes: [],
    middleware: [],
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    extendRoutes: null,
    scrollBehavior: null,
    parseQuery: false,
    stringifyQuery: false,
    fallback: false
  },
  render: {
    bundleRenderer: {
      shouldPrefetch: function shouldPrefetch() {
        return false;
      }
    },
    resourceHints: undefined,
    ssr: undefined,
    http2: {
      push: false,
      shouldPush: null
    },
    static: {
      prefix: true
    },
    gzip: {
      threshold: 0
    },
    etag: {
      weak: false
    },
    csp: {
      enabled: false,
      hashAlgorithm: 'sha256',
      allowedSources: undefined,
      policies: undefined
    }
  },
  watchers: {
    webpack: {},
    chokidar: {}
  },
  editor: undefined,
  hooks: null,
  messages: {
    loading: 'Loading...',
    error_404: 'This page could not be found',
    server_error: 'Server error',
    nuxtjs: 'Nuxt.js',
    back_to_home: 'Back to the home page',
    server_error_details: 'An error occurred in the application and your page could not be served. If you are the application owner, check your logs for details.',
    client_error: 'Error',
    client_error_details: 'An error occurred while rendering the page. Check developer tools console for details.'
  }
};

var debug = Debug('nuxt:build');
debug.color = 2; // Force green color

var Options = {};

Options.from = function (_options) {
  // Clone options to prevent unwanted side-effects
  var options = Object.assign({}, _options);

  // Normalize options
  if (options.loading === true) {
    delete options.loading;
  }
  if (options.router && options.router.middleware && !Array.isArray(options.router.middleware)) {
    options.router.middleware = [options.router.middleware];
  }
  if (options.router && typeof options.router.base === 'string') {
    options._routerBaseSpecified = true;
  }
  if (typeof options.transition === 'string') {
    options.transition = { name: options.transition };
  }
  if (typeof options.layoutTransition === 'string') {
    options.layoutTransition = { name: options.layoutTransition };
  }
  if (typeof options.extensions === 'string') {
    options.extensions = [options.extensions];
  }

  var hasValue = function hasValue(v) {
    return typeof v === 'string' && v;
  };
  options.rootDir = hasValue(options.rootDir) ? options.rootDir : process.cwd();

  // Apply defaults by ${buildDir}/dist/build.config.js
  // TODO: Unsafe operation.
  // const buildDir = options.buildDir || defaults.buildDir
  // const buildConfig = resolve(options.rootDir, buildDir, 'build.config.js')
  // if (existsSync(buildConfig)) {
  //   _.defaultsDeep(options, require(buildConfig))
  // }

  // Apply defaults
  _.defaultsDeep(options, defaults$1);

  // Resolve dirs
  options.srcDir = hasValue(options.srcDir) ? path.resolve(options.rootDir, options.srcDir) : options.rootDir;
  options.buildDir = path.resolve(options.rootDir, options.buildDir);
  options.cacheDir = path.resolve(options.rootDir, options.cacheDir);

  // Populate modulesDir
  options.modulesDir = [].concat(options.modulesDir).concat(path.join(options.nuxtDir, 'node_modules')).filter(function (dir) {
    return hasValue(dir);
  }).map(function (dir) {
    return path.resolve(options.rootDir, dir);
  });

  // Sanitize extensions
  if (options.extensions.indexOf('js') === -1) {
    options.extensions.unshift('js');
  }

  if (options.extensions.indexOf('mjs') === -1) {
    options.extensions.unshift('mjs');
  }

  // If app.html is defined, set the template path to the user template
  options.appTemplatePath = path.resolve(options.buildDir, 'views/app.template.html');
  if (fs.existsSync(path.join(options.srcDir, 'app.html'))) {
    options.appTemplatePath = path.join(options.srcDir, 'app.html');
  }

  // Ignore publicPath on dev
  /* istanbul ignore if */
  if (options.dev && isUrl(options.build.publicPath)) {
    options.build.publicPath = defaults$1.build.publicPath;
  }

  // If store defined, update store options to true unless explicitly disabled
  if (options.store !== false && fs.existsSync(path.join(options.srcDir, options.dir.store)) && fs.readdirSync(path.join(options.srcDir, options.dir.store)).find(function (filename) {
    return filename !== 'README.md' && filename[0] !== '.';
  })) {
    options.store = true;
  }

  // SPA loadingIndicator
  if (options.loadingIndicator) {
    // Normalize loadingIndicator
    if (!isPureObject(options.loadingIndicator)) {
      options.loadingIndicator = { name: options.loadingIndicator };
    }

    // Apply defaults
    options.loadingIndicator = Object.assign({
      name: 'default',
      color: options.loading && options.loading.color || '#D3D3D3',
      color2: '#F5F5F5',
      background: options.manifest && options.manifest.theme_color || 'white',
      dev: options.dev,
      loading: options.messages.loading
    }, options.loadingIndicator);
  }

  // Debug errors
  if (options.debug === undefined) {
    options.debug = options.dev;
  }

  // Apply default hash to CSP option
  if (options.render.csp === true) {
    options.render.csp = { hashAlgorithm: 'sha256' };
  }

  // cssSourceMap
  if (options.build.cssSourceMap === undefined) {
    options.build.cssSourceMap = options.dev;
  }

  // babel cacheDirectory
  if (options.build.babel.cacheDirectory === undefined) {
    options.build.babel.cacheDirectory = options.dev;
  }

  // Resource hints
  if (options.render.resourceHints === undefined) {
    options.render.resourceHints = !options.dev;
  }

  // Normalize ignore
  options.ignore = options.ignore ? [].concat(options.ignore) : [];

  // Append ignorePrefix glob to ignore
  if (typeof options.ignorePrefix === 'string') {
    options.ignore.push('**/' + options.ignorePrefix + '*.*');
  }

  // Apply mode preset
  var modePreset = modes[options.mode || 'universal'] || modes['universal'];
  _.defaultsDeep(options, modePreset);

  // If no server-side rendering, add appear true transition
  /* istanbul ignore if */
  if (options.render.ssr === false && options.transition) {
    options.transition.appear = true;
  }

  // We assume the SPA fallback path is 404.html (for GitHub Pages, Surge, etc.)
  if (options.generate.fallback === true) {
    options.generate.fallback = '404.html';
  }

  // Enable [name] when analyze or dev mode
  if (options.build.optimization.splitChunks.name === undefined && (options.dev || options.build.analyze)) {
    options.build.optimization.splitChunks.name = true;
  }

  if (options.build.stats === 'none') {
    options.build.stats = false;
  }

  // TODO: remove when mini-css-extract-plugin supports HMR
  if (options.dev) {
    options.build.extractCSS = false;
  }
  return options;
};

var name = "nuxt";
var version = "2.0.0";
var description = "A minimalistic framework for server-rendered Vue.js applications (inspired by Next.js)";
var contributors = [{ "name": "Sebastien Chopin (@Atinux)" }, { "name": "Alexandre Chopin (@alexchopin)" }, { "name": "Pooya Parsa (@pi0)" }, { "name": "Clark Du (@clarkdo)" }];
var main = "index.js";
var module$1 = "./lib/nuxt.js";
var license = "MIT";
var repository = { "type": "git", "url": "git+https://github.com/nuxt/nuxt.js" };
var files = ["bin", "lib", "dist", "index.js"];
var keywords = ["nuxt", "nuxt.js", "nuxtjs", "vue", "vue.js", "vuejs", "vue universal", "vue ssr", "vue isomorphic", "vue versatile"];
var homepage = "https://github.com/nuxt/nuxt.js#readme";
var bin = { "nuxt": "./bin/nuxt" };
var scripts = { "build": "yarn build:nuxt && yarn build:nuxt-start && yarn build:nuxt-legacy", "build:nuxt": "cross-env NODE_ENV=production rollup -c scripts/rollup/nuxt.js", "build:nuxt-legacy": "cross-env NODE_ENV=production rollup -c scripts/rollup/nuxt-legacy.js", "build:nuxt-start": "cross-env NODE_ENV=production rollup -c scripts/rollup/nuxt-start.js", "build:make-start": "node scripts/make-start", "clean": "rimraf dist", "coverage": "codecov", "lint": "eslint --ext .js,.mjs,.vue bin lib test examples", "postinstall": "opencollective postinstall || exit 0", "prebuild": "yarn clean", "security": "nsp check || true", "test": "yarn test:fixtures && yarn test:unit", "test:fixtures": "jest --maxWorkers=4 --coverage -e test/fixtures", "test:e2e": "jest --maxWorkers=1 test/e2e", "test:lint": "yarn lint && yarn security", "test:unit": "jest --maxWorkers=4 --coverage -e test/unit" };
var engines = { "node": ">=8.0.0", "npm": ">=5.0.0" };
var dependencies = { "@nuxtjs/friendly-errors-webpack-plugin": "^2.0.2", "@nuxtjs/youch": "^4.2.3", "autoprefixer": "^8.2.0", "babel-core": "^6.26.0", "babel-loader": "^7.1.4", "babel-preset-vue-app": "^2.0.0", "cache-loader": "^1.2.2", "caniuse-lite": "^1.0.30000824", "chalk": "^2.3.2", "chokidar": "^2.0.3", "compression": "^1.7.1", "connect": "^3.6.5", "consola": "^1.2.0", "css-loader": "^0.28.11", "es6-promise": "^4.2.4", "esm": "^3.0.16", "etag": "^1.8.1", "file-loader": "^1.1.11", "fresh": "^0.5.2", "fs-extra": "^5.0.0", "glob": "^7.1.2", "hash-sum": "^1.0.2", "html-minifier": "^3.5.14", "html-webpack-plugin": "^3.2.0", "launch-editor-middleware": "^2.2.1", "lodash": "^4.17.5", "lru-cache": "^4.1.2", "memory-fs": "^0.4.1", "mini-css-extract-plugin": "^0.4.0", "minimist": "^1.2.0", "opencollective": "^1.0.3", "postcss": "^6.0.21", "postcss-cssnext": "^3.1.0", "postcss-import": "^11.1.0", "postcss-import-resolver": "^1.1.0", "postcss-loader": "^2.1.3", "postcss-url": "^7.3.2", "semver": "^5.5.0", "serialize-javascript": "^1.4.0", "serve-static": "^1.13.2", "server-destroy": "^1.0.1", "std-env": "^1.3.0", "style-resources-loader": "^1.1.0", "thread-loader": "^1.1.5", "time-fix-plugin": "^2.0.0", "uglifyjs-webpack-plugin": "^1.2.4", "upath": "^1.0.2", "url-loader": "^1.0.1", "vue": "^2.5.16", "vue-loader": "^15.0.0-rc.1", "vue-meta": "^1.5.0", "vue-router": "^3.0.1", "vue-server-renderer": "^2.5.16", "vue-template-compiler": "^2.5.16", "vuex": "^3.0.1", "webpack": "^4.5.0", "webpack-bundle-analyzer": "^2.11.1", "webpack-dev-middleware": "^3.1.2", "webpack-hot-middleware": "^2.22.0", "webpack-node-externals": "^1.7.2", "webpackbar": "^2.6.1" };
var devDependencies = { "babel-eslint": "^8.2.1", "babel-plugin-external-helpers": "^6.22.0", "codecov": "^3.0.0", "cross-env": "^5.1.4", "eslint": "^4.19.1", "eslint-config-standard": "^11.0.0", "eslint-config-standard-jsx": "^5.0.0", "eslint-plugin-html": "^4.0.2", "eslint-plugin-import": "^2.10.0", "eslint-plugin-jest": "^21.15.0", "eslint-plugin-node": "^6.0.0", "eslint-plugin-promise": "^3.7.0", "eslint-plugin-react": "^7.6.1", "eslint-plugin-standard": "^3.0.1", "eslint-plugin-vue": "^4.4.0", "express": "^4.16.2", "finalhandler": "^1.1.1", "get-port": "^3.2.0", "jest": "^22.4.3", "jsdom": "^11.7.0", "nsp": "^3.2.1", "puppeteer": "^1.2.0", "request": "^2.83.0", "request-promise-native": "^1.0.5", "rimraf": "^2.6.2", "rollup": "^0.57.1", "rollup-plugin-babel": "^3.0.3", "rollup-plugin-commonjs": "^9.1.0", "rollup-plugin-json": "^2.3.0", "rollup-plugin-node-resolve": "^3.3.0" };
var collective = { "type": "opencollective", "url": "https://opencollective.com/nuxtjs", "logo": "https://opencollective.com/nuxtjs/logo.txt?reverse=true&variant=variant2" };
var packageJSON = {
	name: name,
	version: version,
	description: description,
	contributors: contributors,
	main: main,
	module: module$1,
	license: license,
	repository: repository,
	files: files,
	keywords: keywords,
	homepage: homepage,
	bin: bin,
	scripts: scripts,
	engines: engines,
	dependencies: dependencies,
	devDependencies: devDependencies,
	collective: collective
};

/*!
 * Vue.js v2.5.16
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_$$1, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray$1 (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_$$1) { return _$$1; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path$$1) {
  if (bailRE.test(path$$1)) {
    return
  }
  var segments = path$$1.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set$1 (target, key, val) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set$1(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false && isObject(value) && ('@binding' in value))
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash$$1,
  key,
  altKey,
  preserve
) {
  if (isDef(hash$$1)) {
    if (hasOwn(hash$$1, key)) {
      res[key] = hash$$1[key];
      if (!preserve) {
        delete hash$$1[key];
      }
      return true
    } else if (hasOwn(hash$$1, altKey)) {
      res[key] = hash$$1[altKey];
      if (!preserve) {
        delete hash$$1[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray$1(cbs) : cbs;
      var args = toArray$1(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set$1;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash$$1;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash$$1 = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash$$1 = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash$$1)) {
          hash$$1[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (process.env.NODE_ENV !== 'production') {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray$1(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set$1;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.16';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_$$1, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */









// add a raw attr (use this in preTransforms)








// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize$1(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize$1 = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_$$1, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

var MetaRenderer = function () {
  function MetaRenderer(nuxt, renderer) {
    classCallCheck(this, MetaRenderer);

    this.nuxt = nuxt;
    this.renderer = renderer;
    this.options = nuxt.options;
    this.vueRenderer = vueServerRenderer.createRenderer();
    this.cache = LRU({});

    // Add VueMeta to Vue (this is only for SPA mode)
    // See lib/app/index.js
    Vue.use(VueMeta, {
      keyName: 'head',
      attribute: 'data-n-head',
      ssrAttribute: 'data-n-head-ssr',
      tagIDKeyName: 'hid'
    });
  }

  createClass(MetaRenderer, [{
    key: 'getMeta',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
        var vm;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                vm = new Vue({
                  render: function render(h) {
                    return h();
                  }, // Render empty html tag
                  head: this.options.head || {}
                });
                _context.next = 3;
                return this.vueRenderer.renderToString(vm);

              case 3:
                return _context.abrupt('return', vm.$meta().inject());

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMeta(_x) {
        return _ref.apply(this, arguments);
      }

      return getMeta;
    }()
  }, {
    key: 'render',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
        var _ref2$url = _ref2.url,
            url = _ref2$url === undefined ? '/' : _ref2$url;
        var meta, m, clientManifest, shouldPreload, shouldPrefetch, publicPath;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                meta = this.cache.get(url);

                if (!meta) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return', meta);

              case 3:

                meta = {
                  HTML_ATTRS: '',
                  BODY_ATTRS: '',
                  HEAD: '',
                  BODY_SCRIPTS: ''

                  // Get vue-meta context
                };_context2.next = 6;
                return this.getMeta(url);

              case 6:
                m = _context2.sent;


                // HTML_ATTRS
                meta.HTML_ATTRS = m.htmlAttrs.text();

                // BODY_ATTRS
                meta.BODY_ATTRS = m.bodyAttrs.text();

                // HEAD tags
                meta.HEAD = m.meta.text() + m.title.text() + m.link.text() + m.style.text() + m.script.text() + m.noscript.text();

                // BODY_SCRIPTS
                meta.BODY_SCRIPTS = m.script.text({ body: true }) + m.noscript.text({ body: true });

                // Resources Hints

                meta.resourceHints = '';

                clientManifest = this.renderer.resources.clientManifest;

                shouldPreload = this.options.render.bundleRenderer.shouldPreload || function () {
                  return true;
                };

                shouldPrefetch = this.options.render.bundleRenderer.shouldPrefetch || function () {
                  return true;
                };

                if (this.options.render.resourceHints && clientManifest) {
                  publicPath = clientManifest.publicPath || '/_nuxt/';

                  // Preload initial resources

                  if (Array.isArray(clientManifest.initial)) {
                    meta.resourceHints += clientManifest.initial.filter(function (file) {
                      return shouldPreload(file);
                    }).map(function (r) {
                      return '<link rel="preload" href="' + publicPath + r + '" as="script" />';
                    }).join('');
                  }

                  // Prefetch async resources
                  if (Array.isArray(clientManifest.async)) {
                    meta.resourceHints += clientManifest.async.filter(function (file) {
                      return shouldPrefetch(file);
                    }).map(function (r) {
                      return '<link rel="prefetch" href="' + publicPath + r + '" />';
                    }).join('');
                  }

                  // Add them to HEAD
                  if (meta.resourceHints) {
                    meta.HEAD += meta.resourceHints;
                  }
                }

                // Emulate getPreloadFiles from vue-server-renderer (works for JS chunks only)
                meta.getPreloadFiles = function () {
                  return clientManifest.initial.filter(function (file) {
                    return shouldPreload(file);
                  }).map(function (r) {
                    return {
                      file: r,
                      fileWithoutQuery: r,
                      asType: 'script',
                      extension: 'js'
                    };
                  });
                };

                // Set meta tags inside cache
                this.cache.set(url, meta);

                return _context2.abrupt('return', meta);

              case 19:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function render(_x2) {
        return _ref3.apply(this, arguments);
      }

      return render;
    }()
  }]);
  return MetaRenderer;
}();

var readSource = function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(frame) {
    var sanitizeName, searchPath, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pathDir, fullPath, source;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Remove webpack:/// & query string from the end
            sanitizeName = function sanitizeName(name) {
              return name ? name.replace('webpack:///', '').split('?')[0] : null;
            };

            frame.fileName = sanitizeName(frame.fileName);

            // Return if fileName is unknown
            /* istanbul ignore if */

            if (frame.fileName) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return');

          case 4:

            // Possible paths for file
            searchPath = [this.options.srcDir, this.options.rootDir, path.join(this.options.buildDir, 'dist'), this.options.buildDir, process.cwd()];

            // Scan filesystem for real source

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 8;
            _iterator = searchPath[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 24;
              break;
            }

            pathDir = _step.value;
            fullPath = path.resolve(pathDir, frame.fileName);
            _context.next = 15;
            return fsExtra.readFile(fullPath, 'utf-8').catch(function () {
              return null;
            });

          case 15:
            source = _context.sent;

            if (!source) {
              _context.next = 21;
              break;
            }

            frame.contents = source;
            frame.fullPath = fullPath;
            if (path.isAbsolute(frame.fileName)) {
              frame.fileName = path.relative(this.options.rootDir, fullPath);
            }
            return _context.abrupt('return');

          case 21:
            _iteratorNormalCompletion = true;
            _context.next = 10;
            break;

          case 24:
            _context.next = 30;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context['catch'](8);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 30:
            _context.prev = 30;
            _context.prev = 31;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 33:
            _context.prev = 33;

            if (!_didIteratorError) {
              _context.next = 36;
              break;
            }

            throw _iteratorError;

          case 36:
            return _context.finish(33);

          case 37:
            return _context.finish(30);

          case 38:

            // Fallback: use server bundle
            // TODO: restore to if after https://github.com/istanbuljs/nyc/issues/595 fixed
            /* istanbul ignore next */
            if (!frame.contents) {
              frame.contents = this.resources.serverBundle.files[frame.fileName];
            }

          case 39:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[8, 26, 30, 38], [31,, 33, 37]]);
  }));

  return function readSource(_x2) {
    return _ref.apply(this, arguments);
  };
}();

function errorMiddleware(err, req, res, next) {
  // ensure statusCode, message and name fields
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Nuxt Server Error';
  err.name = !err.name || err.name === 'Error' ? 'NuxtServerError' : err.name;

  // We hide actual errors from end users, so show them on server logs
  if (err.statusCode !== 404) {
    _consola.error(err);
  }

  var sendResponse = function sendResponse(content) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'text/html';

    // Set Headers
    res.statusCode = err.statusCode;
    res.statusMessage = err.name;
    res.setHeader('Content-Type', type + '; charset=utf-8');
    res.setHeader('Content-Length', Buffer.byteLength(content));

    // Send Response
    res.end(content, 'utf-8');
  };

  // Check if request accepts JSON
  var hasReqHeader = function hasReqHeader(header, includes) {
    return req.headers[header] && req.headers[header].toLowerCase().includes(includes);
  };
  var isJson = hasReqHeader('accept', 'application/json') || hasReqHeader('user-agent', 'curl/');

  // Use basic errors when debug mode is disabled
  if (!this.options.debug) {
    // Json format is compatible with Youch json responses
    var json = {
      status: err.statusCode,
      message: err.message,
      name: err.name
    };
    if (isJson) {
      sendResponse(JSON.stringify(json, undefined, 2), 'text/json');
      return;
    }
    var html = this.resources.errorTemplate(json);
    sendResponse(html);
    return;
  }

  // Show stack trace
  var youch = new Youch(err, req, readSource.bind(this), this.options.router.base, true);
  if (isJson) {
    youch.toJSON().then(function (json) {
      sendResponse(JSON.stringify(json, undefined, 2), 'text/json');
    });
  } else {
    youch.toHTML().then(function (html) {
      sendResponse(html);
    });
  }
}

var nuxtMiddleware = (function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var context, result, html, cspScriptSrcHashes, error, redirected, getPreloadFiles, etag, pushAssets, preloadFiles, shouldPush, publicPath, allowedSources, policies, cspStr, cspArr;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Get context
            context = getContext(req, res);


            res.statusCode = 200;
            _context.prev = 2;
            _context.next = 5;
            return this.renderRoute(req.url, context);

          case 5:
            result = _context.sent;
            _context.next = 8;
            return this.nuxt.callHook('render:route', req.url, result, context);

          case 8:
            html = result.html, cspScriptSrcHashes = result.cspScriptSrcHashes, error = result.error, redirected = result.redirected, getPreloadFiles = result.getPreloadFiles;

            if (!redirected) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', html);

          case 11:
            if (error) {
              res.statusCode = context.nuxt.error.statusCode || 500;
            }

            // Add ETag header

            if (!(!error && this.options.render.etag)) {
              _context.next = 19;
              break;
            }

            etag = generateETag(html, this.options.render.etag);

            if (!fresh(req.headers, { etag: etag })) {
              _context.next = 18;
              break;
            }

            res.statusCode = 304;
            res.end();
            return _context.abrupt('return');

          case 18:
            res.setHeader('ETag', etag);

          case 19:

            // HTTP2 push headers for preload assets
            if (!error && this.options.render.http2.push) {
              // Parse resourceHints to extract HTTP.2 prefetch/push headers
              // https://w3c.github.io/preload/#server-push-http-2
              pushAssets = [];
              preloadFiles = getPreloadFiles();
              shouldPush = this.options.render.http2.shouldPush;
              publicPath = this.resources.clientManifest.publicPath;


              preloadFiles.forEach(function (_ref2) {
                var file = _ref2.file,
                    asType = _ref2.asType,
                    fileWithoutQuery = _ref2.fileWithoutQuery,
                    extension = _ref2.extension;

                // By default, we only preload scripts or css
                /* istanbul ignore if */
                if (!shouldPush && asType !== 'script' && asType !== 'style') {
                  return;
                }

                // User wants to explicitly control what to preload
                if (shouldPush && !shouldPush(fileWithoutQuery, asType)) {
                  return;
                }

                pushAssets.push('<' + publicPath + file + '>; rel=preload; as=' + asType);
              });

              // Pass with single Link header
              // https://blog.cloudflare.com/http-2-server-push-with-multiple-assets-per-link-header
              // https://www.w3.org/Protocols/9707-link-header.html
              res.setHeader('Link', pushAssets.join(','));
            }

            if (this.options.render.csp && this.options.render.csp.enabled) {
              allowedSources = this.options.render.csp.allowedSources;
              policies = this.options.render.csp.policies;
              cspStr = 'script-src \'self\' ' + cspScriptSrcHashes.join(' ');

              if (Array.isArray(allowedSources)) {
                // For compatible section
                cspStr = 'script-src \'self\' ' + cspScriptSrcHashes.concat(allowedSources).join(' ');
              } else if ((typeof policies === 'undefined' ? 'undefined' : _typeof(policies)) === 'object' && policies !== null && !Array.isArray(policies)) {
                // Set default policy if necessary
                if (!policies['script-src'] || !Array.isArray(policies['script-src'])) {
                  policies['script-src'] = ['\'self\''].concat(cspScriptSrcHashes);
                } else {
                  policies['script-src'] = cspScriptSrcHashes.concat(policies['script-src']);
                  if (!policies['script-src'].includes('\'self\'')) {
                    policies['script-src'] = ['\'self\''].concat(policies['script-src']);
                  }
                }

                // Make content-security-policy string
                cspArr = [];

                Object.keys(policies).forEach(function (k) {
                  cspArr.push(k + ' ' + policies[k].join(' '));
                });
                cspStr = cspArr.join('; ');
              }
              res.setHeader('Content-Security-Policy', cspStr);
            }

            // Send response
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Content-Length', Buffer.byteLength(html));
            res.end(html, 'utf8');
            return _context.abrupt('return', html);

          case 27:
            _context.prev = 27;
            _context.t0 = _context['catch'](2);

            if (!(context && context.redirected)) {
              _context.next = 32;
              break;
            }

            _consola.error(_context.t0);
            return _context.abrupt('return', _context.t0);

          case 32:

            next(_context.t0);

          case 33:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 27]]);
  }));

  function nuxtMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return nuxtMiddleware;
})();

var jsdom = null;

var Renderer = function () {
  function Renderer(nuxt) {
    classCallCheck(this, Renderer);

    this.nuxt = nuxt;
    this.options = nuxt.options;

    // Will be set by createRenderer
    this.bundleRenderer = null;
    this.metaRenderer = null;

    // Will be available on dev
    this.webpackDevMiddleware = null;
    this.webpackHotMiddleware = null;

    // Create new connect instance
    this.app = connect();

    // Renderer runtime resources
    this.resources = {
      clientManifest: null,
      serverBundle: null,
      ssrTemplate: null,
      spaTemplate: null,
      errorTemplate: parseTemplate('Nuxt.js Internal Server Error')
    };
  }

  createClass(Renderer, [{
    key: 'ready',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.nuxt.callHook('render:before', this, this.options.render);

              case 2:
                _context.next = 4;
                return this.setupMiddleware();

              case 4:
                if (this.options.dev) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return this.loadResources();

              case 7:
                _context.next = 9;
                return this.nuxt.callHook('render:done', this);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function ready() {
        return _ref.apply(this, arguments);
      }

      return ready;
    }()
  }, {
    key: 'loadResources',
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        var _fs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fsExtra;

        var distPath, updated, errorTemplatePath, loadingHTMLPath;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                distPath = path.resolve(this.options.buildDir, 'dist');
                updated = [];


                resourceMap.forEach(function (_ref3) {
                  var key = _ref3.key,
                      fileName = _ref3.fileName,
                      transform = _ref3.transform;

                  var rawKey = '$$' + key;
                  var _path = path.join(distPath, fileName);

                  var rawData = void 0,
                      data = void 0;
                  if (!_fs.existsSync(_path)) {
                    return; // Resource not exists
                  }
                  rawData = _fs.readFileSync(_path, 'utf8');
                  if (!rawData || rawData === _this.resources[rawKey]) {
                    return; // No changes
                  }
                  _this.resources[rawKey] = rawData;
                  data = transform(rawData);
                  /* istanbul ignore if */
                  if (!data) {
                    return; // Invalid data ?
                  }
                  _this.resources[key] = data;
                  updated.push(key);
                });

                // Reload error template
                errorTemplatePath = path.resolve(this.options.buildDir, 'views/error.html');

                if (fsExtra.existsSync(errorTemplatePath)) {
                  this.resources.errorTemplate = parseTemplate(fsExtra.readFileSync(errorTemplatePath, 'utf8'));
                }

                // Load loading template
                loadingHTMLPath = path.resolve(this.options.buildDir, 'loading.html');

                if (fsExtra.existsSync(loadingHTMLPath)) {
                  this.resources.loadingHTML = fsExtra.readFileSync(loadingHTMLPath, 'utf8');
                  this.resources.loadingHTML = this.resources.loadingHTML.replace(/\r|\n|[\t\s]{3,}/g, '');
                } else {
                  this.resources.loadingHTML = '';
                }

                // Call resourcesLoaded plugin
                _context2.next = 9;
                return this.nuxt.callHook('render:resourcesLoaded', this.resources);

              case 9:

                if (updated.length > 0) {
                  this.createRenderer();
                }

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadResources() {
        return _ref2.apply(this, arguments);
      }

      return loadResources;
    }()
  }, {
    key: 'createRenderer',
    value: function createRenderer() {
      // Ensure resources are available
      if (!this.isResourcesAvailable) {
        return;
      }

      // Create Meta Renderer
      this.metaRenderer = new MetaRenderer(this.nuxt, this);

      // Skip following steps if noSSR mode
      if (this.noSSR) {
        return;
      }

      // Create bundle renderer for SSR
      this.bundleRenderer = vueServerRenderer.createBundleRenderer(this.resources.serverBundle, Object.assign({
        clientManifest: this.resources.clientManifest,
        runInNewContext: false,
        basedir: this.options.rootDir
      }, this.options.render.bundleRenderer));
    }
  }, {
    key: 'useMiddleware',
    value: function useMiddleware(m) {
      // Resolve
      var $m = m;
      var src = void 0;
      if (typeof m === 'string') {
        m = this.nuxt.requireModule(m);
      }
      if (typeof m.handler === 'string') {
        m.handler = this.nuxt.requireModule(m.handler);
      }

      var handler = m.handler || m;
      var path$$1 = ((m.prefix !== false ? this.options.router.base : '') + (typeof m.path === 'string' ? m.path : '')).replace(/\/\//g, '/');

      // Inject $src and $m to final handler
      if (src) handler.$src = src;
      handler.$m = $m;

      // Use middleware
      this.app.use(path$$1, handler);
    }
  }, {
    key: 'setupMiddleware',
    value: function () {
      var _ref4 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this2 = this;

        var staticMiddleware, distDir;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.nuxt.callHook('render:setupMiddleware', this.app);

              case 2:

                // Gzip middleware for production
                if (!this.options.dev && this.options.render.gzip) {
                  this.useMiddleware(compression(this.options.render.gzip));
                }

                // Common URL checks
                this.useMiddleware(function (req, res, next) {
                  // Prevent access to SSR resources
                  if (ssrResourceRegex.test(req.url)) {
                    res.statusCode = 404;
                    return res.end();
                  }
                  next();
                });

                // Add webpack middleware only for development
                if (this.options.dev) {
                  this.useMiddleware(function () {
                    var _ref5 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
                      return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              if (!_this2.webpackDevMiddleware) {
                                _context3.next = 3;
                                break;
                              }

                              _context3.next = 3;
                              return _this2.webpackDevMiddleware(req, res);

                            case 3:
                              if (!_this2.webpackHotMiddleware) {
                                _context3.next = 6;
                                break;
                              }

                              _context3.next = 6;
                              return _this2.webpackHotMiddleware(req, res);

                            case 6:
                              next();

                            case 7:
                            case 'end':
                              return _context3.stop();
                          }
                        }
                      }, _callee3, _this2);
                    }));

                    return function (_x2, _x3, _x4) {
                      return _ref5.apply(this, arguments);
                    };
                  }());
                }

                // open in editor for debug mode only
                if (this.options.debug && this.options.dev) {
                  this.useMiddleware({
                    path: '__open-in-editor',
                    handler: launchMiddleware(this.options.editor)
                  });
                }

                // For serving static/ files to /
                staticMiddleware = serveStatic(path.resolve(this.options.srcDir, this.options.dir.static), this.options.render.static);

                staticMiddleware.prefix = this.options.render.static.prefix;
                this.useMiddleware(staticMiddleware);

                // Serve .nuxt/dist/ files only for production
                // For dev they will be served with devMiddleware
                if (!this.options.dev) {
                  distDir = path.resolve(this.options.buildDir, 'dist');

                  this.useMiddleware({
                    path: this.publicPath,
                    handler: serveStatic(distDir, {
                      index: false, // Don't serve index.html template
                      maxAge: '1y' // 1 year in production
                    })
                  });
                }

                // Add User provided middleware
                this.options.serverMiddleware.forEach(function (m) {
                  _this2.useMiddleware(m);
                });

                // Finally use nuxtMiddleware
                this.useMiddleware(nuxtMiddleware.bind(this));

                // Error middleware for errors that occurred in middleware that declared above
                // Middleware should exactly take 4 arguments
                // https://github.com/senchalabs/connect#error-middleware

                // Apply errorMiddleware from modules first
                _context4.next = 14;
                return this.nuxt.callHook('render:errorMiddleware', this.app);

              case 14:

                // Apply errorMiddleware from Nuxt
                this.useMiddleware(errorMiddleware.bind(this));

              case 15:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setupMiddleware() {
        return _ref4.apply(this, arguments);
      }

      return setupMiddleware;
    }()
  }, {
    key: 'renderRoute',
    value: function () {
      var _ref6 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(url) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var spa, ENV, _ref7, HTML_ATTRS, BODY_ATTRS, _HEAD, BODY_SCRIPTS, getPreloadFiles, _APP, err, _html, APP, m, HEAD, serializedSession, cspScriptSrcHashes, hash$$1, html;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.isReady) {
                  _context5.next = 4;
                  break;
                }

                _context5.next = 3;
                return waitFor(1000);

              case 3:
                return _context5.abrupt('return', this.renderRoute(url, context));

              case 4:

                // Log rendered url
                _consola.debug('Rendering url ' + url);

                // Add url and isSever to the context
                context.url = url;

                // Basic response if SSR is disabled or spa data provided
                spa = context.spa || context.res && context.res.spa;
                ENV = this.options.env;

                if (!(this.noSSR || spa)) {
                  _context5.next = 23;
                  break;
                }

                _context5.next = 11;
                return this.metaRenderer.render(context);

              case 11:
                _ref7 = _context5.sent;
                HTML_ATTRS = _ref7.HTML_ATTRS;
                BODY_ATTRS = _ref7.BODY_ATTRS;
                _HEAD = _ref7.HEAD;
                BODY_SCRIPTS = _ref7.BODY_SCRIPTS;
                getPreloadFiles = _ref7.getPreloadFiles;
                _APP = '<div id="__nuxt">' + this.resources.loadingHTML + '</div>' + BODY_SCRIPTS;

                // Detect 404 errors

                if (!(url.includes(this.options.build.publicPath) || url.includes('__webpack'))) {
                  _context5.next = 21;
                  break;
                }

                err = {
                  statusCode: 404,
                  message: this.options.messages.error_404,
                  name: 'ResourceNotFound'
                };
                throw err;

              case 21:
                _html = this.resources.spaTemplate({
                  HTML_ATTRS: HTML_ATTRS,
                  BODY_ATTRS: BODY_ATTRS,
                  HEAD: _HEAD,
                  APP: _APP,
                  ENV: ENV
                });
                return _context5.abrupt('return', { html: _html, getPreloadFiles: getPreloadFiles });

              case 23:
                _context5.next = 25;
                return this.bundleRenderer.renderToString(context);

              case 25:
                APP = _context5.sent;


                if (!context.nuxt.serverRendered) {
                  APP = '<div id="__nuxt"></div>';
                }
                m = context.meta.inject();
                HEAD = m.meta.text() + m.title.text() + m.link.text() + m.style.text() + m.script.text() + m.noscript.text();

                if (this.options._routerBaseSpecified) {
                  HEAD += '<base href="' + this.options.router.base + '">';
                }

                if (this.options.render.resourceHints) {
                  HEAD += context.renderResourceHints();
                }

                serializedSession = 'window.__NUXT__=' + serialize(context.nuxt, {
                  isJSON: true
                }) + ';';
                cspScriptSrcHashes = [];

                if (this.options.render.csp && this.options.render.csp.enabled) {
                  hash$$1 = crypto.createHash(this.options.render.csp.hashAlgorithm);

                  hash$$1.update(serializedSession);
                  cspScriptSrcHashes.push('\'' + this.options.render.csp.hashAlgorithm + '-' + hash$$1.digest('base64') + '\'');
                }

                APP += '<script>' + serializedSession + '</script>';
                APP += context.renderScripts();
                APP += m.script.text({ body: true });
                APP += m.noscript.text({ body: true });

                // TODO: vue-ssr need to handle https://github.com/vuejs/vue/issues/7897
                HEAD += context.renderStyles();

                html = this.resources.ssrTemplate({
                  HTML_ATTRS: 'data-n-head-ssr ' + m.htmlAttrs.text(),
                  BODY_ATTRS: m.bodyAttrs.text(),
                  HEAD: HEAD,
                  APP: APP,
                  ENV: ENV
                });
                return _context5.abrupt('return', {
                  html: html,
                  cspScriptSrcHashes: cspScriptSrcHashes,
                  getPreloadFiles: context.getPreloadFiles,
                  error: context.nuxt.error,
                  redirected: context.redirected
                });

              case 41:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function renderRoute(_x6) {
        return _ref6.apply(this, arguments);
      }

      return renderRoute;
    }()
  }, {
    key: 'renderAndGetWindow',
    value: function () {
      var _ref8 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(url) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var options, jsdomErrHandler, _ref9, window, nuxtExists, error;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (jsdom) {
                  _context6.next = 9;
                  break;
                }

                _context6.prev = 1;

                jsdom = require('jsdom');
                _context6.next = 9;
                break;

              case 5:
                _context6.prev = 5;
                _context6.t0 = _context6['catch'](1);

                _consola.error('\n         Fail when calling nuxt.renderAndGetWindow(url)\n         jsdom module is not installed\n         Please install jsdom with: npm install --save-dev jsdom\n        ');
                throw _context6.t0;

              case 9:
                options = {
                  resources: 'usable', // load subresources (https://github.com/tmpvar/jsdom#loading-subresources)
                  runScripts: 'dangerously',
                  beforeParse: function beforeParse(window) {
                    // Mock window.scrollTo
                    window.scrollTo = function () {};
                  }
                };

                jsdomErrHandler = function jsdomErrHandler(err) {
                  throw err;
                };

                if (opts.virtualConsole !== false) {
                  options.virtualConsole = new jsdom.VirtualConsole().sendTo(_consola);
                  // throw error when window creation failed
                  options.virtualConsole.on('jsdomError', jsdomErrHandler);
                }
                url = url || 'http://localhost:3000';
                _context6.next = 15;
                return jsdom.JSDOM.fromURL(url, options);

              case 15:
                _ref9 = _context6.sent;
                window = _ref9.window;

                // If Nuxt could not be loaded (error from the server-side)
                nuxtExists = window.document.body.innerHTML.includes(this.options.render.ssr ? 'window.__NUXT__' : '<div id="__nuxt">');
                /* istanbul ignore if */

                if (nuxtExists) {
                  _context6.next = 22;
                  break;
                }

                error = new Error('Could not load the nuxt app');

                error.body = window.document.body.innerHTML;
                throw error;

              case 22:
                _context6.next = 24;
                return timeout(new Promise(function (resolve) {
                  window._onNuxtLoaded = function () {
                    return resolve(window);
                  };
                }), 20000, 'Components loading in renderAndGetWindow was not completed in 20s');

              case 24:
                if (opts.virtualConsole !== false) {
                  // after window initialized successfully
                  options.virtualConsole.removeListener('jsdomError', jsdomErrHandler);
                }
                // Send back window object
                return _context6.abrupt('return', window);

              case 26:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 5]]);
      }));

      function renderAndGetWindow(_x8) {
        return _ref8.apply(this, arguments);
      }

      return renderAndGetWindow;
    }()
  }, {
    key: 'noSSR',
    get: function get$$1() {
      return this.options.render.ssr === false;
    }
  }, {
    key: 'isReady',
    get: function get$$1() {
      if (this.noSSR) {
        return Boolean(this.resources.spaTemplate);
      }

      return Boolean(this.bundleRenderer && this.resources.ssrTemplate);
    }
  }, {
    key: 'isResourcesAvailable',
    get: function get$$1() {
      // Required for both
      /* istanbul ignore if */
      if (!this.resources.clientManifest) {
        return false;
      }

      // Required for SPA rendering
      if (this.noSSR) {
        return Boolean(this.resources.spaTemplate);
      }

      // Required for bundle renderer
      return Boolean(this.resources.ssrTemplate && this.resources.serverBundle);
    }
  }, {
    key: 'publicPath',
    get: function get$$1() {
      return isUrl(this.options.build.publicPath) ? defaults$1.build.publicPath : this.options.build.publicPath;
    }
  }]);
  return Renderer;
}();


var parseTemplate = function parseTemplate(templateStr) {
  return _.template(templateStr, {
    interpolate: /{{([\s\S]+?)}}/g
  });
};

var resourceMap = [{
  key: 'clientManifest',
  fileName: 'vue-ssr-client-manifest.json',
  transform: JSON.parse
}, {
  key: 'serverBundle',
  fileName: 'server-bundle.json',
  transform: JSON.parse
}, {
  key: 'ssrTemplate',
  fileName: 'index.ssr.html',
  transform: parseTemplate
}, {
  key: 'spaTemplate',
  fileName: 'index.spa.html',
  transform: parseTemplate
}];

// Protector utility against request to SSR bundle files
var ssrResourceRegex = new RegExp(resourceMap.map(function (resource) {
  return resource.fileName;
}).join('|'), 'i');

var Nuxt = function () {
  function Nuxt() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Nuxt);

    this.options = Options.from(options);

    this.readyMessage = null;
    this.initialized = false;

    // Hooks
    this._hooks = {};
    this.hook = this.hook.bind(this);

    // Create instance of core components
    this.moduleContainer = new ModuleContainer(this);
    this.renderer = new Renderer(this);

    // Backward compatibility
    this.render = this.renderer.app;
    this.renderRoute = this.renderer.renderRoute.bind(this.renderer);
    this.renderAndGetWindow = this.renderer.renderAndGetWindow.bind(this.renderer);

    // ESM Loader
    this.esm = esm(module, {});

    this._ready = this.ready().catch(function (err) {
      _consola.fatal(err);
    });
  }

  createClass(Nuxt, [{
    key: 'ready',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._ready) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', this._ready);

              case 2:

                // Add hooks
                if (_.isPlainObject(this.options.hooks)) {
                  this.addObjectHooks(this.options.hooks);
                } else if (typeof this.options.hooks === 'function') {
                  this.options.hooks(this.hook);
                }

                // Await for modules
                _context.next = 5;
                return this.moduleContainer.ready();

              case 5:
                _context.next = 7;
                return this.renderer.ready();

              case 7:

                this.initialized = true;

                // Call ready hook
                _context.next = 10;
                return this.callHook('ready', this);

              case 10:
                return _context.abrupt('return', this);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function ready() {
        return _ref.apply(this, arguments);
      }

      return ready;
    }()
  }, {
    key: 'hook',
    value: function hook(name$$1, fn) {
      if (!name$$1 || typeof fn !== 'function') {
        return;
      }
      this._hooks[name$$1] = this._hooks[name$$1] || [];
      this._hooks[name$$1].push(fn);
    }
  }, {
    key: 'callHook',
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name$$1) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._hooks[name$$1]) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                _consola.debug('Call ' + name$$1 + ' hooks (' + this._hooks[name$$1].length + ')');
                _context2.prev = 3;
                _context2.next = 6;
                return sequence(this._hooks[name$$1], function (fn) {
                  return fn.apply(undefined, toConsumableArray(args));
                });

              case 6:
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](3);

                _consola.error(_context2.t0);
                this.callHook('error', _context2.t0);

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 8]]);
      }));

      function callHook(_x2) {
        return _ref2.apply(this, arguments);
      }

      return callHook;
    }()
  }, {
    key: 'addObjectHooks',
    value: function addObjectHooks(hooksObj) {
      var _this = this;

      Object.keys(hooksObj).forEach(function (name$$1) {
        var hooks = hooksObj[name$$1];
        hooks = Array.isArray(hooks) ? hooks : [hooks];

        hooks.forEach(function (hook) {
          _this.hook(name$$1, hook);
        });
      });
    }
  }, {
    key: 'showReady',
    value: function showReady() {
      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (!this.readyMessage) {
        return;
      }

      _consola.ready({
        message: this.readyMessage,
        badge: true,
        clear: clear
      });
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this2 = this;

      var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
      var host = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'localhost';

      return new Promise(function (resolve, reject) {
        var server = _this2.renderer.app.listen({ port: port, host: host, exclusive: false }, function (err) {
          /* istanbul ignore if */
          if (err) {
            return reject(err);
          }

          var listenURL = chalk.underline.blue('http://' + host + ':' + port);
          _this2.readyMessage = 'Listening on ' + listenURL;

          // Close server on nuxt close
          _this2.hook('close', function () {
            return new Promise(function (resolve, reject) {
              // Destroy server by forcing every connection to be closed
              server.destroy(function (err) {
                _consola.debug('server closed');
                /* istanbul ignore if */
                if (err) {
                  return reject(err);
                }
                resolve();
              });
            });
          });

          _this2.callHook('listen', server, { port: port, host: host }).then(resolve);
        });

        // Add server.destroy(cb) method
        enableDestroy(server);
      });
    }
  }, {
    key: 'resolveAlias',
    value: function resolveAlias(_path) {
      if (_path.indexOf('@@') === 0 || _path.indexOf('~~') === 0) {
        return path.join(this.options.rootDir, _path.substr(2));
      }

      if (_path.indexOf('@') === 0 || _path.indexOf('~') === 0) {
        return path.join(this.options.srcDir, _path.substr(1));
      }

      return path.resolve(this.options.srcDir, _path);
    }
  }, {
    key: 'resolvePath',
    value: function resolvePath(_path) {
      // Try to resolve using NPM resolve path first
      try {
        var resolvedPath = Module._resolveFilename(_path, {
          paths: this.options.modulesDir
        });
        return resolvedPath;
      } catch (error) {
        if (error.code !== 'MODULE_NOT_FOUND') {
          throw error;
        }
      }

      var __path = this.resolveAlias(_path);

      if (fsExtra.existsSync(__path)) {
        return __path;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.options.extensions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var ext = _step.value;

          if (fsExtra.existsSync(__path + '.' + ext)) {
            return __path + '.' + ext;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      throw new Error('Cannot resolve "' + _path + '" from "' + __path + '"');
    }
  }, {
    key: 'requireModule',
    value: function requireModule(_path) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _resovledPath = this.resolvePath(_path);
      var m = opts.esm === false ? require(_resovledPath) : this.esm(_resovledPath);
      return m && m.default || m;
    }
  }, {
    key: 'close',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(callback) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.callHook('close', this);

              case 2:
                if (!(typeof callback === 'function')) {
                  _context3.next = 5;
                  break;
                }

                _context3.next = 5;
                return callback();

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function close(_x7) {
        return _ref3.apply(this, arguments);
      }

      return close;
    }()
  }], [{
    key: 'version',
    get: function get$$1() {
      return packageJSON.version;
    }
  }]);
  return Nuxt;
}();

var core = {
  Nuxt: Nuxt,
  Module: ModuleContainer,
  Renderer: Renderer
};

// https://github.com/webpack-contrib/thread-loader
// https://github.com/webpack-contrib/cache-loader

var PerfLoader = function () {
  function PerfLoader(options) {
    classCallCheck(this, PerfLoader);

    this.options = options;
    this.warmup = threadLoader.warmup;
    this.workerPools = {
      js: {
        name: 'js',
        poolTimeout: this.options.dev ? Infinity : 2000
      },
      css: {
        name: 'css',
        poolTimeout: this.options.dev ? Infinity : 2000
      }
    };
  }

  createClass(PerfLoader, [{
    key: 'warmupAll',
    value: function warmupAll() {
      this.warmup(this.workerPools.js, ['babel-loader', 'babel-preset-env']);
      this.warmup(this.workerPools.css, ['css-loader']);
    }
  }, {
    key: 'pool',
    value: function pool(poolName, _loaders) {
      var loaders = [].concat(_loaders);

      if (this.options.build.parallel) {
        var pool = this.workerPools[poolName];

        if (pool) {
          loaders.unshift({
            loader: 'thread-loader',
            options: pool
          });
        }
      }

      if (this.options.build.cache) {
        loaders.unshift({
          loader: 'cache-loader',
          options: {
            cacheDirectory: path.resolve('node_modules/.cache/cache-loader')
          }
        });
      }

      return loaders;
    }
  }, {
    key: 'poolOneOf',
    value: function poolOneOf(poolName, oneOfRules) {
      var _this = this;

      // disable css thread pool since vue-style-loader needs options like: target
      if (poolName === 'css' && !this.options.build.extractCSS) {
        return oneOfRules;
      }
      return oneOfRules.map(function (rule) {
        return Object.assign({}, rule, {
          use: _this.pool(poolName, rule.use)
        });
      });
    }
  }]);
  return PerfLoader;
}();

var prefix = '[vue-server-renderer-webpack-plugin]';
var warn$1 = function warn(msg) {
  return console.error(chalk.red(prefix + ' ' + msg + '\n'));
}; // eslint-disable-line no-console
var tip$1 = function tip(msg) {
  return console.log(chalk.yellow(prefix + ' ' + msg + '\n'));
}; // eslint-disable-line no-console

var validate = function validate(compiler) {
  if (compiler.options.target !== 'node') {
    warn$1('webpack config `target` should be "node".');
  }

  if (compiler.options.output && compiler.options.output.libraryTarget !== 'commonjs2') {
    warn$1('webpack config `output.libraryTarget` should be "commonjs2".');
  }

  if (!compiler.options.externals) {
    tip$1('It is recommended to externalize dependencies in the server build for ' + 'better build performance.');
  }
};

var onEmit = function onEmit(compiler, name, hook) {
  if (compiler.hooks) {
    // Webpack >= 4.0.0
    compiler.hooks.emit.tapAsync(name, hook);
  } else {
    // Webpack < 4.0.0
    compiler.plugin('emit', hook);
  }
};

var isJS = function isJS(file) {
  return (/\.js(\?[^.]+)?$/.test(file)
  );
};

var VueSSRClientPlugin = function () {
  function VueSSRClientPlugin() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, VueSSRClientPlugin);

    this.options = Object.assign({
      filename: 'vue-ssr-client-manifest.json'
    }, options);
  }

  createClass(VueSSRClientPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      onEmit(compiler, 'vue-client-plugin', function (compilation, cb) {
        var stats = compilation.getStats().toJson();

        var allFiles = uniq(stats.assets.map(function (a) {
          return a.name;
        }));

        var initialFiles = uniq(Object.keys(stats.entrypoints).map(function (name) {
          return stats.entrypoints[name].assets;
        }).reduce(function (assets, all) {
          return all.concat(assets);
        }, []).filter(isJS));

        var asyncFiles = allFiles.filter(isJS).filter(function (file) {
          return initialFiles.indexOf(file) < 0;
        });

        var manifest = {
          publicPath: stats.publicPath,
          all: allFiles,
          initial: initialFiles,
          async: asyncFiles,
          modules: {/* [identifier: string]: Array<index: number> */}
        };

        var assetModules = stats.modules.filter(function (m) {
          return m.assets.length;
        });
        var fileToIndex = function fileToIndex(file) {
          return manifest.all.indexOf(file);
        };
        stats.modules.forEach(function (m) {
          // ignore modules duplicated in multiple chunks
          if (m.chunks.length === 1) {
            var cid = m.chunks[0];
            var chunk = stats.chunks.find(function (c) {
              return c.id === cid;
            });
            if (!chunk || !chunk.files) {
              return;
            }
            var files = manifest.modules[hash(m.identifier)] = chunk.files.map(fileToIndex);
            // find all asset modules associated with the same chunk
            assetModules.forEach(function (m) {
              if (m.chunks.some(function (id) {
                return id === cid;
              })) {
                files.push.apply(files, m.assets.map(fileToIndex));
              }
            });
          }
        });

        // const debug = (file, obj) => {
        //   require('fs').writeFileSync(__dirname + '/' + file, JSON.stringify(obj, null, 2))
        // }
        // debug('stats.json', stats)
        // debug('client-manifest.json', manifest)

        var json = JSON.stringify(manifest, null, 2);
        compilation.assets[_this.options.filename] = {
          source: function source() {
            return json;
          },
          size: function size() {
            return json.length;
          }
        };
        cb();
      });
    }
  }]);
  return VueSSRClientPlugin;
}();

var PostcssConfig = function () {
  function PostcssConfig(options, nuxt) {
    classCallCheck(this, PostcssConfig);

    this.nuxt = nuxt;
    this.postcss = options.build.postcss;
    this.srcDir = options.srcDir;
    this.rootDir = options.rootDir;
    this.cssSourceMap = options.build.cssSourceMap;
    this.modulesDir = options.modulesDir;
  }

  createClass(PostcssConfig, [{
    key: 'configFromFile',
    value: function configFromFile() {
      // Search for postCSS config file and use it if exists
      // https://github.com/michael-ciniawsky/postcss-load-config
      var _arr = [this.srcDir, this.rootDir];
      for (var _i = 0; _i < _arr.length; _i++) {
        var dir = _arr[_i];var _arr2 = ['postcss.config.js', '.postcssrc.js', '.postcssrc', '.postcssrc.json', '.postcssrc.yaml'];

        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
          var file = _arr2[_i2];
          if (fs.existsSync(path.resolve(dir, file))) {
            var postcssConfigPath = path.resolve(dir, file);
            return {
              sourceMap: this.cssSourceMap,
              config: {
                path: postcssConfigPath
              }
            };
          }
        }
      }
    }
  }, {
    key: 'normalize',
    value: function normalize(config) {
      if (Array.isArray(config)) {
        config = { plugins: config };
      }
      return config;
    }
  }, {
    key: 'loadPlugins',
    value: function loadPlugins(config) {
      var plugins = config.plugins;
      if (isPureObject(plugins)) {
        // Map postcss plugins into instances on object mode once
        config.plugins = Object.keys(plugins).map(function (p) {
          var plugin = require(p);
          var opts = plugins[p];
          if (opts === false) return; // Disabled
          var instance = plugin(opts);
          return instance;
        }).filter(function (e) {
          return e;
        });
      }
    }
  }, {
    key: 'config',
    value: function config() {
      /* istanbul ignore if */
      if (!this.postcss) {
        return false;
      }

      var config = this.configFromFile();
      if (config) {
        return config;
      }

      config = this.normalize(_.cloneDeep(this.postcss));

      // Apply default plugins
      if (isPureObject(config)) {
        _.defaults(config, this.defaultConfig);

        this.loadPlugins(config);
      }

      return config;
    }
  }, {
    key: 'defaultConfig',
    get: function get$$1() {
      return {
        useConfigFile: false,
        sourceMap: this.cssSourceMap,
        plugins: {
          // https://github.com/postcss/postcss-import
          'postcss-import': {
            resolve: createResolver({
              alias: {
                '~': path.join(this.srcDir),
                '~~': path.join(this.rootDir),
                '@': path.join(this.srcDir),
                '@@': path.join(this.rootDir)
              },
              modules: [this.srcDir, this.rootDir].concat(toConsumableArray(this.modulesDir))
            })
          },

          // https://github.com/postcss/postcss-url
          'postcss-url': {},

          // http://cssnext.io/postcss
          'postcss-cssnext': {}
        }
      };
    }
  }]);
  return PostcssConfig;
}();

var StyleLoader = function () {
  function StyleLoader(options, nuxt, _ref) {
    var isServer = _ref.isServer;
    classCallCheck(this, StyleLoader);

    this.isServer = isServer;
    this.dev = options.dev;
    this.srcDir = options.srcDir;
    this.assetsDir = options.dir.assets;
    this.staticDir = options.dir.static;
    this.extractCSS = options.build.extractCSS;
    this.resources = options.build.styleResources;
    this.sourceMap = Boolean(options.build.cssSourceMap);

    if (options.build.postcss) {
      this.postcssConfig = new PostcssConfig(options, nuxt);
    }
  }

  createClass(StyleLoader, [{
    key: 'normalize',
    value: function normalize(loaders) {
      var _this = this;

      loaders = Array.isArray(loaders) ? loaders : [loaders];
      return loaders.map(function (loader) {
        return Object.assign({ options: { sourceMap: _this.sourceMap } }, typeof loader === 'string' ? { loader: loader } : loader);
      });
    }
  }, {
    key: 'styleResource',
    value: function styleResource(ext) {
      var extResource = this.resources[ext];
      // style-resources-loader
      // https://github.com/yenshih/style-resources-loader
      if (extResource) {
        var patterns = Array.isArray(extResource) ? extResource : [extResource];

        return {
          loader: 'style-resources-loader',
          options: Object.assign({ patterns: patterns }, this.resources.options || {})
        };
      }
    }
  }, {
    key: 'postcss',
    value: function postcss() {
      // postcss-loader
      // https://github.com/postcss/postcss-loader
      if (this.postcssConfig) {
        var config = this.postcssConfig.config();
        if (config) {
          return {
            loader: 'postcss-loader',
            options: Object.assign({ sourceMap: this.sourceMap }, config)
          };
        }
      }
    }
  }, {
    key: 'css',
    value: function css(importLoaders, options) {
      var _cssLoaderAlias;

      // css-loader
      // https://github.com/webpack-contrib/css-loader
      var cssLoaderAlias = (_cssLoaderAlias = {}, defineProperty(_cssLoaderAlias, '/' + this.assetsDir, path.join(this.srcDir, this.assetsDir)), defineProperty(_cssLoaderAlias, '/' + this.staticDir, path.join(this.srcDir, this.staticDir)), _cssLoaderAlias);

      return {
        loader: this.isServer && this.extractCSS ? 'css-loader/locals' : 'css-loader',
        options: Object.assign({
          sourceMap: this.sourceMap,
          minimize: !this.dev,
          importLoaders: importLoaders,
          alias: cssLoaderAlias
        }, options)
      };
    }
  }, {
    key: 'extract',
    value: function extract() {
      if (this.extractCSS && !this.isServer) {
        return MiniCssExtractPlugin.loader;
      }
    }
  }, {
    key: 'vueStyle',
    value: function vueStyle() {
      // https://github.com/vuejs/vue-style-loader
      return {
        loader: 'vue-style-loader',
        options: { sourceMap: this.sourceMap }
      };
    }
  }, {
    key: 'apply',
    value: function apply(ext) {
      var loaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var customLoaders = [].concat(this.postcss(loaders), this.styleResource(ext), this.normalize(loaders)).filter(Boolean);

      var styleLoader = this.extract() || this.vueStyle();

      return [
      // This matches <style module>
      {
        resourceQuery: /module/,
        use: [].concat(styleLoader, this.css(customLoaders.length, {
          modules: true,
          localIdentName: '[local]_[hash:base64:5]'
        }), customLoaders)
      },
      // This matches plain <style> or <style scoped>
      {
        use: [].concat(styleLoader, this.css(customLoaders.length), customLoaders)
      }];
    }
  }]);
  return StyleLoader;
}();

var WarnFixPlugin = function () {
  function WarnFixPlugin() {
    classCallCheck(this, WarnFixPlugin);
  }

  createClass(WarnFixPlugin, [{
    key: 'apply',
    value: function apply(compiler) /* istanbul ignore next */{
      compiler.hooks.done.tap('warnfix-plugin', function (stats) {
        stats.compilation.warnings = stats.compilation.warnings.filter(function (warn) {
          if (warn.name === 'ModuleDependencyWarning' && warn.message.includes('export \'default\'') && warn.message.includes('nuxt_plugin_')) {
            return false;
          }
          return true;
        });
      });
    }
  }]);
  return WarnFixPlugin;
}();

var StatsPlugin = function () {
  function StatsPlugin(statsOptions) {
    classCallCheck(this, StatsPlugin);

    this.statsOptions = statsOptions;
  }

  createClass(StatsPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.done.tap('stats-plugin', function (stats) {
        process.stdout.write('\n' + stats.toString(_this.statsOptions) + '\n');
      });
    }
  }]);
  return StatsPlugin;
}();

var WebpackBaseConfig = function () {
  function WebpackBaseConfig(builder, options) {
    classCallCheck(this, WebpackBaseConfig);

    this.name = options.name;
    this.isServer = options.isServer;
    this.builder = builder;
    this.nuxt = this.builder.nuxt;
    this.isStatic = builder.isStatic;
    this.options = builder.options;
    this.spinner = builder.spinner;
  }

  createClass(WebpackBaseConfig, [{
    key: 'getBabelOptions',
    value: function getBabelOptions() {
      var options = _.clone(this.options.build.babel);

      if (typeof options.presets === 'function') {
        options.presets = options.presets({ isServer: this.isServer });
      }

      if (!options.babelrc && !options.presets) {
        options.presets = [[this.builder.nuxt.resolvePath('babel-preset-vue-app'), {
          targets: this.isServer ? { node: '8.0.0' } : { ie: 9, uglify: true }
        }]];
      }

      return options;
    }
  }, {
    key: 'getFileName',
    value: function getFileName(name) {
      var fileName = this.options.build.filenames[name];

      // Don't use hashes when watching
      // https://github.com/webpack/webpack/issues/1914#issuecomment-174171709
      if (this.options.dev) {
        fileName = fileName.replace(/\[(chunkhash|contenthash|hash)\]\./g, '');
      }

      // Don't use [name] for production assets
      if (!this.options.dev && this.options.build.optimization.splitChunks.name !== true) {
        fileName = fileName.replace(/\[name\]\./g, '');
      }

      return fileName;
    }
  }, {
    key: 'env',
    value: function env$$1() {
      var env$$1 = {
        'process.mode': JSON.stringify(this.options.mode),
        'process.static': this.isStatic
      };
      _.each(this.options.env, function (value, key) {
        env$$1['process.env.' + key] = ['boolean', 'number'].indexOf(typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== -1 ? value : JSON.stringify(value);
      });
      return env$$1;
    }
  }, {
    key: 'output',
    value: function output() {
      return {
        path: path.resolve(this.options.buildDir, 'dist'),
        filename: this.getFileName('app'),
        chunkFilename: this.getFileName('chunk'),
        publicPath: isUrl(this.options.build.publicPath) ? this.options.build.publicPath : urlJoin(this.options.router.base, this.options.build.publicPath)
      };
    }
  }, {
    key: 'alias',
    value: function alias() {
      var _ref;

      return _ref = {
        '~': path.join(this.options.srcDir),
        '~~': path.join(this.options.rootDir),
        '@': path.join(this.options.srcDir),
        '@@': path.join(this.options.rootDir)
      }, defineProperty(_ref, this.options.dir.assets, path.join(this.options.srcDir, this.options.dir.assets)), defineProperty(_ref, this.options.dir.static, path.join(this.options.srcDir, this.options.dir.static)), _ref;
    }
  }, {
    key: 'rules',
    value: function rules() {
      var styleLoader = new StyleLoader(this.options, this.builder.nuxt, { isServer: this.isServer });

      var perfLoader = this.builder.perfLoader;

      return [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: Object.assign({
          productionMode: !this.options.dev,
          transformAssetUrls: {
            video: 'src',
            source: 'src',
            object: 'src',
            embed: 'src'
          }
        }, this.options.build.vueLoader)
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: perfLoader.pool('js', {
          loader: 'babel-loader',
          options: this.getBabelOptions()
        })
      }, {
        test: /\.css$/,
        oneOf: perfLoader.poolOneOf('css', styleLoader.apply('css'))
      }, {
        test: /\.less$/,
        oneOf: perfLoader.poolOneOf('css', styleLoader.apply('less', 'less-loader'))
      }, {
        test: /\.sass$/,
        oneOf: perfLoader.poolOneOf('css', styleLoader.apply('sass', {
          loader: 'sass-loader',
          options: { indentedSyntax: true }
        }))
      }, {
        test: /\.scss$/,
        oneOf: perfLoader.poolOneOf('css', styleLoader.apply('scss', 'sass-loader'))
      }, {
        test: /\.styl(us)?$/,
        oneOf: perfLoader.poolOneOf('css', styleLoader.apply('stylus', 'stylus-loader'))
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: perfLoader.pool('assets', {
          loader: 'url-loader',
          options: {
            limit: 1000, // 1KO
            name: 'img/[name].[hash:7].[ext]'
          }
        })
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: perfLoader.pool('assets', {
          loader: 'url-loader',
          options: {
            limit: 1000, // 1 KO
            name: 'fonts/[name].[hash:7].[ext]'
          }
        })
      }, {
        test: /\.(webm|mp4)$/,
        use: perfLoader.pool('assets', {
          loader: 'file-loader',
          options: {
            name: 'videos/[name].[hash:7].[ext]'
          }
        })
      }];
    }
  }, {
    key: 'plugins',
    value: function plugins() {
      var _this = this;

      var plugins = [new VueLoader.VueLoaderPlugin()];

      Array.prototype.push.apply(plugins, this.options.build.plugins || []);

      // Add timefix-plugin before others plugins
      if (this.options.dev) {
        plugins.unshift(new TimeFixPlugin());
      }

      // Hide warnings about plugins without a default export (#1179)
      plugins.push(new WarnFixPlugin());

      // Build progress indicator
      plugins.push(new WebpackBar({
        profile: this.options.build.profile,
        name: this.isServer ? 'server' : 'client',
        color: this.isServer ? 'orange' : 'green',
        compiledIn: false,
        done: function done(states) {
          if (_this.options.dev) {
            var hasErrors = Object.values(states).some(function (state) {
              return state.stats.hasErrors();
            });

            if (!hasErrors) {
              _this.nuxt.showReady();
            }
          }
        }
      }));

      // Add stats plugin
      if (!this.options.dev && this.options.build.stats) {
        plugins.push(new StatsPlugin(this.options.build.stats));
      }

      // CSS extraction
      // MiniCssExtractPlugin does not currently supports SSR
      // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/48
      // So we use css-loader/locals as a fallback (utils/style-loader)
      if (this.options.build.extractCSS && !this.isServer) {
        plugins.push(new MiniCssExtractPlugin(Object.assign({
          filename: this.getFileName('css'),
          chunkFilename: this.getFileName('css')
        }, this.options.build.extractCSS)));
      }

      return plugins;
    }
  }, {
    key: 'config',
    value: function config() {
      // Prioritize nested node_modules in webpack search path (#2558)
      var webpackModulesDir = ['node_modules'].concat(this.options.modulesDir);
      var config = {
        name: this.name,
        mode: this.options.dev ? 'development' : 'production',
        optimization: {},
        output: this.output(),
        performance: {
          maxEntrypointSize: 1000 * 1024,
          hints: this.options.dev ? false : 'warning'
        },
        resolve: {
          extensions: ['.js', '.json', '.vue', '.jsx'],
          alias: this.alias(),
          modules: webpackModulesDir
        },
        resolveLoader: {
          modules: webpackModulesDir
        },
        module: {
          noParse: /es6-promise\.js$/, // Avoid webpack shimming process
          rules: this.rules()
        },
        plugins: this.plugins()

        // Clone deep avoid leaking config between Client and Server
      };return _.cloneDeep(config);
    }
  }]);
  return WebpackBaseConfig;
}();

var WebpackClientConfig = function (_WebpackBaseConfig) {
  inherits(WebpackClientConfig, _WebpackBaseConfig);

  function WebpackClientConfig(builder) {
    classCallCheck(this, WebpackClientConfig);
    return possibleConstructorReturn(this, (WebpackClientConfig.__proto__ || Object.getPrototypeOf(WebpackClientConfig)).call(this, builder, { name: 'client', isServer: false }));
  }

  createClass(WebpackClientConfig, [{
    key: 'env',
    value: function env$$1() {
      return Object.assign(get(WebpackClientConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackClientConfig.prototype), 'env', this).call(this), {
        'process.env.VUE_ENV': JSON.stringify('client'),
        'process.browser': true,
        'process.client': true,
        'process.server': false
      });
    }
  }, {
    key: 'plugins',
    value: function plugins() {
      var plugins = get(WebpackClientConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackClientConfig.prototype), 'plugins', this).call(this);

      // Generate output HTML for SSR
      if (this.options.build.ssr) {
        plugins.push(new HTMLPlugin({
          filename: 'index.ssr.html',
          template: this.options.appTemplatePath,
          inject: false // Resources will be injected using bundleRenderer
        }));
      }

      plugins.push(new HTMLPlugin({
        filename: 'index.spa.html',
        template: this.options.appTemplatePath,
        inject: true,
        chunksSortMode: 'dependency'
      }), new VueSSRClientPlugin({
        filename: 'vue-ssr-client-manifest.json'
      }), new webpack.DefinePlugin(this.env()));

      if (this.options.dev) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
      }

      // Chunks size limit
      // https://webpack.js.org/plugins/aggressive-splitting-plugin/
      if (!this.options.dev && this.options.build.maxChunkSize) {
        plugins.push(new webpack.optimize.AggressiveSplittingPlugin({
          minSize: this.options.build.maxChunkSize,
          maxSize: this.options.build.maxChunkSize
        }));
      }

      // Webpack Bundle Analyzer
      // https://github.com/webpack-contrib/webpack-bundle-analyzer
      if (!this.options.dev && this.options.build.analyze) {
        var statsDir = path.resolve(this.options.buildDir, 'stats');

        plugins.push(new BundleAnalyzer.BundleAnalyzerPlugin(Object.assign({
          analyzerMode: 'static',
          defaultSizes: 'gzip',
          generateStatsFile: true,
          openAnalyzer: !(this.options.ci || this.options.test),
          reportFilename: path.resolve(statsDir, 'client.html'),
          statsFilename: path.resolve(statsDir, 'client.json')
        }, this.options.build.analyze)));
      }

      return plugins;
    }
  }, {
    key: 'config',
    value: function config() {
      var config = get(WebpackClientConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackClientConfig.prototype), 'config', this).call(this);

      // Entry points
      config.entry = path.resolve(this.options.buildDir, 'client.js');

      // -- Optimization --
      config.optimization = this.options.build.optimization;

      // Small, known and common modules which are usually used project-wise
      // Sum of them may not be more than 244 KiB
      if (this.options.build.splitChunks.commons === true && config.optimization.splitChunks.cacheGroups.commons === undefined) {
        config.optimization.splitChunks.cacheGroups.commons = {
          test: /node_modules\/(vue|vue-loader|vue-router|vuex|vue-meta|core-js|babel-runtime|es6-promise|axios|webpack|setimmediate|timers-browserify|process|regenerator-runtime|cookie|js-cookie|is-buffer|dotprop|nuxt\.js)\//,
          chunks: 'all',
          priority: 10,
          name: 'commons'
        };
      }

      // Make uglifyjs faster
      if (!this.options.dev && !config.optimization.minimizer) {
        // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
        config.optimization.minimizer = [new UglifyJsWebpackPlugin({
          parallel: true,
          cache: this.options.build.cache,
          sourceMap: false,
          extractComments: {
            filename: 'LICENSES'
          },
          uglifyOptions: {
            output: {
              comments: /^\**!|@preserve|@license|@cc_on/
            }
          }
        })];
      }

      // Add HMR support
      if (this.options.dev) {
        config.entry = [
        // https://github.com/glenjamin/webpack-hot-middleware#config
        ('webpack-hot-middleware/client?name=client&reload=true&timeout=30000&path=' + this.options.router.base + '/__webpack_hmr').replace(/\/\//g, '/'), config.entry];
      }

      // Add friendly error plugin
      if (this.options.dev) {
        config.plugins.push(new FriendlyErrorsWebpackPlugin({
          clearConsole: true,
          logLevel: 'WARNING'
        }));
      }

      // Extend config
      if (typeof this.options.build.extend === 'function') {
        var isDev = this.options.dev;
        var extendedConfig = this.options.build.extend.call(this.builder, config, {
          isDev: isDev,
          isClient: true
        });

        // Only overwrite config when something is returned for backwards compatibility
        if (extendedConfig !== undefined) {
          config = extendedConfig;
        }
      }

      return config;
    }
  }]);
  return WebpackClientConfig;
}(WebpackBaseConfig);

var VueSSRServerPlugin = function () {
  function VueSSRServerPlugin() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, VueSSRServerPlugin);

    this.options = Object.assign({
      filename: 'vue-ssr-server-bundle.json'
    }, options);
  }

  createClass(VueSSRServerPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      validate(compiler);

      onEmit(compiler, 'vue-server-plugin', function (compilation, cb) {
        var stats = compilation.getStats().toJson();
        var entryName = Object.keys(stats.entrypoints)[0];
        var entryInfo = stats.entrypoints[entryName];

        if (!entryInfo) {
          // #5553
          return cb();
        }

        var entryAssets = entryInfo.assets.filter(isJS);

        if (entryAssets.length > 1) {
          throw new Error('Server-side bundle should have one single entry file. ' + 'Avoid using CommonsChunkPlugin in the server config.');
        }

        var entry = entryAssets[0];
        if (!entry || typeof entry !== 'string') {
          throw new Error('Entry "' + entryName + '" not found. Did you specify the correct entry option?');
        }

        var bundle = {
          entry: entry,
          files: {},
          maps: {}
        };

        stats.assets.forEach(function (asset) {
          if (asset.name.match(/\.js$/)) {
            bundle.files[asset.name] = compilation.assets[asset.name].source();
          } else if (asset.name.match(/\.js\.map$/)) {
            bundle.maps[asset.name.replace(/\.map$/, '')] = JSON.parse(compilation.assets[asset.name].source());
          }
          // do not emit anything else for server
          delete compilation.assets[asset.name];
        });

        var json = JSON.stringify(bundle, null, 2);
        var filename = _this.options.filename;

        compilation.assets[filename] = {
          source: function source() {
            return json;
          },
          size: function size() {
            return json.length;
          }
        };

        cb();
      });
    }
  }]);
  return VueSSRServerPlugin;
}();

var WebpackServerConfig = function (_BaseConfig) {
  inherits(WebpackServerConfig, _BaseConfig);

  function WebpackServerConfig(builder) {
    classCallCheck(this, WebpackServerConfig);
    return possibleConstructorReturn(this, (WebpackServerConfig.__proto__ || Object.getPrototypeOf(WebpackServerConfig)).call(this, builder, { name: 'server', isServer: true }));
  }

  createClass(WebpackServerConfig, [{
    key: 'env',
    value: function env$$1() {
      return Object.assign(get(WebpackServerConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackServerConfig.prototype), 'env', this).call(this), {
        'process.env.VUE_ENV': JSON.stringify('server'),
        'process.browser': false,
        'process.client': false,
        'process.server': true
      });
    }
  }, {
    key: 'plugins',
    value: function plugins() {
      var plugins = get(WebpackServerConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackServerConfig.prototype), 'plugins', this).call(this);
      plugins.push(new VueSSRServerPlugin({
        filename: 'server-bundle.json'
      }), new webpack.DefinePlugin(this.env()));
      return plugins;
    }
  }, {
    key: 'config',
    value: function config() {
      var config = get(WebpackServerConfig.prototype.__proto__ || Object.getPrototypeOf(WebpackServerConfig.prototype), 'config', this).call(this);

      // Config devtool
      config.devtool = 'cheap-source-map';

      Object.assign(config, {
        target: 'node',
        node: false,
        entry: path.resolve(this.options.buildDir, 'server.js'),
        output: Object.assign({}, config.output, {
          filename: 'server-bundle.js',
          libraryTarget: 'commonjs2'
        }),
        performance: {
          hints: false,
          maxAssetSize: Infinity
        },
        externals: [],
        optimization: {
          splitChunks: false,
          minimizer: []
        }
      });

      // https://webpack.js.org/configuration/externals/#externals
      // https://github.com/liady/webpack-node-externals
      this.options.modulesDir.forEach(function (dir) {
        if (fs.existsSync(dir)) {
          config.externals.push(nodeExternals({
            // load non-javascript files with extensions, presumably via loaders
            whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i],
            modulesDir: dir
          }));
        }
      });

      // Extend config
      if (typeof this.options.build.extend === 'function') {
        var isDev = this.options.dev;
        var extendedConfig = this.options.build.extend.call(this.builder, config, {
          isDev: isDev,
          isServer: true
        });
        // Only overwrite config when something is returned for backwards compatibility
        if (extendedConfig !== undefined) {
          config = extendedConfig;
        }
      }

      return config;
    }
  }]);
  return WebpackServerConfig;
}(WebpackBaseConfig);

var glob = util.promisify(Glob);

var Builder = function () {
  function Builder(nuxt) {
    var _this = this;

    classCallCheck(this, Builder);

    this.nuxt = nuxt;
    this.isStatic = false; // Flag to know if the build is for a generated app
    this.options = nuxt.options;

    // Fields that set on build
    this.compilers = [];
    this.compilersWatching = [];
    this.webpackDevMiddleware = null;
    this.webpackHotMiddleware = null;
    this.filesWatcher = null;
    this.customFilesWatcher = null;
    this.perfLoader = null;

    // Helper to resolve build paths
    this.relativeToBuild = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return relativeTo.apply(undefined, [_this.options.buildDir].concat(args));
    };

    this._buildStatus = STATUS.INITIAL;

    // Stop watching on nuxt.close()
    if (this.options.dev) {
      this.nuxt.hook('close', function () {
        return _this.unwatch();
      });
    }

    // Initialize shared FS and Cache
    if (this.options.dev) {
      this.mfs = new MFS();
    }

    // if(!this.options.dev) {
    // TODO: enable again when unsafe concern resolved.(common/options.js:42)
    // this.nuxt.hook('build:done', () => this.generateConfig())
    // }
  }

  createClass(Builder, [{
    key: 'forGenerate',
    value: function forGenerate() {
      this.isStatic = true;
    }
  }, {
    key: 'build',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var dir;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this._buildStatus === STATUS.BUILD_DONE && this.options.dev)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', this);

              case 2:
                if (!(this._buildStatus === STATUS.BUILDING)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return waitFor(1000);

              case 5:
                return _context.abrupt('return', this.build());

              case 6:
                this._buildStatus = STATUS.BUILDING;

                _consola.info({
                  message: 'Building project',
                  badge: true,
                  clear: true
                });

                // Wait for nuxt ready
                _context.next = 10;
                return this.nuxt.ready();

              case 10:
                _context.next = 12;
                return this.nuxt.callHook('build:before', this, this.options.build);

              case 12:

                // Check if pages dir exists and warn if not
                this._nuxtPages = typeof this.options.build.createRoutes !== 'function';

                if (!this._nuxtPages) {
                  _context.next = 21;
                  break;
                }

                if (fsExtra.existsSync(path.join(this.options.srcDir, this.options.dir.pages))) {
                  _context.next = 21;
                  break;
                }

                dir = this.options.srcDir;

                if (!fsExtra.existsSync(path.join(this.options.srcDir, '..', this.options.dir.pages))) {
                  _context.next = 20;
                  break;
                }

                throw new Error('No `' + this.options.dir.pages + '` directory found in ' + dir + '. Did you mean to run `nuxt` in the parent (`../`) directory?');

              case 20:
                this._defaultPage = true;

              case 21:

                _consola.success('Builder initialized');

                _consola.debug('App root: ' + this.options.srcDir);

                // Create .nuxt/, .nuxt/components and .nuxt/dist folders
                _context.next = 25;
                return fsExtra.remove(r(this.options.buildDir));

              case 25:
                _context.next = 27;
                return fsExtra.mkdirp(r(this.options.buildDir, 'components'));

              case 27:
                if (this.options.dev) {
                  _context.next = 30;
                  break;
                }

                _context.next = 30;
                return fsExtra.mkdirp(r(this.options.buildDir, 'dist'));

              case 30:
                _context.next = 32;
                return this.generateRoutesAndFiles();

              case 32:
                _context.next = 34;
                return this.webpackBuild();

              case 34:

                // Flag to set that building is done
                this._buildStatus = STATUS.BUILD_DONE;

                // Call done hook
                _context.next = 37;
                return this.nuxt.callHook('build:done', this);

              case 37:
                return _context.abrupt('return', this);

              case 38:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function build() {
        return _ref.apply(this, arguments);
      }

      return build;
    }()
  }, {
    key: 'generateRoutesAndFiles',
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this2 = this;

        var templatesFiles, templateVars, layoutsFiles, hasErrorLayout, files, extendedRoutes, customTemplateFiles, indicatorPath1, indicatorPath2, indicatorPath;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _consola.debug('Generating nuxt files');

                // -- Templates --
                templatesFiles = ['App.js', 'client.js', 'index.js', 'middleware.js', 'router.js', 'server.js', 'utils.js', 'empty.js', 'components/nuxt-error.vue', 'components/nuxt-loading.vue', 'components/nuxt-child.js', 'components/nuxt-link.js', 'components/nuxt.js', 'components/no-ssr.js', 'views/app.template.html', 'views/error.html'];
                templateVars = {
                  options: this.options,
                  extensions: this.options.extensions.map(function (ext) {
                    return ext.replace(/^\./, '');
                  }).join('|'),
                  messages: this.options.messages,
                  splitChunks: this.options.build.splitChunks,
                  uniqBy: _.uniqBy,
                  isDev: this.options.dev,
                  debug: this.options.debug,
                  mode: this.options.mode,
                  router: this.options.router,
                  env: this.options.env,
                  head: this.options.head,
                  middleware: fsExtra.existsSync(path.join(this.options.srcDir, this.options.dir.middleware)),
                  store: this.options.store,
                  css: this.options.css,
                  plugins: this.plugins,
                  appPath: './App.js',
                  ignorePrefix: this.options.ignorePrefix,
                  layouts: Object.assign({}, this.options.layouts),
                  loading: typeof this.options.loading === 'string' ? this.relativeToBuild(this.options.srcDir, this.options.loading) : this.options.loading,
                  transition: this.options.transition,
                  layoutTransition: this.options.layoutTransition,
                  dir: this.options.dir,
                  components: {
                    ErrorPage: this.options.ErrorPage ? this.relativeToBuild(this.options.ErrorPage) : null
                  }

                  // -- Layouts --
                };

                if (!fsExtra.existsSync(path.resolve(this.options.srcDir, this.options.dir.layouts))) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 6;
                return glob(this.options.dir.layouts + '/**/*.{vue,js}', {
                  cwd: this.options.srcDir,
                  ignore: this.options.ignore
                });

              case 6:
                layoutsFiles = _context3.sent;
                hasErrorLayout = false;

                layoutsFiles.forEach(function (file) {
                  var name = file.split('/').slice(1).join('/').replace(/\.(vue|js)$/, '');
                  if (name === 'error') {
                    hasErrorLayout = true;
                    return;
                  }
                  if (!templateVars.layouts[name] || /\.vue$/.test(file)) {
                    templateVars.layouts[name] = _this2.relativeToBuild(_this2.options.srcDir, file);
                  }
                });
                if (!templateVars.components.ErrorPage && hasErrorLayout) {
                  templateVars.components.ErrorPage = this.relativeToBuild(this.options.srcDir, this.options.dir.layouts + '/error.vue');
                }

              case 10:
                if (templateVars.layouts.default) {
                  _context3.next = 15;
                  break;
                }

                _context3.next = 13;
                return fsExtra.mkdirp(r(this.options.buildDir, 'layouts'));

              case 13:
                templatesFiles.push('layouts/default.vue');
                templateVars.layouts.default = './layouts/default.vue';

              case 15:

                // -- Routes --
                _consola.debug('Generating routes...');

                if (!this._defaultPage) {
                  _context3.next = 20;
                  break;
                }

                templateVars.router.routes = createRoutes(['index.vue'], this.options.nuxtAppDir + '/pages');
                _context3.next = 30;
                break;

              case 20:
                if (!this._nuxtPages) {
                  _context3.next = 29;
                  break;
                }

                // If user defined a custom method to create routes
                // Use nuxt.js createRoutes bases on pages/
                files = {};
                _context3.next = 24;
                return glob(this.options.dir.pages + '/**/*.{vue,js}', {
                  cwd: this.options.srcDir,
                  ignore: this.options.ignore
                });

              case 24:
                _context3.t0 = function (f) {
                  var key = f.replace(/\.(js|vue)$/, '');
                  if (/\.vue$/.test(f) || !files[key]) {
                    files[key] = f.replace(/(['|"])/g, '\\$1');
                  }
                };

                _context3.sent.forEach(_context3.t0);

                templateVars.router.routes = createRoutes(Object.values(files), this.options.srcDir, this.options.dir.pages);
                _context3.next = 30;
                break;

              case 29:
                templateVars.router.routes = this.options.build.createRoutes(this.options.srcDir);

              case 30:
                _context3.next = 32;
                return this.nuxt.callHook('build:extendRoutes', templateVars.router.routes, r);

              case 32:

                // router.extendRoutes method
                if (typeof this.options.router.extendRoutes === 'function') {
                  // let the user extend the routes
                  extendedRoutes = this.options.router.extendRoutes(templateVars.router.routes, r);
                  // Only overwrite routes when something is returned for backwards compatibility

                  if (extendedRoutes !== undefined) {
                    templateVars.router.routes = extendedRoutes;
                  }
                }

                // Make routes accessible for other modules and webpack configs
                this.routes = templateVars.router.routes;

                // -- Store --
                // Add store if needed
                if (this.options.store) {
                  templatesFiles.push('store.js');
                }

                // Resolve template files
                customTemplateFiles = this.options.build.templates.map(function (t) {
                  return t.dst || path.basename(t.src || t);
                });


                templatesFiles = templatesFiles.map(function (file) {
                  // Skip if custom file was already provided in build.templates[]
                  if (customTemplateFiles.indexOf(file) !== -1) {
                    return;
                  }
                  // Allow override templates using a file with same name in ${srcDir}/app
                  var customPath = r(_this2.options.srcDir, 'app', file);
                  var customFileExists = fsExtra.existsSync(customPath);

                  return {
                    src: customFileExists ? customPath : r(_this2.options.nuxtAppDir, file),
                    dst: file,
                    custom: customFileExists
                  };
                }).filter(function (i) {
                  return !!i;
                });

                // -- Custom templates --
                // Add custom template files
                templatesFiles = templatesFiles.concat(this.options.build.templates.map(function (t) {
                  return Object.assign({
                    src: r(_this2.options.srcDir, t.src || t),
                    dst: t.dst || path.basename(t.src || t),
                    custom: true
                  }, t);
                }));

                // -- Loading indicator --
                if (this.options.loadingIndicator.name) {
                  indicatorPath1 = path.resolve(this.options.nuxtAppDir, 'views/loading', this.options.loadingIndicator.name + '.html');
                  indicatorPath2 = this.nuxt.resolveAlias(this.options.loadingIndicator.name);
                  indicatorPath = fsExtra.existsSync(indicatorPath1) ? indicatorPath1 : fsExtra.existsSync(indicatorPath2) ? indicatorPath2 : null;

                  if (indicatorPath) {
                    templatesFiles.push({
                      src: indicatorPath,
                      dst: 'loading.html',
                      options: this.options.loadingIndicator
                    });
                  } else {
                    /* istanbul ignore next */
                    // eslint-disable-next-line no-console
                    console.error('Could not fetch loading indicator: ' + this.options.loadingIndicator.name);
                  }
                }

                _context3.next = 41;
                return this.nuxt.callHook('build:templates', {
                  templatesFiles: templatesFiles,
                  templateVars: templateVars,
                  resolve: r
                });

              case 41:
                _context3.next = 43;
                return Promise.all(templatesFiles.map(function () {
                  var _ref4 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
                    var src = _ref3.src,
                        dst = _ref3.dst,
                        options = _ref3.options,
                        custom = _ref3.custom;

                    var fileContent, content, template, _path;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            // Add template to watchers
                            _this2.options.build.watch.push(src);
                            // Render template to dst
                            _context2.next = 3;
                            return fsExtra.readFile(src, 'utf8');

                          case 3:
                            fileContent = _context2.sent;
                            content = void 0;
                            _context2.prev = 5;
                            template = _.template(fileContent, {
                              imports: {
                                serialize: serialize,
                                hash: hash,
                                r: r,
                                wp: wp,
                                wChunk: wChunk,
                                resolvePath: _this2.nuxt.resolvePath.bind(_this2.nuxt),
                                resolveAlias: _this2.nuxt.resolveAlias.bind(_this2.nuxt),
                                relativeToBuild: _this2.relativeToBuild
                              }
                            });

                            content = template(Object.assign({}, templateVars, {
                              options: options || {},
                              custom: custom,
                              src: src,
                              dst: dst
                            }));
                            _context2.next = 13;
                            break;

                          case 10:
                            _context2.prev = 10;
                            _context2.t0 = _context2['catch'](5);
                            throw new Error('Could not compile template ' + src + ': ' + _context2.t0.message);

                          case 13:
                            _path = r(_this2.options.buildDir, dst);
                            // Ensure parent dir exits

                            _context2.next = 16;
                            return fsExtra.mkdirp(path.dirname(_path));

                          case 16:
                            _context2.next = 18;
                            return fsExtra.writeFile(_path, content, 'utf8');

                          case 18:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this2, [[5, 10]]);
                  }));

                  return function (_x) {
                    return _ref4.apply(this, arguments);
                  };
                }()));

              case 43:

                _consola.success('Nuxt files generated');

              case 44:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function generateRoutesAndFiles() {
        return _ref2.apply(this, arguments);
      }

      return generateRoutesAndFiles;
    }()
  }, {
    key: 'webpackBuild',
    value: function () {
      var _ref5 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _this3 = this;

        var compilersOptions, clientConfig, serverConfig, runner;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.perfLoader = new PerfLoader(this.options);

                compilersOptions = [];

                // Client

                clientConfig = new WebpackClientConfig(this).config();

                compilersOptions.push(clientConfig);

                // Server
                serverConfig = null;

                if (this.options.build.ssr) {
                  serverConfig = new WebpackServerConfig(this).config();
                  compilersOptions.push(serverConfig);
                }

                // Alias plugins to their real path
                this.plugins.forEach(function (p) {
                  var src = _this3.relativeToBuild(p.src);

                  // Client config
                  if (!clientConfig.resolve.alias[p.name]) {
                    clientConfig.resolve.alias[p.name] = src;
                  }

                  // Server config
                  if (serverConfig && !serverConfig.resolve.alias[p.name]) {
                    // Alias to noop for ssr:false plugins
                    serverConfig.resolve.alias[p.name] = p.ssr ? src : './empty.js';
                  }
                });

                // Configure compilers
                this.compilers = compilersOptions.map(function (compilersOption) {
                  var compiler = webpack(compilersOption);

                  // In dev, write files in memory FS
                  if (_this3.options.dev) {
                    compiler.outputFileSystem = _this3.mfs;
                  }

                  return compiler;
                });

                // Warmup perfLoader before build
                if (this.options.build.parallel) {
                  _consola.start('Warming up worker pools');
                  this.perfLoader.warmupAll();
                  _consola.success('Worker pools ready');
                }

                // Start Builds
                runner = this.options.dev ? parallel : sequence;
                _context4.next = 12;
                return runner(this.compilers, function (compiler) {
                  return _this3.webpackCompile(compiler);
                });

              case 12:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function webpackBuild() {
        return _ref5.apply(this, arguments);
      }

      return webpackBuild;
    }()
  }, {
    key: 'webpackCompile',
    value: function webpackCompile(compiler) {
      var _this4 = this;

      return new Promise(function () {
        var _ref6 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
          var name;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  name = compiler.options.name;
                  _context6.next = 3;
                  return _this4.nuxt.callHook('build:compile', { name: name, compiler: compiler });

                case 3:

                  // Load renderer resources after build
                  compiler.hooks.done.tap('load-resources', function () {
                    var _ref7 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(stats) {
                      return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              _context5.next = 2;
                              return _this4.nuxt.callHook('build:compiled', {
                                name: name,
                                compiler: compiler,
                                stats: stats
                              });

                            case 2:

                              // Reload renderer if available
                              _this4.nuxt.renderer.loadResources(_this4.mfs || fs);

                              // Resolve on next tick
                              process.nextTick(resolve);

                            case 4:
                            case 'end':
                              return _context5.stop();
                          }
                        }
                      }, _callee5, _this4);
                    }));

                    return function (_x4) {
                      return _ref7.apply(this, arguments);
                    };
                  }());

                  if (!_this4.options.dev) {
                    _context6.next = 10;
                    break;
                  }

                  if (!(compiler.options.name === 'client')) {
                    _context6.next = 7;
                    break;
                  }

                  return _context6.abrupt('return', _this4.webpackDev(compiler));

                case 7:
                  // Server, build and watch for changes
                  _this4.compilersWatching.push(compiler.watch(_this4.options.watchers.webpack, function (err) {
                    /* istanbul ignore if */
                    if (err) return reject(err);
                  }));
                  _context6.next = 11;
                  break;

                case 10:
                  // --- Production Build ---
                  compiler.run(function (err, stats) {
                    /* istanbul ignore next */
                    if (err) {
                      return reject(err);
                    } else if (stats.hasErrors()) {
                      if (_this4.options.test) {
                        err = stats.toString(_this4.options.build.stats);
                      }

                      return reject(err);
                    }

                    resolve();
                  });

                case 11:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, _this4);
        }));

        return function (_x2, _x3) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'webpackDev',
    value: function webpackDev(compiler) {
      _consola.debug('Adding webpack middleware...');

      // Create webpack dev middleware
      this.webpackDevMiddleware = util.promisify(webpackDevMiddleware(compiler, Object.assign({
        publicPath: this.options.build.publicPath,
        stats: false,
        logLevel: 'silent',
        watchOptions: this.options.watchers.webpack
      }, this.options.build.devMiddleware)));

      this.webpackDevMiddleware.close = util.promisify(this.webpackDevMiddleware.close);

      this.webpackHotMiddleware = util.promisify(webpackHotMiddleware(compiler, Object.assign({
        log: false,
        heartbeat: 10000
      }, this.options.build.hotMiddleware)));

      // Inject to renderer instance
      if (this.nuxt.renderer) {
        this.nuxt.renderer.webpackDevMiddleware = this.webpackDevMiddleware;
        this.nuxt.renderer.webpackHotMiddleware = this.webpackHotMiddleware;
      }

      // Start watching files
      this.watchFiles();
    }
  }, {
    key: 'watchFiles',
    value: function watchFiles() {
      var _this5 = this;

      var src = this.options.srcDir;
      var patterns = [r(src, this.options.dir.layouts), r(src, this.options.dir.store), r(src, this.options.dir.middleware), r(src, this.options.dir.layouts + '/*.{vue,js}'), r(src, this.options.dir.layouts + '/**/*.{vue,js}')];
      if (this._nuxtPages) {
        patterns.push(r(src, this.options.dir.pages), r(src, this.options.dir.pages + '/*.{vue,js}'), r(src, this.options.dir.pages + '/**/*.{vue,js}'));
      }
      patterns = _.map(patterns, function (p) {
        return upath.normalizeSafe(p);
      });

      var options = Object.assign({}, this.options.watchers.chokidar, {
        ignoreInitial: true
      });
      /* istanbul ignore next */
      var refreshFiles = _.debounce(function () {
        return _this5.generateRoutesAndFiles();
      }, 200);

      // Watch for src Files
      this.filesWatcher = chokidar.watch(patterns, options).on('add', refreshFiles).on('unlink', refreshFiles);

      // Watch for custom provided files
      var customPatterns = _.concat.apply(_, [this.options.build.watch].concat(toConsumableArray(_.values(_.omit(this.options.build.styleResources, ['options'])))));
      customPatterns = _.map(_.uniq(customPatterns), function (p) {
        return upath.normalizeSafe(p);
      });
      this.customFilesWatcher = chokidar.watch(customPatterns, options).on('change', refreshFiles);
    }
  }, {
    key: 'unwatch',
    value: function () {
      var _ref8 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.filesWatcher) {
                  this.filesWatcher.close();
                }

                if (this.customFilesWatcher) {
                  this.customFilesWatcher.close();
                }

                this.compilersWatching.forEach(function (watching) {
                  return watching.close();
                });

                // Stop webpack middleware

                if (!this.webpackDevMiddleware) {
                  _context7.next = 6;
                  break;
                }

                _context7.next = 6;
                return this.webpackDevMiddleware.close();

              case 6:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function unwatch() {
        return _ref8.apply(this, arguments);
      }

      return unwatch;
    }()

    // TODO: remove ignore when generateConfig enabled again

  }, {
    key: 'generateConfig',
    value: function () {
      var _ref9 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var config, options;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                config = path.resolve(this.options.buildDir, 'build.config.js');
                options = _.omit(this.options, Options.unsafeKeys);
                _context8.next = 4;
                return fsExtra.writeFile(config, 'export default ' + JSON.stringify(options, null, '  '), 'utf8');

              case 4:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function generateConfig() {
        return _ref9.apply(this, arguments);
      }

      return generateConfig;
    }()
  }, {
    key: 'plugins',
    get: function get$$1() {
      var _this6 = this;

      return _.uniqBy(this.options.plugins.map(function (p, i) {
        if (typeof p === 'string') p = { src: p };
        var pluginBaseName = path.basename(p.src, path.extname(p.src)).replace(/[^a-zA-Z?\d\s:]/g, '');
        return {
          src: _this6.nuxt.resolveAlias(p.src),
          ssr: p.ssr !== false,
          name: 'nuxt_plugin_' + pluginBaseName + '_' + hash(p.src)
        };
      }), function (p) {
        return p.name;
      });
    }
  }]);
  return Builder;
}();


var STATUS = {
  INITIAL: 1,
  BUILD_DONE: 2,
  BUILDING: 3
};

var Generator = function () {
  function Generator(nuxt, builder) {
    classCallCheck(this, Generator);

    this.nuxt = nuxt;
    this.options = nuxt.options;
    this.builder = builder;

    // Set variables
    this.staticRoutes = path.resolve(this.options.srcDir, this.options.dir.static);
    this.srcBuiltPath = path.resolve(this.options.buildDir, 'dist');
    this.distPath = path.resolve(this.options.rootDir, this.options.generate.dir);
    this.distNuxtPath = path.join(this.distPath, isUrl(this.options.build.publicPath) ? '' : this.options.build.publicPath);
  }

  createClass(Generator, [{
    key: 'generate',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$build = _ref2.build,
            build = _ref2$build === undefined ? true : _ref2$build,
            _ref2$init = _ref2.init,
            init = _ref2$init === undefined ? true : _ref2$init;

        var routes, errors;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _consola.debug('Initializing generator...');

                _context.next = 3;
                return this.initiate({ build: build, init: init });

              case 3:

                _consola.debug('Preparing routes for generate...');

                _context.next = 6;
                return this.initRoutes();

              case 6:
                routes = _context.sent;


                _consola.info({
                  message: 'Generating pages',
                  badge: true,
                  clear: true
                });

                _context.next = 10;
                return this.generateRoutes(routes);

              case 10:
                errors = _context.sent;
                _context.next = 13;
                return this.afterGenerate();

              case 13:
                _context.next = 15;
                return this.nuxt.callHook('generate:done', this, errors);

              case 15:
                return _context.abrupt('return', { errors: errors });

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function generate() {
        return _ref.apply(this, arguments);
      }

      return generate;
    }()
  }, {
    key: 'initiate',
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref4$build = _ref4.build,
            build = _ref4$build === undefined ? true : _ref4$build,
            _ref4$init = _ref4.init,
            init = _ref4$init === undefined ? true : _ref4$init;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.nuxt.ready();

              case 2:
                _context2.next = 4;
                return this.nuxt.callHook('generate:before', this, this.options.generate);

              case 4:
                if (!build) {
                  _context2.next = 8;
                  break;
                }

                // Add flag to set process.static
                this.builder.forGenerate();

                // Start build process
                _context2.next = 8;
                return this.builder.build();

              case 8:
                if (!init) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 11;
                return this.initDist();

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function initiate() {
        return _ref3.apply(this, arguments);
      }

      return initiate;
    }()
  }, {
    key: 'initRoutes',
    value: function () {
      var _ref5 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var generateRoutes,
            _len,
            args,
            _key,
            routes,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // Resolve config.generate.routes promises before generating the routes
                generateRoutes = [];

                if (!(this.options.router.mode !== 'hash')) {
                  _context3.next = 13;
                  break;
                }

                _context3.prev = 2;

                for (_len = _args3.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = _args3[_key];
                }

                _context3.next = 6;
                return promisifyRoute.apply(undefined, [this.options.generate.routes || []].concat(toConsumableArray(args)));

              case 6:
                generateRoutes = _context3.sent;
                _context3.next = 13;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](2);

                _consola.error('Could not resolve routes');
                throw _context3.t0;

              case 13:
                // Generate only index.html for router.mode = 'hash'
                routes = this.options.router.mode === 'hash' ? ['/'] : flatRoutes(this.options.router.routes);

                routes = this.decorateWithPayloads(routes, generateRoutes);

                // extendRoutes hook
                _context3.next = 17;
                return this.nuxt.callHook('generate:extendRoutes', routes);

              case 17:
                return _context3.abrupt('return', routes);

              case 18:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 9]]);
      }));

      function initRoutes() {
        return _ref5.apply(this, arguments);
      }

      return initRoutes;
    }()
  }, {
    key: 'generateRoutes',
    value: function () {
      var _ref6 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(routes) {
        var _this = this;

        var errors, _loop;

        return regeneratorRuntime.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                errors = [];

                // Start generate process

                _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {
                  var n;
                  return regeneratorRuntime.wrap(function _loop$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          n = 0;
                          _context5.next = 3;
                          return Promise.all(routes.splice(0, _this.options.generate.concurrency).map(function () {
                            var _ref8 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref7) {
                              var route = _ref7.route,
                                  payload = _ref7.payload;
                              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                while (1) {
                                  switch (_context4.prev = _context4.next) {
                                    case 0:
                                      _context4.next = 2;
                                      return waitFor(n++ * _this.options.generate.interval);

                                    case 2:
                                      _context4.next = 4;
                                      return _this.generateRoute({ route: route, payload: payload, errors: errors });

                                    case 4:
                                    case 'end':
                                      return _context4.stop();
                                  }
                                }
                              }, _callee4, _this);
                            }));

                            return function (_x4) {
                              return _ref8.apply(this, arguments);
                            };
                          }()));

                        case 3:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _loop, _this);
                });

              case 2:
                if (!routes.length) {
                  _context6.next = 6;
                  break;
                }

                return _context6.delegateYield(_loop(), 't0', 4);

              case 4:
                _context6.next = 2;
                break;

              case 6:

                // Improve string representation for errors
                errors.toString = function () {
                  return _this._formatErrors(errors);
                };

                return _context6.abrupt('return', errors);

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee5, this);
      }));

      function generateRoutes(_x3) {
        return _ref6.apply(this, arguments);
      }

      return generateRoutes;
    }()
  }, {
    key: '_formatErrors',
    value: function _formatErrors(errors) {
      return errors.map(function (_ref9) {
        var type = _ref9.type,
            route = _ref9.route,
            error = _ref9.error;

        var isHandled = type === 'handled';
        var bgColor = isHandled ? 'bgYellow' : 'bgRed';
        var color = isHandled ? 'yellow' : 'red';

        var line = chalk.black[bgColor](' GEN ERR ') + chalk[color](' ' + route + '\n\n');

        if (isHandled) {
          line += chalk.grey(JSON.stringify(error, undefined, 2) + '\n');
        } else {
          line += chalk.grey(error.stack);
        }

        return line;
      }).join('\n');
    }
  }, {
    key: 'afterGenerate',
    value: function () {
      var _ref10 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var fallback, fallbackPath, _ref11, html;

        return regeneratorRuntime.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                fallback = this.options.generate.fallback;

                // Disable SPA fallback if value isn't true or a string

                if (!(fallback !== true && typeof fallback !== 'string')) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt('return');

              case 3:
                fallbackPath = path.join(this.distPath, fallback);

                // Prevent conflicts

                if (!fsExtra.existsSync(fallbackPath)) {
                  _context7.next = 7;
                  break;
                }

                _consola.warn('SPA fallback was configured, but the configured path (' + fallbackPath + ') already exists.');
                return _context7.abrupt('return');

              case 7:
                _context7.next = 9;
                return this.nuxt.renderRoute('/', { spa: true });

              case 9:
                _ref11 = _context7.sent;
                html = _ref11.html;
                _context7.next = 13;
                return fsExtra.writeFile(fallbackPath, html, 'utf8');

              case 13:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee6, this);
      }));

      function afterGenerate() {
        return _ref10.apply(this, arguments);
      }

      return afterGenerate;
    }()
  }, {
    key: 'initDist',
    value: function () {
      var _ref12 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this2 = this;

        var nojekyllPath, extraFiles;
        return regeneratorRuntime.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return fsExtra.remove(this.distPath);

              case 2:
                _context8.next = 4;
                return this.nuxt.callHook('generate:distRemoved', this);

              case 4:
                if (!fsExtra.existsSync(this.staticRoutes)) {
                  _context8.next = 7;
                  break;
                }

                _context8.next = 7;
                return fsExtra.copy(this.staticRoutes, this.distPath);

              case 7:
                _context8.next = 9;
                return fsExtra.copy(this.srcBuiltPath, this.distNuxtPath);

              case 9:

                // Add .nojekyll file to let Github Pages add the _nuxt/ folder
                // https://help.github.com/articles/files-that-start-with-an-underscore-are-missing/
                nojekyllPath = path.resolve(this.distPath, '.nojekyll');

                fsExtra.writeFile(nojekyllPath, '');

                // Cleanup SSR related files
                extraFiles = ['index.spa.html', 'index.ssr.html', 'server-bundle.json', 'vue-ssr-client-manifest.json'].map(function (file) {
                  return path.resolve(_this2.distNuxtPath, file);
                });


                extraFiles.forEach(function (file) {
                  if (fsExtra.existsSync(file)) {
                    fsExtra.removeSync(file);
                  }
                });

                _context8.next = 15;
                return this.nuxt.callHook('generate:distCopied', this);

              case 15:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee7, this);
      }));

      function initDist() {
        return _ref12.apply(this, arguments);
      }

      return initDist;
    }()
  }, {
    key: 'decorateWithPayloads',
    value: function decorateWithPayloads(routes, generateRoutes) {
      var routeMap = {};
      // Fill routeMap for known routes
      routes.forEach(function (route) {
        routeMap[route] = {
          route: route,
          payload: null
        };
      });
      // Fill routeMap with given generate.routes
      generateRoutes.forEach(function (route) {
        // route is either a string or like { route : '/my_route/1', payload: {} }
        var path$$1 = _.isString(route) ? route : route.route;
        routeMap[path$$1] = {
          route: path$$1,
          payload: route.payload || null
        };
      });
      return _.values(routeMap);
    }
  }, {
    key: 'generateRoute',
    value: function () {
      var _ref14 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_ref13) {
        var route = _ref13.route,
            _ref13$payload = _ref13.payload,
            payload = _ref13$payload === undefined ? {} : _ref13$payload,
            _ref13$errors = _ref13.errors,
            errors = _ref13$errors === undefined ? [] : _ref13$errors;

        var html, pageErrors, res, minifyErr, _path, page;

        return regeneratorRuntime.wrap(function _callee8$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                html = void 0;
                pageErrors = [];
                _context9.prev = 2;
                _context9.next = 5;
                return this.nuxt.renderer.renderRoute(route, {
                  _generate: true,
                  payload: payload
                });

              case 5:
                res = _context9.sent;

                html = res.html;
                if (res.error) {
                  pageErrors.push({ type: 'handled', route: route, error: res.error });
                }
                _context9.next = 17;
                break;

              case 10:
                _context9.prev = 10;
                _context9.t0 = _context9['catch'](2);

                /* istanbul ignore next */
                pageErrors.push({ type: 'unhandled', route: route, error: _context9.t0 });
                Array.prototype.push.apply(errors, pageErrors);

                _context9.next = 16;
                return this.nuxt.callHook('generate:routeFailed', {
                  route: route,
                  errors: pageErrors
                });

              case 16:
                return _context9.abrupt('return', false);

              case 17:

                if (this.options.generate.minify) {
                  try {
                    html = htmlMinifier.minify(html, this.options.generate.minify);
                  } catch (err) /* istanbul ignore next */{
                    minifyErr = new Error('HTML minification failed. Make sure the route generates valid HTML. Failed HTML:\n ' + html);

                    pageErrors.push({ type: 'unhandled', route: route, error: minifyErr });
                  }
                }

                _path = void 0;


                if (this.options.generate.subFolders) {
                  _path = path.join(route, path.sep, 'index.html'); // /about -> /about/index.html
                  _path = _path === '/404/index.html' ? '/404.html' : _path; // /404 -> /404.html
                } else {
                  _path = route.length > 1 ? path.join(path.sep, route + '.html') : path.join(path.sep, 'index.html');
                }

                // Call hook to let user update the path & html
                page = { route: route, path: _path, html: html };
                _context9.next = 23;
                return this.nuxt.callHook('generate:page', page);

              case 23:

                page.path = path.join(this.distPath, page.path);

                // Make sure the sub folders are created
                _context9.next = 26;
                return fsExtra.mkdirp(path.dirname(page.path));

              case 26:
                _context9.next = 28;
                return fsExtra.writeFile(page.path, page.html, 'utf8');

              case 28:
                _context9.next = 30;
                return this.nuxt.callHook('generate:routeCreated', {
                  route: route,
                  path: page.path,
                  errors: pageErrors
                });

              case 30:

                if (pageErrors.length) {
                  _consola.error('Error generating ' + route);
                  Array.prototype.push.apply(errors, pageErrors);
                } else {
                  _consola.success('Generated ' + route);
                }

                return _context9.abrupt('return', true);

              case 32:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee8, this, [[2, 10]]);
      }));

      function generateRoute(_x5) {
        return _ref14.apply(this, arguments);
      }

      return generateRoute;
    }()
  }]);
  return Generator;
}();

var builder = {
  Builder: Builder,
  Generator: Generator
};

var nuxtLegacy = Object.assign({ Utils: Utils }, core, builder);

module.exports = nuxtLegacy;
//# sourceMappingURL=nuxt-legacy.js.map
