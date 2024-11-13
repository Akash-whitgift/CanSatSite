import { n as noop, b as assign, i as identity, c as create_ssr_component, a as subscribe, o as onDestroy, d as add_attribute, e as escape, f as createEventDispatcher, h as spread, j as escape_object, k as compute_rest_props, v as validate_component, l as add_classes } from "../../chunks/ssr.js";
import { g as goto } from "../../chunks/client.js";
import { w as writable } from "../../chunks/index.js";
import { faRightToBracket, faPlay, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { parse, icon } from "@fortawesome/fontawesome-svg-core";
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
  code: ".modal-overlay.svelte-1eyv4t2{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0, 0, 0, 0.5);z-index:999}.cover-image-container.svelte-1eyv4t2{position:relative;width:100%;height:300px;overflow:hidden;margin-bottom:20px}.cover-image.svelte-1eyv4t2{width:100%;height:100%;object-fit:cover;object-position:center;filter:brightness(70%)\n}.modal-content.svelte-1eyv4t2{display:flex;justify-content:center}.modal.svelte-1eyv4t2{display:block;position:fixed;z-index:1;padding-top:60px;left:0;top:0;width:100%;height:100%;overflow:hidden;overflow-y:hidden;background-color:rgba(0, 0, 0, 0.4);opacity:1;transform-origin:center center;transition:opacity 0.3s ease, transform 0.3s ease;position:fixed;background:white;z-index:1000;transition:all 0.3s ease}.fade-out.svelte-1eyv4t2{opacity:0}.modal-image.svelte-1eyv4t2{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000000;z-index:0}.close.svelte-1eyv4t2{color:#fff;float:right;font-size:28px;font-weight:bold}.close.svelte-1eyv4t2:hover,.close.svelte-1eyv4t2:focus{text-decoration:none;cursor:pointer}.modal-text.svelte-1eyv4t2{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);padding:20px;border-radius:10px;text-align:Left;width:100%;height:100%;color:white;overflow-y:scroll;margin:10px}h1.svelte-1eyv4t2{font-size:3.5em;margin:5px}@media(max-width: 600px){h1.svelte-1eyv4t2{font-size:2.5em}img.svelte-1eyv4t2{width:100%;height:auto}}.modal-text.svelte-1eyv4t2::-webkit-scrollbar{width:2px;border-radius:80%}.modal-text.svelte-1eyv4t2::-webkit-scrollbar-track{background:#000000;width:0;visibility:hidden}.modal-text.svelte-1eyv4t2::-webkit-scrollbar-thumb{background:#ffffff;border-radius:2px}.content-container.svelte-1eyv4t2{flex:1;padding-right:20px;overflow-y:hidden}",
  map: `{"version":3,"file":"Modal.svelte","sources":["Modal.svelte"],"sourcesContent":["<script>\\n  import { onMount, onDestroy } from 'svelte';\\n  import { tweened } from 'svelte/motion';\\n  import { cubicOut } from 'svelte/easing';\\n  import  Toc from './Toc.svelte'\\n  export let id;\\n  export let onClose;\\n  export let dimensions;\\n\\n  const size = tweened(\\n    { width: dimensions.width, height: dimensions.height, top: dimensions.top, left: dimensions.left },\\n    { duration: 2, easing: cubicOut }\\n  );\\n\\n  let content;\\n  let isClosing = false;\\n  let tocHtml = '';\\n  let modalElement;\\n  const modalsData = {\\n    modal1: {\\n      title: 'Engineering',\\n      content: \`\\n      <section>\\n        <h2> The Design Process</h2>\\n        <p> Our Design Process consists of 5 stages: </p>\\n        <ol>\\n          <li> Research - Gather information on similar CANSAT designs and study requirements for temperature, pressure, and altitude measurements. </li>\\n          <li> Design - Sketch and plan the satellite’s structure, layout, and materials, focusing on durability, weight, and sensor placement. </li>\\n          <li> Prototype - Build an initial model of the CANSAT to test design concepts and ensure all components fit and function as planned. </li>\\n          <li> Test - Run ground and flight tests to assess performance, identifying any issues with data collection or deployment mechanisms. </li>\\n          <li> Launch - Launch the satellite and collect data </li>\\n        </ol>\\n      </section>\\n      <p data-type='exit' class='interactable'>Created bt Arjun</p>\\n\\n<style>\\n  a {\\n    color:white;\\n    text-decoration: underline;\\n  }\\n  </style>\\n\\n\\n\\n      \`,\\n      image: \\"/d41586-024-02191-1_27293496.jpg\\"\\n    },\\n    modal2: {\\n      title: 'Mission Goals',\\n      content: \`\\n  <section>\\n    <h2>The objectives of our CANSAT Mission</h2>\\n    <p>Our CANSAT mission focuses on capturing environmental data, focussing\\n    on temperature, atmospheric pressure and altitude.</p>\\n    <ol>\\n     <li>A barometric pressure sensor will record pressure levels as the CANSAT moves through different layers of the atmosphere. Pressure generally decreases with altitude, and by measuring this gradient, we can accurately determine the altitude of the CANSAT. </li>\\n     <li>Altitude can be determined by combining data from a barometric pressure sensor, which measures atmospheric pressure changes with height, and a GPS module for precise positional data.</li>\\n    </ol>\\n  </section>\\n  <p data-type='video' class='interactable'>Created by Arjun</p>\\n    \\n      \`,\\n      image: \\"Satellite Building.png\\"\\n    },\\n    modal3: {\\n      title: 'Uses of Satellites',\\n      content: \`\\n      <section>\\n     <h2>What do humans use satellites for?</h2>\\n     <uol>\\n       <li>Communication: Satellites enable global connectivity, allowing for phone calls, internet access, and television broadcasts even in remote or rural areas by relaying signals across vast distances.</li>\\n       <li>Weather Monitoring and Climate Study: Satellites provide real-time data on weather patterns, storms, and temperature trends, helping meteorologists forecast weather and scientists monitor climate change and environmental conditions over time.</li>\\n       <li>Navigation and GPS: Satellites are essential for the Global Positioning System (GPS), guiding navigation for vehicles, aircraft, ships, and personal devices, which is crucial for transportation, logistics, and personal travel.</li>\\n     </uol>\\n    <p data-type='exit' class='interactable'>Created by Arjun</p>\\n      \`,\\n      image: \\"Uses of Satellites.jpg\\"\\n    },\\n    modal4: {\\n      title: 'Launch and Deployment',\\n      content: \`\\n      <section>\\n     <h2>How are we going to Launch our Satellite?</h2>\\n     <uol>\\n      <li>Launch Mechanism: Our CANSAT will be launched via a small rocket or high-altitude balloon, which will carry it to the desired altitude before deployment. This launch method ensures the CANSAT reaches a high enough point to simulate the descent phase of an actual satellite.</li>\\n      <li>Deployment Sequence: Once the CANSAT reaches its target altitude, it will be released from the rocket or balloon and begin its descent. During this phase, an automated system will activate sensors and data collection modules, ensuring data is captured from the start of the descent.</li>\\n      <li>Parachute Activation: To control its descent speed and ensure a safe landing, the CANSAT will deploy a small parachute at a specific altitude. This controlled descent allows the satellite to collect data at various atmospheric layers, maximizing the quality and quantity of information we gather.</li>\\n     </uol>\\n    </section>\\n    <p data-type='exit' class='interactable'>Created by Arjun</p>\\n      \`,\\n      image: \\"Satellite Launch.jpeg\\"\\n    },\\n    modal5: {\\n      title: 'Data Analysis',\\n      content: \`\\n      <section>\\n      <h2>What will we do once we have the data?</h2>\\n      <uol>\\n       <li>Data Processing: After retrieval, we will process the collected data by organizing it into readable formats, such as tables and graphs, to visualize temperature, pressure, and altitude changes during the descent, making patterns easier to analyse.</li>\\n       <li>Analysis and Interpretation: Using data analysis techniques, we’ll interpret the trends and compare our findings with expected atmospheric models, assessing any anomalies and understanding how each parameter varies with altitude.</li>\\n       <li>Reporting and Improvement: We’ll compile our findings into a comprehensive report, highlighting key insights and any unexpected results, and use these conclusions to refine our engineering design, sensor calibration, and deployment process for future missions.</li>\\n      </uol>\\n    </section>\\n     <p data-type='exit' class='interactable'>Created by Arjun</p>\\n      \`,\\n      image: \\"Data Analysis.png\\"\\n    }\\n  };\\n\\n  onMount(() => {\\n    // Start at the image size\\n    modalElement.style.width = \`\${dimensions.width}px\`;\\n    modalElement.style.height = \`\${dimensions.height}px\`;\\n    modalElement.style.top = \`\${dimensions.top}px\`;\\n    modalElement.style.left = \`\${dimensions.left}px\`;\\n    // Animate to full screen after a short delay\\n    setTimeout(() => {\\n      size.set({ width: window.innerWidth, height: window.innerHeight, top: 0, left: 0 });\\n    }, 50);\\n    window.addEventListener('resize', handleResize);\\n  });\\n\\n  onDestroy(() => {\\n  // Remove resize event listener\\n  window.removeEventListener('resize', handleResize);\\n  });\\n  function handleClose() {\\n    isClosing = true;\\n    // Animate back to original size\\n    size.set({ width: dimensions.width, height: dimensions.height, top: dimensions.top, left: dimensions.left })\\n      .then(() => {\\n        if (typeof onClose === 'function') {\\n          onClose();\\n        }\\n        isClosing = false;\\n      });\\n  }\\n\\n\\n  function handleResize() {\\n  if (modalElement) {\\n    size.set({ width: window.innerWidth, height: window.innerHeight, top: 0, left: 0 });\\n  }\\n}\\n\\n\\nfunction generateTOC(content) {\\n  const tempDiv = document.createElement('div');\\n  tempDiv.innerHTML = content;\\n  const headings = tempDiv.querySelectorAll('h2, h3');\\n   let tocHtml = '';\\n  headings.forEach((heading, index) => {\\n    const level = heading.tagName.toLowerCase();\\n    const text = heading.textContent;\\n    const id = \`section-\${index}\`; // Generate unique ID for each section\\n   heading.id = id; // Assign ID to the heading for linking\\n    const listItem = \`<li><a href=\\"#\${id}\\"><\${level}>\${text}</\${level}></a></li>\`;\\n    tocHtml += listItem;\\n  });\\n  return \`<ul>\${tocHtml}</ul>\`;\\n}\\n\\nfunction scrollToSection(id) {\\n  const section = document.getElementById(id);\\n    if (section) {\\n      section.scrollIntoView({ behavior: 'smooth' });\\n    }\\n}\\n\\n\\n\\n\\n\\n\\n\\n\\n<\/script>\\n<div class=\\"modal-overlay\\" class:fade-out={isClosing} on:click={handleClose}></div>\\n<div\\n  bind:this={modalElement}\\n  class=\\"modal\\"\\n  class:fade-out={isClosing}\\n  id={id}\\n  style=\\"width: {$size.width}px; height: {$size.height}px; top: {$size.top}px; left: {$size.left}px;\\"\\n>\\n  <div class=\\"modal-image\\"></div>\\n  <div class='modal-content'>\\n    <span class=\\"close interactable\\" id='closecross' data-type=\\"exit\\" on:click={handleClose}> &times;</span>\\n    <div class=\\"modal-text\\">\\n      {#if modalsData[id].image}\\n      <div class=\\"cover-image-container\\">\\n        <img src={modalsData[id].image} alt={modalsData[id].title} class='cover-image' />\\n      </div>\\n      {/if}\\n      <h1>{modalsData[id].title}</h1>\\n      <div class=\\"content-container\\">\\n        <hr>\\n        <div class=\\"content\\">\\n          {@html modalsData[id].content}\\n        </div>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n.modal-overlay {\\n    position: fixed;\\n    top: 0;\\n    left: 0;\\n    width: 100%;\\n    height: 100%;\\n    background: rgba(0, 0, 0, 0.5);\\n    z-index: 999;\\n  }\\n  .cover-image-container {\\n  position: relative;\\n  width: 100%;\\n  height: 300px; /* Adjust height as needed */\\n  overflow: hidden;\\n  margin-bottom: 20px;\\n}\\n\\n.cover-image {\\n  width: 100%;\\n  height: 100%;\\n  object-fit: cover;\\n  object-position: center;\\n  filter: brightness(70%)\\n}\\n  .modal-content {\\n    display: flex;\\n    justify-content: center;\\n  }\\n  .modal {\\n    display: block;\\n    position: fixed;\\n    z-index: 1;\\n    padding-top: 60px;\\n    left: 0;\\n    top: 0;\\n    width: 100%;\\n    height: 100%;\\n    overflow: hidden;\\n    overflow-y: hidden;\\n    background-color: rgba(0, 0, 0, 0.4);\\n    opacity: 1;\\n    transform-origin: center center;\\n    transition: opacity 0.3s ease, transform 0.3s ease;\\n    position: fixed;\\n    background: white;\\n    z-index: 1000;\\n    transition: all 0.3s ease;\\n    \\n  }\\n  .scale-in {\\n    opacity: 1;\\n    transform: scale(1);\\n  }\\n  .scale-out {\\n    opacity: 0;\\n    transform: scale(0.5);\\n  }\\n  .container {\\n    overflow: visible;\\n    margin: 0;\\n    padding: 0;\\n    width: 100%;\\n    height: 100%;\\n  }\\n  .fade-in {\\n    opacity: 1;\\n  }\\n  .fade-out {\\n    opacity: 0;\\n  }\\n  .modal-image {\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    width: 100%;\\n    height: 100%;\\n    background-color: #000000;\\n    z-index: 0;\\n  }\\n\\n  .close {\\n    color: #fff;\\n    float: right;\\n    font-size: 28px;\\n    font-weight: bold;\\n  }\\n  .close:hover,\\n  .close:focus {\\n    text-decoration: none;\\n    cursor: pointer;\\n  }\\n  .modal-text {\\n    position: absolute;\\n    top: 50%;\\n    left: 50%;\\n    transform: translate(-50%, -50%);\\n    /* background-color: rgba(20, 20, 20, 0.8); */\\n    padding: 20px;\\n    border-radius: 10px;\\n    text-align: Left;\\n    width: 100%;\\n    height: 100%;\\n    color: white;\\n    overflow-y: scroll;\\n    margin: 10px;\\n  }\\n  h1 {\\n    font-size: 3.5em;\\n    margin: 5px;\\n  }\\n  @media (max-width: 600px) {\\n  h1 {\\n    font-size:2.5em;\\n\\n  }\\n  img {\\n    width: 100%;\\n    height: auto;\\n  }\\n}\\n.modal-text::-webkit-scrollbar {\\nwidth: 2px;\\n  border-radius: 80%;\\n}\\n.modal-text::-webkit-scrollbar-track{\\nbackground: #000000;\\n  width:0;\\n  visibility: hidden;\\n}\\n.modal-text::-webkit-scrollbar-thumb {\\nbackground: #ffffff;\\nborder-radius: 2px;\\n}\\n\\n  .content-container {\\n    flex: 1;\\n    padding-right: 20px; /* Adjust spacing between TOC and content */\\n    overflow-y: hidden; /* Allow scrolling if content is too long */\\n  }\\n\\n\\n</style>\\n"],"names":[],"mappings":"AA+MA,6BAAe,CACX,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9B,OAAO,CAAE,GACX,CACA,qCAAuB,CACvB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,IACjB,CAEA,2BAAa,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,CACjB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,WAAW,GAAG,CAAC;AACzB,CACE,6BAAe,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MACnB,CACA,qBAAO,CACL,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,IAAI,CACjB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,CAChB,UAAU,CAAE,MAAM,CAClB,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACpC,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,MAAM,CAAC,MAAM,CAC/B,UAAU,CAAE,OAAO,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,SAAS,CAAC,IAAI,CAAC,IAAI,CAClD,QAAQ,CAAE,KAAK,CACf,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAEvB,CAmBA,wBAAU,CACR,OAAO,CAAE,CACX,CACA,2BAAa,CACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,OAAO,CACzB,OAAO,CAAE,CACX,CAEA,qBAAO,CACL,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IACf,CACA,qBAAM,MAAM,CACZ,qBAAM,MAAO,CACX,eAAe,CAAE,IAAI,CACrB,MAAM,CAAE,OACV,CACA,0BAAY,CACV,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAEhC,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,IACV,CACA,iBAAG,CACD,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,GACV,CACA,MAAO,YAAY,KAAK,CAAE,CAC1B,iBAAG,CACD,UAAU,KAEZ,CACA,kBAAI,CACF,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV,CACF,CACA,0BAAW,mBAAoB,CAC/B,KAAK,CAAE,GAAG,CACR,aAAa,CAAE,GACjB,CACA,0BAAW,yBAAyB,CACpC,UAAU,CAAE,OAAO,CACjB,MAAM,CAAC,CACP,UAAU,CAAE,MACd,CACA,0BAAW,yBAA0B,CACrC,UAAU,CAAE,OAAO,CACnB,aAAa,CAAE,GACf,CAEE,iCAAmB,CACjB,IAAI,CAAE,CAAC,CACP,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,MACd"}`
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
          <li> Research - Gather information on similar CANSAT designs and study requirements for temperature, pressure, and altitude measurements. </li>
          <li> Design - Sketch and plan the satellite’s structure, layout, and materials, focusing on durability, weight, and sensor placement. </li>
          <li> Prototype - Build an initial model of the CANSAT to test design concepts and ensure all components fit and function as planned. </li>
          <li> Test - Run ground and flight tests to assess performance, identifying any issues with data collection or deployment mechanisms. </li>
          <li> Launch - Launch the satellite and collect data </li>
        </ol>
      </section>
      <p data-type='exit' class='interactable'>Created bt Arjun</p>

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
      title: "Mission Goals",
      content: `
  <section>
    <h2>The objectives of our CANSAT Mission</h2>
    <p>Our CANSAT mission focuses on capturing environmental data, focussing
    on temperature, atmospheric pressure and altitude.</p>
    <ol>
     <li>A barometric pressure sensor will record pressure levels as the CANSAT moves through different layers of the atmosphere. Pressure generally decreases with altitude, and by measuring this gradient, we can accurately determine the altitude of the CANSAT. </li>
     <li>Altitude can be determined by combining data from a barometric pressure sensor, which measures atmospheric pressure changes with height, and a GPS module for precise positional data.</li>
    </ol>
  </section>
  <p data-type='video' class='interactable'>Created by Arjun</p>
    
      `,
      image: "Satellite Building.png"
    },
    modal3: {
      title: "Uses of Satellites",
      content: `
      <section>
     <h2>What do humans use satellites for?</h2>
     <uol>
       <li>Communication: Satellites enable global connectivity, allowing for phone calls, internet access, and television broadcasts even in remote or rural areas by relaying signals across vast distances.</li>
       <li>Weather Monitoring and Climate Study: Satellites provide real-time data on weather patterns, storms, and temperature trends, helping meteorologists forecast weather and scientists monitor climate change and environmental conditions over time.</li>
       <li>Navigation and GPS: Satellites are essential for the Global Positioning System (GPS), guiding navigation for vehicles, aircraft, ships, and personal devices, which is crucial for transportation, logistics, and personal travel.</li>
     </uol>
    <p data-type='exit' class='interactable'>Created by Arjun</p>
      `,
      image: "Uses of Satellites.jpg"
    },
    modal4: {
      title: "Launch and Deployment",
      content: `
      <section>
     <h2>How are we going to Launch our Satellite?</h2>
     <uol>
      <li>Launch Mechanism: Our CANSAT will be launched via a small rocket or high-altitude balloon, which will carry it to the desired altitude before deployment. This launch method ensures the CANSAT reaches a high enough point to simulate the descent phase of an actual satellite.</li>
      <li>Deployment Sequence: Once the CANSAT reaches its target altitude, it will be released from the rocket or balloon and begin its descent. During this phase, an automated system will activate sensors and data collection modules, ensuring data is captured from the start of the descent.</li>
      <li>Parachute Activation: To control its descent speed and ensure a safe landing, the CANSAT will deploy a small parachute at a specific altitude. This controlled descent allows the satellite to collect data at various atmospheric layers, maximizing the quality and quantity of information we gather.</li>
     </uol>
    </section>
    <p data-type='exit' class='interactable'>Created by Arjun</p>
      `,
      image: "Satellite Launch.jpeg"
    },
    modal5: {
      title: "Data Analysis",
      content: `
      <section>
      <h2>What will we do once we have the data?</h2>
      <uol>
       <li>Data Processing: After retrieval, we will process the collected data by organizing it into readable formats, such as tables and graphs, to visualize temperature, pressure, and altitude changes during the descent, making patterns easier to analyse.</li>
       <li>Analysis and Interpretation: Using data analysis techniques, we’ll interpret the trends and compare our findings with expected atmospheric models, assessing any anomalies and understanding how each parameter varies with altitude.</li>
       <li>Reporting and Improvement: We’ll compile our findings into a comprehensive report, highlighting key insights and any unexpected results, and use these conclusions to refine our engineering design, sensor calibration, and deployment process for future missions.</li>
      </uol>
    </section>
     <p data-type='exit' class='interactable'>Created by Arjun</p>
      `,
      image: "Data Analysis.png"
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
  return `<div class="${["modal-overlay svelte-1eyv4t2", ""].join(" ").trim()}"></div> <div class="${["modal svelte-1eyv4t2", ""].join(" ").trim()}"${add_attribute("id", id, 0)} style="${"width: " + escape($size.width, true) + "px; height: " + escape($size.height, true) + "px; top: " + escape($size.top, true) + "px; left: " + escape($size.left, true) + "px;"}"${add_attribute("this", modalElement, 0)}><div class="modal-image svelte-1eyv4t2"></div> <div class="modal-content svelte-1eyv4t2"><span class="close interactable svelte-1eyv4t2" id="closecross" data-type="exit" data-svelte-h="svelte-29wtqa">×</span> <div class="modal-text svelte-1eyv4t2">${modalsData[id].image ? `<div class="cover-image-container svelte-1eyv4t2"><img${add_attribute("src", modalsData[id].image, 0)}${add_attribute("alt", modalsData[id].title, 0)} class="cover-image svelte-1eyv4t2"></div>` : ``} <h1 class="svelte-1eyv4t2">${escape(modalsData[id].title)}</h1> <div class="content-container svelte-1eyv4t2"><hr> <div class="content"><!-- HTML_TAG_START -->${modalsData[id].content}<!-- HTML_TAG_END --></div></div></div></div> </div>`;
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
function classList(props) {
  const {
    beat,
    fade,
    beatFade,
    bounce,
    shake,
    flash,
    spin,
    spinPulse,
    spinReverse,
    pulse,
    fixedWidth,
    inverse,
    border,
    listItem,
    flip,
    size,
    rotation,
    pull
  } = props;
  const classes = {
    "fa-beat": beat,
    "fa-fade": fade,
    "fa-beat-fade": beatFade,
    "fa-bounce": bounce,
    "fa-shake": shake,
    "fa-flash": flash,
    "fa-spin": spin,
    "fa-spin-reverse": spinReverse,
    "fa-spin-pulse": spinPulse,
    "fa-pulse": pulse,
    "fa-fw": fixedWidth,
    "fa-inverse": inverse,
    "fa-border": border,
    "fa-li": listItem,
    "fa-flip": flip === true,
    "fa-flip-horizontal": flip === "horizontal" || flip === "both",
    "fa-flip-vertical": flip === "vertical" || flip === "both",
    [`fa-${size}`]: typeof size !== "undefined" && size !== null,
    [`fa-rotate-${rotation}`]: typeof rotation !== "undefined" && rotation !== null && rotation !== 0,
    [`fa-pull-${pull}`]: typeof pull !== "undefined" && pull !== null,
    "fa-swap-opacity": props.swapOpacity
  };
  return Object.keys(classes).map((key) => classes[key] ? key : null).filter((key) => key);
}
function _isNumerical(obj) {
  obj = obj - 0;
  return obj === obj;
}
function camelize(string) {
  if (_isNumerical(string)) {
    return string;
  }
  string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
    return chr ? chr.toUpperCase() : "";
  });
  return string.substr(0, 1).toLowerCase() + string.substr(1);
}
function styleToString(style) {
  if (typeof style === "string") {
    return style;
  }
  return Object.keys(style).reduce((acc, key) => acc + key.split(/(?=[A-Z])/).join("-").toLowerCase() + ":" + style[key] + ";", "");
}
function convert(createElement, element, extraProps = {}) {
  if (typeof element === "string") {
    return element;
  }
  const children = (element.children || []).map((child) => {
    return convert(createElement, child);
  });
  const mixins = Object.keys(element.attributes || {}).reduce(
    (acc, key) => {
      const val = element.attributes[key];
      if (key === "style") {
        acc.attrs["style"] = styleToString(val);
      } else {
        if (key.indexOf("aria-") === 0 || key.indexOf("data-") === 0) {
          acc.attrs[key.toLowerCase()] = val;
        } else {
          acc.attrs[camelize(key)] = val;
        }
      }
      return acc;
    },
    { attrs: {} }
  );
  return createElement(element.tag, { ...mixins.attrs }, children);
}
let PRODUCTION = false;
try {
  PRODUCTION = process.env.NODE_ENV === "production";
} catch (e) {
}
function log(...args) {
  if (!PRODUCTION && console && typeof console.error === "function") {
    console.error(...args);
  }
}
function normalizeIconArgs(icon2) {
  if (icon2 && typeof icon2 === "object" && icon2.prefix && icon2.iconName && icon2.icon) {
    return icon2;
  }
  if (parse.icon) {
    return parse.icon(icon2);
  }
  if (icon2 === null) {
    return null;
  }
  if (icon2 && typeof icon2 === "object" && icon2.prefix && icon2.iconName) {
    return icon2;
  }
  if (Array.isArray(icon2) && icon2.length === 2) {
    return { prefix: icon2[0], iconName: icon2[1] };
  }
  if (typeof icon2 === "string") {
    return { prefix: "fas", iconName: icon2 };
  }
}
function objectWithKey(key, value) {
  return Array.isArray(value) && value.length > 0 || !Array.isArray(value) && value ? { [key]: value } : {};
}
const SvgElement = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tag } = $$props;
  let { props } = $$props;
  let { children } = $$props;
  let { style = null } = $$props;
  let { ref = null } = $$props;
  if (tag !== "svg") {
    throw new Error('SvgElement requires a tag of "svg"');
  }
  function processChildren(children2) {
    return children2?.reduce(
      (acc, child) => {
        return acc + (child.tag ? generateMarkup(child) : child);
      },
      ""
    ) || "";
  }
  function generateMarkup({ tag: tag2, props: props2, children: children2 }) {
    const attributes = Object.keys(props2).map((key) => `${key}="${props2[key]}"`).join(" ");
    return `<${tag2} ${attributes}>${processChildren(children2)}</${tag2}>`;
  }
  const markup = processChildren(children);
  const elementStyle = props?.style ? `${props.style}${style || ""}` : style;
  const elementProps = { ...props, style: elementStyle };
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.children === void 0 && $$bindings.children && children !== void 0) $$bindings.children(children);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  return `<svg${spread([escape_object(elementProps)], {})}${add_attribute("this", ref, 0)}><!-- HTML_TAG_START -->${markup}<!-- HTML_TAG_END --></svg>`;
});
const FontAwesomeIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "border",
    "mask",
    "maskId",
    "fixedWidth",
    "inverse",
    "flip",
    "icon",
    "listItem",
    "pull",
    "pulse",
    "rotation",
    "size",
    "spin",
    "spinPulse",
    "spinReverse",
    "beat",
    "fade",
    "beatFade",
    "bounce",
    "shake",
    "symbol",
    "title",
    "titleId",
    "transform",
    "swapOpacity",
    "ref",
    "style"
  ]);
  let { border = false } = $$props;
  let { mask = null } = $$props;
  let { maskId = null } = $$props;
  let { fixedWidth = false } = $$props;
  let { inverse = false } = $$props;
  let { flip = false } = $$props;
  let { icon: icon$1 = null } = $$props;
  let { listItem = false } = $$props;
  let { pull = null } = $$props;
  let { pulse = false } = $$props;
  let { rotation = null } = $$props;
  let { size = null } = $$props;
  let { spin = false } = $$props;
  let { spinPulse = false } = $$props;
  let { spinReverse = false } = $$props;
  let { beat = false } = $$props;
  let { fade = false } = $$props;
  let { beatFade = false } = $$props;
  let { bounce = false } = $$props;
  let { shake = false } = $$props;
  let { symbol = false } = $$props;
  let { title = "" } = $$props;
  let { titleId = null } = $$props;
  let { transform = null } = $$props;
  let { swapOpacity = false } = $$props;
  let { ref = null } = $$props;
  let { style = null } = $$props;
  const iconLookup = normalizeIconArgs(icon$1);
  const classes = objectWithKey("classes", [...classList($$props), ...($$props.class || "").split(" ")]);
  const transformObj = objectWithKey("transform", typeof transform === "string" ? parse.transform(transform) : transform);
  const maskObj = objectWithKey("mask", normalizeIconArgs(mask));
  const renderedIcon = icon(iconLookup, {
    ...classes,
    ...transformObj,
    ...maskObj,
    symbol,
    title,
    titleId,
    maskId
  });
  let result = null;
  if (!renderedIcon) {
    log("Could not find icon", iconLookup);
  } else {
    const { abstract } = renderedIcon;
    result = convert(
      (tag, props, children) => {
        return { tag, props, children };
      },
      abstract[0],
      $$restProps
    );
  }
  if ($$props.border === void 0 && $$bindings.border && border !== void 0) $$bindings.border(border);
  if ($$props.mask === void 0 && $$bindings.mask && mask !== void 0) $$bindings.mask(mask);
  if ($$props.maskId === void 0 && $$bindings.maskId && maskId !== void 0) $$bindings.maskId(maskId);
  if ($$props.fixedWidth === void 0 && $$bindings.fixedWidth && fixedWidth !== void 0) $$bindings.fixedWidth(fixedWidth);
  if ($$props.inverse === void 0 && $$bindings.inverse && inverse !== void 0) $$bindings.inverse(inverse);
  if ($$props.flip === void 0 && $$bindings.flip && flip !== void 0) $$bindings.flip(flip);
  if ($$props.icon === void 0 && $$bindings.icon && icon$1 !== void 0) $$bindings.icon(icon$1);
  if ($$props.listItem === void 0 && $$bindings.listItem && listItem !== void 0) $$bindings.listItem(listItem);
  if ($$props.pull === void 0 && $$bindings.pull && pull !== void 0) $$bindings.pull(pull);
  if ($$props.pulse === void 0 && $$bindings.pulse && pulse !== void 0) $$bindings.pulse(pulse);
  if ($$props.rotation === void 0 && $$bindings.rotation && rotation !== void 0) $$bindings.rotation(rotation);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0) $$bindings.spin(spin);
  if ($$props.spinPulse === void 0 && $$bindings.spinPulse && spinPulse !== void 0) $$bindings.spinPulse(spinPulse);
  if ($$props.spinReverse === void 0 && $$bindings.spinReverse && spinReverse !== void 0) $$bindings.spinReverse(spinReverse);
  if ($$props.beat === void 0 && $$bindings.beat && beat !== void 0) $$bindings.beat(beat);
  if ($$props.fade === void 0 && $$bindings.fade && fade !== void 0) $$bindings.fade(fade);
  if ($$props.beatFade === void 0 && $$bindings.beatFade && beatFade !== void 0) $$bindings.beatFade(beatFade);
  if ($$props.bounce === void 0 && $$bindings.bounce && bounce !== void 0) $$bindings.bounce(bounce);
  if ($$props.shake === void 0 && $$bindings.shake && shake !== void 0) $$bindings.shake(shake);
  if ($$props.symbol === void 0 && $$bindings.symbol && symbol !== void 0) $$bindings.symbol(symbol);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.titleId === void 0 && $$bindings.titleId && titleId !== void 0) $$bindings.titleId(titleId);
  if ($$props.transform === void 0 && $$bindings.transform && transform !== void 0) $$bindings.transform(transform);
  if ($$props.swapOpacity === void 0 && $$bindings.swapOpacity && swapOpacity !== void 0) $$bindings.swapOpacity(swapOpacity);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0) $$bindings.ref(ref);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${result ? `${validate_component(SvgElement, "SvgElement").$$render(
      $$result,
      Object.assign({}, result, { style }, { ref }),
      {
        ref: ($$value) => {
          ref = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const css = {
  code: ".image-container.svelte-1sbr6ag{position:relative}",
  map: `{"version":3,"file":"main.svelte","sources":["main.svelte"],"sourcesContent":["<script>\\n  import { onMount, onDestroy } from 'svelte';\\n  import { goto } from '$app/navigation';\\n  import Modal from './Modal.svelte';\\n  import './styles.css';\\n  import './cursor.css';\\n  import InstructionCard from './InstructionCard.svelte';\\n  import { faPlay, faArrowUpRightFromSquare, faRightToBracket } from '@fortawesome/free-solid-svg-icons';\\n  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';\\n  \\n  let showInstructions = true;\\n  let isModalOpen = false;\\n  let currentModalId;\\n  let track;\\n  let isMouseDown = false;\\n  let initialMouseX = 0;\\n  let lastKnownPercentage = -10;\\n  let dragSensitivity = 0.01;\\n  let scrollSensitivity = 0.2;\\n  let isMobile = false;\\n  let modalDimensions = null;\\n  const isBrowser = typeof window !== 'undefined';\\n  let isLoading = true; // Add loading state variable\\n  let progress = 0; // Add progress state variable\\n  let showLoadingScreen = true; // Add variable to control loading screen visibility\\n  \\n  // Initialize trailerIcon as null\\n  let trailerIcon = null;\\n\\n  function dismissInstructions() {\\n    localStorage.setItem('instructionsDismissed', 'true');\\n    showInstructions = false;\\n  }\\n  \\n  function openModal(modalId, event) {\\n    const container = event.currentTarget;\\n    const rect = container.getBoundingClientRect();\\n    isModalOpen = true;\\n    currentModalId = modalId;\\n    modalDimensions = {\\n      width: rect.width,\\n      height: rect.height,\\n      top: rect.top,\\n      left: rect.left\\n    };\\n    goto(\`#\${modalId}\`, { replaceState: true });\\n  }\\n\\n  function closeModal() {\\n    isModalOpen = false;\\n    currentModalId = null;\\n    goto('/', { replaceState: true });\\n  }\\n\\n  function handleMouseDown(e) {\\n    if (!isModalOpen) {\\n      isMouseDown = true;\\n      initialMouseX = e.clientX;\\n    }\\n  }\\n\\n  function handleMouseMove(e) {\\n    if (isMouseDown && !isModalOpen && !isMobile) {\\n      const mouseDelta = initialMouseX - e.clientX;\\n      const maxDelta = window.innerWidth / 2;\\n\\n      lastKnownPercentage = Math.max(\\n        Math.min(lastKnownPercentage + (mouseDelta / maxDelta) * -100 * dragSensitivity, -10),\\n        -100\\n      );\\n\\n      updateTransform();\\n    }\\n  }\\n  \\n  function handleResize() {\\n    isMobile = window.innerWidth <= 600;\\n    if (isMobile) {\\n      scrollOnLoad(-50);\\n      window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n      window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n      window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n      window.removeEventListener(\\"wheel\\", handleWheel);\\n    } else {\\n      scrollOnLoad(-10);\\n      window.addEventListener(\\"mousedown\\", handleMouseDown);\\n      window.addEventListener(\\"mousemove\\", handleMouseMove);\\n      window.addEventListener(\\"mouseup\\", handleMouseUp);\\n      window.addEventListener(\\"wheel\\", handleWheel, { passive: false });\\n    }\\n  }\\n\\n  function handleMouseUp() {\\n    isMouseDown = false;\\n  }\\n\\n  function handleWheel(e) {\\n    if (!isModalOpen && !isMobile) {\\n      const delta = e.deltaY || e.detail || e.wheelDelta;\\n      const scrollAmount = delta * scrollSensitivity;\\n      const maxDelta = window.innerHeight / 2;\\n\\n      lastKnownPercentage = Math.max(\\n        Math.min(lastKnownPercentage + (scrollAmount / maxDelta) * -100, -10),\\n        -100\\n      );\\n\\n      updateTransform();\\n      e.preventDefault();\\n    }\\n  }\\n  \\n  function scrollOnLoad(x) {\\n    console.log(x);\\n    track.style.transform = \`translate(\${x}%, -50%)\`;\\n\\n    for (const image of track.getElementsByClassName(\\"image\\")) {\\n      image.style.objectPosition = \`\${100 + -10}% center\`;\\n    }\\n  }\\n  \\n  function updateTransform() {\\n    track.style.transform = \`translate(\${lastKnownPercentage}%, -50%)\`;\\n\\n    for (const image of track.getElementsByClassName(\\"image\\")) {\\n      image.style.objectPosition = \`\${100 + lastKnownPercentage}% center\`;\\n    }\\n  }\\n\\n  // Cursor-related functions and variables\\n  let trailer;\\n\\n  function animateTrailer(e, interacting) {\\n    const x = e.clientX - trailer.offsetWidth / 2;\\n    const y = e.clientY - trailer.offsetHeight / 2;\\n\\n    trailer.style.transform = \`translate(\${x}px, \${y}px)\`;\\n  }\\n\\n  const getTrailerIcon = (type) => {\\n    switch (type) {\\n      case \\"link\\":\\n        return faArrowUpRightFromSquare;\\n      case \\"video\\":\\n        return faPlay;\\n      case \\"exit\\":\\n        return faRightToBracket;\\n      default:\\n        return null; // No icon for other types\\n    }\\n  };\\n\\n  const moveCursor = (e) => {\\n    const interactable = e.target.closest(\\".interactable\\");\\n    const interacting = interactable !== null;\\n\\n    animateTrailer(e, interacting);\\n\\n    if (interacting && interactable.dataset.type === \\"link\\") {\\n      trailerIcon = getTrailerIcon(interactable.dataset.type);\\n      trailer.dataset.type = \\"link\\";\\n    } else if (interacting && interactable.dataset.type === \\"video\\") {\\n      trailerIcon = getTrailerIcon(interactable.dataset.type);\\n      trailer.dataset.type = \\"video\\";\\n    } else if (interacting && interactable.dataset.type === \\"exit\\") {\\n      trailerIcon = getTrailerIcon(interactable.dataset.type);\\n      trailer.dataset.type = \\"exit\\";\\n    }\\n    else {\\n      trailerIcon = null;\\n      trailer.dataset.type = \\"\\";\\n    }\\n  };\\n\\n  if (isBrowser) {\\n    function handlePopState() {\\n      isModalOpen = false;\\n      currentModalId = null;\\n    }\\n    onMount(() => {\\n      const dismissed = localStorage.getItem('instructionsDismissed');\\n      showInstructions = !dismissed;\\n\\n      track = document.getElementById(\\"image-track\\");\\n      handleResize();\\n\\n      if (isMobile) {\\n        window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n        window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n        window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n        window.removeEventListener(\\"wheel\\", handleWheel);\\n      } else {\\n        window.addEventListener(\\"mousedown\\", handleMouseDown);\\n        window.addEventListener(\\"mousemove\\", handleMouseMove);\\n        window.addEventListener(\\"mouseup\\", handleMouseUp);\\n        window.addEventListener(\\"wheel\\", handleWheel, { passive: false });\\n      }\\n\\n      window.addEventListener('popstate', handlePopState);\\n      window.addEventListener('resize', handleResize);\\n\\n      trailer = document.getElementById(\\"trailer\\");\\n\\n      window.addEventListener('mousemove', moveCursor);\\n\\n      // Simulate progress\\n      const interval = setInterval(() => {\\n        progress += 10;\\n        if (progress >= 100) {\\n          clearInterval(interval);\\n          setTimeout(() => {\\n            isLoading = false;\\n          }, 500); // Ensure loading screen shows for at least 500ms\\n        }\\n      }, 50);\\n    });\\n\\n    onDestroy(() => {\\n      window.removeEventListener(\\"mousedown\\", handleMouseDown);\\n      window.removeEventListener(\\"mousemove\\", handleMouseMove);\\n      window.removeEventListener(\\"mouseup\\", handleMouseUp);\\n      window.removeEventListener(\\"wheel\\", handleWheel);\\n      window.removeEventListener('popstate', handlePopState);\\n      window.removeEventListener('resize', handleResize);\\n      window.removeEventListener('mousemove', moveCursor);\\n    });\\n  }\\n  \\n  $: if (!isLoading) {\\n    document.getElementById('loading-screen').classList.add('fade-out');\\n  }\\n\\n  function handleTransitionEnd() {\\n    showLoadingScreen = false;\\n  }\\n<\/script>\\n{#if showLoadingScreen}\\n  <div id=\\"loading-screen\\" class:isLoading={isLoading} on:transitionend={handleTransitionEnd}>\\n    Loading...\\n    <div id=\\"progress-bar\\" style=\\"width: {progress}%;\\"></div>\\n  </div>\\n{/if}\\n\\n<div id=\\"image-track\\" class:isLoading={!isLoading}>\\n  {#if showInstructions}\\n    <InstructionCard on:dismiss={dismissInstructions} />\\n  {/if}\\n  \\n  <!-- Example Interactable Elements -->\\n  <div class=\\"image-container interactable\\" data-type=\\"link\\" on:click={(event) => openModal('modal1', event)}>\\n    <img class=\\"image\\" src=\\"/d41586-024-02191-1_27293496.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\"><span>Engineering</span></div>\\n  </div>\\n  \\n  <div class=\\"image-container interactable\\" data-type=\\"link\\" on:click={(event) => openModal('modal2', event)}>\\n    <img class=\\"image\\" src=\\"Satellite Building.png\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\"><span>Mission Goals</span></div>\\n  </div>\\n  \\n  <div class=\\"image-container interactable\\" data-type=\\"link\\" on:click={(event) => openModal('modal3', event)}>\\n    <img class=\\"image\\" src=\\"Uses of Satellites.jpg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\"><span>Uses of Satellites</span></div>\\n  </div>\\n  \\n  <div class=\\"image-container interactable\\" data-type=\\"link\\" on:click={(event) => openModal('modal4', event)}>\\n    <img class=\\"image\\" src=\\"Satellite Launch.jpeg\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\"><span>Launch and<br>Deployment</span></div>\\n  </div>\\n  \\n  <div class=\\"image-container interactable\\" data-type=\\"link\\" on:click={(event) => openModal('modal5', event)}>\\n    <img class=\\"image darker\\" src=\\"Data Analysis.png\\" draggable=\\"false\\" data-active />\\n    <div class=\\"text-overlay\\"><span>Data Analysis</span></div>\\n  </div>\\n</div>\\n\\n<div id=\\"trailer\\" data-type=\\"\\">\\n  {#if trailerIcon}\\n    <FontAwesomeIcon id=\\"trailer-icon\\" icon={trailerIcon} />\\n  {/if}\\n</div>\\n\\n<style>\\n  /* main.svelte styles */\\n\\n  .image-container {\\n    position: relative;\\n  }\\n\\n  \\n</style>\\n\\n{#if isModalOpen}\\n  <Modal id={currentModalId} onClose={closeModal} dimensions={modalDimensions} />\\n{/if}"],"names":[],"mappings":"AA4RE,+BAAiB,CACf,QAAQ,CAAE,QACZ"}`
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
  let progress = 0;
  let trailerIcon = null;
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
  let trailer;
  function animateTrailer(e, interacting) {
    const x = e.clientX - trailer.offsetWidth / 2;
    const y = e.clientY - trailer.offsetHeight / 2;
    trailer.style.transform = `translate(${x}px, ${y}px)`;
  }
  const getTrailerIcon = (type) => {
    switch (type) {
      case "link":
        return faArrowUpRightFromSquare;
      case "video":
        return faPlay;
      case "exit":
        return faRightToBracket;
      default:
        return null;
    }
  };
  const moveCursor = (e) => {
    const interactable = e.target.closest(".interactable");
    const interacting = interactable !== null;
    animateTrailer(e);
    if (interacting && interactable.dataset.type === "link") {
      trailerIcon = getTrailerIcon(interactable.dataset.type);
      trailer.dataset.type = "link";
    } else if (interacting && interactable.dataset.type === "video") {
      trailerIcon = getTrailerIcon(interactable.dataset.type);
      trailer.dataset.type = "video";
    } else if (interacting && interactable.dataset.type === "exit") {
      trailerIcon = getTrailerIcon(interactable.dataset.type);
      trailer.dataset.type = "exit";
    } else {
      trailerIcon = null;
      trailer.dataset.type = "";
    }
  };
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
      window.removeEventListener("mousemove", moveCursor);
    });
  }
  $$result.css.add(css);
  return `${`<div id="loading-screen"${add_classes("isLoading".trim())}>Loading...
    <div id="progress-bar" style="${"width: " + escape(progress, true) + "%;"}"></div></div>`} <div id="image-track"${add_classes("".trim())}>${`${validate_component(InstructionCard, "InstructionCard").$$render($$result, {}, {}, {})}`}  <div class="image-container interactable svelte-1sbr6ag" data-type="link" data-svelte-h="svelte-4m8sfn"><img class="image" src="/d41586-024-02191-1_27293496.jpg" draggable="false" data-active> <div class="text-overlay"><span>Engineering</span></div></div> <div class="image-container interactable svelte-1sbr6ag" data-type="link" data-svelte-h="svelte-wfbda5"><img class="image" src="Satellite Building.png" draggable="false" data-active> <div class="text-overlay"><span>Mission Goals</span></div></div> <div class="image-container interactable svelte-1sbr6ag" data-type="link" data-svelte-h="svelte-cwqpy9"><img class="image" src="Uses of Satellites.jpg" draggable="false" data-active> <div class="text-overlay"><span>Uses of Satellites</span></div></div> <div class="image-container interactable svelte-1sbr6ag" data-type="link" data-svelte-h="svelte-15rzy6k"><img class="image" src="Satellite Launch.jpeg" draggable="false" data-active> <div class="text-overlay"><span>Launch and<br>Deployment</span></div></div> <div class="image-container interactable svelte-1sbr6ag" data-type="link" data-svelte-h="svelte-hhrgci"><img class="image darker" src="Data Analysis.png" draggable="false" data-active> <div class="text-overlay"><span>Data Analysis</span></div></div></div> <div id="trailer" data-type="">${trailerIcon ? `${validate_component(FontAwesomeIcon, "FontAwesomeIcon").$$render($$result, { id: "trailer-icon", icon: trailerIcon }, {}, {})}` : ``}</div>  ${isModalOpen ? `${validate_component(Modal, "Modal").$$render(
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
