const activeClass = 'active';
const tabs = document.querySelectorAll('.products .tabs span');
const productContents = document.querySelectorAll('.products .content');

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