const activeClass = 'active';
const tabs = document.querySelectorAll('.products .tabs span');
const productContents = document.querySelectorAll('.products .content');

const accordions = document.querySelectorAll('main .products .content .accordion');

tabs[0].classList.add(activeClass);
productContents[0].classList.add(activeClass);

function removeActiveClass() {
    const tabElement = document.querySelector(`.products .tabs span.${activeClass}`);
    if (tabElement) {
        tabElement.classList.remove(activeClass);
    }
    const contentElement = document.querySelector(`.products .content.${activeClass}`);
    if (contentElement) {
        contentElement.classList.remove(activeClass);
    }
}

function addClass($event) {
    $event.stopPropagation();
    const target = $event.currentTarget;
    if (target) {
        const id = target.id;
        removeActiveClass();
        target.classList.add(activeClass);
        const contentId = `${id}-content`;
        const contentTarget = document.getElementById(contentId);
        if (contentTarget) {
            contentTarget.classList.add(activeClass);
        }
    }
        
}

tabs.forEach(tab => {
    tab.addEventListener('click', addClass);
});

function toggle($event) {
    $event.stopPropagation();
    const target = $event.currentTarget;
    if (target) {
        
        const activePanel = document.querySelector(`main .products .content .panel.${activeClass}`);
        if (activePanel) {
            activePanel.classList.toggle('active');
        }

        const activeAccordion = document.querySelector(`main .products .content .accordion.${activeClass}`);
        if (activeAccordion) {
            activeAccordion.classList.toggle('active');
        }

        const activePicture = document.querySelector(`main .products .content .product-photo img.${activeClass}`);
        if (activePicture) {
            activePicture.classList.toggle('active');
        }

        target.classList.toggle('active');

        const id = target.id;
        const pictureId = `${id}-picture`;
        const pictureItem = document.getElementById(pictureId);
        pictureItem.classList.toggle('active');

        const panel = target.nextElementSibling;
        if (panel) {
            panel.classList.toggle('active');
        }
    }
}

accordions.forEach(accordion => {
    accordion.addEventListener('click', toggle);
})