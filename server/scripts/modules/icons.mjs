/* spell-checker: disable */

// Italian to English weather condition mapping
const italianToEnglish = {
	// Clear/Sunny
	'sereno': 'clear-sky',
	'cielo sereno': 'clear-sky',
	'prevalentemente sereno': 'mainly-clear',
	
	// Cloudy
	'parzialmente nuvoloso': 'partly-cloudy',
	'prevalentemente nuvoloso': 'overcast',
	'nuvoloso': 'overcast',
	'coperto': 'overcast',
	'cielo coperto': 'overcast',
	
	// Fog
	'nebbia': 'fog',
	'nebbia con brina': 'depositing-rime-fog',
	
	// Drizzle
	'pioviggine leggera': 'light-drizzle',
	'pioviggine moderata': 'moderate-drizzle',
	'pioviggine fitta': 'dense-drizzle',
	'pioviggine gelata leggera': 'light-freezing-drizzle',
	'pioviggine gelata intensa': 'dense-freezing-drizzle',
	
	// Rain
	'pioggia': 'moderate-rain',
	'pioggia debole': 'slight-rain',
	'pioggia moderata': 'moderate-rain',
	'pioggia forte': 'heavy-rain',
	'pioggia gelata leggera': 'light-freezing-rain',
	'pioggia gelata forte': 'heavy-freezing-rain',
	'rovesci': 'slight-rain-showers',
	'rovesci di pioggia': 'slight-rain-showers',
	'rovesci di pioggia deboli': 'slight-rain-showers',
	'rovesci di pioggia moderati': 'moderate-rain-showers',
	'rovesci di pioggia violenti': 'voilent-rain-showers',
	'acquazzoni': 'moderate-rain-showers',
	
	// Snow
	'neve': 'moderate-snow-fall',
	'nevicata debole': 'slight-snow-fall',
	'nevicata moderata': 'moderate-snow-fall',
	'nevicata abbondante': 'heavy-snow-fall',
	'rovesci di neve': 'slight-snow-showers',
	'rovesci di neve deboli': 'slight-snow-showers',
	'rovesci di neve forti': 'heavy-snow-showers',
	'nevicata': 'heavy-snow-fall',
	'granelli di neve': 'snow-grains',
	
	// Mixed
	'misto': 'rain-snow',
	'pioggia e neve': 'rain-snow',
	
	// Thunderstorm
	'temporale': 'thunderstorm',
	'temporali': 'thunderstorm',
	'temporale con grandine debole': 'thunderstorm-with-slight-hail',
	'temporale con grandine forte': 'thunderstorm-with-heavy-hail'
};

function translateItalianToEnglish(text) {
	if (!text) return text;
	const lowerText = text.toLowerCase();
	if (italianToEnglish[lowerText]) {
		return italianToEnglish[lowerText];
	}
	return text;
}

function isNightTime(timeZone) {
	const now = new Date();
	try {
		const hour = new Intl.DateTimeFormat('en-US', {
			hour: 'numeric',
			hour12: false,
			timeZone,
		}).format(now);

		return hour >= 18 || hour < 6;
	} catch (error) {
		console.warn(`Unable to determine night time for timezone "${timeZone}":`, error);
		return false;
	}
}

const getWaveIconFromCondition = (condition) => {
	const addPath = (icon) => `images/r/${icon}`;

	let tidyText = condition.toLowerCase();
	if (tidyText.includes(' ')) tidyText = tidyText.replaceAll(' ', '-');

	switch (tidyText) {
		case 'calm':
		case 'smooth':
			return addPath('smooth.svg');
		case 'slight':
		case 'mdt-chop':
			return addPath('slight.svg');
		case 'choppy':
			return addPath('choppy.svg');
		case 'rough':
		case 'v-rough':
		case 'high':
		case 'v-high':
		case 'phenomenal':
			return addPath('rough.svg');
		default:
			console.log(`Unable to locate wave icon for: ${condition}`);
			return addPath('Logo3.gif');
	}
};

