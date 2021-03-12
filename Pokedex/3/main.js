let scene, camera, renderer, controls, stats, stats_real, back;
pokemon_name = "Blastoise"
no = "009"
stats = [0, 0, 0, 0, 0, 0];
stats_real = [79,83,100,85,105,78];
height = 160;
weight = 85.5;
female = 11.86;
male = 88.14;
type1 = "water";
type2 = "blank";
scale = 14;
desc1 = "It crushes its foe under its heavy body to cause fainting. \nIn a pinch, it will withdraw inside its shell.";
desc2 = "The rocket cannons on its shell fire jets of water capable \nof punching holes through thick steel.";

var done = false;
scene = new THREE.Scene();
scene.background = new THREE.Color(0x6000ff);

camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
camera.rotation.z = Math.PI;
camera.position.x = 700;
camera.position.y = 0;
camera.position.z = 0;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', renderer);

hlight = new THREE.AmbientLight (0xffffff,1.5);
scene.add(hlight);

controls.update();

let loader = new THREE.TextureLoader;
geometry = new THREE.BoxGeometry(100, 100, 100);
var cubeMaterial = [
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../back.png'), side:THREE.DoubleSide}),
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../back.png'), side:THREE.DoubleSide}),
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../back.png'), side:THREE.DoubleSide}),
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../back.png'), side:THREE.DoubleSide}),
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../back.png'), side:THREE.DoubleSide}),
    new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../back.png'), side:THREE.DoubleSide})
]
material = new THREE.MeshFaceMaterial(cubeMaterial);
back = new THREE.Mesh( geometry, material );
scene.add(back);
back.position.set(-100, 200, 500);

var t = new THREE.TextureLoader().load('../types/'+type1+'.png');
var tr = new THREE.TextureLoader().load('../blank.png');

function makeTypeCube(a, b, x, y, z) {
    geometry = new THREE.BoxGeometry(a, a, b);
    cubeMaterial = [
        new THREE.MeshBasicMaterial( {map: t, side:THREE.DoubleSide, transparent: true,}),
        new THREE.MeshBasicMaterial( {map: tr, side:THREE.DoubleSide,transparent: true,}),
        new THREE.MeshBasicMaterial( {map: tr, side:THREE.DoubleSide, transparent: true,}),
        new THREE.MeshBasicMaterial( {map: tr, side:THREE.DoubleSide,transparent: true,}),
        new THREE.MeshBasicMaterial( {map: tr, side:THREE.DoubleSide, transparent: true,}),
        new THREE.MeshBasicMaterial( {map: tr, side:THREE.DoubleSide,transparent: true,}),
    ]
    material = new THREE.MeshFaceMaterial(cubeMaterial);
    type = new THREE.Mesh( geometry, material );
    type.position.set(x, y, z);
    scene.add(type);
}
makeTypeCube(30, 60, 120, 125, -160);
t = new THREE.TextureLoader().load('../types/'+type2+'.png');
makeTypeCube(30, 60, 120, 85, -160);


geometry = new THREE.CircleGeometry( 40, 32, 0, Math.PI * (male/50));
material = new THREE.MeshBasicMaterial( { color: 'aqua', side: THREE.DoubleSide } );
circle = new THREE.Mesh( geometry, material );
circle.rotation.y = Math.PI/2;
circle.rotation.z = Math.PI/2;
circle.position.set(120, 110, -300);
scene.add( circle );
geometry = new THREE.CircleGeometry( 40, 32, Math.PI * (male/50), Math.PI * (female/50));
material = new THREE.MeshBasicMaterial( { color: 'pink', side: THREE.DoubleSide } );
circle = new THREE.Mesh( geometry, material );
circle.rotation.y = Math.PI/2;
circle.rotation.z = Math.PI/2;
circle.position.set(120, 110, -300);
scene.add( circle );

loader = new THREE.FontLoader();

