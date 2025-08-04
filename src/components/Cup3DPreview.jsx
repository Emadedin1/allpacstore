// src/components/Cup3DPreview.jsx
"use client";

import { useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader, RepeatWrapping } from "three";
import { OrbitControls } from "@react-three/drei";

function CupModel({ modelURL, dynamicTextureURL }) {
  // Load the GLTF model
  const gltf = useLoader(GLTFLoader, modelURL);
  
  // Load dynamic (user or preset) texture or fallback to white
  const dynamicSrc = dynamicTextureURL || "/textures/plain-white.png";
  const dynamicTex = useLoader(TextureLoader, dynamicSrc);
  const whiteTex   = useLoader(TextureLoader, "/textures/plain-white.png");

  // Ensure both textures repeat correctly
  [dynamicTex, whiteTex].forEach((tex) => {
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(1, 1);
  });

  // Once loaded, assign textures based on material name
  useEffect(() => {
    gltf.scene.traverse((obj) => {
      if (obj.isMesh) {
        // In Blender, name the printed-design material "Textured"
        if (obj.material.name === "Textured") {
          obj.material.map = dynamicTex;
        } else {
          // All other parts (e.g. inner cup) stay white
          obj.material.map = whiteTex;
        }
        obj.material.needsUpdate = true;
      }
    });
  }, [gltf, dynamicTex, whiteTex]);

  return <primitive object={gltf.scene} />;
}


export default function Cup3DPreview({ modelURL, textureURL }) {
  const [canLoad, setCanLoad] = useState(false);
  const [hovered, setHovered] = useState(false);

  // HEAD-check so we always render the canvas
  useEffect(() => {
    fetch(modelURL, { method: "HEAD" })
      .then((res) => setCanLoad(res.ok))
      .catch(() => setCanLoad(false));
  }, [modelURL]);

  return (
    <div
      className="w-full h-full bg-gray-100"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {canLoad && (
          <CupModel modelURL={modelURL} dynamicTextureURL={textureURL} />
        )}

        <OrbitControls
          enableZoom={hovered}
          enablePan={false}
          minDistance={0.2}
          maxDistance={0.3}
        />
      </Canvas>
    </div>
  );
}
