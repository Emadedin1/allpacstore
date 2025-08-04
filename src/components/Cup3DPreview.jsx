// src/components/Cup3DPreview.jsx
"use client";

import { useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader, RepeatWrapping } from "three";
import { OrbitControls } from "@react-three/drei";

function CupModel({ modelURL, dynamicTextureURL }) {
  // 1️⃣ Load GLB once
  const gltf = useLoader(GLTFLoader, modelURL);

  // 2️⃣ Load two textures: one dynamic (user/preset) and one static white
  const dynamicTex = useLoader(TextureLoader, dynamicTextureURL);
  const whiteTex   = useLoader(TextureLoader, "/textures/plain-white.png");

  // 3️⃣ Ensure proper wrapping
  [dynamicTex, whiteTex].forEach((tex) => {
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(1, 1);
  });

  // 4️⃣ When loaders finish, assign per-material
  useEffect(() => {
    gltf.scene.traverse((obj) => {
      if (obj.isMesh) {
        // Blender material names must match these
        if (obj.material.name === "Textured") {
          obj.material.map = dynamicTex;
        } else {
          obj.material.map = whiteTex;
        }
        obj.material.needsUpdate = true;
      }
    });
  }, [gltf, dynamicTex, whiteTex]);

  // 5️⃣ Optional: slow auto-rotate


  return <primitive object={gltf.scene} />;
}

export default function Cup3DPreview({ modelURL, textureURL }) {
  const [canLoad, setCanLoad] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Quick HEAD check so we always render the <Canvas> even if the model is missing
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
