/**
 * Copyright 2015 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var createGraph = function(opts){
	var lineGraph = {};

	var opts = _.extend({
		element : null,
		resolution : 100,
		initialData : {x:0,y:0,z:0},
		range : [-1,1]
	}, opts);

	var history = _.times(opts.resolution, function(){ return opts.initialData});

	var generateGraphData = function(){
		var self = this;
		var result = {};

		if(!_.isObject(opts.initialData)){
			return [_.map(history, function(val, index){
				return [index, val]
			})]
		}
		_.each(history, function(data, index){
			if(_.isArray(data)){
				data = _.map(data, function(val){
					return {g : val}
				});
			}
			_.each(data, function(val, axis){
				result[axis] = result[axis] || {label : axis, data : []};
				result[axis].data.push([index, val])
			});
		});

		return _.values(result);
	};


	lineGraph.graph = $(opts.element).plot(generateGraphData(), {
		series: {shadowSize: 0},
		colors: [ '#04fbec', '#ebf1be', '#c14b2a', '#8aceb5'],
		xaxis: {
			show: false,
			min : 0,
			max : opts.resolution
		},
		yaxis :{
			min : opts.range[0],
			max : opts.range[1],
		},
		legend : {
			backgroundOpacity : 0,
		},
		grid : {
			borderColor : "#427F78",
			borderWidth : 1
		}
	}).data("plot");


	lineGraph.update = _.throttle(function(){
		lineGraph.graph.setData(generateGraphData());
		lineGraph.graph.draw();
	}, 50);

	lineGraph.add = function(data){
		history = history.slice(1);
		history.push(data);
		lineGraph.update();
	}

	return lineGraph;
}