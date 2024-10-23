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
      title: 'Sample',
      content: `
      <h2>Sample</h2>
    <p>Sample</p>
      `,
      image: "/Ad01.jpg"
    },
    modal3: {
      title: 'Sample',
      content: `

     <h2>Sample</h2>
    <p>Sample</p>
      `,
      image: "/HTML.webp"
    },
    modal4: {
      title: 'Sample',
      content: `
     <h2>Sample</h2>
    <p>Sample</p>
      `,
      image: "/AiEmer.jpg"
    },
    modal5: {
      title: 'Sample',
      content: `
      <h2>Sample</h2>
    <p>Sample</p>
      `,
      image: "/amazon.jpeg"
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
    <span class="close" id='closecross' on:click={handleClose}>&times;</span>
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
    color: #aaa;
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
