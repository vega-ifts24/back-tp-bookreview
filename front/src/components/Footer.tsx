import {FacebookLogo, InstagramLogo} from '@phosphor-icons/react/dist/ssr'

const Footer = () => {
  return (
    <footer className="bg-backgroundNavbar text-center p-4 mt-10 w-full gap-2 flex flex-col rounded-lg">
      <section className="flex justify-center gap-3 ">
        <a href="https://www.facebook.com/">
          <FacebookLogo size={24} />
        </a>
        <a href="https://www.instagram.com/">
          <InstagramLogo size={24} />
        </a>
      </section>
      <section className="w-full">
        <p className=" w-full">© Booker&apos;s</p>
      </section>
    </footer>
  )
}

export default Footer
