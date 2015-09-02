(function(){
	Myo.plugins = Myo.plugins || {};

	Myo.plugins.busyarm = {
		threshold : 80,     //The threshold the EMA has to pass to be considered busy
		ema_alpha : 0.05,   //The coefficient for smoothing the EMA of the gyro data
	};

	Myo.on('gyroscope', function(gyro){
		this.armBusyData = this.armBusyData || 0;

		//Calculate the exponential moving average of the abs values from the gyro
		var ema = this.armBusyData +
			Myo.plugins.busyarm.ema_alpha * (Math.abs(gyro.x) + Math.abs(gyro.y) + Math.abs(gyro.z) - this.armBusyData);

		//If that's over the specific threshold, the arm is considered busy
		var isBusy = ema > Myo.plugins.busyarm.threshold;

		//If the busy state has changed, emit the event
		if(isBusy !== this.isArmBusy){
			this.trigger(isBusy ? 'arm_busy' : 'arm_rest');
			this.isArmBusy = isBusy;
		}
		//Save the accumulator on the myo instance for the EMA
		this.armBusyData = ema;
	});
}());
