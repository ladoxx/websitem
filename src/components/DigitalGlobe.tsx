'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTranslation } from '@/context/LanguageContext';

export default function DigitalGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useTranslation();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Elegant Platinum Wireframe Sphere
    const sphereRadius = 62;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 36, 24);
    
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8, // refined slate-400
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    const wireframeMesh = new THREE.Mesh(sphereGeo, wireframeMat);
    globeGroup.add(wireframeMesh);

    // Subtle Dots on Vertices
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', sphereGeo.attributes.position);
    const pointsMat = new THREE.PointsMaterial({
      color: 0x0f172a, // obsidian black dots
      size: 2.2,
      transparent: true,
      opacity: 0.75,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(pointsMesh);

    // Core Solid Subtle Globe with Soft Gradient Feel
    const innerGeo = new THREE.SphereGeometry(sphereRadius * 0.92, 28, 28);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xf1f5f9, // pure soft slate-100
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerMesh);

    // 2. Dynamic Orbiting Rings
    const createRing = (radius: number, colorHex: number, count: number, tiltX: number, tiltY: number) => {
      const ringGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2;
        positions[i * 3] = Math.cos(theta) * radius;
        positions[i * 3 + 1] = Math.sin(theta) * radius;
        positions[i * 3 + 2] = Math.sin(theta * 2) * 5;
      }
      ringGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const ringMat = new THREE.PointsMaterial({
        color: colorHex,
        size: 1.8,
        transparent: true,
        opacity: 0.8,
      });
      const points = new THREE.Points(ringGeo, ringMat);
      points.rotation.x = tiltX;
      points.rotation.y = tiltY;
      return points;
    };

    const cobaltRing = createRing(96, 0x2563eb, 180, Math.PI / 3, Math.PI / 6);
    globeGroup.add(cobaltRing);

    const slateRing = createRing(112, 0x64748b, 200, -Math.PI / 4, -Math.PI / 8);
    globeGroup.add(slateRing);

    // 3. Animated Orbiting Data Satellites (Tiny luminous spheres traveling along orbits)
    const satelliteGroup = new THREE.Group();
    globeGroup.add(satelliteGroup);

    const satGeo = new THREE.SphereGeometry(2.5, 12, 12);
    const satMat1 = new THREE.MeshBasicMaterial({ color: 0x2563eb });
    const sat1 = new THREE.Mesh(satGeo, satMat1);
    satelliteGroup.add(sat1);

    const satMat2 = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const sat2 = new THREE.Mesh(satGeo, satMat2);
    satelliteGroup.add(sat2);

    const satMat3 = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const sat3 = new THREE.Mesh(satGeo, satMat3);
    satelliteGroup.add(sat3);

    // Pointer & Touch Interactivity with Smooth Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const updateTarget = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.45;
      targetY = y * 0.45;
    };

    const handlePointerMove = (e: MouseEvent) => {
      updateTarget(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateTarget(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Continuous organic rotation on both desktop and mobile
      globeGroup.rotation.y += delta * 0.25;
      cobaltRing.rotation.z += delta * 0.16;
      slateRing.rotation.z -= delta * 0.13;

      // Animate satellites on mathematical orbits
      const r1 = 96;
      sat1.position.x = Math.cos(elapsed * 1.2) * r1;
      sat1.position.y = Math.sin(elapsed * 1.2) * (r1 * 0.5);
      sat1.position.z = Math.sin(elapsed * 1.2 * 2) * 20;

      const r2 = 112;
      sat2.position.x = Math.cos(-elapsed * 0.9) * r2;
      sat2.position.y = Math.sin(-elapsed * 0.9) * (r2 * 0.4);
      sat2.position.z = Math.cos(elapsed * 0.9 * 2) * -25;

      const r3 = 78;
      sat3.position.x = Math.sin(elapsed * 1.5) * r3;
      sat3.position.y = Math.cos(elapsed * 1.5) * r3;
      sat3.position.z = Math.sin(elapsed * 1.5) * 15;

      // Pointer / touch damping
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      globeGroup.rotation.x = mouseY * 0.7;
      globeGroup.position.x = mouseX * 18;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 320;
      const newH = container.clientHeight || 320;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      sphereGeo.dispose();
      wireframeMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      satGeo.dispose();
      satMat1.dispose();
      satMat2.dispose();
      satMat3.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full aspect-square min-h-[290px] sm:min-h-[380px] max-w-[340px] sm:max-w-[480px] lg:max-w-[540px] mx-auto flex items-center justify-center">
      {/* Soft ambient studio shadow / diffusion */}
      <div className="absolute w-60 sm:w-72 h-60 sm:h-72 rounded-full bg-slate-200/60 blur-[80px] pointer-events-none -z-10" />

      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full min-h-[290px] sm:min-h-[380px] cursor-grab active:cursor-grabbing select-none"
        aria-label="Interactive 3D Digital Studio Globe"
      />

      {/* Floating Modern Studio Badges with Floating Motion (Visible on Mobile & Desktop) */}
      <div className="absolute bottom-3 left-2 sm:bottom-6 sm:left-6 studio-card px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl shadow-md flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-slate-800 animate-float-slow">
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>
          {lang === 'ko'
            ? '첨단 인프라 // 정상 가동'
            : lang === 'en'
            ? 'Advanced Infra // Active'
            : 'Gelişmiş Altyapı // Aktif'}
        </span>
      </div>
      <div className="absolute top-4 right-2 sm:top-8 sm:right-6 studio-card px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl shadow-md flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-slate-800 animate-float-delayed">
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-600 animate-ping" />
        <span>
          {lang === 'ko'
            ? '밀리초 단위 초고속 응답'
            : lang === 'en'
            ? 'Sub-Millisecond Speed'
            : 'Milisaniyelik Hız'}
        </span>
      </div>
    </div>
  );
}

