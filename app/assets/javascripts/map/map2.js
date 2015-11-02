function initializeTest() {
  google.visualization.drawChart({
    "containerId": "map-canvas2",
    "dataSourceUrl": "//www.google.com/fusiontables/gvizdata?tq=",
    "query":"SELECT 'Scoring Team', 'Receiving Team', 'Scorer', 'Minute of goal' FROM " +
            "1VlPiBCkYt_Vio-JT3UwM-U__APurJvPb6ZEJPg",
    "refreshInterval": 5,
    "chartType": "Table",
    "options": {}
 });
}