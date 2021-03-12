let scene, camera, renderer, controls;

scene = new THREE.Scene();
scene.background = new THREE.Color(0xffeaaa);

camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
camera.rotation.z = Math.PI;
camera.position.x = 700;
camera.position.y = 40;
camera.position.z = 0;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', renderer);
controls.update();

hlight = new THREE.AmbientLight (0xffffff,1); 
scene.add(hlight);
plane = [];

loader = new THREE.TextureLoader;
geometry = new THREE.BoxGeometry(50, 50, 50);
var material;
for(var i=0;i<10;i++) {
    
    material = new THREE.MeshLambertMaterial({ color: 0xaafafa});
    material.visible = false;
    var cubeMaterial = [
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('photos/'+i+'.jpg'), side:THREE.DoubleSide}),
        material,
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('photos/'+i+'.jpg'), side:THREE.DoubleSide}),
        material,
        material,
        material        
    ]
    material = new THREE.MeshFaceMaterial(cubeMaterial);
    plane[i] = new THREE.Mesh( geometry, material );
    plane[i].rotation.y = Math.PI+(i+5)*Math.PI/5;
    plane[i].position.set(100-200*Math.cos((i+5)*Math.PI/5), 20,200*Math.sin((i+5) * (Math.PI/5)));
    scene.add(plane[i]);
}


loader = new THREE.GLTFLoader();
loader.load('Pokeball/scene.gltf', function(gltf){
    dex = gltf.scene.children[0];
    dex.scale.set(120, 120, 120);
    dex.position.set(100, -40, 0);
    dex.rotation.z = Math.PI/2;
    scene.add(gltf.scene);
    animate();
});
var mic;
loader.load('../Mic/scene.gltf', function(gltf){
    car = gltf.scene.children[0];
    car.scale.set(0.05, 0.05, 0.05);
    car.position.set(0, -150, 400);
    scene.add(gltf.scene);
    animate();
});

material = new THREE.MeshLambertMaterial({ color: 0xffffff , transparent: true});
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
mic.position.set(0, -100, 400);
scene.add(mic);
mic.visible = false;

// material = new THREE.MeshLambertMaterial({ color: 0x00faaa , side:THREE.DoubleSide});
// geometry = new THREE.BoxGeometry(1500, 1500, 1500);
// box = new THREE.Mesh( geometry, material );
// box.position.set(0, -100, 0);
// scene.add(box);

var srt;
material = new THREE.MeshLambertMaterial({ color: 0xffffff , transparent: true});
var cubeMaterial = [
    material,
    material,
    material,
    material,
    material,
    material
]
material = new THREE.MeshFaceMaterial(cubeMaterial);
geometry = new THREE.BoxGeometry(50, 50, 250);
srt = new THREE.Mesh( geometry, material );
srt.position.set(120, -160, -300);
scene.add(srt);
srt.visible = false;

loader = new THREE.FontLoader();

var text;
loader.load( '../three.js-master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

    geometry = new THREE.TextGeometry( 'Pokedex', {
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
    text = new THREE.Mesh( geometry, material );
    text.position.set(120, 160, 80)
    text.rotation.y=Math.PI/2;
    scene.add( text );

    geometry = new THREE.TextGeometry( 'Compare by Stats', {
        font: font,
        size: 20,
        height: 1,
        curveSegments: 5,
        bevelEnabled: false
    } );
    text = new THREE.Mesh( geometry, material );
    text.position.set(120, -190, -180)
    text.rotation.y=Math.PI/2;
    scene.add( text );
});
var clicks=0;
animate();


function animate() {
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();

recognition.onstart = function() {
    console.log("Voice recog Started");
}

recognition.onresult = function(event) {
    console.log(event);
    var index = event.resultIndex;
    var result = event.results[index][0].transcript;
    console.log(result);
    result = result.toLowerCase();
    if(result.includes("open")) {
        if(result.includes("mewtwo")) {
            window.open('../9/index.html','_self');
            talk("Opening "+ 'mewtwo');
        }else if(result.includes("pikachu")) {
            window.open('../0/index.html','_self');
            talk("Opening "+ 'pikachu');
        }else if(result.includes("snorlax")) {
            window.open('../7/index.html','_self');
            talk("Opening "+ 'snorlax');
        }else if(result.includes("charizard")) {
            window.open('../2/index.html','_self');
            talk("Opening "+ 'charizard');
        }else if(result.includes("blaster") || result.includes("blastoise") || result.includes("blast")) {
            window.open('../3/index.html','_self');
            talk("Opening "+ 'blastoise');
        }else if(result.includes("tv") || result.includes("ev")) {
            window.open('../6/index.html','_self');
            talk("Opening "+ 'Eevee');
        }else if(result.includes("mu")) {
            window.open('../8/index.html','_self');
            talk("Opening "+ 'mew');
        }else if(result.includes("nidoking")) {
            window.open('../8/index.html','_self');
            talk("Opening "+ 'nidoking');
        }else {
            talk("Can you please repeat?");
        } 
    }else  if(result.includes("compare")) {
        window.open('../Sorted/index.html','_self');
    }else {
        talk("Can you please repeat?");
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

function onMouseClick( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );

	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {
        console.log(intersects[i].object, plane[0], mic);
        for(var j=0; j<10;j++) {
            if(intersects[i].object === plane[j]) {
                window.open('../'+j+'/index.html','_self');
            }
        }
        if(intersects[i].object == mic) {
            recognition.start();
        } else if(intersects[i].object == srt) {
            window.open('../Sorted/index.html','_self');
        }
	}

}
window.addEventListener('click', onMouseClick, false );