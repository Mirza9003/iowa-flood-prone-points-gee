# Flood-Prone Point Mapping in Iowa (Google Earth Engine)

![Flood-prone points across Iowa](figures/iowa_floodpoints.png)


This project maps flood-prone locations across Iowa using long-term surface water
occurrence from **JRC Global Surface Water** and topographic context from
**USGS 3DEP (10 m)**. Flood-prone areas are represented as centroid-based points
for rapid spatial screening and visualization.

## Scientific Motivation
Flood hazard assessment often relies on coarse administrative or hydrologic units. This workflow demonstrates a scalable, data-driven alternative that identifies persistent water-prone locations directly from satellite observations, supporting exploratory flood risk analysis and GeoAI-based modeling.

## Data Sources
- **US Census TIGER/2018** — Iowa and county boundaries  
- **USGS 3DEP 10 m DEM** — elevation context  
- **JRC Global Surface Water v1.4** — surface water occurrence (%)

## Method Summary
1. Load Iowa boundary and county features  
2. Select study counties (Polk, Johnson, Linn, Story, Black Hawk)  
3. Threshold surface water occurrence >70%  
4. Convert flood-prone raster cells to centroid point vectors  
5. Visualize DEM, water occurrence, flood points, and boundaries  

## Results
- Total flood-prone points identified: **565**
- Study counties highlighted for focused analysis
## Visualizations

### Statewide Flood-Prone Points (Iowa)
![Flood-prone points across Iowa](figures/map_overview.png)

## Code
- Google Earth Engine script: `gee/iowa_flood_points.js`

## Notes & Limitations
- Water occurrence represents long-term surface water presence, not regulatory floodplain extent.
- Intended for flood risk screening and visualization, not parcel-scale decision making.

## Citation
Mukarram, M. M. T. (2026). *Flood-Prone Point Mapping in Iowa using Google Earth Engine*. GitHub repository.
