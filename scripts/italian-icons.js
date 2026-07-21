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
    
    // Also patch Image.src to catch dynamic loading
    const originalImageSrc = Object.getOwnPropertyDescriptor(Image.prototype, 'src');
    Object.defineProperty(Image.prototype, 'src', {
        set: function(value) {
            if (typeof value === 'string' && value.includes('.gif')) {
                for (const [italian, english] of Object.entries(italianToEnglish)) {
                    if (value.includes(italian + '.gif')) {
                        // Replace Italian condition with English icon name
                        let newValue = value.replace(italian + '.gif', english + '.gif');
                        // Also fix path if it's looking in images/2/ but icon is in images/
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
    
    // Fix moon icon paths - they should be in images/2/ not images/
    const originalLog = console.log;
    console.log = function(...args) {
        if (args[0] && typeof args[0] === 'string' && args[0].includes('Unable to locate icon for:')) {
            const italianCondition = args[0].replace('Unable to locate icon for: ', '');
            if (italianToEnglish[italianCondition]) {
                const englishIcon = italianToEnglish[italianCondition];
                originalLog.call(console, `[Italian Icons] Redirecting "${italianCondition}" to "${englishIcon}"`);
                
                // Find and replace all img elements with this Italian condition
                document.querySelectorAll('img[src*="' + italianCondition + '.gif"]').forEach(img => {
                    img.src = img.src.replace(italianCondition + '.gif', englishIcon + '.gif');
                });
                
                // Also replace in any img elements that might be created dynamically
                return;
            }
        }
        originalLog.apply(console, args);
    };
    
    console.log('Italian weather icon mapping loaded');
})();
