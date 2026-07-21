// Italian weather condition mapping for WeatherStar 4000+
// This script maps Italian weather descriptions to English icon names

(function() {
    // Italian to English weather condition mapping (mapped to actual icon filenames)
    const italianToEnglish = {
        // Clear/Sunny
        "Sereno": "Sunny",
        "Prevalentemente sereno": "Mostly-Clear",
        "Cielo sereno": "Sunny",
        
        // Cloudy
        "Parzialmente nuvoloso": "Partly-Cloudy",
        "Prevalentemente nuvoloso": "Mostly-Cloudy",
        "Nuvoloso": "Cloudy",
        "Coperto": "Cloudy",
        "Cielo coperto": "Cloudy",
        
        // Rain
        "Pioggia": "Rain",
        "Rovesci di pioggia deboli": "Shower",
        "Rovesci": "Shower",
        "Rovesci di pioggia": "Shower",
        "Acquazzoni": "Rain",
        
        // Snow
        "Neve": "Snow",
        "Rovesci di neve": "Snow-Sleet",
        "Nevicata": "Heavy-Snow",
        
        // Thunderstorm
        "Temporale": "Thunderstorm",
        "Temporali": "Thunderstorm",
        
        // Fog
        "Nebbia": "Fog",
        
        // Mixed
        "Misto": "Rain-Snow",
        "Pioggia e neve": "Rain-Snow"
    };
    
    // Function to fix image paths
    function fixImageSrc(img) {
        if (!img.src || typeof img.src !== 'string') return;
        
        let src = img.src;
        
        // Fix moon icon paths - add weatherstarita if missing
        if (src.includes('pekkie9991.github.io/images/2/') && !src.includes('weatherstarita')) {
            src = src.replace('pekkie9991.github.io/images/', 'pekkie9991.github.io/weatherstarita/images/');
            img.src = src;
            console.log(`[Italian Icons] Fixed moon icon path to: ${src}`);
        }
        
        // Map Italian conditions to English icons
        for (const [italian, english] of Object.entries(italianToEnglish)) {
            if (src.includes(italian + '.gif')) {
                let newSrc = src.replace(italian + '.gif', english + '.gif');
                // Fix path if looking in images/2/ but icon is in images/
                if (newSrc.includes('images/2/') && !newSrc.includes('images/2/r/')) {
                    newSrc = newSrc.replace('images/2/', 'images/');
                }
                img.src = newSrc;
                console.log(`[Italian Icons] Mapped "${italian}.gif" to "${english}.gif"`);
                return;
            }
        }
    }
    
    // Patch Image.src to catch dynamic loading
    const originalImageSrc = Object.getOwnPropertyDescriptor(Image.prototype, 'src');
    Object.defineProperty(Image.prototype, 'src', {
        set: function(value) {
            if (typeof value === 'string' && value.includes('.gif')) {
                // Fix moon icon paths
                if (value.includes('pekkie9991.github.io/images/2/') && !value.includes('weatherstarita')) {
                    value = value.replace('pekkie9991.github.io/images/', 'pekkie9991.github.io/weatherstarita/images/');
                }
                
                for (const [italian, english] of Object.entries(italianToEnglish)) {
                    if (value.includes(italian + '.gif')) {
                        let newValue = value.replace(italian + '.gif', english + '.gif');
                        if (newValue.includes('images/2/') && !newValue.includes('images/2/r/')) {
                            newValue = newValue.replace('images/2/', 'images/');
                        }
                        console.log(`[Italian Icons] Replacing "${italian}.gif" with "${english}.gif"`);
                        originalImageSrc.set.call(this, newValue);
                        return;
                    }
                }
            }
            originalImageSrc.set.call(this, value);
        },
        get: function() {
            return originalImageSrc.get.call(this);
        }
    });
    
    // Use MutationObserver to fix images already in DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeName === 'IMG') {
                    fixImageSrc(node);
                } else if (node.querySelectorAll) {
                    node.querySelectorAll('img').forEach(fixImageSrc);
                }
            });
        });
    });
    
    // Start observing
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Fix existing images on page load
    document.querySelectorAll('img').forEach(fixImageSrc);
    
    console.log('Italian weather icon mapping loaded');
})();
