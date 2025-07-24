import React from 'react';
import { Code, Brain, Terminal, GitBranch, Database, Hash, CornerDownRight } from 'lucide-react';

export const FloatingCodeSymbol = ({ symbol, x, y, size, color, delay }) => {
    return (
        <div
            className="absolute pointer-events-none select-none z-0 font-mono font-bold"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                fontSize: `${size}px`,
                color: color,
                opacity: 0.2,
                animation: `float ${Math.random() * 5 + 15}s ease-in-out infinite`,
                animationDelay: `${delay}s`
            }}
        >
            {symbol}
        </div>
    )
}

export const AnimatedIcon = ({ icon: Icon, x, y, size, color, delay }) => {
    return (
        <div
            className="absolute pointer-events-none select-none z-0"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                animation: `float ${Math.random() * 5 + 15}s ease-in-out infinite`,
                animationDelay: `${delay}s`
            }}
        >
            <Icon size={size} color={color} opacity={0.15} />
        </div>
    )
}

export const GeometricShape = ({ shape, x, y, size, color, delay }) => {
    return (
        <div
            className={`absolute pointer-events-none select-none z-0 ${shape === 'circle' ? 'rounded-full' : shape === 'square' ? '' : ''}`}
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                opacity: 0.1,
                animation: `${shape === 'circle' ? 'float' : 'slow-rotate'} ${Math.random() * 10 + 30}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                transform: shape === 'square' ? 'rotate(45deg)' : ''
            }}
        />
    )
}

export const BackgroundGrid = React.memo(({ className = "", spacing = 30, color = "#6366F1", rotation = 0, animate = false }) => {
    const patternId = `grid-${spacing}-${color.replace('#', '')}-${rotation}`;

    return (
        <div className={`fixed inset-0 z-0  opacity-10${className}`}>
            <svg
                className="w-full h-full opacity-30"
            >
                <defs>
                    <pattern
                        id={patternId}
                        width={spacing}
                        height={spacing}
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
                            fill="none"
                            stroke={color}
                            strokeWidth="1.5"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>
        </div>
    );
});

export const CodeBlock = ({ code, x, y, delay }) => {
    return (
        <div
            className="absolute pointer-events-none select-none z-0 bg-white bg-opacity-5 backdrop-blur-sm p-2 rounded-md font-mono text-xs"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                maxWidth: '200px',
                opacity: 0.15,
                animation: `float ${Math.random() * 10 + 20}s ease-in-out infinite`,
                animationDelay: `${delay}s`
            }}
        >
            {code}
        </div>
    )
}

export const BackgroundElements = ({
    elements = ['code', 'shapes', 'grid', 'icons'],
    intensity = 'medium'
}) => {
    const [visibleSet, setVisibleSet] = React.useState([]);
    const [fadeState, setFadeState] = React.useState("visible"); // "visible", "fading", "changing"
    const [grids] = React.useState(() => {

        const timestamp = Date.now();
        return [
            {
                type: 'grid',
                id: `grid-${timestamp}`,
                spacing: 20, 
                color: "gray", 
                createdAt: timestamp
            },
            {
                type: 'grid',
                id: `grid2-${timestamp}`,
                spacing: 60, 
                color: "black", 
                rotation: 5, 
                createdAt: timestamp
            }
        ];
    });

    const counts = {
        low: { code: 2, shapes: 2, icons: 2, codeBlocks: 1 },
        medium: { code: 4, shapes: 4, icons: 3, codeBlocks: 2 },
        high: { code: 6, shapes: 6, icons: 5, codeBlocks: 3 }
    };

    const count = counts[intensity] || counts.medium;

    const codeSymbols = ['function()', 'const {}', 'export default', 'return []', 'class {}', 'import from', 'async/await', '<Component />'];

    const icons = [Code, Brain, Terminal, GitBranch, Database, Hash, CornerDownRight];

    const codeSnippets = [
        'const solve = (n) => {\n  if (n <= 1) return n;\n  return solve(n-1) + solve(n-2);\n}',
        'function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0];\n  const left = [];\n  const right = [];\n}',
        'class Node {\n  constructor(val) {\n    this.val = val;\n    this.next = null;\n  }\n}'
    ];

    const generateElements = React.useCallback(() => {
        const newElements = [];
        const timestamp = Date.now();

        if (elements.includes('code')) {
            for (let i = 0; i < count.code; i++) {
                newElements.push({
                    type: 'code',
                    id: `code-${timestamp}-${i}`,
                    symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
                    x: Math.random() * 90 + 5,
                    y: Math.random() * 90 + 5,
                    size: Math.random() * 20 + 20,
                    color: `hsl(${Math.random() * 60 + 220}, 70%, 50%)`,
                    delay: Math.random() * 2,
                    createdAt: timestamp
                });
            }
        }

        if (elements.includes('shapes')) {
            for (let i = 0; i < count.shapes; i++) {
                newElements.push({
                    type: 'shape',
                    id: `shape-${timestamp}-${i}`,
                    shape: i % 2 === 0 ? 'circle' : 'square',
                    x: Math.random() * 90 + 5,
                    y: Math.random() * 90 + 5,
                    size: Math.random() * 60 + 40,
                    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                    delay: Math.random() * 2,
                    createdAt: timestamp
                });
            }
        }

        if (elements.includes('icons')) {
            for (let i = 0; i < count.icons; i++) {
                newElements.push({
                    type: 'icon',
                    id: `icon-${timestamp}-${i}`,
                    icon: icons[i % icons.length],
                    x: Math.random() * 90 + 5,
                    y: Math.random() * 90 + 5,
                    size: Math.random() * 24 + 16,
                    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                    delay: Math.random() * 2,
                    createdAt: timestamp
                });
            }
        }

        if (elements.includes('codeBlocks')) {
            for (let i = 0; i < count.codeBlocks; i++) {
                newElements.push({
                    type: 'codeBlock',
                    id: `block-${timestamp}-${i}`,
                    code: codeSnippets[i % codeSnippets.length],
                    x: Math.random() * 70 + 15,
                    y: Math.random() * 70 + 15,
                    delay: Math.random() * 2,
                    createdAt: timestamp
                });
            }
        }

        return newElements;
    }, [elements, count, codeSymbols, codeSnippets, icons]);

    React.useEffect(() => {
        if (visibleSet.length === 0) {
            setVisibleSet(generateElements());
            setFadeState("visible");
        }

        const interval = setInterval(() => {
            if (fadeState === "visible") {
                setFadeState("fading");

                const timeout = setTimeout(() => {
                    setFadeState("changing");
                    setVisibleSet(generateElements());

                    const visibleTimeout = setTimeout(() => {
                        setFadeState("visible");
                    }, 100);

                    return () => clearTimeout(visibleTimeout);
                }, 2000);

                return () => clearTimeout(timeout);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [generateElements, fadeState, visibleSet.length]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Render grids outside of fade effects - always visible */}
            {elements.includes('grid') && grids.map((grid) => (
                <div key={grid.id}>
                    <BackgroundGrid
                        spacing={grid.spacing || 30}
                        color={grid.color || "#6366F1"}
                        rotation={grid.rotation || 0}
                    />
                </div>
            ))}

            {/* Other elements will fade in/out */}
            <div className={fadeState === "visible" ? "opacity-100 transition-opacity duration-2000" :
                fadeState === "fading" ? "opacity-0 transition-opacity duration-2000" :
                    "opacity-0"}>
                {visibleSet.map((element) => {
                    switch (element.type) {
                        case 'code':
                            return (
                                <div key={element.id}>
                                    <FloatingCodeSymbol
                                        symbol={element.symbol}
                                        x={element.x}
                                        y={element.y}
                                        size={element.size}
                                        color={element.color}
                                        delay={element.delay}
                                    />
                                </div>
                            );

                        case 'shape':
                            return (
                                <div key={element.id}>
                                    <GeometricShape
                                        shape={element.shape}
                                        x={element.x}
                                        y={element.y}
                                        size={element.size}
                                        color={element.color}
                                        delay={element.delay}
                                    />
                                </div>
                            );

                        case 'icon':
                            return (
                                <div key={element.id}>
                                    <AnimatedIcon
                                        icon={element.icon}
                                        x={element.x}
                                        y={element.y}
                                        size={element.size}
                                        color={element.color}
                                        delay={element.delay}
                                    />
                                </div>
                            );

                        case 'codeBlock':
                            return (
                                <div key={element.id}>
                                    <CodeBlock
                                        code={element.code}
                                        x={element.x}
                                        y={element.y}
                                        delay={element.delay}
                                    />
                                </div>
                            );

                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

export default BackgroundElements;
