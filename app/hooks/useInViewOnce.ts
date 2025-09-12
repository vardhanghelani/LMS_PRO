import { useEffect, useRef, useState } from 'react';

interface UseInViewOnceOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInViewOnce(options: UseInViewOnceOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);

        if (inView && !hasBeenInView) {
          setHasBeenInView(true);
        }

        // If triggerOnce is false, we can reset hasBeenInView when element leaves view
        if (!triggerOnce && !inView) {
          setHasBeenInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasBeenInView]);

  return {
    ref,
    isInView,
    hasBeenInView: triggerOnce ? hasBeenInView : isInView,
  };
}
