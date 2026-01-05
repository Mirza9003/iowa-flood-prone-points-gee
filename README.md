# Flood-Prone Point Mapping in Iowa (Google Earth Engine)

<p align="center">
  <img src="https://earthengine.google.com/static/images/earth-engine-logo.png" width="120"/>
</p>

![Figure 1. Spatial distribution of flood-prone points across Iowa derived from long-term surface water occurrence (JRC Global Surface Water v1.4) and topographic context from the USGS 3DEP (10 m) digital elevation model.](IA_FP.png)

---

## Scientific Motivation
Flood hazard assessment is commonly conducted using coarse administrative units or predefined hydrologic boundaries, which may obscure localized and persistent flood-prone conditions. This project presents a scalable, observation-driven workflow that leverages long-term satellite-derived surface water occurrence and topographic context to identify spatially explicit flood-prone locations. The resulting point-based representation is intended to support exploratory flood risk screening, spatial diagnostics, and downstream GeoAI-based modeling frameworks.

---

## Data Sources
- **US Census TIGER/2018** — State and county administrative boundaries  
- **USGS 3DEP (10 m DEM)** — Topographic and elevation context  
- **JRC Global Surface Water v1.4** — Long-term surface water occurrence (%)

---

## Method Summary
1. Load Iowa state and county boundary features  
2. Select study counties (Polk, Johnson, Linn, Story, Black Hawk)  
3. Apply a surface water occurrence threshold (>70%) to identify persistent water-prone areas  
4. Convert qualifying raster cells to centroid-based point features  
5. Visualize elevation, water occurrence, flood-prone points, and administrative boundaries  

---

## Results
- Total flood-prone points identified: **565**  
- Spatial clustering observed within selected study counties, enabling focused regional analysis  

---

## Visualizations

### Statewide Flood-Prone Points (Iowa)
![Figure 2. Statewide distribution of flood-prone points across Iowa generated using Google Earth Engine.](figures/map_overview.png)

---

## Code
- Google Earth Engine implementation: `gee/iowa_flood_points.js`

---

## Notes & Limitations
- Surface water occurrence reflects long-term historical presence and does not correspond to regulatory floodplain boundaries (e.g., FEMA FIRMs).  
- Outputs are intended for flood risk screening, exploratory analysis, and modeling support, not parcel-scale or regulatory decision-making.

---

## Citation
Mukarram, M. M. T. (2026). *Flood-Prone Point Mapping in Iowa using Google Earth Engine*. GitHub repository.
