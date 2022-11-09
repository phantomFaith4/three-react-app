import { Canvas, useFrame } from '@react-three/fiber'
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls, Html, useProgress} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useState, useEffect, useRef } from "react";


function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function Box(props) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
const Model = () => {
  let gltf2 = useLoader(GLTFLoader, "./scene.gltf");
  const primitive = <primitive onPointerOut={(e) => console.log( 'onHoverIn object name=>',e.object.name,"state position=>",e.object.position.z = 0 , "full event =>",e)} onPointerOver={(e) => console.log( 'onHoverIn object name=>',e.object.name,"state position=>",e.object.position.z = 0.2 , "full event =>",e)}  scale={1} object={gltf2.scene} />;
  //const primitive = <primitive onPointerOver={(e) => e.object.position = new THREE.Vector3 ( 0, 0, 1) }  scale={1} object={gltf2.scene} />;
  /*primitive.props.object.traverse( (child) =>{
    console.log(child);
  })*/
  return primitive;
};

function Loop(){
  let gltf2 = useLoader(GLTFLoader, "./scene.gltf");
  const primitive = <primitive object={gltf2.scene} />;
  //const primitive = <primitive onPointerOver={(e) => e.object.position = new THREE.Vector3 ( 0, 0, 1) }  scale={1} object={gltf2.scene} />;
  let arr = [];
  primitive.props.object.traverse( (child) =>{
    if(child.isObject3D && child.type === 'Mesh'){
     //console.log(child);
      arr.push(
        <primitive object={child} />
      );
    };
  });
  console.log("arr=>",arr);
  return (
    <group>
      { arr }
    </group>
  );
};

export default function App() {
  return (
    <Canvas> 
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Loop />
        {
        //<Model />
        }
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}
