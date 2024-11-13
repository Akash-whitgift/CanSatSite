<script>
  import { onMount, onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import  Toc from './Toc.svelte'
  export let id;
  export let onClose;
  export let dimensions;

  const size = tweened(
    { width: dimensions.width, height: dimensions.height, top: dimensions.top, left: dimensions.left },
    { duration: 2, easing: cubicOut }
  );

  let content;
  let isClosing = false;
  let tocHtml = '';
  let modalElement;
  const modalsData = {
    modal1: {
      title: 'Engineering',
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
      title: 'Mission Goals',
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
      title: 'Uses of Satellites',
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
      title: 'Launch and Deployment',
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
      title: 'Data Analysis',
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

  onMount(() => {
    // Start at the image size
    modalElement.style.width = `${dimensions.width}px`;
    modalElement.style.height = `${dimensions.height}px`;
    modalElement.style.top = `${dimensions.top}px`;
    modalElement.style.left = `${dimensions.left}px`;
    // Animate to full screen after a short delay
    setTimeout(() => {
      size.set({ width: window.innerWidth, height: window.innerHeight, top: 0, left: 0 });
    }, 50);
    window.addEventListener('resize', handleResize);
  });

  onDestroy(() => {
  // Remove resize event listener
  window.removeEventListener('resize', handleResize);
  });
  function handleClose() {
    isClosing = true;
    // Animate back to original size
    size.set({ width: dimensions.width, height: dimensions.height, top: dimensions.top, left: dimensions.left })
      .then(() => {
        if (typeof onClose === 'function') {
          onClose();
        }
        isClosing = false;
      });
  }


  function handleResize() {
  if (modalElement) {
    size.set({ width: window.innerWidth, height: window.innerHeight, top: 0, left: 0 });
  }
}


function generateTOC(content) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const headings = tempDiv.querySelectorAll('h2, h3');
   let tocHtml = '';
  headings.forEach((heading, index) => {
    const level = heading.tagName.toLowerCase();
    const text = heading.textContent;
    const id = `section-${index}`; // Generate unique ID for each section
   heading.id = id; // Assign ID to the heading for linking
    const listItem = `<li><a href="#${id}"><${level}>${text}</${level}></a></li>`;
    tocHtml += listItem;
  });
  return `<ul>${tocHtml}</ul>`;
}

function scrollToSection(id) {
  const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
}








</script>
<div class="modal-overlay" class:fade-out={isClosing} on:click={handleClose}></div>
<div
  bind:this={modalElement}
  class="modal"
  class:fade-out={isClosing}
  id={id}
  style="width: {$size.width}px; height: {$size.height}px; top: {$size.top}px; left: {$size.left}px;"
>
  <div class="modal-image"></div>
  <div class='modal-content'>
    <span class="close interactable" id='closecross' data-type="exit" on:click={handleClose}> &times;</span>
    <div class="modal-text">
      {#if modalsData[id].image}
      <div class="cover-image-container">
        <img src={modalsData[id].image} alt={modalsData[id].title} class='cover-image' />
      </div>
      {/if}
      <h1>{modalsData[id].title}</h1>
      <div class="content-container">
        <hr>
        <div class="content">
          {@html modalsData[id].content}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  .cover-image-container {
  position: relative;
  width: 100%;
  height: 300px; /* Adjust height as needed */
  overflow: hidden;
  margin-bottom: 20px;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(70%)
}
  .modal-content {
    display: flex;
    justify-content: center;
  }
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    padding-top: 60px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: hidden;
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 1;
    transform-origin: center center;
    transition: opacity 0.3s ease, transform 0.3s ease;
    position: fixed;
    background: white;
    z-index: 1000;
    transition: all 0.3s ease;
    
  }
  .scale-in {
    opacity: 1;
    transform: scale(1);
  }
  .scale-out {
    opacity: 0;
    transform: scale(0.5);
  }
  .container {
    overflow: visible;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .fade-in {
    opacity: 1;
  }
  .fade-out {
    opacity: 0;
  }
  .modal-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    z-index: 0;
  }

  .close {
    color: #fff;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  .close:hover,
  .close:focus {
    text-decoration: none;
    cursor: pointer;
  }
  .modal-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background-color: rgba(20, 20, 20, 0.8); */
    padding: 20px;
    border-radius: 10px;
    text-align: Left;
    width: 100%;
    height: 100%;
    color: white;
    overflow-y: scroll;
    margin: 10px;
  }
  h1 {
    font-size: 3.5em;
    margin: 5px;
  }
  @media (max-width: 600px) {
  h1 {
    font-size:2.5em;

  }
  img {
    width: 100%;
    height: auto;
  }
}
.modal-text::-webkit-scrollbar {
width: 2px;
  border-radius: 80%;
}
.modal-text::-webkit-scrollbar-track{
background: #000000;
  width:0;
  visibility: hidden;
}
.modal-text::-webkit-scrollbar-thumb {
background: #ffffff;
border-radius: 2px;
}

  .content-container {
    flex: 1;
    padding-right: 20px; /* Adjust spacing between TOC and content */
    overflow-y: hidden; /* Allow scrolling if content is too long */
  }


</style>
