"use client";
import { MutableRefObject, useRef } from "react";

import { useGLTF } from "@react-three/drei";

export default function Brain(props: object) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("/brain/scene.gltf");
  return (
    <group ref={groupRef as MutableRefObject<any>} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve007_1.geometry}
        material={materials["Material.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve007_2.geometry}
        material={materials["Material.002"]}
      />
    </group>
  );
}

useGLTF.preload("./static/brain/scene.gltf/");
