import style from './page.module.scss'
import Header from "@/components/static/header/header";
import Menu from "@/components/static/menu/menu";
import Form from "@/components/routing/form/form";

export default function Home() {
  return (
    <main>
        <Header />
        <Menu />
        <Form />
    </main>
  )
}
