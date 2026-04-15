
interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'link' | 'button';
    href?: string;
    onClick?: () => void;
    download?: boolean;
}

export default function Button({ className, variant = 'button' , children, href, download = false, onClick }: ButtonProps) {

    const style = 'cursor-pointer inline-flex w-full h-12 items-center justify-center rounded-md bg-black px-6 text-[1rem] font-semibold text-white transition-colors duration-200 hover:bg-zinc-800'
    return <>
        {variant === 'link' ? (
            <a
                href={`${href}`}
                className={`${style} ${className}`}
                download={download}
            >
                {children}
            </a>
        ) : (
            <button
                className={`${style} ${className}`}
                onClick={onClick}
            >
                {children}
            </button>
    )}
  </>
}
