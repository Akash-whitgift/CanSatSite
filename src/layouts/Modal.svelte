<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import  Toc from './Toc.svelte'
  export let id;
  export let onClose;

  let content;
  let isClosing = false;
  let tocHtml = '';
  const modalsData = {
    modal1: {
      title: 'Engineering',
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
    content = modalsData[id].content;
    tocHtml = generateTOC(content);
  });

  function handleClose() {
    isClosing = true;
    setTimeout(() => {
      if (typeof onClose === 'function') {
        onClose();
      }
      isClosing = false;
    }, 1); // Matches the duration of the fade-out transition
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

<div class="modal {isClosing ? 'fade-out' : 'fade-in'}" id={id} transition:fade={{ duration: 300 }}>
  <div class='container'>
  <span class="close" id='closecross' on:click={handleClose}>&times;</span>
  <img class="modal-image" src={modalsData[id].image} />
  
  <div class="modal-text">
    <h1>{modalsData[id].title}</h1>
    <div class="toc">
      <Toc class='toc'> </Toc>
      </div>
    <div class="content-container">
<hr>
      <div class="content">
        {@html content}
      </div>
    </div>
  </div>
  </div>
</div>

<style>

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
    transition: opacity 0.3s ease;
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
    display: block;
    margin: 0 auto;
    width: 110%;
    height: 110vh;
  object-fit: cover;
  --webkit-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  transform: translateX(-2.5%);
  transform: translateY(-10%);
  overflow: hidden;
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
    background-color: rgba(20, 20, 20, 0.8);
    padding: 20px;
    border-radius: 10px;
    text-align: Left;
    width: 80%;
    height: 80%;
    color: white;
    overflow-y: scroll;
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
