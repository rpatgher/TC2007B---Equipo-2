import { ReactNode } from "react";
import { useEffect, useState, useRef } from "react";

const AnimationComponent = ({ children, dir }: { children: ReactNode, dir?: string }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(elementRef.current);
                }
            },
            {
                threshold: 0.1,
                root: null, 
                rootMargin: "0px 0px -150px 0px",
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    const dirStyle: any = {
        left: 'translateX(-50px)',
        right: 'translateX(50px)',
        up: 'translateY(-50px)',
        down: 'translateY(50px)',
    };


    return (
        <div 
            ref={elementRef}
            style={isVisible ? {
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
            } : {
                opacity: 0,
                transform: dirStyle[dir || 'up'],
            }}
        >
            {children}
        </div>
    )
}

export default AnimationComponent
