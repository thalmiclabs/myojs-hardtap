# myojs-hardtap
A plugin for [Myo.js](https://github.com/thalmiclabs/myo.js) that detects when the user physically double taps the myo.


**[See it in action here](http://thalmiclabs.github.io/myojs-hardtap/demo/)** <small>(requires a myo!)</small>

`hardtap.myo.js` will emit a `hard_tap` event when the user physically taps the main pod of the Myo in quick sucession. If you are also using the [Busy Arm Plugin](https://github.com/thalmiclabs/myojs-busyarm), it will improve the false positives by making sure the arm is at rest while tapping.

The plugin will also a `tap` event, whenever the Myo is bumped. This is less useful, since this happens often and isn't filtered at all.

The plugin uses sharp changes in the `y` and `z` axis of the gyroscope and timing windows to pick up the hard tap.

Hard tap is useful for toggling event listeners on the Myo, or triggering uncommonly used actions, like `this.zeroOrientation()`.

```
var listenToGestures = false
Myo.on('hard_tap', function(){
	listenToGestures = !listenToGestures;
});

Myo.on('pose', function(dat_pose){
	if(listenToGestures){
		//Handle the pose!
	}
})
```

Check out the [demo](/demo/index.html) for an example of how to use it.


#### configuration

```
Myo.plugins.hardtap = {
	threshold   : 0.9,       //How much force is required to register a tap
	time_window : [80, 300]  //The window in milliseconds for a hard tap to register
};
```

If you are getting a lot of false positives, feel free to tighten up the window or increase the threshold.