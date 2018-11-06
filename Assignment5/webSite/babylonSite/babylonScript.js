var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);


    var torusMaterial = new BABYLON.StandardMaterial(scene);
    torusMaterial.diffuseColor = new BABYLON.Color3(0.0, 1.0, 0.0, 1);
    var myTorus = [];
    for (var i = 0; i < 5; i ++){
        myTorus.push(BABYLON.MeshBuilder.CreateTorus("torus", {thickness: i * .5}, scene));
        myTorus[i].position.x = 10;
        myTorus[i].position.y = i * .5;
        myTorus[i].material = torusMaterial;
    }


    var mat = new BABYLON.StandardMaterial("mat", scene);
    var texture = new BABYLON.Texture("spriteSheet.png", scene);
    mat.diffuseTexture = texture;
 
    var columns = 6;  // 6 columns
    var rows = 4;  // 4 rows

    var faceUV = new Array(6);

    for (var i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }

    var options = {
        width: 5,
        height: 5,
        depth: 5,
        faceUV: faceUV
    };

    var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
    box.material = mat;

    box.material = mat;
    var sphereOptions = {
        diameter: 2,
        diameterX: 2
    };

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", sphereOptions, scene);
    sphere.position.x = -10;
    sphere.position.y = 10;


    // My attempt to color the sphere
    var sphereMaterial = new BABYLON.StandardMaterial(scene);
    sphereMaterial.diffuseColor = new BABYLON.Color3(1.0, 0.0, 0.0, 1);
    sphere.material = sphereMaterial; 


    var music = new BABYLON.Sound("Music", "league.mp3", scene, null, { loop: true, autoplay: true });

    //Create a rotation animation at 15 FPS
    var frameRate = 1;
    // animation in y-axis
    var animationBox = new BABYLON.Animation("yAnimation", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
												            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keyFramesR = []; 

    keyFramesR.push({
    frame: frameRate,
    value: Math.PI
    });

    keyFramesR.push({
    frame: 2 * frameRate,
    value: 2 * Math.PI
    });

    keyFramesR.push({
    frame: 3 * frameRate,
    value: 3 * Math.PI
    });

    animationBox.setKeys(keyFramesR);

    box.animations.push(animationBox);

    var animationBox2 = new BABYLON.Animation("xAnimation", "rotation.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
												            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keyFramesR2 = []; 

    keyFramesR2.push({
    frame: 0,
    value: 0
    });

    keyFramesR2.push({
    frame: 2 * frameRate,
    value: 2 * Math.PI
    });

    keyFramesR2.push({
    frame: 3 * frameRate,
    value: 3 * Math.PI
    });

    animationBox2.setKeys(keyFramesR2);

    box.animations.push(animationBox2);

    var nextAnimation = function() {
    scene.beginDirectAnimation(box, [animationBox, animationBox2], 0, 2 * frameRate, true);
    }

    scene.beginDirectAnimation(box, [animationBox], 0, 2 * frameRate, false, 1, nextAnimation);

    return scene;

}; 

var scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () { 
        scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () { 
        engine.resize();
});