const getWeatherRegionalIconFromIconLink = (text, isDay) => {
	// internal function to add path to returned icon
	const addPath = (icon) => `images/r/${icon}`;

	// Translate Italian to English first
	text = translateItalianToEnglish(text);

	let isDayValue;
	if (typeof isDay === 'boolean') {
		isDayValue = isDay;
	} else if (typeof isDay === 'number') {
		isDayValue = isDay === 1;
	} else if (typeof isDay === 'string') {
		if (isDay === '0' || isDay.toLowerCase() === 'false') {
			isDayValue = false;
		} else if (isDay === '1' || isDay.toLowerCase() === 'true') {
			isDayValue = true;
		}
	}

	let tidyText = text.toLowerCase();
	if (tidyText.includes(' ')) tidyText = tidyText.replaceAll(' ', '-');

	if (isDayValue === false) tidyText += '-night';

	// find the icon
	switch (tidyText) {
		case 0:
		case 'clear-sky':
			return addPath('Sunny.gif');

		case 'clear-sky-night':
			return addPath('Clear-1992.gif');

		case 1:
		case 'mainly-clear':
			return addPath('Sunny.gif');
		case 'mainly-clear-night':
			return addPath('Mostly-Clear.gif');

		case 2:
		case 'partly-cloudy':
			return addPath('Partly-Cloudy.gif');
		case 'partly-cloudy-night':
			return addPath('Mostly-Clear.gif');

		case 3:
		case 'overcast':
			return addPath('Cloudy.gif');
		case 'overcast-night':
			return addPath('Mostly-Cloudy.gif');

		case 45:
		case 48:
		case 'fog':
		case 'fog-night':
		case 'depositing-rime-fog':
		case 'depositing-rime-fog-night':
			return addPath('Fog.gif');

		case 51:
		case 'light-drizzle':
			return addPath('Scattered-Showers-1994-2.gif');
		case 'light-drizzle-night':
			return addPath('Scattered-Showers-Night.gif');

		case 53:
		case 55:
		case 'moderate-drizzle':
		case 'dense-drizzle':
		case 'moderate-drizzle-night':
		case 'dense-drizzle-night':
			return addPath('Shower.gif');

		case 56:
		case 57:
		case 'light-freezing-drizzle':
		case 'dense-freezing-drizzle':
		case 'light-freezing-drizzle-night':
		case 'dense-freezing-drizzle-night':
			return addPath('Freezing-Rain-1992.gif');

		case 61:
		case 'slight-rain':
		case 'slight-rain-night':
			return addPath('Shower.gif');

		case 63:
		case 65:
		case 'moderate-rain':
		case 'heavy-rain':
		case 'moderate-rain-night':
		case 'heavy-rain-night':
			return addPath('Shower.gif');

		case 66:
		case 67:
		case 'light-freezing-rain':
		case 'heavy-freezing-rain':
		case 'light-freezing-rain-night':
		case 'heavy-freezing-rain-night':
			return addPath('Freezing-Rain-1992.gif');

		case 71:
		case 'slight-snow-fall':
		case 'slight-snow-fall-night':
			return addPath('Light-Snow.gif');

		case 73:
		case 'moderate-snow-fall':
		case 'moderate-snow-fall-night':
			return addPath('Heavy-Snow.gif');

		case 75:
		case 'heavy-snow-fall':
		case 'heavy-snow-fall-night':
			return addPath('Heavy-Snow.gif');

		case 77:
		case 'snow-grains':
		case 'snow-grains-night':
			return addPath('Sleet.gif');

		case 80:
		case 'slight-rain-showers':
		case 'slight-rain-showers-night':
			return addPath('Shower.gif');

		case 81:
		case 82:
		case 'moderate-rain-showers':
		case 'voilent-rain-showers':
		case 'moderate-rain-showers-night':
		case 'voilent-rain-showers-night':
			return addPath('Rain-1992.gif'); // Rain.gif does not exist in /r

		case 85:
		case 86:
		case 'slight-snow-showers':
		case 'heavy-snow-showers':
		case 'slight-snow-showers-night':
		case 'heavy-snow-showers-night':
			return addPath('Scattered-Snow-Showers-1994-2.gif');

		case 95:
		case 'thunderstorm':
		case 'thunderstorm-night':
			return addPath('Thunderstorm.gif');

		case 99:
		case 'thunderstorm-with-slight-hail':
		case 'thunderstorm-with-heavy-hail':
		case 'thunderstorm-with-slight-hail-night':
		case 'thunderstorm-with-heavy-hail-night':
			return addPath('ThunderSnow.gif');

		default:
			console.log(`Unable to locate icon for: ${text}`);
			return addPath('Logo3.gif');
	}
};

