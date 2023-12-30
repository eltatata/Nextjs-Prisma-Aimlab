import Link from "next/link";
import { GiBullseye } from "react-icons/gi";
import { SiNextdotjs, SiPrisma, SiTailwindcss } from "react-icons/si";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-5 h-[70vh]">
      <div className="flex justify-center items-center gap-2">
        <GiBullseye className="w-32 h-32" />
        <h2 className="text-5xl font-semibold">Aimlab</h2>
      </div>
      <div className="border-y py-5 w-1/4">
        This project is a basic replica of Aimlab, designed for practicing fast mouse movement. Built with Next.js, Prisma, Tailwind, and NextAuth, the platform enables users to practice and record their scores in a database through the login process.
      </div>
      <div className="flex text-3xl gap-10">
        <Link href="https://nextjs.org/" target="_blank"><SiNextdotjs className="text-white hover:text-slate-400 cursor-pointer" /></Link>
        <Link href="https://tailwindcss.com/" target="_blank"><SiTailwindcss className="text-blue-600 hover:text-blue-700 cursor-pointer" /></Link>
        <Link href="https://www.prisma.io/" target="_blank"><SiPrisma className="text-violet-600 hover:text-violet-700 cursor-pointer" /></Link>
      </div>
    </main>
  )
}
