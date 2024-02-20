"use client";

import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import Brain from "./BrainModel";
import PlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";

// function Brain(props) {
//     const gltf = useLoader(GLTFLoader, './static/brain/scene.gltf')
//     return <primitive object={gltf.scene} />
// }
// braindead cube rendering function
function Cube(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  useFrame((state, delta) => (ref.current.rotation.y += delta / 2));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "purple"} />
    </mesh>
  );
}

export default function Home() {
  return (
    <section className="home">
      {/* <Fade triggerOnce="true" delay={3}> */}
      <div className="flex flex-row flex-wrap mx-auto gap-20">
        <div className="flex flex-col justify-center gap-4 flex-grow">
          <p
            // sx={{
            // 	flexGrow: 1,
            // }}
            // className="title"
            // alignSelf={"center"}
            className="text-9xl font-bold text-center"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
            }}
          >
            Focus Up!
          </p>
          <p className="text-xl text-center flex-grow">
            Your ultimate productivity companion.
          </p>
          <Button href="/about" variant="contained" className="mx-auto">
            Get Started
          </Button>
        </div>

        <div className="flex-shrink flex-grow">
          <Canvas>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              decay={0}
              intensity={Math.PI}
            />
            <pointLight
              position={[-10, -10, -10]}
              decay={0}
              intensity={Math.PI}
            />
            <Cube position={[-1.2, 0, 0]} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
