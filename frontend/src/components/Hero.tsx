import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Hero() {

  return (
    <section className="container mx-auto px-5 py-13 md:py-22">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <div className="flex flex-col gap-5 items-start animate-in slide-in-from-left duration-700">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight text-foreground leading-[1.2]">
            Find your <br/>
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-700">
              Inner Boogie
            </span>
          </h1>

          <p className="text-md text-muted-foreground max-w-lg leading-relaxed">
            Premium handmade accessories for the cool boogers.
            Designed for comfort, styled for the streets.
          </p>

          <div className="flex gap-5">
            <Button>
              <Link href='/products'>Shop Now</Link>
            </Button>
            <Button variant='ghost'>
              <Link href='/about'>Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image src='/neko.jpg' height={300} width={300} alt="Neko" />
          <div className="border border-zinc-900 rounded-full h-40 w-40 flex items-center justify-center">
            <p className="font-bold text-foreground text-lg">Yo boogers!</p>
          </div>
        </div>
      </div>
    </section>
  )
}