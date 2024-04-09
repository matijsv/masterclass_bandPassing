//plot parameters
const minX = 3500; // Adjust as needed
const maxX = 4300; // Adjust as needed

function updatePlot(values) {

  const lowFrequency = parseFloat(values[0]);
  const highFrequency = parseFloat(values[1]);

  filteredData = bandPass(lowFrequency,highFrequency,DATA)

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Function to map data to canvas coordinates
  function mapDataToCanvas(x, y) {
    const canvasX = (x - minX) * (canvas.width / (maxX - minX));
    // Map the y-coordinate to canvas height, considering negative values
    const canvasY = canvas.height / 2 - (y * (canvas.height / (2 * Math.max(...DATA))));
    return { x: canvasX, y: canvasY };
  }

  // Plot filtered data
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  for (let i = 0; i < filteredData.length; i++) {
    const { x, y } = mapDataToCanvas(i, filteredData[i]);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

// Get canvas element
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 700;

// Double-ended slider
const slider = document.getElementById('slider');
noUiSlider.create(slider, {
  start: [30, 250], // Initial values
  connect: true,
  range: {
    'min': 1,
    'max': 1024
  },
  pips: {
    mode: 'steps',
    stepped: true,
    density: 4
},
tooltips: true
});

// Event Listener
slider.noUiSlider.on('slide', updatePlot);

// Initial Plotting
updatePlot([30,250]);

