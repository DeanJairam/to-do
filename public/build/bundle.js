
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop$1() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop$1;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop$1,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop$1;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop$1) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
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
        function subscribe(run, invalidate = noop$1) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop$1;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop$1;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop$1;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    function startsWith(string, search) {
      return string.substr(0, search.length) === search;
    }

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
      return pick([route], uri);
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    function addQuery(pathname, query) {
      return pathname + (query ? `?${query}` : "");
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
      // /foo/bar, /baz/qux => /foo/bar
      if (startsWith(to, "/")) {
        return to;
      }

      const [toPathname, toQuery] = to.split("?");
      const [basePathname] = base.split("?");
      const toSegments = segmentize(toPathname);
      const baseSegments = segmentize(basePathname);

      // ?a=b, /users?b=c => /users?a=b
      if (toSegments[0] === "") {
        return addQuery(basePathname, toQuery);
      }

      // profile, /users/789 => /users/789/profile
      if (!startsWith(toSegments[0], ".")) {
        const pathname = baseSegments.concat(toSegments).join("/");

        return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
      }

      // ./       , /users/123 => /users/123
      // ../      , /users/123 => /users
      // ../..    , /users/123 => /
      // ../../one, /a/b/c/d   => /a/b/one
      // .././one , /a/b/c/d   => /a/b/c/one
      const allSegments = baseSegments.concat(toSegments);
      const segments = [];

      allSegments.forEach(segment => {
        if (segment === "..") {
          segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });

      return addQuery("/" + segments.join("/"), toQuery);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
      );
    }

    /* node_modules\svelte-routing\src\Router.svelte generated by Svelte v3.46.4 */

    function create_fragment$7(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $location;
    	let $routes;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, 'routes');
    	component_subscribe($$self, routes, value => $$invalidate(6, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(5, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(7, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ['basepath', 'url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		derived,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		pick,
    		match,
    		stripSlashes,
    		combinePaths,
    		basepath,
    		url,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$location,
    		$routes,
    		$base
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 128) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			{
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 96) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [
    		routes,
    		location,
    		base,
    		basepath,
    		url,
    		$location,
    		$routes,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-routing\src\Route.svelte generated by Svelte v3.46.4 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 4,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[2],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block$3(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$3, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block$1(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, routeParams, $location*/ 532)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[2],
    		/*routeProps*/ ctx[3]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 28)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
    					dirty & /*routeParams*/ 4 && get_spread_object(/*routeParams*/ ctx[2]),
    					dirty & /*routeProps*/ 8 && get_spread_object(/*routeProps*/ ctx[3])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(1, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway.
    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('path' in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		LOCATION,
    		path,
    		component,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('routeParams' in $$props) $$invalidate(2, routeParams = $$new_props.routeParams);
    		if ('routeProps' in $$props) $$invalidate(3, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 2) {
    			if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(2, routeParams = $activeRoute.params);
    			}
    		}

    		{
    			const { path, component, ...rest } = $$props;
    			$$invalidate(3, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		$activeRoute,
    		routeParams,
    		routeProps,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-routing\src\Link.svelte generated by Svelte v3.46.4 */
    const file$4 = "node_modules\\svelte-routing\\src\\Link.svelte";

    function create_fragment$5(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{ "aria-current": /*ariaCurrent*/ ctx[2] },
    		/*props*/ ctx[1],
    		/*$$restProps*/ ctx[6]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$4, 40, 0, 1249);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*onClick*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				(!current || dirty & /*ariaCurrent*/ 4) && { "aria-current": /*ariaCurrent*/ ctx[2] },
    				dirty & /*props*/ 2 && /*props*/ ctx[1],
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let ariaCurrent;
    	const omit_props_names = ["to","replace","state","getProps"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $location;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link', slots, ['default']);
    	let { to = "#" } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = () => ({}) } = $$props;
    	const { base } = getContext(ROUTER);
    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(14, $base = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(13, $location = value));
    	const dispatch = createEventDispatcher();
    	let href, isPartiallyCurrent, isCurrent, props;

    	function onClick(event) {
    		dispatch("click", event);

    		if (shouldNavigate(event)) {
    			event.preventDefault();

    			// Don't push another entry to the history stack when the user
    			// clicks on a Link to the page they are currently on.
    			const shouldReplace = $location.pathname === href || replace;

    			navigate(href, { state, replace: shouldReplace });
    		}
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('to' in $$new_props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$new_props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$new_props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$new_props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('$$scope' in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		createEventDispatcher,
    		ROUTER,
    		LOCATION,
    		navigate,
    		startsWith,
    		resolve,
    		shouldNavigate,
    		to,
    		replace,
    		state,
    		getProps,
    		base,
    		location,
    		dispatch,
    		href,
    		isPartiallyCurrent,
    		isCurrent,
    		props,
    		onClick,
    		ariaCurrent,
    		$location,
    		$base
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('to' in $$props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('isPartiallyCurrent' in $$props) $$invalidate(11, isPartiallyCurrent = $$new_props.isPartiallyCurrent);
    		if ('isCurrent' in $$props) $$invalidate(12, isCurrent = $$new_props.isCurrent);
    		if ('props' in $$props) $$invalidate(1, props = $$new_props.props);
    		if ('ariaCurrent' in $$props) $$invalidate(2, ariaCurrent = $$new_props.ariaCurrent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*to, $base*/ 16512) {
    			$$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
    		}

    		if ($$self.$$.dirty & /*$location, href*/ 8193) {
    			$$invalidate(11, isPartiallyCurrent = startsWith($location.pathname, href));
    		}

    		if ($$self.$$.dirty & /*href, $location*/ 8193) {
    			$$invalidate(12, isCurrent = href === $location.pathname);
    		}

    		if ($$self.$$.dirty & /*isCurrent*/ 4096) {
    			$$invalidate(2, ariaCurrent = isCurrent ? "page" : undefined);
    		}

    		if ($$self.$$.dirty & /*getProps, $location, href, isPartiallyCurrent, isCurrent*/ 15361) {
    			$$invalidate(1, props = getProps({
    				location: $location,
    				href,
    				isPartiallyCurrent,
    				isCurrent
    			}));
    		}
    	};

    	return [
    		href,
    		props,
    		ariaCurrent,
    		base,
    		location,
    		onClick,
    		$$restProps,
    		to,
    		replace,
    		state,
    		getProps,
    		isPartiallyCurrent,
    		isCurrent,
    		$location,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			to: 7,
    			replace: 8,
    			state: 9,
    			getProps: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get to() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set to(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProps() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getProps(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const stringToByteArray$1 = function (str) {
        // TODO(user): Use native implementations if/when available
        const out = [];
        let p = 0;
        for (let i = 0; i < str.length; i++) {
            let c = str.charCodeAt(i);
            if (c < 128) {
                out[p++] = c;
            }
            else if (c < 2048) {
                out[p++] = (c >> 6) | 192;
                out[p++] = (c & 63) | 128;
            }
            else if ((c & 0xfc00) === 0xd800 &&
                i + 1 < str.length &&
                (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
                // Surrogate Pair
                c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
                out[p++] = (c >> 18) | 240;
                out[p++] = ((c >> 12) & 63) | 128;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
            else {
                out[p++] = (c >> 12) | 224;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
        }
        return out;
    };
    /**
     * Turns an array of numbers into the string given by the concatenation of the
     * characters to which the numbers correspond.
     * @param bytes Array of numbers representing characters.
     * @return Stringification of the array.
     */
    const byteArrayToString = function (bytes) {
        // TODO(user): Use native implementations if/when available
        const out = [];
        let pos = 0, c = 0;
        while (pos < bytes.length) {
            const c1 = bytes[pos++];
            if (c1 < 128) {
                out[c++] = String.fromCharCode(c1);
            }
            else if (c1 > 191 && c1 < 224) {
                const c2 = bytes[pos++];
                out[c++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            }
            else if (c1 > 239 && c1 < 365) {
                // Surrogate Pair
                const c2 = bytes[pos++];
                const c3 = bytes[pos++];
                const c4 = bytes[pos++];
                const u = (((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)) -
                    0x10000;
                out[c++] = String.fromCharCode(0xd800 + (u >> 10));
                out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
            }
            else {
                const c2 = bytes[pos++];
                const c3 = bytes[pos++];
                out[c++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            }
        }
        return out.join('');
    };
    // We define it as an object literal instead of a class because a class compiled down to es5 can't
    // be treeshaked. https://github.com/rollup/rollup/issues/1691
    // Static lookup maps, lazily populated by init_()
    const base64 = {
        /**
         * Maps bytes to characters.
         */
        byteToCharMap_: null,
        /**
         * Maps characters to bytes.
         */
        charToByteMap_: null,
        /**
         * Maps bytes to websafe characters.
         * @private
         */
        byteToCharMapWebSafe_: null,
        /**
         * Maps websafe characters to bytes.
         * @private
         */
        charToByteMapWebSafe_: null,
        /**
         * Our default alphabet, shared between
         * ENCODED_VALS and ENCODED_VALS_WEBSAFE
         */
        ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',
        /**
         * Our default alphabet. Value 64 (=) is special; it means "nothing."
         */
        get ENCODED_VALS() {
            return this.ENCODED_VALS_BASE + '+/=';
        },
        /**
         * Our websafe alphabet.
         */
        get ENCODED_VALS_WEBSAFE() {
            return this.ENCODED_VALS_BASE + '-_.';
        },
        /**
         * Whether this browser supports the atob and btoa functions. This extension
         * started at Mozilla but is now implemented by many browsers. We use the
         * ASSUME_* variables to avoid pulling in the full useragent detection library
         * but still allowing the standard per-browser compilations.
         *
         */
        HAS_NATIVE_SUPPORT: typeof atob === 'function',
        /**
         * Base64-encode an array of bytes.
         *
         * @param input An array of bytes (numbers with
         *     value in [0, 255]) to encode.
         * @param webSafe Boolean indicating we should use the
         *     alternative alphabet.
         * @return The base64 encoded string.
         */
        encodeByteArray(input, webSafe) {
            if (!Array.isArray(input)) {
                throw Error('encodeByteArray takes an array as a parameter');
            }
            this.init_();
            const byteToCharMap = webSafe
                ? this.byteToCharMapWebSafe_
                : this.byteToCharMap_;
            const output = [];
            for (let i = 0; i < input.length; i += 3) {
                const byte1 = input[i];
                const haveByte2 = i + 1 < input.length;
                const byte2 = haveByte2 ? input[i + 1] : 0;
                const haveByte3 = i + 2 < input.length;
                const byte3 = haveByte3 ? input[i + 2] : 0;
                const outByte1 = byte1 >> 2;
                const outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
                let outByte3 = ((byte2 & 0x0f) << 2) | (byte3 >> 6);
                let outByte4 = byte3 & 0x3f;
                if (!haveByte3) {
                    outByte4 = 64;
                    if (!haveByte2) {
                        outByte3 = 64;
                    }
                }
                output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
            }
            return output.join('');
        },
        /**
         * Base64-encode a string.
         *
         * @param input A string to encode.
         * @param webSafe If true, we should use the
         *     alternative alphabet.
         * @return The base64 encoded string.
         */
        encodeString(input, webSafe) {
            // Shortcut for Mozilla browsers that implement
            // a native base64 encoder in the form of "btoa/atob"
            if (this.HAS_NATIVE_SUPPORT && !webSafe) {
                return btoa(input);
            }
            return this.encodeByteArray(stringToByteArray$1(input), webSafe);
        },
        /**
         * Base64-decode a string.
         *
         * @param input to decode.
         * @param webSafe True if we should use the
         *     alternative alphabet.
         * @return string representing the decoded value.
         */
        decodeString(input, webSafe) {
            // Shortcut for Mozilla browsers that implement
            // a native base64 encoder in the form of "btoa/atob"
            if (this.HAS_NATIVE_SUPPORT && !webSafe) {
                return atob(input);
            }
            return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
        },
        /**
         * Base64-decode a string.
         *
         * In base-64 decoding, groups of four characters are converted into three
         * bytes.  If the encoder did not apply padding, the input length may not
         * be a multiple of 4.
         *
         * In this case, the last group will have fewer than 4 characters, and
         * padding will be inferred.  If the group has one or two characters, it decodes
         * to one byte.  If the group has three characters, it decodes to two bytes.
         *
         * @param input Input to decode.
         * @param webSafe True if we should use the web-safe alphabet.
         * @return bytes representing the decoded value.
         */
        decodeStringToByteArray(input, webSafe) {
            this.init_();
            const charToByteMap = webSafe
                ? this.charToByteMapWebSafe_
                : this.charToByteMap_;
            const output = [];
            for (let i = 0; i < input.length;) {
                const byte1 = charToByteMap[input.charAt(i++)];
                const haveByte2 = i < input.length;
                const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
                ++i;
                const haveByte3 = i < input.length;
                const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
                ++i;
                const haveByte4 = i < input.length;
                const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
                ++i;
                if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
                    throw Error();
                }
                const outByte1 = (byte1 << 2) | (byte2 >> 4);
                output.push(outByte1);
                if (byte3 !== 64) {
                    const outByte2 = ((byte2 << 4) & 0xf0) | (byte3 >> 2);
                    output.push(outByte2);
                    if (byte4 !== 64) {
                        const outByte3 = ((byte3 << 6) & 0xc0) | byte4;
                        output.push(outByte3);
                    }
                }
            }
            return output;
        },
        /**
         * Lazy static initialization function. Called before
         * accessing any of the static map variables.
         * @private
         */
        init_() {
            if (!this.byteToCharMap_) {
                this.byteToCharMap_ = {};
                this.charToByteMap_ = {};
                this.byteToCharMapWebSafe_ = {};
                this.charToByteMapWebSafe_ = {};
                // We want quick mappings back and forth, so we precompute two maps.
                for (let i = 0; i < this.ENCODED_VALS.length; i++) {
                    this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
                    this.charToByteMap_[this.byteToCharMap_[i]] = i;
                    this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
                    this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
                    // Be forgiving when decoding and correctly decode both encodings.
                    if (i >= this.ENCODED_VALS_BASE.length) {
                        this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
                        this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
                    }
                }
            }
        }
    };
    /**
     * URL-safe base64 decoding
     *
     * NOTE: DO NOT use the global atob() function - it does NOT support the
     * base64Url variant encoding.
     *
     * @param str To be decoded
     * @return Decoded result, if possible
     */
    const base64Decode = function (str) {
        try {
            return base64.decodeString(str, true);
        }
        catch (e) {
            console.error('base64Decode failed: ', e);
        }
        return null;
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class Deferred {
        constructor() {
            this.reject = () => { };
            this.resolve = () => { };
            this.promise = new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        }
        /**
         * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
         * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
         * and returns a node-style callback which will resolve or reject the Deferred's promise.
         */
        wrapCallback(callback) {
            return (error, value) => {
                if (error) {
                    this.reject(error);
                }
                else {
                    this.resolve(value);
                }
                if (typeof callback === 'function') {
                    // Attaching noop handler just in case developer wasn't expecting
                    // promises
                    this.promise.catch(() => { });
                    // Some of our callbacks don't expect a value and our own tests
                    // assert that the parameter length is 1
                    if (callback.length === 1) {
                        callback(error);
                    }
                    else {
                        callback(error, value);
                    }
                }
            };
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns navigator.userAgent string or '' if it's not defined.
     * @return user agent string
     */
    function getUA() {
        if (typeof navigator !== 'undefined' &&
            typeof navigator['userAgent'] === 'string') {
            return navigator['userAgent'];
        }
        else {
            return '';
        }
    }
    /**
     * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
     *
     * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
     * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
     * wait for a callback.
     */
    function isMobileCordova() {
        return (typeof window !== 'undefined' &&
            // @ts-ignore Setting up an broadly applicable index signature for Window
            // just to deal with this case would probably be a bad idea.
            !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) &&
            /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA()));
    }
    function isBrowserExtension() {
        const runtime = typeof chrome === 'object'
            ? chrome.runtime
            : typeof browser === 'object'
                ? browser.runtime
                : undefined;
        return typeof runtime === 'object' && runtime.id !== undefined;
    }
    /**
     * Detect React Native.
     *
     * @return true if ReactNative environment is detected.
     */
    function isReactNative() {
        return (typeof navigator === 'object' && navigator['product'] === 'ReactNative');
    }
    /** Detects Electron apps. */
    function isElectron() {
        return getUA().indexOf('Electron/') >= 0;
    }
    /** Detects Internet Explorer. */
    function isIE() {
        const ua = getUA();
        return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
    }
    /** Detects Universal Windows Platform apps. */
    function isUWP() {
        return getUA().indexOf('MSAppHost/') >= 0;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @fileoverview Standardized Firebase Error.
     *
     * Usage:
     *
     *   // Typescript string literals for type-safe codes
     *   type Err =
     *     'unknown' |
     *     'object-not-found'
     *     ;
     *
     *   // Closure enum for type-safe error codes
     *   // at-enum {string}
     *   var Err = {
     *     UNKNOWN: 'unknown',
     *     OBJECT_NOT_FOUND: 'object-not-found',
     *   }
     *
     *   let errors: Map<Err, string> = {
     *     'generic-error': "Unknown error",
     *     'file-not-found': "Could not find file: {$file}",
     *   };
     *
     *   // Type-safe function - must pass a valid error code as param.
     *   let error = new ErrorFactory<Err>('service', 'Service', errors);
     *
     *   ...
     *   throw error.create(Err.GENERIC);
     *   ...
     *   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
     *   ...
     *   // Service: Could not file file: foo.txt (service/file-not-found).
     *
     *   catch (e) {
     *     assert(e.message === "Could not find file: foo.txt.");
     *     if (e.code === 'service/file-not-found') {
     *       console.log("Could not read file: " + e['file']);
     *     }
     *   }
     */
    const ERROR_NAME = 'FirebaseError';
    // Based on code from:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
    class FirebaseError extends Error {
        constructor(
        /** The error code for this error. */
        code, message, 
        /** Custom data for this error. */
        customData) {
            super(message);
            this.code = code;
            this.customData = customData;
            /** The custom name for all FirebaseErrors. */
            this.name = ERROR_NAME;
            // Fix For ES5
            // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
            Object.setPrototypeOf(this, FirebaseError.prototype);
            // Maintains proper stack trace for where our error was thrown.
            // Only available on V8.
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, ErrorFactory.prototype.create);
            }
        }
    }
    class ErrorFactory {
        constructor(service, serviceName, errors) {
            this.service = service;
            this.serviceName = serviceName;
            this.errors = errors;
        }
        create(code, ...data) {
            const customData = data[0] || {};
            const fullCode = `${this.service}/${code}`;
            const template = this.errors[code];
            const message = template ? replaceTemplate(template, customData) : 'Error';
            // Service Name: Error message (service/code).
            const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
            const error = new FirebaseError(fullCode, fullMessage, customData);
            return error;
        }
    }
    function replaceTemplate(template, data) {
        return template.replace(PATTERN, (_, key) => {
            const value = data[key];
            return value != null ? String(value) : `<${key}?>`;
        });
    }
    const PATTERN = /\{\$([^}]+)}/g;
    function isEmpty(obj) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Deep equal two objects. Support Arrays and Objects.
     */
    function deepEqual(a, b) {
        if (a === b) {
            return true;
        }
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        for (const k of aKeys) {
            if (!bKeys.includes(k)) {
                return false;
            }
            const aProp = a[k];
            const bProp = b[k];
            if (isObject(aProp) && isObject(bProp)) {
                if (!deepEqual(aProp, bProp)) {
                    return false;
                }
            }
            else if (aProp !== bProp) {
                return false;
            }
        }
        for (const k of bKeys) {
            if (!aKeys.includes(k)) {
                return false;
            }
        }
        return true;
    }
    function isObject(thing) {
        return thing !== null && typeof thing === 'object';
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
     * params object (e.g. {arg: 'val', arg2: 'val2'})
     * Note: You must prepend it with ? when adding it to a URL.
     */
    function querystring(querystringParams) {
        const params = [];
        for (const [key, value] of Object.entries(querystringParams)) {
            if (Array.isArray(value)) {
                value.forEach(arrayVal => {
                    params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
                });
            }
            else {
                params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            }
        }
        return params.length ? '&' + params.join('&') : '';
    }

    /**
     * Helper to make a Subscribe function (just like Promise helps make a
     * Thenable).
     *
     * @param executor Function which can make calls to a single Observer
     *     as a proxy.
     * @param onNoObservers Callback when count of Observers goes to zero.
     */
    function createSubscribe(executor, onNoObservers) {
        const proxy = new ObserverProxy(executor, onNoObservers);
        return proxy.subscribe.bind(proxy);
    }
    /**
     * Implement fan-out for any number of Observers attached via a subscribe
     * function.
     */
    class ObserverProxy {
        /**
         * @param executor Function which can make calls to a single Observer
         *     as a proxy.
         * @param onNoObservers Callback when count of Observers goes to zero.
         */
        constructor(executor, onNoObservers) {
            this.observers = [];
            this.unsubscribes = [];
            this.observerCount = 0;
            // Micro-task scheduling by calling task.then().
            this.task = Promise.resolve();
            this.finalized = false;
            this.onNoObservers = onNoObservers;
            // Call the executor asynchronously so subscribers that are called
            // synchronously after the creation of the subscribe function
            // can still receive the very first value generated in the executor.
            this.task
                .then(() => {
                executor(this);
            })
                .catch(e => {
                this.error(e);
            });
        }
        next(value) {
            this.forEachObserver((observer) => {
                observer.next(value);
            });
        }
        error(error) {
            this.forEachObserver((observer) => {
                observer.error(error);
            });
            this.close(error);
        }
        complete() {
            this.forEachObserver((observer) => {
                observer.complete();
            });
            this.close();
        }
        /**
         * Subscribe function that can be used to add an Observer to the fan-out list.
         *
         * - We require that no event is sent to a subscriber sychronously to their
         *   call to subscribe().
         */
        subscribe(nextOrObserver, error, complete) {
            let observer;
            if (nextOrObserver === undefined &&
                error === undefined &&
                complete === undefined) {
                throw new Error('Missing Observer.');
            }
            // Assemble an Observer object when passed as callback functions.
            if (implementsAnyMethods(nextOrObserver, [
                'next',
                'error',
                'complete'
            ])) {
                observer = nextOrObserver;
            }
            else {
                observer = {
                    next: nextOrObserver,
                    error,
                    complete
                };
            }
            if (observer.next === undefined) {
                observer.next = noop;
            }
            if (observer.error === undefined) {
                observer.error = noop;
            }
            if (observer.complete === undefined) {
                observer.complete = noop;
            }
            const unsub = this.unsubscribeOne.bind(this, this.observers.length);
            // Attempt to subscribe to a terminated Observable - we
            // just respond to the Observer with the final error or complete
            // event.
            if (this.finalized) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                this.task.then(() => {
                    try {
                        if (this.finalError) {
                            observer.error(this.finalError);
                        }
                        else {
                            observer.complete();
                        }
                    }
                    catch (e) {
                        // nothing
                    }
                    return;
                });
            }
            this.observers.push(observer);
            return unsub;
        }
        // Unsubscribe is synchronous - we guarantee that no events are sent to
        // any unsubscribed Observer.
        unsubscribeOne(i) {
            if (this.observers === undefined || this.observers[i] === undefined) {
                return;
            }
            delete this.observers[i];
            this.observerCount -= 1;
            if (this.observerCount === 0 && this.onNoObservers !== undefined) {
                this.onNoObservers(this);
            }
        }
        forEachObserver(fn) {
            if (this.finalized) {
                // Already closed by previous event....just eat the additional values.
                return;
            }
            // Since sendOne calls asynchronously - there is no chance that
            // this.observers will become undefined.
            for (let i = 0; i < this.observers.length; i++) {
                this.sendOne(i, fn);
            }
        }
        // Call the Observer via one of it's callback function. We are careful to
        // confirm that the observe has not been unsubscribed since this asynchronous
        // function had been queued.
        sendOne(i, fn) {
            // Execute the callback asynchronously
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.task.then(() => {
                if (this.observers !== undefined && this.observers[i] !== undefined) {
                    try {
                        fn(this.observers[i]);
                    }
                    catch (e) {
                        // Ignore exceptions raised in Observers or missing methods of an
                        // Observer.
                        // Log error to console. b/31404806
                        if (typeof console !== 'undefined' && console.error) {
                            console.error(e);
                        }
                    }
                }
            });
        }
        close(err) {
            if (this.finalized) {
                return;
            }
            this.finalized = true;
            if (err !== undefined) {
                this.finalError = err;
            }
            // Proxy is no longer needed - garbage collect references
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.task.then(() => {
                this.observers = undefined;
                this.onNoObservers = undefined;
            });
        }
    }
    /**
     * Return true if the object passed in implements any of the named methods.
     */
    function implementsAnyMethods(obj, methods) {
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }
        for (const method of methods) {
            if (method in obj && typeof obj[method] === 'function') {
                return true;
            }
        }
        return false;
    }
    function noop() {
        // do nothing
    }

    /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function getModularInstance(service) {
        if (service && service._delegate) {
            return service._delegate;
        }
        else {
            return service;
        }
    }

    /**
     * Component for service name T, e.g. `auth`, `auth-internal`
     */
    class Component {
        /**
         *
         * @param name The public service name, e.g. app, auth, firestore, database
         * @param instanceFactory Service factory responsible for creating the public interface
         * @param type whether the service provided by the component is public or private
         */
        constructor(name, instanceFactory, type) {
            this.name = name;
            this.instanceFactory = instanceFactory;
            this.type = type;
            this.multipleInstances = false;
            /**
             * Properties to be added to the service namespace
             */
            this.serviceProps = {};
            this.instantiationMode = "LAZY" /* LAZY */;
            this.onInstanceCreated = null;
        }
        setInstantiationMode(mode) {
            this.instantiationMode = mode;
            return this;
        }
        setMultipleInstances(multipleInstances) {
            this.multipleInstances = multipleInstances;
            return this;
        }
        setServiceProps(props) {
            this.serviceProps = props;
            return this;
        }
        setInstanceCreatedCallback(callback) {
            this.onInstanceCreated = callback;
            return this;
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const DEFAULT_ENTRY_NAME$1 = '[DEFAULT]';

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
     * NameServiceMapping[T] is an alias for the type of the instance
     */
    class Provider {
        constructor(name, container) {
            this.name = name;
            this.container = container;
            this.component = null;
            this.instances = new Map();
            this.instancesDeferred = new Map();
            this.instancesOptions = new Map();
            this.onInitCallbacks = new Map();
        }
        /**
         * @param identifier A provider can provide mulitple instances of a service
         * if this.component.multipleInstances is true.
         */
        get(identifier) {
            // if multipleInstances is not supported, use the default name
            const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
            if (!this.instancesDeferred.has(normalizedIdentifier)) {
                const deferred = new Deferred();
                this.instancesDeferred.set(normalizedIdentifier, deferred);
                if (this.isInitialized(normalizedIdentifier) ||
                    this.shouldAutoInitialize()) {
                    // initialize the service if it can be auto-initialized
                    try {
                        const instance = this.getOrInitializeService({
                            instanceIdentifier: normalizedIdentifier
                        });
                        if (instance) {
                            deferred.resolve(instance);
                        }
                    }
                    catch (e) {
                        // when the instance factory throws an exception during get(), it should not cause
                        // a fatal error. We just return the unresolved promise in this case.
                    }
                }
            }
            return this.instancesDeferred.get(normalizedIdentifier).promise;
        }
        getImmediate(options) {
            var _a;
            // if multipleInstances is not supported, use the default name
            const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
            const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;
            if (this.isInitialized(normalizedIdentifier) ||
                this.shouldAutoInitialize()) {
                try {
                    return this.getOrInitializeService({
                        instanceIdentifier: normalizedIdentifier
                    });
                }
                catch (e) {
                    if (optional) {
                        return null;
                    }
                    else {
                        throw e;
                    }
                }
            }
            else {
                // In case a component is not initialized and should/can not be auto-initialized at the moment, return null if the optional flag is set, or throw
                if (optional) {
                    return null;
                }
                else {
                    throw Error(`Service ${this.name} is not available`);
                }
            }
        }
        getComponent() {
            return this.component;
        }
        setComponent(component) {
            if (component.name !== this.name) {
                throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
            }
            if (this.component) {
                throw Error(`Component for ${this.name} has already been provided`);
            }
            this.component = component;
            // return early without attempting to initialize the component if the component requires explicit initialization (calling `Provider.initialize()`)
            if (!this.shouldAutoInitialize()) {
                return;
            }
            // if the service is eager, initialize the default instance
            if (isComponentEager(component)) {
                try {
                    this.getOrInitializeService({ instanceIdentifier: DEFAULT_ENTRY_NAME$1 });
                }
                catch (e) {
                    // when the instance factory for an eager Component throws an exception during the eager
                    // initialization, it should not cause a fatal error.
                    // TODO: Investigate if we need to make it configurable, because some component may want to cause
                    // a fatal error in this case?
                }
            }
            // Create service instances for the pending promises and resolve them
            // NOTE: if this.multipleInstances is false, only the default instance will be created
            // and all promises with resolve with it regardless of the identifier.
            for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
                const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
                try {
                    // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
                    const instance = this.getOrInitializeService({
                        instanceIdentifier: normalizedIdentifier
                    });
                    instanceDeferred.resolve(instance);
                }
                catch (e) {
                    // when the instance factory throws an exception, it should not cause
                    // a fatal error. We just leave the promise unresolved.
                }
            }
        }
        clearInstance(identifier = DEFAULT_ENTRY_NAME$1) {
            this.instancesDeferred.delete(identifier);
            this.instancesOptions.delete(identifier);
            this.instances.delete(identifier);
        }
        // app.delete() will call this method on every provider to delete the services
        // TODO: should we mark the provider as deleted?
        async delete() {
            const services = Array.from(this.instances.values());
            await Promise.all([
                ...services
                    .filter(service => 'INTERNAL' in service) // legacy services
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map(service => service.INTERNAL.delete()),
                ...services
                    .filter(service => '_delete' in service) // modularized services
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map(service => service._delete())
            ]);
        }
        isComponentSet() {
            return this.component != null;
        }
        isInitialized(identifier = DEFAULT_ENTRY_NAME$1) {
            return this.instances.has(identifier);
        }
        getOptions(identifier = DEFAULT_ENTRY_NAME$1) {
            return this.instancesOptions.get(identifier) || {};
        }
        initialize(opts = {}) {
            const { options = {} } = opts;
            const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
            if (this.isInitialized(normalizedIdentifier)) {
                throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
            }
            if (!this.isComponentSet()) {
                throw Error(`Component ${this.name} has not been registered yet`);
            }
            const instance = this.getOrInitializeService({
                instanceIdentifier: normalizedIdentifier,
                options
            });
            // resolve any pending promise waiting for the service instance
            for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
                const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
                if (normalizedIdentifier === normalizedDeferredIdentifier) {
                    instanceDeferred.resolve(instance);
                }
            }
            return instance;
        }
        /**
         *
         * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
         * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
         *
         * @param identifier An optional instance identifier
         * @returns a function to unregister the callback
         */
        onInit(callback, identifier) {
            var _a;
            const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
            const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : new Set();
            existingCallbacks.add(callback);
            this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
            const existingInstance = this.instances.get(normalizedIdentifier);
            if (existingInstance) {
                callback(existingInstance, normalizedIdentifier);
            }
            return () => {
                existingCallbacks.delete(callback);
            };
        }
        /**
         * Invoke onInit callbacks synchronously
         * @param instance the service instance`
         */
        invokeOnInitCallbacks(instance, identifier) {
            const callbacks = this.onInitCallbacks.get(identifier);
            if (!callbacks) {
                return;
            }
            for (const callback of callbacks) {
                try {
                    callback(instance, identifier);
                }
                catch (_a) {
                    // ignore errors in the onInit callback
                }
            }
        }
        getOrInitializeService({ instanceIdentifier, options = {} }) {
            let instance = this.instances.get(instanceIdentifier);
            if (!instance && this.component) {
                instance = this.component.instanceFactory(this.container, {
                    instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
                    options
                });
                this.instances.set(instanceIdentifier, instance);
                this.instancesOptions.set(instanceIdentifier, options);
                /**
                 * Invoke onInit listeners.
                 * Note this.component.onInstanceCreated is different, which is used by the component creator,
                 * while onInit listeners are registered by consumers of the provider.
                 */
                this.invokeOnInitCallbacks(instance, instanceIdentifier);
                /**
                 * Order is important
                 * onInstanceCreated() should be called after this.instances.set(instanceIdentifier, instance); which
                 * makes `isInitialized()` return true.
                 */
                if (this.component.onInstanceCreated) {
                    try {
                        this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
                    }
                    catch (_a) {
                        // ignore errors in the onInstanceCreatedCallback
                    }
                }
            }
            return instance || null;
        }
        normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME$1) {
            if (this.component) {
                return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME$1;
            }
            else {
                return identifier; // assume multiple instances are supported before the component is provided.
            }
        }
        shouldAutoInitialize() {
            return (!!this.component &&
                this.component.instantiationMode !== "EXPLICIT" /* EXPLICIT */);
        }
    }
    // undefined should be passed to the service factory for the default instance
    function normalizeIdentifierForFactory(identifier) {
        return identifier === DEFAULT_ENTRY_NAME$1 ? undefined : identifier;
    }
    function isComponentEager(component) {
        return component.instantiationMode === "EAGER" /* EAGER */;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
     */
    class ComponentContainer {
        constructor(name) {
            this.name = name;
            this.providers = new Map();
        }
        /**
         *
         * @param component Component being added
         * @param overwrite When a component with the same name has already been registered,
         * if overwrite is true: overwrite the existing component with the new component and create a new
         * provider with the new component. It can be useful in tests where you want to use different mocks
         * for different tests.
         * if overwrite is false: throw an exception
         */
        addComponent(component) {
            const provider = this.getProvider(component.name);
            if (provider.isComponentSet()) {
                throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
            }
            provider.setComponent(component);
        }
        addOrOverwriteComponent(component) {
            const provider = this.getProvider(component.name);
            if (provider.isComponentSet()) {
                // delete the existing provider from the container, so we can register the new component
                this.providers.delete(component.name);
            }
            this.addComponent(component);
        }
        /**
         * getProvider provides a type safe interface where it can only be called with a field name
         * present in NameServiceMapping interface.
         *
         * Firebase SDKs providing services should extend NameServiceMapping interface to register
         * themselves.
         */
        getProvider(name) {
            if (this.providers.has(name)) {
                return this.providers.get(name);
            }
            // create a Provider for a service that hasn't registered with Firebase
            const provider = new Provider(name, this);
            this.providers.set(name, provider);
            return provider;
        }
        getProviders() {
            return Array.from(this.providers.values());
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The JS SDK supports 5 log levels and also allows a user the ability to
     * silence the logs altogether.
     *
     * The order is a follows:
     * DEBUG < VERBOSE < INFO < WARN < ERROR
     *
     * All of the log types above the current log level will be captured (i.e. if
     * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
     * `VERBOSE` logs will not)
     */
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
        LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
        LogLevel[LogLevel["INFO"] = 2] = "INFO";
        LogLevel[LogLevel["WARN"] = 3] = "WARN";
        LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
        LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
    })(LogLevel || (LogLevel = {}));
    const levelStringToEnum = {
        'debug': LogLevel.DEBUG,
        'verbose': LogLevel.VERBOSE,
        'info': LogLevel.INFO,
        'warn': LogLevel.WARN,
        'error': LogLevel.ERROR,
        'silent': LogLevel.SILENT
    };
    /**
     * The default log level
     */
    const defaultLogLevel = LogLevel.INFO;
    /**
     * By default, `console.debug` is not displayed in the developer console (in
     * chrome). To avoid forcing users to have to opt-in to these logs twice
     * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
     * logs to the `console.log` function.
     */
    const ConsoleMethod = {
        [LogLevel.DEBUG]: 'log',
        [LogLevel.VERBOSE]: 'log',
        [LogLevel.INFO]: 'info',
        [LogLevel.WARN]: 'warn',
        [LogLevel.ERROR]: 'error'
    };
    /**
     * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
     * messages on to their corresponding console counterparts (if the log method
     * is supported by the current log level)
     */
    const defaultLogHandler = (instance, logType, ...args) => {
        if (logType < instance.logLevel) {
            return;
        }
        const now = new Date().toISOString();
        const method = ConsoleMethod[logType];
        if (method) {
            console[method](`[${now}]  ${instance.name}:`, ...args);
        }
        else {
            throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
        }
    };
    class Logger {
        /**
         * Gives you an instance of a Logger to capture messages according to
         * Firebase's logging scheme.
         *
         * @param name The name that the logs will be associated with
         */
        constructor(name) {
            this.name = name;
            /**
             * The log level of the given Logger instance.
             */
            this._logLevel = defaultLogLevel;
            /**
             * The main (internal) log handler for the Logger instance.
             * Can be set to a new function in internal package code but not by user.
             */
            this._logHandler = defaultLogHandler;
            /**
             * The optional, additional, user-defined log handler for the Logger instance.
             */
            this._userLogHandler = null;
        }
        get logLevel() {
            return this._logLevel;
        }
        set logLevel(val) {
            if (!(val in LogLevel)) {
                throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
            }
            this._logLevel = val;
        }
        // Workaround for setter/getter having to be the same type.
        setLogLevel(val) {
            this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
        }
        get logHandler() {
            return this._logHandler;
        }
        set logHandler(val) {
            if (typeof val !== 'function') {
                throw new TypeError('Value assigned to `logHandler` must be a function');
            }
            this._logHandler = val;
        }
        get userLogHandler() {
            return this._userLogHandler;
        }
        set userLogHandler(val) {
            this._userLogHandler = val;
        }
        /**
         * The functions below are all based on the `console` interface
         */
        debug(...args) {
            this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
            this._logHandler(this, LogLevel.DEBUG, ...args);
        }
        log(...args) {
            this._userLogHandler &&
                this._userLogHandler(this, LogLevel.VERBOSE, ...args);
            this._logHandler(this, LogLevel.VERBOSE, ...args);
        }
        info(...args) {
            this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
            this._logHandler(this, LogLevel.INFO, ...args);
        }
        warn(...args) {
            this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
            this._logHandler(this, LogLevel.WARN, ...args);
        }
        error(...args) {
            this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
            this._logHandler(this, LogLevel.ERROR, ...args);
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class PlatformLoggerServiceImpl {
        constructor(container) {
            this.container = container;
        }
        // In initial implementation, this will be called by installations on
        // auth token refresh, and installations will send this string.
        getPlatformInfoString() {
            const providers = this.container.getProviders();
            // Loop through providers and get library/version pairs from any that are
            // version components.
            return providers
                .map(provider => {
                if (isVersionServiceProvider(provider)) {
                    const service = provider.getImmediate();
                    return `${service.library}/${service.version}`;
                }
                else {
                    return null;
                }
            })
                .filter(logString => logString)
                .join(' ');
        }
    }
    /**
     *
     * @param provider check if this provider provides a VersionService
     *
     * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
     * provides VersionService. The provider is not necessarily a 'app-version'
     * provider.
     */
    function isVersionServiceProvider(provider) {
        const component = provider.getComponent();
        return (component === null || component === void 0 ? void 0 : component.type) === "VERSION" /* VERSION */;
    }

    const name$o = "@firebase/app";
    const version$1$1 = "0.7.17";

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const logger = new Logger('@firebase/app');

    const name$n = "@firebase/app-compat";

    const name$m = "@firebase/analytics-compat";

    const name$l = "@firebase/analytics";

    const name$k = "@firebase/app-check-compat";

    const name$j = "@firebase/app-check";

    const name$i = "@firebase/auth";

    const name$h = "@firebase/auth-compat";

    const name$g = "@firebase/database";

    const name$f = "@firebase/database-compat";

    const name$e = "@firebase/functions";

    const name$d = "@firebase/functions-compat";

    const name$c = "@firebase/installations";

    const name$b = "@firebase/installations-compat";

    const name$a = "@firebase/messaging";

    const name$9 = "@firebase/messaging-compat";

    const name$8 = "@firebase/performance";

    const name$7 = "@firebase/performance-compat";

    const name$6 = "@firebase/remote-config";

    const name$5 = "@firebase/remote-config-compat";

    const name$4 = "@firebase/storage";

    const name$3 = "@firebase/storage-compat";

    const name$2 = "@firebase/firestore";

    const name$1$1 = "@firebase/firestore-compat";

    const name$p = "firebase";
    const version$2 = "9.6.7";

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The default app name
     *
     * @internal
     */
    const DEFAULT_ENTRY_NAME = '[DEFAULT]';
    const PLATFORM_LOG_STRING = {
        [name$o]: 'fire-core',
        [name$n]: 'fire-core-compat',
        [name$l]: 'fire-analytics',
        [name$m]: 'fire-analytics-compat',
        [name$j]: 'fire-app-check',
        [name$k]: 'fire-app-check-compat',
        [name$i]: 'fire-auth',
        [name$h]: 'fire-auth-compat',
        [name$g]: 'fire-rtdb',
        [name$f]: 'fire-rtdb-compat',
        [name$e]: 'fire-fn',
        [name$d]: 'fire-fn-compat',
        [name$c]: 'fire-iid',
        [name$b]: 'fire-iid-compat',
        [name$a]: 'fire-fcm',
        [name$9]: 'fire-fcm-compat',
        [name$8]: 'fire-perf',
        [name$7]: 'fire-perf-compat',
        [name$6]: 'fire-rc',
        [name$5]: 'fire-rc-compat',
        [name$4]: 'fire-gcs',
        [name$3]: 'fire-gcs-compat',
        [name$2]: 'fire-fst',
        [name$1$1]: 'fire-fst-compat',
        'fire-js': 'fire-js',
        [name$p]: 'fire-js-all'
    };

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @internal
     */
    const _apps = new Map();
    /**
     * Registered components.
     *
     * @internal
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _components = new Map();
    /**
     * @param component - the component being added to this app's container
     *
     * @internal
     */
    function _addComponent(app, component) {
        try {
            app.container.addComponent(component);
        }
        catch (e) {
            logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
        }
    }
    /**
     *
     * @param component - the component to register
     * @returns whether or not the component is registered successfully
     *
     * @internal
     */
    function _registerComponent(component) {
        const componentName = component.name;
        if (_components.has(componentName)) {
            logger.debug(`There were multiple attempts to register component ${componentName}.`);
            return false;
        }
        _components.set(componentName, component);
        // add the component to existing app instances
        for (const app of _apps.values()) {
            _addComponent(app, component);
        }
        return true;
    }
    /**
     *
     * @param app - FirebaseApp instance
     * @param name - service name
     *
     * @returns the provider for the service with the matching name
     *
     * @internal
     */
    function _getProvider(app, name) {
        return app.container.getProvider(name);
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const ERRORS = {
        ["no-app" /* NO_APP */]: "No Firebase App '{$appName}' has been created - " +
            'call Firebase App.initializeApp()',
        ["bad-app-name" /* BAD_APP_NAME */]: "Illegal App name: '{$appName}",
        ["duplicate-app" /* DUPLICATE_APP */]: "Firebase App named '{$appName}' already exists with different options or config",
        ["app-deleted" /* APP_DELETED */]: "Firebase App named '{$appName}' already deleted",
        ["invalid-app-argument" /* INVALID_APP_ARGUMENT */]: 'firebase.{$appName}() takes either no argument or a ' +
            'Firebase App instance.',
        ["invalid-log-argument" /* INVALID_LOG_ARGUMENT */]: 'First argument to `onLog` must be null or a function.'
    };
    const ERROR_FACTORY = new ErrorFactory('app', 'Firebase', ERRORS);

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class FirebaseAppImpl {
        constructor(options, config, container) {
            this._isDeleted = false;
            this._options = Object.assign({}, options);
            this._config = Object.assign({}, config);
            this._name = config.name;
            this._automaticDataCollectionEnabled =
                config.automaticDataCollectionEnabled;
            this._container = container;
            this.container.addComponent(new Component('app', () => this, "PUBLIC" /* PUBLIC */));
        }
        get automaticDataCollectionEnabled() {
            this.checkDestroyed();
            return this._automaticDataCollectionEnabled;
        }
        set automaticDataCollectionEnabled(val) {
            this.checkDestroyed();
            this._automaticDataCollectionEnabled = val;
        }
        get name() {
            this.checkDestroyed();
            return this._name;
        }
        get options() {
            this.checkDestroyed();
            return this._options;
        }
        get config() {
            this.checkDestroyed();
            return this._config;
        }
        get container() {
            return this._container;
        }
        get isDeleted() {
            return this._isDeleted;
        }
        set isDeleted(val) {
            this._isDeleted = val;
        }
        /**
         * This function will throw an Error if the App has already been deleted -
         * use before performing API actions on the App.
         */
        checkDestroyed() {
            if (this.isDeleted) {
                throw ERROR_FACTORY.create("app-deleted" /* APP_DELETED */, { appName: this._name });
            }
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The current SDK version.
     *
     * @public
     */
    const SDK_VERSION = version$2;
    function initializeApp(options, rawConfig = {}) {
        if (typeof rawConfig !== 'object') {
            const name = rawConfig;
            rawConfig = { name };
        }
        const config = Object.assign({ name: DEFAULT_ENTRY_NAME, automaticDataCollectionEnabled: false }, rawConfig);
        const name = config.name;
        if (typeof name !== 'string' || !name) {
            throw ERROR_FACTORY.create("bad-app-name" /* BAD_APP_NAME */, {
                appName: String(name)
            });
        }
        const existingApp = _apps.get(name);
        if (existingApp) {
            // return the existing app if options and config deep equal the ones in the existing app.
            if (deepEqual(options, existingApp.options) &&
                deepEqual(config, existingApp.config)) {
                return existingApp;
            }
            else {
                throw ERROR_FACTORY.create("duplicate-app" /* DUPLICATE_APP */, { appName: name });
            }
        }
        const container = new ComponentContainer(name);
        for (const component of _components.values()) {
            container.addComponent(component);
        }
        const newApp = new FirebaseAppImpl(options, config, container);
        _apps.set(name, newApp);
        return newApp;
    }
    /**
     * Retrieves a {@link @firebase/app#FirebaseApp} instance.
     *
     * When called with no arguments, the default app is returned. When an app name
     * is provided, the app corresponding to that name is returned.
     *
     * An exception is thrown if the app being retrieved has not yet been
     * initialized.
     *
     * @example
     * ```javascript
     * // Return the default app
     * const app = getApp();
     * ```
     *
     * @example
     * ```javascript
     * // Return a named app
     * const otherApp = getApp("otherApp");
     * ```
     *
     * @param name - Optional name of the app to return. If no name is
     *   provided, the default is `"[DEFAULT]"`.
     *
     * @returns The app corresponding to the provided app name.
     *   If no app name is provided, the default app is returned.
     *
     * @public
     */
    function getApp(name = DEFAULT_ENTRY_NAME) {
        const app = _apps.get(name);
        if (!app) {
            throw ERROR_FACTORY.create("no-app" /* NO_APP */, { appName: name });
        }
        return app;
    }
    /**
     * Registers a library's name and version for platform logging purposes.
     * @param library - Name of 1p or 3p library (e.g. firestore, angularfire)
     * @param version - Current version of that library.
     * @param variant - Bundle variant, e.g., node, rn, etc.
     *
     * @public
     */
    function registerVersion(libraryKeyOrName, version, variant) {
        var _a;
        // TODO: We can use this check to whitelist strings when/if we set up
        // a good whitelist system.
        let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
        if (variant) {
            library += `-${variant}`;
        }
        const libraryMismatch = library.match(/\s|\//);
        const versionMismatch = version.match(/\s|\//);
        if (libraryMismatch || versionMismatch) {
            const warning = [
                `Unable to register library "${library}" with version "${version}":`
            ];
            if (libraryMismatch) {
                warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
            }
            if (libraryMismatch && versionMismatch) {
                warning.push('and');
            }
            if (versionMismatch) {
                warning.push(`version name "${version}" contains illegal characters (whitespace or "/")`);
            }
            logger.warn(warning.join(' '));
            return;
        }
        _registerComponent(new Component(`${library}-version`, () => ({ library, version }), "VERSION" /* VERSION */));
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function registerCoreComponents(variant) {
        _registerComponent(new Component('platform-logger', container => new PlatformLoggerServiceImpl(container), "PRIVATE" /* PRIVATE */));
        // Register `app` package.
        registerVersion(name$o, version$1$1, variant);
        // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
        registerVersion(name$o, version$1$1, 'esm2017');
        // Register platform SDK identifier (no version).
        registerVersion('fire-js', '');
    }

    /**
     * Firebase App
     *
     * @remarks This package coordinates the communication between the different Firebase components
     * @packageDocumentation
     */
    registerCoreComponents('');

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function _prodErrorMap() {
        // We will include this one message in the prod error map since by the very
        // nature of this error, developers will never be able to see the message
        // using the debugErrorMap (which is installed during auth initialization).
        return {
            ["dependent-sdk-initialized-before-auth" /* DEPENDENT_SDK_INIT_BEFORE_AUTH */]: 'Another Firebase SDK was initialized and is trying to use Auth before Auth is ' +
                'initialized. Please be sure to call `initializeAuth` or `getAuth` before ' +
                'starting any other Firebase SDK.'
        };
    }
    /**
     * A minimal error map with all verbose error messages stripped.
     *
     * See discussion at {@link AuthErrorMap}
     *
     * @public
     */
    const prodErrorMap = _prodErrorMap;
    const _DEFAULT_AUTH_ERROR_FACTORY = new ErrorFactory('auth', 'Firebase', _prodErrorMap());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const logClient = new Logger('@firebase/auth');
    function _logError(msg, ...args) {
        if (logClient.logLevel <= LogLevel.ERROR) {
            logClient.error(`Auth (${SDK_VERSION}): ${msg}`, ...args);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _fail(authOrCode, ...rest) {
        throw createErrorInternal(authOrCode, ...rest);
    }
    function _createError(authOrCode, ...rest) {
        return createErrorInternal(authOrCode, ...rest);
    }
    function _errorWithCustomMessage(auth, code, message) {
        const errorMap = Object.assign(Object.assign({}, prodErrorMap()), { [code]: message });
        const factory = new ErrorFactory('auth', 'Firebase', errorMap);
        return factory.create(code, {
            appName: auth.name,
        });
    }
    function _assertInstanceOf(auth, object, instance) {
        const constructorInstance = instance;
        if (!(object instanceof constructorInstance)) {
            if (constructorInstance.name !== object.constructor.name) {
                _fail(auth, "argument-error" /* ARGUMENT_ERROR */);
            }
            throw _errorWithCustomMessage(auth, "argument-error" /* ARGUMENT_ERROR */, `Type of ${object.constructor.name} does not match expected instance.` +
                `Did you pass a reference from a different Auth SDK?`);
        }
    }
    function createErrorInternal(authOrCode, ...rest) {
        if (typeof authOrCode !== 'string') {
            const code = rest[0];
            const fullParams = [...rest.slice(1)];
            if (fullParams[0]) {
                fullParams[0].appName = authOrCode.name;
            }
            return authOrCode._errorFactory.create(code, ...fullParams);
        }
        return _DEFAULT_AUTH_ERROR_FACTORY.create(authOrCode, ...rest);
    }
    function _assert(assertion, authOrCode, ...rest) {
        if (!assertion) {
            throw createErrorInternal(authOrCode, ...rest);
        }
    }
    /**
     * Unconditionally fails, throwing an internal error with the given message.
     *
     * @param failure type of failure encountered
     * @throws Error
     */
    function debugFail(failure) {
        // Log the failure in addition to throw an exception, just in case the
        // exception is swallowed.
        const message = `INTERNAL ASSERTION FAILED: ` + failure;
        _logError(message);
        // NOTE: We don't use FirebaseError here because these are internal failures
        // that cannot be handled by the user. (Also it would create a circular
        // dependency between the error and assert modules which doesn't work.)
        throw new Error(message);
    }
    /**
     * Fails if the given assertion condition is false, throwing an Error with the
     * given message if it did.
     *
     * @param assertion
     * @param message
     */
    function debugAssert(assertion, message) {
        if (!assertion) {
            debugFail(message);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const instanceCache = new Map();
    function _getInstance(cls) {
        debugAssert(cls instanceof Function, 'Expected a class definition');
        let instance = instanceCache.get(cls);
        if (instance) {
            debugAssert(instance instanceof cls, 'Instance stored in cache mismatched with class');
            return instance;
        }
        instance = new cls();
        instanceCache.set(cls, instance);
        return instance;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Initializes an {@link Auth} instance with fine-grained control over
     * {@link Dependencies}.
     *
     * @remarks
     *
     * This function allows more control over the {@link Auth} instance than
     * {@link getAuth}. `getAuth` uses platform-specific defaults to supply
     * the {@link Dependencies}. In general, `getAuth` is the easiest way to
     * initialize Auth and works for most use cases. Use `initializeAuth` if you
     * need control over which persistence layer is used, or to minimize bundle
     * size if you're not using either `signInWithPopup` or `signInWithRedirect`.
     *
     * For example, if your app only uses anonymous accounts and you only want
     * accounts saved for the current session, initialize `Auth` with:
     *
     * ```js
     * const auth = initializeAuth(app, {
     *   persistence: browserSessionPersistence,
     *   popupRedirectResolver: undefined,
     * });
     * ```
     *
     * @public
     */
    function initializeAuth(app, deps) {
        const provider = _getProvider(app, 'auth');
        if (provider.isInitialized()) {
            const auth = provider.getImmediate();
            const initialOptions = provider.getOptions();
            if (deepEqual(initialOptions, deps !== null && deps !== void 0 ? deps : {})) {
                return auth;
            }
            else {
                _fail(auth, "already-initialized" /* ALREADY_INITIALIZED */);
            }
        }
        const auth = provider.initialize({ options: deps });
        return auth;
    }
    function _initializeAuthInstance(auth, deps) {
        const persistence = (deps === null || deps === void 0 ? void 0 : deps.persistence) || [];
        const hierarchy = (Array.isArray(persistence) ? persistence : [persistence]).map(_getInstance);
        if (deps === null || deps === void 0 ? void 0 : deps.errorMap) {
            auth._updateErrorMap(deps.errorMap);
        }
        // This promise is intended to float; auth initialization happens in the
        // background, meanwhile the auth object may be used by the app.
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        auth._initializeWithPersistence(hierarchy, deps === null || deps === void 0 ? void 0 : deps.popupRedirectResolver);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _getCurrentUrl() {
        var _a;
        return (typeof self !== 'undefined' && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.href)) || '';
    }
    function _isHttpOrHttps() {
        return _getCurrentScheme() === 'http:' || _getCurrentScheme() === 'https:';
    }
    function _getCurrentScheme() {
        var _a;
        return (typeof self !== 'undefined' && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.protocol)) || null;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Determine whether the browser is working online
     */
    function _isOnline() {
        if (typeof navigator !== 'undefined' &&
            navigator &&
            'onLine' in navigator &&
            typeof navigator.onLine === 'boolean' &&
            // Apply only for traditional web apps and Chrome extensions.
            // This is especially true for Cordova apps which have unreliable
            // navigator.onLine behavior unless cordova-plugin-network-information is
            // installed which overwrites the native navigator.onLine value and
            // defines navigator.connection.
            (_isHttpOrHttps() || isBrowserExtension() || 'connection' in navigator)) {
            return navigator.onLine;
        }
        // If we can't determine the state, assume it is online.
        return true;
    }
    function _getUserLanguage() {
        if (typeof navigator === 'undefined') {
            return null;
        }
        const navigatorLanguage = navigator;
        return (
        // Most reliable, but only supported in Chrome/Firefox.
        (navigatorLanguage.languages && navigatorLanguage.languages[0]) ||
            // Supported in most browsers, but returns the language of the browser
            // UI, not the language set in browser settings.
            navigatorLanguage.language ||
            // Couldn't determine language.
            null);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A structure to help pick between a range of long and short delay durations
     * depending on the current environment. In general, the long delay is used for
     * mobile environments whereas short delays are used for desktop environments.
     */
    class Delay {
        constructor(shortDelay, longDelay) {
            this.shortDelay = shortDelay;
            this.longDelay = longDelay;
            // Internal error when improperly initialized.
            debugAssert(longDelay > shortDelay, 'Short delay should be less than long delay!');
            this.isMobile = isMobileCordova() || isReactNative();
        }
        get() {
            if (!_isOnline()) {
                // Pick the shorter timeout.
                return Math.min(5000 /* OFFLINE */, this.shortDelay);
            }
            // If running in a mobile environment, return the long delay, otherwise
            // return the short delay.
            // This could be improved in the future to dynamically change based on other
            // variables instead of just reading the current environment.
            return this.isMobile ? this.longDelay : this.shortDelay;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _emulatorUrl(config, path) {
        debugAssert(config.emulator, 'Emulator should always be set here');
        const { url } = config.emulator;
        if (!path) {
            return url;
        }
        return `${url}${path.startsWith('/') ? path.slice(1) : path}`;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class FetchProvider {
        static initialize(fetchImpl, headersImpl, responseImpl) {
            this.fetchImpl = fetchImpl;
            if (headersImpl) {
                this.headersImpl = headersImpl;
            }
            if (responseImpl) {
                this.responseImpl = responseImpl;
            }
        }
        static fetch() {
            if (this.fetchImpl) {
                return this.fetchImpl;
            }
            if (typeof self !== 'undefined' && 'fetch' in self) {
                return self.fetch;
            }
            debugFail('Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
        }
        static headers() {
            if (this.headersImpl) {
                return this.headersImpl;
            }
            if (typeof self !== 'undefined' && 'Headers' in self) {
                return self.Headers;
            }
            debugFail('Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
        }
        static response() {
            if (this.responseImpl) {
                return this.responseImpl;
            }
            if (typeof self !== 'undefined' && 'Response' in self) {
                return self.Response;
            }
            debugFail('Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Map from errors returned by the server to errors to developer visible errors
     */
    const SERVER_ERROR_MAP = {
        // Custom token errors.
        ["CREDENTIAL_MISMATCH" /* CREDENTIAL_MISMATCH */]: "custom-token-mismatch" /* CREDENTIAL_MISMATCH */,
        // This can only happen if the SDK sends a bad request.
        ["MISSING_CUSTOM_TOKEN" /* MISSING_CUSTOM_TOKEN */]: "internal-error" /* INTERNAL_ERROR */,
        // Create Auth URI errors.
        ["INVALID_IDENTIFIER" /* INVALID_IDENTIFIER */]: "invalid-email" /* INVALID_EMAIL */,
        // This can only happen if the SDK sends a bad request.
        ["MISSING_CONTINUE_URI" /* MISSING_CONTINUE_URI */]: "internal-error" /* INTERNAL_ERROR */,
        // Sign in with email and password errors (some apply to sign up too).
        ["INVALID_PASSWORD" /* INVALID_PASSWORD */]: "wrong-password" /* INVALID_PASSWORD */,
        // This can only happen if the SDK sends a bad request.
        ["MISSING_PASSWORD" /* MISSING_PASSWORD */]: "internal-error" /* INTERNAL_ERROR */,
        // Sign up with email and password errors.
        ["EMAIL_EXISTS" /* EMAIL_EXISTS */]: "email-already-in-use" /* EMAIL_EXISTS */,
        ["PASSWORD_LOGIN_DISABLED" /* PASSWORD_LOGIN_DISABLED */]: "operation-not-allowed" /* OPERATION_NOT_ALLOWED */,
        // Verify assertion for sign in with credential errors:
        ["INVALID_IDP_RESPONSE" /* INVALID_IDP_RESPONSE */]: "invalid-credential" /* INVALID_IDP_RESPONSE */,
        ["INVALID_PENDING_TOKEN" /* INVALID_PENDING_TOKEN */]: "invalid-credential" /* INVALID_IDP_RESPONSE */,
        ["FEDERATED_USER_ID_ALREADY_LINKED" /* FEDERATED_USER_ID_ALREADY_LINKED */]: "credential-already-in-use" /* CREDENTIAL_ALREADY_IN_USE */,
        // This can only happen if the SDK sends a bad request.
        ["MISSING_REQ_TYPE" /* MISSING_REQ_TYPE */]: "internal-error" /* INTERNAL_ERROR */,
        // Send Password reset email errors:
        ["EMAIL_NOT_FOUND" /* EMAIL_NOT_FOUND */]: "user-not-found" /* USER_DELETED */,
        ["RESET_PASSWORD_EXCEED_LIMIT" /* RESET_PASSWORD_EXCEED_LIMIT */]: "too-many-requests" /* TOO_MANY_ATTEMPTS_TRY_LATER */,
        ["EXPIRED_OOB_CODE" /* EXPIRED_OOB_CODE */]: "expired-action-code" /* EXPIRED_OOB_CODE */,
        ["INVALID_OOB_CODE" /* INVALID_OOB_CODE */]: "invalid-action-code" /* INVALID_OOB_CODE */,
        // This can only happen if the SDK sends a bad request.
        ["MISSING_OOB_CODE" /* MISSING_OOB_CODE */]: "internal-error" /* INTERNAL_ERROR */,
        // Operations that require ID token in request:
        ["CREDENTIAL_TOO_OLD_LOGIN_AGAIN" /* CREDENTIAL_TOO_OLD_LOGIN_AGAIN */]: "requires-recent-login" /* CREDENTIAL_TOO_OLD_LOGIN_AGAIN */,
        ["INVALID_ID_TOKEN" /* INVALID_ID_TOKEN */]: "invalid-user-token" /* INVALID_AUTH */,
        ["TOKEN_EXPIRED" /* TOKEN_EXPIRED */]: "user-token-expired" /* TOKEN_EXPIRED */,
        ["USER_NOT_FOUND" /* USER_NOT_FOUND */]: "user-token-expired" /* TOKEN_EXPIRED */,
        // Other errors.
        ["TOO_MANY_ATTEMPTS_TRY_LATER" /* TOO_MANY_ATTEMPTS_TRY_LATER */]: "too-many-requests" /* TOO_MANY_ATTEMPTS_TRY_LATER */,
        // Phone Auth related errors.
        ["INVALID_CODE" /* INVALID_CODE */]: "invalid-verification-code" /* INVALID_CODE */,
        ["INVALID_SESSION_INFO" /* INVALID_SESSION_INFO */]: "invalid-verification-id" /* INVALID_SESSION_INFO */,
        ["INVALID_TEMPORARY_PROOF" /* INVALID_TEMPORARY_PROOF */]: "invalid-credential" /* INVALID_IDP_RESPONSE */,
        ["MISSING_SESSION_INFO" /* MISSING_SESSION_INFO */]: "missing-verification-id" /* MISSING_SESSION_INFO */,
        ["SESSION_EXPIRED" /* SESSION_EXPIRED */]: "code-expired" /* CODE_EXPIRED */,
        // Other action code errors when additional settings passed.
        // MISSING_CONTINUE_URI is getting mapped to INTERNAL_ERROR above.
        // This is OK as this error will be caught by client side validation.
        ["MISSING_ANDROID_PACKAGE_NAME" /* MISSING_ANDROID_PACKAGE_NAME */]: "missing-android-pkg-name" /* MISSING_ANDROID_PACKAGE_NAME */,
        ["UNAUTHORIZED_DOMAIN" /* UNAUTHORIZED_DOMAIN */]: "unauthorized-continue-uri" /* UNAUTHORIZED_DOMAIN */,
        // getProjectConfig errors when clientId is passed.
        ["INVALID_OAUTH_CLIENT_ID" /* INVALID_OAUTH_CLIENT_ID */]: "invalid-oauth-client-id" /* INVALID_OAUTH_CLIENT_ID */,
        // User actions (sign-up or deletion) disabled errors.
        ["ADMIN_ONLY_OPERATION" /* ADMIN_ONLY_OPERATION */]: "admin-restricted-operation" /* ADMIN_ONLY_OPERATION */,
        // Multi factor related errors.
        ["INVALID_MFA_PENDING_CREDENTIAL" /* INVALID_MFA_PENDING_CREDENTIAL */]: "invalid-multi-factor-session" /* INVALID_MFA_SESSION */,
        ["MFA_ENROLLMENT_NOT_FOUND" /* MFA_ENROLLMENT_NOT_FOUND */]: "multi-factor-info-not-found" /* MFA_INFO_NOT_FOUND */,
        ["MISSING_MFA_ENROLLMENT_ID" /* MISSING_MFA_ENROLLMENT_ID */]: "missing-multi-factor-info" /* MISSING_MFA_INFO */,
        ["MISSING_MFA_PENDING_CREDENTIAL" /* MISSING_MFA_PENDING_CREDENTIAL */]: "missing-multi-factor-session" /* MISSING_MFA_SESSION */,
        ["SECOND_FACTOR_EXISTS" /* SECOND_FACTOR_EXISTS */]: "second-factor-already-in-use" /* SECOND_FACTOR_ALREADY_ENROLLED */,
        ["SECOND_FACTOR_LIMIT_EXCEEDED" /* SECOND_FACTOR_LIMIT_EXCEEDED */]: "maximum-second-factor-count-exceeded" /* SECOND_FACTOR_LIMIT_EXCEEDED */,
        // Blocking functions related errors.
        ["BLOCKING_FUNCTION_ERROR_RESPONSE" /* BLOCKING_FUNCTION_ERROR_RESPONSE */]: "internal-error" /* INTERNAL_ERROR */,
    };

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const DEFAULT_API_TIMEOUT_MS = new Delay(30000, 60000);
    function _addTidIfNecessary(auth, request) {
        if (auth.tenantId && !request.tenantId) {
            return Object.assign(Object.assign({}, request), { tenantId: auth.tenantId });
        }
        return request;
    }
    async function _performApiRequest(auth, method, path, request, customErrorMap = {}) {
        return _performFetchWithErrorHandling(auth, customErrorMap, async () => {
            let body = {};
            let params = {};
            if (request) {
                if (method === "GET" /* GET */) {
                    params = request;
                }
                else {
                    body = {
                        body: JSON.stringify(request)
                    };
                }
            }
            const query = querystring(Object.assign({ key: auth.config.apiKey }, params)).slice(1);
            const headers = await auth._getAdditionalHeaders();
            headers["Content-Type" /* CONTENT_TYPE */] = 'application/json';
            if (auth.languageCode) {
                headers["X-Firebase-Locale" /* X_FIREBASE_LOCALE */] = auth.languageCode;
            }
            return FetchProvider.fetch()(_getFinalTarget(auth, auth.config.apiHost, path, query), Object.assign({ method,
                headers, referrerPolicy: 'no-referrer' }, body));
        });
    }
    async function _performFetchWithErrorHandling(auth, customErrorMap, fetchFn) {
        auth._canInitEmulator = false;
        const errorMap = Object.assign(Object.assign({}, SERVER_ERROR_MAP), customErrorMap);
        try {
            const networkTimeout = new NetworkTimeout(auth);
            const response = await Promise.race([
                fetchFn(),
                networkTimeout.promise
            ]);
            // If we've reached this point, the fetch succeeded and the networkTimeout
            // didn't throw; clear the network timeout delay so that Node won't hang
            networkTimeout.clearNetworkTimeout();
            const json = await response.json();
            if ('needConfirmation' in json) {
                throw _makeTaggedError(auth, "account-exists-with-different-credential" /* NEED_CONFIRMATION */, json);
            }
            if (response.ok && !('errorMessage' in json)) {
                return json;
            }
            else {
                const errorMessage = response.ok ? json.errorMessage : json.error.message;
                const [serverErrorCode, serverErrorMessage] = errorMessage.split(' : ');
                if (serverErrorCode === "FEDERATED_USER_ID_ALREADY_LINKED" /* FEDERATED_USER_ID_ALREADY_LINKED */) {
                    throw _makeTaggedError(auth, "credential-already-in-use" /* CREDENTIAL_ALREADY_IN_USE */, json);
                }
                else if (serverErrorCode === "EMAIL_EXISTS" /* EMAIL_EXISTS */) {
                    throw _makeTaggedError(auth, "email-already-in-use" /* EMAIL_EXISTS */, json);
                }
                const authError = errorMap[serverErrorCode] ||
                    serverErrorCode
                        .toLowerCase()
                        .replace(/[_\s]+/g, '-');
                if (serverErrorMessage) {
                    throw _errorWithCustomMessage(auth, authError, serverErrorMessage);
                }
                else {
                    _fail(auth, authError);
                }
            }
        }
        catch (e) {
            if (e instanceof FirebaseError) {
                throw e;
            }
            _fail(auth, "network-request-failed" /* NETWORK_REQUEST_FAILED */);
        }
    }
    async function _performSignInRequest(auth, method, path, request, customErrorMap = {}) {
        const serverResponse = (await _performApiRequest(auth, method, path, request, customErrorMap));
        if ('mfaPendingCredential' in serverResponse) {
            _fail(auth, "multi-factor-auth-required" /* MFA_REQUIRED */, {
                _serverResponse: serverResponse
            });
        }
        return serverResponse;
    }
    function _getFinalTarget(auth, host, path, query) {
        const base = `${host}${path}?${query}`;
        if (!auth.config.emulator) {
            return `${auth.config.apiScheme}://${base}`;
        }
        return _emulatorUrl(auth.config, base);
    }
    class NetworkTimeout {
        constructor(auth) {
            this.auth = auth;
            // Node timers and browser timers are fundamentally incompatible, but we
            // don't care about the value here
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.timer = null;
            this.promise = new Promise((_, reject) => {
                this.timer = setTimeout(() => {
                    return reject(_createError(this.auth, "network-request-failed" /* NETWORK_REQUEST_FAILED */));
                }, DEFAULT_API_TIMEOUT_MS.get());
            });
        }
        clearNetworkTimeout() {
            clearTimeout(this.timer);
        }
    }
    function _makeTaggedError(auth, code, response) {
        const errorParams = {
            appName: auth.name
        };
        if (response.email) {
            errorParams.email = response.email;
        }
        if (response.phoneNumber) {
            errorParams.phoneNumber = response.phoneNumber;
        }
        const error = _createError(auth, code, errorParams);
        // We know customData is defined on error because errorParams is defined
        error.customData._tokenResponse = response;
        return error;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    async function deleteAccount(auth, request) {
        return _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:delete" /* DELETE_ACCOUNT */, request);
    }
    async function getAccountInfo(auth, request) {
        return _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:lookup" /* GET_ACCOUNT_INFO */, request);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function utcTimestampToDateString(utcTimestamp) {
        if (!utcTimestamp) {
            return undefined;
        }
        try {
            // Convert to date object.
            const date = new Date(Number(utcTimestamp));
            // Test date is valid.
            if (!isNaN(date.getTime())) {
                // Convert to UTC date string.
                return date.toUTCString();
            }
        }
        catch (e) {
            // Do nothing. undefined will be returned.
        }
        return undefined;
    }
    /**
     * Returns a deserialized JSON Web Token (JWT) used to identitfy the user to a Firebase service.
     *
     * @remarks
     * Returns the current token if it has not expired or if it will not expire in the next five
     * minutes. Otherwise, this will refresh the token and return a new one.
     *
     * @param user - The user.
     * @param forceRefresh - Force refresh regardless of token expiration.
     *
     * @public
     */
    async function getIdTokenResult(user, forceRefresh = false) {
        const userInternal = getModularInstance(user);
        const token = await userInternal.getIdToken(forceRefresh);
        const claims = _parseToken(token);
        _assert(claims && claims.exp && claims.auth_time && claims.iat, userInternal.auth, "internal-error" /* INTERNAL_ERROR */);
        const firebase = typeof claims.firebase === 'object' ? claims.firebase : undefined;
        const signInProvider = firebase === null || firebase === void 0 ? void 0 : firebase['sign_in_provider'];
        return {
            claims,
            token,
            authTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.auth_time)),
            issuedAtTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.iat)),
            expirationTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.exp)),
            signInProvider: signInProvider || null,
            signInSecondFactor: (firebase === null || firebase === void 0 ? void 0 : firebase['sign_in_second_factor']) || null
        };
    }
    function secondsStringToMilliseconds(seconds) {
        return Number(seconds) * 1000;
    }
    function _parseToken(token) {
        const [algorithm, payload, signature] = token.split('.');
        if (algorithm === undefined ||
            payload === undefined ||
            signature === undefined) {
            _logError('JWT malformed, contained fewer than 3 sections');
            return null;
        }
        try {
            const decoded = base64Decode(payload);
            if (!decoded) {
                _logError('Failed to decode base64 JWT payload');
                return null;
            }
            return JSON.parse(decoded);
        }
        catch (e) {
            _logError('Caught error parsing JWT payload as JSON', e);
            return null;
        }
    }
    /**
     * Extract expiresIn TTL from a token by subtracting the expiration from the issuance.
     */
    function _tokenExpiresIn(token) {
        const parsedToken = _parseToken(token);
        _assert(parsedToken, "internal-error" /* INTERNAL_ERROR */);
        _assert(typeof parsedToken.exp !== 'undefined', "internal-error" /* INTERNAL_ERROR */);
        _assert(typeof parsedToken.iat !== 'undefined', "internal-error" /* INTERNAL_ERROR */);
        return Number(parsedToken.exp) - Number(parsedToken.iat);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    async function _logoutIfInvalidated(user, promise, bypassAuthState = false) {
        if (bypassAuthState) {
            return promise;
        }
        try {
            return await promise;
        }
        catch (e) {
            if (e instanceof FirebaseError && isUserInvalidated(e)) {
                if (user.auth.currentUser === user) {
                    await user.auth.signOut();
                }
            }
            throw e;
        }
    }
    function isUserInvalidated({ code }) {
        return (code === `auth/${"user-disabled" /* USER_DISABLED */}` ||
            code === `auth/${"user-token-expired" /* TOKEN_EXPIRED */}`);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class ProactiveRefresh {
        constructor(user) {
            this.user = user;
            this.isRunning = false;
            // Node timers and browser timers return fundamentally different types.
            // We don't actually care what the value is but TS won't accept unknown and
            // we can't cast properly in both environments.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.timerId = null;
            this.errorBackoff = 30000 /* RETRY_BACKOFF_MIN */;
        }
        _start() {
            if (this.isRunning) {
                return;
            }
            this.isRunning = true;
            this.schedule();
        }
        _stop() {
            if (!this.isRunning) {
                return;
            }
            this.isRunning = false;
            if (this.timerId !== null) {
                clearTimeout(this.timerId);
            }
        }
        getInterval(wasError) {
            var _a;
            if (wasError) {
                const interval = this.errorBackoff;
                this.errorBackoff = Math.min(this.errorBackoff * 2, 960000 /* RETRY_BACKOFF_MAX */);
                return interval;
            }
            else {
                // Reset the error backoff
                this.errorBackoff = 30000 /* RETRY_BACKOFF_MIN */;
                const expTime = (_a = this.user.stsTokenManager.expirationTime) !== null && _a !== void 0 ? _a : 0;
                const interval = expTime - Date.now() - 300000 /* OFFSET */;
                return Math.max(0, interval);
            }
        }
        schedule(wasError = false) {
            if (!this.isRunning) {
                // Just in case...
                return;
            }
            const interval = this.getInterval(wasError);
            this.timerId = setTimeout(async () => {
                await this.iteration();
            }, interval);
        }
        async iteration() {
            try {
                await this.user.getIdToken(true);
            }
            catch (e) {
                // Only retry on network errors
                if (e.code === `auth/${"network-request-failed" /* NETWORK_REQUEST_FAILED */}`) {
                    this.schedule(/* wasError */ true);
                }
                return;
            }
            this.schedule();
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class UserMetadata {
        constructor(createdAt, lastLoginAt) {
            this.createdAt = createdAt;
            this.lastLoginAt = lastLoginAt;
            this._initializeTime();
        }
        _initializeTime() {
            this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt);
            this.creationTime = utcTimestampToDateString(this.createdAt);
        }
        _copy(metadata) {
            this.createdAt = metadata.createdAt;
            this.lastLoginAt = metadata.lastLoginAt;
            this._initializeTime();
        }
        toJSON() {
            return {
                createdAt: this.createdAt,
                lastLoginAt: this.lastLoginAt
            };
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    async function _reloadWithoutSaving(user) {
        var _a;
        const auth = user.auth;
        const idToken = await user.getIdToken();
        const response = await _logoutIfInvalidated(user, getAccountInfo(auth, { idToken }));
        _assert(response === null || response === void 0 ? void 0 : response.users.length, auth, "internal-error" /* INTERNAL_ERROR */);
        const coreAccount = response.users[0];
        user._notifyReloadListener(coreAccount);
        const newProviderData = ((_a = coreAccount.providerUserInfo) === null || _a === void 0 ? void 0 : _a.length)
            ? extractProviderData(coreAccount.providerUserInfo)
            : [];
        const providerData = mergeProviderData(user.providerData, newProviderData);
        // Preserves the non-nonymous status of the stored user, even if no more
        // credentials (federated or email/password) are linked to the user. If
        // the user was previously anonymous, then use provider data to update.
        // On the other hand, if it was not anonymous before, it should never be
        // considered anonymous now.
        const oldIsAnonymous = user.isAnonymous;
        const newIsAnonymous = !(user.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
        const isAnonymous = !oldIsAnonymous ? false : newIsAnonymous;
        const updates = {
            uid: coreAccount.localId,
            displayName: coreAccount.displayName || null,
            photoURL: coreAccount.photoUrl || null,
            email: coreAccount.email || null,
            emailVerified: coreAccount.emailVerified || false,
            phoneNumber: coreAccount.phoneNumber || null,
            tenantId: coreAccount.tenantId || null,
            providerData,
            metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
            isAnonymous
        };
        Object.assign(user, updates);
    }
    /**
     * Reloads user account data, if signed in.
     *
     * @param user - The user.
     *
     * @public
     */
    async function reload(user) {
        const userInternal = getModularInstance(user);
        await _reloadWithoutSaving(userInternal);
        // Even though the current user hasn't changed, update
        // current user will trigger a persistence update w/ the
        // new info.
        await userInternal.auth._persistUserIfCurrent(userInternal);
        userInternal.auth._notifyListenersIfCurrent(userInternal);
    }
    function mergeProviderData(original, newData) {
        const deduped = original.filter(o => !newData.some(n => n.providerId === o.providerId));
        return [...deduped, ...newData];
    }
    function extractProviderData(providers) {
        return providers.map((_a) => {
            var { providerId } = _a, provider = __rest(_a, ["providerId"]);
            return {
                providerId,
                uid: provider.rawId || '',
                displayName: provider.displayName || null,
                email: provider.email || null,
                phoneNumber: provider.phoneNumber || null,
                photoURL: provider.photoUrl || null
            };
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    async function requestStsToken(auth, refreshToken) {
        const response = await _performFetchWithErrorHandling(auth, {}, async () => {
            const body = querystring({
                'grant_type': 'refresh_token',
                'refresh_token': refreshToken
            }).slice(1);
            const { tokenApiHost, apiKey } = auth.config;
            const url = _getFinalTarget(auth, tokenApiHost, "/v1/token" /* TOKEN */, `key=${apiKey}`);
            const headers = await auth._getAdditionalHeaders();
            headers["Content-Type" /* CONTENT_TYPE */] = 'application/x-www-form-urlencoded';
            return FetchProvider.fetch()(url, {
                method: "POST" /* POST */,
                headers,
                body
            });
        });
        // The response comes back in snake_case. Convert to camel:
        return {
            accessToken: response.access_token,
            expiresIn: response.expires_in,
            refreshToken: response.refresh_token
        };
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * We need to mark this class as internal explicitly to exclude it in the public typings, because
     * it references AuthInternal which has a circular dependency with UserInternal.
     *
     * @internal
     */
    class StsTokenManager {
        constructor() {
            this.refreshToken = null;
            this.accessToken = null;
            this.expirationTime = null;
        }
        get isExpired() {
            return (!this.expirationTime ||
                Date.now() > this.expirationTime - 30000 /* TOKEN_REFRESH */);
        }
        updateFromServerResponse(response) {
            _assert(response.idToken, "internal-error" /* INTERNAL_ERROR */);
            _assert(typeof response.idToken !== 'undefined', "internal-error" /* INTERNAL_ERROR */);
            _assert(typeof response.refreshToken !== 'undefined', "internal-error" /* INTERNAL_ERROR */);
            const expiresIn = 'expiresIn' in response && typeof response.expiresIn !== 'undefined'
                ? Number(response.expiresIn)
                : _tokenExpiresIn(response.idToken);
            this.updateTokensAndExpiration(response.idToken, response.refreshToken, expiresIn);
        }
        async getToken(auth, forceRefresh = false) {
            _assert(!this.accessToken || this.refreshToken, auth, "user-token-expired" /* TOKEN_EXPIRED */);
            if (!forceRefresh && this.accessToken && !this.isExpired) {
                return this.accessToken;
            }
            if (this.refreshToken) {
                await this.refresh(auth, this.refreshToken);
                return this.accessToken;
            }
            return null;
        }
        clearRefreshToken() {
            this.refreshToken = null;
        }
        async refresh(auth, oldToken) {
            const { accessToken, refreshToken, expiresIn } = await requestStsToken(auth, oldToken);
            this.updateTokensAndExpiration(accessToken, refreshToken, Number(expiresIn));
        }
        updateTokensAndExpiration(accessToken, refreshToken, expiresInSec) {
            this.refreshToken = refreshToken || null;
            this.accessToken = accessToken || null;
            this.expirationTime = Date.now() + expiresInSec * 1000;
        }
        static fromJSON(appName, object) {
            const { refreshToken, accessToken, expirationTime } = object;
            const manager = new StsTokenManager();
            if (refreshToken) {
                _assert(typeof refreshToken === 'string', "internal-error" /* INTERNAL_ERROR */, {
                    appName
                });
                manager.refreshToken = refreshToken;
            }
            if (accessToken) {
                _assert(typeof accessToken === 'string', "internal-error" /* INTERNAL_ERROR */, {
                    appName
                });
                manager.accessToken = accessToken;
            }
            if (expirationTime) {
                _assert(typeof expirationTime === 'number', "internal-error" /* INTERNAL_ERROR */, {
                    appName
                });
                manager.expirationTime = expirationTime;
            }
            return manager;
        }
        toJSON() {
            return {
                refreshToken: this.refreshToken,
                accessToken: this.accessToken,
                expirationTime: this.expirationTime
            };
        }
        _assign(stsTokenManager) {
            this.accessToken = stsTokenManager.accessToken;
            this.refreshToken = stsTokenManager.refreshToken;
            this.expirationTime = stsTokenManager.expirationTime;
        }
        _clone() {
            return Object.assign(new StsTokenManager(), this.toJSON());
        }
        _performRefresh() {
            return debugFail('not implemented');
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function assertStringOrUndefined(assertion, appName) {
        _assert(typeof assertion === 'string' || typeof assertion === 'undefined', "internal-error" /* INTERNAL_ERROR */, { appName });
    }
    class UserImpl {
        constructor(_a) {
            var { uid, auth, stsTokenManager } = _a, opt = __rest(_a, ["uid", "auth", "stsTokenManager"]);
            // For the user object, provider is always Firebase.
            this.providerId = "firebase" /* FIREBASE */;
            this.proactiveRefresh = new ProactiveRefresh(this);
            this.reloadUserInfo = null;
            this.reloadListener = null;
            this.uid = uid;
            this.auth = auth;
            this.stsTokenManager = stsTokenManager;
            this.accessToken = stsTokenManager.accessToken;
            this.displayName = opt.displayName || null;
            this.email = opt.email || null;
            this.emailVerified = opt.emailVerified || false;
            this.phoneNumber = opt.phoneNumber || null;
            this.photoURL = opt.photoURL || null;
            this.isAnonymous = opt.isAnonymous || false;
            this.tenantId = opt.tenantId || null;
            this.providerData = opt.providerData ? [...opt.providerData] : [];
            this.metadata = new UserMetadata(opt.createdAt || undefined, opt.lastLoginAt || undefined);
        }
        async getIdToken(forceRefresh) {
            const accessToken = await _logoutIfInvalidated(this, this.stsTokenManager.getToken(this.auth, forceRefresh));
            _assert(accessToken, this.auth, "internal-error" /* INTERNAL_ERROR */);
            if (this.accessToken !== accessToken) {
                this.accessToken = accessToken;
                await this.auth._persistUserIfCurrent(this);
                this.auth._notifyListenersIfCurrent(this);
            }
            return accessToken;
        }
        getIdTokenResult(forceRefresh) {
            return getIdTokenResult(this, forceRefresh);
        }
        reload() {
            return reload(this);
        }
        _assign(user) {
            if (this === user) {
                return;
            }
            _assert(this.uid === user.uid, this.auth, "internal-error" /* INTERNAL_ERROR */);
            this.displayName = user.displayName;
            this.photoURL = user.photoURL;
            this.email = user.email;
            this.emailVerified = user.emailVerified;
            this.phoneNumber = user.phoneNumber;
            this.isAnonymous = user.isAnonymous;
            this.tenantId = user.tenantId;
            this.providerData = user.providerData.map(userInfo => (Object.assign({}, userInfo)));
            this.metadata._copy(user.metadata);
            this.stsTokenManager._assign(user.stsTokenManager);
        }
        _clone(auth) {
            return new UserImpl(Object.assign(Object.assign({}, this), { auth, stsTokenManager: this.stsTokenManager._clone() }));
        }
        _onReload(callback) {
            // There should only ever be one listener, and that is a single instance of MultiFactorUser
            _assert(!this.reloadListener, this.auth, "internal-error" /* INTERNAL_ERROR */);
            this.reloadListener = callback;
            if (this.reloadUserInfo) {
                this._notifyReloadListener(this.reloadUserInfo);
                this.reloadUserInfo = null;
            }
        }
        _notifyReloadListener(userInfo) {
            if (this.reloadListener) {
                this.reloadListener(userInfo);
            }
            else {
                // If no listener is subscribed yet, save the result so it's available when they do subscribe
                this.reloadUserInfo = userInfo;
            }
        }
        _startProactiveRefresh() {
            this.proactiveRefresh._start();
        }
        _stopProactiveRefresh() {
            this.proactiveRefresh._stop();
        }
        async _updateTokensIfNecessary(response, reload = false) {
            let tokensRefreshed = false;
            if (response.idToken &&
                response.idToken !== this.stsTokenManager.accessToken) {
                this.stsTokenManager.updateFromServerResponse(response);
                tokensRefreshed = true;
            }
            if (reload) {
                await _reloadWithoutSaving(this);
            }
            await this.auth._persistUserIfCurrent(this);
            if (tokensRefreshed) {
                this.auth._notifyListenersIfCurrent(this);
            }
        }
        async delete() {
            const idToken = await this.getIdToken();
            await _logoutIfInvalidated(this, deleteAccount(this.auth, { idToken }));
            this.stsTokenManager.clearRefreshToken();
            // TODO: Determine if cancellable-promises are necessary to use in this class so that delete()
            //       cancels pending actions...
            return this.auth.signOut();
        }
        toJSON() {
            return Object.assign(Object.assign({ uid: this.uid, email: this.email || undefined, emailVerified: this.emailVerified, displayName: this.displayName || undefined, isAnonymous: this.isAnonymous, photoURL: this.photoURL || undefined, phoneNumber: this.phoneNumber || undefined, tenantId: this.tenantId || undefined, providerData: this.providerData.map(userInfo => (Object.assign({}, userInfo))), stsTokenManager: this.stsTokenManager.toJSON(), 
                // Redirect event ID must be maintained in case there is a pending
                // redirect event.
                _redirectEventId: this._redirectEventId }, this.metadata.toJSON()), { 
                // Required for compatibility with the legacy SDK (go/firebase-auth-sdk-persistence-parsing):
                apiKey: this.auth.config.apiKey, appName: this.auth.name });
        }
        get refreshToken() {
            return this.stsTokenManager.refreshToken || '';
        }
        static _fromJSON(auth, object) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const displayName = (_a = object.displayName) !== null && _a !== void 0 ? _a : undefined;
            const email = (_b = object.email) !== null && _b !== void 0 ? _b : undefined;
            const phoneNumber = (_c = object.phoneNumber) !== null && _c !== void 0 ? _c : undefined;
            const photoURL = (_d = object.photoURL) !== null && _d !== void 0 ? _d : undefined;
            const tenantId = (_e = object.tenantId) !== null && _e !== void 0 ? _e : undefined;
            const _redirectEventId = (_f = object._redirectEventId) !== null && _f !== void 0 ? _f : undefined;
            const createdAt = (_g = object.createdAt) !== null && _g !== void 0 ? _g : undefined;
            const lastLoginAt = (_h = object.lastLoginAt) !== null && _h !== void 0 ? _h : undefined;
            const { uid, emailVerified, isAnonymous, providerData, stsTokenManager: plainObjectTokenManager } = object;
            _assert(uid && plainObjectTokenManager, auth, "internal-error" /* INTERNAL_ERROR */);
            const stsTokenManager = StsTokenManager.fromJSON(this.name, plainObjectTokenManager);
            _assert(typeof uid === 'string', auth, "internal-error" /* INTERNAL_ERROR */);
            assertStringOrUndefined(displayName, auth.name);
            assertStringOrUndefined(email, auth.name);
            _assert(typeof emailVerified === 'boolean', auth, "internal-error" /* INTERNAL_ERROR */);
            _assert(typeof isAnonymous === 'boolean', auth, "internal-error" /* INTERNAL_ERROR */);
            assertStringOrUndefined(phoneNumber, auth.name);
            assertStringOrUndefined(photoURL, auth.name);
            assertStringOrUndefined(tenantId, auth.name);
            assertStringOrUndefined(_redirectEventId, auth.name);
            assertStringOrUndefined(createdAt, auth.name);
            assertStringOrUndefined(lastLoginAt, auth.name);
            const user = new UserImpl({
                uid,
                auth,
                email,
                emailVerified,
                displayName,
                isAnonymous,
                photoURL,
                phoneNumber,
                tenantId,
                stsTokenManager,
                createdAt,
                lastLoginAt
            });
            if (providerData && Array.isArray(providerData)) {
                user.providerData = providerData.map(userInfo => (Object.assign({}, userInfo)));
            }
            if (_redirectEventId) {
                user._redirectEventId = _redirectEventId;
            }
            return user;
        }
        /**
         * Initialize a User from an idToken server response
         * @param auth
         * @param idTokenResponse
         */
        static async _fromIdTokenResponse(auth, idTokenResponse, isAnonymous = false) {
            const stsTokenManager = new StsTokenManager();
            stsTokenManager.updateFromServerResponse(idTokenResponse);
            // Initialize the Firebase Auth user.
            const user = new UserImpl({
                uid: idTokenResponse.localId,
                auth,
                stsTokenManager,
                isAnonymous
            });
            // Updates the user info and data and resolves with a user instance.
            await _reloadWithoutSaving(user);
            return user;
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class InMemoryPersistence {
        constructor() {
            this.type = "NONE" /* NONE */;
            this.storage = {};
        }
        async _isAvailable() {
            return true;
        }
        async _set(key, value) {
            this.storage[key] = value;
        }
        async _get(key) {
            const value = this.storage[key];
            return value === undefined ? null : value;
        }
        async _remove(key) {
            delete this.storage[key];
        }
        _addListener(_key, _listener) {
            // Listeners are not supported for in-memory storage since it cannot be shared across windows/workers
            return;
        }
        _removeListener(_key, _listener) {
            // Listeners are not supported for in-memory storage since it cannot be shared across windows/workers
            return;
        }
    }
    InMemoryPersistence.type = 'NONE';
    /**
     * An implementation of {@link Persistence} of type 'NONE'.
     *
     * @public
     */
    const inMemoryPersistence = InMemoryPersistence;

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _persistenceKeyName(key, apiKey, appName) {
        return `${"firebase" /* PERSISTENCE */}:${key}:${apiKey}:${appName}`;
    }
    class PersistenceUserManager {
        constructor(persistence, auth, userKey) {
            this.persistence = persistence;
            this.auth = auth;
            this.userKey = userKey;
            const { config, name } = this.auth;
            this.fullUserKey = _persistenceKeyName(this.userKey, config.apiKey, name);
            this.fullPersistenceKey = _persistenceKeyName("persistence" /* PERSISTENCE_USER */, config.apiKey, name);
            this.boundEventHandler = auth._onStorageEvent.bind(auth);
            this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
        }
        setCurrentUser(user) {
            return this.persistence._set(this.fullUserKey, user.toJSON());
        }
        async getCurrentUser() {
            const blob = await this.persistence._get(this.fullUserKey);
            return blob ? UserImpl._fromJSON(this.auth, blob) : null;
        }
        removeCurrentUser() {
            return this.persistence._remove(this.fullUserKey);
        }
        savePersistenceForRedirect() {
            return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
        }
        async setPersistence(newPersistence) {
            if (this.persistence === newPersistence) {
                return;
            }
            const currentUser = await this.getCurrentUser();
            await this.removeCurrentUser();
            this.persistence = newPersistence;
            if (currentUser) {
                return this.setCurrentUser(currentUser);
            }
        }
        delete() {
            this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
        }
        static async create(auth, persistenceHierarchy, userKey = "authUser" /* AUTH_USER */) {
            if (!persistenceHierarchy.length) {
                return new PersistenceUserManager(_getInstance(inMemoryPersistence), auth, userKey);
            }
            // Eliminate any persistences that are not available
            const availablePersistences = (await Promise.all(persistenceHierarchy.map(async (persistence) => {
                if (await persistence._isAvailable()) {
                    return persistence;
                }
                return undefined;
            }))).filter(persistence => persistence);
            // Fall back to the first persistence listed, or in memory if none available
            let selectedPersistence = availablePersistences[0] ||
                _getInstance(inMemoryPersistence);
            const key = _persistenceKeyName(userKey, auth.config.apiKey, auth.name);
            // Pull out the existing user, setting the chosen persistence to that
            // persistence if the user exists.
            let userToMigrate = null;
            // Note, here we check for a user in _all_ persistences, not just the
            // ones deemed available. If we can migrate a user out of a broken
            // persistence, we will (but only if that persistence supports migration).
            for (const persistence of persistenceHierarchy) {
                try {
                    const blob = await persistence._get(key);
                    if (blob) {
                        const user = UserImpl._fromJSON(auth, blob); // throws for unparsable blob (wrong format)
                        if (persistence !== selectedPersistence) {
                            userToMigrate = user;
                        }
                        selectedPersistence = persistence;
                        break;
                    }
                }
                catch (_a) { }
            }
            // If we find the user in a persistence that does support migration, use
            // that migration path (of only persistences that support migration)
            const migrationHierarchy = availablePersistences.filter(p => p._shouldAllowMigration);
            // If the persistence does _not_ allow migration, just finish off here
            if (!selectedPersistence._shouldAllowMigration ||
                !migrationHierarchy.length) {
                return new PersistenceUserManager(selectedPersistence, auth, userKey);
            }
            selectedPersistence = migrationHierarchy[0];
            if (userToMigrate) {
                // This normally shouldn't throw since chosenPersistence.isAvailable() is true, but if it does
                // we'll just let it bubble to surface the error.
                await selectedPersistence._set(key, userToMigrate.toJSON());
            }
            // Attempt to clear the key in other persistences but ignore errors. This helps prevent issues
            // such as users getting stuck with a previous account after signing out and refreshing the tab.
            await Promise.all(persistenceHierarchy.map(async (persistence) => {
                if (persistence !== selectedPersistence) {
                    try {
                        await persistence._remove(key);
                    }
                    catch (_a) { }
                }
            }));
            return new PersistenceUserManager(selectedPersistence, auth, userKey);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Determine the browser for the purposes of reporting usage to the API
     */
    function _getBrowserName(userAgent) {
        const ua = userAgent.toLowerCase();
        if (ua.includes('opera/') || ua.includes('opr/') || ua.includes('opios/')) {
            return "Opera" /* OPERA */;
        }
        else if (_isIEMobile(ua)) {
            // Windows phone IEMobile browser.
            return "IEMobile" /* IEMOBILE */;
        }
        else if (ua.includes('msie') || ua.includes('trident/')) {
            return "IE" /* IE */;
        }
        else if (ua.includes('edge/')) {
            return "Edge" /* EDGE */;
        }
        else if (_isFirefox(ua)) {
            return "Firefox" /* FIREFOX */;
        }
        else if (ua.includes('silk/')) {
            return "Silk" /* SILK */;
        }
        else if (_isBlackBerry(ua)) {
            // Blackberry browser.
            return "Blackberry" /* BLACKBERRY */;
        }
        else if (_isWebOS(ua)) {
            // WebOS default browser.
            return "Webos" /* WEBOS */;
        }
        else if (_isSafari(ua)) {
            return "Safari" /* SAFARI */;
        }
        else if ((ua.includes('chrome/') || _isChromeIOS(ua)) &&
            !ua.includes('edge/')) {
            return "Chrome" /* CHROME */;
        }
        else if (_isAndroid(ua)) {
            // Android stock browser.
            return "Android" /* ANDROID */;
        }
        else {
            // Most modern browsers have name/version at end of user agent string.
            const re = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/;
            const matches = userAgent.match(re);
            if ((matches === null || matches === void 0 ? void 0 : matches.length) === 2) {
                return matches[1];
            }
        }
        return "Other" /* OTHER */;
    }
    function _isFirefox(ua = getUA()) {
        return /firefox\//i.test(ua);
    }
    function _isSafari(userAgent = getUA()) {
        const ua = userAgent.toLowerCase();
        return (ua.includes('safari/') &&
            !ua.includes('chrome/') &&
            !ua.includes('crios/') &&
            !ua.includes('android'));
    }
    function _isChromeIOS(ua = getUA()) {
        return /crios\//i.test(ua);
    }
    function _isIEMobile(ua = getUA()) {
        return /iemobile/i.test(ua);
    }
    function _isAndroid(ua = getUA()) {
        return /android/i.test(ua);
    }
    function _isBlackBerry(ua = getUA()) {
        return /blackberry/i.test(ua);
    }
    function _isWebOS(ua = getUA()) {
        return /webos/i.test(ua);
    }
    function _isIOS(ua = getUA()) {
        return /iphone|ipad|ipod/i.test(ua);
    }
    function _isIOSStandalone(ua = getUA()) {
        var _a;
        return _isIOS(ua) && !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.standalone);
    }
    function _isIE10() {
        return isIE() && document.documentMode === 10;
    }
    function _isMobileBrowser(ua = getUA()) {
        // TODO: implement getBrowserName equivalent for OS.
        return (_isIOS(ua) ||
            _isAndroid(ua) ||
            _isWebOS(ua) ||
            _isBlackBerry(ua) ||
            /windows phone/i.test(ua) ||
            _isIEMobile(ua));
    }
    function _isIframe() {
        try {
            // Check that the current window is not the top window.
            // If so, return true.
            return !!(window && window !== window.top);
        }
        catch (e) {
            return false;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /*
     * Determine the SDK version string
     */
    function _getClientVersion(clientPlatform, frameworks = []) {
        let reportedPlatform;
        switch (clientPlatform) {
            case "Browser" /* BROWSER */:
                // In a browser environment, report the browser name.
                reportedPlatform = _getBrowserName(getUA());
                break;
            case "Worker" /* WORKER */:
                // Technically a worker runs from a browser but we need to differentiate a
                // worker from a browser.
                // For example: Chrome-Worker/JsCore/4.9.1/FirebaseCore-web.
                reportedPlatform = `${_getBrowserName(getUA())}-${clientPlatform}`;
                break;
            default:
                reportedPlatform = clientPlatform;
        }
        const reportedFrameworks = frameworks.length
            ? frameworks.join(',')
            : 'FirebaseCore-web'; /* default value if no other framework is used */
        return `${reportedPlatform}/${"JsCore" /* CORE */}/${SDK_VERSION}/${reportedFrameworks}`;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class AuthImpl {
        constructor(app, config) {
            this.app = app;
            this.config = config;
            this.currentUser = null;
            this.emulatorConfig = null;
            this.operations = Promise.resolve();
            this.authStateSubscription = new Subscription(this);
            this.idTokenSubscription = new Subscription(this);
            this.redirectUser = null;
            this.isProactiveRefreshEnabled = false;
            // Any network calls will set this to true and prevent subsequent emulator
            // initialization
            this._canInitEmulator = true;
            this._isInitialized = false;
            this._deleted = false;
            this._initializationPromise = null;
            this._popupRedirectResolver = null;
            this._errorFactory = _DEFAULT_AUTH_ERROR_FACTORY;
            // Tracks the last notified UID for state change listeners to prevent
            // repeated calls to the callbacks. Undefined means it's never been
            // called, whereas null means it's been called with a signed out user
            this.lastNotifiedUid = undefined;
            this.languageCode = null;
            this.tenantId = null;
            this.settings = { appVerificationDisabledForTesting: false };
            this.frameworks = [];
            this.name = app.name;
            this.clientVersion = config.sdkClientVersion;
        }
        _initializeWithPersistence(persistenceHierarchy, popupRedirectResolver) {
            if (popupRedirectResolver) {
                this._popupRedirectResolver = _getInstance(popupRedirectResolver);
            }
            // Have to check for app deletion throughout initialization (after each
            // promise resolution)
            this._initializationPromise = this.queue(async () => {
                var _a, _b;
                if (this._deleted) {
                    return;
                }
                this.persistenceManager = await PersistenceUserManager.create(this, persistenceHierarchy);
                if (this._deleted) {
                    return;
                }
                // Initialize the resolver early if necessary (only applicable to web:
                // this will cause the iframe to load immediately in certain cases)
                if ((_a = this._popupRedirectResolver) === null || _a === void 0 ? void 0 : _a._shouldInitProactively) {
                    // If this fails, don't halt auth loading
                    try {
                        await this._popupRedirectResolver._initialize(this);
                    }
                    catch (e) { /* Ignore the error */ }
                }
                await this.initializeCurrentUser(popupRedirectResolver);
                this.lastNotifiedUid = ((_b = this.currentUser) === null || _b === void 0 ? void 0 : _b.uid) || null;
                if (this._deleted) {
                    return;
                }
                this._isInitialized = true;
            });
            return this._initializationPromise;
        }
        /**
         * If the persistence is changed in another window, the user manager will let us know
         */
        async _onStorageEvent() {
            if (this._deleted) {
                return;
            }
            const user = await this.assertedPersistence.getCurrentUser();
            if (!this.currentUser && !user) {
                // No change, do nothing (was signed out and remained signed out).
                return;
            }
            // If the same user is to be synchronized.
            if (this.currentUser && user && this.currentUser.uid === user.uid) {
                // Data update, simply copy data changes.
                this._currentUser._assign(user);
                // If tokens changed from previous user tokens, this will trigger
                // notifyAuthListeners_.
                await this.currentUser.getIdToken();
                return;
            }
            // Update current Auth state. Either a new login or logout.
            await this._updateCurrentUser(user);
        }
        async initializeCurrentUser(popupRedirectResolver) {
            var _a;
            // First check to see if we have a pending redirect event.
            let storedUser = (await this.assertedPersistence.getCurrentUser());
            if (popupRedirectResolver && this.config.authDomain) {
                await this.getOrInitRedirectPersistenceManager();
                const redirectUserEventId = (_a = this.redirectUser) === null || _a === void 0 ? void 0 : _a._redirectEventId;
                const storedUserEventId = storedUser === null || storedUser === void 0 ? void 0 : storedUser._redirectEventId;
                const result = await this.tryRedirectSignIn(popupRedirectResolver);
                // If the stored user (i.e. the old "currentUser") has a redirectId that
                // matches the redirect user, then we want to initially sign in with the
                // new user object from result.
                // TODO(samgho): More thoroughly test all of this
                if ((!redirectUserEventId || redirectUserEventId === storedUserEventId) &&
                    (result === null || result === void 0 ? void 0 : result.user)) {
                    storedUser = result.user;
                }
            }
            // If no user in persistence, there is no current user. Set to null.
            if (!storedUser) {
                return this.directlySetCurrentUser(null);
            }
            if (!storedUser._redirectEventId) {
                // This isn't a redirect user, we can reload and bail
                // This will also catch the redirected user, if available, as that method
                // strips the _redirectEventId
                return this.reloadAndSetCurrentUserOrClear(storedUser);
            }
            _assert(this._popupRedirectResolver, this, "argument-error" /* ARGUMENT_ERROR */);
            await this.getOrInitRedirectPersistenceManager();
            // If the redirect user's event ID matches the current user's event ID,
            // DO NOT reload the current user, otherwise they'll be cleared from storage.
            // This is important for the reauthenticateWithRedirect() flow.
            if (this.redirectUser &&
                this.redirectUser._redirectEventId === storedUser._redirectEventId) {
                return this.directlySetCurrentUser(storedUser);
            }
            return this.reloadAndSetCurrentUserOrClear(storedUser);
        }
        async tryRedirectSignIn(redirectResolver) {
            // The redirect user needs to be checked (and signed in if available)
            // during auth initialization. All of the normal sign in and link/reauth
            // flows call back into auth and push things onto the promise queue. We
            // need to await the result of the redirect sign in *inside the promise
            // queue*. This presents a problem: we run into deadlock. See:
            //    ???> [Initialization] ??????????????????
            //    ???> [<other queue tasks>] ???
            //    ?????? [getRedirectResult] <??????
            //    where [] are tasks on the queue and arrows denote awaits
            // Initialization will never complete because it's waiting on something
            // that's waiting for initialization to complete!
            //
            // Instead, this method calls getRedirectResult() (stored in
            // _completeRedirectFn) with an optional parameter that instructs all of
            // the underlying auth operations to skip anything that mutates auth state.
            let result = null;
            try {
                // We know this._popupRedirectResolver is set since redirectResolver
                // is passed in. The _completeRedirectFn expects the unwrapped extern.
                result = await this._popupRedirectResolver._completeRedirectFn(this, redirectResolver, true);
            }
            catch (e) {
                // Swallow any errors here; the code can retrieve them in
                // getRedirectResult().
                await this._setRedirectUser(null);
            }
            return result;
        }
        async reloadAndSetCurrentUserOrClear(user) {
            try {
                await _reloadWithoutSaving(user);
            }
            catch (e) {
                if (e.code !== `auth/${"network-request-failed" /* NETWORK_REQUEST_FAILED */}`) {
                    // Something's wrong with the user's token. Log them out and remove
                    // them from storage
                    return this.directlySetCurrentUser(null);
                }
            }
            return this.directlySetCurrentUser(user);
        }
        useDeviceLanguage() {
            this.languageCode = _getUserLanguage();
        }
        async _delete() {
            this._deleted = true;
        }
        async updateCurrentUser(userExtern) {
            // The public updateCurrentUser method needs to make a copy of the user,
            // and also check that the project matches
            const user = userExtern
                ? getModularInstance(userExtern)
                : null;
            if (user) {
                _assert(user.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token" /* INVALID_AUTH */);
            }
            return this._updateCurrentUser(user && user._clone(this));
        }
        async _updateCurrentUser(user) {
            if (this._deleted) {
                return;
            }
            if (user) {
                _assert(this.tenantId === user.tenantId, this, "tenant-id-mismatch" /* TENANT_ID_MISMATCH */);
            }
            return this.queue(async () => {
                await this.directlySetCurrentUser(user);
                this.notifyAuthListeners();
            });
        }
        async signOut() {
            // Clear the redirect user when signOut is called
            if (this.redirectPersistenceManager || this._popupRedirectResolver) {
                await this._setRedirectUser(null);
            }
            return this._updateCurrentUser(null);
        }
        setPersistence(persistence) {
            return this.queue(async () => {
                await this.assertedPersistence.setPersistence(_getInstance(persistence));
            });
        }
        _getPersistence() {
            return this.assertedPersistence.persistence.type;
        }
        _updateErrorMap(errorMap) {
            this._errorFactory = new ErrorFactory('auth', 'Firebase', errorMap());
        }
        onAuthStateChanged(nextOrObserver, error, completed) {
            return this.registerStateListener(this.authStateSubscription, nextOrObserver, error, completed);
        }
        onIdTokenChanged(nextOrObserver, error, completed) {
            return this.registerStateListener(this.idTokenSubscription, nextOrObserver, error, completed);
        }
        toJSON() {
            var _a;
            return {
                apiKey: this.config.apiKey,
                authDomain: this.config.authDomain,
                appName: this.name,
                currentUser: (_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.toJSON()
            };
        }
        async _setRedirectUser(user, popupRedirectResolver) {
            const redirectManager = await this.getOrInitRedirectPersistenceManager(popupRedirectResolver);
            return user === null
                ? redirectManager.removeCurrentUser()
                : redirectManager.setCurrentUser(user);
        }
        async getOrInitRedirectPersistenceManager(popupRedirectResolver) {
            if (!this.redirectPersistenceManager) {
                const resolver = (popupRedirectResolver && _getInstance(popupRedirectResolver)) ||
                    this._popupRedirectResolver;
                _assert(resolver, this, "argument-error" /* ARGUMENT_ERROR */);
                this.redirectPersistenceManager = await PersistenceUserManager.create(this, [_getInstance(resolver._redirectPersistence)], "redirectUser" /* REDIRECT_USER */);
                this.redirectUser =
                    await this.redirectPersistenceManager.getCurrentUser();
            }
            return this.redirectPersistenceManager;
        }
        async _redirectUserForId(id) {
            var _a, _b;
            // Make sure we've cleared any pending persistence actions if we're not in
            // the initializer
            if (this._isInitialized) {
                await this.queue(async () => { });
            }
            if (((_a = this._currentUser) === null || _a === void 0 ? void 0 : _a._redirectEventId) === id) {
                return this._currentUser;
            }
            if (((_b = this.redirectUser) === null || _b === void 0 ? void 0 : _b._redirectEventId) === id) {
                return this.redirectUser;
            }
            return null;
        }
        async _persistUserIfCurrent(user) {
            if (user === this.currentUser) {
                return this.queue(async () => this.directlySetCurrentUser(user));
            }
        }
        /** Notifies listeners only if the user is current */
        _notifyListenersIfCurrent(user) {
            if (user === this.currentUser) {
                this.notifyAuthListeners();
            }
        }
        _key() {
            return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
        }
        _startProactiveRefresh() {
            this.isProactiveRefreshEnabled = true;
            if (this.currentUser) {
                this._currentUser._startProactiveRefresh();
            }
        }
        _stopProactiveRefresh() {
            this.isProactiveRefreshEnabled = false;
            if (this.currentUser) {
                this._currentUser._stopProactiveRefresh();
            }
        }
        /** Returns the current user cast as the internal type */
        get _currentUser() {
            return this.currentUser;
        }
        notifyAuthListeners() {
            var _a, _b;
            if (!this._isInitialized) {
                return;
            }
            this.idTokenSubscription.next(this.currentUser);
            const currentUid = (_b = (_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : null;
            if (this.lastNotifiedUid !== currentUid) {
                this.lastNotifiedUid = currentUid;
                this.authStateSubscription.next(this.currentUser);
            }
        }
        registerStateListener(subscription, nextOrObserver, error, completed) {
            if (this._deleted) {
                return () => { };
            }
            const cb = typeof nextOrObserver === 'function'
                ? nextOrObserver
                : nextOrObserver.next.bind(nextOrObserver);
            const promise = this._isInitialized
                ? Promise.resolve()
                : this._initializationPromise;
            _assert(promise, this, "internal-error" /* INTERNAL_ERROR */);
            // The callback needs to be called asynchronously per the spec.
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            promise.then(() => cb(this.currentUser));
            if (typeof nextOrObserver === 'function') {
                return subscription.addObserver(nextOrObserver, error, completed);
            }
            else {
                return subscription.addObserver(nextOrObserver);
            }
        }
        /**
         * Unprotected (from race conditions) method to set the current user. This
         * should only be called from within a queued callback. This is necessary
         * because the queue shouldn't rely on another queued callback.
         */
        async directlySetCurrentUser(user) {
            if (this.currentUser && this.currentUser !== user) {
                this._currentUser._stopProactiveRefresh();
                if (user && this.isProactiveRefreshEnabled) {
                    user._startProactiveRefresh();
                }
            }
            this.currentUser = user;
            if (user) {
                await this.assertedPersistence.setCurrentUser(user);
            }
            else {
                await this.assertedPersistence.removeCurrentUser();
            }
        }
        queue(action) {
            // In case something errors, the callback still should be called in order
            // to keep the promise chain alive
            this.operations = this.operations.then(action, action);
            return this.operations;
        }
        get assertedPersistence() {
            _assert(this.persistenceManager, this, "internal-error" /* INTERNAL_ERROR */);
            return this.persistenceManager;
        }
        _logFramework(framework) {
            if (!framework || this.frameworks.includes(framework)) {
                return;
            }
            this.frameworks.push(framework);
            // Sort alphabetically so that "FirebaseCore-web,FirebaseUI-web" and
            // "FirebaseUI-web,FirebaseCore-web" aren't viewed as different.
            this.frameworks.sort();
            this.clientVersion = _getClientVersion(this.config.clientPlatform, this._getFrameworks());
        }
        _getFrameworks() {
            return this.frameworks;
        }
        async _getAdditionalHeaders() {
            // Additional headers on every request
            const headers = {
                ["X-Client-Version" /* X_CLIENT_VERSION */]: this.clientVersion,
            };
            if (this.app.options.appId) {
                headers["X-Firebase-gmpid" /* X_FIREBASE_GMPID */] = this.app.options.appId;
            }
            return headers;
        }
    }
    /**
     * Method to be used to cast down to our private implmentation of Auth.
     * It will also handle unwrapping from the compat type if necessary
     *
     * @param auth Auth object passed in from developer
     */
    function _castAuth(auth) {
        return getModularInstance(auth);
    }
    /** Helper class to wrap subscriber logic */
    class Subscription {
        constructor(auth) {
            this.auth = auth;
            this.observer = null;
            this.addObserver = createSubscribe(observer => (this.observer = observer));
        }
        get next() {
            _assert(this.observer, this.auth, "internal-error" /* INTERNAL_ERROR */);
            return this.observer.next.bind(this.observer);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Interface that represents the credentials returned by an {@link AuthProvider}.
     *
     * @remarks
     * Implementations specify the details about each auth provider's credential requirements.
     *
     * @public
     */
    class AuthCredential {
        /** @internal */
        constructor(
        /**
         * The authentication provider ID for the credential.
         *
         * @remarks
         * For example, 'facebook.com', or 'google.com'.
         */
        providerId, 
        /**
         * The authentication sign in method for the credential.
         *
         * @remarks
         * For example, {@link SignInMethod}.EMAIL_PASSWORD, or
         * {@link SignInMethod}.EMAIL_LINK. This corresponds to the sign-in method
         * identifier as returned in {@link fetchSignInMethodsForEmail}.
         */
        signInMethod) {
            this.providerId = providerId;
            this.signInMethod = signInMethod;
        }
        /**
         * Returns a JSON-serializable representation of this object.
         *
         * @returns a JSON-serializable representation of this object.
         */
        toJSON() {
            return debugFail('not implemented');
        }
        /** @internal */
        _getIdTokenResponse(_auth) {
            return debugFail('not implemented');
        }
        /** @internal */
        _linkToIdToken(_auth, _idToken) {
            return debugFail('not implemented');
        }
        /** @internal */
        _getReauthenticationResolver(_auth) {
            return debugFail('not implemented');
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    async function signInWithIdp(auth, request) {
        return _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithIdp" /* SIGN_IN_WITH_IDP */, _addTidIfNecessary(auth, request));
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const IDP_REQUEST_URI$1 = 'http://localhost';
    /**
     * Represents the OAuth credentials returned by an {@link OAuthProvider}.
     *
     * @remarks
     * Implementations specify the details about each auth provider's credential requirements.
     *
     * @public
     */
    class OAuthCredential extends AuthCredential {
        constructor() {
            super(...arguments);
            this.pendingToken = null;
        }
        /** @internal */
        static _fromParams(params) {
            const cred = new OAuthCredential(params.providerId, params.signInMethod);
            if (params.idToken || params.accessToken) {
                // OAuth 2 and either ID token or access token.
                if (params.idToken) {
                    cred.idToken = params.idToken;
                }
                if (params.accessToken) {
                    cred.accessToken = params.accessToken;
                }
                // Add nonce if available and no pendingToken is present.
                if (params.nonce && !params.pendingToken) {
                    cred.nonce = params.nonce;
                }
                if (params.pendingToken) {
                    cred.pendingToken = params.pendingToken;
                }
            }
            else if (params.oauthToken && params.oauthTokenSecret) {
                // OAuth 1 and OAuth token with token secret
                cred.accessToken = params.oauthToken;
                cred.secret = params.oauthTokenSecret;
            }
            else {
                _fail("argument-error" /* ARGUMENT_ERROR */);
            }
            return cred;
        }
        /** {@inheritdoc AuthCredential.toJSON}  */
        toJSON() {
            return {
                idToken: this.idToken,
                accessToken: this.accessToken,
                secret: this.secret,
                nonce: this.nonce,
                pendingToken: this.pendingToken,
                providerId: this.providerId,
                signInMethod: this.signInMethod
            };
        }
        /**
         * Static method to deserialize a JSON representation of an object into an
         * {@link  AuthCredential}.
         *
         * @param json - Input can be either Object or the stringified representation of the object.
         * When string is provided, JSON.parse would be called first.
         *
         * @returns If the JSON input does not represent an {@link  AuthCredential}, null is returned.
         */
        static fromJSON(json) {
            const obj = typeof json === 'string' ? JSON.parse(json) : json;
            const { providerId, signInMethod } = obj, rest = __rest(obj, ["providerId", "signInMethod"]);
            if (!providerId || !signInMethod) {
                return null;
            }
            const cred = new OAuthCredential(providerId, signInMethod);
            cred.idToken = rest.idToken || undefined;
            cred.accessToken = rest.accessToken || undefined;
            cred.secret = rest.secret;
            cred.nonce = rest.nonce;
            cred.pendingToken = rest.pendingToken || null;
            return cred;
        }
        /** @internal */
        _getIdTokenResponse(auth) {
            const request = this.buildRequest();
            return signInWithIdp(auth, request);
        }
        /** @internal */
        _linkToIdToken(auth, idToken) {
            const request = this.buildRequest();
            request.idToken = idToken;
            return signInWithIdp(auth, request);
        }
        /** @internal */
        _getReauthenticationResolver(auth) {
            const request = this.buildRequest();
            request.autoCreate = false;
            return signInWithIdp(auth, request);
        }
        buildRequest() {
            const request = {
                requestUri: IDP_REQUEST_URI$1,
                returnSecureToken: true
            };
            if (this.pendingToken) {
                request.pendingToken = this.pendingToken;
            }
            else {
                const postBody = {};
                if (this.idToken) {
                    postBody['id_token'] = this.idToken;
                }
                if (this.accessToken) {
                    postBody['access_token'] = this.accessToken;
                }
                if (this.secret) {
                    postBody['oauth_token_secret'] = this.secret;
                }
                postBody['providerId'] = this.providerId;
                if (this.nonce && !this.pendingToken) {
                    postBody['nonce'] = this.nonce;
                }
                request.postBody = querystring(postBody);
            }
            return request;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The base class for all Federated providers (OAuth (including OIDC), SAML).
     *
     * This class is not meant to be instantiated directly.
     *
     * @public
     */
    class FederatedAuthProvider {
        /**
         * Constructor for generic OAuth providers.
         *
         * @param providerId - Provider for which credentials should be generated.
         */
        constructor(providerId) {
            this.providerId = providerId;
            /** @internal */
            this.defaultLanguageCode = null;
            /** @internal */
            this.customParameters = {};
        }
        /**
         * Set the language gode.
         *
         * @param languageCode - language code
         */
        setDefaultLanguage(languageCode) {
            this.defaultLanguageCode = languageCode;
        }
        /**
         * Sets the OAuth custom parameters to pass in an OAuth request for popup and redirect sign-in
         * operations.
         *
         * @remarks
         * For a detailed list, check the reserved required OAuth 2.0 parameters such as `client_id`,
         * `redirect_uri`, `scope`, `response_type`, and `state` are not allowed and will be ignored.
         *
         * @param customOAuthParameters - The custom OAuth parameters to pass in the OAuth request.
         */
        setCustomParameters(customOAuthParameters) {
            this.customParameters = customOAuthParameters;
            return this;
        }
        /**
         * Retrieve the current list of {@link CustomParameters}.
         */
        getCustomParameters() {
            return this.customParameters;
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Common code to all OAuth providers. This is separate from the
     * {@link OAuthProvider} so that child providers (like
     * {@link GoogleAuthProvider}) don't inherit the `credential` instance method.
     * Instead, they rely on a static `credential` method.
     */
    class BaseOAuthProvider extends FederatedAuthProvider {
        constructor() {
            super(...arguments);
            /** @internal */
            this.scopes = [];
        }
        /**
         * Add an OAuth scope to the credential.
         *
         * @param scope - Provider OAuth scope to add.
         */
        addScope(scope) {
            // If not already added, add scope to list.
            if (!this.scopes.includes(scope)) {
                this.scopes.push(scope);
            }
            return this;
        }
        /**
         * Retrieve the current list of OAuth scopes.
         */
        getScopes() {
            return [...this.scopes];
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.FACEBOOK.
     *
     * @example
     * ```javascript
     * // Sign in using a redirect.
     * const provider = new FacebookAuthProvider();
     * // Start a sign in process for an unauthenticated user.
     * provider.addScope('user_birthday');
     * await signInWithRedirect(auth, provider);
     * // This will trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * if (result) {
     *   // This is the signed-in user
     *   const user = result.user;
     *   // This gives you a Facebook Access Token.
     *   const credential = FacebookAuthProvider.credentialFromResult(result);
     *   const token = credential.accessToken;
     * }
     * ```
     *
     * @example
     * ```javascript
     * // Sign in using a popup.
     * const provider = new FacebookAuthProvider();
     * provider.addScope('user_birthday');
     * const result = await signInWithPopup(auth, provider);
     *
     * // The signed-in user info.
     * const user = result.user;
     * // This gives you a Facebook Access Token.
     * const credential = FacebookAuthProvider.credentialFromResult(result);
     * const token = credential.accessToken;
     * ```
     *
     * @public
     */
    class FacebookAuthProvider extends BaseOAuthProvider {
        constructor() {
            super("facebook.com" /* FACEBOOK */);
        }
        /**
         * Creates a credential for Facebook.
         *
         * @example
         * ```javascript
         * // `event` from the Facebook auth.authResponseChange callback.
         * const credential = FacebookAuthProvider.credential(event.authResponse.accessToken);
         * const result = await signInWithCredential(credential);
         * ```
         *
         * @param accessToken - Facebook access token.
         */
        static credential(accessToken) {
            return OAuthCredential._fromParams({
                providerId: FacebookAuthProvider.PROVIDER_ID,
                signInMethod: FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
                accessToken
            });
        }
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
         *
         * @param userCredential - The user credential.
         */
        static credentialFromResult(userCredential) {
            return FacebookAuthProvider.credentialFromTaggedObject(userCredential);
        }
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
         * thrown during a sign-in, link, or reauthenticate operation.
         *
         * @param userCredential - The user credential.
         */
        static credentialFromError(error) {
            return FacebookAuthProvider.credentialFromTaggedObject((error.customData || {}));
        }
        static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
            if (!tokenResponse || !('oauthAccessToken' in tokenResponse)) {
                return null;
            }
            if (!tokenResponse.oauthAccessToken) {
                return null;
            }
            try {
                return FacebookAuthProvider.credential(tokenResponse.oauthAccessToken);
            }
            catch (_a) {
                return null;
            }
        }
    }
    /** Always set to {@link SignInMethod}.FACEBOOK. */
    FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD = "facebook.com" /* FACEBOOK */;
    /** Always set to {@link ProviderId}.FACEBOOK. */
    FacebookAuthProvider.PROVIDER_ID = "facebook.com" /* FACEBOOK */;

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provider for generating an an {@link OAuthCredential} for {@link ProviderId}.GOOGLE.
     *
     * @example
     * ```javascript
     * // Sign in using a redirect.
     * const provider = new GoogleAuthProvider();
     * // Start a sign in process for an unauthenticated user.
     * provider.addScope('profile');
     * provider.addScope('email');
     * await signInWithRedirect(auth, provider);
     * // This will trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * if (result) {
     *   // This is the signed-in user
     *   const user = result.user;
     *   // This gives you a Google Access Token.
     *   const credential = GoogleAuthProvider.credentialFromResult(result);
     *   const token = credential.accessToken;
     * }
     * ```
     *
     * @example
     * ```javascript
     * // Sign in using a popup.
     * const provider = new GoogleAuthProvider();
     * provider.addScope('profile');
     * provider.addScope('email');
     * const result = await signInWithPopup(auth, provider);
     *
     * // The signed-in user info.
     * const user = result.user;
     * // This gives you a Google Access Token.
     * const credential = GoogleAuthProvider.credentialFromResult(result);
     * const token = credential.accessToken;
     * ```
     *
     * @public
     */
    class GoogleAuthProvider extends BaseOAuthProvider {
        constructor() {
            super("google.com" /* GOOGLE */);
            this.addScope('profile');
        }
        /**
         * Creates a credential for Google. At least one of ID token and access token is required.
         *
         * @example
         * ```javascript
         * // \`googleUser\` from the onsuccess Google Sign In callback.
         * const credential = GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
         * const result = await signInWithCredential(credential);
         * ```
         *
         * @param idToken - Google ID token.
         * @param accessToken - Google access token.
         */
        static credential(idToken, accessToken) {
            return OAuthCredential._fromParams({
                providerId: GoogleAuthProvider.PROVIDER_ID,
                signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
                idToken,
                accessToken
            });
        }
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
         *
         * @param userCredential - The user credential.
         */
        static credentialFromResult(userCredential) {
            return GoogleAuthProvider.credentialFromTaggedObject(userCredential);
        }
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
         * thrown during a sign-in, link, or reauthenticate operation.
         *
         * @param userCredential - The user credential.
         */
        static credentialFromError(error) {
            return GoogleAuthProvider.credentialFromTaggedObject((error.customData || {}));
        }
        static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
            if (!tokenResponse) {
                return null;
            }
            const { oauthIdToken, oauthAccessToken } = tokenResponse;
            if (!oauthIdToken && !oauthAccessToken) {
                // This could be an oauth 1 credential or a phone credential
                return null;
            }
            try {
                return GoogleAuthProvider.credential(oauthIdToken, oauthAccessToken);
            }
            catch (_a) {
                return null;
            }
        }
    }
    /** Always set to {@link SignInMethod}.GOOGLE. */
    GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD = "google.com" /* GOOGLE */;
    /** Always set to {@link ProviderId}.GOOGLE. */
    GoogleAuthProvider.PROVIDER_ID = "google.com" /* GOOGLE */;

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.GITHUB.
     *
     * @remarks
     * GitHub requires an OAuth 2.0 redirect, so you can either handle the redirect directly, or use
     * the {@link signInWithPopup} handler:
     *
     * @example
     * ```javascript
     * // Sign in using a redirect.
     * const provider = new GithubAuthProvider();
     * // Start a sign in process for an unauthenticated user.
     * provider.addScope('repo');
     * await signInWithRedirect(auth, provider);
     * // This will trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * if (result) {
     *   // This is the signed-in user
     *   const user = result.user;
     *   // This gives you a Github Access Token.
     *   const credential = GithubAuthProvider.credentialFromResult(result);
     *   const token = credential.accessToken;
     * }
     * ```
     *
     * @example
     * ```javascript
     * // Sign in using a popup.
     * const provider = new GithubAuthProvider();
     * provider.addScope('repo');
     * const result = await signInWithPopup(auth, provider);
     *
     * // The signed-in user info.
     * const user = result.user;
     * // This gives you a Github Access Token.
     * const credential = GithubAuthProvider.credentialFromResult(result);
     * const token = credential.accessToken;
     * ```
     * @public
     */
    class GithubAuthProvider extends BaseOAuthProvider {
        constructor() {
            super("github.com" /* GITHUB */);
        }
        /**
         * Creates a credential for Github.
         *
         * @param accessToken - Github access token.
         */
        static credential(accessToken) {
            return OAuthCredential._fromParams({
                providerId: GithubAuthProvider.PROVIDER_ID,
                signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
                accessToken
            });
        }
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
         *
         * @param userCredential - The user credential.
         */
        static credentialFromResult(userCredential) {
            return GithubAuthProvider.credentialFromTaggedObject(userCredential);
        }
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
         * thrown during a sign-in, link, or reauthenticate operation.
         *
         * @param userCredential - The user credential.
         */
        static credentialFromError(error) {
            return GithubAuthProvider.credentialFromTaggedObject((error.customData || {}));
        }
        static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
            if (!tokenResponse || !('oauthAccessToken' in tokenResponse)) {
                return null;
            }
            if (!tokenResponse.oauthAccessToken) {
                return null;
            }
            try {
                return GithubAuthProvider.credential(tokenResponse.oauthAccessToken);
            }
            catch (_a) {
                return null;
            }
        }
    }
    /** Always set to {@link SignInMethod}.GITHUB. */
    GithubAuthProvider.GITHUB_SIGN_IN_METHOD = "github.com" /* GITHUB */;
    /** Always set to {@link ProviderId}.GITHUB. */
    GithubAuthProvider.PROVIDER_ID = "github.com" /* GITHUB */;

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.TWITTER.
     *
     * @example
     * ```javascript
     * // Sign in using a redirect.
     * const provider = new TwitterAuthProvider();
     * // Start a sign in process for an unauthenticated user.
     * await signInWithRedirect(auth, provider);
     * // This will trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * if (result) {
     *   // This is the signed-in user
     *   const user = result.user;
     *   // This gives you a Twitter Access Token and Secret.
     *   const credential = TwitterAuthProvider.credentialFromResult(result);
     *   const token = credential.accessToken;
     *   const secret = credential.secret;
     * }
     * ```
     *
     * @example
     * ```javascript
     * // Sign in using a popup.
     * const provider = new TwitterAuthProvider();
     * const result = await signInWithPopup(auth, provider);
     *
     * // The signed-in user info.
     * const user = result.user;
     * // This gives you a Twitter Access Token and Secret.
     * const credential = TwitterAuthProvider.credentialFromResult(result);
     * const token = credential.accessToken;
     * const secret = credential.secret;
     * ```
     *
     * @public
     */
    class TwitterAuthProvider extends BaseOAuthProvider {
        constructor() {
            super("twitter.com" /* TWITTER */);
        }
        /**
         * Creates a credential for Twitter.
         *
         * @param token - Twitter access token.
         * @param secret - Twitter secret.
         */
        static credential(token, secret) {
            return OAuthCredential._fromParams({
                providerId: TwitterAuthProvider.PROVIDER_ID,
                signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
                oauthToken: token,
                oauthTokenSecret: secret
            });
        }
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
         *
         * @param userCredential - The user credential.
         */
        static credentialFromResult(userCredential) {
            return TwitterAuthProvider.credentialFromTaggedObject(userCredential);
        }
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
         * thrown during a sign-in, link, or reauthenticate operation.
         *
         * @param userCredential - The user credential.
         */
        static credentialFromError(error) {
            return TwitterAuthProvider.credentialFromTaggedObject((error.customData || {}));
        }
        static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
            if (!tokenResponse) {
                return null;
            }
            const { oauthAccessToken, oauthTokenSecret } = tokenResponse;
            if (!oauthAccessToken || !oauthTokenSecret) {
                return null;
            }
            try {
                return TwitterAuthProvider.credential(oauthAccessToken, oauthTokenSecret);
            }
            catch (_a) {
                return null;
            }
        }
    }
    /** Always set to {@link SignInMethod}.TWITTER. */
    TwitterAuthProvider.TWITTER_SIGN_IN_METHOD = "twitter.com" /* TWITTER */;
    /** Always set to {@link ProviderId}.TWITTER. */
    TwitterAuthProvider.PROVIDER_ID = "twitter.com" /* TWITTER */;

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class UserCredentialImpl {
        constructor(params) {
            this.user = params.user;
            this.providerId = params.providerId;
            this._tokenResponse = params._tokenResponse;
            this.operationType = params.operationType;
        }
        static async _fromIdTokenResponse(auth, operationType, idTokenResponse, isAnonymous = false) {
            const user = await UserImpl._fromIdTokenResponse(auth, idTokenResponse, isAnonymous);
            const providerId = providerIdForResponse(idTokenResponse);
            const userCred = new UserCredentialImpl({
                user,
                providerId,
                _tokenResponse: idTokenResponse,
                operationType
            });
            return userCred;
        }
        static async _forOperation(user, operationType, response) {
            await user._updateTokensIfNecessary(response, /* reload */ true);
            const providerId = providerIdForResponse(response);
            return new UserCredentialImpl({
                user,
                providerId,
                _tokenResponse: response,
                operationType
            });
        }
    }
    function providerIdForResponse(response) {
        if (response.providerId) {
            return response.providerId;
        }
        if ('phoneNumber' in response) {
            return "phone" /* PHONE */;
        }
        return null;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class MultiFactorError extends FirebaseError {
        constructor(auth, error, operationType, user) {
            var _a;
            super(error.code, error.message);
            this.operationType = operationType;
            this.user = user;
            // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
            Object.setPrototypeOf(this, MultiFactorError.prototype);
            this.customData = {
                appName: auth.name,
                tenantId: (_a = auth.tenantId) !== null && _a !== void 0 ? _a : undefined,
                _serverResponse: error.customData._serverResponse,
                operationType,
            };
        }
        static _fromErrorAndOperation(auth, error, operationType, user) {
            return new MultiFactorError(auth, error, operationType, user);
        }
    }
    function _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user) {
        const idTokenProvider = operationType === "reauthenticate" /* REAUTHENTICATE */
            ? credential._getReauthenticationResolver(auth)
            : credential._getIdTokenResponse(auth);
        return idTokenProvider.catch(error => {
            if (error.code === `auth/${"multi-factor-auth-required" /* MFA_REQUIRED */}`) {
                throw MultiFactorError._fromErrorAndOperation(auth, error, operationType, user);
            }
            throw error;
        });
    }
    async function _link$1(user, credential, bypassAuthState = false) {
        const response = await _logoutIfInvalidated(user, credential._linkToIdToken(user.auth, await user.getIdToken()), bypassAuthState);
        return UserCredentialImpl._forOperation(user, "link" /* LINK */, response);
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    async function _reauthenticate(user, credential, bypassAuthState = false) {
        const { auth } = user;
        const operationType = "reauthenticate" /* REAUTHENTICATE */;
        try {
            const response = await _logoutIfInvalidated(user, _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user), bypassAuthState);
            _assert(response.idToken, auth, "internal-error" /* INTERNAL_ERROR */);
            const parsed = _parseToken(response.idToken);
            _assert(parsed, auth, "internal-error" /* INTERNAL_ERROR */);
            const { sub: localId } = parsed;
            _assert(user.uid === localId, auth, "user-mismatch" /* USER_MISMATCH */);
            return UserCredentialImpl._forOperation(user, operationType, response);
        }
        catch (e) {
            // Convert user deleted error into user mismatch
            if ((e === null || e === void 0 ? void 0 : e.code) === `auth/${"user-not-found" /* USER_DELETED */}`) {
                _fail(auth, "user-mismatch" /* USER_MISMATCH */);
            }
            throw e;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    async function _signInWithCredential(auth, credential, bypassAuthState = false) {
        const operationType = "signIn" /* SIGN_IN */;
        const response = await _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential);
        const userCredential = await UserCredentialImpl._fromIdTokenResponse(auth, operationType, response);
        if (!bypassAuthState) {
            await auth._updateCurrentUser(userCredential.user);
        }
        return userCredential;
    }
    /**
     * Signs out the current user.
     *
     * @param auth - The {@link Auth} instance.
     *
     * @public
     */
    function signOut(auth) {
        return getModularInstance(auth).signOut();
    }

    const STORAGE_AVAILABLE_KEY = '__sak';

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // There are two different browser persistence types: local and session.
    // Both have the same implementation but use a different underlying storage
    // object.
    class BrowserPersistenceClass {
        constructor(storageRetriever, type) {
            this.storageRetriever = storageRetriever;
            this.type = type;
        }
        _isAvailable() {
            try {
                if (!this.storage) {
                    return Promise.resolve(false);
                }
                this.storage.setItem(STORAGE_AVAILABLE_KEY, '1');
                this.storage.removeItem(STORAGE_AVAILABLE_KEY);
                return Promise.resolve(true);
            }
            catch (_a) {
                return Promise.resolve(false);
            }
        }
        _set(key, value) {
            this.storage.setItem(key, JSON.stringify(value));
            return Promise.resolve();
        }
        _get(key) {
            const json = this.storage.getItem(key);
            return Promise.resolve(json ? JSON.parse(json) : null);
        }
        _remove(key) {
            this.storage.removeItem(key);
            return Promise.resolve();
        }
        get storage() {
            return this.storageRetriever();
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _iframeCannotSyncWebStorage() {
        const ua = getUA();
        return _isSafari(ua) || _isIOS(ua);
    }
    // The polling period in case events are not supported
    const _POLLING_INTERVAL_MS$1 = 1000;
    // The IE 10 localStorage cross tab synchronization delay in milliseconds
    const IE10_LOCAL_STORAGE_SYNC_DELAY = 10;
    class BrowserLocalPersistence extends BrowserPersistenceClass {
        constructor() {
            super(() => window.localStorage, "LOCAL" /* LOCAL */);
            this.boundEventHandler = (event, poll) => this.onStorageEvent(event, poll);
            this.listeners = {};
            this.localCache = {};
            // setTimeout return value is platform specific
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.pollTimer = null;
            // Safari or iOS browser and embedded in an iframe.
            this.safariLocalStorageNotSynced = _iframeCannotSyncWebStorage() && _isIframe();
            // Whether to use polling instead of depending on window events
            this.fallbackToPolling = _isMobileBrowser();
            this._shouldAllowMigration = true;
        }
        forAllChangedKeys(cb) {
            // Check all keys with listeners on them.
            for (const key of Object.keys(this.listeners)) {
                // Get value from localStorage.
                const newValue = this.storage.getItem(key);
                const oldValue = this.localCache[key];
                // If local map value does not match, trigger listener with storage event.
                // Differentiate this simulated event from the real storage event.
                if (newValue !== oldValue) {
                    cb(key, oldValue, newValue);
                }
            }
        }
        onStorageEvent(event, poll = false) {
            // Key would be null in some situations, like when localStorage is cleared
            if (!event.key) {
                this.forAllChangedKeys((key, _oldValue, newValue) => {
                    this.notifyListeners(key, newValue);
                });
                return;
            }
            const key = event.key;
            // Check the mechanism how this event was detected.
            // The first event will dictate the mechanism to be used.
            if (poll) {
                // Environment detects storage changes via polling.
                // Remove storage event listener to prevent possible event duplication.
                this.detachListener();
            }
            else {
                // Environment detects storage changes via storage event listener.
                // Remove polling listener to prevent possible event duplication.
                this.stopPolling();
            }
            // Safari embedded iframe. Storage event will trigger with the delta
            // changes but no changes will be applied to the iframe localStorage.
            if (this.safariLocalStorageNotSynced) {
                // Get current iframe page value.
                const storedValue = this.storage.getItem(key);
                // Value not synchronized, synchronize manually.
                if (event.newValue !== storedValue) {
                    if (event.newValue !== null) {
                        // Value changed from current value.
                        this.storage.setItem(key, event.newValue);
                    }
                    else {
                        // Current value deleted.
                        this.storage.removeItem(key);
                    }
                }
                else if (this.localCache[key] === event.newValue && !poll) {
                    // Already detected and processed, do not trigger listeners again.
                    return;
                }
            }
            const triggerListeners = () => {
                // Keep local map up to date in case storage event is triggered before
                // poll.
                const storedValue = this.storage.getItem(key);
                if (!poll && this.localCache[key] === storedValue) {
                    // Real storage event which has already been detected, do nothing.
                    // This seems to trigger in some IE browsers for some reason.
                    return;
                }
                this.notifyListeners(key, storedValue);
            };
            const storedValue = this.storage.getItem(key);
            if (_isIE10() &&
                storedValue !== event.newValue &&
                event.newValue !== event.oldValue) {
                // IE 10 has this weird bug where a storage event would trigger with the
                // correct key, oldValue and newValue but localStorage.getItem(key) does
                // not yield the updated value until a few milliseconds. This ensures
                // this recovers from that situation.
                setTimeout(triggerListeners, IE10_LOCAL_STORAGE_SYNC_DELAY);
            }
            else {
                triggerListeners();
            }
        }
        notifyListeners(key, value) {
            this.localCache[key] = value;
            const listeners = this.listeners[key];
            if (listeners) {
                for (const listener of Array.from(listeners)) {
                    listener(value ? JSON.parse(value) : value);
                }
            }
        }
        startPolling() {
            this.stopPolling();
            this.pollTimer = setInterval(() => {
                this.forAllChangedKeys((key, oldValue, newValue) => {
                    this.onStorageEvent(new StorageEvent('storage', {
                        key,
                        oldValue,
                        newValue
                    }), 
                    /* poll */ true);
                });
            }, _POLLING_INTERVAL_MS$1);
        }
        stopPolling() {
            if (this.pollTimer) {
                clearInterval(this.pollTimer);
                this.pollTimer = null;
            }
        }
        attachListener() {
            window.addEventListener('storage', this.boundEventHandler);
        }
        detachListener() {
            window.removeEventListener('storage', this.boundEventHandler);
        }
        _addListener(key, listener) {
            if (Object.keys(this.listeners).length === 0) {
                // Whether browser can detect storage event when it had already been pushed to the background.
                // This may happen in some mobile browsers. A localStorage change in the foreground window
                // will not be detected in the background window via the storage event.
                // This was detected in iOS 7.x mobile browsers
                if (this.fallbackToPolling) {
                    this.startPolling();
                }
                else {
                    this.attachListener();
                }
            }
            if (!this.listeners[key]) {
                this.listeners[key] = new Set();
                // Populate the cache to avoid spuriously triggering on first poll.
                this.localCache[key] = this.storage.getItem(key);
            }
            this.listeners[key].add(listener);
        }
        _removeListener(key, listener) {
            if (this.listeners[key]) {
                this.listeners[key].delete(listener);
                if (this.listeners[key].size === 0) {
                    delete this.listeners[key];
                }
            }
            if (Object.keys(this.listeners).length === 0) {
                this.detachListener();
                this.stopPolling();
            }
        }
        // Update local cache on base operations:
        async _set(key, value) {
            await super._set(key, value);
            this.localCache[key] = JSON.stringify(value);
        }
        async _get(key) {
            const value = await super._get(key);
            this.localCache[key] = JSON.stringify(value);
            return value;
        }
        async _remove(key) {
            await super._remove(key);
            delete this.localCache[key];
        }
    }
    BrowserLocalPersistence.type = 'LOCAL';
    /**
     * An implementation of {@link Persistence} of type `LOCAL` using `localStorage`
     * for the underlying storage.
     *
     * @public
     */
    const browserLocalPersistence = BrowserLocalPersistence;

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class BrowserSessionPersistence extends BrowserPersistenceClass {
        constructor() {
            super(() => window.sessionStorage, "SESSION" /* SESSION */);
        }
        _addListener(_key, _listener) {
            // Listeners are not supported for session storage since it cannot be shared across windows
            return;
        }
        _removeListener(_key, _listener) {
            // Listeners are not supported for session storage since it cannot be shared across windows
            return;
        }
    }
    BrowserSessionPersistence.type = 'SESSION';
    /**
     * An implementation of {@link Persistence} of `SESSION` using `sessionStorage`
     * for the underlying storage.
     *
     * @public
     */
    const browserSessionPersistence = BrowserSessionPersistence;

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Shim for Promise.allSettled, note the slightly different format of `fulfilled` vs `status`.
     *
     * @param promises - Array of promises to wait on.
     */
    function _allSettled(promises) {
        return Promise.all(promises.map(async (promise) => {
            try {
                const value = await promise;
                return {
                    fulfilled: true,
                    value
                };
            }
            catch (reason) {
                return {
                    fulfilled: false,
                    reason
                };
            }
        }));
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Interface class for receiving messages.
     *
     */
    class Receiver {
        constructor(eventTarget) {
            this.eventTarget = eventTarget;
            this.handlersMap = {};
            this.boundEventHandler = this.handleEvent.bind(this);
        }
        /**
         * Obtain an instance of a Receiver for a given event target, if none exists it will be created.
         *
         * @param eventTarget - An event target (such as window or self) through which the underlying
         * messages will be received.
         */
        static _getInstance(eventTarget) {
            // The results are stored in an array since objects can't be keys for other
            // objects. In addition, setting a unique property on an event target as a
            // hash map key may not be allowed due to CORS restrictions.
            const existingInstance = this.receivers.find(receiver => receiver.isListeningto(eventTarget));
            if (existingInstance) {
                return existingInstance;
            }
            const newInstance = new Receiver(eventTarget);
            this.receivers.push(newInstance);
            return newInstance;
        }
        isListeningto(eventTarget) {
            return this.eventTarget === eventTarget;
        }
        /**
         * Fans out a MessageEvent to the appropriate listeners.
         *
         * @remarks
         * Sends an {@link Status.ACK} upon receipt and a {@link Status.DONE} once all handlers have
         * finished processing.
         *
         * @param event - The MessageEvent.
         *
         */
        async handleEvent(event) {
            const messageEvent = event;
            const { eventId, eventType, data } = messageEvent.data;
            const handlers = this.handlersMap[eventType];
            if (!(handlers === null || handlers === void 0 ? void 0 : handlers.size)) {
                return;
            }
            messageEvent.ports[0].postMessage({
                status: "ack" /* ACK */,
                eventId,
                eventType
            });
            const promises = Array.from(handlers).map(async (handler) => handler(messageEvent.origin, data));
            const response = await _allSettled(promises);
            messageEvent.ports[0].postMessage({
                status: "done" /* DONE */,
                eventId,
                eventType,
                response
            });
        }
        /**
         * Subscribe an event handler for a particular event.
         *
         * @param eventType - Event name to subscribe to.
         * @param eventHandler - The event handler which should receive the events.
         *
         */
        _subscribe(eventType, eventHandler) {
            if (Object.keys(this.handlersMap).length === 0) {
                this.eventTarget.addEventListener('message', this.boundEventHandler);
            }
            if (!this.handlersMap[eventType]) {
                this.handlersMap[eventType] = new Set();
            }
            this.handlersMap[eventType].add(eventHandler);
        }
        /**
         * Unsubscribe an event handler from a particular event.
         *
         * @param eventType - Event name to unsubscribe from.
         * @param eventHandler - Optinoal event handler, if none provided, unsubscribe all handlers on this event.
         *
         */
        _unsubscribe(eventType, eventHandler) {
            if (this.handlersMap[eventType] && eventHandler) {
                this.handlersMap[eventType].delete(eventHandler);
            }
            if (!eventHandler || this.handlersMap[eventType].size === 0) {
                delete this.handlersMap[eventType];
            }
            if (Object.keys(this.handlersMap).length === 0) {
                this.eventTarget.removeEventListener('message', this.boundEventHandler);
            }
        }
    }
    Receiver.receivers = [];

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _generateEventId(prefix = '', digits = 10) {
        let random = '';
        for (let i = 0; i < digits; i++) {
            random += Math.floor(Math.random() * 10);
        }
        return prefix + random;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Interface for sending messages and waiting for a completion response.
     *
     */
    class Sender {
        constructor(target) {
            this.target = target;
            this.handlers = new Set();
        }
        /**
         * Unsubscribe the handler and remove it from our tracking Set.
         *
         * @param handler - The handler to unsubscribe.
         */
        removeMessageHandler(handler) {
            if (handler.messageChannel) {
                handler.messageChannel.port1.removeEventListener('message', handler.onMessage);
                handler.messageChannel.port1.close();
            }
            this.handlers.delete(handler);
        }
        /**
         * Send a message to the Receiver located at {@link target}.
         *
         * @remarks
         * We'll first wait a bit for an ACK , if we get one we will wait significantly longer until the
         * receiver has had a chance to fully process the event.
         *
         * @param eventType - Type of event to send.
         * @param data - The payload of the event.
         * @param timeout - Timeout for waiting on an ACK from the receiver.
         *
         * @returns An array of settled promises from all the handlers that were listening on the receiver.
         */
        async _send(eventType, data, timeout = 50 /* ACK */) {
            const messageChannel = typeof MessageChannel !== 'undefined' ? new MessageChannel() : null;
            if (!messageChannel) {
                throw new Error("connection_unavailable" /* CONNECTION_UNAVAILABLE */);
            }
            // Node timers and browser timers return fundamentally different types.
            // We don't actually care what the value is but TS won't accept unknown and
            // we can't cast properly in both environments.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let completionTimer;
            let handler;
            return new Promise((resolve, reject) => {
                const eventId = _generateEventId('', 20);
                messageChannel.port1.start();
                const ackTimer = setTimeout(() => {
                    reject(new Error("unsupported_event" /* UNSUPPORTED_EVENT */));
                }, timeout);
                handler = {
                    messageChannel,
                    onMessage(event) {
                        const messageEvent = event;
                        if (messageEvent.data.eventId !== eventId) {
                            return;
                        }
                        switch (messageEvent.data.status) {
                            case "ack" /* ACK */:
                                // The receiver should ACK first.
                                clearTimeout(ackTimer);
                                completionTimer = setTimeout(() => {
                                    reject(new Error("timeout" /* TIMEOUT */));
                                }, 3000 /* COMPLETION */);
                                break;
                            case "done" /* DONE */:
                                // Once the receiver's handlers are finished we will get the results.
                                clearTimeout(completionTimer);
                                resolve(messageEvent.data.response);
                                break;
                            default:
                                clearTimeout(ackTimer);
                                clearTimeout(completionTimer);
                                reject(new Error("invalid_response" /* INVALID_RESPONSE */));
                                break;
                        }
                    }
                };
                this.handlers.add(handler);
                messageChannel.port1.addEventListener('message', handler.onMessage);
                this.target.postMessage({
                    eventType,
                    eventId,
                    data
                }, [messageChannel.port2]);
            }).finally(() => {
                if (handler) {
                    this.removeMessageHandler(handler);
                }
            });
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Lazy accessor for window, since the compat layer won't tree shake this out,
     * we need to make sure not to mess with window unless we have to
     */
    function _window() {
        return window;
    }
    function _setWindowLocation(url) {
        _window().location.href = url;
    }

    /**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _isWorker() {
        return (typeof _window()['WorkerGlobalScope'] !== 'undefined' &&
            typeof _window()['importScripts'] === 'function');
    }
    async function _getActiveServiceWorker() {
        if (!(navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker)) {
            return null;
        }
        try {
            const registration = await navigator.serviceWorker.ready;
            return registration.active;
        }
        catch (_a) {
            return null;
        }
    }
    function _getServiceWorkerController() {
        var _a;
        return ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.controller) || null;
    }
    function _getWorkerGlobalScope() {
        return _isWorker() ? self : null;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const DB_NAME = 'firebaseLocalStorageDb';
    const DB_VERSION = 1;
    const DB_OBJECTSTORE_NAME = 'firebaseLocalStorage';
    const DB_DATA_KEYPATH = 'fbase_key';
    /**
     * Promise wrapper for IDBRequest
     *
     * Unfortunately we can't cleanly extend Promise<T> since promises are not callable in ES6
     *
     */
    class DBPromise {
        constructor(request) {
            this.request = request;
        }
        toPromise() {
            return new Promise((resolve, reject) => {
                this.request.addEventListener('success', () => {
                    resolve(this.request.result);
                });
                this.request.addEventListener('error', () => {
                    reject(this.request.error);
                });
            });
        }
    }
    function getObjectStore(db, isReadWrite) {
        return db
            .transaction([DB_OBJECTSTORE_NAME], isReadWrite ? 'readwrite' : 'readonly')
            .objectStore(DB_OBJECTSTORE_NAME);
    }
    function _deleteDatabase() {
        const request = indexedDB.deleteDatabase(DB_NAME);
        return new DBPromise(request).toPromise();
    }
    function _openDatabase() {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        return new Promise((resolve, reject) => {
            request.addEventListener('error', () => {
                reject(request.error);
            });
            request.addEventListener('upgradeneeded', () => {
                const db = request.result;
                try {
                    db.createObjectStore(DB_OBJECTSTORE_NAME, { keyPath: DB_DATA_KEYPATH });
                }
                catch (e) {
                    reject(e);
                }
            });
            request.addEventListener('success', async () => {
                const db = request.result;
                // Strange bug that occurs in Firefox when multiple tabs are opened at the
                // same time. The only way to recover seems to be deleting the database
                // and re-initializing it.
                // https://github.com/firebase/firebase-js-sdk/issues/634
                if (!db.objectStoreNames.contains(DB_OBJECTSTORE_NAME)) {
                    // Need to close the database or else you get a `blocked` event
                    db.close();
                    await _deleteDatabase();
                    resolve(await _openDatabase());
                }
                else {
                    resolve(db);
                }
            });
        });
    }
    async function _putObject(db, key, value) {
        const request = getObjectStore(db, true).put({
            [DB_DATA_KEYPATH]: key,
            value
        });
        return new DBPromise(request).toPromise();
    }
    async function getObject(db, key) {
        const request = getObjectStore(db, false).get(key);
        const data = await new DBPromise(request).toPromise();
        return data === undefined ? null : data.value;
    }
    function _deleteObject(db, key) {
        const request = getObjectStore(db, true).delete(key);
        return new DBPromise(request).toPromise();
    }
    const _POLLING_INTERVAL_MS = 800;
    const _TRANSACTION_RETRY_COUNT = 3;
    class IndexedDBLocalPersistence {
        constructor() {
            this.type = "LOCAL" /* LOCAL */;
            this._shouldAllowMigration = true;
            this.listeners = {};
            this.localCache = {};
            // setTimeout return value is platform specific
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.pollTimer = null;
            this.pendingWrites = 0;
            this.receiver = null;
            this.sender = null;
            this.serviceWorkerReceiverAvailable = false;
            this.activeServiceWorker = null;
            // Fire & forget the service worker registration as it may never resolve
            this._workerInitializationPromise =
                this.initializeServiceWorkerMessaging().then(() => { }, () => { });
        }
        async _openDb() {
            if (this.db) {
                return this.db;
            }
            this.db = await _openDatabase();
            return this.db;
        }
        async _withRetries(op) {
            let numAttempts = 0;
            while (true) {
                try {
                    const db = await this._openDb();
                    return await op(db);
                }
                catch (e) {
                    if (numAttempts++ > _TRANSACTION_RETRY_COUNT) {
                        throw e;
                    }
                    if (this.db) {
                        this.db.close();
                        this.db = undefined;
                    }
                    // TODO: consider adding exponential backoff
                }
            }
        }
        /**
         * IndexedDB events do not propagate from the main window to the worker context.  We rely on a
         * postMessage interface to send these events to the worker ourselves.
         */
        async initializeServiceWorkerMessaging() {
            return _isWorker() ? this.initializeReceiver() : this.initializeSender();
        }
        /**
         * As the worker we should listen to events from the main window.
         */
        async initializeReceiver() {
            this.receiver = Receiver._getInstance(_getWorkerGlobalScope());
            // Refresh from persistence if we receive a KeyChanged message.
            this.receiver._subscribe("keyChanged" /* KEY_CHANGED */, async (_origin, data) => {
                const keys = await this._poll();
                return {
                    keyProcessed: keys.includes(data.key)
                };
            });
            // Let the sender know that we are listening so they give us more timeout.
            this.receiver._subscribe("ping" /* PING */, async (_origin, _data) => {
                return ["keyChanged" /* KEY_CHANGED */];
            });
        }
        /**
         * As the main window, we should let the worker know when keys change (set and remove).
         *
         * @remarks
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/ready | ServiceWorkerContainer.ready}
         * may not resolve.
         */
        async initializeSender() {
            var _a, _b;
            // Check to see if there's an active service worker.
            this.activeServiceWorker = await _getActiveServiceWorker();
            if (!this.activeServiceWorker) {
                return;
            }
            this.sender = new Sender(this.activeServiceWorker);
            // Ping the service worker to check what events they can handle.
            const results = await this.sender._send("ping" /* PING */, {}, 800 /* LONG_ACK */);
            if (!results) {
                return;
            }
            if (((_a = results[0]) === null || _a === void 0 ? void 0 : _a.fulfilled) &&
                ((_b = results[0]) === null || _b === void 0 ? void 0 : _b.value.includes("keyChanged" /* KEY_CHANGED */))) {
                this.serviceWorkerReceiverAvailable = true;
            }
        }
        /**
         * Let the worker know about a changed key, the exact key doesn't technically matter since the
         * worker will just trigger a full sync anyway.
         *
         * @remarks
         * For now, we only support one service worker per page.
         *
         * @param key - Storage key which changed.
         */
        async notifyServiceWorker(key) {
            if (!this.sender ||
                !this.activeServiceWorker ||
                _getServiceWorkerController() !== this.activeServiceWorker) {
                return;
            }
            try {
                await this.sender._send("keyChanged" /* KEY_CHANGED */, { key }, 
                // Use long timeout if receiver has previously responded to a ping from us.
                this.serviceWorkerReceiverAvailable
                    ? 800 /* LONG_ACK */
                    : 50 /* ACK */);
            }
            catch (_a) {
                // This is a best effort approach. Ignore errors.
            }
        }
        async _isAvailable() {
            try {
                if (!indexedDB) {
                    return false;
                }
                const db = await _openDatabase();
                await _putObject(db, STORAGE_AVAILABLE_KEY, '1');
                await _deleteObject(db, STORAGE_AVAILABLE_KEY);
                return true;
            }
            catch (_a) { }
            return false;
        }
        async _withPendingWrite(write) {
            this.pendingWrites++;
            try {
                await write();
            }
            finally {
                this.pendingWrites--;
            }
        }
        async _set(key, value) {
            return this._withPendingWrite(async () => {
                await this._withRetries((db) => _putObject(db, key, value));
                this.localCache[key] = value;
                return this.notifyServiceWorker(key);
            });
        }
        async _get(key) {
            const obj = (await this._withRetries((db) => getObject(db, key)));
            this.localCache[key] = obj;
            return obj;
        }
        async _remove(key) {
            return this._withPendingWrite(async () => {
                await this._withRetries((db) => _deleteObject(db, key));
                delete this.localCache[key];
                return this.notifyServiceWorker(key);
            });
        }
        async _poll() {
            // TODO: check if we need to fallback if getAll is not supported
            const result = await this._withRetries((db) => {
                const getAllRequest = getObjectStore(db, false).getAll();
                return new DBPromise(getAllRequest).toPromise();
            });
            if (!result) {
                return [];
            }
            // If we have pending writes in progress abort, we'll get picked up on the next poll
            if (this.pendingWrites !== 0) {
                return [];
            }
            const keys = [];
            const keysInResult = new Set();
            for (const { fbase_key: key, value } of result) {
                keysInResult.add(key);
                if (JSON.stringify(this.localCache[key]) !== JSON.stringify(value)) {
                    this.notifyListeners(key, value);
                    keys.push(key);
                }
            }
            for (const localKey of Object.keys(this.localCache)) {
                if (this.localCache[localKey] && !keysInResult.has(localKey)) {
                    // Deleted
                    this.notifyListeners(localKey, null);
                    keys.push(localKey);
                }
            }
            return keys;
        }
        notifyListeners(key, newValue) {
            this.localCache[key] = newValue;
            const listeners = this.listeners[key];
            if (listeners) {
                for (const listener of Array.from(listeners)) {
                    listener(newValue);
                }
            }
        }
        startPolling() {
            this.stopPolling();
            this.pollTimer = setInterval(async () => this._poll(), _POLLING_INTERVAL_MS);
        }
        stopPolling() {
            if (this.pollTimer) {
                clearInterval(this.pollTimer);
                this.pollTimer = null;
            }
        }
        _addListener(key, listener) {
            if (Object.keys(this.listeners).length === 0) {
                this.startPolling();
            }
            if (!this.listeners[key]) {
                this.listeners[key] = new Set();
                // Populate the cache to avoid spuriously triggering on first poll.
                void this._get(key); // This can happen in the background async and we can return immediately.
            }
            this.listeners[key].add(listener);
        }
        _removeListener(key, listener) {
            if (this.listeners[key]) {
                this.listeners[key].delete(listener);
                if (this.listeners[key].size === 0) {
                    delete this.listeners[key];
                }
            }
            if (Object.keys(this.listeners).length === 0) {
                this.stopPolling();
            }
        }
    }
    IndexedDBLocalPersistence.type = 'LOCAL';
    /**
     * An implementation of {@link Persistence} of type `LOCAL` using `indexedDB`
     * for the underlying storage.
     *
     * @public
     */
    const indexedDBLocalPersistence = IndexedDBLocalPersistence;

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function getScriptParentElement() {
        var _a, _b;
        return (_b = (_a = document.getElementsByTagName('head')) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : document;
    }
    function _loadJS(url) {
        // TODO: consider adding timeout support & cancellation
        return new Promise((resolve, reject) => {
            const el = document.createElement('script');
            el.setAttribute('src', url);
            el.onload = resolve;
            el.onerror = e => {
                const error = _createError("internal-error" /* INTERNAL_ERROR */);
                error.customData = e;
                reject(error);
            };
            el.type = 'text/javascript';
            el.charset = 'UTF-8';
            getScriptParentElement().appendChild(el);
        });
    }
    function _generateCallbackName(prefix) {
        return `__${prefix}${Math.floor(Math.random() * 1000000)}`;
    }
    new Delay(30000, 60000);

    /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Chooses a popup/redirect resolver to use. This prefers the override (which
     * is directly passed in), and falls back to the property set on the auth
     * object. If neither are available, this function errors w/ an argument error.
     */
    function _withDefaultResolver(auth, resolverOverride) {
        if (resolverOverride) {
            return _getInstance(resolverOverride);
        }
        _assert(auth._popupRedirectResolver, auth, "argument-error" /* ARGUMENT_ERROR */);
        return auth._popupRedirectResolver;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class IdpCredential extends AuthCredential {
        constructor(params) {
            super("custom" /* CUSTOM */, "custom" /* CUSTOM */);
            this.params = params;
        }
        _getIdTokenResponse(auth) {
            return signInWithIdp(auth, this._buildIdpRequest());
        }
        _linkToIdToken(auth, idToken) {
            return signInWithIdp(auth, this._buildIdpRequest(idToken));
        }
        _getReauthenticationResolver(auth) {
            return signInWithIdp(auth, this._buildIdpRequest());
        }
        _buildIdpRequest(idToken) {
            const request = {
                requestUri: this.params.requestUri,
                sessionId: this.params.sessionId,
                postBody: this.params.postBody,
                tenantId: this.params.tenantId,
                pendingToken: this.params.pendingToken,
                returnSecureToken: true,
                returnIdpCredential: true
            };
            if (idToken) {
                request.idToken = idToken;
            }
            return request;
        }
    }
    function _signIn(params) {
        return _signInWithCredential(params.auth, new IdpCredential(params), params.bypassAuthState);
    }
    function _reauth(params) {
        const { auth, user } = params;
        _assert(user, auth, "internal-error" /* INTERNAL_ERROR */);
        return _reauthenticate(user, new IdpCredential(params), params.bypassAuthState);
    }
    async function _link(params) {
        const { auth, user } = params;
        _assert(user, auth, "internal-error" /* INTERNAL_ERROR */);
        return _link$1(user, new IdpCredential(params), params.bypassAuthState);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Popup event manager. Handles the popup's entire lifecycle; listens to auth
     * events
     */
    class AbstractPopupRedirectOperation {
        constructor(auth, filter, resolver, user, bypassAuthState = false) {
            this.auth = auth;
            this.resolver = resolver;
            this.user = user;
            this.bypassAuthState = bypassAuthState;
            this.pendingPromise = null;
            this.eventManager = null;
            this.filter = Array.isArray(filter) ? filter : [filter];
        }
        execute() {
            return new Promise(async (resolve, reject) => {
                this.pendingPromise = { resolve, reject };
                try {
                    this.eventManager = await this.resolver._initialize(this.auth);
                    await this.onExecution();
                    this.eventManager.registerConsumer(this);
                }
                catch (e) {
                    this.reject(e);
                }
            });
        }
        async onAuthEvent(event) {
            const { urlResponse, sessionId, postBody, tenantId, error, type } = event;
            if (error) {
                this.reject(error);
                return;
            }
            const params = {
                auth: this.auth,
                requestUri: urlResponse,
                sessionId: sessionId,
                tenantId: tenantId || undefined,
                postBody: postBody || undefined,
                user: this.user,
                bypassAuthState: this.bypassAuthState
            };
            try {
                this.resolve(await this.getIdpTask(type)(params));
            }
            catch (e) {
                this.reject(e);
            }
        }
        onError(error) {
            this.reject(error);
        }
        getIdpTask(type) {
            switch (type) {
                case "signInViaPopup" /* SIGN_IN_VIA_POPUP */:
                case "signInViaRedirect" /* SIGN_IN_VIA_REDIRECT */:
                    return _signIn;
                case "linkViaPopup" /* LINK_VIA_POPUP */:
                case "linkViaRedirect" /* LINK_VIA_REDIRECT */:
                    return _link;
                case "reauthViaPopup" /* REAUTH_VIA_POPUP */:
                case "reauthViaRedirect" /* REAUTH_VIA_REDIRECT */:
                    return _reauth;
                default:
                    _fail(this.auth, "internal-error" /* INTERNAL_ERROR */);
            }
        }
        resolve(cred) {
            debugAssert(this.pendingPromise, 'Pending promise was never set');
            this.pendingPromise.resolve(cred);
            this.unregisterAndCleanUp();
        }
        reject(error) {
            debugAssert(this.pendingPromise, 'Pending promise was never set');
            this.pendingPromise.reject(error);
            this.unregisterAndCleanUp();
        }
        unregisterAndCleanUp() {
            if (this.eventManager) {
                this.eventManager.unregisterConsumer(this);
            }
            this.pendingPromise = null;
            this.cleanUp();
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const _POLL_WINDOW_CLOSE_TIMEOUT = new Delay(2000, 10000);
    /**
     * Authenticates a Firebase client using a popup-based OAuth authentication flow.
     *
     * @remarks
     * If succeeds, returns the signed in user along with the provider's credential. If sign in was
     * unsuccessful, returns an error object containing additional information about the error.
     *
     * @example
     * ```javascript
     * // Sign in using a popup.
     * const provider = new FacebookAuthProvider();
     * const result = await signInWithPopup(auth, provider);
     *
     * // The signed-in user info.
     * const user = result.user;
     * // This gives you a Facebook Access Token.
     * const credential = provider.credentialFromResult(auth, result);
     * const token = credential.accessToken;
     * ```
     *
     * @param auth - The {@link Auth} instance.
     * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
     * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
     * @param resolver - An instance of {@link PopupRedirectResolver}, optional
     * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
     *
     *
     * @public
     */
    async function signInWithPopup(auth, provider, resolver) {
        const authInternal = _castAuth(auth);
        _assertInstanceOf(auth, provider, FederatedAuthProvider);
        const resolverInternal = _withDefaultResolver(authInternal, resolver);
        const action = new PopupOperation(authInternal, "signInViaPopup" /* SIGN_IN_VIA_POPUP */, provider, resolverInternal);
        return action.executeNotNull();
    }
    /**
     * Popup event manager. Handles the popup's entire lifecycle; listens to auth
     * events
     *
     */
    class PopupOperation extends AbstractPopupRedirectOperation {
        constructor(auth, filter, provider, resolver, user) {
            super(auth, filter, resolver, user);
            this.provider = provider;
            this.authWindow = null;
            this.pollId = null;
            if (PopupOperation.currentPopupAction) {
                PopupOperation.currentPopupAction.cancel();
            }
            PopupOperation.currentPopupAction = this;
        }
        async executeNotNull() {
            const result = await this.execute();
            _assert(result, this.auth, "internal-error" /* INTERNAL_ERROR */);
            return result;
        }
        async onExecution() {
            debugAssert(this.filter.length === 1, 'Popup operations only handle one event');
            const eventId = _generateEventId();
            this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], // There's always one, see constructor
            eventId);
            this.authWindow.associatedEvent = eventId;
            // Check for web storage support and origin validation _after_ the popup is
            // loaded. These operations are slow (~1 second or so) Rather than
            // waiting on them before opening the window, optimistically open the popup
            // and check for storage support at the same time. If storage support is
            // not available, this will cause the whole thing to reject properly. It
            // will also close the popup, but since the promise has already rejected,
            // the popup closed by user poll will reject into the void.
            this.resolver._originValidation(this.auth).catch(e => {
                this.reject(e);
            });
            this.resolver._isIframeWebStorageSupported(this.auth, isSupported => {
                if (!isSupported) {
                    this.reject(_createError(this.auth, "web-storage-unsupported" /* WEB_STORAGE_UNSUPPORTED */));
                }
            });
            // Handle user closure. Notice this does *not* use await
            this.pollUserCancellation();
        }
        get eventId() {
            var _a;
            return ((_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.associatedEvent) || null;
        }
        cancel() {
            this.reject(_createError(this.auth, "cancelled-popup-request" /* EXPIRED_POPUP_REQUEST */));
        }
        cleanUp() {
            if (this.authWindow) {
                this.authWindow.close();
            }
            if (this.pollId) {
                window.clearTimeout(this.pollId);
            }
            this.authWindow = null;
            this.pollId = null;
            PopupOperation.currentPopupAction = null;
        }
        pollUserCancellation() {
            const poll = () => {
                var _a, _b;
                if ((_b = (_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.closed) {
                    // Make sure that there is sufficient time for whatever action to
                    // complete. The window could have closed but the sign in network
                    // call could still be in flight.
                    this.pollId = window.setTimeout(() => {
                        this.pollId = null;
                        this.reject(_createError(this.auth, "popup-closed-by-user" /* POPUP_CLOSED_BY_USER */));
                    }, 2000 /* AUTH_EVENT */);
                    return;
                }
                this.pollId = window.setTimeout(poll, _POLL_WINDOW_CLOSE_TIMEOUT.get());
            };
            poll();
        }
    }
    // Only one popup is ever shown at once. The lifecycle of the current popup
    // can be managed / cancelled by the constructor.
    PopupOperation.currentPopupAction = null;

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const PENDING_REDIRECT_KEY = 'pendingRedirect';
    // We only get one redirect outcome for any one auth, so just store it
    // in here.
    const redirectOutcomeMap = new Map();
    class RedirectAction extends AbstractPopupRedirectOperation {
        constructor(auth, resolver, bypassAuthState = false) {
            super(auth, [
                "signInViaRedirect" /* SIGN_IN_VIA_REDIRECT */,
                "linkViaRedirect" /* LINK_VIA_REDIRECT */,
                "reauthViaRedirect" /* REAUTH_VIA_REDIRECT */,
                "unknown" /* UNKNOWN */
            ], resolver, undefined, bypassAuthState);
            this.eventId = null;
        }
        /**
         * Override the execute function; if we already have a redirect result, then
         * just return it.
         */
        async execute() {
            let readyOutcome = redirectOutcomeMap.get(this.auth._key());
            if (!readyOutcome) {
                try {
                    const hasPendingRedirect = await _getAndClearPendingRedirectStatus(this.resolver, this.auth);
                    const result = hasPendingRedirect ? await super.execute() : null;
                    readyOutcome = () => Promise.resolve(result);
                }
                catch (e) {
                    readyOutcome = () => Promise.reject(e);
                }
                redirectOutcomeMap.set(this.auth._key(), readyOutcome);
            }
            // If we're not bypassing auth state, the ready outcome should be set to
            // null.
            if (!this.bypassAuthState) {
                redirectOutcomeMap.set(this.auth._key(), () => Promise.resolve(null));
            }
            return readyOutcome();
        }
        async onAuthEvent(event) {
            if (event.type === "signInViaRedirect" /* SIGN_IN_VIA_REDIRECT */) {
                return super.onAuthEvent(event);
            }
            else if (event.type === "unknown" /* UNKNOWN */) {
                // This is a sentinel value indicating there's no pending redirect
                this.resolve(null);
                return;
            }
            if (event.eventId) {
                const user = await this.auth._redirectUserForId(event.eventId);
                if (user) {
                    this.user = user;
                    return super.onAuthEvent(event);
                }
                else {
                    this.resolve(null);
                }
            }
        }
        async onExecution() { }
        cleanUp() { }
    }
    async function _getAndClearPendingRedirectStatus(resolver, auth) {
        const key = pendingRedirectKey(auth);
        const persistence = resolverPersistence(resolver);
        if (!(await persistence._isAvailable())) {
            return false;
        }
        const hasPendingRedirect = (await persistence._get(key)) === 'true';
        await persistence._remove(key);
        return hasPendingRedirect;
    }
    function resolverPersistence(resolver) {
        return _getInstance(resolver._redirectPersistence);
    }
    function pendingRedirectKey(auth) {
        return _persistenceKeyName(PENDING_REDIRECT_KEY, auth.config.apiKey, auth.name);
    }
    async function _getRedirectResult(auth, resolverExtern, bypassAuthState = false) {
        const authInternal = _castAuth(auth);
        const resolver = _withDefaultResolver(authInternal, resolverExtern);
        const action = new RedirectAction(authInternal, resolver, bypassAuthState);
        const result = await action.execute();
        if (result && !bypassAuthState) {
            delete result.user._redirectEventId;
            await authInternal._persistUserIfCurrent(result.user);
            await authInternal._setRedirectUser(null, resolverExtern);
        }
        return result;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // The amount of time to store the UIDs of seen events; this is
    // set to 10 min by default
    const EVENT_DUPLICATION_CACHE_DURATION_MS = 10 * 60 * 1000;
    class AuthEventManager {
        constructor(auth) {
            this.auth = auth;
            this.cachedEventUids = new Set();
            this.consumers = new Set();
            this.queuedRedirectEvent = null;
            this.hasHandledPotentialRedirect = false;
            this.lastProcessedEventTime = Date.now();
        }
        registerConsumer(authEventConsumer) {
            this.consumers.add(authEventConsumer);
            if (this.queuedRedirectEvent &&
                this.isEventForConsumer(this.queuedRedirectEvent, authEventConsumer)) {
                this.sendToConsumer(this.queuedRedirectEvent, authEventConsumer);
                this.saveEventToCache(this.queuedRedirectEvent);
                this.queuedRedirectEvent = null;
            }
        }
        unregisterConsumer(authEventConsumer) {
            this.consumers.delete(authEventConsumer);
        }
        onEvent(event) {
            // Check if the event has already been handled
            if (this.hasEventBeenHandled(event)) {
                return false;
            }
            let handled = false;
            this.consumers.forEach(consumer => {
                if (this.isEventForConsumer(event, consumer)) {
                    handled = true;
                    this.sendToConsumer(event, consumer);
                    this.saveEventToCache(event);
                }
            });
            if (this.hasHandledPotentialRedirect || !isRedirectEvent(event)) {
                // If we've already seen a redirect before, or this is a popup event,
                // bail now
                return handled;
            }
            this.hasHandledPotentialRedirect = true;
            // If the redirect wasn't handled, hang on to it
            if (!handled) {
                this.queuedRedirectEvent = event;
                handled = true;
            }
            return handled;
        }
        sendToConsumer(event, consumer) {
            var _a;
            if (event.error && !isNullRedirectEvent(event)) {
                const code = ((_a = event.error.code) === null || _a === void 0 ? void 0 : _a.split('auth/')[1]) ||
                    "internal-error" /* INTERNAL_ERROR */;
                consumer.onError(_createError(this.auth, code));
            }
            else {
                consumer.onAuthEvent(event);
            }
        }
        isEventForConsumer(event, consumer) {
            const eventIdMatches = consumer.eventId === null ||
                (!!event.eventId && event.eventId === consumer.eventId);
            return consumer.filter.includes(event.type) && eventIdMatches;
        }
        hasEventBeenHandled(event) {
            if (Date.now() - this.lastProcessedEventTime >=
                EVENT_DUPLICATION_CACHE_DURATION_MS) {
                this.cachedEventUids.clear();
            }
            return this.cachedEventUids.has(eventUid(event));
        }
        saveEventToCache(event) {
            this.cachedEventUids.add(eventUid(event));
            this.lastProcessedEventTime = Date.now();
        }
    }
    function eventUid(e) {
        return [e.type, e.eventId, e.sessionId, e.tenantId].filter(v => v).join('-');
    }
    function isNullRedirectEvent({ type, error }) {
        return (type === "unknown" /* UNKNOWN */ &&
            (error === null || error === void 0 ? void 0 : error.code) === `auth/${"no-auth-event" /* NO_AUTH_EVENT */}`);
    }
    function isRedirectEvent(event) {
        switch (event.type) {
            case "signInViaRedirect" /* SIGN_IN_VIA_REDIRECT */:
            case "linkViaRedirect" /* LINK_VIA_REDIRECT */:
            case "reauthViaRedirect" /* REAUTH_VIA_REDIRECT */:
                return true;
            case "unknown" /* UNKNOWN */:
                return isNullRedirectEvent(event);
            default:
                return false;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    async function _getProjectConfig(auth, request = {}) {
        return _performApiRequest(auth, "GET" /* GET */, "/v1/projects" /* GET_PROJECT_CONFIG */, request);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const IP_ADDRESS_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    const HTTP_REGEX = /^https?/;
    async function _validateOrigin(auth) {
        // Skip origin validation if we are in an emulated environment
        if (auth.config.emulator) {
            return;
        }
        const { authorizedDomains } = await _getProjectConfig(auth);
        for (const domain of authorizedDomains) {
            try {
                if (matchDomain(domain)) {
                    return;
                }
            }
            catch (_a) {
                // Do nothing if there's a URL error; just continue searching
            }
        }
        // In the old SDK, this error also provides helpful messages.
        _fail(auth, "unauthorized-domain" /* INVALID_ORIGIN */);
    }
    function matchDomain(expected) {
        const currentUrl = _getCurrentUrl();
        const { protocol, hostname } = new URL(currentUrl);
        if (expected.startsWith('chrome-extension://')) {
            const ceUrl = new URL(expected);
            if (ceUrl.hostname === '' && hostname === '') {
                // For some reason we're not parsing chrome URLs properly
                return (protocol === 'chrome-extension:' &&
                    expected.replace('chrome-extension://', '') ===
                        currentUrl.replace('chrome-extension://', ''));
            }
            return protocol === 'chrome-extension:' && ceUrl.hostname === hostname;
        }
        if (!HTTP_REGEX.test(protocol)) {
            return false;
        }
        if (IP_ADDRESS_REGEX.test(expected)) {
            // The domain has to be exactly equal to the pattern, as an IP domain will
            // only contain the IP, no extra character.
            return hostname === expected;
        }
        // Dots in pattern should be escaped.
        const escapedDomainPattern = expected.replace(/\./g, '\\.');
        // Non ip address domains.
        // domain.com = *.domain.com OR domain.com
        const re = new RegExp('^(.+\\.' + escapedDomainPattern + '|' + escapedDomainPattern + ')$', 'i');
        return re.test(hostname);
    }

    /**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const NETWORK_TIMEOUT = new Delay(30000, 60000);
    /**
     * Reset unlaoded GApi modules. If gapi.load fails due to a network error,
     * it will stop working after a retrial. This is a hack to fix this issue.
     */
    function resetUnloadedGapiModules() {
        // Clear last failed gapi.load state to force next gapi.load to first
        // load the failed gapi.iframes module.
        // Get gapix.beacon context.
        const beacon = _window().___jsl;
        // Get current hint.
        if (beacon === null || beacon === void 0 ? void 0 : beacon.H) {
            // Get gapi hint.
            for (const hint of Object.keys(beacon.H)) {
                // Requested modules.
                beacon.H[hint].r = beacon.H[hint].r || [];
                // Loaded modules.
                beacon.H[hint].L = beacon.H[hint].L || [];
                // Set requested modules to a copy of the loaded modules.
                beacon.H[hint].r = [...beacon.H[hint].L];
                // Clear pending callbacks.
                if (beacon.CP) {
                    for (let i = 0; i < beacon.CP.length; i++) {
                        // Remove all failed pending callbacks.
                        beacon.CP[i] = null;
                    }
                }
            }
        }
    }
    function loadGapi(auth) {
        return new Promise((resolve, reject) => {
            var _a, _b, _c;
            // Function to run when gapi.load is ready.
            function loadGapiIframe() {
                // The developer may have tried to previously run gapi.load and failed.
                // Run this to fix that.
                resetUnloadedGapiModules();
                gapi.load('gapi.iframes', {
                    callback: () => {
                        resolve(gapi.iframes.getContext());
                    },
                    ontimeout: () => {
                        // The above reset may be sufficient, but having this reset after
                        // failure ensures that if the developer calls gapi.load after the
                        // connection is re-established and before another attempt to embed
                        // the iframe, it would work and would not be broken because of our
                        // failed attempt.
                        // Timeout when gapi.iframes.Iframe not loaded.
                        resetUnloadedGapiModules();
                        reject(_createError(auth, "network-request-failed" /* NETWORK_REQUEST_FAILED */));
                    },
                    timeout: NETWORK_TIMEOUT.get()
                });
            }
            if ((_b = (_a = _window().gapi) === null || _a === void 0 ? void 0 : _a.iframes) === null || _b === void 0 ? void 0 : _b.Iframe) {
                // If gapi.iframes.Iframe available, resolve.
                resolve(gapi.iframes.getContext());
            }
            else if (!!((_c = _window().gapi) === null || _c === void 0 ? void 0 : _c.load)) {
                // Gapi loader ready, load gapi.iframes.
                loadGapiIframe();
            }
            else {
                // Create a new iframe callback when this is called so as not to overwrite
                // any previous defined callback. This happens if this method is called
                // multiple times in parallel and could result in the later callback
                // overwriting the previous one. This would end up with a iframe
                // timeout.
                const cbName = _generateCallbackName('iframefcb');
                // GApi loader not available, dynamically load platform.js.
                _window()[cbName] = () => {
                    // GApi loader should be ready.
                    if (!!gapi.load) {
                        loadGapiIframe();
                    }
                    else {
                        // Gapi loader failed, throw error.
                        reject(_createError(auth, "network-request-failed" /* NETWORK_REQUEST_FAILED */));
                    }
                };
                // Load GApi loader.
                return _loadJS(`https://apis.google.com/js/api.js?onload=${cbName}`).catch(e => reject(e));
            }
        }).catch(error => {
            // Reset cached promise to allow for retrial.
            cachedGApiLoader = null;
            throw error;
        });
    }
    let cachedGApiLoader = null;
    function _loadGapi(auth) {
        cachedGApiLoader = cachedGApiLoader || loadGapi(auth);
        return cachedGApiLoader;
    }

    /**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const PING_TIMEOUT = new Delay(5000, 15000);
    const IFRAME_PATH = '__/auth/iframe';
    const EMULATED_IFRAME_PATH = 'emulator/auth/iframe';
    const IFRAME_ATTRIBUTES = {
        style: {
            position: 'absolute',
            top: '-100px',
            width: '1px',
            height: '1px'
        },
        'aria-hidden': 'true',
        tabindex: '-1'
    };
    // Map from apiHost to endpoint ID for passing into iframe. In current SDK, apiHost can be set to
    // anything (not from a list of endpoints with IDs as in legacy), so this is the closest we can get.
    const EID_FROM_APIHOST = new Map([
        ["identitytoolkit.googleapis.com" /* API_HOST */, 'p'],
        ['staging-identitytoolkit.sandbox.googleapis.com', 's'],
        ['test-identitytoolkit.sandbox.googleapis.com', 't'] // test
    ]);
    function getIframeUrl(auth) {
        const config = auth.config;
        _assert(config.authDomain, auth, "auth-domain-config-required" /* MISSING_AUTH_DOMAIN */);
        const url = config.emulator
            ? _emulatorUrl(config, EMULATED_IFRAME_PATH)
            : `https://${auth.config.authDomain}/${IFRAME_PATH}`;
        const params = {
            apiKey: config.apiKey,
            appName: auth.name,
            v: SDK_VERSION
        };
        const eid = EID_FROM_APIHOST.get(auth.config.apiHost);
        if (eid) {
            params.eid = eid;
        }
        const frameworks = auth._getFrameworks();
        if (frameworks.length) {
            params.fw = frameworks.join(',');
        }
        return `${url}?${querystring(params).slice(1)}`;
    }
    async function _openIframe(auth) {
        const context = await _loadGapi(auth);
        const gapi = _window().gapi;
        _assert(gapi, auth, "internal-error" /* INTERNAL_ERROR */);
        return context.open({
            where: document.body,
            url: getIframeUrl(auth),
            messageHandlersFilter: gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
            attributes: IFRAME_ATTRIBUTES,
            dontclear: true
        }, (iframe) => new Promise(async (resolve, reject) => {
            await iframe.restyle({
                // Prevent iframe from closing on mouse out.
                setHideOnLeave: false
            });
            const networkError = _createError(auth, "network-request-failed" /* NETWORK_REQUEST_FAILED */);
            // Confirm iframe is correctly loaded.
            // To fallback on failure, set a timeout.
            const networkErrorTimer = _window().setTimeout(() => {
                reject(networkError);
            }, PING_TIMEOUT.get());
            // Clear timer and resolve pending iframe ready promise.
            function clearTimerAndResolve() {
                _window().clearTimeout(networkErrorTimer);
                resolve(iframe);
            }
            // This returns an IThenable. However the reject part does not call
            // when the iframe is not loaded.
            iframe.ping(clearTimerAndResolve).then(clearTimerAndResolve, () => {
                reject(networkError);
            });
        }));
    }

    /**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const BASE_POPUP_OPTIONS = {
        location: 'yes',
        resizable: 'yes',
        statusbar: 'yes',
        toolbar: 'no'
    };
    const DEFAULT_WIDTH = 500;
    const DEFAULT_HEIGHT = 600;
    const TARGET_BLANK = '_blank';
    const FIREFOX_EMPTY_URL = 'http://localhost';
    class AuthPopup {
        constructor(window) {
            this.window = window;
            this.associatedEvent = null;
        }
        close() {
            if (this.window) {
                try {
                    this.window.close();
                }
                catch (e) { }
            }
        }
    }
    function _open(auth, url, name, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
        const top = Math.max((window.screen.availHeight - height) / 2, 0).toString();
        const left = Math.max((window.screen.availWidth - width) / 2, 0).toString();
        let target = '';
        const options = Object.assign(Object.assign({}, BASE_POPUP_OPTIONS), { width: width.toString(), height: height.toString(), top,
            left });
        // Chrome iOS 7 and 8 is returning an undefined popup win when target is
        // specified, even though the popup is not necessarily blocked.
        const ua = getUA().toLowerCase();
        if (name) {
            target = _isChromeIOS(ua) ? TARGET_BLANK : name;
        }
        if (_isFirefox(ua)) {
            // Firefox complains when invalid URLs are popped out. Hacky way to bypass.
            url = url || FIREFOX_EMPTY_URL;
            // Firefox disables by default scrolling on popup windows, which can create
            // issues when the user has many Google accounts, for instance.
            options.scrollbars = 'yes';
        }
        const optionsString = Object.entries(options).reduce((accum, [key, value]) => `${accum}${key}=${value},`, '');
        if (_isIOSStandalone(ua) && target !== '_self') {
            openAsNewWindowIOS(url || '', target);
            return new AuthPopup(null);
        }
        // about:blank getting sanitized causing browsers like IE/Edge to display
        // brief error message before redirecting to handler.
        const newWin = window.open(url || '', target, optionsString);
        _assert(newWin, auth, "popup-blocked" /* POPUP_BLOCKED */);
        // Flaky on IE edge, encapsulate with a try and catch.
        try {
            newWin.focus();
        }
        catch (e) { }
        return new AuthPopup(newWin);
    }
    function openAsNewWindowIOS(url, target) {
        const el = document.createElement('a');
        el.href = url;
        el.target = target;
        const click = document.createEvent('MouseEvent');
        click.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 1, null);
        el.dispatchEvent(click);
    }

    /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * URL for Authentication widget which will initiate the OAuth handshake
     *
     * @internal
     */
    const WIDGET_PATH = '__/auth/handler';
    /**
     * URL for emulated environment
     *
     * @internal
     */
    const EMULATOR_WIDGET_PATH = 'emulator/auth/handler';
    function _getRedirectUrl(auth, provider, authType, redirectUrl, eventId, additionalParams) {
        _assert(auth.config.authDomain, auth, "auth-domain-config-required" /* MISSING_AUTH_DOMAIN */);
        _assert(auth.config.apiKey, auth, "invalid-api-key" /* INVALID_API_KEY */);
        const params = {
            apiKey: auth.config.apiKey,
            appName: auth.name,
            authType,
            redirectUrl,
            v: SDK_VERSION,
            eventId
        };
        if (provider instanceof FederatedAuthProvider) {
            provider.setDefaultLanguage(auth.languageCode);
            params.providerId = provider.providerId || '';
            if (!isEmpty(provider.getCustomParameters())) {
                params.customParameters = JSON.stringify(provider.getCustomParameters());
            }
            // TODO set additionalParams from the provider as well?
            for (const [key, value] of Object.entries(additionalParams || {})) {
                params[key] = value;
            }
        }
        if (provider instanceof BaseOAuthProvider) {
            const scopes = provider.getScopes().filter(scope => scope !== '');
            if (scopes.length > 0) {
                params.scopes = scopes.join(',');
            }
        }
        if (auth.tenantId) {
            params.tid = auth.tenantId;
        }
        // TODO: maybe set eid as endipointId
        // TODO: maybe set fw as Frameworks.join(",")
        const paramsDict = params;
        for (const key of Object.keys(paramsDict)) {
            if (paramsDict[key] === undefined) {
                delete paramsDict[key];
            }
        }
        return `${getHandlerBase(auth)}?${querystring(paramsDict).slice(1)}`;
    }
    function getHandlerBase({ config }) {
        if (!config.emulator) {
            return `https://${config.authDomain}/${WIDGET_PATH}`;
        }
        return _emulatorUrl(config, EMULATOR_WIDGET_PATH);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The special web storage event
     *
     */
    const WEB_STORAGE_SUPPORT_KEY = 'webStorageSupport';
    class BrowserPopupRedirectResolver {
        constructor() {
            this.eventManagers = {};
            this.iframes = {};
            this.originValidationPromises = {};
            this._redirectPersistence = browserSessionPersistence;
            this._completeRedirectFn = _getRedirectResult;
        }
        // Wrapping in async even though we don't await anywhere in order
        // to make sure errors are raised as promise rejections
        async _openPopup(auth, provider, authType, eventId) {
            var _a;
            debugAssert((_a = this.eventManagers[auth._key()]) === null || _a === void 0 ? void 0 : _a.manager, '_initialize() not called before _openPopup()');
            const url = _getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId);
            return _open(auth, url, _generateEventId());
        }
        async _openRedirect(auth, provider, authType, eventId) {
            await this._originValidation(auth);
            _setWindowLocation(_getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId));
            return new Promise(() => { });
        }
        _initialize(auth) {
            const key = auth._key();
            if (this.eventManagers[key]) {
                const { manager, promise } = this.eventManagers[key];
                if (manager) {
                    return Promise.resolve(manager);
                }
                else {
                    debugAssert(promise, 'If manager is not set, promise should be');
                    return promise;
                }
            }
            const promise = this.initAndGetManager(auth);
            this.eventManagers[key] = { promise };
            // If the promise is rejected, the key should be removed so that the
            // operation can be retried later.
            promise.catch(() => {
                delete this.eventManagers[key];
            });
            return promise;
        }
        async initAndGetManager(auth) {
            const iframe = await _openIframe(auth);
            const manager = new AuthEventManager(auth);
            iframe.register('authEvent', (iframeEvent) => {
                _assert(iframeEvent === null || iframeEvent === void 0 ? void 0 : iframeEvent.authEvent, auth, "invalid-auth-event" /* INVALID_AUTH_EVENT */);
                // TODO: Consider splitting redirect and popup events earlier on
                const handled = manager.onEvent(iframeEvent.authEvent);
                return { status: handled ? "ACK" /* ACK */ : "ERROR" /* ERROR */ };
            }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
            this.eventManagers[auth._key()] = { manager };
            this.iframes[auth._key()] = iframe;
            return manager;
        }
        _isIframeWebStorageSupported(auth, cb) {
            const iframe = this.iframes[auth._key()];
            iframe.send(WEB_STORAGE_SUPPORT_KEY, { type: WEB_STORAGE_SUPPORT_KEY }, result => {
                var _a;
                const isSupported = (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a[WEB_STORAGE_SUPPORT_KEY];
                if (isSupported !== undefined) {
                    cb(!!isSupported);
                }
                _fail(auth, "internal-error" /* INTERNAL_ERROR */);
            }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
        }
        _originValidation(auth) {
            const key = auth._key();
            if (!this.originValidationPromises[key]) {
                this.originValidationPromises[key] = _validateOrigin(auth);
            }
            return this.originValidationPromises[key];
        }
        get _shouldInitProactively() {
            // Mobile browsers and Safari need to optimistically initialize
            return _isMobileBrowser() || _isSafari() || _isIOS();
        }
    }
    /**
     * An implementation of {@link PopupRedirectResolver} suitable for browser
     * based applications.
     *
     * @public
     */
    const browserPopupRedirectResolver = BrowserPopupRedirectResolver;

    var name$1 = "@firebase/auth";
    var version$1 = "0.19.9";

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class AuthInterop {
        constructor(auth) {
            this.auth = auth;
            this.internalListeners = new Map();
        }
        getUid() {
            var _a;
            this.assertAuthConfigured();
            return ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || null;
        }
        async getToken(forceRefresh) {
            this.assertAuthConfigured();
            await this.auth._initializationPromise;
            if (!this.auth.currentUser) {
                return null;
            }
            const accessToken = await this.auth.currentUser.getIdToken(forceRefresh);
            return { accessToken };
        }
        addAuthTokenListener(listener) {
            this.assertAuthConfigured();
            if (this.internalListeners.has(listener)) {
                return;
            }
            const unsubscribe = this.auth.onIdTokenChanged(user => {
                var _a;
                listener(((_a = user) === null || _a === void 0 ? void 0 : _a.stsTokenManager.accessToken) || null);
            });
            this.internalListeners.set(listener, unsubscribe);
            this.updateProactiveRefresh();
        }
        removeAuthTokenListener(listener) {
            this.assertAuthConfigured();
            const unsubscribe = this.internalListeners.get(listener);
            if (!unsubscribe) {
                return;
            }
            this.internalListeners.delete(listener);
            unsubscribe();
            this.updateProactiveRefresh();
        }
        assertAuthConfigured() {
            _assert(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth" /* DEPENDENT_SDK_INIT_BEFORE_AUTH */);
        }
        updateProactiveRefresh() {
            if (this.internalListeners.size > 0) {
                this.auth._startProactiveRefresh();
            }
            else {
                this.auth._stopProactiveRefresh();
            }
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function getVersionForPlatform(clientPlatform) {
        switch (clientPlatform) {
            case "Node" /* NODE */:
                return 'node';
            case "ReactNative" /* REACT_NATIVE */:
                return 'rn';
            case "Worker" /* WORKER */:
                return 'webworker';
            case "Cordova" /* CORDOVA */:
                return 'cordova';
            default:
                return undefined;
        }
    }
    /** @internal */
    function registerAuth(clientPlatform) {
        _registerComponent(new Component("auth" /* AUTH */, (container, { options: deps }) => {
            const app = container.getProvider('app').getImmediate();
            const { apiKey, authDomain } = app.options;
            return (app => {
                _assert(apiKey && !apiKey.includes(':'), "invalid-api-key" /* INVALID_API_KEY */, { appName: app.name });
                // Auth domain is optional if IdP sign in isn't being used
                _assert(!(authDomain === null || authDomain === void 0 ? void 0 : authDomain.includes(':')), "argument-error" /* ARGUMENT_ERROR */, {
                    appName: app.name
                });
                const config = {
                    apiKey,
                    authDomain,
                    clientPlatform,
                    apiHost: "identitytoolkit.googleapis.com" /* API_HOST */,
                    tokenApiHost: "securetoken.googleapis.com" /* TOKEN_API_HOST */,
                    apiScheme: "https" /* API_SCHEME */,
                    sdkClientVersion: _getClientVersion(clientPlatform)
                };
                const authInstance = new AuthImpl(app, config);
                _initializeAuthInstance(authInstance, deps);
                return authInstance;
            })(app);
        }, "PUBLIC" /* PUBLIC */)
            /**
             * Auth can only be initialized by explicitly calling getAuth() or initializeAuth()
             * For why we do this, See go/firebase-next-auth-init
             */
            .setInstantiationMode("EXPLICIT" /* EXPLICIT */)
            /**
             * Because all firebase products that depend on auth depend on auth-internal directly,
             * we need to initialize auth-internal after auth is initialized to make it available to other firebase products.
             */
            .setInstanceCreatedCallback((container, _instanceIdentifier, _instance) => {
            const authInternalProvider = container.getProvider("auth-internal" /* AUTH_INTERNAL */);
            authInternalProvider.initialize();
        }));
        _registerComponent(new Component("auth-internal" /* AUTH_INTERNAL */, container => {
            const auth = _castAuth(container.getProvider("auth" /* AUTH */).getImmediate());
            return (auth => new AuthInterop(auth))(auth);
        }, "PRIVATE" /* PRIVATE */).setInstantiationMode("EXPLICIT" /* EXPLICIT */));
        registerVersion(name$1, version$1, getVersionForPlatform(clientPlatform));
        // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
        registerVersion(name$1, version$1, 'esm2017');
    }

    /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns the Auth instance associated with the provided {@link @firebase/app#FirebaseApp}.
     * If no instance exists, initializes an Auth instance with platform-specific default dependencies.
     *
     * @param app - The Firebase App.
     *
     * @public
     */
    function getAuth(app = getApp()) {
        const provider = _getProvider(app, 'auth');
        if (provider.isInitialized()) {
            return provider.getImmediate();
        }
        return initializeAuth(app, {
            popupRedirectResolver: browserPopupRedirectResolver,
            persistence: [
                indexedDBLocalPersistence,
                browserLocalPersistence,
                browserSessionPersistence
            ]
        });
    }
    registerAuth("Browser" /* BROWSER */);

    var name = "firebase";
    var version = "9.6.7";

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    registerVersion(name, version, 'app');

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    var k$1,goog=goog||{},l=commonjsGlobal||self;function aa(){}function ba(a){var b=typeof a;b="object"!=b?b:a?Array.isArray(a)?"array":b:"null";return "array"==b||"object"==b&&"number"==typeof a.length}function p(a){var b=typeof a;return "object"==b&&null!=a||"function"==b}function da$1(a){return Object.prototype.hasOwnProperty.call(a,ea$1)&&a[ea$1]||(a[ea$1]=++fa)}var ea$1="closure_uid_"+(1E9*Math.random()>>>0),fa=0;function ha(a,b,c){return a.call.apply(a.bind,arguments)}
    function ia$1(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}function q(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?q=ha:q=ia$1;return q.apply(null,arguments)}
    function ja(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}}function t(a,b){function c(){}c.prototype=b.prototype;a.Z=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Vb=function(d,e,f){for(var h=Array(arguments.length-2),n=2;n<arguments.length;n++)h[n-2]=arguments[n];return b.prototype[e].apply(d,h)};}function v(){this.s=this.s;this.o=this.o;}var ka$1=0,la$1={};v.prototype.s=!1;v.prototype.na=function(){if(!this.s&&(this.s=!0,this.M(),0!=ka$1)){var a=da$1(this);delete la$1[a];}};v.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()();};const ma=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return "string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);for(let c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return -1},na$1=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c);}:function(a,b,c){const d=a.length,e="string"===typeof a?a.split(""):a;for(let f=0;f<d;f++)f in e&&b.call(c,e[f],f,a);};
    function oa(a){a:{var b=pa;const c=a.length,d="string"===typeof a?a.split(""):a;for(let e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1;}return 0>b?null:"string"===typeof a?a.charAt(b):a[b]}function qa(a){return Array.prototype.concat.apply([],arguments)}function ra(a){const b=a.length;if(0<b){const c=Array(b);for(let d=0;d<b;d++)c[d]=a[d];return c}return []}function sa(a){return /^[\s\xa0]*$/.test(a)}var ta$1=String.prototype.trim?function(a){return a.trim()}:function(a){return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};function w(a,b){return -1!=a.indexOf(b)}function ua$1(a,b){return a<b?-1:a>b?1:0}var x$1;a:{var va$1=l.navigator;if(va$1){var wa$1=va$1.userAgent;if(wa$1){x$1=wa$1;break a}}x$1="";}function xa$1(a,b,c){for(const d in a)b.call(c,a[d],d,a);}function ya(a){const b={};for(const c in a)b[c]=a[c];return b}var za$1="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Aa(a,b){let c,d;for(let e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(let f=0;f<za$1.length;f++)c=za$1[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c]);}}function Ca$1(a){Ca$1[" "](a);return a}Ca$1[" "]=aa;function Fa$1(a){var b=Ga;return Object.prototype.hasOwnProperty.call(b,9)?b[9]:b[9]=a(9)}var Ha$1=w(x$1,"Opera"),y=w(x$1,"Trident")||w(x$1,"MSIE"),Ia=w(x$1,"Edge"),Ja$1=Ia||y,Ka=w(x$1,"Gecko")&&!(w(x$1.toLowerCase(),"webkit")&&!w(x$1,"Edge"))&&!(w(x$1,"Trident")||w(x$1,"MSIE"))&&!w(x$1,"Edge"),La$1=w(x$1.toLowerCase(),"webkit")&&!w(x$1,"Edge");function Ma$1(){var a=l.document;return a?a.documentMode:void 0}var Na$1;
    a:{var Oa$1="",Pa=function(){var a=x$1;if(Ka)return /rv:([^\);]+)(\)|;)/.exec(a);if(Ia)return /Edge\/([\d\.]+)/.exec(a);if(y)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(La$1)return /WebKit\/(\S+)/.exec(a);if(Ha$1)return /(?:Version)[ \/]?(\S+)/.exec(a)}();Pa&&(Oa$1=Pa?Pa[1]:"");if(y){var Qa$1=Ma$1();if(null!=Qa$1&&Qa$1>parseFloat(Oa$1)){Na$1=String(Qa$1);break a}}Na$1=Oa$1;}var Ga={};
    function Ra(){return Fa$1(function(){let a=0;const b=ta$1(String(Na$1)).split("."),c=ta$1("9").split("."),d=Math.max(b.length,c.length);for(let h=0;0==a&&h<d;h++){var e=b[h]||"",f=c[h]||"";do{e=/(\d*)(\D*)(.*)/.exec(e)||["","","",""];f=/(\d*)(\D*)(.*)/.exec(f)||["","","",""];if(0==e[0].length&&0==f[0].length)break;a=ua$1(0==e[1].length?0:parseInt(e[1],10),0==f[1].length?0:parseInt(f[1],10))||ua$1(0==e[2].length,0==f[2].length)||ua$1(e[2],f[2]);e=e[3];f=f[3];}while(0==a)}return 0<=a})}var Sa$1;
    if(l.document&&y){var Ta=Ma$1();Sa$1=Ta?Ta:parseInt(Na$1,10)||void 0;}else Sa$1=void 0;var Ua=Sa$1;var Va=function(){if(!l.addEventListener||!Object.defineProperty)return !1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0;}});try{l.addEventListener("test",aa,b),l.removeEventListener("test",aa,b);}catch(c){}return a}();function z$1(a,b){this.type=a;this.g=this.target=b;this.defaultPrevented=!1;}z$1.prototype.h=function(){this.defaultPrevented=!0;};function A(a,b){z$1.call(this,a?a.type:"");this.relatedTarget=this.g=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.i=null;if(a){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.g=b;if(b=a.relatedTarget){if(Ka){a:{try{Ca$1(b.nodeName);var e=!0;break a}catch(f){}e=
    !1;}e||(b=null);}}else "mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;d?(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.key=a.key||"";this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=
    a.shiftKey;this.metaKey=a.metaKey;this.pointerId=a.pointerId||0;this.pointerType="string"===typeof a.pointerType?a.pointerType:Wa$1[a.pointerType]||"";this.state=a.state;this.i=a;a.defaultPrevented&&A.Z.h.call(this);}}t(A,z$1);var Wa$1={2:"touch",3:"pen",4:"mouse"};A.prototype.h=function(){A.Z.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1;};var B$1="closure_listenable_"+(1E6*Math.random()|0);var Xa$1=0;function Ya$1(a,b,c,d,e){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.capture=!!d;this.ia=e;this.key=++Xa$1;this.ca=this.fa=!1;}function Za$1(a){a.ca=!0;a.listener=null;a.proxy=null;a.src=null;a.ia=null;}function $a$1(a){this.src=a;this.g={};this.h=0;}$a$1.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.g[f];a||(a=this.g[f]=[],this.h++);var h=ab(a,b,d,e);-1<h?(b=a[h],c||(b.fa=!1)):(b=new Ya$1(b,this.src,f,!!d,e),b.fa=c,a.push(b));return b};function bb(a,b){var c=b.type;if(c in a.g){var d=a.g[c],e=ma(d,b),f;(f=0<=e)&&Array.prototype.splice.call(d,e,1);f&&(Za$1(b),0==a.g[c].length&&(delete a.g[c],a.h--));}}
    function ab(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.ca&&f.listener==b&&f.capture==!!c&&f.ia==d)return e}return -1}var cb="closure_lm_"+(1E6*Math.random()|0),db$1={};function fb(a,b,c,d,e){if(d&&d.once)return gb(a,b,c,d,e);if(Array.isArray(b)){for(var f=0;f<b.length;f++)fb(a,b[f],c,d,e);return null}c=hb(c);return a&&a[B$1]?a.N(b,c,p(d)?!!d.capture:!!d,e):ib(a,b,c,!1,d,e)}
    function ib(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var h=p(e)?!!e.capture:!!e,n=jb(a);n||(a[cb]=n=new $a$1(a));c=n.add(b,c,d,h,f);if(c.proxy)return c;d=kb();c.proxy=d;d.src=a;d.listener=c;if(a.addEventListener)Va||(e=h),void 0===e&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(lb(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return c}
    function kb(){function a(c){return b.call(a.src,a.listener,c)}var b=mb;return a}function gb(a,b,c,d,e){if(Array.isArray(b)){for(var f=0;f<b.length;f++)gb(a,b[f],c,d,e);return null}c=hb(c);return a&&a[B$1]?a.O(b,c,p(d)?!!d.capture:!!d,e):ib(a,b,c,!0,d,e)}
    function nb(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)nb(a,b[f],c,d,e);else (d=p(d)?!!d.capture:!!d,c=hb(c),a&&a[B$1])?(a=a.i,b=String(b).toString(),b in a.g&&(f=a.g[b],c=ab(f,c,d,e),-1<c&&(Za$1(f[c]),Array.prototype.splice.call(f,c,1),0==f.length&&(delete a.g[b],a.h--)))):a&&(a=jb(a))&&(b=a.g[b.toString()],a=-1,b&&(a=ab(b,c,d,e)),(c=-1<a?b[a]:null)&&ob(c));}
    function ob(a){if("number"!==typeof a&&a&&!a.ca){var b=a.src;if(b&&b[B$1])bb(b.i,a);else {var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(lb(c),d):b.addListener&&b.removeListener&&b.removeListener(d);(c=jb(b))?(bb(c,a),0==c.h&&(c.src=null,b[cb]=null)):Za$1(a);}}}function lb(a){return a in db$1?db$1[a]:db$1[a]="on"+a}function mb(a,b){if(a.ca)a=!0;else {b=new A(b,this);var c=a.listener,d=a.ia||a.src;a.fa&&ob(a);a=c.call(d,b);}return a}
    function jb(a){a=a[cb];return a instanceof $a$1?a:null}var pb="__closure_events_fn_"+(1E9*Math.random()>>>0);function hb(a){if("function"===typeof a)return a;a[pb]||(a[pb]=function(b){return a.handleEvent(b)});return a[pb]}function C$1(){v.call(this);this.i=new $a$1(this);this.P=this;this.I=null;}t(C$1,v);C$1.prototype[B$1]=!0;C$1.prototype.removeEventListener=function(a,b,c,d){nb(this,a,b,c,d);};
    function D$1(a,b){var c,d=a.I;if(d)for(c=[];d;d=d.I)c.push(d);a=a.P;d=b.type||b;if("string"===typeof b)b=new z$1(b,a);else if(b instanceof z$1)b.target=b.target||a;else {var e=b;b=new z$1(d,a);Aa(b,e);}e=!0;if(c)for(var f=c.length-1;0<=f;f--){var h=b.g=c[f];e=qb(h,d,!0,b)&&e;}h=b.g=a;e=qb(h,d,!0,b)&&e;e=qb(h,d,!1,b)&&e;if(c)for(f=0;f<c.length;f++)h=b.g=c[f],e=qb(h,d,!1,b)&&e;}
    C$1.prototype.M=function(){C$1.Z.M.call(this);if(this.i){var a=this.i,c;for(c in a.g){for(var d=a.g[c],e=0;e<d.length;e++)Za$1(d[e]);delete a.g[c];a.h--;}}this.I=null;};C$1.prototype.N=function(a,b,c,d){return this.i.add(String(a),b,!1,c,d)};C$1.prototype.O=function(a,b,c,d){return this.i.add(String(a),b,!0,c,d)};
    function qb(a,b,c,d){b=a.i.g[String(b)];if(!b)return !0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var h=b[f];if(h&&!h.ca&&h.capture==c){var n=h.listener,u=h.ia||h.src;h.fa&&bb(a.i,h);e=!1!==n.call(u,d)&&e;}}return e&&!d.defaultPrevented}var rb=l.JSON.stringify;function sb(){var a=tb;let b=null;a.g&&(b=a.g,a.g=a.g.next,a.g||(a.h=null),b.next=null);return b}class ub{constructor(){this.h=this.g=null;}add(a,b){const c=vb.get();c.set(a,b);this.h?this.h.next=c:this.g=c;this.h=c;}}var vb=new class{constructor(a,b){this.i=a;this.j=b;this.h=0;this.g=null;}get(){let a;0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i();return a}}(()=>new wb,a=>a.reset());
    class wb{constructor(){this.next=this.g=this.h=null;}set(a,b){this.h=a;this.g=b;this.next=null;}reset(){this.next=this.g=this.h=null;}}function yb(a){l.setTimeout(()=>{throw a;},0);}function zb(a,b){Ab||Bb();Cb||(Ab(),Cb=!0);tb.add(a,b);}var Ab;function Bb(){var a=l.Promise.resolve(void 0);Ab=function(){a.then(Db);};}var Cb=!1,tb=new ub;function Db(){for(var a;a=sb();){try{a.h.call(a.g);}catch(c){yb(c);}var b=vb;b.j(a);100>b.h&&(b.h++,a.next=b.g,b.g=a);}Cb=!1;}function Eb(a,b){C$1.call(this);this.h=a||1;this.g=b||l;this.j=q(this.kb,this);this.l=Date.now();}t(Eb,C$1);k$1=Eb.prototype;k$1.da=!1;k$1.S=null;k$1.kb=function(){if(this.da){var a=Date.now()-this.l;0<a&&a<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-a):(this.S&&(this.g.clearTimeout(this.S),this.S=null),D$1(this,"tick"),this.da&&(Fb(this),this.start()));}};k$1.start=function(){this.da=!0;this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now());};
    function Fb(a){a.da=!1;a.S&&(a.g.clearTimeout(a.S),a.S=null);}k$1.M=function(){Eb.Z.M.call(this);Fb(this);delete this.g;};function Gb(a,b,c){if("function"===typeof a)c&&(a=q(a,c));else if(a&&"function"==typeof a.handleEvent)a=q(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:l.setTimeout(a,b||0)}function Hb(a){a.g=Gb(()=>{a.g=null;a.i&&(a.i=!1,Hb(a));},a.j);const b=a.h;a.h=null;a.m.apply(null,b);}class Ib extends v{constructor(a,b){super();this.m=a;this.j=b;this.h=null;this.i=!1;this.g=null;}l(a){this.h=arguments;this.g?this.i=!0:Hb(this);}M(){super.M();this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null);}}function E(a){v.call(this);this.h=a;this.g={};}t(E,v);var Jb=[];function Kb(a,b,c,d){Array.isArray(c)||(c&&(Jb[0]=c.toString()),c=Jb);for(var e=0;e<c.length;e++){var f=fb(b,c[e],d||a.handleEvent,!1,a.h||a);if(!f)break;a.g[f.key]=f;}}function Lb(a){xa$1(a.g,function(b,c){this.g.hasOwnProperty(c)&&ob(b);},a);a.g={};}E.prototype.M=function(){E.Z.M.call(this);Lb(this);};E.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};function Mb(){this.g=!0;}Mb.prototype.Aa=function(){this.g=!1;};function Nb(a,b,c,d,e,f){a.info(function(){if(a.g)if(f){var h="";for(var n=f.split("&"),u=0;u<n.length;u++){var m=n[u].split("=");if(1<m.length){var r=m[0];m=m[1];var G=r.split("_");h=2<=G.length&&"type"==G[1]?h+(r+"="+m+"&"):h+(r+"=redacted&");}}}else h=null;else h=f;return "XMLHTTP REQ ("+d+") [attempt "+e+"]: "+b+"\n"+c+"\n"+h});}
    function Ob(a,b,c,d,e,f,h){a.info(function(){return "XMLHTTP RESP ("+d+") [ attempt "+e+"]: "+b+"\n"+c+"\n"+f+" "+h});}function F$1(a,b,c,d){a.info(function(){return "XMLHTTP TEXT ("+b+"): "+Pb(a,c)+(d?" "+d:"")});}function Qb(a,b){a.info(function(){return "TIMEOUT: "+b});}Mb.prototype.info=function(){};
    function Pb(a,b){if(!a.g)return b;if(!b)return null;try{var c=JSON.parse(b);if(c)for(a=0;a<c.length;a++)if(Array.isArray(c[a])){var d=c[a];if(!(2>d.length)){var e=d[1];if(Array.isArray(e)&&!(1>e.length)){var f=e[0];if("noop"!=f&&"stop"!=f&&"close"!=f)for(var h=1;h<e.length;h++)e[h]="";}}}return rb(c)}catch(n){return b}}var H={},Rb=null;function Sb(){return Rb=Rb||new C$1}H.Ma="serverreachability";function Tb(a){z$1.call(this,H.Ma,a);}t(Tb,z$1);function I(a){const b=Sb();D$1(b,new Tb(b,a));}H.STAT_EVENT="statevent";function Ub(a,b){z$1.call(this,H.STAT_EVENT,a);this.stat=b;}t(Ub,z$1);function J$1(a){const b=Sb();D$1(b,new Ub(b,a));}H.Na="timingevent";function Vb(a,b){z$1.call(this,H.Na,a);this.size=b;}t(Vb,z$1);
    function K$1(a,b){if("function"!==typeof a)throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a();},b)}var Wb={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9};var Xb={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function Yb(){}Yb.prototype.h=null;function Zb(a){return a.h||(a.h=a.i())}function $b(){}var L$1={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function ac$1(){z$1.call(this,"d");}t(ac$1,z$1);function bc(){z$1.call(this,"c");}t(bc,z$1);var cc$1;function dc$1(){}t(dc$1,Yb);dc$1.prototype.g=function(){return new XMLHttpRequest};dc$1.prototype.i=function(){return {}};cc$1=new dc$1;function M$1(a,b,c,d){this.l=a;this.j=b;this.m=c;this.X=d||1;this.V=new E(this);this.P=ec$1;a=Ja$1?125:void 0;this.W=new Eb(a);this.H=null;this.i=!1;this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null;this.D=[];this.g=null;this.C=0;this.o=this.u=null;this.N=-1;this.I=!1;this.O=0;this.L=null;this.aa=this.J=this.$=this.U=!1;this.h=new fc$1;}function fc$1(){this.i=null;this.g="";this.h=!1;}var ec$1=45E3,gc$1={},hc$1={};k$1=M$1.prototype;k$1.setTimeout=function(a){this.P=a;};
    function ic$1(a,b,c){a.K=1;a.v=jc$1(N$1(b));a.s=c;a.U=!0;kc$1(a,null);}function kc$1(a,b){a.F=Date.now();lc$1(a);a.A=N$1(a.v);var c=a.A,d=a.X;Array.isArray(d)||(d=[String(d)]);mc$1(c.h,"t",d);a.C=0;c=a.l.H;a.h=new fc$1;a.g=nc$1(a.l,c?b:null,!a.s);0<a.O&&(a.L=new Ib(q(a.Ia,a,a.g),a.O));Kb(a.V,a.g,"readystatechange",a.gb);b=a.H?ya(a.H):{};a.s?(a.u||(a.u="POST"),b["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.s,b)):(a.u="GET",a.g.ea(a.A,a.u,null,b));I(1);Nb(a.j,a.u,a.A,a.m,a.X,a.s);}
    k$1.gb=function(a){a=a.target;const b=this.L;b&&3==O(a)?b.l():this.Ia(a);};
    k$1.Ia=function(a){try{if(a==this.g)a:{const r=O(this.g);var b=this.g.Da();const G=this.g.ba();if(!(3>r)&&(3!=r||Ja$1||this.g&&(this.h.h||this.g.ga()||oc$1(this.g)))){this.I||4!=r||7==b||(8==b||0>=G?I(3):I(2));pc$1(this);var c=this.g.ba();this.N=c;b:if(qc$1(this)){var d=oc$1(this.g);a="";var e=d.length,f=4==O(this.g);if(!this.h.i){if("undefined"===typeof TextDecoder){P(this);rc$1(this);var h="";break b}this.h.i=new l.TextDecoder;}for(b=0;b<e;b++)this.h.h=!0,a+=this.h.i.decode(d[b],{stream:f&&b==e-1});d.splice(0,
    e);this.h.g+=a;this.C=0;h=this.h.g;}else h=this.g.ga();this.i=200==c;Ob(this.j,this.u,this.A,this.m,this.X,r,c);if(this.i){if(this.$&&!this.J){b:{if(this.g){var n,u=this.g;if((n=u.g?u.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!sa(n)){var m=n;break b}}m=null;}if(c=m)F$1(this.j,this.m,c,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,sc$1(this,c);else {this.i=!1;this.o=3;J$1(12);P(this);rc$1(this);break a}}this.U?(tc$1(this,r,h),Ja$1&&this.i&&3==r&&(Kb(this.V,this.W,"tick",this.fb),
    this.W.start())):(F$1(this.j,this.m,h,null),sc$1(this,h));4==r&&P(this);this.i&&!this.I&&(4==r?uc$1(this.l,this):(this.i=!1,lc$1(this)));}else 400==c&&0<h.indexOf("Unknown SID")?(this.o=3,J$1(12)):(this.o=0,J$1(13)),P(this),rc$1(this);}}}catch(r){}finally{}};function qc$1(a){return a.g?"GET"==a.u&&2!=a.K&&a.l.Ba:!1}
    function tc$1(a,b,c){let d=!0,e;for(;!a.I&&a.C<c.length;)if(e=vc(a,c),e==hc$1){4==b&&(a.o=4,J$1(14),d=!1);F$1(a.j,a.m,null,"[Incomplete Response]");break}else if(e==gc$1){a.o=4;J$1(15);F$1(a.j,a.m,c,"[Invalid Chunk]");d=!1;break}else F$1(a.j,a.m,e,null),sc$1(a,e);qc$1(a)&&e!=hc$1&&e!=gc$1&&(a.h.g="",a.C=0);4!=b||0!=c.length||a.h.h||(a.o=1,J$1(16),d=!1);a.i=a.i&&d;d?0<c.length&&!a.aa&&(a.aa=!0,b=a.l,b.g==a&&b.$&&!b.L&&(b.h.info("Great, no buffering proxy detected. Bytes received: "+c.length),wc$1(b),b.L=!0,J$1(11))):(F$1(a.j,a.m,
    c,"[Invalid Chunked Response]"),P(a),rc$1(a));}k$1.fb=function(){if(this.g){var a=O(this.g),b=this.g.ga();this.C<b.length&&(pc$1(this),tc$1(this,a,b),this.i&&4!=a&&lc$1(this));}};function vc(a,b){var c=a.C,d=b.indexOf("\n",c);if(-1==d)return hc$1;c=Number(b.substring(c,d));if(isNaN(c))return gc$1;d+=1;if(d+c>b.length)return hc$1;b=b.substr(d,c);a.C=d+c;return b}k$1.cancel=function(){this.I=!0;P(this);};function lc$1(a){a.Y=Date.now()+a.P;xc$1(a,a.P);}
    function xc$1(a,b){if(null!=a.B)throw Error("WatchDog timer not null");a.B=K$1(q(a.eb,a),b);}function pc$1(a){a.B&&(l.clearTimeout(a.B),a.B=null);}k$1.eb=function(){this.B=null;const a=Date.now();0<=a-this.Y?(Qb(this.j,this.A),2!=this.K&&(I(3),J$1(17)),P(this),this.o=2,rc$1(this)):xc$1(this,this.Y-a);};function rc$1(a){0==a.l.G||a.I||uc$1(a.l,a);}function P(a){pc$1(a);var b=a.L;b&&"function"==typeof b.na&&b.na();a.L=null;Fb(a.W);Lb(a.V);a.g&&(b=a.g,a.g=null,b.abort(),b.na());}
    function sc$1(a,b){try{var c=a.l;if(0!=c.G&&(c.g==a||yc$1(c.i,a)))if(c.I=a.N,!a.J&&yc$1(c.i,a)&&3==c.G){try{var d=c.Ca.g.parse(b);}catch(m){d=null;}if(Array.isArray(d)&&3==d.length){var e=d;if(0==e[0])a:{if(!c.u){if(c.g)if(c.g.F+3E3<a.F)zc$1(c),Ac$1(c);else break a;Bc$1(c);J$1(18);}}else c.ta=e[1],0<c.ta-c.U&&37500>e[2]&&c.N&&0==c.A&&!c.v&&(c.v=K$1(q(c.ab,c),6E3));if(1>=Cc$1(c.i)&&c.ka){try{c.ka();}catch(m){}c.ka=void 0;}}else Q$1(c,11);}else if((a.J||c.g==a)&&zc$1(c),!sa(b))for(e=c.Ca.g.parse(b),b=0;b<e.length;b++){let m=e[b];
    c.U=m[0];m=m[1];if(2==c.G)if("c"==m[0]){c.J=m[1];c.la=m[2];const r=m[3];null!=r&&(c.ma=r,c.h.info("VER="+c.ma));const G=m[4];null!=G&&(c.za=G,c.h.info("SVER="+c.za));const Da=m[5];null!=Da&&"number"===typeof Da&&0<Da&&(d=1.5*Da,c.K=d,c.h.info("backChannelRequestTimeoutMs_="+d));d=c;const ca=a.g;if(ca){const Ea=ca.g?ca.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ea){var f=d.i;!f.g&&(w(Ea,"spdy")||w(Ea,"quic")||w(Ea,"h2"))&&(f.j=f.l,f.g=new Set,f.h&&(Dc$1(f,f.h),f.h=null));}if(d.D){const xb=
    ca.g?ca.g.getResponseHeader("X-HTTP-Session-Id"):null;xb&&(d.sa=xb,R(d.F,d.D,xb));}}c.G=3;c.j&&c.j.xa();c.$&&(c.O=Date.now()-a.F,c.h.info("Handshake RTT: "+c.O+"ms"));d=c;var h=a;d.oa=Ec$1(d,d.H?d.la:null,d.W);if(h.J){Fc$1(d.i,h);var n=h,u=d.K;u&&n.setTimeout(u);n.B&&(pc$1(n),lc$1(n));d.g=h;}else Gc(d);0<c.l.length&&Hc$1(c);}else "stop"!=m[0]&&"close"!=m[0]||Q$1(c,7);else 3==c.G&&("stop"==m[0]||"close"==m[0]?"stop"==m[0]?Q$1(c,7):Ic$1(c):"noop"!=m[0]&&c.j&&c.j.wa(m),c.A=0);}I(4);}catch(m){}}function Jc$1(a){if(a.R&&"function"==typeof a.R)return a.R();if("string"===typeof a)return a.split("");if(ba(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}b=[];c=0;for(d in a)b[c++]=a[d];return b}
    function Kc$1(a,b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(ba(a)||"string"===typeof a)na$1(a,b,void 0);else {if(a.T&&"function"==typeof a.T)var c=a.T();else if(a.R&&"function"==typeof a.R)c=void 0;else if(ba(a)||"string"===typeof a){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e);}else for(e in c=[],d=0,a)c[d++]=e;d=Jc$1(a);e=d.length;for(var f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a);}}function S(a,b){this.h={};this.g=[];this.i=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1]);}else if(a)if(a instanceof S)for(c=a.T(),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d]);}k$1=S.prototype;k$1.R=function(){Lc$1(this);for(var a=[],b=0;b<this.g.length;b++)a.push(this.h[this.g[b]]);return a};k$1.T=function(){Lc$1(this);return this.g.concat()};
    function Lc$1(a){if(a.i!=a.g.length){for(var b=0,c=0;b<a.g.length;){var d=a.g[b];T(a.h,d)&&(a.g[c++]=d);b++;}a.g.length=c;}if(a.i!=a.g.length){var e={};for(c=b=0;b<a.g.length;)d=a.g[b],T(e,d)||(a.g[c++]=d,e[d]=1),b++;a.g.length=c;}}k$1.get=function(a,b){return T(this.h,a)?this.h[a]:b};k$1.set=function(a,b){T(this.h,a)||(this.i++,this.g.push(a));this.h[a]=b;};k$1.forEach=function(a,b){for(var c=this.T(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this);}};
    function T(a,b){return Object.prototype.hasOwnProperty.call(a,b)}var Mc$1=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function Nc$1(a,b){if(a){a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c].indexOf("="),e=null;if(0<=d){var f=a[c].substring(0,d);e=a[c].substring(d+1);}else f=a[c];b(f,e?decodeURIComponent(e.replace(/\+/g," ")):"");}}}function U$1(a,b){this.i=this.s=this.j="";this.m=null;this.o=this.l="";this.g=!1;if(a instanceof U$1){this.g=void 0!==b?b:a.g;Oc$1(this,a.j);this.s=a.s;Pc(this,a.i);Qc$1(this,a.m);this.l=a.l;b=a.h;var c=new Rc$1;c.i=b.i;b.g&&(c.g=new S(b.g),c.h=b.h);Sc$1(this,c);this.o=a.o;}else a&&(c=String(a).match(Mc$1))?(this.g=!!b,Oc$1(this,c[1]||"",!0),this.s=Tc$1(c[2]||""),Pc(this,c[3]||"",!0),Qc$1(this,c[4]),this.l=Tc$1(c[5]||"",!0),Sc$1(this,c[6]||"",!0),this.o=Tc$1(c[7]||"")):(this.g=!!b,this.h=new Rc$1(null,this.g));}
    U$1.prototype.toString=function(){var a=[],b=this.j;b&&a.push(Uc$1(b,Vc,!0),":");var c=this.i;if(c||"file"==b)a.push("//"),(b=this.s)&&a.push(Uc$1(b,Vc,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.m,null!=c&&a.push(":",String(c));if(c=this.l)this.i&&"/"!=c.charAt(0)&&a.push("/"),a.push(Uc$1(c,"/"==c.charAt(0)?Wc$1:Xc$1,!0));(c=this.h.toString())&&a.push("?",c);(c=this.o)&&a.push("#",Uc$1(c,Yc$1));return a.join("")};function N$1(a){return new U$1(a)}
    function Oc$1(a,b,c){a.j=c?Tc$1(b,!0):b;a.j&&(a.j=a.j.replace(/:$/,""));}function Pc(a,b,c){a.i=c?Tc$1(b,!0):b;}function Qc$1(a,b){if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.m=b;}else a.m=null;}function Sc$1(a,b,c){b instanceof Rc$1?(a.h=b,Zc$1(a.h,a.g)):(c||(b=Uc$1(b,$c$1)),a.h=new Rc$1(b,a.g));}function R(a,b,c){a.h.set(b,c);}function jc$1(a){R(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36));return a}
    function ad(a){return a instanceof U$1?N$1(a):new U$1(a,void 0)}function bd(a,b,c,d){var e=new U$1(null,void 0);a&&Oc$1(e,a);b&&Pc(e,b);c&&Qc$1(e,c);d&&(e.l=d);return e}function Tc$1(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Uc$1(a,b,c){return "string"===typeof a?(a=encodeURI(a).replace(b,cd),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function cd(a){a=a.charCodeAt(0);return "%"+(a>>4&15).toString(16)+(a&15).toString(16)}
    var Vc=/[#\/\?@]/g,Xc$1=/[#\?:]/g,Wc$1=/[#\?]/g,$c$1=/[#\?@]/g,Yc$1=/#/g;function Rc$1(a,b){this.h=this.g=null;this.i=a||null;this.j=!!b;}function V(a){a.g||(a.g=new S,a.h=0,a.i&&Nc$1(a.i,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c);}));}k$1=Rc$1.prototype;k$1.add=function(a,b){V(this);this.i=null;a=W$1(this,a);var c=this.g.get(a);c||this.g.set(a,c=[]);c.push(b);this.h+=1;return this};
    function dd(a,b){V(a);b=W$1(a,b);T(a.g.h,b)&&(a.i=null,a.h-=a.g.get(b).length,a=a.g,T(a.h,b)&&(delete a.h[b],a.i--,a.g.length>2*a.i&&Lc$1(a)));}function ed(a,b){V(a);b=W$1(a,b);return T(a.g.h,b)}k$1.forEach=function(a,b){V(this);this.g.forEach(function(c,d){na$1(c,function(e){a.call(b,e,d,this);},this);},this);};k$1.T=function(){V(this);for(var a=this.g.R(),b=this.g.T(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
    k$1.R=function(a){V(this);var b=[];if("string"===typeof a)ed(this,a)&&(b=qa(b,this.g.get(W$1(this,a))));else {a=this.g.R();for(var c=0;c<a.length;c++)b=qa(b,a[c]);}return b};k$1.set=function(a,b){V(this);this.i=null;a=W$1(this,a);ed(this,a)&&(this.h-=this.g.get(a).length);this.g.set(a,[b]);this.h+=1;return this};k$1.get=function(a,b){if(!a)return b;a=this.R(a);return 0<a.length?String(a[0]):b};function mc$1(a,b,c){dd(a,b);0<c.length&&(a.i=null,a.g.set(W$1(a,b),ra(c)),a.h+=c.length);}
    k$1.toString=function(){if(this.i)return this.i;if(!this.g)return "";for(var a=[],b=this.g.T(),c=0;c<b.length;c++){var d=b[c],e=encodeURIComponent(String(d));d=this.R(d);for(var f=0;f<d.length;f++){var h=e;""!==d[f]&&(h+="="+encodeURIComponent(String(d[f])));a.push(h);}}return this.i=a.join("&")};function W$1(a,b){b=String(b);a.j&&(b=b.toLowerCase());return b}function Zc$1(a,b){b&&!a.j&&(V(a),a.i=null,a.g.forEach(function(c,d){var e=d.toLowerCase();d!=e&&(dd(this,d),mc$1(this,e,c));},a));a.j=b;}var fd=class{constructor(a,b){this.h=a;this.g=b;}};function gd(a){this.l=a||hd;l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&("hq"==a[0].nextHopProtocol||"h2"==a[0].nextHopProtocol)):a=!!(l.g&&l.g.Ea&&l.g.Ea()&&l.g.Ea().Zb);this.j=a?this.l:1;this.g=null;1<this.j&&(this.g=new Set);this.h=null;this.i=[];}var hd=10;function id(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Cc$1(a){return a.h?1:a.g?a.g.size:0}function yc$1(a,b){return a.h?a.h==b:a.g?a.g.has(b):!1}function Dc$1(a,b){a.g?a.g.add(b):a.h=b;}
    function Fc$1(a,b){a.h&&a.h==b?a.h=null:a.g&&a.g.has(b)&&a.g.delete(b);}gd.prototype.cancel=function(){this.i=jd(this);if(this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const a of this.g.values())a.cancel();this.g.clear();}};function jd(a){if(null!=a.h)return a.i.concat(a.h.D);if(null!=a.g&&0!==a.g.size){let b=a.i;for(const c of a.g.values())b=b.concat(c.D);return b}return ra(a.i)}function kd(){}kd.prototype.stringify=function(a){return l.JSON.stringify(a,void 0)};kd.prototype.parse=function(a){return l.JSON.parse(a,void 0)};function ld(){this.g=new kd;}function md(a,b,c){const d=c||"";try{Kc$1(a,function(e,f){let h=e;p(e)&&(h=rb(e));b.push(d+f+"="+encodeURIComponent(h));});}catch(e){throw b.push(d+"type="+encodeURIComponent("_badmap")),e;}}function nd(a,b){const c=new Mb;if(l.Image){const d=new Image;d.onload=ja(od,c,d,"TestLoadImage: loaded",!0,b);d.onerror=ja(od,c,d,"TestLoadImage: error",!1,b);d.onabort=ja(od,c,d,"TestLoadImage: abort",!1,b);d.ontimeout=ja(od,c,d,"TestLoadImage: timeout",!1,b);l.setTimeout(function(){if(d.ontimeout)d.ontimeout();},1E4);d.src=a;}else b(!1);}function od(a,b,c,d,e){try{b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null,e(d);}catch(f){}}function pd(a){this.l=a.$b||null;this.j=a.ib||!1;}t(pd,Yb);pd.prototype.g=function(){return new qd(this.l,this.j)};pd.prototype.i=function(a){return function(){return a}}({});function qd(a,b){C$1.call(this);this.D=a;this.u=b;this.m=void 0;this.readyState=rd;this.status=0;this.responseType=this.responseText=this.response=this.statusText="";this.onreadystatechange=null;this.v=new Headers;this.h=null;this.C="GET";this.B="";this.g=!1;this.A=this.j=this.l=null;}t(qd,C$1);var rd=0;k$1=qd.prototype;
    k$1.open=function(a,b){if(this.readyState!=rd)throw this.abort(),Error("Error reopening a connection");this.C=a;this.B=b;this.readyState=1;sd(this);};k$1.send=function(a){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const b={headers:this.v,method:this.C,credentials:this.m,cache:void 0};a&&(b.body=a);(this.D||l).fetch(new Request(this.B,b)).then(this.Va.bind(this),this.ha.bind(this));};
    k$1.abort=function(){this.response=this.responseText="";this.v=new Headers;this.status=0;this.j&&this.j.cancel("Request was aborted.");1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,td(this));this.readyState=rd;};
    k$1.Va=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,sd(this)),this.g&&(this.readyState=3,sd(this),this.g)))if("arraybuffer"===this.responseType)a.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if("undefined"!==typeof l.ReadableStream&&"body"in a){this.j=a.body.getReader();if(this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=
    [];}else this.response=this.responseText="",this.A=new TextDecoder;ud(this);}else a.text().then(this.Ua.bind(this),this.ha.bind(this));};function ud(a){a.j.read().then(a.Sa.bind(a)).catch(a.ha.bind(a));}k$1.Sa=function(a){if(this.g){if(this.u&&a.value)this.response.push(a.value);else if(!this.u){var b=a.value?a.value:new Uint8Array(0);if(b=this.A.decode(b,{stream:!a.done}))this.response=this.responseText+=b;}a.done?td(this):sd(this);3==this.readyState&&ud(this);}};
    k$1.Ua=function(a){this.g&&(this.response=this.responseText=a,td(this));};k$1.Ta=function(a){this.g&&(this.response=a,td(this));};k$1.ha=function(){this.g&&td(this);};function td(a){a.readyState=4;a.l=null;a.j=null;a.A=null;sd(a);}k$1.setRequestHeader=function(a,b){this.v.append(a,b);};k$1.getResponseHeader=function(a){return this.h?this.h.get(a.toLowerCase())||"":""};
    k$1.getAllResponseHeaders=function(){if(!this.h)return "";const a=[],b=this.h.entries();for(var c=b.next();!c.done;)c=c.value,a.push(c[0]+": "+c[1]),c=b.next();return a.join("\r\n")};function sd(a){a.onreadystatechange&&a.onreadystatechange.call(a);}Object.defineProperty(qd.prototype,"withCredentials",{get:function(){return "include"===this.m},set:function(a){this.m=a?"include":"same-origin";}});var vd=l.JSON.parse;function X$1(a){C$1.call(this);this.headers=new S;this.u=a||null;this.h=!1;this.C=this.g=null;this.H="";this.m=0;this.j="";this.l=this.F=this.v=this.D=!1;this.B=0;this.A=null;this.J=wd;this.K=this.L=!1;}t(X$1,C$1);var wd="",xd=/^https?$/i,yd=["POST","PUT"];k$1=X$1.prototype;
    k$1.ea=function(a,b,c,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+a);b=b?b.toUpperCase():"GET";this.H=a;this.j="";this.m=0;this.D=!1;this.h=!0;this.g=this.u?this.u.g():cc$1.g();this.C=this.u?Zb(this.u):Zb(cc$1);this.g.onreadystatechange=q(this.Fa,this);try{this.F=!0,this.g.open(b,String(a),!0),this.F=!1;}catch(f){zd(this,f);return}a=c||"";const e=new S(this.headers);d&&Kc$1(d,function(f,h){e.set(h,f);});d=oa(e.T());c=l.FormData&&a instanceof l.FormData;
    !(0<=ma(yd,b))||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(f,h){this.g.setRequestHeader(h,f);},this);this.J&&(this.g.responseType=this.J);"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{Ad(this),0<this.B&&((this.K=Bd(this.g))?(this.g.timeout=this.B,this.g.ontimeout=q(this.pa,this)):this.A=Gb(this.pa,this.B,this)),this.v=!0,this.g.send(a),this.v=!1;}catch(f){zd(this,f);}};
    function Bd(a){return y&&Ra()&&"number"===typeof a.timeout&&void 0!==a.ontimeout}function pa(a){return "content-type"==a.toLowerCase()}k$1.pa=function(){"undefined"!=typeof goog&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,D$1(this,"timeout"),this.abort(8));};function zd(a,b){a.h=!1;a.g&&(a.l=!0,a.g.abort(),a.l=!1);a.j=b;a.m=5;Cd(a);Dd(a);}function Cd(a){a.D||(a.D=!0,D$1(a,"complete"),D$1(a,"error"));}
    k$1.abort=function(a){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=a||7,D$1(this,"complete"),D$1(this,"abort"),Dd(this));};k$1.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Dd(this,!0));X$1.Z.M.call(this);};k$1.Fa=function(){this.s||(this.F||this.v||this.l?Ed(this):this.cb());};k$1.cb=function(){Ed(this);};
    function Ed(a){if(a.h&&"undefined"!=typeof goog&&(!a.C[1]||4!=O(a)||2!=a.ba()))if(a.v&&4==O(a))Gb(a.Fa,0,a);else if(D$1(a,"readystatechange"),4==O(a)){a.h=!1;try{const n=a.ba();a:switch(n){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var b=!0;break a;default:b=!1;}var c;if(!(c=b)){var d;if(d=0===n){var e=String(a.H).match(Mc$1)[1]||null;if(!e&&l.self&&l.self.location){var f=l.self.location.protocol;e=f.substr(0,f.length-1);}d=!xd.test(e?e.toLowerCase():"");}c=d;}if(c)D$1(a,"complete"),D$1(a,
    "success");else {a.m=6;try{var h=2<O(a)?a.g.statusText:"";}catch(u){h="";}a.j=h+" ["+a.ba()+"]";Cd(a);}}finally{Dd(a);}}}function Dd(a,b){if(a.g){Ad(a);const c=a.g,d=a.C[0]?aa:null;a.g=null;a.C=null;b||D$1(a,"ready");try{c.onreadystatechange=d;}catch(e){}}}function Ad(a){a.g&&a.K&&(a.g.ontimeout=null);a.A&&(l.clearTimeout(a.A),a.A=null);}function O(a){return a.g?a.g.readyState:0}k$1.ba=function(){try{return 2<O(this)?this.g.status:-1}catch(a){return -1}};
    k$1.ga=function(){try{return this.g?this.g.responseText:""}catch(a){return ""}};k$1.Qa=function(a){if(this.g){var b=this.g.responseText;a&&0==b.indexOf(a)&&(b=b.substring(a.length));return vd(b)}};function oc$1(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.J){case wd:case "text":return a.g.responseText;case "arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch(b){return null}}k$1.Da=function(){return this.m};
    k$1.La=function(){return "string"===typeof this.j?this.j:String(this.j)};function Fd(a){let b="";xa$1(a,function(c,d){b+=d;b+=":";b+=c;b+="\r\n";});return b}function Gd(a,b,c){a:{for(d in c){var d=!1;break a}d=!0;}d||(c=Fd(c),"string"===typeof a?(null!=c&&encodeURIComponent(String(c))):R(a,b,c));}function Hd(a,b,c){return c&&c.internalChannelParams?c.internalChannelParams[a]||b:b}
    function Id(a){this.za=0;this.l=[];this.h=new Mb;this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null;this.Za=this.V=0;this.Xa=Hd("failFast",!1,a);this.N=this.v=this.u=this.m=this.j=null;this.X=!0;this.I=this.ta=this.U=-1;this.Y=this.A=this.C=0;this.Pa=Hd("baseRetryDelayMs",5E3,a);this.$a=Hd("retryDelaySeedMs",1E4,a);this.Ya=Hd("forwardChannelMaxRetries",2,a);this.ra=Hd("forwardChannelRequestTimeoutMs",2E4,a);this.qa=a&&a.xmlHttpFactory||void 0;this.Ba=a&&a.Yb||!1;
    this.K=void 0;this.H=a&&a.supportsCrossDomainXhr||!1;this.J="";this.i=new gd(a&&a.concurrentRequestLimit);this.Ca=new ld;this.ja=a&&a.fastHandshake||!1;this.Ra=a&&a.Wb||!1;a&&a.Aa&&this.h.Aa();a&&a.forceLongPolling&&(this.X=!1);this.$=!this.ja&&this.X&&a&&a.detectBufferingProxy||!1;this.ka=void 0;this.O=0;this.L=!1;this.B=null;this.Wa=!a||!1!==a.Xb;}k$1=Id.prototype;k$1.ma=8;k$1.G=1;
    function Ic$1(a){Jd(a);if(3==a.G){var b=a.V++,c=N$1(a.F);R(c,"SID",a.J);R(c,"RID",b);R(c,"TYPE","terminate");Kd(a,c);b=new M$1(a,a.h,b,void 0);b.K=2;b.v=jc$1(N$1(c));c=!1;l.navigator&&l.navigator.sendBeacon&&(c=l.navigator.sendBeacon(b.v.toString(),""));!c&&l.Image&&((new Image).src=b.v,c=!0);c||(b.g=nc$1(b.l,null),b.g.ea(b.v));b.F=Date.now();lc$1(b);}Ld(a);}k$1.hb=function(a){try{this.h.info("Origin Trials invoked: "+a);}catch(b){}};function Ac$1(a){a.g&&(wc$1(a),a.g.cancel(),a.g=null);}
    function Jd(a){Ac$1(a);a.u&&(l.clearTimeout(a.u),a.u=null);zc$1(a);a.i.cancel();a.m&&("number"===typeof a.m&&l.clearTimeout(a.m),a.m=null);}function Md(a,b){a.l.push(new fd(a.Za++,b));3==a.G&&Hc$1(a);}function Hc$1(a){id(a.i)||a.m||(a.m=!0,zb(a.Ha,a),a.C=0);}function Nd(a,b){if(Cc$1(a.i)>=a.i.j-(a.m?1:0))return !1;if(a.m)return a.l=b.D.concat(a.l),!0;if(1==a.G||2==a.G||a.C>=(a.Xa?0:a.Ya))return !1;a.m=K$1(q(a.Ha,a,b),Od(a,a.C));a.C++;return !0}
    k$1.Ha=function(a){if(this.m)if(this.m=null,1==this.G){if(!a){this.V=Math.floor(1E5*Math.random());a=this.V++;const e=new M$1(this,this.h,a,void 0);let f=this.s;this.P&&(f?(f=ya(f),Aa(f,this.P)):f=this.P);null===this.o&&(e.H=f);if(this.ja)a:{var b=0;for(var c=0;c<this.l.length;c++){b:{var d=this.l[c];if("__data__"in d.g&&(d=d.g.__data__,"string"===typeof d)){d=d.length;break b}d=void 0;}if(void 0===d)break;b+=d;if(4096<b){b=c;break a}if(4096===b||c===this.l.length-1){b=c+1;break a}}b=1E3;}else b=1E3;b=
    Pd(this,e,b);c=N$1(this.F);R(c,"RID",a);R(c,"CVER",22);this.D&&R(c,"X-HTTP-Session-Id",this.D);Kd(this,c);this.o&&f&&Gd(c,this.o,f);Dc$1(this.i,e);this.Ra&&R(c,"TYPE","init");this.ja?(R(c,"$req",b),R(c,"SID","null"),e.$=!0,ic$1(e,c,null)):ic$1(e,c,b);this.G=2;}}else 3==this.G&&(a?Qd(this,a):0==this.l.length||id(this.i)||Qd(this));};
    function Qd(a,b){var c;b?c=b.m:c=a.V++;const d=N$1(a.F);R(d,"SID",a.J);R(d,"RID",c);R(d,"AID",a.U);Kd(a,d);a.o&&a.s&&Gd(d,a.o,a.s);c=new M$1(a,a.h,c,a.C+1);null===a.o&&(c.H=a.s);b&&(a.l=b.D.concat(a.l));b=Pd(a,c,1E3);c.setTimeout(Math.round(.5*a.ra)+Math.round(.5*a.ra*Math.random()));Dc$1(a.i,c);ic$1(c,d,b);}function Kd(a,b){a.j&&Kc$1({},function(c,d){R(b,d,c);});}
    function Pd(a,b,c){c=Math.min(a.l.length,c);var d=a.j?q(a.j.Oa,a.j,a):null;a:{var e=a.l;let f=-1;for(;;){const h=["count="+c];-1==f?0<c?(f=e[0].h,h.push("ofs="+f)):f=0:h.push("ofs="+f);let n=!0;for(let u=0;u<c;u++){let m=e[u].h;const r=e[u].g;m-=f;if(0>m)f=Math.max(0,e[u].h-100),n=!1;else try{md(r,h,"req"+m+"_");}catch(G){d&&d(r);}}if(n){d=h.join("&");break a}}}a=a.l.splice(0,c);b.D=a;return d}function Gc(a){a.g||a.u||(a.Y=1,zb(a.Ga,a),a.A=0);}
    function Bc$1(a){if(a.g||a.u||3<=a.A)return !1;a.Y++;a.u=K$1(q(a.Ga,a),Od(a,a.A));a.A++;return !0}k$1.Ga=function(){this.u=null;Rd(this);if(this.$&&!(this.L||null==this.g||0>=this.O)){var a=2*this.O;this.h.info("BP detection timer enabled: "+a);this.B=K$1(q(this.bb,this),a);}};k$1.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,J$1(10),Ac$1(this),Rd(this));};
    function wc$1(a){null!=a.B&&(l.clearTimeout(a.B),a.B=null);}function Rd(a){a.g=new M$1(a,a.h,"rpc",a.Y);null===a.o&&(a.g.H=a.s);a.g.O=0;var b=N$1(a.oa);R(b,"RID","rpc");R(b,"SID",a.J);R(b,"CI",a.N?"0":"1");R(b,"AID",a.U);Kd(a,b);R(b,"TYPE","xmlhttp");a.o&&a.s&&Gd(b,a.o,a.s);a.K&&a.g.setTimeout(a.K);var c=a.g;a=a.la;c.K=1;c.v=jc$1(N$1(b));c.s=null;c.U=!0;kc$1(c,a);}k$1.ab=function(){null!=this.v&&(this.v=null,Ac$1(this),Bc$1(this),J$1(19));};function zc$1(a){null!=a.v&&(l.clearTimeout(a.v),a.v=null);}
    function uc$1(a,b){var c=null;if(a.g==b){zc$1(a);wc$1(a);a.g=null;var d=2;}else if(yc$1(a.i,b))c=b.D,Fc$1(a.i,b),d=1;else return;a.I=b.N;if(0!=a.G)if(b.i)if(1==d){c=b.s?b.s.length:0;b=Date.now()-b.F;var e=a.C;d=Sb();D$1(d,new Vb(d,c,b,e));Hc$1(a);}else Gc(a);else if(e=b.o,3==e||0==e&&0<a.I||!(1==d&&Nd(a,b)||2==d&&Bc$1(a)))switch(c&&0<c.length&&(b=a.i,b.i=b.i.concat(c)),e){case 1:Q$1(a,5);break;case 4:Q$1(a,10);break;case 3:Q$1(a,6);break;default:Q$1(a,2);}}
    function Od(a,b){let c=a.Pa+Math.floor(Math.random()*a.$a);a.j||(c*=2);return c*b}function Q$1(a,b){a.h.info("Error code "+b);if(2==b){var c=null;a.j&&(c=null);var d=q(a.jb,a);c||(c=new U$1("//www.google.com/images/cleardot.gif"),l.location&&"http"==l.location.protocol||Oc$1(c,"https"),jc$1(c));nd(c.toString(),d);}else J$1(2);a.G=0;a.j&&a.j.va(b);Ld(a);Jd(a);}k$1.jb=function(a){a?(this.h.info("Successfully pinged google.com"),J$1(2)):(this.h.info("Failed to ping google.com"),J$1(1));};
    function Ld(a){a.G=0;a.I=-1;if(a.j){if(0!=jd(a.i).length||0!=a.l.length)a.i.i.length=0,ra(a.l),a.l.length=0;a.j.ua();}}function Ec$1(a,b,c){let d=ad(c);if(""!=d.i)b&&Pc(d,b+"."+d.i),Qc$1(d,d.m);else {const e=l.location;d=bd(e.protocol,b?b+"."+e.hostname:e.hostname,+e.port,c);}a.aa&&xa$1(a.aa,function(e,f){R(d,f,e);});b=a.D;c=a.sa;b&&c&&R(d,b,c);R(d,"VER",a.ma);Kd(a,d);return d}
    function nc$1(a,b,c){if(b&&!a.H)throw Error("Can't create secondary domain capable XhrIo object.");b=c&&a.Ba&&!a.qa?new X$1(new pd({ib:!0})):new X$1(a.qa);b.L=a.H;return b}function Sd(){}k$1=Sd.prototype;k$1.xa=function(){};k$1.wa=function(){};k$1.va=function(){};k$1.ua=function(){};k$1.Oa=function(){};function Td(){if(y&&!(10<=Number(Ua)))throw Error("Environmental error: no available transport.");}Td.prototype.g=function(a,b){return new Y$1(a,b)};
    function Y$1(a,b){C$1.call(this);this.g=new Id(b);this.l=a;this.h=b&&b.messageUrlParams||null;a=b&&b.messageHeaders||null;b&&b.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"});this.g.s=a;a=b&&b.initMessageHeaders||null;b&&b.messageContentType&&(a?a["X-WebChannel-Content-Type"]=b.messageContentType:a={"X-WebChannel-Content-Type":b.messageContentType});b&&b.ya&&(a?a["X-WebChannel-Client-Profile"]=b.ya:a={"X-WebChannel-Client-Profile":b.ya});this.g.P=
    a;(a=b&&b.httpHeadersOverwriteParam)&&!sa(a)&&(this.g.o=a);this.A=b&&b.supportsCrossDomainXhr||!1;this.v=b&&b.sendRawJson||!1;(b=b&&b.httpSessionIdParam)&&!sa(b)&&(this.g.D=b,a=this.h,null!==a&&b in a&&(a=this.h,b in a&&delete a[b]));this.j=new Z$1(this);}t(Y$1,C$1);Y$1.prototype.m=function(){this.g.j=this.j;this.A&&(this.g.H=!0);var a=this.g,b=this.l,c=this.h||void 0;a.Wa&&(a.h.info("Origin Trials enabled."),zb(q(a.hb,a,b)));J$1(0);a.W=b;a.aa=c||{};a.N=a.X;a.F=Ec$1(a,null,a.W);Hc$1(a);};Y$1.prototype.close=function(){Ic$1(this.g);};
    Y$1.prototype.u=function(a){if("string"===typeof a){var b={};b.__data__=a;Md(this.g,b);}else this.v?(b={},b.__data__=rb(a),Md(this.g,b)):Md(this.g,a);};Y$1.prototype.M=function(){this.g.j=null;delete this.j;Ic$1(this.g);delete this.g;Y$1.Z.M.call(this);};function Ud(a){ac$1.call(this);var b=a.__sm__;if(b){a:{for(const c in b){a=c;break a}a=void 0;}if(this.i=a)a=this.i,b=null!==b&&a in b?b[a]:void 0;this.data=b;}else this.data=a;}t(Ud,ac$1);function Vd(){bc.call(this);this.status=1;}t(Vd,bc);function Z$1(a){this.g=a;}
    t(Z$1,Sd);Z$1.prototype.xa=function(){D$1(this.g,"a");};Z$1.prototype.wa=function(a){D$1(this.g,new Ud(a));};Z$1.prototype.va=function(a){D$1(this.g,new Vd(a));};Z$1.prototype.ua=function(){D$1(this.g,"b");};/*

     Copyright 2017 Google LLC

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
    */
    Td.prototype.createWebChannel=Td.prototype.g;Y$1.prototype.send=Y$1.prototype.u;Y$1.prototype.open=Y$1.prototype.m;Y$1.prototype.close=Y$1.prototype.close;Wb.NO_ERROR=0;Wb.TIMEOUT=8;Wb.HTTP_ERROR=6;Xb.COMPLETE="complete";$b.EventType=L$1;L$1.OPEN="a";L$1.CLOSE="b";L$1.ERROR="c";L$1.MESSAGE="d";C$1.prototype.listen=C$1.prototype.N;X$1.prototype.listenOnce=X$1.prototype.O;X$1.prototype.getLastError=X$1.prototype.La;X$1.prototype.getLastErrorCode=X$1.prototype.Da;X$1.prototype.getStatus=X$1.prototype.ba;X$1.prototype.getResponseJson=X$1.prototype.Qa;
    X$1.prototype.getResponseText=X$1.prototype.ga;X$1.prototype.send=X$1.prototype.ea;var createWebChannelTransport = function(){return new Td};var getStatEventTarget = function(){return Sb()};var ErrorCode = Wb;var EventType = Xb;var Event = H;var Stat = {rb:0,ub:1,vb:2,Ob:3,Tb:4,Qb:5,Rb:6,Pb:7,Nb:8,Sb:9,PROXY:10,NOPROXY:11,Lb:12,Hb:13,Ib:14,Gb:15,Jb:16,Kb:17,nb:18,mb:19,ob:20};var FetchXmlHttpFactory = pd;var WebChannel = $b;
    var XhrIo = X$1;

    const D = "@firebase/firestore";

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Simple wrapper around a nullable UID. Mostly exists to make code more
     * readable.
     */
    class C {
        constructor(t) {
            this.uid = t;
        }
        isAuthenticated() {
            return null != this.uid;
        }
        /**
         * Returns a key representing this user, suitable for inclusion in a
         * dictionary.
         */    toKey() {
            return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
        }
        isEqual(t) {
            return t.uid === this.uid;
        }
    }

    /** A user with a null UID. */ C.UNAUTHENTICATED = new C(null), 
    // TODO(mikelehen): Look into getting a proper uid-equivalent for
    // non-FirebaseAuth providers.
    C.GOOGLE_CREDENTIALS = new C("google-credentials-uid"), C.FIRST_PARTY = new C("first-party-uid"), 
    C.MOCK_USER = new C("mock-user");

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    let N = "9.6.7";

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const x = new Logger("@firebase/firestore");

    // Helper methods are needed because variables can't be exported as read/write
    function k() {
        return x.logLevel;
    }

    function M(t, ...e) {
        if (x.logLevel <= LogLevel.DEBUG) {
            const n = e.map(B);
            x.debug(`Firestore (${N}): ${t}`, ...n);
        }
    }

    function $(t, ...e) {
        if (x.logLevel <= LogLevel.ERROR) {
            const n = e.map(B);
            x.error(`Firestore (${N}): ${t}`, ...n);
        }
    }

    /**
     * @internal
     */ function F(t, ...e) {
        if (x.logLevel <= LogLevel.WARN) {
            const n = e.map(B);
            x.warn(`Firestore (${N}): ${t}`, ...n);
        }
    }

    /**
     * Converts an additional log parameter to a string representation.
     */ function B(t) {
        if ("string" == typeof t) return t;
        try {
            return e = t, JSON.stringify(e);
        } catch (e) {
            // Converting to JSON failed, just log the object directly
            return t;
        }
        /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
        /** Formats an object as a JSON string, suitable for logging. */
        var e;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Unconditionally fails, throwing an Error with the given message.
     * Messages are stripped in production builds.
     *
     * Returns `never` and can be used in expressions:
     * @example
     * let futureVar = fail('not implemented yet');
     */ function L(t = "Unexpected state") {
        // Log the failure in addition to throw an exception, just in case the
        // exception is swallowed.
        const e = `FIRESTORE (${N}) INTERNAL ASSERTION FAILED: ` + t;
        // NOTE: We don't use FirestoreError here because these are internal failures
        // that cannot be handled by the user. (Also it would create a circular
        // dependency between the error and assert modules which doesn't work.)
        throw $(e), new Error(e);
    }

    /**
     * Fails if the given assertion condition is false, throwing an Error with the
     * given message if it did.
     *
     * Messages are stripped in production builds.
     */ function U(t, e) {
        t || L();
    }

    /**
     * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
     * instance of `T` before casting.
     */ function K(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e) {
        return t;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const G = {
        // Causes are copied from:
        // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
        /** Not an error; returned on success. */
        OK: "ok",
        /** The operation was cancelled (typically by the caller). */
        CANCELLED: "cancelled",
        /** Unknown error or an error from a different error domain. */
        UNKNOWN: "unknown",
        /**
         * Client specified an invalid argument. Note that this differs from
         * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
         * problematic regardless of the state of the system (e.g., a malformed file
         * name).
         */
        INVALID_ARGUMENT: "invalid-argument",
        /**
         * Deadline expired before operation could complete. For operations that
         * change the state of the system, this error may be returned even if the
         * operation has completed successfully. For example, a successful response
         * from a server could have been delayed long enough for the deadline to
         * expire.
         */
        DEADLINE_EXCEEDED: "deadline-exceeded",
        /** Some requested entity (e.g., file or directory) was not found. */
        NOT_FOUND: "not-found",
        /**
         * Some entity that we attempted to create (e.g., file or directory) already
         * exists.
         */
        ALREADY_EXISTS: "already-exists",
        /**
         * The caller does not have permission to execute the specified operation.
         * PERMISSION_DENIED must not be used for rejections caused by exhausting
         * some resource (use RESOURCE_EXHAUSTED instead for those errors).
         * PERMISSION_DENIED must not be used if the caller can not be identified
         * (use UNAUTHENTICATED instead for those errors).
         */
        PERMISSION_DENIED: "permission-denied",
        /**
         * The request does not have valid authentication credentials for the
         * operation.
         */
        UNAUTHENTICATED: "unauthenticated",
        /**
         * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
         * entire file system is out of space.
         */
        RESOURCE_EXHAUSTED: "resource-exhausted",
        /**
         * Operation was rejected because the system is not in a state required for
         * the operation's execution. For example, directory to be deleted may be
         * non-empty, an rmdir operation is applied to a non-directory, etc.
         *
         * A litmus test that may help a service implementor in deciding
         * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
         *  (a) Use UNAVAILABLE if the client can retry just the failing call.
         *  (b) Use ABORTED if the client should retry at a higher-level
         *      (e.g., restarting a read-modify-write sequence).
         *  (c) Use FAILED_PRECONDITION if the client should not retry until
         *      the system state has been explicitly fixed. E.g., if an "rmdir"
         *      fails because the directory is non-empty, FAILED_PRECONDITION
         *      should be returned since the client should not retry unless
         *      they have first fixed up the directory by deleting files from it.
         *  (d) Use FAILED_PRECONDITION if the client performs conditional
         *      REST Get/Update/Delete on a resource and the resource on the
         *      server does not match the condition. E.g., conflicting
         *      read-modify-write on the same resource.
         */
        FAILED_PRECONDITION: "failed-precondition",
        /**
         * The operation was aborted, typically due to a concurrency issue like
         * sequencer check failures, transaction aborts, etc.
         *
         * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
         * and UNAVAILABLE.
         */
        ABORTED: "aborted",
        /**
         * Operation was attempted past the valid range. E.g., seeking or reading
         * past end of file.
         *
         * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
         * if the system state changes. For example, a 32-bit file system will
         * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
         * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
         * an offset past the current file size.
         *
         * There is a fair bit of overlap between FAILED_PRECONDITION and
         * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
         * when it applies so that callers who are iterating through a space can
         * easily look for an OUT_OF_RANGE error to detect when they are done.
         */
        OUT_OF_RANGE: "out-of-range",
        /** Operation is not implemented or not supported/enabled in this service. */
        UNIMPLEMENTED: "unimplemented",
        /**
         * Internal errors. Means some invariants expected by underlying System has
         * been broken. If you see one of these errors, Something is very broken.
         */
        INTERNAL: "internal",
        /**
         * The service is currently unavailable. This is a most likely a transient
         * condition and may be corrected by retrying with a backoff.
         *
         * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
         * and UNAVAILABLE.
         */
        UNAVAILABLE: "unavailable",
        /** Unrecoverable data loss or corruption. */
        DATA_LOSS: "data-loss"
    };

    /** An error returned by a Firestore operation. */ class j extends FirebaseError {
        /** @hideconstructor */
        constructor(
        /**
         * The backend error code associated with this error.
         */
        t, 
        /**
         * A custom error description.
         */
        e) {
            super(t, e), this.code = t, this.message = e, 
            // HACK: We write a toString property directly because Error is not a real
            // class and so inheritance does not work correctly. We could alternatively
            // do the same "back-door inheritance" trick that FirebaseError does.
            this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Q {
        constructor() {
            this.promise = new Promise(((t, e) => {
                this.resolve = t, this.reject = e;
            }));
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class W {
        constructor(t, e) {
            this.user = e, this.type = "OAuth", this.headers = new Map, this.headers.set("Authorization", `Bearer ${t}`);
        }
    }

    /**
     * A CredentialsProvider that always yields an empty token.
     * @internal
     */ class z {
        getToken() {
            return Promise.resolve(null);
        }
        invalidateToken() {}
        start(t, e) {
            // Fire with initial user.
            t.enqueueRetryable((() => e(C.UNAUTHENTICATED)));
        }
        shutdown() {}
    }

    class J {
        constructor(t) {
            this.t = t, 
            /** Tracks the current User. */
            this.currentUser = C.UNAUTHENTICATED, 
            /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
            this.i = 0, this.forceRefresh = !1, this.auth = null;
        }
        start(t, e) {
            let n = this.i;
            // A change listener that prevents double-firing for the same token change.
                    const s = t => this.i !== n ? (n = this.i, e(t)) : Promise.resolve();
            // A promise that can be waited on to block on the next token change.
            // This promise is re-created after each change.
                    let i = new Q;
            this.o = () => {
                this.i++, this.currentUser = this.u(), i.resolve(), i = new Q, t.enqueueRetryable((() => s(this.currentUser)));
            };
            const r = () => {
                const e = i;
                t.enqueueRetryable((async () => {
                    await e.promise, await s(this.currentUser);
                }));
            }, o = t => {
                M("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = t, this.auth.addAuthTokenListener(this.o), 
                r();
            };
            this.t.onInit((t => o(t))), 
            // Our users can initialize Auth right after Firestore, so we give it
            // a chance to register itself with the component framework before we
            // determine whether to start up in unauthenticated mode.
            setTimeout((() => {
                if (!this.auth) {
                    const t = this.t.getImmediate({
                        optional: !0
                    });
                    t ? o(t) : (
                    // If auth is still not available, proceed with `null` user
                    M("FirebaseAuthCredentialsProvider", "Auth not yet detected"), i.resolve(), i = new Q);
                }
            }), 0), r();
        }
        getToken() {
            // Take note of the current value of the tokenCounter so that this method
            // can fail (with an ABORTED error) if there is a token change while the
            // request is outstanding.
            const t = this.i, e = this.forceRefresh;
            return this.forceRefresh = !1, this.auth ? this.auth.getToken(e).then((e => 
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            this.i !== t ? (M("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), 
            this.getToken()) : e ? (U("string" == typeof e.accessToken), new W(e.accessToken, this.currentUser)) : null)) : Promise.resolve(null);
        }
        invalidateToken() {
            this.forceRefresh = !0;
        }
        shutdown() {
            this.auth && this.auth.removeAuthTokenListener(this.o);
        }
        // Auth.getUid() can return null even with a user logged in. It is because
        // getUid() is synchronous, but the auth code populating Uid is asynchronous.
        // This method should only be called in the AuthTokenListener callback
        // to guarantee to get the actual user.
        u() {
            const t = this.auth && this.auth.getUid();
            return U(null === t || "string" == typeof t), new C(t);
        }
    }

    /*
     * FirstPartyToken provides a fresh token each time its value
     * is requested, because if the token is too old, requests will be rejected.
     * Technically this may no longer be necessary since the SDK should gracefully
     * recover from unauthenticated errors (see b/33147818 for context), but it's
     * safer to keep the implementation as-is.
     */ class Y {
        constructor(t, e, n) {
            this.type = "FirstParty", this.user = C.FIRST_PARTY, this.headers = new Map, this.headers.set("X-Goog-AuthUser", e);
            const s = t.auth.getAuthHeaderValueForFirstParty([]);
            s && this.headers.set("Authorization", s), n && this.headers.set("X-Goog-Iam-Authorization-Token", n);
        }
    }

    /*
     * Provides user credentials required for the Firestore JavaScript SDK
     * to authenticate the user, using technique that is only available
     * to applications hosted by Google.
     */ class X {
        constructor(t, e, n) {
            this.h = t, this.l = e, this.m = n;
        }
        getToken() {
            return Promise.resolve(new Y(this.h, this.l, this.m));
        }
        start(t, e) {
            // Fire with initial uid.
            t.enqueueRetryable((() => e(C.FIRST_PARTY)));
        }
        shutdown() {}
        invalidateToken() {}
    }

    class Z {
        constructor(t) {
            this.value = t, this.type = "AppCheck", this.headers = new Map, t && t.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
        }
    }

    class tt {
        constructor(t) {
            this.g = t, this.forceRefresh = !1, this.appCheck = null, this.p = null;
        }
        start(t, e) {
            const n = t => {
                null != t.error && M("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`);
                const n = t.token !== this.p;
                return this.p = t.token, M("FirebaseAppCheckTokenProvider", `Received ${n ? "new" : "existing"} token.`), 
                n ? e(t.token) : Promise.resolve();
            };
            this.o = e => {
                t.enqueueRetryable((() => n(e)));
            };
            const s = t => {
                M("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = t, this.appCheck.addTokenListener(this.o);
            };
            this.g.onInit((t => s(t))), 
            // Our users can initialize AppCheck after Firestore, so we give it
            // a chance to register itself with the component framework.
            setTimeout((() => {
                if (!this.appCheck) {
                    const t = this.g.getImmediate({
                        optional: !0
                    });
                    t ? s(t) : 
                    // If AppCheck is still not available, proceed without it.
                    M("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
                }
            }), 0);
        }
        getToken() {
            const t = this.forceRefresh;
            return this.forceRefresh = !1, this.appCheck ? this.appCheck.getToken(t).then((t => t ? (U("string" == typeof t.token), 
            this.p = t.token, new Z(t.token)) : null)) : Promise.resolve(null);
        }
        invalidateToken() {
            this.forceRefresh = !0;
        }
        shutdown() {
            this.appCheck && this.appCheck.removeTokenListener(this.o);
        }
    }

    /**
     * Builds a CredentialsProvider depending on the type of
     * the credentials passed in.
     */
    /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * `ListenSequence` is a monotonic sequence. It is initialized with a minimum value to
     * exceed. All subsequent calls to next will return increasing values. If provided with a
     * `SequenceNumberSyncer`, it will additionally bump its next value when told of a new value, as
     * well as write out sequence numbers that it produces via `next()`.
     */
    class nt {
        constructor(t, e) {
            this.previousValue = t, e && (e.sequenceNumberHandler = t => this.I(t), this.T = t => e.writeSequenceNumber(t));
        }
        I(t) {
            return this.previousValue = Math.max(t, this.previousValue), this.previousValue;
        }
        next() {
            const t = ++this.previousValue;
            return this.T && this.T(t), t;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Generates `nBytes` of random bytes.
     *
     * If `nBytes < 0` , an error will be thrown.
     */
    function st(t) {
        // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
        const e = 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t);
        if (e && "function" == typeof e.getRandomValues) e.getRandomValues(n); else 
        // Falls back to Math.random
        for (let e = 0; e < t; e++) n[e] = Math.floor(256 * Math.random());
        return n;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ nt.A = -1;

    class it {
        static R() {
            // Alphanumeric characters
            const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length;
            // The largest byte value that is a multiple of `char.length`.
                    let n = "";
            for (;n.length < 20; ) {
                const s = st(40);
                for (let i = 0; i < s.length; ++i) 
                // Only accept values that are [0, maxMultiple), this ensures they can
                // be evenly mapped to indices of `chars` via a modulo operation.
                n.length < 20 && s[i] < e && (n += t.charAt(s[i] % t.length));
            }
            return n;
        }
    }

    function rt(t, e) {
        return t < e ? -1 : t > e ? 1 : 0;
    }

    /** Helper to compare arrays using isEqual(). */ function ot(t, e, n) {
        return t.length === e.length && t.every(((t, s) => n(t, e[s])));
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // The earliest date supported by Firestore timestamps (0001-01-01T00:00:00Z).
    /**
     * A `Timestamp` represents a point in time independent of any time zone or
     * calendar, represented as seconds and fractions of seconds at nanosecond
     * resolution in UTC Epoch time.
     *
     * It is encoded using the Proleptic Gregorian Calendar which extends the
     * Gregorian calendar backwards to year one. It is encoded assuming all minutes
     * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second
     * table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to
     * 9999-12-31T23:59:59.999999999Z.
     *
     * For examples and further specifications, refer to the
     * {@link https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto | Timestamp definition}.
     */
    class ut {
        /**
         * Creates a new timestamp.
         *
         * @param seconds - The number of seconds of UTC time since Unix epoch
         *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
         *     9999-12-31T23:59:59Z inclusive.
         * @param nanoseconds - The non-negative fractions of a second at nanosecond
         *     resolution. Negative second values with fractions must still have
         *     non-negative nanoseconds values that count forward in time. Must be
         *     from 0 to 999,999,999 inclusive.
         */
        constructor(
        /**
         * The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
         */
        t, 
        /**
         * The fractions of a second at nanosecond resolution.*
         */
        e) {
            if (this.seconds = t, this.nanoseconds = e, e < 0) throw new j(G.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
            if (e >= 1e9) throw new j(G.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
            if (t < -62135596800) throw new j(G.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
            // This will break in the year 10,000.
                    if (t >= 253402300800) throw new j(G.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        }
        /**
         * Creates a new timestamp with the current date, with millisecond precision.
         *
         * @returns a new timestamp representing the current date.
         */    static now() {
            return ut.fromMillis(Date.now());
        }
        /**
         * Creates a new timestamp from the given date.
         *
         * @param date - The date to initialize the `Timestamp` from.
         * @returns A new `Timestamp` representing the same point in time as the given
         *     date.
         */    static fromDate(t) {
            return ut.fromMillis(t.getTime());
        }
        /**
         * Creates a new timestamp from the given number of milliseconds.
         *
         * @param milliseconds - Number of milliseconds since Unix epoch
         *     1970-01-01T00:00:00Z.
         * @returns A new `Timestamp` representing the same point in time as the given
         *     number of milliseconds.
         */    static fromMillis(t) {
            const e = Math.floor(t / 1e3), n = Math.floor(1e6 * (t - 1e3 * e));
            return new ut(e, n);
        }
        /**
         * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
         * causes a loss of precision since `Date` objects only support millisecond
         * precision.
         *
         * @returns JavaScript `Date` object representing the same point in time as
         *     this `Timestamp`, with millisecond precision.
         */    toDate() {
            return new Date(this.toMillis());
        }
        /**
         * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
         * epoch). This operation causes a loss of precision.
         *
         * @returns The point in time corresponding to this timestamp, represented as
         *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
         */    toMillis() {
            return 1e3 * this.seconds + this.nanoseconds / 1e6;
        }
        _compareTo(t) {
            return this.seconds === t.seconds ? rt(this.nanoseconds, t.nanoseconds) : rt(this.seconds, t.seconds);
        }
        /**
         * Returns true if this `Timestamp` is equal to the provided one.
         *
         * @param other - The `Timestamp` to compare against.
         * @returns true if this `Timestamp` is equal to the provided one.
         */    isEqual(t) {
            return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
        }
        /** Returns a textual representation of this `Timestamp`. */    toString() {
            return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
        }
        /** Returns a JSON-serializable representation of this `Timestamp`. */    toJSON() {
            return {
                seconds: this.seconds,
                nanoseconds: this.nanoseconds
            };
        }
        /**
         * Converts this object to a primitive string, which allows `Timestamp` objects
         * to be compared using the `>`, `<=`, `>=` and `>` operators.
         */    valueOf() {
            // This method returns a string of the form <seconds>.<nanoseconds> where
            // <seconds> is translated to have a non-negative value and both <seconds>
            // and <nanoseconds> are left-padded with zeroes to be a consistent length.
            // Strings with this format then have a lexiographical ordering that matches
            // the expected ordering. The <seconds> translation is done to avoid having
            // a leading negative sign (i.e. a leading '-' character) in its string
            // representation, which would affect its lexiographical ordering.
            const t = this.seconds - -62135596800;
            // Note: Up to 12 decimal digits are required to represent all valid
            // 'seconds' values.
                    return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A version of a document in Firestore. This corresponds to the version
     * timestamp, such as update_time or read_time.
     */ class at {
        constructor(t) {
            this.timestamp = t;
        }
        static fromTimestamp(t) {
            return new at(t);
        }
        static min() {
            return new at(new ut(0, 0));
        }
        compareTo(t) {
            return this.timestamp._compareTo(t.timestamp);
        }
        isEqual(t) {
            return this.timestamp.isEqual(t.timestamp);
        }
        /** Returns a number representation of the version for use in spec tests. */    toMicroseconds() {
            // Convert to microseconds.
            return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
        }
        toString() {
            return "SnapshotVersion(" + this.timestamp.toString() + ")";
        }
        toTimestamp() {
            return this.timestamp;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ function ht(t) {
        let e = 0;
        for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
        return e;
    }

    function lt(t, e) {
        for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
    }

    function ft(t) {
        for (const e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
        return !0;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Path represents an ordered sequence of string segments.
     */
    class dt {
        constructor(t, e, n) {
            void 0 === e ? e = 0 : e > t.length && L(), void 0 === n ? n = t.length - e : n > t.length - e && L(), 
            this.segments = t, this.offset = e, this.len = n;
        }
        get length() {
            return this.len;
        }
        isEqual(t) {
            return 0 === dt.comparator(this, t);
        }
        child(t) {
            const e = this.segments.slice(this.offset, this.limit());
            return t instanceof dt ? t.forEach((t => {
                e.push(t);
            })) : e.push(t), this.construct(e);
        }
        /** The index of one past the last segment of the path. */    limit() {
            return this.offset + this.length;
        }
        popFirst(t) {
            return t = void 0 === t ? 1 : t, this.construct(this.segments, this.offset + t, this.length - t);
        }
        popLast() {
            return this.construct(this.segments, this.offset, this.length - 1);
        }
        firstSegment() {
            return this.segments[this.offset];
        }
        lastSegment() {
            return this.get(this.length - 1);
        }
        get(t) {
            return this.segments[this.offset + t];
        }
        isEmpty() {
            return 0 === this.length;
        }
        isPrefixOf(t) {
            if (t.length < this.length) return !1;
            for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
            return !0;
        }
        isImmediateParentOf(t) {
            if (this.length + 1 !== t.length) return !1;
            for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
            return !0;
        }
        forEach(t) {
            for (let e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e]);
        }
        toArray() {
            return this.segments.slice(this.offset, this.limit());
        }
        static comparator(t, e) {
            const n = Math.min(t.length, e.length);
            for (let s = 0; s < n; s++) {
                const n = t.get(s), i = e.get(s);
                if (n < i) return -1;
                if (n > i) return 1;
            }
            return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
        }
    }

    /**
     * A slash-separated path for navigating resources (documents and collections)
     * within Firestore.
     *
     * @internal
     */ class _t extends dt {
        construct(t, e, n) {
            return new _t(t, e, n);
        }
        canonicalString() {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            return this.toArray().join("/");
        }
        toString() {
            return this.canonicalString();
        }
        /**
         * Creates a resource path from the given slash-delimited string. If multiple
         * arguments are provided, all components are combined. Leading and trailing
         * slashes from all components are ignored.
         */    static fromString(...t) {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            const e = [];
            for (const n of t) {
                if (n.indexOf("//") >= 0) throw new j(G.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
                // Strip leading and traling slashed.
                            e.push(...n.split("/").filter((t => t.length > 0)));
            }
            return new _t(e);
        }
        static emptyPath() {
            return new _t([]);
        }
    }

    const wt = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

    /**
     * A dot-separated path for navigating sub-objects within a document.
     * @internal
     */ class mt extends dt {
        construct(t, e, n) {
            return new mt(t, e, n);
        }
        /**
         * Returns true if the string could be used as a segment in a field path
         * without escaping.
         */    static isValidIdentifier(t) {
            return wt.test(t);
        }
        canonicalString() {
            return this.toArray().map((t => (t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), 
            mt.isValidIdentifier(t) || (t = "`" + t + "`"), t))).join(".");
        }
        toString() {
            return this.canonicalString();
        }
        /**
         * Returns true if this field references the key of a document.
         */    isKeyField() {
            return 1 === this.length && "__name__" === this.get(0);
        }
        /**
         * The field designating the key of a document.
         */    static keyField() {
            return new mt([ "__name__" ]);
        }
        /**
         * Parses a field string from the given server-formatted string.
         *
         * - Splitting the empty string is not allowed (for now at least).
         * - Empty segments within the string (e.g. if there are two consecutive
         *   separators) are not allowed.
         *
         * TODO(b/37244157): we should make this more strict. Right now, it allows
         * non-identifier path components, even if they aren't escaped.
         */    static fromServerFormat(t) {
            const e = [];
            let n = "", s = 0;
            const i = () => {
                if (0 === n.length) throw new j(G.INVALID_ARGUMENT, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                e.push(n), n = "";
            };
            let r = !1;
            for (;s < t.length; ) {
                const e = t[s];
                if ("\\" === e) {
                    if (s + 1 === t.length) throw new j(G.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                    const e = t[s + 1];
                    if ("\\" !== e && "." !== e && "`" !== e) throw new j(G.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                    n += e, s += 2;
                } else "`" === e ? (r = !r, s++) : "." !== e || r ? (n += e, s++) : (i(), s++);
            }
            if (i(), r) throw new j(G.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
            return new mt(e);
        }
        static emptyPath() {
            return new mt([]);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provides a set of fields that can be used to partially patch a document.
     * FieldMask is used in conjunction with ObjectValue.
     * Examples:
     *   foo - Overwrites foo entirely with the provided value. If foo is not
     *         present in the companion ObjectValue, the field is deleted.
     *   foo.bar - Overwrites only the field bar of the object foo.
     *             If foo is not an object, foo is replaced with an object
     *             containing foo
     */ class gt {
        constructor(t) {
            this.fields = t, 
            // TODO(dimond): validation of FieldMask
            // Sort the field mask to support `FieldMask.isEqual()` and assert below.
            t.sort(mt.comparator);
        }
        /**
         * Verifies that `fieldPath` is included by at least one field in this field
         * mask.
         *
         * This is an O(n) operation, where `n` is the size of the field mask.
         */    covers(t) {
            for (const e of this.fields) if (e.isPrefixOf(t)) return !0;
            return !1;
        }
        isEqual(t) {
            return ot(this.fields, t.fields, ((t, e) => t.isEqual(e)));
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Immutable class that represents a "proto" byte string.
     *
     * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
     * sent on the wire. This class abstracts away this differentiation by holding
     * the proto byte string in a common class that must be converted into a string
     * before being sent as a proto.
     * @internal
     */ class pt {
        constructor(t) {
            this.binaryString = t;
        }
        static fromBase64String(t) {
            const e = atob(t);
            return new pt(e);
        }
        static fromUint8Array(t) {
            const e = 
            /**
     * Helper function to convert an Uint8array to a binary string.
     */
            function(t) {
                let e = "";
                for (let n = 0; n < t.length; ++n) e += String.fromCharCode(t[n]);
                return e;
            }
            /**
     * Helper function to convert a binary string to an Uint8Array.
     */ (t);
            return new pt(e);
        }
        [Symbol.iterator]() {
            let t = 0;
            return {
                next: () => t < this.binaryString.length ? {
                    value: this.binaryString.charCodeAt(t++),
                    done: !1
                } : {
                    value: void 0,
                    done: !0
                }
            };
        }
        toBase64() {
            return t = this.binaryString, btoa(t);
            /** Converts a binary string to a Base64 encoded string. */
            var t;
        }
        toUint8Array() {
            return function(t) {
                const e = new Uint8Array(t.length);
                for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
                return e;
            }
            /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
            // A RegExp matching ISO 8601 UTC timestamps with optional fraction.
            (this.binaryString);
        }
        approximateByteSize() {
            return 2 * this.binaryString.length;
        }
        compareTo(t) {
            return rt(this.binaryString, t.binaryString);
        }
        isEqual(t) {
            return this.binaryString === t.binaryString;
        }
    }

    pt.EMPTY_BYTE_STRING = new pt("");

    const It = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

    /**
     * Converts the possible Proto values for a timestamp value into a "seconds and
     * nanos" representation.
     */ function Et(t) {
        // The json interface (for the browser) will return an iso timestamp string,
        // while the proto js library (for node) will return a
        // google.protobuf.Timestamp instance.
        if (U(!!t), "string" == typeof t) {
            // The date string can have higher precision (nanos) than the Date class
            // (millis), so we do some custom parsing here.
            // Parse the nanos right out of the string.
            let e = 0;
            const n = It.exec(t);
            if (U(!!n), n[1]) {
                // Pad the fraction out to 9 digits (nanos).
                let t = n[1];
                t = (t + "000000000").substr(0, 9), e = Number(t);
            }
            // Parse the date to get the seconds.
                    const s = new Date(t);
            return {
                seconds: Math.floor(s.getTime() / 1e3),
                nanos: e
            };
        }
        return {
            seconds: Tt(t.seconds),
            nanos: Tt(t.nanos)
        };
    }

    /**
     * Converts the possible Proto types for numbers into a JavaScript number.
     * Returns 0 if the value is not numeric.
     */ function Tt(t) {
        // TODO(bjornick): Handle int64 greater than 53 bits.
        return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
    }

    /** Converts the possible Proto types for Blobs into a ByteString. */ function At(t) {
        return "string" == typeof t ? pt.fromBase64String(t) : pt.fromUint8Array(t);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Represents a locally-applied ServerTimestamp.
     *
     * Server Timestamps are backed by MapValues that contain an internal field
     * `__type__` with a value of `server_timestamp`. The previous value and local
     * write time are stored in its `__previous_value__` and `__local_write_time__`
     * fields respectively.
     *
     * Notes:
     * - ServerTimestampValue instances are created as the result of applying a
     *   transform. They can only exist in the local view of a document. Therefore
     *   they do not need to be parsed or serialized.
     * - When evaluated locally (e.g. for snapshot.data()), they by default
     *   evaluate to `null`. This behavior can be configured by passing custom
     *   FieldValueOptions to value().
     * - With respect to other ServerTimestampValues, they sort by their
     *   localWriteTime.
     */ function Rt(t) {
        var e, n;
        return "server_timestamp" === (null === (n = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
    }

    /**
     * Creates a new ServerTimestamp proto value (using the internal format).
     */
    /**
     * Returns the value of the field before this ServerTimestamp was set.
     *
     * Preserving the previous values allows the user to display the last resoled
     * value until the backend responds with the timestamp.
     */
    function Pt(t) {
        const e = t.mapValue.fields.__previous_value__;
        return Rt(e) ? Pt(e) : e;
    }

    /**
     * Returns the local time at which this timestamp was first set.
     */ function bt(t) {
        const e = Et(t.mapValue.fields.__local_write_time__.timestampValue);
        return new ut(e.seconds, e.nanos);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class vt {
        /**
         * Constructs a DatabaseInfo using the provided host, databaseId and
         * persistenceKey.
         *
         * @param databaseId - The database to use.
         * @param appId - The Firebase App Id.
         * @param persistenceKey - A unique identifier for this Firestore's local
         * storage (used in conjunction with the databaseId).
         * @param host - The Firestore backend host to connect to.
         * @param ssl - Whether to use SSL when connecting.
         * @param forceLongPolling - Whether to use the forceLongPolling option
         * when using WebChannel as the network transport.
         * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
         * option when using WebChannel as the network transport.
         * @param useFetchStreams Whether to use the Fetch API instead of
         * XMLHTTPRequest
         */
        constructor(t, e, n, s, i, r, o, c) {
            this.databaseId = t, this.appId = e, this.persistenceKey = n, this.host = s, this.ssl = i, 
            this.forceLongPolling = r, this.autoDetectLongPolling = o, this.useFetchStreams = c;
        }
    }

    /** The default database name for a project. */
    /**
     * Represents the database ID a Firestore client is associated with.
     * @internal
     */
    class Vt {
        constructor(t, e) {
            this.projectId = t, this.database = e || "(default)";
        }
        static empty() {
            return new Vt("", "");
        }
        get isDefaultDatabase() {
            return "(default)" === this.database;
        }
        isEqual(t) {
            return t instanceof Vt && t.projectId === this.projectId && t.database === this.database;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Sentinel value that sorts before any Mutation Batch ID. */
    /**
     * Returns whether a variable is either undefined or null.
     */
    function St(t) {
        return null == t;
    }

    /** Returns whether the value represents -0. */ function Dt(t) {
        // Detect if the value is -0.0. Based on polyfill from
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
        return 0 === t && 1 / t == -1 / 0;
    }

    /**
     * Returns whether a value is an integer and in the safe integer range
     * @param value - The value to test for being an integer and in the safe range
     */ function Ct(t) {
        return "number" == typeof t && Number.isInteger(t) && !Dt(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @internal
     */ class Nt {
        constructor(t) {
            this.path = t;
        }
        static fromPath(t) {
            return new Nt(_t.fromString(t));
        }
        static fromName(t) {
            return new Nt(_t.fromString(t).popFirst(5));
        }
        static empty() {
            return new Nt(_t.emptyPath());
        }
        get collectionGroup() {
            return this.path.popLast().lastSegment();
        }
        /** Returns true if the document is in the specified collectionId. */    hasCollectionId(t) {
            return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
        }
        /** Returns the collection group (i.e. the name of the parent collection) for this key. */    getCollectionGroup() {
            return this.path.get(this.path.length - 2);
        }
        /** Returns the fully qualified path to the parent collection. */    getCollectionPath() {
            return this.path.popLast();
        }
        isEqual(t) {
            return null !== t && 0 === _t.comparator(this.path, t.path);
        }
        toString() {
            return this.path.toString();
        }
        static comparator(t, e) {
            return _t.comparator(t.path, e.path);
        }
        static isDocumentKey(t) {
            return t.length % 2 == 0;
        }
        /**
         * Creates and returns a new document key with the given segments.
         *
         * @param segments - The segments of the path to the document
         * @returns A new instance of DocumentKey
         */    static fromSegments(t) {
            return new Nt(new _t(t.slice()));
        }
    }

    /** Extracts the backend's type order for the provided value. */ function kt(t) {
        return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? Rt(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : L();
    }

    /** Tests `left` and `right` for equality based on the backend semantics. */ function Ot(t, e) {
        if (t === e) return !0;
        const n = kt(t);
        if (n !== kt(e)) return !1;
        switch (n) {
          case 0 /* NullValue */ :
            return !0;

          case 1 /* BooleanValue */ :
            return t.booleanValue === e.booleanValue;

          case 4 /* ServerTimestampValue */ :
            return bt(t).isEqual(bt(e));

          case 3 /* TimestampValue */ :
            return function(t, e) {
                if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
                // Use string equality for ISO 8601 timestamps
                return t.timestampValue === e.timestampValue;
                const n = Et(t.timestampValue), s = Et(e.timestampValue);
                return n.seconds === s.seconds && n.nanos === s.nanos;
            }(t, e);

          case 5 /* StringValue */ :
            return t.stringValue === e.stringValue;

          case 6 /* BlobValue */ :
            return function(t, e) {
                return At(t.bytesValue).isEqual(At(e.bytesValue));
            }(t, e);

          case 7 /* RefValue */ :
            return t.referenceValue === e.referenceValue;

          case 8 /* GeoPointValue */ :
            return function(t, e) {
                return Tt(t.geoPointValue.latitude) === Tt(e.geoPointValue.latitude) && Tt(t.geoPointValue.longitude) === Tt(e.geoPointValue.longitude);
            }(t, e);

          case 2 /* NumberValue */ :
            return function(t, e) {
                if ("integerValue" in t && "integerValue" in e) return Tt(t.integerValue) === Tt(e.integerValue);
                if ("doubleValue" in t && "doubleValue" in e) {
                    const n = Tt(t.doubleValue), s = Tt(e.doubleValue);
                    return n === s ? Dt(n) === Dt(s) : isNaN(n) && isNaN(s);
                }
                return !1;
            }(t, e);

          case 9 /* ArrayValue */ :
            return ot(t.arrayValue.values || [], e.arrayValue.values || [], Ot);

          case 10 /* ObjectValue */ :
            return function(t, e) {
                const n = t.mapValue.fields || {}, s = e.mapValue.fields || {};
                if (ht(n) !== ht(s)) return !1;
                for (const t in n) if (n.hasOwnProperty(t) && (void 0 === s[t] || !Ot(n[t], s[t]))) return !1;
                return !0;
            }
            /** Returns true if the ArrayValue contains the specified element. */ (t, e);

          default:
            return L();
        }
    }

    function Mt(t, e) {
        return void 0 !== (t.values || []).find((t => Ot(t, e)));
    }

    function $t(t, e) {
        if (t === e) return 0;
        const n = kt(t), s = kt(e);
        if (n !== s) return rt(n, s);
        switch (n) {
          case 0 /* NullValue */ :
            return 0;

          case 1 /* BooleanValue */ :
            return rt(t.booleanValue, e.booleanValue);

          case 2 /* NumberValue */ :
            return function(t, e) {
                const n = Tt(t.integerValue || t.doubleValue), s = Tt(e.integerValue || e.doubleValue);
                return n < s ? -1 : n > s ? 1 : n === s ? 0 : 
                // one or both are NaN.
                isNaN(n) ? isNaN(s) ? 0 : -1 : 1;
            }(t, e);

          case 3 /* TimestampValue */ :
            return Ft(t.timestampValue, e.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return Ft(bt(t), bt(e));

          case 5 /* StringValue */ :
            return rt(t.stringValue, e.stringValue);

          case 6 /* BlobValue */ :
            return function(t, e) {
                const n = At(t), s = At(e);
                return n.compareTo(s);
            }(t.bytesValue, e.bytesValue);

          case 7 /* RefValue */ :
            return function(t, e) {
                const n = t.split("/"), s = e.split("/");
                for (let t = 0; t < n.length && t < s.length; t++) {
                    const e = rt(n[t], s[t]);
                    if (0 !== e) return e;
                }
                return rt(n.length, s.length);
            }(t.referenceValue, e.referenceValue);

          case 8 /* GeoPointValue */ :
            return function(t, e) {
                const n = rt(Tt(t.latitude), Tt(e.latitude));
                if (0 !== n) return n;
                return rt(Tt(t.longitude), Tt(e.longitude));
            }(t.geoPointValue, e.geoPointValue);

          case 9 /* ArrayValue */ :
            return function(t, e) {
                const n = t.values || [], s = e.values || [];
                for (let t = 0; t < n.length && t < s.length; ++t) {
                    const e = $t(n[t], s[t]);
                    if (e) return e;
                }
                return rt(n.length, s.length);
            }(t.arrayValue, e.arrayValue);

          case 10 /* ObjectValue */ :
            return function(t, e) {
                const n = t.fields || {}, s = Object.keys(n), i = e.fields || {}, r = Object.keys(i);
                // Even though MapValues are likely sorted correctly based on their insertion
                // order (e.g. when received from the backend), local modifications can bring
                // elements out of order. We need to re-sort the elements to ensure that
                // canonical IDs are independent of insertion order.
                s.sort(), r.sort();
                for (let t = 0; t < s.length && t < r.length; ++t) {
                    const e = rt(s[t], r[t]);
                    if (0 !== e) return e;
                    const o = $t(n[s[t]], i[r[t]]);
                    if (0 !== o) return o;
                }
                return rt(s.length, r.length);
            }
            /**
     * Generates the canonical ID for the provided field value (as used in Target
     * serialization).
     */ (t.mapValue, e.mapValue);

          default:
            throw L();
        }
    }

    function Ft(t, e) {
        if ("string" == typeof t && "string" == typeof e && t.length === e.length) return rt(t, e);
        const n = Et(t), s = Et(e), i = rt(n.seconds, s.seconds);
        return 0 !== i ? i : rt(n.nanos, s.nanos);
    }

    function Bt(t) {
        return Lt(t);
    }

    function Lt(t) {
        return "nullValue" in t ? "null" : "booleanValue" in t ? "" + t.booleanValue : "integerValue" in t ? "" + t.integerValue : "doubleValue" in t ? "" + t.doubleValue : "timestampValue" in t ? function(t) {
            const e = Et(t);
            return `time(${e.seconds},${e.nanos})`;
        }(t.timestampValue) : "stringValue" in t ? t.stringValue : "bytesValue" in t ? At(t.bytesValue).toBase64() : "referenceValue" in t ? (n = t.referenceValue, 
        Nt.fromName(n).toString()) : "geoPointValue" in t ? `geo(${(e = t.geoPointValue).latitude},${e.longitude})` : "arrayValue" in t ? function(t) {
            let e = "[", n = !0;
            for (const s of t.values || []) n ? n = !1 : e += ",", e += Lt(s);
            return e + "]";
        }
        /** Returns a reference value for the provided database and key. */ (t.arrayValue) : "mapValue" in t ? function(t) {
            // Iteration order in JavaScript is not guaranteed. To ensure that we generate
            // matching canonical IDs for identical maps, we need to sort the keys.
            const e = Object.keys(t.fields || {}).sort();
            let n = "{", s = !0;
            for (const i of e) s ? s = !1 : n += ",", n += `${i}:${Lt(t.fields[i])}`;
            return n + "}";
        }(t.mapValue) : L();
        var e, n;
    }

    function Ut(t, e) {
        return {
            referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`
        };
    }

    /** Returns true if `value` is an IntegerValue . */ function qt(t) {
        return !!t && "integerValue" in t;
    }

    /** Returns true if `value` is a DoubleValue. */
    /** Returns true if `value` is an ArrayValue. */
    function Kt(t) {
        return !!t && "arrayValue" in t;
    }

    /** Returns true if `value` is a NullValue. */ function Gt(t) {
        return !!t && "nullValue" in t;
    }

    /** Returns true if `value` is NaN. */ function jt(t) {
        return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
    }

    /** Returns true if `value` is a MapValue. */ function Qt(t) {
        return !!t && "mapValue" in t;
    }

    /** Creates a deep copy of `source`. */ function Wt(t) {
        if (t.geoPointValue) return {
            geoPointValue: Object.assign({}, t.geoPointValue)
        };
        if (t.timestampValue && "object" == typeof t.timestampValue) return {
            timestampValue: Object.assign({}, t.timestampValue)
        };
        if (t.mapValue) {
            const e = {
                mapValue: {
                    fields: {}
                }
            };
            return lt(t.mapValue.fields, ((t, n) => e.mapValue.fields[t] = Wt(n))), e;
        }
        if (t.arrayValue) {
            const e = {
                arrayValue: {
                    values: []
                }
            };
            for (let n = 0; n < (t.arrayValue.values || []).length; ++n) e.arrayValue.values[n] = Wt(t.arrayValue.values[n]);
            return e;
        }
        return Object.assign({}, t);
    }

    /** Returns true if the Value represents the canonical {@link #MAX_VALUE} . */
    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An ObjectValue represents a MapValue in the Firestore Proto and offers the
     * ability to add and remove fields (via the ObjectValueBuilder).
     */
    class zt {
        constructor(t) {
            this.value = t;
        }
        static empty() {
            return new zt({
                mapValue: {}
            });
        }
        /**
         * Returns the value at the given path or null.
         *
         * @param path - the path to search
         * @returns The value at the path or null if the path is not set.
         */    field(t) {
            if (t.isEmpty()) return this.value;
            {
                let e = this.value;
                for (let n = 0; n < t.length - 1; ++n) if (e = (e.mapValue.fields || {})[t.get(n)], 
                !Qt(e)) return null;
                return e = (e.mapValue.fields || {})[t.lastSegment()], e || null;
            }
        }
        /**
         * Sets the field to the provided value.
         *
         * @param path - The field path to set.
         * @param value - The value to set.
         */    set(t, e) {
            this.getFieldsMap(t.popLast())[t.lastSegment()] = Wt(e);
        }
        /**
         * Sets the provided fields to the provided values.
         *
         * @param data - A map of fields to values (or null for deletes).
         */    setAll(t) {
            let e = mt.emptyPath(), n = {}, s = [];
            t.forEach(((t, i) => {
                if (!e.isImmediateParentOf(i)) {
                    // Insert the accumulated changes at this parent location
                    const t = this.getFieldsMap(e);
                    this.applyChanges(t, n, s), n = {}, s = [], e = i.popLast();
                }
                t ? n[i.lastSegment()] = Wt(t) : s.push(i.lastSegment());
            }));
            const i = this.getFieldsMap(e);
            this.applyChanges(i, n, s);
        }
        /**
         * Removes the field at the specified path. If there is no field at the
         * specified path, nothing is changed.
         *
         * @param path - The field path to remove.
         */    delete(t) {
            const e = this.field(t.popLast());
            Qt(e) && e.mapValue.fields && delete e.mapValue.fields[t.lastSegment()];
        }
        isEqual(t) {
            return Ot(this.value, t.value);
        }
        /**
         * Returns the map that contains the leaf element of `path`. If the parent
         * entry does not yet exist, or if it is not a map, a new map will be created.
         */    getFieldsMap(t) {
            let e = this.value;
            e.mapValue.fields || (e.mapValue = {
                fields: {}
            });
            for (let n = 0; n < t.length; ++n) {
                let s = e.mapValue.fields[t.get(n)];
                Qt(s) && s.mapValue.fields || (s = {
                    mapValue: {
                        fields: {}
                    }
                }, e.mapValue.fields[t.get(n)] = s), e = s;
            }
            return e.mapValue.fields;
        }
        /**
         * Modifies `fieldsMap` by adding, replacing or deleting the specified
         * entries.
         */    applyChanges(t, e, n) {
            lt(e, ((e, n) => t[e] = n));
            for (const e of n) delete t[e];
        }
        clone() {
            return new zt(Wt(this.value));
        }
    }

    /**
     * Returns a FieldMask built from all fields in a MapValue.
     */ function Ht(t) {
        const e = [];
        return lt(t.fields, ((t, n) => {
            const s = new mt([ t ]);
            if (Qt(n)) {
                const t = Ht(n.mapValue).fields;
                if (0 === t.length) 
                // Preserve the empty map by adding it to the FieldMask.
                e.push(s); else 
                // For nested and non-empty ObjectValues, add the FieldPath of the
                // leaf nodes.
                for (const n of t) e.push(s.child(n));
            } else 
            // For nested and non-empty ObjectValues, add the FieldPath of the leaf
            // nodes.
            e.push(s);
        })), new gt(e);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Represents a document in Firestore with a key, version, data and whether it
     * has local mutations applied to it.
     *
     * Documents can transition between states via `convertToFoundDocument()`,
     * `convertToNoDocument()` and `convertToUnknownDocument()`. If a document does
     * not transition to one of these states even after all mutations have been
     * applied, `isValidDocument()` returns false and the document should be removed
     * from all views.
     */ class Jt {
        constructor(t, e, n, s, i, r) {
            this.key = t, this.documentType = e, this.version = n, this.readTime = s, this.data = i, 
            this.documentState = r;
        }
        /**
         * Creates a document with no known version or data, but which can serve as
         * base document for mutations.
         */    static newInvalidDocument(t) {
            return new Jt(t, 0 /* INVALID */ , at.min(), at.min(), zt.empty(), 0 /* SYNCED */);
        }
        /**
         * Creates a new document that is known to exist with the given data at the
         * given version.
         */    static newFoundDocument(t, e, n) {
            return new Jt(t, 1 /* FOUND_DOCUMENT */ , e, at.min(), n, 0 /* SYNCED */);
        }
        /** Creates a new document that is known to not exist at the given version. */    static newNoDocument(t, e) {
            return new Jt(t, 2 /* NO_DOCUMENT */ , e, at.min(), zt.empty(), 0 /* SYNCED */);
        }
        /**
         * Creates a new document that is known to exist at the given version but
         * whose data is not known (e.g. a document that was updated without a known
         * base document).
         */    static newUnknownDocument(t, e) {
            return new Jt(t, 3 /* UNKNOWN_DOCUMENT */ , e, at.min(), zt.empty(), 2 /* HAS_COMMITTED_MUTATIONS */);
        }
        /**
         * Changes the document type to indicate that it exists and that its version
         * and data are known.
         */    convertToFoundDocument(t, e) {
            return this.version = t, this.documentType = 1 /* FOUND_DOCUMENT */ , this.data = e, 
            this.documentState = 0 /* SYNCED */ , this;
        }
        /**
         * Changes the document type to indicate that it doesn't exist at the given
         * version.
         */    convertToNoDocument(t) {
            return this.version = t, this.documentType = 2 /* NO_DOCUMENT */ , this.data = zt.empty(), 
            this.documentState = 0 /* SYNCED */ , this;
        }
        /**
         * Changes the document type to indicate that it exists at a given version but
         * that its data is not known (e.g. a document that was updated without a known
         * base document).
         */    convertToUnknownDocument(t) {
            return this.version = t, this.documentType = 3 /* UNKNOWN_DOCUMENT */ , this.data = zt.empty(), 
            this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */ , this;
        }
        setHasCommittedMutations() {
            return this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */ , this;
        }
        setHasLocalMutations() {
            return this.documentState = 1 /* HAS_LOCAL_MUTATIONS */ , this;
        }
        setReadTime(t) {
            return this.readTime = t, this;
        }
        get hasLocalMutations() {
            return 1 /* HAS_LOCAL_MUTATIONS */ === this.documentState;
        }
        get hasCommittedMutations() {
            return 2 /* HAS_COMMITTED_MUTATIONS */ === this.documentState;
        }
        get hasPendingWrites() {
            return this.hasLocalMutations || this.hasCommittedMutations;
        }
        isValidDocument() {
            return 0 /* INVALID */ !== this.documentType;
        }
        isFoundDocument() {
            return 1 /* FOUND_DOCUMENT */ === this.documentType;
        }
        isNoDocument() {
            return 2 /* NO_DOCUMENT */ === this.documentType;
        }
        isUnknownDocument() {
            return 3 /* UNKNOWN_DOCUMENT */ === this.documentType;
        }
        isEqual(t) {
            return t instanceof Jt && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.documentType === t.documentType && this.documentState === t.documentState && this.data.isEqual(t.data);
        }
        mutableCopy() {
            return new Jt(this.key, this.documentType, this.version, this.readTime, this.data.clone(), this.documentState);
        }
        toString() {
            return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // Visible for testing
    class ee {
        constructor(t, e = null, n = [], s = [], i = null, r = null, o = null) {
            this.path = t, this.collectionGroup = e, this.orderBy = n, this.filters = s, this.limit = i, 
            this.startAt = r, this.endAt = o, this.P = null;
        }
    }

    /**
     * Initializes a Target with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     *
     * NOTE: you should always construct `Target` from `Query.toTarget` instead of
     * using this factory method, because `Query` provides an implicit `orderBy`
     * property.
     */ function ne(t, e = null, n = [], s = [], i = null, r = null, o = null) {
        return new ee(t, e, n, s, i, r, o);
    }

    function se(t) {
        const e = K(t);
        if (null === e.P) {
            let t = e.path.canonicalString();
            null !== e.collectionGroup && (t += "|cg:" + e.collectionGroup), t += "|f:", t += e.filters.map((t => {
                return (e = t).field.canonicalString() + e.op.toString() + Bt(e.value);
                var e;
            })).join(","), t += "|ob:", t += e.orderBy.map((t => function(t) {
                // TODO(b/29183165): Make this collision robust.
                return t.field.canonicalString() + t.dir;
            }(t))).join(","), St(e.limit) || (t += "|l:", t += e.limit), e.startAt && (t += "|lb:", 
            t += e.startAt.inclusive ? "b:" : "a:", t += e.startAt.position.map((t => Bt(t))).join(",")), 
            e.endAt && (t += "|ub:", t += e.endAt.inclusive ? "a:" : "b:", t += e.endAt.position.map((t => Bt(t))).join(",")), 
            e.P = t;
        }
        return e.P;
    }

    function ie(t) {
        let e = t.path.canonicalString();
        return null !== t.collectionGroup && (e += " collectionGroup=" + t.collectionGroup), 
        t.filters.length > 0 && (e += `, filters: [${t.filters.map((t => {
        return `${(e = t).field.canonicalString()} ${e.op} ${Bt(e.value)}`;
        /** Returns a debug description for `filter`. */
        var e;
        /** Filter that matches on key fields (i.e. '__name__'). */    })).join(", ")}]`), 
        St(t.limit) || (e += ", limit: " + t.limit), t.orderBy.length > 0 && (e += `, orderBy: [${t.orderBy.map((t => function(t) {
        return `${t.field.canonicalString()} (${t.dir})`;
    }(t))).join(", ")}]`), t.startAt && (e += ", startAt: ", e += t.startAt.inclusive ? "b:" : "a:", 
        e += t.startAt.position.map((t => Bt(t))).join(",")), t.endAt && (e += ", endAt: ", 
        e += t.endAt.inclusive ? "a:" : "b:", e += t.endAt.position.map((t => Bt(t))).join(",")), 
        `Target(${e})`;
    }

    function re(t, e) {
        if (t.limit !== e.limit) return !1;
        if (t.orderBy.length !== e.orderBy.length) return !1;
        for (let n = 0; n < t.orderBy.length; n++) if (!ye(t.orderBy[n], e.orderBy[n])) return !1;
        if (t.filters.length !== e.filters.length) return !1;
        for (let i = 0; i < t.filters.length; i++) if (n = t.filters[i], s = e.filters[i], 
        n.op !== s.op || !n.field.isEqual(s.field) || !Ot(n.value, s.value)) return !1;
        var n, s;
        return t.collectionGroup === e.collectionGroup && (!!t.path.isEqual(e.path) && (!!Ie(t.startAt, e.startAt) && Ie(t.endAt, e.endAt)));
    }

    function oe(t) {
        return Nt.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
    }

    class ce extends class {} {
        constructor(t, e, n) {
            super(), this.field = t, this.op = e, this.value = n;
        }
        /**
         * Creates a filter based on the provided arguments.
         */    static create(t, e, n) {
            return t.isKeyField() ? "in" /* IN */ === e || "not-in" /* NOT_IN */ === e ? this.v(t, e, n) : new ue(t, e, n) : "array-contains" /* ARRAY_CONTAINS */ === e ? new fe(t, n) : "in" /* IN */ === e ? new de(t, n) : "not-in" /* NOT_IN */ === e ? new _e(t, n) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e ? new we(t, n) : new ce(t, e, n);
        }
        static v(t, e, n) {
            return "in" /* IN */ === e ? new ae(t, n) : new he(t, n);
        }
        matches(t) {
            const e = t.data.field(this.field);
            // Types do not have to match in NOT_EQUAL filters.
                    return "!=" /* NOT_EQUAL */ === this.op ? null !== e && this.V($t(e, this.value)) : null !== e && kt(this.value) === kt(e) && this.V($t(e, this.value));
            // Only compare types with matching backend order (such as double and int).
            }
        V(t) {
            switch (this.op) {
              case "<" /* LESS_THAN */ :
                return t < 0;

              case "<=" /* LESS_THAN_OR_EQUAL */ :
                return t <= 0;

              case "==" /* EQUAL */ :
                return 0 === t;

              case "!=" /* NOT_EQUAL */ :
                return 0 !== t;

              case ">" /* GREATER_THAN */ :
                return t > 0;

              case ">=" /* GREATER_THAN_OR_EQUAL */ :
                return t >= 0;

              default:
                return L();
            }
        }
        S() {
            return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ].indexOf(this.op) >= 0;
        }
    }

    class ue extends ce {
        constructor(t, e, n) {
            super(t, e, n), this.key = Nt.fromName(n.referenceValue);
        }
        matches(t) {
            const e = Nt.comparator(t.key, this.key);
            return this.V(e);
        }
    }

    /** Filter that matches on key fields within an array. */ class ae extends ce {
        constructor(t, e) {
            super(t, "in" /* IN */ , e), this.keys = le("in" /* IN */ , e);
        }
        matches(t) {
            return this.keys.some((e => e.isEqual(t.key)));
        }
    }

    /** Filter that matches on key fields not present within an array. */ class he extends ce {
        constructor(t, e) {
            super(t, "not-in" /* NOT_IN */ , e), this.keys = le("not-in" /* NOT_IN */ , e);
        }
        matches(t) {
            return !this.keys.some((e => e.isEqual(t.key)));
        }
    }

    function le(t, e) {
        var n;
        return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((t => Nt.fromName(t.referenceValue)));
    }

    /** A Filter that implements the array-contains operator. */ class fe extends ce {
        constructor(t, e) {
            super(t, "array-contains" /* ARRAY_CONTAINS */ , e);
        }
        matches(t) {
            const e = t.data.field(this.field);
            return Kt(e) && Mt(e.arrayValue, this.value);
        }
    }

    /** A Filter that implements the IN operator. */ class de extends ce {
        constructor(t, e) {
            super(t, "in" /* IN */ , e);
        }
        matches(t) {
            const e = t.data.field(this.field);
            return null !== e && Mt(this.value.arrayValue, e);
        }
    }

    /** A Filter that implements the not-in operator. */ class _e extends ce {
        constructor(t, e) {
            super(t, "not-in" /* NOT_IN */ , e);
        }
        matches(t) {
            if (Mt(this.value.arrayValue, {
                nullValue: "NULL_VALUE"
            })) return !1;
            const e = t.data.field(this.field);
            return null !== e && !Mt(this.value.arrayValue, e);
        }
    }

    /** A Filter that implements the array-contains-any operator. */ class we extends ce {
        constructor(t, e) {
            super(t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , e);
        }
        matches(t) {
            const e = t.data.field(this.field);
            return !(!Kt(e) || !e.arrayValue.values) && e.arrayValue.values.some((t => Mt(this.value.arrayValue, t)));
        }
    }

    /**
     * Represents a bound of a query.
     *
     * The bound is specified with the given components representing a position and
     * whether it's just before or just after the position (relative to whatever the
     * query order is).
     *
     * The position represents a logical index position for a query. It's a prefix
     * of values for the (potentially implicit) order by clauses of a query.
     *
     * Bound provides a function to determine whether a document comes before or
     * after a bound. This is influenced by whether the position is just before or
     * just after the provided values.
     */ class me {
        constructor(t, e) {
            this.position = t, this.inclusive = e;
        }
    }

    /**
     * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
     */ class ge {
        constructor(t, e = "asc" /* ASCENDING */) {
            this.field = t, this.dir = e;
        }
    }

    function ye(t, e) {
        return t.dir === e.dir && t.field.isEqual(e.field);
    }

    function pe(t, e, n) {
        let s = 0;
        for (let i = 0; i < t.position.length; i++) {
            const r = e[i], o = t.position[i];
            if (r.field.isKeyField()) s = Nt.comparator(Nt.fromName(o.referenceValue), n.key); else {
                s = $t(o, n.data.field(r.field));
            }
            if ("desc" /* DESCENDING */ === r.dir && (s *= -1), 0 !== s) break;
        }
        return s;
    }

    /**
     * Returns true if a document sorts after a bound using the provided sort
     * order.
     */ function Ie(t, e) {
        if (null === t) return null === e;
        if (null === e) return !1;
        if (t.inclusive !== e.inclusive || t.position.length !== e.position.length) return !1;
        for (let n = 0; n < t.position.length; n++) {
            if (!Ot(t.position[n], e.position[n])) return !1;
        }
        return !0;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Query encapsulates all the query attributes we support in the SDK. It can
     * be run against the LocalStore, as well as be converted to a `Target` to
     * query the RemoteStore results.
     *
     * Visible for testing.
     */ class Ee {
        /**
         * Initializes a Query with a path and optional additional query constraints.
         * Path must currently be empty if this is a collection group query.
         */
        constructor(t, e = null, n = [], s = [], i = null, r = "F" /* First */ , o = null, c = null) {
            this.path = t, this.collectionGroup = e, this.explicitOrderBy = n, this.filters = s, 
            this.limit = i, this.limitType = r, this.startAt = o, this.endAt = c, this.D = null, 
            // The corresponding `Target` of this `Query` instance.
            this.C = null, this.startAt, this.endAt;
        }
    }

    /** Creates a new Query instance with the options provided. */ function Te(t, e, n, s, i, r, o, c) {
        return new Ee(t, e, n, s, i, r, o, c);
    }

    /** Creates a new Query for a query that matches all documents at `path` */ function Ae(t) {
        return new Ee(t);
    }

    /**
     * Helper to convert a collection group query into a collection query at a
     * specific path. This is used when executing collection group queries, since
     * we have to split the query into a set of collection queries at multiple
     * paths.
     */ function Re(t) {
        return !St(t.limit) && "F" /* First */ === t.limitType;
    }

    function Pe(t) {
        return !St(t.limit) && "L" /* Last */ === t.limitType;
    }

    function be(t) {
        return t.explicitOrderBy.length > 0 ? t.explicitOrderBy[0].field : null;
    }

    function ve(t) {
        for (const e of t.filters) if (e.S()) return e.field;
        return null;
    }

    /**
     * Checks if any of the provided Operators are included in the query and
     * returns the first one that is, or null if none are.
     */
    /**
     * Returns whether the query matches a collection group rather than a specific
     * collection.
     */
    function Ve(t) {
        return null !== t.collectionGroup;
    }

    /**
     * Returns the implicit order by constraint that is used to execute the Query,
     * which can be different from the order by constraints the user provided (e.g.
     * the SDK and backend always orders by `__name__`).
     */ function Se(t) {
        const e = K(t);
        if (null === e.D) {
            e.D = [];
            const t = ve(e), n = be(e);
            if (null !== t && null === n) 
            // In order to implicitly add key ordering, we must also add the
            // inequality filter field for it to be a valid query.
            // Note that the default inequality field and key ordering is ascending.
            t.isKeyField() || e.D.push(new ge(t)), e.D.push(new ge(mt.keyField(), "asc" /* ASCENDING */)); else {
                let t = !1;
                for (const n of e.explicitOrderBy) e.D.push(n), n.field.isKeyField() && (t = !0);
                if (!t) {
                    // The order of the implicit key ordering always matches the last
                    // explicit order by
                    const t = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc" /* ASCENDING */;
                    e.D.push(new ge(mt.keyField(), t));
                }
            }
        }
        return e.D;
    }

    /**
     * Converts this `Query` instance to it's corresponding `Target` representation.
     */ function De(t) {
        const e = K(t);
        if (!e.C) if ("F" /* First */ === e.limitType) e.C = ne(e.path, e.collectionGroup, Se(e), e.filters, e.limit, e.startAt, e.endAt); else {
            // Flip the orderBy directions since we want the last results
            const t = [];
            for (const n of Se(e)) {
                const e = "desc" /* DESCENDING */ === n.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
                t.push(new ge(n.field, e));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
                    const n = e.endAt ? new me(e.endAt.position, !e.endAt.inclusive) : null, s = e.startAt ? new me(e.startAt.position, !e.startAt.inclusive) : null;
            // Now return as a LimitType.First query.
            e.C = ne(e.path, e.collectionGroup, t, e.filters, e.limit, n, s);
        }
        return e.C;
    }

    function Ce(t, e, n) {
        return new Ee(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), e, n, t.startAt, t.endAt);
    }

    function Ne(t, e) {
        return re(De(t), De(e)) && t.limitType === e.limitType;
    }

    // TODO(b/29183165): This is used to get a unique string from a query to, for
    // example, use as a dictionary key, but the implementation is subject to
    // collisions. Make it collision-free.
    function xe(t) {
        return `${se(De(t))}|lt:${t.limitType}`;
    }

    function ke(t) {
        return `Query(target=${ie(De(t))}; limitType=${t.limitType})`;
    }

    /** Returns whether `doc` matches the constraints of `query`. */ function Oe(t, e) {
        return e.isFoundDocument() && function(t, e) {
            const n = e.key.path;
            return null !== t.collectionGroup ? e.key.hasCollectionId(t.collectionGroup) && t.path.isPrefixOf(n) : Nt.isDocumentKey(t.path) ? t.path.isEqual(n) : t.path.isImmediateParentOf(n);
        }
        /**
     * A document must have a value for every ordering clause in order to show up
     * in the results.
     */ (t, e) && function(t, e) {
            for (const n of t.explicitOrderBy) 
            // order by key always matches
            if (!n.field.isKeyField() && null === e.data.field(n.field)) return !1;
            return !0;
        }(t, e) && function(t, e) {
            for (const n of t.filters) if (!n.matches(e)) return !1;
            return !0;
        }
        /** Makes sure a document is within the bounds, if provided. */ (t, e) && function(t, e) {
            if (t.startAt && !
            /**
     * Returns true if a document sorts before a bound using the provided sort
     * order.
     */
            function(t, e, n) {
                const s = pe(t, e, n);
                return t.inclusive ? s <= 0 : s < 0;
            }(t.startAt, Se(t), e)) return !1;
            if (t.endAt && !function(t, e, n) {
                const s = pe(t, e, n);
                return t.inclusive ? s >= 0 : s > 0;
            }(t.endAt, Se(t), e)) return !1;
            return !0;
        }
        /**
     * Returns a new comparator function that can be used to compare two documents
     * based on the Query's ordering constraint.
     */ (t, e);
    }

    function Me(t) {
        return (e, n) => {
            let s = !1;
            for (const i of Se(t)) {
                const t = $e(i, e, n);
                if (0 !== t) return t;
                s = s || i.field.isKeyField();
            }
            return 0;
        };
    }

    function $e(t, e, n) {
        const s = t.field.isKeyField() ? Nt.comparator(e.key, n.key) : function(t, e, n) {
            const s = e.data.field(t), i = n.data.field(t);
            return null !== s && null !== i ? $t(s, i) : L();
        }
        /**
     * @license
     * Copyright 2021 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
        /**
     * The initial mutation batch id for each index. Gets updated during index
     * backfill.
     */ (t.field, e, n);
        switch (t.dir) {
          case "asc" /* ASCENDING */ :
            return s;

          case "desc" /* DESCENDING */ :
            return -1 * s;

          default:
            return L();
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns an DoubleValue for `value` that is encoded based the serializer's
     * `useProto3Json` setting.
     */ function Fe(t, e) {
        if (t.N) {
            if (isNaN(e)) return {
                doubleValue: "NaN"
            };
            if (e === 1 / 0) return {
                doubleValue: "Infinity"
            };
            if (e === -1 / 0) return {
                doubleValue: "-Infinity"
            };
        }
        return {
            doubleValue: Dt(e) ? "-0" : e
        };
    }

    /**
     * Returns an IntegerValue for `value`.
     */ function Be(t) {
        return {
            integerValue: "" + t
        };
    }

    /**
     * Returns a value for a number that's appropriate to put into a proto.
     * The return value is an IntegerValue if it can safely represent the value,
     * otherwise a DoubleValue is returned.
     */ function Le(t, e) {
        return Ct(e) ? Be(e) : Fe(t, e);
    }

    /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Used to represent a field transform on a mutation. */ class Ue {
        constructor() {
            // Make sure that the structural type of `TransformOperation` is unique.
            // See https://github.com/microsoft/TypeScript/issues/5451
            this._ = void 0;
        }
    }

    /**
     * Computes the local transform result against the provided `previousValue`,
     * optionally using the provided localWriteTime.
     */ function qe(t, e, n) {
        return t instanceof je ? function(t, e) {
            const n = {
                fields: {
                    __type__: {
                        stringValue: "server_timestamp"
                    },
                    __local_write_time__: {
                        timestampValue: {
                            seconds: t.seconds,
                            nanos: t.nanoseconds
                        }
                    }
                }
            };
            return e && (n.fields.__previous_value__ = e), {
                mapValue: n
            };
        }(n, e) : t instanceof Qe ? We(t, e) : t instanceof ze ? He(t, e) : function(t, e) {
            // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
            // precision and resolves overflows by reducing precision, we do not
            // manually cap overflows at 2^63.
            const n = Ge(t, e), s = Ye(n) + Ye(t.k);
            return qt(n) && qt(t.k) ? Be(s) : Fe(t.O, s);
        }(t, e);
    }

    /**
     * Computes a final transform result after the transform has been acknowledged
     * by the server, potentially using the server-provided transformResult.
     */ function Ke(t, e, n) {
        // The server just sends null as the transform result for array operations,
        // so we have to calculate a result the same as we do for local
        // applications.
        return t instanceof Qe ? We(t, e) : t instanceof ze ? He(t, e) : n;
    }

    /**
     * If this transform operation is not idempotent, returns the base value to
     * persist for this transform. If a base value is returned, the transform
     * operation is always applied to this base value, even if document has
     * already been updated.
     *
     * Base values provide consistent behavior for non-idempotent transforms and
     * allow us to return the same latency-compensated value even if the backend
     * has already applied the transform operation. The base value is null for
     * idempotent transforms, as they can be re-played even if the backend has
     * already applied them.
     *
     * @returns a base value to store along with the mutation, or null for
     * idempotent transforms.
     */ function Ge(t, e) {
        return t instanceof Je ? qt(n = e) || function(t) {
            return !!t && "doubleValue" in t;
        }
        /** Returns true if `value` is either an IntegerValue or a DoubleValue. */ (n) ? e : {
            integerValue: 0
        } : null;
        var n;
    }

    /** Transforms a value into a server-generated timestamp. */
    class je extends Ue {}

    /** Transforms an array value via a union operation. */ class Qe extends Ue {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    function We(t, e) {
        const n = Xe(e);
        for (const e of t.elements) n.some((t => Ot(t, e))) || n.push(e);
        return {
            arrayValue: {
                values: n
            }
        };
    }

    /** Transforms an array value via a remove operation. */ class ze extends Ue {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    function He(t, e) {
        let n = Xe(e);
        for (const e of t.elements) n = n.filter((t => !Ot(t, e)));
        return {
            arrayValue: {
                values: n
            }
        };
    }

    /**
     * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
     * transforms. Converts all field values to integers or doubles, but unlike the
     * backend does not cap integer values at 2^63. Instead, JavaScript number
     * arithmetic is used and precision loss can occur for values greater than 2^53.
     */ class Je extends Ue {
        constructor(t, e) {
            super(), this.O = t, this.k = e;
        }
    }

    function Ye(t) {
        return Tt(t.integerValue || t.doubleValue);
    }

    function Xe(t) {
        return Kt(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
    }

    function tn(t, e) {
        return t.field.isEqual(e.field) && function(t, e) {
            return t instanceof Qe && e instanceof Qe || t instanceof ze && e instanceof ze ? ot(t.elements, e.elements, Ot) : t instanceof Je && e instanceof Je ? Ot(t.k, e.k) : t instanceof je && e instanceof je;
        }(t.transform, e.transform);
    }

    /** The result of successfully applying a mutation to the backend. */
    class en {
        constructor(
        /**
         * The version at which the mutation was committed:
         *
         * - For most operations, this is the updateTime in the WriteResult.
         * - For deletes, the commitTime of the WriteResponse (because deletes are
         *   not stored and have no updateTime).
         *
         * Note that these versions can be different: No-op writes will not change
         * the updateTime even though the commitTime advances.
         */
        t, 
        /**
         * The resulting fields returned from the backend after a mutation
         * containing field transforms has been committed. Contains one FieldValue
         * for each FieldTransform that was in the mutation.
         *
         * Will be empty if the mutation did not contain any field transforms.
         */
        e) {
            this.version = t, this.transformResults = e;
        }
    }

    /**
     * Encodes a precondition for a mutation. This follows the model that the
     * backend accepts with the special case of an explicit "empty" precondition
     * (meaning no precondition).
     */ class nn {
        constructor(t, e) {
            this.updateTime = t, this.exists = e;
        }
        /** Creates a new empty Precondition. */    static none() {
            return new nn;
        }
        /** Creates a new Precondition with an exists flag. */    static exists(t) {
            return new nn(void 0, t);
        }
        /** Creates a new Precondition based on a version a document exists at. */    static updateTime(t) {
            return new nn(t);
        }
        /** Returns whether this Precondition is empty. */    get isNone() {
            return void 0 === this.updateTime && void 0 === this.exists;
        }
        isEqual(t) {
            return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
        }
    }

    /** Returns true if the preconditions is valid for the given document. */ function sn(t, e) {
        return void 0 !== t.updateTime ? e.isFoundDocument() && e.version.isEqual(t.updateTime) : void 0 === t.exists || t.exists === e.isFoundDocument();
    }

    /**
     * A mutation describes a self-contained change to a document. Mutations can
     * create, replace, delete, and update subsets of documents.
     *
     * Mutations not only act on the value of the document but also its version.
     *
     * For local mutations (mutations that haven't been committed yet), we preserve
     * the existing version for Set and Patch mutations. For Delete mutations, we
     * reset the version to 0.
     *
     * Here's the expected transition table.
     *
     * MUTATION           APPLIED TO            RESULTS IN
     *
     * SetMutation        Document(v3)          Document(v3)
     * SetMutation        NoDocument(v3)        Document(v0)
     * SetMutation        InvalidDocument(v0)   Document(v0)
     * PatchMutation      Document(v3)          Document(v3)
     * PatchMutation      NoDocument(v3)        NoDocument(v3)
     * PatchMutation      InvalidDocument(v0)   UnknownDocument(v3)
     * DeleteMutation     Document(v3)          NoDocument(v0)
     * DeleteMutation     NoDocument(v3)        NoDocument(v0)
     * DeleteMutation     InvalidDocument(v0)   NoDocument(v0)
     *
     * For acknowledged mutations, we use the updateTime of the WriteResponse as
     * the resulting version for Set and Patch mutations. As deletes have no
     * explicit update time, we use the commitTime of the WriteResponse for
     * Delete mutations.
     *
     * If a mutation is acknowledged by the backend but fails the precondition check
     * locally, we transition to an `UnknownDocument` and rely on Watch to send us
     * the updated version.
     *
     * Field transforms are used only with Patch and Set Mutations. We use the
     * `updateTransforms` message to store transforms, rather than the `transforms`s
     * messages.
     *
     * ## Subclassing Notes
     *
     * Every type of mutation needs to implement its own applyToRemoteDocument() and
     * applyToLocalView() to implement the actual behavior of applying the mutation
     * to some source document (see `setMutationApplyToRemoteDocument()` for an
     * example).
     */ class rn {}

    /**
     * Applies this mutation to the given document for the purposes of computing a
     * new remote document. If the input document doesn't match the expected state
     * (e.g. it is invalid or outdated), the document type may transition to
     * unknown.
     *
     * @param mutation - The mutation to apply.
     * @param document - The document to mutate. The input document can be an
     *     invalid document if the client has no knowledge of the pre-mutation state
     *     of the document.
     * @param mutationResult - The result of applying the mutation from the backend.
     */ function on(t, e, n) {
        t instanceof ln ? function(t, e, n) {
            // Unlike setMutationApplyToLocalView, if we're applying a mutation to a
            // remote document the server has accepted the mutation so the precondition
            // must have held.
            const s = t.value.clone(), i = _n(t.fieldTransforms, e, n.transformResults);
            s.setAll(i), e.convertToFoundDocument(n.version, s).setHasCommittedMutations();
        }(t, e, n) : t instanceof fn ? function(t, e, n) {
            if (!sn(t.precondition, e)) 
            // Since the mutation was not rejected, we know that the precondition
            // matched on the backend. We therefore must not have the expected version
            // of the document in our cache and convert to an UnknownDocument with a
            // known updateTime.
            return void e.convertToUnknownDocument(n.version);
            const s = _n(t.fieldTransforms, e, n.transformResults), i = e.data;
            i.setAll(dn(t)), i.setAll(s), e.convertToFoundDocument(n.version, i).setHasCommittedMutations();
        }(t, e, n) : function(t, e, n) {
            // Unlike applyToLocalView, if we're applying a mutation to a remote
            // document the server has accepted the mutation so the precondition must
            // have held.
            e.convertToNoDocument(n.version).setHasCommittedMutations();
        }(0, e, n);
    }

    /**
     * Applies this mutation to the given document for the purposes of computing
     * the new local view of a document. If the input document doesn't match the
     * expected state, the document is not modified.
     *
     * @param mutation - The mutation to apply.
     * @param document - The document to mutate. The input document can be an
     *     invalid document if the client has no knowledge of the pre-mutation state
     *     of the document.
     * @param localWriteTime - A timestamp indicating the local write time of the
     *     batch this mutation is a part of.
     */ function cn(t, e, n) {
        t instanceof ln ? function(t, e, n) {
            if (!sn(t.precondition, e)) 
            // The mutation failed to apply (e.g. a document ID created with add()
            // caused a name collision).
            return;
            const s = t.value.clone(), i = wn(t.fieldTransforms, n, e);
            s.setAll(i), e.convertToFoundDocument(hn(e), s).setHasLocalMutations();
        }
        /**
     * A mutation that modifies fields of the document at the given key with the
     * given values. The values are applied through a field mask:
     *
     *  * When a field is in both the mask and the values, the corresponding field
     *    is updated.
     *  * When a field is in neither the mask nor the values, the corresponding
     *    field is unmodified.
     *  * When a field is in the mask but not in the values, the corresponding field
     *    is deleted.
     *  * When a field is not in the mask but is in the values, the values map is
     *    ignored.
     */ (t, e, n) : t instanceof fn ? function(t, e, n) {
            if (!sn(t.precondition, e)) return;
            const s = wn(t.fieldTransforms, n, e), i = e.data;
            i.setAll(dn(t)), i.setAll(s), e.convertToFoundDocument(hn(e), i).setHasLocalMutations();
        }
        /**
     * Returns a FieldPath/Value map with the content of the PatchMutation.
     */ (t, e, n) : function(t, e) {
            sn(t.precondition, e) && 
            // We don't call `setHasLocalMutations()` since we want to be backwards
            // compatible with the existing SDK behavior.
            e.convertToNoDocument(at.min());
        }
        /**
     * A mutation that verifies the existence of the document at the given key with
     * the provided precondition.
     *
     * The `verify` operation is only used in Transactions, and this class serves
     * primarily to facilitate serialization into protos.
     */ (t, e);
    }

    /**
     * If this mutation is not idempotent, returns the base value to persist with
     * this mutation. If a base value is returned, the mutation is always applied
     * to this base value, even if document has already been updated.
     *
     * The base value is a sparse object that consists of only the document
     * fields for which this mutation contains a non-idempotent transformation
     * (e.g. a numeric increment). The provided value guarantees consistent
     * behavior for non-idempotent transforms and allow us to return the same
     * latency-compensated value even if the backend has already applied the
     * mutation. The base value is null for idempotent mutations, as they can be
     * re-played even if the backend has already applied them.
     *
     * @returns a base value to store along with the mutation, or null for
     * idempotent mutations.
     */ function un(t, e) {
        let n = null;
        for (const s of t.fieldTransforms) {
            const t = e.data.field(s.field), i = Ge(s.transform, t || null);
            null != i && (null == n && (n = zt.empty()), n.set(s.field, i));
        }
        return n || null;
    }

    function an(t, e) {
        return t.type === e.type && (!!t.key.isEqual(e.key) && (!!t.precondition.isEqual(e.precondition) && (!!function(t, e) {
            return void 0 === t && void 0 === e || !(!t || !e) && ot(t, e, ((t, e) => tn(t, e)));
        }(t.fieldTransforms, e.fieldTransforms) && (0 /* Set */ === t.type ? t.value.isEqual(e.value) : 1 /* Patch */ !== t.type || t.data.isEqual(e.data) && t.fieldMask.isEqual(e.fieldMask)))));
    }

    /**
     * Returns the version from the given document for use as the result of a
     * mutation. Mutations are defined to return the version of the base document
     * only if it is an existing document. Deleted and unknown documents have a
     * post-mutation version of SnapshotVersion.min().
     */ function hn(t) {
        return t.isFoundDocument() ? t.version : at.min();
    }

    /**
     * A mutation that creates or replaces the document at the given key with the
     * object value contents.
     */ class ln extends rn {
        constructor(t, e, n, s = []) {
            super(), this.key = t, this.value = e, this.precondition = n, this.fieldTransforms = s, 
            this.type = 0 /* Set */;
        }
    }

    class fn extends rn {
        constructor(t, e, n, s, i = []) {
            super(), this.key = t, this.data = e, this.fieldMask = n, this.precondition = s, 
            this.fieldTransforms = i, this.type = 1 /* Patch */;
        }
    }

    function dn(t) {
        const e = new Map;
        return t.fieldMask.fields.forEach((n => {
            if (!n.isEmpty()) {
                const s = t.data.field(n);
                e.set(n, s);
            }
        })), e;
    }

    /**
     * Creates a list of "transform results" (a transform result is a field value
     * representing the result of applying a transform) for use after a mutation
     * containing transforms has been acknowledged by the server.
     *
     * @param fieldTransforms - The field transforms to apply the result to.
     * @param mutableDocument - The current state of the document after applying all
     * previous mutations.
     * @param serverTransformResults - The transform results received by the server.
     * @returns The transform results list.
     */ function _n(t, e, n) {
        const s = new Map;
        U(t.length === n.length);
        for (let i = 0; i < n.length; i++) {
            const r = t[i], o = r.transform, c = e.data.field(r.field);
            s.set(r.field, Ke(o, c, n[i]));
        }
        return s;
    }

    /**
     * Creates a list of "transform results" (a transform result is a field value
     * representing the result of applying a transform) for use when applying a
     * transform locally.
     *
     * @param fieldTransforms - The field transforms to apply the result to.
     * @param localWriteTime - The local time of the mutation (used to
     *     generate ServerTimestampValues).
     * @param mutableDocument - The current state of the document after applying all
     *     previous mutations.
     * @returns The transform results list.
     */ function wn(t, e, n) {
        const s = new Map;
        for (const i of t) {
            const t = i.transform, r = n.data.field(i.field);
            s.set(i.field, qe(t, r, e));
        }
        return s;
    }

    /** A mutation that deletes the document at the given key. */ class mn extends rn {
        constructor(t, e) {
            super(), this.key = t, this.precondition = e, this.type = 2 /* Delete */ , this.fieldTransforms = [];
        }
    }

    class gn extends rn {
        constructor(t, e) {
            super(), this.key = t, this.precondition = e, this.type = 3 /* Verify */ , this.fieldTransforms = [];
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class yn {
        // TODO(b/33078163): just use simplest form of existence filter for now
        constructor(t) {
            this.count = t;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Error Codes describing the different ways GRPC can fail. These are copied
     * directly from GRPC's sources here:
     *
     * https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
     *
     * Important! The names of these identifiers matter because the string forms
     * are used for reverse lookups from the webchannel stream. Do NOT change the
     * names of these identifiers or change this into a const enum.
     */ var pn, In;

    /**
     * Determines whether an error code represents a permanent error when received
     * in response to a non-write operation.
     *
     * See isPermanentWriteError for classifying write errors.
     */
    function En(t) {
        switch (t) {
          default:
            return L();

          case G.CANCELLED:
          case G.UNKNOWN:
          case G.DEADLINE_EXCEEDED:
          case G.RESOURCE_EXHAUSTED:
          case G.INTERNAL:
          case G.UNAVAILABLE:
     // Unauthenticated means something went wrong with our token and we need
            // to retry with new credentials which will happen automatically.
                  case G.UNAUTHENTICATED:
            return !1;

          case G.INVALID_ARGUMENT:
          case G.NOT_FOUND:
          case G.ALREADY_EXISTS:
          case G.PERMISSION_DENIED:
          case G.FAILED_PRECONDITION:
     // Aborted might be retried in some scenarios, but that is dependant on
            // the context and should handled individually by the calling code.
            // See https://cloud.google.com/apis/design/errors.
                  case G.ABORTED:
          case G.OUT_OF_RANGE:
          case G.UNIMPLEMENTED:
          case G.DATA_LOSS:
            return !0;
        }
    }

    /**
     * Determines whether an error code represents a permanent error when received
     * in response to a write operation.
     *
     * Write operations must be handled specially because as of b/119437764, ABORTED
     * errors on the write stream should be retried too (even though ABORTED errors
     * are not generally retryable).
     *
     * Note that during the initial handshake on the write stream an ABORTED error
     * signals that we should discard our stream token (i.e. it is permanent). This
     * means a handshake error should be classified with isPermanentError, above.
     */
    /**
     * Maps an error Code from GRPC status code number, like 0, 1, or 14. These
     * are not the same as HTTP status codes.
     *
     * @returns The Code equivalent to the given GRPC status code. Fails if there
     *     is no match.
     */
    function Tn(t) {
        if (void 0 === t) 
        // This shouldn't normally happen, but in certain error cases (like trying
        // to send invalid proto messages) we may get an error with no GRPC code.
        return $("GRPC error has no .code"), G.UNKNOWN;
        switch (t) {
          case pn.OK:
            return G.OK;

          case pn.CANCELLED:
            return G.CANCELLED;

          case pn.UNKNOWN:
            return G.UNKNOWN;

          case pn.DEADLINE_EXCEEDED:
            return G.DEADLINE_EXCEEDED;

          case pn.RESOURCE_EXHAUSTED:
            return G.RESOURCE_EXHAUSTED;

          case pn.INTERNAL:
            return G.INTERNAL;

          case pn.UNAVAILABLE:
            return G.UNAVAILABLE;

          case pn.UNAUTHENTICATED:
            return G.UNAUTHENTICATED;

          case pn.INVALID_ARGUMENT:
            return G.INVALID_ARGUMENT;

          case pn.NOT_FOUND:
            return G.NOT_FOUND;

          case pn.ALREADY_EXISTS:
            return G.ALREADY_EXISTS;

          case pn.PERMISSION_DENIED:
            return G.PERMISSION_DENIED;

          case pn.FAILED_PRECONDITION:
            return G.FAILED_PRECONDITION;

          case pn.ABORTED:
            return G.ABORTED;

          case pn.OUT_OF_RANGE:
            return G.OUT_OF_RANGE;

          case pn.UNIMPLEMENTED:
            return G.UNIMPLEMENTED;

          case pn.DATA_LOSS:
            return G.DATA_LOSS;

          default:
            return L();
        }
    }

    /**
     * Converts an HTTP response's error status to the equivalent error code.
     *
     * @param status - An HTTP error response status ("FAILED_PRECONDITION",
     * "UNKNOWN", etc.)
     * @returns The equivalent Code. Non-matching responses are mapped to
     *     Code.UNKNOWN.
     */ (In = pn || (pn = {}))[In.OK = 0] = "OK", In[In.CANCELLED = 1] = "CANCELLED", 
    In[In.UNKNOWN = 2] = "UNKNOWN", In[In.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
    In[In.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", In[In.NOT_FOUND = 5] = "NOT_FOUND", 
    In[In.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", In[In.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
    In[In.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", In[In.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
    In[In.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", In[In.ABORTED = 10] = "ABORTED", 
    In[In.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", In[In.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
    In[In.INTERNAL = 13] = "INTERNAL", In[In.UNAVAILABLE = 14] = "UNAVAILABLE", In[In.DATA_LOSS = 15] = "DATA_LOSS";

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // An immutable sorted map implementation, based on a Left-leaning Red-Black
    // tree.
    class An {
        constructor(t, e) {
            this.comparator = t, this.root = e || Pn.EMPTY;
        }
        // Returns a copy of the map, with the specified key/value added or replaced.
        insert(t, e) {
            return new An(this.comparator, this.root.insert(t, e, this.comparator).copy(null, null, Pn.BLACK, null, null));
        }
        // Returns a copy of the map, with the specified key removed.
        remove(t) {
            return new An(this.comparator, this.root.remove(t, this.comparator).copy(null, null, Pn.BLACK, null, null));
        }
        // Returns the value of the node with the given key, or null.
        get(t) {
            let e = this.root;
            for (;!e.isEmpty(); ) {
                const n = this.comparator(t, e.key);
                if (0 === n) return e.value;
                n < 0 ? e = e.left : n > 0 && (e = e.right);
            }
            return null;
        }
        // Returns the index of the element in this sorted map, or -1 if it doesn't
        // exist.
        indexOf(t) {
            // Number of nodes that were pruned when descending right
            let e = 0, n = this.root;
            for (;!n.isEmpty(); ) {
                const s = this.comparator(t, n.key);
                if (0 === s) return e + n.left.size;
                s < 0 ? n = n.left : (
                // Count all nodes left of the node plus the node itself
                e += n.left.size + 1, n = n.right);
            }
            // Node not found
                    return -1;
        }
        isEmpty() {
            return this.root.isEmpty();
        }
        // Returns the total number of nodes in the map.
        get size() {
            return this.root.size;
        }
        // Returns the minimum key in the map.
        minKey() {
            return this.root.minKey();
        }
        // Returns the maximum key in the map.
        maxKey() {
            return this.root.maxKey();
        }
        // Traverses the map in key order and calls the specified action function
        // for each key/value pair. If action returns true, traversal is aborted.
        // Returns the first truthy value returned by action, or the last falsey
        // value returned by action.
        inorderTraversal(t) {
            return this.root.inorderTraversal(t);
        }
        forEach(t) {
            this.inorderTraversal(((e, n) => (t(e, n), !1)));
        }
        toString() {
            const t = [];
            return this.inorderTraversal(((e, n) => (t.push(`${e}:${n}`), !1))), `{${t.join(", ")}}`;
        }
        // Traverses the map in reverse key order and calls the specified action
        // function for each key/value pair. If action returns true, traversal is
        // aborted.
        // Returns the first truthy value returned by action, or the last falsey
        // value returned by action.
        reverseTraversal(t) {
            return this.root.reverseTraversal(t);
        }
        // Returns an iterator over the SortedMap.
        getIterator() {
            return new Rn(this.root, null, this.comparator, !1);
        }
        getIteratorFrom(t) {
            return new Rn(this.root, t, this.comparator, !1);
        }
        getReverseIterator() {
            return new Rn(this.root, null, this.comparator, !0);
        }
        getReverseIteratorFrom(t) {
            return new Rn(this.root, t, this.comparator, !0);
        }
    }

     // end SortedMap
    // An iterator over an LLRBNode.
    class Rn {
        constructor(t, e, n, s) {
            this.isReverse = s, this.nodeStack = [];
            let i = 1;
            for (;!t.isEmpty(); ) if (i = e ? n(t.key, e) : 1, 
            // flip the comparison if we're going in reverse
            s && (i *= -1), i < 0) 
            // This node is less than our start key. ignore it
            t = this.isReverse ? t.left : t.right; else {
                if (0 === i) {
                    // This node is exactly equal to our start key. Push it on the stack,
                    // but stop iterating;
                    this.nodeStack.push(t);
                    break;
                }
                // This node is greater than our start key, add it to the stack and move
                // to the next one
                this.nodeStack.push(t), t = this.isReverse ? t.right : t.left;
            }
        }
        getNext() {
            let t = this.nodeStack.pop();
            const e = {
                key: t.key,
                value: t.value
            };
            if (this.isReverse) for (t = t.left; !t.isEmpty(); ) this.nodeStack.push(t), t = t.right; else for (t = t.right; !t.isEmpty(); ) this.nodeStack.push(t), 
            t = t.left;
            return e;
        }
        hasNext() {
            return this.nodeStack.length > 0;
        }
        peek() {
            if (0 === this.nodeStack.length) return null;
            const t = this.nodeStack[this.nodeStack.length - 1];
            return {
                key: t.key,
                value: t.value
            };
        }
    }

     // end SortedMapIterator
    // Represents a node in a Left-leaning Red-Black tree.
    class Pn {
        constructor(t, e, n, s, i) {
            this.key = t, this.value = e, this.color = null != n ? n : Pn.RED, this.left = null != s ? s : Pn.EMPTY, 
            this.right = null != i ? i : Pn.EMPTY, this.size = this.left.size + 1 + this.right.size;
        }
        // Returns a copy of the current node, optionally replacing pieces of it.
        copy(t, e, n, s, i) {
            return new Pn(null != t ? t : this.key, null != e ? e : this.value, null != n ? n : this.color, null != s ? s : this.left, null != i ? i : this.right);
        }
        isEmpty() {
            return !1;
        }
        // Traverses the tree in key order and calls the specified action function
        // for each node. If action returns true, traversal is aborted.
        // Returns the first truthy value returned by action, or the last falsey
        // value returned by action.
        inorderTraversal(t) {
            return this.left.inorderTraversal(t) || t(this.key, this.value) || this.right.inorderTraversal(t);
        }
        // Traverses the tree in reverse key order and calls the specified action
        // function for each node. If action returns true, traversal is aborted.
        // Returns the first truthy value returned by action, or the last falsey
        // value returned by action.
        reverseTraversal(t) {
            return this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t);
        }
        // Returns the minimum node in the tree.
        min() {
            return this.left.isEmpty() ? this : this.left.min();
        }
        // Returns the maximum key in the tree.
        minKey() {
            return this.min().key;
        }
        // Returns the maximum key in the tree.
        maxKey() {
            return this.right.isEmpty() ? this.key : this.right.maxKey();
        }
        // Returns new tree, with the key/value added.
        insert(t, e, n) {
            let s = this;
            const i = n(t, s.key);
            return s = i < 0 ? s.copy(null, null, null, s.left.insert(t, e, n), null) : 0 === i ? s.copy(null, e, null, null, null) : s.copy(null, null, null, null, s.right.insert(t, e, n)), 
            s.fixUp();
        }
        removeMin() {
            if (this.left.isEmpty()) return Pn.EMPTY;
            let t = this;
            return t.left.isRed() || t.left.left.isRed() || (t = t.moveRedLeft()), t = t.copy(null, null, null, t.left.removeMin(), null), 
            t.fixUp();
        }
        // Returns new tree, with the specified item removed.
        remove(t, e) {
            let n, s = this;
            if (e(t, s.key) < 0) s.left.isEmpty() || s.left.isRed() || s.left.left.isRed() || (s = s.moveRedLeft()), 
            s = s.copy(null, null, null, s.left.remove(t, e), null); else {
                if (s.left.isRed() && (s = s.rotateRight()), s.right.isEmpty() || s.right.isRed() || s.right.left.isRed() || (s = s.moveRedRight()), 
                0 === e(t, s.key)) {
                    if (s.right.isEmpty()) return Pn.EMPTY;
                    n = s.right.min(), s = s.copy(n.key, n.value, null, null, s.right.removeMin());
                }
                s = s.copy(null, null, null, null, s.right.remove(t, e));
            }
            return s.fixUp();
        }
        isRed() {
            return this.color;
        }
        // Returns new tree after performing any needed rotations.
        fixUp() {
            let t = this;
            return t.right.isRed() && !t.left.isRed() && (t = t.rotateLeft()), t.left.isRed() && t.left.left.isRed() && (t = t.rotateRight()), 
            t.left.isRed() && t.right.isRed() && (t = t.colorFlip()), t;
        }
        moveRedLeft() {
            let t = this.colorFlip();
            return t.right.left.isRed() && (t = t.copy(null, null, null, null, t.right.rotateRight()), 
            t = t.rotateLeft(), t = t.colorFlip()), t;
        }
        moveRedRight() {
            let t = this.colorFlip();
            return t.left.left.isRed() && (t = t.rotateRight(), t = t.colorFlip()), t;
        }
        rotateLeft() {
            const t = this.copy(null, null, Pn.RED, null, this.right.left);
            return this.right.copy(null, null, this.color, t, null);
        }
        rotateRight() {
            const t = this.copy(null, null, Pn.RED, this.left.right, null);
            return this.left.copy(null, null, this.color, null, t);
        }
        colorFlip() {
            const t = this.left.copy(null, null, !this.left.color, null, null), e = this.right.copy(null, null, !this.right.color, null, null);
            return this.copy(null, null, !this.color, t, e);
        }
        // For testing.
        checkMaxDepth() {
            const t = this.check();
            return Math.pow(2, t) <= this.size + 1;
        }
        // In a balanced RB tree, the black-depth (number of black nodes) from root to
        // leaves is equal on both sides.  This function verifies that or asserts.
        check() {
            if (this.isRed() && this.left.isRed()) throw L();
            if (this.right.isRed()) throw L();
            const t = this.left.check();
            if (t !== this.right.check()) throw L();
            return t + (this.isRed() ? 0 : 1);
        }
    }

     // end LLRBNode
    // Empty node is shared between all LLRB trees.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Pn.EMPTY = null, Pn.RED = !0, Pn.BLACK = !1;

    // end LLRBEmptyNode
    Pn.EMPTY = new 
    // Represents an empty node (a leaf node in the Red-Black Tree).
    class {
        constructor() {
            this.size = 0;
        }
        get key() {
            throw L();
        }
        get value() {
            throw L();
        }
        get color() {
            throw L();
        }
        get left() {
            throw L();
        }
        get right() {
            throw L();
        }
        // Returns a copy of the current node.
        copy(t, e, n, s, i) {
            return this;
        }
        // Returns a copy of the tree, with the specified key/value added.
        insert(t, e, n) {
            return new Pn(t, e);
        }
        // Returns a copy of the tree, with the specified key removed.
        remove(t, e) {
            return this;
        }
        isEmpty() {
            return !0;
        }
        inorderTraversal(t) {
            return !1;
        }
        reverseTraversal(t) {
            return !1;
        }
        minKey() {
            return null;
        }
        maxKey() {
            return null;
        }
        isRed() {
            return !1;
        }
        // For testing.
        checkMaxDepth() {
            return !0;
        }
        check() {
            return 0;
        }
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * SortedSet is an immutable (copy-on-write) collection that holds elements
     * in order specified by the provided comparator.
     *
     * NOTE: if provided comparator returns 0 for two elements, we consider them to
     * be equal!
     */
    class bn {
        constructor(t) {
            this.comparator = t, this.data = new An(this.comparator);
        }
        has(t) {
            return null !== this.data.get(t);
        }
        first() {
            return this.data.minKey();
        }
        last() {
            return this.data.maxKey();
        }
        get size() {
            return this.data.size;
        }
        indexOf(t) {
            return this.data.indexOf(t);
        }
        /** Iterates elements in order defined by "comparator" */    forEach(t) {
            this.data.inorderTraversal(((e, n) => (t(e), !1)));
        }
        /** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */    forEachInRange(t, e) {
            const n = this.data.getIteratorFrom(t[0]);
            for (;n.hasNext(); ) {
                const s = n.getNext();
                if (this.comparator(s.key, t[1]) >= 0) return;
                e(s.key);
            }
        }
        /**
         * Iterates over `elem`s such that: start &lt;= elem until false is returned.
         */    forEachWhile(t, e) {
            let n;
            for (n = void 0 !== e ? this.data.getIteratorFrom(e) : this.data.getIterator(); n.hasNext(); ) {
                if (!t(n.getNext().key)) return;
            }
        }
        /** Finds the least element greater than or equal to `elem`. */    firstAfterOrEqual(t) {
            const e = this.data.getIteratorFrom(t);
            return e.hasNext() ? e.getNext().key : null;
        }
        getIterator() {
            return new vn(this.data.getIterator());
        }
        getIteratorFrom(t) {
            return new vn(this.data.getIteratorFrom(t));
        }
        /** Inserts or updates an element */    add(t) {
            return this.copy(this.data.remove(t).insert(t, !0));
        }
        /** Deletes an element */    delete(t) {
            return this.has(t) ? this.copy(this.data.remove(t)) : this;
        }
        isEmpty() {
            return this.data.isEmpty();
        }
        unionWith(t) {
            let e = this;
            // Make sure `result` always refers to the larger one of the two sets.
                    return e.size < t.size && (e = t, t = this), t.forEach((t => {
                e = e.add(t);
            })), e;
        }
        isEqual(t) {
            if (!(t instanceof bn)) return !1;
            if (this.size !== t.size) return !1;
            const e = this.data.getIterator(), n = t.data.getIterator();
            for (;e.hasNext(); ) {
                const t = e.getNext().key, s = n.getNext().key;
                if (0 !== this.comparator(t, s)) return !1;
            }
            return !0;
        }
        toArray() {
            const t = [];
            return this.forEach((e => {
                t.push(e);
            })), t;
        }
        toString() {
            const t = [];
            return this.forEach((e => t.push(e))), "SortedSet(" + t.toString() + ")";
        }
        copy(t) {
            const e = new bn(this.comparator);
            return e.data = t, e;
        }
    }

    class vn {
        constructor(t) {
            this.iter = t;
        }
        getNext() {
            return this.iter.getNext().key;
        }
        hasNext() {
            return this.iter.hasNext();
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const Sn = new An(Nt.comparator);

    function Dn() {
        return Sn;
    }

    const Cn = new An(Nt.comparator);

    function Nn() {
        return Cn;
    }

    const xn = new An(Nt.comparator);

    const kn = new bn(Nt.comparator);

    function On(...t) {
        let e = kn;
        for (const n of t) e = e.add(n);
        return e;
    }

    const Mn = new bn(rt);

    function $n() {
        return Mn;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An event from the RemoteStore. It is split into targetChanges (changes to the
     * state or the set of documents in our watched targets) and documentUpdates
     * (changes to the actual documents).
     */ class Fn {
        constructor(
        /**
         * The snapshot version this event brings us up to, or MIN if not set.
         */
        t, 
        /**
         * A map from target to changes to the target. See TargetChange.
         */
        e, 
        /**
         * A set of targets that is known to be inconsistent. Listens for these
         * targets should be re-established without resume tokens.
         */
        n, 
        /**
         * A set of which documents have changed or been deleted, along with the
         * doc's new values (if not deleted).
         */
        s, 
        /**
         * A set of which document updates are due only to limbo resolution targets.
         */
        i) {
            this.snapshotVersion = t, this.targetChanges = e, this.targetMismatches = n, this.documentUpdates = s, 
            this.resolvedLimboDocuments = i;
        }
        /**
         * HACK: Views require RemoteEvents in order to determine whether the view is
         * CURRENT, but secondary tabs don't receive remote events. So this method is
         * used to create a synthesized RemoteEvent that can be used to apply a
         * CURRENT status change to a View, for queries executed in a different tab.
         */
        // PORTING NOTE: Multi-tab only
        static createSynthesizedRemoteEventForCurrentChange(t, e) {
            const n = new Map;
            return n.set(t, Bn.createSynthesizedTargetChangeForCurrentChange(t, e)), new Fn(at.min(), n, $n(), Dn(), On());
        }
    }

    /**
     * A TargetChange specifies the set of changes for a specific target as part of
     * a RemoteEvent. These changes track which documents are added, modified or
     * removed, as well as the target's resume token and whether the target is
     * marked CURRENT.
     * The actual changes *to* documents are not part of the TargetChange since
     * documents may be part of multiple targets.
     */ class Bn {
        constructor(
        /**
         * An opaque, server-assigned token that allows watching a query to be resumed
         * after disconnecting without retransmitting all the data that matches the
         * query. The resume token essentially identifies a point in time from which
         * the server should resume sending results.
         */
        t, 
        /**
         * The "current" (synced) status of this target. Note that "current"
         * has special meaning in the RPC protocol that implies that a target is
         * both up-to-date and consistent with the rest of the watch stream.
         */
        e, 
        /**
         * The set of documents that were newly assigned to this target as part of
         * this remote event.
         */
        n, 
        /**
         * The set of documents that were already assigned to this target but received
         * an update during this remote event.
         */
        s, 
        /**
         * The set of documents that were removed from this target as part of this
         * remote event.
         */
        i) {
            this.resumeToken = t, this.current = e, this.addedDocuments = n, this.modifiedDocuments = s, 
            this.removedDocuments = i;
        }
        /**
         * This method is used to create a synthesized TargetChanges that can be used to
         * apply a CURRENT status change to a View (for queries executed in a different
         * tab) or for new queries (to raise snapshots with correct CURRENT status).
         */    static createSynthesizedTargetChangeForCurrentChange(t, e) {
            return new Bn(pt.EMPTY_BYTE_STRING, e, On(), On(), On());
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Represents a changed document and a list of target ids to which this change
     * applies.
     *
     * If document has been deleted NoDocument will be provided.
     */ class Ln {
        constructor(
        /** The new document applies to all of these targets. */
        t, 
        /** The new document is removed from all of these targets. */
        e, 
        /** The key of the document for this change. */
        n, 
        /**
         * The new document or NoDocument if it was deleted. Is null if the
         * document went out of view without the server sending a new document.
         */
        s) {
            this.M = t, this.removedTargetIds = e, this.key = n, this.$ = s;
        }
    }

    class Un {
        constructor(t, e) {
            this.targetId = t, this.F = e;
        }
    }

    class qn {
        constructor(
        /** What kind of change occurred to the watch target. */
        t, 
        /** The target IDs that were added/removed/set. */
        e, 
        /**
         * An opaque, server-assigned token that allows watching a target to be
         * resumed after disconnecting without retransmitting all the data that
         * matches the target. The resume token essentially identifies a point in
         * time from which the server should resume sending results.
         */
        n = pt.EMPTY_BYTE_STRING
        /** An RPC error indicating why the watch failed. */ , s = null) {
            this.state = t, this.targetIds = e, this.resumeToken = n, this.cause = s;
        }
    }

    /** Tracks the internal state of a Watch target. */ class Kn {
        constructor() {
            /**
             * The number of pending responses (adds or removes) that we are waiting on.
             * We only consider targets active that have no pending responses.
             */
            this.B = 0, 
            /**
             * Keeps track of the document changes since the last raised snapshot.
             *
             * These changes are continuously updated as we receive document updates and
             * always reflect the current set of changes against the last issued snapshot.
             */
            this.L = Qn(), 
            /** See public getters for explanations of these fields. */
            this.U = pt.EMPTY_BYTE_STRING, this.q = !1, 
            /**
             * Whether this target state should be included in the next snapshot. We
             * initialize to true so that newly-added targets are included in the next
             * RemoteEvent.
             */
            this.K = !0;
        }
        /**
         * Whether this target has been marked 'current'.
         *
         * 'Current' has special meaning in the RPC protocol: It implies that the
         * Watch backend has sent us all changes up to the point at which the target
         * was added and that the target is consistent with the rest of the watch
         * stream.
         */    get current() {
            return this.q;
        }
        /** The last resume token sent to us for this target. */    get resumeToken() {
            return this.U;
        }
        /** Whether this target has pending target adds or target removes. */    get G() {
            return 0 !== this.B;
        }
        /** Whether we have modified any state that should trigger a snapshot. */    get j() {
            return this.K;
        }
        /**
         * Applies the resume token to the TargetChange, but only when it has a new
         * value. Empty resumeTokens are discarded.
         */    W(t) {
            t.approximateByteSize() > 0 && (this.K = !0, this.U = t);
        }
        /**
         * Creates a target change from the current set of changes.
         *
         * To reset the document changes after raising this snapshot, call
         * `clearPendingChanges()`.
         */    H() {
            let t = On(), e = On(), n = On();
            return this.L.forEach(((s, i) => {
                switch (i) {
                  case 0 /* Added */ :
                    t = t.add(s);
                    break;

                  case 2 /* Modified */ :
                    e = e.add(s);
                    break;

                  case 1 /* Removed */ :
                    n = n.add(s);
                    break;

                  default:
                    L();
                }
            })), new Bn(this.U, this.q, t, e, n);
        }
        /**
         * Resets the document changes and sets `hasPendingChanges` to false.
         */    J() {
            this.K = !1, this.L = Qn();
        }
        Y(t, e) {
            this.K = !0, this.L = this.L.insert(t, e);
        }
        X(t) {
            this.K = !0, this.L = this.L.remove(t);
        }
        Z() {
            this.B += 1;
        }
        tt() {
            this.B -= 1;
        }
        et() {
            this.K = !0, this.q = !0;
        }
    }

    /**
     * A helper class to accumulate watch changes into a RemoteEvent.
     */
    class Gn {
        constructor(t) {
            this.nt = t, 
            /** The internal state of all tracked targets. */
            this.st = new Map, 
            /** Keeps track of the documents to update since the last raised snapshot. */
            this.it = Dn(), 
            /** A mapping of document keys to their set of target IDs. */
            this.rt = jn(), 
            /**
             * A list of targets with existence filter mismatches. These targets are
             * known to be inconsistent and their listens needs to be re-established by
             * RemoteStore.
             */
            this.ot = new bn(rt);
        }
        /**
         * Processes and adds the DocumentWatchChange to the current set of changes.
         */    ct(t) {
            for (const e of t.M) t.$ && t.$.isFoundDocument() ? this.ut(e, t.$) : this.at(e, t.key, t.$);
            for (const e of t.removedTargetIds) this.at(e, t.key, t.$);
        }
        /** Processes and adds the WatchTargetChange to the current set of changes. */    ht(t) {
            this.forEachTarget(t, (e => {
                const n = this.lt(e);
                switch (t.state) {
                  case 0 /* NoChange */ :
                    this.ft(e) && n.W(t.resumeToken);
                    break;

                  case 1 /* Added */ :
                    // We need to decrement the number of pending acks needed from watch
                    // for this targetId.
                    n.tt(), n.G || 
                    // We have a freshly added target, so we need to reset any state
                    // that we had previously. This can happen e.g. when remove and add
                    // back a target for existence filter mismatches.
                    n.J(), n.W(t.resumeToken);
                    break;

                  case 2 /* Removed */ :
                    // We need to keep track of removed targets to we can post-filter and
                    // remove any target changes.
                    // We need to decrement the number of pending acks needed from watch
                    // for this targetId.
                    n.tt(), n.G || this.removeTarget(e);
                    break;

                  case 3 /* Current */ :
                    this.ft(e) && (n.et(), n.W(t.resumeToken));
                    break;

                  case 4 /* Reset */ :
                    this.ft(e) && (
                    // Reset the target and synthesizes removes for all existing
                    // documents. The backend will re-add any documents that still
                    // match the target before it sends the next global snapshot.
                    this.dt(e), n.W(t.resumeToken));
                    break;

                  default:
                    L();
                }
            }));
        }
        /**
         * Iterates over all targetIds that the watch change applies to: either the
         * targetIds explicitly listed in the change or the targetIds of all currently
         * active targets.
         */    forEachTarget(t, e) {
            t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.st.forEach(((t, n) => {
                this.ft(n) && e(n);
            }));
        }
        /**
         * Handles existence filters and synthesizes deletes for filter mismatches.
         * Targets that are invalidated by filter mismatches are added to
         * `pendingTargetResets`.
         */    _t(t) {
            const e = t.targetId, n = t.F.count, s = this.wt(e);
            if (s) {
                const t = s.target;
                if (oe(t)) if (0 === n) {
                    // The existence filter told us the document does not exist. We deduce
                    // that this document does not exist and apply a deleted document to
                    // our updates. Without applying this deleted document there might be
                    // another query that will raise this document as part of a snapshot
                    // until it is resolved, essentially exposing inconsistency between
                    // queries.
                    const n = new Nt(t.path);
                    this.at(e, n, Jt.newNoDocument(n, at.min()));
                } else U(1 === n); else {
                    this.gt(e) !== n && (
                    // Existence filter mismatch: We reset the mapping and raise a new
                    // snapshot with `isFromCache:true`.
                    this.dt(e), this.ot = this.ot.add(e));
                }
            }
        }
        /**
         * Converts the currently accumulated state into a remote event at the
         * provided snapshot version. Resets the accumulated changes before returning.
         */    yt(t) {
            const e = new Map;
            this.st.forEach(((n, s) => {
                const i = this.wt(s);
                if (i) {
                    if (n.current && oe(i.target)) {
                        // Document queries for document that don't exist can produce an empty
                        // result set. To update our local cache, we synthesize a document
                        // delete if we have not previously received the document. This
                        // resolves the limbo state of the document, removing it from
                        // limboDocumentRefs.
                        // TODO(dimond): Ideally we would have an explicit lookup target
                        // instead resulting in an explicit delete message and we could
                        // remove this special logic.
                        const e = new Nt(i.target.path);
                        null !== this.it.get(e) || this.It(s, e) || this.at(s, e, Jt.newNoDocument(e, t));
                    }
                    n.j && (e.set(s, n.H()), n.J());
                }
            }));
            let n = On();
            // We extract the set of limbo-only document updates as the GC logic
            // special-cases documents that do not appear in the target cache.
            
            // TODO(gsoltis): Expand on this comment once GC is available in the JS
            // client.
                    this.rt.forEach(((t, e) => {
                let s = !0;
                e.forEachWhile((t => {
                    const e = this.wt(t);
                    return !e || 2 /* LimboResolution */ === e.purpose || (s = !1, !1);
                })), s && (n = n.add(t));
            })), this.it.forEach(((e, n) => n.setReadTime(t)));
            const s = new Fn(t, e, this.ot, this.it, n);
            return this.it = Dn(), this.rt = jn(), this.ot = new bn(rt), s;
        }
        /**
         * Adds the provided document to the internal list of document updates and
         * its document key to the given target's mapping.
         */
        // Visible for testing.
        ut(t, e) {
            if (!this.ft(t)) return;
            const n = this.It(t, e.key) ? 2 /* Modified */ : 0 /* Added */;
            this.lt(t).Y(e.key, n), this.it = this.it.insert(e.key, e), this.rt = this.rt.insert(e.key, this.Et(e.key).add(t));
        }
        /**
         * Removes the provided document from the target mapping. If the
         * document no longer matches the target, but the document's state is still
         * known (e.g. we know that the document was deleted or we received the change
         * that caused the filter mismatch), the new document can be provided
         * to update the remote document cache.
         */
        // Visible for testing.
        at(t, e, n) {
            if (!this.ft(t)) return;
            const s = this.lt(t);
            this.It(t, e) ? s.Y(e, 1 /* Removed */) : 
            // The document may have entered and left the target before we raised a
            // snapshot, so we can just ignore the change.
            s.X(e), this.rt = this.rt.insert(e, this.Et(e).delete(t)), n && (this.it = this.it.insert(e, n));
        }
        removeTarget(t) {
            this.st.delete(t);
        }
        /**
         * Returns the current count of documents in the target. This includes both
         * the number of documents that the LocalStore considers to be part of the
         * target as well as any accumulated changes.
         */    gt(t) {
            const e = this.lt(t).H();
            return this.nt.getRemoteKeysForTarget(t).size + e.addedDocuments.size - e.removedDocuments.size;
        }
        /**
         * Increment the number of acks needed from watch before we can consider the
         * server to be 'in-sync' with the client's active targets.
         */    Z(t) {
            this.lt(t).Z();
        }
        lt(t) {
            let e = this.st.get(t);
            return e || (e = new Kn, this.st.set(t, e)), e;
        }
        Et(t) {
            let e = this.rt.get(t);
            return e || (e = new bn(rt), this.rt = this.rt.insert(t, e)), e;
        }
        /**
         * Verifies that the user is still interested in this target (by calling
         * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
         * from watch.
         */    ft(t) {
            const e = null !== this.wt(t);
            return e || M("WatchChangeAggregator", "Detected inactive target", t), e;
        }
        /**
         * Returns the TargetData for an active target (i.e. a target that the user
         * is still interested in that has no outstanding target change requests).
         */    wt(t) {
            const e = this.st.get(t);
            return e && e.G ? null : this.nt.Tt(t);
        }
        /**
         * Resets the state of a Watch target to its initial state (e.g. sets
         * 'current' to false, clears the resume token and removes its target mapping
         * from all documents).
         */    dt(t) {
            this.st.set(t, new Kn);
            this.nt.getRemoteKeysForTarget(t).forEach((e => {
                this.at(t, e, /*updatedDocument=*/ null);
            }));
        }
        /**
         * Returns whether the LocalStore considers the document to be part of the
         * specified target.
         */    It(t, e) {
            return this.nt.getRemoteKeysForTarget(t).has(e);
        }
    }

    function jn() {
        return new An(Nt.comparator);
    }

    function Qn() {
        return new An(Nt.comparator);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const Wn = (() => {
        const t = {
            asc: "ASCENDING",
            desc: "DESCENDING"
        };
        return t;
    })(), zn = (() => {
        const t = {
            "<": "LESS_THAN",
            "<=": "LESS_THAN_OR_EQUAL",
            ">": "GREATER_THAN",
            ">=": "GREATER_THAN_OR_EQUAL",
            "==": "EQUAL",
            "!=": "NOT_EQUAL",
            "array-contains": "ARRAY_CONTAINS",
            in: "IN",
            "not-in": "NOT_IN",
            "array-contains-any": "ARRAY_CONTAINS_ANY"
        };
        return t;
    })();

    /**
     * This class generates JsonObject values for the Datastore API suitable for
     * sending to either GRPC stub methods or via the JSON/HTTP REST API.
     *
     * The serializer supports both Protobuf.js and Proto3 JSON formats. By
     * setting `useProto3Json` to true, the serializer will use the Proto3 JSON
     * format.
     *
     * For a description of the Proto3 JSON format check
     * https://developers.google.com/protocol-buffers/docs/proto3#json
     *
     * TODO(klimt): We can remove the databaseId argument if we keep the full
     * resource name in documents.
     */
    class Hn {
        constructor(t, e) {
            this.databaseId = t, this.N = e;
        }
    }

    /**
     * Returns a value for a Date that's appropriate to put into a proto.
     */
    function Jn(t, e) {
        if (t.N) {
            return `${new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + e.nanoseconds).slice(-9)}Z`;
        }
        return {
            seconds: "" + e.seconds,
            nanos: e.nanoseconds
        };
    }

    /**
     * Returns a value for bytes that's appropriate to put in a proto.
     *
     * Visible for testing.
     */
    function Yn(t, e) {
        return t.N ? e.toBase64() : e.toUint8Array();
    }

    /**
     * Returns a ByteString based on the proto string value.
     */ function Xn(t, e) {
        return Jn(t, e.toTimestamp());
    }

    function Zn(t) {
        return U(!!t), at.fromTimestamp(function(t) {
            const e = Et(t);
            return new ut(e.seconds, e.nanos);
        }(t));
    }

    function ts(t, e) {
        return function(t) {
            return new _t([ "projects", t.projectId, "databases", t.database ]);
        }(t).child("documents").child(e).canonicalString();
    }

    function es(t) {
        const e = _t.fromString(t);
        return U(vs(e)), e;
    }

    function ns(t, e) {
        return ts(t.databaseId, e.path);
    }

    function ss(t, e) {
        const n = es(e);
        if (n.get(1) !== t.databaseId.projectId) throw new j(G.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t.databaseId.projectId);
        if (n.get(3) !== t.databaseId.database) throw new j(G.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t.databaseId.database);
        return new Nt(cs(n));
    }

    function is(t, e) {
        return ts(t.databaseId, e);
    }

    function rs(t) {
        const e = es(t);
        // In v1beta1 queries for collections at the root did not have a trailing
        // "/documents". In v1 all resource paths contain "/documents". Preserve the
        // ability to read the v1beta1 form for compatibility with queries persisted
        // in the local target cache.
            return 4 === e.length ? _t.emptyPath() : cs(e);
    }

    function os(t) {
        return new _t([ "projects", t.databaseId.projectId, "databases", t.databaseId.database ]).canonicalString();
    }

    function cs(t) {
        return U(t.length > 4 && "documents" === t.get(4)), t.popFirst(5);
    }

    /** Creates a Document proto from key and fields (but no create/update time) */ function us(t, e, n) {
        return {
            name: ns(t, e),
            fields: n.value.mapValue.fields
        };
    }

    function ls(t, e) {
        let n;
        if ("targetChange" in e) {
            e.targetChange;
            // proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
            // if unset
            const s = function(t) {
                return "NO_CHANGE" === t ? 0 /* NoChange */ : "ADD" === t ? 1 /* Added */ : "REMOVE" === t ? 2 /* Removed */ : "CURRENT" === t ? 3 /* Current */ : "RESET" === t ? 4 /* Reset */ : L();
            }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], r = function(t, e) {
                return t.N ? (U(void 0 === e || "string" == typeof e), pt.fromBase64String(e || "")) : (U(void 0 === e || e instanceof Uint8Array), 
                pt.fromUint8Array(e || new Uint8Array));
            }(t, e.targetChange.resumeToken), o = e.targetChange.cause, c = o && function(t) {
                const e = void 0 === t.code ? G.UNKNOWN : Tn(t.code);
                return new j(e, t.message || "");
            }
            /**
     * Returns a value for a number (or null) that's appropriate to put into
     * a google.protobuf.Int32Value proto.
     * DO NOT USE THIS FOR ANYTHING ELSE.
     * This method cheats. It's typed as returning "number" because that's what
     * our generated proto interfaces say Int32Value must be. But GRPC actually
     * expects a { value: <number> } struct.
     */ (o);
            n = new qn(s, i, r, c || null);
        } else if ("documentChange" in e) {
            e.documentChange;
            const s = e.documentChange;
            s.document, s.document.name, s.document.updateTime;
            const i = ss(t, s.document.name), r = Zn(s.document.updateTime), o = new zt({
                mapValue: {
                    fields: s.document.fields
                }
            }), c = Jt.newFoundDocument(i, r, o), u = s.targetIds || [], a = s.removedTargetIds || [];
            n = new Ln(u, a, c.key, c);
        } else if ("documentDelete" in e) {
            e.documentDelete;
            const s = e.documentDelete;
            s.document;
            const i = ss(t, s.document), r = s.readTime ? Zn(s.readTime) : at.min(), o = Jt.newNoDocument(i, r), c = s.removedTargetIds || [];
            n = new Ln([], c, o.key, o);
        } else if ("documentRemove" in e) {
            e.documentRemove;
            const s = e.documentRemove;
            s.document;
            const i = ss(t, s.document), r = s.removedTargetIds || [];
            n = new Ln([], r, i, null);
        } else {
            if (!("filter" in e)) return L();
            {
                e.filter;
                const t = e.filter;
                t.targetId;
                const s = t.count || 0, i = new yn(s), r = t.targetId;
                n = new Un(r, i);
            }
        }
        return n;
    }

    function fs(t, e) {
        let n;
        if (e instanceof ln) n = {
            update: us(t, e.key, e.value)
        }; else if (e instanceof mn) n = {
            delete: ns(t, e.key)
        }; else if (e instanceof fn) n = {
            update: us(t, e.key, e.data),
            updateMask: bs(e.fieldMask)
        }; else {
            if (!(e instanceof gn)) return L();
            n = {
                verify: ns(t, e.key)
            };
        }
        return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map((t => function(t, e) {
            const n = e.transform;
            if (n instanceof je) return {
                fieldPath: e.field.canonicalString(),
                setToServerValue: "REQUEST_TIME"
            };
            if (n instanceof Qe) return {
                fieldPath: e.field.canonicalString(),
                appendMissingElements: {
                    values: n.elements
                }
            };
            if (n instanceof ze) return {
                fieldPath: e.field.canonicalString(),
                removeAllFromArray: {
                    values: n.elements
                }
            };
            if (n instanceof Je) return {
                fieldPath: e.field.canonicalString(),
                increment: n.k
            };
            throw L();
        }(0, t)))), e.precondition.isNone || (n.currentDocument = function(t, e) {
            return void 0 !== e.updateTime ? {
                updateTime: Xn(t, e.updateTime)
            } : void 0 !== e.exists ? {
                exists: e.exists
            } : L();
        }(t, e.precondition)), n;
    }

    function _s(t, e) {
        return t && t.length > 0 ? (U(void 0 !== e), t.map((t => function(t, e) {
            // NOTE: Deletes don't have an updateTime.
            let n = t.updateTime ? Zn(t.updateTime) : Zn(e);
            return n.isEqual(at.min()) && (
            // The Firestore Emulator currently returns an update time of 0 for
            // deletes of non-existing documents (rather than null). This breaks the
            // test "get deleted doc while offline with source=cache" as NoDocuments
            // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
            // TODO(#2149): Remove this when Emulator is fixed
            n = Zn(e)), new en(n, t.transformResults || []);
        }(t, e)))) : [];
    }

    function ws(t, e) {
        return {
            documents: [ is(t, e.path) ]
        };
    }

    function ms(t, e) {
        // Dissect the path into parent, collectionId, and optional key filter.
        const n = {
            structuredQuery: {}
        }, s = e.path;
        null !== e.collectionGroup ? (n.parent = is(t, s), n.structuredQuery.from = [ {
            collectionId: e.collectionGroup,
            allDescendants: !0
        } ]) : (n.parent = is(t, s.popLast()), n.structuredQuery.from = [ {
            collectionId: s.lastSegment()
        } ]);
        const i = function(t) {
            if (0 === t.length) return;
            const e = t.map((t => 
            // visible for testing
            function(t) {
                if ("==" /* EQUAL */ === t.op) {
                    if (jt(t.value)) return {
                        unaryFilter: {
                            field: Ts(t.field),
                            op: "IS_NAN"
                        }
                    };
                    if (Gt(t.value)) return {
                        unaryFilter: {
                            field: Ts(t.field),
                            op: "IS_NULL"
                        }
                    };
                } else if ("!=" /* NOT_EQUAL */ === t.op) {
                    if (jt(t.value)) return {
                        unaryFilter: {
                            field: Ts(t.field),
                            op: "IS_NOT_NAN"
                        }
                    };
                    if (Gt(t.value)) return {
                        unaryFilter: {
                            field: Ts(t.field),
                            op: "IS_NOT_NULL"
                        }
                    };
                }
                return {
                    fieldFilter: {
                        field: Ts(t.field),
                        op: Es(t.op),
                        value: t.value
                    }
                };
            }(t)));
            if (1 === e.length) return e[0];
            return {
                compositeFilter: {
                    op: "AND",
                    filters: e
                }
            };
        }(e.filters);
        i && (n.structuredQuery.where = i);
        const r = function(t) {
            if (0 === t.length) return;
            return t.map((t => 
            // visible for testing
            function(t) {
                return {
                    field: Ts(t.field),
                    direction: Is(t.dir)
                };
            }(t)));
        }(e.orderBy);
        r && (n.structuredQuery.orderBy = r);
        const o = function(t, e) {
            return t.N || St(e) ? e : {
                value: e
            };
        }
        /**
     * Returns a number (or null) from a google.protobuf.Int32Value proto.
     */ (t, e.limit);
        var c;
        return null !== o && (n.structuredQuery.limit = o), e.startAt && (n.structuredQuery.startAt = {
            before: (c = e.startAt).inclusive,
            values: c.position
        }), e.endAt && (n.structuredQuery.endAt = function(t) {
            return {
                before: !t.inclusive,
                values: t.position
            };
        }(e.endAt)), n;
    }

    function gs(t) {
        let e = rs(t.parent);
        const n = t.structuredQuery, s = n.from ? n.from.length : 0;
        let i = null;
        if (s > 0) {
            U(1 === s);
            const t = n.from[0];
            t.allDescendants ? i = t.collectionId : e = e.child(t.collectionId);
        }
        let r = [];
        n.where && (r = ps(n.where));
        let o = [];
        n.orderBy && (o = n.orderBy.map((t => function(t) {
            return new ge(As(t.field), 
            // visible for testing
            function(t) {
                switch (t) {
                  case "ASCENDING":
                    return "asc" /* ASCENDING */;

                  case "DESCENDING":
                    return "desc" /* DESCENDING */;

                  default:
                    return;
                }
            }
            // visible for testing
            (t.direction));
        }(t))));
        let c = null;
        n.limit && (c = function(t) {
            let e;
            return e = "object" == typeof t ? t.value : t, St(e) ? null : e;
        }(n.limit));
        let u = null;
        n.startAt && (u = function(t) {
            const e = !!t.before, n = t.values || [];
            return new me(n, e);
        }(n.startAt));
        let a = null;
        return n.endAt && (a = function(t) {
            const e = !t.before, n = t.values || [];
            return new me(n, e);
        }
        // visible for testing
        (n.endAt)), Te(e, i, o, r, c, "F" /* First */ , u, a);
    }

    function ys(t, e) {
        const n = function(t, e) {
            switch (e) {
              case 0 /* Listen */ :
                return null;

              case 1 /* ExistenceFilterMismatch */ :
                return "existence-filter-mismatch";

              case 2 /* LimboResolution */ :
                return "limbo-document";

              default:
                return L();
            }
        }(0, e.purpose);
        return null == n ? null : {
            "goog-listen-tags": n
        };
    }

    function ps(t) {
        return t ? void 0 !== t.unaryFilter ? [ Ps(t) ] : void 0 !== t.fieldFilter ? [ Rs(t) ] : void 0 !== t.compositeFilter ? t.compositeFilter.filters.map((t => ps(t))).reduce(((t, e) => t.concat(e))) : L() : [];
    }

    function Is(t) {
        return Wn[t];
    }

    function Es(t) {
        return zn[t];
    }

    function Ts(t) {
        return {
            fieldPath: t.canonicalString()
        };
    }

    function As(t) {
        return mt.fromServerFormat(t.fieldPath);
    }

    function Rs(t) {
        return ce.create(As(t.fieldFilter.field), function(t) {
            switch (t) {
              case "EQUAL":
                return "==" /* EQUAL */;

              case "NOT_EQUAL":
                return "!=" /* NOT_EQUAL */;

              case "GREATER_THAN":
                return ">" /* GREATER_THAN */;

              case "GREATER_THAN_OR_EQUAL":
                return ">=" /* GREATER_THAN_OR_EQUAL */;

              case "LESS_THAN":
                return "<" /* LESS_THAN */;

              case "LESS_THAN_OR_EQUAL":
                return "<=" /* LESS_THAN_OR_EQUAL */;

              case "ARRAY_CONTAINS":
                return "array-contains" /* ARRAY_CONTAINS */;

              case "IN":
                return "in" /* IN */;

              case "NOT_IN":
                return "not-in" /* NOT_IN */;

              case "ARRAY_CONTAINS_ANY":
                return "array-contains-any" /* ARRAY_CONTAINS_ANY */;

              default:
                return L();
            }
        }(t.fieldFilter.op), t.fieldFilter.value);
    }

    function Ps(t) {
        switch (t.unaryFilter.op) {
          case "IS_NAN":
            const e = As(t.unaryFilter.field);
            return ce.create(e, "==" /* EQUAL */ , {
                doubleValue: NaN
            });

          case "IS_NULL":
            const n = As(t.unaryFilter.field);
            return ce.create(n, "==" /* EQUAL */ , {
                nullValue: "NULL_VALUE"
            });

          case "IS_NOT_NAN":
            const s = As(t.unaryFilter.field);
            return ce.create(s, "!=" /* NOT_EQUAL */ , {
                doubleValue: NaN
            });

          case "IS_NOT_NULL":
            const i = As(t.unaryFilter.field);
            return ce.create(i, "!=" /* NOT_EQUAL */ , {
                nullValue: "NULL_VALUE"
            });

          default:
            return L();
        }
    }

    function bs(t) {
        const e = [];
        return t.fields.forEach((t => e.push(t.canonicalString()))), {
            fieldPaths: e
        };
    }

    function vs(t) {
        // Resource names have at least 4 components (project ID, database ID)
        return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
    }

    // V2 is no longer usable (see comment at top of file)
    // Visible for testing
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const ei = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";

    /**
     * A base class representing a persistence transaction, encapsulating both the
     * transaction's sequence numbers as well as a list of onCommitted listeners.
     *
     * When you call Persistence.runTransaction(), it will create a transaction and
     * pass it to your callback. You then pass it to any method that operates
     * on persistence.
     */ class ni {
        constructor() {
            this.onCommittedListeners = [];
        }
        addOnCommittedListener(t) {
            this.onCommittedListeners.push(t);
        }
        raiseOnCommittedEvent() {
            this.onCommittedListeners.forEach((t => t()));
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * PersistencePromise is essentially a re-implementation of Promise except
     * it has a .next() method instead of .then() and .next() and .catch() callbacks
     * are executed synchronously when a PersistencePromise resolves rather than
     * asynchronously (Promise implementations use setImmediate() or similar).
     *
     * This is necessary to interoperate with IndexedDB which will automatically
     * commit transactions if control is returned to the event loop without
     * synchronously initiating another operation on the transaction.
     *
     * NOTE: .then() and .catch() only allow a single consumer, unlike normal
     * Promises.
     */ class si {
        constructor(t) {
            // NOTE: next/catchCallback will always point to our own wrapper functions,
            // not the user's raw next() or catch() callbacks.
            this.nextCallback = null, this.catchCallback = null, 
            // When the operation resolves, we'll set result or error and mark isDone.
            this.result = void 0, this.error = void 0, this.isDone = !1, 
            // Set to true when .then() or .catch() are called and prevents additional
            // chaining.
            this.callbackAttached = !1, t((t => {
                this.isDone = !0, this.result = t, this.nextCallback && 
                // value should be defined unless T is Void, but we can't express
                // that in the type system.
                this.nextCallback(t);
            }), (t => {
                this.isDone = !0, this.error = t, this.catchCallback && this.catchCallback(t);
            }));
        }
        catch(t) {
            return this.next(void 0, t);
        }
        next(t, e) {
            return this.callbackAttached && L(), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(e, this.error) : this.wrapSuccess(t, this.result) : new si(((n, s) => {
                this.nextCallback = e => {
                    this.wrapSuccess(t, e).next(n, s);
                }, this.catchCallback = t => {
                    this.wrapFailure(e, t).next(n, s);
                };
            }));
        }
        toPromise() {
            return new Promise(((t, e) => {
                this.next(t, e);
            }));
        }
        wrapUserFunction(t) {
            try {
                const e = t();
                return e instanceof si ? e : si.resolve(e);
            } catch (t) {
                return si.reject(t);
            }
        }
        wrapSuccess(t, e) {
            return t ? this.wrapUserFunction((() => t(e))) : si.resolve(e);
        }
        wrapFailure(t, e) {
            return t ? this.wrapUserFunction((() => t(e))) : si.reject(e);
        }
        static resolve(t) {
            return new si(((e, n) => {
                e(t);
            }));
        }
        static reject(t) {
            return new si(((e, n) => {
                n(t);
            }));
        }
        static waitFor(
        // Accept all Promise types in waitFor().
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        t) {
            return new si(((e, n) => {
                let s = 0, i = 0, r = !1;
                t.forEach((t => {
                    ++s, t.next((() => {
                        ++i, r && i === s && e();
                    }), (t => n(t)));
                })), r = !0, i === s && e();
            }));
        }
        /**
         * Given an array of predicate functions that asynchronously evaluate to a
         * boolean, implements a short-circuiting `or` between the results. Predicates
         * will be evaluated until one of them returns `true`, then stop. The final
         * result will be whether any of them returned `true`.
         */    static or(t) {
            let e = si.resolve(!1);
            for (const n of t) e = e.next((t => t ? si.resolve(t) : n()));
            return e;
        }
        static forEach(t, e) {
            const n = [];
            return t.forEach(((t, s) => {
                n.push(e.call(this, t, s));
            })), this.waitFor(n);
        }
    }

    /** Verifies whether `e` is an IndexedDbTransactionError. */ function ui(t) {
        // Use name equality, as instanceof checks on errors don't work with errors
        // that wrap other errors.
        return "IndexedDbTransactionError" === t.name;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A batch of mutations that will be sent as one unit to the backend.
     */ class wi {
        /**
         * @param batchId - The unique ID of this mutation batch.
         * @param localWriteTime - The original write time of this mutation.
         * @param baseMutations - Mutations that are used to populate the base
         * values when this mutation is applied locally. This can be used to locally
         * overwrite values that are persisted in the remote document cache. Base
         * mutations are never sent to the backend.
         * @param mutations - The user-provided mutations in this mutation batch.
         * User-provided mutations are applied both locally and remotely on the
         * backend.
         */
        constructor(t, e, n, s) {
            this.batchId = t, this.localWriteTime = e, this.baseMutations = n, this.mutations = s;
        }
        /**
         * Applies all the mutations in this MutationBatch to the specified document
         * to compute the state of the remote document
         *
         * @param document - The document to apply mutations to.
         * @param batchResult - The result of applying the MutationBatch to the
         * backend.
         */    applyToRemoteDocument(t, e) {
            const n = e.mutationResults;
            for (let e = 0; e < this.mutations.length; e++) {
                const s = this.mutations[e];
                if (s.key.isEqual(t.key)) {
                    on(s, t, n[e]);
                }
            }
        }
        /**
         * Computes the local view of a document given all the mutations in this
         * batch.
         *
         * @param document - The document to apply mutations to.
         */    applyToLocalView(t) {
            // First, apply the base state. This allows us to apply non-idempotent
            // transform against a consistent set of values.
            for (const e of this.baseMutations) e.key.isEqual(t.key) && cn(e, t, this.localWriteTime);
            // Second, apply all user-provided mutations.
                    for (const e of this.mutations) e.key.isEqual(t.key) && cn(e, t, this.localWriteTime);
        }
        /**
         * Computes the local view for all provided documents given the mutations in
         * this batch.
         */    applyToLocalDocumentSet(t) {
            // TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
            // directly (as done in `applyToLocalView()`), we can reduce the complexity
            // to O(n).
            this.mutations.forEach((e => {
                const n = t.get(e.key), s = n;
                // TODO(mutabledocuments): This method should take a MutableDocumentMap
                // and we should remove this cast.
                            this.applyToLocalView(s), n.isValidDocument() || s.convertToNoDocument(at.min());
            }));
        }
        keys() {
            return this.mutations.reduce(((t, e) => t.add(e.key)), On());
        }
        isEqual(t) {
            return this.batchId === t.batchId && ot(this.mutations, t.mutations, ((t, e) => an(t, e))) && ot(this.baseMutations, t.baseMutations, ((t, e) => an(t, e)));
        }
    }

    /** The result of applying a mutation batch to the backend. */ class mi {
        constructor(t, e, n, 
        /**
         * A pre-computed mapping from each mutated document to the resulting
         * version.
         */
        s) {
            this.batch = t, this.commitVersion = e, this.mutationResults = n, this.docVersions = s;
        }
        /**
         * Creates a new MutationBatchResult for the given batch and results. There
         * must be one result for each mutation in the batch. This static factory
         * caches a document=&gt;version mapping (docVersions).
         */    static from(t, e, n) {
            U(t.mutations.length === n.length);
            let s = xn;
            const i = t.mutations;
            for (let t = 0; t < i.length; t++) s = s.insert(i[t].key, n[t].version);
            return new mi(t, e, n, s);
        }
    }

    /**
     * @license
     * Copyright 2022 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Representation of an overlay computed by Firestore.
     *
     * Holds information about a mutation and the largest batch id in Firestore when
     * the mutation was created.
     */ class gi {
        constructor(t, e) {
            this.largestBatchId = t, this.mutation = e;
        }
        getKey() {
            return this.mutation.key;
        }
        isEqual(t) {
            return null !== t && this.mutation === t.mutation;
        }
        toString() {
            return `Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An immutable set of metadata that the local store tracks for each target.
     */ class yi {
        constructor(
        /** The target being listened to. */
        t, 
        /**
         * The target ID to which the target corresponds; Assigned by the
         * LocalStore for user listens and by the SyncEngine for limbo watches.
         */
        e, 
        /** The purpose of the target. */
        n, 
        /**
         * The sequence number of the last transaction during which this target data
         * was modified.
         */
        s, 
        /** The latest snapshot version seen for this target. */
        i = at.min()
        /**
         * The maximum snapshot version at which the associated view
         * contained no limbo documents.
         */ , r = at.min()
        /**
         * An opaque, server-assigned token that allows watching a target to be
         * resumed after disconnecting without retransmitting all the data that
         * matches the target. The resume token essentially identifies a point in
         * time from which the server should resume sending results.
         */ , o = pt.EMPTY_BYTE_STRING) {
            this.target = t, this.targetId = e, this.purpose = n, this.sequenceNumber = s, this.snapshotVersion = i, 
            this.lastLimboFreeSnapshotVersion = r, this.resumeToken = o;
        }
        /** Creates a new target data instance with an updated sequence number. */    withSequenceNumber(t) {
            return new yi(this.target, this.targetId, this.purpose, t, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken);
        }
        /**
         * Creates a new target data instance with an updated resume token and
         * snapshot version.
         */    withResumeToken(t, e) {
            return new yi(this.target, this.targetId, this.purpose, this.sequenceNumber, e, this.lastLimboFreeSnapshotVersion, t);
        }
        /**
         * Creates a new target data instance with an updated last limbo free
         * snapshot version number.
         */    withLastLimboFreeSnapshotVersion(t) {
            return new yi(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, t, this.resumeToken);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Serializer for values stored in the LocalStore. */ class pi {
        constructor(t) {
            this.Ht = t;
        }
    }

    /**
     * A helper function for figuring out what kind of query has been stored.
     */
    /**
     * Encodes a `BundledQuery` from bundle proto to a Query object.
     *
     * This reconstructs the original query used to build the bundle being loaded,
     * including features exists only in SDKs (for example: limit-to-last).
     */
    function Si(t) {
        const e = gs({
            parent: t.parent,
            structuredQuery: t.structuredQuery
        });
        return "LAST" === t.limitType ? Ce(e, e.limit, "L" /* Last */) : e;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An in-memory implementation of IndexManager.
     */ class Wi {
        constructor() {
            this.xe = new zi;
        }
        addToCollectionParentIndex(t, e) {
            return this.xe.add(e), si.resolve();
        }
        getCollectionParents(t, e) {
            return si.resolve(this.xe.getEntries(e));
        }
        addFieldIndex(t, e) {
            // Field indices are not supported with memory persistence.
            return si.resolve();
        }
        deleteFieldIndex(t, e) {
            // Field indices are not supported with memory persistence.
            return si.resolve();
        }
        getDocumentsMatchingTarget(t, e, n) {
            // Field indices are not supported with memory persistence.
            return si.resolve(On());
        }
        getFieldIndex(t, e) {
            // Field indices are not supported with memory persistence.
            return si.resolve(null);
        }
        getFieldIndexes(t, e) {
            // Field indices are not supported with memory persistence.
            return si.resolve([]);
        }
        getNextCollectionGroupToUpdate(t) {
            // Field indices are not supported with memory persistence.
            return si.resolve(null);
        }
        updateCollectionGroup(t, e, n) {
            // Field indices are not supported with memory persistence.
            return si.resolve();
        }
        updateIndexEntries(t, e) {
            // Field indices are not supported with memory persistence.
            return si.resolve();
        }
    }

    /**
     * Internal implementation of the collection-parent index exposed by MemoryIndexManager.
     * Also used for in-memory caching by IndexedDbIndexManager and initial index population
     * in indexeddb_schema.ts
     */ class zi {
        constructor() {
            this.index = {};
        }
        // Returns false if the entry already existed.
        add(t) {
            const e = t.lastSegment(), n = t.popLast(), s = this.index[e] || new bn(_t.comparator), i = !s.has(n);
            return this.index[e] = s.add(n), i;
        }
        has(t) {
            const e = t.lastSegment(), n = t.popLast(), s = this.index[e];
            return s && s.has(n);
        }
        getEntries(t) {
            return (this.index[t] || new bn(_t.comparator)).toArray();
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Offset to ensure non-overlapping target ids. */
    /**
     * Generates monotonically increasing target IDs for sending targets to the
     * watch stream.
     *
     * The client constructs two generators, one for the target cache, and one for
     * for the sync engine (to generate limbo documents targets). These
     * generators produce non-overlapping IDs (by using even and odd IDs
     * respectively).
     *
     * By separating the target ID space, the query cache can generate target IDs
     * that persist across client restarts, while sync engine can independently
     * generate in-memory target IDs that are transient and can be reused after a
     * restart.
     */
    class ar {
        constructor(t) {
            this.ze = t;
        }
        next() {
            return this.ze += 2, this.ze;
        }
        static He() {
            // The target cache generator must return '2' in its first call to `next()`
            // as there is no differentiation in the protocol layer between an unset
            // number and the number '0'. If we were to sent a target with target ID
            // '0', the backend would consider it unset and replace it with its own ID.
            return new ar(0);
        }
        static Je() {
            // Sync engine assigns target IDs for limbo document detection.
            return new ar(-1);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Verifies the error thrown by a LocalStore operation. If a LocalStore
     * operation fails because the primary lease has been taken by another client,
     * we ignore the error (the persistence layer will immediately call
     * `applyPrimaryLease` to propagate the primary state change). All other errors
     * are re-thrown.
     *
     * @param err - An error returned by a LocalStore operation.
     * @returns A Promise that resolves after we recovered, or the original error.
     */ async function _r(t) {
        if (t.code !== G.FAILED_PRECONDITION || t.message !== ei) throw t;
        M("LocalStore", "Unexpectedly lost primary lease");
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A map implementation that uses objects as keys. Objects must have an
     * associated equals function and must be immutable. Entries in the map are
     * stored together with the key being produced from the mapKeyFn. This map
     * automatically handles collisions of keys.
     */ class Er {
        constructor(t, e) {
            this.mapKeyFn = t, this.equalsFn = e, 
            /**
             * The inner map for a key/value pair. Due to the possibility of collisions we
             * keep a list of entries that we do a linear search through to find an actual
             * match. Note that collisions should be rare, so we still expect near
             * constant time lookups in practice.
             */
            this.inner = {};
        }
        /** Get a value for this key, or undefined if it does not exist. */    get(t) {
            const e = this.mapKeyFn(t), n = this.inner[e];
            if (void 0 !== n) for (const [e, s] of n) if (this.equalsFn(e, t)) return s;
        }
        has(t) {
            return void 0 !== this.get(t);
        }
        /** Put this key and value in the map. */    set(t, e) {
            const n = this.mapKeyFn(t), s = this.inner[n];
            if (void 0 !== s) {
                for (let n = 0; n < s.length; n++) if (this.equalsFn(s[n][0], t)) return void (s[n] = [ t, e ]);
                s.push([ t, e ]);
            } else this.inner[n] = [ [ t, e ] ];
        }
        /**
         * Remove this key from the map. Returns a boolean if anything was deleted.
         */    delete(t) {
            const e = this.mapKeyFn(t), n = this.inner[e];
            if (void 0 === n) return !1;
            for (let s = 0; s < n.length; s++) if (this.equalsFn(n[s][0], t)) return 1 === n.length ? delete this.inner[e] : n.splice(s, 1), 
            !0;
            return !1;
        }
        forEach(t) {
            lt(this.inner, ((e, n) => {
                for (const [e, s] of n) t(e, s);
            }));
        }
        isEmpty() {
            return ft(this.inner);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An in-memory buffer of entries to be written to a RemoteDocumentCache.
     * It can be used to batch up a set of changes to be written to the cache, but
     * additionally supports reading entries back with the `getEntry()` method,
     * falling back to the underlying RemoteDocumentCache if no entry is
     * buffered.
     *
     * Entries added to the cache *must* be read first. This is to facilitate
     * calculating the size delta of the pending changes.
     *
     * PORTING NOTE: This class was implemented then removed from other platforms.
     * If byte-counting ends up being needed on the other platforms, consider
     * porting this class as part of that implementation work.
     */ class Tr {
        constructor() {
            // A mapping of document key to the new cache entry that should be written.
            this.changes = new Er((t => t.toString()), ((t, e) => t.isEqual(e))), this.changesApplied = !1;
        }
        /**
         * Buffers a `RemoteDocumentCache.addEntry()` call.
         *
         * You can only modify documents that have already been retrieved via
         * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
         */    addEntry(t) {
            this.assertNotApplied(), this.changes.set(t.key, t);
        }
        /**
         * Buffers a `RemoteDocumentCache.removeEntry()` call.
         *
         * You can only remove documents that have already been retrieved via
         * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
         */    removeEntry(t, e) {
            this.assertNotApplied(), this.changes.set(t, Jt.newInvalidDocument(t).setReadTime(e));
        }
        /**
         * Looks up an entry in the cache. The buffered changes will first be checked,
         * and if no buffered change applies, this will forward to
         * `RemoteDocumentCache.getEntry()`.
         *
         * @param transaction - The transaction in which to perform any persistence
         *     operations.
         * @param documentKey - The key of the entry to look up.
         * @returns The cached document or an invalid document if we have nothing
         * cached.
         */    getEntry(t, e) {
            this.assertNotApplied();
            const n = this.changes.get(e);
            return void 0 !== n ? si.resolve(n) : this.getFromCache(t, e);
        }
        /**
         * Looks up several entries in the cache, forwarding to
         * `RemoteDocumentCache.getEntry()`.
         *
         * @param transaction - The transaction in which to perform any persistence
         *     operations.
         * @param documentKeys - The keys of the entries to look up.
         * @returns A map of cached documents, indexed by key. If an entry cannot be
         *     found, the corresponding key will be mapped to an invalid document.
         */    getEntries(t, e) {
            return this.getAllFromCache(t, e);
        }
        /**
         * Applies buffered changes to the underlying RemoteDocumentCache, using
         * the provided transaction.
         */    apply(t) {
            return this.assertNotApplied(), this.changesApplied = !0, this.applyChanges(t);
        }
        /** Helper to assert this.changes is not null  */    assertNotApplied() {}
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A readonly view of the local state of all documents we're tracking (i.e. we
     * have a cached version in remoteDocumentCache or local mutations for the
     * document). The view is computed by applying the mutations in the
     * MutationQueue to the RemoteDocumentCache.
     */ class Mr {
        constructor(t, e, n) {
            this.qn = t, this.gs = e, this.indexManager = n;
        }
        /**
         * Get the local view of the document identified by `key`.
         *
         * @returns Local view of the document or null if we don't have any cached
         * state for it.
         */    ys(t, e) {
            return this.gs.getAllMutationBatchesAffectingDocumentKey(t, e).next((n => this.ps(t, e, n)));
        }
        /** Internal version of `getDocument` that allows reusing batches. */    ps(t, e, n) {
            return this.qn.getEntry(t, e).next((t => {
                for (const e of n) e.applyToLocalView(t);
                return t;
            }));
        }
        // Returns the view of the given `docs` as they would appear after applying
        // all mutations in the given `batches`.
        Is(t, e) {
            t.forEach(((t, n) => {
                for (const t of e) t.applyToLocalView(n);
            }));
        }
        /**
         * Gets the local view of the documents identified by `keys`.
         *
         * If we don't have cached state for a document in `keys`, a NoDocument will
         * be stored for that key in the resulting set.
         */    Es(t, e) {
            return this.qn.getEntries(t, e).next((e => this.Ts(t, e).next((() => e))));
        }
        /**
         * Applies the local view the given `baseDocs` without retrieving documents
         * from the local store.
         */    Ts(t, e) {
            return this.gs.getAllMutationBatchesAffectingDocumentKeys(t, e).next((t => this.Is(e, t)));
        }
        /**
         * Performs a query against the local view of all documents.
         *
         * @param transaction - The persistence transaction.
         * @param query - The query to match documents against.
         * @param sinceReadTime - If not set to SnapshotVersion.min(), return only
         *     documents that have been read since this snapshot version (exclusive).
         */    As(t, e, n) {
            /**
     * Returns whether the query matches a single document by path (rather than a
     * collection).
     */
            return function(t) {
                return Nt.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
            }(e) ? this.Rs(t, e.path) : Ve(e) ? this.Ps(t, e, n) : this.bs(t, e, n);
        }
        Rs(t, e) {
            // Just do a simple document lookup.
            return this.ys(t, new Nt(e)).next((t => {
                let e = Nn();
                return t.isFoundDocument() && (e = e.insert(t.key, t)), e;
            }));
        }
        Ps(t, e, n) {
            const s = e.collectionGroup;
            let i = Nn();
            return this.indexManager.getCollectionParents(t, s).next((r => si.forEach(r, (r => {
                const o = function(t, e) {
                    return new Ee(e, 
                    /*collectionGroup=*/ null, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
                }
                /**
     * Returns true if this query does not specify any query constraints that
     * could remove results.
     */ (e, r.child(s));
                return this.bs(t, o, n).next((t => {
                    t.forEach(((t, e) => {
                        i = i.insert(t, e);
                    }));
                }));
            })).next((() => i))));
        }
        bs(t, e, n) {
            // Query the remote documents and overlay mutations.
            let s;
            return this.qn.getAll(t, e.path, n).next((n => (s = n, this.gs.getAllMutationBatchesAffectingQuery(t, e)))).next((t => {
                for (const e of t) for (const t of e.mutations) {
                    const n = t.key;
                    let i = s.get(n);
                    null == i && (
                    // Create invalid document to apply mutations on top of
                    i = Jt.newInvalidDocument(n), s = s.insert(n, i)), cn(t, i, e.localWriteTime), i.isFoundDocument() || (s = s.remove(n));
                }
            })).next((() => (
            // Finally, filter out any documents that don't actually match
            // the query.
            s.forEach(((t, n) => {
                Oe(e, n) || (s = s.remove(t));
            })), s)));
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A set of changes to what documents are currently in view and out of view for
     * a given query. These changes are sent to the LocalStore by the View (via
     * the SyncEngine) and are used to pin / unpin documents as appropriate.
     */ class $r {
        constructor(t, e, n, s) {
            this.targetId = t, this.fromCache = e, this.vs = n, this.Vs = s;
        }
        static Ss(t, e) {
            let n = On(), s = On();
            for (const t of e.docChanges) switch (t.type) {
              case 0 /* Added */ :
                n = n.add(t.doc.key);
                break;

              case 1 /* Removed */ :
                s = s.add(t.doc.key);
     // do nothing
                    }
            return new $r(t, e.fromCache, n, s);
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A query engine that takes advantage of the target document mapping in the
     * QueryCache. Query execution is optimized by only reading the documents that
     * previously matched a query plus any documents that were edited after the
     * query was last listened to.
     *
     * There are some cases when this optimization is not guaranteed to produce
     * the same results as full collection scans. In these cases, query
     * processing falls back to full scans. These cases are:
     *
     * - Limit queries where a document that matched the query previously no longer
     *   matches the query.
     *
     * - Limit queries where a document edit may cause the document to sort below
     *   another document that is in the local cache.
     *
     * - Queries that have never been CURRENT or free of limbo documents.
     */ class Fr {
        /** Sets the document view to query against. */
        Ds(t) {
            this.Cs = t;
        }
        /** Returns all local documents matching the specified query. */    As(t, e, n, s) {
            // Queries that match all documents don't benefit from using
            // key-based lookups. It is more efficient to scan all documents in a
            // collection, rather than to perform individual lookups.
            return function(t) {
                return 0 === t.filters.length && null === t.limit && null == t.startAt && null == t.endAt && (0 === t.explicitOrderBy.length || 1 === t.explicitOrderBy.length && t.explicitOrderBy[0].field.isKeyField());
            }(e) || n.isEqual(at.min()) ? this.Ns(t, e) : this.Cs.Es(t, s).next((i => {
                const r = this.xs(e, i);
                return (Re(e) || Pe(e)) && this.ks(e.limitType, r, s, n) ? this.Ns(t, e) : (k() <= LogLevel.DEBUG && M("QueryEngine", "Re-using previous result from %s to execute query: %s", n.toString(), ke(e)), 
                this.Cs.As(t, e, n).next((t => (
                // We merge `previousResults` into `updateResults`, since
                // `updateResults` is already a DocumentMap. If a document is
                // contained in both lists, then its contents are the same.
                r.forEach((e => {
                    t = t.insert(e.key, e);
                })), t))));
            }));
            // Queries that have never seen a snapshot without limbo free documents
            // should also be run as a full collection scan.
            }
        /** Applies the query filter and sorting to the provided documents.  */    xs(t, e) {
            // Sort the documents and re-apply the query filter since previously
            // matching documents do not necessarily still match the query.
            let n = new bn(Me(t));
            return e.forEach(((e, s) => {
                Oe(t, s) && (n = n.add(s));
            })), n;
        }
        /**
         * Determines if a limit query needs to be refilled from cache, making it
         * ineligible for index-free execution.
         *
         * @param sortedPreviousResults - The documents that matched the query when it
         * was last synchronized, sorted by the query's comparator.
         * @param remoteKeys - The document keys that matched the query at the last
         * snapshot.
         * @param limboFreeSnapshotVersion - The version of the snapshot when the
         * query was last synchronized.
         */    ks(t, e, n, s) {
            // The query needs to be refilled if a previously matching document no
            // longer matches.
            if (n.size !== e.size) return !0;
            // Limit queries are not eligible for index-free query execution if there is
            // a potential that an older document from cache now sorts before a document
            // that was previously part of the limit. This, however, can only happen if
            // the document at the edge of the limit goes out of limit.
            // If a document that is not the limit boundary sorts differently,
            // the boundary of the limit itself did not change and documents from cache
            // will continue to be "rejected" by this boundary. Therefore, we can ignore
            // any modifications that don't affect the last document.
                    const i = "F" /* First */ === t ? e.last() : e.first();
            return !!i && (i.hasPendingWrites || i.version.compareTo(s) > 0);
        }
        Ns(t, e) {
            return k() <= LogLevel.DEBUG && M("QueryEngine", "Using full collection scan to execute query:", ke(e)), 
            this.Cs.As(t, e, at.min());
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Implements `LocalStore` interface.
     *
     * Note: some field defined in this class might have public access level, but
     * the class is not exported so they are only accessible from this module.
     * This is useful to implement optional features (like bundles) in free
     * functions, such that they are tree-shakeable.
     */
    class Br {
        constructor(
        /** Manages our in-memory or durable persistence. */
        t, e, n, s) {
            this.persistence = t, this.Os = e, this.O = s, 
            /**
             * Maps a targetID to data about its target.
             *
             * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
             * of `applyRemoteEvent()` idempotent.
             */
            this.Ms = new An(rt), 
            /** Maps a target to its targetID. */
            // TODO(wuandy): Evaluate if TargetId can be part of Target.
            this.$s = new Er((t => se(t)), re), 
            /**
             * The read time of the last entry processed by `getNewDocumentChanges()`.
             *
             * PORTING NOTE: This is only used for multi-tab synchronization.
             */
            this.Fs = at.min(), this.Bs = t.getRemoteDocumentCache(), this.Un = t.getTargetCache(), 
            this.Kn = t.getBundleCache(), this.Ls(n);
        }
        Ls(t) {
            // TODO(indexing): Add spec tests that test these components change after a
            // user change
            this.indexManager = this.persistence.getIndexManager(t), this.gs = this.persistence.getMutationQueue(t, this.indexManager), 
            this.Us = new Mr(this.Bs, this.gs, this.indexManager), this.Bs.setIndexManager(this.indexManager), 
            this.Os.Ds(this.Us);
        }
        collectGarbage(t) {
            return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (e => t.collect(e, this.Ms)));
        }
    }

    function Lr(
    /** Manages our in-memory or durable persistence. */
    t, e, n, s) {
        return new Br(t, e, n, s);
    }

    /**
     * Tells the LocalStore that the currently authenticated user has changed.
     *
     * In response the local store switches the mutation queue to the new user and
     * returns any resulting document changes.
     */
    // PORTING NOTE: Android and iOS only return the documents affected by the
    // change.
    async function Ur(t, e) {
        const n = K(t);
        return await n.persistence.runTransaction("Handle user change", "readonly", (t => {
            // Swap out the mutation queue, grabbing the pending mutation batches
            // before and after.
            let s;
            return n.gs.getAllMutationBatches(t).next((i => (s = i, n.Ls(e), n.gs.getAllMutationBatches(t)))).next((e => {
                const i = [], r = [];
                // Union the old/new changed keys.
                let o = On();
                for (const t of s) {
                    i.push(t.batchId);
                    for (const e of t.mutations) o = o.add(e.key);
                }
                for (const t of e) {
                    r.push(t.batchId);
                    for (const e of t.mutations) o = o.add(e.key);
                }
                // Return the set of all (potentially) changed documents and the list
                // of mutation batch IDs that were affected by change.
                            return n.Us.Es(t, o).next((t => ({
                    qs: t,
                    removedBatchIds: i,
                    addedBatchIds: r
                })));
            }));
        }));
    }

    /* Accepts locally generated Mutations and commit them to storage. */
    /**
     * Acknowledges the given batch.
     *
     * On the happy path when a batch is acknowledged, the local store will
     *
     *  + remove the batch from the mutation queue;
     *  + apply the changes to the remote document cache;
     *  + recalculate the latency compensated view implied by those changes (there
     *    may be mutations in the queue that affect the documents but haven't been
     *    acknowledged yet); and
     *  + give the changed documents back the sync engine
     *
     * @returns The resulting (modified) documents.
     */
    function qr(t, e) {
        const n = K(t);
        return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (t => {
            const s = e.batch.keys(), i = n.Bs.newChangeBuffer({
                trackRemovals: !0
            });
            return function(t, e, n, s) {
                const i = n.batch, r = i.keys();
                let o = si.resolve();
                return r.forEach((t => {
                    o = o.next((() => s.getEntry(e, t))).next((e => {
                        const r = n.docVersions.get(t);
                        U(null !== r), e.version.compareTo(r) < 0 && (i.applyToRemoteDocument(e, n), e.isValidDocument() && (
                        // We use the commitVersion as the readTime rather than the
                        // document's updateTime since the updateTime is not advanced
                        // for updates that do not modify the underlying document.
                        e.setReadTime(n.commitVersion), s.addEntry(e)));
                    }));
                })), o.next((() => t.gs.removeMutationBatch(e, i)));
            }
            /** Returns the local view of the documents affected by a mutation batch. */
            // PORTING NOTE: Multi-Tab only.
            (n, t, e, i).next((() => i.apply(t))).next((() => n.gs.performConsistencyCheck(t))).next((() => n.Us.Es(t, s)));
        }));
    }

    /**
     * Removes mutations from the MutationQueue for the specified batch;
     * LocalDocuments will be recalculated.
     *
     * @returns The resulting modified documents.
     */
    /**
     * Returns the last consistent snapshot processed (used by the RemoteStore to
     * determine whether to buffer incoming snapshots from the backend).
     */
    function Kr(t) {
        const e = K(t);
        return e.persistence.runTransaction("Get last remote snapshot version", "readonly", (t => e.Un.getLastRemoteSnapshotVersion(t)));
    }

    /**
     * Updates the "ground-state" (remote) documents. We assume that the remote
     * event reflects any write batches that have been acknowledged or rejected
     * (i.e. we do not re-apply local mutations to updates from this event).
     *
     * LocalDocuments are re-calculated if there are remaining mutations in the
     * queue.
     */ function Gr(t, e) {
        const n = K(t), s = e.snapshotVersion;
        let i = n.Ms;
        return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (t => {
            const r = n.Bs.newChangeBuffer({
                trackRemovals: !0
            });
            // Reset newTargetDataByTargetMap in case this transaction gets re-run.
                    i = n.Ms;
            const o = [];
            e.targetChanges.forEach(((r, c) => {
                const u = i.get(c);
                if (!u) return;
                // Only update the remote keys if the target is still active. This
                // ensures that we can persist the updated target data along with
                // the updated assignment.
                            o.push(n.Un.removeMatchingKeys(t, r.removedDocuments, c).next((() => n.Un.addMatchingKeys(t, r.addedDocuments, c))));
                let a = u.withSequenceNumber(t.currentSequenceNumber);
                e.targetMismatches.has(c) ? a = a.withResumeToken(pt.EMPTY_BYTE_STRING, at.min()).withLastLimboFreeSnapshotVersion(at.min()) : r.resumeToken.approximateByteSize() > 0 && (a = a.withResumeToken(r.resumeToken, s)), 
                i = i.insert(c, a), 
                // Update the target data if there are target changes (or if
                // sufficient time has passed since the last update).
                /**
     * Returns true if the newTargetData should be persisted during an update of
     * an active target. TargetData should always be persisted when a target is
     * being released and should not call this function.
     *
     * While the target is active, TargetData updates can be omitted when nothing
     * about the target has changed except metadata like the resume token or
     * snapshot version. Occasionally it's worth the extra write to prevent these
     * values from getting too stale after a crash, but this doesn't have to be
     * too frequent.
     */
                function(t, e, n) {
                    // Always persist target data if we don't already have a resume token.
                    if (0 === t.resumeToken.approximateByteSize()) return !0;
                    // Don't allow resume token changes to be buffered indefinitely. This
                    // allows us to be reasonably up-to-date after a crash and avoids needing
                    // to loop over all active queries on shutdown. Especially in the browser
                    // we may not get time to do anything interesting while the current tab is
                    // closing.
                                    if (e.snapshotVersion.toMicroseconds() - t.snapshotVersion.toMicroseconds() >= 3e8) return !0;
                    // Otherwise if the only thing that has changed about a target is its resume
                    // token it's not worth persisting. Note that the RemoteStore keeps an
                    // in-memory view of the currently active targets which includes the current
                    // resume token, so stream failure or user changes will still use an
                    // up-to-date resume token regardless of what we do here.
                                    return n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size > 0;
                }
                /**
     * Notifies local store of the changed views to locally pin documents.
     */ (u, a, r) && o.push(n.Un.updateTargetData(t, a));
            }));
            let c = Dn();
            // HACK: The only reason we allow a null snapshot version is so that we
            // can synthesize remote events when we get permission denied errors while
            // trying to resolve the state of a locally cached document that is in
            // limbo.
            if (e.documentUpdates.forEach((s => {
                e.resolvedLimboDocuments.has(s) && o.push(n.persistence.referenceDelegate.updateLimboDocument(t, s));
            })), 
            // Each loop iteration only affects its "own" doc, so it's safe to get all the remote
            // documents in advance in a single call.
            o.push(jr(t, r, e.documentUpdates).next((t => {
                c = t;
            }))), !s.isEqual(at.min())) {
                const e = n.Un.getLastRemoteSnapshotVersion(t).next((e => n.Un.setTargetsMetadata(t, t.currentSequenceNumber, s)));
                o.push(e);
            }
            return si.waitFor(o).next((() => r.apply(t))).next((() => n.Us.Ts(t, c))).next((() => c));
        })).then((t => (n.Ms = i, t)));
    }

    /**
     * Populates document change buffer with documents from backend or a bundle.
     * Returns the document changes resulting from applying those documents.
     *
     * @param txn - Transaction to use to read existing documents from storage.
     * @param documentBuffer - Document buffer to collect the resulted changes to be
     *        applied to storage.
     * @param documents - Documents to be applied.
     * @param globalVersion - A `SnapshotVersion` representing the read time if all
     *        documents have the same read time.
     * @param documentVersions - A DocumentKey-to-SnapshotVersion map if documents
     *        have their own read time.
     *
     * Note: this function will use `documentVersions` if it is defined;
     * when it is not defined, resorts to `globalVersion`.
     */ function jr(t, e, n) {
        let s = On();
        return n.forEach((t => s = s.add(t))), e.getEntries(t, s).next((t => {
            let s = Dn();
            return n.forEach(((n, i) => {
                const r = t.get(n);
                // Note: The order of the steps below is important, since we want
                // to ensure that rejected limbo resolutions (which fabricate
                // NoDocuments with SnapshotVersion.min()) never add documents to
                // cache.
                            i.isNoDocument() && i.version.isEqual(at.min()) ? (
                // NoDocuments with SnapshotVersion.min() are used in manufactured
                // events. We remove these documents from cache since we lost
                // access.
                e.removeEntry(n, i.readTime), s = s.insert(n, i)) : !r.isValidDocument() || i.version.compareTo(r.version) > 0 || 0 === i.version.compareTo(r.version) && r.hasPendingWrites ? (e.addEntry(i), 
                s = s.insert(n, i)) : M("LocalStore", "Ignoring outdated watch update for ", n, ". Current version:", r.version, " Watch version:", i.version);
            })), s;
        }));
    }

    /**
     * Gets the mutation batch after the passed in batchId in the mutation queue
     * or null if empty.
     * @param afterBatchId - If provided, the batch to search after.
     * @returns The next mutation or null if there wasn't one.
     */
    function Qr(t, e) {
        const n = K(t);
        return n.persistence.runTransaction("Get next mutation batch", "readonly", (t => (void 0 === e && (e = -1), 
        n.gs.getNextMutationBatchAfterBatchId(t, e))));
    }

    /**
     * Reads the current value of a Document with a given key or null if not
     * found - used for testing.
     */
    /**
     * Assigns the given target an internal ID so that its results can be pinned so
     * they don't get GC'd. A target must be allocated in the local store before
     * the store can be used to manage its view.
     *
     * Allocating an already allocated `Target` will return the existing `TargetData`
     * for that `Target`.
     */
    function Wr(t, e) {
        const n = K(t);
        return n.persistence.runTransaction("Allocate target", "readwrite", (t => {
            let s;
            return n.Un.getTargetData(t, e).next((i => i ? (
            // This target has been listened to previously, so reuse the
            // previous targetID.
            // TODO(mcg): freshen last accessed date?
            s = i, si.resolve(s)) : n.Un.allocateTargetId(t).next((i => (s = new yi(e, i, 0 /* Listen */ , t.currentSequenceNumber), 
            n.Un.addTargetData(t, s).next((() => s)))))));
        })).then((t => {
            // If Multi-Tab is enabled, the existing target data may be newer than
            // the in-memory data
            const s = n.Ms.get(t.targetId);
            return (null === s || t.snapshotVersion.compareTo(s.snapshotVersion) > 0) && (n.Ms = n.Ms.insert(t.targetId, t), 
            n.$s.set(e, t.targetId)), t;
        }));
    }

    /**
     * Returns the TargetData as seen by the LocalStore, including updates that may
     * have not yet been persisted to the TargetCache.
     */
    // Visible for testing.
    /**
     * Unpins all the documents associated with the given target. If
     * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
     * directly removes the associated target data from the target cache.
     *
     * Releasing a non-existing `Target` is a no-op.
     */
    // PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
    async function zr(t, e, n) {
        const s = K(t), i = s.Ms.get(e), r = n ? "readwrite" : "readwrite-primary";
        try {
            n || await s.persistence.runTransaction("Release target", r, (t => s.persistence.referenceDelegate.removeTarget(t, i)));
        } catch (t) {
            if (!ui(t)) throw t;
            // All `releaseTarget` does is record the final metadata state for the
            // target, but we've been recording this periodically during target
            // activity. If we lose this write this could cause a very slight
            // difference in the order of target deletion during GC, but we
            // don't define exact LRU semantics so this is acceptable.
            M("LocalStore", `Failed to update sequence numbers for target ${e}: ${t}`);
        }
        s.Ms = s.Ms.remove(e), s.$s.delete(i.target);
    }

    /**
     * Runs the specified query against the local store and returns the results,
     * potentially taking advantage of query data from previous executions (such
     * as the set of remote keys).
     *
     * @param usePreviousResults - Whether results from previous executions can
     * be used to optimize this query execution.
     */ function Hr(t, e, n) {
        const s = K(t);
        let i = at.min(), r = On();
        return s.persistence.runTransaction("Execute query", "readonly", (t => function(t, e, n) {
            const s = K(t), i = s.$s.get(n);
            return void 0 !== i ? si.resolve(s.Ms.get(i)) : s.Un.getTargetData(e, n);
        }(s, t, De(e)).next((e => {
            if (e) return i = e.lastLimboFreeSnapshotVersion, s.Un.getMatchingKeysForTargetId(t, e.targetId).next((t => {
                r = t;
            }));
        })).next((() => s.Os.As(t, e, n ? i : at.min(), n ? r : On()))).next((t => ({
            documents: t,
            Ks: r
        })))));
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class eo {
        constructor(t) {
            this.O = t, this.Ws = new Map, this.zs = new Map;
        }
        getBundleMetadata(t, e) {
            return si.resolve(this.Ws.get(e));
        }
        saveBundleMetadata(t, e) {
            /** Decodes a BundleMetadata proto into a BundleMetadata object. */
            var n;
            return this.Ws.set(e.id, {
                id: (n = e).id,
                version: n.version,
                createTime: Zn(n.createTime)
            }), si.resolve();
        }
        getNamedQuery(t, e) {
            return si.resolve(this.zs.get(e));
        }
        saveNamedQuery(t, e) {
            return this.zs.set(e.name, function(t) {
                return {
                    name: t.name,
                    query: Si(t.bundledQuery),
                    readTime: Zn(t.readTime)
                };
            }(e)), si.resolve();
        }
    }

    /**
     * @license
     * Copyright 2022 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An in-memory implementation of DocumentOverlayCache.
     */ class no {
        constructor() {
            // A map sorted by DocumentKey, whose value is a pair of the largest batch id
            // for the overlay and the overlay itself.
            this.overlays = new An(Nt.comparator), this.Hs = new Map;
        }
        getOverlay(t, e) {
            return si.resolve(this.overlays.get(e));
        }
        saveOverlays(t, e, n) {
            return n.forEach((n => {
                this.Yt(t, e, n);
            })), si.resolve();
        }
        removeOverlaysForBatchId(t, e, n) {
            const s = this.Hs.get(n);
            return void 0 !== s && (s.forEach((t => this.overlays = this.overlays.remove(t))), 
            this.Hs.delete(n)), si.resolve();
        }
        getOverlaysForCollection(t, e, n) {
            const s = new Map, i = e.length + 1, r = new Nt(e.child("")), o = this.overlays.getIteratorFrom(r);
            for (;o.hasNext(); ) {
                const t = o.getNext().value, r = t.getKey();
                if (!e.isPrefixOf(r.path)) break;
                // Documents from sub-collections
                            r.path.length === i && (t.largestBatchId > n && s.set(t.getKey(), t));
            }
            return si.resolve(s);
        }
        getOverlaysForCollectionGroup(t, e, n, s) {
            let i = new An(((t, e) => t - e));
            const r = this.overlays.getIterator();
            for (;r.hasNext(); ) {
                const t = r.getNext().value;
                if (t.getKey().getCollectionGroup() === e && t.largestBatchId > n) {
                    let e = i.get(t.largestBatchId);
                    null === e && (e = new Map, i = i.insert(t.largestBatchId, e)), e.set(t.getKey(), t);
                }
            }
            const o = new Map, c = i.getIterator();
            for (;c.hasNext(); ) {
                if (c.getNext().value.forEach(((t, e) => o.set(e, t))), o.size >= s) break;
            }
            return si.resolve(o);
        }
        Yt(t, e, n) {
            if (null === n) return;
            // Remove the association of the overlay to its batch id.
                    const s = this.overlays.get(n.key);
            null !== s && this.Hs.get(s.largestBatchId).delete(n.key), this.overlays = this.overlays.insert(n.key, new gi(e, n));
            // Create the association of this overlay to the given largestBatchId.
            let i = this.Hs.get(e);
            void 0 === i && (i = new Set, this.Hs.set(e, i)), i.add(n.key);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A collection of references to a document from some kind of numbered entity
     * (either a target ID or batch ID). As references are added to or removed from
     * the set corresponding events are emitted to a registered garbage collector.
     *
     * Each reference is represented by a DocumentReference object. Each of them
     * contains enough information to uniquely identify the reference. They are all
     * stored primarily in a set sorted by key. A document is considered garbage if
     * there's no references in that set (this can be efficiently checked thanks to
     * sorting by key).
     *
     * ReferenceSet also keeps a secondary set that contains references sorted by
     * IDs. This one is used to efficiently implement removal of all references by
     * some target ID.
     */ class so {
        constructor() {
            // A set of outstanding references to a document sorted by key.
            this.Js = new bn(io.Ys), 
            // A set of outstanding references to a document sorted by target id.
            this.Xs = new bn(io.Zs);
        }
        /** Returns true if the reference set contains no references. */    isEmpty() {
            return this.Js.isEmpty();
        }
        /** Adds a reference to the given document key for the given ID. */    addReference(t, e) {
            const n = new io(t, e);
            this.Js = this.Js.add(n), this.Xs = this.Xs.add(n);
        }
        /** Add references to the given document keys for the given ID. */    ti(t, e) {
            t.forEach((t => this.addReference(t, e)));
        }
        /**
         * Removes a reference to the given document key for the given
         * ID.
         */    removeReference(t, e) {
            this.ei(new io(t, e));
        }
        ni(t, e) {
            t.forEach((t => this.removeReference(t, e)));
        }
        /**
         * Clears all references with a given ID. Calls removeRef() for each key
         * removed.
         */    si(t) {
            const e = new Nt(new _t([])), n = new io(e, t), s = new io(e, t + 1), i = [];
            return this.Xs.forEachInRange([ n, s ], (t => {
                this.ei(t), i.push(t.key);
            })), i;
        }
        ii() {
            this.Js.forEach((t => this.ei(t)));
        }
        ei(t) {
            this.Js = this.Js.delete(t), this.Xs = this.Xs.delete(t);
        }
        ri(t) {
            const e = new Nt(new _t([])), n = new io(e, t), s = new io(e, t + 1);
            let i = On();
            return this.Xs.forEachInRange([ n, s ], (t => {
                i = i.add(t.key);
            })), i;
        }
        containsKey(t) {
            const e = new io(t, 0), n = this.Js.firstAfterOrEqual(e);
            return null !== n && t.isEqual(n.key);
        }
    }

    class io {
        constructor(t, e) {
            this.key = t, this.oi = e;
        }
        /** Compare by key then by ID */    static Ys(t, e) {
            return Nt.comparator(t.key, e.key) || rt(t.oi, e.oi);
        }
        /** Compare by ID then by key */    static Zs(t, e) {
            return rt(t.oi, e.oi) || Nt.comparator(t.key, e.key);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class ro {
        constructor(t, e) {
            this.indexManager = t, this.referenceDelegate = e, 
            /**
             * The set of all mutations that have been sent but not yet been applied to
             * the backend.
             */
            this.gs = [], 
            /** Next value to use when assigning sequential IDs to each mutation batch. */
            this.ci = 1, 
            /** An ordered mapping between documents and the mutations batch IDs. */
            this.ui = new bn(io.Ys);
        }
        checkEmpty(t) {
            return si.resolve(0 === this.gs.length);
        }
        addMutationBatch(t, e, n, s) {
            const i = this.ci;
            this.ci++, this.gs.length > 0 && this.gs[this.gs.length - 1];
            const r = new wi(i, e, n, s);
            this.gs.push(r);
            // Track references by document key and index collection parents.
            for (const e of s) this.ui = this.ui.add(new io(e.key, i)), this.indexManager.addToCollectionParentIndex(t, e.key.path.popLast());
            return si.resolve(r);
        }
        lookupMutationBatch(t, e) {
            return si.resolve(this.ai(e));
        }
        getNextMutationBatchAfterBatchId(t, e) {
            const n = e + 1, s = this.hi(n), i = s < 0 ? 0 : s;
            // The requested batchId may still be out of range so normalize it to the
            // start of the queue.
                    return si.resolve(this.gs.length > i ? this.gs[i] : null);
        }
        getHighestUnacknowledgedBatchId() {
            return si.resolve(0 === this.gs.length ? -1 : this.ci - 1);
        }
        getAllMutationBatches(t) {
            return si.resolve(this.gs.slice());
        }
        getAllMutationBatchesAffectingDocumentKey(t, e) {
            const n = new io(e, 0), s = new io(e, Number.POSITIVE_INFINITY), i = [];
            return this.ui.forEachInRange([ n, s ], (t => {
                const e = this.ai(t.oi);
                i.push(e);
            })), si.resolve(i);
        }
        getAllMutationBatchesAffectingDocumentKeys(t, e) {
            let n = new bn(rt);
            return e.forEach((t => {
                const e = new io(t, 0), s = new io(t, Number.POSITIVE_INFINITY);
                this.ui.forEachInRange([ e, s ], (t => {
                    n = n.add(t.oi);
                }));
            })), si.resolve(this.li(n));
        }
        getAllMutationBatchesAffectingQuery(t, e) {
            // Use the query path as a prefix for testing if a document matches the
            // query.
            const n = e.path, s = n.length + 1;
            // Construct a document reference for actually scanning the index. Unlike
            // the prefix the document key in this reference must have an even number of
            // segments. The empty segment can be used a suffix of the query path
            // because it precedes all other segments in an ordered traversal.
            let i = n;
            Nt.isDocumentKey(i) || (i = i.child(""));
            const r = new io(new Nt(i), 0);
            // Find unique batchIDs referenced by all documents potentially matching the
            // query.
                    let o = new bn(rt);
            return this.ui.forEachWhile((t => {
                const e = t.key.path;
                return !!n.isPrefixOf(e) && (
                // Rows with document keys more than one segment longer than the query
                // path can't be matches. For example, a query on 'rooms' can't match
                // the document /rooms/abc/messages/xyx.
                // TODO(mcg): we'll need a different scanner when we implement
                // ancestor queries.
                e.length === s && (o = o.add(t.oi)), !0);
            }), r), si.resolve(this.li(o));
        }
        li(t) {
            // Construct an array of matching batches, sorted by batchID to ensure that
            // multiple mutations affecting the same document key are applied in order.
            const e = [];
            return t.forEach((t => {
                const n = this.ai(t);
                null !== n && e.push(n);
            })), e;
        }
        removeMutationBatch(t, e) {
            U(0 === this.fi(e.batchId, "removed")), this.gs.shift();
            let n = this.ui;
            return si.forEach(e.mutations, (s => {
                const i = new io(s.key, e.batchId);
                return n = n.delete(i), this.referenceDelegate.markPotentiallyOrphaned(t, s.key);
            })).next((() => {
                this.ui = n;
            }));
        }
        Qe(t) {
            // No-op since the memory mutation queue does not maintain a separate cache.
        }
        containsKey(t, e) {
            const n = new io(e, 0), s = this.ui.firstAfterOrEqual(n);
            return si.resolve(e.isEqual(s && s.key));
        }
        performConsistencyCheck(t) {
            return this.gs.length, si.resolve();
        }
        /**
         * Finds the index of the given batchId in the mutation queue and asserts that
         * the resulting index is within the bounds of the queue.
         *
         * @param batchId - The batchId to search for
         * @param action - A description of what the caller is doing, phrased in passive
         * form (e.g. "acknowledged" in a routine that acknowledges batches).
         */    fi(t, e) {
            return this.hi(t);
        }
        /**
         * Finds the index of the given batchId in the mutation queue. This operation
         * is O(1).
         *
         * @returns The computed index of the batch with the given batchId, based on
         * the state of the queue. Note this index can be negative if the requested
         * batchId has already been remvoed from the queue or past the end of the
         * queue if the batchId is larger than the last added batch.
         */    hi(t) {
            if (0 === this.gs.length) 
            // As an index this is past the end of the queue
            return 0;
            // Examine the front of the queue to figure out the difference between the
            // batchId and indexes in the array. Note that since the queue is ordered
            // by batchId, if the first batch has a larger batchId then the requested
            // batchId doesn't exist in the queue.
                    return t - this.gs[0].batchId;
        }
        /**
         * A version of lookupMutationBatch that doesn't return a promise, this makes
         * other functions that uses this code easier to read and more efficent.
         */    ai(t) {
            const e = this.hi(t);
            if (e < 0 || e >= this.gs.length) return null;
            return this.gs[e];
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The memory-only RemoteDocumentCache for IndexedDb. To construct, invoke
     * `newMemoryRemoteDocumentCache()`.
     */
    class oo {
        /**
         * @param sizer - Used to assess the size of a document. For eager GC, this is
         * expected to just return 0 to avoid unnecessarily doing the work of
         * calculating the size.
         */
        constructor(t) {
            this.di = t, 
            /** Underlying cache of documents and their read times. */
            this.docs = new An(Nt.comparator), 
            /** Size of all cached documents. */
            this.size = 0;
        }
        setIndexManager(t) {
            this.indexManager = t;
        }
        /**
         * Adds the supplied entry to the cache and updates the cache size as appropriate.
         *
         * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
         * returned by `newChangeBuffer()`.
         */    addEntry(t, e) {
            const n = e.key, s = this.docs.get(n), i = s ? s.size : 0, r = this.di(e);
            return this.docs = this.docs.insert(n, {
                document: e.mutableCopy(),
                size: r
            }), this.size += r - i, this.indexManager.addToCollectionParentIndex(t, n.path.popLast());
        }
        /**
         * Removes the specified entry from the cache and updates the cache size as appropriate.
         *
         * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
         * returned by `newChangeBuffer()`.
         */    removeEntry(t) {
            const e = this.docs.get(t);
            e && (this.docs = this.docs.remove(t), this.size -= e.size);
        }
        getEntry(t, e) {
            const n = this.docs.get(e);
            return si.resolve(n ? n.document.mutableCopy() : Jt.newInvalidDocument(e));
        }
        getEntries(t, e) {
            let n = Dn();
            return e.forEach((t => {
                const e = this.docs.get(t);
                n = n.insert(t, e ? e.document.mutableCopy() : Jt.newInvalidDocument(t));
            })), si.resolve(n);
        }
        getAll(t, e, n) {
            let s = Dn();
            // Documents are ordered by key, so we can use a prefix scan to narrow down
            // the documents we need to match the query against.
                    const i = new Nt(e.child("")), r = this.docs.getIteratorFrom(i);
            for (;r.hasNext(); ) {
                const {key: t, value: {document: i}} = r.getNext();
                if (!e.isPrefixOf(t.path)) break;
                t.path.length > e.length + 1 || (i.readTime.compareTo(n) <= 0 || (s = s.insert(i.key, i.mutableCopy())));
            }
            return si.resolve(s);
        }
        _i(t, e) {
            return si.forEach(this.docs, (t => e(t)));
        }
        newChangeBuffer(t) {
            // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
            // a separate changelog and does not need special handling for removals.
            return new co(this);
        }
        getSize(t) {
            return si.resolve(this.size);
        }
    }

    /**
     * Creates a new memory-only RemoteDocumentCache.
     *
     * @param sizer - Used to assess the size of a document. For eager GC, this is
     * expected to just return 0 to avoid unnecessarily doing the work of
     * calculating the size.
     */
    /**
     * Handles the details of adding and updating documents in the MemoryRemoteDocumentCache.
     */
    class co extends Tr {
        constructor(t) {
            super(), this.Tn = t;
        }
        applyChanges(t) {
            const e = [];
            return this.changes.forEach(((n, s) => {
                s.isValidDocument() ? e.push(this.Tn.addEntry(t, s)) : this.Tn.removeEntry(n);
            })), si.waitFor(e);
        }
        getFromCache(t, e) {
            return this.Tn.getEntry(t, e);
        }
        getAllFromCache(t, e) {
            return this.Tn.getEntries(t, e);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class uo {
        constructor(t) {
            this.persistence = t, 
            /**
             * Maps a target to the data about that target
             */
            this.wi = new Er((t => se(t)), re), 
            /** The last received snapshot version. */
            this.lastRemoteSnapshotVersion = at.min(), 
            /** The highest numbered target ID encountered. */
            this.highestTargetId = 0, 
            /** The highest sequence number encountered. */
            this.mi = 0, 
            /**
             * A ordered bidirectional mapping between documents and the remote target
             * IDs.
             */
            this.gi = new so, this.targetCount = 0, this.yi = ar.He();
        }
        forEachTarget(t, e) {
            return this.wi.forEach(((t, n) => e(n))), si.resolve();
        }
        getLastRemoteSnapshotVersion(t) {
            return si.resolve(this.lastRemoteSnapshotVersion);
        }
        getHighestSequenceNumber(t) {
            return si.resolve(this.mi);
        }
        allocateTargetId(t) {
            return this.highestTargetId = this.yi.next(), si.resolve(this.highestTargetId);
        }
        setTargetsMetadata(t, e, n) {
            return n && (this.lastRemoteSnapshotVersion = n), e > this.mi && (this.mi = e), 
            si.resolve();
        }
        Ze(t) {
            this.wi.set(t.target, t);
            const e = t.targetId;
            e > this.highestTargetId && (this.yi = new ar(e), this.highestTargetId = e), t.sequenceNumber > this.mi && (this.mi = t.sequenceNumber);
        }
        addTargetData(t, e) {
            return this.Ze(e), this.targetCount += 1, si.resolve();
        }
        updateTargetData(t, e) {
            return this.Ze(e), si.resolve();
        }
        removeTargetData(t, e) {
            return this.wi.delete(e.target), this.gi.si(e.targetId), this.targetCount -= 1, 
            si.resolve();
        }
        removeTargets(t, e, n) {
            let s = 0;
            const i = [];
            return this.wi.forEach(((r, o) => {
                o.sequenceNumber <= e && null === n.get(o.targetId) && (this.wi.delete(r), i.push(this.removeMatchingKeysForTargetId(t, o.targetId)), 
                s++);
            })), si.waitFor(i).next((() => s));
        }
        getTargetCount(t) {
            return si.resolve(this.targetCount);
        }
        getTargetData(t, e) {
            const n = this.wi.get(e) || null;
            return si.resolve(n);
        }
        addMatchingKeys(t, e, n) {
            return this.gi.ti(e, n), si.resolve();
        }
        removeMatchingKeys(t, e, n) {
            this.gi.ni(e, n);
            const s = this.persistence.referenceDelegate, i = [];
            return s && e.forEach((e => {
                i.push(s.markPotentiallyOrphaned(t, e));
            })), si.waitFor(i);
        }
        removeMatchingKeysForTargetId(t, e) {
            return this.gi.si(e), si.resolve();
        }
        getMatchingKeysForTargetId(t, e) {
            const n = this.gi.ri(e);
            return si.resolve(n);
        }
        containsKey(t, e) {
            return si.resolve(this.gi.containsKey(e));
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A memory-backed instance of Persistence. Data is stored only in RAM and
     * not persisted across sessions.
     */
    class ao {
        /**
         * The constructor accepts a factory for creating a reference delegate. This
         * allows both the delegate and this instance to have strong references to
         * each other without having nullable fields that would then need to be
         * checked or asserted on every access.
         */
        constructor(t, e) {
            this.pi = {}, this.overlays = {}, this.Nn = new nt(0), this.xn = !1, this.xn = !0, 
            this.referenceDelegate = t(this), this.Un = new uo(this);
            this.indexManager = new Wi, this.qn = function(t) {
                return new oo(t);
            }((t => this.referenceDelegate.Ii(t))), this.O = new pi(e), this.Kn = new eo(this.O);
        }
        start() {
            return Promise.resolve();
        }
        shutdown() {
            // No durable state to ensure is closed on shutdown.
            return this.xn = !1, Promise.resolve();
        }
        get started() {
            return this.xn;
        }
        setDatabaseDeletedListener() {
            // No op.
        }
        setNetworkEnabled() {
            // No op.
        }
        getIndexManager(t) {
            // We do not currently support indices for memory persistence, so we can
            // return the same shared instance of the memory index manager.
            return this.indexManager;
        }
        getDocumentOverlayCache(t) {
            let e = this.overlays[t.toKey()];
            return e || (e = new no, this.overlays[t.toKey()] = e), e;
        }
        getMutationQueue(t, e) {
            let n = this.pi[t.toKey()];
            return n || (n = new ro(e, this.referenceDelegate), this.pi[t.toKey()] = n), n;
        }
        getTargetCache() {
            return this.Un;
        }
        getRemoteDocumentCache() {
            return this.qn;
        }
        getBundleCache() {
            return this.Kn;
        }
        runTransaction(t, e, n) {
            M("MemoryPersistence", "Starting transaction:", t);
            const s = new ho(this.Nn.next());
            return this.referenceDelegate.Ei(), n(s).next((t => this.referenceDelegate.Ti(s).next((() => t)))).toPromise().then((t => (s.raiseOnCommittedEvent(), 
            t)));
        }
        Ai(t, e) {
            return si.or(Object.values(this.pi).map((n => () => n.containsKey(t, e))));
        }
    }

    /**
     * Memory persistence is not actually transactional, but future implementations
     * may have transaction-scoped state.
     */ class ho extends ni {
        constructor(t) {
            super(), this.currentSequenceNumber = t;
        }
    }

    class lo {
        constructor(t) {
            this.persistence = t, 
            /** Tracks all documents that are active in Query views. */
            this.Ri = new so, 
            /** The list of documents that are potentially GCed after each transaction. */
            this.Pi = null;
        }
        static bi(t) {
            return new lo(t);
        }
        get vi() {
            if (this.Pi) return this.Pi;
            throw L();
        }
        addReference(t, e, n) {
            return this.Ri.addReference(n, e), this.vi.delete(n.toString()), si.resolve();
        }
        removeReference(t, e, n) {
            return this.Ri.removeReference(n, e), this.vi.add(n.toString()), si.resolve();
        }
        markPotentiallyOrphaned(t, e) {
            return this.vi.add(e.toString()), si.resolve();
        }
        removeTarget(t, e) {
            this.Ri.si(e.targetId).forEach((t => this.vi.add(t.toString())));
            const n = this.persistence.getTargetCache();
            return n.getMatchingKeysForTargetId(t, e.targetId).next((t => {
                t.forEach((t => this.vi.add(t.toString())));
            })).next((() => n.removeTargetData(t, e)));
        }
        Ei() {
            this.Pi = new Set;
        }
        Ti(t) {
            // Remove newly orphaned documents.
            const e = this.persistence.getRemoteDocumentCache().newChangeBuffer();
            return si.forEach(this.vi, (n => {
                const s = Nt.fromPath(n);
                return this.Vi(t, s).next((t => {
                    t || e.removeEntry(s, at.min());
                }));
            })).next((() => (this.Pi = null, e.apply(t))));
        }
        updateLimboDocument(t, e) {
            return this.Vi(t, e).next((t => {
                t ? this.vi.delete(e.toString()) : this.vi.add(e.toString());
            }));
        }
        Ii(t) {
            // For eager GC, we don't care about the document size, there are no size thresholds.
            return 0;
        }
        Vi(t, e) {
            return si.or([ () => si.resolve(this.Ri.containsKey(e)), () => this.persistence.getTargetCache().containsKey(t, e), () => this.persistence.Ai(t, e) ]);
        }
    }

    /**
     * Metadata state of the local client. Unlike `RemoteClientState`, this class is
     * mutable and keeps track of all pending mutations, which allows us to
     * update the range of pending mutation batch IDs as new mutations are added or
     * removed.
     *
     * The data in `LocalClientState` is not read from WebStorage and instead
     * updated via its instance methods. The updated state can be serialized via
     * `toWebStorageJSON()`.
     */
    // Visible for testing.
    class Io {
        constructor() {
            this.activeTargetIds = $n();
        }
        Ci(t) {
            this.activeTargetIds = this.activeTargetIds.add(t);
        }
        Ni(t) {
            this.activeTargetIds = this.activeTargetIds.delete(t);
        }
        /**
         * Converts this entry into a JSON-encoded format we can use for WebStorage.
         * Does not encode `clientId` as it is part of the key in WebStorage.
         */    Di() {
            const t = {
                activeTargetIds: this.activeTargetIds.toArray(),
                updateTimeMs: Date.now()
            };
            return JSON.stringify(t);
        }
    }

    class To {
        constructor() {
            this._r = new Io, this.wr = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
        }
        addPendingMutation(t) {
            // No op.
        }
        updateMutationState(t, e, n) {
            // No op.
        }
        addLocalQueryTarget(t) {
            return this._r.Ci(t), this.wr[t] || "not-current";
        }
        updateQueryState(t, e, n) {
            this.wr[t] = e;
        }
        removeLocalQueryTarget(t) {
            this._r.Ni(t);
        }
        isLocalQueryTarget(t) {
            return this._r.activeTargetIds.has(t);
        }
        clearQueryState(t) {
            delete this.wr[t];
        }
        getAllActiveQueryTargets() {
            return this._r.activeTargetIds;
        }
        isActiveQueryTarget(t) {
            return this._r.activeTargetIds.has(t);
        }
        start() {
            return this._r = new Io, Promise.resolve();
        }
        handleUserChange(t, e, n) {
            // No op.
        }
        setOnlineState(t) {
            // No op.
        }
        shutdown() {}
        writeSequenceNumber(t) {}
        notifyBundleLoaded() {
            // No op.
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Ao {
        mr(t) {
            // No-op.
        }
        shutdown() {
            // No-op.
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // References to `window` are guarded by BrowserConnectivityMonitor.isAvailable()
    /* eslint-disable no-restricted-globals */
    /**
     * Browser implementation of ConnectivityMonitor.
     */
    class Ro {
        constructor() {
            this.gr = () => this.yr(), this.pr = () => this.Ir(), this.Er = [], this.Tr();
        }
        mr(t) {
            this.Er.push(t);
        }
        shutdown() {
            window.removeEventListener("online", this.gr), window.removeEventListener("offline", this.pr);
        }
        Tr() {
            window.addEventListener("online", this.gr), window.addEventListener("offline", this.pr);
        }
        yr() {
            M("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
            for (const t of this.Er) t(0 /* AVAILABLE */);
        }
        Ir() {
            M("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
            for (const t of this.Er) t(1 /* UNAVAILABLE */);
        }
        // TODO(chenbrian): Consider passing in window either into this component or
        // here for testing via FakeWindow.
        /** Checks that all used attributes of window are available. */
        static Vt() {
            return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const Po = {
        BatchGetDocuments: "batchGet",
        Commit: "commit",
        RunQuery: "runQuery"
    };

    /**
     * Maps RPC names to the corresponding REST endpoint name.
     *
     * We use array notation to avoid mangling.
     */
    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provides a simple helper class that implements the Stream interface to
     * bridge to other implementations that are streams but do not implement the
     * interface. The stream callbacks are invoked with the callOn... methods.
     */
    class bo {
        constructor(t) {
            this.Ar = t.Ar, this.Rr = t.Rr;
        }
        Pr(t) {
            this.br = t;
        }
        vr(t) {
            this.Vr = t;
        }
        onMessage(t) {
            this.Sr = t;
        }
        close() {
            this.Rr();
        }
        send(t) {
            this.Ar(t);
        }
        Dr() {
            this.br();
        }
        Cr(t) {
            this.Vr(t);
        }
        Nr(t) {
            this.Sr(t);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class vo extends 
    /**
     * Base class for all Rest-based connections to the backend (WebChannel and
     * HTTP).
     */
    class {
        constructor(t) {
            this.databaseInfo = t, this.databaseId = t.databaseId;
            const e = t.ssl ? "https" : "http";
            this.kr = e + "://" + t.host, this.Or = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents";
        }
        Mr(t, e, n, s, i) {
            const r = this.$r(t, e);
            M("RestConnection", "Sending: ", r, n);
            const o = {};
            return this.Fr(o, s, i), this.Br(t, r, o, n).then((t => (M("RestConnection", "Received: ", t), 
            t)), (e => {
                throw F("RestConnection", `${t} failed with error: `, e, "url: ", r, "request:", n), 
                e;
            }));
        }
        Lr(t, e, n, s, i) {
            // The REST API automatically aggregates all of the streamed results, so we
            // can just use the normal invoke() method.
            return this.Mr(t, e, n, s, i);
        }
        /**
         * Modifies the headers for a request, adding any authorization token if
         * present and any additional headers for the request.
         */    Fr(t, e, n) {
            t["X-Goog-Api-Client"] = "gl-js/ fire/" + N, 
            // Content-Type: text/plain will avoid preflight requests which might
            // mess with CORS and redirects by proxies. If we add custom headers
            // we will need to change this code to potentially use the $httpOverwrite
            // parameter supported by ESF to avoid triggering preflight requests.
            t["Content-Type"] = "text/plain", this.databaseInfo.appId && (t["X-Firebase-GMPID"] = this.databaseInfo.appId), 
            e && e.headers.forEach(((e, n) => t[n] = e)), n && n.headers.forEach(((e, n) => t[n] = e));
        }
        $r(t, e) {
            const n = Po[t];
            return `${this.kr}/v1/${e}:${n}`;
        }
    } {
        constructor(t) {
            super(t), this.forceLongPolling = t.forceLongPolling, this.autoDetectLongPolling = t.autoDetectLongPolling, 
            this.useFetchStreams = t.useFetchStreams;
        }
        Br(t, e, n, s) {
            return new Promise(((i, r) => {
                const o = new XhrIo;
                o.listenOnce(EventType.COMPLETE, (() => {
                    try {
                        switch (o.getLastErrorCode()) {
                          case ErrorCode.NO_ERROR:
                            const e = o.getResponseJson();
                            M("Connection", "XHR received:", JSON.stringify(e)), i(e);
                            break;

                          case ErrorCode.TIMEOUT:
                            M("Connection", 'RPC "' + t + '" timed out'), r(new j(G.DEADLINE_EXCEEDED, "Request time out"));
                            break;

                          case ErrorCode.HTTP_ERROR:
                            const n = o.getStatus();
                            if (M("Connection", 'RPC "' + t + '" failed with status:', n, "response text:", o.getResponseText()), 
                            n > 0) {
                                const t = o.getResponseJson().error;
                                if (t && t.status && t.message) {
                                    const e = function(t) {
                                        const e = t.toLowerCase().replace(/_/g, "-");
                                        return Object.values(G).indexOf(e) >= 0 ? e : G.UNKNOWN;
                                    }(t.status);
                                    r(new j(e, t.message));
                                } else r(new j(G.UNKNOWN, "Server responded with status " + o.getStatus()));
                            } else 
                            // If we received an HTTP_ERROR but there's no status code,
                            // it's most probably a connection issue
                            r(new j(G.UNAVAILABLE, "Connection failed."));
                            break;

                          default:
                            L();
                        }
                    } finally {
                        M("Connection", 'RPC "' + t + '" completed.');
                    }
                }));
                const c = JSON.stringify(s);
                o.send(e, "POST", c, n, 15);
            }));
        }
        Ur(t, e, n) {
            const s = [ this.kr, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], i = createWebChannelTransport(), r = getStatEventTarget(), o = {
                // Required for backend stickiness, routing behavior is based on this
                // parameter.
                httpSessionIdParam: "gsessionid",
                initMessageHeaders: {},
                messageUrlParams: {
                    // This param is used to improve routing and project isolation by the
                    // backend and must be included in every request.
                    database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
                },
                sendRawJson: !0,
                supportsCrossDomainXhr: !0,
                internalChannelParams: {
                    // Override the default timeout (randomized between 10-20 seconds) since
                    // a large write batch on a slow internet connection may take a long
                    // time to send to the backend. Rather than have WebChannel impose a
                    // tight timeout which could lead to infinite timeouts and retries, we
                    // set it very large (5-10 minutes) and rely on the browser's builtin
                    // timeouts to kick in if the request isn't working.
                    forwardChannelRequestTimeoutMs: 6e5
                },
                forceLongPolling: this.forceLongPolling,
                detectBufferingProxy: this.autoDetectLongPolling
            };
            this.useFetchStreams && (o.xmlHttpFactory = new FetchXmlHttpFactory({})), this.Fr(o.initMessageHeaders, e, n), 
            // Sending the custom headers we just added to request.initMessageHeaders
            // (Authorization, etc.) will trigger the browser to make a CORS preflight
            // request because the XHR will no longer meet the criteria for a "simple"
            // CORS request:
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
            // Therefore to avoid the CORS preflight request (an extra network
            // roundtrip), we use the httpHeadersOverwriteParam option to specify that
            // the headers should instead be encoded into a special "$httpHeaders" query
            // parameter, which is recognized by the webchannel backend. This is
            // formally defined here:
            // https://github.com/google/closure-library/blob/b0e1815b13fb92a46d7c9b3c30de5d6a396a3245/closure/goog/net/rpc/httpcors.js#L32
            // TODO(b/145624756): There is a backend bug where $httpHeaders isn't respected if the request
            // doesn't have an Origin header. So we have to exclude a few browser environments that are
            // known to (sometimes) not include an Origin. See
            // https://github.com/firebase/firebase-js-sdk/issues/1491.
            isMobileCordova() || isReactNative() || isElectron() || isIE() || isUWP() || isBrowserExtension() || (o.httpHeadersOverwriteParam = "$httpHeaders");
            const c = s.join("");
            M("Connection", "Creating WebChannel: " + c, o);
            const u = i.createWebChannel(c, o);
            // WebChannel supports sending the first message with the handshake - saving
            // a network round trip. However, it will have to call send in the same
            // JS event loop as open. In order to enforce this, we delay actually
            // opening the WebChannel until send is called. Whether we have called
            // open is tracked with this variable.
                    let a = !1, h = !1;
            // A flag to determine whether the stream was closed (by us or through an
            // error/close event) to avoid delivering multiple close events or sending
            // on a closed stream
                    const l = new bo({
                Ar: t => {
                    h ? M("Connection", "Not sending because WebChannel is closed:", t) : (a || (M("Connection", "Opening WebChannel transport."), 
                    u.open(), a = !0), M("Connection", "WebChannel sending:", t), u.send(t));
                },
                Rr: () => u.close()
            }), y = (t, e, n) => {
                // TODO(dimond): closure typing seems broken because WebChannel does
                // not implement goog.events.Listenable
                t.listen(e, (t => {
                    try {
                        n(t);
                    } catch (t) {
                        setTimeout((() => {
                            throw t;
                        }), 0);
                    }
                }));
            };
            // Closure events are guarded and exceptions are swallowed, so catch any
            // exception and rethrow using a setTimeout so they become visible again.
            // Note that eventually this function could go away if we are confident
            // enough the code is exception free.
                    return y(u, WebChannel.EventType.OPEN, (() => {
                h || M("Connection", "WebChannel transport opened.");
            })), y(u, WebChannel.EventType.CLOSE, (() => {
                h || (h = !0, M("Connection", "WebChannel transport closed"), l.Cr());
            })), y(u, WebChannel.EventType.ERROR, (t => {
                h || (h = !0, F("Connection", "WebChannel transport errored:", t), l.Cr(new j(G.UNAVAILABLE, "The operation could not be completed")));
            })), y(u, WebChannel.EventType.MESSAGE, (t => {
                var e;
                if (!h) {
                    const n = t.data[0];
                    U(!!n);
                    // TODO(b/35143891): There is a bug in One Platform that caused errors
                    // (and only errors) to be wrapped in an extra array. To be forward
                    // compatible with the bug we need to check either condition. The latter
                    // can be removed once the fix has been rolled out.
                    // Use any because msgData.error is not typed.
                    const s = n, i = s.error || (null === (e = s[0]) || void 0 === e ? void 0 : e.error);
                    if (i) {
                        M("Connection", "WebChannel received error:", i);
                        // error.status will be a string like 'OK' or 'NOT_FOUND'.
                        const t = i.status;
                        let e = 
                        /**
     * Maps an error Code from a GRPC status identifier like 'NOT_FOUND'.
     *
     * @returns The Code equivalent to the given status string or undefined if
     *     there is no match.
     */
                        function(t) {
                            // lookup by string
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const e = pn[t];
                            if (void 0 !== e) return Tn(e);
                        }(t), n = i.message;
                        void 0 === e && (e = G.INTERNAL, n = "Unknown error status: " + t + " with message " + i.message), 
                        // Mark closed so no further events are propagated
                        h = !0, l.Cr(new j(e, n)), u.close();
                    } else M("Connection", "WebChannel received:", n), l.Nr(n);
                }
            })), y(r, Event.STAT_EVENT, (t => {
                t.stat === Stat.PROXY ? M("Connection", "Detected buffering proxy") : t.stat === Stat.NOPROXY && M("Connection", "Detected no buffering proxy");
            })), setTimeout((() => {
                // Technically we could/should wait for the WebChannel opened event,
                // but because we want to send the first message with the WebChannel
                // handshake we pretend the channel opened here (asynchronously), and
                // then delay the actual open until the first message is sent.
                l.Dr();
            }), 0), l;
        }
    }

    /** The Platform's 'document' implementation or null if not available. */ function So() {
        // `document` is not always available, e.g. in ReactNative and WebWorkers.
        // eslint-disable-next-line no-restricted-globals
        return "undefined" != typeof document ? document : null;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ function Do(t) {
        return new Hn(t, /* useProto3Json= */ !0);
    }

    /**
     * An instance of the Platform's 'TextEncoder' implementation.
     */
    /**
     * A helper for running delayed tasks following an exponential backoff curve
     * between attempts.
     *
     * Each delay is made up of a "base" delay which follows the exponential
     * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
     * base delay. This prevents clients from accidentally synchronizing their
     * delays causing spikes of load to the backend.
     */
    class Co {
        constructor(
        /**
         * The AsyncQueue to run backoff operations on.
         */
        t, 
        /**
         * The ID to use when scheduling backoff operations on the AsyncQueue.
         */
        e, 
        /**
         * The initial delay (used as the base delay on the first retry attempt).
         * Note that jitter will still be applied, so the actual delay could be as
         * little as 0.5*initialDelayMs.
         */
        n = 1e3
        /**
         * The multiplier to use to determine the extended base delay after each
         * attempt.
         */ , s = 1.5
        /**
         * The maximum base delay after which no further backoff is performed.
         * Note that jitter will still be applied, so the actual delay could be as
         * much as 1.5*maxDelayMs.
         */ , i = 6e4) {
            this.Sn = t, this.timerId = e, this.qr = n, this.Kr = s, this.Gr = i, this.jr = 0, 
            this.Qr = null, 
            /** The last backoff attempt, as epoch milliseconds. */
            this.Wr = Date.now(), this.reset();
        }
        /**
         * Resets the backoff delay.
         *
         * The very next backoffAndWait() will have no delay. If it is called again
         * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
         * subsequent ones will increase according to the backoffFactor.
         */    reset() {
            this.jr = 0;
        }
        /**
         * Resets the backoff delay to the maximum delay (e.g. for use after a
         * RESOURCE_EXHAUSTED error).
         */    zr() {
            this.jr = this.Gr;
        }
        /**
         * Returns a promise that resolves after currentDelayMs, and increases the
         * delay for any subsequent attempts. If there was a pending backoff operation
         * already, it will be canceled.
         */    Hr(t) {
            // Cancel any pending backoff operation.
            this.cancel();
            // First schedule using the current base (which may be 0 and should be
            // honored as such).
            const e = Math.floor(this.jr + this.Jr()), n = Math.max(0, Date.now() - this.Wr), s = Math.max(0, e - n);
            // Guard against lastAttemptTime being in the future due to a clock change.
                    s > 0 && M("ExponentialBackoff", `Backing off for ${s} ms (base delay: ${this.jr} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`), 
            this.Qr = this.Sn.enqueueAfterDelay(this.timerId, s, (() => (this.Wr = Date.now(), 
            t()))), 
            // Apply backoff factor to determine next delay and ensure it is within
            // bounds.
            this.jr *= this.Kr, this.jr < this.qr && (this.jr = this.qr), this.jr > this.Gr && (this.jr = this.Gr);
        }
        Yr() {
            null !== this.Qr && (this.Qr.skipDelay(), this.Qr = null);
        }
        cancel() {
            null !== this.Qr && (this.Qr.cancel(), this.Qr = null);
        }
        /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */    Jr() {
            return (Math.random() - .5) * this.jr;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A PersistentStream is an abstract base class that represents a streaming RPC
     * to the Firestore backend. It's built on top of the connections own support
     * for streaming RPCs, and adds several critical features for our clients:
     *
     *   - Exponential backoff on failure
     *   - Authentication via CredentialsProvider
     *   - Dispatching all callbacks into the shared worker queue
     *   - Closing idle streams after 60 seconds of inactivity
     *
     * Subclasses of PersistentStream implement serialization of models to and
     * from the JSON representation of the protocol buffers for a specific
     * streaming RPC.
     *
     * ## Starting and Stopping
     *
     * Streaming RPCs are stateful and need to be start()ed before messages can
     * be sent and received. The PersistentStream will call the onOpen() function
     * of the listener once the stream is ready to accept requests.
     *
     * Should a start() fail, PersistentStream will call the registered onClose()
     * listener with a FirestoreError indicating what went wrong.
     *
     * A PersistentStream can be started and stopped repeatedly.
     *
     * Generic types:
     *  SendType: The type of the outgoing message of the underlying
     *    connection stream
     *  ReceiveType: The type of the incoming message of the underlying
     *    connection stream
     *  ListenerType: The type of the listener that will be used for callbacks
     */
    class No {
        constructor(t, e, n, s, i, r, o, c) {
            this.Sn = t, this.Xr = n, this.Zr = s, this.eo = i, this.authCredentialsProvider = r, 
            this.appCheckCredentialsProvider = o, this.listener = c, this.state = 0 /* Initial */ , 
            /**
             * A close count that's incremented every time the stream is closed; used by
             * getCloseGuardedDispatcher() to invalidate callbacks that happen after
             * close.
             */
            this.no = 0, this.so = null, this.io = null, this.stream = null, this.ro = new Co(t, e);
        }
        /**
         * Returns true if start() has been called and no error has occurred. True
         * indicates the stream is open or in the process of opening (which
         * encompasses respecting backoff, getting auth tokens, and starting the
         * actual RPC). Use isOpen() to determine if the stream is open and ready for
         * outbound requests.
         */    oo() {
            return 1 /* Starting */ === this.state || 5 /* Backoff */ === this.state || this.co();
        }
        /**
         * Returns true if the underlying RPC is open (the onOpen() listener has been
         * called) and the stream is ready for outbound requests.
         */    co() {
            return 2 /* Open */ === this.state || 3 /* Healthy */ === this.state;
        }
        /**
         * Starts the RPC. Only allowed if isStarted() returns false. The stream is
         * not immediately ready for use: onOpen() will be invoked when the RPC is
         * ready for outbound requests, at which point isOpen() will return true.
         *
         * When start returns, isStarted() will return true.
         */    start() {
            4 /* Error */ !== this.state ? this.auth() : this.uo();
        }
        /**
         * Stops the RPC. This call is idempotent and allowed regardless of the
         * current isStarted() state.
         *
         * When stop returns, isStarted() and isOpen() will both return false.
         */    async stop() {
            this.oo() && await this.close(0 /* Initial */);
        }
        /**
         * After an error the stream will usually back off on the next attempt to
         * start it. If the error warrants an immediate restart of the stream, the
         * sender can use this to indicate that the receiver should not back off.
         *
         * Each error will call the onClose() listener. That function can decide to
         * inhibit backoff if required.
         */    ao() {
            this.state = 0 /* Initial */ , this.ro.reset();
        }
        /**
         * Marks this stream as idle. If no further actions are performed on the
         * stream for one minute, the stream will automatically close itself and
         * notify the stream's onClose() handler with Status.OK. The stream will then
         * be in a !isStarted() state, requiring the caller to start the stream again
         * before further use.
         *
         * Only streams that are in state 'Open' can be marked idle, as all other
         * states imply pending network operations.
         */    ho() {
            // Starts the idle time if we are in state 'Open' and are not yet already
            // running a timer (in which case the previous idle timeout still applies).
            this.co() && null === this.so && (this.so = this.Sn.enqueueAfterDelay(this.Xr, 6e4, (() => this.lo())));
        }
        /** Sends a message to the underlying stream. */    fo(t) {
            this._o(), this.stream.send(t);
        }
        /** Called by the idle timer when the stream should close due to inactivity. */    async lo() {
            if (this.co()) 
            // When timing out an idle stream there's no reason to force the stream into backoff when
            // it restarts so set the stream state to Initial instead of Error.
            return this.close(0 /* Initial */);
        }
        /** Marks the stream as active again. */    _o() {
            this.so && (this.so.cancel(), this.so = null);
        }
        /** Cancels the health check delayed operation. */    wo() {
            this.io && (this.io.cancel(), this.io = null);
        }
        /**
         * Closes the stream and cleans up as necessary:
         *
         * * closes the underlying GRPC stream;
         * * calls the onClose handler with the given 'error';
         * * sets internal stream state to 'finalState';
         * * adjusts the backoff timer based on the error
         *
         * A new stream can be opened by calling start().
         *
         * @param finalState - the intended state of the stream after closing.
         * @param error - the error the connection was closed with.
         */    async close(t, e) {
            // Cancel any outstanding timers (they're guaranteed not to execute).
            this._o(), this.wo(), this.ro.cancel(), 
            // Invalidates any stream-related callbacks (e.g. from auth or the
            // underlying stream), guaranteeing they won't execute.
            this.no++, 4 /* Error */ !== t ? 
            // If this is an intentional close ensure we don't delay our next connection attempt.
            this.ro.reset() : e && e.code === G.RESOURCE_EXHAUSTED ? (
            // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
            $(e.toString()), $("Using maximum backoff delay to prevent overloading the backend."), 
            this.ro.zr()) : e && e.code === G.UNAUTHENTICATED && 3 /* Healthy */ !== this.state && (
            // "unauthenticated" error means the token was rejected. This should rarely
            // happen since both Auth and AppCheck ensure a sufficient TTL when we
            // request a token. If a user manually resets their system clock this can
            // fail, however. In this case, we should get a Code.UNAUTHENTICATED error
            // before we received the first message and we need to invalidate the token
            // to ensure that we fetch a new token.
            this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), 
            // Clean up the underlying stream because we are no longer interested in events.
            null !== this.stream && (this.mo(), this.stream.close(), this.stream = null), 
            // This state must be assigned before calling onClose() to allow the callback to
            // inhibit backoff or otherwise manipulate the state in its non-started state.
            this.state = t, 
            // Notify the listener that the stream closed.
            await this.listener.vr(e);
        }
        /**
         * Can be overridden to perform additional cleanup before the stream is closed.
         * Calling super.tearDown() is not required.
         */    mo() {}
        auth() {
            this.state = 1 /* Starting */;
            const t = this.yo(this.no), e = this.no;
            // TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
                    Promise.all([ this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken() ]).then((([t, n]) => {
                // Stream can be stopped while waiting for authentication.
                // TODO(mikelehen): We really should just use dispatchIfNotClosed
                // and let this dispatch onto the queue, but that opened a spec test can
                // of worms that I don't want to deal with in this PR.
                this.no === e && 
                // Normally we'd have to schedule the callback on the AsyncQueue.
                // However, the following calls are safe to be called outside the
                // AsyncQueue since they don't chain asynchronous calls
                this.po(t, n);
            }), (e => {
                t((() => {
                    const t = new j(G.UNKNOWN, "Fetching auth token failed: " + e.message);
                    return this.Io(t);
                }));
            }));
        }
        po(t, e) {
            const n = this.yo(this.no);
            this.stream = this.Eo(t, e), this.stream.Pr((() => {
                n((() => (this.state = 2 /* Open */ , this.io = this.Sn.enqueueAfterDelay(this.Zr, 1e4, (() => (this.co() && (this.state = 3 /* Healthy */), 
                Promise.resolve()))), this.listener.Pr())));
            })), this.stream.vr((t => {
                n((() => this.Io(t)));
            })), this.stream.onMessage((t => {
                n((() => this.onMessage(t)));
            }));
        }
        uo() {
            this.state = 5 /* Backoff */ , this.ro.Hr((async () => {
                this.state = 0 /* Initial */ , this.start();
            }));
        }
        // Visible for tests
        Io(t) {
            // In theory the stream could close cleanly, however, in our current model
            // we never expect this to happen because if we stop a stream ourselves,
            // this callback will never be called. To prevent cases where we retry
            // without a backoff accidentally, we set the stream to error in all cases.
            return M("PersistentStream", `close with error: ${t}`), this.stream = null, this.close(4 /* Error */ , t);
        }
        /**
         * Returns a "dispatcher" function that dispatches operations onto the
         * AsyncQueue but only runs them if closeCount remains unchanged. This allows
         * us to turn auth / stream callbacks into no-ops if the stream is closed /
         * re-opened, etc.
         */    yo(t) {
            return e => {
                this.Sn.enqueueAndForget((() => this.no === t ? e() : (M("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
                Promise.resolve())));
            };
        }
    }

    /**
     * A PersistentStream that implements the Listen RPC.
     *
     * Once the Listen stream has called the onOpen() listener, any number of
     * listen() and unlisten() calls can be made to control what changes will be
     * sent from the server for ListenResponses.
     */ class xo extends No {
        constructor(t, e, n, s, i, r) {
            super(t, "listen_stream_connection_backoff" /* ListenStreamConnectionBackoff */ , "listen_stream_idle" /* ListenStreamIdle */ , "health_check_timeout" /* HealthCheckTimeout */ , e, n, s, r), 
            this.O = i;
        }
        Eo(t, e) {
            return this.eo.Ur("Listen", t, e);
        }
        onMessage(t) {
            // A successful response means the stream is healthy
            this.ro.reset();
            const e = ls(this.O, t), n = function(t) {
                // We have only reached a consistent snapshot for the entire stream if there
                // is a read_time set and it applies to all targets (i.e. the list of
                // targets is empty). The backend is guaranteed to send such responses.
                if (!("targetChange" in t)) return at.min();
                const e = t.targetChange;
                return e.targetIds && e.targetIds.length ? at.min() : e.readTime ? Zn(e.readTime) : at.min();
            }(t);
            return this.listener.To(e, n);
        }
        /**
         * Registers interest in the results of the given target. If the target
         * includes a resumeToken it will be included in the request. Results that
         * affect the target will be streamed back as WatchChange messages that
         * reference the targetId.
         */    Ao(t) {
            const e = {};
            e.database = os(this.O), e.addTarget = function(t, e) {
                let n;
                const s = e.target;
                return n = oe(s) ? {
                    documents: ws(t, s)
                } : {
                    query: ms(t, s)
                }, n.targetId = e.targetId, e.resumeToken.approximateByteSize() > 0 ? n.resumeToken = Yn(t, e.resumeToken) : e.snapshotVersion.compareTo(at.min()) > 0 && (
                // TODO(wuandy): Consider removing above check because it is most likely true.
                // Right now, many tests depend on this behaviour though (leaving min() out
                // of serialization).
                n.readTime = Jn(t, e.snapshotVersion.toTimestamp())), n;
            }(this.O, t);
            const n = ys(this.O, t);
            n && (e.labels = n), this.fo(e);
        }
        /**
         * Unregisters interest in the results of the target associated with the
         * given targetId.
         */    Ro(t) {
            const e = {};
            e.database = os(this.O), e.removeTarget = t, this.fo(e);
        }
    }

    /**
     * A Stream that implements the Write RPC.
     *
     * The Write RPC requires the caller to maintain special streamToken
     * state in between calls, to help the server understand which responses the
     * client has processed by the time the next request is made. Every response
     * will contain a streamToken; this value must be passed to the next
     * request.
     *
     * After calling start() on this stream, the next request must be a handshake,
     * containing whatever streamToken is on hand. Once a response to this
     * request is received, all pending mutations may be submitted. When
     * submitting multiple batches of mutations at the same time, it's
     * okay to use the same streamToken for the calls to writeMutations.
     *
     * TODO(b/33271235): Use proto types
     */ class ko extends No {
        constructor(t, e, n, s, i, r) {
            super(t, "write_stream_connection_backoff" /* WriteStreamConnectionBackoff */ , "write_stream_idle" /* WriteStreamIdle */ , "health_check_timeout" /* HealthCheckTimeout */ , e, n, s, r), 
            this.O = i, this.Po = !1;
        }
        /**
         * Tracks whether or not a handshake has been successfully exchanged and
         * the stream is ready to accept mutations.
         */    get bo() {
            return this.Po;
        }
        // Override of PersistentStream.start
        start() {
            this.Po = !1, this.lastStreamToken = void 0, super.start();
        }
        mo() {
            this.Po && this.vo([]);
        }
        Eo(t, e) {
            return this.eo.Ur("Write", t, e);
        }
        onMessage(t) {
            if (
            // Always capture the last stream token.
            U(!!t.streamToken), this.lastStreamToken = t.streamToken, this.Po) {
                // A successful first write response means the stream is healthy,
                // Note, that we could consider a successful handshake healthy, however,
                // the write itself might be causing an error we want to back off from.
                this.ro.reset();
                const e = _s(t.writeResults, t.commitTime), n = Zn(t.commitTime);
                return this.listener.Vo(n, e);
            }
            // The first response is always the handshake response
            return U(!t.writeResults || 0 === t.writeResults.length), this.Po = !0, this.listener.So();
        }
        /**
         * Sends an initial streamToken to the server, performing the handshake
         * required to make the StreamingWrite RPC work. Subsequent
         * calls should wait until onHandshakeComplete was called.
         */    Do() {
            // TODO(dimond): Support stream resumption. We intentionally do not set the
            // stream token on the handshake, ignoring any stream token we might have.
            const t = {};
            t.database = os(this.O), this.fo(t);
        }
        /** Sends a group of mutations to the Firestore backend to apply. */    vo(t) {
            const e = {
                streamToken: this.lastStreamToken,
                writes: t.map((t => fs(this.O, t)))
            };
            this.fo(e);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Datastore and its related methods are a wrapper around the external Google
     * Cloud Datastore grpc API, which provides an interface that is more convenient
     * for the rest of the client SDK architecture to consume.
     */
    /**
     * An implementation of Datastore that exposes additional state for internal
     * consumption.
     */
    class Oo extends class {} {
        constructor(t, e, n, s) {
            super(), this.authCredentials = t, this.appCheckCredentials = e, this.eo = n, this.O = s, 
            this.Co = !1;
        }
        No() {
            if (this.Co) throw new j(G.FAILED_PRECONDITION, "The client has already been terminated.");
        }
        /** Invokes the provided RPC with auth and AppCheck tokens. */    Mr(t, e, n) {
            return this.No(), Promise.all([ this.authCredentials.getToken(), this.appCheckCredentials.getToken() ]).then((([s, i]) => this.eo.Mr(t, e, n, s, i))).catch((t => {
                throw "FirebaseError" === t.name ? (t.code === G.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), 
                this.appCheckCredentials.invalidateToken()), t) : new j(G.UNKNOWN, t.toString());
            }));
        }
        /** Invokes the provided RPC with streamed results with auth and AppCheck tokens. */    Lr(t, e, n) {
            return this.No(), Promise.all([ this.authCredentials.getToken(), this.appCheckCredentials.getToken() ]).then((([s, i]) => this.eo.Lr(t, e, n, s, i))).catch((t => {
                throw "FirebaseError" === t.name ? (t.code === G.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), 
                this.appCheckCredentials.invalidateToken()), t) : new j(G.UNKNOWN, t.toString());
            }));
        }
        terminate() {
            this.Co = !0;
        }
    }

    // TODO(firestorexp): Make sure there is only one Datastore instance per
    // firestore-exp client.
    /**
     * A component used by the RemoteStore to track the OnlineState (that is,
     * whether or not the client as a whole should be considered to be online or
     * offline), implementing the appropriate heuristics.
     *
     * In particular, when the client is trying to connect to the backend, we
     * allow up to MAX_WATCH_STREAM_FAILURES within ONLINE_STATE_TIMEOUT_MS for
     * a connection to succeed. If we have too many failures or the timeout elapses,
     * then we set the OnlineState to Offline, and the client will behave as if
     * it is offline (get()s will return cached data, etc.).
     */
    class Mo {
        constructor(t, e) {
            this.asyncQueue = t, this.onlineStateHandler = e, 
            /** The current OnlineState. */
            this.state = "Unknown" /* Unknown */ , 
            /**
             * A count of consecutive failures to open the stream. If it reaches the
             * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
             * Offline.
             */
            this.xo = 0, 
            /**
             * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
             * transition from OnlineState.Unknown to OnlineState.Offline without waiting
             * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
             */
            this.ko = null, 
            /**
             * Whether the client should log a warning message if it fails to connect to
             * the backend (initially true, cleared after a successful stream, or if we've
             * logged the message already).
             */
            this.Oo = !0;
        }
        /**
         * Called by RemoteStore when a watch stream is started (including on each
         * backoff attempt).
         *
         * If this is the first attempt, it sets the OnlineState to Unknown and starts
         * the onlineStateTimer.
         */    Mo() {
            0 === this.xo && (this.$o("Unknown" /* Unknown */), this.ko = this.asyncQueue.enqueueAfterDelay("online_state_timeout" /* OnlineStateTimeout */ , 1e4, (() => (this.ko = null, 
            this.Fo("Backend didn't respond within 10 seconds."), this.$o("Offline" /* Offline */), 
            Promise.resolve()))));
        }
        /**
         * Updates our OnlineState as appropriate after the watch stream reports a
         * failure. The first failure moves us to the 'Unknown' state. We then may
         * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
         * actually transition to the 'Offline' state.
         */    Bo(t) {
            "Online" /* Online */ === this.state ? this.$o("Unknown" /* Unknown */) : (this.xo++, 
            this.xo >= 1 && (this.Lo(), this.Fo(`Connection failed 1 times. Most recent error: ${t.toString()}`), 
            this.$o("Offline" /* Offline */)));
        }
        /**
         * Explicitly sets the OnlineState to the specified state.
         *
         * Note that this resets our timers / failure counters, etc. used by our
         * Offline heuristics, so must not be used in place of
         * handleWatchStreamStart() and handleWatchStreamFailure().
         */    set(t) {
            this.Lo(), this.xo = 0, "Online" /* Online */ === t && (
            // We've connected to watch at least once. Don't warn the developer
            // about being offline going forward.
            this.Oo = !1), this.$o(t);
        }
        $o(t) {
            t !== this.state && (this.state = t, this.onlineStateHandler(t));
        }
        Fo(t) {
            const e = `Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
            this.Oo ? ($(e), this.Oo = !1) : M("OnlineStateTracker", e);
        }
        Lo() {
            null !== this.ko && (this.ko.cancel(), this.ko = null);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class $o {
        constructor(
        /**
         * The local store, used to fill the write pipeline with outbound mutations.
         */
        t, 
        /** The client-side proxy for interacting with the backend. */
        e, n, s, i) {
            this.localStore = t, this.datastore = e, this.asyncQueue = n, this.remoteSyncer = {}, 
            /**
             * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
             * LocalStore via fillWritePipeline() and have or will send to the write
             * stream.
             *
             * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
             * restart the write stream. When the stream is established the writes in the
             * pipeline will be sent in order.
             *
             * Writes remain in writePipeline until they are acknowledged by the backend
             * and thus will automatically be re-sent if the stream is interrupted /
             * restarted before they're acknowledged.
             *
             * Write responses from the backend are linked to their originating request
             * purely based on order, and so we can just shift() writes from the front of
             * the writePipeline as we receive responses.
             */
            this.Uo = [], 
            /**
             * A mapping of watched targets that the client cares about tracking and the
             * user has explicitly called a 'listen' for this target.
             *
             * These targets may or may not have been sent to or acknowledged by the
             * server. On re-establishing the listen stream, these targets should be sent
             * to the server. The targets removed with unlistens are removed eagerly
             * without waiting for confirmation from the listen stream.
             */
            this.qo = new Map, 
            /**
             * A set of reasons for why the RemoteStore may be offline. If empty, the
             * RemoteStore may start its network connections.
             */
            this.Ko = new Set, 
            /**
             * Event handlers that get called when the network is disabled or enabled.
             *
             * PORTING NOTE: These functions are used on the Web client to create the
             * underlying streams (to support tree-shakeable streams). On Android and iOS,
             * the streams are created during construction of RemoteStore.
             */
            this.Go = [], this.jo = i, this.jo.mr((t => {
                n.enqueueAndForget((async () => {
                    // Porting Note: Unlike iOS, `restartNetwork()` is called even when the
                    // network becomes unreachable as we don't have any other way to tear
                    // down our streams.
                    Qo(this) && (M("RemoteStore", "Restarting streams for network reachability change."), 
                    await async function(t) {
                        const e = K(t);
                        e.Ko.add(4 /* ConnectivityChange */), await Bo(e), e.Qo.set("Unknown" /* Unknown */), 
                        e.Ko.delete(4 /* ConnectivityChange */), await Fo(e);
                    }(this));
                }));
            })), this.Qo = new Mo(n, s);
        }
    }

    async function Fo(t) {
        if (Qo(t)) for (const e of t.Go) await e(/* enabled= */ !0);
    }

    /**
     * Temporarily disables the network. The network can be re-enabled using
     * enableNetwork().
     */ async function Bo(t) {
        for (const e of t.Go) await e(/* enabled= */ !1);
    }

    /**
     * Starts new listen for the given target. Uses resume token if provided. It
     * is a no-op if the target of given `TargetData` is already being listened to.
     */
    function Lo(t, e) {
        const n = K(t);
        n.qo.has(e.targetId) || (
        // Mark this as something the client is currently listening for.
        n.qo.set(e.targetId, e), jo(n) ? 
        // The listen will be sent in onWatchStreamOpen
        Go(n) : hc(n).co() && qo(n, e));
    }

    /**
     * Removes the listen from server. It is a no-op if the given target id is
     * not being listened to.
     */ function Uo(t, e) {
        const n = K(t), s = hc(n);
        n.qo.delete(e), s.co() && Ko(n, e), 0 === n.qo.size && (s.co() ? s.ho() : Qo(n) && 
        // Revert to OnlineState.Unknown if the watch stream is not open and we
        // have no listeners, since without any listens to send we cannot
        // confirm if the stream is healthy and upgrade to OnlineState.Online.
        n.Qo.set("Unknown" /* Unknown */));
    }

    /**
     * We need to increment the the expected number of pending responses we're due
     * from watch so we wait for the ack to process any messages from this target.
     */ function qo(t, e) {
        t.Wo.Z(e.targetId), hc(t).Ao(e);
    }

    /**
     * We need to increment the expected number of pending responses we're due
     * from watch so we wait for the removal on the server before we process any
     * messages from this target.
     */ function Ko(t, e) {
        t.Wo.Z(e), hc(t).Ro(e);
    }

    function Go(t) {
        t.Wo = new Gn({
            getRemoteKeysForTarget: e => t.remoteSyncer.getRemoteKeysForTarget(e),
            Tt: e => t.qo.get(e) || null
        }), hc(t).start(), t.Qo.Mo();
    }

    /**
     * Returns whether the watch stream should be started because it's necessary
     * and has not yet been started.
     */ function jo(t) {
        return Qo(t) && !hc(t).oo() && t.qo.size > 0;
    }

    function Qo(t) {
        return 0 === K(t).Ko.size;
    }

    function Wo(t) {
        t.Wo = void 0;
    }

    async function zo(t) {
        t.qo.forEach(((e, n) => {
            qo(t, e);
        }));
    }

    async function Ho(t, e) {
        Wo(t), 
        // If we still need the watch stream, retry the connection.
        jo(t) ? (t.Qo.Bo(e), Go(t)) : 
        // No need to restart watch stream because there are no active targets.
        // The online state is set to unknown because there is no active attempt
        // at establishing a connection
        t.Qo.set("Unknown" /* Unknown */);
    }

    async function Jo(t, e, n) {
        if (
        // Mark the client as online since we got a message from the server
        t.Qo.set("Online" /* Online */), e instanceof qn && 2 /* Removed */ === e.state && e.cause) 
        // There was an error on a target, don't wait for a consistent snapshot
        // to raise events
        try {
            await 
            /** Handles an error on a target */
            async function(t, e) {
                const n = e.cause;
                for (const s of e.targetIds) 
                // A watched target might have been removed already.
                t.qo.has(s) && (await t.remoteSyncer.rejectListen(s, n), t.qo.delete(s), t.Wo.removeTarget(s));
            }
            /**
     * Attempts to fill our write pipeline with writes from the LocalStore.
     *
     * Called internally to bootstrap or refill the write pipeline and by
     * SyncEngine whenever there are new mutations to process.
     *
     * Starts the write stream if necessary.
     */ (t, e);
        } catch (n) {
            M("RemoteStore", "Failed to remove targets %s: %s ", e.targetIds.join(","), n), 
            await Yo(t, n);
        } else if (e instanceof Ln ? t.Wo.ct(e) : e instanceof Un ? t.Wo._t(e) : t.Wo.ht(e), 
        !n.isEqual(at.min())) try {
            const e = await Kr(t.localStore);
            n.compareTo(e) >= 0 && 
            // We have received a target change with a global snapshot if the snapshot
            // version is not equal to SnapshotVersion.min().
            await 
            /**
     * Takes a batch of changes from the Datastore, repackages them as a
     * RemoteEvent, and passes that on to the listener, which is typically the
     * SyncEngine.
     */
            function(t, e) {
                const n = t.Wo.yt(e);
                // Update in-memory resume tokens. LocalStore will update the
                // persistent view of these when applying the completed RemoteEvent.
                            return n.targetChanges.forEach(((n, s) => {
                    if (n.resumeToken.approximateByteSize() > 0) {
                        const i = t.qo.get(s);
                        // A watched target might have been removed already.
                                            i && t.qo.set(s, i.withResumeToken(n.resumeToken, e));
                    }
                })), 
                // Re-establish listens for the targets that have been invalidated by
                // existence filter mismatches.
                n.targetMismatches.forEach((e => {
                    const n = t.qo.get(e);
                    if (!n) 
                    // A watched target might have been removed already.
                    return;
                    // Clear the resume token for the target, since we're in a known mismatch
                    // state.
                                    t.qo.set(e, n.withResumeToken(pt.EMPTY_BYTE_STRING, n.snapshotVersion)), 
                    // Cause a hard reset by unwatching and rewatching immediately, but
                    // deliberately don't send a resume token so that we get a full update.
                    Ko(t, e);
                    // Mark the target we send as being on behalf of an existence filter
                    // mismatch, but don't actually retain that in listenTargets. This ensures
                    // that we flag the first re-listen this way without impacting future
                    // listens of this target (that might happen e.g. on reconnect).
                    const s = new yi(n.target, e, 1 /* ExistenceFilterMismatch */ , n.sequenceNumber);
                    qo(t, s);
                })), t.remoteSyncer.applyRemoteEvent(n);
            }(t, n);
        } catch (e) {
            M("RemoteStore", "Failed to raise snapshot:", e), await Yo(t, e);
        }
    }

    /**
     * Recovery logic for IndexedDB errors that takes the network offline until
     * `op` succeeds. Retries are scheduled with backoff using
     * `enqueueRetryable()`. If `op()` is not provided, IndexedDB access is
     * validated via a generic operation.
     *
     * The returned Promise is resolved once the network is disabled and before
     * any retry attempt.
     */ async function Yo(t, e, n) {
        if (!ui(e)) throw e;
        t.Ko.add(1 /* IndexedDbFailed */), 
        // Disable network and raise offline snapshots
        await Bo(t), t.Qo.set("Offline" /* Offline */), n || (
        // Use a simple read operation to determine if IndexedDB recovered.
        // Ideally, we would expose a health check directly on SimpleDb, but
        // RemoteStore only has access to persistence through LocalStore.
        n = () => Kr(t.localStore)), 
        // Probe IndexedDB periodically and re-enable network
        t.asyncQueue.enqueueRetryable((async () => {
            M("RemoteStore", "Retrying IndexedDB access"), await n(), t.Ko.delete(1 /* IndexedDbFailed */), 
            await Fo(t);
        }));
    }

    /**
     * Executes `op`. If `op` fails, takes the network offline until `op`
     * succeeds. Returns after the first attempt.
     */ function Xo(t, e) {
        return e().catch((n => Yo(t, n, e)));
    }

    async function Zo(t) {
        const e = K(t), n = lc(e);
        let s = e.Uo.length > 0 ? e.Uo[e.Uo.length - 1].batchId : -1;
        for (;tc(e); ) try {
            const t = await Qr(e.localStore, s);
            if (null === t) {
                0 === e.Uo.length && n.ho();
                break;
            }
            s = t.batchId, ec(e, t);
        } catch (t) {
            await Yo(e, t);
        }
        nc(e) && sc(e);
    }

    /**
     * Returns true if we can add to the write pipeline (i.e. the network is
     * enabled and the write pipeline is not full).
     */ function tc(t) {
        return Qo(t) && t.Uo.length < 10;
    }

    /**
     * Queues additional writes to be sent to the write stream, sending them
     * immediately if the write stream is established.
     */ function ec(t, e) {
        t.Uo.push(e);
        const n = lc(t);
        n.co() && n.bo && n.vo(e.mutations);
    }

    function nc(t) {
        return Qo(t) && !lc(t).oo() && t.Uo.length > 0;
    }

    function sc(t) {
        lc(t).start();
    }

    async function ic(t) {
        lc(t).Do();
    }

    async function rc(t) {
        const e = lc(t);
        // Send the write pipeline now that the stream is established.
            for (const n of t.Uo) e.vo(n.mutations);
    }

    async function oc(t, e, n) {
        const s = t.Uo.shift(), i = mi.from(s, e, n);
        await Xo(t, (() => t.remoteSyncer.applySuccessfulWrite(i))), 
        // It's possible that with the completion of this mutation another
        // slot has freed up.
        await Zo(t);
    }

    async function cc(t, e) {
        // If the write stream closed after the write handshake completes, a write
        // operation failed and we fail the pending operation.
        e && lc(t).bo && 
        // This error affects the actual write.
        await async function(t, e) {
            // Only handle permanent errors here. If it's transient, just let the retry
            // logic kick in.
            if (n = e.code, En(n) && n !== G.ABORTED) {
                // This was a permanent error, the request itself was the problem
                // so it's not going to succeed if we resend it.
                const n = t.Uo.shift();
                // In this case it's also unlikely that the server itself is melting
                // down -- this was just a bad request so inhibit backoff on the next
                // restart.
                            lc(t).ao(), await Xo(t, (() => t.remoteSyncer.rejectFailedWrite(n.batchId, e))), 
                // It's possible that with the completion of this mutation
                // another slot has freed up.
                await Zo(t);
            }
            var n;
        }(t, e), 
        // The write stream might have been started by refilling the write
        // pipeline for failed writes
        nc(t) && sc(t);
    }

    async function uc(t, e) {
        const n = K(t);
        n.asyncQueue.verifyOperationInProgress(), M("RemoteStore", "RemoteStore received new credentials");
        const s = Qo(n);
        // Tear down and re-create our network streams. This will ensure we get a
        // fresh auth token for the new user and re-fill the write pipeline with
        // new mutations from the LocalStore (since mutations are per-user).
            n.Ko.add(3 /* CredentialChange */), await Bo(n), s && 
        // Don't set the network status to Unknown if we are offline.
        n.Qo.set("Unknown" /* Unknown */), await n.remoteSyncer.handleCredentialChange(e), 
        n.Ko.delete(3 /* CredentialChange */), await Fo(n);
    }

    /**
     * Toggles the network state when the client gains or loses its primary lease.
     */ async function ac(t, e) {
        const n = K(t);
        e ? (n.Ko.delete(2 /* IsSecondary */), await Fo(n)) : e || (n.Ko.add(2 /* IsSecondary */), 
        await Bo(n), n.Qo.set("Unknown" /* Unknown */));
    }

    /**
     * If not yet initialized, registers the WatchStream and its network state
     * callback with `remoteStoreImpl`. Returns the existing stream if one is
     * already available.
     *
     * PORTING NOTE: On iOS and Android, the WatchStream gets registered on startup.
     * This is not done on Web to allow it to be tree-shaken.
     */ function hc(t) {
        return t.zo || (
        // Create stream (but note that it is not started yet).
        t.zo = function(t, e, n) {
            const s = K(t);
            return s.No(), new xo(e, s.eo, s.authCredentials, s.appCheckCredentials, s.O, n);
        }
        /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ (t.datastore, t.asyncQueue, {
            Pr: zo.bind(null, t),
            vr: Ho.bind(null, t),
            To: Jo.bind(null, t)
        }), t.Go.push((async e => {
            e ? (t.zo.ao(), jo(t) ? Go(t) : t.Qo.set("Unknown" /* Unknown */)) : (await t.zo.stop(), 
            Wo(t));
        }))), t.zo;
    }

    /**
     * If not yet initialized, registers the WriteStream and its network state
     * callback with `remoteStoreImpl`. Returns the existing stream if one is
     * already available.
     *
     * PORTING NOTE: On iOS and Android, the WriteStream gets registered on startup.
     * This is not done on Web to allow it to be tree-shaken.
     */ function lc(t) {
        return t.Ho || (
        // Create stream (but note that it is not started yet).
        t.Ho = function(t, e, n) {
            const s = K(t);
            return s.No(), new ko(e, s.eo, s.authCredentials, s.appCheckCredentials, s.O, n);
        }(t.datastore, t.asyncQueue, {
            Pr: ic.bind(null, t),
            vr: cc.bind(null, t),
            So: rc.bind(null, t),
            Vo: oc.bind(null, t)
        }), t.Go.push((async e => {
            e ? (t.Ho.ao(), 
            // This will start the write stream if necessary.
            await Zo(t)) : (await t.Ho.stop(), t.Uo.length > 0 && (M("RemoteStore", `Stopping write stream with ${t.Uo.length} pending writes`), 
            t.Uo = []));
        }))), t.Ho;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Represents an operation scheduled to be run in the future on an AsyncQueue.
     *
     * It is created via DelayedOperation.createAndSchedule().
     *
     * Supports cancellation (via cancel()) and early execution (via skipDelay()).
     *
     * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
     * in newer versions of TypeScript defines `finally`, which is not available in
     * IE.
     */
    class fc {
        constructor(t, e, n, s, i) {
            this.asyncQueue = t, this.timerId = e, this.targetTimeMs = n, this.op = s, this.removalCallback = i, 
            this.deferred = new Q, this.then = this.deferred.promise.then.bind(this.deferred.promise), 
            // It's normal for the deferred promise to be canceled (due to cancellation)
            // and so we attach a dummy catch callback to avoid
            // 'UnhandledPromiseRejectionWarning' log spam.
            this.deferred.promise.catch((t => {}));
        }
        /**
         * Creates and returns a DelayedOperation that has been scheduled to be
         * executed on the provided asyncQueue after the provided delayMs.
         *
         * @param asyncQueue - The queue to schedule the operation on.
         * @param id - A Timer ID identifying the type of operation this is.
         * @param delayMs - The delay (ms) before the operation should be scheduled.
         * @param op - The operation to run.
         * @param removalCallback - A callback to be called synchronously once the
         *   operation is executed or canceled, notifying the AsyncQueue to remove it
         *   from its delayedOperations list.
         *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
         *   the DelayedOperation class public.
         */    static createAndSchedule(t, e, n, s, i) {
            const r = Date.now() + n, o = new fc(t, e, r, s, i);
            return o.start(n), o;
        }
        /**
         * Starts the timer. This is called immediately after construction by
         * createAndSchedule().
         */    start(t) {
            this.timerHandle = setTimeout((() => this.handleDelayElapsed()), t);
        }
        /**
         * Queues the operation to run immediately (if it hasn't already been run or
         * canceled).
         */    skipDelay() {
            return this.handleDelayElapsed();
        }
        /**
         * Cancels the operation if it hasn't already been executed or canceled. The
         * promise will be rejected.
         *
         * As long as the operation has not yet been run, calling cancel() provides a
         * guarantee that the operation will not be run.
         */    cancel(t) {
            null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new j(G.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
        }
        handleDelayElapsed() {
            this.asyncQueue.enqueueAndForget((() => null !== this.timerHandle ? (this.clearTimeout(), 
            this.op().then((t => this.deferred.resolve(t)))) : Promise.resolve()));
        }
        clearTimeout() {
            null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), 
            this.timerHandle = null);
        }
    }

    /**
     * Returns a FirestoreError that can be surfaced to the user if the provided
     * error is an IndexedDbTransactionError. Re-throws the error otherwise.
     */ function dc(t, e) {
        if ($("AsyncQueue", `${e}: ${t}`), ui(t)) return new j(G.UNAVAILABLE, `${e}: ${t}`);
        throw t;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * DocumentSet is an immutable (copy-on-write) collection that holds documents
     * in order specified by the provided comparator. We always add a document key
     * comparator on top of what is provided to guarantee document equality based on
     * the key.
     */ class _c {
        /** The default ordering is by key if the comparator is omitted */
        constructor(t) {
            // We are adding document key comparator to the end as it's the only
            // guaranteed unique property of a document.
            this.comparator = t ? (e, n) => t(e, n) || Nt.comparator(e.key, n.key) : (t, e) => Nt.comparator(t.key, e.key), 
            this.keyedMap = Nn(), this.sortedSet = new An(this.comparator);
        }
        /**
         * Returns an empty copy of the existing DocumentSet, using the same
         * comparator.
         */    static emptySet(t) {
            return new _c(t.comparator);
        }
        has(t) {
            return null != this.keyedMap.get(t);
        }
        get(t) {
            return this.keyedMap.get(t);
        }
        first() {
            return this.sortedSet.minKey();
        }
        last() {
            return this.sortedSet.maxKey();
        }
        isEmpty() {
            return this.sortedSet.isEmpty();
        }
        /**
         * Returns the index of the provided key in the document set, or -1 if the
         * document key is not present in the set;
         */    indexOf(t) {
            const e = this.keyedMap.get(t);
            return e ? this.sortedSet.indexOf(e) : -1;
        }
        get size() {
            return this.sortedSet.size;
        }
        /** Iterates documents in order defined by "comparator" */    forEach(t) {
            this.sortedSet.inorderTraversal(((e, n) => (t(e), !1)));
        }
        /** Inserts or updates a document with the same key */    add(t) {
            // First remove the element if we have it.
            const e = this.delete(t.key);
            return e.copy(e.keyedMap.insert(t.key, t), e.sortedSet.insert(t, null));
        }
        /** Deletes a document with a given key */    delete(t) {
            const e = this.get(t);
            return e ? this.copy(this.keyedMap.remove(t), this.sortedSet.remove(e)) : this;
        }
        isEqual(t) {
            if (!(t instanceof _c)) return !1;
            if (this.size !== t.size) return !1;
            const e = this.sortedSet.getIterator(), n = t.sortedSet.getIterator();
            for (;e.hasNext(); ) {
                const t = e.getNext().key, s = n.getNext().key;
                if (!t.isEqual(s)) return !1;
            }
            return !0;
        }
        toString() {
            const t = [];
            return this.forEach((e => {
                t.push(e.toString());
            })), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)";
        }
        copy(t, e) {
            const n = new _c;
            return n.comparator = this.comparator, n.keyedMap = t, n.sortedSet = e, n;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
     * duplicate events for the same doc.
     */ class wc {
        constructor() {
            this.Jo = new An(Nt.comparator);
        }
        track(t) {
            const e = t.doc.key, n = this.Jo.get(e);
            n ? 
            // Merge the new change with the existing change.
            0 /* Added */ !== t.type && 3 /* Metadata */ === n.type ? this.Jo = this.Jo.insert(e, t) : 3 /* Metadata */ === t.type && 1 /* Removed */ !== n.type ? this.Jo = this.Jo.insert(e, {
                type: n.type,
                doc: t.doc
            }) : 2 /* Modified */ === t.type && 2 /* Modified */ === n.type ? this.Jo = this.Jo.insert(e, {
                type: 2 /* Modified */ ,
                doc: t.doc
            }) : 2 /* Modified */ === t.type && 0 /* Added */ === n.type ? this.Jo = this.Jo.insert(e, {
                type: 0 /* Added */ ,
                doc: t.doc
            }) : 1 /* Removed */ === t.type && 0 /* Added */ === n.type ? this.Jo = this.Jo.remove(e) : 1 /* Removed */ === t.type && 2 /* Modified */ === n.type ? this.Jo = this.Jo.insert(e, {
                type: 1 /* Removed */ ,
                doc: n.doc
            }) : 0 /* Added */ === t.type && 1 /* Removed */ === n.type ? this.Jo = this.Jo.insert(e, {
                type: 2 /* Modified */ ,
                doc: t.doc
            }) : 
            // This includes these cases, which don't make sense:
            // Added->Added
            // Removed->Removed
            // Modified->Added
            // Removed->Modified
            // Metadata->Added
            // Removed->Metadata
            L() : this.Jo = this.Jo.insert(e, t);
        }
        Yo() {
            const t = [];
            return this.Jo.inorderTraversal(((e, n) => {
                t.push(n);
            })), t;
        }
    }

    class mc {
        constructor(t, e, n, s, i, r, o, c) {
            this.query = t, this.docs = e, this.oldDocs = n, this.docChanges = s, this.mutatedKeys = i, 
            this.fromCache = r, this.syncStateChanged = o, this.excludesMetadataChanges = c;
        }
        /** Returns a view snapshot as if all documents in the snapshot were added. */    static fromInitialDocuments(t, e, n, s) {
            const i = [];
            return e.forEach((t => {
                i.push({
                    type: 0 /* Added */ ,
                    doc: t
                });
            })), new mc(t, e, _c.emptySet(e), i, n, s, 
            /* syncStateChanged= */ !0, 
            /* excludesMetadataChanges= */ !1);
        }
        get hasPendingWrites() {
            return !this.mutatedKeys.isEmpty();
        }
        isEqual(t) {
            if (!(this.fromCache === t.fromCache && this.syncStateChanged === t.syncStateChanged && this.mutatedKeys.isEqual(t.mutatedKeys) && Ne(this.query, t.query) && this.docs.isEqual(t.docs) && this.oldDocs.isEqual(t.oldDocs))) return !1;
            const e = this.docChanges, n = t.docChanges;
            if (e.length !== n.length) return !1;
            for (let t = 0; t < e.length; t++) if (e[t].type !== n[t].type || !e[t].doc.isEqual(n[t].doc)) return !1;
            return !0;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Holds the listeners and the last received ViewSnapshot for a query being
     * tracked by EventManager.
     */ class gc {
        constructor() {
            this.Xo = void 0, this.listeners = [];
        }
    }

    class yc {
        constructor() {
            this.queries = new Er((t => xe(t)), Ne), this.onlineState = "Unknown" /* Unknown */ , 
            this.Zo = new Set;
        }
    }

    async function pc(t, e) {
        const n = K(t), s = e.query;
        let i = !1, r = n.queries.get(s);
        if (r || (i = !0, r = new gc), i) try {
            r.Xo = await n.onListen(s);
        } catch (t) {
            const n = dc(t, `Initialization of query '${ke(e.query)}' failed`);
            return void e.onError(n);
        }
        if (n.queries.set(s, r), r.listeners.push(e), 
        // Run global snapshot listeners if a consistent snapshot has been emitted.
        e.tc(n.onlineState), r.Xo) {
            e.ec(r.Xo) && Ac(n);
        }
    }

    async function Ic(t, e) {
        const n = K(t), s = e.query;
        let i = !1;
        const r = n.queries.get(s);
        if (r) {
            const t = r.listeners.indexOf(e);
            t >= 0 && (r.listeners.splice(t, 1), i = 0 === r.listeners.length);
        }
        if (i) return n.queries.delete(s), n.onUnlisten(s);
    }

    function Ec(t, e) {
        const n = K(t);
        let s = !1;
        for (const t of e) {
            const e = t.query, i = n.queries.get(e);
            if (i) {
                for (const e of i.listeners) e.ec(t) && (s = !0);
                i.Xo = t;
            }
        }
        s && Ac(n);
    }

    function Tc(t, e, n) {
        const s = K(t), i = s.queries.get(e);
        if (i) for (const t of i.listeners) t.onError(n);
        // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
        // after an error.
            s.queries.delete(e);
    }

    // Call all global snapshot listeners that have been set.
    function Ac(t) {
        t.Zo.forEach((t => {
            t.next();
        }));
    }

    /**
     * QueryListener takes a series of internal view snapshots and determines
     * when to raise the event.
     *
     * It uses an Observer to dispatch events.
     */ class Rc {
        constructor(t, e, n) {
            this.query = t, this.nc = e, 
            /**
             * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
             * observer. This flag is set to true once we've actually raised an event.
             */
            this.sc = !1, this.ic = null, this.onlineState = "Unknown" /* Unknown */ , this.options = n || {};
        }
        /**
         * Applies the new ViewSnapshot to this listener, raising a user-facing event
         * if applicable (depending on what changed, whether the user has opted into
         * metadata-only changes, etc.). Returns true if a user-facing event was
         * indeed raised.
         */    ec(t) {
            if (!this.options.includeMetadataChanges) {
                // Remove the metadata only changes.
                const e = [];
                for (const n of t.docChanges) 3 /* Metadata */ !== n.type && e.push(n);
                t = new mc(t.query, t.docs, t.oldDocs, e, t.mutatedKeys, t.fromCache, t.syncStateChanged, 
                /* excludesMetadataChanges= */ !0);
            }
            let e = !1;
            return this.sc ? this.rc(t) && (this.nc.next(t), e = !0) : this.oc(t, this.onlineState) && (this.cc(t), 
            e = !0), this.ic = t, e;
        }
        onError(t) {
            this.nc.error(t);
        }
        /** Returns whether a snapshot was raised. */    tc(t) {
            this.onlineState = t;
            let e = !1;
            return this.ic && !this.sc && this.oc(this.ic, t) && (this.cc(this.ic), e = !0), 
            e;
        }
        oc(t, e) {
            // Always raise the first event when we're synced
            if (!t.fromCache) return !0;
            // NOTE: We consider OnlineState.Unknown as online (it should become Offline
            // or Online if we wait long enough).
                    const n = "Offline" /* Offline */ !== e;
            // Don't raise the event if we're online, aren't synced yet (checked
            // above) and are waiting for a sync.
                    return (!this.options.uc || !n) && (!t.docs.isEmpty() || "Offline" /* Offline */ === e);
            // Raise data from cache if we have any documents or we are offline
            }
        rc(t) {
            // We don't need to handle includeDocumentMetadataChanges here because
            // the Metadata only changes have already been stripped out if needed.
            // At this point the only changes we will see are the ones we should
            // propagate.
            if (t.docChanges.length > 0) return !0;
            const e = this.ic && this.ic.hasPendingWrites !== t.hasPendingWrites;
            return !(!t.syncStateChanged && !e) && !0 === this.options.includeMetadataChanges;
            // Generally we should have hit one of the cases above, but it's possible
            // to get here if there were only metadata docChanges and they got
            // stripped out.
            }
        cc(t) {
            t = mc.fromInitialDocuments(t.query, t.docs, t.mutatedKeys, t.fromCache), this.sc = !0, 
            this.nc.next(t);
        }
    }

    /**
     * Returns a `LoadBundleTaskProgress` representing the progress that the loading
     * has succeeded.
     */
    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class Sc {
        constructor(t) {
            this.key = t;
        }
    }

    class Dc {
        constructor(t) {
            this.key = t;
        }
    }

    /**
     * View is responsible for computing the final merged truth of what docs are in
     * a query. It gets notified of local and remote changes to docs, and applies
     * the query filters and limits to determine the most correct possible results.
     */ class Cc {
        constructor(t, 
        /** Documents included in the remote target */
        e) {
            this.query = t, this.dc = e, this._c = null, 
            /**
             * A flag whether the view is current with the backend. A view is considered
             * current after it has seen the current flag from the backend and did not
             * lose consistency within the watch stream (e.g. because of an existence
             * filter mismatch).
             */
            this.current = !1, 
            /** Documents in the view but not in the remote target */
            this.wc = On(), 
            /** Document Keys that have local changes */
            this.mutatedKeys = On(), this.mc = Me(t), this.gc = new _c(this.mc);
        }
        /**
         * The set of remote documents that the server has told us belongs to the target associated with
         * this view.
         */    get yc() {
            return this.dc;
        }
        /**
         * Iterates over a set of doc changes, applies the query limit, and computes
         * what the new results should be, what the changes were, and whether we may
         * need to go back to the local cache for more results. Does not make any
         * changes to the view.
         * @param docChanges - The doc changes to apply to this view.
         * @param previousChanges - If this is being called with a refill, then start
         *        with this set of docs and changes instead of the current view.
         * @returns a new set of docs, changes, and refill flag.
         */    Ic(t, e) {
            const n = e ? e.Ec : new wc, s = e ? e.gc : this.gc;
            let i = e ? e.mutatedKeys : this.mutatedKeys, r = s, o = !1;
            // Track the last doc in a (full) limit. This is necessary, because some
            // update (a delete, or an update moving a doc past the old limit) might
            // mean there is some other document in the local cache that either should
            // come (1) between the old last limit doc and the new last document, in the
            // case of updates, or (2) after the new last document, in the case of
            // deletes. So we keep this doc at the old limit to compare the updates to.
            // Note that this should never get used in a refill (when previousChanges is
            // set), because there will only be adds -- no deletes or updates.
            const c = Re(this.query) && s.size === this.query.limit ? s.last() : null, u = Pe(this.query) && s.size === this.query.limit ? s.first() : null;
            // Drop documents out to meet limit/limitToLast requirement.
            if (t.inorderTraversal(((t, e) => {
                const a = s.get(t), h = Oe(this.query, e) ? e : null, l = !!a && this.mutatedKeys.has(a.key), f = !!h && (h.hasLocalMutations || 
                // We only consider committed mutations for documents that were
                // mutated during the lifetime of the view.
                this.mutatedKeys.has(h.key) && h.hasCommittedMutations);
                let d = !1;
                // Calculate change
                            if (a && h) {
                    a.data.isEqual(h.data) ? l !== f && (n.track({
                        type: 3 /* Metadata */ ,
                        doc: h
                    }), d = !0) : this.Tc(a, h) || (n.track({
                        type: 2 /* Modified */ ,
                        doc: h
                    }), d = !0, (c && this.mc(h, c) > 0 || u && this.mc(h, u) < 0) && (
                    // This doc moved from inside the limit to outside the limit.
                    // That means there may be some other doc in the local cache
                    // that should be included instead.
                    o = !0));
                } else !a && h ? (n.track({
                    type: 0 /* Added */ ,
                    doc: h
                }), d = !0) : a && !h && (n.track({
                    type: 1 /* Removed */ ,
                    doc: a
                }), d = !0, (c || u) && (
                // A doc was removed from a full limit query. We'll need to
                // requery from the local cache to see if we know about some other
                // doc that should be in the results.
                o = !0));
                d && (h ? (r = r.add(h), i = f ? i.add(t) : i.delete(t)) : (r = r.delete(t), i = i.delete(t)));
            })), Re(this.query) || Pe(this.query)) for (;r.size > this.query.limit; ) {
                const t = Re(this.query) ? r.last() : r.first();
                r = r.delete(t.key), i = i.delete(t.key), n.track({
                    type: 1 /* Removed */ ,
                    doc: t
                });
            }
            return {
                gc: r,
                Ec: n,
                ks: o,
                mutatedKeys: i
            };
        }
        Tc(t, e) {
            // We suppress the initial change event for documents that were modified as
            // part of a write acknowledgment (e.g. when the value of a server transform
            // is applied) as Watch will send us the same document again.
            // By suppressing the event, we only raise two user visible events (one with
            // `hasPendingWrites` and the final state of the document) instead of three
            // (one with `hasPendingWrites`, the modified document with
            // `hasPendingWrites` and the final state of the document).
            return t.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations;
        }
        /**
         * Updates the view with the given ViewDocumentChanges and optionally updates
         * limbo docs and sync state from the provided target change.
         * @param docChanges - The set of changes to make to the view's docs.
         * @param updateLimboDocuments - Whether to update limbo documents based on
         *        this change.
         * @param targetChange - A target change to apply for computing limbo docs and
         *        sync state.
         * @returns A new ViewChange with the given docs, changes, and sync state.
         */
        // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
        applyChanges(t, e, n) {
            const s = this.gc;
            this.gc = t.gc, this.mutatedKeys = t.mutatedKeys;
            // Sort changes based on type and query comparator
            const i = t.Ec.Yo();
            i.sort(((t, e) => function(t, e) {
                const n = t => {
                    switch (t) {
                      case 0 /* Added */ :
                        return 1;

                      case 2 /* Modified */ :
                      case 3 /* Metadata */ :
                        // A metadata change is converted to a modified change at the public
                        // api layer.  Since we sort by document key and then change type,
                        // metadata and modified changes must be sorted equivalently.
                        return 2;

                      case 1 /* Removed */ :
                        return 0;

                      default:
                        return L();
                    }
                };
                return n(t) - n(e);
            }
            /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ (t.type, e.type) || this.mc(t.doc, e.doc))), this.Ac(n);
            const r = e ? this.Rc() : [], o = 0 === this.wc.size && this.current ? 1 /* Synced */ : 0 /* Local */ , c = o !== this._c;
            if (this._c = o, 0 !== i.length || c) {
                return {
                    snapshot: new mc(this.query, t.gc, s, i, t.mutatedKeys, 0 /* Local */ === o, c, 
                    /* excludesMetadataChanges= */ !1),
                    Pc: r
                };
            }
            // no changes
            return {
                Pc: r
            };
        }
        /**
         * Applies an OnlineState change to the view, potentially generating a
         * ViewChange if the view's syncState changes as a result.
         */    tc(t) {
            return this.current && "Offline" /* Offline */ === t ? (
            // If we're offline, set `current` to false and then call applyChanges()
            // to refresh our syncState and generate a ViewChange as appropriate. We
            // are guaranteed to get a new TargetChange that sets `current` back to
            // true once the client is back online.
            this.current = !1, this.applyChanges({
                gc: this.gc,
                Ec: new wc,
                mutatedKeys: this.mutatedKeys,
                ks: !1
            }, 
            /* updateLimboDocuments= */ !1)) : {
                Pc: []
            };
        }
        /**
         * Returns whether the doc for the given key should be in limbo.
         */    bc(t) {
            // If the remote end says it's part of this query, it's not in limbo.
            return !this.dc.has(t) && (
            // The local store doesn't think it's a result, so it shouldn't be in limbo.
            !!this.gc.has(t) && !this.gc.get(t).hasLocalMutations);
        }
        /**
         * Updates syncedDocuments, current, and limbo docs based on the given change.
         * Returns the list of changes to which docs are in limbo.
         */    Ac(t) {
            t && (t.addedDocuments.forEach((t => this.dc = this.dc.add(t))), t.modifiedDocuments.forEach((t => {})), 
            t.removedDocuments.forEach((t => this.dc = this.dc.delete(t))), this.current = t.current);
        }
        Rc() {
            // We can only determine limbo documents when we're in-sync with the server.
            if (!this.current) return [];
            // TODO(klimt): Do this incrementally so that it's not quadratic when
            // updating many documents.
                    const t = this.wc;
            this.wc = On(), this.gc.forEach((t => {
                this.bc(t.key) && (this.wc = this.wc.add(t.key));
            }));
            // Diff the new limbo docs with the old limbo docs.
            const e = [];
            return t.forEach((t => {
                this.wc.has(t) || e.push(new Dc(t));
            })), this.wc.forEach((n => {
                t.has(n) || e.push(new Sc(n));
            })), e;
        }
        /**
         * Update the in-memory state of the current view with the state read from
         * persistence.
         *
         * We update the query view whenever a client's primary status changes:
         * - When a client transitions from primary to secondary, it can miss
         *   LocalStorage updates and its query views may temporarily not be
         *   synchronized with the state on disk.
         * - For secondary to primary transitions, the client needs to update the list
         *   of `syncedDocuments` since secondary clients update their query views
         *   based purely on synthesized RemoteEvents.
         *
         * @param queryResult.documents - The documents that match the query according
         * to the LocalStore.
         * @param queryResult.remoteKeys - The keys of the documents that match the
         * query according to the backend.
         *
         * @returns The ViewChange that resulted from this synchronization.
         */
        // PORTING NOTE: Multi-tab only.
        vc(t) {
            this.dc = t.Ks, this.wc = On();
            const e = this.Ic(t.documents);
            return this.applyChanges(e, /*updateLimboDocuments=*/ !0);
        }
        /**
         * Returns a view snapshot as if this query was just listened to. Contains
         * a document add for every existing document and the `fromCache` and
         * `hasPendingWrites` status of the already established view.
         */
        // PORTING NOTE: Multi-tab only.
        Vc() {
            return mc.fromInitialDocuments(this.query, this.gc, this.mutatedKeys, 0 /* Local */ === this._c);
        }
    }

    /**
     * QueryView contains all of the data that SyncEngine needs to keep track of for
     * a particular query.
     */
    class Nc {
        constructor(
        /**
         * The query itself.
         */
        t, 
        /**
         * The target number created by the client that is used in the watch
         * stream to identify this query.
         */
        e, 
        /**
         * The view is responsible for computing the final merged truth of what
         * docs are in the query. It gets notified of local and remote changes,
         * and applies the query filters and limits to determine the most correct
         * possible results.
         */
        n) {
            this.query = t, this.targetId = e, this.view = n;
        }
    }

    /** Tracks a limbo resolution. */ class xc {
        constructor(t) {
            this.key = t, 
            /**
             * Set to true once we've received a document. This is used in
             * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
             * decide whether it needs to manufacture a delete event for the target once
             * the target is CURRENT.
             */
            this.Sc = !1;
        }
    }

    /**
     * An implementation of `SyncEngine` coordinating with other parts of SDK.
     *
     * The parts of SyncEngine that act as a callback to RemoteStore need to be
     * registered individually. This is done in `syncEngineWrite()` and
     * `syncEngineListen()` (as well as `applyPrimaryState()`) as these methods
     * serve as entry points to RemoteStore's functionality.
     *
     * Note: some field defined in this class might have public access level, but
     * the class is not exported so they are only accessible from this module.
     * This is useful to implement optional features (like bundles) in free
     * functions, such that they are tree-shakeable.
     */ class kc {
        constructor(t, e, n, 
        // PORTING NOTE: Manages state synchronization in multi-tab environments.
        s, i, r) {
            this.localStore = t, this.remoteStore = e, this.eventManager = n, this.sharedClientState = s, 
            this.currentUser = i, this.maxConcurrentLimboResolutions = r, this.Dc = {}, this.Cc = new Er((t => xe(t)), Ne), 
            this.Nc = new Map, 
            /**
             * The keys of documents that are in limbo for which we haven't yet started a
             * limbo resolution query. The strings in this set are the result of calling
             * `key.path.canonicalString()` where `key` is a `DocumentKey` object.
             *
             * The `Set` type was chosen because it provides efficient lookup and removal
             * of arbitrary elements and it also maintains insertion order, providing the
             * desired queue-like FIFO semantics.
             */
            this.xc = new Set, 
            /**
             * Keeps track of the target ID for each document that is in limbo with an
             * active target.
             */
            this.kc = new An(Nt.comparator), 
            /**
             * Keeps track of the information about an active limbo resolution for each
             * active target ID that was started for the purpose of limbo resolution.
             */
            this.Oc = new Map, this.Mc = new so, 
            /** Stores user completion handlers, indexed by User and BatchId. */
            this.$c = {}, 
            /** Stores user callbacks waiting for all pending writes to be acknowledged. */
            this.Fc = new Map, this.Bc = ar.Je(), this.onlineState = "Unknown" /* Unknown */ , 
            // The primary state is set to `true` or `false` immediately after Firestore
            // startup. In the interim, a client should only be considered primary if
            // `isPrimary` is true.
            this.Lc = void 0;
        }
        get isPrimaryClient() {
            return !0 === this.Lc;
        }
    }

    /**
     * Initiates the new listen, resolves promise when listen enqueued to the
     * server. All the subsequent view snapshots or errors are sent to the
     * subscribed handlers. Returns the initial snapshot.
     */
    async function Oc(t, e) {
        const n = hu(t);
        let s, i;
        const r = n.Cc.get(e);
        if (r) 
        // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
        // already exists when EventManager calls us for the first time. This
        // happens when the primary tab is already listening to this query on
        // behalf of another tab and the user of the primary also starts listening
        // to the query. EventManager will not have an assigned target ID in this
        // case and calls `listen` to obtain this ID.
        s = r.targetId, n.sharedClientState.addLocalQueryTarget(s), i = r.view.Vc(); else {
            const t = await Wr(n.localStore, De(e));
            n.isPrimaryClient && Lo(n.remoteStore, t);
            const r = n.sharedClientState.addLocalQueryTarget(t.targetId);
            s = t.targetId, i = await Mc(n, e, s, "current" === r);
        }
        return i;
    }

    /**
     * Registers a view for a previously unknown query and computes its initial
     * snapshot.
     */ async function Mc(t, e, n, s) {
        // PORTING NOTE: On Web only, we inject the code that registers new Limbo
        // targets based on view changes. This allows us to only depend on Limbo
        // changes when user code includes queries.
        t.Uc = (e, n, s) => async function(t, e, n, s) {
            let i = e.view.Ic(n);
            i.ks && (
            // The query has a limit and some docs were removed, so we need
            // to re-run the query against the local store to make sure we
            // didn't lose any good docs that had been past the limit.
            i = await Hr(t.localStore, e.query, 
            /* usePreviousResults= */ !1).then((({documents: t}) => e.view.Ic(t, i))));
            const r = s && s.targetChanges.get(e.targetId), o = e.view.applyChanges(i, 
            /* updateLimboDocuments= */ t.isPrimaryClient, r);
            return Hc(t, e.targetId, o.Pc), o.snapshot;
        }(t, e, n, s);
        const i = await Hr(t.localStore, e, 
        /* usePreviousResults= */ !0), r = new Cc(e, i.Ks), o = r.Ic(i.documents), c = Bn.createSynthesizedTargetChangeForCurrentChange(n, s && "Offline" /* Offline */ !== t.onlineState), u = r.applyChanges(o, 
        /* updateLimboDocuments= */ t.isPrimaryClient, c);
        Hc(t, n, u.Pc);
        const a = new Nc(e, n, r);
        return t.Cc.set(e, a), t.Nc.has(n) ? t.Nc.get(n).push(e) : t.Nc.set(n, [ e ]), u.snapshot;
    }

    /** Stops listening to the query. */ async function $c(t, e) {
        const n = K(t), s = n.Cc.get(e), i = n.Nc.get(s.targetId);
        if (i.length > 1) return n.Nc.set(s.targetId, i.filter((t => !Ne(t, e)))), void n.Cc.delete(e);
        // No other queries are mapped to the target, clean up the query and the target.
            if (n.isPrimaryClient) {
            // We need to remove the local query target first to allow us to verify
            // whether any other client is still interested in this target.
            n.sharedClientState.removeLocalQueryTarget(s.targetId);
            n.sharedClientState.isActiveQueryTarget(s.targetId) || await zr(n.localStore, s.targetId, 
            /*keepPersistedTargetData=*/ !1).then((() => {
                n.sharedClientState.clearQueryState(s.targetId), Uo(n.remoteStore, s.targetId), 
                Wc(n, s.targetId);
            })).catch(_r);
        } else Wc(n, s.targetId), await zr(n.localStore, s.targetId, 
        /*keepPersistedTargetData=*/ !0);
    }

    /**
     * Initiates the write of local mutation batch which involves adding the
     * writes to the mutation queue, notifying the remote store about new
     * mutations and raising events for any changes this write caused.
     *
     * The promise returned by this call is resolved when the above steps
     * have completed, *not* when the write was acked by the backend. The
     * userCallback is resolved once the write was acked/rejected by the
     * backend (or failed locally for any other reason).
     */ async function Fc(t, e, n) {
        const s = lu(t);
        try {
            const t = await function(t, e) {
                const n = K(t), s = ut.now(), i = e.reduce(((t, e) => t.add(e.key)), On());
                let r;
                return n.persistence.runTransaction("Locally write mutations", "readwrite", (t => n.Us.Es(t, i).next((i => {
                    r = i;
                    // For non-idempotent mutations (such as `FieldValue.increment()`),
                    // we record the base state in a separate patch mutation. This is
                    // later used to guarantee consistent values and prevents flicker
                    // even if the backend sends us an update that already includes our
                    // transform.
                    const o = [];
                    for (const t of e) {
                        const e = un(t, r.get(t.key));
                        null != e && 
                        // NOTE: The base state should only be applied if there's some
                        // existing document to override, so use a Precondition of
                        // exists=true
                        o.push(new fn(t.key, e, Ht(e.value.mapValue), nn.exists(!0)));
                    }
                    return n.gs.addMutationBatch(t, s, o, e);
                })))).then((t => (t.applyToLocalDocumentSet(r), {
                    batchId: t.batchId,
                    changes: r
                })));
            }(s.localStore, e);
            s.sharedClientState.addPendingMutation(t.batchId), function(t, e, n) {
                let s = t.$c[t.currentUser.toKey()];
                s || (s = new An(rt));
                s = s.insert(e, n), t.$c[t.currentUser.toKey()] = s;
            }
            /**
     * Resolves or rejects the user callback for the given batch and then discards
     * it.
     */ (s, t.batchId, n), await Xc(s, t.changes), await Zo(s.remoteStore);
        } catch (t) {
            // If we can't persist the mutation, we reject the user callback and
            // don't send the mutation. The user can then retry the write.
            const e = dc(t, "Failed to persist write");
            n.reject(e);
        }
    }

    /**
     * Applies one remote event to the sync engine, notifying any views of the
     * changes, and releasing any pending mutation batches that would become
     * visible because of the snapshot version the remote event contains.
     */ async function Bc(t, e) {
        const n = K(t);
        try {
            const t = await Gr(n.localStore, e);
            // Update `receivedDocument` as appropriate for any limbo targets.
                    e.targetChanges.forEach(((t, e) => {
                const s = n.Oc.get(e);
                s && (
                // Since this is a limbo resolution lookup, it's for a single document
                // and it could be added, modified, or removed, but not a combination.
                U(t.addedDocuments.size + t.modifiedDocuments.size + t.removedDocuments.size <= 1), 
                t.addedDocuments.size > 0 ? s.Sc = !0 : t.modifiedDocuments.size > 0 ? U(s.Sc) : t.removedDocuments.size > 0 && (U(s.Sc), 
                s.Sc = !1));
            })), await Xc(n, t, e);
        } catch (t) {
            await _r(t);
        }
    }

    /**
     * Applies an OnlineState change to the sync engine and notifies any views of
     * the change.
     */ function Lc(t, e, n) {
        const s = K(t);
        // If we are the secondary client, we explicitly ignore the remote store's
        // online state (the local client may go offline, even though the primary
        // tab remains online) and only apply the primary tab's online state from
        // SharedClientState.
            if (s.isPrimaryClient && 0 /* RemoteStore */ === n || !s.isPrimaryClient && 1 /* SharedClientState */ === n) {
            const t = [];
            s.Cc.forEach(((n, s) => {
                const i = s.view.tc(e);
                i.snapshot && t.push(i.snapshot);
            })), function(t, e) {
                const n = K(t);
                n.onlineState = e;
                let s = !1;
                n.queries.forEach(((t, n) => {
                    for (const t of n.listeners) 
                    // Run global snapshot listeners if a consistent snapshot has been emitted.
                    t.tc(e) && (s = !0);
                })), s && Ac(n);
            }(s.eventManager, e), t.length && s.Dc.To(t), s.onlineState = e, s.isPrimaryClient && s.sharedClientState.setOnlineState(e);
        }
    }

    /**
     * Rejects the listen for the given targetID. This can be triggered by the
     * backend for any active target.
     *
     * @param syncEngine - The sync engine implementation.
     * @param targetId - The targetID corresponds to one previously initiated by the
     * user as part of TargetData passed to listen() on RemoteStore.
     * @param err - A description of the condition that has forced the rejection.
     * Nearly always this will be an indication that the user is no longer
     * authorized to see the data matching the target.
     */ async function Uc(t, e, n) {
        const s = K(t);
        // PORTING NOTE: Multi-tab only.
            s.sharedClientState.updateQueryState(e, "rejected", n);
        const i = s.Oc.get(e), r = i && i.key;
        if (r) {
            // TODO(klimt): We really only should do the following on permission
            // denied errors, but we don't have the cause code here.
            // It's a limbo doc. Create a synthetic event saying it was deleted.
            // This is kind of a hack. Ideally, we would have a method in the local
            // store to purge a document. However, it would be tricky to keep all of
            // the local store's invariants with another method.
            let t = new An(Nt.comparator);
            // TODO(b/217189216): This limbo document should ideally have a read time,
            // so that it is picked up by any read-time based scans. The backend,
            // however, does not send a read time for target removals.
                    t = t.insert(r, Jt.newNoDocument(r, at.min()));
            const n = On().add(r), i = new Fn(at.min(), 
            /* targetChanges= */ new Map, 
            /* targetMismatches= */ new bn(rt), t, n);
            await Bc(s, i), 
            // Since this query failed, we won't want to manually unlisten to it.
            // We only remove it from bookkeeping after we successfully applied the
            // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
            // this query when the RemoteStore restarts the Watch stream, which should
            // re-trigger the target failure.
            s.kc = s.kc.remove(r), s.Oc.delete(e), Yc(s);
        } else await zr(s.localStore, e, 
        /* keepPersistedTargetData */ !1).then((() => Wc(s, e, n))).catch(_r);
    }

    async function qc(t, e) {
        const n = K(t), s = e.batch.batchId;
        try {
            const t = await qr(n.localStore, e);
            // The local store may or may not be able to apply the write result and
            // raise events immediately (depending on whether the watcher is caught
            // up), so we raise user callbacks first so that they consistently happen
            // before listen events.
                    Qc(n, s, /*error=*/ null), jc(n, s), n.sharedClientState.updateMutationState(s, "acknowledged"), 
            await Xc(n, t);
        } catch (t) {
            await _r(t);
        }
    }

    async function Kc(t, e, n) {
        const s = K(t);
        try {
            const t = await function(t, e) {
                const n = K(t);
                return n.persistence.runTransaction("Reject batch", "readwrite-primary", (t => {
                    let s;
                    return n.gs.lookupMutationBatch(t, e).next((e => (U(null !== e), s = e.keys(), n.gs.removeMutationBatch(t, e)))).next((() => n.gs.performConsistencyCheck(t))).next((() => n.Us.Es(t, s)));
                }));
            }
            /**
     * Returns the largest (latest) batch id in mutation queue that is pending
     * server response.
     *
     * Returns `BATCHID_UNKNOWN` if the queue is empty.
     */ (s.localStore, e);
            // The local store may or may not be able to apply the write result and
            // raise events immediately (depending on whether the watcher is caught up),
            // so we raise user callbacks first so that they consistently happen before
            // listen events.
                    Qc(s, e, n), jc(s, e), s.sharedClientState.updateMutationState(e, "rejected", n), 
            await Xc(s, t);
        } catch (n) {
            await _r(n);
        }
    }

    /**
     * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
     * if there are any.
     */ function jc(t, e) {
        (t.Fc.get(e) || []).forEach((t => {
            t.resolve();
        })), t.Fc.delete(e);
    }

    /** Reject all outstanding callbacks waiting for pending writes to complete. */ function Qc(t, e, n) {
        const s = K(t);
        let i = s.$c[s.currentUser.toKey()];
        // NOTE: Mutations restored from persistence won't have callbacks, so it's
        // okay for there to be no callback for this ID.
            if (i) {
            const t = i.get(e);
            t && (n ? t.reject(n) : t.resolve(), i = i.remove(e)), s.$c[s.currentUser.toKey()] = i;
        }
    }

    function Wc(t, e, n = null) {
        t.sharedClientState.removeLocalQueryTarget(e);
        for (const s of t.Nc.get(e)) t.Cc.delete(s), n && t.Dc.qc(s, n);
        if (t.Nc.delete(e), t.isPrimaryClient) {
            t.Mc.si(e).forEach((e => {
                t.Mc.containsKey(e) || 
                // We removed the last reference for this key
                zc(t, e);
            }));
        }
    }

    function zc(t, e) {
        t.xc.delete(e.path.canonicalString());
        // It's possible that the target already got removed because the query failed. In that case,
        // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
        const n = t.kc.get(e);
        null !== n && (Uo(t.remoteStore, n), t.kc = t.kc.remove(e), t.Oc.delete(n), Yc(t));
    }

    function Hc(t, e, n) {
        for (const s of n) if (s instanceof Sc) t.Mc.addReference(s.key, e), Jc(t, s); else if (s instanceof Dc) {
            M("SyncEngine", "Document no longer in limbo: " + s.key), t.Mc.removeReference(s.key, e);
            t.Mc.containsKey(s.key) || 
            // We removed the last reference for this key
            zc(t, s.key);
        } else L();
    }

    function Jc(t, e) {
        const n = e.key, s = n.path.canonicalString();
        t.kc.get(n) || t.xc.has(s) || (M("SyncEngine", "New document in limbo: " + n), t.xc.add(s), 
        Yc(t));
    }

    /**
     * Starts listens for documents in limbo that are enqueued for resolution,
     * subject to a maximum number of concurrent resolutions.
     *
     * Without bounding the number of concurrent resolutions, the server can fail
     * with "resource exhausted" errors which can lead to pathological client
     * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
     */ function Yc(t) {
        for (;t.xc.size > 0 && t.kc.size < t.maxConcurrentLimboResolutions; ) {
            const e = t.xc.values().next().value;
            t.xc.delete(e);
            const n = new Nt(_t.fromString(e)), s = t.Bc.next();
            t.Oc.set(s, new xc(n)), t.kc = t.kc.insert(n, s), Lo(t.remoteStore, new yi(De(Ae(n.path)), s, 2 /* LimboResolution */ , nt.A));
        }
    }

    async function Xc(t, e, n) {
        const s = K(t), i = [], r = [], o = [];
        s.Cc.isEmpty() || (s.Cc.forEach(((t, c) => {
            o.push(s.Uc(c, e, n).then((t => {
                if (t) {
                    s.isPrimaryClient && s.sharedClientState.updateQueryState(c.targetId, t.fromCache ? "not-current" : "current"), 
                    i.push(t);
                    const e = $r.Ss(c.targetId, t);
                    r.push(e);
                }
            })));
        })), await Promise.all(o), s.Dc.To(i), await async function(t, e) {
            const n = K(t);
            try {
                await n.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (t => si.forEach(e, (e => si.forEach(e.vs, (s => n.persistence.referenceDelegate.addReference(t, e.targetId, s))).next((() => si.forEach(e.Vs, (s => n.persistence.referenceDelegate.removeReference(t, e.targetId, s)))))))));
            } catch (t) {
                if (!ui(t)) throw t;
                // If `notifyLocalViewChanges` fails, we did not advance the sequence
                // number for the documents that were included in this transaction.
                // This might trigger them to be deleted earlier than they otherwise
                // would have, but it should not invalidate the integrity of the data.
                M("LocalStore", "Failed to update sequence numbers: " + t);
            }
            for (const t of e) {
                const e = t.targetId;
                if (!t.fromCache) {
                    const t = n.Ms.get(e), s = t.snapshotVersion, i = t.withLastLimboFreeSnapshotVersion(s);
                    // Advance the last limbo free snapshot version
                                    n.Ms = n.Ms.insert(e, i);
                }
            }
        }(s.localStore, r));
    }

    async function Zc(t, e) {
        const n = K(t);
        if (!n.currentUser.isEqual(e)) {
            M("SyncEngine", "User change. New user:", e.toKey());
            const t = await Ur(n.localStore, e);
            n.currentUser = e, 
            // Fails tasks waiting for pending writes requested by previous user.
            function(t, e) {
                t.Fc.forEach((t => {
                    t.forEach((t => {
                        t.reject(new j(G.CANCELLED, e));
                    }));
                })), t.Fc.clear();
            }(n, "'waitForPendingWrites' promise is rejected due to a user change."), 
            // TODO(b/114226417): Consider calling this only in the primary tab.
            n.sharedClientState.handleUserChange(e, t.removedBatchIds, t.addedBatchIds), await Xc(n, t.qs);
        }
    }

    function tu(t, e) {
        const n = K(t), s = n.Oc.get(e);
        if (s && s.Sc) return On().add(s.key);
        {
            let t = On();
            const s = n.Nc.get(e);
            if (!s) return t;
            for (const e of s) {
                const s = n.Cc.get(e);
                t = t.unionWith(s.view.yc);
            }
            return t;
        }
    }

    function hu(t) {
        const e = K(t);
        return e.remoteStore.remoteSyncer.applyRemoteEvent = Bc.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = tu.bind(null, e), 
        e.remoteStore.remoteSyncer.rejectListen = Uc.bind(null, e), e.Dc.To = Ec.bind(null, e.eventManager), 
        e.Dc.qc = Tc.bind(null, e.eventManager), e;
    }

    function lu(t) {
        const e = K(t);
        return e.remoteStore.remoteSyncer.applySuccessfulWrite = qc.bind(null, e), e.remoteStore.remoteSyncer.rejectFailedWrite = Kc.bind(null, e), 
        e;
    }

    class du {
        constructor() {
            this.synchronizeTabs = !1;
        }
        async initialize(t) {
            this.O = Do(t.databaseInfo.databaseId), this.sharedClientState = this.Gc(t), this.persistence = this.jc(t), 
            await this.persistence.start(), this.gcScheduler = this.Qc(t), this.localStore = this.Wc(t);
        }
        Qc(t) {
            return null;
        }
        Wc(t) {
            return Lr(this.persistence, new Fr, t.initialUser, this.O);
        }
        jc(t) {
            return new ao(lo.bi, this.O);
        }
        Gc(t) {
            return new To;
        }
        async terminate() {
            this.gcScheduler && this.gcScheduler.stop(), await this.sharedClientState.shutdown(), 
            await this.persistence.shutdown();
        }
    }

    /**
     * Initializes and wires the components that are needed to interface with the
     * network.
     */ class mu {
        async initialize(t, e) {
            this.localStore || (this.localStore = t.localStore, this.sharedClientState = t.sharedClientState, 
            this.datastore = this.createDatastore(e), this.remoteStore = this.createRemoteStore(e), 
            this.eventManager = this.createEventManager(e), this.syncEngine = this.createSyncEngine(e, 
            /* startAsPrimary=*/ !t.synchronizeTabs), this.sharedClientState.onlineStateHandler = t => Lc(this.syncEngine, t, 1 /* SharedClientState */), 
            this.remoteStore.remoteSyncer.handleCredentialChange = Zc.bind(null, this.syncEngine), 
            await ac(this.remoteStore, this.syncEngine.isPrimaryClient));
        }
        createEventManager(t) {
            return new yc;
        }
        createDatastore(t) {
            const e = Do(t.databaseInfo.databaseId), n = (s = t.databaseInfo, new vo(s));
            var s;
            /** Return the Platform-specific connectivity monitor. */        return function(t, e, n, s) {
                return new Oo(t, e, n, s);
            }(t.authCredentials, t.appCheckCredentials, n, e);
        }
        createRemoteStore(t) {
            return e = this.localStore, n = this.datastore, s = t.asyncQueue, i = t => Lc(this.syncEngine, t, 0 /* RemoteStore */), 
            r = Ro.Vt() ? new Ro : new Ao, new $o(e, n, s, i, r);
            var e, n, s, i, r;
            /** Re-enables the network. Idempotent. */    }
        createSyncEngine(t, e) {
            return function(t, e, n, 
            // PORTING NOTE: Manages state synchronization in multi-tab environments.
            s, i, r, o) {
                const c = new kc(t, e, n, s, i, r);
                return o && (c.Lc = !0), c;
            }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t.initialUser, t.maxConcurrentLimboResolutions, e);
        }
        terminate() {
            return async function(t) {
                const e = K(t);
                M("RemoteStore", "RemoteStore shutting down."), e.Ko.add(5 /* Shutdown */), await Bo(e), 
                e.jo.shutdown(), 
                // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
                // triggering spurious listener events with cached data, etc.
                e.Qo.set("Unknown" /* Unknown */);
            }(this.remoteStore);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * On web, a `ReadableStream` is wrapped around by a `ByteStreamReader`.
     */
    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /*
     * A wrapper implementation of Observer<T> that will dispatch events
     * asynchronously. To allow immediate silencing, a mute call is added which
     * causes events scheduled to no longer be raised.
     */
    class yu {
        constructor(t) {
            this.observer = t, 
            /**
             * When set to true, will not raise future events. Necessary to deal with
             * async detachment of listener.
             */
            this.muted = !1;
        }
        next(t) {
            this.observer.next && this.Hc(this.observer.next, t);
        }
        error(t) {
            this.observer.error ? this.Hc(this.observer.error, t) : console.error("Uncaught Error in snapshot listener:", t);
        }
        Jc() {
            this.muted = !0;
        }
        Hc(t, e) {
            this.muted || setTimeout((() => {
                this.muted || t(e);
            }), 0);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * FirestoreClient is a top-level class that constructs and owns all of the
     * pieces of the client SDK architecture. It is responsible for creating the
     * async queue that is shared by all of the other components in the system.
     */
    class Tu {
        constructor(t, e, 
        /**
         * Asynchronous queue responsible for all of our internal processing. When
         * we get incoming work from the user (via public API) or the network
         * (incoming GRPC messages), we should always schedule onto this queue.
         * This ensures all of our work is properly serialized (e.g. we don't
         * start processing a new operation while the previous one is waiting for
         * an async I/O to complete).
         */
        n, s) {
            this.authCredentials = t, this.appCheckCredentials = e, this.asyncQueue = n, this.databaseInfo = s, 
            this.user = C.UNAUTHENTICATED, this.clientId = it.R(), this.authCredentialListener = () => Promise.resolve(), 
            this.appCheckCredentialListener = () => Promise.resolve(), this.authCredentials.start(n, (async t => {
                M("FirestoreClient", "Received user=", t.uid), await this.authCredentialListener(t), 
                this.user = t;
            })), this.appCheckCredentials.start(n, (t => (M("FirestoreClient", "Received new app check token=", t), 
            this.appCheckCredentialListener(t, this.user))));
        }
        async getConfiguration() {
            return {
                asyncQueue: this.asyncQueue,
                databaseInfo: this.databaseInfo,
                clientId: this.clientId,
                authCredentials: this.authCredentials,
                appCheckCredentials: this.appCheckCredentials,
                initialUser: this.user,
                maxConcurrentLimboResolutions: 100
            };
        }
        setCredentialChangeListener(t) {
            this.authCredentialListener = t;
        }
        setAppCheckTokenChangeListener(t) {
            this.appCheckCredentialListener = t;
        }
        /**
         * Checks that the client has not been terminated. Ensures that other methods on
         * this class cannot be called after the client is terminated.
         */    verifyNotTerminated() {
            if (this.asyncQueue.isShuttingDown) throw new j(G.FAILED_PRECONDITION, "The client has already been terminated.");
        }
        terminate() {
            this.asyncQueue.enterRestrictedMode();
            const t = new Q;
            return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async () => {
                try {
                    this.onlineComponents && await this.onlineComponents.terminate(), this.offlineComponents && await this.offlineComponents.terminate(), 
                    // The credentials provider must be terminated after shutting down the
                    // RemoteStore as it will prevent the RemoteStore from retrieving auth
                    // tokens.
                    this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), t.resolve();
                } catch (e) {
                    const n = dc(e, "Failed to shutdown persistence");
                    t.reject(n);
                }
            })), t.promise;
        }
    }

    async function Au(t, e) {
        t.asyncQueue.verifyOperationInProgress(), M("FirestoreClient", "Initializing OfflineComponentProvider");
        const n = await t.getConfiguration();
        await e.initialize(n);
        let s = n.initialUser;
        t.setCredentialChangeListener((async t => {
            s.isEqual(t) || (await Ur(e.localStore, t), s = t);
        })), 
        // When a user calls clearPersistence() in one client, all other clients
        // need to be terminated to allow the delete to succeed.
        e.persistence.setDatabaseDeletedListener((() => t.terminate())), t.offlineComponents = e;
    }

    async function Ru(t, e) {
        t.asyncQueue.verifyOperationInProgress();
        const n = await Pu(t);
        M("FirestoreClient", "Initializing OnlineComponentProvider");
        const s = await t.getConfiguration();
        await e.initialize(n, s), 
        // The CredentialChangeListener of the online component provider takes
        // precedence over the offline component provider.
        t.setCredentialChangeListener((t => uc(e.remoteStore, t))), t.setAppCheckTokenChangeListener(((t, n) => uc(e.remoteStore, n))), 
        t.onlineComponents = e;
    }

    async function Pu(t) {
        return t.offlineComponents || (M("FirestoreClient", "Using default OfflineComponentProvider"), 
        await Au(t, new du)), t.offlineComponents;
    }

    async function bu(t) {
        return t.onlineComponents || (M("FirestoreClient", "Using default OnlineComponentProvider"), 
        await Ru(t, new mu)), t.onlineComponents;
    }

    function Du(t) {
        return bu(t).then((t => t.syncEngine));
    }

    async function Cu(t) {
        const e = await bu(t), n = e.eventManager;
        return n.onListen = Oc.bind(null, e.syncEngine), n.onUnlisten = $c.bind(null, e.syncEngine), 
        n;
    }

    const qu = new Map;

    /**
     * An instance map that ensures only one Datastore exists per Firestore
     * instance.
     */
    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function Ku(t, e, n) {
        if (!n) throw new j(G.INVALID_ARGUMENT, `Function ${t}() cannot be called with an empty ${e}.`);
    }

    /**
     * Validates that two boolean options are not set at the same time.
     * @internal
     */ function Gu(t, e, n, s) {
        if (!0 === e && !0 === s) throw new j(G.INVALID_ARGUMENT, `${t} and ${n} cannot be used together.`);
    }

    /**
     * Validates that `path` refers to a document (indicated by the fact it contains
     * an even numbers of segments).
     */ function ju(t) {
        if (!Nt.isDocumentKey(t)) throw new j(G.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`);
    }

    /**
     * Validates that `path` refers to a collection (indicated by the fact it
     * contains an odd numbers of segments).
     */ function Qu(t) {
        if (Nt.isDocumentKey(t)) throw new j(G.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`);
    }

    /**
     * Returns true if it's a non-null object without a custom prototype
     * (i.e. excludes Array, Date, etc.).
     */
    /** Returns a string describing the type / value of the provided input. */
    function Wu(t) {
        if (void 0 === t) return "undefined";
        if (null === t) return "null";
        if ("string" == typeof t) return t.length > 20 && (t = `${t.substring(0, 20)}...`), 
        JSON.stringify(t);
        if ("number" == typeof t || "boolean" == typeof t) return "" + t;
        if ("object" == typeof t) {
            if (t instanceof Array) return "an array";
            {
                const e = 
                /** try to get the constructor name for an object. */
                function(t) {
                    if (t.constructor) return t.constructor.name;
                    return null;
                }
                /**
     * Casts `obj` to `T`, optionally unwrapping Compat types to expose the
     * underlying instance. Throws if  `obj` is not an instance of `T`.
     *
     * This cast is used in the Lite and Full SDK to verify instance types for
     * arguments passed to the public API.
     * @internal
     */ (t);
                return e ? `a custom ${e} object` : "an object";
            }
        }
        return "function" == typeof t ? "a function" : L();
    }

    function zu(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e) {
        if ("_delegate" in t && (
        // Unwrap Compat types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        t = t._delegate), !(t instanceof e)) {
            if (e.name === t.constructor.name) throw new j(G.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
            {
                const n = Wu(t);
                throw new j(G.INVALID_ARGUMENT, `Expected type '${e.name}', but it was: ${n}`);
            }
        }
        return t;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // settings() defaults:
    /**
     * A concrete type describing all the values that can be applied via a
     * user-supplied `FirestoreSettings` object. This is a separate type so that
     * defaults can be supplied and the value can be checked for equality.
     */
    class Ju {
        constructor(t) {
            var e;
            if (void 0 === t.host) {
                if (void 0 !== t.ssl) throw new j(G.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
                this.host = "firestore.googleapis.com", this.ssl = true;
            } else this.host = t.host, this.ssl = null === (e = t.ssl) || void 0 === e || e;
            if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, 
            void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040; else {
                if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new j(G.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
                this.cacheSizeBytes = t.cacheSizeBytes;
            }
            this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, 
            this.useFetchStreams = !!t.useFetchStreams, Gu("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling);
        }
        isEqual(t) {
            return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties && this.useFetchStreams === t.useFetchStreams;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The Cloud Firestore service interface.
     *
     * Do not call this constructor directly. Instead, use {@link getFirestore}.
     */ class Yu {
        /** @hideconstructor */
        constructor(t, e, n) {
            this._authCredentials = e, this._appCheckCredentials = n, 
            /**
             * Whether it's a Firestore or Firestore Lite instance.
             */
            this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new Ju({}), 
            this._settingsFrozen = !1, t instanceof Vt ? this._databaseId = t : (this._app = t, 
            this._databaseId = function(t) {
                if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new j(G.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
                return new Vt(t.options.projectId);
            }
            /**
     * Modify this instance to communicate with the Cloud Firestore emulator.
     *
     * Note: This must be called before this instance has been used to do any
     * operations.
     *
     * @param firestore - The `Firestore` instance to configure to connect to the
     * emulator.
     * @param host - the emulator host (ex: localhost).
     * @param port - the emulator port (ex: 9000).
     * @param options.mockUserToken - the mock auth token to use for unit testing
     * Security Rules.
     */ (t));
        }
        /**
         * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
         * instance.
         */    get app() {
            if (!this._app) throw new j(G.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this._app;
        }
        get _initialized() {
            return this._settingsFrozen;
        }
        get _terminated() {
            return void 0 !== this._terminateTask;
        }
        _setSettings(t) {
            if (this._settingsFrozen) throw new j(G.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
            this._settings = new Ju(t), void 0 !== t.credentials && (this._authCredentials = function(t) {
                if (!t) return new z;
                switch (t.type) {
                  case "gapi":
                    const e = t.client;
                    // Make sure this really is a Gapi client.
                                    return U(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), 
                    new X(e, t.sessionIndex || "0", t.iamToken || null);

                  case "provider":
                    return t.client;

                  default:
                    throw new j(G.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
                }
            }(t.credentials));
        }
        _getSettings() {
            return this._settings;
        }
        _freezeSettings() {
            return this._settingsFrozen = !0, this._settings;
        }
        _delete() {
            return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
        }
        /** Returns a JSON-serializable representation of this `Firestore` instance. */    toJSON() {
            return {
                app: this._app,
                databaseId: this._databaseId,
                settings: this._settings
            };
        }
        /**
         * Terminates all components used by this client. Subclasses can override
         * this method to clean up their own dependencies, but must also call this
         * method.
         *
         * Only ever called once.
         */    _terminate() {
            /**
     * Removes all components associated with the provided instance. Must be called
     * when the `Firestore` instance is terminated.
     */
            return function(t) {
                const e = qu.get(t);
                e && (M("ComponentProvider", "Removing Datastore"), qu.delete(t), e.terminate());
            }(this), Promise.resolve();
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A `DocumentReference` refers to a document location in a Firestore database
     * and can be used to write, read, or listen to the location. The document at
     * the referenced location may or may not exist.
     */ class Zu {
        /** @hideconstructor */
        constructor(t, 
        /**
         * If provided, the `FirestoreDataConverter` associated with this instance.
         */
        e, n) {
            this.converter = e, this._key = n, 
            /** The type of this Firestore reference. */
            this.type = "document", this.firestore = t;
        }
        get _path() {
            return this._key.path;
        }
        /**
         * The document's identifier within its collection.
         */    get id() {
            return this._key.path.lastSegment();
        }
        /**
         * A string representing the path of the referenced document (relative
         * to the root of the database).
         */    get path() {
            return this._key.path.canonicalString();
        }
        /**
         * The collection this `DocumentReference` belongs to.
         */    get parent() {
            return new ea(this.firestore, this.converter, this._key.path.popLast());
        }
        withConverter(t) {
            return new Zu(this.firestore, t, this._key);
        }
    }

    /**
     * A `Query` refers to a query which you can read or listen to. You can also
     * construct refined `Query` objects by adding filters and ordering.
     */ class ta {
        // This is the lite version of the Query class in the main SDK.
        /** @hideconstructor protected */
        constructor(t, 
        /**
         * If provided, the `FirestoreDataConverter` associated with this instance.
         */
        e, n) {
            this.converter = e, this._query = n, 
            /** The type of this Firestore reference. */
            this.type = "query", this.firestore = t;
        }
        withConverter(t) {
            return new ta(this.firestore, t, this._query);
        }
    }

    /**
     * A `CollectionReference` object can be used for adding documents, getting
     * document references, and querying for documents (using {@link query}).
     */ class ea extends ta {
        /** @hideconstructor */
        constructor(t, e, n) {
            super(t, e, Ae(n)), this._path = n, 
            /** The type of this Firestore reference. */
            this.type = "collection";
        }
        /** The collection's identifier. */    get id() {
            return this._query.path.lastSegment();
        }
        /**
         * A string representing the path of the referenced collection (relative
         * to the root of the database).
         */    get path() {
            return this._query.path.canonicalString();
        }
        /**
         * A reference to the containing `DocumentReference` if this is a
         * subcollection. If this isn't a subcollection, the reference is null.
         */    get parent() {
            const t = this._path.popLast();
            return t.isEmpty() ? null : new Zu(this.firestore, 
            /* converter= */ null, new Nt(t));
        }
        withConverter(t) {
            return new ea(this.firestore, t, this._path);
        }
    }

    function na(t, e, ...n) {
        if (t = getModularInstance(t), Ku("collection", "path", e), t instanceof Yu) {
            const s = _t.fromString(e, ...n);
            return Qu(s), new ea(t, /* converter= */ null, s);
        }
        {
            if (!(t instanceof Zu || t instanceof ea)) throw new j(G.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const s = t._path.child(_t.fromString(e, ...n));
            return Qu(s), new ea(t.firestore, 
            /* converter= */ null, s);
        }
    }

    function ia(t, e, ...n) {
        if (t = getModularInstance(t), 
        // We allow omission of 'pathString' but explicitly prohibit passing in both
        // 'undefined' and 'null'.
        1 === arguments.length && (e = it.R()), Ku("doc", "path", e), t instanceof Yu) {
            const s = _t.fromString(e, ...n);
            return ju(s), new Zu(t, 
            /* converter= */ null, new Nt(s));
        }
        {
            if (!(t instanceof Zu || t instanceof ea)) throw new j(G.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const s = t._path.child(_t.fromString(e, ...n));
            return ju(s), new Zu(t.firestore, t instanceof ea ? t.converter : null, new Nt(s));
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class ca {
        constructor() {
            // The last promise in the queue.
            this.hu = Promise.resolve(), 
            // A list of retryable operations. Retryable operations are run in order and
            // retried with backoff.
            this.lu = [], 
            // Is this AsyncQueue being shut down? Once it is set to true, it will not
            // be changed again.
            this.fu = !1, 
            // Operations scheduled to be queued in the future. Operations are
            // automatically removed after they are run or canceled.
            this.du = [], 
            // visible for testing
            this._u = null, 
            // Flag set while there's an outstanding AsyncQueue operation, used for
            // assertion sanity-checks.
            this.wu = !1, 
            // Enabled during shutdown on Safari to prevent future access to IndexedDB.
            this.mu = !1, 
            // List of TimerIds to fast-forward delays for.
            this.gu = [], 
            // Backoff timer used to schedule retries for retryable operations
            this.ro = new Co(this, "async_queue_retry" /* AsyncQueueRetry */), 
            // Visibility handler that triggers an immediate retry of all retryable
            // operations. Meant to speed up recovery when we regain file system access
            // after page comes into foreground.
            this.yu = () => {
                const t = So();
                t && M("AsyncQueue", "Visibility state changed to " + t.visibilityState), this.ro.Yr();
            };
            const t = So();
            t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.yu);
        }
        get isShuttingDown() {
            return this.fu;
        }
        /**
         * Adds a new operation to the queue without waiting for it to complete (i.e.
         * we ignore the Promise result).
         */    enqueueAndForget(t) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.enqueue(t);
        }
        enqueueAndForgetEvenWhileRestricted(t) {
            this.pu(), 
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.Iu(t);
        }
        enterRestrictedMode(t) {
            if (!this.fu) {
                this.fu = !0, this.mu = t || !1;
                const e = So();
                e && "function" == typeof e.removeEventListener && e.removeEventListener("visibilitychange", this.yu);
            }
        }
        enqueue(t) {
            if (this.pu(), this.fu) 
            // Return a Promise which never resolves.
            return new Promise((() => {}));
            // Create a deferred Promise that we can return to the callee. This
            // allows us to return a "hanging Promise" only to the callee and still
            // advance the queue even when the operation is not run.
                    const e = new Q;
            return this.Iu((() => this.fu && this.mu ? Promise.resolve() : (t().then(e.resolve, e.reject), 
            e.promise))).then((() => e.promise));
        }
        enqueueRetryable(t) {
            this.enqueueAndForget((() => (this.lu.push(t), this.Eu())));
        }
        /**
         * Runs the next operation from the retryable queue. If the operation fails,
         * reschedules with backoff.
         */    async Eu() {
            if (0 !== this.lu.length) {
                try {
                    await this.lu[0](), this.lu.shift(), this.ro.reset();
                } catch (t) {
                    if (!ui(t)) throw t;
     // Failure will be handled by AsyncQueue
                                    M("AsyncQueue", "Operation failed with retryable error: " + t);
                }
                this.lu.length > 0 && 
                // If there are additional operations, we re-schedule `retryNextOp()`.
                // This is necessary to run retryable operations that failed during
                // their initial attempt since we don't know whether they are already
                // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
                // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
                // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
                // call scheduled here.
                // Since `backoffAndRun()` cancels an existing backoff and schedules a
                // new backoff on every call, there is only ever a single additional
                // operation in the queue.
                this.ro.Hr((() => this.Eu()));
            }
        }
        Iu(t) {
            const e = this.hu.then((() => (this.wu = !0, t().catch((t => {
                this._u = t, this.wu = !1;
                const e = 
                /**
     * Chrome includes Error.message in Error.stack. Other browsers do not.
     * This returns expected output of message + stack when available.
     * @param error - Error or FirestoreError
     */
                function(t) {
                    let e = t.message || "";
                    t.stack && (e = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack);
                    return e;
                }
                /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ (t);
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw $("INTERNAL UNHANDLED ERROR: ", e), t;
            })).then((t => (this.wu = !1, t))))));
            return this.hu = e, e;
        }
        enqueueAfterDelay(t, e, n) {
            this.pu(), 
            // Fast-forward delays for timerIds that have been overriden.
            this.gu.indexOf(t) > -1 && (e = 0);
            const s = fc.createAndSchedule(this, t, e, n, (t => this.Tu(t)));
            return this.du.push(s), s;
        }
        pu() {
            this._u && L();
        }
        verifyOperationInProgress() {}
        /**
         * Waits until all currently queued tasks are finished executing. Delayed
         * operations are not run.
         */    async Au() {
            // Operations in the queue prior to draining may have enqueued additional
            // operations. Keep draining the queue until the tail is no longer advanced,
            // which indicates that no more new operations were enqueued and that all
            // operations were executed.
            let t;
            do {
                t = this.hu, await t;
            } while (t !== this.hu);
        }
        /**
         * For Tests: Determine if a delayed operation with a particular TimerId
         * exists.
         */    Ru(t) {
            for (const e of this.du) if (e.timerId === t) return !0;
            return !1;
        }
        /**
         * For Tests: Runs some or all delayed operations early.
         *
         * @param lastTimerId - Delayed operations up to and including this TimerId
         * will be drained. Pass TimerId.All to run all delayed operations.
         * @returns a Promise that resolves once all operations have been run.
         */    Pu(t) {
            // Note that draining may generate more delayed ops, so we do that first.
            return this.Au().then((() => {
                // Run ops in the same order they'd run if they ran naturally.
                this.du.sort(((t, e) => t.targetTimeMs - e.targetTimeMs));
                for (const e of this.du) if (e.skipDelay(), "all" /* All */ !== t && e.timerId === t) break;
                return this.Au();
            }));
        }
        /**
         * For Tests: Skip all subsequent delays for a timer id.
         */    bu(t) {
            this.gu.push(t);
        }
        /** Called once a DelayedOperation is run or canceled. */    Tu(t) {
            // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
            const e = this.du.indexOf(t);
            this.du.splice(e, 1);
        }
    }

    function ua(t) {
        /**
     * Returns true if obj is an object and contains at least one of the specified
     * methods.
     */
        return function(t, e) {
            if ("object" != typeof t || null === t) return !1;
            const n = t;
            for (const t of e) if (t in n && "function" == typeof n[t]) return !0;
            return !1;
        }
        /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
        /**
     * Represents the task of loading a Firestore bundle. It provides progress of bundle
     * loading, as well as task completion and error events.
     *
     * The API is compatible with `Promise<LoadBundleTaskProgress>`.
     */ (t, [ "next", "error", "complete" ]);
    }

    /**
     * The Cloud Firestore service interface.
     *
     * Do not call this constructor directly. Instead, use {@link getFirestore}.
     */
    class la extends Yu {
        /** @hideconstructor */
        constructor(t, e, n) {
            super(t, e, n), 
            /**
             * Whether it's a {@link Firestore} or Firestore Lite instance.
             */
            this.type = "firestore", this._queue = new ca, this._persistenceKey = "name" in t ? t.name : "[DEFAULT]";
        }
        _terminate() {
            return this._firestoreClient || 
            // The client must be initialized to ensure that all subsequent API
            // usage throws an exception.
            wa(this), this._firestoreClient.terminate();
        }
    }

    /**
     * Returns the existing {@link Firestore} instance that is associated with the
     * provided {@link @firebase/app#FirebaseApp}. If no instance exists, initializes a new
     * instance with default settings.
     *
     * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned {@link Firestore}
     * instance is associated with.
     * @returns The {@link Firestore} instance of the provided app.
     */ function da(e = getApp()) {
        return _getProvider(e, "firestore").getImmediate();
    }

    /**
     * @internal
     */ function _a(t) {
        return t._firestoreClient || wa(t), t._firestoreClient.verifyNotTerminated(), t._firestoreClient;
    }

    function wa(t) {
        var e;
        const n = t._freezeSettings(), s = function(t, e, n, s) {
            return new vt(t, e, n, s.host, s.ssl, s.experimentalForceLongPolling, s.experimentalAutoDetectLongPolling, s.useFetchStreams);
        }(t._databaseId, (null === (e = t._app) || void 0 === e ? void 0 : e.options.appId) || "", t._persistenceKey, n);
        t._firestoreClient = new Tu(t._authCredentials, t._appCheckCredentials, t._queue, s);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A `FieldPath` refers to a field in a document. The path may consist of a
     * single field name (referring to a top-level field in the document), or a
     * list of field names (referring to a nested field in the document).
     *
     * Create a `FieldPath` by providing field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     */
    class va {
        /**
         * Creates a `FieldPath` from the provided field names. If more than one field
         * name is provided, the path will point to a nested field in a document.
         *
         * @param fieldNames - A list of field names.
         */
        constructor(...t) {
            for (let e = 0; e < t.length; ++e) if (0 === t[e].length) throw new j(G.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
            this._internalPath = new mt(t);
        }
        /**
         * Returns true if this `FieldPath` is equal to the provided one.
         *
         * @param other - The `FieldPath` to compare against.
         * @returns true if this `FieldPath` is equal to the provided one.
         */    isEqual(t) {
            return this._internalPath.isEqual(t._internalPath);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An immutable object representing an array of bytes.
     */ class Sa {
        /** @hideconstructor */
        constructor(t) {
            this._byteString = t;
        }
        /**
         * Creates a new `Bytes` object from the given Base64 string, converting it to
         * bytes.
         *
         * @param base64 - The Base64 string used to create the `Bytes` object.
         */    static fromBase64String(t) {
            try {
                return new Sa(pt.fromBase64String(t));
            } catch (t) {
                throw new j(G.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + t);
            }
        }
        /**
         * Creates a new `Bytes` object from the given Uint8Array.
         *
         * @param array - The Uint8Array used to create the `Bytes` object.
         */    static fromUint8Array(t) {
            return new Sa(pt.fromUint8Array(t));
        }
        /**
         * Returns the underlying bytes as a Base64-encoded string.
         *
         * @returns The Base64-encoded string created from the `Bytes` object.
         */    toBase64() {
            return this._byteString.toBase64();
        }
        /**
         * Returns the underlying bytes in a new `Uint8Array`.
         *
         * @returns The Uint8Array created from the `Bytes` object.
         */    toUint8Array() {
            return this._byteString.toUint8Array();
        }
        /**
         * Returns a string representation of the `Bytes` object.
         *
         * @returns A string representation of the `Bytes` object.
         */    toString() {
            return "Bytes(base64: " + this.toBase64() + ")";
        }
        /**
         * Returns true if this `Bytes` object is equal to the provided one.
         *
         * @param other - The `Bytes` object to compare against.
         * @returns true if this `Bytes` object is equal to the provided one.
         */    isEqual(t) {
            return this._byteString.isEqual(t._byteString);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Sentinel values that can be used when writing document fields with `set()`
     * or `update()`.
     */ class Da {
        /**
         * @param _methodName - The public API endpoint that returns this class.
         * @hideconstructor
         */
        constructor(t) {
            this._methodName = t;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An immutable object representing a geographic location in Firestore. The
     * location is represented as latitude/longitude pair.
     *
     * Latitude values are in the range of [-90, 90].
     * Longitude values are in the range of [-180, 180].
     */ class Ca {
        /**
         * Creates a new immutable `GeoPoint` object with the provided latitude and
         * longitude values.
         * @param latitude - The latitude as number between -90 and 90.
         * @param longitude - The longitude as number between -180 and 180.
         */
        constructor(t, e) {
            if (!isFinite(t) || t < -90 || t > 90) throw new j(G.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
            if (!isFinite(e) || e < -180 || e > 180) throw new j(G.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
            this._lat = t, this._long = e;
        }
        /**
         * The latitude of this `GeoPoint` instance.
         */    get latitude() {
            return this._lat;
        }
        /**
         * The longitude of this `GeoPoint` instance.
         */    get longitude() {
            return this._long;
        }
        /**
         * Returns true if this `GeoPoint` is equal to the provided one.
         *
         * @param other - The `GeoPoint` to compare against.
         * @returns true if this `GeoPoint` is equal to the provided one.
         */    isEqual(t) {
            return this._lat === t._lat && this._long === t._long;
        }
        /** Returns a JSON-serializable representation of this GeoPoint. */    toJSON() {
            return {
                latitude: this._lat,
                longitude: this._long
            };
        }
        /**
         * Actually private to JS consumers of our API, so this function is prefixed
         * with an underscore.
         */    _compareTo(t) {
            return rt(this._lat, t._lat) || rt(this._long, t._long);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const Na = /^__.*__$/;

    /** The result of parsing document data (e.g. for a setData call). */ class xa {
        constructor(t, e, n) {
            this.data = t, this.fieldMask = e, this.fieldTransforms = n;
        }
        toMutation(t, e) {
            return null !== this.fieldMask ? new fn(t, this.data, this.fieldMask, e, this.fieldTransforms) : new ln(t, this.data, e, this.fieldTransforms);
        }
    }

    /** The result of parsing "update" data (i.e. for an updateData call). */ class ka {
        constructor(t, 
        // The fieldMask does not include document transforms.
        e, n) {
            this.data = t, this.fieldMask = e, this.fieldTransforms = n;
        }
        toMutation(t, e) {
            return new fn(t, this.data, this.fieldMask, e, this.fieldTransforms);
        }
    }

    function Oa(t) {
        switch (t) {
          case 0 /* Set */ :
     // fall through
                  case 2 /* MergeSet */ :
     // fall through
                  case 1 /* Update */ :
            return !0;

          case 3 /* Argument */ :
          case 4 /* ArrayArgument */ :
            return !1;

          default:
            throw L();
        }
    }

    /** A "context" object passed around while parsing user data. */ class Ma {
        /**
         * Initializes a ParseContext with the given source and path.
         *
         * @param settings - The settings for the parser.
         * @param databaseId - The database ID of the Firestore instance.
         * @param serializer - The serializer to use to generate the Value proto.
         * @param ignoreUndefinedProperties - Whether to ignore undefined properties
         * rather than throw.
         * @param fieldTransforms - A mutable list of field transforms encountered
         * while parsing the data.
         * @param fieldMask - A mutable list of field paths encountered while parsing
         * the data.
         *
         * TODO(b/34871131): We don't support array paths right now, so path can be
         * null to indicate the context represents any location within an array (in
         * which case certain features will not work and errors will be somewhat
         * compromised).
         */
        constructor(t, e, n, s, i, r) {
            this.settings = t, this.databaseId = e, this.O = n, this.ignoreUndefinedProperties = s, 
            // Minor hack: If fieldTransforms is undefined, we assume this is an
            // external call and we need to validate the entire path.
            void 0 === i && this.vu(), this.fieldTransforms = i || [], this.fieldMask = r || [];
        }
        get path() {
            return this.settings.path;
        }
        get Vu() {
            return this.settings.Vu;
        }
        /** Returns a new context with the specified settings overwritten. */    Su(t) {
            return new Ma(Object.assign(Object.assign({}, this.settings), t), this.databaseId, this.O, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
        }
        Du(t) {
            var e;
            const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), s = this.Su({
                path: n,
                Cu: !1
            });
            return s.Nu(t), s;
        }
        xu(t) {
            var e;
            const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), s = this.Su({
                path: n,
                Cu: !1
            });
            return s.vu(), s;
        }
        ku(t) {
            // TODO(b/34871131): We don't support array paths right now; so make path
            // undefined.
            return this.Su({
                path: void 0,
                Cu: !0
            });
        }
        Ou(t) {
            return nh(t, this.settings.methodName, this.settings.Mu || !1, this.path, this.settings.$u);
        }
        /** Returns 'true' if 'fieldPath' was traversed when creating this context. */    contains(t) {
            return void 0 !== this.fieldMask.find((e => t.isPrefixOf(e))) || void 0 !== this.fieldTransforms.find((e => t.isPrefixOf(e.field)));
        }
        vu() {
            // TODO(b/34871131): Remove null check once we have proper paths for fields
            // within arrays.
            if (this.path) for (let t = 0; t < this.path.length; t++) this.Nu(this.path.get(t));
        }
        Nu(t) {
            if (0 === t.length) throw this.Ou("Document fields must not be empty");
            if (Oa(this.Vu) && Na.test(t)) throw this.Ou('Document fields cannot begin and end with "__"');
        }
    }

    /**
     * Helper for parsing raw user input (provided via the API) into internal model
     * classes.
     */ class $a {
        constructor(t, e, n) {
            this.databaseId = t, this.ignoreUndefinedProperties = e, this.O = n || Do(t);
        }
        /** Creates a new top-level parse context. */    Fu(t, e, n, s = !1) {
            return new Ma({
                Vu: t,
                methodName: e,
                $u: n,
                path: mt.emptyPath(),
                Cu: !1,
                Mu: s
            }, this.databaseId, this.O, this.ignoreUndefinedProperties);
        }
    }

    function Fa(t) {
        const e = t._freezeSettings(), n = Do(t._databaseId);
        return new $a(t._databaseId, !!e.ignoreUndefinedProperties, n);
    }

    /** Parse document data from a set() call. */ function Ba(t, e, n, s, i, r = {}) {
        const o = t.Fu(r.merge || r.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , e, n, i);
        Xa("Data must be an object, but it was:", o, s);
        const c = Ja(s, o);
        let u, a;
        if (r.merge) u = new gt(o.fieldMask), a = o.fieldTransforms; else if (r.mergeFields) {
            const t = [];
            for (const s of r.mergeFields) {
                const i = Za(e, s, n);
                if (!o.contains(i)) throw new j(G.INVALID_ARGUMENT, `Field '${i}' is specified in your field mask but missing from your input data.`);
                sh(t, i) || t.push(i);
            }
            u = new gt(t), a = o.fieldTransforms.filter((t => u.covers(t.field)));
        } else u = null, a = o.fieldTransforms;
        return new xa(new zt(c), u, a);
    }

    class La extends Da {
        _toFieldTransform(t) {
            if (2 /* MergeSet */ !== t.Vu) throw 1 /* Update */ === t.Vu ? t.Ou(`${this._methodName}() can only appear at the top level of your update data`) : t.Ou(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
            // No transform to add for a delete, but we need to add it to our
            // fieldMask so it gets deleted.
            return t.fieldMask.push(t.path), null;
        }
        isEqual(t) {
            return t instanceof La;
        }
    }

    /** Parse update data from an update() call. */ function Qa(t, e, n, s) {
        const i = t.Fu(1 /* Update */ , e, n);
        Xa("Data must be an object, but it was:", i, s);
        const r = [], o = zt.empty();
        lt(s, ((t, s) => {
            const c = eh(e, t, n);
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    s = getModularInstance(s);
            const u = i.xu(c);
            if (s instanceof La) 
            // Add it to the field mask, but don't add anything to updateData.
            r.push(c); else {
                const t = Ha(s, u);
                null != t && (r.push(c), o.set(c, t));
            }
        }));
        const c = new gt(r);
        return new ka(o, c, i.fieldTransforms);
    }

    /** Parse update data from a list of field/value arguments. */ function Wa(t, e, n, s, i, r) {
        const o = t.Fu(1 /* Update */ , e, n), c = [ Za(e, s, n) ], u = [ i ];
        if (r.length % 2 != 0) throw new j(G.INVALID_ARGUMENT, `Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);
        for (let t = 0; t < r.length; t += 2) c.push(Za(e, r[t])), u.push(r[t + 1]);
        const a = [], h = zt.empty();
        // We iterate in reverse order to pick the last value for a field if the
        // user specified the field multiple times.
        for (let t = c.length - 1; t >= 0; --t) if (!sh(a, c[t])) {
            const e = c[t];
            let n = u[t];
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    n = getModularInstance(n);
            const s = o.xu(e);
            if (n instanceof La) 
            // Add it to the field mask, but don't add anything to updateData.
            a.push(e); else {
                const t = Ha(n, s);
                null != t && (a.push(e), h.set(e, t));
            }
        }
        const l = new gt(a);
        return new ka(h, l, o.fieldTransforms);
    }

    /**
     * Parse a "query value" (e.g. value in a where filter or a value in a cursor
     * bound).
     *
     * @param allowArrays - Whether the query value is an array that may directly
     * contain additional arrays (e.g. the operand of an `in` query).
     */ function za(t, e, n, s = !1) {
        return Ha(n, t.Fu(s ? 4 /* ArrayArgument */ : 3 /* Argument */ , e));
    }

    /**
     * Parses user data to Protobuf Values.
     *
     * @param input - Data to be parsed.
     * @param context - A context object representing the current path being parsed,
     * the source of the data being parsed, etc.
     * @returns The parsed value, or null if the value was a FieldValue sentinel
     * that should not be included in the resulting parsed data.
     */ function Ha(t, e) {
        if (Ya(
        // Unwrap the API type from the Compat SDK. This will return the API type
        // from firestore-exp.
        t = getModularInstance(t))) return Xa("Unsupported field value:", e, t), Ja(t, e);
        if (t instanceof Da) 
        // FieldValues usually parse into transforms (except deleteField())
        // in which case we do not want to include this field in our parsed data
        // (as doing so will overwrite the field directly prior to the transform
        // trying to transform it). So we don't add this location to
        // context.fieldMask and we return null as our parsing result.
        /**
     * "Parses" the provided FieldValueImpl, adding any necessary transforms to
     * context.fieldTransforms.
     */
        return function(t, e) {
            // Sentinels are only supported with writes, and not within arrays.
            if (!Oa(e.Vu)) throw e.Ou(`${t._methodName}() can only be used with update() and set()`);
            if (!e.path) throw e.Ou(`${t._methodName}() is not currently supported inside arrays`);
            const n = t._toFieldTransform(e);
            n && e.fieldTransforms.push(n);
        }
        /**
     * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
     *
     * @returns The parsed value
     */ (t, e), null;
        if (void 0 === t && e.ignoreUndefinedProperties) 
        // If the input is undefined it can never participate in the fieldMask, so
        // don't handle this below. If `ignoreUndefinedProperties` is false,
        // `parseScalarValue` will reject an undefined value.
        return null;
        if (
        // If context.path is null we are inside an array and we don't support
        // field mask paths more granular than the top-level array.
        e.path && e.fieldMask.push(e.path), t instanceof Array) {
            // TODO(b/34871131): Include the path containing the array in the error
            // message.
            // In the case of IN queries, the parsed data is an array (representing
            // the set of values to be included for the IN query) that may directly
            // contain additional arrays (each representing an individual field
            // value), so we disable this validation.
            if (e.settings.Cu && 4 /* ArrayArgument */ !== e.Vu) throw e.Ou("Nested arrays are not supported");
            return function(t, e) {
                const n = [];
                let s = 0;
                for (const i of t) {
                    let t = Ha(i, e.ku(s));
                    null == t && (
                    // Just include nulls in the array for fields being replaced with a
                    // sentinel.
                    t = {
                        nullValue: "NULL_VALUE"
                    }), n.push(t), s++;
                }
                return {
                    arrayValue: {
                        values: n
                    }
                };
            }(t, e);
        }
        return function(t, e) {
            if (null === (t = getModularInstance(t))) return {
                nullValue: "NULL_VALUE"
            };
            if ("number" == typeof t) return Le(e.O, t);
            if ("boolean" == typeof t) return {
                booleanValue: t
            };
            if ("string" == typeof t) return {
                stringValue: t
            };
            if (t instanceof Date) {
                const n = ut.fromDate(t);
                return {
                    timestampValue: Jn(e.O, n)
                };
            }
            if (t instanceof ut) {
                // Firestore backend truncates precision down to microseconds. To ensure
                // offline mode works the same with regards to truncation, perform the
                // truncation immediately without waiting for the backend to do that.
                const n = new ut(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
                return {
                    timestampValue: Jn(e.O, n)
                };
            }
            if (t instanceof Ca) return {
                geoPointValue: {
                    latitude: t.latitude,
                    longitude: t.longitude
                }
            };
            if (t instanceof Sa) return {
                bytesValue: Yn(e.O, t._byteString)
            };
            if (t instanceof Zu) {
                const n = e.databaseId, s = t.firestore._databaseId;
                if (!s.isEqual(n)) throw e.Ou(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);
                return {
                    referenceValue: ts(t.firestore._databaseId || e.databaseId, t._key.path)
                };
            }
            throw e.Ou(`Unsupported field value: ${Wu(t)}`);
        }
        /**
     * Checks whether an object looks like a JSON object that should be converted
     * into a struct. Normal class/prototype instances are considered to look like
     * JSON objects since they should be converted to a struct value. Arrays, Dates,
     * GeoPoints, etc. are not considered to look like JSON objects since they map
     * to specific FieldValue types other than ObjectValue.
     */ (t, e);
    }

    function Ja(t, e) {
        const n = {};
        return ft(t) ? 
        // If we encounter an empty object, we explicitly add it to the update
        // mask to ensure that the server creates a map entry.
        e.path && e.path.length > 0 && e.fieldMask.push(e.path) : lt(t, ((t, s) => {
            const i = Ha(s, e.Du(t));
            null != i && (n[t] = i);
        })), {
            mapValue: {
                fields: n
            }
        };
    }

    function Ya(t) {
        return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof ut || t instanceof Ca || t instanceof Sa || t instanceof Zu || t instanceof Da);
    }

    function Xa(t, e, n) {
        if (!Ya(n) || !function(t) {
            return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
        }(n)) {
            const s = Wu(n);
            throw "an object" === s ? e.Ou(t + " a custom object") : e.Ou(t + " " + s);
        }
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function Za(t, e, n) {
        if ((
        // If required, replace the FieldPath Compat class with with the firestore-exp
        // FieldPath.
        e = getModularInstance(e)) instanceof va) return e._internalPath;
        if ("string" == typeof e) return eh(t, e);
        throw nh("Field path arguments must be of type string or ", t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, n);
    }

    /**
     * Matches any characters in a field path string that are reserved.
     */ const th = new RegExp("[~\\*/\\[\\]]");

    /**
     * Wraps fromDotSeparatedString with an error message about the method that
     * was thrown.
     * @param methodName - The publicly visible method name
     * @param path - The dot-separated string form of a field path which will be
     * split on dots.
     * @param targetDoc - The document against which the field path will be
     * evaluated.
     */ function eh(t, e, n) {
        if (e.search(th) >= 0) throw nh(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`, t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, n);
        try {
            return new va(...e.split("."))._internalPath;
        } catch (s) {
            throw nh(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, t, 
            /* hasConverter= */ !1, 
            /* path= */ void 0, n);
        }
    }

    function nh(t, e, n, s, i) {
        const r = s && !s.isEmpty(), o = void 0 !== i;
        let c = `Function ${e}() called with invalid data`;
        n && (c += " (via `toFirestore()`)"), c += ". ";
        let u = "";
        return (r || o) && (u += " (found", r && (u += ` in field ${s}`), o && (u += ` in document ${i}`), 
        u += ")"), new j(G.INVALID_ARGUMENT, c + t + u);
    }

    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */ function sh(t, e) {
        return t.some((t => t.isEqual(e)));
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A `DocumentSnapshot` contains data read from a document in your Firestore
     * database. The data can be extracted with `.data()` or `.get(<field>)` to
     * get a specific field.
     *
     * For a `DocumentSnapshot` that points to a non-existing document, any data
     * access will return 'undefined'. You can use the `exists()` method to
     * explicitly verify a document's existence.
     */ class ih {
        // Note: This class is stripped down version of the DocumentSnapshot in
        // the legacy SDK. The changes are:
        // - No support for SnapshotMetadata.
        // - No support for SnapshotOptions.
        /** @hideconstructor protected */
        constructor(t, e, n, s, i) {
            this._firestore = t, this._userDataWriter = e, this._key = n, this._document = s, 
            this._converter = i;
        }
        /** Property of the `DocumentSnapshot` that provides the document's ID. */    get id() {
            return this._key.path.lastSegment();
        }
        /**
         * The `DocumentReference` for the document included in the `DocumentSnapshot`.
         */    get ref() {
            return new Zu(this._firestore, this._converter, this._key);
        }
        /**
         * Signals whether or not the document at the snapshot's location exists.
         *
         * @returns true if the document exists.
         */    exists() {
            return null !== this._document;
        }
        /**
         * Retrieves all fields in the document as an `Object`. Returns `undefined` if
         * the document doesn't exist.
         *
         * @returns An `Object` containing all fields in the document or `undefined`
         * if the document doesn't exist.
         */    data() {
            if (this._document) {
                if (this._converter) {
                    // We only want to use the converter and create a new DocumentSnapshot
                    // if a converter has been provided.
                    const t = new rh(this._firestore, this._userDataWriter, this._key, this._document, 
                    /* converter= */ null);
                    return this._converter.fromFirestore(t);
                }
                return this._userDataWriter.convertValue(this._document.data.value);
            }
        }
        /**
         * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
         * document or field doesn't exist.
         *
         * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
         * field.
         * @returns The data at the specified field location or undefined if no such
         * field exists in the document.
         */
        // We are using `any` here to avoid an explicit cast by our users.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        get(t) {
            if (this._document) {
                const e = this._document.data.field(oh("DocumentSnapshot.get", t));
                if (null !== e) return this._userDataWriter.convertValue(e);
            }
        }
    }

    /**
     * A `QueryDocumentSnapshot` contains data read from a document in your
     * Firestore database as part of a query. The document is guaranteed to exist
     * and its data can be extracted with `.data()` or `.get(<field>)` to get a
     * specific field.
     *
     * A `QueryDocumentSnapshot` offers the same API surface as a
     * `DocumentSnapshot`. Since query results contain only existing documents, the
     * `exists` property will always be true and `data()` will never return
     * 'undefined'.
     */ class rh extends ih {
        /**
         * Retrieves all fields in the document as an `Object`.
         *
         * @override
         * @returns An `Object` containing all fields in the document.
         */
        data() {
            return super.data();
        }
    }

    /**
     * Helper that calls `fromDotSeparatedString()` but wraps any error thrown.
     */ function oh(t, e) {
        return "string" == typeof e ? eh(t, e) : e instanceof va ? e._internalPath : e._delegate._internalPath;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Metadata about a snapshot, describing the state of the snapshot.
     */ class ch {
        /** @hideconstructor */
        constructor(t, e) {
            this.hasPendingWrites = t, this.fromCache = e;
        }
        /**
         * Returns true if this `SnapshotMetadata` is equal to the provided one.
         *
         * @param other - The `SnapshotMetadata` to compare against.
         * @returns true if this `SnapshotMetadata` is equal to the provided one.
         */    isEqual(t) {
            return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
        }
    }

    /**
     * A `DocumentSnapshot` contains data read from a document in your Firestore
     * database. The data can be extracted with `.data()` or `.get(<field>)` to
     * get a specific field.
     *
     * For a `DocumentSnapshot` that points to a non-existing document, any data
     * access will return 'undefined'. You can use the `exists()` method to
     * explicitly verify a document's existence.
     */ class uh extends ih {
        /** @hideconstructor protected */
        constructor(t, e, n, s, i, r) {
            super(t, e, n, s, r), this._firestore = t, this._firestoreImpl = t, this.metadata = i;
        }
        /**
         * Returns whether or not the data exists. True if the document exists.
         */    exists() {
            return super.exists();
        }
        /**
         * Retrieves all fields in the document as an `Object`. Returns `undefined` if
         * the document doesn't exist.
         *
         * By default, `serverTimestamp()` values that have not yet been
         * set to their final value will be returned as `null`. You can override
         * this by passing an options object.
         *
         * @param options - An options object to configure how data is retrieved from
         * the snapshot (for example the desired behavior for server timestamps that
         * have not yet been set to their final value).
         * @returns An `Object` containing all fields in the document or `undefined` if
         * the document doesn't exist.
         */    data(t = {}) {
            if (this._document) {
                if (this._converter) {
                    // We only want to use the converter and create a new DocumentSnapshot
                    // if a converter has been provided.
                    const e = new ah(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, 
                    /* converter= */ null);
                    return this._converter.fromFirestore(e, t);
                }
                return this._userDataWriter.convertValue(this._document.data.value, t.serverTimestamps);
            }
        }
        /**
         * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
         * document or field doesn't exist.
         *
         * By default, a `serverTimestamp()` that has not yet been set to
         * its final value will be returned as `null`. You can override this by
         * passing an options object.
         *
         * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
         * field.
         * @param options - An options object to configure how the field is retrieved
         * from the snapshot (for example the desired behavior for server timestamps
         * that have not yet been set to their final value).
         * @returns The data at the specified field location or undefined if no such
         * field exists in the document.
         */
        // We are using `any` here to avoid an explicit cast by our users.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        get(t, e = {}) {
            if (this._document) {
                const n = this._document.data.field(oh("DocumentSnapshot.get", t));
                if (null !== n) return this._userDataWriter.convertValue(n, e.serverTimestamps);
            }
        }
    }

    /**
     * A `QueryDocumentSnapshot` contains data read from a document in your
     * Firestore database as part of a query. The document is guaranteed to exist
     * and its data can be extracted with `.data()` or `.get(<field>)` to get a
     * specific field.
     *
     * A `QueryDocumentSnapshot` offers the same API surface as a
     * `DocumentSnapshot`. Since query results contain only existing documents, the
     * `exists` property will always be true and `data()` will never return
     * 'undefined'.
     */ class ah extends uh {
        /**
         * Retrieves all fields in the document as an `Object`.
         *
         * By default, `serverTimestamp()` values that have not yet been
         * set to their final value will be returned as `null`. You can override
         * this by passing an options object.
         *
         * @override
         * @param options - An options object to configure how data is retrieved from
         * the snapshot (for example the desired behavior for server timestamps that
         * have not yet been set to their final value).
         * @returns An `Object` containing all fields in the document.
         */
        data(t = {}) {
            return super.data(t);
        }
    }

    /**
     * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
     * representing the results of a query. The documents can be accessed as an
     * array via the `docs` property or enumerated using the `forEach` method. The
     * number of documents can be determined via the `empty` and `size`
     * properties.
     */ class hh {
        /** @hideconstructor */
        constructor(t, e, n, s) {
            this._firestore = t, this._userDataWriter = e, this._snapshot = s, this.metadata = new ch(s.hasPendingWrites, s.fromCache), 
            this.query = n;
        }
        /** An array of all the documents in the `QuerySnapshot`. */    get docs() {
            const t = [];
            return this.forEach((e => t.push(e))), t;
        }
        /** The number of documents in the `QuerySnapshot`. */    get size() {
            return this._snapshot.docs.size;
        }
        /** True if there are no documents in the `QuerySnapshot`. */    get empty() {
            return 0 === this.size;
        }
        /**
         * Enumerates all of the documents in the `QuerySnapshot`.
         *
         * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
         * each document in the snapshot.
         * @param thisArg - The `this` binding for the callback.
         */    forEach(t, e) {
            this._snapshot.docs.forEach((n => {
                t.call(e, new ah(this._firestore, this._userDataWriter, n.key, n, new ch(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache), this.query.converter));
            }));
        }
        /**
         * Returns an array of the documents changes since the last snapshot. If this
         * is the first snapshot, all documents will be in the list as 'added'
         * changes.
         *
         * @param options - `SnapshotListenOptions` that control whether metadata-only
         * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
         * snapshot events.
         */    docChanges(t = {}) {
            const e = !!t.includeMetadataChanges;
            if (e && this._snapshot.excludesMetadataChanges) throw new j(G.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
            return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = 
            /** Calculates the array of `DocumentChange`s for a given `ViewSnapshot`. */
            function(t, e) {
                if (t._snapshot.oldDocs.isEmpty()) {
                    let e = 0;
                    return t._snapshot.docChanges.map((n => ({
                        type: "added",
                        doc: new ah(t._firestore, t._userDataWriter, n.doc.key, n.doc, new ch(t._snapshot.mutatedKeys.has(n.doc.key), t._snapshot.fromCache), t.query.converter),
                        oldIndex: -1,
                        newIndex: e++
                    })));
                }
                {
                    // A `DocumentSet` that is updated incrementally as changes are applied to use
                    // to lookup the index of a document.
                    let n = t._snapshot.oldDocs;
                    return t._snapshot.docChanges.filter((t => e || 3 /* Metadata */ !== t.type)).map((e => {
                        const s = new ah(t._firestore, t._userDataWriter, e.doc.key, e.doc, new ch(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter);
                        let i = -1, r = -1;
                        return 0 /* Added */ !== e.type && (i = n.indexOf(e.doc.key), n = n.delete(e.doc.key)), 
                        1 /* Removed */ !== e.type && (n = n.add(e.doc), r = n.indexOf(e.doc.key)), {
                            type: lh(e.type),
                            doc: s,
                            oldIndex: i,
                            newIndex: r
                        };
                    }));
                }
            }(this, e), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges;
        }
    }

    function lh(t) {
        switch (t) {
          case 0 /* Added */ :
            return "added";

          case 2 /* Modified */ :
          case 3 /* Metadata */ :
            return "modified";

          case 1 /* Removed */ :
            return "removed";

          default:
            return L();
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ function dh(t) {
        if (Pe(t) && 0 === t.explicitOrderBy.length) throw new j(G.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
    }

    /**
     * A `QueryConstraint` is used to narrow the set of documents returned by a
     * Firestore query. `QueryConstraint`s are created by invoking {@link where},
     * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
     * endBefore:1}, {@link (endAt:1)}, {@link limit} or {@link limitToLast} and
     * can then be passed to {@link query} to create a new query instance that
     * also contains this `QueryConstraint`.
     */ class _h {}

    /**
     * Creates a new immutable instance of {@link Query} that is extended to also include
     * additional query constraints.
     *
     * @param query - The {@link Query} instance to use as a base for the new constraints.
     * @param queryConstraints - The list of {@link QueryConstraint}s to apply.
     * @throws if any of the provided query constraints cannot be combined with the
     * existing or new constraints.
     */ function wh(t, ...e) {
        for (const n of e) t = n._apply(t);
        return t;
    }

    class mh extends _h {
        constructor(t, e, n) {
            super(), this.Uu = t, this.qu = e, this.Ku = n, this.type = "where";
        }
        _apply(t) {
            const e = Fa(t.firestore), n = function(t, e, n, s, i, r, o) {
                let c;
                if (i.isKeyField()) {
                    if ("array-contains" /* ARRAY_CONTAINS */ === r || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === r) throw new j(G.INVALID_ARGUMENT, `Invalid Query. You can't perform '${r}' queries on documentId().`);
                    if ("in" /* IN */ === r || "not-in" /* NOT_IN */ === r) {
                        Ch(o, r);
                        const e = [];
                        for (const n of o) e.push(Dh(s, t, n));
                        c = {
                            arrayValue: {
                                values: e
                            }
                        };
                    } else c = Dh(s, t, o);
                } else "in" /* IN */ !== r && "not-in" /* NOT_IN */ !== r && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== r || Ch(o, r), 
                c = za(n, e, o, 
                /* allowArrays= */ "in" /* IN */ === r || "not-in" /* NOT_IN */ === r);
                const u = ce.create(i, r, c);
                return function(t, e) {
                    if (e.S()) {
                        const n = ve(t);
                        if (null !== n && !n.isEqual(e.field)) throw new j(G.INVALID_ARGUMENT, `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${e.field.toString()}'`);
                        const s = be(t);
                        null !== s && Nh(t, e.field, s);
                    }
                    const n = function(t, e) {
                        for (const n of t.filters) if (e.indexOf(n.op) >= 0) return n.op;
                        return null;
                    }(t, 
                    /**
     * Given an operator, returns the set of operators that cannot be used with it.
     *
     * Operators in a query must adhere to the following set of rules:
     * 1. Only one array operator is allowed.
     * 2. Only one disjunctive operator is allowed.
     * 3. `NOT_EQUAL` cannot be used with another `NOT_EQUAL` operator.
     * 4. `NOT_IN` cannot be used with array, disjunctive, or `NOT_EQUAL` operators.
     *
     * Array operators: `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ANY`
     * Disjunctive operators: `IN`, `ARRAY_CONTAINS_ANY`, `NOT_IN`
     */
                    function(t) {
                        switch (t) {
                          case "!=" /* NOT_EQUAL */ :
                            return [ "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ];

                          case "array-contains" /* ARRAY_CONTAINS */ :
                            return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "not-in" /* NOT_IN */ ];

                          case "in" /* IN */ :
                            return [ "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                          case "array-contains-any" /* ARRAY_CONTAINS_ANY */ :
                            return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                          case "not-in" /* NOT_IN */ :
                            return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ , "!=" /* NOT_EQUAL */ ];

                          default:
                            return [];
                        }
                    }(e.op));
                    if (null !== n) 
                    // Special case when it's a duplicate op to give a slightly clearer error message.
                    throw n === e.op ? new j(G.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${e.op.toString()}' filter.`) : new j(G.INVALID_ARGUMENT, `Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`);
                }(t, u), u;
            }(t._query, "where", e, t.firestore._databaseId, this.Uu, this.qu, this.Ku);
            return new ta(t.firestore, t.converter, function(t, e) {
                const n = t.filters.concat([ e ]);
                return new Ee(t.path, t.collectionGroup, t.explicitOrderBy.slice(), n, t.limit, t.limitType, t.startAt, t.endAt);
            }(t._query, n));
        }
    }

    /**
     * Creates a {@link QueryConstraint} that enforces that documents must contain the
     * specified field and that the value should satisfy the relation constraint
     * provided.
     *
     * @param fieldPath - The path to compare
     * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
     *   "&lt;=", "!=").
     * @param value - The value for comparison
     * @returns The created {@link Query}.
     */ function gh(t, e, n) {
        const s = e, i = oh("where", t);
        return new mh(i, s, n);
    }

    function Dh(t, e, n) {
        if ("string" == typeof (n = getModularInstance(n))) {
            if ("" === n) throw new j(G.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
            if (!Ve(e) && -1 !== n.indexOf("/")) throw new j(G.INVALID_ARGUMENT, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
            const s = e.path.child(_t.fromString(n));
            if (!Nt.isDocumentKey(s)) throw new j(G.INVALID_ARGUMENT, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);
            return Ut(t, new Nt(s));
        }
        if (n instanceof Zu) return Ut(t, n._key);
        throw new j(G.INVALID_ARGUMENT, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Wu(n)}.`);
    }

    /**
     * Validates that the value passed into a disjunctive filter satisfies all
     * array requirements.
     */ function Ch(t, e) {
        if (!Array.isArray(t) || 0 === t.length) throw new j(G.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);
        if (t.length > 10) throw new j(G.INVALID_ARGUMENT, `Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`);
    }

    function Nh(t, e, n) {
        if (!n.isEqual(e)) throw new j(G.INVALID_ARGUMENT, `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Converts Firestore's internal types to the JavaScript types that we expose
     * to the user.
     *
     * @internal
     */ class xh {
        convertValue(t, e = "none") {
            switch (kt(t)) {
              case 0 /* NullValue */ :
                return null;

              case 1 /* BooleanValue */ :
                return t.booleanValue;

              case 2 /* NumberValue */ :
                return Tt(t.integerValue || t.doubleValue);

              case 3 /* TimestampValue */ :
                return this.convertTimestamp(t.timestampValue);

              case 4 /* ServerTimestampValue */ :
                return this.convertServerTimestamp(t, e);

              case 5 /* StringValue */ :
                return t.stringValue;

              case 6 /* BlobValue */ :
                return this.convertBytes(At(t.bytesValue));

              case 7 /* RefValue */ :
                return this.convertReference(t.referenceValue);

              case 8 /* GeoPointValue */ :
                return this.convertGeoPoint(t.geoPointValue);

              case 9 /* ArrayValue */ :
                return this.convertArray(t.arrayValue, e);

              case 10 /* ObjectValue */ :
                return this.convertObject(t.mapValue, e);

              default:
                throw L();
            }
        }
        convertObject(t, e) {
            const n = {};
            return lt(t.fields, ((t, s) => {
                n[t] = this.convertValue(s, e);
            })), n;
        }
        convertGeoPoint(t) {
            return new Ca(Tt(t.latitude), Tt(t.longitude));
        }
        convertArray(t, e) {
            return (t.values || []).map((t => this.convertValue(t, e)));
        }
        convertServerTimestamp(t, e) {
            switch (e) {
              case "previous":
                const n = Pt(t);
                return null == n ? null : this.convertValue(n, e);

              case "estimate":
                return this.convertTimestamp(bt(t));

              default:
                return null;
            }
        }
        convertTimestamp(t) {
            const e = Et(t);
            return new ut(e.seconds, e.nanos);
        }
        convertDocumentKey(t, e) {
            const n = _t.fromString(t);
            U(vs(n));
            const s = new Vt(n.get(1), n.get(3)), i = new Nt(n.popFirst(5));
            return s.isEqual(e) || 
            // TODO(b/64130202): Somehow support foreign references.
            $(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`), 
            i;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Converts custom model object of type T into `DocumentData` by applying the
     * converter if it exists.
     *
     * This function is used when converting user objects to `DocumentData`
     * because we want to provide the user with a more specific error message if
     * their `set()` or fails due to invalid data originating from a `toFirestore()`
     * call.
     */ function kh(t, e, n) {
        let s;
        // Cast to `any` in order to satisfy the union type constraint on
        // toFirestore().
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return s = t ? n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e) : e, 
        s;
    }

    class Bh extends xh {
        constructor(t) {
            super(), this.firestore = t;
        }
        convertBytes(t) {
            return new Sa(t);
        }
        convertReference(t) {
            const e = this.convertDocumentKey(t, this.firestore._databaseId);
            return new Zu(this.firestore, /* converter= */ null, e);
        }
    }

    function Qh(t, e, n, ...s) {
        t = zu(t, Zu);
        const i = zu(t.firestore, la), r = Fa(i);
        let o;
        o = "string" == typeof (
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
        e = getModularInstance(e)) || e instanceof va ? Wa(r, "updateDoc", t._key, e, n, s) : Qa(r, "updateDoc", t._key, e);
        return Yh(i, [ o.toMutation(t._key, nn.exists(!0)) ]);
    }

    /**
     * Deletes the document referred to by the specified `DocumentReference`.
     *
     * @param reference - A reference to the document to delete.
     * @returns A Promise resolved once the document has been successfully
     * deleted from the backend (note that it won't resolve while you're offline).
     */ function Wh(t) {
        return Yh(zu(t.firestore, la), [ new mn(t._key, nn.none()) ]);
    }

    /**
     * Add a new document to specified `CollectionReference` with the given data,
     * assigning it a document ID automatically.
     *
     * @param reference - A reference to the collection to add this document to.
     * @param data - An Object containing the data for the new document.
     * @returns A `Promise` resolved with a `DocumentReference` pointing to the
     * newly created document after it has been written to the backend (Note that it
     * won't resolve while you're offline).
     */ function zh(t, e) {
        const n = zu(t.firestore, la), s = ia(t), i = kh(t.converter, e);
        return Yh(n, [ Ba(Fa(t.firestore), "addDoc", s._key, i, null !== t.converter, {}).toMutation(s._key, nn.exists(!1)) ]).then((() => s));
    }

    function Hh(t, ...e) {
        var n, s, i;
        t = getModularInstance(t);
        let r = {
            includeMetadataChanges: !1
        }, o = 0;
        "object" != typeof e[o] || ua(e[o]) || (r = e[o], o++);
        const c = {
            includeMetadataChanges: r.includeMetadataChanges
        };
        if (ua(e[o])) {
            const t = e[o];
            e[o] = null === (n = t.next) || void 0 === n ? void 0 : n.bind(t), e[o + 1] = null === (s = t.error) || void 0 === s ? void 0 : s.bind(t), 
            e[o + 2] = null === (i = t.complete) || void 0 === i ? void 0 : i.bind(t);
        }
        let u, a, h;
        if (t instanceof Zu) a = zu(t.firestore, la), h = Ae(t._key.path), u = {
            next: n => {
                e[o] && e[o](Xh(a, t, n));
            },
            error: e[o + 1],
            complete: e[o + 2]
        }; else {
            const n = zu(t, ta);
            a = zu(n.firestore, la), h = n._query;
            const s = new Bh(a);
            u = {
                next: t => {
                    e[o] && e[o](new hh(a, s, n, t));
                },
                error: e[o + 1],
                complete: e[o + 2]
            }, dh(t._query);
        }
        return function(t, e, n, s) {
            const i = new yu(s), r = new Rc(e, i, n);
            return t.asyncQueue.enqueueAndForget((async () => pc(await Cu(t), r))), () => {
                i.Jc(), t.asyncQueue.enqueueAndForget((async () => Ic(await Cu(t), r)));
            };
        }(_a(a), h, c, u);
    }

    /**
     * Locally writes `mutations` on the async queue.
     * @internal
     */ function Yh(t, e) {
        return function(t, e) {
            const n = new Q;
            return t.asyncQueue.enqueueAndForget((async () => Fc(await Du(t), e, n))), n.promise;
        }(_a(t), e);
    }

    /**
     * Converts a {@link ViewSnapshot} that contains the single document specified by `ref`
     * to a {@link DocumentSnapshot}.
     */ function Xh(t, e, n) {
        const s = n.docs.get(e._key), i = new Bh(t);
        return new uh(t, i, e._key, s, new ch(n.hasPendingWrites, n.fromCache), e.converter);
    }

    /**
     * Cloud Firestore
     *
     * @packageDocumentation
     */ !function(t, e = !0) {
        !function(t) {
            N = t;
        }(SDK_VERSION), _registerComponent(new Component("firestore", ((t, {options: n}) => {
            const s = t.getProvider("app").getImmediate(), i = new la(s, new J(t.getProvider("auth-internal")), new tt(t.getProvider("app-check-internal")));
            return n = Object.assign({
                useFetchStreams: e
            }, n), i._setSettings(n), i;
        }), "PUBLIC")), registerVersion(D, "3.4.5", t), 
        // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
        registerVersion(D, "3.4.5", "esm2017");
    }();

    const firebaseConfig = {
        apiKey: "AIzaSyB_f8lc2VDV4YbjCy7KGrlt0AX0dc5HFzQ",
        authDomain: "to-do-15be2.firebaseapp.com",
        projectId: "to-do-15be2",
        storageBucket: "to-do-15be2.appspot.com",
        messagingSenderId: "909729047068",
        appId: "1:909729047068:web:a6b0662b2b7daae485b5d9",
      };

      initializeApp(firebaseConfig);

      const db = da();
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

    /* src\components\Navbar.svelte generated by Svelte v3.46.4 */
    const file$3 = "src\\components\\Navbar.svelte";

    // (31:2) <Link to="/">
    function create_default_slot$3(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "to-do";
    			add_location(h1, file$3, 30, 15, 726);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(31:2) <Link to=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block_1(ctx) {
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Sign in";
    			attr_dev(button, "class", "svelte-1v5twn1");
    			add_location(button, file$3, 43, 4, 1093);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler_3*/ ctx[9], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (32:2) {#if isLoggedIn}
    function create_if_block$2(ctx) {
    	let if_block_anchor;

    	function select_block_type_1(ctx, dirty) {
    		if (!/*imgClick*/ ctx[2]) return create_if_block_1$2;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(32:2) {#if isLoggedIn}",
    		ctx
    	});

    	return block;
    }

    // (35:4) {:else}
    function create_else_block(ctx) {
    	let div;
    	let button0;
    	let t1;
    	let button1;
    	let strong;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "Log out";
    			t1 = space();
    			button1 = element("button");
    			strong = element("strong");
    			strong.textContent = "??";
    			attr_dev(button0, "class", "svelte-1v5twn1");
    			add_location(button0, file$3, 36, 8, 894);
    			attr_dev(strong, "class", "svelte-1v5twn1");
    			add_location(strong, file$3, 38, 11, 1008);
    			attr_dev(button1, "class", "svelte-1v5twn1");
    			add_location(button1, file$3, 37, 8, 954);
    			add_location(div, file$3, 35, 6, 879);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(div, t1);
    			append_dev(div, button1);
    			append_dev(button1, strong);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler_1*/ ctx[7], false, false, false),
    					listen_dev(button1, "click", /*click_handler_2*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(35:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (33:4) {#if !imgClick}
    function create_if_block_1$2(ctx) {
    	let img;
    	let img_src_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*userImg*/ ctx[1])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-1v5twn1");
    			add_location(img, file$3, 33, 6, 796);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);

    			if (!mounted) {
    				dispose = listen_dev(img, "click", /*click_handler*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*userImg*/ 2 && !src_url_equal(img.src, img_src_value = /*userImg*/ ctx[1])) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(33:4) {#if !imgClick}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let navbar;
    	let link;
    	let t;
    	let current;

    	link = new Link({
    			props: {
    				to: "/",
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function select_block_type(ctx, dirty) {
    		if (/*isLoggedIn*/ ctx[0]) return create_if_block$2;
    		return create_else_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			navbar = element("navbar");
    			create_component(link.$$.fragment);
    			t = space();
    			if_block.c();
    			attr_dev(navbar, "class", "svelte-1v5twn1");
    			add_location(navbar, file$3, 29, 0, 701);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, navbar, anchor);
    			mount_component(link, navbar, null);
    			append_dev(navbar, t);
    			if_block.m(navbar, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const link_changes = {};

    			if (dirty & /*$$scope*/ 1024) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(navbar, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(navbar);
    			destroy_component(link);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navbar', slots, []);
    	let isLoggedIn = true;
    	let userImg;
    	let imgClick = false;

    	const signIn = () => {
    		signInWithPopup(auth, provider);
    		$$invalidate(2, imgClick = false);
    	};

    	const logOut = () => {
    		signOut(auth);
    		navigate("/");
    	};

    	auth.onAuthStateChanged(user => {
    		if (user) {
    			$$invalidate(0, isLoggedIn = true);
    			$$invalidate(1, userImg = user.photoURL);
    		} else {
    			$$invalidate(0, isLoggedIn = false);
    		}
    	});

    	const handleImgClick = () => {
    		$$invalidate(2, imgClick = !imgClick);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navbar> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => handleImgClick();
    	const click_handler_1 = () => logOut();
    	const click_handler_2 = () => handleImgClick();
    	const click_handler_3 = () => signIn();

    	$$self.$capture_state = () => ({
    		Link,
    		navigate,
    		signInWithPopup,
    		signOut,
    		auth,
    		provider,
    		isLoggedIn,
    		userImg,
    		imgClick,
    		signIn,
    		logOut,
    		handleImgClick
    	});

    	$$self.$inject_state = $$props => {
    		if ('isLoggedIn' in $$props) $$invalidate(0, isLoggedIn = $$props.isLoggedIn);
    		if ('userImg' in $$props) $$invalidate(1, userImg = $$props.userImg);
    		if ('imgClick' in $$props) $$invalidate(2, imgClick = $$props.imgClick);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		isLoggedIn,
    		userImg,
    		imgClick,
    		signIn,
    		logOut,
    		handleImgClick,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3
    	];
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\components\Home.svelte generated by Svelte v3.46.4 */

    const file$2 = "src\\components\\Home.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (91:22) 
    function create_if_block_5(ctx) {
    	let div2;
    	let div0;
    	let t;
    	let div1;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t = space();
    			div1 = element("div");
    			attr_dev(div0, "class", "svelte-15ovl4e");
    			add_location(div0, file$2, 92, 6, 2598);
    			attr_dev(div1, "class", "svelte-15ovl4e");
    			add_location(div1, file$2, 93, 6, 2613);
    			attr_dev(div2, "class", "lds-ripple svelte-15ovl4e");
    			add_location(div2, file$2, 91, 4, 2566);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t);
    			append_dev(div2, div1);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(91:22) ",
    		ctx
    	});

    	return block;
    }

    // (87:43) 
    function create_if_block_4(ctx) {
    	let img;
    	let img_src_value;
    	let t0;
    	let h2;
    	let t2;
    	let h3;

    	const block = {
    		c: function create() {
    			img = element("img");
    			t0 = space();
    			h2 = element("h2");
    			h2.textContent = "There are no tasks here.";
    			t2 = space();
    			h3 = element("h3");
    			h3.textContent = "Create tasks by clicking on the ??? button.";
    			if (!src_url_equal(img.src, img_src_value = "icons/astonishedFace.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "astonishedFace svelte-15ovl4e");
    			attr_dev(img, "alt", "no data");
    			add_location(img, file$2, 87, 4, 2366);
    			add_location(h2, file$2, 88, 4, 2447);
    			add_location(h3, file$2, 89, 4, 2486);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, h3, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(h3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(87:43) ",
    		ctx
    	});

    	return block;
    }

    // (84:24) 
    function create_if_block_3(ctx) {
    	let img;
    	let img_src_value;
    	let t0;
    	let h2;

    	const block = {
    		c: function create() {
    			img = element("img");
    			t0 = space();
    			h2 = element("h2");
    			h2.textContent = "Hello there! Kindly sign-in to create tasks.";
    			if (!src_url_equal(img.src, img_src_value = "icons/happyFace.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "happyFace svelte-15ovl4e");
    			attr_dev(img, "alt", "");
    			add_location(img, file$2, 84, 4, 2198);
    			add_location(h2, file$2, 85, 4, 2262);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, h2, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(84:24) ",
    		ctx
    	});

    	return block;
    }

    // (56:2) {#if isLoggedIn && tasks.length > 0}
    function create_if_block_1$1(ctx) {
    	let each_1_anchor;
    	let each_value = /*tasks*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tasks, handleDelete, taskCompleted*/ 25) {
    				each_value = /*tasks*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(56:2) {#if isLoggedIn && tasks.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (68:10) {#if task.description.length > 0}
    function create_if_block_2$1(ctx) {
    	let div;
    	let p;
    	let t_value = /*task*/ ctx[9].description + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t = text(t_value);
    			add_location(p, file$2, 69, 14, 1842);
    			attr_dev(div, "class", "below-sec svelte-15ovl4e");
    			add_location(div, file$2, 68, 12, 1803);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tasks*/ 1 && t_value !== (t_value = /*task*/ ctx[9].description + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(68:10) {#if task.description.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (57:4) {#each tasks as task}
    function create_each_block(ctx) {
    	let div1;
    	let section0;
    	let div0;
    	let span;
    	let t0;
    	let h4;
    	let t1_value = /*task*/ ctx[9].title + "";
    	let t1;
    	let t2;
    	let t3;
    	let section1;
    	let img;
    	let img_src_value;
    	let t4;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[5](/*task*/ ctx[9]);
    	}

    	let if_block = /*task*/ ctx[9].description.length > 0 && create_if_block_2$1(ctx);

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[6](/*task*/ ctx[9]);
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			section0 = element("section");
    			div0 = element("div");
    			span = element("span");
    			t0 = space();
    			h4 = element("h4");
    			t1 = text(t1_value);
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			section1 = element("section");
    			img = element("img");
    			t4 = space();
    			attr_dev(span, "class", "checkbox svelte-15ovl4e");
    			toggle_class(span, "checked", /*task*/ ctx[9].isComplete);
    			add_location(span, file$2, 60, 12, 1539);
    			add_location(h4, file$2, 65, 12, 1705);
    			attr_dev(div0, "class", "left-sec svelte-15ovl4e");
    			add_location(div0, file$2, 59, 10, 1503);
    			attr_dev(section0, "class", "section1");
    			add_location(section0, file$2, 58, 8, 1465);
    			if (!src_url_equal(img.src, img_src_value = "icons/delete.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "deleteIcon svelte-15ovl4e");
    			attr_dev(img, "alt", "delete");
    			add_location(img, file$2, 74, 10, 1955);
    			add_location(section1, file$2, 73, 8, 1934);
    			attr_dev(div1, "class", "task svelte-15ovl4e");
    			toggle_class(div1, "complete", /*task*/ ctx[9].isComplete);
    			add_location(div1, file$2, 57, 6, 1404);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, section0);
    			append_dev(section0, div0);
    			append_dev(div0, span);
    			append_dev(div0, t0);
    			append_dev(div0, h4);
    			append_dev(h4, t1);
    			append_dev(section0, t2);
    			if (if_block) if_block.m(section0, null);
    			append_dev(div1, t3);
    			append_dev(div1, section1);
    			append_dev(section1, img);
    			append_dev(div1, t4);

    			if (!mounted) {
    				dispose = [
    					listen_dev(span, "click", click_handler, false, false, false),
    					listen_dev(img, "click", click_handler_1, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*tasks*/ 1) {
    				toggle_class(span, "checked", /*task*/ ctx[9].isComplete);
    			}

    			if (dirty & /*tasks*/ 1 && t1_value !== (t1_value = /*task*/ ctx[9].title + "")) set_data_dev(t1, t1_value);

    			if (/*task*/ ctx[9].description.length > 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2$1(ctx);
    					if_block.c();
    					if_block.m(section0, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*tasks*/ 1) {
    				toggle_class(div1, "complete", /*task*/ ctx[9].isComplete);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(57:4) {#each tasks as task}",
    		ctx
    	});

    	return block;
    }

    // (98:0) {#if isLoggedIn}
    function create_if_block$1(ctx) {
    	let link;
    	let current;

    	link = new Link({
    			props: {
    				to: "create",
    				title: "Create",
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(link.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(link, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(link, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(98:0) {#if isLoggedIn}",
    		ctx
    	});

    	return block;
    }

    // (99:2) <Link to="create" title="Create">
    function create_default_slot$2(ctx) {
    	let a;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "icons/createSymbol.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "class", "my-float svelte-15ovl4e");
    			attr_dev(img, "alt", "Create");
    			add_location(img, file$2, 100, 6, 2750);
    			attr_dev(a, "href", "create");
    			attr_dev(a, "class", "float svelte-15ovl4e");
    			add_location(a, file$2, 99, 4, 2711);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, img);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(99:2) <Link to=\\\"create\\\" title=\\\"Create\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let main;
    	let h2;
    	let t1;
    	let t2;
    	let if_block1_anchor;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*isLoggedIn*/ ctx[1] && /*tasks*/ ctx[0].length > 0) return create_if_block_1$1;
    		if (!/*isLoggedIn*/ ctx[1]) return create_if_block_3;
    		if (/*tasks*/ ctx[0].length < 1 && !/*isPending*/ ctx[2]) return create_if_block_4;
    		if (/*isPending*/ ctx[2]) return create_if_block_5;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type && current_block_type(ctx);
    	let if_block1 = /*isLoggedIn*/ ctx[1] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			h2 = element("h2");
    			h2.textContent = "Tasks";
    			t1 = space();
    			if (if_block0) if_block0.c();
    			t2 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    			add_location(h2, file$2, 54, 2, 1315);
    			add_location(main, file$2, 53, 0, 1305);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h2);
    			append_dev(main, t1);
    			if (if_block0) if_block0.m(main, null);
    			insert_dev(target, t2, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if (if_block0) if_block0.d(1);
    				if_block0 = current_block_type && current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(main, null);
    				}
    			}

    			if (/*isLoggedIn*/ ctx[1]) {
    				if (if_block1) {
    					if (dirty & /*isLoggedIn*/ 2) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);

    			if (if_block0) {
    				if_block0.d();
    			}

    			if (detaching) detach_dev(t2);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	let colRef;
    	let tasks = [];
    	let unsubscribe;
    	let isLoggedIn = true;
    	let isPending = true;

    	auth.onAuthStateChanged(user => {
    		if (user) {
    			$$invalidate(1, isLoggedIn = true);
    			colRef = na(db, "tasks");
    			const userData = wh(na(db, "tasks"), gh("uid", "==", user.uid));

    			unsubscribe = Hh(userData, querySnapshot => {
    				let storedTasks = [];

    				querySnapshot.forEach(doc => {
    					let task = { ...doc.data(), id: doc.id };
    					storedTasks = [task, ...storedTasks];
    				});

    				$$invalidate(0, tasks = storedTasks.sort(value => value.isComplete ? 1 : -1));
    				$$invalidate(2, isPending = false);
    			});
    		} else {
    			$$invalidate(1, isLoggedIn = false);
    			unsubscribe && unsubscribe();
    		}
    	});

    	const taskCompleted = async task => {
    		await Qh(ia(db, "tasks", task.id), { isComplete: !task.isComplete });
    	};

    	const handleDelete = async id => {
    		await Wh(ia(db, "tasks", id));
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	const click_handler = task => taskCompleted(task);
    	const click_handler_1 = task => handleDelete(task.id);

    	$$self.$capture_state = () => ({
    		Link,
    		db,
    		auth,
    		collection: na,
    		onSnapshot: Hh,
    		doc: ia,
    		updateDoc: Qh,
    		deleteDoc: Wh,
    		query: wh,
    		where: gh,
    		colRef,
    		tasks,
    		unsubscribe,
    		isLoggedIn,
    		isPending,
    		taskCompleted,
    		handleDelete
    	});

    	$$self.$inject_state = $$props => {
    		if ('colRef' in $$props) colRef = $$props.colRef;
    		if ('tasks' in $$props) $$invalidate(0, tasks = $$props.tasks);
    		if ('unsubscribe' in $$props) unsubscribe = $$props.unsubscribe;
    		if ('isLoggedIn' in $$props) $$invalidate(1, isLoggedIn = $$props.isLoggedIn);
    		if ('isPending' in $$props) $$invalidate(2, isPending = $$props.isPending);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		tasks,
    		isLoggedIn,
    		isPending,
    		taskCompleted,
    		handleDelete,
    		click_handler,
    		click_handler_1
    	];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\Create.svelte generated by Svelte v3.46.4 */
    const file$1 = "src\\components\\Create.svelte";

    // (43:4) {#if error }
    function create_if_block_2(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "??? Enter the task with minimum of 3 characters";
    			attr_dev(p, "class", "svelte-1hb6ujp");
    			add_location(p, file$1, 43, 6, 1062);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(43:4) {#if error }",
    		ctx
    	});

    	return block;
    }

    // (53:32) 
    function create_if_block_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Adding");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(53:32) ",
    		ctx
    	});

    	return block;
    }

    // (51:6) {#if !additionPending}
    function create_if_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Add");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(51:6) {#if !additionPending}",
    		ctx
    	});

    	return block;
    }

    // (57:4) <Link to="/">
    function create_default_slot$1(ctx) {
    	let button;

    	const block = {
    		c: function create() {
    			button = element("button");
    			button.textContent = "Cancel";
    			attr_dev(button, "id", "cancel-btn");
    			attr_dev(button, "class", "svelte-1hb6ujp");
    			add_location(button, file$1, 56, 17, 1431);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(57:4) <Link to=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let main;
    	let h2;
    	let t1;
    	let form;
    	let input;
    	let t2;
    	let t3;
    	let br;
    	let t4;
    	let textarea;
    	let t5;
    	let section;
    	let button;
    	let t6;
    	let link;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*error*/ ctx[0] && create_if_block_2(ctx);

    	function select_block_type(ctx, dirty) {
    		if (!/*additionPending*/ ctx[4]) return create_if_block;
    		if (/*additionPending*/ ctx[4]) return create_if_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block1 = current_block_type && current_block_type(ctx);

    	link = new Link({
    			props: {
    				to: "/",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			h2 = element("h2");
    			h2.textContent = "Create task";
    			t1 = space();
    			form = element("form");
    			input = element("input");
    			t2 = space();
    			if (if_block0) if_block0.c();
    			t3 = space();
    			br = element("br");
    			t4 = space();
    			textarea = element("textarea");
    			t5 = space();
    			section = element("section");
    			button = element("button");
    			if (if_block1) if_block1.c();
    			t6 = space();
    			create_component(link.$$.fragment);
    			add_location(h2, file$1, 34, 2, 849);
    			attr_dev(input, "class", "name-input");
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", "Name");
    			add_location(input, file$1, 36, 4, 925);
    			add_location(br, file$1, 45, 4, 1131);
    			attr_dev(textarea, "placeholder", "Description(optional)");
    			attr_dev(textarea, "class", "svelte-1hb6ujp");
    			add_location(textarea, file$1, 46, 4, 1143);
    			attr_dev(form, "class", "svelte-1hb6ujp");
    			add_location(form, file$1, 35, 2, 873);
    			attr_dev(button, "id", "add-btn");
    			attr_dev(button, "class", "svelte-1hb6ujp");
    			add_location(button, file$1, 49, 4, 1246);
    			attr_dev(section, "class", "svelte-1hb6ujp");
    			add_location(section, file$1, 48, 2, 1231);
    			add_location(main, file$1, 33, 0, 839);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h2);
    			append_dev(main, t1);
    			append_dev(main, form);
    			append_dev(form, input);
    			set_input_value(input, /*title*/ ctx[1]);
    			append_dev(form, t2);
    			if (if_block0) if_block0.m(form, null);
    			append_dev(form, t3);
    			append_dev(form, br);
    			append_dev(form, t4);
    			append_dev(form, textarea);
    			set_input_value(textarea, /*description*/ ctx[2]);
    			append_dev(main, t5);
    			append_dev(main, section);
    			append_dev(section, button);
    			if (if_block1) if_block1.m(button, null);
    			append_dev(section, t6);
    			mount_component(link, section, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[5]),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[6]),
    					listen_dev(
    						form,
    						"submit",
    						prevent_default(function () {
    							if (is_function(/*handleSubmit*/ ctx[3])) /*handleSubmit*/ ctx[3].apply(this, arguments);
    						}),
    						false,
    						true,
    						false
    					),
    					listen_dev(
    						button,
    						"click",
    						function () {
    							if (is_function(/*handleSubmit*/ ctx[3])) /*handleSubmit*/ ctx[3].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (dirty & /*title*/ 2 && input.value !== /*title*/ ctx[1]) {
    				set_input_value(input, /*title*/ ctx[1]);
    			}

    			if (/*error*/ ctx[0]) {
    				if (if_block0) ; else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					if_block0.m(form, t3);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*description*/ 4) {
    				set_input_value(textarea, /*description*/ ctx[2]);
    			}

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if (if_block1) if_block1.d(1);
    				if_block1 = current_block_type && current_block_type(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(button, null);
    				}
    			}

    			const link_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if (if_block0) if_block0.d();

    			if (if_block1) {
    				if_block1.d();
    			}

    			destroy_component(link);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Create', slots, []);
    	let error = false;
    	let title = "";
    	let description = "";
    	let isComplete = false;
    	let handleSubmit;
    	let additionPending = false;

    	auth.onAuthStateChanged(user => {
    		if (user) {
    			$$invalidate(3, handleSubmit = async () => {
    				if (title.length > 2) {
    					$$invalidate(4, additionPending = true);

    					await zh(na(db, "tasks"), {
    						title,
    						description,
    						isComplete,
    						uid: user.uid
    					});

    					$$invalidate(4, additionPending = false);
    					navigate("/");
    				} else {
    					$$invalidate(0, error = true);
    				}
    			});
    		}
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Create> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		title = this.value;
    		$$invalidate(1, title);
    	}

    	function textarea_input_handler() {
    		description = this.value;
    		$$invalidate(2, description);
    	}

    	$$self.$capture_state = () => ({
    		Link,
    		navigate,
    		collection: na,
    		addDoc: zh,
    		db,
    		auth,
    		error,
    		title,
    		description,
    		isComplete,
    		handleSubmit,
    		additionPending
    	});

    	$$self.$inject_state = $$props => {
    		if ('error' in $$props) $$invalidate(0, error = $$props.error);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('description' in $$props) $$invalidate(2, description = $$props.description);
    		if ('isComplete' in $$props) isComplete = $$props.isComplete;
    		if ('handleSubmit' in $$props) $$invalidate(3, handleSubmit = $$props.handleSubmit);
    		if ('additionPending' in $$props) $$invalidate(4, additionPending = $$props.additionPending);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		error,
    		title,
    		description,
    		handleSubmit,
    		additionPending,
    		input_input_handler,
    		textarea_input_handler
    	];
    }

    class Create extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Create",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\components\Footer.svelte generated by Svelte v3.46.4 */

    const file = "src\\components\\Footer.svelte";

    function create_fragment$1(ctx) {
    	let footer;
    	let hr;
    	let t0;
    	let div;
    	let section0;
    	let p;
    	let t2;
    	let section1;
    	let a0;
    	let img0;
    	let img0_src_value;
    	let t3;
    	let a1;
    	let img1;
    	let img1_src_value;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			hr = element("hr");
    			t0 = space();
    			div = element("div");
    			section0 = element("section");
    			p = element("p");
    			p.textContent = "Copyright ?? 2022 TO-DO";
    			t2 = space();
    			section1 = element("section");
    			a0 = element("a");
    			img0 = element("img");
    			t3 = space();
    			a1 = element("a");
    			img1 = element("img");
    			attr_dev(hr, "class", "svelte-1icf3dc");
    			add_location(hr, file, 1, 4, 14);
    			attr_dev(p, "class", "svelte-1icf3dc");
    			add_location(p, file, 4, 12, 64);
    			attr_dev(section0, "class", "svelte-1icf3dc");
    			add_location(section0, file, 3, 8, 41);
    			if (!src_url_equal(img0.src, img0_src_value = "icons/instagram.svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "instagram icon");
    			attr_dev(img0, "class", "svelte-1icf3dc");
    			add_location(img0, file, 8, 16, 208);
    			attr_dev(a0, "href", "https://instagram.com/deanjairam/");
    			add_location(a0, file, 7, 12, 146);
    			if (!src_url_equal(img1.src, img1_src_value = "icons/twitter.svg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "twitter icon");
    			attr_dev(img1, "class", "svelte-1icf3dc");
    			add_location(img1, file, 11, 16, 353);
    			attr_dev(a1, "href", "https://twitter.com/deanjairam");
    			add_location(a1, file, 10, 12, 294);
    			attr_dev(section1, "class", "svelte-1icf3dc");
    			add_location(section1, file, 6, 8, 123);
    			attr_dev(div, "class", "svelte-1icf3dc");
    			add_location(div, file, 2, 4, 26);
    			attr_dev(footer, "class", "svelte-1icf3dc");
    			add_location(footer, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, hr);
    			append_dev(footer, t0);
    			append_dev(footer, div);
    			append_dev(div, section0);
    			append_dev(section0, p);
    			append_dev(div, t2);
    			append_dev(div, section1);
    			append_dev(section1, a0);
    			append_dev(a0, img0);
    			append_dev(section1, t3);
    			append_dev(section1, a1);
    			append_dev(a1, img1);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.46.4 */

    // (11:2) <Route path="/">
    function create_default_slot_2(ctx) {
    	let home;
    	let current;
    	home = new Home({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(home.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(home, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(11:2) <Route path=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (14:2) <Route path="create">
    function create_default_slot_1(ctx) {
    	let create;
    	let current;
    	create = new Create({ $$inline: true });

    	const block = {
    		c: function create$1() {
    			create_component(create.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(create, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(create.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(create.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(create, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(14:2) <Route path=\\\"create\\\">",
    		ctx
    	});

    	return block;
    }

    // (9:0) <Router>
    function create_default_slot(ctx) {
    	let navbar;
    	let t0;
    	let route0;
    	let t1;
    	let route1;
    	let t2;
    	let footer;
    	let current;
    	navbar = new Navbar({ $$inline: true });

    	route0 = new Route({
    			props: {
    				path: "/",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route1 = new Route({
    			props: {
    				path: "create",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(navbar.$$.fragment);
    			t0 = space();
    			create_component(route0.$$.fragment);
    			t1 = space();
    			create_component(route1.$$.fragment);
    			t2 = space();
    			create_component(footer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(navbar, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(route0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(route1, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route0_changes.$$scope = { dirty, ctx };
    			}

    			route0.$set(route0_changes);
    			const route1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				route1_changes.$$scope = { dirty, ctx };
    			}

    			route1.$set(route1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(navbar, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(route0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(route1, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(9:0) <Router>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Navbar,
    		Home,
    		Create,
    		Footer,
    		Router,
    		Route
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
