import { useState, ImgHTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    aspectRatio?: string;
    priority?: boolean;
    containerClassName?: string;
}

/**
 * Ultra-smooth image component optimized for mobile scroll performance.
 * 
 * Key optimizations:
 * - NO conditional rendering (prevents pop-in jank)
 * - Native lazy loading (browser handles efficiently)
 * - Smooth opacity transition on load
 * - CSS containment for paint optimization
 * - Lightweight skeleton placeholder
 */
const OptimizedImage = memo(({
    src,
    alt,
    aspectRatio = "aspect-square",
    priority = false,
    className,
    containerClassName,
    ...props
}: OptimizedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div
            className={cn(
                "relative overflow-hidden",
                aspectRatio,
                containerClassName
            )}
            style={{
                contain: "layout style paint",
            }}
        >
            {/* Skeleton - Simple solid color for max performance */}
            <div
                className={cn(
                    "absolute inset-0 bg-gray-200 transition-opacity duration-500",
                    isLoaded ? "opacity-0" : "opacity-100"
                )}
                aria-hidden="true"
            />

            {/* Image - Always in DOM, uses native lazy loading */}
            <img
                src={src}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={priority ? "high" : "auto"}
                onLoad={() => setIsLoaded(true)}
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-500 ease-out",
                    isLoaded ? "opacity-100" : "opacity-0",
                    className
                )}
                {...props}
            />
        </div>
    );
});

OptimizedImage.displayName = "OptimizedImage";

export { OptimizedImage };
