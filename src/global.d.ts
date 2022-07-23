interface Window {
    SSR_DATA: any
}

declare namespace JSX {
    interface IntrinsicElements {
        'bg-navigation': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
}

// https://github.com/Microsoft/TypeScript/issues/14094
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

type XOR<T, U> = (T | U) extends object
    ? (Without<T, U> & U) | (Without<U, T> & T)
    : T | U

type AllXOR<T extends any[]> =
    T extends [infer Only]
    ? Only
    : T extends [infer A, infer B, ...infer Rest]
        ? AllXOR<[XOR<A, B>, ...Rest]>
        : never

type PropsWithClassname<T> = T & {className?: string}

type RequiredField<T, S extends keyof T> = Exclude<T, S> & Pick<Required<T>, S>

type IOption = {
    value: string | number
    label: string
}
