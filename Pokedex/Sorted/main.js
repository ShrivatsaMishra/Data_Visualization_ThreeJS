let scene, camera, renderer, controls;

const vars = ['HP', 'Atk', 'Def', 'SpAtk', 'SpDef', 'Spd'];
const pokemon = ["Pikachu", "Nidoking", "Charizard", "Blastoise", "Gengar", "Gyarados", "Eevee", "Snorlax", "Mew", "Mewtwo"]
const HP = [35, 81, 78, 79, 60, 95, 55, 160, 100, 106];
const atk = [55, 102, 84, 83, 65, 125, 75, 110, 100, 110];
const def = [40, 77, 78, 100, 60, 79, 70, 65, 100, 90];
const spatk = [50, 85, 109, 85, 130, 60, 45, 65, 100, 154];
const spdef = [50, 75, 85, 105, 75, 100, 65, 110, 100, 90];
const spd = [90, 85, 100, 78, 110, 81, 55, 30, 100, 130];
const exp = [1000, 1060, 1060, 1060, 1060, 1250, 1000, 1250, 1060, 1250]
const color = ["#ffcc00", 'purple', 'orange', 'blue', 'purple', 'aqua', 'brown', 'grey', 'pink', 'purple'];
scene = new THREE.Scene();
scene.background = new THREE.Color(0xffeaaa);

let arr = HP;
let cur = "HP";

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

var y=150;
var z=100;
var change = 30;

var graph = [];
for(var i=0;i<10;i++) {
    geometry = new THREE.BoxGeometry( exp[i]/10, 10, arr[i]*2 );
    material = new THREE.MeshBasicMaterial( {color: color[i]} );
    graph[i] = new THREE.Mesh( geometry, material );
    graph[i].position.set(200 - exp[i]/10, z, y-(arr[i]))
    scene.add(graph[i]);
    z-=change;
}

let loader = new THREE.FontLoader();
var geometry, material;
var st =[];
var xp=[];
var curTxt;
loader.load( '../three.js-master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
    z=95;
    geometry = new THREE.TextGeometry( "EXP to Level Up", {
        font: font,
        size: 12,
        height: 1,
        curveSegments: 5,
        bevelEnabled: false
    } );
    material = new THREE.MeshBasicMaterial( {color: 0x000000} );
    text = new THREE.Mesh( geometry, material );
    text.position.set(-50, z+50, 220);
    text.rotation.y=0;
    scene.add( text );
    for(var i=0;i<10;i++) {
        geometry = new THREE.TextGeometry( pokemon[i], {
            font: font,
            size: 10,
            height: 1,
            curveSegments: 5,
            bevelEnabled: false
        } );
        material = new THREE.MeshBasicMaterial( {color: color[i]} );
        text = new THREE.Mesh( geometry, material );
        text.position.set(120, z, 220);
        text.rotation.y=Math.PI/2;
        scene.add( text );
        geometry = new THREE.TextGeometry( ""+arr[i], {
            font: font,
            size: 10,
            height: 1,
            curveSegments: 5,
            bevelEnabled: false
        } );
        material = new THREE.MeshBasicMaterial( {color: color[i]} );
        st[i] = new THREE.Mesh( geometry, material );
        st[i].position.set(120, z, -180);
        st[i].rotation.y=Math.PI/2;
        scene.add( st[i] );
        geometry = new THREE.TextGeometry( exp[i]+"000", {
            font: font,
            size: 10,
            height: 1,
            curveSegments: 5,
            bevelEnabled: false
        } );
        material = new THREE.MeshBasicMaterial( {color: color[i]} );
        xp[i] = new THREE.Mesh( geometry, material );
        xp[i].position.set(-50, z, 180);
        xp[i].rotation.y=0;
        scene.add( xp[i] );
        z-=change;
    }
    geometry = new THREE.TextGeometry( cur, {
        font: font,
        size: 30,
        height: 1,
        curveSegments: 5,
        bevelEnabled: false
    } );
    material = new THREE.MeshBasicMaterial( {color: 0x000000} );
    curTxt = new THREE.Mesh( geometry, material );
    curTxt.position.set(120, 180, 40+(cur.length*10));
    curTxt.rotation.y=Math.PI/2;
    scene.add( curTxt );
    y = 220;
    for(var i=0;i<7;i++) {
        geometry = new THREE.TextGeometry( vars[i], {
            font: font,
            size: 10,
            height: 1,
            curveSegments: 5,
            bevelEnabled: false
        } );
        material = new THREE.MeshBasicMaterial( {color: 0x000000} );
        text = new THREE.Mesh( geometry, material );
        text.position.set(120, 150, y);
        text.rotation.y=Math.PI/2;
        scene.add( text );
        y-=75;
    }

} );

