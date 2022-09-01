const colorPaletteOptions = [
	{
		name: "theme--gray",
		r:    70,
		g:    90,
		b:    105,
	},
	{
		name: "theme--blue",
		r:    0,
		g:    91,
		b:    148,
	},
	{
		name: "theme--green",
		r:    0,
		g:    90,
		b:    66,
	},
	{
		name: "theme--yellow",
		r:    255,
		g:    205,
		b:    68,
	},
	{
		name: "theme--orange",
		r:    160,
		g:    53,
		b:    22,
	},
	{
		name: "theme--red",
		r:    121,
		g:    10,
		b:    29,
	},
	{
		name: "theme--purple",
		r:    72,
		g:    25,
		b:    78,
	},
	{
		name: "theme--teal",
		r:    21,
		g:    82,
		b:    87,
	},
	{
		name: "theme--navy",
		r:    0,
		g:    81,
		b:    120,
	},
	{
		name: "theme--indigo",
		r:    52,
		g:    32,
		b:    113,
	}
];

function RGBToHSL (r, g, b) {
	// Make r, g, and b fractions of 1
	r /= 255;
	g /= 255;
	b /= 255;

	// Find greatest and smallest channel values
	let cmin  = Math.min (r, g, b);
	let cmax  = Math.max (r, g, b);
	let delta = cmax - cmin;
	let h     = 0;
	let s     = 0;
	let l     = 0;


	if (delta == 0) h = 0;
	else if (cmax == r) h = ((g - b) / delta) % 6;
	else if (cmax == g) h = (b - r) / delta + 2;
	else h = (r - g) / delta + 4;

	h = Math.round (h * 60);

	if (h < 0) h += 360;

	l = (cmax + cmin) / 2;

	s = delta == 0 ? 0 : delta / (1 - Math.abs (2 * l - 1));

	s = +(s * 100).toFixed (1);
	l = +(l * 100).toFixed (1);

	return [h, s, l];
}

//

//

function getAverageRGB (imgEl) {
	imgEl.crossOrigin = 'Anonymous'
	//console.log (imgEl)
	//
	const canvas        = document.createElement ("canvas");
	const context       = canvas.getContext && canvas.getContext ("2d");
	const blockSize     = 5;
	const defaultRGB    = {r: 0, g: 0, b: 0};
	let data            = null;
	let width           = 0;
	let height          = 0;
	let i               = -4;
	let length;
	let rgb             = {r: 0, g: 0, b: 0};
	let count           = 0;
	let minDiff         = 1000000;
	let currentOption   = -1;
	let colorDifference = 0;

	if (!context) {
		return defaultRGB;
	}

	height = canvas.height =
		imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
	width  = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
	context.drawImage (imgEl, 0, 0);
	try {
		data = context.getImageData (0, 0, width, height);
	} catch (e) {
		return defaultRGB;
	}

	length = data.data.length;

	while ((i += blockSize * 4) < length) {
		++count;
		rgb.r += data.data[i];
		rgb.g += data.data[i + 1];
		rgb.b += data.data[i + 2];
	}

	rgb.r = ~~(rgb.r / count);
	rgb.g = ~~(rgb.g / count);
	rgb.b = ~~(rgb.b / count);

	const hslColor = RGBToHSL (rgb.r, rgb.g, rgb.b);
	const black    = (rgb.r < 55 && rgb.g < 55 && rgb.b < 55);
	const white    = (rgb.r > 200 && rgb.g > 200 && rgb.b > 200);

	colorPaletteOptions.forEach ((color, index) => {
		const palletHSL = RGBToHSL (color.r, color.g, color.b);

		colorDifference = Math.abs (hslColor[0] - palletHSL[0]);
		if (colorDifference < minDiff) {
			minDiff       = colorDifference;
			currentOption = index;
		}
	});
	if (black || white) {
		return colorPaletteOptions[0];
	}
	return colorPaletteOptions[currentOption];
	// }

}
