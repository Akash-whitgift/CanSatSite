import { n as noop, b as assign, i as identity, c as create_ssr_component, a as subscribe, o as onDestroy, d as add_attribute, e as escape, f as createEventDispatcher, v as validate_component } from "../../chunks/ssr.js";
import { g as goto } from "../../chunks/client.js";
import { w as writable } from "../../chunks/index.js";
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function get_interpolator(a, b) {
  if (a === b || a !== a) return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b) throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = identity,
      interpolate = get_interpolator
    } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start) return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function") duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const css$2 = {
  code: ".modal-overlay.svelte-1h14j69{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0, 0, 0, 0.5);z-index:999}.cover-image-container.svelte-1h14j69{position:relative;width:100%;height:300px;overflow:hidden;margin-bottom:20px}.cover-image.svelte-1h14j69{width:100%;height:100%;object-fit:cover;object-position:center}.modal-content.svelte-1h14j69{display:flex;justify-content:center}.modal.svelte-1h14j69{display:block;position:fixed;z-index:1;padding-top:60px;left:0;top:0;width:100%;height:100%;overflow:hidden;overflow-y:hidden;background-color:rgba(0, 0, 0, 0.4);opacity:1;transform-origin:center center;transition:opacity 0.3s ease, transform 0.3s ease;position:fixed;background:white;z-index:1000;transition:all 0.3s ease}.fade-out.svelte-1h14j69{opacity:0}.modal-image.svelte-1h14j69{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000000;z-index:0}.close.svelte-1h14j69{color:#aaa;float:right;font-size:28px;font-weight:bold}.close.svelte-1h14j69:hover,.close.svelte-1h14j69:focus{text-decoration:none;cursor:pointer}.modal-text.svelte-1h14j69{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);padding:20px;border-radius:10px;text-align:Left;width:100%;height:100%;color:white;overflow-y:scroll;margin:10px}h1.svelte-1h14j69{font-size:3.5em;margin:5px}@media(max-width: 600px){h1.svelte-1h14j69{font-size:2.5em}img.svelte-1h14j69{width:100%;height:auto}}.modal-text.svelte-1h14j69::-webkit-scrollbar{width:2px;border-radius:80%}.modal-text.svelte-1h14j69::-webkit-scrollbar-track{background:#000000;width:0;visibility:hidden}.modal-text.svelte-1h14j69::-webkit-scrollbar-thumb{background:#ffffff;border-radius:2px}.content-container.svelte-1h14j69{flex:1;padding-right:20px;overflow-y:hidden}",
  map: `{"version":3,"file":"Modal.svelte","sources":["Modal.svelte"],"sourcesContent":["<script>\\n  import { onMount, onDestroy } from 'svelte';\\n  import { tweened } from 'svelte/motion';\\n  import { cubicOut } from 'svelte/easing';\\n  import  Toc from './Toc.svelte'\\n  export let id;\\n  export let onClose;\\n  export let dimensions;\\n\\n  const size = tweened(\\n    { width: dimensions.width, height: dimensions.height, top: dimensions.top, left: dimensions.left },\\n    { duration: 2, easing: cubicOut }\\n  );\\n\\n  let content;\\n  let isClosing = false;\\n  let tocHtml = '';\\n  let modalElement;\\n  const modalsData = {\\n    modal1: {\\n      title: 'Engineering',\\n      content: \`\\n      <section>\\n        <h2> The Design Process</h2>\\n        <p> Our Design Process consists of 5 stages: </p>\\n        <ol>\\n          <li> Research </li>\\n          <li> Design </li>\\n          <li> Prototype </li>\\n          <li> Test </li>\\n          <li> Launch </li>\\n        </ol>\\n      </section>\\n      \\n\\n<style>\\n  a {\\n    color:white;\\n    text-decoration: underline;\\n  }\\n  </style>\\n\\n\\n\\n      \`,\\n      image: \\"/d41586-024-02191-1_27293496.jpg\\"\\n    },\\n    modal2: {\\n      title: 'Sample',\\n      content: \`\\n      <h2>Sample</h2>\\n    <p>Sample</p>\\n      \`,\\n      image: \\"/Ad01.jpg\\"\\n    },\\n    modal3: {\\n      title: 'Sample',\\n      content: \`\\n\\n     <h2>Sample</h2>\\n    <p>Sample</p>\\n      \`,\\n      image: \\"/HTML.webp\\"\\n    },\\n    modal4: {\\n      title: 'Sample',\\n      content: \`\\n     <h2>Sample</h2>\\n    <p>Sample</p>\\n      \`,\\n      image: \\"/AiEmer.jpg\\"\\n    },\\n    modal5: {\\n      title: 'Sample',\\n      content: \`\\n      <h2>Sample</h2>\\n    <p>Sample</p>\\n      \`,\\n      image: \\"/amazon.jpeg\\"\\n    }\\n  };\\n\\n  onMount(() => {\\n    // Start at the image size\\n    modalElement.style.width = \`\${dimensions.width}px\`;\\n    modalElement.style.height = \`\${dimensions.height}px\`;\\n    modalElement.style.top = \`\${dimensions.top}px\`;\\n    modalElement.style.left = \`\${dimensions.left}px\`;\\n    // Animate to full screen after a short delay\\n    setTimeout(() => {\\n      size.set({ width: window.innerWidth, height: window.innerHeight, top: 0, left: 0 });\\n    }, 50);\\n    window.addEventListener('resize', handleResize);\\n  });\\n\\n  onDestroy(() => {\\n  // Remove resize event listener\\n  window.removeEventListener('resize', handleResize);\\n  });\\n  function handleClose() {\\n    isClosing = true;\\n    // Animate back to original size\\n    size.set({ width: dimensions.width, height: dimensions.height, top: dimensions.top, left: dimensions.left })\\n      .then(() => {\\n        if (typeof onClose === 'function') {\\n          onClose();\\n        }\\n        isClosing = false;\\n      });\\n  }\\n\\n\\n  function handleResize() {\\n  if (modalElement) {\\n    size.set({ width: window.innerWidth, height: window.innerHeight, top: 0, left: 0 });\\n  }\\n}\\n\\n\\nfunction generateTOC(content) {\\n  const tempDiv = document.createElement('div');\\n  tempDiv.innerHTML = content;\\n  const headings = tempDiv.querySelectorAll('h2, h3');\\n   let tocHtml = '';\\n  headings.forEach((heading, index) => {\\n    const level = heading.tagName.toLowerCase();\\n    const text = heading.textContent;\\n    const id = \`section-\${index}\`; // Generate unique ID for each section\\n   heading.id = id; // Assign ID to the heading for linking\\n    const listItem = \`<li><a href=\\"#\${id}\\"><\${level}>\${text}</\${level}></a></li>\`;\\n    tocHtml += listItem;\\n  });\\n  return \`<ul>\${tocHtml}</ul>\`;\\n}\\n\\nfunction scrollToSection(id) {\\n  const section = document.getElementById(id);\\n    if (section) {\\n      section.scrollIntoView({ behavior: 'smooth' });\\n    }\\n}\\n\\n\\n\\n\\n\\n\\n\\n\\n<\/script>\\n<div class=\\"modal-overlay\\" class:fade-out={isClosing} on:click={handleClose}></div>\\n<div\\n  bind:this={modalElement}\\n  class=\\"modal\\"\\n  class:fade-out={isClosing}\\n  id={id}\\n  style=\\"width: {$size.width}px; height: {$size.height}px; top: {$size.top}px; left: {$size.left}px;\\"\\n>\\n  <div class=\\"modal-image\\"></div>\\n  <div class='modal-content'>\\n    <span class=\\"close\\" id='closecross' on:click={handleClose}>&times;</span>\\n    <div class=\\"modal-text\\">\\n      {#if modalsData[id].image}\\n      <div class=\\"cover-image-container\\">\\n        <img src={modalsData[id].image} alt={modalsData[id].title} class='cover-image' />\\n      </div>\\n      {/if}\\n      <h1>{modalsData[id].title}</h1>\\n      <div class=\\"content-container\\">\\n        <hr>\\n        <div class=\\"content\\">\\n          {@html modalsData[id].content}\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n.modal-overlay {\\n    position: fixed;\\n    top: 0;\\n    left: 0;\\n    width: 100%;\\n    height: 100%;\\n    background: rgba(0, 0, 0, 0.5);\\n    z-index: 999;\\n  }\\n  .cover-image-container {\\n  position: relative;\\n  width: 100%;\\n  height: 300px; /* Adjust height as needed */\\n  overflow: hidden;\\n  margin-bottom: 20px;\\n}\\n\\n.cover-image {\\n  width: 100%;\\n  height: 100%;\\n  object-fit: cover;\\n  object-position: center;\\n}\\n  .modal-content {\\n    display: flex;\\n    justify-content: center;\\n  }\\n  .modal {\\n    display: block;\\n    position: fixed;\\n    z-index: 1;\\n    padding-top: 60px;\\n    left: 0;\\n    top: 0;\\n    width: 100%;\\n    height: 100%;\\n    overflow: hidden;\\n    overflow-y: hidden;\\n    background-color: rgba(0, 0, 0, 0.4);\\n    opacity: 1;\\n    transform-origin: center center;\\n    transition: opacity 0.3s ease, transform 0.3s ease;\\n    position: fixed;\\n    background: white;\\n    z-index: 1000;\\n    transition: all 0.3s ease;\\n    \\n  }\\n  .scale-in {\\n    opacity: 1;\\n    transform: scale(1);\\n  }\\n  .scale-out {\\n    opacity: 0;\\n    transform: scale(0.5);\\n  }\\n  .container {\\n    overflow: visible;\\n    margin: 0;\\n    padding: 0;\\n    width: 100%;\\n    height: 100%;\\n  }\\n  .fade-in {\\n    opacity: 1;\\n  }\\n  .fade-out {\\n    opacity: 0;\\n  }\\n  .modal-image {\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    width: 100%;\\n    height: 100%;\\n    background-color: #000000;\\n    z-index: 0;\\n  }\\n\\n  .close {\\n    color: #aaa;\\n    float: right;\\n    font-size: 28px;\\n    font-weight: bold;\\n  }\\n  .close:hover,\\n  .close:focus {\\n    text-decoration: none;\\n    cursor: pointer;\\n  }\\n  .modal-text {\\n    position: absolute;\\n    top: 50%;\\n    left: 50%;\\n    transform: translate(-50%, -50%);\\n    /* background-color: rgba(20, 20, 20, 0.8); */\\n    padding: 20px;\\n    border-radius: 10px;\\n    text-align: Left;\\n    width: 100%;\\n    height: 100%;\\n    color: white;\\n    overflow-y: scroll;\\n    margin: 10px;\\n  }\\n  h1 {\\n    font-size: 3.5em;\\n    margin: 5px;\\n  }\\n  @media (max-width: 600px) {\\n  h1 {\\n    font-size:2.5em;\\n\\n  }\\n  img {\\n    width: 100%;\\n    height: auto;\\n  }\\n}\\n.modal-text::-webkit-scrollbar {\\nwidth: 2px;\\n  border-radius: 80%;\\n}\\n.modal-text::-webkit-scrollbar-track{\\nbackground: #000000;\\n  width:0;\\n  visibility: hidden;\\n}\\n.modal-text::-webkit-scrollbar-thumb {\\nbackground: #ffffff;\\nborder-radius: 2px;\\n}\\n\\n  .content-container {\\n    flex: 1;\\n    padding-right: 20px; /* Adjust spacing between TOC and content */\\n    overflow-y: hidden; /* Allow scrolling if content is too long */\\n  }\\n\\n\\n</style>\\n"],"names":[],"mappings":"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"}`
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $size, $$unsubscribe_size;
  let { id } = $$props;
  let { onClose } = $$props;
  let { dimensions } = $$props;
  const size = tweened(
    {
      width: dimensions.width,
      height: dimensions.height,
      top: dimensions.top,
      left: dimensions.left
    },
    { duration: 2, easing: cubicOut }
  );
  $$unsubscribe_size = subscribe(size, (value) => $size = value);
  let modalElement;
  const modalsData = {
    modal1: {
      title: "Engineering",
      content: `
      <section>
        <h2> The Design Process</h2>
        <p> Our Design Process consists of 5 stages: </p>
        <ol>
          <li> Research </li>
          <li> Design </li>
          <li> Prototype </li>
          <li> Test </li>
          <li> Launch </li>
        </ol>
      </section>
      

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
  onDestroy(() => {
    window.removeEventListener("resize", handleResize);
  });
  function handleResize() {
  }
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0) $$bindings.onClose(onClose);
  if ($$props.dimensions === void 0 && $$bindings.dimensions && dimensions !== void 0) $$bindings.dimensions(dimensions);
  $$result.css.add(css$2);
  $$unsubscribe_size();
  return `<div class="${["modal-overlay svelte-1h14j69", ""].join(" ").trim()}"></div> <div class="${["modal svelte-1h14j69", ""].join(" ").trim()}"${add_attribute("id", id, 0)} style="${"width: " + escape($size.width, true) + "px; height: " + escape($size.height, true) + "px; top: " + escape($size.top, true) + "px; left: " + escape($size.left, true) + "px;"}"${add_attribute("this", modalElement, 0)}><div class="modal-image svelte-1h14j69"></div> <div class="modal-content svelte-1h14j69"><span class="close svelte-1h14j69" id="closecross" data-svelte-h="svelte-1l7plis">×</span> <div class="modal-text svelte-1h14j69">${modalsData[id].image ? `<div class="cover-image-container svelte-1h14j69"><img${add_attribute("src", modalsData[id].image, 0)}${add_attribute("alt", modalsData[id].title, 0)} class="cover-image svelte-1h14j69"></div>` : ``} <h1 class="svelte-1h14j69">${escape(modalsData[id].title)}</h1> <div class="content-container svelte-1h14j69"><hr> <div class="content"><!-- HTML_TAG_START -->${modalsData[id].content}<!-- HTML_TAG_END --></div></div></div></div> </div>`;
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
  code: ".text-overlay.svelte-dxpaz5{overflow:hidden}.darker.svelte-dxpaz5{filter:brightness(0.7)}",
  map: `{"version":3,"file":"main.svelte","sources":["main.svelte"],"sourcesContent":["<script>\\n  import { onMount, onDestroy } from 'svelte';\\n  import { goto } from '$app/navigation'; // Import goto from SvelteKit\\n  import Modal from './Modal.svelte'; // Import the Modal component\\n  import './styles.css';\\n  import InstructionCard from './InstructionCard.svelte';\\n\\n  let showInstructions = true;\\n  let isModalOpen = false;\\n  let currentModalId;\\n  let modal = null;\\n  let track;\\n  let isMouseDown = false;\\n  let initialMouseX = 0;\\n  let lastKnownPercentage = -10;\\n  let dragSensitivity = 0.01;\\n  let scrollSensitivity = 0.2;\\nlet isMobile = false;\\nlet modalDimensions = null;\\n  const isBrowser = typeof window !== 'undefined';\\n\\n  function dismissInstructions() {\\n    localStorage.setItem('instructionsDismissed', 'true');\\n    showInstructions = false;\\n  }\\n  function openModal(modalId, event) {\\n  const container = event.currentTarget;\\n  const rect = container.getBoundingClientRect();\\n  isModalOpen = true;\\n  currentModalId = modalId;\\n  modalDimensions = {\\n    width: rect.width,\\n    height: rect.height,\\n    top: rect.top,\\n    left: rect.left\\n  };\\n  goto(\`#\${modalId}\`, { replaceState: true });\\n}\\n\\n  function closeModal() {\\n    isModalOpen = false;\\n    currentModalId = null;\\n    goto('/', { replaceState: true });\\n  }\\n\\n  \\n\\n  function handleMouseDown(e) {\\n    if (!isModalOpen) {\\n      isMouseDown = true;\\n      initialMouseX = e.clientX;\\n    }\\n  }\\n\\n  function handleMouseMove(e) {\\n    if (isMouseDown && !isModalOpen && !isMobile) {\\n      const mouseDelta = initialMouseX - e.clientX;\\n      const maxDelta = window.innerWidth / 2;\\n\\n      lastKnownPercentage = Math.max(\\n        Math.min(lastKnownPercentage + (mouseDelta / maxDelta) * -100 * dragSensitivity, -10),\\n        -100\\n      );\\n\\n      updateTransform();\\n    }\\n  }\\n  function handleResize() {\\n    isMobile = window.innerWidth <= 600;\\n    if (isMobile) {\\n        scrollOnLoad(-50);\\n        window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n        window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n        window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n        window.removeEventListener(\\"wheel\\", handleWheel);\\n    } else {\\n      scrollOnLoad(-10);\\n        window.addEventListener(\\"mousedown\\", handleMouseDown);\\n        window.addEventListener(\\"mousemove\\", handleMouseMove);\\n        window.addEventListener(\\"mouseup\\", handleMouseUp);\\n        window.addEventListener(\\"wheel\\", handleWheel, { passive: false });\\n    }\\n}\\n\\n  function handleMouseUp() {\\n    isMouseDown = false;\\n  }\\n\\n  function handleWheel(e) {\\n    if (!isModalOpen && !isMobile) {\\n      const delta = e.deltaY || e.detail || e.wheelDelta;\\n      const scrollAmount = delta * scrollSensitivity;\\n      const maxDelta = window.innerHeight / 2;\\n\\n      lastKnownPercentage = Math.max(\\n        Math.min(lastKnownPercentage + (scrollAmount / maxDelta) * -100, -10),\\n        -100\\n      );\\n\\n      updateTransform();\\n      e.preventDefault();\\n    }\\n  }\\n  function scrollOnLoad(x) {\\n    console.log(x);\\n    track.style.transform = \`translate(\${x}%, -50%)\`;\\n\\nfor (const image of track.getElementsByClassName(\\"image\\")) {\\n  image.style.objectPosition = \`\${100 + -10}% center\`;\\n}\\n  }\\n  function updateTransform() {\\n    track.style.transform = \`translate(\${lastKnownPercentage}%, -50%)\`;\\n\\n    for (const image of track.getElementsByClassName(\\"image\\")) {\\n      image.style.objectPosition = \`\${100 + lastKnownPercentage}% center\`;\\n    }\\n  }\\n\\n  if (isBrowser) {\\n    function handlePopState() {\\n      isModalOpen = false;\\n      currentModalId = null;\\n    }\\n    onMount(() => {\\n      const dismissed = localStorage.getItem('instructionsDismissed');\\n        showInstructions = !dismissed;\\n\\n        track = document.getElementById(\\"image-track\\");\\n        handleResize();\\n\\n        if (isMobile) {\\n            window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n            window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n            window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n            window.removeEventListener(\\"wheel\\", handleWheel);\\n        } else {\\n            window.addEventListener(\\"mousedown\\", handleMouseDown);\\n            window.addEventListener(\\"mousemove\\", handleMouseMove);\\n            window.addEventListener(\\"mouseup\\", handleMouseUp);\\n            window.addEventListener(\\"wheel\\", handleWheel, { passive: false });\\n        }\\n\\n        window.addEventListener('popstate', handlePopState);\\n        window.addEventListener('resize', handleResize);\\n    });\\n\\n    onDestroy(() => {\\n      window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n        window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n        window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n        window.removeEventListener(\\"wheel\\", handleWheel);\\n        window.removeEventListener('popstate', handlePopState);\\n        window.removeEventListener('resize', handleResize);\\n    });\\n  }\\n\\n<\/script>\\n<div id=\\"image-track\\">\\n  {#if showInstructions}\\n\\n      <InstructionCard on:dismiss={dismissInstructions} />\\n    {/if}\\n  <div class=\\"image-container\\" on:click={(event) => openModal('modal1', event)}>\\n    <img class=\\"image\\" src=\\"/d41586-024-02191-1_27293496.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">Engineering</div>  <!-- Change title here -->\\n  </div>\\n  <div class=\\"image-container\\" on:click={(event) => openModal('modal2', event)}>\\n    <img class=\\"image\\" src=\\"/Ad01.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">Sample</div>\\n  </div>\\n  <div class=\\"image-container \\" on:click={(event) => openModal('modal3', event)}>\\n    <img class=\\"image darker\\" src=\\"/HTML.webp\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">Sample</div>\\n  </div>\\n  <div class=\\"image-container\\" on:click={(event) => openModal('modal4', event)}>\\n    <img class=\\"image\\" src=\\"/AiEmer.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">Sample</div>\\n  </div>\\n  <div class=\\"image-container\\" on:click={(event) => openModal('modal5', event)}>\\n    <img class=\\"image darker\\" src=\\"/amazon.jpeg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\">Sample</div>\\n  </div>\\n</div>\\n\\n<style>\\n\\n  .text-overlay {\\n    overflow: hidden;\\n  }\\n  .darker {\\n    filter: brightness(0.7);\\n  }\\n\\n  </style>\\n{#if isModalOpen}\\n<Modal id={currentModalId} onClose={closeModal} dimensions={modalDimensions} />\\n{/if}"],"names":[],"mappings":"AA2LE,2BAAc,CACZ,QAAQ,CAAE,MACZ,CACA,qBAAQ,CACN,MAAM,CAAE,WAAW,GAAG,CACxB"}`
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
  let modalDimensions = null;
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
  return `<div id="image-track">${`${validate_component(InstructionCard, "InstructionCard").$$render($$result, {}, {}, {})}`} <div class="image-container" data-svelte-h="svelte-1c5c0h9"><img class="image" src="/d41586-024-02191-1_27293496.jpg" draggable="false" data-active> <div class="text-overlay svelte-dxpaz5">Engineering</div> </div> <div class="image-container" data-svelte-h="svelte-jja9b2"><img class="image" src="/Ad01.jpg" draggable="false" data-active> <div class="text-overlay svelte-dxpaz5">Sample</div></div> <div class="image-container " data-svelte-h="svelte-uckj1s"><img class="image darker svelte-dxpaz5" src="/HTML.webp" draggable="false" data-active> <div class="text-overlay svelte-dxpaz5">Sample</div></div> <div class="image-container" data-svelte-h="svelte-i0rqzl"><img class="image" src="/AiEmer.jpg" draggable="false" data-active> <div class="text-overlay svelte-dxpaz5">Sample</div></div> <div class="image-container" data-svelte-h="svelte-rduii7"><img class="image darker svelte-dxpaz5" src="/amazon.jpeg" draggable="false" data-active> <div class="text-overlay svelte-dxpaz5">Sample</div></div></div>  ${isModalOpen ? `${validate_component(Modal, "Modal").$$render(
    $$result,
    {
      id: currentModalId,
      onClose: closeModal,
      dimensions: modalDimensions
    },
    {},
    {}
  )}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Main, "Layout").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
