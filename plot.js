function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })

  buildMetadata(940);
  buildCharts(940);
}
  
init();

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text("ID: " + result.id);
      PANEL.append("h6").text("ETHNICITY: " + result.ethnicity);
      PANEL.append("h6").text("GENDER: " + result.gender);
      PANEL.append("h6").text("AGE: " + result.age);
      PANEL.append("h6").text("LOCATION: " + result.location);
      PANEL.append("h6").text("BBTYPE: " + result.bbtype);
      PANEL.append("h6").text("WFREQ: " + result.wfreq);
    });
}

function buildCharts(sample) {
    //getting data for bar chart and bar chart creation 
    d3.json("samples.json").then((data) => {
        // variable for array of samples
        var sampleSet = data.samples;
        
        // variable for matching array to the correct ID
        var sampleArray = sampleSet.filter(sampleObject => sampleObject.id == sample);
        console.log(sampleArray);
        
        //setting sampleValues for # of values for each 
        var sampleResult = sampleArray[0];
        console.log(sampleResult);
        
        //slice - need to fix slice functioanlity
        var sampleValuesAll = sampleResult.sample_values;  
        var sampleValues = sampleValuesAll.slice(0,10).reverse();
        console.log(sampleValues);
        
        //respective Id for each
        var otu_ids_array = sampleResult.otu_ids;

        //slice - need to fix slice functioanlity...
        var otu_ids_partial = otu_ids_array.slice(0,10).reverse();

        //make the y axis labels OTU + ID
        var otu_ids = otu_ids_partial.map(id => "OTU " + id);    
        console.log(otu_ids);

        //create variable for otu labels
        var otu_labels_array = sampleResult.otu_labels;
        //slice for bar chart
        var otu_labels = otu_labels_array.slice(0,10).reverse();

        // create variable for data  for bar chart
        var traceBar = {
            x: sampleValues,
            y: otu_ids,
            type: "bar",
            orientation: 'h',
            text: otu_labels
        };

        //create variable for layout call layout
        var layoutBar = {
        };

        // create variable for x/y for bubble chart
        var traceBubble = {
            x: otu_ids_array,
            y: sampleValuesAll,
            mode: 'markers',
            marker:{
                size:sampleValuesAll,
                sizeref: 1.6,
                color:otu_ids_array,
                colorscale: "Jet"
            },
            text: otu_labels_array
            
        };

        // create layout variable for bubble chart
        var layoutBubble = {
            xaxis: {
                title:{
                    text: "OTU ID"
                }
            }
        };

        //plotting bar chart in "bar in html"
        Plotly.newPlot("bar",[traceBar],layoutBar);
        
        //plotting bubble chart in "bubble" area in html
        Plotly.newPlot("bubble",[traceBubble],layoutBubble);
        
    });
    


}



