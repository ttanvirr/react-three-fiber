import { useTexture } from "@react-three/drei"

export default function LoadTexture() {
  const props = useTexture({
    map: "PavingStones092_1K-JPG_Color.jpg",
    displacementMap: "PavingStones092_1K-JPG_Displacement.jpg",
    normalMap: "PavingStones092_1K-JPG_Normal.jpg",
    roughnessMap: "PavingStones092_1K-JPG_Roughness.jpg",
    aoMap: "PavingStones092_1K-JPG_AmbientOcclusion.jpg",
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial displacementScale={0.2} {...props} />
      </mesh>
    </>
  )
}
