import RegisterForm from '@/components/forms/registerForm'

const registerPage = () => {
  return (
    <>
      <section className=" w-full flex flex-col gap-5 ">
        <h2 className=" text-titleColor font-semibold text-lg text-center ">Registro</h2>
        <RegisterForm />
      </section>
    </>
  )
}

export default registerPage
