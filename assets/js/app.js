'use strict';
require('font-awesome/css/font-awesome.css');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.z = 500;
camera.rotation.x = 135;


var loader = new THREE.TextureLoader();

var textures = {
	galaxy: loader.load("/images/galaxy.png")
};

var materials = {
	white: new THREE.MeshBasicMaterial({
		color: 0xffffff
	}),
	galaxy: new THREE.MeshBasicMaterial({
		map: textures.galaxy,
		side: THREE.DoubleSide
	})
};


var renderer = new THREE.WebGLRenderer();

var resize = function(){
	var d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		w = e.clientWidth || w.innerWidth || g.clientWidth,
		h = e.clientHeight || w.innerHeight || g.clientHeight;
	renderer.setSize(w, h);
};
resize();
window.onresize = resize;
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(2500, 64, 64);
var cube = new THREE.Mesh(geometry, materials.galaxy);
scene.add(cube);

var count = 5000;

function sample(input){
	return input[Math.floor((Math.random() * this.length))];
}

var geos = [];
while(geos.length < 10){
	geos.push(new THREE.SphereGeometry((geos.length * .10) + 0.10, 5, 5));
}

var group = new THREE.Object3D();
while(count > 0){
	var star = new THREE.Mesh(sample(geos), materials.white);
	star.position.x = Math.random() * 5000 - 2500;
	star.position.y = Math.random() * 5000 - 2500;
	star.position.z = Math.random() * 5000 - 2500;
	group.add(star);
	count--;
}
scene.add(group);

var orbit = {
	angle: 0,
	range: 1500,
	speed: 0.075 * Math.PI / 180
};

function render(){
	orbit.angle += orbit.speed;
	camera.position.z = Math.sin(orbit.angle) * orbit.range;
	camera.position.y = Math.cos(orbit.angle) * orbit.range;
	camera.rotation.x += orbit.speed;
	camera.rotation.z += 0.0015;
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();