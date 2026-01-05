# Flood-Prone Point Mapping in Iowa (Google Earth Engine)

<p align="center">
  <img src="GEE_logo.png" width="110" alt="Google Earth Engine logo"/>
</p>

---

**Figure 1.** Spatial distribution of flood-prone points across Iowa derived from long-term surface water occurrence (JRC Global Surface Water v1.4) and topographic context from the USGS 3DEP (10 m) digital elevation model.

![Flood-prone points across Iowa](IA_FP.png)

---

## Scientific Motivation

Flood hazard assessment is commonly conducted using coarse administrative units or predefined hydrologic boundaries, which can obscure fine-scale spatial variability in flood susceptibility. This workflow demonstrates a scalable, observation-driven alternative that identifies persistent water-prone locations directly from satellite-derived surface water dynamics, supporting exploratory flood risk assessment and GeoAI-based modeling.

## Data Sources

- **US Census TIGER/2018** — Iowa and county administrative boundaries  
- **USGS 3DEP (10 m DEM)** — topographic and elevation context  
- **JRC Global Surface Water v1.4** — long-term surface water occurrence (%)

## Method Summary

1. Load Iowa state and county boundary features  
2. Select representative study counties (Polk, Johnson, Linn, Story, Black Hawk)  
3. Apply a surface water occurrence threshold (>70%) to identify persistent water bodies  
4. Convert flood-prone raster cells into centroid-based point vectors  
5. Visualize elevation, water occurrence, flood-prone points, and administrative boundaries

## Results

- Total flood-prone points identified: **565**
- Study counties highlighted for focused spatial analysis and validation

## Visualizations

### Statewide Flood-Prone Points (Iowa)

![Statewide flood-prone points](figures/map_overview.png)

## Code

- Google Earth Engine implementation:  
  `gee/iowa_flood_points.js`

## Notes & Limitations

- Surface water occurrence represents long-term hydrologic persistence and does **not** correspond to regulatory floodplain delineations (e.g., FEMA FIRMs).
- Outputs are intended for regional-scale flood risk screening and exploratory analysis, not parcel-level decision-making.

## Citation

Mukarram, M. M. T. (2026). *Flood-Prone Point Mapping in Iowa using Google Earth Engine*. GitHub repository.
