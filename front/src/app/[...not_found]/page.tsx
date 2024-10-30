import StyledButton from '@/components/buttons/StyledButton'

const notFoundPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <h1>La página que buscas no existe</h1>
      <StyledButton extraStyles="w-fit " href="/" styleType="filled" text="Volver al inicio" />
    </div>
  )
}

export default notFoundPage
