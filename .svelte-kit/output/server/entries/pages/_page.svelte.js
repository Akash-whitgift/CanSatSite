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
  map: '{"version":3,"file":"Toc.svelte","sources":["Toc.svelte"],"sourcesContent":["\\n<script>\\n// prebuilt TOC component from Sveltekit\\nimport { createEventDispatcher, onMount } from \'svelte\';\\n    import { blur } from \'svelte/transition\';\\n    import { MenuIcon } from \'.\';\\n    export let activeHeading = null;\\n    export let activeHeadingScrollOffset = 100;\\n    export let activeTocLi = null;\\n    export let aside = undefined;\\n    export let breakpoint = 1000; // in pixels (smaller window width is considered mobile, larger is desktop)\\n    export let desktop = true;\\n    export let flashClickedHeadingsFor = 1500;\\n    export let getHeadingIds = (node) => node.id;\\n    export let getHeadingLevels = (node) => Number(node.nodeName[1]); // get the number from H1, H2, ...\\n    export let getHeadingTitles = (node) => node.textContent ?? ``;\\n    // the result of document.querySelectorAll(headingSelector). can be useful for binding\\n    export let headings = [];\\n    export let headingSelector = `:is(h2, h3, h4):not(.toc-exclude)`;\\n    export let hide = false;\\n    export let autoHide = true;\\n    export let keepActiveTocItemInView = true; // requires scrollend event browser support\\n    export let minItems = 0;\\n    export let nav = undefined;\\n    export let open = false;\\n    export let openButtonLabel = `Open table of contents`;\\n    // prettier-ignore\\n    export let reactToKeys = [`ArrowDown`, `ArrowUp`, ` `, `Enter`, `Escape`, `Tab`];\\n    export let pageBody = `body`;\\n    export let scrollBehavior = `smooth`;\\n    export let title = `On this page`;\\n    export let titleTag = `h2`;\\n    export let tocItems = [];\\n    export let warnOnEmpty = true;\\n    export let blurParams = { duration: 200 };\\n    let window_width;\\n    // dispatch open event when open changes\\n    const dispatch = createEventDispatcher();\\n    $: dispatch(`open`, { open });\\n    $: levels = headings.map(getHeadingLevels);\\n    $: minLevel = Math.min(...levels);\\n    $: desktop = window_width > breakpoint;\\n    function close(event) {\\n        if (!aside?.contains(event.target))\\n            open = false;\\n    }\\n    // (re-)query headings on mount and on route changes\\n    function requery_headings() {\\n        if (typeof document === `undefined`)\\n            return; // for SSR\\n        headings = [...document.querySelectorAll(headingSelector)];\\n        set_active_heading();\\n        if (headings.length === 0) {\\n            if (warnOnEmpty) {\\n                console.warn(`svelte-toc found no headings for headingSelector=\'${headingSelector}\'. ${autoHide ? `Hiding` : `Showing empty`} table of contents.`);\\n            }\\n            if (autoHide)\\n                hide = true;\\n        }\\n        else if (hide && autoHide) {\\n            hide = false;\\n        }\\n    }\\n    requery_headings();\\n    onMount(() => {\\n        if (typeof pageBody === `string`) {\\n            pageBody = document.querySelector(pageBody);\\n            if (!pageBody) {\\n                throw new Error(`Could not find page body element: ${pageBody}`);\\n            }\\n        }\\n        const mutation_observer = new MutationObserver(requery_headings);\\n        mutation_observer.observe(pageBody, { childList: true, subtree: true });\\n        return () => mutation_observer.disconnect();\\n    });\\n    function set_active_heading() {\\n        let idx = headings.length;\\n        while (idx--) {\\n            const { top } = headings[idx].getBoundingClientRect();\\n            // loop through headings from last to first until we find one that the viewport already\\n            // scrolled past. if none is found, set make first heading active\\n            if (top < activeHeadingScrollOffset || idx === 0) {\\n                activeHeading = headings[idx];\\n                activeTocLi = tocItems[idx];\\n                return; // exit while loop if updated active heading\\n            }\\n        }\\n    }\\n    // click and key handler for ToC items that scrolls to the heading\\n    const li_click_key_handler = (node) => (event) => {\\n        if (event instanceof KeyboardEvent && ![`Enter`, ` `].includes(event.key))\\n            return;\\n        open = false;\\n        node.scrollIntoView?.({ behavior: scrollBehavior, block: `start` });\\n        const id = getHeadingIds && getHeadingIds(node);\\n        if (id)\\n            history.replaceState({}, ``, `#${id}`);\\n        if (flashClickedHeadingsFor) {\\n            node.classList.add(`toc-clicked`);\\n            setTimeout(() => node.classList.remove(`toc-clicked`), flashClickedHeadingsFor);\\n        }\\n    };\\n    function scroll_to_active_toc_item(behavior = `smooth`) {\\n        if (keepActiveTocItemInView && activeTocLi && nav) {\\n            // scroll the active ToC item into the middle of the ToC container\\n            const top = activeTocLi?.offsetTop - nav.offsetHeight / 2;\\n            nav?.scrollTo?.({ top, behavior });\\n        }\\n    }\\n    // ensure active ToC is in view when ToC opens on mobile\\n    $: if (open && nav) {\\n        set_active_heading();\\n        scroll_to_active_toc_item(`instant`);\\n    }\\n    // enable keyboard navigation\\n    function on_keydown(event) {\\n        if (!reactToKeys || !reactToKeys.includes(event.key))\\n            return;\\n        // `:hover`.at(-1) returns the most deeply nested hovered element\\n        const hovered = [...document.querySelectorAll(`:hover`)].at(-1);\\n        const toc_is_hovered = hovered && nav?.contains(hovered);\\n        if (\\n        // return early if ToC does not have focus\\n        (event.key === `Tab` && !nav?.contains(document.activeElement)) ||\\n            // ignore keyboard events when ToC is closed on mobile or when ToC is not currently hovered on desktop\\n            (!desktop && !open) ||\\n            (desktop && !toc_is_hovered))\\n            return;\\n        event.preventDefault();\\n        if (event.key === `Escape` && open)\\n            open = false;\\n        else if (event.key === `Tab` && !aside?.contains(document.activeElement))\\n            open = false;\\n        else if (activeTocLi) {\\n            if (event.key === `ArrowDown`) {\\n                const next = activeTocLi.nextElementSibling;\\n                if (next)\\n                    activeTocLi = next;\\n            }\\n            if (event.key === `ArrowUp`) {\\n                const prev = activeTocLi.previousElementSibling;\\n                if (prev)\\n                    activeTocLi = prev;\\n            }\\n            // update active heading\\n            activeHeading = headings[tocItems.indexOf(activeTocLi)];\\n        }\\n        if (activeTocLi && [` `, `Enter`].includes(event.key)) {\\n            activeHeading?.scrollIntoView({ behavior: `instant`, block: `start` });\\n        }\\n    }\\n    <\/script>\\n    \\n    <svelte:window\\n      bind:innerWidth={window_width}\\n      on:scroll={set_active_heading}\\n      on:click={close}\\n      on:scrollend={() => {\\n        // wait for scroll end since Chrome doesn\'t support multiple simultaneous scrolls,\\n        // smooth or otherwise (https://stackoverflow.com/a/63563437)\\n        scroll_to_active_toc_item()\\n      }}\\n      on:resize={() => {\\n        desktop = window_width > breakpoint\\n        set_active_heading()\\n      }}\\n      on:keydown={on_keydown}\\n    />\\n    \\n    <aside\\n      class=\\"toc\\"\\n      class:desktop\\n      class:hidden={hide}\\n      class:mobile={!desktop}\\n      bind:this={aside}\\n      hidden={hide}\\n      aria-hidden={hide}\\n    >\\n      {#if !open && !desktop && headings.length >= minItems}\\n        <button\\n          on:click|preventDefault|stopPropagation={() => (open = true)}\\n          aria-label={openButtonLabel}\\n        >\\n          <slot name=\\"open-toc-icon\\">\\n            <MenuIcon width=\\"1em\\" />\\n          </slot>\\n        </button>\\n      {/if}\\n      {#if open || (desktop && headings.length >= minItems)}\\n        <nav transition:blur={blurParams} bind:this={nav}>\\n          {#if title}\\n            <slot name=\\"title\\">\\n              <svelte:element this={titleTag} class=\\"toc-title toc-exclude\\">\\n                {title}\\n              </svelte:element>\\n            </slot>\\n          {/if}\\n          <ol>\\n            {#each headings as heading, idx}\\n              <li\\n                style:margin=\\"0 0 0 {levels[idx] - minLevel}em\\"\\n                style:font-size=\\"{2 - 0.2 * (levels[idx] - minLevel)}ex\\"\\n                class:active={activeTocLi === tocItems[idx]}\\n                on:click={li_click_key_handler(heading)}\\n                on:keyup={li_click_key_handler(heading)}\\n                bind:this={tocItems[idx]}\\n                role=\\"menuitem\\"\\n              >\\n                <slot name=\\"toc-item\\" {heading} {idx}>\\n                  {getHeadingTitles(heading)}\\n                </slot>\\n              </li>\\n            {/each}\\n          </ol>\\n        </nav>\\n      {/if}\\n    </aside>\\n    \\n    <style>\\n      :where(aside.toc) {\\n        box-sizing: border-box;\\n        height: max-content;\\n        overflow-wrap: break-word;\\n        font-size: var(--toc-font-size);\\n        min-width: var(--toc-min-width);\\n        width: var(--toc-width);\\n        z-index: var(--toc-z-index, 1);\\n      }\\n      :where(aside.toc > nav) {\\n        overflow: var(--toc-overflow, auto);\\n        overscroll-behavior: contain;\\n        max-height: var(--toc-max-height, 90vh);\\n        padding: var(--toc-padding, 1em 1em 0);\\n      }\\n      :where(aside.toc > nav > ol) {\\n        list-style: var(--toc-ol-list-style, none);\\n        padding: var(--toc-ol-padding, 0);\\n        margin: var(--toc-ol-margin);\\n      }\\n      :where(.toc-title) {\\n        padding: var(--toc-title-padding);\\n        margin: var(--toc-title-margin);\\n      }\\n      :where(aside.toc > nav > ol > li) {\\n        cursor: pointer;\\n        color: var(--toc-li-color);\\n        border: var(--toc-li-border);\\n        border-radius: var(--toc-li-border-radius);\\n        margin: var(--toc-li-margin);\\n        padding: var(--toc-li-padding, 2pt 4pt);\\n      }\\n      :where(aside.toc > nav > ol > li:hover) {\\n        color: var(--toc-li-hover-color, cornflowerblue);\\n        background: var(--toc-li-hover-bg);\\n      }\\n      :where(aside.toc > nav > ol > li.active) {\\n        background: var(--toc-active-bg, cornflowerblue);\\n        color: var(--toc-active-color, white);\\n        font-weight: var(--toc-active-font-weight);\\n        border: var(--toc-active-border);\\n        border-width: var(--toc-active-border-width);\\n        border-radius: var(--toc-active-border-radius, 2pt);\\n      }\\n      :where(aside.toc > button) {\\n        border: none;\\n        bottom: 0;\\n        cursor: pointer;\\n        font-size: 2em;\\n        line-height: 0;\\n        position: absolute;\\n        right: 0;\\n        z-index: 2;\\n        padding: var(--toc-mobile-btn-padding, 2pt 3pt);\\n        border-radius: var(--toc-mobile-btn-border-radius, 4pt);\\n        background: var(--toc-mobile-btn-bg, rgba(255, 255, 255, 0.2));\\n        color: var(--toc-mobile-btn-color, black);\\n      }\\n      :where(aside.toc > nav) {\\n        position: relative;\\n      }\\n      :where(aside.toc > nav > .toc-title) {\\n        margin-top: 0;\\n      }\\n    \\n      :where(aside.toc.mobile) {\\n        visibility: hidden;\\n        position: absolute;\\n        bottom: var(--toc-mobile-bottom, 1em);\\n        right: var(--toc-mobile-right, 1em);\\n      }\\n      :where(aside.toc.mobile > nav) {\\n        border-radius: 3pt;\\n        right: 0;\\n        z-index: -1;\\n        box-sizing: border-box;\\n        background: var(--toc-mobile-bg, #444);\\n        width: var(--toc-mobile-width, 18em);\\n        box-shadow: var(--toc-mobile-shadow);\\n        border: var(--toc-mobile-border);\\n      }\\n    \\n      :where(aside.toc.desktop) {\\n        margin: var(--toc-desktop-aside-margin);\\n      }\\n      :where(aside.toc.desktop) {\\n        position: sticky;\\n        background: #444;\\n        margin: var(--toc-desktop-nav-margin);\\n        max-width: var(--toc-desktop-max-width);\\n        top: var(--toc-desktop-sticky-top, 2em);\\n        border-radius: 8px;\\n        padding: 4px;\\n      }\\n    </style>\\n    "],"names":[],"mappings":"cA2NM,OAAO,KAAK,IAAI,CAAE,CAChB,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,WAAW,CACnB,aAAa,CAAE,UAAU,CACzB,SAAS,CAAE,IAAI,eAAe,CAAC,CAC/B,SAAS,CAAE,IAAI,eAAe,CAAC,CAC/B,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,OAAO,CAAE,IAAI,aAAa,CAAC,EAAE,CAC/B,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAE,CACtB,QAAQ,CAAE,IAAI,cAAc,CAAC,KAAK,CAAC,CACnC,mBAAmB,CAAE,OAAO,CAC5B,UAAU,CAAE,IAAI,gBAAgB,CAAC,KAAK,CAAC,CACvC,OAAO,CAAE,IAAI,aAAa,CAAC,UAAU,CACvC,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAE,CAC3B,UAAU,CAAE,IAAI,mBAAmB,CAAC,KAAK,CAAC,CAC1C,OAAO,CAAE,IAAI,gBAAgB,CAAC,EAAE,CAAC,CACjC,MAAM,CAAE,IAAI,eAAe,CAC7B,eACA,OAAO,UAAU,CAAE,CACjB,OAAO,CAAE,IAAI,mBAAmB,CAAC,CACjC,MAAM,CAAE,IAAI,kBAAkB,CAChC,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,CAAE,CAChC,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,MAAM,CAAE,IAAI,eAAe,CAAC,CAC5B,aAAa,CAAE,IAAI,sBAAsB,CAAC,CAC1C,MAAM,CAAE,IAAI,eAAe,CAAC,CAC5B,OAAO,CAAE,IAAI,gBAAgB,CAAC,QAAQ,CACxC,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,MAAM,CAAE,CACtC,KAAK,CAAE,IAAI,oBAAoB,CAAC,eAAe,CAAC,CAChD,UAAU,CAAE,IAAI,iBAAiB,CACnC,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,OAAO,CAAE,CACvC,UAAU,CAAE,IAAI,eAAe,CAAC,eAAe,CAAC,CAChD,KAAK,CAAE,IAAI,kBAAkB,CAAC,MAAM,CAAC,CACrC,WAAW,CAAE,IAAI,wBAAwB,CAAC,CAC1C,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAChC,YAAY,CAAE,IAAI,yBAAyB,CAAC,CAC5C,aAAa,CAAE,IAAI,0BAA0B,CAAC,IAAI,CACpD,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,MAAM,CAAE,CACzB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,OAAO,CACf,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,CAAC,CACd,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,wBAAwB,CAAC,QAAQ,CAAC,CAC/C,aAAa,CAAE,IAAI,8BAA8B,CAAC,IAAI,CAAC,CACvD,UAAU,CAAE,IAAI,mBAAmB,CAAC,yBAAyB,CAAC,CAC9D,KAAK,CAAE,IAAI,sBAAsB,CAAC,MAAM,CAC1C,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAE,CACtB,QAAQ,CAAE,QACZ,eACA,OAAO,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,UAAU,CAAE,CACnC,UAAU,CAAE,CACd,eAEA,OAAO,KAAK,IAAI,OAAO,CAAE,CACvB,UAAU,CAAE,MAAM,CAClB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,mBAAmB,CAAC,IAAI,CAAC,CACrC,KAAK,CAAE,IAAI,kBAAkB,CAAC,IAAI,CACpC,eACA,OAAO,KAAK,IAAI,OAAO,CAAC,CAAC,CAAC,GAAG,CAAE,CAC7B,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,UAAU,CACtB,UAAU,CAAE,IAAI,eAAe,CAAC,KAAK,CAAC,CACtC,KAAK,CAAE,IAAI,kBAAkB,CAAC,KAAK,CAAC,CACpC,UAAU,CAAE,IAAI,mBAAmB,CAAC,CACpC,MAAM,CAAE,IAAI,mBAAmB,CACjC,eAEA,OAAO,KAAK,IAAI,QAAQ,CAAE,CACxB,MAAM,CAAE,IAAI,0BAA0B,CACxC,eACA,OAAO,KAAK,IAAI,QAAQ,CAAE,CACxB,QAAQ,CAAE,MAAM,CAChB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,wBAAwB,CAAC,CACrC,SAAS,CAAE,IAAI,uBAAuB,CAAC,CACvC,GAAG,CAAE,IAAI,wBAAwB,CAAC,IAAI,CAAC,CACvC,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,GACX"}'
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
  code: ".modal.svelte-181otsg{display:block;position:fixed;z-index:1;padding-top:60px;left:0;top:0;width:100%;height:100%;overflow:hidden;overflow-y:hidden;background-color:rgba(0, 0, 0, 0.4);opacity:1;transition:opacity 0.3s ease}.container.svelte-181otsg{overflow:visible;margin:0;padding:0;width:100%;height:100%}.fade-in.svelte-181otsg{opacity:1}.fade-out.svelte-181otsg{opacity:0}.modal-image.svelte-181otsg{display:block;margin:0 auto;width:110%;height:110vh;object-fit:cover;--webkit-user-select:none;user-select:none;-webkit-user-drag:none;transform:translateX(-2.5%);transform:translateY(-10%);overflow:hidden}.close.svelte-181otsg{color:#aaa;float:right;font-size:28px;font-weight:bold}.close.svelte-181otsg:hover,.close.svelte-181otsg:focus{text-decoration:none;cursor:pointer}.modal-text.svelte-181otsg{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);background-color:rgba(20, 20, 20, 0.8);padding:20px;border-radius:10px;text-align:Left;width:80%;height:80%;color:white;overflow-y:scroll}h1.svelte-181otsg{font-size:3.5em;margin:5px}@media(max-width: 600px){h1.svelte-181otsg{font-size:2.5em}img.svelte-181otsg{width:100%;height:auto}}.modal-text.svelte-181otsg::-webkit-scrollbar{width:2px;border-radius:80%}.modal-text.svelte-181otsg::-webkit-scrollbar-track{background:#000000;width:0;visibility:hidden}.modal-text.svelte-181otsg::-webkit-scrollbar-thumb{background:#ffffff;border-radius:2px}.content-container.svelte-181otsg{flex:1;padding-right:20px;overflow-y:hidden}",
  map: `{"version":3,"file":"Modal.svelte","sources":["Modal.svelte"],"sourcesContent":["<script>\\n  import { onMount } from 'svelte';\\n  import { fade } from 'svelte/transition';\\n  import  Toc from './Toc.svelte'\\n  export let id;\\n  export let onClose;\\n\\n  let content;\\n  let isClosing = false;\\n  let tocHtml = '';\\n  const modalsData = {\\n    modal1: {\\n      title: 'Engineering',\\n      content: \`\\n      <p>Engineering page</p>\\n<style>\\n  a {\\n    color:white;\\n    text-decoration: underline;\\n  }\\n  </style>\\n\\n\\n\\n      \`,\\n      image: \\"/d41586-024-02191-1_27293496.jpg\\"\\n    },\\n    modal2: {\\n      title: 'Sample',\\n      content: \`\\n      <h2>Sample</h2>\\n    <p>Sample</p>\\n      \`,\\n      image: \\"/Ad01.jpg\\"\\n    },\\n    modal3: {\\n      title: 'Sample',\\n      content: \`\\n\\n     <h2>Sample</h2>\\n    <p>Sample</p>\\n      \`,\\n      image: \\"/HTML.webp\\"\\n    },\\n    modal4: {\\n      title: 'Sample',\\n      content: \`\\n     <h2>Sample</h2>\\n    <p>Sample</p>\\n      \`,\\n      image: \\"/AiEmer.jpg\\"\\n    },\\n    modal5: {\\n      title: 'Sample',\\n      content: \`\\n      <h2>Sample</h2>\\n    <p>Sample</p>\\n      \`,\\n      image: \\"/amazon.jpeg\\"\\n    }\\n  };\\n\\n  onMount(() => {\\n    content = modalsData[id].content;\\n    tocHtml = generateTOC(content);\\n  });\\n\\n  function handleClose() {\\n    isClosing = true;\\n    setTimeout(() => {\\n      if (typeof onClose === 'function') {\\n        onClose();\\n      }\\n      isClosing = false;\\n    }, 1); // Matches the duration of the fade-out transition\\n  }\\n\\n\\n\\n\\n\\nfunction generateTOC(content) {\\n  const tempDiv = document.createElement('div');\\n  tempDiv.innerHTML = content;\\n  const headings = tempDiv.querySelectorAll('h2, h3');\\n   let tocHtml = '';\\n  headings.forEach((heading, index) => {\\n    const level = heading.tagName.toLowerCase();\\n    const text = heading.textContent;\\n    const id = \`section-\${index}\`; // Generate unique ID for each section\\n   heading.id = id; // Assign ID to the heading for linking\\n    const listItem = \`<li><a href=\\"#\${id}\\"><\${level}>\${text}</\${level}></a></li>\`;\\n    tocHtml += listItem;\\n  });\\n  return \`<ul>\${tocHtml}</ul>\`;\\n}\\n\\nfunction scrollToSection(id) {\\n  const section = document.getElementById(id);\\n    if (section) {\\n      section.scrollIntoView({ behavior: 'smooth' });\\n    }\\n}\\n\\n\\n\\n\\n\\n\\n\\n\\n<\/script>\\n\\n<div class=\\"modal {isClosing ? 'fade-out' : 'fade-in'}\\" id={id} transition:fade={{ duration: 300 }}>\\n  <div class='container'>\\n  <span class=\\"close\\" id='closecross' on:click={handleClose}>&times;</span>\\n  <img class=\\"modal-image\\" src={modalsData[id].image} />\\n  \\n  <div class=\\"modal-text\\">\\n    <h1>{modalsData[id].title}</h1>\\n    <div class=\\"toc\\">\\n      <Toc class='toc'> </Toc>\\n      </div>\\n    <div class=\\"content-container\\">\\n<hr>\\n      <div class=\\"content\\">\\n        {@html content}\\n      </div>\\n    </div>\\n  </div>\\n  </div>\\n</div>\\n\\n<style>\\n\\n  .modal {\\n    display: block;\\n    position: fixed;\\n    z-index: 1;\\n    padding-top: 60px;\\n    left: 0;\\n    top: 0;\\n    width: 100%;\\n    height: 100%;\\n    overflow: hidden;\\n    overflow-y: hidden;\\n    background-color: rgba(0, 0, 0, 0.4);\\n    opacity: 1;\\n    transition: opacity 0.3s ease;\\n  }\\n  .container {\\n    overflow: visible;\\n    margin: 0;\\n    padding: 0;\\n    width: 100%;\\n    height: 100%;\\n  }\\n  .fade-in {\\n    opacity: 1;\\n  }\\n  .fade-out {\\n    opacity: 0;\\n  }\\n  .modal-image {\\n    display: block;\\n    margin: 0 auto;\\n    width: 110%;\\n    height: 110vh;\\n  object-fit: cover;\\n  --webkit-user-select: none;\\n  user-select: none;\\n  -webkit-user-drag: none;\\n  transform: translateX(-2.5%);\\n  transform: translateY(-10%);\\n  overflow: hidden;\\n  }\\n\\n  .close {\\n    color: #aaa;\\n    float: right;\\n    font-size: 28px;\\n    font-weight: bold;\\n  }\\n  .close:hover,\\n  .close:focus {\\n    text-decoration: none;\\n    cursor: pointer;\\n  }\\n  .modal-text {\\n    position: absolute;\\n    top: 50%;\\n    left: 50%;\\n    transform: translate(-50%, -50%);\\n    background-color: rgba(20, 20, 20, 0.8);\\n    padding: 20px;\\n    border-radius: 10px;\\n    text-align: Left;\\n    width: 80%;\\n    height: 80%;\\n    color: white;\\n    overflow-y: scroll;\\n  }\\n  h1 {\\n    font-size: 3.5em;\\n    margin: 5px;\\n  }\\n  @media (max-width: 600px) {\\n  h1 {\\n    font-size:2.5em;\\n\\n  }\\n  img {\\n    width: 100%;\\n    height: auto;\\n  }\\n}\\n.modal-text::-webkit-scrollbar {\\nwidth: 2px;\\n  border-radius: 80%;\\n}\\n.modal-text::-webkit-scrollbar-track{\\nbackground: #000000;\\n  width:0;\\n  visibility: hidden;\\n}\\n.modal-text::-webkit-scrollbar-thumb {\\nbackground: #ffffff;\\nborder-radius: 2px;\\n}\\n\\n  .content-container {\\n    flex: 1;\\n    padding-right: 20px; /* Adjust spacing between TOC and content */\\n    overflow-y: hidden; /* Allow scrolling if content is too long */\\n  }\\n\\n\\n</style>\\n"],"names":[],"mappings":"AAuIE,qBAAO,CACL,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,IAAI,CACjB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,CAChB,UAAU,CAAE,MAAM,CAClB,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACpC,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,OAAO,CAAC,IAAI,CAAC,IAC3B,CACA,yBAAW,CACT,QAAQ,CAAE,OAAO,CACjB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV,CACA,uBAAS,CACP,OAAO,CAAE,CACX,CACA,wBAAU,CACR,OAAO,CAAE,CACX,CACA,2BAAa,CACX,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACf,UAAU,CAAE,KAAK,CACjB,oBAAoB,CAAE,IAAI,CAC1B,WAAW,CAAE,IAAI,CACjB,iBAAiB,CAAE,IAAI,CACvB,SAAS,CAAE,WAAW,KAAK,CAAC,CAC5B,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,QAAQ,CAAE,MACV,CAEA,qBAAO,CACL,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IACf,CACA,qBAAM,MAAM,CACZ,qBAAM,MAAO,CACX,eAAe,CAAE,IAAI,CACrB,MAAM,CAAE,OACV,CACA,0BAAY,CACV,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CACvC,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MACd,CACA,iBAAG,CACD,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,GACV,CACA,MAAO,YAAY,KAAK,CAAE,CAC1B,iBAAG,CACD,UAAU,KAEZ,CACA,kBAAI,CACF,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV,CACF,CACA,0BAAW,mBAAoB,CAC/B,KAAK,CAAE,GAAG,CACR,aAAa,CAAE,GACjB,CACA,0BAAW,yBAAyB,CACpC,UAAU,CAAE,OAAO,CACjB,MAAM,CAAC,CACP,UAAU,CAAE,MACd,CACA,0BAAW,yBAA0B,CACrC,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GACf,CAEE,iCAAmB,CACjB,IAAI,CAAE,CAAC,CACP,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,MACd"}`
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { onClose } = $$props;
  let content;
  const modalsData = {
    modal1: {
      title: "Engineering",
      content: `
      <p>Engineering page</p>
<style>
  a {
    color:white;
    text-decoration: underline;
  }
  </style>



      `,
      image: "/d41586-024-02191-1_27293496.jpg"
    },
    modal2: {
      title: "Sample",
      content: `
      <h2>Sample</h2>
    <p>Sample</p>
      `,
      image: "/Ad01.jpg"
    },
    modal3: {
      title: "Sample",
      content: `

     <h2>Sample</h2>
    <p>Sample</p>
      `,
      image: "/HTML.webp"
    },
    modal4: {
      title: "Sample",
      content: `
     <h2>Sample</h2>
    <p>Sample</p>
      `,
      image: "/AiEmer.jpg"
    },
    modal5: {
      title: "Sample",
      content: `
      <h2>Sample</h2>
    <p>Sample</p>
      `,
      image: "/amazon.jpeg"
    }
  };
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0)
    $$bindings.onClose(onClose);
  $$result.css.add(css$2);
  return `<div class="${"modal " + escape("fade-in", true) + " svelte-181otsg"}"${add_attribute("id", id, 0)}><div class="container svelte-181otsg"><span class="close svelte-181otsg" id="closecross" data-svelte-h="svelte-1l7plis">×</span> <img class="modal-image svelte-181otsg"${add_attribute("src", modalsData[id].image, 0)}> <div class="modal-text svelte-181otsg"><h1 class="svelte-181otsg">${escape(modalsData[id].title)}</h1> <div class="toc">${validate_component(Toc, "Toc").$$render($$result, { class: "toc" }, {}, {})}</div> <div class="content-container svelte-181otsg"><hr> <div class="content"><!-- HTML_TAG_START -->${content}<!-- HTML_TAG_END --></div></div></div></div> </div>`;
});
const css$1 = {
  code: ".instruction-card.svelte-laq1tm.svelte-laq1tm{background:#333;color:white;padding:1rem;border-radius:8px;margin:1rem;text-align:left;flex-shrink:0}.instruction-card.svelte-laq1tm button.svelte-laq1tm{margin-top:1rem;padding:0.5rem 1rem;background:#fff;border:none;color:#333;cursor:pointer;border-radius:4px}.instruction-card.svelte-laq1tm button.svelte-laq1tm:hover{background:#ddd}",
  map: `{"version":3,"file":"InstructionCard.svelte","sources":["InstructionCard.svelte"],"sourcesContent":["<script>\\n   import { onMount} from 'svelte';\\n    import { createEventDispatcher } from 'svelte';\\n    const isBrowser = typeof window !== 'undefined';\\n    let isFirefox = false;\\n\\n    onMount(() => {\\n    isFirefox = (navigator.userAgent.indexOf('Firefox') !== -1);\\n\\n    if (isFirefox) {\\n        console.log('firefox detected');\\n    }\\n    });\\n    const dispatch = createEventDispatcher();\\n  \\n    function dismiss() {\\n      dispatch('dismiss');\\n    }\\n  <\/script>\\n  \\n  <div class=\\"instruction-card\\">\\n    <h1>How to Use the Site</h1>\\n    <ul>\\n      {#if isFirefox}\\n      <li><p style='font-size: 1.8em;'><b><u>Firefox is known to have issues with the table of contents, for the best experience use chrome</u></b></p></li>\\n      {/if}\\n    <li><p>This site uses scrolling to move between cards.</p></li>\\n    <li><p>To move the cards left or right, use the scroll wheel on your mouse.</p></li>\\n    <li><p>To see information about the topic on a card, click on it.</p></li>\\n    <li><p>At the top of each card, there is a table of contents, click on a section to scroll there.</p></li>\\n    <li><p>To close the card press the 'x' in the top right corner</p></li>\\n    <li><p>If you cannot scroll please make sure Javascript is enabled in your browser</p></li>\\n    </ul>\\n    <p>Click the button below to dismiss this message, it will not be shown again.</p>\\n    <button on:click={dismiss}>Got it!</button>\\n  </div>\\n  \\n  <style>\\n    .instruction-card {\\n      background: #333; /* Grey background with some transparency */\\n      color: white;\\n      padding: 1rem;\\n      border-radius: 8px;\\n      margin: 1rem;\\n      text-align: left;\\n      flex-shrink: 0; /* Ensure it doesn't shrink */\\n    }\\n\\n    .instruction-card button {\\n      margin-top: 1rem;\\n      padding: 0.5rem 1rem;\\n      background: #fff;\\n      border: none;\\n      color: #333;\\n      cursor: pointer;\\n      border-radius: 4px;\\n    }\\n  \\n    .instruction-card button:hover {\\n      background: #ddd;\\n    }\\n  </style>\\n  "],"names":[],"mappings":"AAsCI,6CAAkB,CAChB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,CACf,CAEA,+BAAiB,CAAC,oBAAO,CACvB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,OAAO,CACf,aAAa,CAAE,GACjB,CAEA,+BAAiB,CAAC,oBAAM,MAAO,CAC7B,UAAU,CAAE,IACd"}`
};
const InstructionCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  $$result.css.add(css$1);
  return `<div class="instruction-card svelte-laq1tm"><h1 data-svelte-h="svelte-yqkvhw">How to Use the Site</h1> <ul>${``} <li data-svelte-h="svelte-54qq1q"><p>This site uses scrolling to move between cards.</p></li> <li data-svelte-h="svelte-1bbx9lk"><p>To move the cards left or right, use the scroll wheel on your mouse.</p></li> <li data-svelte-h="svelte-1iurnme"><p>To see information about the topic on a card, click on it.</p></li> <li data-svelte-h="svelte-15uymth"><p>At the top of each card, there is a table of contents, click on a section to scroll there.</p></li> <li data-svelte-h="svelte-18sr52j"><p>To close the card press the &#39;x&#39; in the top right corner</p></li> <li data-svelte-h="svelte-xnpchy"><p>If you cannot scroll please make sure Javascript is enabled in your browser</p></li></ul> <p data-svelte-h="svelte-1sq99no">Click the button below to dismiss this message, it will not be shown again.</p> <button class="svelte-laq1tm" data-svelte-h="svelte-zzef9w">Got it!</button> </div>`;
});
const css = {
  code: ".text-overlay.svelte-1sh12nl{overflow:hidden}.darker.svelte-1sh12nl{filter:brightness(0.7)}",
  map: `{"version":3,"file":"main.svelte","sources":["main.svelte"],"sourcesContent":["<script>\\n  import { onMount, onDestroy } from 'svelte';\\n  import { goto } from '$app/navigation'; // Import goto from SvelteKit\\n  import Modal from './Modal.svelte'; // Import the Modal component\\n  import './styles.css';\\n  import InstructionCard from './InstructionCard.svelte';\\n\\n  let showInstructions = true;\\n  let isModalOpen = false;\\n  let currentModalId;\\n  let modal = null;\\n  let track;\\n  let isMouseDown = false;\\n  let initialMouseX = 0;\\n  let lastKnownPercentage = -10;\\n  let dragSensitivity = 0.01;\\n  let scrollSensitivity = 0.2;\\nlet isMobile = false;\\n  const isBrowser = typeof window !== 'undefined';\\n\\n  function dismissInstructions() {\\n    localStorage.setItem('instructionsDismissed', 'true');\\n    showInstructions = false;\\n  }\\n  function openModal(modalId) {\\n    isModalOpen = true;\\n    currentModalId = modalId;\\n    goto(\`#\${modalId}\`, { replaceState: true });\\n  }\\n\\n  function closeModal() {\\n    isModalOpen = false;\\n    currentModalId = null;\\n    goto('/', { replaceState: true });\\n  }\\n\\n  \\n\\n  function handleMouseDown(e) {\\n    if (!isModalOpen) {\\n      isMouseDown = true;\\n      initialMouseX = e.clientX;\\n    }\\n  }\\n\\n  function handleMouseMove(e) {\\n    if (isMouseDown && !isModalOpen && !isMobile) {\\n      const mouseDelta = initialMouseX - e.clientX;\\n      const maxDelta = window.innerWidth / 2;\\n\\n      lastKnownPercentage = Math.max(\\n        Math.min(lastKnownPercentage + (mouseDelta / maxDelta) * -100 * dragSensitivity, -10),\\n        -100\\n      );\\n\\n      updateTransform();\\n    }\\n  }\\n  function handleResize() {\\n    isMobile = window.innerWidth <= 600;\\n    if (isMobile) {\\n        scrollOnLoad(-50);\\n        window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n        window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n        window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n        window.removeEventListener(\\"wheel\\", handleWheel);\\n    } else {\\n      scrollOnLoad(-10);\\n        window.addEventListener(\\"mousedown\\", handleMouseDown);\\n        window.addEventListener(\\"mousemove\\", handleMouseMove);\\n        window.addEventListener(\\"mouseup\\", handleMouseUp);\\n        window.addEventListener(\\"wheel\\", handleWheel, { passive: false });\\n    }\\n}\\n\\n  function handleMouseUp() {\\n    isMouseDown = false;\\n  }\\n\\n  function handleWheel(e) {\\n    if (!isModalOpen && !isMobile) {\\n      const delta = e.deltaY || e.detail || e.wheelDelta;\\n      const scrollAmount = delta * scrollSensitivity;\\n      const maxDelta = window.innerHeight / 2;\\n\\n      lastKnownPercentage = Math.max(\\n        Math.min(lastKnownPercentage + (scrollAmount / maxDelta) * -100, -10),\\n        -100\\n      );\\n\\n      updateTransform();\\n      e.preventDefault();\\n    }\\n  }\\n  function scrollOnLoad(x) {\\n    console.log(x);\\n    track.style.transform = \`translate(\${x}%, -50%)\`;\\n\\nfor (const image of track.getElementsByClassName(\\"image\\")) {\\n  image.style.objectPosition = \`\${100 + -10}% center\`;\\n}\\n  }\\n  function updateTransform() {\\n    track.style.transform = \`translate(\${lastKnownPercentage}%, -50%)\`;\\n\\n    for (const image of track.getElementsByClassName(\\"image\\")) {\\n      image.style.objectPosition = \`\${100 + lastKnownPercentage}% center\`;\\n    }\\n  }\\n\\n  if (isBrowser) {\\n    function handlePopState() {\\n      isModalOpen = false;\\n      currentModalId = null;\\n    }\\n    onMount(() => {\\n      const dismissed = localStorage.getItem('instructionsDismissed');\\n        showInstructions = !dismissed;\\n\\n        track = document.getElementById(\\"image-track\\");\\n        handleResize();\\n\\n        if (isMobile) {\\n            window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n            window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n            window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n            window.removeEventListener(\\"wheel\\", handleWheel);\\n        } else {\\n            window.addEventListener(\\"mousedown\\", handleMouseDown);\\n            window.addEventListener(\\"mousemove\\", handleMouseMove);\\n            window.addEventListener(\\"mouseup\\", handleMouseUp);\\n            window.addEventListener(\\"wheel\\", handleWheel, { passive: false });\\n        }\\n\\n        window.addEventListener('popstate', handlePopState);\\n        window.addEventListener('resize', handleResize);\\n    });\\n\\n    onDestroy(() => {\\n      window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n        window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n        window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n        window.removeEventListener(\\"wheel\\", handleWheel);\\n        window.removeEventListener('popstate', handlePopState);\\n        window.removeEventListener('resize', handleResize);\\n    });\\n  }\\n\\n<\/script>\\n<div id=\\"image-track\\">\\n  {#if showInstructions}\\n\\n      <InstructionCard on:dismiss={dismissInstructions} />\\n    {/if}\\n  <div class=\\"image-container\\" on:click={() => openModal('modal1')}>\\n    <img class=\\"image\\" src=\\"/d41586-024-02191-1_27293496.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">Engineering</div>  <!-- Change title here -->\\n  </div>\\n  <div class=\\"image-container\\" on:click={() => openModal('modal2')}>\\n    <img class=\\"image\\" src=\\"/Ad01.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">Python</div>\\n  </div>\\n  <div class=\\"image-container \\" on:click={() => openModal('modal3')}>\\n    <img class=\\"image darker\\" src=\\"/HTML.webp\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">HTML</div>\\n  </div>\\n  <div class=\\"image-container\\" on:click={() => openModal('modal4')}>\\n    <img class=\\"image\\" src=\\"/AiEmer.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">AI/Emerging Technologies</div>\\n  </div>\\n  <div class=\\"image-container\\" on:click={() => openModal('modal5')}>\\n    <img class=\\"image darker\\" src=\\"/amazon.jpeg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">Amazon Technologies Project</div>\\n  </div>\\n</div>\\n\\n<style>\\n  .text-overlay {\\n    overflow: hidden;\\n  }\\n  .darker {\\n    filter: brightness(0.7);\\n  }\\n  </style>\\n{#if isModalOpen}\\n<Modal id={currentModalId} onClose={closeModal} />\\n{/if}"],"names":[],"mappings":"AAiLE,4BAAc,CACZ,QAAQ,CAAE,MACZ,CACA,sBAAQ,CACN,MAAM,CAAE,WAAW,GAAG,CACxB"}`
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
  return `<div id="image-track">${`${validate_component(InstructionCard, "InstructionCard").$$render($$result, {}, {}, {})}`} <div class="image-container" data-svelte-h="svelte-1akrkvj"><img class="image" src="/d41586-024-02191-1_27293496.jpg" draggable="false" data-active> <div class="text-overlay svelte-1sh12nl">Engineering</div> </div> <div class="image-container" data-svelte-h="svelte-9bcppm"><img class="image" src="/Ad01.jpg" draggable="false" data-active> <div class="text-overlay svelte-1sh12nl">Python</div></div> <div class="image-container " data-svelte-h="svelte-t3cmh"><img class="image darker svelte-1sh12nl" src="/HTML.webp" draggable="false" data-active> <div class="text-overlay svelte-1sh12nl">HTML</div></div> <div class="image-container" data-svelte-h="svelte-vrguxo"><img class="image" src="/AiEmer.jpg" draggable="false" data-active> <div class="text-overlay svelte-1sh12nl">AI/Emerging Technologies</div></div> <div class="image-container" data-svelte-h="svelte-1ftjppe"><img class="image darker svelte-1sh12nl" src="/amazon.jpeg" draggable="false" data-active> <div class="text-overlay svelte-1sh12nl">Amazon Technologies Project</div></div></div>  ${isModalOpen ? `${validate_component(Modal, "Modal").$$render($$result, { id: currentModalId, onClose: closeModal }, {}, {})}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Main, "Layout").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
