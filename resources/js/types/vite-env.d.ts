/// <reference types="vite/client" />
/// <reference types="@inertiajs/react" />

declare function route(name?: string, params?: any, absolute?: boolean): string;

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
    export const MeshLineGeometry: any;
    export const MeshLineMaterial: any;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            meshLineGeometry: any;
            meshLineMaterial: any;
        }
    }
}
