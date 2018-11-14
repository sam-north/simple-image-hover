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

        var offsetAmount = 20;
        var marginAmount = 50;
        var horizontalLocation = e.clientX;
        var verticalLocation = e.clientY;
        var verticalStyleProperty = '';
        var horizontalStyleProperty = '';

        if (horizontalLocation > (window.innerWidth / 2)) {
            horizontalStyleProperty = 'right';
            horizontalLocation = window.innerWidth - horizontalLocation + offsetAmount;
        }
        else {
            horizontalStyleProperty = 'left';
            horizontalLocation = horizontalLocation + offsetAmount;
        }

        if (verticalLocation > (window.innerHeight / 2)) {
            verticalStyleProperty = 'bottom';
            verticalLocation = window.innerHeight - verticalLocation + offsetAmount;
        } else {
            verticalStyleProperty = 'top';
            verticalLocation = verticalLocation + offsetAmount;
        }

        var adjustedHeightProperty = e.target.naturalHeight;
        var adjustedWidthProperty = e.target.naturalWidth;
        var imageProportionScale;
        if (horizontalLocation + adjustedWidthProperty + marginAmount > window.innerWidth) {
            var preAdjustmentWidth = adjustedWidthProperty;
            adjustedWidthProperty = window.innerWidth - horizontalLocation - marginAmount;
            imageProportionScale = adjustedWidthProperty / preAdjustmentWidth;
            adjustedHeightProperty *= imageProportionScale;
        }

        if (verticalLocation + adjustedHeightProperty + marginAmount > window.innerHeight) {
            var preAdjustmentHeight = adjustedHeightProperty;
            adjustedHeightProperty = window.innerHeight - verticalLocation - marginAmount;
            imageProportionScale = adjustedHeightProperty / preAdjustmentHeight;
            adjustedWidthProperty *= imageProportionScale;
        }

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