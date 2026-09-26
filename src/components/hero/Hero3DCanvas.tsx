import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'architecture' | '3d'>('architecture');

  // Detect WebGL and prefers-reduced-motion
  useEffect(() => {
    let webglSupport = false;
    try {
      const canvas = document.createElement('canvas');
      webglSupport = Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      webglSupport = false;
    }
    setHasWebGL(webglSupport);
  }, []);

  useEffect(() => {
    if (viewMode !== '3d' || !mountRef.current || !hasWebGL) return;

    const container = mountRef.current;
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 420;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. Renderer with strict performance caps
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const emeraldLight = new THREE.PointLight(0x00e599, 3, 20);
    emeraldLight.position.set(3, 3, 4);
    scene.add(emeraldLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 2, 20);
    blueLight.position.set(-3, -2, 3);
    scene.add(blueLight);

    // 4. Procedural Geometry Hub Group
    const hubGroup = new THREE.Group();
    scene.add(hubGroup);

    // Central Platform
    const platformGeo = new THREE.BoxGeometry(3.2, 2.1, 0.18);
    const platformMat = new THREE.MeshPhysicalMaterial({
      color: 0x111827,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9,
      reflectivity: 0.9,
      clearcoat: 0.3,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    hubGroup.add(platform);

    // Platform Glowing Edge Wireframe
    const wireframeGeo = new THREE.WireframeGeometry(platformGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x00e599,
      transparent: true,
      opacity: 0.45,
    });
    const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    hubGroup.add(wireframe);

    // Top Window Action Buttons
    [-1.3, -1.1, -0.9].forEach((x, i) => {
      const dotGeo = new THREE.CircleGeometry(0.04, 16);
      const dotColors = [0xf43f5e, 0xfbbf24, 0x10b981];
      const dotMat = new THREE.MeshBasicMaterial({ color: dotColors[i] });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, 0.85, 0.11);
      hubGroup.add(dot);
    });

    // Node 1: Orbiting Database Cylinder
    const dbGroup = new THREE.Group();
    const cylGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.5, 24);
    const dbMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      metalness: 0.6,
      roughness: 0.3,
    });
    const dbMesh = new THREE.Mesh(cylGeo, dbMat);
    dbGroup.add(dbMesh);

    const ringGeo = new THREE.TorusGeometry(0.44, 0.025, 16, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00e599 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    dbGroup.add(ringMesh);

    hubGroup.add(dbGroup);

    // Node 2: Orbiting UI Component Box
    const uiGroup = new THREE.Group();
    const uiGeo = new THREE.BoxGeometry(0.7, 0.7, 0.1);
    const uiMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.5,
      roughness: 0.4,
    });
    const uiMesh = new THREE.Mesh(uiGeo, uiMat);
    uiGroup.add(uiMesh);

    const uiWireGeo = new THREE.WireframeGeometry(uiGeo);
    const uiWireMat = new THREE.LineBasicMaterial({ color: 0x00e599, opacity: 0.8, transparent: true });
    uiGroup.add(new THREE.LineSegments(uiWireGeo, uiWireMat));
    hubGroup.add(uiGroup);

    // Node 3: Orbiting Server Hexagon
    const srvGroup = new THREE.Group();
    const srvGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 6);
    const srvMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.7,
      roughness: 0.2,
    });
    const srvMesh = new THREE.Mesh(srvGeo, srvMat);
    srvMesh.rotation.x = Math.PI / 2;
    srvGroup.add(srvMesh);
    hubGroup.add(srvGroup);

    // Connecting procedural data curves
    const particleCount = 40;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4;
      particlePositions[i + 2] = (Math.random() - 0.5) * 3;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x00e599,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // 5. Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.35;
      targetY = y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Intersection Observer
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      hubGroup.rotation.y = mouseX + Math.sin(elapsedTime * 0.4) * 0.08;
      hubGroup.rotation.x = -mouseY + Math.cos(elapsedTime * 0.3) * 0.05;
      hubGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.08;

      const orbitRadius = 2.4;
      dbGroup.position.set(
        Math.cos(elapsedTime * 0.7) * orbitRadius,
        Math.sin(elapsedTime * 0.5) * 0.6,
        Math.sin(elapsedTime * 0.7) * 1.2
      );
      dbGroup.rotation.y += 0.015;

      uiGroup.position.set(
        Math.cos(elapsedTime * 0.7 + (Math.PI * 2) / 3) * (orbitRadius - 0.2),
        Math.sin(elapsedTime * 0.6 + 1) * 0.7,
        Math.sin(elapsedTime * 0.7 + (Math.PI * 2) / 3) * 1.2
      );
      uiGroup.rotation.z += 0.01;

      srvGroup.position.set(
        Math.cos(elapsedTime * 0.7 + (Math.PI * 4) / 3) * orbitRadius,
        Math.sin(elapsedTime * 0.5 + 2) * 0.5,
        Math.sin(elapsedTime * 0.7 + (Math.PI * 4) / 3) * 1.2
      );
      srvGroup.rotation.y += 0.02;

      particleSystem.rotation.y = elapsedTime * 0.03;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [viewMode, hasWebGL]);

  return (
    <div className="relative w-full">
      {/* View Switcher Controls */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          <span className="text-[11px] font-mono text-[var(--text-muted)] ml-1">Terminal • s-khan.dev</span>
        </div>

        {hasWebGL && (
          <div className="inline-flex items-center p-0.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono">
            <button
              type="button"
              onClick={() => setViewMode('architecture')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                viewMode === 'architecture'
                  ? 'bg-[var(--accent-color)]/15 text-[var(--accent-color)] font-semibold border border-[var(--accent-color)]/30'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              ⚡ Architecture
            </button>
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-[var(--accent-color)]/15 text-[var(--accent-color)] font-semibold border border-[var(--accent-color)]/30'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              🌐 3D Node Hub
            </button>
          </div>
        )}
      </div>

      {viewMode === 'architecture' ? (
        <div className="relative w-full rounded-2xl bg-[var(--bg-surface)]/90 border border-[var(--border-color)] p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-color)]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-4">
            <span className="text-xs font-mono font-semibold text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-3 py-1 rounded-full border border-[var(--accent-color)]/25 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-pulse"></span>
              System Architecture
            </span>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">Production Stack</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-1">
            <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1.5 transition-all hover:border-[var(--accent-color)]/40">
              <span className="text-xs text-[var(--text-muted)] font-mono">Backend Engines</span>
              <p className="text-sm font-semibold text-[var(--text-primary)]">PHP • MySQL • Node</p>
              <p className="text-xs text-[var(--accent-color)] font-mono">Verified LMS & Portals</p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1.5 transition-all hover:border-[var(--blue-accent)]/40">
              <span className="text-xs text-[var(--text-muted)] font-mono">Front-End Speed</span>
              <p className="text-sm font-semibold text-[var(--text-primary)]">React • Tailwind • PWA</p>
              <p className="text-xs text-[var(--blue-accent)] font-mono">Sub-Second Loading</p>
            </div>

            <div className="sm:col-span-2 p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-between transition-all hover:border-[var(--accent-color)]/40">
              <div className="space-y-0.5">
                <span className="text-xs text-[var(--text-muted)] font-mono">Lighthouse Mobile Target</span>
                <p className="text-sm font-bold text-[var(--text-primary)]">90+ Performance • 95+ Accessibility</p>
              </div>
              <div className="w-11 h-11 rounded-full bg-[var(--accent-color)]/15 border border-[var(--accent-color)]/40 flex items-center justify-center text-sm font-mono font-bold text-[var(--accent-color)] shadow-lg shadow-[var(--accent-color)]/20">
                99
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[var(--text-muted)] font-mono text-center pt-3 border-t border-[var(--border-color)]/60 mt-3">
            Engineered by Sajjad Khan • Clean Code Architecture
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[380px] sm:h-[420px] rounded-2xl bg-[var(--bg-surface)]/90 border border-[var(--border-color)] flex items-center justify-center overflow-hidden shadow-2xl select-none">
          <div
            ref={mountRef}
            className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          />
          {/* Interactive Micro-badge overlay */}
          <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-surface)]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[var(--border-color)] pointer-events-none">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-color)] animate-pulse"></span>
              Interactive 3D Procedural Hub
            </span>
            <span className="text-[var(--text-muted)]">Damped Cursor Physics • 0 KB Models</span>
          </div>
        </div>
      )}
    </div>
  );
};