import { c as create_ssr_component, d as spread, f as escape_object, h as createEventDispatcher, i as add_attribute, v as validate_component, e as escape, j as each, k as add_styles, o as onDestroy } from "../../chunks/ssr.js";
import { g as goto } from "../../chunks/client.js";
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
const MenuIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ` <svg${spread([escape_object($$props), { viewBox: "0 0 20 20" }, { fill: "currentColor" }], {})}><path d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z"></path></svg>`;
});
const css$3 = {
  code: ".svelte-j30iej:where(aside.toc){box-sizing:border-box;height:max-content;overflow-wrap:break-word;font-size:var(--toc-font-size);min-width:var(--toc-min-width);width:var(--toc-width);z-index:var(--toc-z-index, 1)}.svelte-j30iej:where(aside.toc > nav){overflow:var(--toc-overflow, auto);overscroll-behavior:contain;max-height:var(--toc-max-height, 90vh);padding:var(--toc-padding, 1em 1em 0)}.svelte-j30iej:where(aside.toc > nav > ol){list-style:var(--toc-ol-list-style, none);padding:var(--toc-ol-padding, 0);margin:var(--toc-ol-margin)}.svelte-j30iej:where(.toc-title){padding:var(--toc-title-padding);margin:var(--toc-title-margin)}.svelte-j30iej:where(aside.toc > nav > ol > li){cursor:pointer;color:var(--toc-li-color);border:var(--toc-li-border);border-radius:var(--toc-li-border-radius);margin:var(--toc-li-margin);padding:var(--toc-li-padding, 2pt 4pt)}.svelte-j30iej:where(aside.toc > nav > ol > li:hover){color:var(--toc-li-hover-color, cornflowerblue);background:var(--toc-li-hover-bg)}.svelte-j30iej:where(aside.toc > nav > ol > li.active){background:var(--toc-active-bg, cornflowerblue);color:var(--toc-active-color, white);font-weight:var(--toc-active-font-weight);border:var(--toc-active-border);border-width:var(--toc-active-border-width);border-radius:var(--toc-active-border-radius, 2pt)}.svelte-j30iej:where(aside.toc > button){border:none;bottom:0;cursor:pointer;font-size:2em;line-height:0;position:absolute;right:0;z-index:2;padding:var(--toc-mobile-btn-padding, 2pt 3pt);border-radius:var(--toc-mobile-btn-border-radius, 4pt);background:var(--toc-mobile-btn-bg, rgba(255, 255, 255, 0.2));color:var(--toc-mobile-btn-color, black)}.svelte-j30iej:where(aside.toc > nav){position:relative}.svelte-j30iej:where(aside.toc > nav > .toc-title){margin-top:0}.svelte-j30iej:where(aside.toc.mobile){visibility:hidden;position:absolute;bottom:var(--toc-mobile-bottom, 1em);right:var(--toc-mobile-right, 1em)}.svelte-j30iej:where(aside.toc.mobile > nav){border-radius:3pt;right:0;z-index:-1;box-sizing:border-box;background:var(--toc-mobile-bg, #444);width:var(--toc-mobile-width, 18em);box-shadow:var(--toc-mobile-shadow);border:var(--toc-mobile-border)}.svelte-j30iej:where(aside.toc.desktop){margin:var(--toc-desktop-aside-margin)}.svelte-j30iej:where(aside.toc.desktop){position:sticky;background:#444;margin:var(--toc-desktop-nav-margin);max-width:var(--toc-desktop-max-width);top:var(--toc-desktop-sticky-top, 2em);border-radius:8px;padding:4px}",
  map: '{"version":3,"file":"Toc.svelte","sources":["Toc.svelte"],"sourcesContent":["<script>import { createEventDispatcher, onMount } from \'svelte\';\\n    import { blur } from \'svelte/transition\';\\n    import { MenuIcon } from \'.\';\\n    export let activeHeading = null;\\n    export let activeHeadingScrollOffset = 100;\\n    export let activeTocLi = null;\\n    export let aside = undefined;\\n    export let breakpoint = 1000; // in pixels (smaller window width is considered mobile, larger is desktop)\\n    export let desktop = true;\\n    export let flashClickedHeadingsFor = 1500;\\n    export let getHeadingIds = (node) => node.id;\\n    export let getHeadingLevels = (node) => Number(node.nodeName[1]); // get the number from H1, H2, ...\\n    export let getHeadingTitles = (node) => node.textContent ?? ``;\\n    // the result of document.querySelectorAll(headingSelector). can be useful for binding\\n    export let headings = [];\\n    export let headingSelector = `:is(h2, h3, h4):not(.toc-exclude)`;\\n    export let hide = false;\\n    export let autoHide = true;\\n    export let keepActiveTocItemInView = true; // requires scrollend event browser support\\n    export let minItems = 0;\\n    export let nav = undefined;\\n    export let open = false;\\n    export let openButtonLabel = `Open table of contents`;\\n    // prettier-ignore\\n    export let reactToKeys = [`ArrowDown`, `ArrowUp`, ` `, `Enter`, `Escape`, `Tab`];\\n    export let pageBody = `body`;\\n    export let scrollBehavior = `smooth`;\\n    export let title = `On this page`;\\n    export let titleTag = `h2`;\\n    export let tocItems = [];\\n    export let warnOnEmpty = true;\\n    export let blurParams = { duration: 200 };\\n    let window_width;\\n    // dispatch open event when open changes\\n    const dispatch = createEventDispatcher();\\n    $: dispatch(`open`, { open });\\n    $: levels = headings.map(getHeadingLevels);\\n    $: minLevel = Math.min(...levels);\\n    $: desktop = window_width > breakpoint;\\n    function close(event) {\\n        if (!aside?.contains(event.target))\\n            open = false;\\n    }\\n    // (re-)query headings on mount and on route changes\\n    function requery_headings() {\\n        if (typeof document === `undefined`)\\n            return; // for SSR\\n        headings = [...document.querySelectorAll(headingSelector)];\\n        set_active_heading();\\n        if (headings.length === 0) {\\n            if (warnOnEmpty) {\\n                console.warn(`svelte-toc found no headings for headingSelector=\'${headingSelector}\'. ${autoHide ? `Hiding` : `Showing empty`} table of contents.`);\\n            }\\n            if (autoHide)\\n                hide = true;\\n        }\\n        else if (hide && autoHide) {\\n            hide = false;\\n        }\\n    }\\n    requery_headings();\\n    onMount(() => {\\n        if (typeof pageBody === `string`) {\\n            pageBody = document.querySelector(pageBody);\\n            if (!pageBody) {\\n                throw new Error(`Could not find page body element: ${pageBody}`);\\n            }\\n        }\\n        const mutation_observer = new MutationObserver(requery_headings);\\n        mutation_observer.observe(pageBody, { childList: true, subtree: true });\\n        return () => mutation_observer.disconnect();\\n    });\\n    function set_active_heading() {\\n        let idx = headings.length;\\n        while (idx--) {\\n            const { top } = headings[idx].getBoundingClientRect();\\n            // loop through headings from last to first until we find one that the viewport already\\n            // scrolled past. if none is found, set make first heading active\\n            if (top < activeHeadingScrollOffset || idx === 0) {\\n                activeHeading = headings[idx];\\n                activeTocLi = tocItems[idx];\\n                return; // exit while loop if updated active heading\\n            }\\n        }\\n    }\\n    // click and key handler for ToC items that scrolls to the heading\\n    const li_click_key_handler = (node) => (event) => {\\n        if (event instanceof KeyboardEvent && ![`Enter`, ` `].includes(event.key))\\n            return;\\n        open = false;\\n        node.scrollIntoView?.({ behavior: scrollBehavior, block: `start` });\\n        const id = getHeadingIds && getHeadingIds(node);\\n        if (id)\\n            history.replaceState({}, ``, `#${id}`);\\n        if (flashClickedHeadingsFor) {\\n            node.classList.add(`toc-clicked`);\\n            setTimeout(() => node.classList.remove(`toc-clicked`), flashClickedHeadingsFor);\\n        }\\n    };\\n    function scroll_to_active_toc_item(behavior = `smooth`) {\\n        if (keepActiveTocItemInView && activeTocLi && nav) {\\n            // scroll the active ToC item into the middle of the ToC container\\n            const top = activeTocLi?.offsetTop - nav.offsetHeight / 2;\\n            nav?.scrollTo?.({ top, behavior });\\n        }\\n    }\\n    // ensure active ToC is in view when ToC opens on mobile\\n    $: if (open && nav) {\\n        set_active_heading();\\n        scroll_to_active_toc_item(`instant`);\\n    }\\n    // enable keyboard navigation\\n    function on_keydown(event) {\\n        if (!reactToKeys || !reactToKeys.includes(event.key))\\n            return;\\n        // `:hover`.at(-1) returns the most deeply nested hovered element\\n        const hovered = [...document.querySelectorAll(`:hover`)].at(-1);\\n        const toc_is_hovered = hovered && nav?.contains(hovered);\\n        if (\\n        // return early if ToC does not have focus\\n        (event.key === `Tab` && !nav?.contains(document.activeElement)) ||\\n            // ignore keyboard events when ToC is closed on mobile or when ToC is not currently hovered on desktop\\n            (!desktop && !open) ||\\n            (desktop && !toc_is_hovered))\\n            return;\\n        event.preventDefault();\\n        if (event.key === `Escape` && open)\\n            open = false;\\n        else if (event.key === `Tab` && !aside?.contains(document.activeElement))\\n            open = false;\\n        else if (activeTocLi) {\\n            if (event.key === `ArrowDown`) {\\n                const next = activeTocLi.nextElementSibling;\\n                if (next)\\n                    activeTocLi = next;\\n            }\\n            if (event.key === `ArrowUp`) {\\n                const prev = activeTocLi.previousElementSibling;\\n                if (prev)\\n                    activeTocLi = prev;\\n            }\\n            // update active heading\\n            activeHeading = headings[tocItems.indexOf(activeTocLi)];\\n        }\\n        if (activeTocLi && [` `, `Enter`].includes(event.key)) {\\n            activeHeading?.scrollIntoView({ behavior: `instant`, block: `start` });\\n        }\\n    }\\n    <\/script>\\n    \\n    <svelte:window\\n      bind:innerWidth={window_width}\\n      on:scroll={set_active_heading}\\n      on:click={close}\\n      on:scrollend={() => {\\n        // wait for scroll end since Chrome doesn\'t support multiple simultaneous scrolls,\\n        // smooth or otherwise (https://stackoverflow.com/a/63563437)\\n        scroll_to_active_toc_item()\\n      }}\\n      on:resize={() => {\\n        desktop = window_width > breakpoint\\n        set_active_heading()\\n      }}\\n      on:keydown={on_keydown}\\n    />\\n    \\n    <aside\\n      class=\\"toc\\"\\n      class:desktop\\n      class:hidden={hide}\\n      class:mobile={!desktop}\\n      bind:this={aside}\\n      hidden={hide}\\n      aria-hidden={hide}\\n    >\\n      {#if !open && !desktop && headings.length >= minItems}\\n        <button\\n          on:click|preventDefault|stopPropagation={() => (open = true)}\\n          aria-label={openButtonLabel}\\n        >\\n          <slot name=\\"open-toc-icon\\">\\n            <MenuIcon width=\\"1em\\" />\\n          </slot>\\n        </button>\\n      {/if}\\n      {#if open || (desktop && headings.length >= minItems)}\\n        <nav transition:blur={blurParams} bind:this={nav}>\\n          {#if title}\\n            <slot name=\\"title\\">\\n              <svelte:element this={titleTag} class=\\"toc-title toc-exclude\\">\\n                {title}\\n              </svelte:element>\\n            </slot>\\n          {/if}\\n          <ol>\\n            {#each headings as heading, idx}\\n              <li\\n                style:margin=\\"0 0 0 {levels[idx] - minLevel}em\\"\\n                style:font-size=\\"{2 - 0.2 * (levels[idx] - minLevel)}ex\\"\\n                class:active={activeTocLi === tocItems[idx]}\\n                on:click={li_click_key_handler(heading)}\\n                on:keyup={li_click_key_handler(heading)}\\n                bind:this={tocItems[idx]}\\n                role=\\"menuitem\\"\\n              >\\n                <slot name=\\"toc-item\\" {heading} {idx}>\\n                  {getHeadingTitles(heading)}\\n                </slot>\\n              </li>\\n            {/each}\\n          </ol>\\n        </nav>\\n      {/if}\\n    </aside>\\n    \\n    <style>\\n      :where(aside.toc) {\\n        box-sizing: border-box;\\n        height: max-content;\\n        overflow-wrap: break-word;\\n        font-size: var(--toc-font-size);\\n        min-width: var(--toc-min-width);\\n        width: var(--toc-width);\\n        z-index: var(--toc-z-index, 1);\\n      }\\n      :where(aside.toc > nav) {\\n        overflow: var(--toc-overflow, auto);\\n        overscroll-behavior: contain;\\n        max-height: var(--toc-max-height, 90vh);\\n        padding: var(--toc-padding, 1em 1em 0);\\n      }\\n      :where(aside.toc > nav > ol) {\\n        list-style: var(--toc-ol-list-style, none);\\n        padding: var(--toc-ol-padding, 0);\\n        margin: var(--toc-ol-margin);\\n      }\\n      :where(.toc-title) {\\n        padding: var(--toc-title-padding);\\n        margin: var(--toc-title-margin);\\n      }\\n      :where(aside.toc > nav > ol > li) {\\n        cursor: pointer;\\n        color: var(--toc-li-color);\\n        border: var(--toc-li-border);\\n        border-radius: var(--toc-li-border-radius);\\n        margin: var(--toc-li-margin);\\n        padding: var(--toc-li-padding, 2pt 4pt);\\n      }\\n      :where(aside.toc > nav > ol > li:hover) {\\n        color: var(--toc-li-hover-color, cornflowerblue);\\n        background: var(--toc-li-hover-bg);\\n      }\\n      :where(aside.toc > nav > ol > li.active) {\\n        background: var(--toc-active-bg, cornflowerblue);\\n        color: var(--toc-active-color, white);\\n        font-weight: var(--toc-active-font-weight);\\n        border: var(--toc-active-border);\\n        border-width: var(--toc-active-border-width);\\n        border-radius: var(--toc-active-border-radius, 2pt);\\n      }\\n      :where(aside.toc > button) {\\n        border: none;\\n        bottom: 0;\\n        cursor: pointer;\\n        font-size: 2em;\\n        line-height: 0;\\n        position: absolute;\\n        right: 0;\\n        z-index: 2;\\n        padding: var(--toc-mobile-btn-padding, 2pt 3pt);\\n        border-radius: var(--toc-mobile-btn-border-radius, 4pt);\\n        background: var(--toc-mobile-btn-bg, rgba(255, 255, 255, 0.2));\\n        color: var(--toc-mobile-btn-color, black);\\n      }\\n      :where(aside.toc > nav) {\\n        position: relative;\\n      }\\n      :where(aside.toc > nav > .toc-title) {\\n        margin-top: 0;\\n      }\\n    \\n      :where(aside.toc.mobile) {\\n        visibility: hidden;\\n        position: absolute;\\n        bottom: var(--toc-mobile-bottom, 1em);\\n        right: var(--toc-mobile-right, 1em);\\n      }\\n      :where(aside.toc.mobile > nav) {\\n        border-radius: 3pt;\\n        right: 0;\\n        z-index: -1;\\n        box-sizing: border-box;\\n        background: var(--toc-mobile-bg, #444);\\n        width: var(--toc-mobile-width, 18em);\\n        box-shadow: var(--toc-mobile-shadow);\\n        border: var(--toc-mobile-border);\\n      }\\n    \\n      :where(aside.toc.desktop) {\\n        margin: var(--toc-desktop-aside-margin);\\n      }\\n      :where(aside.toc.desktop) {\\n        position: sticky;\\n        background: #444;\\n        margin: var(--toc-desktop-nav-margin);\\n        max-width: var(--toc-desktop-max-width);\\n        top: var(--toc-desktop-sticky-top, 2em);\\n        border-radius: 8px;\\n        padding: 4px;\\n      }\\n    </style>\\n    "],"names":[],"mappings":"cAwNM,OAAO,KAAK,IAAI,CAAE,CAChB,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,WAAW,CACnB,aAAa,CAAE,UAAU,CACzB,SAAS,CAAE,IAAI,eAAe,CAAC,CAC/B,SAAS,CAAE,IAAI,eAAe,CAAC,CAC/B,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,OAAO,CAAE,IAAI,aAAa,CAAC,EAAE,CAC/B,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAE,CACtB,QAAQ,CAAE,IAAI,cAAc,CAAC,KAAK,CAAC,CACnC,mBAAmB,CAAE,OAAO,CAC5B,UAAU,CAAE,IAAI,gBAAgB,CAAC,KAAK,CAAC,CACvC,OAAO,CAAE,IAAI,aAAa,CAAC,UAAU,CACvC,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAE,CAC3B,UAAU,CAAE,IAAI,mBAAmB,CAAC,KAAK,CAAC,CAC1C,OAAO,CAAE,IAAI,gBAAgB,CAAC,EAAE,CAAC,CACjC,MAAM,CAAE,IAAI,eAAe,CAC7B,eACA,OAAO,UAAU,CAAE,CACjB,OAAO,CAAE,IAAI,mBAAmB,CAAC,CACjC,MAAM,CAAE,IAAI,kBAAkB,CAChC,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,CAAE,CAChC,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,MAAM,CAAE,IAAI,eAAe,CAAC,CAC5B,aAAa,CAAE,IAAI,sBAAsB,CAAC,CAC1C,MAAM,CAAE,IAAI,eAAe,CAAC,CAC5B,OAAO,CAAE,IAAI,gBAAgB,CAAC,QAAQ,CACxC,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,MAAM,CAAE,CACtC,KAAK,CAAE,IAAI,oBAAoB,CAAC,eAAe,CAAC,CAChD,UAAU,CAAE,IAAI,iBAAiB,CACnC,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,OAAO,CAAE,CACvC,UAAU,CAAE,IAAI,eAAe,CAAC,eAAe,CAAC,CAChD,KAAK,CAAE,IAAI,kBAAkB,CAAC,MAAM,CAAC,CACrC,WAAW,CAAE,IAAI,wBAAwB,CAAC,CAC1C,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAChC,YAAY,CAAE,IAAI,yBAAyB,CAAC,CAC5C,aAAa,CAAE,IAAI,0BAA0B,CAAC,IAAI,CACpD,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,MAAM,CAAE,CACzB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,CAAC,CACd,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,wBAAwB,CAAC,QAAQ,CAAC,CAC/C,aAAa,CAAE,IAAI,8BAA8B,CAAC,IAAI,CAAC,CACvD,UAAU,CAAE,IAAI,mBAAmB,CAAC,yBAAyB,CAAC,CAC9D,KAAK,CAAE,IAAI,sBAAsB,CAAC,MAAM,CAC1C,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAE,CACtB,QAAQ,CAAE,QACZ,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,UAAU,CAAE,CACnC,UAAU,CAAE,CACd,eAEA,OAAO,KAAK,IAAI,OAAO,CAAE,CACvB,UAAU,CAAE,MAAM,CAClB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,mBAAmB,CAAC,IAAI,CAAC,CACrC,KAAK,CAAE,IAAI,kBAAkB,CAAC,IAAI,CACpC,eACA,OAAO,KAAK,IAAI,OAAO,CAAC,CAAC,CAAC,GAAG,CAAE,CAC7B,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,UAAU,CACtB,UAAU,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CACtC,KAAK,CAAE,IAAI,kBAAkB,CAAC,KAAK,CAAC,CACpC,UAAU,CAAE,IAAI,mBAAmB,CAAC,CACpC,MAAM,CAAE,IAAI,mBAAmB,CACjC,eAEA,OAAO,KAAK,IAAI,QAAQ,CAAE,CACxB,MAAM,CAAE,IAAI,0BAA0B,CACxC,eACA,OAAO,KAAK,IAAI,QAAQ,CAAE,CACxB,QAAQ,CAAE,MAAM,CAChB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,wBAAwB,CAAC,CACrC,SAAS,CAAE,IAAI,uBAAuB,CAAC,CACvC,GAAG,CAAE,IAAI,wBAAwB,CAAC,IAAI,CAAC,CACvC,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,GACX"}'
};
const Toc = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
const css$2 = {
  code: ".modal.svelte-1lf0y8n{display:block;position:fixed;z-index:1;padding-top:60px;left:0;top:0;width:100%;height:100%;overflow:hidden;background-color:rgba(0, 0, 0, 0.4);opacity:1;transition:opacity 0.3s ease}.fade-in.svelte-1lf0y8n{opacity:1}.fade-out.svelte-1lf0y8n{opacity:0}.modal-image.svelte-1lf0y8n{display:block;margin:0 auto;max-width:105%;width:105%;height:110%;object-fit:cover;--webkit-user-select:none;user-select:none;-webkit-user-drag:none;transform:translateX(-2.5%);transform:translateY(-10%)}.close.svelte-1lf0y8n{color:#aaa;float:right;font-size:28px;font-weight:bold}.close.svelte-1lf0y8n:hover,.close.svelte-1lf0y8n:focus{text-decoration:none;cursor:pointer}.modal-text.svelte-1lf0y8n{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);background-color:rgba(20, 20, 20, 0.8);padding:20px;border-radius:10px;text-align:Left;width:80%;height:80%;color:white;overflow-y:scroll}h1.svelte-1lf0y8n{font-size:3.5em;margin:5px}@media(max-width: 600px){h1.svelte-1lf0y8n{font-size:2.5em}img.svelte-1lf0y8n{width:100%;height:auto}}.content-container.svelte-1lf0y8n{flex:1;padding-right:20px;overflow-y:auto}",
  map: `{"version":3,"file":"Modal.svelte","sources":["Modal.svelte"],"sourcesContent":["<script>\\n  import { onMount } from 'svelte';\\n  import { fade } from 'svelte/transition';\\n  import  Toc from './Toc.svelte'\\n  export let id;\\n  export let onClose;\\n\\n  let content;\\n  let isClosing = false;\\n  let tocHtml = '';\\n  const modalsData = {\\n    modal1: {\\n      title: 'About',\\n      content: \`\\n      <p>\\n          This is my project portfolio from year 9. It took some time to make, but I'm happy with the result. It was developed using Sveltekit (Javascript Framework).\\n        </p>\\n        <p>More on Sveltekit here: <a class='fancy' href=\\"https://kit.svelte.dev/\\">Sveltekit</a></p>\\n        <p>\\n          Click on the images to view the content for each section.\\n        </p>\\n<style>\\n  a {\\n    color:white;\\n    text-decoration: underline;\\n  }\\n  </style>\\n\\n\\n\\n      \`,\\n      image: \\"/about.jpg\\"\\n    },\\n    modal2: {\\n      title: 'Python',\\n      content: \`\\n      <h2>Variables</h2>\\n    <p>Variables are places in memory that can change, they can be assigned using assignment statements ('=' in python) as shown below.</p>\\n    <pre><code>\\nx = 13\\ny = x\\n    </code></pre>\\n\\n    <h3>Naming Variables</h3>\\n    <p>When naming a variable you cannot use the following:</p>\\n    <ul>\\n        <li>You cannot start with a number</li>\\n        <li>You cannot use a reserved word (e.g. int)</li>\\n        <li>You can only use alphanumeric characters (A-z 0-9)</li>\\n    </ul>\\n\\n    <h3>Data Types</h3>\\n    <p>Each variable has a datatype. The datatypes in python are as below:</p>\\n    <ul>\\n        <li><strong>String:</strong> 2 or more characters surrounded by ” or ‘</li>\\n        <li><strong>Integer:</strong> whole number</li>\\n        <li><strong>Real:</strong> Number with a decimal part (in python it is float)</li>\\n        <li><strong>Boolean:</strong> true/false</li>\\n        <li><strong>Char:</strong> A single character</li>\\n    </ul>\\n\\n    <h3>Casting</h3>\\n    <p>Python automatically assigns data types when defining a variable, although you can manually force it to use a certain data type using the following commands:</p>\\n    <pre><code>\\nstr()   # forces string datatype\\nint()   # forces integer datatype\\nfloat() # forces real number (floating point) datatype\\nbool()  # forces boolean datatype\\n    </code></pre>\\n    <p>Forcing a datatype is called casting.</p>\\n\\n    <h3>Strings</h3>\\n    <p>In python strings are technically immutable (cannot be changed) lists of characters, but we can access individual characters.</p>\\n    <pre><code>\\nname = 'Jimmy'\\nprint(name)\\nprint(name[1])\\n    </code></pre>\\n    <p>This code outputs:</p>\\n    <pre><code>i</code></pre>\\n\\n    <h2>Operators</h2>\\n    <p>In python we use operators, some of these include:</p>\\n    <ul>\\n        <li>+ (addition)</li>\\n        <li>– (subtraction)</li>\\n        <li>/ (division)</li>\\n        <li>* (multiplication)</li>\\n        <li>% (Modulus – find remainder from division)</li>\\n        <li>// (Floor division, round down after dividing)</li>\\n    </ul>\\n    <p>When doing arithmetic, BIDMAS matters!</p>\\n\\n    <h2>Inputs</h2>\\n    <p>A piece of data provided by the user to be used in the program.</p>\\n    <p>It is used in the structure below:</p>\\n    <pre><code>variable = input()</code></pre>\\n    <p>Inputs should always be accompanied by a message (prompt) to the user.</p>\\n    <pre><code>\\nprint('Enter your name')\\nname = input()\\n# or you can do it like this\\nname = input('Enter your name: ')\\n    </code></pre>\\n\\n    <h2>Selection</h2>\\n    <p>In python, selection is achieved by the if statement.</p>\\n    <p>Real world example:</p>\\n    <blockquote>\\n        Are you good at time management<br>\\n        If yes: take IB for sixth form<br>\\n        If no: take A level for sixth form.\\n    </blockquote>\\n    <p>In python this can be done as below:</p>\\n    <pre><code>\\nname = input('What is your name?')\\nif name == 'Jimmy':      #condition\\n    print('Hello Jimmy') # action if condition is true\\nelse:\\n    print('not Jimmy')   # action if the condition is false\\n    </code></pre>\\n    <p>When using selection you use a boolean expression (returns True/False value) to check whether code is run. In python the boolean expressions are:</p>\\n    <ul>\\n        <li>==</li>\\n        <li>&lt;=</li>\\n        <li>&gt;=</li>\\n        <li>&lt;</li>\\n        <li>&gt;</li>\\n        <li>!=</li>\\n    </ul>\\n\\n    <h2>Lists</h2>\\n    <p>A list in python is a collection of values with a single identifier (These are often called arrays in other languages).</p>\\n    <pre><code>\\nFruits = ['Apple','banana','orange']\\nScores = [100,15,61,97]\\n    </code></pre>\\n    <p>Each value in an array is an element. The advantages of arrays are that it removes the need for multiple variables, it also allows us as developers to process the values more easily.</p>\\n    <p>Every element in an array has an index position, these positions always start at 0.</p>\\n    <p>To add items to an array (list) we use the array.append() command.</p>\\n    <pre><code>\\nFruits.append('Pear')\\nprint('Fruits')\\n# Before if we printed Fruits we would get:\\n# ['Apple','banana','orange']\\n# Now if we print this:\\n# ['Apple','banana','orange','Pear']\\n    </code></pre>\\n    <p>To remove from lists we use the array.remove() command.</p>\\n    <pre><code>\\nFruits.remove('Apple')\\n# If we print this array we get:\\n# ['banana','orange','Pear']\\n    </code></pre>\\n\\n    <h2>Iteration</h2>\\n    <p>The process of repeating one or more lines of code – this is accomplished using a loop.</p>\\n    <p>Examples of repeated actions in technology:</p>\\n    <ul>\\n        <li>Sending a Whatsapp message to multiple people in a group</li>\\n        <li>Updating DNS servers</li>\\n        <li>Retrieving data from a database</li>\\n        <li>Updating websockets</li>\\n        <li>Waiting for data to be received</li>\\n        <li>Scanning a network</li>\\n        <li>Multi snap in snapchat</li>\\n        <li>Repeating animations in a game</li>\\n        <li>GPS pinging satellites</li>\\n        <li>Refreshing frames on a screen</li>\\n        <li>Collaborative team game stats</li>\\n        <li>Finding images using a search engine</li>\\n    </ul>\\n\\n    <h3>Types of Loops</h3>\\n    <p>A loop is a set of instructions that is repeated until a condition is met. There are two types of loops:</p>\\n    <ul>\\n        <li><strong>Condition Controlled</strong> – Repeatedly loops while a condition is true (maximum number of repetitions is infinite)</li>\\n        <li><strong>Count Controlled</strong> – Repeats a set number of times.</li>\\n    </ul>\\n\\n    <h3>Condition Controlled Loops</h3>\\n    <p>In python the way you do a condition controlled loop is using the while loop function. To use a condition controlled loop you use a While loop. While loops repeatedly execute while the condition is true.</p>\\n    <pre><code>\\nname = \\"\\" # or name = input()\\nwhile name != \\"Arjun\\":\\n    name = input()\\n    print(\\"Not Arjun, try again\\")\\n# This Loop range is 0 to infinite\\n    </code></pre>\\n    <p>We use a while loop when we don’t know how many times we need to repeat.</p>\\n\\n    <h3>Count Controlled Loops</h3>\\n    <p>A control construct that allows one or more lines of code to be repeatedly executed for a set number of times. – the number of repetitions needs to be known.</p>\\n    <p>Some examples include:</p>\\n    <ul>\\n        <li>Printing group messages</li>\\n        <li>Syncing changes of a document for multiple people</li>\\n        <li>Taking inputs for a sequence</li>\\n        <li>Sending people notifications of a detention</li>\\n    </ul>\\n    <p>To use count controlled loops you use a ‘for’ loop.</p>\\n    <pre><code>\\n# Syntax of for loops:\\nfor counter in range(0,10):\\n    print('counter')\\n# 10 is Up to but not including\\n# This code runs 10 times.\\n    </code></pre>\\n    <p>For Loops containing counters:</p>\\n    <pre><code>\\nn = 2\\nfor counter in range(0,30,n):\\n    print(counter)\\n# In the code above the variable counter starts at zero and counts up, executing the code while the variable counter is under 30.\\n# It also uses the range, with the first number being the starting value, the second number being the max value,\\n# and the final number (3rd) being the increments that counter is increased by (n) in this case that is 2.\\n    </code></pre>\\n      \`,\\n      image: \\"/Ad01.jpg\\"\\n    },\\n    modal3: {\\n      title: 'HTML',\\n      content: \`\\n\\n      <h2>Steps to Connect to a Website</h2>\\n    <ol>\\n        <li>You type in a Web address (URL - Uniform Resource Locator) into the address bar in the browser, such as <a href=\\"https://arjun.bond\\">https://arjun.bond</a></li>\\n        <li>Once you get the IP address, you connect and then are able to request a page from the Server.</li>\\n        <li>The server sends the webpage to your computer via the HTTP protocol as HTML code.</li>\\n        <li>The browser reads the HTML code and renders the page.</li>\\n    </ol>\\n\\n    <h2>HTML Basics</h2>\\n    <p>HTML stands for HyperText Markup Language and it is used for creating webpages.</p>\\n    <p>A web browser is designed to read HTML and then translate it to the things you can see on the screen.</p>\\n\\n    <h3>Tags</h3>\\n    <p>Tags are surrounded by &lt; chevrons &gt;.</p>\\n\\n    <h3>Boilerplate Code</h3>\\n    <p>Essential HTML code that all web pages have:</p>\\n    <pre><code>&lt;!DOCTYPE html&gt;\\n&lt;html&gt;\\n    &lt;head&gt;\\n    \\n    &lt;/head&gt;\\n    &lt;body&gt;\\n    \\n    &lt;/body&gt;\\n&lt;/html&gt;\\n    </code></pre>\\n\\n    <h3>Boilerplate Elements</h3>\\n    <ul>\\n        <li>&lt;!DOCTYPE html&gt; is always the first line of an HTML page.</li>\\n        <li>&lt;html&gt; - tells the browser it is HTML code for the page.</li>\\n        <li>&lt;head&gt; - contains things that aren't displayed in the main body of your page like the title.</li>\\n        <li>&lt;body&gt; - contains all the content you want to see displayed.</li>\\n    </ul>\\n\\n    <h2>Images and Links</h2>\\n    <h3>Accessibility</h3>\\n    <p>Having the ability to access something. Users of IT systems can have a wide range of needs, conditions, or disabilities.</p>\\n    <ul>\\n        <li>Use captions in videos.</li>\\n        <li>Use colors with good contrast.</li>\\n        <li>Voice recognition.</li>\\n        <li>Better error messages.</li>\\n    </ul>\\n\\n    <h3>Attributes</h3>\\n    <p>An attribute is an extra piece of information provided in a tag. For example, common image attributes are <code>src</code>, <code>height</code>, and <code>width</code>.</p>\\n    <p>Pixelation occurs when an image is larger than it should be.</p>\\n\\n    <h2>CSS - Cascading Style Sheets</h2>\\n    <p>HTML + CSS: HTML describes the structure of a webpage, then CSS describes the styling (presentation of the page).</p>\\n    <p>Every time we write CSS, we select the tag we want to work with, say which property we want to adjust, and give it the value we want to assign it.</p>\\n\\n    <h3>Using CSS in an HTML Page</h3>\\n    <p>There are 3 options:</p>\\n    <ol>\\n        <li>Write the CSS inside of the individual HTML tags.</li>\\n        <li>Write the CSS styles inside of the <code>&lt;style&gt;&lt;/style&gt;</code> tags in the <code>&lt;head&gt;</code> section of the HTML.</li>\\n        <li>Create an external CSS file with the styles defined in it and link the HTML page to the CSS file.</li>\\n    </ol>\\n\\n    <h2>The DIV Tag</h2>\\n    <p>The division <code>&lt;div&gt;</code> tag helps us to split the layout of a webpage into sections.</p>\\n    <p>We can create divisions in our pages by surrounding the blocks with these tags.</p>\\n    <p>When you group together HTML elements using <code>&lt;div&gt;</code> tags, you can ask CSS to make changes to elements within the DIV.</p>\\n    <p>We can think of DIVs as a way of breaking our page into boxes or containers. You can also have DIVs inside of DIVs.</p>\\n      \`,\\n      image: \\"/HTML.webp\\"\\n    },\\n    modal4: {\\n      title: 'AI/Emerging Technologies',\\n      content: \`\\n      <h2>Autonomous vehicles</h2>\\n      <h3>Autonomous Vehicles Components</h3>\\n    <h4>Sensors</h4>\\n    <ul>\\n        <li>Lasers</li>\\n        <li>Radar</li>\\n        <li>Cameras</li>\\n        <li>(LiDAR)</li>\\n        <li>Ultrasonic/IR Sensors at front/rear</li>\\n    </ul>\\n\\n    <h3>Properties of Autonomous Vehicles</h3>\\n    <ul>\\n        <li>Rounded shape to maximize sensor field of view</li>\\n        <li>Computer specifically designed for self-driving</li>\\n        <li>Back up systems for steering, braking, computing, and more</li>\\n        <li>Electric batteries to power the vehicles</li>\\n    </ul>\\n\\n    <h2>Technology Explained</h2>\\n    <h3>AutoPilot</h3>\\n    <p>To assist the driver.</p>\\n\\n    <h3>Anti-Lock Brakes</h3>\\n    <p>Warns or takes action in case of danger, and applies the brake automatically.</p>\\n\\n    <h3>Adaptive Cruise Control</h3>\\n    <p>Keeps the vehicle at a safe distance behind cars ahead of it.</p>\\n\\n    <h3>Lane Departure Warning System</h3>\\n    <p>Warns if you are leaving a lane.</p>\\n\\n    <h3>Intelligent Parking</h3>\\n    <p>Parks automatically and uses parking sensors.</p>\\n\\n    <h3>Blind Spot Monitoring</h3>\\n    <p>Checks the blind spot.</p>\\n\\n    <h2>Artificial Intelligence</h2>\\n    <h3>What is AI?</h3>\\n    <p>Ai is a piece of software that takes an input, and produces an output based on many different factors</p>\\n    <h4>Types of AI</h4>\\n    <ul>\\n      <li>Narrow AI - AI that is designed for a specific task, examples include LLMs (Large Language Models)</li>\\n      <li>General AI - AI that can perform any intellectual task that a human can do</li>\\n      </ul>\\n    <p>Every year, computers become:</p>\\n    <ul>\\n        <li>Faster</li>\\n        <li>Smaller</li>\\n        <li>Able to store more data</li>\\n        <li>Better connected</li>\\n    </ul>\\n    <p>AI is used in many things, even currently, here are some examples:</p>\\n    <ul>\\n        <li>Travel (such as Google Maps)</li>\\n        <li>Entertainment - Personalised Video Recommendations, such as on platforms like YouTube</li>\\n        <li>Healthcare - AI can be used to diagnose diseases</li>\\n        <li>Finance - AI can be used to predict stock prices</li>\\n        <li>Education - AI can be used to personalise learning</li>\\n        <li>Security - AI can be used to detect malware</li>\\n        </ul>\\n    <h2>Crypto Currencies</h2>\\n    <h3>Distributed Ledgers</h3>\\n    <ul>\\n        <li><strong>Ledger:</strong> a database/record of all transactions.</li>\\n        <li><strong>Distributed ledger:</strong> multiple parties have a copy of the ledger.\\n            <ul>\\n                <li>If 50%+ agree on ledger contents, it's trustworthy.</li>\\n            </ul>\\n        </li>\\n    </ul>\\n    <h3>Blockchain</h3>\\n    <p>A system where a record of transactions are maintained across computers in a peer to peer network.  </p>\\n    <h4>Three benefits of blockchain:</h4>\\n    <ol>\\n      <li>More trust, as everyone can check transactions</li>\\n      <li>Transparent, as the ledger is public and accessible to anyone</li>\\n      <li>More Secure, as everyone can check transactions and the ledger is public</li>\\n    </ol>\\n    <h4>Three drawbacks of blockchain:</h4>\\n    <ol>\\n      <li>Slow, as every transaction needs to be verified by multiple computers</li>\\n      <li>Expensive, as the computers need to be paid for their work</li>\\n      <li>Not private, as everyone can see the transactions</li>\\n    </ol>\\n    <h4>Uses of the blockchain:</h4>\\n    <ol>\\n      <li>Voting - If election process is put on blockchain, run by multiple parties, it can prevent corruption, as it is more difficult to manipulate the results.</li>\\n      <li>Distributed Asset Trading - easily authenticating transactions, instead of much paper.</li>\\n      <li>Smart Contracts - enforcing a contract via the blockchain.</li>\\n    </ol>\\n\\n    <p>for more info on cryptocurrencies watch <a href='https://www.youtube.com/watch?v=rYQgy8QDEBI'>this video</a></p>\\n    <iframe  src=\\"https://www.youtube.com/embed/rYQgy8QDEBI?si=SHbXdFJN_g3gVSd6\\" title=\\"YouTube video player\\" frameborder=\\"0\\" allow=\\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\\" referrerpolicy=\\"strict-origin-when-cross-origin\\" allowfullscreen></iframe>\\n    <style>\\n      a {\\n        color:white;\\n        text-decoration: underline;\\n      }\\n      iframe {\\n        width: 75%;\\n        height: auto;\\n        aspect-ratio: 16/9;\\n      }\\n      \`,\\n      image: \\"/AiEmer.jpg\\"\\n    },\\n    modal5: {\\n      title: 'Amazon Technologies Project',\\n      content: \`\\n      <h1>Amazon Prime Chat</h1>\\n\\n<h2>What is it?</h2>\\n<ul>\\n    <li>Amazon Prime Chat is an AI chatbot that allows all customers and employees easy access to all things Amazon related.</li>\\n    <li>Employees such as customer support employees can use it to give quicker assistance to people.</li>\\n    <li>Employees such as technical support can use it to diagnose and fix issues.</li>\\n    <li>Customers can use it to find a specific product, or to help them decide what product to purchase.</li>\\n</ul>\\n\\n<h2>The Product</h2>\\n<ul>\\n    <li>The chatbot consists of a custom model, which is based upon GPT-4 from OpenAI, although this model can also be made in-house.</li>\\n    <li>The product will be hosted on a section of amazon.com, as well as a custom model in an intranet for employees.</li>\\n    <li>The backend can be hosted on AWS, but can also be offloaded to Google Cloud Platform or Microsoft Azure.</li>\\n</ul>\\n\\n<h2>Cost</h2>\\n<ul>\\n    <li>The chatbot will be available to everyone, and therefore free, although Prime subscribers can have more functionality such as order tracking and summaries of recent activity on the first launch/visit.</li>\\n    <li>The cost of the custom model will be around £600,000 per annum (if using OpenAI custom model).</li>\\n    <li>Otherwise, the cost will be greater, possibly up to £50 million.</li>\\n    <li>This product is free, although it will make money by logging user activity and selling products at a marginally higher price.</li>\\n</ul>\\n\\n<h2>What does it look like?</h2>\\n<img src='/Primechat.jpg' alt='Amazon Prime Chat' style='width: 50%%;'>\\n\\n<h2>How this will benefit Amazon</h2>\\n<ul>\\n    <li>Since Amazon makes many transactions, this AI can help users make more due to the suggestion of products.</li>\\n    <li>It can also recommend more relevant products than the current algorithm.</li>\\n    <li>It will help support staff provide support, therefore retaining more customers who will pay.</li>\\n    <li>It will help technical staff help other staff, or to debug issues and resolve them, leading to more productive time or uptime, which will result in more money made.</li>\\n</ul>\\n\\n<h2>Development Time</h2>\\n<h3>OpenAI Custom Model</h3>\\n<ul>\\n    <li>Model Training: 1 year</li>\\n    <li>Testing: 2 months</li>\\n    <li>Total: 1 year 2 months</li>\\n</ul>\\n\\n<h3>In-house Model</h3>\\n<ul>\\n    <li>Infrastructure: 4 months</li>\\n    <li>R&D: 2 years</li>\\n    <li>Development: 1 year</li>\\n    <li>Testing: 2 months</li>\\n    <li>Total: 3 years, 6 months</li>\\n</ul>\\n<a href=\\"https://www.arjun.bond/wp-content/uploads/2024/05/Amazon-Prime-Chat-1.pdf\\" download=\\"\\" target=\\"__blank\\"><p>To get the information above in a pdf, click here</p></a>\\n<style>\\n  a {\\n    color:white;\\n    text-decoration: underline;\\n  }\\n  @media (max-width: 600px) {\\n  img {\\n    width: 100%;\\n    height: auto;\\n  }\\n}\\n  </style>\\n      \`,\\n      image: \\"/amazon.jpeg\\"\\n    }\\n  };\\n\\n  onMount(() => {\\n    content = modalsData[id].content;\\n    tocHtml = generateTOC(content);\\n  });\\n\\n  function handleClose() {\\n    isClosing = true;\\n    setTimeout(() => {\\n      if (typeof onClose === 'function') {\\n        onClose();\\n      }\\n      isClosing = false;\\n    }, 1); // Matches the duration of the fade-out transition\\n  }\\n function handleTOCClick(event) {\\n    scrollToSection(event); // Pass the target element directly\\n  }\\n\\n\\n\\n\\n\\nfunction generateTOC(content) {\\n  const tempDiv = document.createElement('div');\\n  tempDiv.innerHTML = content;\\n  const headings = tempDiv.querySelectorAll('h2, h3');\\n  let tocHtml = '';\\n  headings.forEach((heading, index) => {\\n    const level = heading.tagName.toLowerCase();\\n    const text = heading.textContent;\\n    const id = \`section-\${index}\`; // Generate unique ID for each section\\n    heading.id = id; // Assign ID to the heading for linking\\n    const listItem = \`<li><a href=\\"#\${id}\\"><\${level}>\${text}</\${level}></a></li>\`;\\n    tocHtml += listItem;\\n  });\\n  return \`<ul>\${tocHtml}</ul>\`;\\n}\\n\\nfunction scrollToSection(id) {\\n  const section = document.getElementById(id);\\n    if (section) {\\n      section.scrollIntoView({ behavior: 'smooth' });\\n    }\\n}\\n\\n\\n\\n\\n\\n\\n\\n\\n<\/script>\\n\\n<div class=\\"modal {isClosing ? 'fade-out' : 'fade-in'}\\" id={id} transition:fade={{ duration: 300 }}>\\n  <span class=\\"close\\" on:click={handleClose}>&times;</span>\\n  <img class=\\"modal-image\\" src={modalsData[id].image} />\\n  \\n  <div class=\\"modal-text\\">\\n    <h1>{modalsData[id].title}</h1>\\n    <div class=\\"toc\\">\\n        \\n        \\n      <Toc class='toc'> </Toc>\\n      </div>\\n    <div class=\\"content-container\\">\\n<hr>\\n      <div class=\\"content\\">\\n        {@html content}\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n\\n  .modal {\\n    display: block;\\n    position: fixed;\\n    z-index: 1;\\n    padding-top: 60px;\\n    left: 0;\\n    top: 0;\\n    width: 100%;\\n    height: 100%;\\n    overflow: hidden;\\n    background-color: rgba(0, 0, 0, 0.4);\\n    opacity: 1;\\n    transition: opacity 0.3s ease;\\n  }\\n  .fade-in {\\n    opacity: 1;\\n  }\\n  .fade-out {\\n    opacity: 0;\\n  }\\n  .modal-image {\\n    display: block;\\n    margin: 0 auto;\\n    max-width: 105%;\\n    width:105%;\\n    height: 110%;\\n  object-fit: cover;\\n  --webkit-user-select: none;\\n  user-select: none;\\n  -webkit-user-drag: none;\\n  transform: translateX(-2.5%);\\n  transform: translateY(-10%);\\n  \\n  }\\n\\n  .close {\\n    color: #aaa;\\n    float: right;\\n    font-size: 28px;\\n    font-weight: bold;\\n  }\\n  .close:hover,\\n  .close:focus {\\n    text-decoration: none;\\n    cursor: pointer;\\n  }\\n  .modal-text {\\n    position: absolute;\\n    top: 50%;\\n    left: 50%;\\n    transform: translate(-50%, -50%);\\n    background-color: rgba(20, 20, 20, 0.8);\\n    padding: 20px;\\n    border-radius: 10px;\\n    text-align: Left;\\n    width: 80%;\\n    height: 80%;\\n    color: white;\\n    overflow-y: scroll;\\n  }\\n  h1 {\\n    font-size: 3.5em;\\n    margin: 5px;\\n  }\\n  @media (max-width: 600px) {\\n  h1 {\\n    font-size:2.5em;\\n\\n  }\\n  img {\\n    width: 100%;\\n    height: auto;\\n  }\\n}\\n\\n  .content-container {\\n    flex: 1;\\n    padding-right: 20px; /* Adjust spacing between TOC and content */\\n    overflow-y: auto; /* Allow scrolling if content is too long */\\n  }\\n\\n\\n</style>\\n"],"names":[],"mappings":"AA0iBE,qBAAO,CACL,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,IAAI,CACjB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,CAChB,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACpC,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,OAAO,CAAC,IAAI,CAAC,IAC3B,CACA,uBAAS,CACP,OAAO,CAAE,CACX,CACA,wBAAU,CACR,OAAO,CAAE,CACX,CACA,2BAAa,CACX,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,SAAS,CAAE,IAAI,CACf,MAAM,IAAI,CACV,MAAM,CAAE,IAAI,CACd,UAAU,CAAE,KAAK,CACjB,oBAAoB,CAAE,IAAI,CAC1B,WAAW,CAAE,IAAI,CACjB,iBAAiB,CAAE,IAAI,CACvB,SAAS,CAAE,WAAW,KAAK,CAAC,CAC5B,SAAS,CAAE,WAAW,IAAI,CAE1B,CAEA,qBAAO,CACL,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IACf,CACA,qBAAM,MAAM,CACZ,qBAAM,MAAO,CACX,eAAe,CAAE,IAAI,CACrB,MAAM,CAAE,OACV,CACA,0BAAY,CACV,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CACvC,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MACd,CACA,iBAAG,CACD,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,GACV,CACA,MAAO,YAAY,KAAK,CAAE,CAC1B,iBAAG,CACD,UAAU,KAEZ,CACA,kBAAI,CACF,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV,CACF,CAEE,iCAAmB,CACjB,IAAI,CAAE,CAAC,CACP,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IACd"}`
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
        <li><strong>String:</strong> 2 or more characters surrounded by ” or ‘</li>
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
        <li>– (subtraction)</li>
        <li>/ (division)</li>
        <li>* (multiplication)</li>
        <li>% (Modulus – find remainder from division)</li>
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
    <p>The process of repeating one or more lines of code – this is accomplished using a loop.</p>
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
        <li><strong>Condition Controlled</strong> – Repeatedly loops while a condition is true (maximum number of repetitions is infinite)</li>
        <li><strong>Count Controlled</strong> – Repeats a set number of times.</li>
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
    <p>We use a while loop when we don’t know how many times we need to repeat.</p>

    <h3>Count Controlled Loops</h3>
    <p>A control construct that allows one or more lines of code to be repeatedly executed for a set number of times. – the number of repetitions needs to be known.</p>
    <p>Some examples include:</p>
    <ul>
        <li>Printing group messages</li>
        <li>Syncing changes of a document for multiple people</li>
        <li>Taking inputs for a sequence</li>
        <li>Sending people notifications of a detention</li>
    </ul>
    <p>To use count controlled loops you use a ‘for’ loop.</p>
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
    <li>The cost of the custom model will be around £600,000 per annum (if using OpenAI custom model).</li>
    <li>Otherwise, the cost will be greater, possibly up to £50 million.</li>
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
  return `<div class="${"modal " + escape("fade-in", true) + " svelte-1lf0y8n"}"${add_attribute("id", id, 0)}><span class="close svelte-1lf0y8n" data-svelte-h="svelte-hhcsdi">×</span> <img class="modal-image svelte-1lf0y8n"${add_attribute("src", modalsData[id].image, 0)}> <div class="modal-text svelte-1lf0y8n"><h1 class="svelte-1lf0y8n">${escape(modalsData[id].title)}</h1> <div class="toc">${validate_component(Toc, "Toc").$$render($$result, { class: "toc" }, {}, {})}</div> <div class="content-container svelte-1lf0y8n"><hr> <div class="content"><!-- HTML_TAG_START -->${content}<!-- HTML_TAG_END --></div></div></div> </div>`;
});
const css$1 = {
  code: ".instruction-card.svelte-laq1tm.svelte-laq1tm{background:#333;color:white;padding:1rem;border-radius:8px;margin:1rem;text-align:left;flex-shrink:0}.instruction-card.svelte-laq1tm button.svelte-laq1tm{margin-top:1rem;padding:0.5rem 1rem;background:#fff;border:none;color:#333;cursor:pointer;border-radius:4px}.instruction-card.svelte-laq1tm button.svelte-laq1tm:hover{background:#ddd}",
  map: `{"version":3,"file":"InstructionCard.svelte","sources":["InstructionCard.svelte"],"sourcesContent":["<script>\\n    import { createEventDispatcher } from 'svelte';\\n  \\n    const dispatch = createEventDispatcher();\\n  \\n    function dismiss() {\\n      dispatch('dismiss');\\n    }\\n  <\/script>\\n  \\n  <div class=\\"instruction-card\\">\\n    <h1>How to Use the Site</h1>\\n    <ul>\\n        <li><p>This site uses scrolling to move between cards.</p></li>\\n    \\n    <li><p>To move the cards left or right, use the scroll wheel on your mouse.</p></li>\\n    <li><p>To see information about the topic on a card, click on it.</p></li>\\n    <li><p>At the top of each card, there is a table of contents, click on a section to scroll there.</p></li>\\n    <li><p>To close the card press the 'x' in the top right corner</p></li>\\n    <li><p>If you cannot scroll please make sure Javascript is enabled in your browser</p></li>\\n    </ul>\\n    <p>Click the button below to dismiss this message, it will not be shown again.</p>\\n    <button on:click={dismiss}>Got it!</button>\\n  </div>\\n  \\n  <style>\\n    .instruction-card {\\n      background: #333; /* Grey background with some transparency */\\n      color: white;\\n      padding: 1rem;\\n      border-radius: 8px;\\n      margin: 1rem;\\n      text-align: left;\\n      flex-shrink: 0; /* Ensure it doesn't shrink */\\n    }\\n\\n    .instruction-card button {\\n      margin-top: 1rem;\\n      padding: 0.5rem 1rem;\\n      background: #fff;\\n      border: none;\\n      color: #333;\\n      cursor: pointer;\\n      border-radius: 4px;\\n    }\\n  \\n    .instruction-card button:hover {\\n      background: #ddd;\\n    }\\n  </style>\\n  "],"names":[],"mappings":"AA0BI,6CAAkB,CAChB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,CACf,CAEA,+BAAiB,CAAC,oBAAO,CACvB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,OAAO,CACf,aAAa,CAAE,GACjB,CAEA,+BAAiB,CAAC,oBAAM,MAAO,CAC7B,UAAU,CAAE,IACd"}`
};
const InstructionCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  $$result.css.add(css$1);
  return `<div class="instruction-card svelte-laq1tm"><h1 data-svelte-h="svelte-yqkvhw">How to Use the Site</h1> <ul data-svelte-h="svelte-1ffsoj2"><li><p>This site uses scrolling to move between cards.</p></li> <li><p>To move the cards left or right, use the scroll wheel on your mouse.</p></li> <li><p>To see information about the topic on a card, click on it.</p></li> <li><p>At the top of each card, there is a table of contents, click on a section to scroll there.</p></li> <li><p>To close the card press the &#39;x&#39; in the top right corner</p></li> <li><p>If you cannot scroll please make sure Javascript is enabled in your browser</p></li></ul> <p data-svelte-h="svelte-1sq99no">Click the button below to dismiss this message, it will not be shown again.</p> <button class="svelte-laq1tm" data-svelte-h="svelte-zzef9w">Got it!</button> </div>`;
});
const css = {
  code: ".text-overlay.svelte-1sh12nl{overflow:hidden}.darker.svelte-1sh12nl{filter:brightness(0.7)}",
  map: `{"version":3,"file":"main.svelte","sources":["main.svelte"],"sourcesContent":["<script>\\n  import { onMount, onDestroy } from 'svelte';\\n  import { goto } from '$app/navigation'; // Import goto from SvelteKit\\n  import Modal from './Modal.svelte'; // Import the Modal component\\n  import './styles.css';\\n  import InstructionCard from './InstructionCard.svelte';\\n\\n  let showInstructions = true;\\n  let isModalOpen = false;\\n  let currentModalId;\\n  let modal = null;\\n  let track;\\n  let isMouseDown = false;\\n  let initialMouseX = 0;\\n  let lastKnownPercentage = -10;\\n  let dragSensitivity = 0.01;\\n  let scrollSensitivity = 0.2;\\nlet isMobile = false;\\n  const isBrowser = typeof window !== 'undefined';\\n\\n  function dismissInstructions() {\\n    localStorage.setItem('instructionsDismissed', 'true');\\n    showInstructions = false;\\n  }\\n  function openModal(modalId) {\\n    isModalOpen = true;\\n    currentModalId = modalId;\\n    goto(\`#\${modalId}\`, { replaceState: true });\\n  }\\n\\n  function closeModal() {\\n    isModalOpen = false;\\n    currentModalId = null;\\n    goto('/', { replaceState: true });\\n  }\\n\\n  \\n\\n  function handleMouseDown(e) {\\n    if (!isModalOpen) {\\n      isMouseDown = true;\\n      initialMouseX = e.clientX;\\n    }\\n  }\\n\\n  function handleMouseMove(e) {\\n    if (isMouseDown && !isModalOpen && !isMobile) {\\n      const mouseDelta = initialMouseX - e.clientX;\\n      const maxDelta = window.innerWidth / 2;\\n\\n      lastKnownPercentage = Math.max(\\n        Math.min(lastKnownPercentage + (mouseDelta / maxDelta) * -100 * dragSensitivity, -10),\\n        -100\\n      );\\n\\n      updateTransform();\\n    }\\n  }\\n  function handleResize() {\\n    isMobile = window.innerWidth <= 600;\\n    if (isMobile) {\\n        scrollOnLoad(-50);\\n        window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n        window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n        window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n        window.removeEventListener(\\"wheel\\", handleWheel);\\n    } else {\\n      scrollOnLoad(-10);\\n        window.addEventListener(\\"mousedown\\", handleMouseDown);\\n        window.addEventListener(\\"mousemove\\", handleMouseMove);\\n        window.addEventListener(\\"mouseup\\", handleMouseUp);\\n        window.addEventListener(\\"wheel\\", handleWheel, { passive: false });\\n    }\\n}\\n\\n  function handleMouseUp() {\\n    isMouseDown = false;\\n  }\\n\\n  function handleWheel(e) {\\n    if (!isModalOpen && !isMobile) {\\n      const delta = e.deltaY || e.detail || e.wheelDelta;\\n      const scrollAmount = delta * scrollSensitivity;\\n      const maxDelta = window.innerHeight / 2;\\n\\n      lastKnownPercentage = Math.max(\\n        Math.min(lastKnownPercentage + (scrollAmount / maxDelta) * -100, -10),\\n        -100\\n      );\\n\\n      updateTransform();\\n      e.preventDefault();\\n    }\\n  }\\n  function scrollOnLoad(x) {\\n    console.log(x);\\n    track.style.transform = \`translate(\${x}%, -50%)\`;\\n\\nfor (const image of track.getElementsByClassName(\\"image\\")) {\\n  image.style.objectPosition = \`\${100 + -10}% center\`;\\n}\\n  }\\n  function updateTransform() {\\n    track.style.transform = \`translate(\${lastKnownPercentage}%, -50%)\`;\\n\\n    for (const image of track.getElementsByClassName(\\"image\\")) {\\n      image.style.objectPosition = \`\${100 + lastKnownPercentage}% center\`;\\n    }\\n  }\\n\\n  if (isBrowser) {\\n    function handlePopState() {\\n      isModalOpen = false;\\n      currentModalId = null;\\n    }\\n    onMount(() => {\\n      const dismissed = localStorage.getItem('instructionsDismissed');\\n        showInstructions = !dismissed;\\n\\n        track = document.getElementById(\\"image-track\\");\\n        handleResize();\\n\\n        if (isMobile) {\\n            window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n            window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n            window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n            window.removeEventListener(\\"wheel\\", handleWheel);\\n        } else {\\n            window.addEventListener(\\"mousedown\\", handleMouseDown);\\n            window.addEventListener(\\"mousemove\\", handleMouseMove);\\n            window.addEventListener(\\"mouseup\\", handleMouseUp);\\n            window.addEventListener(\\"wheel\\", handleWheel, { passive: false });\\n        }\\n\\n        window.addEventListener('popstate', handlePopState);\\n        window.addEventListener('resize', handleResize);\\n    });\\n\\n    onDestroy(() => {\\n      window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n        window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n        window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n        window.removeEventListener(\\"wheel\\", handleWheel);\\n        window.removeEventListener('popstate', handlePopState);\\n        window.removeEventListener('resize', handleResize);\\n    });\\n  }\\n\\n<\/script>\\n<div id=\\"image-track\\">\\n  {#if showInstructions}\\n\\n      <InstructionCard on:dismiss={dismissInstructions} />\\n    {/if}\\n  <div class=\\"image-container\\" on:click={() => openModal('modal1')}>\\n    <img class=\\"image\\" src=\\"/about.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">About</div>\\n  </div>\\n  <div class=\\"image-container\\" on:click={() => openModal('modal2')}>\\n    <img class=\\"image\\" src=\\"/Ad01.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">Python</div>\\n  </div>\\n  <div class=\\"image-container \\" on:click={() => openModal('modal3')}>\\n    <img class=\\"image darker\\" src=\\"/HTML.webp\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">HTML</div>\\n  </div>\\n  <div class=\\"image-container\\" on:click={() => openModal('modal4')}>\\n    <img class=\\"image\\" src=\\"/AiEmer.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">AI/Emerging Technologies</div>\\n  </div>\\n  <div class=\\"image-container\\" on:click={() => openModal('modal5')}>\\n    <img class=\\"image darker\\" src=\\"/amazon.jpeg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">Amazon Technologies Project</div>\\n  </div>\\n</div>\\n\\n<style>\\n  .text-overlay {\\n    overflow: hidden;\\n  }\\n  .darker {\\n    filter: brightness(0.7);\\n  }\\n  </style>\\n{#if isModalOpen}\\n<Modal id={currentModalId} onClose={closeModal} />\\n{/if}\\n"],"names":[],"mappings":"AAiLE,4BAAc,CACZ,QAAQ,CAAE,MACZ,CACA,sBAAQ,CACN,MAAM,CAAE,WAAW,GAAG,CACxB"}`
};
let dragSensitivity = 0.01;
let scrollSensitivity = 0.2;
const Main = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  function handleMouseDown(e) {
    if (!isModalOpen) {
      isMouseDown = true;
      initialMouseX = e.clientX;
    }
  }
  function handleMouseMove(e) {
    if (isMouseDown && !isModalOpen && !isMobile) {
      const mouseDelta = initialMouseX - e.clientX;
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
  function handleWheel(e) {
    if (!isModalOpen && !isMobile) {
      const delta = e.deltaY || e.detail || e.wheelDelta;
      const scrollAmount = delta * scrollSensitivity;
      const maxDelta = window.innerHeight / 2;
      lastKnownPercentage = Math.max(Math.min(lastKnownPercentage + scrollAmount / maxDelta * -100, -10), -100);
      updateTransform();
      e.preventDefault();
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
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Main, "Layout").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