x=120
y=0
z=0
//Name
loader.load( '../three.js-master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

    geometry = new THREE.TextGeometry( '  #'+no+'\n '+pokemon_name, {
        font: font,
        size: 25,
        height: 1,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 5
    } );
    material = new THREE.MeshBasicMaterial( {color: 0x000000} );
    text = new THREE.Mesh( geometry, material );
    text.position.set(120, 160, 80)
    text.rotation.y=Math.PI/2;
    scene.add( text );

    geometry = new THREE.TextGeometry( 'Height: ' + (height/100) + "m\nWeight: " + weight + "kg", {
        font: font,
        size: 10,
        height: 1,
        curveSegments: 3,
        bevelEnabled: false
    } );
    material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    text = new THREE.Mesh( geometry, material );
    text.position.set(120, 90, 50)
    text.rotation.y=Math.PI/2;
    scene.add( text );
    geometry = new THREE.TextGeometry( 'Type', {
        font: font,
        size: 15,
        height: 1,
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 5
    } );
    material = new THREE.MeshBasicMaterial( {color: 0x000000} );
    text = new THREE.Mesh( geometry, material );
    text.position.set(x, y+160, z-120)
    text.rotation.y=Math.PI/2;
    scene.add( text );

    geometry = new THREE.TextGeometry( 'Gender', {
        font: font,
        size: 15,
        height: 1,
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0.5,
        bevelOffset: 0,
        bevelSegments: 5
    } );
    text = new THREE.Mesh( geometry, material );
    text.position.set(x, y+160, z-270)
    text.rotation.y=Math.PI/2;
    scene.add( text );

    geometry = new THREE.TextGeometry( "Male\n"+male+"%", {
        font: font,
        size: 7,
        height: 1,
        curveSegments: 3,
        bevelEnabled: false
    } );
    text = new THREE.Mesh( geometry, material );
    text.position.set(x, y+110, z-265)
    text.rotation.y=Math.PI/2;
    scene.add( text );

    geometry = new THREE.TextGeometry( "Female\n"+female+"%", {
        font: font,
        size: 5,
        height: 1,
        curveSegments: 3,
        bevelEnabled: false
    } );
    text = new THREE.Mesh( geometry, material );
    text.position.set(x, y+135, z-300);
    text.rotation.y=Math.PI/2;
    scene.add(text);

    geometry = new THREE.TextGeometry( desc1, {
        font: font,
        size: 8,
        height: 1,
        curveSegments: 3,
        bevelEnabled: false
    } );
    material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    text = new THREE.Mesh( geometry, material );
    text.position.set(x, y+50, z-120)
    text.rotation.y=Math.PI/2;
    scene.add( text );

    geometry = new THREE.TextGeometry( desc2, {
        font: font,
        size: 8,
        height: 1,
        curveSegments: 3,
        bevelEnabled: false
    } );
    text = new THREE.Mesh( geometry, material );
    text.position.set(x, y+10, z-120)
    text.rotation.y=Math.PI/2;
    scene.add( text );

    geometry = new THREE.TextGeometry( 'Weaknesses: ', {
        font: font,
        size: 15,
        height: 1,
        curveSegments: 3,
        bevelEnabled: false
    } );
    material = new THREE.MeshBasicMaterial( {color: 0x000000} );
    text = new THREE.Mesh( geometry, material );
    text.position.set(x, y-40, z-120)
    text.rotation.y=Math.PI/2;
    scene.add( text );

    t = new THREE.TextureLoader().load('../types/grass.png');
    makeTypeCube(25, 50, x, y-60, z-140);
    t = new THREE.TextureLoader().load('../types/electric.png');
    makeTypeCube(25, 50, x, y-60, z-200);

    geometry = new THREE.TextGeometry( 'Resistances: ', {
        font: font,
        size: 15,
        height: 1,
        curveSegments: 3,
        bevelEnabled: false
    } );
    material = new THREE.MeshBasicMaterial( {color: 0x000000} );
    text = new THREE.Mesh( geometry, material );
    text.position.set(z+120, y-100, z-120)
    text.rotation.y=Math.PI/2;
    scene.add( text );

    t = new THREE.TextureLoader().load('../types/water.png');
    makeTypeCube(25, 50, x, y-120, z-140);
    t = new THREE.TextureLoader().load('../types/fire.png');
    makeTypeCube(25, 50, x, y-120, z-200);
    t = new THREE.TextureLoader().load('../types/ice.png');
    makeTypeCube(25, 50, x, y-120, z-260);
    t = new THREE.TextureLoader().load('../types/steel.png');
    makeTypeCube(25, 50, x, y-120, z-320);

    geometry = new THREE.TextGeometry( 'Stats', {
        font: font,
        size: 30,
        height: 1,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 5
    } );
    material = new THREE.MeshBasicMaterial( {color: 0x000000} );
    cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y+60, z+270)
    cube.rotation.y=Math.PI/2;
    scene.add( cube );

    geometry = new THREE.TextGeometry( ' HP  Atk  Def  SpA  SpD  Spd', {
        font: font,
        size: 9.5,
        height: 1,
        curveSegments: 2,
        bevelEnabled: false
    } );
    material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y+30, 310)
    cube.rotation.y=Math.PI/2;
    scene.add( cube );

    change = "    ";
    geometry = new THREE.TextGeometry("  "+stats_real[0]+change+stats_real[1]+change+stats_real[2]+change+stats_real[3]+change+stats_real[4]+change+stats_real[5], {
        font: font,
        size: 9,
        height: 1,
        curveSegments: 3,
        bevelEnabled: false
    } );
    cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y-120, 310)
    cube.rotation.y=Math.PI/2;
    scene.add( cube );
} );

