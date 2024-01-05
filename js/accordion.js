const accordionActiveClass = 'active';

const toggleAccordionEvent = ($event) => {
    $event.stopPropagation();
    const target = $event.currentTarget;
    toggleAccordion(target);
}

const toggleAccordion = (accordion) => {
    if (accordion) {
        disableAccordion(accordion);
        accordion.classList.toggle(accordionActiveClass);
        accordion.dataset.accordionActive = true;
        
        toggleAccordionPanel(accordion);
        enableProductPicture(accordion);
    }
}

const disableAccordion = (accordion) => {
    const accordionContainer = accordion.parentElement;
    const activeAccordion = accordionContainer.querySelector('[data-accordion-active="true"]');
    if (activeAccordion) {
        activeAccordion.classList.toggle(accordionActiveClass);
        activeAccordion.dataset.accordionActive = false;
    }
}

const toggleAccordionPanel = (accordion) => {
    disableAccordionPanel(accordion);
    const accordionPanel = accordion.nextElementSibling;
    if (accordionPanel) {
        accordionPanel.classList.toggle(accordionActiveClass);
        accordionPanel.dataset.accordionPanelActive = true;
    }
}

const disableAccordionPanel = (accordion) => {
    const accordionContainer = accordion.parentElement;
    const activePanel = accordionContainer.querySelector('[data-accordion-panel-active="true"]');
    if (activePanel) {
        activePanel.classList.toggle(accordionActiveClass);
        activePanel.dataset.accordionPanelActive = false;
    }
}

const enableProductPicture = (accordion) => {
    disablePicture(accordion);
    const picture = document.querySelector(`[data-accordion-picture="${accordion.id}"]`)
    picture.classList.toggle(accordionActiveClass);
    picture.dataset.pictureActive = true;
}

const disablePicture = (accordion) => {
    const accordionContainer = accordion.parentElement;
    const pictureContainer = accordionContainer.nextElementSibling;
    const activePicture = pictureContainer.querySelector('[data-picture-active="true"]');
    if (activePicture) {
        activePicture.classList.toggle(accordionActiveClass);
        activePicture.dataset.pictureActive = false;
    }
}

const initializeAccordionBehavior = () => {
    
    const productContents = document.querySelectorAll('[data-behavior="tabs-content"]');

    productContents.forEach(productContent => {
        const accordions = productContent.querySelectorAll('[data-behavior="accordion"]');

        toggleAccordion(accordions[0]);
        
        accordions.forEach(accordion => {
            accordion.addEventListener('click', toggleAccordionEvent);
        })
    })
}

initializeAccordionBehavior();
