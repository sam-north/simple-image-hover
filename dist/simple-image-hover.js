function simpleImageHover(className) {
    function init() {
        console.log('setting event listeners');
        var imagesToHover = document.getElementsByClassName(className);
        for (var key in imagesToHover) {
            if (imagesToHover.hasOwnProperty(key)) {
                var element = imagesToHover[key];
                console.log('setting event listeners 3');
                element.removeEventListener('mouseover', handleSimpleImageHoverMouseEnter, false);
                element.removeEventListener('mouseleave', handleSimpleImageHoverMouseLeave, false);
                element.addEventListener('mouseover', handleSimpleImageHoverMouseEnter, false);
                element.addEventListener('mouseleave', handleSimpleImageHoverMouseLeave, false);
            }
        }
    }

    function handleSimpleImageHoverMouseEnter(e) {
        console.log('window.innerHeight: ' + window.innerHeight, 'window.innerWidth: ' + window.innerWidth);
        var newContainerElement = document.createElement('span');
        newContainerElement.id = 'sih-c';
        newContainerElement.style.position = 'fixed';
        document.body.appendChild(newContainerElement);

        var adjustedHeightProperty = e.target.naturalHeight;
        var adjustedWidthProperty = e.target.naturalWidth;
        var offsetAmount = 20;


        if (adjustedHeightProperty + offsetAmount > window.innerHeight || adjustedWidthProperty + offsetAmount > window.innerWidth) {
            console.log('before -- adjusted height: ' + adjustedHeightProperty, 'adjustedWidthProperty: ' + adjustedWidthProperty);

            adjustedHeightProperty = window.innerHeight - (offsetAmount * 5);
            adjustedWidthProperty = window.innerWidth - (offsetAmount * 5);
            var imageProportionScale = adjustedWidthProperty / window.innerWidth;
            if (adjustedWidthProperty >= adjustedHeightProperty) {
                adjustedHeightProperty = adjustedHeightProperty / imageProportionScale;
            }
            else {
                imageProportionScale = adjustedHeightProperty / window.innerHeight;
                adjustedWidthProperty = adjustedWidthProperty / imageProportionScale;
            }
            console.log('after -- adjusted height: ' + adjustedHeightProperty, 'adjustedWidthProperty: ' + adjustedWidthProperty);
        }

        var verticalLocation = e.clientY;
        var horizontalLocation = e.clientX;
        var verticalStyleProperty = 'top';
        var horizontalStyleProperty = 'left';

        if (e.clientY + adjustedHeightProperty + offsetAmount > window.innerHeight && e.clientY - adjustedHeightProperty + offsetAmount <= 0) {
            verticalLocation = 0;
        }
        else if (e.clientY + adjustedHeightProperty + offsetAmount > window.innerHeight) {
            verticalStyleProperty = 'bottom';
            verticalLocation = window.innerHeight - e.clientY - offsetAmount;
        }
        verticalLocation += offsetAmount;
        if (e.clientX + e.target.naturalWidth + offsetAmount > window.innerWidth && e.clientX + e.target.naturalWidth + offsetAmount <= 0) {
            horizontalLocation = 0;
        }
        else if (e.clientX + e.target.naturalWidth + offsetAmount > window.innerWidth) {
            horizontalStyleProperty = 'right';
            horizontalLocation = window.innerWidth - e.clientX;
        }
        horizontalLocation += offsetAmount;

        newContainerElement.setAttribute('style', 'position: fixed; border: solid 3px #222; ' + '' + verticalStyleProperty + ': ' + verticalLocation + 'px;' + '' + horizontalStyleProperty + ': ' + horizontalLocation + 'px;');
        var newImgElement = document.createElement('img');
        newImgElement.src = e.target.src;
        newImgElement.setAttribute('style', 'width: ' + adjustedWidthProperty + 'px; height: ' + adjustedHeightProperty + 'px;');
        newImgElement.classList.add('sih-b');
        newContainerElement.appendChild(newImgElement);
    }

    function handleSimpleImageHoverMouseLeave(e) {
        console.log('handleSimpleImageHoverMouseLeave');
        var imageHoverContainer = document.getElementById('sih-c');
        imageHoverContainer.remove();
    }

    init();
    return {
        init: init
    };
}
