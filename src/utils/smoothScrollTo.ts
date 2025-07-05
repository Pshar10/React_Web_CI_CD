const smoothScrollTo = (targetY: number, duration: number = 150) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);

    const easeInOut =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startY + distance * easeInOut);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

export default smoothScrollTo;