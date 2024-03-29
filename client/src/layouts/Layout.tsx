import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"
import SearchBar from "../components/SearchBar"
interface LayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="font-roboto flex min-h-screen flex-col">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <SearchBar />
      </div>
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
