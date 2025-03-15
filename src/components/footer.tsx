import { useValue } from '@/schema/tinybase-schema'
import { RiGithubLine, RiTwitterXLine } from 'react-icons/ri'

export const Footer = () => {
  const year = useValue('year')
  return (
    <footer className="relative flex items-center justify-center gap-2 border-t bg-background/30 p-4 text-primary backdrop-blur-md">
      <p>E-commerce ©{year}</p>
      <p>&#8226;</p>
      <a
        className="text-muted-foreground"
        target="_blank"
        href="https://x.com/mouktardev"
      >
        <RiTwitterXLine className="size-6" />
      </a>
      <p>&#8226;</p>
      <a
        className="text-muted-foreground"
        target="_blank"
        href="https://github.com/mouktardev"
      >
        <RiGithubLine className="size-6" />
      </a>
    </footer>
  )
}
