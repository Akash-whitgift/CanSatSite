<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import Modal from './Modal.svelte';
  import './styles.css';
  import './cursor.css';
  import InstructionCard from './InstructionCard.svelte';
  import { faPlay, faArrowUpRightFromSquare, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  
  let showInstructions = true;
  let isModalOpen = false;
  let currentModalId;
  let track;
  let isMouseDown = false;
  let initialMouseX = 0;
  let lastKnownPercentage = -10;
  let dragSensitivity = 0.01;
  let scrollSensitivity = 0.2;
  let isMobile = false;
  let modalDimensions = null;
  const isBrowser = typeof window !== 'undefined';
  let isLoading = true; // Add loading state variable
  let progress = 0; // Add progress state variable
  let showLoadingScreen = true; // Add variable to control loading screen visibility
  
  // Initialize trailerIcon as null
  let trailerIcon = null;

  function dismissInstructions() {
    localStorage.setItem('instructionsDismissed', 'true');
    showInstructions = false;
  }
  
  function openModal(modalId, event) {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    isModalOpen = true;
    currentModalId = modalId;
    modalDimensions = {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left
    };
    goto(`#${modalId}`, { replaceState: true });
  }

  function closeModal() {
    isModalOpen = false;
    currentModalId = null;
    goto('/', { replaceState: true });
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

      lastKnownPercentage = Math.max(
        Math.min(lastKnownPercentage + (mouseDelta / maxDelta) * -100 * dragSensitivity, -10),
        -100
      );

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

      lastKnownPercentage = Math.max(
        Math.min(lastKnownPercentage + (scrollAmount / maxDelta) * -100, -10),
        -100
      );

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

  // Cursor-related functions and variables
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
        return null; // No icon for other types
    }
  };

  const moveCursor = (e) => {
    const interactable = e.target.closest(".interactable");
    const interacting = interactable !== null;

    animateTrailer(e, interacting);

    if (interacting && interactable.dataset.type === "link") {
      trailerIcon = getTrailerIcon(interactable.dataset.type);
      trailer.dataset.type = "link";
    } else if (interacting && interactable.dataset.type === "video") {
      trailerIcon = getTrailerIcon(interactable.dataset.type);
      trailer.dataset.type = "video";
    } else if (interacting && interactable.dataset.type === "exit") {
      trailerIcon = getTrailerIcon(interactable.dataset.type);
      trailer.dataset.type = "exit";
    }
    else {
      trailerIcon = null;
      trailer.dataset.type = "";
    }
  };

  if (isBrowser) {
    function handlePopState() {
      isModalOpen = false;
      currentModalId = null;
    }
    onMount(() => {
      const dismissed = localStorage.getItem('instructionsDismissed');
      showInstructions = !dismissed;

      track = document.getElementById("image-track");
      handleResize();

      if (isMobile) {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("wheel", handleWheel);
      } else {
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("wheel", handleWheel, { passive: false });
      }

      window.addEventListener('popstate', handlePopState);
      window.addEventListener('resize', handleResize);

      trailer = document.getElementById("trailer");

      window.addEventListener('mousemove', moveCursor);

      // Simulate progress
      const interval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            isLoading = false;
          }, 500); // Ensure loading screen shows for at least 500ms
        }
      }, 50);
    });

    onDestroy(() => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', moveCursor);
    });
  }
  
  $: if (!isLoading) {
    document.getElementById('loading-screen').classList.add('fade-out');
  }

  function handleTransitionEnd() {
    showLoadingScreen = false;
  }
</script>
{#if showLoadingScreen}
  <div id="loading-screen" class:isLoading={isLoading} on:transitionend={handleTransitionEnd}>
    Loading...
    <div id="progress-bar" style="width: {progress}%;"></div>
  </div>
{/if}

<div id="image-track" class:isLoading={!isLoading}>
  {#if showInstructions}
    <InstructionCard on:dismiss={dismissInstructions} />
  {/if}
  
  <!-- Example Interactable Elements -->
  <div class="image-container interactable" data-type="link" on:click={(event) => openModal('modal1', event)}>
    <img class="image" src="/d41586-024-02191-1_27293496.jpg" draggable="false" data-active />
    <div class="text-overlay"><span>Engineering</span></div>
  </div>
  
  <div class="image-container interactable" data-type="link" on:click={(event) => openModal('modal2', event)}>
    <img class="image" src="Satellite Building.png" draggable="false" data-active />
    <div class="text-overlay"><span>Mission Goals</span></div>
  </div>
  
  <div class="image-container interactable" data-type="link" on:click={(event) => openModal('modal3', event)}>
    <img class="image" src="Uses of Satellites.jpg" draggable="false" data-active />
    <div class="text-overlay"><span>Uses of Satellites</span></div>
  </div>
  
  <div class="image-container interactable" data-type="link" on:click={(event) => openModal('modal4', event)}>
    <img class="image" src="Satellite Launch.jpeg" draggable="false" data-active />
    <div class="text-overlay"><span>Launch and<br>Deployment</span></div>
  </div>
  
  <div class="image-container interactable" data-type="link" on:click={(event) => openModal('modal5', event)}>
    <img class="image darker" src="Data Analysis.png" draggable="false" data-active />
    <div class="text-overlay"><span>Data Analysis</span></div>
  </div>
</div>

<div id="trailer" data-type="">
  {#if trailerIcon}
    <FontAwesomeIcon id="trailer-icon" icon={trailerIcon} />
  {/if}
</div>

<style>
  /* main.svelte styles */

  .image-container {
    position: relative;
  }

  
</style>

{#if isModalOpen}
  <Modal id={currentModalId} onClose={closeModal} dimensions={modalDimensions} />
{/if}