loader = new THREE.GLTFLoader();
loader.load('scene.gltf', function(gltf){
    car = gltf.scene.children[0];
    car.scale.set(scale, scale, scale);
    car.position.set(100, -160, 0);
    car.rotation.z = Math.PI/2;
    scene.add(gltf.scene);
    animate();
});
const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();

recognition.onstart = function() {
    console.log("Voice recog Started");
}
var mic;
loader.load('../Mic/scene.gltf', function(gltf){
    car = gltf.scene.children[0];
    car.scale.set(0.05, 0.05, 0.05);
    car.position.set(0, -150, 500);
    scene.add(gltf.scene);
    animate();
    console.log(mic);
});
material = new THREE.MeshLambertMaterial({transparent: true});
var cubeMaterial = [
    material,
    material,
    material,
    material,
    material,
    material
]
material = new THREE.MeshFaceMaterial(cubeMaterial);
geometry = new THREE.BoxGeometry(50, 100, 50);
mic = new THREE.Mesh( geometry, material );
mic.position.set(-50, -100, 500);
scene.add(mic);
mic.visible = false;

recognition.onresult = function(event) {
    console.log(event);
    var index = event.resultIndex;
    var result = event.results[index][0].transcript;
    console.log(result);
    result = result.toLowerCase();
    if(result.includes("back")) {
        talk("Going Back");
        window.open('../Main/index.html','_self');
    }
        
}

function talk(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.text = message;

    window.speechSynthesis.speak(speech);
}


// loader = new THREE.GLTFLoader();
// loader.load('scene.glb', function(gltf){
//     car = gltf.scene.children[0];
//     car.scale.set(4, 4, 4);
//     car.position.set(100, -150, 0);
//     car.rotation.z = Math.PI/2;
//     scene.add(gltf.scene);
//     animate();
// });

// loader = new THREE.GLTFLoader();
// loader.load('classroom_bg/scene.gltf', function(gltf){
//   car = gltf.scene.children[0];
//   car.scale.set(200, 200, 200);
//   car.position.set(0, 0, 0);
//   car.rotation.z = Math.PI/2
//   scene.add(gltf.scene);
//   animate();
// });
function animate() {
    if(done == false) {
        var tot;
        for(var i=0;i<6;i++) {
            if(stats[i]<stats_real[i]) {
                stats[i]+=1;
            }
            else if(stats[i]===stats_real[i]) {
                tot++;
            }
        }
        if(tot==6) {
            done = true;
        }
        else
            update();
    }
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

function update() {

    var y=310;
    var z=-105;
    var change = 30;

    for(var i=0;i<6;i++) {
        var geometry = new THREE.BoxGeometry( 10, stats[i], 10 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        var cube = new THREE.Mesh( geometry, material );
        cube.position.set(100, z+(stats[i]/2), y)
        scene.add( cube );
        y-=change;
    }
}

function onMouseClick( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );

	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {

        if(intersects[i].object == back) {
            talk("Going back");
            window.open('../Main/index.html','_self');
        }
        else if(intersects[i].object == mic) {
            recognition.start();
        }
	}

}
window.addEventListener('click', onMouseClick, false );
update();