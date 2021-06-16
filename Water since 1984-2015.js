var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');
Map.addLayer(occurrence);
Map.addLayer({eeObject: occurrence, name: 'Water Occurrence (1984-2015)'});
var VIS_OCCURRENCE = {
  min:0,
  max:100,
  palette: ['red', 'blue']
};
Map.addLayer({
  eeObject: occurrence.updateMask(occurrence.divide(100)),
  name: "Water Occurrence (1984-2015)",
  visParams: VIS_OCCURRENCE
});

var VIS_WATER_MASK = {
  palette: ['white', 'black']
};

// Create a water mask layer, and set the image mask so that non-water areas
// are opaque.
var water_mask = occurrence.gt(90).unmask(0);

Map.addLayer({
  eeObject: water_mask,
  visParams: VIS_WATER_MASK,
  name: '90% occurrence water mask'
});

var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');

//////////////////////////////////////////////////////////////
// Constants
//////////////////////////////////////////////////////////////

var VIS_OCCURRENCE = {
  min:0,
  max:100,
  palette: ['red', 'blue']
};
var VIS_WATER_MASK = {
  palette: ['white', 'black']
};

//////////////////////////////////////////////////////////////
// Calculations
//////////////////////////////////////////////////////////////

// Create a water mask layer, and set the image mask so that non-water areas
// are opaque.
var water_mask = occurrence.gt(90).unmask(0);

//////////////////////////////////////////////////////////////
// Initialize Map Location
//////////////////////////////////////////////////////////////
Map.setCenter(71.46129593728052,32.58734551601319, 11);  // Indus River, Pakistan
//////////////////////////////////////////////////////////////
// Map Layers
//////////////////////////////////////////////////////////////

Map.addLayer({
  eeObject: water_mask,
  visParams: VIS_WATER_MASK,
  name: '90% occurrence water mask',
  shown: false
});
Map.addLayer({
  eeObject: occurrence.updateMask(occurrence.divide(100)),
  name: "Water Occurrence (1984-2015)",
  visParams: VIS_OCCURRENCE
});

var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');
Map.addLayer(occurrence);

Map.addLayer({eeObject: occurrence, name: 'Water Occurrence (1984-2015)'});

Map.addLayer({
  eeObject: water_mask,
  visParams: VIS_WATER_MASK,
  name: '90% occurrence water mask'
});
