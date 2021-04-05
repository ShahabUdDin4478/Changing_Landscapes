var aoi = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[71.86730221140961, 34.217204534946724],
          [71.86730221140961, 33.620059661931364],
          [72.97417477000336, 33.620059661931364],
          [72.97417477000336, 34.217204534946724]]], null, false);

var col = ee.ImageCollection('JRC/GSW1_1/YearlyHistory').map(function(img) {
 var year = img.date().get('year');
 var yearImg = img.gte(2).multiply(year);
 var despeckle = yearImg.connectedPixelCount(15, true).eq(15);
 return yearImg.updateMask(despeckle).selfMask().set('year', year);
});
function appendReverse(col) {
 return col.merge(col.sort('year', false));
}
var bgColor = 'FFFFFF'; // Assign white to background pixels.
var riverColor = '0D0887'; // Assign blue to river pixels.
var annualCol = col.map(function(img) {
 return img.unmask(0)
 .visualize({min: 0, max: 1, palette: [bgColor, riverColor]})
 .set('year', img.get('year'));
});
var basicAnimation = appendReverse(annualCol);


var videoArgs = {
 dimensions:
 600, // Max dimension (pixels), min dimension is proportionally scaled.
 region: aoi,
 framesPerSecond: 10
};
print(ui.Thumbnail(basicAnimation, videoArgs));
var bgImg = ee.Image(1).visualize({palette: bgColor});
var fadeFilter = ee.Image(1).visualize({palette: bgColor, opacity: 0.1});
var fadeFilterCol = col.map(function(img) {
 var imgVis = img.visualize({palette: riverColor});
 return imgVis.blend(fadeFilter).set('year', img.get('year'));
});
var yearSeq = ee.List.sequence(1984, 2018);
var fadeCol = ee.ImageCollection.fromImages(yearSeq.map(function(year) {
 var fadeComp =
 fadeFilterCol.filter(ee.Filter.lte('year', year)).sort('year').mosaic();
 var thisYearImg = col.filter(ee.Filter.eq('year', year)).first().visualize({
 palette: riverColor
 });
 return bgImg.blend(fadeComp).blend(thisYearImg).set('year', year);
}));
print(ui.Thumbnail(appendReverse(fadeCol), videoArgs));

var cumulativeVis = {
 min: 1984,
 max: 2018,
 palette: ['0D0887', '5B02A3', '9A179B', 'CB4678', 'ED1E79']
};
var cumulativeFilterCol = col.map(function(img) {
 return img.visualize(cumulativeVis).set('year', img.get('year'));
});
var cumulativeCol = ee.ImageCollection.fromImages(yearSeq.map(function(year) {
 var cumulativeComp = cumulativeFilterCol.filter(ee.Filter.lte('year', year))
 .sort('year')
 .mosaic();
 return bgImg.blend(cumulativeComp).set('year', year);
}));
print(ui.Thumbnail(appendReverse(cumulativeCol), videoArgs));
