import style from './page.module.scss'
import Header from "@/components/static/header/header";
import Menu from "@/components/static/menu/menu";

export default function Home() {
  return (
    <main>
        <Header />
        <Menu />
    </main>
  )
}
