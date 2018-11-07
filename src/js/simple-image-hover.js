function simpleImageHover(className) {
    var isHoveringOverLarger = false;
    var isRemovalTriggeredFromOriginal = false;
    function init() {
        var imagesToHover = document.getElementsByClassName(className);
        for (var key in imagesToHover) {
            if (imagesToHover.hasOwnProperty(key)) {
                var element = imagesToHover[key];
                element.removeEventListener('mouseover', handleSimpleImageHoverMouseEnter, false);
                element.removeEventListener('mouseleave', handleSimpleImageHoverMouseLeave, false);
                element.addEventListener('mouseover', handleSimpleImageHoverMouseEnter, false);
                element.addEventListener('mouseleave', handleSimpleImageHoverMouseLeave, false);
            }
        }
    }

    function handleSimpleImageHoverMouseEnter(e) {
        var newContainerElement = document.createElement('span');
        newContainerElement.classList.add('sih-c');
        newContainerElement.style.position = 'fixed';
        newContainerElement.addEventListener('mouseenter', handleMouseOverLargerHoveredImage, false);
        newContainerElement.addEventListener('mouseleave', handleMouseLeaveLargerHoveredImage, false);
        document.body.appendChild(newContainerElement);

        var adjustedHeightProperty = e.target.naturalHeight;
        var adjustedWidthProperty = e.target.naturalWidth;
        var offsetAmount = 20;


        if (adjustedHeightProperty + offsetAmount > window.innerHeight || adjustedWidthProperty + offsetAmount > window.innerWidth) {

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

        newContainerElement.setAttribute('style', 'position: fixed;z-index:2147483647; ' + '' + verticalStyleProperty + ': ' + verticalLocation + 'px;' + '' + horizontalStyleProperty + ': ' + horizontalLocation + 'px;');
        var newImgElement = document.createElement('img');
        newImgElement.src = e.target.src;
        newImgElement.setAttribute('style', 'width: ' + adjustedWidthProperty + 'px; height: ' + adjustedHeightProperty + 'px;');
        newImgElement.classList.add('sih-b');

        newContainerElement.appendChild(newImgElement);
    }

    function handleMouseOverLargerHoveredImage() {
        isHoveringOverLarger = true;
    }

    function handleMouseLeaveLargerHoveredImage() {
        isHoveringOverLarger = false;
        setTimeout(removeImagePreview, 10);
    }

    function handleSimpleImageHoverMouseLeave(e) {
        isRemovalTriggeredFromOriginal = true;
        setTimeout(removeImagePreview, 10);
    }

    function removeImagePreview() {
        if (isRemovalTriggeredFromOriginal === true && isHoveringOverLarger === false) {
            var imageHoverContainer = document.getElementsByClassName('sih-c');
            for (var index = 0; index < imageHoverContainer.length; index++) {
                var element = imageHoverContainer[0];
                var parent = element.parentNode;
                parent.removeChild(element);
            }
            isRemovalTriggeredFromOriginal = false;
        }
    }

    init();
    return {
        init: init
    };
}