material = new THREE.MeshLambertMaterial({ color: 0xffffff , transparent: true});
cubeMaterial = [
    material,
    material,
    material,
    material,
    material,
    material
]
material = new THREE.MeshFaceMaterial(cubeMaterial);
geometry = new THREE.BoxGeometry(50, 25,50);
y=200;
var setting = [];
for(var i=0;i<7;i++) {
    setting[i] = new THREE.Mesh(geometry, material );
    setting[i].position.set(120, 150,y);
    scene.add(setting[i]);
    setting[i].visible = false;
    y-=75;
}


hlight = new THREE.AmbientLight (0xaaaaaa,1.5); 
scene.add(hlight);
animate();

loader = new THREE.TextureLoader;
geometry = new THREE.BoxGeometry(100, 100, 100);
cubeMaterial = [
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

loader = new THREE.GLTFLoader();
var mic;
loader.load('../Mic/scene.gltf', function(gltf){
    car = gltf.scene.children[0];
    car.scale.set(0.05, 0.05, 0.05);
    car.position.set(-200, -150, 400);
    scene.add(gltf.scene);
    animate();
});
cubeMaterial = [
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
mic.position.set(-200, -100, 400);
scene.add(mic);
mic.visible = false;

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
    if(result.includes("back")) {
        talk("Going Back");
        window.open('../Main/index.html','_self');
    } else if(result.includes("special")) {
        if(result.includes("attack")) {
            talk("Sorting by special attack");
            set(3);
        }else if(result.includes("defence")) {
            talk("Sorting by special defence");
            set(4);
        }
    }else if(result.includes("attack")) {
        talk("Sorting by attack");
        set(1);
    }else if(result.includes("defence")) {
        talk("Sorting by defence");
        set(2);
    }else if(result.includes("speed")) {
        talk("Sorting by speed");
        set(5);
    }else if(result.includes("hp")) {
        talk("Sorting by HP");
        set(0);
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
        if(intersects[i].object == back) {
            talk("Going back");
            window.open('../Main/index.html','_self');
        }
        else if(intersects[i].object == mic) {
            recognition.start();
        } else {
            for(var j=0;j<7;j++) {
                if(intersects[i].object == setting[j]) {
                    console.log("hello");
                    set(j)
                }
            }
        }
	}

}

function set(i) {
    cur = vars[i];
    if(i==0) {
        arr = HP;
    } else if(i==1) {
        arr = atk;
    } else if(i==2) {
        arr = def;
    } else if(i==3) {
        arr = spatk;
    } else if(i==4) {
        arr = spdef;
    } else if(i==5) {
        arr = spd;
    }

    y=150;
    z=100;
    for(var i=0;i<10;i++) {
        scene.remove(graph[i]);
        geometry = new THREE.BoxGeometry( exp[i]/10, 10, arr[i]*2 );
        material = new THREE.MeshBasicMaterial( {color: color[i]} );
        graph[i] = new THREE.Mesh( geometry, material );
        graph[i].position.set(200 - exp[i]/10, z, y-(arr[i]))
        scene.add(graph[i]);
        z-=change;
    }
    loader = new THREE.FontLoader();
    loader.load( '../three.js-master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        z=95;
        for(var i=0;i<10;i++) {
            scene.remove( st[i] );
            geometry = new THREE.TextGeometry( ""+arr[i], {
                font: font,
                size: 10,
                height: 1,
                curveSegments: 5,
                bevelEnabled: false
            } );
            material = new THREE.MeshBasicMaterial( {color: color[i]} );
            st[i] = new THREE.Mesh( geometry, material );
            st[i].position.set(120, z, -180);
            st[i].rotation.y=Math.PI/2;
            scene.add( st[i] );
            scene.remove(xp[i]);
            geometry = new THREE.TextGeometry( exp[i]+"000", {
                font: font,
                size: 10,
                height: 1,
                curveSegments: 5,
                bevelEnabled: false
            } );
            material = new THREE.MeshBasicMaterial( {color: color[i]} );
            xp[i] = new THREE.Mesh( geometry, material );
            xp[i].position.set(-50, z, 180);
            xp[i].rotation.y=0;
            scene.add( xp[i] );
            z-=change;
                
        }
        scene.remove( curTxt );
        geometry = new THREE.TextGeometry( cur, {
            font: font,
            size: 30,
            height: 1,
            curveSegments: 5,
            bevelEnabled: false
        } );
        material = new THREE.MeshBasicMaterial( {color: 0x000000} );
        curTxt = new THREE.Mesh( geometry, material );
        curTxt.position.set(120, 180, 40+(cur.length*10));
        curTxt.rotation.y=Math.PI/2;
        scene.add( curTxt );
    } );
}

window.addEventListener('click', onMouseClick, false );