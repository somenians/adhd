"use client";

import SendIcon from "@mui/icons-material/Send";
import {
  Grid,
  Stack,
  Typography,
  Box,
  Item,
  Button,
  IconButton,
} from "@mui/material";
import { Fade, Hinge, JackInTheBox, Zoom, Bounce } from "react-awesome-reveal";
import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

import Brain from "./BrainModel";
import PlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";

// function Brain(props) {
//     const gltf = useLoader(GLTFLoader, './static/brain/scene.gltf')
//     return <primitive object={gltf.scene} />
// }
function Cube(props: object) {
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
      {...props}
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
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid id="" xs={6} sx={{ alignItems: "center" }}>
          <Stack
            pacing={{ xs: 4, sm: 6 }}
            direction="column"
            useFlexGap
            flexWrap="wrap"
            alignItems="center"
          >
            <Typography
              fontSize={25}
              fontWeight="500"
              // sx={{
              // 	flexGrow: 1,
              // }}
              className="title"
              alignSelf={"center"}
            >
              Focus Up!
            </Typography>
            <Typography
              fontSize={15}
              fontWeight="500"
              // sx={{
              // 	flexGrow: 1,
              // }}
              className="desc"
              alignSelf={"center"}
            >
              Your ultimate productivity companion.
            </Typography>
            <br></br>
            <Button
              href="/about"
              sx={{ marginTop: 5 }}
              variant="contained"
              size="large"
              // endIcon={<SendIcon />}
              alignSelf={"center"}
            >
              Get Started
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={6}>
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
          {/* <Canvas>
                            <Brain />
                        </Canvas> */}
        </Grid>
      </Grid>
      {/* </Fade> */}
    </section>
  );
}
