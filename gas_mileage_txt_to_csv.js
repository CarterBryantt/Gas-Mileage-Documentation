// let input = document.getElementById('file-input');

// input.onchange = (e) => {
// 	let fileReader = new FileReader();
// 	fileReader.onload = (f) => {
// 		let text = f.target.result;

// 		let regex = /([a-zA-Z]+):?\s?([0-9]+:[0-9]+)(\n\s{4}-\s(.+))?(\n\s{4}-\s(.+))?/g;
// 		let matches = text.matchAll(regex); // Returns iterable
// 		matches = Array.from(matches); // Convert iterable to array
// 		let csv = "data:text/csv;charset=utf-8,";
// 		let odometerValue = "";
// 		let gasLevel = "";
// 		matches.forEach(match => {
// 			match.shift();
// 			match.splice(2, 1);
// 			match.splice(3, 1);
// 			match = match.filter(item => item != undefined);
// 			let time = `${match[0]} Time,${match[1]}`;
// 			if (match.length > 2) {
// 				if (match.length == 3) {
// 					if (isNaN(Number(match[2]))) {
// 						match[2] = match[2].replaceAll("Full", "1/1");
// 						gasLevel = "Gas Level,=" + (match[2].slice(0, 10) == "Refuel -> " ? match[2].slice(10) + ",Refuel" : match[2]);
// 					} else {
// 						odometerValue = `Odometer Value,${match[2]}`;
// 					}
// 				} else {
// 					odometerValue = `Odometer Value,${match[2]}`;
// 					match[3] = match[3].replace("Full", "1/1");
// 					gasLevel = "Gas Level,=" + (match[3].slice(0, 10) == "Refuel -> " ? match[3].slice(10) + ",Refuel" : match[3]);
// 				}
// 			}
			
// 			csv += time + "\n" + odometerValue + "\n" + gasLevel + "\n";
// 		});
		
// 		let content = encodeURI(csv);
// 		let link = document.createElement('a');
// 		link.setAttribute('href', content);
// 		link.setAttribute('download', 'gas_mileage.csv');
// 		document.body.appendChild(link);
// 		link.click();
// 	};
// 	fileReader.readAsText(e.target.files[0]);
// }

function createSVG(x, y) {
	let svg = `
	<rect width="100%" height="100%" fill="#224"/>

	<circle cx="250" cy="250" r="200" fill="#151e1f"/> 

	<line x1="68.1" y1="214.6" x2="101.3" y2="228.6" stroke="#e15454" stroke-width="9"/>
	<line x1="65" y1="222" x2="98.2" y2="236" stroke="#ffffff" stroke-width="8"/>
	<line x1="138" y1="136" x2="158.3" y2="165.7" stroke="#ffffff" stroke-width="8"/>
	<line x1="250" y1="100" x2="250" y2="136" stroke="#ffffff" stroke-width="8"/>
	<line x1="362" y1="136" x2="341.7" y2="165.7" stroke="#ffffff" stroke-width="8"/>
	<line x1="435" y1="222" x2="401.8" y2="236" stroke="#ffffff" stroke-width="8"/>

	<path d="M 65 226 A 200 200 0 0 1 435 226" stroke="#ffffff" stroke-width="8" fill-opacity="0"/>

	<line x1="250" y1="300" x2="${x}" y2="${y}" stroke="orange" stroke-width="5"/> <!-- Dial -->

	<circle cx="250" cy="300" r="20" fill="#ffffff"/> <!-- Dial Origin -->
	`;

	let dial = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	dial.setAttribute("width", "500px");
	dial.setAttribute("height", "500px");
	dial.innerHTML = svg;
	document.body.appendChild(dial);
}

for (let i = 0; i <= 1; i += 0.0625) {
	let scaledValue = ((i * (21.8 - 158.2)) + 158.2) * (Math.PI / 180);
	let x = 190 * Math.cos(scaledValue);
	let y = 190 * Math.sin(scaledValue);
	console.log(i, scaledValue, x, y)
	createSVG(x+250, 300-y);
}