/**
 * This function will return the icon for the current weather condition.
 * This is based on the text description (which is provided by the API), the current timezone (used for CurrentWeather view),
 * and the extended forecast (which is used to determine overrules the current time and isNight() function to return daytime images only).
 * @param {*} text string - the text description of the weather condition
 * @param {*} timeZone string - the timezone of the current location
 * @param {*} extendedForecast boolean value to determine if the icon should be daytime only - this is required for the extended forecast view
 * @returns string - the path to the icon
 */
const getWeatherIconFromIconLink = (text, timeZone, extendedForecast = false, isDay = undefined) => {
	if (!text) return 'images/Logo3.gif';

	// Translate Italian to English first
	text = translateItalianToEnglish(text);

	const addPath = (icon) => `images/${icon}`;

	let isDayValue;
	if (typeof isDay === 'boolean') {
		isDayValue = isDay;
	} else if (typeof isDay === 'number') {
		isDayValue = isDay === 1;
	} else if (typeof isDay === 'string') {
		if (isDay === '0' || isDay.toLowerCase() === 'false') {
			isDayValue = false;
		} else if (isDay === '1' || isDay.toLowerCase() === 'true') {
			isDayValue = true;
		}
	}
	const nightTime = typeof isDayValue === 'undefined' ? isNightTime(timeZone) : !isDayValue;
	let tidyText;
	if (typeof text === 'string' && text.length > 3) {
		tidyText = text.toLowerCase().replaceAll(' ', '-');
	} else {
		tidyText = text;
	}

	if (!extendedForecast && typeof tidyText === 'string' && tidyText.length > 3) {
		if (nightTime && (tidyText.includes('clear') || tidyText === 'partly-cloudy')) {
			tidyText += '-night';
		}
	}

	// find the icon
	switch (tidyText) {
		case 0:
		case 'clear-sky':
			return addPath('CC_Clear1.gif');

		case 'clear-sky-night':
			return addPath('CC_Clear0.gif');

		case 1:
		case 'mainly-clear':
			return addPath('CC_Clear1.gif');

		case 'mainly-clear-night':
			return addPath('CC_Clear0.gif');

		case 2:
		case 'partly-cloudy':
			return addPath('CC_PartlyCloudy1.gif');

		case 'partly-cloudy-night':
			return addPath('CC_PartlyCloudy0.gif');

		case 3:
		case 'overcast':
			return addPath('Cloudy.gif');

		case 45:
		case 48:
		case 'fog':
		case 'depositing-rime-fog':
			return addPath('CC_Fog.gif');

		case 51:
		case 'light-drizzle':
			return addPath('CC_Showers.gif');

		case 53:
		case 55:
		case 'moderate-drizzle':
		case 'dense-drizzle':
			return addPath('CC_Rain.gif');

		case 56:
		case 57:
		case 'light-freezing-drizzle':
		case 'dense-freezing-drizzle':
			return addPath('Freezing-Rain.gif');

		case 61:
		case 'slight-rain':
			return addPath('CC_Showers.gif');

		case 63:
		case 65:
		case 'moderate-rain':
		case 'heavy-rain':
			return addPath('CC_Rain.gif');

		case 66:
		case 67:
		case 'light-freezing-rain':
		case 'heavy-freezing-rain':
			return addPath('CC_FreezingRain.gif');

		case 71:
		case 'slight-snow-fall':
			return addPath('CC_SnowShowers.gif');

		case 73:
		case 'moderate-snow-fall':
			return addPath('CC_Snow.gif');

		case 75:
		case 'heavy-snow-fall':
			return addPath('Heavy-Snow.gif');

		case 77:
		case 'snow-grains':
			return addPath('Sleet.gif');

		case 80:
		case 'slight-rain-showers':
			return addPath('CC_Showers.gif');

		case 81:
		case 82:
		case 'moderate-rain-showers':
		case 'voilent-rain-showers':
			return addPath('Rain.gif'); // exists in images/ root

		case 85:
		case 86:
		case 'slight-snow-showers':
		case 'heavy-snow-showers':
			return addPath('CC_Mix.gif');

		case 95:
		case 'thunderstorm':
			return addPath('CC_TStorm.gif');

		case 99:
		case 'thunderstorm-with-slight-hail':
		case 'thunderstorm-with-heavy-hail':
			return addPath('ThunderSnow.gif');

		default:
			console.log(`Unable to locate icon for: ${text}`);
			return addPath('Logo3.gif');
	}
};

