import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext.tsx';

const GradientShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#22c55e') },
        uOpacity: { value: 0.1 },
        uResolution: { value: new THREE.Vector2(1, 1) }
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Wave 1
      float y1 = sin(uv.x * 2.5 + uTime * 0.15) * 0.1 + 0.5;
      float d1 = abs(uv.y - y1);
      float line1 = smoothstep(0.005, 0.001, d1); 

      // Wave 2
      float y2 = sin(uv.x * 1.8 - uTime * 0.12 + 1.2) * 0.15 + 0.4;
      float d2 = abs(uv.y - y2);
      float line2 = smoothstep(0.006, 0.001, d2); 

      // Wave 3
      float y3 = cos(uv.x * 1.2 + uTime * 0.08) * 0.2 + 0.6;
      float d3 = abs(uv.y - y3);
      float line3 = smoothstep(0.007, 0.001, d3);

      float finalAlpha = (line1 + line2 + line3) * uOpacity;
      
      // Glow
      finalAlpha += (smoothstep(0.08, 0.0, d1) * 0.15 + smoothstep(0.08, 0.0, d2) * 0.15) * uOpacity;

      gl_FragColor = vec4(uColor, finalAlpha);
    }
  `
};

const AnimatedBackground = ({ theme }: { theme: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Colors
    const darkColor = new THREE.Color('#22c55e');
    const lightColor = new THREE.Color('#16a34a'); // Rich green for light mode
    const activeColor = theme === 'dark' ? darkColor : lightColor;
    const activeOpacity = theme === 'dark' ? 0.15 : 0.12;

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            materialRef.current.uniforms.uColor.value.lerp(activeColor, 0.05);
            // Lerp opacity smoothly
            materialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uOpacity.value, activeOpacity, 0.05);
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <planeGeometry args={[20, 10]} />
            <shaderMaterial
                ref={materialRef}
                args={[GradientShaderMaterial]}
                transparent={true}
                depthWrite={false}
            />
        </mesh>
    );
};

const Background = () => {
    const { theme } = useTheme();

    return (
        <div className="fixed inset-0 -z-50 pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-60 dark:opacity-100">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <AnimatedBackground theme={theme} />
            </Canvas>
        </div>
    );
};

export default Background;
