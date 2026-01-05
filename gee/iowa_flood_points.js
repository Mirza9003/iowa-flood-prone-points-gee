/*
Title: Flood-Prone Point Mapping in Iowa (Google Earth Engine)
Author: Mirza Md Tasnim Mukarram
Affiliation: University of Iowa
Platform: Google Earth Engine (JavaScript API)

Description:
This script identifies flood-prone locations across Iowa using long-term
surface water occurrence (>70%) from JRC Global Surface Water and visualizes
them as centroid-based point features. The workflow is designed for
regional-scale flood risk screening and exploratory analysis.

Data Sources:
- US Census TIGER/2018 (state and county boundaries)
- USGS 3DEP 10 m DEM
- JRC Global Surface Water v1.4
*/
// =============================================================
// Flood-Prone Point Map for Iowa with Highlighted Study Counties
// =============================================================

// 1️⃣ Load Iowa boundary and counties
var states = ee.FeatureCollection("TIGER/2018/States");
var iowa = states.filter(ee.Filter.eq('NAME', 'Iowa'));

var counties = ee.FeatureCollection("TIGER/2018/Counties")
  .filter(ee.Filter.eq('STATEFP', '19')); // Iowa FIPS code

Map.centerObject(iowa, 7);

// 2️⃣ Select study counties (editable)
var studyNames = ['Polk', 'Johnson', 'Linn', 'Story', 'Black Hawk'];
var studyCounties = counties.filter(ee.Filter.inList('NAME', studyNames));

// =============================================================
// 🌎 DEM BASE LAYER (USGS 3DEP 10 m)
// =============================================================

var dem = ee.Image("USGS/3DEP/10m").clip(iowa);
var demVis = {
  min: 200,
  max: 600,
  palette: [
    '#006400',  // dark green (low)
    '#32CD32',  // light green
    '#FFFF00',  // yellow
    '#FFA500',  // orange
    '#A0522D',  // brown
    '#FFFFFF'   // white (high)
  ]
};
Map.addLayer(dem, demVis, '10 m DEM – Iowa');

// =============================================================
// 💧 Flood-Prone Areas from JRC Global Surface Water
// =============================================================

var water = ee.Image("JRC/GSW1_4/GlobalSurfaceWater");
var occurrence = water.select('occurrence');

// Flood-prone mask (>70% water occurrence)
var floodMask = occurrence.gt(70);

// Convert to centroid points
var floodPoints = floodMask.selfMask().reduceToVectors({
  geometry: iowa.geometry(),
  scale: 1000,
  geometryType: 'centroid',
  eightConnected: false
});

// =============================================================
// 🗺️ Add Thematic Layers (Order matters)
// =============================================================

// 1. Water occurrence overlay
Map.addLayer(
  occurrence.clip(iowa),
  {min: 0, max: 100, opacity: 0.5, palette: ['yellow', 'orange', 'red']},
  'Water Occurrence (%)'
);

// 2. Flood-prone points
Map.addLayer(
  floodPoints.style({color: 'blue', pointSize: 3}),
  {},
  'Flood-Prone Points'
);

// 3. All counties (thin outline)
Map.addLayer(
  counties.style({
    color: '000000',
    width: 1,
    fillColor: '00000000'
  }),
  {},
  'All Iowa Counties'
);

// 4. Study counties (bold red outline)
Map.addLayer(
  studyCounties.style({
    color: 'red',
    width: 3,
    fillColor: '00000000'
  }),
  {},
  'Study Counties (Red)'
);

// 5. Iowa boundary
Map.addLayer(
  iowa.style({
    color: 'black',
    width: 3,
    fillColor: '00000000'
  }),
  {},
  'Iowa Boundary'
);

print('Total flood points:', floodPoints.size());

// =============================================================
// 🧭 UI PANELS: Title, Legend, Scale Bar, North Arrow
// =============================================================

// Title
var title = ui.Label('Flood-Prone Areas in Iowa (Blue Dots)', {
  fontWeight: 'bold',
  fontSize: '20px',
  margin: '0 0 4px 0',
  color: 'black',
  textAlign: 'center',
  stretch: 'horizontal'
});

var subtitle = ui.Label(
  'Highlighted Counties: Polk, Johnson, Linn, Story, Black Hawk',
  {
    fontSize: '13px',
    color: 'black',
    margin: '0px',
    textAlign: 'center',
    stretch: 'horizontal'
  }
);

var titlePanel = ui.Panel({
  widgets: [title, subtitle],
  style: {
    position: 'top-center',
    backgroundColor: 'white',
    border: '2px solid black',
    padding: '8px'
  }
});
Map.add(titlePanel);

// Legend
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    backgroundColor: 'white',
    border: '2px solid black'
  }
});

legend.add(ui.Label({
  value: 'Legend',
  style: {fontWeight: 'bold', fontSize: '14px', margin: '0 0 6px 0'}
}));

// DEM explanation
legend.add(ui.Panel([
  ui.Label('', {
    backgroundColor: '#006400',
    padding: '8px',
    margin: '2px',
    border: '1px solid #999'
  }),
  ui.Label('Low Elevation', {margin: '2px 0 2px 6px', fontSize: '13px'})
], ui.Panel.Layout.Flow('horizontal')));

legend.add(ui.Panel([
  ui.Label('', {
    backgroundColor: '#FFFFFF',
    padding: '8px',
    margin: '2px',
    border: '1px solid #999'
  }),
  ui.Label('High Elevation', {margin: '2px 0 2px 6px', fontSize: '13px'})
], ui.Panel.Layout.Flow('horizontal')));

// Symbols
legend.add(ui.Panel([
  ui.Label('', {
    backgroundColor: 'blue',
    padding: '8px',
    margin: '2px',
    border: '1px solid #999'
  }),
  ui.Label('Flood-Prone Points', {margin: '2px 0 2px 6px', fontSize: '13px'})
], ui.Panel.Layout.Flow('horizontal')));

legend.add(ui.Panel([
  ui.Label('', {
    backgroundColor: 'red',
    padding: '8px',
    margin: '2px',
    border: '1px solid #999'
  }),
  ui.Label('Study Counties', {margin: '2px 0 2px 6px', fontSize: '13px'})
], ui.Panel.Layout.Flow('horizontal')));

Map.add(legend);

// Scale Bar (approximate)
var scaleLabel = ui.Label('Scale: ~40 km', {
  fontSize: '12px',
  color: 'black',
  padding: '4px'
});

var scalePanel = ui.Panel({
  widgets: [scaleLabel],
  style: {
    position: 'bottom-right',
    backgroundColor: 'white',
    border: '2px solid black',
    padding: '6px'
  }
});
Map.add(scalePanel);

// North Arrow
var northArrow = ui.Label('↑\nN', {
  fontWeight: 'bold',
  fontSize: '16px',
  textAlign: 'center',
  margin: '0px',
  padding: '4px',
  color: 'black'
});

var northPanel = ui.Panel({
  widgets: [northArrow],
  style: {
    position: 'top-right',
    backgroundColor: 'white',
    border: '2px solid black',
    padding: '6px'
  }
});
Map.add(northPanel);
