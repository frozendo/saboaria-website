const tabActiveClass = 'active';

const disableTab = () => {
    const tabElement = document.querySelector('[data-tab-active="true"]');
    if (tabElement) {
        tabElement.classList.remove(tabActiveClass);
        tabElement.dataset.tabActive = false;
        disableProductContent(tabElement.id);
    }
}

const disableProductContent = (id) => {
    const contentElement = document.querySelector(`[data-tab-content="${id}"]`);
    if (contentElement) {
        contentElement.classList.remove(tabActiveClass);
        contentElement.dataset.tabContentActive = false;
    }
}

const enableTab = ($event) => {
    $event.stopPropagation();
    const target = $event.currentTarget;

    if (target) {
        disableTab();
        target.classList.add(tabActiveClass);
        target.dataset.tabActive = true;
        enableProductContent(target.id);
    }
        
}

const enableProductContent = (id) => {
    const contentTarget = document.querySelector(`[data-tab-content="${id}"]`)
    if (contentTarget) {
        contentTarget.classList.add(tabActiveClass);
        contentTarget.dataset.tabContentActive = true;
    }
}

const initializeTabsBehavior = () => {
    const tabs = document.querySelectorAll('[data-behavior="tabs"]');

    tabs[0].classList.add(tabActiveClass);
    tabs[0].dataset.tabActive = true;

    tabs.forEach(tab => {
        tab.addEventListener('click', enableTab);
    });

    const productContents = document.querySelectorAll('[data-behavior="tabs-content"]');
    productContents[0].classList.add(tabActiveClass);
}

initializeTabsBehavior();