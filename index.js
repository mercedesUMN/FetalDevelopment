
let GLOBAL_IDX = 125;


const NATIVE_SUFFIX = "_1_F004_Artboard_4a_Artboard F004.png";
const OVERLAY_SUFFIX = "_F004_Artboard_4a_Artboard F004.png";
const MIN_IDX = 16;
const MAX_IDX = 125;

const TISSUE_TYPES = ["hepatic", "gastro", "pulmonary", "adrenal", "renal", "cardiac", "brain", "spine"];
let CHECKED_STATUS = [false, false, false, false, false, false, false, false, false, false];

window.addEventListener('wheel', function(e) {
	// console.log("idx = " + GLOBAL_IDX);
	let dir = get_direction(e.deltaY);
	if (dir == 0) return;

	update_global_idx(dir);
	update_ui(GLOBAL_IDX);
});

function get_direction(dir) {
	dir = Math.sign(dir);
	return dir;
}

function update_global_idx(dir) {
	GLOBAL_IDX += dir;

	if (GLOBAL_IDX > MAX_IDX) {
		GLOBAL_IDX = MAX_IDX;
		return
	} else if (GLOBAL_IDX < MIN_IDX) {
		GLOBAL_IDX = MIN_IDX;
		return;
	}

	check_idx(GLOBAL_IDX, dir);
}

function build_native_img_string(idx) {
	let path = "assets/" + idx + NATIVE_SUFFIX;
	return path;
}

function build_overlay_img_string(idx, tissueType) {
	let path = "assets/" + idx + "_" + tissueType + OVERLAY_SUFFIX;
	return path;
}

function check_idx(idx, dir) {
	var img = new Image();
	img.onload = function() { update_ui(idx) };
	img.onerror = function() { update_global_idx(dir) };
	img.src = build_native_img_string(idx);
}

function update_ui(idx) {
	update_native(idx);
	update_training(idx);
}

function update_native(idx) {
	let native = document.getElementById("native_img");
	let training = document.getElementById("training_img");
	let path = build_native_img_string(idx);
	
	native.src = path;
	training.src = path;
}

function update_training(idx) {
	let training_images = document.getElementsByClassName("overlay_img");

	for (i = 0; i < training_images.length; ++i) {
		try {
			isChecked = document.getElementById(TISSUE_TYPES[i]).checked;
			if (isChecked) {
				let img = build_overlay_img_string(idx, i + 2);
				// console.log(img);
				training_images[i].src = img;
			} else {
				training_images[i].src = "";
			}
		} 
		catch (err) {
			continue;
		}
	}
}
