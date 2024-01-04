const activeClass = 'active';

const disableTab = () => {
    const tabElement = document.querySelector('[data-tab-active="true"]');
    if (tabElement) {
        tabElement.classList.remove(activeClass);
        tabElement.dataset.tabActive = false;
        disableProductContent(tabElement.id);
    }
}

const disableProductContent = (id) => {
    const contentId = `${id}-content`;
    const contentElement = document.getElementById(contentId);
    if (contentElement) {
        contentElement.classList.remove(activeClass);
        contentElement.dataset.tabContentActive = false;
    }
}

const enableTab = ($event) => {
    $event.stopPropagation();
    const target = $event.currentTarget;

    if (target) {
        disableTab();
        target.classList.add(activeClass);
        target.dataset.tabActive = true;
        enableProductContent(target.id);
    }
        
}

const enableProductContent = (id) => {
    const contentId = `${id}-content`;
    const contentTarget = document.getElementById(contentId);
    if (contentTarget) {
        contentTarget.classList.add(activeClass);
        contentTarget.dataset.tabContentActive = true;
    }
}

const toggleAccordionEvent = ($event) => {
    $event.stopPropagation();
    const target = $event.currentTarget;
    toggleAccordion(target);
}

const toggleAccordion = (item) => {
    if (item) {
        disableAccordion();
        item.classList.toggle('active');
        item.dataset.accordionActive = true;
        
        toggleAccordionPanel(item);
        enableProductPicture(item.id);
    }
}

const disableAccordion = () => {
    const activeAccordion = document.querySelector('[data-accordion-active="true"]');
    if (activeAccordion) {
        activeAccordion.classList.toggle('active');
        activeAccordion.dataset.accordionActive = false;
    }
}

const toggleAccordionPanel = (target) => {
    disableAccordionPanel();
    const panel = target.nextElementSibling;
    if (panel) {
        panel.classList.toggle('active');
        panel.dataset.accordionPanelActive = true;
    }
}

const disableAccordionPanel = () => {
    const activePanel = document.querySelector('[data-accordion-panel-active="true"]');
    if (activePanel) {
        activePanel.classList.toggle('active');
        activePanel.dataset.accordionPanelActive = false;
    }
}

const enableProductPicture = (id) => {
    disablePicture();
    const pictureId = `${id}-picture`;
    const picture = document.getElementById(pictureId);
    picture.classList.toggle('active');
    picture.dataset.pictureActive = true;
}

const disablePicture = () => {
    const activePicture = document.querySelector('[data-picture-active="true"]');
    if (activePicture) {
        activePicture.classList.toggle('active');
        activePicture.dataset.pictureActive = false;
    }
}

const initializeTabsBehavior = () => {
    const tabs = document.querySelectorAll('[data-behavior="tabs"]');

    tabs[0].classList.add(activeClass);
    tabs[0].dataset.tabActive = true;

    tabs.forEach(tab => {
        tab.addEventListener('click', enableTab);
    });

    const productContents = document.querySelectorAll('[data-behavior="tabs-content"]');
    productContents[0].classList.add(activeClass);
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

initializeTabsBehavior();
initializeAccordionBehavior();
