var json;
var viz;
var updateCenter = {};
updateCenter.post = function(jsonresponse) {
   json = jsonresponse;

	    $('#jenkinsdep').css({width: $(window).innerWidth() , height: $(window).innerHeight()});	
		var chartdata = getJsonForChart(window.filter); // set filter default 
		var chartjson = chartdata.json;
		var noofdeps = chartdata.noofdeps;
		
		$('#loadinfo').html(chartjson.length + ' plugins with ' + noofdeps + ' dependencies');
		
		viz = new $jit.ForceDirected({
		
		    injectInto: 'jenkinsdep',
		
		
		    Navigation: {
		      enable: true,
		
		      panning: 'avoid nodes',
		      zooming: 10 
		    },
		    
		    Node: {
		      overridable: true
		    },
		    Margin: {  
		    	top: 20,  
		    	left: 20,  
		    	right: 20,  
		    	bottom: 20  
		    },
		    Edge: {
		      overridable: true,
		      color: '#23A4FF',
		      lineWidth: 0.4,
		      type: 'arrow'
		    },
		    
		    Label: {
		      type: 'Native',
		      size: 10,
		      style: 'bold'
		    },
		    //Add Tips
		    Tips: {
		      enable: true,
		      onShow: function(tip, node) {
		        
		        var count = 0;
		        node.eachAdjacency(function() { count++; });
		        
		        var html = "<div class=\"tip-title\">" + node.name + "</div>";

		        var pluginJSON = json.plugins[node.id];
		        if(pluginJSON) {
		        	html += "<div class=\"tip-text\" style='margin-bottom: 5px;'><b>Excerpt:</b> " + pluginJSON.excerpt + "</div>";
		        	html += "<div class=\"tip-text\"><b>Version:</b> " + pluginJSON.version + "</div>";
		        	html += "<div class=\"tip-text\"><b>Build Date:</b> " + pluginJSON.buildDate + "</div>";
		        	html += "<div class=\"tip-text\"><b>Required Core:</b> " + pluginJSON.requiredCore + "</div>";
		        	
		        	html += "<div class=\"tip-text\" style='margin-top: 5px;'><b>Developers:</b> ";
		        	for(var i = 0; i < pluginJSON.developers.length; i++) {
		        		html += pluginJSON.developers[i].name + " (" + pluginJSON.developers[i].developerId + ")";
		        		if(i < pluginJSON.developers.length -1) {
		        			html += ", ";
		        		}
		        	}
		        	html += "</div>";
		        	
		        	if(pluginJSON.dependencies.length > 0) {
		        		html += "<div class=\"tip-text\" style='margin-top: 5px;'><b>Dependencies:</b><ul>";
			        	for(var i = 0; i < pluginJSON.dependencies.length; i++) {
			        		html += "<li>";
			        		var dependencyJSON = json.plugins[pluginJSON.dependencies[i].name];
			        		if(dependencyJSON) {
			        			html += dependencyJSON.title;
			        		} else {
			        			html += pluginJSON.dependencies[i].name;
			        		}
			        		html += " (version: " + pluginJSON.dependencies[i].version + " / optional: " + pluginJSON.dependencies[i].optional + ")"
			        		html += "</li>";
			        	}
			        	html += "</ul></div>";
		        	}
		        	var i = 0;
		        }
		        tip.innerHTML = html;
		      }
		    },
		    // Add node events
		    Events: {
		      enable: true,
		      type: 'Native',
		      //Change cursor style when hovering a node
		      onMouseEnter: function() {
		        viz.canvas.getElement().style.cursor = 'move';
		      },
		      onMouseLeave: function() {
		        viz.canvas.getElement().style.cursor = '';
		      },
		      //Update node positions when dragged
		      onDragMove: function(node, eventInfo, e) {
		          var pos = eventInfo.getPos();
		          node.pos.setc(pos.x, pos.y);
		          viz.plot();
		      },
		      //Implement the same handler for touchscreens
		      onTouchMove: function(node, eventInfo, e) {
		        $jit.util.event.stop(e); //stop default touchmove event
		        this.onDragMove(node, eventInfo, e);
		      },
		      //Add also a click handler to nodes
		      onClick: function(node) {
		        if(!node) return;
		        if(node.id == 'Jenkins Core') {
		            filterGraph();
		        } else {
		        	buildGraphForNode(node.id);    
		        }
		      }
		    },
		    //Number of iterations for the FD algorithm
		    iterations: 20,
		    levelDistance: 150,
		    onPlaceLabel: function(domElement, node){
		    }
		  });
		  
		  viz.loadJSON(chartjson);
		  var percdone = $('#percdone');
		  
		  viz.computeIncremental({
		    iter: 1,
		    property: 'end',
		    onStep: function(perc){
		    	percdone.html(perc + ' %');
		    },
		    onComplete: function(){
		    	percdone.html('done');
		    	setTimeout(function(){
		    		$('#percdonecontainer').fadeOut();
		    	}, 1000);
		      viz.animate();
		    }
		  });
}

