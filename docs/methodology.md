# Methodology

## Objective
Identify flood-prone locations in Iowa using long-term surface water occurrence and represent them as centroid points for rapid screening and visualization.

## Data
- US Census TIGER/2018 — state and county boundaries
- USGS 3DEP 10 m DEM — elevation context
- JRC Global Surface Water v1.4 — water occurrence (%)

## Approach
1. Load Iowa boundary and county features.
2. Select study counties.
3. Threshold surface water occurrence >70%.
4. Convert raster to centroid-based vector points.
5. Visualize DEM, water occurrence, flood-prone points, and boundaries.

## Key Limitations
- Represents long-term water presence, not extreme-event flood extents.
- Intended for regional screening, not parcel-scale flood delineation.
