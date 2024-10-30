import LoginForm from '@/components/forms/loginForm'

const loginPage = () => {
  return (
    <>
      <section className=" w-full flex flex-col gap-5 ">
        <h2 className=" text-titleColor font-semibold text-lg text-center ">Inicio de sesión</h2>
        <LoginForm />
      </section>
    </>
  )
}

export default loginPage