function getJsonForChart(filter) {
	var chartjson = new Array();
	var noofdeps = 0;
	
	var filterRegexp;
	if(filter && $.trim(filter) != '') {
		filterRegexp = new RegExp($.trim(filter), 'i');
	} 
	
	for(var plugin in json.plugins) {
		var pluginJSON = json.plugins[plugin];
		if(!filterRegexp || pluginJSON.name.match(filterRegexp) || pluginJSON.title.match(filterRegexp) || containsDeveloper(pluginJSON, filterRegexp)) {
			var pluginNode = {
				'id' : pluginJSON.name,
				'name' : pluginJSON.title,
				'data': {
					'$color': '#83548B',
			        '$type': 'circle',
			        '$dim': 10
				},
			    'adjacencies' : new Array()
			};
			
			pluginNode.adjacencies.push({
			    'nodeTo': 'Jenkins Core',
                'nodeFrom': pluginJSON.name,
                'data': {
                    '$color': '#AAAAAA',
                    "$direction": [pluginJSON.name, 'Jenkins Core']
                }
			});
			
			for(var i = 0; i < pluginJSON.dependencies.length; i++) {
				noofdeps++;
				pluginNode.adjacencies.push({
					'nodeTo': pluginJSON.dependencies[i].name,
					'nodeFrom': pluginJSON.name,
					'data': {
						'$color': '#AAAAAA',
						"$direction": [pluginJSON.name, pluginJSON.dependencies[i].name]
		            }
				});
			}
			chartjson.push(pluginNode);
		}

	}
	return {json: chartjson, noofdeps: noofdeps};
}

function containsDeveloper(pluginJSON, filterRegexp) {
    if(pluginJSON.developers && pluginJSON.developers.length > 0)  {
        for(var i = 0; i < pluginJSON.developers.length; i++) {
            var developer = pluginJSON.developers[i];
            if((developer.developerId && developer.developerId.match(filterRegexp)) || (developer.name && developer.name.match(filterRegexp))) {
                return true;
            }
        }
    }
    return false;
}

function filterGraph(filter) {
	var chartdata = getJsonForChart(filter);
	var chartjson = chartdata.json;
	var noofdeps = chartdata.noofdeps;
	
	$('#loadinfo').html(chartjson.length + ' plugins with ' + noofdeps + ' dependencies');
	$('#percdonecontainer').fadeIn();
	var percdone = $('#percdone');
	
	
	viz.loadJSON(chartjson);
	viz.computeIncremental({
	    iter: 1,
	    property: 'end',
	    onStep: function(perc){
	    	percdone.html(perc + ' %');

	    },
	    onComplete: function(){
	    	percdone.html('done');
	    	setTimeout(function(){
	    		$('#percdonecontainer').fadeOut();
	    	}, 1000);
	    	viz.animate();
	    }
	});
}

function getJSONForNode(nodeid) {
    var chartjson = new Array();
    var noofdeps = 0;
    
    for(var plugin in json.plugins) {
        var pluginJSON = json.plugins[plugin];
        if(pluginJSON.name == nodeid) {
            var pluginNode = {
                'id' : pluginJSON.name,
                'name' : pluginJSON.title,
                'data': {
                    '$color': '#83548B',
                    '$type': 'circle',
                    '$dim': 10
                },
                'adjacencies' : new Array()
            };
            
            pluginNode.adjacencies.push({
                'nodeTo': 'Jenkins Core',
                'nodeFrom': pluginJSON.name,
                'data': {
                    '$color': '#AAAAAA',
                    "$direction": [pluginJSON.name, 'Jenkins Core']
                }
            });
            
            for(var i = 0; i < pluginJSON.dependencies.length; i++) {
                noofdeps++;
                pluginNode.adjacencies.push({
                    'nodeTo': pluginJSON.dependencies[i].name,
                    'nodeFrom': pluginJSON.name,
                    'data': {
                        '$color': '#AAAAAA',
                        "$direction": [pluginJSON.name, pluginJSON.dependencies[i].name]
                    }
                });
            }
            chartjson.push(pluginNode);
        } else {
            for(var i = 0; i < pluginJSON.dependencies.length; i++) {
                if(pluginJSON.dependencies[i].name == nodeid) {
                    var pluginNode = {
                        'id' : pluginJSON.name,
                        'name' : pluginJSON.title,
                        'data': {
                            '$color': '#83548B',
                            '$type': 'circle',
                            '$dim': 10
                        },
                        'adjacencies' : new Array()
                    };
                    
                    pluginNode.adjacencies.push({
                        'nodeTo': 'Jenkins Core',
                        'nodeFrom': pluginJSON.name,
                        'data': {
                            '$color': '#AAAAAA',
                            "$direction": [pluginJSON.name, 'Jenkins Core']
                        }
                    });
                    
                    pluginNode.adjacencies.push({
                        'nodeTo': pluginJSON.dependencies[i].name,
                        'nodeFrom': pluginJSON.name,
                        'data': {
                            '$color': '#AAAAAA',
                            "$direction": [pluginJSON.name, pluginJSON.dependencies[i].name]
                        }
                    });
                    chartjson.push(pluginNode);
                }
            }
        }
    }
    return {json: chartjson, noofdeps: noofdeps};
}

function buildGraphForNode(nodeid) {
    var chartdata = getJSONForNode(nodeid);
    var chartjson = chartdata.json;
    var noofdeps = chartdata.noofdeps;
    
    $('#loadinfo').html(chartjson.length + ' plugins with ' + noofdeps + ' dependencies');
    $('#percdonecontainer').fadeIn();
    var percdone = $('#percdone');

    viz.loadJSON(chartjson);
    viz.computeIncremental({
        iter: 1,
        property: 'end',
        onStep: function(perc){
            percdone.html(perc + ' %');

        },
        onComplete: function(){
            percdone.html('done');
            setTimeout(function(){
                $('#percdonecontainer').fadeOut();
            }, 1000);
            viz.animate();
        }
    });
}