// const getHourlyIcon = (skyCover, weather, iceAccumulation, probabilityOfPrecipitation, snowfallAmount, windSpeed, isNight = false) => {
// 	// internal function to add path to returned icon
// 	const addPath = (icon) => `images/r/${icon}`;

// 	// possible phenomenon
// 	let thunder = false;
// 	let snow = false;
// 	let ice = false;
// 	let fog = false;
// 	let wind = false;

// 	// test the phenomenon for various value if it is provided.
// 	weather.forEach((phenomenon) => {
// 		if (!phenomenon.weather) return;
// 		if (phenomenon.weather.toLowerCase().includes('thunder')) thunder = true;
// 		if (phenomenon.weather.toLowerCase().includes('snow')) snow = true;
// 		if (phenomenon.weather.toLowerCase().includes('ice')) ice = true;
// 		if (phenomenon.weather.toLowerCase().includes('fog')) fog = true;
// 		if (phenomenon.weather.toLowerCase().includes('wind')) wind = true;
// 	});

// 	// first item in list is highest priority, units are metric where applicable
// 	if (iceAccumulation > 0 || ice) return addPath('Freezing-Rain-1992.gif');
// 	if (snowfallAmount > 10) {
// 		if (windSpeed > 30 || wind) return addPath('Blowing Snow.gif');
// 		return addPath('Heavy-Snow-1994.gif');
// 	}
// 	if ((snowfallAmount > 0 || snow) && thunder) return addPath('ThunderSnow.gif');
// 	if (snowfallAmount > 0 || snow) return addPath('Light-Snow.gif');
// 	if (thunder) return (addPath('Thunderstorm.gif'));
// 	if (probabilityOfPrecipitation > 70) return addPath('Rain-1992.gif');
// 	if (probabilityOfPrecipitation > 50) return addPath('Shower.gif');
// 	if (probabilityOfPrecipitation > 30) {
// 		if (!isNight) return addPath('Scattered-Showers-1994.gif');
// 		return addPath('Scattered-Showers-Night.gif');
// 	}
// 	if (fog) return addPath('Fog.gif');
// 	if (skyCover > 70) return addPath('Cloudy.gif');
// 	if (skyCover > 50) {
// 		if (!isNight) return addPath('Mostly-Cloudy-1994.gif');
// 		return addPath('Partly-Clear-1994.gif');
// 	}
// 	if (skyCover > 30) {
// 		if (!isNight) return addPath('Partly-Cloudy.gif');
// 		return addPath('Mostly-Clear.gif');
// 	}
// 	if (isNight) return addPath('Clear-1992.gif');
// 	return addPath('Sunny.gif');
// };

export {
	getWeatherIconFromIconLink,
	getWeatherRegionalIconFromIconLink,
	getWaveIconFromCondition,
	// getHourlyIcon,
};
