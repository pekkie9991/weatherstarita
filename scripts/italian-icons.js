// Italian weather condition mapping for WeatherStar 4000+
// This script maps Italian weather descriptions to English icon names

(function() {
    // Store the original icon mapping function
    const originalXV = window.IconMapping?.XV;
    
    // Italian to English weather condition mapping
    const italianToEnglish = {
        // Clear/Sunny
        "Sereno": "clear-sky",
        "Prevalentemente sereno": "mainly-clear",
        "Cielo sereno": "clear-sky",
        
        // Cloudy
        "Parzialmente nuvoloso": "partly-cloudy",
        "Prevalentemente nuvoloso": "overcast",
        "Nuvoloso": "overcast",
        "Coperto": "overcast",
        "Cielo coperto": "overcast",
        
        // Rain
        "Pioggia": "rain",
        "Rovesci di pioggia deboli": "rain-showers",
        "Rovesci": "rain-showers",
        "Rovesci di pioggia": "rain-showers",
        "Acquazzoni": "heavy-rain",
        
        // Snow
        "Neve": "snow",
        "Rovesci di neve": "snow-showers",
        "Nevicata": "heavy-snow",
        
        // Thunderstorm
        "Temporale": "thunderstorm",
        "Temporali": "thunderstorm",
        
        // Fog
        "Nebbia": "fog",
        
        // Mixed
        "Misto": "rain-snow",
        "Pioggia e neve": "rain-snow"
    };
    
    // Override the icon mapping if it exists
    if (typeof window.IconMapping !== 'undefined') {
        window.IconMapping.XV = function(condition, timeZone, isDay) {
            // Check if it's an Italian condition
            if (italianToEnglish[condition]) {
                console.log(`Mapping Italian condition "${condition}" to "${italianToEnglish[condition]}"`);
                condition = italianToEnglish[condition];
            }
            // Call original function with mapped condition
            if (originalXV) {
                return originalXV.call(this, condition, timeZone, isDay);
            }
            // Fallback to default mapping
            return window.IconMapping.Kc(condition);
        };
    }
    
    // Alternative: patch the icon loading directly
    const originalLog = console.log;
    console.log = function(...args) {
        if (args[0] && args[0].includes && args[0].includes('Unable to locate icon for:')) {
            const italianCondition = args[0].replace('Unable to locate icon for: ', '');
            if (italianToEnglish[italianCondition]) {
                originalLog.call(console, `[Italian Icons] Mapping "${italianCondition}" to "${italianToEnglish[italianCondition]}"`);
                // Try to load the English icon instead
                const img = new Image();
                img.src = `images/${italianToEnglish[italianCondition]}.gif`;
            }
        }
        originalLog.apply(console, args);
    };
    
    console.log('Italian weather icon mapping loaded');
})();
