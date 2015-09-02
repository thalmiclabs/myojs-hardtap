(function(){
	Myo.plugins = Myo.plugins || {};

	Myo.plugins.hardtap = {
		threshold   : 0.9,       //How much force is required to register a tap
		time_window : [80, 300]  //The window in milliseconds for a hard tap to register
	};

	Myo.on('accelerometer', function(data){
		var last = this.lastIMU.accelerometer;
		var delta = Math.abs(Math.abs(last.y) - Math.abs(data.y)) + Math.abs(Math.abs(last.z) - Math.abs(data.z));

		if(delta > Myo.plugins.hardtap.threshold){
			var timeDiff = new Date().getTime() - (this.lastTapTimestamp || 0);
			var withinWindow = timeDiff > Myo.plugins.hardtap.time_window[0] && timeDiff < Myo.plugins.hardtap.time_window[1];
			if(!this.isTapped){
				this.trigger('tap');
				this.isTapped = true;
			}
			if(withinWindow && !this.isArmBusy){
				this.trigger('hard_tap');
			}
			this.lastTapTimestamp = new Date().getTime();
		}else{
			this.isTapped = false;
		}
	});
}());
