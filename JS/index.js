let contentContainer              = document.querySelector('.content');
let showHideButton                = document.querySelector('.showHideButton');
let isContentShowing              = false;
let contentContainer_closedHeight = null;
let contentContainer_openHeight   = null;



let calculateContainerHeights = ()=>{

    let cards                 = document.querySelectorAll('.content .card');
    let topRowCards           = [];
    let topCardValue          = null;
    let tallestTopCard        = null;
    let tallestTopCard_bottom = null;
    let lowestCard_bottom     = null;

    /* Loop to collect topRowCards */
    for(let i = 0; i < cards.length; i++){
        let card = cards[i];
        if( i === 0){
            topCardValue = card.getBoundingClientRect().top;
            topRowCards.push(card);
            lowestCard_bottom = card.getBoundingClientRect().bottom;
        }
        else{
            if( card.getBoundingClientRect().top === topCardValue){
                topRowCards.push(card);
            };

            if( card.getBoundingClientRect().bottom > lowestCard_bottom){
                lowestCard_bottom = card.getBoundingClientRect().bottom;
            };
        };
    };

    /* Loop to find tallesTopCard */
    for(let i = 0; i < topRowCards.length; i++){
        let card = topRowCards[i];
        if( i === 0){
            tallestTopCard = card;
        }
        else{
            if( card.getBoundingClientRect().height > tallestTopCard.getBoundingClientRect().height){
                tallestTopCard = card;
            };
        };
    };

    tallestTopCard_bottom         = tallestTopCard.getBoundingClientRect().bottom;
    contentContainer_closedHeight = tallestTopCard_bottom - contentContainer.getBoundingClientRect().top;
    contentContainer_openHeight   = lowestCard_bottom - contentContainer.getBoundingClientRect().top;
};



showHideButton.addEventListener('click', ()=>{
    if( isContentShowing === false){
        contentContainer.style = `height: ${contentContainer_openHeight}px`;
        showHideButton.innerHTML = 'Show Less';
        isContentShowing = true;
    }
    else
    if( isContentShowing === true){
        contentContainer.style = `height: ${contentContainer_closedHeight}px`;
        showHideButton.innerHTML = 'Show More';
        isContentShowing = false;
    };
});



window.addEventListener('resize', ()=>{
    calculateContainerHeights();
    if( isContentShowing === false){
        contentContainer.style = `height: ${contentContainer_closedHeight}px`;
        showHideButton.innerHTML = 'Show More';
    }
    else
    if( isContentShowing === true){
        contentContainer.style = `height: ${contentContainer_openHeight}px`;
        showHideButton.innerHTML = 'Show Less';
    };
});



document.addEventListener('DOMContentLoaded', ()=>{
    calculateContainerHeights();
    contentContainer.style = `height: ${contentContainer_closedHeight}px`;
});
