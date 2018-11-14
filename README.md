# simple-image-hover.js
------
Lightweight .js plugin for hovering over smaller images on a webpage and quickly seeing a larger version of the image.

## Demo 
[Visit the demo](http://sammynorth.com/#samnorth/simple-image-hover) to see the plugin in action

## Getting Started
------
Load the simple-image-hover dist minified script within the page of the app
```javascript
    <script type="text/javascript" src="../dist/simple-image-hover.min.js"></script>
```

Institialize!
```javascript
    var imageHoverPlugin = simpleImageHover('target-class-name');
```

Re-Initialize!
```javascript
    imageHoverPlugin.init();
```

### Features
------
* Reinitialization for DOM elements loaded after original plugin initialization.  
* Always visible
* Larger image remains visible if user leaves hover of smaller image to hover over larger image.

### Configuration Options
------

###### className - __(Required)__
Type: `String`
The HTML img element(s) class name signifying which images to hover.  Images without the specified classname do not generate event listeners and do not have simple-image-hover.js hovering capabilities.

### Functions
------

| name | description |
|------|-------------|
|init() | Will initialize hover event listeners over img elements containing the specified class-name.  Will remove previous hover event listeners if previously called. This function is also automatically called on the first initialization of the plugin |