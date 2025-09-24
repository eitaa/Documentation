import React, { useEffect, useRef, useState, ReactNode, isValidElement, cloneElement, ReactElement } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface TimelineItemProps {
  title: string;
  image?: string;
  children: ReactNode;
  id?: string;
  number?: number;
}

export const TimelineItem = ({ title, image, children, id, number }: TimelineItemProps) => {
  return (
    <div className="timeline-item" id={id} style={{ direction: "rtl" }}>
      <div className="timeline-left-col">
        <div className="timeline-number-wrapper">
          <div className="timeline-number" id="timeline_number">
            {number?.toLocaleString("fa")}
          </div>
        </div>
      </div>
      <div className="timeline-text">
        <h2>{title}</h2>
        {children}
        {image && <img className="timeline-image" src={image} alt="" />}
      </div>
    </div>
  );
};

interface TimelineProps {
  children: ReactNode;
}

function isTimelineItemElement(child: unknown): child is ReactElement<TimelineItemProps> {
  return isValidElement(child) && child.type === TimelineItem;
}

export const Timeline = ({ children }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(() => {
      if (ref.current) {
        setHeight(ref.current.getBoundingClientRect().height);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 12%", "end 65%"],
  });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const items = React.Children.toArray(children).map((child, idx) => {
    if (isTimelineItemElement(child)) {
      return cloneElement(child, {
        id: child.props.id || `timeline-item-${idx}`,
        number: idx + 1,
      });
    }
    return child;
  });

  return (
    <div className="timeline-container" ref={containerRef}>
      <div className="timeline-content" ref={ref} style={{ position: 'relative' }}>
        <div
          className="timeline-line"
          style={{
            position: 'absolute',
            top: 0,
            right: '1.2rem',
            height: height,
            width: 2,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <div className="timeline-line-background" style={{ position: 'absolute', inset: 0, width: 2 }} />
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              width: 2,
              position: 'absolute',
              insetInlineStart: 0,
              top: 0,
              borderRadius: 9999,
            }}
            className="timeline-line-progress"
          />
        </div>
        {items}
      </div>
    </div>
  );
};
