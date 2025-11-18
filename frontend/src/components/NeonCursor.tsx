import { useEffect } from "react";
import "./NeonCursor.css";

const NeonCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector(".neon-cursor") as HTMLElement;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    const speed = 0.4; // fast follow, near zero lag

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      // 1px offset for perfect alignment
      const offsetX = 1;
      const offsetY = 1;

      if (cursor) {
        cursor.style.transform = `translate(${currentX + offsetX}px, ${currentY + offsetY}px)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    animate();

    // Pulse animation on click
    window.addEventListener("click", () => {
      if (cursor) {
        cursor.classList.add("click-pulse");
        setTimeout(() => cursor.classList.remove("click-pulse"), 300);
      }
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return <div className="neon-cursor"></div>;
};

export default NeonCursor;
